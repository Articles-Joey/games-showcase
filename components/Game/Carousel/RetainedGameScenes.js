import {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal, useThree } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { AmbientLight, Group, Scene } from "three";
import { useStore } from "@/components/hooks/useStore";
import {
    useCanvasLoading,
    useCanvasLoadingStore,
} from "../CanvasLoadingContext";
import RenderUniqueGameScene from "./RenderUniqueGameScene";
import {
    getCarouselGameKey,
    hasRetainedPreview,
    previewNames,
} from "./previewRegistry";
import DeferredPreview from "./Games/shared/DeferredPreview";
import {
    PreviewActivityProvider,
    usePreviewFrame,
} from "./Games/shared/PreviewActivity";
import {
    createPreviewLoadTracker,
    PreviewErrorBoundary,
    PreviewLoadProvider,
    PreviewSuspense,
} from "./Games/shared/PreviewLoadTracker";
import PreviewWarmup from "./PreviewWarmup";
import { previewGraphState } from "./warmPreview";

function PreviewTransform({
    game,
    index,
    active,
    tracker,
    camera,
    interactive,
}) {
    const group = useRef();
    const setEvents = useThree((state) => state.setEvents);
    const set = useThree((state) => state.set);
    useLayoutEffect(() => {
        setEvents({ enabled: interactive });
    }, [setEvents, interactive]);
    useLayoutEffect(() => {
        set({ camera });
    }, [set, camera]);
    usePreviewFrame((_, delta) => {
        if (!group.current) return;
        const target = active ? 1 : 0.5;
        const scale = group.current.scale.x;
        if (Math.abs(scale - target) < 0.0001) {
            if (scale !== target) group.current.scale.setScalar(target);
            return;
        }
        group.current.scale.setScalar(
            scale + (target - scale) * (1 - Math.exp(-5 * delta)),
        );
    });

    return (
        <group
            position={[15 + Math.max(index, 0) * 10, -0.5, 0]}
            rotation={[0, -Math.PI / 2, 0]}
        >
            <group ref={group}>
                <group position={[0, -1, 0]}>
                    <PreviewActivityProvider active={active}>
                        <PreviewLoadProvider tracker={tracker}>
                            <PreviewErrorBoundary
                                tracker={tracker}
                                name={game.name}
                            >
                                <PreviewSuspense>
                                    <DeferredPreview>
                                        <RenderUniqueGameScene game={game} />
                                    </DeferredPreview>
                                </PreviewSuspense>
                            </PreviewErrorBoundary>
                        </PreviewLoadProvider>
                    </PreviewActivityProvider>
                </group>
            </group>
        </group>
    );
}

const RetainedPreview = memo(function RetainedPreview({
    id,
    game,
    index,
    warming,
    onPrepared,
}) {
    const inRange = useStore(
        (state) =>
            index >= 0 &&
            Math.abs(state.activeGameIndex - index) <=
                state.renderUniqueGameSceneRange,
    );
    const selected = useStore(
        (state) => index >= 0 && state.activeGameIndex === index,
    );
    const darkMode = useStore((state) => state.darkMode);
    const showScenes = useCanvasLoading(
        (state) => state.status !== "loading" || state.skipped,
    );
    const scene = useThree((state) => state.scene);
    const camera = useThree((state) => state.camera);
    const [stageCamera] = useState(() => {
        const view = camera.clone();
        const x = 14 + Math.max(index, 0) * 10;
        view.position.set(x, 8, 19);
        view.lookAt(x, 2, 0);
        return view;
    });
    const [container] = useState(() => new Group());
    const [tracker] = useState(createPreviewLoadTracker);
    const [stage] = useState(() => {
        const staging = new Scene();
        staging.add(new AmbientLight("white", 2));
        return staging;
    });
    const visible = showScenes && inRange;
    const staged = warming && !visible;

    useLayoutEffect(() => {
        const x = 14 + Math.max(index, 0) * 10;
        stageCamera.position.set(x, 8, 19);
        stageCamera.lookAt(x, 2, 0);
        stageCamera.aspect = camera.aspect;
        stageCamera.updateProjectionMatrix();
    }, [index, stageCamera, camera]);

    useLayoutEffect(() => {
        stage.children[0].intensity = darkMode ? 1 : 2;
        stage.environment = scene.environment;
        stage.fog = scene.fog;
    }, [stage, scene, darkMode]);
    useLayoutEffect(() => {
        // Only the current loading job is attached to an offscreen scene. Ready
        // previews outside the range stay detached, with their React instances alive.
        const parent = visible ? scene : warming ? stage : null;
        container.visible = Boolean(parent);
        if (!parent) return;
        parent.add(container);
        return () => parent.remove(container);
    }, [scene, stage, container, visible, warming]);

    return (
        <>
            {createPortal(
                <PreviewActivityProvider
                    active={visible}
                    visible={visible || warming}
                >
                    {/* Once revealed, only the highlighted preview animates,
                        even while the remaining scenes prepare in the background. */}
                    <PreviewTransform
                        game={game}
                        index={index}
                        active={
                            (warming && !showScenes) || (selected && visible)
                        }
                        tracker={tracker}
                        camera={staged ? stageCamera : camera}
                        interactive={visible}
                    />
                </PreviewActivityProvider>,
                container,
                {
                    camera: staged ? stageCamera : camera,
                    events: { enabled: visible },
                },
            )}
            <PreviewWarmup
                id={id}
                name={game.name}
                enabled={warming}
                visible={visible}
                container={container}
                stage={stage}
                tracker={tracker}
                onPrepared={onPrepared}
            />
        </>
    );
});

function FinishLoading() {
    const finishing = useCanvasLoading((state) => state.status === "finishing");
    const store = useCanvasLoadingStore();
    const scene = useThree((state) => state.scene);
    const frames = useRef(0);
    const started = useRef(0);
    const pendingFrame = useRef();
    useLayoutEffect(() => {
        frames.current = 0;
        started.current = performance.now();
        return () => window.cancelAnimationFrame(pendingFrame.current);
    }, [finishing]);
    usePreviewFrame(
        () => {
            const pending =
                useProgress.getState().active ||
                previewGraphState(scene).textPending;
            // A failed font or stalled request must not trap the carousel at 99%.
            if (pending && performance.now() - started.current < 15000) {
                frames.current = 0;
                return;
            }
            // Render the actual starting viewport behind the overlay too, including
            // its cards and the combined lighting of its visible neighboring scenes.
            if (++frames.current === 3) {
                pendingFrame.current = window.requestAnimationFrame(() => {
                    if (store.getState().status === "finishing")
                        store.setState({ status: "ready", phase: "Ready" });
                });
            }
        },
        0,
        finishing,
    );
    return null;
}

function initialEntries() {
    return new Map(
        previewNames.map((name) => [
            `scene:${name}`,
            {
                id: `scene:${name}`,
                game: { name },
                gameKey: null,
                started: false,
            },
        ]),
    );
}

export default function RetainedGameScenes({ games = [], allGames = games }) {
    const activeIndex = useStore((state) => state.activeGameIndex);
    const range = useStore((state) => state.renderUniqueGameSceneRange);
    const loading = useCanvasLoading((state) => state.status === "loading");
    const showScenes = useCanvasLoading(
        (state) => state.status !== "loading" || state.skipped,
    );
    const store = useCanvasLoadingStore();
    const [entries, setEntries] = useState(initialEntries);
    const [prepared, setPrepared] = useState(() => new Set());
    const currentGames = useMemo(
        () =>
            new Map(
                games.map((game, index) => [
                    getCarouselGameKey(game),
                    { game, index },
                ]),
            ),
        [games],
    );
    const currentNames = useMemo(
        () => new Map(games.map((game, index) => [game.name, { game, index }])),
        [games],
    );
    const warmingEntry = loading
        ? [...entries.values()].find((entry) => !prepared.has(entry.id))
        : null;
    const latestQueue = useRef({ entries, prepared, games, allGames });
    useLayoutEffect(() => {
        latestQueue.current = { entries, prepared, games, allGames };
    }, [entries, prepared, games, allGames]);

    useEffect(() => {
        setEntries((previous) => {
            let next = previous;
            const update = (id, entry) => {
                if (next === previous) next = new Map(previous);
                next.set(id, entry);
            };
            // Bind real library IDs to the already mounted preview, preserving
            // the same instance when metadata arrives or filters change.
            for (const game of [...allGames, ...games]) {
                if (!hasRetainedPreview(game)) continue;
                const key = getCarouselGameKey(game);
                const assigned = [...next.values()].find(
                    (entry) => entry.gameKey === key,
                );
                if (assigned) {
                    if (assigned.game !== game)
                        update(assigned.id, { ...assigned, game });
                    continue;
                }
                const original = next.get(`scene:${game.name}`);
                const id =
                    original.gameKey === null ? original.id : `copy:${key}`;
                update(id, {
                    ...(id === original.id ? original : {}),
                    id,
                    game,
                    gameKey: key,
                    started: id === original.id ? original.started : false,
                });
            }
            if (showScenes) {
                const first = Math.max(0, activeIndex - range);
                const last = Math.min(games.length, activeIndex + range + 1);
                for (let index = first; index < last; index += 1) {
                    const key = getCarouselGameKey(games[index]);
                    const entry = [...next.values()].find(
                        (item) => item.gameKey === key,
                    );
                    if (entry && !entry.started)
                        update(entry.id, { ...entry, started: true });
                }
            }
            return next;
        });
    }, [allGames, games, activeIndex, range, showScenes]);

    const onPrepared = useCallback(
        (id, error) => {
            setEntries((previous) => {
                const next = new Map(previous);
                next.set(id, { ...previous.get(id), started: true });
                return next;
            });
            setPrepared((previous) => new Set(previous).add(id));
            if (error) {
                console.error(`Preview preparation failed: ${id}`, error);
                store.setState((state) => ({
                    errors: [...state.errors, { id, message: error.message }],
                }));
            }
        },
        [store],
    );

    useEffect(() => {
        if (!loading) return;
        store.setState({ completed: prepared.size, total: entries.size });
        if (warmingEntry) return;
        // Metadata may add another instance in the same commit as the final
        // completed preview. Let that update commit before ending the queue.
        const frame = window.requestAnimationFrame(() => {
            const latest = latestQueue.current;
            const queued = [...latest.entries.values()];
            const unprepared = queued.some(
                (entry) => !latest.prepared.has(entry.id),
            );
            const unbound = [...latest.allGames, ...latest.games].some(
                (game) =>
                    hasRetainedPreview(game) &&
                    !queued.some(
                        (entry) => entry.gameKey === getCarouselGameKey(game),
                    ),
            );
            if (
                !unprepared &&
                !unbound &&
                store.getState().status === "loading"
            ) {
                store.setState({
                    status: "finishing",
                    current: "",
                    phase: "Finishing up",
                });
            }
        });
        return () => window.cancelAnimationFrame(frame);
    }, [loading, entries, prepared, warmingEntry, store]);

    return (
        <>
            {[...entries.values()].map((entry) => {
                const current = entry.gameKey
                    ? currentGames.get(entry.gameKey)
                    : currentNames.get(entry.game.name);
                const index = current?.index ?? -1;
                const warming = warmingEntry?.id === entry.id;
                const visible =
                    showScenes &&
                    index >= 0 &&
                    Math.abs(activeIndex - index) <= range;
                if (!entry.started && !warming && !visible) return null;
                return (
                    <RetainedPreview
                        key={entry.id}
                        id={entry.id}
                        game={current?.game ?? entry.game}
                        index={index}
                        warming={warming}
                        onPrepared={onPrepared}
                    />
                );
            })}
            <FinishLoading />
        </>
    );
}

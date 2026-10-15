import {
    memo,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal, useThree } from "@react-three/fiber";
import { Group } from "three";
import { useStore } from "@/components/hooks/useStore";
import RenderUniqueGameScene from "./RenderUniqueGameScene";
import { getCarouselGameKey, hasRetainedPreview } from "./previewRegistry";
import DeferredPreview from "./Games/shared/DeferredPreview";
import {
    PreviewActivityProvider,
    usePreviewFrame,
    usePreviewVisible,
} from "./Games/shared/PreviewActivity";

function PreviewTransform({ game, index, active }) {
    const group = useRef();
    const visible = usePreviewVisible();
    const setEvents = useThree((state) => state.setEvents);
    useLayoutEffect(() => {
        setEvents({ enabled: visible });
    }, [setEvents, visible]);
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
            position={[15 + index * 10, -0.5, 0]}
            rotation={[0, -Math.PI / 2, 0]}
        >
            <group ref={group}>
                <group position={[0, -1, 0]}>
                    <PreviewActivityProvider active={active}>
                        <DeferredPreview>
                            <RenderUniqueGameScene game={game} />
                        </DeferredPreview>
                    </PreviewActivityProvider>
                </group>
            </group>
        </group>
    );
}

const RetainedPreview = memo(function RetainedPreview({ game, index }) {
    const visible = useStore(
        (state) =>
            index >= 0 &&
            Math.abs(state.activeGameIndex - index) <=
                state.renderUniqueGameSceneRange,
    );
    const active = useStore(
        (state) => index >= 0 && state.activeGameIndex === index,
    );
    const scene = useThree((state) => state.scene);
    const [container] = useState(() => new Group());

    useLayoutEffect(() => {
        container.visible = visible;
        if (!visible) return;
        scene.add(container);
        return () => {
            scene.remove(container);
        };
    }, [scene, container, visible]);

    // A hidden group still participates in Three's matrix traversal. Detach
    // its portal container as well, retaining React/model instances without
    // updating hundreds of offscreen meshes and bones every rendered frame.
    return createPortal(
        <PreviewActivityProvider
            active={visible}
            visible={visible}
        >
            {/* Only the card-scale transition runs for visible neighbours. All
                animation, physics and water inside the scene use the inner flag. */}
            <PreviewTransform
                game={game}
                index={index}
                active={active && visible}
            />
        </PreviewActivityProvider>,
        container,
        { events: { enabled: visible } },
    );
});

export default function RetainedGameScenes({ games }) {
    const activeIndex = useStore((state) => state.activeGameIndex);
    const range = useStore((state) => state.renderUniqueGameSceneRange);
    const [visited, setVisited] = useState(() => new Map());
    const currentGames = useMemo(
        () =>
            new Map(
                games?.map((game, index) => [
                    getCarouselGameKey(game),
                    { game, index },
                ]),
            ),
        [games],
    );

    useEffect(() => {
        setVisited((previous) => {
            let next = previous;
            const first = Math.max(0, activeIndex - range);
            const last = Math.min(games?.length ?? 0, activeIndex + range + 1);
            for (let index = first; index < last; index++) {
                const game = games[index];
                const key = getCarouselGameKey(game);
                if (!hasRetainedPreview(game) || previous.has(key)) continue;
                if (next === previous) next = new Map(previous);
                next.set(key, game);
            }
            return next;
        });
    }, [games, activeIndex, range]);

    // Kept outside the virtualized card list so leaving that list cannot
    // destroy CSG geometry, procedural textures, skeletons or physics worlds.
    // Filtering also hides entries without discarding already loaded models.
    return Array.from(visited, ([key, cachedGame]) => {
        const current = currentGames.get(key);
        return (
            <RetainedPreview
                key={key}
                game={current?.game ?? cachedGame}
                index={current?.index ?? -1}
            />
        );
    });
}

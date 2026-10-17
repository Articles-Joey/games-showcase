import { useProgress } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useCanvasLoadingStore } from "../CanvasLoadingContext";
import { usePreviewFrame } from "./Games/shared/PreviewActivity";
import { getPreviewWorkState } from "./Games/shared/DeferredPreview";
import { previewGraphState, warmPreview } from "./warmPreview";

const SETTLE_MS = 300;
const LOAD_TIMEOUT_MS = 120000;

export default function PreviewWarmup({
    id,
    name,
    enabled,
    visible,
    container,
    stage,
    tracker,
    onPrepared,
}) {
    const renderer = useThree((state) => state.gl);
    const mainCamera = useThree((state) => state.camera);
    const loadingStore = useCanvasLoadingStore();
    const run = useRef(null);

    useEffect(() => {
        if (!enabled) return;
        const current = {
            cancelled: false,
            busy: false,
            done: false,
            started: performance.now(),
            stableSince: 0,
            signature: "",
            revision: -1,
        };
        run.current = current;
        loadingStore.setState({ current: name, phase: "Loading scene" });
        return () => {
            current.cancelled = true;
            run.current = null;
        };
    }, [enabled, visible, id, name, loadingStore]);

    usePreviewFrame(
        () => {
            const current = run.current;
            if (!enabled || !current || current.cancelled || current.done)
                return;
            const now = performance.now();
            const finish = (error) => {
                if (current.cancelled || current.done) return;
                current.done = true;
                onPrepared(id, error);
            };
            if (tracker.error) {
                finish(tracker.error);
                return;
            }
            if (now - current.started > LOAD_TIMEOUT_MS) {
                finish(new Error(`Timed out preparing ${name}`));
                return;
            }
            if (current.busy) return;
            const work = getPreviewWorkState();
            if (
                !tracker.committed ||
                tracker.pending.size ||
                work.pending ||
                useProgress.getState().active
            ) {
                current.stableSince = 0;
                return;
            }
            const graph = previewGraphState(container);
            const revision = `${tracker.revision}:${work.revision}`;
            if (graph.textPending) {
                current.stableSince = 0;
                return;
            }
            if (
                !current.stableSince ||
                current.signature !== graph.signature ||
                current.revision !== revision
            ) {
                current.signature = graph.signature;
                current.revision = revision;
                current.stableSince = now;
                return;
            }
            if (now - current.stableSince < SETTLE_MS) return;

            // After skipping, visible previews already get real canvas draws. Keep
            // them onscreen and let those draws prepare their GPU resources.
            if (visible) {
                finish();
                return;
            }

            current.busy = true;
            loadingStore.setState({ phase: "Preparing scene" });
            const camera = mainCamera.clone();
            const x = container.children[0]?.position.x ?? 15;
            camera.position.set(x - 1, 8, 19);
            camera.lookAt(x - 1, 2, 0);
            warmPreview(
                renderer,
                stage,
                camera,
                () => current.cancelled || current.done,
            )
                .then(() => {
                    if (current.cancelled || current.done) return;
                    const after = previewGraphState(container);
                    const queued = getPreviewWorkState();
                    // Late textures, glyphs, or deferred children need the same GPU pass.
                    if (
                        tracker.pending.size ||
                        queued.pending ||
                        useProgress.getState().active ||
                        after.textPending ||
                        after.signature !== current.signature ||
                        `${tracker.revision}:${queued.revision}` !== revision
                    ) {
                        current.busy = false;
                        current.stableSince = 0;
                        return;
                    }
                    finish();
                })
                .catch(finish);
        },
        0,
        enabled,
    );

    return null;
}

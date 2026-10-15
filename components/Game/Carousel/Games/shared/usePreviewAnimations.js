import { useEffect, useMemo, useState } from "react";
import { AnimationMixer } from "three";
import { usePreviewFrame } from "./PreviewActivity";

// Keep mixers and their current actions alive, but do no mixing for inactive items.
export default function usePreviewAnimations(clips, root) {
    const [mixer] = useState(() => new AnimationMixer(null));
    const actions = useMemo(() => {
        const result = {};
        for (const clip of clips) {
            Object.defineProperty(result, clip.name, {
                enumerable: true,
                get() {
                    const target = root?.isObject3D ? root : root?.current;
                    return target ? mixer.clipAction(clip, target) : undefined;
                },
            });
        }
        return result;
    }, [clips, root, mixer]);

    usePreviewFrame((_, delta) => {
        mixer.update(delta);
    });

    useEffect(() => {
        const target = root?.isObject3D ? root : root?.current;
        return () => {
            mixer.stopAllAction();
            if (target) mixer.uncacheRoot(target);
        };
    }, [clips, root, mixer]);

    return { actions, mixer };
}

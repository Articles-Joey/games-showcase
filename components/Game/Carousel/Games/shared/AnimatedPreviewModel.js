import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import usePreviewAnimations from "./usePreviewAnimations";

export default function AnimatedPreviewModel({
    url,
    action = "Walk",
    ...props
}) {
    const group = useRef();
    const { scene, animations } = useGLTF(url);
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const clips = useMemo(() => {
        const clip = animations.find((clip) => clip.name === action);
        return clip ? [clip] : [];
    }, [animations, action]);
    const { actions, mixer } = usePreviewAnimations(clips, group);

    useEffect(() => {
        const animation = actions[action];
        if (!animation) return;
        animation.reset();
        animation.time = Math.random() * animation.getClip().duration;
        animation.play();
        mixer.update(0);
        return () => animation.stop();
    }, [actions, action, mixer]);

    return (
        <group
            ref={group}
            {...props}
            dispose={null}
        >
            <primitive object={clone} />
        </group>
    );
}

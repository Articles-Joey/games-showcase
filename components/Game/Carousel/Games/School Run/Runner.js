import { useGLTF } from "@react-three/drei";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { SkeletonUtils } from "three-stdlib";
import { usePreviewFrame } from "../shared/PreviewActivity";
import usePreviewAnimations from "../shared/usePreviewAnimations";
import BlobShadow from "./BlobShadow";
import StaticModel from "./StaticModel";
import { MODEL_URLS } from "./previewLayout";

function RunningModel({ visual }) {
    const { scene, animations } = useGLTF(MODEL_URLS.hoodie);
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { actions, mixer } = usePreviewAnimations(animations, clone);

    useLayoutEffect(() => {
        const clip =
            animations.find(({ name }) => name === "CharacterArmature|Run") ||
            animations.find(({ name }) => /run/i.test(name));
        const action = clip && actions[clip.name];
        if (!action) return;
        action.reset().play();
        // Show a running pose even if this preview first loads as a paused neighbor.
        mixer.update(0.16);
        return () => action.stop();
    }, [actions, animations, mixer]);

    return (
        <primitive
            ref={visual}
            object={clone}
            rotation={[0, Math.PI, 0]}
            dispose={null}
        />
    );
}

export default function Runner({ time }) {
    const runner = useRef();
    const visual = useRef();
    const hands = useRef();

    function pose() {
        const phase = time.current * 0.75;
        if (runner.current) runner.current.position.x = Math.sin(phase) * 2;
        if (visual.current) {
            visual.current.rotation.y = Math.PI + Math.cos(phase) * 0.14;
            visual.current.rotation.z = -Math.cos(phase) * 0.04;
        }
        if (hands.current) {
            hands.current.position.y = 0.55 + Math.sin(time.current * 5) * 0.08;
            hands.current.rotation.x = Math.sin(time.current * 2.5) * 0.06;
        }
    }
    useLayoutEffect(pose, [time]);
    usePreviewFrame(pose);

    return (
        <group
            ref={runner}
            position={[0, 0, 1]}
        >
            <BlobShadow
                position={[0, 0.02, 0]}
                size={1.1}
                opacity={0.6}
            />
            <Suspense fallback={null}>
                <RunningModel visual={visual} />
            </Suspense>
            <group
                ref={hands}
                position={[0, 0.55, 2.4]}
            >
                <Suspense fallback={null}>
                    <StaticModel
                        model="hand"
                        position={[-0.18, 0, 0]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={0.1}
                    />
                    <StaticModel
                        model="hand"
                        position={[0.18, 0, 0]}
                        rotation={[0, Math.PI / 2, 0]}
                        scale={[0.1, 0.1, -0.1]}
                    />
                </Suspense>
            </group>
        </group>
    );
}

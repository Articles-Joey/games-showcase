import { useMemo, useRef } from "react";
import { usePreviewActive, usePreviewFrame } from "../shared/PreviewActivity";
import { Object3D, Vector3 } from "three";

export default function Searchlight() {
    const active = usePreviewActive();
    const group = useRef();
    const nextMove = useRef(0);
    const destination = useMemo(() => new Vector3(0, 0.04, 0), []);
    const lightTarget = useMemo(() => new Object3D(), []);

    usePreviewFrame((_, delta, elapsed) => {
        if (!group.current) return;
        if (elapsed >= nextMove.current) {
            destination.set(
                Math.random() * 26 - 13,
                0.04,
                Math.random() * 26 - 13,
            );
            nextMove.current = elapsed + 2 + Math.random() * 3;
        }
        group.current.position.lerp(destination, 1 - Math.exp(-delta * 0.8));
    });

    return (
        <group
            ref={group}
            position={[0, 0.04, 0]}
        >
            <spotLight
                visible={active}
                position={[0, 20, -20]}
                target={lightTarget}
                intensity={35}
                distance={7}
                angle={0.2}
                penumbra={0.5}
            />
            <primitive object={lightTarget} />
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[5, 40]} />
                <meshBasicMaterial
                    color="white"
                    transparent
                    opacity={0.4}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

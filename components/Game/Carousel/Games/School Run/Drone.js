import { useLayoutEffect, useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";

const ROTORS = [
    [-0.3, 0, -0.3],
    [0.3, 0, -0.3],
    [-0.3, 0, 0.3],
    [0.3, 0, 0.3],
];

export default function Drone({ time }) {
    const body = useRef();
    const blades = useRef([]);
    function pose() {
        const elapsed = time.current;
        if (body.current) {
            body.current.position.y = 1.5 + Math.sin(elapsed * 2.4) * 0.15;
            body.current.rotation.z = Math.cos(elapsed * 2) * 0.1;
        }
        blades.current.forEach((blade, index) => {
            if (blade) blade.rotation.y = elapsed * (index % 2 ? -28 : 28);
        });
    }
    useLayoutEffect(pose, [time]);
    usePreviewFrame(pose);

    return (
        <group
            ref={body}
            position={[0, 1.5, 0]}
        >
            <mesh>
                <boxGeometry args={[0.25, 0.1, 0.25]} />
                <meshStandardMaterial
                    color="#222"
                    metalness={0.8}
                    roughness={0.3}
                />
            </mesh>
            {ROTORS.map((position, index) => (
                <group
                    key={index}
                    position={position}
                >
                    <group
                        ref={(blade) => {
                            blades.current[index] = blade;
                        }}
                    >
                        <mesh rotation={[0, Math.PI / 4, 0]}>
                            <boxGeometry args={[0.28, 0.03, 0.03]} />
                            <meshStandardMaterial color="#444" />
                        </mesh>
                    </group>
                    <mesh position={[0, 0.03, 0]}>
                        <cylinderGeometry args={[0.1, 0.1, 0.02, 8]} />
                        <meshStandardMaterial
                            color="#555"
                            metalness={0.6}
                        />
                    </mesh>
                </group>
            ))}
            <mesh position={[0, -0.08, 0.1]}>
                <sphereGeometry args={[0.035, 8, 8]} />
                <meshStandardMaterial
                    color="red"
                    emissive="red"
                    emissiveIntensity={1}
                />
            </mesh>
        </group>
    );
}

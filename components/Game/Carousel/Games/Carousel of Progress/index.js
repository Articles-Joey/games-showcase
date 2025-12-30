import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils";

export default function CarouselOfProgressScene() {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2;
        }
    });

    const radius = 5;
    const wallHeight = 2.5;
    const wallThickness = 0.2;

    return (
        <group ref={groupRef} position={[3, 0.5, 0]}>
            {/* Base */}
            <mesh rotation={[0, 0, 0]}>
                <cylinderGeometry args={[radius, radius, 0.2, 64]} />
                <meshStandardMaterial color="#555" />
            </mesh>

            {/* Walls */}
            {Array.from({ length: 6 }).map((_, i) => {
                const angle = degToRad(i * 60);
                return (
                    <mesh
                        key={i}
                        position={[
                            (radius / 2) * Math.cos(angle),
                            wallHeight / 2,
                            -(radius / 2) * Math.sin(angle)
                        ]}
                        rotation={[0, angle, 0]}
                    >
                        <boxGeometry args={[radius, wallHeight, wallThickness]} />
                        <meshStandardMaterial color="#999" />
                    </mesh>
                );
            })}
        </group>
    );
}
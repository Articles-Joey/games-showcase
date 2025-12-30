import { useMemo } from "react";

export default function TowerBlocksScene() {
    const cubes = useMemo(() => {
        const items = [];
        let height = 0;

        for (let i = 0; i < 8; i++) {
            const scale = [
                0.8 + Math.random() * 0.4,
                0.8 + Math.random() * 0.4,
                0.8 + Math.random() * 0.4
            ];

            const position = [
                (Math.random() - 0.5) * 0.5,
                height + scale[1] / 2,
                (Math.random() - 0.5) * 0.5
            ];

            height += scale[1];

            items.push({
                position,
                scale,
                color: `hsl(${Math.random() * 360}, 70%, 50%)`
            });
        }
        return items;
    }, []);

    return (
        <group position={[3, 0.5, 0]}>
            {cubes.map((cube, i) => (
                <mesh key={i} position={cube.position} scale={cube.scale}>
                    <boxGeometry />
                    <meshStandardMaterial color={cube.color} />
                </mesh>
            ))}
        </group>
    );
}
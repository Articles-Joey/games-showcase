const WALLS = [
    [-40, -50, 0],
    [40, -50, 0],
    [-40, 50, 0],
    [40, 50, 0],
    [-50, -40, Math.PI / 2],
    [-50, 40, Math.PI / 2],
    [50, -40, Math.PI / 2],
    [50, 40, Math.PI / 2],
];

export default function Board() {
    return (
        <group>
            <mesh receiveShadow>
                <boxGeometry args={[100, 0.5, 100]} />
                <meshStandardMaterial
                    color="#08e8de"
                    roughness={0.35}
                />
            </mesh>
            {[
                { inner: 3, outer: 5, color: "gold" },
                { inner: 6, outer: 8, color: "white" },
            ].map(({ inner, outer, color }) => (
                <mesh
                    key={inner}
                    position={[0, 0.28, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <ringGeometry args={[inner, outer, 32]} />
                    <meshStandardMaterial color={color} />
                </mesh>
            ))}
            {WALLS.map(([x, z, rotation], index) => (
                <mesh
                    key={index}
                    position={[x, 1, z]}
                    rotation={[0, rotation, 0]}
                >
                    <boxGeometry args={[20, 2, 1]} />
                    <meshStandardMaterial
                        color="gray"
                        roughness={0.85}
                    />
                </mesh>
            ))}
        </group>
    );
}

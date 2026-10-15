import CardStack from "./CardStack";
import Ashtray from "./Ashtray";

function ChipStack({ position, color, count }) {
    return (
        <group position={position}>
            {Array.from({ length: count }, (_, index) => (
                <group
                    key={index}
                    position={[0, index * 0.07, 0]}
                >
                    <mesh>
                        <cylinderGeometry args={[0.23, 0.23, 0.065, 32]} />
                        <meshStandardMaterial
                            color={color}
                            roughness={0.55}
                        />
                    </mesh>
                    <mesh
                        position={[0, 0.034, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    >
                        <ringGeometry args={[0.15, 0.17, 32]} />
                        <meshStandardMaterial color="#eee4c6" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

export default function Table() {
    return (
        <group>
            <mesh
                position={[0, -0.16, 0]}
                scale={[4.35, 1, 2.95]}
            >
                <cylinderGeometry args={[1, 1, 0.38, 96]} />
                <meshStandardMaterial
                    color="#35251f"
                    roughness={0.75}
                />
            </mesh>
            <mesh
                position={[0, 0.015, 0]}
                scale={[4.08, 1, 2.68]}
            >
                <cylinderGeometry args={[1, 1, 0.1, 96]} />
                <meshStandardMaterial
                    color="#126047"
                    roughness={0.95}
                />
            </mesh>
            <mesh
                position={[0, 0.071, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[3.8, 2.4, 1]}
            >
                <ringGeometry args={[0.985, 1, 96]} />
                <meshStandardMaterial
                    color="#c5a66a"
                    roughness={0.7}
                />
            </mesh>
            <ChipStack
                position={[-3.1, 0.105, 0.5]}
                color="#ba3746"
                count={4}
            />
            <ChipStack
                position={[-2.65, 0.105, 0.8]}
                color="#e5d5ae"
                count={3}
            />
            <ChipStack
                position={[3.1, 0.105, 0]}
                color="#305cba"
                count={5}
            />
            <CardStack position={[2.8, 0.07, -1.2]} />
            <Ashtray
                position={[-2.65, 0.07, -0.15]}
                rotation={[0, 0.35, 0]}
                reducedMotion
            />
        </group>
    );
}

import { useMemo } from "react";
import { BOARD_SIZE, CELL_SIZE } from "./previewLayout";

export default function GameGrid() {
    const lines = useMemo(() => {
        const vertices = [];
        for (let index = 0; index <= BOARD_SIZE; index++) {
            const offset = -BOARD_SIZE + index * CELL_SIZE;
            vertices.push(
                -BOARD_SIZE,
                0.025,
                offset,
                BOARD_SIZE,
                0.025,
                offset,
            );
            vertices.push(
                offset,
                0.025,
                -BOARD_SIZE,
                offset,
                0.025,
                BOARD_SIZE,
            );
        }
        return new Float32Array(vertices);
    }, []);

    return (
        <group>
            <mesh
                position={[0, -0.06, 0]}
                receiveShadow
            >
                <boxGeometry
                    args={[
                        BOARD_SIZE * CELL_SIZE,
                        0.12,
                        BOARD_SIZE * CELL_SIZE,
                    ]}
                />
                <meshBasicMaterial color="black" />
            </mesh>
            {/* One line buffer replaces a separate Drei Line for every cell. */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[lines, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color="cyan"
                    transparent
                    opacity={0.65}
                    toneMapped={false}
                />
            </lineSegments>
        </group>
    );
}

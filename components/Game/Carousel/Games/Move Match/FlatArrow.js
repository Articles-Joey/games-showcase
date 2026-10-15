import { memo } from "react";
import { DoubleSide } from "three";

// The same shaft and two angled head pieces as Move Match's FlatArrow.
function FlatArrow({ color = "blue", ...props }) {
    return (
        <group {...props}>
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.1, 0]}
            >
                <planeGeometry args={[0.4, 1]} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={0.5}
                    depthWrite={false}
                    side={DoubleSide}
                />
            </mesh>
            <mesh
                rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
                position={[-0.212, 0.1, 0.2]}
            >
                <planeGeometry args={[1, 0.4]} />
                <meshStandardMaterial
                    color={color}
                    side={DoubleSide}
                />
            </mesh>
            <mesh
                rotation={[-Math.PI / 2, 0, Math.PI / 4]}
                position={[0.212, 0.1, 0.2]}
            >
                <planeGeometry args={[1, 0.4]} />
                <meshStandardMaterial
                    color={color}
                    side={DoubleSide}
                />
            </mesh>
        </group>
    );
}

export default memo(FlatArrow);

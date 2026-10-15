import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Box3, Vector3 } from "three";

export function ModelWheel(props) {
    const { nodes, materials } = useGLTF(
        "/models/ice-slide/Wheel-transformed.glb",
    );
    return (
        <group
            {...props}
            dispose={null}
        >
            <mesh
                geometry={nodes.Wheel.geometry}
                material={materials["Atlas.037"]}
                scale={100}
            />
        </group>
    );
}

export function ModelBoat({ size = 28, ...props }) {
    const { nodes, materials } = useGLTF(
        "/models/ice-slide/Boat-transformed.glb",
    );
    const layout = useMemo(() => {
        const bounds = new Box3().setFromBufferAttribute(
            nodes.Boat.geometry.attributes.position,
        );
        const dimensions = bounds.getSize(new Vector3());
        const center = bounds.getCenter(new Vector3());
        // Fit the complete footprint in a circle, regardless of the GLB's
        // original authoring units, and put the hull slightly below the water.
        const scale =
            size / Math.max(Math.hypot(dimensions.x, dimensions.z), 0.001);
        return {
            scale,
            offset: [
                -center.x * scale,
                -bounds.min.y * scale - 2.8,
                -center.z * scale,
            ],
        };
    }, [nodes, size]);
    return (
        <group
            {...props}
            dispose={null}
        >
            <mesh
                geometry={nodes.Boat.geometry}
                material={materials.lambert3SG}
                scale={layout.scale}
                position={layout.offset}
            />
        </group>
    );
}

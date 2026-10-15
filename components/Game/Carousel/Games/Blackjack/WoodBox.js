"use client";

import { useLayoutEffect, useRef } from "react";
import { Matrix4 } from "three";

export function WoodBoxInstances({
    positions,
    size,
    texture,
    color = "#d5b18a",
}) {
    const mesh = useRef();
    useLayoutEffect(() => {
        const matrix = new Matrix4();
        positions.forEach((position, index) => {
            mesh.current.setMatrixAt(
                index,
                matrix.makeTranslation(...position),
            );
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        mesh.current.computeBoundingSphere();
    }, [positions]);

    return (
        <instancedMesh
            ref={mesh}
            args={[null, null, positions.length]}
            receiveShadow
        >
            <boxGeometry args={size} />
            <meshStandardMaterial
                key={texture?.uuid ?? "plain"}
                color={color}
                map={texture}
                bumpMap={texture}
                bumpScale={0.025}
                roughness={0.72}
            />
        </instancedMesh>
    );
}

export default function WoodBox({
    position,
    size,
    texture,
    color = "#d5b18a",
    castShadow = false,
    roughness = 0.72,
    bumpScale = 0.025,
    renderOrder = 0,
}) {
    return (
        <mesh
            position={position}
            renderOrder={renderOrder}
            castShadow={castShadow}
            receiveShadow
        >
            <boxGeometry args={size} />
            <meshStandardMaterial
                key={texture?.uuid ?? "plain"}
                color={color}
                map={texture}
                bumpMap={texture}
                bumpScale={bumpScale}
                roughness={roughness}
            />
        </mesh>
    );
}

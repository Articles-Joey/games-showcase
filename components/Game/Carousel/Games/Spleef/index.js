import { useLayoutEffect, useRef, useMemo } from "react";
import { DynamicDrawUsage, MathUtils, Object3D } from "three";
import { usePreviewFrame } from "../shared/PreviewActivity";

function SpleefLayer({ y, color }) {
    const mesh = useRef();
    const transform = useMemo(() => {
        const object = new Object3D();
        object.rotation.y = Math.PI / 6;
        return object;
    }, []);
    const tiles = useMemo(() => {
        const items = [];
        const rows = 8;
        const cols = 8;
        const radius = 0.5;
        // Pointy top orientation (points along Z)
        // Width (X) = sqrt(3) * r
        // Height (Z) = 2 * r
        // Spacing X = sqrt(3) * r
        // Spacing Z = 1.5 * r
        const xStep = Math.sqrt(3) * radius;
        const zStep = 1.5 * radius;

        for (let j = -rows / 2; j < rows / 2; j++) {
            for (let i = -cols / 2; i < cols / 2; i++) {
                const x = i * xStep + (j % 2 !== 0 ? xStep / 2 : 0);
                const z = j * zStep;
                items.push({
                    position: [x, 0, z],
                    visible: true,
                    cooldown: 0,
                    scale: 1,
                });
            }
        }
        return items;
    }, []);

    useLayoutEffect(() => {
        const instances = mesh.current;
        if (!instances) return;
        instances.instanceMatrix.setUsage(DynamicDrawUsage);
        tiles.forEach((tile, index) => {
            transform.position.fromArray(tile.position);
            transform.scale.set(tile.scale, 1, tile.scale);
            transform.updateMatrix();
            instances.setMatrixAt(index, transform.matrix);
        });
        instances.instanceMatrix.needsUpdate = true;
        instances.computeBoundingSphere();
    }, [tiles, transform]);

    usePreviewFrame((_, delta) => {
        const instances = mesh.current;
        if (!instances) return;
        const alpha = 1 - Math.exp(-5 * delta);
        const disappearChance = 1 - Math.exp(-0.12 * delta);
        let changed = false;
        tiles.forEach((tile, index) => {
            if (tile.visible) {
                if (Math.random() < disappearChance) {
                    tile.visible = false;
                    tile.cooldown = 2 + Math.random() * 3;
                }
            } else {
                tile.cooldown -= delta;
                if (tile.cooldown <= 0) tile.visible = true;
            }
            const target = tile.visible ? 1 : 0;
            const next =
                Math.abs(tile.scale - target) < 0.001
                    ? target
                    : MathUtils.lerp(tile.scale, target, alpha);
            if (next === tile.scale) return;
            tile.scale = next;
            transform.position.fromArray(tile.position);
            transform.scale.set(next, 1, next);
            transform.updateMatrix();
            instances.setMatrixAt(index, transform.matrix);
            changed = true;
        });
        if (changed) instances.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={mesh}
            args={[null, null, tiles.length]}
            position={[0, y, 0]}
        >
            <cylinderGeometry args={[0.45, 0.45, 0.2, 6]} />
            <meshStandardMaterial color={color} />
        </instancedMesh>
    );
}

export default function SpleefScene() {
    return (
        <group position={[4, 3, 0]}>
            <SpleefLayer
                y={0}
                color="#ff6b6b"
            />
            <SpleefLayer
                y={-0.5}
                color="#4ecdc4"
            />
            <SpleefLayer
                y={-1.0}
                color="#ffe66d"
            />
            <SpleefLayer
                y={-1.5}
                color="#1a535c"
            />
        </group>
    );
}

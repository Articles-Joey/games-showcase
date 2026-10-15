import { useGLTF } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box3, Object3D, Vector3 } from "three";

const TREE_URL = `${process.env.NEXT_PUBLIC_CDN}games/Death Race/Tree.gltf`;
const ROCK_URL = `${process.env.NEXT_PUBLIC_CDN}games/Assets/J-Toastie/Models/Rock.glb`;

function BorderInstances({ source, material, items }) {
    const mesh = useRef();
    const geometry = useMemo(() => {
        const result = source.clone();
        const bounds = new Box3().setFromBufferAttribute(
            result.attributes.position,
        );
        const center = bounds.getCenter(new Vector3());
        const height = Math.max(bounds.max.y - bounds.min.y, 0.001);
        result.translate(-center.x, -bounds.min.y, -center.z);
        result.scale(1 / height, 1 / height, 1 / height);
        return result;
    }, [source]);
    useEffect(() => () => geometry.dispose(), [geometry]);
    useLayoutEffect(() => {
        const transform = new Object3D();
        items.forEach(({ position, scale, rotation }, index) => {
            transform.position.set(...position);
            transform.scale.set(...scale);
            transform.rotation.set(0, rotation, 0);
            transform.updateMatrix();
            mesh.current.setMatrixAt(index, transform.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        mesh.current.computeBoundingSphere();
    }, [items, geometry]);

    return (
        <instancedMesh
            ref={mesh}
            args={[geometry, material, items.length]}
            castShadow
            receiveShadow
        />
    );
}

export default function Scenery() {
    const trees = useGLTF(TREE_URL);
    const rocks = useGLTF(ROCK_URL);
    const [treeItems] = useState(() =>
        [-1, 1].flatMap((side) =>
            Array.from({ length: 7 }, (_, index) => {
                const height = 13 + Math.random() * 6;
                return {
                    position: [
                        side * (29 + (index % 2) * 4),
                        -0.2,
                        -36 + index * 11,
                    ],
                    scale: [height, height, height],
                    rotation: Math.random() * Math.PI * 2,
                };
            }),
        ),
    );
    const [rockItems] = useState(() =>
        [-1, 1].flatMap((side) =>
            Array.from({ length: 4 }, (_, index) => {
                const height = 3 + Math.random() * 3;
                return {
                    position: [side * 36, -0.2, -28 + index * 19],
                    scale: [height * 1.3, height, height * 1.1],
                    rotation: Math.random() * Math.PI * 2,
                };
            }),
        ),
    );

    return (
        <>
            <BorderInstances
                source={trees.nodes["tree-spruce"].geometry}
                material={trees.materials.color_main}
                items={treeItems}
            />
            <BorderInstances
                source={rocks.nodes.Rock_Cube.geometry}
                material={rocks.materials.Stone}
                items={rockItems}
            />
        </>
    );
}

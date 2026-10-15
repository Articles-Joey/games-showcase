import { useGLTF } from "@react-three/drei";
import { memo, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { PERGOLA_URL } from "./layout";

function PergolaInstances({ geometry, material }) {
    const mesh = useRef();
    useLayoutEffect(() => {
        const matrix = new Matrix4();
        const rotation = new Quaternion();
        for (let index = 0; index < 4; index += 1) {
            rotation.setFromAxisAngle(
                new Vector3(0, 1, 0),
                (index * Math.PI) / 2,
            );
            matrix.compose(new Vector3(), rotation, new Vector3(3, 3, 3));
            mesh.current.setMatrixAt(index, matrix);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
        mesh.current.computeBoundingSphere();
    }, [geometry]);
    useEffect(() => {
        const object = mesh.current;
        return () => object?.dispose();
    }, [geometry, material]);
    return (
        <instancedMesh
            ref={mesh}
            args={[geometry, material, 4]}
            dispose={null}
        />
    );
}

function Pergolas() {
    const { nodes } = useGLTF(PERGOLA_URL);
    const batches = useMemo(() => {
        // Preserve the game's authored origin, orientation, and 0.086 model scale.
        const placement = new Matrix4()
            .compose(
                new Vector3(-0.9, 0, -2),
                new Quaternion().setFromEuler(new Euler(-Math.PI, 0, 0)),
                new Vector3(0.086, 0.086, 0.086),
            )
            .multiply(new Matrix4().makeRotationX(Math.PI / 2));
        const groups = new Map();
        Object.entries(nodes).forEach(([name, node]) => {
            if (!node.isMesh || !/^Object_\d+_/.test(name)) return;
            const geometry = node.geometry.clone().applyMatrix4(placement);
            // Account for any differing attribute layouts without dropping model pieces.
            const attributes = Object.entries(geometry.attributes)
                .map(
                    ([key, attribute]) =>
                        `${key}:${attribute.itemSize}:${attribute.normalized}:${attribute.array.constructor.name}`,
                )
                .sort()
                .join("|");
            const key = `${node.material.uuid}:${Boolean(geometry.index)}:${attributes}`;
            if (!groups.has(key))
                groups.set(key, { material: node.material, parts: [] });
            groups.get(key).parts.push(geometry);
        });
        return [...groups.values()].flatMap(({ material, parts }) => {
            const geometry = mergeGeometries(parts);
            if (!geometry)
                return parts.map((part) => ({ geometry: part, material }));
            parts.forEach((part) => part.dispose());
            return [{ geometry, material }];
        });
    }, [nodes]);
    useEffect(
        () => () => batches.forEach(({ geometry }) => geometry.dispose()),
        [batches],
    );

    return batches.map(({ geometry, material }, index) => (
        <PergolaInstances
            key={index}
            geometry={geometry}
            material={material}
        />
    ));
}

export default memo(Pergolas);

import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { CylinderGeometry, RepeatWrapping, SRGBColorSpace } from "three";

// Same three-strand profile and spiral UVs as the game, using fewer vertices
// for a small preview. The mesh itself never deforms or rebuilds while swinging.
export default function RopeMesh({ length, radius }) {
    const source = useTexture("/img/jungle-vines/rope.svg");
    const texture = useMemo(() => {
        const map = source.clone();
        map.wrapS = map.wrapT = RepeatWrapping;
        map.colorSpace = SRGBColorSpace;
        map.repeat.set(1, length / (2 * Math.PI * radius));
        map.anisotropy = 4;
        map.needsUpdate = true;
        return map;
    }, [source, length, radius]);
    const geometry = useMemo(() => {
        const pitch = radius * 6;
        const radialSegments = 12;
        const heightSegments = Math.min(
            128,
            Math.max(1, Math.ceil((length / pitch) * 6)),
        );
        const result = new CylinderGeometry(
            radius,
            radius,
            length,
            radialSegments,
            heightSegments,
        );
        const vertices = result.attributes.position;
        const uv = result.attributes.uv;
        const sideVertexCount = (heightSegments + 1) * (radialSegments + 1);
        for (let index = 0; index < vertices.count; index++) {
            const x = vertices.getX(index);
            const y = vertices.getY(index);
            const z = vertices.getZ(index);
            const twist = (y / pitch) * Math.PI * 2;
            const angle = Math.atan2(x, z);
            const profile = 1 - 0.14 + 0.14 * Math.cos(3 * (angle - twist));
            vertices.setXYZ(index, x * profile, y, z * profile);
            if (index < sideVertexCount)
                uv.setX(index, 3 * (uv.getX(index) - y / pitch));
        }
        result.computeVertexNormals();
        return result;
    }, [length, radius]);
    useEffect(() => () => texture.dispose(), [texture]);
    useEffect(() => () => geometry.dispose(), [geometry]);

    return (
        <mesh
            position={[0, -length / 2, 0]}
            geometry={geometry}
            castShadow
            receiveShadow
        >
            <meshStandardMaterial
                map={texture}
                bumpMap={texture}
                bumpScale={radius * 0.035}
                roughness={0.95}
            />
        </mesh>
    );
}

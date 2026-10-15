import { memo, useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import {
    NoColorSpace,
    RepeatWrapping,
    SRGBColorSpace,
    TextureLoader,
} from "three";

const TEXTURE_URLS = [
    "/img/trash-chute/sand/GroundSand005_COL_2K.jpg",
    "/img/trash-chute/sand/GroundSand005_NRM_2K.jpg",
    "/img/trash-chute/sand/GroundSand005_AO_2K.jpg",
    "/img/trash-chute/wall/StoneBricksSplitface001_COL_2K.jpg",
    "/img/trash-chute/wall/StoneBricksSplitface001_NRM_2K.jpg",
    "/img/trash-chute/wall/StoneBricksSplitface001_AO_2K.jpg",
];

// The platforms, ramp and side walls use the original map dimensions.
const MAP_PARTS = [
    { size: [10, 0.25, 5], position: [0, 0, 0], material: "ground" },
    {
        size: [10, 0.25, 100],
        position: [0, 25, 43.5],
        rotation: [-Math.PI / 6, 0, 0],
        material: "sand",
    },
    { size: [10, 0.25, 15], position: [0, 49.98, 94.25], material: "ground" },
    { size: [0.1, 50, 100], position: [-5, 25, 50], material: "wall" },
    // { size: [0.1, 50, 100], position: [5, 25, 50], material: "wall" },
];

function ChuteMap() {
    const sources = useLoader(TextureLoader, TEXTURE_URLS);
    const textures = useMemo(
        () =>
            sources.map((source, index) => {
                const texture = source.clone();
                texture.wrapS = texture.wrapT = RepeatWrapping;
                texture.repeat.set(...(index < 3 ? [2, 20] : [10, 5]));
                texture.colorSpace =
                    index % 3 === 0 ? SRGBColorSpace : NoColorSpace;
                texture.anisotropy = 4;
                texture.needsUpdate = true;
                return texture;
            }),
        [sources],
    );

    useEffect(
        () => () => textures.forEach((texture) => texture.dispose()),
        [textures],
    );

    return MAP_PARTS.map(({ size, position, rotation, material }, index) => (
        <mesh
            key={index}
            position={position}
            rotation={rotation}
        >
            <boxGeometry args={size} />
            {material === "sand" ? (
                <meshStandardMaterial
                    map={textures[0]}
                    normalMap={textures[1]}
                    aoMap={textures[2]}
                />
            ) : material === "wall" ? (
                <meshStandardMaterial
                    map={textures[3]}
                    normalMap={textures[4]}
                    aoMap={textures[5]}
                    transparent
                    opacity={0.5}
                />
            ) : (
                <meshStandardMaterial color="gray" />
            )}
        </mesh>
    ));
}

export function MapColliders() {
    return (
        <RigidBody
            type="fixed"
            colliders={false}
            friction={0}
            restitution={0}
        >
            {MAP_PARTS.map(({ size, position, rotation }, index) => (
                <CuboidCollider
                    key={index}
                    args={size.map((length) => length / 2)}
                    position={position}
                    rotation={rotation}
                />
            ))}
        </RigidBody>
    );
}

export default memo(ChuteMap);

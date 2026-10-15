import { memo, useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import {
    LinearFilter,
    NoColorSpace,
    RepeatWrapping,
    SRGBColorSpace,
    TextureLoader,
} from "three";

function Ground({
    shape = "square",
    size = 70,
    radius = size / 2,
    height = 0.25,
}) {
    const textureSize = shape === "circle" ? radius * 2 : size;
    const [colorSource, normalSource] = useLoader(TextureLoader, [
        "/img/memory-game/Poliigon_GrassPatchyGround_4585_BaseColor.jpg",
        "/img/memory-game/Poliigon_GrassPatchyGround_4585_Normal.png",
    ]);
    const maps = useMemo(() => {
        const color = colorSource.clone();
        const normal = normalSource.clone();
        color.colorSpace = SRGBColorSpace;
        normal.colorSpace = NoColorSpace;
        for (const texture of [color, normal]) {
            texture.magFilter = LinearFilter;
            texture.wrapS = texture.wrapT = RepeatWrapping;
            texture.repeat.set(textureSize / 10, textureSize / 10);
            texture.anisotropy = 4;
            texture.needsUpdate = true;
        }
        return { color, normal };
    }, [colorSource, normalSource, textureSize]);
    useEffect(
        () => () => {
            maps.color.dispose();
            maps.normal.dispose();
        },
        [maps],
    );

    return (
        <group>
            <mesh position={[0, height - 0.12, 0]}>
                {shape === "circle" ? (
                    <cylinderGeometry args={[radius, radius, 0.24, 64]} />
                ) : (
                    <boxGeometry args={[size, 0.24, size]} />
                )}
                <meshStandardMaterial
                    color="#6d5137"
                    roughness={1}
                />
            </mesh>
            <mesh
                position={[0, height + 0.005, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
            >
                {shape === "circle" ? (
                    <circleGeometry args={[radius, 64]} />
                ) : (
                    <planeGeometry args={[size, size]} />
                )}
                <meshStandardMaterial
                    map={maps.color}
                    normalMap={maps.normal}
                    roughness={0.95}
                />
            </mesh>
        </group>
    );
}

export default memo(Ground);

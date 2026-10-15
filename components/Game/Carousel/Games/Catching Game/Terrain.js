import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import {
    LinearFilter,
    MeshStandardMaterial,
    NoColorSpace,
    RepeatWrapping,
    SRGBColorSpace,
    TextureLoader,
} from "three";
import { createTerrainGeometry, DEFAULT_TERRAIN } from "./terrainGeometry";
import { addShorelineBlend } from "./shorelineMaterial";

const SIZE = 62; // Stop one unit beyond each side of the 60-unit fence.
// These are the same Poliigon maps already used by the Memory Game preview.
const GRASS_MAPS = [
    "/img/memory-game/Poliigon_GrassPatchyGround_4585_BaseColor.jpg",
    "/img/memory-game/Poliigon_GrassPatchyGround_4585_Normal.png",
];

export default function Terrain() {
    const sources = useLoader(TextureLoader, GRASS_MAPS);
    const geometry = useMemo(
        () => createTerrainGeometry(SIZE, DEFAULT_TERRAIN, { detail: 1 }),
        [],
    );
    const textures = useMemo(
        () =>
            sources.map((source, index) => {
                const texture = source.clone();
                texture.colorSpace =
                    index === 0 ? SRGBColorSpace : NoColorSpace;
                texture.magFilter = LinearFilter;
                texture.wrapS = texture.wrapT = RepeatWrapping;
                texture.repeat.set(SIZE / 10, SIZE / 10);
                texture.needsUpdate = true;
                return texture;
            }),
        [sources],
    );
    const material = useMemo(
        () =>
            addShorelineBlend(
                new MeshStandardMaterial({
                    map: textures[0],
                    normalMap: textures[1],
                    roughness: 0.95,
                }),
                DEFAULT_TERRAIN,
            ),
        [textures],
    );

    useEffect(() => () => geometry.dispose(), [geometry]);
    useEffect(() => () => material.dispose(), [material]);
    useEffect(
        () => () => textures.forEach((texture) => texture.dispose()),
        [textures],
    );

    return (
        <mesh
            geometry={geometry}
            material={material}
        />
    );
}

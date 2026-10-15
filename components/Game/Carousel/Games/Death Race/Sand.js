import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { RepeatWrapping, SRGBColorSpace } from "three";

const SAND_URL = `${process.env.NEXT_PUBLIC_CDN}games/US Tycoon/Textures/GroundSand005/GroundSand005_COL_1K.jpg`;

export default function Sand() {
    const source = useTexture(SAND_URL);
    const texture = useMemo(() => {
        const map = source.clone();
        map.wrapS = map.wrapT = RepeatWrapping;
        map.repeat.set(5, 6);
        map.colorSpace = SRGBColorSpace;
        map.anisotropy = 4;
        map.needsUpdate = true;
        return map;
    }, [source]);
    useEffect(() => () => texture.dispose(), [texture]);

    return (
        <mesh
            position={[0, -0.2, -4]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
        >
            <planeGeometry args={[84, 116]} />
            <meshStandardMaterial
                map={texture}
                roughness={1}
            />
        </mesh>
    );
}

import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { usePreviewFrame } from "../shared/PreviewActivity";
import { RepeatWrapping, SRGBColorSpace, TextureLoader } from "three";

// Use the same art URLs as the original Assassin floor and lava.
const ART = `${process.env.NEXT_PUBLIC_CDN}games/Assassin/`;

export default function Arena() {
    const sources = useLoader(TextureLoader, [
        `${ART}rock.webp`,
        `${ART}lava.webp`,
    ]);
    const [rock, lava] = useMemo(
        () =>
            sources.map((source, index) => {
                const texture = source.clone();
                texture.wrapS = texture.wrapT = RepeatWrapping;
                texture.repeat.setScalar(index === 0 ? 20 : 64 / 3);
                texture.colorSpace = SRGBColorSpace;
                texture.needsUpdate = true;
                return texture;
            }),
        [sources],
    );

    useEffect(
        () => () => {
            rock.dispose();
            lava.dispose();
        },
        [rock, lava],
    );
    usePreviewFrame((_, delta) => {
        lava.offset.x = (lava.offset.x + delta * 0.2) % 1;
    });

    return (
        <>
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[40, 1, 40]} />
                {[0, 1, 2, 3, 4, 5].map((face) => (
                    <meshStandardMaterial
                        key={face}
                        attach={`material-${face}`}
                        map={face === 2 ? rock : null}
                        color={face === 2 ? "white" : "#444"}
                    />
                ))}
            </mesh>
            <mesh
                position={[0, -0.5, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <planeGeometry args={[64, 64]} />
                <meshStandardMaterial
                    map={lava}
                    emissiveMap={lava}
                    emissive="white"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </>
    );
}

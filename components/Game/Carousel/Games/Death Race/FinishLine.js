import { Text } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { PreviewSuspense as Suspense } from "../shared/PreviewLoadTracker";
import {
    DataTexture,
    DoubleSide,
    NearestFilter,
    RepeatWrapping,
    SRGBColorSpace,
} from "three";

export const START_Z = -28;
export const FINISH_Z = 35;

export default function FinishLine() {
    const checker = useMemo(() => {
        const texture = new DataTexture(
            new Uint8Array([
                255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255,
                255,
            ]),
            2,
            2,
        );
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(20, 1);
        texture.magFilter = texture.minFilter = NearestFilter;
        texture.colorSpace = SRGBColorSpace;
        texture.needsUpdate = true;
        return texture;
    }, []);
    useEffect(() => () => checker.dispose(), [checker]);

    return (
        <group>
            {/* One textured strip replaces the game's individual checker tiles. */}
            <mesh
                position={[0, -0.17, FINISH_Z]}
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <planeGeometry args={[40, 2]} />
                <meshStandardMaterial
                    map={checker}
                    roughness={0.9}
                />
            </mesh>
            <mesh
                position={[0, -0.17, START_Z]}
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <planeGeometry args={[36, 0.45]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {[-20, 20].map((x) => (
                <mesh
                    key={x}
                    position={[x, 3.8, FINISH_Z]}
                >
                    <cylinderGeometry args={[0.4, 0.4, 8, 8]} />
                    <meshStandardMaterial color="#181818" />
                </mesh>
            ))}
            <mesh position={[0, 6.4, FINISH_Z]}>
                <planeGeometry args={[40, 1.8]} />
                <meshStandardMaterial
                    color="#c82f31"
                    side={DoubleSide}
                />
            </mesh>
            <Suspense fallback={null}>
                <Text
                    position={[0, 6.4, FINISH_Z + 0.03]}
                    fontSize={1.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    FINISH
                </Text>
            </Suspense>
        </group>
    );
}

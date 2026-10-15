import { Image } from "@react-three/drei";
import { memo, Suspense } from "react";
import { useStore } from "@/components/hooks/useStore";
import PreviewWater from "../shared/PreviewWater";
import Platform from "./Platform";
import RopeSwing from "./RopeSwing";

function JungleVinesScene() {
    const darkMode = useStore((state) => state.darkMode);
    return (
        <group
            position={[4.5, 1.9, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.126}
        >
            <Suspense fallback={null}>
                <Image
                    url="/img/jungle-vines/background.webp"
                    scale={[80, 50]}
                    position={[0, 5, -36]}
                    color={darkMode ? "#888888" : "white"}
                    toneMapped={false}
                />
            </Suspense>
            {[-18, 18].map((x) => (
                <group key={x}>
                    <Platform
                        position={[x, -1, 0]}
                        args={[24, 1, 5]}
                        surface="dirt"
                    />
                    <Platform
                        position={[x, 0, 0]}
                        args={[24, 1, 5]}
                        surface="grass"
                    />
                </group>
            ))}
            <RopeSwing />
            <Suspense fallback={null}>
                <PreviewWater
                    radius={34}
                    position={[0, -7, 0]}
                    speed={0.6}
                />
            </Suspense>
        </group>
    );
}

export default memo(JungleVinesScene);

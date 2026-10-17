import { Text } from "@react-three/drei";
import dynamic from "next/dynamic";
import { memo } from "react";
import { getGamePreview } from "./previewRegistry";

const ModelTrafficCone = dynamic(
    () => import("../Traffic Cone").then((module) => module.ModelTrafficCone),
    { ssr: false },
);

function RenderUniqueGameScene({ game }) {
    const preview = getGamePreview(game?.name);
    if (preview) {
        const Scene = preview.Component;
        return preview.transform ? (
            <group {...preview.transform}>
                <Scene />
            </group>
        ) : (
            <Scene />
        );
    }

    return (
        <>
            <Text
                color="red"
                scale={0.5}
                position={[1, 4, 0]}
                rotation={[0, Math.PI / 2, 0]}
                textAlign="center"
            >
                {"Game Preview\nUnder Construction"}
            </Text>
            <ModelTrafficCone
                scale={10}
                position={[2, 1.25, 0]}
            />
            <ModelTrafficCone
                scale={7}
                position={[5, 1.25, -1.5]}
            />
            <ModelTrafficCone
                scale={7}
                position={[5, 1.25, 1.5]}
            />
        </>
    );
}

export default memo(
    RenderUniqueGameScene,
    (previous, next) => previous.game?.name === next.game?.name,
);

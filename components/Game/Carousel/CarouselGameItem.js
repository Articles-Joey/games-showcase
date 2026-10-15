import { memo, useRef, useState, useEffect, Suspense } from "react";

import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
// import BleacherBox from "./Games/Race Game/BleacherBox";
import { useStore } from "@/components/hooks/useStore";
import { MathUtils } from "three/src/math/MathUtils";
import RenderUniqueGameScene from "./RenderUniqueGameScene";
import CarouselGameImage from "./CarouselGameImage";
import { PreviewActivityProvider } from "./Games/shared/PreviewActivity";
import { hasRetainedPreview } from "./previewRegistry";

function CarouselGameItem({ game, game_index: i }) {
    const isActive = useStore((state) => state.activeGameIndex === i);
    const showImage = useStore(
        (state) => Math.abs(state.activeGameIndex - i) <= 10,
    );
    const showUniqueGameScene = useStore(
        (state) =>
            Math.abs(state.activeGameIndex - i) <=
            state.renderUniqueGameSceneRange,
    );

    const [nameLineCount, setNameLineCount] = useState(1);

    const [showActiveImage, setShowActiveImage] = useState(false);

    useEffect(() => {
        let timer;
        timer = setTimeout(
            () => {
                setShowActiveImage(isActive);
            },
            isActive ? 1000 : 0,
        );
        return () => clearTimeout(timer);
    }, [isActive]);

    const materialRef = useRef();
    const groupRef = useRef();
    const uniqueGameSceneRef = useRef();

    useFrame((state, delta) => {
        const targetOpacity = isActive ? 0.9 : 0.3;
        const targetScale = isActive ? 1 : 0.5;
        const alpha = 1 - Math.exp(-5 * delta);

        if (materialRef.current) {
            materialRef.current.opacity = MathUtils.lerp(
                materialRef.current.opacity,
                targetOpacity,
                alpha,
            );
        }

        if (groupRef.current) {
            const s = MathUtils.lerp(
                groupRef.current.scale.x,
                targetScale,
                alpha,
            );
            groupRef.current.scale.set(s, s, s);
        }
    });

    const isGameInfoOpen = useStore(
        (state) =>
            !!state.gameInfoModal && state.gameInfoModal.name === game.name,
    );

    return (
        <group
            position={[15 + i * 10, -0.5, 0]}
            rotation={[0, -Math.PI / 2, 0]}
        >
            <group ref={groupRef}>
                <mesh
                    position={[-1, 5, -0]}
                    rotation={[0, Math.PI / 2, 0]}
                >
                    <planeGeometry args={[8, 18]} />
                    <meshBasicMaterial
                        ref={materialRef}
                        color={game?.carousel?.card?.backgroundColor || "black"}
                        transparent
                        opacity={0.3}
                    />
                </mesh>

                {showImage && !isGameInfoOpen && (
                    <CarouselGameImage
                        image={game?.image}
                        activeImage={game?.active_image}
                        name={game?.name}
                        showActiveImage={isActive && showActiveImage}
                    />
                )}

                <Text
                    position={[0, 9.2, 3.5]}
                    rotation={[0, Math.PI / 2, 0]}
                    maxWidth={7}
                    lineHeight={0.85}
                    anchorX={"left"}
                    anchorY={"top"}
                    // onSync={(text) => {
                    //     console.log("Game name lines:", text.lines.length);
                    //     setNameLineCount(text.lines.length)
                    // }}
                >
                    {game?.name}
                </Text>

                <Text
                    position={[0, nameLineCount > 1 ? 8 : 7.25, 3.5]}
                    rotation={[0, Math.PI / 2, 0]}
                    maxWidth={17}
                    scale={0.4}
                    anchorX={"left"}
                    anchorY={"top"}
                >
                    {game?.short_description}
                </Text>

                <group position={[0, 10, 6]}>
                    <mesh
                        position={[-0.2, 1, 0.75]}
                        rotation={[0, Math.PI / 2, 0]}
                    >
                        <planeGeometry args={[5, 5]} />
                        <meshBasicMaterial
                            color="black"
                            transparent
                            opacity={0.7}
                        />
                    </mesh>

                    {[
                        {
                            label: "Single Player",
                            visible: game?.single_player,
                        },
                        {
                            label: `Multiplayer: ${game?.multiplayer_tag || ""}`,
                            visible: game?.multiplayer,
                        },
                        {
                            label: `Open Source`,
                            visible: game?.open_source,
                        },
                        {
                            label: `Developer: ${game?.developer}`,
                            visible: game?.developer,
                        },
                        {
                            label: `Publisher: ${game?.publisher}`,
                            visible: game?.publisher,
                        },
                    ]
                        .filter((mode) => mode.visible)
                        .map((mode, index) => {
                            return (
                                <Text
                                    key={mode.label}
                                    position={[0, 3 - (index * 0.5 - 0.4), 3]}
                                    rotation={[0, Math.PI / 2, 0]}
                                    maxWidth={17}
                                    scale={0.3}
                                    anchorX={"left"}
                                    anchorY={"top"}
                                >
                                    {mode.label}
                                </Text>
                            );
                        })}

                    {/* {game?.single_player && <Text
                        position={[0, 3, 1.4]}
                        rotation={[0, Math.PI / 2, 0]}
                        maxWidth={17}
                        scale={0.5}
                    >
                        Single Player
                    </Text>
                    }
                    {game?.multiplayer && <Text
                        position={[0, 3, 1.4]}
                        rotation={[0, Math.PI / 2, 0]}
                        maxWidth={17}
                        scale={0.5}
                    >
                        Multiplayer {game.multiplayer_tag}
                    </Text>
                    } */}
                </group>

                {showUniqueGameScene && !hasRetainedPreview(game) && (
                    <group
                        ref={uniqueGameSceneRef}
                        position={[0, -1, 0]}
                    >
                        <PreviewActivityProvider active={isActive}>
                            <Suspense fallback={null}>
                                <RenderUniqueGameScene game={game} />
                            </Suspense>
                        </PreviewActivityProvider>
                    </group>
                )}
            </group>
        </group>
    );
}

export default memo(CarouselGameItem);

import { memo, useMemo, useRef, useState, useEffect } from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html, Image, OrbitControls, Sky, Text, useDetectGPU, useTexture } from "@react-three/drei";
// import BleacherBox from "./Games/Race Game/BleacherBox";
import { useStore } from "../../hooks/useStore";
import { degToRad, MathUtils } from "three/src/math/MathUtils";
import RenderUniqueGameScene from "./RenderUniqueGameScene";
import Tree from "../Tree";
import Rock from "@/components/Models/Rock";
import GrassPlane from "./Ground";
import { useHotkeys } from "react-hotkeys-hook";

export default function CarouselGameItem({
    game,
    game_index: i,
}) {

    const activeGameIndex = useStore((state) => state?.activeGameIndex);
    const renderUniqueGameSceneRange = useStore((state) => state?.renderUniqueGameSceneRange);

    const isActive = activeGameIndex == i;

    const [nameLineCount, setNameLineCount] = useState(1);

    const [showActiveImage, setShowActiveImage] = useState(false);

    useEffect(() => {
        let timer;
        if (isActive) {

            console.log("Activating game image for:", game);

            timer = setTimeout(() => {
                setShowActiveImage(true);
            }, 1000);

        } else {
            setShowActiveImage(false);
        }
        return () => clearTimeout(timer);
    }, [isActive]);

    const materialRef = useRef();
    const groupRef = useRef();
    const uniqueGameSceneRef = useRef();

    useFrame((state, delta) => {
        const targetOpacity = isActive ? 0.9 : 0.3;
        const targetScale = isActive ? 1 : 0.5;
        const targetSceneOpacity = isActive ? 1 : 0.2;

        if (materialRef.current) {
            materialRef.current.opacity = MathUtils.lerp(materialRef.current.opacity, targetOpacity, 5 * delta)
        }

        if (groupRef.current) {
            const s = MathUtils.lerp(groupRef.current.scale.x, targetScale, 5 * delta)
            groupRef.current.scale.set(s, s, s)
        }

        // Needs to not affect the <Tree /> and <Rock /> opacity
        // if (uniqueGameSceneRef.current) {
        //     uniqueGameSceneRef.current.traverse((child) => {
        //         if (child.isMesh) {
        //             const materials = Array.isArray(child.material) ? child.material : [child.material];
        //             materials.forEach(mat => {
        //                 if (mat) {
        //                     mat.transparent = true;
        //                     mat.opacity = MathUtils.lerp(mat.opacity, targetSceneOpacity, 5 * delta);
        //                 }
        //             });
        //         }
        //     })
        // }

    })

    // This crashes the app for some reason
    // const gameImage = useMemo(() => {
    //     if (!game?.image) return null;
    //     return (
    //         <Image
    //             url={game?.image}
    //             scale={[7, 4]}
    //             rotation={[0, degToRad(90), 0]}
    //             position={[0, 11.5, 0]}
    //         />
    //     )
    // }, [game?.image])

    const gameInfoModal = useStore((state) => state?.gameInfoModal);
    const setGameInfoModal = useStore((state) => state?.setGameInfoModal);

    useHotkeys('enter', () => {
        if (isActive && !gameInfoModal) {
            console.log("Open modal", game)
            setGameInfoModal(game);
            // window.open(`/game/${game?.slug}`, '_blank');
        }
    }, [isActive, game, gameInfoModal]);

    const gameImage = useMemo(() => {

        if (!game?.image) return null;

        if (
            (gameInfoModal?.name === game?.name)
            &&
            gameInfoModal
        ) return null;

        const imageSrc = (showActiveImage && game?.active_image) ? game.active_image : game.image;

        return (
            <Html
                transform
                position={[-0.25, 11.5, 0]}
                rotation={[0, degToRad(90), 0]}
                scale={1}
                occlude
                // zIndexRange={1000}
                zIndexRange={-1} 
                distanceFactor={10}

            >
                <img
                    src={imageSrc}
                    alt={game?.name}
                    style={{
                        width: '300px',
                        height: '175px',
                        borderRadius: "4px",
                        objectFit: "cover",
                        zIndex: -1,
                    }}
                />
            </Html>
        )
    }, [game?.image, game?.active_image, showActiveImage, gameInfoModal])

    if (Math.abs(activeGameIndex - i) >= 15) return null;

    return (
        <group
            key={game?.name}
            position={[15 + (i * 10), -0.5, 0]}
            rotation={[0, -Math.PI / 2, 0]}
        >

            {Math.abs(activeGameIndex - i) <= 13 &&
                <group
                    rotation={[0, degToRad(-90), 0]}
                >
                    <GrassPlane
                        position={[0, 0.5, 0]}
                        rotation={[degToRad(-90), 0, 0]}
                    // width={10}
                    // height={100}
                    // repeatX={1}
                    // repeatY={10}
                    // scale={0.005}
                    />
                </group>
            }

            {/* {Math.abs(activeGameIndex - i) <= 10 &&
                <TreeWrappedRandomizer
                    position={[-20, 0, 0.25]}
                />
            } */}

            <TreeWrappedRandomizer
                position={[-20, 0, 0.25]}
            />

            {/* {Math.abs(activeGameIndex - i) <= 20 &&
                <RockWrappedRandomizer
                    position={[-200, 5, 0.25]}
                />
            } */}

            <RockWrappedRandomizer
                position={[-80, 1, 0.25]}
            />

            <group
                ref={groupRef}
            >

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

                {Math.abs(activeGameIndex - i) <= 10 &&
                    gameImage
                }

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

                <group
                    position={[0, 10, 6]}
                >
                    <mesh
                        position={[-0.2, 1, .75]}
                        rotation={[0, Math.PI / 2, 0]}
                    >
                        <planeGeometry args={[5, 5]} />
                        <meshBasicMaterial color="black" transparent opacity={0.7} />
                    </mesh>

                    {[
                        {
                            label: "Single Player",
                            visible: game?.single_player
                        },
                        {
                            label: `Multiplayer: ${game?.multiplayer_tag || ''}`,
                            visible: game?.multiplayer
                        },
                        {
                            label: `Open Source`,
                            visible: game?.open_source
                        },
                        {
                            label: `Developer: ${game?.developer}`,
                            visible: game?.developer
                        },
                        {
                            label: `Publisher: ${game?.publisher}`,
                            visible: game?.publisher
                        },
                    ].filter(mode => mode.visible).map((mode, index) => {
                        return (
                            <Text
                                key={mode.label}
                                position={[0, 3 - ((index * 0.5) - 0.4), 3]}
                                rotation={[0, Math.PI / 2, 0]}
                                maxWidth={17}
                                scale={0.3}
                                anchorX={"left"}
                                anchorY={"top"}
                            >
                                {mode.label}
                            </Text>
                        )
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


                {Math.abs(activeGameIndex - i) <= renderUniqueGameSceneRange &&
                    <group ref={uniqueGameSceneRef}>
                        <RenderUniqueGameScene
                            game={game}
                        />
                    </group>
                }

            </group>

        </group>
    )

}

function RockWrappedRandomizer({
    position,
    scale
}) {
    const group = useRef()
    const { randomScale, randomRotation } = useMemo(() => ({
        randomScale: 18 + Math.random() * 20,
        randomRotation: [
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
        ]
    }), [])

    return (
        <group ref={group}>
            <Rock
                position={position}
                rotation={randomRotation}
                scale={scale ? (Array.isArray(scale) ? scale.map(s => s * randomScale) : scale * randomScale) : randomScale}
            />
        </group>
    )
}

function TreeWrappedRandomizer({
    position,
    scale
}) {
    const group = useRef()
    const { randomScale, randomSpeed, randomOffset } = useMemo(() => ({
        randomScale: 0.2 + Math.random() * 0.6,
        randomSpeed: 1 + Math.random(),
        randomOffset: Math.random() * 100
    }), [])

    // useFrame(({ clock }) => {
    //     if (group.current) {
    //         group.current.rotation.z = Math.sin(clock.elapsedTime * randomSpeed + randomOffset) * 0.05
    //         group.current.rotation.x = Math.cos(clock.elapsedTime * randomSpeed + randomOffset) * 0.05
    //     }
    // })

    return (
        <group ref={group}>
            <Tree
                position={position}
                scale={scale ? (Array.isArray(scale) ? scale.map(s => s * randomScale) : scale * randomScale) : randomScale}
            />
        </group>
    )
}
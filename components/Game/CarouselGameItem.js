import { memo, useMemo, useRef, useState, useEffect } from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html, Image, OrbitControls, Sky, Text, useDetectGPU, useTexture } from "@react-three/drei";
import BleacherBox from "./Carousel/Games/Race Game/BleacherBox";
import { useStore } from "../hooks/useStore";
import { degToRad, MathUtils } from "three/src/math/MathUtils";
import RenderUniqueGameScene from "./Carousel/RenderUniqueGameScene";
import Tree from "./Tree";
import GrassPlane from "./Carousel/Ground";

export default function CarouselGameItem({
    game,
    game_index: i,
}) {

    const activeGameIndex = useStore((state) => state?.activeGameIndex);
    const isActive = activeGameIndex == i;

    const [showActiveImage, setShowActiveImage] = useState(false);

    useEffect(() => {
        let timer;
        if (isActive) {
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

    useFrame((state, delta) => {
        const targetOpacity = isActive ? 0.9 : 0.3;
        const targetScale = isActive ? 1 : 0.5;

        if (materialRef.current) {
            materialRef.current.opacity = MathUtils.lerp(materialRef.current.opacity, targetOpacity, 5 * delta)
        }

        if (groupRef.current) {
            const s = MathUtils.lerp(groupRef.current.scale.x, targetScale, 5 * delta)
            groupRef.current.scale.set(s, s, s)
        }
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

    const gameImage = useMemo(() => {
        if (!game?.image) return null;
        
        const imageSrc = (showActiveImage && game?.active_image) ? game.active_image : game.image;

        return (
            <Html
                transform
                position={[0, 11.5, 0]}
                rotation={[0, degToRad(90), 0]}
                scale={4}
                zIndexRange={1000}
            >
                <img
                    src={imageSrc}
                    alt={game?.name}
                    style={{
                        width: '70px',
                        height: '40px',
                        borderRadius: "4px",
                        objectFit: "cover",
                        zIndex: -1,
                    }}
                />
            </Html>
        )
    }, [game?.image, game?.active_image, showActiveImage])

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

            {Math.abs(activeGameIndex - i) <= 10 &&
                <TreeWrappedRandomizer 
                    position={[-20, 0, 0.25]}
                />
            }

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
                        color="black"
                        transparent
                        opacity={0.3}
                    />
                </mesh>

                {Math.abs(activeGameIndex - i) <= 10 && gameImage}

                <Text
                    position={[0, 9.2, 3.5]}
                    rotation={[0, Math.PI / 2, 0]}
                    maxWidth={7}
                    lineHeight={0.85}
                    anchorX={"left"}
                    anchorY={"top"}
                >
                    {game?.name}
                </Text>

                <Text
                    position={[0, 8, 3.5]}
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


                {Math.abs(activeGameIndex - i) <= 1 &&
                    <RenderUniqueGameScene
                        game={game}
                    />
                }

            </group>

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
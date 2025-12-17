import { memo, useMemo, useRef } from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Sky, Text, useDetectGPU, useTexture } from "@react-three/drei";


import Ocean from "./Ocean"
// import { Boat } from "./Boat"
// import { WindTurbine } from "./WindTurbine";
// import BleacherBox from "./BleacherBox";
// import GameGrid from "./GameGrid";
// import PlayersGrid from "./PlayersGrid";

import GrassPlane from "./Grass";
import CameraControls from "./CameraControls";

import { useSocketStore } from "@/components/hooks/useSocketStore";
import useCameraStore from "../hooks/useCameraStore";
import useGameStore from "../hooks/useGameStore";
import { useStore } from "../hooks/useStore";
// import { useSearchParams } from "next/navigation";
import useGames from "@/hooks/useGames";

import CarouselGameItem from "./CarouselGameItem";
import ControllerManager from "./ControllerManager";

function GameCanvas(props) {

    // const searchParams = useSearchParams()
    // const searchParamsObject = Object.fromEntries(searchParams.entries());
    // const { server_type } = searchParamsObject

    // const GPUTier = useDetectGPU()

    // const setCameraState = useCameraStore((state) => state?.setCameraState);
    // const cameraState = useCameraStore((state) => state?.cameraState);

    const darkMode = useStore((state) => state.darkMode);

    // const myId = useGameStore((state) => state.myId);

    // const gameState = useGameStore((state) => state?.gameState);
    // const players = useGameStore((state) => state?.gameState?.players);

    // const activeGameIndex = useStore((state) => state?.activeGameIndex);
    // const setActiveGameIndex = useStore((state) => state?.setActiveGameIndex);

    // const {
    //     // handleCameraChange,
    //     // gameState,
    //     // players,
    //     move,
    //     // cameraState,
    //     cameraControlsRef,
    //     // cameraUpdate,
    //     // setCameraUpdate
    // } = props;

    // const {
    //     socket,
    // } = useSocketStore(state => ({
    //     socket: state.socket,
    // }));

    const { games, publicGames } = useGames();

    // const clientPlayerLookup = useMemo(() => {

    //     if (server_type == "online-socket" && players) {
    //         return players.find(player => player.id == socket.id)
    //     }

    //     if (server_type == "online-peer" && players) {
    //         return players.find(player => player.peer == myId)
    //     }

    // }, [server_type, players, socket.id, myId]);

    // const activeGame = useMemo(() => {

    //     if (!games) return null

    //     return games[activeGameIndex]

    // }, [games, activeGameIndex]);

    return (
        <Canvas
            camera={{
                position: [14, 10, 20],
                // fov: 50 
            }}
        >

            <ControllerManager />

            <CameraControls />

            <Ocean position={[0, -0.3, 0]} />

            <Sky
                // distance={450000}
                sunPosition={[0, darkMode ? -1 : 1, 0]}
            // inclination={0}
            // azimuth={0.25}
            // {...props} 
            />

            <GrassPlane />

            {/* <ambientLight intensity={darkMode ? 0.2 : 1.4} /> */}

            <ambientLight intensity={2} />

            {/* <spotLight position={[70, 100, 0]} angle={0.5} penumbra={1} intensity={darkMode ? 10000 : 20000} />
            {!darkMode && <pointLight position={[-10, -10, -10]} intensity={10000} />} */}

            {publicGames?.map((game, i) => {

                return (
                    <CarouselGameItem
                        key={game.name}
                        game={game}
                        game_index={i}
                    />
                )

            })}

        </Canvas>
    )
}

export default memo(GameCanvas)
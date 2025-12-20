import { memo, useMemo, useRef, useEffect } from "react";

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

// import { useSocketStore } from "@/components/hooks/useSocketStore";
// import useCameraStore from "../hooks/useCameraStore";
// import useGameStore from "../hooks/useGameStore";
import { useStore } from "../hooks/useStore";
// import { useSearchParams } from "next/navigation";
// import useGames from "@/hooks/useGames";

// import CarouselGameItem from "./CarouselGameItem";
import ControllerManager from "./ControllerManager";
import Carousel from "./Carousel/Carousel";

const ContextListeners = () => {
    const { gl } = useThree();
    useEffect(() => {
        const handleContextLost = (event) => {
            event.preventDefault();
            console.error('CUSTOM THREE.WebGLRenderer: Context Lost');
            setTimeout(() => {
                console.log('Attempting to restore WebGL context...');
                // gl.forceContextRestore();
            }, 2000);
        };
        const handleContextRestored = () => {
            console.log('CUSTOM THREE.WebGLRenderer: Context Restored');
        };

        const canvas = gl.domElement;
        canvas.addEventListener('webglcontextlost', handleContextLost);
        canvas.addEventListener('webglcontextrestored', handleContextRestored);

        return () => {
            canvas.removeEventListener('webglcontextlost', handleContextLost);
            canvas.removeEventListener('webglcontextrestored', handleContextRestored);
        };
    }, [gl]);
    return null;
};

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

    return (
        <Canvas
            camera={{
                position: [14, 10, 20],
                // fov: 50 
            }}
            onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', (event) => {
                    event.preventDefault();
                    console.error('THREE.WebGLRenderer: Context Lost');
                });
                gl.domElement.addEventListener('webglcontextrestored', () => {
                    console.log('THREE.WebGLRenderer: Context Restored');
                });
            }}
        >

            <ContextListeners />

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

            {/* <GrassPlane /> */}

            {/* <ambientLight intensity={darkMode ? 0.2 : 1.4} /> */}

            <ambientLight intensity={2} />

            {/* <spotLight position={[70, 100, 0]} angle={0.5} penumbra={1} intensity={darkMode ? 10000 : 20000} />
            {!darkMode && <pointLight position={[-10, -10, -10]} intensity={10000} />} */}

            {/* Actual Game Carousel */}
            <Carousel />

        </Canvas>
    )
}

export default memo(GameCanvas)
import { memo, useMemo, useRef, useEffect, Suspense } from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Sky, Text, useDetectGPU, useTexture } from "@react-three/drei";

import Ocean from "./Ocean"

import CameraControls from "./CameraControls";

import { useStore } from "@/components/hooks/useStore";

// import CarouselGameItem from "./CarouselGameItem";
import ControllerManager from "./ControllerManager";
import Carousel from "./Carousel/Carousel";

// const ContextListeners = () => {
//     const { gl } = useThree();
//     useEffect(() => {
//         const handleContextLost = (event) => {
//             event.preventDefault();
//             console.error('CUSTOM THREE.WebGLRenderer: Context Lost');
//             setTimeout(() => {
//                 console.log('Attempting to restore WebGL context...');
//                 // gl.forceContextRestore();
//             }, 2000);
//         };
//         const handleContextRestored = () => {
//             console.log('CUSTOM THREE.WebGLRenderer: Context Restored');
//         };

//         const canvas = gl.domElement;
//         canvas.addEventListener('webglcontextlost', handleContextLost);
//         canvas.addEventListener('webglcontextrestored', handleContextRestored);

//         return () => {
//             canvas.removeEventListener('webglcontextlost', handleContextLost);
//             canvas.removeEventListener('webglcontextrestored', handleContextRestored);
//         };
//     }, [gl]);
//     return null;
// };

function GameCanvas(props) {

    const darkMode = useStore((state) => state.darkMode);

    return (
        <Canvas
            camera={{
                position: [14, 10, 20],
                // fov: 50 
            }}
            // onCreated={({ gl }) => {
            //     gl.domElement.addEventListener('webglcontextlost', (event) => {
            //         event.preventDefault();
            //         console.error('THREE.WebGLRenderer: Context Lost');
            //     });
            //     gl.domElement.addEventListener('webglcontextrestored', () => {
            //         console.log('THREE.WebGLRenderer: Context Restored');
            //     });
            // }}
        >

            {/* <ContextListeners /> */}

            <ControllerManager />

            <CameraControls />

            <Sky
                // distance={450000}
                sunPosition={[0, darkMode ? -1 : 1, 0]}
            // inclination={0}
            // azimuth={0.25}
            // {...props} 
            />

            <ambientLight intensity={darkMode? 1 : 2} />

            <Suspense>
                <Carousel />
                <Ocean position={[0, -0.3, 0]} />
            </Suspense>

        </Canvas>
    )
}

export default memo(GameCanvas)
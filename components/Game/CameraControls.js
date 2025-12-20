import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from "@react-three/fiber"

import { OrbitControls, } from "@react-three/drei";

import useCameraStore from '../hooks/useCameraStore';
import { useStore } from '@/hooks/useStore';
import { Vector3 } from 'three';

const CameraControls = (props) => {

    // const cameraState = useCameraStore((state) => state?.cameraState);
    const setCameraState = useCameraStore((state) => state?.setCameraState);
    const cameraUpdate = useCameraStore((state) => state?.cameraUpdate);

    const activeGameIndex = useStore((state) => state?.activeGameIndex);

    const zoomLevel = useStore((state) => state?.zoomLevel);

    const {
        // onCameraChange, 
        // cameraUpdate, 
        // setCameraUpdate 
    } = props;

    const {
        camera,
        controls: threeControls,
        gl: { domElement },
    } = useThree();

    const controls = useRef();
    const targetPosition = useRef(new Vector3(14 + (activeGameIndex * 10), 10, 20));
    const targetLookAt = useRef(new Vector3(14 + (activeGameIndex * 10), 0, 0));

    // Base camera offset when zoomLevel is 0
    const baseOffset = new Vector3(0, 10, 20);

    useFrame((state, delta) => {
        state.camera.position.lerp(targetPosition.current, 3 * delta)
        if (controls.current) {
            controls.current.target.lerp(targetLookAt.current, 3 * delta)
            controls.current.update()
        }
        setCameraState(camera)
    });

    useEffect(() => {
        console.log("New cameraUpdate", cameraUpdate)
        if (cameraUpdate.position) {
            camera.position.set(
                cameraUpdate.position[0],
                cameraUpdate.position[1],
                cameraUpdate.position[2]
            );
            targetPosition.current.set(
                cameraUpdate.position[0],
                cameraUpdate.position[1],
                cameraUpdate.position[2]
            );
        }
    }, [cameraUpdate])

    useEffect(() => {

        console.log("New cameraUpdate", cameraUpdate)

        if (controls.current) {
            targetLookAt.current.set(
                14 + (activeGameIndex * 10),
                0,
                0
            );
        }

        // Calculate zoom factor. 
        // Positive zoomLevel zooms in (smaller distance), Negative zooms out (larger distance).
        // Example: zoomLevel 1 -> 0.8x distance, zoomLevel -1 -> 1.2x distance
        const zoomFactor = Math.max(0.1, 1 - (zoomLevel * 0.2)); 

        targetPosition.current.set(
            14 + (activeGameIndex * 10) + (baseOffset.x * zoomFactor),
            baseOffset.y * zoomFactor,
            baseOffset.z * zoomFactor
        );

    }, [activeGameIndex, zoomLevel])

    return (
        <OrbitControls
            ref={controls}
            args={[camera, domElement]}
            target={[14.5, 0, 0]}
        />
    );

};

export default CameraControls
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

        targetPosition.current.set(
            14 + (activeGameIndex * 10),
            10,
            20
        );

    }, [activeGameIndex])

    return (
        <OrbitControls
            ref={controls}
            args={[camera, domElement]}
            target={[14.5, 0, 0]}
        />
    );

};

export default CameraControls
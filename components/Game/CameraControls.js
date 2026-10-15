import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { OrbitControls } from "@react-three/drei";

import useCameraStore from "@/components/hooks/useCameraStore";
import { useStore } from "@/components/hooks/useStore";
import { Vector3 } from "three";

const CameraControls = () => {
    const cameraUpdate = useCameraStore((state) => state?.cameraUpdate);

    const activeGameIndex = useStore((state) => state?.activeGameIndex);

    const zoomLevel = useStore((state) => state?.zoomLevel);

    const camera = useThree((state) => state.camera);

    const controls = useRef();
    const targetPosition = useRef(
        new Vector3(14 + activeGameIndex * 10, 8, 19),
    );
    const targetLookAt = useRef(new Vector3(14 + activeGameIndex * 10, 2, 0));

    // Run before Drei's OrbitControls update, which already runs at priority -1.
    useFrame((state, delta) => {
        const alpha = 1 - Math.exp(-3 * delta);
        state.camera.position.lerp(targetPosition.current, alpha);
        if (controls.current) {
            controls.current.target.lerp(targetLookAt.current, alpha);
        }
    }, -2);

    useEffect(() => {
        targetLookAt.current.set(14 + activeGameIndex * 10, 2, 0);

        // Calculate zoom factor.
        // Positive zoomLevel zooms in (smaller distance), Negative zooms out (larger distance).
        // Example: zoomLevel 1 -> 0.8x distance, zoomLevel -1 -> 1.2x distance
        const zoomFactor = Math.max(0.1, 1 - zoomLevel * 0.2);

        targetPosition.current.set(
            14 + activeGameIndex * 10,
            2 + 6 * zoomFactor,
            19 * zoomFactor,
        );
    }, [activeGameIndex, zoomLevel]);

    useEffect(() => {
        if (cameraUpdate?.position) {
            camera.position.fromArray(cameraUpdate.position);
            targetPosition.current.fromArray(cameraUpdate.position);
        }
    }, [cameraUpdate, camera]);

    return (
        <OrbitControls
            ref={controls}
            target={[14.5, 2, 0]}
        />
    );
};

export default CameraControls;

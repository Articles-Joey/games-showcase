import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Quaternion } from "three";
import { usePreviewFrame } from "./PreviewActivity";

export default function PreviewBillboard({ children, ...props }) {
    const group = useRef();
    const camera = useThree((state) => state.camera);
    const parentRotation = useMemo(() => new Quaternion(), []);
    const faceCamera = useCallback(
        (camera) => {
            if (!group.current) return;
            group.current.parent.getWorldQuaternion(parentRotation);
            camera
                .getWorldQuaternion(group.current.quaternion)
                .premultiply(parentRotation.invert());
        },
        [parentRotation],
    );

    // Give initially inactive arrows a visible orientation before freezing them.
    useLayoutEffect(() => {
        faceCamera(camera);
    }, [camera, faceCamera]);
    usePreviewFrame(({ camera }) => {
        faceCamera(camera);
    });

    return (
        <group
            ref={group}
            {...props}
        >
            {children}
        </group>
    );
}

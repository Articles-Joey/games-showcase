import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { MODEL_URLS } from "./previewLayout";

// Only used for static props; the runner gets its own skeleton and mixer.
export default function StaticModel({ model, ...props }) {
    const { scene } = useGLTF(MODEL_URLS[model]);
    const clone = useMemo(() => scene.clone(true), [scene]);
    return (
        <primitive
            object={clone}
            {...props}
            dispose={null}
        />
    );
}

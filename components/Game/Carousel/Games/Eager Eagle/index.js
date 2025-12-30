import { ModelBuildingOne } from "@/components/Models/Eager Eagle/Building 1";
import { ModelEagle } from "@/components/Models/Eager Eagle/Eagle";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function EagerEagleScene() {

    const eagleRef = useRef();

    useFrame(({ clock }) => {
        if (eagleRef.current) {
            eagleRef.current.position.y = 4 + Math.sin(clock.elapsedTime * 5) * 0.5;
            eagleRef.current.rotation.x = Math.cos(clock.elapsedTime * 5) * 0.5;
        }
    })

    return (
        <group position={[3, 0, 0]}>

            <ModelBuildingOne
                position={[0, 0, -1]}
            />

            <group ref={eagleRef} position={[0, 4, 1]}>
                <ModelEagle
                    scale={0.02}
                />
            </group>

        </group>
    );
}
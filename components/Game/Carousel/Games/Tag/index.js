import { ModelTagSwat } from "@/components/Models/Tag/Swat";
import { degToRad } from "three/src/math/MathUtils";

export default function TagScene() {
    return (
        <group>
            <ModelTagSwat 
                scale={3}
                position={[0, 0.5, -2]}
                rotation={[0, degToRad(0), 0]}
            />
            <ModelTagSwat 
                scale={3}
                position={[0, 0.5, 1.5]}
                rotation={[0, degToRad(0), 0]}
            />
        </group>
    )
}
import ModelBarn from "@/components/Models/Shared/Barn";
import { ModelTagSwat } from "@/components/Models/Tag/Swat";
import { degToRad } from "three/src/math/MathUtils";

export default function DeathRaceScene() {
    return (
        <group
            scale={0.03}
            position={[2, 1, 0]}
            rotation={[0, degToRad(-90), 0]}
        >
            <ModelBarn />
        </group>
    )
}
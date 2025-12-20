import { ModelBattlefield4Swat } from "@/components/Models/Battlefield 4/Swat";
import { degToRad } from "three/src/math/MathUtils";

export default function Battlefield4Scene() {
    return (
        <group>
            <ModelBattlefield4Swat 
                scale={3}
                position={[0, 0.5, -2]}
                rotation={[0, degToRad(90), 0]}
            />
            <ModelBattlefield4Swat 
                scale={3}
                position={[2, 0.5, 0]}
                rotation={[0, degToRad(90), 0]}
            />
            <ModelBattlefield4Swat 
                scale={3}
                position={[0, 0.5, 2]}
                rotation={[0, degToRad(90), 0]}
            />
        </group>
    )
}
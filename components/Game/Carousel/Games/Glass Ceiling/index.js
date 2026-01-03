import { ModelGlassCeilingSwat } from "@/components/Models/Glass Ceiling/Swat";
import { ModelTagSwat } from "@/components/Models/Tag/Swat";
import { degToRad } from "three/src/math/MathUtils";

export default function GlassCeilingScene() {
    return (
        <group>
            <ModelGlassCeilingSwat />
        </group>
    )
}
// import { ModelEasel } from "@/components/Models/Easel";
import { ModelPinballMachine } from "@/components/Models/Pinball/Pinball";
import { degToRad } from "three/src/math/MathUtils";

export default function PinballScene() {

    const length = 3;

    return (
        <>
            {Array.from({ length: length }).map((_, i) => (
                <ModelPinballMachine
                    key={`row-1-${i}`}
                    scale={0.2}
                    position={[(i - -0.5) * 4, 0.5, -2]}
                    rotation={[0, degToRad(60), 0]}
                />
            ))}
            {Array.from({ length: length }).map((_, i) => (
                <ModelPinballMachine
                    key={`row-2-${i}`}
                    scale={0.2}
                    position={[(i - -0.5) * 4, 0.5, 2]}
                    rotation={[0, degToRad(140), 0]}
                />
            ))}
        </>
    );
}
import { ModelEasel } from "@/components/Models/Easel";
import { degToRad } from "three/src/math/MathUtils";

export default function AssetsGalleryScene() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, i) => (
                <ModelEasel 
                key={`row-1-${i}`} 
                scale={0.5}
                position={[(i - -1.5) * 2, 2, -2]} 
                rotation={[0, degToRad(60), 0]}
                />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
                <ModelEasel 
                key={`row-2-${i}`} 
                scale={0.5}
                position={[(i - -1.5) * 2, 2, 2]} 
                rotation={[0, degToRad(140), 0]}
                />
            ))}
        </>
    );
}
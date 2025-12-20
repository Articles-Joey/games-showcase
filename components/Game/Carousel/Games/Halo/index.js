import { ModelHaloRing } from "@/components/Models/HaloRing";
import { ModelHaloWarthog } from "@/components/Models/HaloWarthog";

export default function HaloScene() {
    return (
        <>

            <ModelHaloRing
            scale={0.01}
            // position={[0, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
            />

            <ModelHaloWarthog
            scale={4}
            position={[0, -3.3, 0]}
            rotation={[0, Math.PI / 2, 0]}
            />

        </>
    );
}
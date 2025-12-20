import { ModelFortniteLlama } from "@/components/Models/FortniteLlama";
import { ModelFortnitePeelySkin } from "@/components/Models/FortnitePeelySkin";

export default function FortniteScene() {
    return (
        <>

            <ModelFortnitePeelySkin
                scale={0.03}
                position={[1, -4, 0]}
                rotation={[0, Math.PI / 2, 0]}
            />

            <ModelFortniteLlama
                scale={0.008}
                position={[2, -5, 1]}
                rotation={[0, Math.PI / 2, 0]}
            />

            {/* <ModelHaloWarthog
                scale={4}
                position={[0, -3.3, 0]}
                rotation={[0, Math.PI / 2, 0]}
            /> */}

        </>
    );
}
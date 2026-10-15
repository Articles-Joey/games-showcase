import { memo, useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";
import PreviewWater from "../shared/PreviewWater";
import { ToonPuller, CogPuller } from "./Pullers";
import { ModelDonaldsBoat } from "./DonaldsBoat";
import Docks from "./Docks";
import Rope from "./Rope";

function People() {
    const people = useRef();
    const direction = useRef(1);

    usePreviewFrame((_, delta) => {
        if (!people.current) return;
        const nextX =
            people.current.position.x +
            3 * direction.current * Math.min(delta, 0.1);
        if (nextX >= 5) direction.current = -1;
        else if (nextX <= -5) direction.current = 1;
        people.current.position.x = Math.max(-5, Math.min(5, nextX));
    });

    return (
        <group ref={people}>
            <ToonPuller
                position={[-10, 2.25, 0.2]}
                rotation={[0, Math.PI / 2, 0]}
            />
            <CogPuller
                position={[10, 2.25, 0.8]}
                rotation={[0, -Math.PI / 2, 0]}
            />
            <Rope position={[0, 5, -0.6]} />
        </group>
    );
}

function TugOfWarScene() {
    return (
        <group
            position={[5, 1.15, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.1}
        >
            <PreviewWater radius={48} />
            <Docks />
            <People />
            <ModelDonaldsBoat
                position={[29, 2, -14]}
                rotation={[0, Math.PI / 4, 0]}
                scale={80}
            />
        </group>
    );
}

export default memo(TugOfWarScene);

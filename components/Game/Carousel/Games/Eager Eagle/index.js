import { ModelBuildingOne } from "@/components/Models/Eager Eagle/Building 1";
import { ModelEagle } from "@/components/Models/Eager Eagle/Eagle";
import { useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";

const BUILDING_COUNT = 3;
const BUILDING_SPACING = 3;
const BUILDING_SPEED = 2;
const LOOP_WIDTH = BUILDING_COUNT * BUILDING_SPACING;
const RIGHT_EDGE = -0 - LOOP_WIDTH / 2;

export default function EagerEagleScene() {
    const eagleRef = useRef();
    const buildingRefs = useRef([]);

    usePreviewFrame((_, delta, elapsed) => {
        // The carousel's -90° Y rotation makes increasing local Z move left.
        for (let index = 0; index < BUILDING_COUNT; index += 1) {
            const building = buildingRefs.current[index];
            if (!building) continue;
            building.position.z =
                RIGHT_EDGE +
                (((index + 0.5) * BUILDING_SPACING + elapsed * BUILDING_SPEED) %
                    LOOP_WIDTH);
        }

        if (eagleRef.current) {
            eagleRef.current.position.y = 4 + Math.sin(elapsed * 5) * 0.5;
            eagleRef.current.rotation.x = Math.cos(elapsed * 5) * 0.5;
        }
    });

    return (
        <group position={[3, 0, 0]}>
            {Array.from({ length: BUILDING_COUNT }, (_, index) => (
                <group
                    key={index}
                    ref={(building) => {
                        buildingRefs.current[index] = building;
                    }}
                    position={[
                        0,
                        -2,
                        RIGHT_EDGE + (index + 0.5) * BUILDING_SPACING,
                    ]}
                >
                    <ModelBuildingOne />
                </group>
            ))}

            <group
                ref={eagleRef}
                position={[0, 4, 1]}
                rotation={[0.5, 0, 0]}
            >
                <ModelEagle scale={0.02} />
            </group>
        </group>
    );
}

import { memo } from "react";
import ModelMan from "./ModelMan";
import MovesNPC from "./MovesNPC";

function LandingAnimation({ landingAnimationMode = true }) {
    return (
        <group>
            <MovesNPC />
            {landingAnimationMode && (
                <group
                    scale={2.5}
                    position={[0, 0.25, 20]}
                >
                    <ModelMan
                        position={[-2, 0, -3]}
                        fakeMovements
                        seed={21}
                    />
                    <ModelMan
                        position={[2, 0, -3]}
                        fakeMovements
                        seed={43}
                    />
                    <ModelMan
                        position={[6, 0, -3]}
                        fakeMovements
                        seed={68}
                    />
                </group>
            )}
        </group>
    );
}

export default memo(LandingAnimation);

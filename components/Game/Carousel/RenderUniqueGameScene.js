import { degToRad, radToDeg } from "three/src/math/MathUtils";
import BleacherBox from "./Games/Race Game/BleacherBox";
import GameGrid from "./Games/Race Game/GameGrid";

import FourFrogsDemo from "./Games/Four Frogs/index";
import { memo } from "react";
import { ModelTrafficCone } from "../Traffic Cone";
import FlowingChips from "./Games/Blackjack/FlowingChips";

function RenderUniqueGameScene({
    game
}) {

    switch (game?.name) {
        case "Four Frogs":
            return (
                <>
                    {/* <BleacherBox
                        scale={6}
                        position={[1, -0.5, -0.75]}
                    /> */}
                    <group
                        scale={0.025}
                        position={[10, 0.5, 0]}
                        rotation={[
                            0,
                            degToRad(90),
                            0
                        ]}
                    >
                        <FourFrogsDemo />
                    </group>
                </>
            )
        case "Race Game":
            return (
                <>
                    <BleacherBox
                        scale={6}
                        position={[1, -0.5, -0.75]}
                    />
                    <group
                        position={[5, 0.5, 16]}
                        rotation={[
                            0,
                            degToRad(90),
                            0
                        ]}
                    >
                        <GameGrid

                        />
                    </group>
                </>
            )
        // case "Battle Trap":
        //     return (
        //         <>

        //         </>
        //     );
        // case "Plinko":
        //     return (
        //         <>

        //         </>
        //     );
        case "Blackjack":
            return (
                <>
                    <group
                        position={[
                            3,
                            5.5,
                            0
                        ]}
                    >
                        <FlowingChips />
                    </group>
                </>
            );
        // case "Eager Eagle":
        //     return (
        //         <>

        //         </>
        //     );
        default:
            return <>
                <ModelTrafficCone
                    scale={10}
                    position={[2, 1.25, 0]}
                />
            </>;
    }

}

export default memo(RenderUniqueGameScene);
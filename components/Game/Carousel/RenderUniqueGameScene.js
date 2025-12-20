import dynamic from "next/dynamic";
import { memo } from "react";
import { degToRad, radToDeg } from "three/src/math/MathUtils";

// import BleacherBox from "./Games/Race Game/BleacherBox";
// import GameGrid from "./Games/Race Game/GameGrid";
// import FourFrogsDemo from "./Games/Four Frogs/index";
// import { ModelTrafficCone } from "../Traffic Cone";
// import FlowingChips from "./Games/Blackjack/FlowingChips";
// import HaloScene from "./Games/Halo";
// import FortniteScene from "./Games/Fortnite";
// import MazeScene from "./Games/Maze";
// import MinecraftScene from "./Games/Minecraft";

const BleacherBox = dynamic(() => import("./Games/Race Game/BleacherBox"), { ssr: false });
const GameGrid = dynamic(() => import("./Games/Race Game/GameGrid"), { ssr: false });
const FourFrogsDemo = dynamic(() => import("./Games/Four Frogs/index"), { ssr: false });
const ModelTrafficCone = dynamic(() => import("../Traffic Cone").then(mod => mod.ModelTrafficCone), { ssr: false });
const FlowingChips = dynamic(() => import("./Games/Blackjack/FlowingChips"), { ssr: false });
const HaloScene = dynamic(() => import("./Games/Halo"), { ssr: false });
const FortniteScene = dynamic(() => import("./Games/Fortnite"), { ssr: false });
const MazeScene = dynamic(() => import("./Games/Maze"), { ssr: false });
const MinecraftScene = dynamic(() => import("./Games/Minecraft"), { ssr: false });

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

        case "Halo 3":
            return (
                <>
                    <group
                        position={[
                            3,
                            5.5,
                            0
                        ]}
                    >
                        <HaloScene />
                    </group>
                </>
            );

            case "Minecraft":
            return (
                <MinecraftScene />
            );

        case "Fortnite":
            return (
                <>
                    <group
                        position={[
                            3,
                            5.5,
                            0
                        ]}
                    >
                        <FortniteScene />
                    </group>
                </>
            );

        case "Maze":
            return (
                <MazeScene />
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
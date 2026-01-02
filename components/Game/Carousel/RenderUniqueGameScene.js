import dynamic from "next/dynamic";
import { memo } from "react";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import EagerEagleScene from "./Games/Eager Eagle";
import PinballScene from "./Games/Pinball";

// import BleacherBox from "./Games/Race Game/BleacherBox";
// import GameGrid from "./Games/Race Game/GameGrid";
// import FourFrogsDemo from "./Games/Four Frogs/index";
// import { ModelTrafficCone } from "../Traffic Cone";
// import FlowingChips from "./Games/Blackjack/FlowingChips";
// import HaloScene from "./Games/Halo";
// import FortniteScene from "./Games/Fortnite";
// import MazeScene from "./Games/Maze";
// import MinecraftScene from "./Games/Minecraft";

const ModelTrafficCone = dynamic(() => import("../Traffic Cone").then(mod => mod.ModelTrafficCone), { ssr: false });

const BleacherBox = dynamic(() => import("./Games/Race Game/BleacherBox"), { ssr: false });
const GameGrid = dynamic(() => import("./Games/Race Game/GameGrid"), { ssr: false });

const FourFrogsDemo = dynamic(() => import("./Games/Four Frogs/index"), { ssr: false });
const FlowingChips = dynamic(() => import("./Games/Blackjack/FlowingChips"), { ssr: false });
const AssetsGalleryScene = dynamic(() => import("./Games/Assets Gallery"), { ssr: false });
const TowerBlocksScene = dynamic(() => import("./Games/Tower Blocks"), { ssr: false });
const CarouselOfProgressScene = dynamic(() => import("./Games/Carousel of Progress"), { ssr: false });
const MazeScene = dynamic(() => import("./Games/Maze"), { ssr: false });
const EightBallPoolScene = dynamic(() => import("./Games/8 Ball Pool"), { ssr: false });
const SpleefScene = dynamic(() => import("./Games/Spleef"), { ssr: false });
const TagScene = dynamic(() => import("./Games/Tag"), { ssr: false });
const CannonScene = dynamic(() => import("./Games/Cannon"), { ssr: false });
const MoveMatchScene = dynamic(() => import("./Games/Move Match"), { ssr: false });
const OceanRingsScene = dynamic(() => import("./Games/Ocean Rings"), { ssr: false });
const BattleTrapScene = dynamic(() => import("./Games/Battle Trap"), { ssr: false });
const PlinkoScene = dynamic(() => import("./Games/Plinko"), { ssr: false });
const DeathRaceScene = dynamic(() => import("./Games/Death Race"), { ssr: false });
const IceSlideScene = dynamic(() => import("./Games/Ice Slide"), { ssr: false });
const ParkourScene = dynamic(() => import("./Games/Parkour"), { ssr: false });
const TugOfWarScene = dynamic(() => import("./Games/Tug of War"), { ssr: false });
const JungleVinesScene = dynamic(() => import("./Games/Jungle Vines"), { ssr: false });
const TreasureDiveScene = dynamic(() => import("./Games/Treasure Dive"), { ssr: false });
const MemoryGameScene = dynamic(() => import("./Games/Memory Game"), { ssr: false });
const CatchingGameScene = dynamic(() => import("./Games/Catching Game"), { ssr: false });
const AssassinScene = dynamic(() => import("./Games/Assassin"), { ssr: false });
const TrashChuteScene = dynamic(() => import("./Games/Trash Chute"), { ssr: false });
const StopTheThievesScene = dynamic(() => import("./Games/Stop the Thieves"), { ssr: false });
const PlatformerEscapeScene = dynamic(() => import("./Games/Platformer Escape"), { ssr: false });
const SlingshotScene = dynamic(() => import("./Games/Slingshot"), { ssr: false });
const USATycoonScene = dynamic(() => import("./Games/USA Tycoon"), { ssr: false });
const AMCOTMMOScene = dynamic(() => import("./Games/AMCOT MMO"), { ssr: false });
const AMCOTSpacesScene = dynamic(() => import("./Games/AMCOT Spaces"), { ssr: false });
const GlassCeilingScene = dynamic(() => import("./Games/Glass Ceiling"), { ssr: false });

const HaloScene = dynamic(() => import("./Games/Halo"), { ssr: false });
const FortniteScene = dynamic(() => import("./Games/Fortnite"), { ssr: false });
const MinecraftScene = dynamic(() => import("./Games/Minecraft"), { ssr: false });
const Battlefield4Scene = dynamic(() => import("./Games/Battlefield 4/Battlefield4Scene"), { ssr: false });

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
        case "Assets Gallery":
            return (
                <AssetsGalleryScene />
            );
        case "Tower Blocks":
            return (
                <TowerBlocksScene />
            );
        case "Eager Eagle":
            return (
                <EagerEagleScene />
            );
        case "Carousel of Progress":
            return (
                <CarouselOfProgressScene />
            );
        case "Pinball":
            return (
                <PinballScene />
            );
        case "8 Ball Pool":
            return (
                <EightBallPoolScene />
            );
        case "Maze":
            return (
                <MazeScene />
            );
        case "Spleef":
            return (
                <SpleefScene />
            );
        case "Tag":
            return (
                <TagScene />
            );
        case "Cannon":
            return (
                <CannonScene />
            );
        case "Move Match":
            return (
                <MoveMatchScene />
            );
        case "Ocean Rings":
            return (
                <OceanRingsScene />
            );
        case "Battle Trap":
            return (
                <BattleTrapScene />
            );
        case "Plinko":
            return (
                <PlinkoScene />
            );
        case "Death Race":
            return (
                <DeathRaceScene />
            );
        case "Ice Slide":
            return (
                <IceSlideScene />
            );
        case "Parkour":
            return (
                <ParkourScene />
            );
        case "Tug of War":
            return (
                <TugOfWarScene />
            );
        case "Jungle Vines":
            return (
                <JungleVinesScene />
            );
        case "Treasure Dive":
            return (
                <TreasureDiveScene />
            );
        case "Memory Game":
            return (
                <MemoryGameScene />
            );
        case "Catching Game":
            return (
                <CatchingGameScene />
            );
        case "Assassin":
            return (
                <AssassinScene />
            );
        case "Trash Chute":
            return (
                <TrashChuteScene />
            );
        case "Stop the Thieves":
            return (
                <StopTheThievesScene />
            );
        case "Platformer Escape":
            return (
                <PlatformerEscapeScene />
            );
        case "Slingshot":
            return (
                <SlingshotScene />
            );
        case "USA Tycoon":
            return (
                <USATycoonScene />
            );
        case "AMCOT MMO":
            return (
                <AMCOTMMOScene />
            );
        case "AMCOT Spaces":
            return (
                <AMCOTSpacesScene />
            );
        case "Glass Ceiling":
            return (
                <GlassCeilingScene />
            );
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

        // Other Games
        // TODO - Create a way to dynamically add these?
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
        case "Battlefield 4":
            return (
                <Battlefield4Scene />
            );
        case "Battlefield 4":
            return (
                <Battlefield4Scene />
            );

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
import { createContext, createRef, forwardRef, memo, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

// import { Canvas, useFrame } from "@react-three/fiber"
// import { Sky, useDetectGPU, useTexture, OrbitControls, Cylinder, QuadraticBezierLine, Text, Image } from "@react-three/drei";

// import { useCannonStore } from "@/components/Games/Cannon/hooks/useCannonStore";
import { Debug, Physics, useBox, useSphere } from "@react-three/cannon";



// import { ModelJToastieCouch } from "@/components/Game/Couch";

// import { ModelKennyNLFurnitureTableGlass } from "@/components/Game/tableGlass";

// import { Model as WomenPunkModel } from "@/components/Game/PunkMan";
// import { Model as MenPunkModel } from "@/components/Game/PunkWoman";
// import { Model as PunkManSleep } from "@/components/Game/PunkManSleep";

// import Tree from "@/components/Game/Tree";
// import { ModelKennyNLFurnitureCardboardBoxOpen } from "@/components/Game/cardboardBoxOpen";
// import { Star } from "@/components/Game/Star";
// // import { ModelJToastieCampfire } from "@/components/Games/Campfire";
// import { ModelGoogleCampFire } from "@/components/Game/Camp Fire";
// import { ModelDoorway } from "@/components/Game/doorway";
// import { ModelGoogleBookshelf } from "@/components/Game/Bookshelf";
// import { ChairModel } from "@/components/Game/Chair";
// import { ModelGoogleShoes1 } from "@/components/Game/Shoes1";
import { useEightBallStore } from "./useEightBallStore";
// import { degToRad } from "three/src/math/MathUtils";
// import { useHotkeys } from "react-hotkeys-hook";
// import { MathUtils } from "three";
import PlayerProjectile from "./components/PlayerProjectile";
// import Dartboard from "@/components/Game/Dartboard";
import { Table, TableBottom, TableLegs } from "./components/Table";
import Balls from "./components/Balls";
import WoodFloor from "./components/WoodFloor";
// import FlickerFireLight from "@/components/Game/FlickerFireLight";
// import { degToRad } from "three/src/math/MathUtils";
// import CameraControls from "@/components/Game/CameraControls";
import RoomWalls from "./components/RoomWalls";
// import { degToRad } from "three/src/math/MathUtils";

export default function EightBallPoolScene() {

    const length = 3;

    return (
        <>
            <group
                scale={0.1}
                position={[5, 3.6, 0]}
            >
                <GameCanvas />
            </group>
            {/* {Array.from({ length: length }).map((_, i) => (
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
            ))} */}
        </>
    );
}

function GameCanvas(props) {

    const theme = useEightBallStore(state => state.theme);

    // const GPUTier = useDetectGPU()

    const [[a, b, c, d, e]] = useState(() => [...Array(5)].map(createRef))

    // const {
    //     debug,
    // } = useEightBallStore(state => ({
    //     debug: state.debug,
    // }));

    const debug = false;

    let gameContent = (
        <>

            {/* <PlayerProjectile /> */}

            {/* <Balls /> */}

            <OuterWalls />

            <InnerWalls />

            {/* <Holes /> */}

            <Table />
            <TableBottom />

        </>
    )

    let physicsContent
    if (debug) {
        physicsContent = (
            <Debug>
                {gameContent}
            </Debug>
        )
    } else {
        physicsContent = (
            gameContent
        )
    }

    return (
        <>

            {/* <CameraControls /> */}

            <WoodFloor
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -30, 0]}
                args={[300, 300]}
            />

            {/* <RoomWalls /> */}

            <TableLegs />

            <Physics>

                {physicsContent}

            </Physics>

        </>
    )
}

// export default memo(GameCanvas)

function Holes() {

    return (
        <group>

            {/* Top */}
            <Hole
                position={[25, -0.79, -50]}
                args={[2, 2, 2.1]}
            />
            <Hole
                position={[-25, -0.79, -50]}
                args={[2, 2, 2.1]}
            />

            {/* Middle */}
            <Hole
                position={[25, -0.79, 0]}
                args={[2, 2, 2.1]}
            />
            <Hole
                position={[-25, -0.79, 0]}
                args={[2, 2, 2.1]}
            />

            {/* Bottom */}
            <Hole
                position={[25, -0.79, 50]}
                args={[2, 2, 2.1]}
            />
            <Hole
                position={[-25, -0.79, 50]}
                args={[2, 2, 2.1]}
            />

        </group>
    )

}

function Hole({ position, args }) {

    const [ref, api] = useBox(() => ({
        mass: 0,
        type: 'Static',
        args: args,
        position: position,
    }))

    return (
        <mesh ref={ref} castShadow>
            <cylinderGeometry args={args} />
            {/* <BeachBall /> */}
            <meshStandardMaterial color="black" />
        </mesh>
    )

}

function OuterWalls() {

    const lengthOffsetX = 29

    return (
        <group>

            {/* Length Walls */}
            <Wall
                position={[lengthOffsetX, 1, 0]}
                args={[2, 2, 106]}
            />
            <Wall
                position={[-lengthOffsetX, 1, 0]}
                args={[2, 2, 106]}
            />

            {/* Width Walls */}
            <Wall
                position={[0, 1, 54]}
                args={[60, 2, 2]}
            />
            <Wall
                position={[0, 1, -54]}
                args={[60, 2, 2]}
            />

        </group>
    )

}

function InnerWalls() {

    const wallWidth = 3
    const lengthOffsetX = 26.5

    return (
        <group>

            {/* North Length Walls */}
            <Wall
                position={[lengthOffsetX, 1, -25]}
                args={[wallWidth, 2, 46]}
                inner
            />
            <Wall
                position={[-lengthOffsetX, 1, -25]}
                args={[wallWidth, 2, 46]}
                inner
            />

            {/* South Length Walls */}
            <Wall
                position={[lengthOffsetX, 1, 25]}
                args={[wallWidth, 2, 46]}
                inner
            />
            <Wall
                position={[-lengthOffsetX, 1, 25]}
                args={[wallWidth, 2, 46]}
                inner
            />

            {/* Width Walls */}
            <Wall
                position={[0, 1, 51.5]}
                args={[46, 2, wallWidth]}
                inner
            />
            <Wall
                position={[0, 1, -51.5]}
                args={[46, 2, wallWidth]}
                inner
            />

        </group>
    )

}

function Wall({ position, args, inner }) {

    const [ref, api] = useBox(() => ({
        mass: 0,
        type: 'Static',
        args: args,
        position: position,
        material: { friction: 1, restitution: 1 },
    }))

    return (
        <mesh ref={ref} castShadow>
            <boxGeometry args={args} />
            {/* <BeachBall /> */}
            {/* <meshStandardMaterial color={inner ? "#054600" : "chocolate"} /> */}
            <meshStandardMaterial
                color={inner ? "#054600" : "chocolate"}
                emissive={"#054600"} // glow color
                emissiveIntensity={0.90} // adjust for subtle glow
            />
            {/* <rectAreaLight
                width={30}
                height={30}
                color={"limegreen"}
                intensity={0.3}
                distance={100}
                position={[0, 2, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
            /> */}
        </mesh>
    )

}
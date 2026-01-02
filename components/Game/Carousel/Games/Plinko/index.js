import { useSphere, useCylinder, useBox, Physics } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useMemo, useState, useEffect, useRef } from "react";
import { Color } from "three";
import { degToRad } from "three/src/math/MathUtils";

const ROWS = 12;
const PEG_RADIUS = 0.15;
const BALL_RADIUS = 0.3;
const GAP = 1.2;

function PlinkoBall({ startPos }) {
    const [ref, api] = useSphere(() => ({
        mass: 1,
        args: [BALL_RADIUS],
        position: startPos,
        material: { restitution: 0.6, friction: 0.1 }
    }));

    useFrame(() => {
        if (!ref.current) return;
        const currentPos = ref.current.position;
        // Reset if falls below
        if (currentPos.y < - (ROWS * GAP) / 2 - 5) {
            api.position.set(0, (ROWS * GAP) / 2 + 3, 0);
            api.velocity.set((Math.random() - 0.5) * 2, 0, 0);
            api.angularVelocity.set(0, 0, 0);
        }
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[BALL_RADIUS, 32, 32]} />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    );
}

function Peg({ position }) {
    const [ref] = useCylinder(() => ({
        mass: 0,
        args: [PEG_RADIUS, PEG_RADIUS, 1, 16],
        position: position,
        rotation: [Math.PI / 2, 0, 0],
        material: { restitution: 0.8, friction: 0.1 }
    }));

    return (
        <mesh ref={ref}>
            <cylinderGeometry args={[PEG_RADIUS, PEG_RADIUS, 1, 16]} />
            <meshStandardMaterial color="white" />
        </mesh>
    );
}

function PlinkoBoard() {
    const pegs = useMemo(() => {
        const p = [];
        const startY = (ROWS * GAP) / 2;

        for (let row = 0; row < ROWS; row++) {
            const pegsInRow = row + 3;
            const y = startY - row * GAP;
            const rowWidth = (pegsInRow - 1) * GAP;
            const startX = -rowWidth / 2;

            for (let col = 0; col < pegsInRow; col++) {
                p.push([startX + col * GAP, y, 0]);
            }
        }
        return p;
    }, []);

    return (
        <group>
            {pegs.map((pos, i) => (
                <Peg key={i} position={pos} />
            ))}
        </group>
    );
}

function Bounds() {
    const height = ROWS * GAP + 10;
    const width = (ROWS + 5) * GAP;

    // Back wall
    useBox(() => ({
        args: [width, height, 0.5],
        position: [0, 0, -0.75],
        type: "Static",
        material: { friction: 0 }
    }));

    // Front wall
    useBox(() => ({
        args: [width, height, 0.5],
        position: [0, 0, 0.75],
        type: "Static",
        material: { friction: 0 }
    }));

    return (
        <>
            <mesh position={[0, 0, -0.75]}>
                <boxGeometry args={[width, height, 0.1]} />
                <meshStandardMaterial color="#333" transparent opacity={0} />
            </mesh>
            <mesh position={[0, 0, 0.75]}>
                <boxGeometry args={[width, height, 0.1]} />
                <meshStandardMaterial color="#333" transparent opacity={0} />
            </mesh>
        </>
    )
}

export default function PlinkoScene() {
    return (
        <Physics>
            <group
                position={[2, 3, 0]}
                scale={0.25}
                rotation={[
                    0,
                    degToRad(90),
                    0
                ]}
            >
                <PlinkoBall startPos={[0, (ROWS * GAP) / 2 + 3, 0]} />
                <PlinkoBoard />
                <Bounds />
            </group>
        </Physics>
    );
}
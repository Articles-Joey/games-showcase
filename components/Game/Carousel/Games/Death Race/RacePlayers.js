import { useGLTF } from "@react-three/drei";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { SkeletonUtils } from "three-stdlib";
import { PreviewSuspense as Suspense } from "../shared/PreviewLoadTracker";
import { usePreviewFrame } from "../shared/PreviewActivity";
import usePreviewAnimations from "../shared/usePreviewAnimations";
import { START_Z, FINISH_Z } from "./FinishLine";

const CHARACTERS = [
    "Spacesuit",
    "Farmer",
    "King",
    "Suit",
    "Adventurer",
    "Casual_Hoodie",
    "Worker",
];

function Racer({ character, lane, index }) {
    const group = useRef();
    const currentAction = useRef();
    const { scene, animations } = useGLTF(
        `/models/assassin/${character}-transformed.glb`,
    );
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const clips = useMemo(
        () =>
            animations.filter(({ name }) => name === "Walk" || name === "Idle"),
        [animations],
    );
    const { actions, mixer } = usePreviewAnimations(clips, group);
    const [initialMotion] = useState(() => ({
        walking: index % 2 === 0,
        remaining: 0.4 + Math.random() * 1.2,
        speed: 5 + Math.random() * 3,
    }));
    const motion = useRef({ ...initialMotion });
    const selectAction = useCallback(
        (walking) => {
            const next = actions[walking ? "Walk" : "Idle"];
            if (!next || currentAction.current === next) return;
            currentAction.current?.fadeOut(0.15);
            next.reset().fadeIn(0.15).play();
            currentAction.current = next;
        },
        [actions],
    );

    useLayoutEffect(() => {
        const initial = actions[motion.current.walking ? "Walk" : "Idle"];
        initial?.reset().play();
        currentAction.current = initial;
        mixer.update(1 / 30);
        return () => {
            currentAction.current = undefined;
        };
    }, [actions, mixer, motion]);

    usePreviewFrame((_, delta) => {
        if (!group.current) return;
        const movement = motion.current;
        movement.remaining -= delta;
        if (movement.remaining <= 0) {
            movement.walking = !movement.walking;
            movement.remaining = movement.walking
                ? 1.5 + Math.random() * 3
                : 0.6 + Math.random() * 1.8;
            selectAction(movement.walking);
        }
        if (movement.walking)
            group.current.position.z += movement.speed * delta;
        if (group.current.position.z >= FINISH_Z + 1) {
            group.current.position.z = START_Z;
            movement.walking = false;
            movement.remaining = 0.4 + Math.random() * 1.1;
            selectAction(false);
        }
    });

    return (
        <group
            ref={group}
            position={[lane, -0.2, START_Z]}
            scale={2.6}
            dispose={null}
        >
            <primitive object={clone} />
        </group>
    );
}

export default function RacePlayers() {
    const [players] = useState(() =>
        Array.from({ length: 6 }, (_, index) => ({
            character:
                index === 0
                    ? "Spacesuit"
                    : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
            lane: -15 + index * 6,
        })),
    );
    return players.map(({ character, lane }, index) => (
        <Suspense
            key={index}
            fallback={null}
        >
            <Racer
                character={character}
                lane={lane}
                index={index}
            />
        </Suspense>
    ));
}

/* Preview adaptation of Move Match's ModelMan and fakeMovements animation queue.
 * All four characters share Man-transformed.glb, with separate cloned skeletons.
 */
import { useGLTF } from "@react-three/drei";
import {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";
import { LoopOnce, LoopRepeat, MeshStandardMaterial } from "three";
import { SkeletonUtils } from "three-stdlib";
import { usePreviewFrame } from "../shared/PreviewActivity";
import usePreviewAnimations from "../shared/usePreviewAnimations";
import {
    createRandom,
    IDLE_ACTION,
    MOVE_ANIMATIONS,
    MOVE_INTERVAL,
    pickNextMove,
} from "./moves";

const MODEL_URL = "/models/move-match/Man-transformed.glb";
const ACTION_FADE_DURATION = 0.1;
const MAX_ACTION_DURATION = 0.5;
const SKIN_TONES = [
    "#f9d4b6",
    "#e0b088",
    "#b87d55",
    "#915332",
    "#69381e",
    "#3d1a08",
    "#ffdbac",
    "#f1c27d",
    "#e0ac69",
    "#c68642",
];

function cloneCharacter(scene, seed) {
    const clone = SkeletonUtils.clone(scene);
    const random = createRandom(seed);
    const color = () =>
        `#${Math.floor(random() * 16777216)
            .toString(16)
            .padStart(6, "0")}`;
    const palette = {
        BaseHuman_1: color(),
        BaseHuman_2: SKIN_TONES[Math.floor(random() * SKIN_TONES.length)],
        BaseHuman_3: color(),
        BaseHuman_4: "#000000",
        BaseHuman_5: "#f2eee4",
        BaseHuman_6: color(),
    };
    const materials = [];
    clone.traverse((object) => {
        if (!object.isSkinnedMesh || !palette[object.name]) return;
        const material = new MeshStandardMaterial({
            color: palette[object.name],
            roughness: /_1$|_2$/.test(object.name) ? 0.6 : 0.8,
        });
        materials.push(material);
        object.material = material;
    });
    return { clone, materials };
}

function ModelMan({ moveRef, fakeMovements = false, seed = 1, ...props }) {
    const { scene, animations } = useGLTF(MODEL_URL);
    const model = useMemo(() => cloneCharacter(scene, seed), [scene, seed]);
    const { actions, mixer } = usePreviewAnimations(animations, model.clone);
    const visual = useRef();
    const runtime = useRef({
        action: null,
        direction: "Up",
        moveIndex: -1,
        nextFakeMoveAt: MOVE_INTERVAL,
        finishAt: Infinity,
        random: createRandom(seed + 173),
    });
    const baseScale = fakeMovements ? 1.25 : 1;

    const playAction = useCallback(
        (name, once) => {
            const action = actions[name];
            if (!action) return null;
            const previous = runtime.current.action;
            if (previous && previous !== action)
                previous.fadeOut(ACTION_FADE_DURATION);
            action
                .stopFading()
                .reset()
                .setEffectiveTimeScale(1)
                .setEffectiveWeight(1);
            action.clampWhenFinished = once;
            action.setLoop(once ? LoopOnce : LoopRepeat, once ? 1 : Infinity);
            action.fadeIn(ACTION_FADE_DURATION).play();
            runtime.current.action = action;
            return action;
        },
        [actions],
    );

    const showMove = useCallback(
        (direction, elapsed) => {
            const action = playAction(
                MOVE_ANIMATIONS[direction] || IDLE_ACTION,
                true,
            );
            runtime.current.direction = direction;
            runtime.current.finishAt = action
                ? elapsed +
                  Math.min(MAX_ACTION_DURATION, action.getClip().duration)
                : elapsed;
            // The original uses the same punch clip for both sides and mirrors Right.
            visual.current?.scale.set(
                direction === "Right" ? -baseScale : baseScale,
                baseScale,
                baseScale,
            );
        },
        [playAction, baseScale],
    );

    const idle = useCallback(() => {
        playAction(IDLE_ACTION, false);
        runtime.current.finishAt = Infinity;
    }, [playAction]);

    useLayoutEffect(() => {
        const state = runtime.current;
        state.action = null;
        state.random = createRandom(seed + 173);
        state.nextFakeMoveAt = MOVE_INTERVAL;
        state.moveIndex = moveRef?.current.index ?? -1;
        if (fakeMovements) {
            visual.current.scale.setScalar(baseScale);
            idle();
        } else {
            showMove(moveRef?.current.direction ?? "Up", 0);
        }
        // Evaluate a valid pose before an initially inactive preview is displayed.
        mixer.update(1 / 30);
        return () => {
            mixer.stopAllAction();
            state.action = null;
        };
    }, [
        actions,
        mixer,
        moveRef,
        fakeMovements,
        baseScale,
        seed,
        idle,
        showMove,
    ]);

    usePreviewFrame((_, delta, elapsed) => {
        const state = runtime.current;
        if (fakeMovements && elapsed >= state.nextFakeMoveAt) {
            state.nextFakeMoveAt += MOVE_INTERVAL;
            showMove(pickNextMove(state.direction, state.random), elapsed);
        } else if (
            !fakeMovements &&
            moveRef &&
            state.moveIndex !== moveRef.current.index
        ) {
            state.moveIndex = moveRef.current.index;
            showMove(moveRef.current.direction, elapsed);
        }
        // Preserve the game's brief move followed by Idle, without wall-clock timers.
        if (elapsed >= state.finishAt) idle();
    }, -0.25);

    useEffect(
        () => () => model.materials.forEach((material) => material.dispose()),
        [model],
    );

    return (
        <group
            {...props}
            dispose={null}
        >
            <group ref={visual}>
                <primitive object={model.clone} />
            </group>
        </group>
    );
}

export default memo(ModelMan);

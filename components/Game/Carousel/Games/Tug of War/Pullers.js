// The model meshes, rig scales and pulling clips from tug-of-war's Toontown mode.
import { useEffect, useMemo, useRef } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { AnimationUtils, LoopRepeat } from "three";
import { SkeletonUtils } from "three-stdlib";
import usePreviewAnimations from "../shared/usePreviewAnimations";

function usePuller(url, actionIndex, actionName, trimEnd = false) {
    const group = useRef();
    const { scene, animations } = useGLTF(url);
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const graph = useGraph(clone);
    const clips = useMemo(() => {
        const original =
            animations[actionIndex] ||
            animations.find((clip) => clip.name === actionName);
        if (!original) return [];
        if (original.duration <= 2 / 30) return [original];
        if (trimEnd) {
            const clip = original.clone();
            const endTime = clip.duration - 1 / 30;
            for (const track of clip.tracks)
                track.trim(1 / 30, endTime).shift(-1 / 30);
            clip.duration = endTime - 1 / 30;
            return [clip];
        }
        return [
            AnimationUtils.subclip(
                original,
                original.name,
                1,
                Math.floor(original.duration * 30),
                30,
            ),
        ];
    }, [animations, actionIndex, actionName, trimEnd]);
    const { actions, mixer } = usePreviewAnimations(clips, group);

    useEffect(() => {
        const animation = clips[0] && actions[clips[0].name];
        if (!animation) return;
        animation.reset().setLoop(LoopRepeat, Infinity).play();
        mixer.update(0);
        return () => animation.stop();
    }, [actions, clips, mixer]);

    return { group, ...graph };
}

const TOON_MESHES = [
    "Arms",
    "Clothing",
    "Dog_Face_Features",
    "Eyeballs",
    "Eyes",
    "Hands",
    "Head",
    "Legs",
    "Sleeves",
];

export function ToonPuller(props) {
    const { group, nodes, materials } = usePuller(
        "/models/shared/Toon-transformed.glb",
        116,
        "medium_shorts_toon_rig|tug-o-war",
    );
    const material = useMemo(() => {
        const copy = materials.atlas2.clone();
        copy.transparent = false;
        copy.depthWrite = true;
        copy.alphaTest = 0.5;
        return copy;
    }, [materials]);
    useEffect(() => () => material.dispose(), [material]);

    return (
        <group
            ref={group}
            {...props}
            scale={[-0.011, 0.011, 0.011]}
            dispose={null}
        >
            <group name="Scene">
                <group name="Armature">
                    <primitive object={nodes._rootJoint} />
                </group>
                {TOON_MESHES.map((name) => (
                    <skinnedMesh
                        key={name}
                        name={name}
                        geometry={nodes[name].geometry}
                        skeleton={nodes[name].skeleton}
                        material={material}
                    />
                ))}
            </group>
        </group>
    );
}

const COG_MESHES = [
    ["Object_10", "cog_shoe"],
    ["Object_11", "sellbot_leg"],
    ["Object_12", "sellbot_sleeve"],
    ["Object_13", "sellbot_blazer"],
    ["Object_14", "cog_hand"],
    ["Object_15", "cog_arm"],
    ["Object_16", "cog_neck"],
    ["Object_18", "cog_head_flunky"],
    ["Object_19", "cog_flunky_glasses"],
];

export function CogPuller(props) {
    const { group, nodes, materials } = usePuller(
        "/models/shared/Cog-transformed.glb",
        40,
        "suitC|tug-o-war",
        true,
    );
    return (
        <group
            ref={group}
            {...props}
            scale={2.1}
            dispose={null}
        >
            <group name="Scene">
                <group
                    name="Object_7"
                    scale={0.004}
                >
                    <primitive object={nodes._rootJoint} />
                </group>
                {COG_MESHES.map(([name, material]) => (
                    <skinnedMesh
                        key={name}
                        name={name}
                        geometry={nodes[name].geometry}
                        skeleton={nodes[name].skeleton}
                        material={materials[material]}
                        scale={0.004}
                    />
                ))}
            </group>
        </group>
    );
}

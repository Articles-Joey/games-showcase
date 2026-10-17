import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { AnimationMixer, Box3, Quaternion, Vector3 } from "three";
import { SkeletonUtils } from "three-stdlib";

// Aim a bone's child toward the grip while preserving the bone's local basis.
function aimBone(bone, child, target, root) {
    const origin = bone.getWorldPosition(new Vector3());
    const direction = child.getWorldPosition(new Vector3()).sub(origin);
    const desired = target.clone().sub(origin);
    if (direction.lengthSq() < 0.00001 || desired.lengthSq() < 0.00001) return;
    const turn = new Quaternion().setFromUnitVectors(
        direction.normalize(),
        desired.normalize(),
    );
    const world = bone.getWorldQuaternion(new Quaternion());
    const parent = bone.parent.getWorldQuaternion(new Quaternion()).invert();
    bone.quaternion.copy(parent.multiply(turn.multiply(world)));
    root.updateMatrixWorld(true);
}

export default function SwingingPlayer() {
    // This is the same Quaternius King used by Jungle Vines and Assassin.
    const { scene, animations } = useGLTF(
        "/models/shared/King-transformed.glb",
    );
    const rig = useMemo(() => {
        const clone = SkeletonUtils.clone(scene);
        const mixer = new AnimationMixer(clone);
        const clip =
            animations.find(({ name }) => /climb|hang/i.test(name)) ||
            animations.find(({ name }) => name === "Jump") ||
            animations.find(({ name }) => name === "Idle");
        if (clip) {
            const action = mixer.clipAction(clip).play();
            mixer.update(clip.duration * 0.35);
            action.paused = true;
        }
        clone.updateMatrixWorld(true);
        const bounds = new Box3().setFromObject(clone);
        const center = bounds.getCenter(new Vector3());
        const height = Math.max(bounds.max.y - bounds.min.y, 0.01);
        const target = new Vector3(
            center.x,
            bounds.max.y + height * 0.12,
            center.z,
        );
        const arms = [];
        const hands = [];
        clone.traverse((bone) => {
            if (!bone.isBone) return;
            if (
                /upper.?arm|^arm[._-]?[lr]$|(?:left|right)arm$/i.test(bone.name)
            )
                arms.push(bone);
            if (/(?:hand|wrist)(?:[._-]?[lr])?$/i.test(bone.name))
                hands.push(bone);
        });
        for (const arm of arms) {
            const elbow = arm.children.find((child) => child.isBone);
            if (!elbow) continue;
            aimBone(arm, elbow, target, clone);
            const hand = elbow.children.find((child) => child.isBone);
            if (hand) aimBone(elbow, hand, target, clone);
        }
        clone.updateMatrixWorld(true);
        const posedBounds = new Box3().setFromObject(clone);
        const grip = hands.length
            ? hands
                  .reduce(
                      (sum, hand) =>
                          sum.add(hand.getWorldPosition(new Vector3())),
                      new Vector3(),
                  )
                  .multiplyScalar(1 / hands.length)
            : new Vector3(center.x, posedBounds.max.y, center.z);
        const scale = 5 / Math.max(grip.y - posedBounds.min.y, 0.01);
        // The parent group's origin is the rope attachment point. Offset the
        // character's grip to that origin, so it cannot drift off the rope.
        return {
            clone,
            mixer,
            scale,
            offset: grip.multiplyScalar(-scale).toArray(),
        };
    }, [scene, animations]);
    useEffect(
        () => () => {
            rig.mixer.stopAllAction();
            rig.mixer.uncacheRoot(rig.clone);
        },
        [rig],
    );

    return (
        <group
            position={rig.offset}
            dispose={null}
        >
            <primitive
                object={rig.clone}
                scale={rig.scale}
            />
        </group>
    );
}

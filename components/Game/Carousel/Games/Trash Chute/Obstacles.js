import { useMemo, useRef, useState } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";
import {
    BallCollider,
    CuboidCollider,
    CylinderCollider,
    RigidBody,
    interactionGroups,
    useAfterPhysicsStep,
} from "@react-three/rapier";
import { Euler, Quaternion } from "three";
import { ModelBurger } from "./models/Burger";
import { ModelCan } from "./models/Can";
import { ModelDumpster } from "./models/Dumpster";
import { ModelSpikyBall } from "./models/Spiky Ball";
import { ModelStylizedRock } from "./models/Stylized_rock";

const OBSTACLE_COUNT = 14;
const BASE_HEIGHT = 50;
const HEIGHT_INCREMENT = 15;
const RESET_Y = -10;
const OBSTACLE_GROUPS = interactionGroups(1);
const BOUNDARY_GROUPS = interactionGroups(2, 1);

const TYPES = [
    { Model: ModelSpikyBall, collider: "ball", args: [1], scale: 1.25 },
    { Model: ModelStylizedRock, collider: "ball", args: [1], scale: 1 },
    { Model: ModelBurger, collider: "ball", args: [1], scale: 1.5 },
    {
        Model: ModelCan,
        collider: "cylinder",
        args: [1, 0.5],
        scale: [2, 3, 2],
        offset: [0, -0.9, 0],
    },
    {
        Model: ModelDumpster,
        collider: "ball",
        args: [1],
        scale: [0.5, 0.6, 0.5],
        offset: [0, -0.5, 0],
    },
];

export function createObstacles() {
    return Array.from({ length: OBSTACLE_COUNT }, (_, id) => ({
        id,
        position: [
            (Math.random() - 0.5) * 4,
            BASE_HEIGHT + id * HEIGHT_INCREMENT,
            80,
        ],
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
    }));
}

function randomAngularVelocity() {
    return Array.from({ length: 3 }, () => (Math.random() - 0.5) * 10);
}

function ObstacleBody({ obstacle, physicsObjects }) {
    const bodyRef = useRef();
    const [angularVelocity] = useState(randomAngularVelocity);
    const resetEuler = useMemo(() => new Euler(), []);
    const resetRotation = useMemo(() => new Quaternion(), []);
    const { id, position, type } = obstacle;

    useAfterPhysicsStep(() => {
        const body = bodyRef.current;
        if (!body || body.translation().y >= RESET_Y) return;

        body.setTranslation(
            { x: position[0], y: position[1], z: position[2] },
            true,
        );
        resetEuler.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
        );
        body.setRotation(resetRotation.setFromEuler(resetEuler), true);
        body.setLinvel({ x: 0, y: 0, z: 0 }, true);
        const [x, y, z] = randomAngularVelocity();
        body.setAngvel({ x, y, z }, true);
    });

    return (
        <RigidBody
            ref={bodyRef}
            position={position}
            angularVelocity={angularVelocity}
            colliders={false}
            collisionGroups={OBSTACLE_GROUPS}
            mass={50}
            friction={0}
            restitution={0}
            linearDamping={0.01}
            angularDamping={0.01}
            canSleep={false}
            ccd
        >
            {type.collider === "cylinder" ? (
                <CylinderCollider args={type.args} />
            ) : (
                <BallCollider args={type.args} />
            )}
            <object3D
                ref={(object) => {
                    physicsObjects.current[id] = object;
                }}
            />
        </RigidBody>
    );
}

function ObstacleBounds() {
    const height = BASE_HEIGHT + (OBSTACLE_COUNT - 1) * HEIGHT_INCREMENT + 20;
    const sideX = 5.45;
    const endWallBottom = 50;
    const endWallHalfHeight = (height - endWallBottom) / 2;

    return (
        <RigidBody
            type="fixed"
            colliders={false}
            collisionGroups={BOUNDARY_GROUPS}
            friction={0}
            restitution={0}
        >
            <CuboidCollider
                args={[0.5, height / 2, 50]}
                position={[-sideX, height / 2, 50]}
            />
            <CuboidCollider
                args={[0.5, height / 2, 50]}
                position={[sideX, height / 2, 50]}
            />
            <CuboidCollider
                args={[sideX + 0.5, endWallHalfHeight, 0.5]}
                position={[0, endWallBottom + endWallHalfHeight, -0.5]}
            />
            <CuboidCollider
                args={[sideX + 0.5, height / 2, 0.5]}
                position={[0, height / 2, 87.25]}
            />
        </RigidBody>
    );
}

export function ObstaclePhysics({ obstacles, physicsObjects }) {
    return (
        <>
            <ObstacleBounds />
            {obstacles.map((obstacle) => (
                <ObstacleBody
                    key={obstacle.id}
                    obstacle={obstacle}
                    physicsObjects={physicsObjects}
                />
            ))}
        </>
    );
}

export function ObstacleVisuals({ obstacles, physicsObjects }) {
    const visuals = useRef([]);

    usePreviewFrame(() => {
        for (const { id } of obstacles) {
            // Rapier has already interpolated this detached object's local pose.
            // Copy it into the visible miniature without inheriting its world scale.
            const simulated = physicsObjects.current[id]?.parent;
            const visual = visuals.current[id];
            if (!simulated || !visual) continue;
            visual.position.copy(simulated.position);
            visual.quaternion.copy(simulated.quaternion);
        }
    });

    return obstacles.map(({ id, position, type: { Model, scale, offset } }) => (
        <group
            key={id}
            ref={(object) => {
                visuals.current[id] = object;
            }}
            position={position}
        >
            <Model
                scale={scale}
                position={offset}
            />
        </group>
    ));
}

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Color, DynamicDrawUsage, Object3D } from "three";
import { PreviewSuspense as Suspense } from "../shared/PreviewLoadTracker";
import { usePreviewFrame } from "../shared/PreviewActivity";
import Chopper from "./Chopper";
import {
    CELL_SIZE,
    MOVE_COUNT,
    PLAYERS,
    createPreviewRoutes,
    getHeading,
} from "./previewLayout";

const PLAYER_COUNT = PLAYERS.length;
const WALL_CAPACITY = PLAYER_COUNT + PLAYER_COUNT * MOVE_COUNT * 2;
const FILL_CAPACITY = PLAYER_COUNT * (MOVE_COUNT + 1);
const MOVE_SECONDS = 0.34;

export default function FakeRound() {
    const [routes] = useState(createPreviewRoutes);
    const players = useRef([]);
    const headings = useRef([]);
    const walls = useRef();
    const fills = useRef();
    const motion = useRef({
        player: 0,
        step: 0,
        completed: 0,
        elapsed: 0,
        phase: "start",
    });
    const transform = useMemo(() => new Object3D(), []);

    const writeBox = useCallback(
        (mesh, index, x, y, z, width, height, depth) => {
            transform.position.set(x, y, z);
            transform.scale.set(width, height, depth);
            transform.updateMatrix();
            mesh.setMatrixAt(index, transform.matrix);
        },
        [transform],
    );

    const writeConnection = useCallback(
        (index, from, to, progress) => {
            const dx = to[0] - from[0];
            const dz = to[2] - from[2];
            writeBox(
                walls.current,
                index,
                from[0] + (dx * progress) / 2,
                0.2,
                from[2] + (dz * progress) / 2,
                dx ? Math.max(0.001, Math.abs(dx) * progress) : 0.2,
                1,
                dz ? Math.max(0.001, Math.abs(dz) * progress) : 0.2,
            );
        },
        [writeBox],
    );

    const reset = useCallback(() => {
        Object.assign(motion.current, {
            player: 0,
            step: 0,
            completed: 0,
            elapsed: 0,
            phase: "start",
        });
        routes.forEach(({ points }, index) => {
            players.current[index]?.position.fromArray(points[0]);
            if (headings.current[index])
                headings.current[index].rotation.y = getHeading(
                    points[0],
                    points[1],
                );
        });
        walls.current.count = PLAYER_COUNT;
        fills.current.count = PLAYER_COUNT;
    }, [routes]);

    useLayoutEffect(() => {
        const wallMesh = walls.current;
        const fillMesh = fills.current;
        wallMesh.instanceMatrix.setUsage(DynamicDrawUsage);
        const color = new Color();
        routes.forEach(({ points, color: playerColor }, playerIndex) => {
            color.set(playerColor);
            const start = points[0];
            writeBox(
                wallMesh,
                playerIndex,
                start[0],
                0.2,
                start[2],
                0.2,
                1,
                0.2,
            );
            wallMesh.setColorAt(playerIndex, color);
            writeBox(
                fillMesh,
                playerIndex,
                start[0],
                0.005,
                start[2],
                CELL_SIZE - 0.04,
                0.01,
                CELL_SIZE - 0.04,
            );

            for (let step = 0; step < MOVE_COUNT; step++) {
                const wallIndex =
                    PLAYER_COUNT + (playerIndex * MOVE_COUNT + step) * 2;
                const fillIndex =
                    PLAYER_COUNT + playerIndex * MOVE_COUNT + step;
                const next = points[step + 1];
                writeConnection(wallIndex, points[step], next, 1);
                writeBox(
                    wallMesh,
                    wallIndex + 1,
                    next[0],
                    0.2,
                    next[2],
                    0.2,
                    1,
                    0.2,
                );
                wallMesh.setColorAt(wallIndex, color);
                wallMesh.setColorAt(wallIndex + 1, color);
                writeBox(
                    fillMesh,
                    fillIndex,
                    next[0],
                    0.005,
                    next[2],
                    CELL_SIZE - 0.04,
                    0.01,
                    CELL_SIZE - 0.04,
                );
            }
        });
        wallMesh.instanceMatrix.needsUpdate = true;
        wallMesh.instanceColor.needsUpdate = true;
        fillMesh.instanceMatrix.needsUpdate = true;
        // Include every future cell in the bounds once, before hiding them.
        // Growing connections always stay inside these bounds during a round.
        wallMesh.count = WALL_CAPACITY;
        fillMesh.count = FILL_CAPACITY;
        wallMesh.computeBoundingSphere();
        fillMesh.computeBoundingSphere();
        reset();
    }, [routes, writeBox, writeConnection, reset]);

    usePreviewFrame((_, delta) => {
        const round = motion.current;
        round.elapsed += delta;

        if (round.phase === "start") {
            if (round.elapsed < 0.65) return;
            round.elapsed = 0;
            round.phase = "move";
        } else if (round.phase === "turnPause") {
            if (round.elapsed < 0.6) return;
            round.player++;
            round.step = 0;
            round.elapsed = 0;
            round.phase = "move";
        } else if (round.phase === "roundPause") {
            if (round.elapsed >= 1.6) reset();
            return;
        }

        const { points } = routes[round.player];
        const from = points[round.step];
        const to = points[round.step + 1];
        const progress = Math.min(round.elapsed / MOVE_SECONDS, 1);
        const player = players.current[round.player];
        player.position.set(
            from[0] + (to[0] - from[0]) * progress,
            0,
            from[2] + (to[2] - from[2]) * progress,
        );
        const heading = headings.current[round.player];
        const turn = getHeading(from, to) - heading.rotation.y;
        heading.rotation.y +=
            Math.atan2(Math.sin(turn), Math.cos(turn)) *
            (1 - Math.exp(-14 * delta));

        // Reveal the same center posts and connected one-unit-high walls as
        // 3D GameGrid. Only the current connecting wall changes each frame.
        const wallIndex = PLAYER_COUNT + round.completed * 2;
        writeConnection(wallIndex, from, to, progress);
        walls.current.count = wallIndex + 1;
        walls.current.instanceMatrix.needsUpdate = true;
        if (progress >= 1) {
            round.completed++;
            round.step++;
            round.elapsed -= MOVE_SECONDS;
            walls.current.count = PLAYER_COUNT + round.completed * 2;
            fills.current.count = PLAYER_COUNT + round.completed;
            if (round.step === MOVE_COUNT) {
                round.phase =
                    round.player === PLAYER_COUNT - 1
                        ? "roundPause"
                        : "turnPause";
                round.elapsed = 0;
            }
        }
    });

    return (
        <group>
            <instancedMesh
                ref={fills}
                args={[null, null, FILL_CAPACITY]}
                count={0}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="#333333" />
            </instancedMesh>
            <instancedMesh
                ref={walls}
                args={[null, null, WALL_CAPACITY]}
                count={0}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial
                    color="white"
                    transparent
                    opacity={0.5}
                    depthWrite={false}
                    toneMapped={false}
                />
            </instancedMesh>
            {routes.map(({ points, color }, index) => (
                <group
                    key={color}
                    ref={(group) => {
                        players.current[index] = group;
                    }}
                    position={points[0]}
                >
                    <mesh
                        position={[0, 0.05, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    >
                        <planeGeometry args={[CELL_SIZE, CELL_SIZE]} />
                        <meshBasicMaterial
                            color={color}
                            toneMapped={false}
                        />
                    </mesh>
                    <group
                        ref={(group) => {
                            headings.current[index] = group;
                        }}
                        rotation={[0, getHeading(points[0], points[1]), 0]}
                    >
                        <mesh>
                            <boxGeometry args={[0.2, 0.5, 2]} />
                            <meshBasicMaterial
                                color={color}
                                transparent
                                opacity={0.5}
                                depthWrite={false}
                            />
                        </mesh>
                        <Suspense fallback={null}>
                            {/* Preserve the game's RenderModel/chopper transforms. */}
                            <group
                                scale={0.03}
                                position={[0, 0.2, 0]}
                            >
                                <Chopper
                                    scale={0.1}
                                    position={[0, -10, 0]}
                                />
                            </group>
                        </Suspense>
                    </group>
                </group>
            ))}
        </group>
    );
}

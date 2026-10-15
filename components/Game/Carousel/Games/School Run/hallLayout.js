import { Euler, Matrix4, Quaternion, Vector3 } from "three";
import { SECTION_COUNT, SECTION_LENGTH } from "./previewLayout";

function transform(position, rotation = [0, 0, 0], scale = 1) {
    return new Matrix4().compose(
        new Vector3(...position),
        new Quaternion().setFromEuler(new Euler(...rotation)),
        Array.isArray(scale)
            ? new Vector3(...scale)
            : new Vector3(scale, scale, scale),
    );
}

// Flatten the original static scenes once, sharing geometry/materials across
// every hall section. Each unique mesh is drawn in one instanced batch.
export default function createHallBatches(models, surfaces) {
    const parts = {};
    for (const [name, model] of Object.entries(models)) {
        const root = model.scene.clone(true);
        root.updateMatrixWorld(true);
        parts[name] = [];
        root.traverse((object) => {
            if (object.isMesh) {
                parts[name].push({
                    geometry: object.geometry,
                    material: object.material,
                    matrix: object.matrixWorld.clone(),
                });
            }
        });
    }

    const batches = new Map();
    function addPart(geometry, material, matrix, baseZ) {
        const key = `${geometry.uuid}:${Array.isArray(material) ? material.map((item) => item.uuid).join(":") : material.uuid}`;
        if (!batches.has(key))
            batches.set(key, { geometry, material, instances: [] });
        batches.get(key).instances.push({ matrix, section: baseZ });
    }
    function model(name, baseZ, position, rotation, scale) {
        const placement = transform(
            [position[0], position[1], position[2] + baseZ],
            rotation,
            scale,
        );
        for (const part of parts[name]) {
            addPart(
                part.geometry,
                part.material,
                placement.clone().multiply(part.matrix),
                baseZ,
            );
        }
    }
    function surface(name, baseZ, position, rotation, scale) {
        addPart(
            surfaces.geometry,
            surfaces[name],
            transform(
                [position[0], position[1], position[2] + baseZ],
                rotation,
                scale,
            ),
            baseZ,
        );
    }

    function lockers(baseZ, left) {
        for (let index = 0; index < 10; index += 1) {
            model(
                "locker",
                baseZ,
                [left ? -4 : 4, 0, 4.35 - index * 0.75],
                [0, left ? Math.PI / 2 : -Math.PI / 2, 0],
                2,
            );
        }
    }
    function desk(baseZ, left, computer) {
        const x = left ? -4.3 : 3;
        model("chair", baseZ, [x + 1, 0, 0.5], [0, -Math.PI, 0], 2);
        model("desk", baseZ, [x, 0, 0], undefined, 2);
        if (computer) {
            model("screen", baseZ, [x, 0.77, -0.4], [0, Math.PI / 9, 0]);
            model("screen", baseZ, [x + 0.4, 0.77, -0.55]);
            model(
                "keyboard",
                baseZ,
                [x + 0.2, 0.77, -0.2],
                [0, Math.PI / 9, 0],
            );
        } else {
            ["witch", "duck", "dog", "bear"].forEach((name, index) => {
                model(
                    name,
                    baseZ,
                    [x + 0.1 + index * 0.15, 0.77, -0.4],
                    [0, Math.PI / 9, 0],
                    0.1,
                );
            });
            model(
                "pear",
                baseZ,
                [x + 0.7, 0.77, -0.4],
                [0, Math.PI / 9, 0],
                0.6,
            );
            model(
                "television",
                baseZ,
                [x + (left ? 0 : 0.7), 2.17, -0.4],
                [0, left ? Math.PI / 6 : -Math.PI / 6, 0],
                1.8,
            );
        }
    }

    for (let index = 0; index < SECTION_COUNT; index += 1) {
        const z = -index * SECTION_LENGTH;
        surface("floor", z, [0, 0, 0], [-Math.PI / 2, 0, 0], [10, 10, 1]);
        surface("wall", z, [4.5, 1.5, 0], [0, -Math.PI / 2, 0], [10, 3, 1]);
        surface("wall", z, [-4.5, 1.5, 0], [0, Math.PI / 2, 0], [10, 3, 1]);
        // Downward-facing ceiling: visible inside, open from the preview's elevated view.
        surface("ceiling", z, [0, 4, 0], [Math.PI / 2, 0, 0], [10, 10, 1]);
        model("doorway", z, [-4.5, 0, -3.5], [0, -Math.PI / 2, 0], 2.5);
        model("doorway", z, [4.5, 0, -2.5], [0, Math.PI / 2, 0], 2.5);
        model(
            index % 2 ? "brokenWindow" : "window",
            z,
            [-4.5, 3.5, -0.5],
            undefined,
            [1.7, 1.7, 19.7],
        );
        model(
            index % 2 ? "window" : "brokenWindow",
            z,
            [4.5, 3.5, -0.5],
            undefined,
            [1.7, 1.7, 19.7],
        );

        // Cycle through all three decoration groups, instead of picking one randomly.
        if (index % 3 === 0) {
            lockers(z, true);
            desk(z, false, false);
        }
        if (index % 3 === 1) {
            desk(z, true, true);
            lockers(z, false);
        }
        if (index % 3 === 2) {
            desk(z, true, false);
            desk(z, false, true);
        }
    }
    return [...batches.values()];
}

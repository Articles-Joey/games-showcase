import { Box3, Euler, Matrix4, Quaternion, Vector3 } from "three";
import { BOARD_SIZE } from "./previewLayout";

// The same building selections and authored corner layout as the game's packs.
export const BUILDINGS = [
    {
        position: [802.577, 0, -233.117],
        rotation: [0, -0.3, 0],
        parts: [
            ["Building2_T_B2windows_0", "T_B2windows"],
            ["Building2_T_B2base_white_0", "T_B2base_white"],
        ],
    },
    {
        position: [-1576.172, 0, -551.746],
        rotation: [0, -0.314, 0],
        parts: [
            ["Building6_T_B6base_white_0", "T_B6base_white"],
            ["Building6_T_B6windows_0", "T_B6windows"],
        ],
    },
    {
        position: [491.923, 0, 299.06],
        rotation: [0, 0.185, 0],
        parts: [
            ["Building6b_T_B6base_gray_0", "T_B6base_gray"],
            ["Building6b_T_B6windows_0", "T_B6windows"],
        ],
    },
    {
        position: [1750.113, 0, 299.5],
        rotation: [0, 0.237, 0],
        parts: [
            ["Building2b_T_B2windows_0", "T_B2windows"],
            ["Building2b_T_B2base_gray_0", "T_B2base_gray"],
        ],
    },
    {
        position: [-1622.124, 0, 743.129],
        rotation: [0, -0.367, 0],
        parts: [["Building1_T_B1base_white_0", "T_B1base_white"]],
    },
    {
        position: [-1160.69, 0, 11.781],
        rotation: [0, 0.18, 0],
        parts: [["Building3_T_B3base_white_0", "T_B3base_white"]],
    },
    {
        position: [-1027.447, 0, 330.177],
        rotation: [0, -0.942, 0],
        parts: [["Building4_T_B4base_white_0", "T_B4base_white"]],
    },
    {
        position: [-371.154, 0, 378.878],
        rotation: [-Math.PI, 0.472, -Math.PI],
        parts: [["Building5_T_B5base_white_0", "T_B5base_white"]],
    },
    {
        position: [271.594, 0, 580.062],
        rotation: [0, 0.475, 0],
        parts: [["Building1b_T_B1base_gray_0", "T_B1base_gray"]],
    },
    {
        position: [1096.954, 0, -494.714],
        rotation: [0, 0.18, 0],
        parts: [["Building3b_T_B3base_gray_0", "T_B3base_gray"]],
    },
    {
        position: [1517.091, 0, 961.83],
        rotation: [-Math.PI, -0.282, -Math.PI],
        parts: [["Building5b_T_B5base_gray_0", "T_B5base_gray"]],
    },
    {
        position: [1919.172, 0, 731.193],
        rotation: [-Math.PI, -0.711, -Math.PI],
        parts: [["Building4b_T_B4base_gray_0", "T_B4base_gray"]],
    },
];

const CORNERS = [
    { direction: [-1, 1], offset: [8, 8], angle: -30, color: "red" },
    { direction: [1, 1], offset: [6, 8], angle: 50, color: "green" },
    { direction: [-1, -1], offset: [8, 8], angle: -120, color: "yellow" },
    { direction: [1, -1], offset: [5, 5], angle: 130, color: "blue" },
];
// Slightly smaller clusters keep the board legible at carousel size.
const PACK_SCALE = 0.0065;

function transform(position, rotation, scale = 1) {
    return new Matrix4().compose(
        new Vector3(...position),
        new Quaternion().setFromEuler(new Euler(...rotation)),
        new Vector3(scale, scale, scale),
    );
}

export function createCityLayout(nodes, seed) {
    let value = seed;
    const random = () => {
        value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
        return value / 4294967296;
    };
    const groups = new Map();
    const cityBounds = new Box3();
    const nodeBounds = new Map(
        BUILDINGS.flatMap(({ parts }) =>
            parts.map(([node]) => [
                node,
                new Box3().setFromBufferAttribute(
                    nodes[node].geometry.attributes.position,
                ),
            ]),
        ),
    );

    function addPack(position, rotation, direction, color, scatter) {
        const parent = transform(position, [0, rotation, 0]);
        const bounds = new Box3();
        const parts = BUILDINGS.flatMap((building) => {
            // The filler pack scatters each building in the same 600..700
            // radius annulus, with a random yaw, before scaling the cluster.
            const angle = scatter ? random() * Math.PI * 2 : 0;
            const radius = scatter ? 600 + random() * 100 : 0;
            const local = transform(
                scatter
                    ? [Math.cos(angle) * radius, 0, Math.sin(angle) * radius]
                    : building.position,
                scatter ? [0, random() * Math.PI * 2, 0] : building.rotation,
            );
            const matrix = parent
                .clone()
                .multiply(
                    new Matrix4().makeScale(PACK_SCALE, PACK_SCALE, PACK_SCALE),
                )
                .multiply(local);
            return building.parts.map(([node, material]) => {
                bounds.union(nodeBounds.get(node).clone().applyMatrix4(matrix));
                return { node, material, matrix: matrix.clone() };
            });
        });

        // BoardSafeBuildings' footprint correction, in preview coordinates.
        // World coordinates would break when the carousel scales/rotates it.
        const edge = BOARD_SIZE + 2;
        const correction = (side, low, high) =>
            side > 0
                ? Math.max(0, edge - low)
                : side < 0
                  ? Math.min(0, -edge - high)
                  : 0;
        const shift = new Vector3(
            correction(direction[0], bounds.min.x, bounds.max.x),
            0,
            correction(direction[1], bounds.min.z, bounds.max.z),
        );
        const translation = new Matrix4().makeTranslation(...shift.toArray());
        cityBounds.union(bounds.translate(shift));
        for (const { node, material, matrix } of parts) {
            if (!groups.has(node))
                groups.set(node, { node, material, instances: [] });
            groups.get(node).instances.push({
                matrix: matrix.premultiply(translation),
                color,
            });
        }
    }

    for (const { direction, offset, angle, color } of CORNERS) {
        addPack(
            [
                direction[0] * (BOARD_SIZE + offset[0]),
                0,
                direction[1] * (BOARD_SIZE + offset[1]),
            ],
            (angle * Math.PI) / 180,
            direction,
            color,
            false,
        );
    }
    for (const direction of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ]) {
        addPack(
            [
                direction[0] * BOARD_SIZE * 1.9,
                0,
                direction[1] * BOARD_SIZE * 1.9,
            ],
            0,
            direction,
            "white",
            true,
        );
    }

    const radius =
        Math.hypot(
            Math.max(Math.abs(cityBounds.min.x), Math.abs(cityBounds.max.x)),
            Math.max(Math.abs(cityBounds.min.z), Math.abs(cityBounds.max.z)),
        ) + 3;
    return { batches: Array.from(groups.values()), radius };
}

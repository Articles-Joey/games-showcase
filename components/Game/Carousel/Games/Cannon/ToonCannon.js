"use client";

import { memo, useEffect, useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { Base, Geometry, Subtraction } from "@react-three/csg";
import { ExtrudeGeometry, Shape, Vector2 } from "three";
import { TOON_CANNON_DIMENSIONS } from "./modelDimensions";

const RED = "#f20b19";
const BLUE = "#172bdb";
const MUZZLE_Z = -TOON_CANNON_DIMENSIONS.muzzleDistance;
const MUZZLE_RADIUS = 0.52;
const BORE_RADIUS = 0.39;
const BAND_Z = -0.81;
const PLATE_THICKNESS = 0.22;
const STAR_ROWS = [-1.1, -1.4, -1.7, -2.0];

// Radius / longitudinal position. The thicker breech tapers toward the smaller muzzle.
const BARREL_OUTLINE = [
    [MUZZLE_RADIUS, MUZZLE_Z],
    [0.522, -2.14],
    [0.558, -1.05],
    [0.567, -0.9],
    [0.575, -0.75],
    [0.61, -0.05],
    [0.625, 0.5],
    [0.58, 0.7],
    [0.405, 0.87],
    [0.18, 0.96],
    [0, 0.985],
];
const BARREL_PROFILE = [
    new Vector2(0, MUZZLE_Z),
    ...BARREL_OUTLINE.map(([radius, z]) => new Vector2(radius, z)),
];
const BAND_PROFILE = [
    [-0.12, -0.012],
    [-0.12, 0.064],
    [-0.08, 0.092],
    [0.08, 0.092],
    [0.12, 0.064],
    [0.12, -0.012],
    [-0.12, -0.012],
].map(
    ([z, raisedRadius]) =>
        new Vector2(barrelRadiusAt(BAND_Z + z) + raisedRadius, z),
);

function polygon(points) {
    const shape = new Shape();
    points.forEach(([x, y], index) => {
        if (index === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
    });
    shape.closePath();
    return shape;
}

const PLATE_SHAPE = polygon([
    [-0.8, 0.01],
    [0.8, 0.01],
    [0.69, 1.07],
    [0.35, 1.43],
    [-0.35, 1.43],
    [-0.69, 1.07],
]);
const PLATE_PANEL = polygon([
    [-0.66, 0.025],
    [0.66, 0.025],
    [0.56, 1.025],
    [0.29, 1.305],
    [-0.29, 1.305],
    [-0.56, 1.025],
]);
const PLATE_OPTIONS = {
    depth: PLATE_THICKNESS,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 1,
};
const BOLT_POSITIONS = [
    [0, 1.16],
    [-0.36, 0.94],
    [0.36, 0.94],
    [-0.5, 0.18],
    [0.5, 0.18],
];

// Local-position gradients keep their lighting and do not depend on painted textures or UVs.
function gradientShader(fragment) {
    return (shader) => {
        shader.vertexShader = shader.vertexShader
            .replace(
                "#include <common>",
                "#include <common>\nvarying vec3 vCannonPosition;",
            )
            .replace(
                "#include <begin_vertex>",
                "#include <begin_vertex>\nvCannonPosition = position;",
            );
        shader.fragmentShader = shader.fragmentShader
            .replace(
                "#include <common>",
                "#include <common>\nvarying vec3 vCannonPosition;",
            )
            .replace(
                "#include <color_fragment>",
                `#include <color_fragment>\n${fragment}`,
            );
    };
}

const GRADIENTS = {
    plate: gradientShader(`
        float dirtHeight = 0.36 + 0.025 * sin(vCannonPosition.x * 11.0)
            + 0.012 * sin(vCannonPosition.x * 29.0);
        float cleanPlate = smoothstep(0.025, dirtHeight, vCannonPosition.y);
        diffuseColor.rgb *= mix(vec3(0.28, 0.15, 0.065), vec3(1.0), cleanPlate);
    `),
    barrel: gradientShader(`
        float distanceFromMouth = max(vCannonPosition.z + ${-MUZZLE_Z}, 0.0);
        float soot = 1.0 - smoothstep(0.0, 0.43, distanceFromMouth);
        float rim = 1.0 - smoothstep(${BORE_RADIUS}, ${MUZZLE_RADIUS}, length(vCannonPosition.xy));
        diffuseColor.rgb *= mix(vec3(1.0), vec3(0.22), soot * (0.28 + 0.72 * rim));
    `),
    bore: gradientShader(`
        float depthIntoBore = max(vCannonPosition.z + ${-MUZZLE_Z}, 0.0);
        float darkness = smoothstep(0.0, 0.85, depthIntoBore);
        diffuseColor.rgb *= mix(vec3(0.17), vec3(0.006), darkness);
    `),
};

function GradientMaterial({ gradient, ...props }) {
    return (
        <meshStandardMaterial
            color="#ffffff"
            roughness={0.82}
            onBeforeCompile={GRADIENTS[gradient]}
            customProgramCacheKey={() => `toon-cannon-${gradient}-v2`}
            {...props}
        />
    );
}

function barrelRadiusAt(z) {
    for (let index = 1; index < BARREL_OUTLINE.length; index += 1) {
        const [previousRadius, previousZ] = BARREL_OUTLINE[index - 1];
        const [radius, currentZ] = BARREL_OUTLINE[index];
        if (z <= currentZ) {
            const fraction = (z - previousZ) / (currentZ - previousZ);
            return previousRadius + (radius - previousRadius) * fraction;
        }
    }
    return 0;
}

function createStarGeometry(z) {
    const shape = polygon(
        Array.from({ length: 10 }, (_, index) => {
            const angle = Math.PI / 2 + (index * Math.PI) / 5;
            const radius = index % 2 === 0 ? 0.112 : 0.048;
            return [Math.cos(angle) * radius, Math.sin(angle) * radius];
        }),
    );
    const geometry = new ExtrudeGeometry(shape, {
        depth: 0.025,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: 0.006,
        bevelSize: 0.006,
        bevelSegments: 1,
    });
    const positions = geometry.getAttribute("position");
    const centerRadius = barrelRadiusAt(z);

    // Bend each badge around the tapered barrel so the back stays against the surface.
    for (let index = 0; index < positions.count; index += 1) {
        const x = positions.getX(index);
        const radius = barrelRadiusAt(z - positions.getY(index));
        positions.setZ(
            index,
            positions.getZ(index) +
                Math.sqrt(radius * radius - x * x) -
                centerRadius,
        );
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
}

function AnchorBolt({ position }) {
    return (
        <group position={position}>
            <mesh
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 0, 0.012]}
                castShadow
            >
                <cylinderGeometry args={[0.043, 0.043, 0.08, 10]} />
                <meshStandardMaterial
                    color="#9a9da5"
                    metalness={0.35}
                    roughness={0.65}
                />
            </mesh>
            <mesh
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 0, 0.021]}
                castShadow
                receiveShadow
            >
                <cylinderGeometry args={[0.11, 0.11, 0.025, 16]} />
                <meshStandardMaterial
                    color="#d7d8df"
                    metalness={0.12}
                    roughness={0.65}
                />
            </mesh>
            <mesh
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 0, 0.055]}
                castShadow
                receiveShadow
            >
                <cylinderGeometry args={[0.082, 0.089, 0.06, 6]} />
                <meshStandardMaterial
                    color="#f1f1f6"
                    metalness={0.1}
                    roughness={0.62}
                />
            </mesh>
            <mesh
                position={[0, 0, 0.085]}
                scale={[1, 1, 0.62]}
                castShadow
                receiveShadow
            >
                <sphereGeometry args={[0.094, 16, 8]} />
                <meshStandardMaterial
                    color="#f5f5fa"
                    metalness={0.1}
                    roughness={0.58}
                />
            </mesh>
        </group>
    );
}

function AnchorPlate({ side }) {
    const faceZ = PLATE_THICKNESS / 2 + 0.009;
    return (
        <group
            position={[side * 0.75, 0, 0.12]}
            rotation={[0, (side * Math.PI) / 2, 0]}
        >
            {/* The solid extrusion supplies red top, sloped shoulders, edges, and border. */}
            <mesh
                position={[0, 0, -PLATE_THICKNESS / 2]}
                renderOrder={0}
                castShadow
                receiveShadow
            >
                <extrudeGeometry args={[PLATE_SHAPE, PLATE_OPTIONS]} />
                <meshStandardMaterial
                    color={RED}
                    roughness={0.72}
                    flatShading
                />
            </mesh>
            {[1, -1].map((face) => (
                <mesh
                    key={face}
                    position={[0, 0, face * faceZ]}
                    rotation={[0, face === 1 ? 0 : Math.PI, 0]}
                    renderOrder={1}
                    receiveShadow
                >
                    <shapeGeometry args={[PLATE_PANEL]} />
                    <GradientMaterial
                        gradient="plate"
                        polygonOffset
                        polygonOffsetFactor={-1}
                        polygonOffsetUnits={-1}
                    />
                </mesh>
            ))}
            {BOLT_POSITIONS.map(([x, y], index) => (
                <AnchorBolt
                    key={index}
                    position={[x, y, faceZ]}
                />
            ))}
        </group>
    );
}

const BarrelGeometry = memo(function BarrelGeometry() {
    const starGeometries = useMemo(() => STAR_ROWS.map(createStarGeometry), []);
    useEffect(
        () => () => starGeometries.forEach((geometry) => geometry.dispose()),
        [starGeometries],
    );

    return (
        <group rotation={[0, Math.PI, 0]}>
            <mesh
                name="HollowBarrel"
                castShadow
                receiveShadow
            >
                <Geometry useGroups>
                    <Base rotation={[Math.PI / 2, 0, 0]}>
                        <latheGeometry args={[BARREL_PROFILE, 32]} />
                        <GradientMaterial gradient="barrel" />
                    </Base>
                    {/* The cutter extends beyond the muzzle but stops before the rounded breech. */}
                    <Subtraction
                        position={[0, 0, -1.45]}
                        rotation={[Math.PI / 2, 0, 0]}
                    >
                        <cylinderGeometry
                            args={[BORE_RADIUS, BORE_RADIUS, 2.5, 32]}
                        />
                        <GradientMaterial gradient="bore" />
                    </Subtraction>
                </Geometry>
            </mesh>

            <mesh
                name="RaisedRedBand"
                position={[0, 0, BAND_Z]}
                rotation={[Math.PI / 2, 0, 0]}
                castShadow
                receiveShadow
            >
                <latheGeometry args={[BAND_PROFILE, 16]} />
                <meshStandardMaterial
                    color={RED}
                    roughness={0.64}
                    flatShading
                />
            </mesh>

            {STAR_ROWS.map((z, row) =>
                Array.from({ length: 8 }, (_, column) => {
                    const angle =
                        (column * Math.PI) / 4 + ((row % 2) * Math.PI) / 8;
                    const radius = barrelRadiusAt(z) - 0.003;
                    return (
                        <group
                            key={`${row}-${column}`}
                            position={[
                                Math.sin(angle) * radius,
                                Math.cos(angle) * radius,
                                z,
                            ]}
                            rotation={[0, 0, -angle]}
                        >
                            <mesh
                                name="RaisedStar"
                                rotation={[-Math.PI / 2, 0, 0]}
                                castShadow
                                receiveShadow
                            >
                                <primitive
                                    object={starGeometries[row]}
                                    attach="geometry"
                                />
                                <meshStandardMaterial
                                    color={
                                        (row + column) % 3 === 1 ? BLUE : RED
                                    }
                                    roughness={0.66}
                                />
                            </mesh>
                        </group>
                    );
                }),
            )}
        </group>
    );
});

export function ToonCannonBase(props) {
    return (
        <group
            name="ToonCannonBase"
            {...props}
        >
            <AnchorPlate side={-1} />
            <AnchorPlate side={1} />
            <RoundedBox
                args={[1.3, 0.12, 0.18]}
                radius={0.025}
                smoothness={2}
                position={[0, 0.06, 0.7]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={RED}
                    roughness={0.8}
                />
            </RoundedBox>
            <mesh
                position={[0, TOON_CANNON_DIMENSIONS.pivotHeight, 0]}
                rotation={[0, 0, Math.PI / 2]}
                castShadow
            >
                <cylinderGeometry args={[0.12, 0.12, 1.48, 16]} />
                <meshStandardMaterial
                    color="#dedee7"
                    metalness={0.15}
                    roughness={0.7}
                />
            </mesh>
        </group>
    );
}

// Yaw precedes pitch, matching the game's firing direction in ControlsOverlay.
export function ToonCannonBarrel({
    rotation = [-Math.PI / 9, 0, 0],
    children,
    ...props
}) {
    return (
        <group
            name="ToonCannonBarrel"
            position={[0, TOON_CANNON_DIMENSIONS.pivotHeight, 0]}
            {...props}
            rotation={[
                rotation[0] ?? 0,
                rotation[1] ?? 0,
                rotation[2] ?? 0,
                "YXZ",
            ]}
        >
            <BarrelGeometry />
            <group
                name="ToonCannonMuzzle"
                position={[0, 0, TOON_CANNON_DIMENSIONS.muzzleDistance]}
            >
                {children}
            </group>
        </group>
    );
}

/**
 * Procedural recreation of the supplied Toontown cannon images, for an R3F Canvas.
 * Ground is y=0 and the muzzle points toward +Z, matching the game's firing axis.
 * barrelRotation is the player's [pitch, yaw, roll] in radians; the base follows yaw only.
 * Children attach to the muzzle and follow the barrel's aim.
 * Standard group props such as position, rotation, scale, and ref place the assembly.
 */
export function ToonCannon({
    pitch = -Math.PI / 9,
    barrelRotation = [pitch, 0, 0],
    children,
    ...props
}) {
    return (
        <group
            name="ToonCannon"
            {...props}
        >
            <ToonCannonBase rotation={[0, barrelRotation[1] ?? 0, 0]} />
            <ToonCannonBarrel rotation={barrelRotation}>
                {children}
            </ToonCannonBarrel>
        </group>
    );
}

export default ToonCannon;

import { useGLTF, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
    memo,
    Suspense,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";
import {
    DoubleSide,
    Euler,
    Matrix4,
    MeshBasicMaterial,
    Object3D,
    PlaneGeometry,
    Quaternion,
    SRGBColorSpace,
    Vector2,
    Vector3,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { useStore } from "@/components/hooks/useStore";
import DeferredPreview from "../shared/DeferredPreview";
import { usePreviewFrame } from "../shared/PreviewActivity";
import { FENCE_RADIUS } from "./layout";
import rearClip from "./rearClip";

const IMAGE_ROOT = "/img/stop-the-thieves/";
const HILL_IMAGES = ["BG5_1.png", "BG5_2.png", "BG5_3.png"].map(
    (name) => IMAGE_ROOT + name,
);

function colorMap(source) {
    const texture = source.clone();
    texture.colorSpace = SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
}

function ringPanels(radius, height, segments, textureCount, width) {
    const groups = Array.from({ length: textureCount }, () => []);
    const placement = new Matrix4();
    for (let index = 0; index < segments; index += 1) {
        const angle = (index / segments) * Math.PI * 2;
        placement.compose(
            new Vector3(
                Math.cos(angle) * radius,
                height / 2,
                Math.sin(angle) * radius,
            ),
            new Quaternion().setFromEuler(
                new Euler(0, -angle - Math.PI / 2, 0),
            ),
            new Vector3(1, 1, 1),
        );
        groups[index % textureCount].push(
            new PlaneGeometry(width, height).applyMatrix4(placement),
        );
    }
    return groups.map((parts) => {
        const geometry = mergeGeometries(parts);
        parts.forEach((part) => part.dispose());
        return geometry;
    });
}

function FlowerFence() {
    const source = useTexture(`${IMAGE_ROOT}fenceW_flower.png`);
    const texture = useMemo(() => colorMap(source), [source]);
    const geometry = useMemo(
        () =>
            ringPanels(
                FENCE_RADIUS,
                2.5,
                64,
                1,
                2 * FENCE_RADIUS * Math.tan(Math.PI / 64) * 1.02,
            )[0],
        [],
    );
    useEffect(
        () => () => {
            geometry.dispose();
            texture.dispose();
        },
        [geometry, texture],
    );
    return (
        <mesh geometry={geometry}>
            <meshBasicMaterial
                map={texture}
                side={DoubleSide}
                alphaTest={0.5}
            />
        </mesh>
    );
}

function Hills({ direction }) {
    const sources = useTexture(HILL_IMAGES);
    const darkMode = useStore((state) => state.darkMode);
    const geometry = useMemo(
        () => ringPanels(30, 10, 8, 3, ((2 * Math.PI * 30) / 8) * 1.1),
        [],
    );
    const materials = useMemo(
        () =>
            sources.map((source) =>
                rearClip(
                    new MeshBasicMaterial({
                        map: colorMap(source),
                        transparent: true,
                        depthWrite: false,
                        alphaTest: 0.02,
                        color: darkMode ? "#9c9c9c" : "white",
                    }),
                    direction,
                ),
            ),
        [sources, darkMode, direction],
    );
    useEffect(
        () => () => geometry.forEach((item) => item.dispose()),
        [geometry],
    );
    useEffect(
        () => () =>
            materials.forEach((material) => {
                material.map.dispose();
                material.dispose();
            }),
        [materials],
    );
    return geometry.map((item, index) => (
        <mesh
            key={index}
            geometry={item}
            material={materials[index]}
            renderOrder={-1}
        />
    ));
}

function TreeImages({ direction, cameraPosition, updateCamera }) {
    const source = useTexture(`${IMAGE_ROOT}tree_big.png`);
    const darkMode = useStore((state) => state.darkMode);
    const mesh = useRef();
    const previousCamera = useRef(new Vector3(Infinity, Infinity, Infinity));
    const transform = useMemo(() => new Object3D(), []);
    const aspect = source.image.width / source.image.height;
    const trees = useMemo(() => {
        const value = (seed) => {
            const n = Math.sin(seed * 127.1) * 43758.5453;
            return n - Math.floor(n);
        };
        return Array.from({ length: 20 }, (_, index) => {
            const angle =
                ((index + 0.15 + value(index + 1) * 0.7) / 20) * Math.PI * 2;
            const radius = 25.75 + value(index + 31) * 3.5;
            return {
                x: Math.cos(angle) * radius,
                z: Math.sin(angle) * radius,
                height: 7 + value(index + 61) * 2.5,
            };
        });
    }, []);
    const geometry = useMemo(() => new PlaneGeometry(1, 1), []);
    const material = useMemo(
        () =>
            rearClip(
                new MeshBasicMaterial({
                    map: colorMap(source),
                    transparent: true,
                    alphaTest: 0.05,
                    depthWrite: false,
                    side: DoubleSide,
                    color: darkMode ? "#aaa" : "white",
                }),
                direction,
            ),
        [source, darkMode, direction],
    );

    const faceCamera = useCallback(
        (force = false) => {
            if (
                !mesh.current ||
                (!force &&
                    previousCamera.current.distanceToSquared(cameraPosition) <
                        0.000001)
            )
                return;
            previousCamera.current.copy(cameraPosition);
            trees.forEach((tree, index) => {
                transform.position.set(tree.x, tree.height / 2 + 0.02, tree.z);
                transform.rotation.set(
                    0,
                    Math.atan2(
                        cameraPosition.x - tree.x,
                        cameraPosition.z - tree.z,
                    ),
                    0,
                );
                transform.scale.set(tree.height * aspect, tree.height, 1);
                transform.updateMatrix();
                mesh.current.setMatrixAt(index, transform.matrix);
            });
            mesh.current.instanceMatrix.needsUpdate = true;
        },
        [trees, cameraPosition, transform, aspect],
    );
    useLayoutEffect(() => {
        updateCamera();
        faceCamera(true);
        mesh.current.computeBoundingSphere();
        mesh.current.boundingSphere.radius += (9.5 * aspect) / 2;
    }, [faceCamera, updateCamera, material]);
    usePreviewFrame(() => faceCamera());
    useEffect(() => () => geometry.dispose(), [geometry]);
    useEffect(
        () => () => {
            material.map.dispose();
            material.dispose();
        },
        [material],
    );
    return (
        <instancedMesh
            ref={mesh}
            args={[geometry, material, trees.length]}
        />
    );
}

function Clouds({ direction }) {
    const { nodes, materials } = useGLTF("/models/stop-the-thieves/clouds.glb");
    const darkMode = useStore((state) => state.darkMode);
    const mesh = useRef();
    const localDirection = useMemo(() => ({ value: new Vector2(0, 1) }), []);
    const origin = useMemo(() => new Vector2(), []);
    const geometry = useMemo(() => {
        // Only the cloud mesh is used; the opaque sky shell is never mounted.
        const result = nodes.TT_sky_2.geometry.clone().rotateX(Math.PI / 2);
        result.computeBoundingBox();
        const center = result.boundingBox.getCenter(new Vector3());
        const height = Math.max(
            result.boundingBox.max.y - result.boundingBox.min.y,
            0.01,
        );
        const bottom = result.boundingBox.min.y;
        const positions = result.attributes.position;
        let radius = 0;
        for (let index = 0; index < positions.count; index += 1) {
            radius = Math.max(
                radius,
                Math.hypot(
                    positions.getX(index) - center.x,
                    positions.getZ(index) - center.z,
                ),
            );
        }
        const scale = 34 / Math.max(radius, 0.01);
        for (let index = 0; index < positions.count; index += 1) {
            positions.setXYZ(
                index,
                (positions.getX(index) - center.x) * scale,
                12 + ((positions.getY(index) - bottom) / height) * 9,
                (positions.getZ(index) - center.z) * scale,
            );
        }
        positions.needsUpdate = true;
        result.computeVertexNormals();
        result.computeBoundingBox();
        result.computeBoundingSphere();
        return result;
    }, [nodes]);
    const material = useMemo(() => {
        const result =
            materials.toontown_central_tutorial_palette_4amla_1.clone();
        result.transparent = true;
        result.depthWrite = false;
        result.alphaTest = 0.03;
        result.side = DoubleSide;
        result.color.multiplyScalar(darkMode ? 0.65 : 1);
        return rearClip(result, localDirection);
    }, [materials, darkMode, localDirection]);
    useLayoutEffect(() => {
        // A Three.js Y rotation has the opposite sign to a 2D X/Z rotation.
        localDirection.value
            .copy(direction.value)
            .rotateAround(origin, mesh.current.rotation.y);
    }, [direction, localDirection, origin, material]);
    usePreviewFrame((_, delta, elapsed) => {
        const angle = elapsed * 0.01;
        mesh.current.rotation.y = angle;
        localDirection.value.copy(direction.value).rotateAround(origin, angle);
    });
    useEffect(() => () => geometry.dispose(), [geometry]);
    useEffect(() => () => material.dispose(), [material]);
    return (
        <mesh
            ref={mesh}
            geometry={geometry}
            material={material}
            renderOrder={-2}
        />
    );
}

function Scenery() {
    const root = useRef();
    const camera = useThree((state) => state.camera);
    const cameraPosition = useMemo(() => new Vector3(0, 0, 1), []);
    const direction = useMemo(() => ({ value: new Vector2(0, 1) }), []);
    const updateCamera = useCallback(() => {
        if (!root.current) return;
        camera.getWorldPosition(cameraPosition);
        root.current.worldToLocal(cameraPosition);
        direction.value.set(cameraPosition.x, cameraPosition.z);
        if (direction.value.lengthSq() < 0.000001) direction.value.set(0, 1);
        else direction.value.normalize();
    }, [camera, cameraPosition, direction]);
    useLayoutEffect(updateCamera, [updateCamera]);
    usePreviewFrame(updateCamera, -0.75);

    return (
        <group ref={root}>
            <Suspense fallback={null}>
                <FlowerFence />
            </Suspense>
            <Suspense fallback={null}>
                <Hills direction={direction} />
            </Suspense>
            <Suspense fallback={null}>
                <TreeImages
                    direction={direction}
                    cameraPosition={cameraPosition}
                    updateCamera={updateCamera}
                />
            </Suspense>
            <DeferredPreview>
                <Clouds direction={direction} />
            </DeferredPreview>
        </group>
    );
}

export default memo(Scenery);

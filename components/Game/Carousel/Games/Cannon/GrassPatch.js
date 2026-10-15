// Small circular adaptation of the Cannon project's GrassPlane and GrassArea.
import { memo, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";
import { useTexture } from "@react-three/drei";
import {
    BufferAttribute,
    BufferGeometry,
    DoubleSide,
    NearestFilter,
    Object3D,
    RepeatWrapping,
    SRGBColorSpace,
} from "three";
import { useStore } from "@/components/hooks/useStore";

const CLEARINGS = [
    { x: -1.7, z: 1.2, radius: 0.95 },
    { x: 1.3, z: -1.2, radius: 1.1 },
];

const vertexShader = /* glsl */ `
    varying vec2 vUv;
    uniform float time;

    void main() {
        vUv = uv;
        vec4 localPosition = instanceMatrix * vec4(position, 1.0);
        float swayAmount = vUv.y * vUv.y;
        float phase = localPosition.x * 0.7 + localPosition.z * 0.5;
        localPosition.x += sin(time * 1.5 + phase) * swayAmount * 0.1;
        localPosition.z += cos(time * 1.1 + phase) * swayAmount * 0.048;
        // The patch inherits the carousel's position, rotation, and animated scale.
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * localPosition;
    }
`;

const fragmentShader = /* glsl */ `
    varying vec2 vUv;
    uniform float brightness;

    void main() {
        vec3 baseColor = vec3(0.08, 0.35, 0.08);
        vec3 tipColor = vec3(0.38, 0.68, 0.18);
        gl_FragColor = vec4(mix(baseColor, tipColor, vUv.y) * brightness, 1.0);
        #include <colorspace_fragment>
    }
`;

function createBladeGeometry() {
    const geometry = new BufferGeometry();
    const width = 0.05;
    const height = 0.8;
    geometry.setAttribute(
        "position",
        new BufferAttribute(
            new Float32Array([
                -width,
                0,
                0,
                width,
                0,
                0,
                -width * 0.5,
                height * 0.5,
                0,
                width * 0.5,
                height * 0.5,
                0,
                0,
                height,
                0,
            ]),
            3,
        ),
    );
    geometry.setAttribute(
        "uv",
        new BufferAttribute(
            new Float32Array([0, 0, 1, 0, 0, 0.5, 1, 0.5, 0.5, 1]),
            2,
        ),
    );
    geometry.setIndex([0, 1, 2, 1, 3, 2, 2, 3, 4]);
    geometry.computeVertexNormals();
    return geometry;
}

function GrassPatch({ radius = 3.9, count = 1800, clearings = CLEARINGS }) {
    const darkMode = useStore((state) => state.darkMode);
    const sourceTexture = useTexture("/img/cannon/grass.png");
    const blades = useRef();
    const geometry = useMemo(createBladeGeometry, []);
    const uniforms = useMemo(
        () => ({
            time: { value: 0 },
            brightness: { value: 1 },
        }),
        [],
    );
    const texture = useMemo(() => {
        const map = sourceTexture.clone();
        map.magFilter = NearestFilter;
        map.wrapS = map.wrapT = RepeatWrapping;
        map.repeat.set((radius * 2) / 0.75, (radius * 2) / 0.75);
        map.colorSpace = SRGBColorSpace;
        map.needsUpdate = true;
        return map;
    }, [sourceTexture, radius]);

    useEffect(() => () => geometry.dispose(), [geometry]);
    useEffect(() => () => texture.dispose(), [texture]);
    useEffect(() => {
        uniforms.brightness.value = darkMode ? 0.3 : 1;
    }, [darkMode, uniforms]);

    useLayoutEffect(() => {
        const mesh = blades.current;
        const transform = new Object3D();
        for (let index = 0; index < count; index += 1) {
            let x;
            let z;
            let attempts = 0;
            do {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.sqrt(Math.random()) * (radius - 0.05);
                x = Math.cos(angle) * distance;
                z = Math.sin(angle) * distance;
                attempts += 1;
            } while (
                attempts < 40 &&
                clearings.some(
                    (clearing) =>
                        (x - clearing.x) ** 2 + (z - clearing.z) ** 2 <
                        clearing.radius ** 2,
                )
            );
            transform.position.set(x, 0.01, z);
            transform.rotation.y = Math.random() * Math.PI * 2;
            transform.scale.setScalar(0.35 + Math.random() * 0.2);
            transform.updateMatrix();
            mesh.setMatrixAt(index, transform.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();
        mesh.boundingSphere.radius += 0.15;
    }, [count, radius, clearings]);

    usePreviewFrame((_, delta, elapsed) => {
        uniforms.time.value = elapsed;
    });

    return (
        <group>
            <mesh position={[0, -0.06, 0]}>
                <cylinderGeometry args={[radius, radius * 0.98, 0.12, 48]} />
                <meshStandardMaterial
                    color="#765438"
                    roughness={1}
                />
            </mesh>
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.005, 0]}
            >
                <circleGeometry args={[radius, 48]} />
                <meshStandardMaterial
                    map={texture}
                    color={darkMode ? "#8c8c8c" : "#ffffff"}
                    roughness={1}
                />
            </mesh>
            <instancedMesh
                ref={blades}
                args={[geometry, null, count]}
            >
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    side={DoubleSide}
                    toneMapped={false}
                />
            </instancedMesh>
        </group>
    );
}

export default memo(GrassPatch);

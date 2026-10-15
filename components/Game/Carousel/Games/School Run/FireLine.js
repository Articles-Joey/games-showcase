import { useLayoutEffect, useMemo } from "react";
import { AdditiveBlending } from "three";
import { usePreviewFrame } from "../shared/PreviewActivity";

const COUNT = 320;
const vertexShader = /* glsl */ `
    uniform float uTime;
    attribute float aSpeed;
    attribute float aOffset;
    varying float vLife;
    void main() {
        float life = fract(uTime * aSpeed + aOffset);
        vLife = life;
        vec3 p = position;
        p.y += life * 2.5;
        p.x += sin(life * 10.0 + aOffset) * life * 0.1;
        p.z += cos(life * 10.0 + aOffset) * life * 0.1;
        vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * viewPosition;
        gl_PointSize = 220.0 * length(modelMatrix[1].xyz) * sin(life * 3.14159) / max(0.1, -viewPosition.z);
    }
`;
const fragmentShader = /* glsl */ `
    varying float vLife;
    void main() {
        float radius = max(distance(gl_PointCoord, vec2(0.5)), 0.02);
        float strength = max(0.0, 0.05 / radius - 0.1);
        vec3 color = mix(vec3(0.5, 0.9, 1.0), vec3(0.1, 0.4, 1.0), step(0.1, vLife));
        color = mix(color, vec3(0.0, 0.1, 0.5), smoothstep(0.1, 0.8, vLife));
        gl_FragColor = vec4(color, strength * (1.0 - vLife));
        #include <colorspace_fragment>
    }
`;

export default function FireLine({ time }) {
    const attributes = useMemo(() => {
        const positions = new Float32Array(COUNT * 3);
        const speeds = new Float32Array(COUNT);
        const offsets = new Float32Array(COUNT);
        for (let index = 0; index < COUNT; index += 1) {
            const seed = (index * 0.61803398875) % 1;
            positions[index * 3] = ((index + 0.5) / COUNT - 0.5) * 3;
            positions[index * 3 + 1] = seed * 0.1;
            positions[index * 3 + 2] =
                (((index * 0.754877666) % 1) - 0.5) * 0.1;
            speeds[index] = 0.2 + seed * 0.5;
            offsets[index] = (index * 0.41421356237) % 1;
        }
        return { positions, speeds, offsets };
    }, []);
    const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
    useLayoutEffect(() => {
        uniforms.uTime.value = time.current;
    }, [time, uniforms]);
    usePreviewFrame(() => {
        uniforms.uTime.value = time.current;
    });

    return (
        <points frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[attributes.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aSpeed"
                    args={[attributes.speeds, 1]}
                />
                <bufferAttribute
                    attach="attributes-aOffset"
                    args={[attributes.offsets, 1]}
                />
            </bufferGeometry>
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                blending={AdditiveBlending}
                transparent
                depthWrite={false}
                toneMapped={false}
            />
        </points>
    );
}

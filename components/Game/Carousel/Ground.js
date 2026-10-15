import { memo, useMemo } from "react";
import {
    Color,
    CustomBlending,
    OneFactor,
    OneMinusSrcAlphaFactor,
    SrcAlphaFactor,
} from "three";
import { useStore } from "@/components/hooks/useStore";

// Carousel cards sit around Z = 0; finish the fade four units behind them.
const FADE_END_Z = -4;
const FOREGROUND_Z = 1000;
const SIDE_PADDING = 1000;

const vertexShader = /* glsl */ `
    varying float vWorldZ;

    void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldZ = worldPosition.z;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
`;

const fragmentShader = /* glsl */ `
    uniform vec3 baseColor;
    uniform vec3 grayColor;
    uniform float fadeEndZ;
    varying float vWorldZ;

    void main() {
        float grayAmount = 1.0 - smoothstep(2.0, 20.0, vWorldZ);
        float opacity = 0.8 * smoothstep(fadeEndZ, 2.0, vWorldZ);
        vec3 color = mix(baseColor, grayColor, grayAmount);
        gl_FragColor = vec4(color, opacity);
        #include <colorspace_fragment>
    }
`;

function CarouselGround({ gameCount = 0 }) {
    const darkMode = useStore((state) => state.darkMode);
    const carouselWidth = Math.max(0, gameCount - 1) * 10;
    const uniforms = useMemo(
        () => ({
            baseColor: { value: new Color(darkMode ? "#000000" : "#ffffff") },
            grayColor: { value: new Color(darkMode ? "#555555" : "#dddddd") },
            fadeEndZ: { value: FADE_END_Z },
        }),
        [darkMode],
    );

    return (
        <mesh
            renderOrder={-1}
            position={[
                15 + carouselWidth / 2,
                -0.55,
                (FOREGROUND_Z + FADE_END_Z) / 2,
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
        >
            <planeGeometry
                args={[
                    carouselWidth + SIDE_PADDING * 2,
                    FOREGROUND_Z - FADE_END_Z,
                ]}
            />
            {/* Blend in the opaque pass so all preview meshes draw afterward. */}
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={false}
                blending={CustomBlending}
                blendSrc={SrcAlphaFactor}
                blendDst={OneMinusSrcAlphaFactor}
                blendSrcAlpha={OneFactor}
                blendDstAlpha={OneMinusSrcAlphaFactor}
                depthTest={false}
                depthWrite={false}
                toneMapped={false}
            />
        </mesh>
    );
}

export default memo(CarouselGround);

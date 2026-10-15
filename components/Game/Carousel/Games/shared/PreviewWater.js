import * as THREE from "three";
import { useRef, useMemo, useEffect, useLayoutEffect } from "react";
import { extend, useLoader } from "@react-three/fiber";
import { Water } from "three-stdlib";
import { useStore } from "@/components/hooks/useStore";
import { usePreviewActive, usePreviewFrame } from "./PreviewActivity";

extend({ Water });

const link = `${process.env.NEXT_PUBLIC_CDN}games/Race Game/waternormals.jpeg`;
const reflectingRenderers = new WeakSet();

export default function PreviewWater({
    radius = 5,
    size,
    speed = 1,
    waterColor = 0x001e0f,
    darkWaterColor = 0x011111,
    ...props
}) {
    const ref = useRef();
    const active = usePreviewActive();
    const darkMode = useStore((state) => state.darkMode);

    const sourceNormals = useLoader(THREE.TextureLoader, link);
    const waterNormals = useMemo(() => {
        const texture = sourceNormals.clone();
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.needsUpdate = true;
        return texture;
    }, [sourceNormals]);
    const geom = useMemo(
        () =>
            size
                ? new THREE.PlaneGeometry(size, size)
                : new THREE.CircleGeometry(radius, 48),
        [radius, size],
    );
    useEffect(() => () => geom.dispose(), [geom]);
    useEffect(() => () => waterNormals.dispose(), [waterNormals]);
    const config = useMemo(
        () => ({
            textureWidth: 256,
            textureHeight: 256,
            waterNormals,
            sunDirection: new THREE.Vector3(1000, 10, 0).normalize(),
            sunColor: darkMode ? 0x222222 : 0xffffff,
            waterColor: darkMode ? darkWaterColor : waterColor,
            distortionScale: 3.7,
            fog: false,
        }),
        [waterNormals, darkMode, waterColor, darkWaterColor],
    );
    useLayoutEffect(() => {
        const water = ref.current;
        if (!water) return;
        const reflect = water.onBeforeRender;
        water.onBeforeRender = (renderer, scene, camera) => {
            // Water normally renders the entire scene again for its reflection,
            // even when its time uniform is frozen. Skip inactive and nested passes.
            if (reflectingRenderers.has(renderer)) return;
            // Keep camera-dependent shading correct without advancing the water
            // or rendering another scene for an inactive preview.
            water.material.uniforms.eye.value.setFromMatrixPosition(
                camera.matrixWorld,
            );
            if (!active) return;
            reflectingRenderers.add(renderer);
            try {
                reflect.call(water, renderer, scene, camera);
            } finally {
                reflectingRenderers.delete(renderer);
            }
        };
        return () => {
            water.onBeforeRender = reflect;
        };
    }, [active, geom, config]);

    usePreviewFrame((state, delta) => {
        if (ref.current)
            ref.current.material.uniforms.time.value += delta * speed;
    });
    return (
        <water
            ref={ref}
            args={[geom, config]}
            {...props}
            rotation-x={-Math.PI / 2}
        />
    );
}

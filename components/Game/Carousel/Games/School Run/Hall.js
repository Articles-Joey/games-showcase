import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
    DynamicDrawUsage,
    MeshStandardMaterial,
    PlaneGeometry,
    RepeatWrapping,
    Sphere,
    SRGBColorSpace,
} from "three";
import { useStore } from "@/components/hooks/useStore";
import { usePreviewFrame } from "../shared/PreviewActivity";
import createHallBatches from "./hallLayout";
import { HALL_LENGTH, HALL_START, MODEL_URLS, sectionZ } from "./previewLayout";

const HALL_MODELS = [
    "doorway",
    "window",
    "brokenWindow",
    "locker",
    "desk",
    "chair",
    "screen",
    "keyboard",
    "television",
    "witch",
    "duck",
    "dog",
    "bear",
    "pear",
];
const HALL_URLS = HALL_MODELS.map((name) => MODEL_URLS[name]);
const TEXTURES = [
    "/img/school-run/COL_1K.jpg",
    "/img/school-run/NRM_1K.jpg",
    "/img/school-run/Color.jpg",
    "/img/school-run/OfficeCeiling006_1K-JPG_Color.jpg",
];

export default function Hall({ time }) {
    const loaded = useGLTF(HALL_URLS);
    const sources = useTexture(TEXTURES);
    const darkMode = useStore((state) => state.darkMode);
    const meshes = useRef([]);
    const surfaces = useMemo(() => {
        const textures = sources.map((source, index) => {
            const texture = source.clone();
            texture.wrapS = texture.wrapT = RepeatWrapping;
            texture.repeat.set(
                index < 2 ? 4 : index === 2 ? 4 : 2,
                index < 2 ? 2.5 : index === 2 ? 4 : 1,
            );
            if (index !== 1) texture.colorSpace = SRGBColorSpace;
            texture.needsUpdate = true;
            return texture;
        });
        const tint = darkMode ? "#9299b1" : "white";
        return {
            geometry: new PlaneGeometry(1, 1),
            wall: new MeshStandardMaterial({
                map: textures[0],
                normalMap: textures[1],
                color: tint,
                roughness: 0.9,
            }),
            floor: new MeshStandardMaterial({
                map: textures[2],
                color: tint,
                roughness: 0.65,
            }),
            ceiling: new MeshStandardMaterial({
                map: textures[3],
                color: tint,
                roughness: 1,
            }),
            textures,
        };
    }, [sources, darkMode]);
    const batches = useMemo(() => {
        const models = Object.fromEntries(
            HALL_MODELS.map((name, index) => [name, loaded[index]]),
        );
        return createHallBatches(models, surfaces);
    }, [loaded, surfaces]);

    useEffect(
        () => () => {
            surfaces.geometry.dispose();
            surfaces.wall.dispose();
            surfaces.floor.dispose();
            surfaces.ceiling.dispose();
            surfaces.textures.forEach((texture) => texture.dispose());
        },
        [surfaces],
    );

    function updatePositions(elapsed) {
        for (let batchIndex = 0; batchIndex < batches.length; batchIndex += 1) {
            const mesh = meshes.current[batchIndex];
            if (!mesh) continue;
            const { instances } = batches[batchIndex];
            const array = mesh.instanceMatrix.array;
            for (let index = 0; index < instances.length; index += 1) {
                const instance = instances[index];
                array[index * 16 + 14] =
                    instance.matrix.elements[14] +
                    sectionZ(instance.section, elapsed) -
                    instance.section;
            }
            mesh.instanceMatrix.needsUpdate = true;
        }
    }

    useLayoutEffect(() => {
        batches.forEach((batch, index) => {
            const mesh = meshes.current[index];
            mesh.instanceMatrix.setUsage(DynamicDrawUsage);
            batch.instances.forEach((instance, slot) =>
                mesh.setMatrixAt(slot, instance.matrix),
            );
            mesh.computeBoundingBox();
            mesh.boundingBox.min.z = HALL_START - 6;
            mesh.boundingBox.max.z = HALL_START + HALL_LENGTH + 6;
            mesh.boundingSphere = mesh.boundingBox.getBoundingSphere(
                new Sphere(),
            );
        });
        updatePositions(time.current);
    }, [batches, time]);

    usePreviewFrame(() => updatePositions(time.current));

    return (
        <group dispose={null}>
            {batches.map((batch, index) => (
                <instancedMesh
                    key={`${batch.geometry.uuid}:${index}`}
                    ref={(mesh) => {
                        meshes.current[index] = mesh;
                    }}
                    args={[
                        batch.geometry,
                        batch.material,
                        batch.instances.length,
                    ]}
                    dispose={null}
                />
            ))}
        </group>
    );
}

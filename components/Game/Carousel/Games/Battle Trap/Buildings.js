/*
Sci-fi Buildings Pack (low-poly, game ready), TampaJoey, CC-BY-4.0.
https://sketchfab.com/3d-models/sci-fi-buildings-pack-low-poly-game-ready-333a430644b34e688aecfdc874f4cbf2
*/
import { memo, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Color } from "three";
import DeferredPreview from "../shared/DeferredPreview";

function BuildingInstances({ geometry, material, instances }) {
    const mesh = useRef();
    useLayoutEffect(() => {
        const color = new Color();
        instances.forEach((instance, index) => {
            mesh.current.setMatrixAt(index, instance.matrix);
            mesh.current.setColorAt(index, color.set(instance.color));
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        mesh.current.instanceColor.needsUpdate = true;
        mesh.current.computeBoundingSphere();
    }, [instances]);
    return (
        <instancedMesh
            ref={mesh}
            args={[geometry, material, instances.length]}
            castShadow
            receiveShadow
        />
    );
}

function Buildings({ layout, nodes, materials }) {
    const overlays = useMemo(() => {
        const result = new Map();
        for (const batch of layout.batches) {
            if (result.has(batch.material)) continue;
            const material = materials[batch.material].clone();
            material.color.set("white");
            material.emissive = new Color("white");
            material.emissiveIntensity = 1.5;
            material.transparent = true;
            material.opacity = 0.7;
            // Instance color tints diffuse light automatically. Tint the
            // emission too, preserving the game's colored building overlays
            // while drawing all eight copies of each part in one call.
            material.onBeforeCompile = (shader) => {
                shader.fragmentShader = shader.fragmentShader.replace(
                    "#include <emissivemap_fragment>",
                    "#include <emissivemap_fragment>\n#ifdef USE_COLOR\n totalEmissiveRadiance *= vColor.rgb;\n#endif",
                );
            };
            material.customProgramCacheKey = () =>
                "battle-trap-building-overlay-v1";
            result.set(batch.material, material);
        }
        return result;
    }, [layout, materials]);
    useEffect(
        () => () => overlays.forEach((material) => material.dispose()),
        [overlays],
    );

    return layout.batches.map(({ node, material, instances }) => (
        <DeferredPreview key={node}>
            <BuildingInstances
                geometry={nodes[node].geometry}
                material={overlays.get(material)}
                instances={instances}
            />
        </DeferredPreview>
    ));
}

export default memo(Buildings);

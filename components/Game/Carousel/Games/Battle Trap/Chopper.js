/*
Low Poly Chopper by ArtyomOganesyan, CC-BY-NC-4.0.
https://sketchfab.com/3d-models/low-poly-chopper-aec69c979166446eb2c8e1503f570d26
Visual portion of Battle Trap's Bikes.js; one cached GLB shared by all players.
*/
import { useGLTF } from "@react-three/drei";

const MODEL_URL = "/models/battle-trap/low_poly_chopper.glb";
const BODY_PARTS = [
    ["motorcycle_Material_0", "Material"],
    ["motorcycle_Material001_0", "Material.001"],
    ["motorcycle_Material002_0", "Material.002"],
    ["motorcycle_Material003_0", "Material.003"],
    ["motorcycle_Material004_0", "Material.004"],
];

export default function Chopper(props) {
    const { nodes, materials } = useGLTF(MODEL_URL);
    return (
        <group
            {...props}
            dispose={null}
        >
            {[
                { key: "b", z: 341.451 },
                { key: "f", z: -338.549 },
            ].map(({ key, z }) => (
                <group
                    key={key}
                    position={[0, 145, z]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={100}
                >
                    <mesh
                        geometry={nodes[`${key}_Material002_0`].geometry}
                        material={materials["Material.002"]}
                    />
                    <mesh
                        geometry={nodes[`${key}_Material001_0`].geometry}
                        material={materials["Material.001"]}
                    />
                </group>
            ))}
            <group
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
            >
                {BODY_PARTS.map(([node, material]) => (
                    <mesh
                        key={node}
                        geometry={nodes[node].geometry}
                        material={materials[material]}
                    />
                ))}
            </group>
        </group>
    );
}

useGLTF.preload(MODEL_URL);

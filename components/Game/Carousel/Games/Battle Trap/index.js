import { useGLTF } from "@react-three/drei";
import { memo, useMemo, useRef, useState } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";
import GameGrid from "./GameGrid";
import FakeRound from "./FakeRound";
import Buildings from "./Buildings";
import { createCityLayout } from "./buildingLayout";

function BattleTrapScene() {
    const scene = useRef();
    const { nodes, materials } = useGLTF(
        "/models/battle-trap/sci-fi_buildings_pack.glb",
    );
    const [seed] = useState(() => Math.floor(Math.random() * 0x100000000));
    const city = useMemo(() => createCityLayout(nodes, seed), [nodes, seed]);
    usePreviewFrame((_, delta) => {
        if (scene.current) scene.current.rotation.y += delta * 0.08;
    });

    return (
        <group
            position={[4.5, 1.15, 0]}
            scale={4.6 / city.radius}
        >
            <group
                ref={scene}
                rotation={[0, Math.PI / 2, 0]}
            >
                <mesh
                    position={[0, -0.13, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <circleGeometry args={[city.radius, 96]} />
                    <meshBasicMaterial color="black" />
                </mesh>
                <GameGrid />
                <FakeRound />
                <Buildings
                    layout={city}
                    nodes={nodes}
                    materials={materials}
                />
            </group>
        </group>
    );
}

export default memo(BattleTrapScene);

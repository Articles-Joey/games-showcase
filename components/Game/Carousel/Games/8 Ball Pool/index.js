import { memo, useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";
import { Table, TableLegs } from "./components/Table";
import Balls from "./components/Balls";
import WoodFloor from "./components/WoodFloor";
import DeferredPreview from "../shared/DeferredPreview";

function EightBallPoolScene() {
    const preview = useRef();

    usePreviewFrame((_, delta) => {
        if (preview.current) preview.current.rotation.y += delta * 0.12;
    });

    return (
        <group
            scale={0.075}
            position={[5, 3.6, 0]}
        >
            <WoodFloor
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -30, 0]}
                args={[150, 150]}
            />
            <group ref={preview}>
                <TableLegs />
                <DeferredPreview>
                    <Table />
                </DeferredPreview>
                <DeferredPreview>
                    <Balls />
                </DeferredPreview>
                <mesh
                    position={[0, 1.26, 37]}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <cylinderGeometry args={[0.18, 0.3, 20, 24]} />
                    <meshStandardMaterial
                        color="#bc935f"
                        roughness={0.4}
                    />
                </mesh>
            </group>
        </group>
    );
}

export default memo(EightBallPoolScene);

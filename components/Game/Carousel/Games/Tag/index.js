import { ModelTagSwat } from "@/components/Models/Tag/Swat";
import { degToRad } from "three/src/math/MathUtils";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { Shape, Vector3 } from "three";
import GrassPatch from "../Cannon/GrassPatch";
import { usePreviewFrame } from "../shared/PreviewActivity";
import PreviewBillboard from "../shared/PreviewBillboard";

const GRASS_CLEARINGS = [
    { x: 0, z: -1.75, radius: 0.65 },
    { x: 0, z: 1.75, radius: 0.65 },
];

const ARROW_SHAPE = new Shape();
ARROW_SHAPE.moveTo(-0.43, 1.5);
ARROW_SHAPE.lineTo(0.43, 1.5);
ARROW_SHAPE.lineTo(0.43, 0.05);
ARROW_SHAPE.lineTo(0.9, 0.05);
ARROW_SHAPE.lineTo(0, -0.8);
ARROW_SHAPE.lineTo(-0.9, 0.05);
ARROW_SHAPE.lineTo(-0.43, 0.05);
ARROW_SHAPE.closePath();

const ARROW_EXTRUSION = {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
    steps: 1,
};

function ItArrow({ targetRef }) {
    const marker = useRef();
    const head = useRef();
    const headPosition = useRef(new Vector3());

    const positionArrow = useCallback(
        (elapsed) => {
            const group = marker.current;
            const target = head.current || targetRef.current;
            if (!group || !target) return;

            // Follow the animated bone without measuring skinned bounds before rendering.
            target.getWorldPosition(headPosition.current);
            group.parent.worldToLocal(headPosition.current);
            headPosition.current.y +=
                (head.current ? 2.85 : 7.75) + Math.sin(elapsed * 0.8) * 0.5;
            group.position.copy(headPosition.current);
        },
        [targetRef],
    );

    useLayoutEffect(() => {
        head.current = null;
        targetRef.current?.traverse((object) => {
            if (!head.current && object.isBone && /head/i.test(object.name)) {
                head.current = object;
            }
        });
        positionArrow(0);
    }, [targetRef, positionArrow]);

    usePreviewFrame((_, delta, elapsed) => {
        positionArrow(elapsed);
    });

    return (
        <group ref={marker}>
            <PreviewBillboard>
                <mesh renderOrder={10}>
                    <extrudeGeometry args={[ARROW_SHAPE, ARROW_EXTRUSION]} />
                    <meshBasicMaterial
                        color="#ed1725"
                        toneMapped={false}
                        transparent
                        depthTest={false}
                        depthWrite={false}
                    />
                </mesh>
                <Text
                    renderOrder={11}
                    position={[0, 0.78, 0.17]}
                    fontSize={0.58}
                    fontWeight={700}
                    color="#ffe100"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.045}
                    outlineColor="black"
                    material-toneMapped={false}
                    material-depthTest={false}
                    material-depthWrite={false}
                >
                    IT
                </Text>
            </PreviewBillboard>
        </group>
    );
}

function TagScene() {
    const chaser = useRef();

    return (
        <group>
            <group position={[0, -1.02, -0.25]}>
                <GrassPatch clearings={GRASS_CLEARINGS} />
            </group>
            <group
                ref={chaser}
                position={[0, -1, -2]}
            >
                <ModelTagSwat
                    scale={3}
                    rotation={[0, degToRad(0), 0]}
                />
            </group>
            <ItArrow targetRef={chaser} />
            <ModelTagSwat
                scale={3}
                position={[0, -1, 1.5]}
                rotation={[0, degToRad(0), 0]}
            />
        </group>
    );
}

export default memo(TagScene);

// Visuals and flip motion from memory-game/components/Game/Cards.js.
import { memo, useMemo, useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";
import { Image, Text } from "@react-three/drei";
import { MathUtils } from "three";
import { useStore } from "@/components/hooks/useStore";

const ROWS = 4;
const COLUMNS = 8;
const CARD_ARGS = [5, 0.5, 10];
const FLIP_DURATION = 0.45;

function Cards() {
    const darkMode = useStore((state) => state.darkMode);
    const meshes = useRef([]);
    const motion = useRef([]);
    const cards = useMemo(() => {
        const values = Array.from(
            { length: ROWS * COLUMNS },
            (_, i) => (i % 16) + 1,
        );
        for (let i = values.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [values[i], values[j]] = [values[j], values[i]];
        }
        return values.map((value, index) => ({
            value,
            position: [
                ((index % COLUMNS) - (COLUMNS - 1) / 2) * 6,
                0.5,
                (Math.floor(index / COLUMNS) - (ROWS - 1) / 2) * 11,
            ],
        }));
    }, []);

    usePreviewFrame((_, delta) => {
        const step = Math.min(delta, 0.1);
        for (let index = 0; index < cards.length; index += 1) {
            const mesh = meshes.current[index];
            if (!mesh) continue;
            const animation = (motion.current[index] ??= {
                open: false,
                flipping: false,
                elapsed: 0,
                wait: 0.25 + Math.random() * 5,
            });

            if (!animation.flipping) {
                animation.wait -= step;
                if (animation.wait > 0) continue;
                animation.flipping = true;
                animation.elapsed = 0;
            }

            animation.elapsed = Math.min(
                FLIP_DURATION,
                animation.elapsed + step,
            );
            const progress = animation.elapsed / FLIP_DURATION;
            const eased = MathUtils.smoothstep(progress, 0, 1);
            const angle = Math.PI * (animation.open ? 1 - eased : eased);
            mesh.rotation.z = angle;
            // Lift the slab during its turn, keeping both edges above the grass.
            mesh.position.y =
                Math.max(
                    0,
                    (CARD_ARGS[0] / 2) * Math.abs(Math.sin(angle)) +
                        (CARD_ARGS[1] / 2) * Math.abs(Math.cos(angle)) -
                        CARD_ARGS[1] / 2,
                ) +
                Math.sin(progress * Math.PI) * 0.18;

            if (progress === 1) {
                mesh.position.y = 0;
                animation.open = !animation.open;
                animation.flipping = false;
                animation.wait = animation.open
                    ? 1.5 + Math.random() * 2
                    : 2 + Math.random() * 5;
            }
        }
    });

    const textColor = darkMode ? "white" : "black";
    return (
        <group>
            {cards.map((card, index) => (
                <group
                    key={index}
                    position={card.position}
                >
                    <mesh
                        ref={(mesh) => {
                            meshes.current[index] = mesh;
                        }}
                    >
                        <boxGeometry args={CARD_ARGS} />
                        <meshStandardMaterial
                            color={darkMode ? "#333333" : "#f9edcd"}
                        />
                        <Image
                            url="/img/memory-game/icon.png"
                            scale={3}
                            rotation={[-Math.PI / 2, 0, 0]}
                            position={[0, 0.3, 0]}
                            transparent
                            toneMapped={false}
                        />
                        <Text
                            color={textColor}
                            rotation={[-Math.PI / 2, 0, 0]}
                            position={[0, 0.3, -2.25]}
                            fontSize={0.6}
                        >
                            Articles Media
                        </Text>
                        <Text
                            color={textColor}
                            rotation={[-Math.PI / 2, 0, 0]}
                            position={[0, 0.3, 2.25]}
                            fontSize={0.6}
                        >
                            Memory Match
                        </Text>
                        <Text
                            color={textColor}
                            fontSize={2.2}
                            anchorX="center"
                            anchorY="middle"
                            position={[0, -CARD_ARGS[1] / 2 - 0.06, 0]}
                            rotation={[-Math.PI / 2, 0, 0]}
                            scale={[-1, 1, 1]}
                        >
                            {card.value}
                        </Text>
                    </mesh>
                </group>
            ))}
        </group>
    );
}

export default memo(Cards);

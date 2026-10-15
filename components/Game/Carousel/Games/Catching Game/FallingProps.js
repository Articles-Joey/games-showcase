import { useMemo, useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";
import Acorn from "./Acorn";
import Anvil from "./Anvil";

const COUNT = 8;

export default function FallingProps() {
    const models = useRef([]);
    const items = useMemo(
        () =>
            Array.from({ length: COUNT }, (_, id) => ({
                id,
                anvil: id % 3 === 0,
                position: [
                    Math.random() * 26 - 13,
                    8 + Math.random() * 32,
                    Math.random() * 26 - 13,
                ],
                velocity: 0,
                wait: -1,
            })),
        [],
    );

    usePreviewFrame((_, delta) => {
        const dt = Math.min(delta, 0.05);
        for (const item of items) {
            const model = models.current[item.id];
            if (!model) continue;
            if (item.wait > 0) {
                item.wait -= dt;
                if (item.wait > 0) continue;
                model.position.set(
                    Math.random() * 26 - 13,
                    40,
                    Math.random() * 26 - 13,
                );
                item.velocity = 0;
                model.visible = true;
            }
            // Match the game's gravity and damping without bodies or hit logic.
            item.velocity += 9.81 * (item.anvil ? 0.9 : 1) * dt;
            item.velocity *= Math.exp(-0.5 * dt);
            model.position.y -= item.velocity * dt;
            if (model.position.y <= 0.6) {
                model.visible = false;
                item.wait = 0.5 + Math.random() * 2;
            }
        }
    });

    return items.map(({ id, anvil, position }) => (
        <group
            key={id}
            position={position}
            ref={(model) => {
                models.current[id] = model;
            }}
        >
            {anvil ? <Anvil scale={0.7} /> : <Acorn />}
        </group>
    ));
}

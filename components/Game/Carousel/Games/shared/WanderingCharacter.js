import { useMemo, useRef } from "react";
import { usePreviewFrame } from "./PreviewActivity";
import { Vector3 } from "three";
import AnimatedPreviewModel from "./AnimatedPreviewModel";

export default function WanderingCharacter({
    url,
    bounds = 17,
    speed = 3,
    scale = 2,
    action = "Walk",
    getHeight,
}) {
    const group = useRef();
    const initial = useMemo(
        () => [
            (Math.random() * 2 - 1) * bounds,
            0,
            (Math.random() * 2 - 1) * bounds,
        ],
        [bounds],
    );
    const target = useRef(new Vector3());
    const needsTarget = useRef(true);

    usePreviewFrame((_, delta) => {
        const model = group.current;
        if (!model) return;
        let dx = target.current.x - model.position.x;
        let dz = target.current.z - model.position.z;
        let distance = Math.hypot(dx, dz);
        if (needsTarget.current || distance < 0.25) {
            target.current.set(
                (Math.random() * 2 - 1) * bounds,
                0,
                (Math.random() * 2 - 1) * bounds,
            );
            needsTarget.current = false;
            dx = target.current.x - model.position.x;
            dz = target.current.z - model.position.z;
            distance = Math.hypot(dx, dz);
        }
        if (distance > 0) {
            const step =
                Math.min(speed * Math.min(delta, 0.1), distance) / distance;
            model.position.x += dx * step;
            model.position.z += dz * step;
            const angle = Math.atan2(dx, dz) - model.rotation.y;
            model.rotation.y +=
                Math.atan2(Math.sin(angle), Math.cos(angle)) *
                (1 - Math.exp(-8 * delta));
        }
        model.position.y = getHeight?.(model.position.x, model.position.z) ?? 0;
    });

    return (
        <group
            ref={group}
            position={initial}
        >
            <AnimatedPreviewModel
                url={url}
                action={action}
                scale={scale}
            />
        </group>
    );
}

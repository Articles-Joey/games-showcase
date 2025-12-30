import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

function SpleefTile({ position, color }) {
    const mesh = useRef();
    const [visible, setVisible] = useState(true);
    const cooldown = useRef(0);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        if (visible) {
             // Randomly disappear
             if (Math.random() < 0.002) {
                 setVisible(false);
                 cooldown.current = 2 + Math.random() * 3;
             }
        } else {
            cooldown.current -= delta;
            if (cooldown.current <= 0) {
                setVisible(true);
            }
        }

        const targetScale = visible ? 1 : 0;
        // Animate scale
        mesh.current.scale.x = MathUtils.lerp(mesh.current.scale.x, targetScale, delta * 5);
        mesh.current.scale.z = MathUtils.lerp(mesh.current.scale.z, targetScale, delta * 5);
    });

    return (
        <mesh ref={mesh} position={position} rotation={[0, Math.PI / 6, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.2, 6]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

function SpleefLayer({ y, color }) {
    const tiles = useMemo(() => {
        const items = [];
        const rows = 8;
        const cols = 8;
        const radius = 0.5;
        // Pointy top orientation (points along Z)
        // Width (X) = sqrt(3) * r
        // Height (Z) = 2 * r
        // Spacing X = sqrt(3) * r
        // Spacing Z = 1.5 * r
        const xStep = Math.sqrt(3) * radius;
        const zStep = 1.5 * radius;

        for (let j = -rows / 2; j < rows / 2; j++) {
            for (let i = -cols / 2; i < cols / 2; i++) {
                const x = i * xStep + (j % 2 !== 0 ? xStep / 2 : 0);
                const z = j * zStep;
                items.push({ position: [x, y, z] });
            }
        }
        return items;
    }, [y]);

    return (
        <group>
            {tiles.map((tile, i) => (
                <SpleefTile key={i} position={tile.position} color={color} />
            ))}
        </group>
    );
}

export default function SpleefScene() {
    return (
        <group position={[4, 3, 0]}>
            <SpleefLayer y={0} color="#ff6b6b" />
            <SpleefLayer y={-0.5} color="#4ecdc4" />
            <SpleefLayer y={-1.0} color="#ffe66d" />
            <SpleefLayer y={-1.5} color="#1a535c" />
        </group>
    );
}
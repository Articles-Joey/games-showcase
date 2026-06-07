import { useMemo, useState } from "react";
import { degToRad } from "three/src/math/MathUtils.js";

function FakeCard({ position, rotation, accent, label }) {
    return (
        <group position={position} rotation={rotation}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.42, 0.03, 0.58]} />
                <meshStandardMaterial color="#fffaf1" roughness={0.35} metalness={0.12} />
            </mesh>
            <mesh position={[0, 0.016, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.38, 0.002, 0.54]} />
                <meshStandardMaterial color={accent} roughness={0.4} metalness={0.1} />
            </mesh>
            <mesh position={[0.1, 0.018, 0.12]} castShadow receiveShadow>
                <boxGeometry args={[0.08, 0.004, 0.08]} />
                <meshStandardMaterial color={accent} roughness={0.3} />
            </mesh>
            <mesh position={[-0.1, 0.018, -0.12]} castShadow receiveShadow>
                <boxGeometry args={[0.08, 0.004, 0.08]} />
                <meshStandardMaterial color={accent} roughness={0.3} />
            </mesh>
            <mesh position={[-0.12, 0.018, 0.12]} castShadow receiveShadow>
                <boxGeometry args={[0.04, 0.004, 0.04]} />
                <meshStandardMaterial color={label === "A" ? "#c82333" : "#18212b"} roughness={0.35} />
            </mesh>
        </group>
    );
}

function Chair({ position, rotation }) {
    return (
        <group position={position} rotation={rotation}>
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.75, 0.12, 0.72]} />
                <meshStandardMaterial color="#4d2f1e" roughness={0.55} metalness={0.08} />
            </mesh>
            <mesh position={[0.26, 0.18, 0.24]} castShadow receiveShadow>
                <boxGeometry args={[0.08, 0.42, 0.08]} />
                <meshStandardMaterial color="#6b4b35" roughness={0.55} metalness={0.08} />
            </mesh>
            <mesh position={[-0.26, 0.18, 0.24]} castShadow receiveShadow>
                <boxGeometry args={[0.08, 0.42, 0.08]} />
                <meshStandardMaterial color="#6b4b35" roughness={0.55} metalness={0.08} />
            </mesh>
            <mesh position={[0.26, 0.18, -0.24]} castShadow receiveShadow>
                <boxGeometry args={[0.08, 0.42, 0.08]} />
                <meshStandardMaterial color="#6b4b35" roughness={0.55} metalness={0.08} />
            </mesh>
            <mesh position={[-0.26, 0.18, -0.24]} castShadow receiveShadow>
                <boxGeometry args={[0.08, 0.42, 0.08]} />
                <meshStandardMaterial color="#6b4b35" roughness={0.55} metalness={0.08} />
            </mesh>
            <mesh position={[0, 0.58, -0.32]} castShadow receiveShadow>
                <boxGeometry args={[0.84, 0.08, 0.12]} />
                <meshStandardMaterial color="#7a5a42" roughness={0.55} metalness={0.08} />
            </mesh>
        </group>
    );
}

export default function LowPolyBlackjackTable({ position = [0, 0, 0], scale = 1 }) {
    const [showChairs, setShowChairs] = useState(true);

    const fakeCards = useMemo(
        () => [
            { position: [-0.9, 0.82, -0.35], rotation: [0.15, 0, 0.08], accent: "#b22222", label: "A" },
            { position: [-0.55, 0.82, 0.2], rotation: [0.12, -0.35, -0.08], accent: "#131313", label: "K" },
            { position: [0.15, 0.82, -0.55], rotation: [0.08, 0.2, 0.12], accent: "#b22222", label: "Q" },
            { position: [0.7, 0.82, 0.35], rotation: [0.1, -0.2, -0.1], accent: "#131313", label: "10" },
        ],
        []
    );

    const chairs = useMemo(
        () => [
            { position: [0, 0.1, -3.4], rotation: [0, 0, 0] },
            { position: [2.9, 0.1, -1.8], rotation: [0, -Math.PI / 4, 0] },
            { position: [2.9, 0.1, 1.8], rotation: [0, degToRad(230), 0] },
            { position: [0, 0.1, 3.4], rotation: [0, Math.PI, 0] },
            { position: [-2.9, 0.1, 1.8], rotation: [0, 3 * Math.PI / 4, 0] },
            { position: [-2.9, 0.1, -1.8], rotation: [0, degToRad(45), 0] },
        ],
        []
    );

    return (
        <group position={position} scale={scale}>
            <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[2.45, 2.9, 0.28, 24]} />
                <meshStandardMaterial color="#5a3b24" roughness={0.4} metalness={0.08} />
            </mesh>

            <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[2.1, 2.35, 0.12, 24]} />
                <meshStandardMaterial color="#0d6b42" roughness={0.75} metalness={0.02} />
            </mesh>

            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[2.22, 2.42, 0.03, 24]} />
                <meshStandardMaterial color="#d4af37" emissive="#3a2a10" emissiveIntensity={0.07} roughness={0.25} />
            </mesh>

            <mesh position={[0, 0.17, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[2.65, 2.65, 0.22, 24]} />
                <meshStandardMaterial color="#2f2117" roughness={0.7} metalness={0.07} />
            </mesh>

            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.18, 0.2, 0.65, 12]} />
                <meshStandardMaterial color="#4c3527" roughness={0.6} metalness={0.08} />
            </mesh>

            <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.14, 0.18, 0.08, 12]} />
                <meshStandardMaterial color="#8c6d48" roughness={0.65} />
            </mesh>

            {fakeCards.map((card, index) => (
                <FakeCard
                    key={`card-${index}`}
                    position={card.position}
                    rotation={card.rotation}
                    accent={card.accent}
                    label={card.label}
                />
            ))}

            {showChairs && chairs.map((chair, index) => (
                <Chair
                    key={`chair-${index}`}
                    position={chair.position}
                    rotation={chair.rotation}
                />
            ))}

            <mesh
                position={[1.12, 0.9, -1.35]}
                onClick={() => setShowChairs((value) => !value)}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[0.45, 0.18, 0.18]} />
                <meshStandardMaterial
                    color={showChairs ? "#1f7a4d" : "#7b3f00"}
                    emissive={showChairs ? "#0f3b26" : "#3f2200"}
                    emissiveIntensity={0.18}
                />
            </mesh>

            <mesh position={[1.12, 0.98, -1.35]}>
                <boxGeometry args={[0.34, 0.04, 0.04]} />
                <meshStandardMaterial color="#f4e8c8" roughness={0.2} />
            </mesh>
        </group>
    );
}

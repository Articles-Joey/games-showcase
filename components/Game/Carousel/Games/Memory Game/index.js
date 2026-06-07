import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils.js";

function MemoryCard({ index, color, isOpen, position }) {
    const cardRef = useRef(null);

    useFrame((state, delta) => {
        if (!cardRef.current) return;

        const targetRotation = isOpen ? Math.PI : 0;
        cardRef.current.rotation.y += (targetRotation - cardRef.current.rotation.y) * Math.min(1, delta * 8);
    });

    return (
        <group ref={cardRef} position={position} rotation={[degToRad(90), 0, 0]}>
            {/* <mesh castShadow receiveShadow>
                <boxGeometry args={[0.9, 0.12, 1.15]} />
                <meshStandardMaterial attach="material-0" color="#0f172a" />
                <meshStandardMaterial attach="material-1" color="#111827" />
                <meshStandardMaterial attach="material-2" color="#334155" />
                <meshStandardMaterial attach="material-3" color="#1f2937" />
                <meshStandardMaterial attach="material-4" color={color} />
                <meshStandardMaterial attach="material-5" color="#111827" />
            </mesh> */}
            <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
                <planeGeometry args={[0.72, 0.92]} />
                <meshStandardMaterial color="#eff6ff" emissive="#1e3a8a" emissiveIntensity={0.16} />
            </mesh>
            <mesh position={[0, -0.02, 0]} rotation={[Math.PI, 0, 0]} castShadow receiveShadow side='double'>
                <planeGeometry args={[0.72, 0.92]} />
                <meshStandardMaterial color="#0b1220" emissive="#0f172a" emissiveIntensity={0.08} />
            </mesh>
            <mesh position={[0, 0, 0.03]}>
                <circleGeometry args={[0.18, 24]} />
                <meshStandardMaterial color="#f8fafc" emissive="#38bdf8" emissiveIntensity={0.18} />
            </mesh>
            <mesh position={[0, 0, -0.03]} rotation={[0, Math.PI, 0]}>
                <circleGeometry args={[0.18, 24]} />
                <meshStandardMaterial color="#bfdbfe" emissive="#38bdf8" emissiveIntensity={0.15} />
            </mesh>
        </group>
    );
}

export default function MemoryGameScene() {
    const totalCards = 32;
    const columns = 8;
    const rows = 4;
    const cardWidth = .9;
    const cardDepth = 1.15;
    const [activeIndex, setActiveIndex] = useState(0);

    const cards = useMemo(() => {
        const palette = ["#38bdf8", "#818cf8", "#f472b6", "#fbbf24", "#4ade80", "#fb7185"];
        const startX = -((columns * cardWidth) / 2) + cardWidth / 2;
        const startZ = -((rows * cardDepth) / 2) + cardDepth / 2;

        return Array.from({ length: totalCards }, (_, index) => ({
            id: index,
            color: palette[index % palette.length],
            rotation: [0, degToRad(90), 0],
            position: [
                startX + (index % columns) * cardWidth,
                0.06,
                startZ + Math.floor(index / columns) * cardDepth
            ]
        }));
    }, []);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveIndex((currentIndex) => (currentIndex + 1) % totalCards);
        }, 1000);

        return () => window.clearInterval(timer);
    }, [totalCards]);

    return (
        <group 
        position={[5, 1, 0]}
        rotation={[0, degToRad(-90), 0]}
        >

            {/* <ambientLight intensity={0.6} />
            <directionalLight position={[5, 8, 4]} intensity={1.1} castShadow />
            <pointLight position={[-4, 2, -4]} intensity={0.45} color="#38bdf8" /> */}

            {/* <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[14, 10]} />
                <meshStandardMaterial color="#0f172a" metalness={0.18} roughness={0.9} />
            </mesh> */}

            {cards.map((card) => (
                <MemoryCard
                    key={card.id}
                    index={card.id}
                    color={card.color}
                    isOpen={activeIndex === card.id}
                    position={card.position}
                />
            ))}
        </group>
    );
}
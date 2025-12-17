import { Physics, useCylinder, usePlane } from "@react-three/cannon";
import { useState, useEffect } from "react";

const Chip = ({ position, color }) => {
    const [ref] = useCylinder(() => ({
        mass: 1,
        position,
        args: [0.5, 0.5, 0.1, 16],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
    }));

    return (
        <mesh ref={ref}>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
            <meshStandardMaterial color={color} />
            <mesh position={[0, 0.051, 0]}>
                <cylinderGeometry args={[0.35, 0.35, 0.01, 16]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0, -0.051, 0]}>
                <cylinderGeometry args={[0.35, 0.35, 0.01, 16]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </mesh>
    );
};

const Floor = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -5, 0]
    }));
    return (
        <mesh ref={ref} visible={false}>
            <planeGeometry args={[20, 20]} />
        </mesh>
    );
}

const ChipSpawner = () => {
    const [chips, setChips] = useState([]);

    const maxChips = 50;

    useEffect(() => {
        const interval = setInterval(() => {
            setChips((prev) => {
                const newChip = {
                    id: Date.now(),
                    position: [(Math.random() - 0.5) * 2, 5, (Math.random() - 0.5) * 2],
                    color: Math.random() > 0.5 ? '#8b0000' : '#1a1a1a'
                };
                
                // Keep only last 29 + new one = 30
                const newChips = [...prev, newChip];
                if (newChips.length > maxChips) {
                    return newChips.slice(newChips.length - maxChips);
                }
                return newChips;
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {chips.map((chip) => (
                <Chip key={chip.id} position={chip.position} color={chip.color} />
            ))}
        </>
    );
};

export default function FlowingChips() {
    return (
        <Physics gravity={[0, -9.8, 0]}>
            <Floor />
            <ChipSpawner />
        </Physics>
    );
}

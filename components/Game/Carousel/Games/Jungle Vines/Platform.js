import { useEffect, useMemo } from "react";
import { useStore } from "@/components/hooks/useStore";
import createPlatformMaterial from "./platformMaterial";
import PlatformGrass from "./PlatformGrass";

export default function Platform({ args, position, surface = "grass" }) {
    const darkMode = useStore((state) => state.darkMode);
    const [width, height, depth] = args;
    const material = useMemo(
        () => createPlatformMaterial(surface, height, darkMode),
        [surface, height, darkMode],
    );
    useEffect(() => () => material.dispose(), [material]);

    return (
        <group position={position}>
            <mesh material={material}>
                <boxGeometry args={args} />
            </mesh>
            {surface === "grass" && (
                <PlatformGrass
                    width={width}
                    depth={depth}
                    y={height / 2}
                />
            )}
        </group>
    );
}

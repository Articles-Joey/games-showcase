import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import {
    NearestFilter,
    RepeatWrapping,
    SRGBColorSpace,
    TextureLoader,
} from "three";

export default function Docks() {
    const source = useLoader(
        TextureLoader,
        "/img/tug-of-war/boardwalk_floor.png",
    );
    const texture = useMemo(() => {
        const map = source.clone();
        map.wrapS = map.wrapT = RepeatWrapping;
        map.repeat.set(2, 1);
        map.magFilter = NearestFilter;
        map.colorSpace = SRGBColorSpace;
        map.needsUpdate = true;
        return map;
    }, [source]);
    useEffect(() => () => texture.dispose(), [texture]);

    return [-1, 1].map((side) => (
        <group key={side}>
            <Pier
                position={[side * 10, 2, 0]}
                texture={texture}
            />
            {[2.5, 12.5, 22.5].map((z) => (
                <Pier
                    key={z}
                    position={[side * 17.5, 2, z]}
                    rotation={[0, -Math.PI / 2, 0]}
                    texture={texture}
                />
            ))}
        </group>
    ));
}

function Pier({ texture, ...props }) {
    return (
        <group {...props}>
            <mesh>
                <boxGeometry args={[10, 0.5, 5]} />
                <meshStandardMaterial map={texture} />
            </mesh>
            {[-5, 5].flatMap((x) =>
                [-2.5, 2.5].map((z) => (
                    <mesh
                        key={`${x}:${z}`}
                        position={[x, -2, z]}
                    >
                        <cylinderGeometry args={[0.25, 0.25, 5, 6]} />
                        <meshStandardMaterial color="saddlebrown" />
                    </mesh>
                )),
            )}
        </group>
    );
}

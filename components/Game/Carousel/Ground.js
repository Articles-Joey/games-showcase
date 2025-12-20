import { useLoader } from "@react-three/fiber";
import { memo, useEffect } from "react";
import { NearestFilter, RepeatWrapping, TextureLoader } from "three";

function GrassPlane(props) {
    const texture = useLoader(TextureLoader, `img/grass.webp`)

    const width = 10; // Set the width of the plane
    const height = 80; // Set the height of the plane

    // TODO figure out why texture settings are getting reset
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         texture.magFilter = NearestFilter;
    //         texture.wrapS = RepeatWrapping
    //         texture.wrapT = RepeatWrapping
    //         texture.repeat.set(1, 10)
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, [texture]);

    texture.magFilter = NearestFilter;
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(1, 10)

    return (
        <group {...props}>
            <mesh position={[0, 0, 0]}>
                <planeGeometry attach="geometry" args={[width, height]} />
                <meshStandardMaterial attach="material" map={texture} />
            </mesh>
        </group>
    );
};

export default memo(GrassPlane)
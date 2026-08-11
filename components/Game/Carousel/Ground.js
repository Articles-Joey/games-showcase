import { useLoader } from "@react-three/fiber";
import { memo, useMemo } from "react";
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

    const configuredTexture = useMemo(() => {
        const nextTexture = texture.clone();
        nextTexture.magFilter = NearestFilter;
        nextTexture.wrapS = RepeatWrapping
        nextTexture.wrapT = RepeatWrapping
	    nextTexture.repeat.set(1, 10)
        return nextTexture;
    }, [texture])

    return (
        <group {...props}>
            <mesh position={[0, 0, 0]}>
                <planeGeometry attach="geometry" args={[width, height]} />
                <meshStandardMaterial attach="material" map={configuredTexture} />
            </mesh>
        </group>
    );
};

export default memo(GrassPlane)
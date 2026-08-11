import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { NearestFilter, RepeatWrapping, TextureLoader } from "three";

function GrassPlane(props) {
    const loadedTexture = useLoader(TextureLoader, `img/grass.webp`)
    const texture = useMemo(() => {
        const clonedTexture = loadedTexture.clone()
        clonedTexture.magFilter = NearestFilter
        clonedTexture.wrapS = RepeatWrapping
        clonedTexture.wrapT = RepeatWrapping
        clonedTexture.repeat.set(props.repeatX || 20, props.repeatY || 10)
        clonedTexture.needsUpdate = true
        return clonedTexture
    }, [loadedTexture, props.repeatX, props.repeatY])

    const width = props.width || 1600; // Set the width of the plane
    const height = props.height || 800; // Set the height of the plane

    return (
        <group {...props}>
            <mesh position={[0, 0, 0]}>
                <planeGeometry attach="geometry" args={[width, height]} />
                <meshStandardMaterial attach="material" map={texture} />
            </mesh>
        </group>
    );
};

export default GrassPlane
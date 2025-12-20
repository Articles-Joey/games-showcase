import { useLoader } from "@react-three/fiber";
import { NearestFilter, RepeatWrapping, TextureLoader } from "three";

function GrassPlane(props) {
    const texture = useLoader(TextureLoader, `img/grass.webp`)

    const width = props.width || 1600; // Set the width of the plane
    const height = props.height || 800; // Set the height of the plane

    texture.magFilter = NearestFilter;
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
	texture.repeat.set(props.repeatX || 20, props.repeatY || 10)

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
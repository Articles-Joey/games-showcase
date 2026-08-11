import { NearestFilter, RepeatWrapping, TextureLoader } from "three";

const texture = new TextureLoader().load(`img/grass.webp`)

const GrassPlane = () => {

    const width = 220; // Set the width of the plane
    const height = 50; // Set the height of the plane

    const configuredTexture = useMemo(() => {
        const nextTexture = texture.clone();
        nextTexture.magFilter = NearestFilter;
        nextTexture.wrapS = RepeatWrapping
        nextTexture.wrapT = RepeatWrapping
        nextTexture.repeat.set(40, 10)
        return nextTexture;
    }, [])

    return (
        <>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[(width / 2) - 20, 0, 3]}>
                <planeGeometry attach="geometry" args={[width, height]} />
                <meshStandardMaterial attach="material" map={configuredTexture} />
            </mesh>
        </>
    );
};

export default GrassPlane
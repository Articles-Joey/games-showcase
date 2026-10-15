import React, { useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";

import Duck from "../../../PlayerModels/Duck";
import Dog from "../../../PlayerModels/Dog";
import Witch from "../../../PlayerModels/Witch";
import Bear from "../../../PlayerModels/Bear";

const { Bleacher } = require("../../../Bleacher");

const BobbingContainer = ({ children }) => {
    const ref = useRef();
    const remaining = useRef(0);

    usePreviewFrame((_, delta) => {
        remaining.current -= delta;
        if (remaining.current > 0 || !ref.current) return;
        ref.current.position.y = 0.01 + Math.random() * 0.09;
        remaining.current = 0.3 + Math.random() * 0.7;
    });

    return <group ref={ref}>{children}</group>;
};

export default function BleacherBox(props) {
    const ref = useRef();
    const groupRef = useRef();

    // const [hovered, hover] = useState(false);
    // const [clicked, click] = useState(false);

    // useFrame((state, delta) => (ref.current));

    // // useEffect for bobbing animation
    // useEffect(() => {
    //     const bobInterval = setInterval(() => {
    //         // Randomly generate a bobbing height within a range
    //         const bobHeight = Math.random() * (0.1 - 0.01) + 0.01;

    //         // Use the groupRef to animate the bobbing
    //         groupRef.current.position.y = bobHeight;
    //     }, Math.random() * (1000 - 300) + 300); // Random interval between 5-10 seconds

    //     // Cleanup the interval on component unmount
    //     return () => clearInterval(bobInterval);
    // }, []);

    return (
        <group>
            {/* Main box */}
            <mesh
                {...props}
                ref={ref}
                // position={[0, 0, -0.7]}
                // onClick={(event) => click(!clicked) + hover(true)}
                // onPointerOver={() => hover(true)}
                // onPointerOut={() => hover(false)}
            >
                {/* <boxGeometry args={[2, 0.5, 2]} />
                <meshStandardMaterial
                    color={props.color ? 'rgb(160, 120, 73)' : hovered || clicked ? '#ffb7b7' : '#f9edcd'}
                /> */}

                {/* Nest the Bleacher component inside the Box component */}
                <Bleacher
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                />

                <group ref={groupRef}>
                    <BobbingContainer>
                        <Duck
                            position={[0, 0.4, -0.1]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={0.2}
                        />
                    </BobbingContainer>

                    <BobbingContainer>
                        <Dog
                            position={[0, 0.4, 0.3]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={0.2}
                        />
                    </BobbingContainer>

                    <BobbingContainer>
                        <Witch
                            position={[-0.2, 0.53, -0.1]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={0.2}
                        />
                    </BobbingContainer>

                    <BobbingContainer>
                        <Bear
                            position={[-0.2, 0.53, 0.3]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={0.2}
                        />
                    </BobbingContainer>
                </group>
            </mesh>
        </group>
    );
}

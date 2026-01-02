import { MazeBall, ModelMazeBoard } from "@/components/Models/Maze_board";
import { Debug, Physics } from "@react-three/cannon";
import { degToRad } from "three/src/math/MathUtils";

export default function MazeScene() {
    return (
        <group
            scale={0.25}
            rotation={[0, degToRad(90), 0]}
            position={[3, 3.5, 0]}
        >
            <Physics
                gravity={[0, -100, 0]}
                defaultContactMaterial={{
                    // restitution: 0.5,
                    // friction: 0.1
                }}
            >
                <Debug
                    color={"red"}
                // scale={0}
                >
                    <MazeBall
                    // position={[0, 10, 0]}              
                    />
                    <group>
                        <ModelMazeBoard
                            scale={1}
                        />
                    </group>
                </Debug>
            </Physics>
        </group>
    );
}
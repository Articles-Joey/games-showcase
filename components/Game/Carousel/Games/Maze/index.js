import { MazeBall, ModelMazeBoard } from "@/components/Models/Maze_board";
import { Debug, Physics } from "@react-three/cannon";

export default function MazeScene() {
    return (
        <group
            scale={0.02}
            rotation={[0, 0, -0.7]}
            position={[5, 8, 0]}
        >
            <Physics gravity={[0, -9.8, 0]}>
                <Debug>
                    <MazeBall
                        // position={[0, 3.5, 0]}
                        
                    />
                    <group>
                        <ModelMazeBoard
                        // scale={0.001}
                        />
                    </group>
                </Debug>
            </Physics>
        </group>
    );
}
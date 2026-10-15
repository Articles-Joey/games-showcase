import { memo, useMemo } from "react";
import WanderingCharacter from "../shared/WanderingCharacter";
import Arena from "./Arena";
import LavaPlumes from "./LavaPlumes";
import Searchlight from "./Searchlight";

const CHARACTERS = [
    "Adventurer",
    "Beach",
    "Casual_2",
    "Casual_Hoodie",
    "Farmer",
    "King",
    "Punk",
    "Spacesuit",
    "Suit",
    "Swat",
    "Worker",
];

function AssassinScene() {
    const npcs = useMemo(
        () =>
            Array.from({ length: 10 }, (_, id) => ({
                id,
                character:
                    CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
                speed: 2.5 + Math.random() * 1.5,
            })),
        [],
    );

    return (
        <group
            position={[4, 1.15, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.144}
        >
            <Arena />
            <LavaPlumes />
            {npcs.map(({ id, character, speed }) => (
                <WanderingCharacter
                    key={id}
                    url={`/models/assassin/${character}-transformed.glb`}
                    speed={speed}
                />
            ))}
            <Searchlight />
        </group>
    );
}

export default memo(AssassinScene);

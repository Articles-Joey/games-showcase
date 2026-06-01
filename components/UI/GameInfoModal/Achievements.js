import { useState } from "react";
import { useStore } from "../../hooks/useStore";
import ArticlesButton from "../Button";
import { Accordion } from "react-bootstrap";

export default function GameAchievements() {

    const [expandAchievements, setExpandAchievements] = useState(true)

    const gameInfoModal = useStore((state) => state?.gameInfoModal);

    const fakeAchievements = [
        {
            name: "First Blood",
            description: "Complete the first level."
        },
        {
            name: "Sharp Shooter",
            description: "Achieve 100% accuracy in a level."
        },
    ];

    return (
        <div className="game-achievements card card-articles card-sm mt-4">

            <div className="card-header flex-header">

                <div>Game Achievements</div>

            </div>

            <div className="card-body">
                {fakeAchievements.map((achievement, index) => (
                    <div key={index} className="mb-3">
                        <div><b>{achievement.name}</b></div>
                        <div>{achievement.description}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}
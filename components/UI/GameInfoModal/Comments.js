import { useState } from "react";
import { useStore } from "../../hooks/useStore";
import ArticlesButton from "../Button";
import { Accordion } from "react-bootstrap";

export default function GameComments() {

    const [ expandComments, setExpandComments ] = useState(true)

    const gameInfoModal = useStore((state) => state?.gameInfoModal);

    const fakeComments = [
        {
            username: "PlayerOne",  
            text: "This game is amazing! I love the graphics and gameplay."
        },
        {
            username: "GamerGirl42",
            text: "I had a lot of fun playing this game with my friends. Highly recommend!"
        },  
        {
            username: "CasualGamer",
            text: "It's a decent game, but I wish there were more levels and challenges."
        },
        {
            username: "HardcoreGamer99",
            text: "The game is too easy. I finished it in a day. Needs more difficulty."
        },
        {
            username: "IndieGameFan",
            text: "I appreciate the creativity and effort that went into making this game. It's a hidden gem!"
        }
    ];

    return (
        <div className="game-comments card card-articles card-sm mt-4">
            <Accordion activeKey={expandComments ? "0" : ""}>
                <div className="card-header flex-header">

                    <div>User Comments</div>

                    <ArticlesButton
                        size="sm"
                        active={expandComments}
                        onClick={() => setExpandComments(!expandComments)}
                    >
                        <i className={`fas fa-${expandComments ? "minus" : "plus"}`}></i>
                        {expandComments ? "Collapse" : "Expand"}
                    </ArticlesButton>

                </div>

                <Accordion.Collapse eventKey="0">
                    <div className="card-body">
                        {fakeComments.map((comment, index) => (
                            <div key={index} className="mb-3">
                                <div><b>{comment.username}</b> says:</div>
                                <div>{comment.text}</div>
                            </div>
                        ))}
                    </div>
                </Accordion.Collapse>
            </Accordion>
        </div>
    )
}
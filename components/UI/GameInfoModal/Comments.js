import { useState } from "react";
import { useStore } from "../../hooks/useStore";
import ArticlesButton from "../Button";
import { Accordion } from "react-bootstrap";
import useGameComments from "@/components/hooks/Articles Media/useGameComments";

export default function GameComments() {

    const [expandComments, setExpandComments] = useState(true)

    const gameInfoModal = useStore((state) => state?.gameInfoModal);

    const {
        data: fetchedGameComments,
        isLoading,
        isError,
        mutate
    } = useGameComments({
        game_id: gameInfoModal?._id
    });

    return (
        <div className="game-comments card card-articles card-sm mt-4">
            <Accordion activeKey={expandComments ? "0" : ""}>
                <div className="card-header flex-header">

                    <div>User Comments</div>

                    <ArticlesButton
                        size="sm"
                        // active={expandComments}
                        onClick={() => {
                            mutate();
                        }}
                    >
                        <i className={`fas fa-undo`}></i>
                    </ArticlesButton>

                </div>

                <Accordion.Collapse eventKey="0">
                    <div className="card-body">
                        {fetchedGameComments ?
                            fetchedGameComments?.map((comment, index) => (
                                <div key={index} className="mb-3">
                                    <div style={{ fontSize: '0.85rem' }}>
                                        {new Date(comment.date).toLocaleString()}
                                    </div>
                                    <div><b>{comment.user_id}</b> says:</div>
                                    <div>{comment.comment}</div>
                                </div>
                            ))
                            :
                            <div>
                                {isLoading ? "Loading comments..." : "No comments found."}
                                {isError && "Error loading comments."}
                            </div>
                        }
                    </div>
                </Accordion.Collapse>
            </Accordion>
        </div>
    )
}
import { useState } from "react";
import { useStore } from "../../hooks/useStore";
import ArticlesButton from "../Button";
import useGameNews from "@/components/hooks/Articles Media/useGameNews";

export default function GameNews() {

    const gameInfoModal = useStore((state) => state?.gameInfoModal);

    const {
        data: fetchedGameNews,
        isLoading,
        isError,
        mutate
    } = useGameNews({
        game_id: gameInfoModal?._id
    });

    return (
        <div className="game-news card card-articles card-sm mt-4">

            <div className="card-header flex-header">

                <div>Game News</div>

                <ArticlesButton
                    size="sm"
                    // active={expandComments}
                    onClick={() => {
                        mutate();
                    }}
                >
                    <i className={`fas fa-redo`}></i>                    
                </ArticlesButton>

            </div>

            <div className="card-body">
                {fetchedGameNews ? 
                fetchedGameNews?.map((news, index) => (
                    <div key={index} className="mb-3">
                        <div><b>{news.title}</b> - {new Date(news.date).toDateString()}</div>
                        <div>{news.content}</div>
                    </div>
                )) : <div className="text-muted">No news available.</div>}
            </div>

        </div>
    )
}
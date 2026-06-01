import { useState } from "react";
import { useStore } from "../../hooks/useStore";
import ArticlesButton from "../Button";

export default function GameNews() {

    const gameInfoModal = useStore((state) => state?.gameInfoModal);

    const fakeNews = [
        {
            name: "Update 1",
            date: new Date("2024-06-01"),
            description: "Complete the first level."
        },
        {
            name: "Update 2",
            date: new Date("2024-06-01"),
            description: "Achieve 100% accuracy in a level."
        },
    ];

    return (
        <div className="game-news card card-articles card-sm mt-4">

            <div className="card-header flex-header">

                <div>Game News</div>

                {/* <ArticlesButton
                    size="sm"
                    active={expandComments}
                    onClick={() => setExpandComments(!expandComments)}
                >
                    <i className={`fas fa-${expandComments ? "minus" : "plus"}`}></i>
                    {expandComments ? "Collapse" : "Expand"}
                </ArticlesButton> */}

            </div>

            <div className="card-body">
                {fakeNews.map((news, index) => (
                    <div key={index} className="mb-3">
                        <div><b>{news.name}</b> - {news.date.toDateString()}</div>
                        <div>{news.description}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}
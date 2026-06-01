"use client"
import { useState, lazy, useRef } from "react";

import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap"

import ArticlesButton from "../Button";
import { useStore } from "../../hooks/useStore";

// import XboxIcons from '@articles-media/articles-gamepad-helper/XboxIcons';
import B from "@articles-media/articles-gamepad-helper/dist/img/Xbox UI/B.svg";
import A from "@articles-media/articles-gamepad-helper/dist/img/Xbox UI/A.svg";

const GameComments = lazy(() => import('./Comments'));
const GameNews = lazy(() => import('./News'));
const GameAchievements = lazy(() => import('./Achievements'));

const tabsData = [
    {
        name: "News",
        icon: "newspaper",
        component: <GameNews />,
    },
    {
        name: "Comments",
        icon: "comments",
        component: <GameComments />,
    },
    {
        name: "Achievements",
        icon: "trophy",
        component: <GameAchievements />,
    },
]

const getRandomDarkHex = (index) => {
    // A simple deterministic pseudo-random generator based on the index
    // Math.sin(index) returns a value between -1 and 1. 
    // Taking the absolute value and multiplying it generates a pseudo-random fraction.
    const pseudoRandom = Math.abs(Math.sin(index + 1) * 10000) % 1;

    // Use the pseudo-random fraction to pick a consistent hue (0-359)
    const h = Math.floor(pseudoRandom * 360);
    const s = 100;
    const l = 25; // Locked at 25% lightness for white text contrast

    // HSL to Hex conversion formula
    const lPrime = l / 100;
    const a = (s * Math.min(lPrime, 1 - lPrime)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = lPrime - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };

    return `${f(0)}${f(8)}${f(4)}`;
};

export default function GameInfoModal({
    show,
    setShow,
}) {

    const [showModal, setShowModal] = useState(true)

    const gameInfoModal = useStore((state) => state?.gameInfoModal);
    const launchGame = useStore((state) => state?.launchGame);

    const [activeTab, setActiveTab] = useState("");

    const gameImages = gameInfoModal?.images ?
        gameInfoModal?.images
        :
        Array.from({ length: 10 }, (_, i) => {

            const placeholderBackground = getRandomDarkHex(i);

            return {
                image: `https://placehold.co/600x400/${placeholderBackground}/FFF?text=Image+${i + 1}`,
                caption: `Screenshot ${i + 1}`,
                placeholderBackground: placeholderBackground
            }
        })

    const containerRef = useRef(null);

    return (
        <>

            <Modal
                className="articles-modal game-info-modal"
                size='xl'
                show={showModal}
                // centered
                scrollable
                onExited={() => {
                    setShow(false)
                }}
                onHide={() => {
                    setShowModal(false)
                }}
            >

                <Modal.Header className="d-flex flex-header" closeButton>

                    <div className="d-flex flex-column flex-lg-row align-items-lg-center">

                        <Modal.Title>
                            {gameInfoModal?.name}
                        </Modal.Title>

                        <div className="ms-2">
                            <span className="badge bg-black text-white">0 Players Online</span>
                            <span className="badge bg-black text-white">0 Players In Game</span>
                        </div>

                    </div>

                </Modal.Header>

                <Modal.Body className="" ref={containerRef}>

                    <div className="row">

                        <div className="col-lg-6">

                            <div
                                className="active-game-image"
                            >

                                <div className="ratio ratio-16x9">
                                    <img
                                        src={gameInfoModal?.active_image || gameInfoModal?.image}
                                        alt={`${gameInfoModal?.name} screenshot`}
                                        style={{
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>

                                <div className="previous-button">
                                    <i className="fad fa-chevron-square-left me-0"></i>
                                </div>
                                <div className="next-button">
                                    <i className="fad fa-chevron-square-right me-0"></i>
                                </div>

                            </div>

                            <div className="thumbnail-slider">
                                {gameImages?.map((img, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`ratio ratio-16x9 thumbnail ${img === gameInfoModal?.active_image ? 'active' : ''}`}
                                            onClick={() => {
                                                useStore.setState({ gameInfoModal: { ...gameInfoModal, active_image: img } })
                                            }}
                                        >
                                            <img
                                                src={img.image}
                                                alt={img.caption}
                                                style={{
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>

                        </div>

                        <div className="col-lg-6">

                            <div className="mb-0">
                                {gameInfoModal?.short_description || `No description available for this game.`}
                            </div>

                            <hr />

                            <div className="d-flex flex-wrap mb-3">

                                <div className="w-50">
                                    <div className="details-tag mb-0">
                                        <div className="label">Engine: </div>
                                        <div>{gameInfoModal?.engine || 'Unknown'}</div>
                                    </div>

                                    <div className="details-tag mb-0">
                                        <div className="label">Rating: </div>
                                        <div>{gameInfoModal?.content_rating || 'Unrated'}</div>
                                    </div>
                                </div>

                                <div className="w-50">
                                    <div className="details-tag mb-0">
                                        <div className="label">Single Player </div>
                                        <div>{gameInfoModal?.single_player ?
                                            gameInfoModal?.single_player_tag || '...' : 'No'}</div>
                                    </div>

                                    <div className="details-tag mb-0">
                                        <div className="label">Multiplayer </div>
                                        <div>{gameInfoModal?.multiplayer ?
                                            gameInfoModal?.multiplayer_tag || '...' : 'No'}</div>
                                    </div>
                                </div>

                            </div>

                            <hr />

                            {/* {gameInfoModal.github_public && */}
                            <div className="d-flex">

                                {gameInfoModal.github_public && <div className="w-50">
                                    <div>
                                        Developer: {gameInfoModal?.developer || 'Unknown'}
                                    </div>

                                    <div className="mb-0">
                                        Publisher: {gameInfoModal?.publisher || 'Unknown'}
                                    </div>
                                </div>}

                                <div>
                                    <div>
                                        Public on GitHub!
                                    </div>
                                    <div>
                                        <a
                                            href={gameInfoModal.github_repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ArticlesButton
                                                small
                                            >
                                                View Repository
                                            </ArticlesButton>
                                        </a>
                                    </div>
                                </div>

                            </div>
                            {/* } */}

                            <hr />

                            <div>
                                {tabsData.map((section, index) => (

                                    <ArticlesButton
                                        key={index}
                                        active={activeTab === section.name}
                                        onClick={() => setActiveTab(section.name)}
                                        className=""
                                    >
                                        <i className={`fad fa-${section.icon} me-0 px-1`}></i>
                                        {section.name}
                                    </ArticlesButton>

                                ))}
                            </div>

                        </div>

                    </div>

                    <TabContent activeTab={activeTab} />

                    <div>
                        {/* {activeTab === "Comments" && <GameComments />} */}
                        {/* {activeTab === "Achievements" && <GameAchievements />} */}
                        {/* {tabsData.find(tab => tab.name === activeTab)?.component} */}
                    </div>

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    <div className="d-flex">
                        <ArticlesButton
                            className="d-flex align-items-center"
                            variant="outline-dark"
                            onClick={() => {
                                setShow(false)
                            }}
                        >
                            <img width={20} className="controller-only me-2" src={B.src}></img>
                            <span className="">Close</span>
                        </ArticlesButton>
                        <ArticlesButton
                            className="d-flex align-items-center"
                            variant="outline-dark"
                            onClick={() => {
                                // setShow(false)
                            }}
                        >
                            <img width={20} className="controller-only me-2" src={B.src}></img>
                            <i className="fad fa-arrow-up"></i>
                            <span className="">To Top</span>
                        </ArticlesButton>
                    </div>

                    <div>

                        {gameInfoModal?.link &&
                            <span
                                className="me-3"
                            >
                                {gameInfoModal?.link.replace('https://', '')}
                            </span>
                        }

                        <ArticlesButton
                            className="d-inline-flex align-items-center"
                            variant="outline-dark"
                            onClick={() => {
                                // setShow(false)
                                launchGame()
                            }}
                        >
                            <img width={20} className="controller-only me-2" src={A.src}></img>
                            <span className="">Launch</span>
                        </ArticlesButton>

                    </div>

                </Modal.Footer>

            </Modal>
        </>
    )

}

function TabContent({ activeTab }) {

    return (
        <div>
            {tabsData.find(tab => tab.name === activeTab)?.component}
        </div>
    )

}
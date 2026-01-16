"use client"
import { useState } from "react";

import { Modal } from "react-bootstrap"

import ArticlesButton from "./Button";
import { useStore } from "../hooks/useStore";

import XboxIcons from '@articles-media/articles-gamepad-helper/XboxIcons';

export default function GameInfoModal({
    show,
    setShow,
}) {

    const [showModal, setShowModal] = useState(true)

    const gameInfoModal = useStore((state) => state?.gameInfoModal);
    const launchGame = useStore((state) => state?.launchGame);

    return (
        <>

            <Modal
                className="articles-modal game-info-modal"
                size='xl'
                show={showModal}
                centered
                scrollable
                onExited={() => {
                    setShow(false)
                }}
                onHide={() => {
                    setShowModal(false)
                }}
            >

                <Modal.Header closeButton>
                    <Modal.Title>
                        {gameInfoModal?.name}
                        {/* Info */}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="">

                    <div className="row">

                        <div className="col-lg-6">
                            <div
                                className="ratio ratio-16x9"
                            >
                                <img
                                    src={gameInfoModal?.active_image || gameInfoModal?.image}
                                    alt={`${gameInfoModal?.name} screenshot`}
                                    style={{
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">

                            <div className="mb-3">
                                {gameInfoModal?.short_description || `No description available for this game.`}
                            </div>

                            <div>
                                Engine: {gameInfoModal?.engine || 'Unknown'}
                            </div>

                            <div>
                                Rating: {gameInfoModal?.content_rating || 'Unrated'}
                            </div>

                            <div>

                            </div>

                            <div></div>

                        </div>

                    </div>

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    <ArticlesButton
                        className="d-flex align-items-center"
                        variant="outline-dark"
                        onClick={() => {
                            setShow(false)
                        }}
                    >
                        <img width={20} src={XboxIcons.B}></img>
                        <span className="ms-2">Close</span>
                    </ArticlesButton>

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
                            <img width={20} src={XboxIcons.A}></img>
                            <span className="ms-2">Launch</span>
                        </ArticlesButton>

                    </div>

                </Modal.Footer>

            </Modal>
        </>
    )

}
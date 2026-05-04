"use client"
import { useState } from "react";

import { Modal } from "react-bootstrap"

import ArticlesButton from "./Button";

export default function InfoModal({
    show,
    setShow,
}) {

    const [showModal, setShowModal] = useState(true)

    return (
        <>

            <Modal
                className="articles-modal games-info-modal"
                size='md'
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
                    <Modal.Title>Info</Modal.Title>
                </Modal.Header>

                <Modal.Body className="flex-column p-3">

                    A collection of web games built by members of the Articles Media community, showcasing a variety of genres and styles. Explore and play these games directly in your browser.

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    <div></div>

                    <ArticlesButton variant="outline-dark" onClick={() => {
                        setShow(false)
                    }}>
                        Close
                    </ArticlesButton>

                </Modal.Footer>

            </Modal>
        </>
    )

}
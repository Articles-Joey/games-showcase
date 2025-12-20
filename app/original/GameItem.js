"use client"
import { useState, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// import { useSelector } from 'react-redux'

import Modal from 'react-bootstrap/Modal';

import ArticlesButton from '@/components/UI/Button';
import { Textfit } from '@/components/UI/Textfit';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const InfoModal = dynamic(
    () => import('@/components/UI/InfoModal'),
    { ssr: false }
)

const ArticlesModal = dynamic(
    () => import('@/components/UI/ArticlesModal'),
    { ssr: false }
)

export default function GameItem({ item, toontownImages }) {

    // const userReduxState = useSelector((state) => state.auth.user_details);

    const [showInfoModal, setShowInfoModal] = useState(false)

    const [showOfflineModal, setShowOfflineModal] = useState(false)
    const [gamepadSupportModal, setGamepadSupportModal] = useState(false)
    const [activeDeveloper, setActiveDeveloper] = useState(null);

    const developer_descriptions = [
        {
            developer: 'Articles Media',
            developer_description: 'Developed by our own team at Articles Media! Our aim with the games we develop is to drive traffic and engagement with the site overall.'
        }
    ]

    return (
        <div className='game-item'>

            {showInfoModal &&
                <InfoModal
                    show={showInfoModal}
                    setShow={setShowInfoModal}
                />
            }

            {/* TODO - Move into info modal */}
            {showOfflineModal &&
                <ArticlesModal
                    show={showOfflineModal}
                    setShow={setShowOfflineModal}
                    title="Offline Support"
                >

                    <h5 className="mb-1">{showOfflineModal.name}</h5>
                    <div className="small text-muted mb-3">Offline Info and Settings</div>

                    <div className="small">{showOfflineModal.offlineNote || 'offlineNote'}</div>

                </ArticlesModal>
            }

            {/* TODO - Move into info modal */}
            {gamepadSupportModal &&
                <ArticlesModal
                    show={gamepadSupportModal}
                    setShow={setGamepadSupportModal}
                    title="Gamepad Support"
                >

                    <h5 className="mb-1">{showOfflineModal.name}</h5>
                    <div className="small text-muted mb-3">Gamepad Info and Settings</div>
                    <div>This game has full support for the following controllers.</div>

                </ArticlesModal>
            }

            {/* TODO - Move into info modal */}
            {activeDeveloper &&
                <Modal
                    show={activeDeveloper}
                    className="articles-modal"
                    centered
                    onHide={() => {
                        // setModalShow(false)
                        setActiveDeveloper(null)
                    }}
                >

                    <Modal.Header className="py-1" closeButton>
                        <Modal.Title>Developer Info</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <div className='mb-2'>
                            <b className=''>{activeDeveloper.developer}</b>
                        </div>


                        <div className="small">
                            {developer_descriptions.find(dev_obj => {
                                return dev_obj.developer == activeDeveloper.developer
                            })?.developer_description}
                        </div>

                    </Modal.Body>

                    <Modal.Footer className='d-flex justify-content-between align-items-center'>

                        <div>

                        </div>

                        <ArticlesButton
                            variant="secondary"
                            onClick={() => {
                                // setModalShow(false)
                                // setActiveModalGame(null)
                                setActiveDeveloper(null)
                            }}
                        >
                            Close
                        </ArticlesButton>

                    </Modal.Footer>

                </Modal>
            }

            <div
                className='card card-game'
                style={{
                    // ...(item.preview && { opacity: '0.75' })
                }}
            >

                <div className="card-header p-2">
                    <b>{item.name}</b>
                </div>

                <Link
                    // href={item.link}
                    href={`${item.link}`}
                    prefetch={false}
                    target='_blank'
                    rel="noopener noreferrer"
                >
                    <div className="thumbnail-wrapper ratio ratio-1x1 bg-dark mb-0 me-2 me-lg-0">

                        <div>
                            <div className='icons-wrapper'>
                                {item.gamepadSupport &&
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-${'bottom'}`}>
                                                Gamepad Support
                                            </Tooltip>
                                        }
                                    >
                                        <i className="action fad fa-gamepad-alt me-0"></i>
                                    </OverlayTrigger>
                                }
                                {item.offline &&
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-${'bottom'}`}>
                                                Playable Offline
                                            </Tooltip>
                                        }
                                    >
                                        <i className="action fad fa-plug me-0"></i>
                                    </OverlayTrigger>
                                }
                                {item.amcot_character &&
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-${'bottom'}`}>
                                                AMCOT Character Usage
                                            </Tooltip>
                                        }
                                    >
                                        <i className="action fad fa-user-astronaut me-0"></i>
                                    </OverlayTrigger>
                                }
                            </div>
                        </div>

                        {item?.image?.src &&
                            <Image
                                alt=""
                                fill
                                placeholder={
                                    ['jpg', 'png', 'wep'].includes(item.image.src.split('.').pop()) ? 'blur' : 'empty'
                                }
                                style={{
                                    objectFit: 'cover',
                                }}
                                src={item.image}
                            >
                            </Image>
                        }

                        {item.image && !item?.image?.src &&
                            <img
                                src={
                                    (toontownImages && item.inspo_image) ?
                                        item.inspo_image
                                        :
                                        item.image

                                }
                                alt=""
                                className='w-100 h-100'
                                style={{ objectFit: 'cover' }}
                            />
                        }

                        {/* {item.image &&
                                                    <img
                                                        src={item.image.src}
                                                        alt=""
                                                        className='w-100 h-100'
                                                        style={{
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                } */}

                    </div>
                </Link>

                <div className="card-header p-1 border-bottom h-100">
                    <div className='d-flex flex-row flex-wrap w-100 justify-content-center align-items-center'>

                        {item.single_player &&
                            <>
                                <span className='badge bg-light shadow-articles text-dark me-1 mb-1'>Single Player</span>
                            </>
                        }
                        {item.multiplayer &&
                            <>
                                <span className='badge bg-light shadow-articles text-dark me-1 mb-1'>Multiplayer</span>
                                <span className='badge bg-light shadow-articles text-dark mb-1'>{item.multiplayer_tag}</span>
                            </>
                        }
                        {item.multiplayer === false &&
                            <>

                                <OverlayTrigger
                                    // key={'customer_id'}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-${'bottom'}`}>
                                            Multiplayer coming soon!
                                        </Tooltip>
                                    }
                                >
                                    <div style={{ cursor: 'pointer' }}>
                                        <span style={{ opacity: 0.5 }} className='badge bg-light shadow-articles text-dark me-1 mb-1'>
                                            <i className="fad fa-history me-1"></i>
                                            Multiplayer
                                        </span>
                                    </div>
                                </OverlayTrigger>
                                {/* <span className='badge bg-light shadow-articles text-dark mb-1'>{item.multiplayer_tag}</span> */}
                            </>
                        }

                    </div>
                </div>

                <div className="card-body p-1 d-flex flex-column align-items-start">

                    <div className='mt-auto w-100'>

                        <div className='d-flex'>

                            {/* <IsDev inline>
                                {item.offline &&
                                    <ArticlesButton
                                        variant='warning'
                                        onClick={() => {
                                            setShowOfflineModal(item)
                                        }}
                                        small
                                    >
                                        <i className="fad fa-plug me-0"></i>
                                    </ArticlesButton>
                                }
                            </IsDev> */}

                            {/* <IsDev inline>
                                {item.gamepadSupport &&
                                    <ArticlesButton
                                        variant='warning'
                                        onClick={() => {
                                            setGamepadSupportModal(item)
                                        }}
                                        small
                                    >
                                        <i className="fad fa-gamepad-alt me-0"></i>
                                    </ArticlesButton>
                                }
                            </IsDev> */}

                            {/* <ArticlesButton
                                small
                                onClick={() => {
                                    setActiveDeveloper(item)
                                }}
                            >
                                <i className="fad fa-question-circle me-0"></i>
                            </ArticlesButton> */}

                        </div>

                        <div className="d-flex mb-1">

                            {item.preview ?
                                <ArticlesButton
                                    disabled={item.public}
                                    small
                                    className='w-100'
                                >
                                    <Textfit mode='single' max={14}>
                                        <span>
                                            {item.preview ? item.preview_true_button_text : 'Play'}
                                            <i className="fal fa-play me-0 ms-2"></i>
                                        </span>
                                    </Textfit>
                                </ArticlesButton>
                                :
                                <Link
                                    // href={item.link}
                                    href={`${item.link}`}
                                    target='_blank'
                                    rel="noopener noreferrer"
                                    prefetch={false}
                                    className='d-block w-100'
                                >

                                    <ArticlesButton
                                        small
                                        className='w-100'
                                    >
                                        {item.preview ? item.preview_true_button_text : 'Play'}
                                        <i className="fal fa-play me-0 ms-2"></i>
                                    </ArticlesButton>

                                </Link>
                            }

                            {/* {(item.preview && userReduxState?.roles?.isDev) &&
                                <Link
                                    href={item.link}
                                    className=''
                                >

                                    <ArticlesButton
                                        className='flex-shrink-0 d-flex align-items-center'
                                        small
                                    >
                                        <span className='badge bg-warning shadow-articles text-dark'>
                                            <i className="fad fa-flask me-1"></i>
                                            isDev
                                        </span>
                                    </ArticlesButton>

                                </Link>
                            } */}

                        </div>

                        <div className='d-flex justify-content-center align-items-center'>

                            {item.github_repo && (
                                <ArticlesButton
                                    onClick={() => {
                                        window.open(item.github_repo, '_blank');
                                    }}
                                    className='flex-grow-1 text-center w-50 py-0'
                                    small
                                    variant='link'
                                >
                                    <i className="fab fa-github me-0 me-2"></i>
                                    <span>Github</span>
                                </ArticlesButton>
                            )}

                            <ArticlesButton
                                onClick={() => {
                                    setShowInfoModal({
                                        game: item.name,
                                        item: item
                                    })
                                }}
                                className='flex-grow-1 text-center w-50 py-0'
                                small
                                variant='link'
                            >
                                <i className="fal fa-info-circle me-0 me-2"></i>
                                <span>Game Info</span>
                            </ArticlesButton>

                        </div>

                    </div>

                </div>

                <div className="card-footer small p-1 py-1">

                    <div className='border'>

                        <div
                            className='d-flex border-bottom px-1 align-items-center'
                            style={{ fontSize: '0.65rem', cursor: 'pointer' }}
                            onClick={() => {
                                setActiveDeveloper(item)
                            }}
                        >

                            <span
                                className='me-1 border-end'
                                style={{ width: '60px' }}
                            >
                                Developer:
                            </span>
                            <span>
                                {item.developer}
                            </span>

                        </div>

                        <div
                            className='d-flex border-bottom px-1 align-items-center'
                            style={{ fontSize: '0.65rem' }}
                        >
                            <span
                                className='me-1 border-end'
                                style={{ width: '60px' }}
                            >
                                Publisher:
                            </span>
                            <span>{item.publisher || "Articles Media"}</span>
                        </div>

                        <div
                            className='d-flex border-bottom px-1 align-items-center'
                            style={{ fontSize: '0.65rem' }}
                        >
                            <span
                                className='me-1 border-end'
                                style={{
                                    width: '60px',
                                    // fontSize: '0.45rem'
                                }}
                            >
                                Rating:
                            </span>
                            <span>{item.content_rating || "No Rating Yet"}</span>
                        </div>

                        <div
                            className='d-flex px-1 align-items-center'
                            style={{ fontSize: '0.65rem' }}
                        >
                            <span
                                className='me-1 border-end'
                                style={{ width: '60px' }}
                            >
                                Engine:
                            </span>
                            <span>{item.engine || "None"}</span>
                        </div>

                    </div>

                    <div>



                    </div>

                </div>

            </div>

        </div>
    )

}
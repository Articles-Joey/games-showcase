import { useEffect, useState } from "react";

import { Modal, Form } from "react-bootstrap"

import ArticlesButton from "@/components/UI/Button";
import { useStore } from "../hooks/useStore";
import useChatStore from "../hooks/useChatStore";

import "styles/components/SettingsModal.scss";

export default function SettingsModal({
    show,
    setShow,
}) {

    const [showModal, setShowModal] = useState(true)

    const [lightboxData, setLightboxData] = useState(null)

    const [tab, setTab] = useState('Graphics')

    const socketServerHost = useStore((state) => state.socketServerHost);
    const setSocketServerHost = useStore((state) => state.setSocketServerHost);
    const reset = useStore((state) => state.reset);

    const controlSettings = useStore((state) => state.controlSettings);
    const setControlSettings = useStore((state) => state.setControlSettings);

    const renderUniqueGameSceneRange = useStore((state) => state.renderUniqueGameSceneRange);
    const setRenderUniqueGameSceneRange = useStore((state) => state.setRenderUniqueGameSceneRange);

    const enabled = useChatStore((state) => state.enabled);
    const speechBubblesEnabled = useChatStore((state) => state.speechBubblesEnabled);

    const audioSettings = useStore((state) => state.audioSettings);
    const setAudioSettings = useStore((state) => state.setAudioSettings);

    const arcadeMode = useStore((state) => state.arcadeMode);
    const setArcadeMode = useStore((state) => state.setArcadeMode);

    const darkMode = useStore((state) => state.darkMode);
    const toggleDarkMode = useStore((state) => state.toggleDarkMode);

    const [listenForKey, setListenForKey] = useState(false)

    const landingAnimation = useStore((state) => state.landingAnimation)
    const setLandingAnimation = useStore((state) => state.setLandingAnimation)

    useEffect(() => {
        if (listenForKey) {
            const handleKeyDown = (e) => {
                e.preventDefault()
                setListenForKey(prev => ({ ...prev, lastKey: e.key }))
            }
            window.addEventListener('keydown', handleKeyDown)
            return () => window.removeEventListener('keydown', handleKeyDown)
        }
    }, [listenForKey])

    if (listenForKey) {
        return (
            <div className="listen-for-key-overlay d-flex flex-column justify-content-center align-items-center">

                <div className="mb-3">Listening for key...</div>

                <div className="h2 border rounded p-3 px-5 mb-3 bg-dark text-white">
                    {listenForKey.lastKey || 'Press a key'}
                </div>

                <div className="d-flex">
                    <ArticlesButton
                        variant="warning"
                        onClick={() => {

                            setControlSettings({
                                ...controlSettings,
                                [listenForKey.action]: false,
                            })

                            setListenForKey(false)

                        }}
                    >
                        <i className="fas fa-undo me-2"></i>
                        Cancel
                    </ArticlesButton>
                    <ArticlesButton onClick={() => {

                        setControlSettings({
                            ...controlSettings,
                            [listenForKey.action]: listenForKey.lastKey,
                        })

                        setListenForKey(false)

                    }}>
                        Confirm
                    </ArticlesButton>
                </div>

            </div>
        )
    }

    return (
        <>
            {/* {lightboxData && (
                <Lightbox
                    mainSrc={lightboxData?.location}
                    onCloseRequest={() => setLightboxData(null)}
                    reactModalStyle={{
                        overlay: {
                            zIndex: '2000'
                        }
                    }}
                />
            )} */}

            {listenForKey && (
                <div className="listen-for-key-overlay">
                    Listening for key...
                </div>
            )}

            <Modal
                className="articles-modal"
                size='md'
                show={showModal}
                // To much jumping with little content for now
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
                    <Modal.Title>Game Settings</Modal.Title>
                </Modal.Header>

                <Modal.Body className="flex-column p-0">

                    <div className='p-2'>
                        {[
                            // 'Controls',
                            'Graphics',
                            'Audio',
                            // 'Multiplayer',
                            // 'Chat',
                            'Other',
                        ].map(item =>
                            <ArticlesButton
                                key={item}
                                active={tab == item}
                                onClick={() => { setTab(item) }}
                            >
                                {item}
                            </ArticlesButton>
                        )}
                    </div>

                    <hr className="my-0" />

                    <div className="p-2">

                        {tab == 'Graphics' &&
                            <>

                                <div className="mb-3">
                                    <div className="mx-2">Render Unique Game Scene Range</div>

                                    <div className='d-flex m-2 mb-3'>

                                        <ArticlesButton
                                            small
                                            className="w-50"
                                            // active={!audioSettings?.enabled}
                                            onClick={() => {
                                                setRenderUniqueGameSceneRange(renderUniqueGameSceneRange - 1)
                                            }}
                                        >
                                            <i className="fad fa-arrow-down"></i>
                                        </ArticlesButton>

                                        <ArticlesButton
                                            small
                                            className="w-50"
                                            // active={audioSettings?.enabled}
                                            onClick={() => {
                                                // setAudioSettings({
                                                //     ...audioSettings,
                                                //     enabled: true
                                                // })
                                            }}
                                        >
                                            {renderUniqueGameSceneRange}
                                        </ArticlesButton>

                                        <ArticlesButton
                                            small
                                            className="w-50"
                                            // active={audioSettings?.enabled}
                                            onClick={() => {
                                                setRenderUniqueGameSceneRange(renderUniqueGameSceneRange + 1)
                                            }}
                                        >
                                            <i className="fad fa-arrow-up"></i>
                                        </ArticlesButton>

                                    </div>
                                </div>

                                <div className="mb-3 mx-4">
                                    <div className="d-flex align-items-center">
                                        <Form.Check
                                            type="switch"
                                            id="dark-mode-switch"
                                            label="Dark Mode"
                                            // value={enabled}
                                            checked={darkMode}
                                            onChange={() => {
                                                toggleDarkMode();
                                            }}
                                        />
                                    </div>
                                    <div className="small mt-2">
                                        {`Dark Mode changes the game's color scheme to be easier on the eyes in low light environments.`}
                                    </div>
                                </div>

                                <div className="mb-3 mx-4">
                                    <div className="d-flex align-items-center">
                                        <Form.Check
                                            type="switch"
                                            id="synthwave-switch"
                                            label="Synthwave Animation"
                                            // value={enabled}
                                            checked={landingAnimation}
                                            onChange={() => {
                                                setLandingAnimation(!landingAnimation);
                                            }}
                                        />
                                    </div>
                                    <div className="small mt-2">
                                        {`Shows a Synthwave animation on the landing page.`}
                                    </div>
                                </div>

                            </>
                        }

                        {tab == 'Controls' &&
                            <div>

                                <div className="small pb-3 pt-2  border-bottom">
                                    Assign a key to a movement action. 1-4 are the defaults and are already assigned.
                                </div>

                                <div>
                                    {[
                                        {
                                            action: 'Move 1 Space',
                                            defaultKeyboardKey: '1'
                                        },
                                        {
                                            action: 'Move 2 Space',
                                            defaultKeyboardKey: '2'
                                        },
                                        {
                                            action: 'Move 3 Space',
                                            defaultKeyboardKey: '3'
                                        },
                                        {
                                            action: 'Move 4 Space',
                                            defaultKeyboardKey: '4'
                                        },
                                    ].map(obj =>
                                        <div key={obj.action}>
                                            <div className="flex-header border-bottom py-1 mb-1">

                                                <div>
                                                    <div>{obj.action}</div>
                                                    {obj.emote && <div className="span badge bg-dark">Emote</div>}
                                                </div>

                                                <div>

                                                    {/* <div className="badge badge-hover bg-articles me-1">{obj.defaultKeyboardKey}</div> */}

                                                    {controlSettings[obj.action] &&
                                                        <div className="badge bg-secondary me-1">
                                                            {controlSettings[obj.action]}
                                                        </div>
                                                    }

                                                    <ArticlesButton
                                                        className=""
                                                        small
                                                        onClick={() => setListenForKey({
                                                            action: obj.action,
                                                            lastKey: false
                                                        })}
                                                    >
                                                        Select Key
                                                    </ArticlesButton>

                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        }

                        {tab == 'Audio' &&
                            <>

                                <div className='d-flex m-2 mb-3'>

                                    <ArticlesButton
                                        small
                                        className="w-50"
                                        active={!audioSettings?.enabled}
                                        onClick={() => {
                                            setAudioSettings({
                                                ...audioSettings,
                                                enabled: false
                                            })
                                        }}
                                    >
                                        Off
                                    </ArticlesButton>

                                    <ArticlesButton
                                        small
                                        className="w-50"
                                        active={audioSettings?.enabled}
                                        onClick={() => {
                                            setAudioSettings({
                                                ...audioSettings,
                                                enabled: true
                                            })
                                        }}
                                    >
                                        On
                                    </ArticlesButton>

                                </div>

                                <Form.Label className="mb-0">Sound Effects</Form.Label>
                                <Form.Range
                                    value={audioSettings?.game_volume}
                                    onChange={(value) => {
                                        console.log("Value", value)
                                        setAudioSettings({
                                            ...audioSettings,
                                            game_volume: value.target.value
                                        });
                                    }}
                                />

                                <Form.Label className="mb-0">Music Volume</Form.Label>
                                <Form.Range
                                    value={audioSettings?.music_volume}
                                    onChange={(value) => {
                                        console.log("Value", value)
                                        setAudioSettings({
                                            ...audioSettings,
                                            music_volume: value.target.value
                                        });
                                    }}
                                />
                            </>
                        }

                        {tab == 'Other' &&
                            <div className="mx-4 pt-3">

                                {/* <hr />

                                <div className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <Form.Check
                                            type="switch"
                                            id="arcade-mode-switch"
                                            label="Arcade Mode"
                                            // value={enabled}
                                            checked={arcadeMode}
                                            onChange={() => {
                                                setArcadeMode(!arcadeMode);
                                            }}
                                        />
                                    </div>
                                    <div className="small mt-2">Arcade Mode automates the end of game and starting new ones for hands off arcade fun.</div>
                                </div> */}

                            </div>
                        }

                    </div>

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    {/* <div></div> */}


                    {/* <div> */}

                    <ArticlesButton
                        variant="outline-danger"
                        onClick={() => {
                            reset()
                            // setShow(false)
                        }}
                    >
                        Reset
                    </ArticlesButton>

                    <ArticlesButton
                        variant="outline-dark"
                        onClick={() => {
                            setShow(false)
                        }}
                    >
                        Close
                    </ArticlesButton>



                    {/* </div> */}


                    {/* <ArticlesButton variant="success" onClick={() => setValue(false)}>
                    Save
                </ArticlesButton> */}

                </Modal.Footer>

            </Modal>
        </>
    )

}
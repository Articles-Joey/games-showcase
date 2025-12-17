"use client"

import { QRCodeCanvas } from 'qrcode.react';

import Link from 'next/link';

import ArticlesButton from '@/components/UI/Button';

import { Dropdown, Form } from 'react-bootstrap';

import IsDev from '@/components/UI/IsDev';
import { useStore } from '../hooks/useStore';
// import { useSearchParams } from 'next/navigation';
// import usePeerConnection from '../hooks/usePeerConnection';
import { memo, Suspense, useEffect, useState } from 'react';
// import { connect } from 'socket.io-client';
// import PeerLogic from '../PeerLogic';
import useGameStore from '../hooks/useGameStore';
import useFullscreen from '../hooks/useFullScreen';
import useCameraStore from '../hooks/useCameraStore';
// import GameChat from './GameChat';
import classNames from 'classnames';
import useGames from '../hooks/useGames';

function GameMenu({
    reloadScene,
    // isFullscreen,
    // requestFullscreen,
    // exitFullscreen
}) {

    const { games, publicGames } = useGames();

    const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen();

    // const cameraUpdate = useCameraStore((state) => state?.cameraUpdate);
    const setCameraUpdate = useCameraStore((state) => state?.setCameraUpdate);

    // const router = useRouter()
    // const pathname = usePathname()
    // const searchParams = useSearchParams()
    // const searchParamsObject = Object.fromEntries(searchParams.entries());
    // const {
    //     server_id,
    //     server_type
    // } = searchParamsObject

    const activeGameIndex = useStore((state) => state?.activeGameIndex);
    const setActiveGameIndex = useStore((state) => state?.setActiveGameIndex);

    const showMenu = useStore((state) => state?.showMenu);
    const setShowMenu = useStore((state) => state?.setShowMenu);

    const gameState = useStore((state) => state?.gameState);
    const setGameState = useStore((state) => state?.setGameState);

    const audioSettings = useStore((state) => state?.audioSettings);
    const setAudioSettings = useStore((state) => state?.setAudioSettings);

    const renderMode = useStore((state) => state?.renderMode);
    const setRenderMode = useStore((state) => state?.setRenderMode)

    const setInfoModal = useStore((state) => state.setInfoModal)

    const setShowSettingsModal = useStore((state) => state.setShowSettingsModal)

    const devDebug = useStore((state) => state.devDebug)
    const toggleDevDebug = useStore((state) => state.toggleDevDebug)

    const sidebar = useStore((state) => state.sidebar)
    const toggleSidebar = useStore((state) => state.toggleSidebar)

    // const peerId = usePeerConnection((state) => state?.peerId);

    // const [players, setPlayers] = useState([]);
    const connections = useGameStore((state) => state.connections);

    const broadcastGameState = useGameStore((state) => state.broadcastGameState);
    const startGame = useGameStore((state) => state.startGame);
    const myId = useGameStore((state) => state.myId);
    const isHost = useGameStore((state) => state.isHost);

    const [peerId, setPeerId] = useState(false);

    // const shareLink = `/play?server_id=${peerId}&server_type=${server_type || 'error'}`

    // const peerRef = usePeerConnection((state) => state?.peerRef);
    // const connections = usePeerConnection((state) => state?.connections);
    // const setConnections = usePeerConnection((state) => state?.setConnections);
    // const peerId = usePeerConnection((state) => state?.peerId);
    // const connectPeer = usePeerConnection((state) => state?.connect);

    // useEffect(() => {
    //     console.log("peerRef:", peerRef?._id)
    // }, [peerRef])

    // useEffect(() => {
    //     console.log("peerId:", peerId)
    // }, [peerId])

    useEffect(() => {
        setPeerId(myId)
    }, [myId])

    useEffect(() => {
        console.log("remount")
    })

    return (
        <div
            // className='menu-card-wrapper'
            className={
                classNames(
                    'menu-card-wrapper',
                    {
                        show: showMenu,
                        "show-menu": showMenu,
                        "hide-menu": !showMenu,
                        "sidebar-enabled": sidebar,
                        "sidebar-disabled": !sidebar,
                    }
                )
            }
        >

            <div
                className={
                    classNames(
                        `menu-card-backdrop`,
                        {
                            show: showMenu,
                            "show-menu": showMenu,
                            "hide-menu": !showMenu,
                            "sidebar-enabled": sidebar,
                            "sidebar-disabled": !sidebar,
                        }
                    )
                }
            >

            </div>

            <div className={
                classNames(
                    `menu-card card card-articles rounded-0`,
                    {
                        show: showMenu,
                        "show-menu": showMenu,
                        "hide-menu": !showMenu,
                        "sidebar-enabled": sidebar,
                        "sidebar-disabled": !sidebar,
                    }
                )
            }>

                <div className="card-body p-2 mt-auto d-flex flex-column">

                    <div className='d-flex flex-column mb-2 mt-auto'>

                        <div className='mb-2'>

                            <Link
                                className=""
                                href={'/'}
                            >
                                <ArticlesButton
                                    small
                                    className='w-50'
                                >
                                    <i className="fad fa-sign-out fa-rotate-180"></i>
                                    Leave Game
                                </ArticlesButton>
                            </Link>

                            <ArticlesButton
                                small
                                className="w-50"
                                active={isFullscreen}
                                onClick={() => {
                                    if (isFullscreen) {
                                        exitFullscreen()
                                    } else {
                                        requestFullscreen('race-game-game-page')
                                    }
                                }}
                            >
                                {isFullscreen && <span>Exit </span>}
                                {!isFullscreen && <span><i className='fad fa-expand'></i></span>}
                                <span>Fullscreen</span>
                            </ArticlesButton>
                        </div>

                        <div className='d-flex flex-wrap mb-2'>

                            <ArticlesButton
                                small
                                className="w-50"
                                onClick={() => {
                                    setInfoModal(true)
                                }}
                            >
                                {/* <i className="fad fa-info-circle"></i> */}
                                <i className="fad fa-info-square"></i>
                                Info & Rules
                            </ArticlesButton>

                            <ArticlesButton
                                small
                                className="w-50"
                                onClick={() => {
                                    setShowSettingsModal(true)
                                }}
                            >
                                <i className="fad fa-cog"></i>
                                Settings
                            </ArticlesButton>

                            <ArticlesButton
                                className={`w-50`}
                                small
                                active={sidebar}
                                onClick={() => {
                                    toggleSidebar()
                                    setShowMenu(false)
                                }}
                            >
                                <i className="fad fa-info-square"></i>
                                Sidebar
                            </ArticlesButton>

                            <ArticlesButton
                                className={`w-50`}
                                small
                                active={devDebug}
                                onClick={() => {
                                    toggleDevDebug()
                                }}
                            >
                                <i className="fad fa-info-square"></i>
                                Dev Mode
                            </ArticlesButton>

                            <ArticlesButton
                                className={`w-50`}
                                small
                                // active={devDebug}
                                onClick={() => {
                                    reloadScene()
                                    console.log("games", games)
                                }}
                            >
                                <i className="fad fa-info-square"></i>
                                Reset
                            </ArticlesButton>

                        </div>

                        <div>
                            <ArticlesButton
                                className={``}
                                small
                                // active={devDebug}
                                onClick={() => {
                                    setActiveGameIndex(activeGameIndex - 1)
                                }}
                            >
                                <i className="fad fa-arrow-circle-down"></i>
                                
                            </ArticlesButton>
                            <ArticlesButton
                                className={``}
                                small
                                // active={devDebug}
                                onClick={() => {
                                    
                                }}
                                disabled
                            >
                                {activeGameIndex}/{publicGames?.length || 0}
                            </ArticlesButton>
                            <ArticlesButton
                                className={``}
                                small
                                // active={devDebug}
                                onClick={() => {
                                    setActiveGameIndex(activeGameIndex + 1)
                                }}
                            >
                                <i className="fad fa-arrow-circle-up"></i>
                            </ArticlesButton>
                        </div>

                    </div>

                    <hr className='my-2' />

                    <div className='d-flex'>

                        {/* Audio */}
                        <div className='w-50 m-lg-1'>

                            <div className="small text-center">
                                Audio
                            </div>

                            <div className='d-flex'>

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

                        </div>

                        {/* Rendering */}
                        <div className="w-50 m-lg-1">

                            <div className="small text-center">
                                Game Style
                            </div>

                            <div className='d-flex'>

                                <ArticlesButton
                                    small
                                    className="w-50 mb-2"
                                    active={renderMode == "2D"}
                                    onClick={() => {
                                        setRenderMode("2D")
                                    }}
                                >
                                    2D
                                </ArticlesButton>

                                <ArticlesButton
                                    small
                                    className="w-50 mb-2"
                                    active={renderMode == "3D"}
                                    onClick={() => {
                                        setRenderMode("3D")
                                    }}
                                >
                                    3D
                                </ArticlesButton>

                            </div>

                        </div>

                    </div>

                    {audioSettings?.enabled && <div className="volume-control card-body text-center border p-1 py-2">
                        <Form.Label className="small mb-0">Volume: {(+audioSettings?.game_volume || 0).toFixed()}%</Form.Label>
                        <Form.Range
                            className="mb-0"
                            value={(audioSettings?.game_volume)}
                            onChange={(e) => {

                                console.log("Change", e.target.value)
                                const newVolume = parseFloat(e.target.value);
                                console.log(newVolume)

                                setAudioSettings({
                                    ...audioSettings,
                                    game_volume: +newVolume
                                })

                            }}
                        />
                    </div>}

                    {/* <hr className='my-4' /> */}

                    <IsDev>
                        <hr className='my-2' />

                        <div className="small text-center">
                            Dev Debug
                        </div>

                        <div className='d-flex flex-column mb-2'>

                            <ArticlesButton
                                small
                                variant="warning"
                                className="mb-2"
                                // active={renderMode == "2D"}
                                onClick={() => {
                                    // setRenderMode("2D")
                                }}
                            >
                                Reset Room
                            </ArticlesButton>

                            <ArticlesButton
                                small
                                variant="warning"
                                className="mb-2"
                                // active={renderMode == "2D"}
                                onClick={() => {
                                    // setRenderMode("2D")
                                    startGame()
                                }}
                            >
                                Force Start
                            </ArticlesButton>

                            <ArticlesButton
                                small
                                variant="warning"
                                className="mb-2"
                                // active={renderMode == "2D"}
                                onClick={() => {
                                    // setRenderMode("2D")
                                    generateMysterySpots()
                                }}
                            >
                                Generate Mystery Spots
                            </ArticlesButton>

                        </div>
                    </IsDev>

                    <Dropdown className="d-flex w-100 text-center">

                        <Dropdown.Toggle variant='articles w-100 d-flex justify-content-center align-items-center text-center'>
                            Camera Presets
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="">

                            {
                                // userReduxState?.friends?
                                [
                                    {
                                        name: "Starting",
                                        position: [19, 10, 15]
                                    },
                                    {
                                        name: "Bleacher",
                                        position: [28.32, 5.38, -6.30]
                                    },
                                    {
                                        name: "First Person",
                                        position: [0, 3.5, 0]
                                    },
                                    {
                                        name: "Wind Turbine",
                                        position: [42.50, 16.94, -125.86]
                                    }
                                ]
                                    .map((friend, i) => {
                                        return (
                                            <Dropdown.Item
                                                key={`${i}-${friend.name}`}
                                                onClick={() => {
                                                    setCameraUpdate({
                                                        position: friend.position
                                                    })
                                                }}
                                                className=""
                                                eventKey={i}
                                            >
                                                {/* <i className="fad fa-user" aria-hidden="true"></i> */}
                                                {friend.name}
                                            </Dropdown.Item>
                                        )
                                    })}

                        </Dropdown.Menu>

                    </Dropdown>

                </div>

            </div>

        </div>
    );
}

export default memo(GameMenu);
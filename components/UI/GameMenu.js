"use client"

// import { QRCodeCanvas } from 'qrcode.react';

import Link from 'next/link';

import ArticlesButton from '@/components/UI/Button';

import { Dropdown, Form } from 'react-bootstrap';

// import IsDev from '@/components/UI/IsDev';
import { useStore } from '../hooks/useStore';
// import { useSearchParams } from 'next/navigation';
// import usePeerConnection from '../hooks/usePeerConnection';
import { memo, Suspense, useEffect, useState } from 'react';
// import { connect } from 'socket.io-client';
// import PeerLogic from '../PeerLogic';
// import useGameStore from '../hooks/useGameStore';
import useFullscreen from '../hooks/useFullScreen';
import useCameraStore from '../hooks/useCameraStore';
// import GameChat from './GameChat';
import classNames from 'classnames';
import useGames from '../hooks/useGames';
// import { Article } from '@mui/icons-material';
import useAllGames from '../hooks/useAllGames';
import { useGameControllerKeyboardStore } from '@articles-media/articles-gamepad-helper';

function GameMenu({
    reloadScene,
    // isFullscreen,
    // requestFullscreen,
    // exitFullscreen
}) {

    const { games, publicGames } = useGames();

    const { games: allGames } = useAllGames();

    // const { games } = useBulkGames();

    const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen();

    // const cameraUpdate = useCameraStore((state) => state?.cameraUpdate);
    const setCameraUpdate = useCameraStore((state) => state?.setCameraUpdate);

    const visible = useGameControllerKeyboardStore((state) => state.visible);

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

    const zoomLevel = useStore((state) => state?.zoomLevel);
    const setZoomLevel = useStore((state) => state?.setZoomLevel);

    const showMenu = useStore((state) => state?.showMenu);
    const setShowMenu = useStore((state) => state?.setShowMenu);

    const search = useStore((state) => state.search);
    const setSearch = useStore((state) => state.setSearch);

    const filters = useStore((state) => state.filters);
    const setFilters = useStore((state) => state.setFilters);

    // const gameState = useStore((state) => state?.gameState);
    // const setGameState = useStore((state) => state?.setGameState);

    // const audioSettings = useStore((state) => state?.audioSettings);
    // const setAudioSettings = useStore((state) => state?.setAudioSettings);

    // const renderMode = useStore((state) => state?.renderMode);
    // const setRenderMode = useStore((state) => state?.setRenderMode)

    const setInfoModal = useStore((state) => state.setInfoModal)

    const setShowSettingsModal = useStore((state) => state.setShowSettingsModal)

    const devDebug = useStore((state) => state.devDebug)
    const toggleDevDebug = useStore((state) => state.toggleDevDebug)

    const sidebar = useStore((state) => state.sidebar)
    const toggleSidebar = useStore((state) => state.toggleSidebar)

    // const peerId = usePeerConnection((state) => state?.peerId);

    // const [players, setPlayers] = useState([]);
    // const connections = useGameStore((state) => state.connections);

    // const broadcastGameState = useGameStore((state) => state.broadcastGameState);
    // const startGame = useGameStore((state) => state.startGame);
    // const myId = useGameStore((state) => state.myId);
    // const isHost = useGameStore((state) => state.isHost);

    // const [peerId, setPeerId] = useState(false);

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

    // useEffect(() => {
    //     setPeerId(myId)
    // }, [myId])

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

                        <div className='search-bar-'>
                            <input
                                type="text"
                                className='form-control form-control-sm'
                                placeholder='Search Games...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {process.env.NODE_ENV === 'development' &&
                            <div className='local-only-content border p-1'>

                                {visible ? <div>Visible Content</div> : <div>Hidden Content</div>}

                                <div className='flex-header mb-1'>

                                    <span>Launchers</span>

                                    <ArticlesButton
                                        className={``}
                                        small
                                    >
                                        <i className='fad fa-eraser me-0'></i>
                                    </ArticlesButton>

                                </div>

                                <div>
                                    {Object.keys(filters.launchers).map((launcher) => (
                                        <ArticlesButton
                                            key={launcher}
                                            className={`w-50`}
                                            small
                                            active={filters.launchers[launcher]}
                                            onClick={() => {
                                                const newLaunchers = { ...filters.launchers };
                                                newLaunchers[launcher] = !newLaunchers[launcher];
                                                setFilters({ ...filters, launchers: newLaunchers });
                                            }}
                                        >
                                            {launcher}
                                        </ArticlesButton>
                                    ))}
                                </div>
                                
                                {/* 
                                <ArticlesButton
                                    className={`w-50`}
                                    small
                                >
                                    Steam
                                </ArticlesButton>
                                <ArticlesButton
                                    className={`w-50`}
                                    small
                                >
                                    Epic Games
                                </ArticlesButton>
                                <ArticlesButton
                                    className={`w-50`}
                                    small
                                >
                                    Custom
                                </ArticlesButton> */}

                            </div>
                        }

                        <div>
                            Filters
                        </div>

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
                                        requestFullscreen('carousel-game-page')
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
                                {activeGameIndex}/{(allGames?.length - 1) || 0}
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

                        <div>
                            <ArticlesButton
                                className={``}
                                small
                                // active={devDebug}
                                onClick={() => {
                                    setZoomLevel(zoomLevel - 1)
                                }}
                            >
                                <i className="fad fa-arrow-circle-down"></i>

                            </ArticlesButton>
                            <ArticlesButton
                                className={``}
                                small
                                disabled
                                onClick={() => {

                                }}
                            >
                                {zoomLevel}
                            </ArticlesButton>
                            <ArticlesButton
                                className={``}
                                small
                                onClick={() => {
                                    setZoomLevel(zoomLevel + 1)
                                }}
                            >
                                <i className="fad fa-arrow-circle-up"></i>
                            </ArticlesButton>
                        </div>

                    </div>

                    <hr className='my-2' />

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

        </div >
    );
}

export default memo(GameMenu);
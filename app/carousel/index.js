"use client"
import { useEffect, useContext, useState, useRef, useMemo, lazy } from 'react';

// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic'

import ArticlesButton from '@/components/UI/Button';

import useFullscreen from '@/components/hooks/useFullScreen';
// import { useControllerStore } from '@/hooks/useControllerStore';

// import { useLocalStorageNew } from '@/hooks/useLocalStorageNew';

// import LeftPanelContent from '@/components/UI/LeftPanel';
import LeftPanelContent from '@/components/UI/GameMenu';
// import GameControllerKeyboard from '@/components/GameControllerKeyboard';

// import { useSocketStore } from '@/hooks/useSocketStore';
// import { useCannonStore } from '@/hooks/useCannonStore';
// import generateRandomInteger from '@/util/generateRandomInteger';
// import ControlsOverlay from '@/components/Game/ControlsOverlay';
// import TouchControls from '@/components/UI/TouchControls';

const GameCanvas = dynamic(() => import('@/components/Game/GameCanvas'), {
    ssr: false,
});
import GameMenu from '@articles-media/articles-dev-box/GameMenu';

import GamepadKeyboard from "@articles-media/articles-gamepad-helper/GamepadKeyboard"
import { useStore } from '@/components/hooks/useStore';
// const GamepadKeyboard = lazy(() => import('@articles-media/articles-gamepad-helper/GamepadKeyboard'));

export default function PageContent() {

    // const {
    //     socket
    // } = useSocketStore(state => ({
    //     socket: state.socket
    // }));

    const sidebar = useStore(state => state.sidebar)

    // const resetPlayerRotation = useCannonStore(state => state.resetPlayerRotation);
    // const setGoalLocation = useCannonStore(state => state.setGoalLocation);

    // const router = useRouter()
    // const pathname = usePathname()
    // const searchParams = useSearchParams()
    // const params = Object.fromEntries(searchParams.entries());
    // const { server } = params

    // const { controllerState, setControllerState } = useControllerStore()
    // const [showControllerState, setShowControllerState] = useState(false)

    // const [ cameraMode, setCameraMode ] = useState('Player')

    // const [players, setPlayers] = useState([])

    // useEffect(() => {

    //     if (server && socket.connected) {
    //         socket.emit('join-room', `game:cannon-room-${server}`, {
    //             game_id: server,
    //             nickname: JSON.parse(localStorage.getItem('game:nickname')),
    //             client_version: '1',

    //         });
    //     }

    //     // return function cleanup() {
    //     //     socket.emit('leave-room', 'game:glass-ceiling-landing')
    //     // };

    // }, [server, socket.connected]);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {

        setMounted(true);

        // resetPlayerRotation()
        // setGoalLocation([
        //     generateRandomInteger(-10, 10),
        //     0,
        //     generateRandomInteger(-10, 10)
        // ])

    }, []);

    // const [showMenu, setShowMenu] = useState(false)

    // const [touchControlsEnabled, setTouchControlsEnabled] = useLocalStorageNew("game:touchControlsEnabled", false)

    // const [sceneKey, setSceneKey] = useState(0);
    const sceneKey = useStore(state => state.sceneKey)

    // const [gameState, setGameState] = useState(false)

    // Function to handle scene reload
    // const reloadScene = () => {
    //     // resetPlayerRotation()
    //     // setGoalLocation([
    //     //     generateRandomInteger(-10, 10),
    //     //     0,
    //     //     generateRandomInteger(-10, 10)
    //     // ])
    //     setSceneKey((prevKey) => prevKey + 1);
    // };

    const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen();

    // let panelProps = {
    //     // server,
    //     // players,
    //     // touchControlsEnabled,
    //     // setTouchControlsEnabled,
    //     reloadScene,
    //     // controllerState,
    //     // isFullscreen,
    //     // requestFullscreen,
    //     // exitFullscreen,
    //     // setShowMenu
    // }

    return (

        <div
            className={`games-showcase-carousel-page carousel-game-page ${isFullscreen && 'fullscreen'} ${sidebar && 'show-sidebar'}`}

        >

            <GamepadKeyboard />

            <GameMenu
                useStore={useStore}
                LeftPanelContent={LeftPanelContent}
                menuBarConfig={{
                    style: "Corner Button",
                    menuBarButtonPosition: "Left"
                }}
                sidebarConfig={{
                    style: "Static Panel",
                }}
            />

            {/* <div className="menu-bar card card-articles p-1 justify-content-center">

                <div className='d-flex justify-content-center align-items-center'>

                    <ArticlesButton
                        small
                        active={showMenu}
                        className="px-5"
                        onClick={() => {
                            setShowMenu(prev => !prev)
                        }}
                    >
                        <i className="fad fa-bars"></i>
                        <span>Menu</span>
                    </ArticlesButton>

                    <div>
                    </div>

                </div>

            </div> */}

            {/* <div className={`mobile-menu ${showMenu && 'show'}`}>
                <LeftPanelContent
                    {...panelProps}
                />
            </div> */}

            {/* <TouchControls
                // touchControlsEnabled={touchControlsEnabled}
            /> */}

            {/* <div className='panel-left card rounded-0 d-none d-lg-flex'>

                <LeftPanelContent
                    {...panelProps}
                />

            </div> */}

            {/* <div className='game-info'>
                <div className="card card-articles card-sm">
                    <div className="card-body">
                        <pre> 
                            {JSON.stringify(playerData, undefined, 2)}
                        </pre>
                    </div>
                </div>
            </div> */}

            {/* <ControlsOverlay /> */}

            <div className='canvas-wrap'>

                <div className='controller-only controls-helper'>

                    <img
                        id={"controls-helper-dpad-left"}
                        src="img/Xbox UI/DpadL.svg"
                        alt="Control Keys"
                        className='only-controller'
                        loading='lazy'
                    ></img>                    

                    <div className='bubble'>
                        <img 
                        className='me-2' 
                        height={30} 
                        width={30} 
                        src="img/Xbox UI/A.svg" 
                        alt="Control Keys"
                        loading='lazy'
                        ></img>
                        <strong>Select</strong>
                    </div>

                    <div className='bubble'>
                        <img className='me-2' height={30} width={30} src="img/Xbox UI/X.svg" alt="Control Keys" loading='lazy'></img>
                        <strong>Details</strong>
                    </div>

                    <img
                        id={"controls-helper-dpad-right"}
                        src="img/Xbox UI/DpadR.svg"
                        alt="Control Keys"
                        className='only-controller'
                        loading='lazy'
                    ></img>

                </div>

                {mounted && <GameCanvas
                    key={sceneKey}
                // gameState={gameState}
                // playerData={playerData}
                // setPlayerData={setPlayerData}
                // players={players}
                />}

            </div>

        </div>
    );
}
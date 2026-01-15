"use client"
import { useEffect, useContext, useState, Suspense } from 'react';

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// import { useSelector, useDispatch } from 'react-redux'

// const ChromePicker = dynamic(() => import('react-color'), {
//     ssr: false,
// });

// import useUserDetails from '@/components/hooks/user/useUserDetails';
// import useUserToken from '@/components/hooks/user/useUserToken';

// import { useLocalStorageNew } from '@/components/hooks/useLocalStorageNew';

// import { useForm, useWatch } from "react-hook-form";

// import Logo from "public/images/race-game/splash.jpg";

// import ROUTES from 'components/constants/routes'

import ArticlesButton from '@/components/UI/Button';

// const Ad = dynamic(() => import('components/Ads/Ad'), {
//     ssr: false,
// });

// const Viewer = dynamic(
//     () => import('@/components/Game/Viewer'),
//     { ssr: false }
// )

// const Duck = dynamic(
//     () => import('@/components/Game/PlayerModels/Duck'),
//     { ssr: false }
// )

// const Dog = dynamic(
//     () => import('@/components/Game/PlayerModels/Dog'),
//     { ssr: false }
// )

// const Bear = dynamic(
//     () => import('@/components/Game/PlayerModels/Bear'),
//     { ssr: false }
// )

// const Witch = dynamic(
//     () => import('@/components/Game/PlayerModels/Witch'),
//     { ssr: false }
// )

// import SingleInput from '@/components/Articles/SingleInput';
// import IsDev from '@/components/UI/IsDev';
import { useSocketStore } from '@/components/hooks/useSocketStore';
// import ArticlesAd from '@/components/ArticlesAd';
import CreditsModal from '@/components/UI/CreditsModal';
// import { Settings } from '@mui/icons-material';

import { useStore } from '@/components/hooks/useStore';
// import usePeerConnection from '@/components/hooks/usePeerConnection';
// import PeerLogic from '@/components/PeerLogic';

// const LoginInfoModal = dynamic(
//     () => import('@/components/UI/LoginInfoModal'),
//     { ssr: false }
// )

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

// import SynthwaveAnimation from '@/components/Game/Synthwave/SynthwaveAnimation';
const SynthwaveAnimation = dynamic(
    () => import('@/components/Game/Synthwave/SynthwaveAnimation'),
    { ssr: false }
)

export default function LandingPage() {

    // const peerId = usePeerConnection((state) => state?.peerId);

    // const {
    //     socket,
    // } = useSocketStore(state => ({
    //     socket: state.socket,
    // }));
    const socket = useSocketStore((state) => state.socket)
    const connectSocket = useSocketStore((state) => state.connectSocket)
    const disconnectSocket = useSocketStore((state) => state.disconnectSocket)
    const connected = useSocketStore((state) => state.connected)

    const loginInfoModal = useStore((state) => state.loginInfoModal)
    const toggleLoginInfoModal = useStore((state) => state.toggleLoginInfoModal)

    const landingAnimation = useStore((state) => state.landingAnimation)
    const setLandingAnimation = useStore((state) => state.setLandingAnimation)

    const infoModal = useStore((state) => state.infoModal)
    const setInfoModal = useStore((state) => state.setInfoModal)
    // const toggleInfoModal = useStore((state) => state.toggleInfoModal)

    // const showSettingsModal = useStore((state) => state.showSettingsModal)
    const setShowSettingsModal = useStore((state) => state.setShowSettingsModal)
    // const toggleSettingsModal = useStore((state) => state.toggleSettingsModal)

    const showCreditsModal = useStore((state) => state.showCreditsModal)
    const setShowCreditsModal = useStore((state) => state.setShowCreditsModal)

    // const [showInfoModal, setShowInfoModal] = useState(false)
    // const [showCreditsModal, setShowCreditsModal] = useState(false)

    // const userReduxState = useSelector((state) => state.auth.user_details)
    const userReduxState = false

    // const {
    //     data: userToken,
    //     error: userTokenError,
    //     isLoading: userTokenLoading,
    //     mutate: userTokenMutate
    // } = useUserToken();

    // const {
    //     data: userDetails,
    //     error: userDetailsError,
    //     isLoading: userDetailsLoading,
    //     mutate: userDetailsMutate
    // } = useUserDetails({
    //     token: userToken
    // });

    // const [rulesAnControls, setRulesAnControls] = useState(false);

    // const { register, handleSubmit, watch, formState: { errors } } = useForm({
    //     defaultValues: {
    //         // "Cover Fees": false
    //         ...(typeof window !== 'undefined' && { nickname: localStorage.getItem('game:nickname') || userReduxState.display_name })
    //     }
    // });

    // const nickname = watch("nickname", false);

    // const [nickname, setNickname] = useLocalStorageNew("game:nickname", userReduxState.display_name)

    const nickname = useStore((state) => state.nickname)
    const setNickname = useStore((state) => state.setNickname)

    const [lobbyDetails, setLobbyDetails] = useState({
        players: [],
        games: [],
    })

    useEffect(() => {

        // setRulesAnControls(localStorage.getItem('game:race-game:rulesAnControls') === 'true' ? true : false)

        // if (userReduxState._id) {
        //     console.log("Is user")
        // }

        socket.on('game:game-showcase-landing-details', function (msg) {
            console.log('game:game-showcase-landing-details', msg)
            setLobbyDetails(msg)
        });

        return () => {
            socket.off('game:game-showcase-landing-details');
            socket.emit('leave-room', 'game:game-showcase-landing')
        };

    }, [socket])

    useEffect(() => {

        if (socket.connected) {
            socket.emit('join-room', 'game:game-showcase-landing');
        }

        return function cleanup() {
            // socket.emit('leave-room', 'game:game-showcase-landing')
        };

    }, [socket.connected]);

    return (

        <div className="landing-page">

            {showCreditsModal &&
                <CreditsModal
                    show={showCreditsModal}
                    setShow={setShowCreditsModal}
                />
            }

            <div className='background-wrap'>
                <Image
                    // src={`${process.env.NEXT_PUBLIC_CDN}games/Race Game/background.jpg`}
                    // src={`/img/preview.webp`}
                    src={`https://cdn.articles.media/games/synth.jpg`}
                    fill
                    alt=""
                    style={{
                        objectFit: 'cover',
                        filter: 'blur(3px)',
                    }}
                />
            </div>

            {landingAnimation &&
                <div
                    className='synthwave-animation'
                >
                    <SynthwaveAnimation />
                </div>
            }

            <div 
                className="container d-flex flex-column justify-content-center align-items-center"
                style={{ "width": "20rem" }}
            >                

                <img 
                    src={"img/icon.svg"}
                    width={200}
                    className='landing-logo-image'
                />

                <div
                    className='landing-title tiny5-regular'
                >
                    games.articles.media
                </div>

                <div className="card card-articles card-sm mb-5">

                    <div className="card-header d-flex align-items-center">

                        Select Launcher Mode

                    </div>

                    <div className="card-body p-2">

                        <OverlayTrigger placement="right"
                            overlay={
                                <Popover id="popover-basic">
                                    <Popover.Header as="h3">Original</Popover.Header>
                                    <Popover.Body
                                        className="py-2"
                                    >
                                        <div className="mb-1">
                                            <span className='badge bg-success'>
                                                ...
                                            </span>
                                        </div>
                                        <span>
                                            Browse and launch games just how they are showed via articles.media.
                                        </span>
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <Link href="/original">
                                <ArticlesButton
                                    className={`w-100 mb-2`}
                                    small
                                    onClick={() => {

                                    }}
                                >
                                    <i className='fad fa-browser me-2'></i>
                                    Original
                                </ArticlesButton>
                            </Link>
                        </OverlayTrigger>

                        <OverlayTrigger placement="right"
                            overlay={
                                <Popover id="popover-basic">
                                    <Popover.Header as="h3">Carousel</Popover.Header>
                                    <Popover.Body
                                        className="py-2"
                                    >
                                        <div className="mb-1">
                                            <span className='badge bg-success'>
                                                ...
                                            </span>
                                        </div>
                                        <span>
                                            Browse and launch games in a 3D carousel environment.
                                        </span>
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <Link href="/carousel">
                                <ArticlesButton
                                    className={`w-100 mb-2`}
                                    small
                                    onClick={() => {

                                    }}
                                >
                                    <i className='fad fa-gamepad me-2'></i>
                                    Carousel
                                </ArticlesButton>
                            </Link>
                        </OverlayTrigger>

                        <OverlayTrigger placement="right"
                            overlay={
                                <Popover id="popover-basic">
                                    <Popover.Header as="h3">Wall</Popover.Header>
                                    <Popover.Body
                                        className="py-2"
                                    >
                                        <div className="mb-1">
                                            <span className='badge bg-success'>
                                                ...
                                            </span>
                                        </div>
                                        <span>
                                            Browse and launch games in a 2D scrolling wall environment.
                                        </span>
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <Link href="/wall">
                                <ArticlesButton
                                    className={`w-100 mb-2`}
                                    small
                                    onClick={() => {

                                    }}
                                >
                                    <i className='fad fa-joystick me-2'></i>
                                    Wall
                                </ArticlesButton>
                            </Link>
                        </OverlayTrigger>

                    </div>

                    <div className="card-footer d-flex flex-wrap justify-content-center">

                        {/* <ArticlesButton
                            className={`w-50`}
                            small
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
                            onClick={() => {
                                setInfoModal(true)
                            }}
                        >
                            <i className="fad fa-info-square"></i>
                            Info & Rules
                        </ArticlesButton> */}

                        <a className='w-50' target='_blank' href='https://github.com/Articles-Joey/games-showcase'>
                            <ArticlesButton
                                className={`w-100`}
                                small
                                onClick={() => {

                                }}
                            >
                                <i className="fab fa-github"></i>
                                GitHub
                            </ArticlesButton>
                        </a>

                        <ArticlesButton
                            className={`w-50`}
                            small
                            onClick={() => {
                                setShowCreditsModal(true)
                            }}
                        >
                            <i className="fad fa-users"></i>
                            Credits
                        </ArticlesButton>

                        <ArticlesButton
                            className={`w-50`}
                            small
                            onClick={() => {
                                setShowSettingsModal(true)
                            }}
                        >
                            <i className="fad fa-users"></i>
                            Settings
                        </ArticlesButton>

                        <ArticlesButton
                            className={`w-50 landing-animation-toggle-button`}
                            small
                            onClick={() => {
                                setLandingAnimation(!landingAnimation)
                            }}
                        >
                            <i className="fad fa-camera"></i>
                            {landingAnimation ? 'Disable' : 'Enable'} Animation
                        </ArticlesButton>

                    </div>

                </div>

                <Link
                    href="https://articles.media&utm_source=games.articles.media&utm_medium=landing"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ArticlesButton className="visit-articles-button">
                        <img 
                            src={"https://cdn.articles.media/profile_photos/starter/articles.jpg"}
                            width={10}
                            className='me-3'
                        />
                        Visit articles.media
                    </ArticlesButton>
                </Link>

            </div>
        </div >
    );
}
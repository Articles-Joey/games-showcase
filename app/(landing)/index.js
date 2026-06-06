"use client"
import { useEffect, useContext, useState, Suspense, useRef } from 'react';

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import ArticlesButton from '@/components/UI/Button';

import GameMenuPrimaryButtonGroup from '@articles-media/articles-dev-box/GameMenuPrimaryButtonGroup';
// import { useSocketStore } from '@/components/hooks/useSocketStore';
const CreditsModal = dynamic(
    () => import('@articles-media/articles-dev-box/CreditsModal'),
    { ssr: false }
)

import { useStore } from '@/components/hooks/useStore';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import PieMenu from '@articles-media/articles-gamepad-helper/PieMenu';

import { useLandingNavigation } from '@/hooks/useLandingNavigation';
import InfoModal from '@/components/UI/InfoModal';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useSocketStore } from '@/components/hooks/useSocketStore';
import OnlinePlayerCount from '@/components/UI/OnlinePlayerCount';
import SearchParamsHandler from '@/components/Handlers/SearchParamsHandler';

const SynthwaveAnimation = dynamic(
    () => import('@/components/Game/Synthwave/SynthwaveAnimation'),
    { ssr: false }
)

export default function LandingPage() {

    // const router = useRouter()
    // const pathname = usePathname()
    // const searchParams = useSearchParams()
    // const params = Object.fromEntries(searchParams.entries());
    // const { utm_source, utm_medium } = params

    const connected = useSocketStore((state) => state.connected)

    const elementsRef = useRef([]);
    useLandingNavigation(elementsRef);

    const darkMode = useStore((state) => state.darkMode)
    const toggleDarkMode = useStore((state) => state.toggleDarkMode)

    const landingAnimation = useStore((state) => state.landingAnimation)
    const setLandingAnimation = useStore((state) => state.setLandingAnimation)

    const setShowSettingsModal = useStore((state) => state.setShowSettingsModal)
    const showInfoModal = useStore((state) => state.showInfoModal)
    const setShowInfoModal = useStore((state) => state.setShowInfoModal)

    const showCreditsModal = useStore((state) => state.showCreditsModal)
    const setShowCreditsModal = useStore((state) => state.setShowCreditsModal)

    const lobbyDetails = useStore(state => state.lobbyDetails)

    // useEffect(() => {

    //     if (utm_source || utm_medium) {
    //         console.log("UTM Params:", { utm_source, utm_medium })

    //         const current = new URLSearchParams(Array.from(searchParams.entries()));
    //         current.delete('utm_source');
    //         current.delete('utm_medium');
    //         const search = current.toString();
    //         const query = search ? `?${search}` : "";
    //         router.replace(`${pathname}${query}`);
    //     }

    // }, [searchParams, router, pathname])

    return (

        <div className="landing-page">

            <Suspense>
                <SearchParamsHandler />
            </Suspense>           

            <Suspense>
                <PieMenu
                    options={[
                        {
                            label: 'Settings',
                            icon: 'fad fa-cog',
                            callback: () => {
                                setShowSettingsModal(prev => !prev)
                            }
                        },
                        {
                            label: 'Credits',
                            icon: 'fad fa-cog',
                            callback: () => {
                                setShowCreditsModal(true)
                            }
                        },
                        {
                            label: 'Toggle Animation',
                            icon: 'fad fa-cog',
                            callback: () => {
                                setLandingAnimation(!landingAnimation)
                            }
                        },
                    ]}
                    onFinish={(event) => {
                        console.log("Event", event)
                        if (event.callback) {
                            event.callback()
                        }
                    }}
                />
            </Suspense>

            {showCreditsModal &&
                <CreditsModal
                    show={showCreditsModal}
                    setShow={setShowCreditsModal}
                    owner='Articles-Joey'
                    repo='games-showcase'
                />
            }
            {showInfoModal &&
                <InfoModal
                    show={showInfoModal}
                    setShow={setShowInfoModal}
                />
            }

            <div className='background-wrap'>
                <Image
                    // src={`${process.env.NEXT_PUBLIC_CDN}games/Race Game/background.jpg`}
                    // src={`/img/preview.webp`}
                    src={`https://cdn.articles.media/games/synth.jpg`}
                    fill
                    alt=""
                    // style={{
                    //     objectFit: 'cover',
                    //     filter: 'blur(10px)',
                    //     transform: 'scale(1.05)',
                    // }}
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

                <OnlinePlayerCount />

                {/* <div className="px-1">{lobbyDetails?.landing_player_count}</div> */}

                <div className="card card-articles card-sm mb-5">

                    <div className="card-header d-flex align-items-center justify-content-center">

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
                                        {/* <div className="mb-1">
                                            <span className='badge bg-success'>
                                                ...
                                            </span>
                                        </div> */}
                                        <span>
                                            Browse and launch games just how they are showed via articles.media.
                                        </span>
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <Link href="/original" prefetch={false} >
                                <ArticlesButton
                                    ref={el => elementsRef.current[0] = el}
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
                                        {/* <div className="mb-1">
                                            <span className='badge bg-success'>
                                                ...
                                            </span>
                                        </div> */}
                                        <span>
                                            Browse and launch games in a 3D carousel environment.
                                        </span>
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <Link href="/carousel" prefetch={false} >
                                <ArticlesButton
                                    ref={el => elementsRef.current[1] = el}
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
                                        {/* <div className="mb-1">
                                            <span className='badge bg-success'>
                                                ...
                                            </span>
                                        </div> */}
                                        <span>
                                            Browse and launch games in a 2D scrolling wall environment.
                                        </span>
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <Link href="/wall" prefetch={false} >
                                <ArticlesButton
                                    ref={el => elementsRef.current[2] = el}
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

                        <GameMenuPrimaryButtonGroup
                            useStore={useStore}
                            type="Landing"
                        />

                        <ArticlesButton
                            ref={el => elementsRef.current[6] = el}
                            className={`w-50 landing-animation-toggle-button mt-2`}
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
                    <ArticlesButton
                        className="visit-articles-button"
                        ref={el => elementsRef.current[7] = el}
                    >
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
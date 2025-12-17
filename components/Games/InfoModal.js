import { useEffect, useState } from "react";

import Image from "next/image";
import dynamic from 'next/dynamic'

// import { useSelector } from 'react-redux'

import { Modal } from "react-bootstrap"

// import ViewUserModal from "@/components/user/ViewUserModal/ViewUserModal"

// import BasicLoading from "@/components/loading/BasicLoading";

// import powerups from "app/(site)/community/games/four-frogs/components/powerups";

// import games from "../constants/games";
// import IsDev from "../IsDev";
// import ArticlesButton from "/Button";

import ArticlesButton from '@/components/UI/Button';
import useGames from "../hooks/useGames";

const registeredGames = [
    'Four Frogs',
    'Race Game',
    'Eager Eagle',
    'Plinko',
    'Battle Trap',
    'Blackjack',
    'Ping Pong',
    'Tower Blocks',
    'Assets Gallery',
    'Tic Tac Toe',
    'Ocean Rings',
    'Maze',
    'School Run'
]

export default function GameInfoModal({
    show,
    setShow,
    credits
}) {

    const [showModal, setShowModal] = useState(true)

    const [lightboxData, setLightboxData] = useState(null)

    // const userReduxState = useSelector((state) => state.auth.user_details);

    const [showVideo, setShowVideo] = useState()

    const { games } = useGames();

    useEffect(() => {

        if (!show.item) {
            setShow({
                ...show,
                item: games.find(game_obj => game_obj.name == show.game)
            })
        }

    }, [])

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
                    <Modal.Title>Game Info</Modal.Title>
                </Modal.Header>

                <Modal.Body className="flex-column p-0">

                    {/* {!registeredGames.includes(show.game) &&
                        <IsDev>
                            <div className="p-3">

                                {userReduxState?.roles?.isDev &&
                                    <div className="bg-light border p-1">
                                        Global game info modal does not have this game registered.
                                    </div>
                                }

                            </div>
                        </IsDev>
                    } */}

                    <div className="p-3">

                        <div className="fw-bold mb-2">
                            {show.game || 'No game property provided'}
                        </div>

                        <div className="">
                            {show?.item?.short_description}
                        </div>

                    </div>

                    <hr />

                    {show?.item?.welcome &&
                        <div className="p-3 py-2 border-bottom">

                            <b>Welcome to {show?.item?.name}</b>
                            <p className='small mb-2'>
                                {show?.item?.welcome?.preview_text}
                            </p>

                            <div className="ratio ratio-16x9">
                                <img src={show?.item?.welcome?.preview_gif} alt="" />
                            </div>

                        </div>
                    }

                    <hr />

                    {show.game == 'Four Frogs' &&
                        <div>
                            <div className='p-0'>

                                <div className='rules-media-wrap ratio ratio-21x9'>
                                    <img
                                        src="https://media.tenor.com/9KDFoTKyOioAAAAC/big-city-greens-bcg.gif"
                                        alt=""
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>

                            </div>

                            <div className='p-3 py-3' style={{ position: 'relative' }}>
                                <b>Welcome to Four Frogs</b>
                                <p className='small mb-0'>
                                    Four player capture the flag game. Each player gets three bugs to start, if you lose all your bugs and you are eliminated. You can cross into other frogs zones to take their bugs but if they touch you while in their zone they send you back to your zone and stun you for a short period. Random powerups spawn at certain times that can change certain aspects of the game.
                                </p>
                            </div>

                            <hr />

                            <div className="p-3 py-1">
                                <b>Controls</b>
                                <div className='ratio ratio-16x9 bg-white'>
                                    <div className="w-100 h-100">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_CDN}games/Four%20Frogs/controls.png`}
                                            alt=""
                                            fill
                                            className="bg-white"
                                            style={{
                                                objectFit: 'contain',
                                                maxWidth: '300px'
                                            }}
                                        // fill={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <div className="p-3 py-1">
                                <b>Powerups</b>
                                <div className='powerups-wrap mt-2'>
                                    {/* {powerups.map((powerup, i) => {
                                        return (
                                            <div key={powerup.title} className='d-flex mb-2'>
                                                <div className='ratio ratio-1x1 bg-dark' style={{ position: 'relative', width: '50px', height: '50px' }}>
                                                    <img
                                                        src={powerup.image}
                                                        alt=""
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div className='ms-2'>
                                                    <div>{powerup.title}</div>
                                                    <div className='small'>{powerup.description}</div>
                                                </div>
                                            </div>
                                        )
                                    })} */}
                                </div>
                            </div>

                            <hr />

                            <div className="p-3 py-1">
                                <b>Achievements</b>
                                <div className='powerups-wrap mt-2'>
                                    {[
                                        {
                                            title: 'Become a Four Frog',
                                            description: 'Play a game of Four Frogs.',
                                            image: `${process.env.NEXT_PUBLIC_CDN}games/Four%20Frogs/thumb-icon.png`
                                        },
                                        {
                                            title: 'Bug Thief',
                                            description: 'Pickup an enemies bug.',
                                            image: `${process.env.NEXT_PUBLIC_CDN}games/Four%20Frogs/Bugs/bug-2.png`
                                        },
                                        {
                                            title: 'Mutate',
                                            description: 'Collect a powerup...',
                                            image: `${process.env.NEXT_PUBLIC_CDN}games/Four%20Frogs/Powerups/powerup.jpg`
                                        }
                                    ].map((powerup, i) => {
                                        return (
                                            <div key={powerup.title} className='d-flex mb-2'>
                                                <div className='ratio ratio-1x1' style={{ position: 'relative', width: '50px', height: '50px' }}>
                                                    {powerup.image && <img
                                                        src={powerup.image}
                                                        alt=""
                                                        style={{ objectFit: 'cover' }}
                                                    />}
                                                </div>
                                                <div className='ms-2'>
                                                    <div>{powerup.title}</div>
                                                    <div className='small'>{powerup.description}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <hr />

                            <div className="p-3 py-1 mb-3">

                                <b>Credits</b>

                                <div className="d-flex mb-1">
                                    <div className="me-1">Developer - </div>
                                    {/* <ViewUserModal
                                        user_id={"5e90cc96579a17440c5d7d52"}
                                        dangerousPopulate
                                    /> */}
                                </div>

                                <div className="d-flex mb-1">
                                    <div className="me-1">Publisher - </div>
                                    <div>Articles Media</div>
                                </div>

                                <div className="d-flex">
                                    <div className="me-1">Game and Icon Assets - </div>
                                    <a target="_blank" rel="noreferrer" href="https://www.freepik.com/icon/frog_2683040#fromView=search&term=frog&page=1&position=4">Freepik</a>
                                </div>

                                <div className="d-flex">
                                    <div className="me-1">Orange Flower - </div>
                                    <a target="_blank" rel="noreferrer" href="https://poly.pizza/m/fg5U0dl1Sd3">Poly by Google</a>
                                </div>

                                <div className="d-flex">
                                    <div className="me-1">Sunflower - </div>
                                    <a target="_blank" rel="noreferrer" href="https://poly.pizza/m/ce4GXw3VYE5">Poly by Google</a>
                                </div>

                            </div>
                        </div>
                    }

                    {show.game == 'Plinko' &&
                        <div className="p-3 py-1">

                            <div className="mb-3">
                                <b>Credits</b>
                            </div>

                            <div className="d-flex align-items-center mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    {/* <ViewUserModal
                                        user_id={"5e90cc96579a17440c5d7d52"}
                                        dangerousPopulate
                                    /> */}
                                    <div className="">Developer</div>
                                </div>

                            </div>

                            <div className="d-flex align-items-center mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div className="">
                                    <div className="fw-bold">Articles Media</div>
                                    <div className="">Publisher</div>
                                </div>

                            </div>

                            <div className="d-flex mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    <a href="https://market.pmnd.rs/" target='_blank' rel="noreferrer" className="fw-bold">PMND Market</a>
                                    <div className="small text-muted">Used for</div>
                                    <ul>
                                        <li>Beach Ball</li>
                                        <li>Umbrella</li>
                                    </ul>
                                </div>

                                <div>
                                    <a href="https://poly.pizza/m/4KMMRO9_b73" target='_blank' rel="noreferrer" className="fw-bold">poly.pizza</a>
                                    <div className="small text-muted">Used for</div>
                                    <ul>
                                        <li>Boat</li>
                                    </ul>
                                </div>

                            </div>

                            <div className="d-flex mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>

                                    <a href="https://sketchfab.com/Cyanopsya" target='_blank' rel="noreferrer" className="fw-bold">
                                        sketchfab.com/Cyanopsya
                                    </a>

                                    <div className="small text-muted">Used for</div>

                                    <ul>
                                        <li>Bleacher</li>
                                    </ul>

                                </div>

                            </div>

                            <div className="d-flex mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    <a href="https://market.pmnd.rs/" target='_blank' rel="noreferrer" className="fw-bold">Toontown</a>
                                    <div className="small text-muted">Used for</div>
                                    <ul>
                                        <li>Background Music</li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                    }

                    {/* {show.game == 'Eager Eagle' &&
                        <div className="p-3">

                            <div className="">
                                <b>Soon...</b>
                            </div>

                        </div>
                    } */}

                    {/* {show.game == 'Tower Blocks' &&
                        <div className="p-3">

                            <div className="">
                                <b>Soon...</b>
                            </div>

                        </div>
                    } */}

                    {show.game == 'Battle Trap' &&
                        <div className="p-3 py-1">

                            <div className="mb-3">
                                <b>Credits</b>
                            </div>

                            <div className="d-flex align-items-center mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    {/* <ViewUserModal
                                        user_id={"5e90cc96579a17440c5d7d52"}
                                        dangerousPopulate
                                    /> */}
                                    <div className="">Developer</div>
                                </div>

                            </div>

                            <div className="d-flex align-items-center mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div className="">
                                    <div className="fw-bold">Articles Media</div>
                                    <div className="">Publisher</div>
                                </div>

                            </div>

                            <div className="d-flex mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    <a href="https://sketchfab.com/3d-models/low-poly-chopper-aec69c979166446eb2c8e1503f570d26" target='_blank' rel="noreferrer" className="fw-bold">sketchfab.com/ArtyomOganesyan</a>
                                    <div className="small text-muted">Used for</div>
                                    <ul>
                                        <li>Low Poly Chopper</li>
                                    </ul>
                                </div>

                            </div>

                            <div className="d-flex mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    <a href="https://sketchfab.com/supakorn.pim" target='_blank' rel="noreferrer" className="fw-bold">sketchfab.com/supakorn.pim</a>
                                    <div className="small text-muted">Used for</div>
                                    <ul>
                                        <li>Low Poly Scooter</li>
                                    </ul>
                                </div>

                            </div>

                            <div className="d-flex mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    <a href="https://sketchfab.com/1-3D.com" target='_blank' rel="noreferrer" className="fw-bold">sketchfab.com/1-3D.com</a>
                                    <div className="small text-muted">Used for</div>
                                    <ul>
                                        <li>Low Poly Tricycle</li>
                                    </ul>
                                </div>

                            </div>

                            <div className="d-flex mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    <a href="https://sketchfab.com/BeastSri" target='_blank' rel="noreferrer" className="fw-bold">sketchfab.com/BeastSri</a>
                                    <div className="small text-muted">Used for</div>
                                    <ul>
                                        <li>Low Poly Unicycle</li>
                                    </ul>
                                </div>

                            </div>

                            <div className="d-flex mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    <a href="https://sketchfab.com/SebastianScaini" target='_blank' rel="noreferrer" className="fw-bold">sketchfab.com/SebastianScaini</a>
                                    <div className="small text-muted">Used for</div>
                                    <ul>
                                        <li>Toilet Tricycle</li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                    }

                    {show.game == 'USA Tycoon' &&
                        <div className="p-3 py-1">

                            <div className="mb-3">
                                <b>Credits</b>
                            </div>

                            <div className="d-flex align-items-center mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    {/* <ViewUserModal
                                        user_id={"5e90cc96579a17440c5d7d52"}
                                        dangerousPopulate
                                    /> */}
                                    <div className="">Developer</div>
                                </div>

                            </div>

                            <div className="d-flex align-items-center mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div className="">
                                    <div className="fw-bold">Articles Media</div>
                                    <div className="">Publisher</div>
                                </div>

                            </div>

                            <div className="d-flex mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    <a href="https://sketchfab.com/3d-models/shopping-cart-b96f896453b240ae804d0399f1faf027" target='_blank' rel="noreferrer" className="fw-bold">https://sketchfab.com/adrianxy</a>
                                    <div className="small text-muted">Used for</div>
                                    <ul>
                                        <li>Shopping Cart</li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                    }

                    {show.game == 'Carousel of Progress' &&
                        <div className="p-3 py-1">

                            <div className="mb-3">
                                <b>Credits</b>
                            </div>

                            <div className="d-flex align-items-center mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    {/* <ViewUserModal
                                        user_id={"5e90cc96579a17440c5d7d52"}
                                        dangerousPopulate
                                    /> */}
                                    <div className="">Developer</div>
                                </div>

                            </div>

                            <div className="d-flex align-items-center mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div className="">
                                    <div className="fw-bold">Articles Media</div>
                                    <div className="">Publisher</div>
                                </div>

                            </div>

                            <div className="d-flex mb-3">

                                <div className="me-3">
                                    <i className="fad fa-link fa-2x me-0"></i>
                                </div>

                                <div>
                                    <a href="https://sketchfab.com/3d-models/low-poly-stadiumsports-arena-seats-6bbe4c85d2a4489dbe5918831be5d886" target='_blank' rel="noreferrer" className="fw-bold">sketchfab.com/anDDDres</a>
                                    <div className="small text-muted">Used for</div>
                                    <ul>
                                        <li>Seat</li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                    }

                    {show.game == 'Race Game' &&
                        <>
                            <div className='card-body p-0 mb-2'>
                                <div className='rules-media-wrap ratio ratio-21x9'>
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_CDN}games/Race Game/preview.png`}
                                        alt=""
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>

                            <div className='card-body p-0 mb-4'>

                                <div className="p-3 py-1">
                                    <b>Welcome to Race Game</b>
                                    <p className='small mb-2'>
                                        Get to the other side of the track before the other players. Select a number of spaces to move, if no other player picks that amount to move then you advance. Any players that select the same amount of moves does not advance.
                                    </p>
                                </div>

                                <hr />

                                <div className="p-3 py-1">
                                    <b>Objective</b>
                                    <p className='small mb-0'>
                                        ...
                                    </p>
                                </div>

                                <hr />

                                <div className="p-3 py-1">
                                    <b>Picking</b>
                                    <p className='small mb-0'>
                                        ...
                                    </p>
                                </div>

                                <hr />

                                <div className="p-3 py-1">
                                    <b>Movement</b>
                                    <p className='small mb-0'>
                                        ...
                                    </p>
                                </div>

                                <hr />

                                <div className="p-3 py-1">
                                    <b>Random Cards</b>
                                    <p className='small mb-0'>
                                        ...
                                    </p>
                                </div>

                                <hr />

                                <div className="p-3 py-1">
                                    <b>Achievements</b>
                                    <div className='powerups-wrap mt-2'>
                                        {[
                                            {
                                                title: 'Racer',
                                                description: 'Play a Race Game.',
                                                // image: ImageAchievementFrog.src
                                            },
                                            {
                                                title: 'Master Racer',
                                                description: 'Win a Race Game.',
                                                // image: ImageAchievementFrog.src
                                            },
                                            {
                                                title: 'Mystery Racer',
                                                description: 'Land on a mystery spot in Race Game.',
                                                // image: ImageAchievementFrog.src
                                            },
                                        ].map((powerup, i) => {
                                            return (
                                                <div key={powerup.title} className='d-flex mb-2'>

                                                    <div
                                                        className='ratio ratio-1x1 bg-dark'
                                                        style={{ position: 'relative', width: '50px', height: '50px' }}
                                                    >
                                                        {powerup.image && <img
                                                            src={powerup.image}
                                                            alt=""
                                                            style={{ objectFit: 'cover' }}
                                                        />}
                                                    </div>

                                                    <div className='ms-2'>
                                                        <div>{powerup.title}</div>
                                                        <div className='small'>{powerup.description}</div>
                                                    </div>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <hr />

                                <div className="p-3 py-1">

                                    <div className="mb-3">
                                        <b>Credits</b>
                                    </div>

                                    <div className="d-flex align-items-center mb-3">

                                        <div className="me-3">
                                            <i className="fad fa-link fa-2x me-0"></i>
                                        </div>

                                        <div>
                                            {/* <ViewUserModal
                                                user_id={"5e90cc96579a17440c5d7d52"}
                                                dangerousPopulate
                                            /> */}
                                            <div className="">Developer</div>
                                        </div>

                                    </div>

                                    <div className="d-flex align-items-center mb-3">

                                        <div className="me-3">
                                            <i className="fad fa-link fa-2x me-0"></i>
                                        </div>

                                        <div className="">
                                            <div className="fw-bold">Articles Media</div>
                                            <div className="">Publisher</div>
                                        </div>

                                    </div>

                                    {/* <div className="d-flex">
                                        <div className="me-1">Game and Icon Assets - </div>
                                        <a href="https://www.freepik.com/icon/frog_2683040#fromView=search&term=frog&page=1&position=4">Freepik</a>
                                    </div> */}

                                    <div className="d-flex mb-3">

                                        <div className="me-3">
                                            <i className="fad fa-link fa-2x me-0"></i>
                                        </div>

                                        <div>
                                            <a href="https://market.pmnd.rs/" target='_blank' rel="noreferrer" className="fw-bold">PMND Market</a>
                                            <div className="small text-muted">Used for</div>
                                            <ul>
                                                <li>Duck</li>
                                                <li>Bear</li>
                                                <li>Witch</li>
                                                <li>Dog</li>
                                                <li>Wind Turbine</li>
                                                <li>Boat</li>
                                            </ul>
                                        </div>

                                    </div>

                                    <div className="d-flex mb-3">

                                        <div className="me-3">
                                            <i className="fad fa-link fa-2x me-0"></i>
                                        </div>

                                        <div>

                                            <a href="https://sketchfab.com/Cyanopsya" target='_blank' rel="noreferrer" className="fw-bold">
                                                sketchfab.com/Cyanopsya
                                            </a>

                                            <div className="small text-muted">Used for</div>

                                            <ul>
                                                <li>Bleacher</li>
                                            </ul>

                                        </div>

                                    </div>

                                    <div className="d-flex mb-3">

                                        <div className="me-3">
                                            <i className="fad fa-link fa-2x me-0"></i>
                                        </div>

                                        <div>
                                            <a href="https://market.pmnd.rs/" target='_blank' rel="noreferrer" className="fw-bold">Toontown</a>
                                            <div className="small text-muted">Used for</div>
                                            <ul>
                                                <li>Background Music</li>
                                            </ul>
                                        </div>

                                    </div>

                                </div>

                                <hr />

                                <div className="p-3 py-1">

                                    <b>Inspiration</b>
                                    <p className='small mb-2'>
                                        Inspiration for this game came from <a className="text-decoration-underline" target="_blank" rel="noreferrer" href="https://toontown.fandom.com/wiki/Race_Game">Toontown's Trolly Minigame: Race Game</a>
                                    </p>

                                    <div className="inspiration-video-wrapper">

                                        {!showVideo &&
                                            <div
                                                className="play-button"
                                                onClick={() => {
                                                    setShowVideo(true)
                                                }}
                                            >
                                                <div><i style={{ color: 'red' }} className="fab fa-youtube fa-4x me-0"></i></div>
                                                <div className="label">Play Video</div>
                                            </div>
                                        }

                                        <div style={{ position: 'relative' }} className="ratio ratio-16x9 bg-dark">

                                            {showVideo ?
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src="https://www.youtube.com/embed/P0udZ_BAVH4?autoplay=1&mute=1"
                                                    title="YouTube video player"
                                                    // frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                ></iframe>
                                                :
                                                <img
                                                    onClick={() => {
                                                        setShowVideo(true)
                                                    }}
                                                    src={`${process.env.NEXT_PUBLIC_CDN}games/Race Game/inspo-animation.webp`}
                                                    fill
                                                    alt=""
                                                    style={{ objectFit: 'contain', maxWidth: '100%' }}
                                                    loading="lazy"
                                                />
                                            }

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </>
                    }

                    {show?.item?.inspiration &&
                        <div className="p-3 border-bottom">
                            <div className="mb-2 fw-bold">Inspiration</div>
                            <div>{show?.item?.inspiration?.text}</div>
                            {show?.item?.inspiration?.video &&
                                <div className="inspiration-video-wrapper">

                                    {!showVideo &&
                                        <div
                                            className="play-button"
                                            onClick={() => {
                                                setShowVideo(true)
                                            }}
                                        >
                                            <div><i style={{ color: 'red' }} className="fab fa-youtube fa-4x me-0"></i></div>
                                            <div className="label">Play Video</div>
                                        </div>
                                    }

                                    <div style={{ position: 'relative' }} className="ratio ratio-16x9 bg-dark">

                                        {showVideo ?
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${show?.item?.inspiration?.video}?autoplay=1&mute=1`}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            ></iframe>
                                            :
                                            <>
                                                {/* <img
                                                    onClick={() => {
                                                        setShowVideo(true)
                                                    }}
                                                    src={`${process.env.NEXT_PUBLIC_CDN}games/Race Game/inspo-animation.webp`}
                                                    fill
                                                    alt=""
                                                    style={{ objectFit: 'contain', maxWidth: '100%' }}
                                                    loading="lazy"
                                                /> */}
                                            </>
                                        }

                                    </div>

                                </div>
                            }
                        </div>
                    }

                    {show?.item?.attributions &&
                        <div className="p-3">
                            <div className="mb-2 fw-bold">Attributions</div>
                            <div>{show?.item?.attributions}</div>
                        </div>
                    }

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
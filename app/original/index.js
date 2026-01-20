"use client"
import { useState, useEffect } from 'react';

import Link from 'next/link'

// import { useSelector } from 'react-redux'

import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal';

// import ROUTES from '@/components/constants/routes';

// import games from '@/components/constants/games';

import ArticlesButton from '@/components/UI/Button';
import classNames from 'classnames';
import { useHotkeys } from 'react-hotkeys-hook';
// import ArticlesAlert from '@/components/Articles/ArticlesAlert';
import GameItem from './GameItem';
import useGames from '@/components/hooks/useGames';
import { Box, CircularProgress } from '@mui/material';

export default function GamesPage(props) {

    const {
        games,
        isLoading: isLoadingGames,
        isRemote
    } = useGames();

    const ROUTES = {
        PRESS: '/press'
    };

    // const userReduxState = useSelector((state) => state.auth.user_details);
    const userReduxState = null

    // const { session, status } = useSession()

    const [toontownImages, setToontownImages] = useState(false);

    const [playerFilter, setPlayerFilter] = useState('All')

    // Save last place
    const [availabilityFilter, setAvailabilityFilter] = useState('Available')

    // const [modalShow, setModalShow] = useState(false);
    const [activeModalGame, setActiveModalGame] = useState(null);

    const [search, setSearch] = useState('');

    const [isMounted, setIsMounted] = useState(false)

    useHotkeys(["t"], () => {
        setToontownImages(prev => !prev)
    })

    useEffect(() => {

        if (localStorage.getItem('games:availabilityFilter')) {
            setAvailabilityFilter(localStorage.getItem('games:availabilityFilter'))
        }

        setIsMounted(true)

    }, []);

    useEffect(() => {

        if (isMounted) localStorage.setItem('games:availabilityFilter', availabilityFilter)

    }, [availabilityFilter, isMounted])

    return (
        <div className="games-page">

            {activeModalGame &&
                <Modal
                    show={activeModalGame}
                    className="articles-modal"
                    centered
                    onHide={() => {
                        // setModalShow(false)
                        setActiveModalGame(null)
                    }}
                >

                    <Modal.Header className="py-1" closeButton>
                        <Modal.Title>Game Info</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <h2 className='mb-2'>{activeModalGame.name}</h2>

                        <div className='lh-sm small mb-1'>
                            {activeModalGame.short_description}
                        </div>

                    </Modal.Body>

                    <Modal.Footer className='d-flex justify-content-between align-items-center'>

                        <div>

                        </div>

                        <ArticlesButton
                            variant="secondary"
                            onClick={() => {
                                // setModalShow(false)
                                setActiveModalGame(null)
                            }}
                        >
                            Close
                        </ArticlesButton>

                    </Modal.Footer>

                </Modal>
            }

            {/* <div className="background-overlay"></div> */}

            <div className="sub-header">

                <div className="background-overlay"></div>

                <div className="background">

                    <img
                        src={`${process.env.NEXT_PUBLIC_CDN}games/synth.jpg`}
                        alt=''
                    >
                    </img>

                </div>

                <div className='text'>
                    <h1 className="">Games - {games?.filter(obj => !obj.preview)?.length || 0}</h1>
                    <p className='mb-0'>Play some games with your friends or other users.</p>
                </div>

            </div>

            <div className='filters-and-sorts-bar'>

                <div className="container d-flex justify-content-between">

                    <span className="d-flex">

                        {/* Player Type */}
                        <Dropdown className="dropdown-articles" drop={'down'}>

                            <Dropdown.Toggle
                                variant="articles align-items-center d-flex "
                                disabled={search !== ''}
                            >

                                <div>

                                    <i className="fad fa-filter fa-lg me-2"></i>
                                    {/* <i className="fad fa-sort-shapes-up fa-lg me-2"></i> */}

                                    <span className='small me-2'>Type</span>

                                    <span className='badge bg-dark shadow-articles me-1 d-none d-lg-inline-block'>
                                        {playerFilter}
                                    </span>

                                </div>

                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-articles">

                                <div className='small px-2 py-0 mb-0'>Player Type</div>

                                <Dropdown.Divider className="py-0 my-1" />

                                {['All', 'Single Player', 'Multiplayer'].map(item =>
                                    <Dropdown.Item
                                        key={item}
                                        className={` ${playerFilter == item && 'active'}`}
                                        onClick={() => {

                                            setPlayerFilter(item)

                                        }}
                                    >

                                        <span>{item}</span>

                                    </Dropdown.Item>
                                )}

                            </Dropdown.Menu>

                        </Dropdown>

                        {/* Availability Type */}
                        <Dropdown className="dropdown-articles" drop={'down'}>

                            <Dropdown.Toggle
                                variant="articles align-items-center d-flex "
                                disabled={search !== ''}
                            >

                                <div>

                                    {/* <i className="fad fa-filter"></i> */}
                                    <i className="fad fa-sort-shapes-up fa-lg me-2"></i>

                                    <span className='small me-2'>Status</span>

                                    <span className='badge bg-dark shadow-articles me-1 d-none d-lg-inline-block'>
                                        {availabilityFilter}
                                    </span>

                                </div>

                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-articles">

                                <div className='small px-2 py-0 mb-0'>Availability Status</div>

                                <Dropdown.Divider className="py-0 my-1" />

                                {['All', 'Available', 'Upcoming'].map(item =>
                                    <Dropdown.Item
                                        key={item}
                                        className={` ${availabilityFilter == item && 'active'}`}
                                        onClick={() => {

                                            setAvailabilityFilter(item)

                                        }}
                                    >

                                        <span>{item}</span>

                                    </Dropdown.Item>
                                )}

                                {userReduxState?.roles?.isDev && <>
                                    <hr />

                                    <Dropdown.Item
                                        key={"Developer Only"}
                                        className={` ${availabilityFilter == "Developer Only" && 'active'}`}
                                        onClick={() => {

                                            setAvailabilityFilter("Developer Only")

                                        }}
                                    >

                                        <span>Not Public</span>

                                    </Dropdown.Item>
                                </>}

                            </Dropdown.Menu>

                        </Dropdown>

                    </span>

                    <span className='d-flex'>

                        <input
                            type="text"
                            className="form-control form-control-sm rounded-0"
                            placeholder="Search games..."
                            value={search}
                            id='games-search'
                            onChange={e => setSearch(e.target.value)}
                            style={{
                                maxWidth: '160px',
                                fontSize: '0.75rem!important'
                            }}
                        />

                        <ArticlesButton
                            className=""
                            onClick={() => {
                                setSearch('')
                            }}
                        >
                            <i className="fad fa-times me-0"></i>
                        </ArticlesButton>

                    </span>

                </div>

            </div>

            <div className='games-section'>

                {/* <ArticlesAlert
                    text="We are separating each game into its own repo and updating them to work with the new Articles Media platform. Some games may currently be unavailable, migration will be completed by 2026!"
                    className="mb-3"
                >

                </ArticlesAlert> */}

                {
                    isLoadingGames
                    // true
                    &&
                    <div className={`alert ${isRemote ? 'alert-danger' : 'alert-warning'} d-flex justify-content-center align-items-center my-3`}>
                        <CircularProgress />
                        <Box sx={{ ml: 2 }}>Loading games...</Box>
                    </div>
                }

                <div className="games mb-5">

                    {games
                        ?.filter(item => {

                            // Override other filters if a search
                            if (search !== '') {
                                return item
                            }

                            if (playerFilter == 'All') {
                                return item
                            }

                            if (playerFilter == 'Multiplayer') {
                                return item.multiplayer
                            }

                            if (playerFilter == 'Single Player') {
                                return item.single_player
                            }

                        })
                        ?.filter(item => {

                            // Override other filters if a search
                            if (search !== '') {
                                return item
                            }

                            if (availabilityFilter == 'All') {
                                return item && item.public !== false
                            }

                            if (availabilityFilter == 'Available') {
                                return !item.preview && item.public !== false
                            }

                            if (availabilityFilter == 'Upcoming') {
                                return item.preview && item.public !== false
                            }

                            if (availabilityFilter == 'Developer Only') {
                                return item.public === false
                            }

                        })
                        ?.filter(item => {

                            // Override other filters if a search
                            if (search == '') {
                                return item
                            }

                            if (search !== '') {
                                return item.name.toLowerCase().includes(search.toLowerCase())
                            }

                        })
                        ?.map(item => {

                            return (
                                <GameItem
                                    key={item.name}
                                    item={item}
                                    toontownImages={toontownImages}
                                />
                            );
                        })
                    }

                </div>

                {availabilityFilter == 'Developer Only' &&
                    <div className="card card-extra mx-auto w-100" style={{ maxWidth: '400px' }}>

                        <div className="card-header rounded-0 d-flex justify-content-between align-items-center py-2">
                            <h5 className="mb-0">Toontown Preservation Status!</h5>
                        </div>

                        <div className="card-body py-2 small d-flex flex-column">

                            <div className="">Progress on converting Toontown trolley games to web games. Eventually to be used in AMCOT MMO in a similar gameplay mechanic of getting in game currency.</div>

                            <hr />

                            <a
                                href="https://toontown.fandom.com/wiki/Trolley#Trolley_Games"
                                target='_blank'
                                className='text-decoration-underline'
                            >
                                Games List Link
                            </a>

                            <hr />

                            <ArticlesButton
                                active={toontownImages}
                                onClick={() => {
                                    setToontownImages(prev => !prev)
                                }}
                            >
                                Show Toontown Thumbnails (T key)
                            </ArticlesButton>

                            <hr />

                            {[
                                {
                                    toontown_name: "Race Game",
                                    articles_name: "Race Game",
                                    status: "Complete"
                                },
                                {
                                    toontown_name: "Ring Game",
                                    articles_name: "Ocean Rings",
                                    status: "Complete"
                                },
                                {
                                    toontown_name: "Jungle Vines",
                                    articles_name: "Jungle Vines",
                                    status: "In Progress"
                                },
                                {
                                    toontown_name: "Cannon Game",
                                    articles_name: "Cannon",
                                    status: "In Progress"
                                },
                                {
                                    toontown_name: "Toon Escape",
                                    articles_name: "Platformer Escape",
                                    status: "In Progress"
                                },
                                {
                                    toontown_name: "Toon Slingshot",
                                    articles_name: "Slingshot",
                                    status: "In Progress"
                                },
                                {
                                    toontown_name: "Tug of War",
                                    articles_name: "Tug of War",
                                    status: "In Progress"
                                },
                                {
                                    toontown_name: "Ice Slide",
                                    articles_name: "Ice Slide",
                                    status: "In Progress"
                                },
                                {
                                    toontown_name: "Match Minnie",
                                    articles_name: "Move Match",
                                    status: "In Progress"
                                },
                                {
                                    toontown_name: "Toon Tag",
                                    articles_name: "Tag",
                                    status: "In Progress"
                                },
                                {
                                    toontown_name: "Maze Game",
                                    articles_name: "Maze",
                                    status: "In Progress"
                                },
                                {
                                    toontown_name: "Treasure Dive",
                                    articles_name: "Treasure Dive",
                                    status: "In Progress"
                                },
                                {
                                    toontown_name: "Toon Memory Game",
                                    articles_name: "Memory Game",
                                    status: "In Progress"
                                },
                                {
                                    toontown_name: "Catching Game",
                                    articles_name: "Catching Game",
                                    status: "In Progress"
                                },
                                {
                                    toontown_name: "Cog Thief",
                                    articles_name: "Stop the Thieves",
                                    status: "In Progress"
                                }
                            ].map(game => {
                                return (
                                    <div
                                        key={game.articles_name}
                                        className='border p-1'
                                    >
                                        <div>Toontown Name: {game.toontown_name}</div>
                                        <div>Articles Name: {game.articles_name}</div>
                                        <div>
                                            <span>Status: </span>
                                            <span className={classNames(
                                                "badge",
                                                {
                                                    "bg-success text-white": game.status == "Complete",
                                                    "bg-articles text-dark": game.status == "In Progress",
                                                    "bg-warning text-dark": game.status == "Not Started",
                                                    "bg-danger text-white": game.status == "Never"
                                                }
                                            )}>
                                                {game.status}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                    </div>
                }

                <div className='d-flex justify-content-center'>

                    {/* <div className="card card-extra mx-2 w-100" style={{ maxWidth: '400px' }}>

                        <div className="card-header rounded-0 d-flex justify-content-between align-items-center py-2">
                            <h5 className="mb-0">Build a Web Game!</h5>
                        </div>

                        <div className="card-body py-2 small d-flex flex-column">

                            <span className="mb-2">Using our game engine, AMCOT Spaces, build your own game that can be published on our platform.</span>

                            <ArticlesButton
                                onClick={() => {
                                    setActiveModalGame({
                                        name: 'Publish With Us',
                                        short_description:
                                            <div>

                                                <div className='mb-3'>
                                                    If you used the AMCOT Spaces engine to build a game and you want and feel it should have its own dedicated spot here then get in touch. Your space will be viewable in the AMCOT Spaces game placeholder but if it is developed enough to justify it&apos;s own spot then we would love to feature it.
                                                </div>

                                                <Link
                                                    href={ROUTES.PRESS}
                                                >
                                                    <ArticlesButton small>Contact Us</ArticlesButton>
                                                </Link>

                                            </div>
                                    })
                                }}
                                className="d-block mt-auto"
                                small
                            >
                                Learn More
                            </ArticlesButton>

                        </div>

                    </div> */}

                    <div className="card card-extra mx-2 w-100" style={{ maxWidth: '400px' }}>

                        <div className="card-header rounded-0 d-flex justify-content-between align-items-center py-2">
                            <h5 className="mb-0">Publish Your Web Game!</h5>
                        </div>

                        <div className="card-body py-2 small d-flex flex-column">

                            <span className="mb-2">Publish your game on Articles Media, easy to use multiplayer API and at cost hosting fees.</span>

                            <ArticlesButton
                                onClick={() => {
                                    // setModalShow(true)
                                    setActiveModalGame({
                                        name: 'Publish With Us',
                                        short_description:
                                            <div>

                                                <div className='mb-3'>
                                                    If you have a WebGL/WebGPU game that you have made and would like to publish then reach out! We can host your game for you and provide an API to handle multiplayer and scoreboards.
                                                </div>

                                                <Link
                                                    href={ROUTES.PRESS}
                                                >
                                                    <ArticlesButton small>Contact Us</ArticlesButton>
                                                </Link>

                                            </div>
                                    })
                                }}
                                className="d-block mt-auto"
                                small
                            >
                                Learn More
                            </ArticlesButton>

                        </div>

                    </div>

                    {/* <div className="card card-extra mx-auto" style={{ maxWidth: '400px' }}>
    
                        <div className="card-header d-flex justify-content-between align-items-center py-2">
                            <h5 className="mb-0">Learn How To Program!</h5>
                        </div>
    
                        <div className="card-body py-2 small d-flex flex-column">
    
                            <span className="mb-3">Access to all of our games source code is available on GitHub.</span>
    
                            <ArticlesButton onClick={() => setModalShow(true) + setActiveModalGame('Publish With Us')} small className="d-block mt-auto">Learn More</ArticlesButton>
    
                        </div>
    
                    </div> */}

                </div>

            </div>

        </div>
    );
}


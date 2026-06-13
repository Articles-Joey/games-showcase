"use client"
import { useState, useEffect } from 'react';

import Link from 'next/link'

import { sendGAEvent } from "@next/third-parties/google";

import ArticlesButton from '@/components/UI/Button';
import classNames from 'classnames';
import { useHotkeys } from 'react-hotkeys-hook';
import GameItem from './GameItem';
import useGames from '@/components/hooks/useGames';
import { Box, CircularProgress } from '@mui/material';
import FilterDropdowns from '@/components/UI/FilterDropdowns';
import { useFilterStore } from '@/components/hooks/useFilterStore';
import useAllGames from '@/components/hooks/useAllGames';
import OnlinePlayerCount from '@/components/UI/OnlinePlayerCount';
import PublishWithUsModal from '@/components/UI/PublishWithUsModal';

export default function GamesPage(props) {

    const {
        games,
        isLoading: isLoadingGames,
        isRemote
    } = useGames();

    const {
        games: allGames,
        filteredGames,
    } = useAllGames();

    const [toontownImages, setToontownImages] = useState(false);

    const [modalPublishWithUs, setModalPublishWithUs] = useState(null);

    const search = useFilterStore((state) => state.search);
    const setSearch = useFilterStore((state) => state.setSearch);

    useHotkeys(["t"], () => {
        setToontownImages(prev => !prev)
    })

    return (
        <div className="games-page">

            {modalPublishWithUs &&
                <PublishWithUsModal
                    show={modalPublishWithUs}
                    setShow={setModalPublishWithUs}
                />
            }

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
                    <OnlinePlayerCount />

                    <Link href="/" className="text-white">Return to landing</Link>
                </div>

            </div>

            <div className='filters-and-sorts-bar'>

                <div className="container d-flex justify-content-between">

                    <span className="d-flex">

                        <FilterDropdowns />

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

                    {
                        filteredGames
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

                <div className='d-flex justify-content-center'>

                    <div className="card card-extra mx-2 w-100" style={{ maxWidth: '400px' }}>

                        <div className="card-header rounded-0 d-flex justify-content-between align-items-center py-2">
                            <h5 className="mb-0">Publish your web game with us!</h5>
                        </div>

                        <div className="card-body py-2 small d-flex flex-column">

                            <span className="mb-2">Publish your React web game on Articles Media, easy to use multiplayer API and at cost hosting fees. We also provide three different NPM packages to help you get started.</span>

                            <ArticlesButton
                                onClick={() => {
                                    // setModalShow(true)
                                    setModalPublishWithUs(true)
                                    sendGAEvent('event', 'Clicked Publish With Us', { value: "" });
                                }}
                                className="d-block mt-auto"
                                small
                            >
                                <i className="fad fa-info-circle me-1 fa-lg"></i>
                                Learn More
                            </ArticlesButton>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}


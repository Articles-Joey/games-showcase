"use client"
import { useEffect, useContext, useState, useRef, useMemo } from 'react';

// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic'

import ArticlesButton from '@/components/UI/Button';

import useFullscreen from '@/components/hooks/useFullScreen';

// import useGames from '@/components/hooks/useGames';
import useAllGames from '@/components/hooks/useAllGames';
import { useStore } from '@/components/hooks/useStore';

import GameItem from '../original/GameItem';

import '@/styles/pages/original.scss';
import FilterDropdowns from '@/components/UI/FilterDropdowns';
import { useFilterStore } from '@/components/hooks/useFilterStore';

export default function PageContent() {

    // const { games, publicGames } = useGames();

    const {
        games: allGames,
        filteredGames,
    } = useAllGames();

    const search = useFilterStore((state) => state.search);
    const setSearch = useFilterStore((state) => state.setSearch);

    const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen();

    return (

        <div
            className={`games-showcase-wall-page ${isFullscreen && 'fullscreen'}`}
        // id="cannon-game-page"
        >

            <nav>
                <Link href="/" style={{
                    color: 'white',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    textShadow: '0px 0px 5px black'
                }}>
                    {/* Icon placeholder */}
                    <span>🎮</span>
                    <span>Games Showcase</span>
                    <span> - </span>
                    <span>{filteredGames?.length} games</span>
                </Link>

                <div className='d-flex'>

                    <FilterDropdowns />

                    <input
                        placeholder='Search games...'
                        value={search}
                        className='px-2'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <ArticlesButton
                        onClick={() => {
                            setSearch("");
                        }}
                    >
                        <i className='fad fa-times'></i>
                    </ArticlesButton>

                </div>

            </nav>

            <div
                className='grid'
                style={{

                }}
            >
                {filteredGames?.map((game, index) => (
                    // <GridItem
                    //     key={game.name}
                    //     game={game}
                    // />
                    <GameItem
                        key={game.name}
                        item={game}
                    // toontownImages={toontownImages}
                    />
                ))}
            </div>

        </div>
    );
}
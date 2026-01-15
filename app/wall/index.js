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

export default function PageContent() {

    // const { games, publicGames } = useGames();

    const {
        games: allGames,
        filteredGames,
    } = useAllGames();

    const search = useStore((state) => state.search);
    const setSearch = useStore((state) => state.setSearch);

    const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen();

    return (

        <div
            className={`games-showcase-wall-page ${isFullscreen && 'fullscreen'}`}
            // id="cannon-game-page"
        >

            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: '1rem',
                zIndex: 100,
                height: '50px',
                background: 'rgba(0, 0, 0, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
            }}>
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

                <div>
                    <input
                        placeholder='Search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

            </nav>

            <div
                className='grid'
                style={{
                    marginTop: '50px'
                }}
            >
                {filteredGames?.map((game, index) => (
                    <GridItem
                        key={game.name}
                        game={game}
                    />
                ))}
            </div>

        </div>
    );
}

function GridItem({
    game
}) {

    return (
        <div
            key={game.id}
            className='grid-item'
        >

            <div className='ratio ratio-1x1 mb-2'>
                <img src={game.image} alt={game.name} width={200} style={{ objectFit: 'cover' }} />
            </div>

            <div className='h5'>{game.name}</div>

            <div className='small mb-2'>
                {game.short_description?.length > 100
                    ? `${game.short_description.substring(0, 90)}...`
                    : game.short_description}
            </div>

            <div className='mt-auto'>
                <a href={game.url} target="_blank" rel="noopener noreferrer">
                    <ArticlesButton>
                        <i className='fad fa-info-circle'></i>
                        Details
                    </ArticlesButton>
                </a>
                <a href={game.url} target="_blank" rel="noopener noreferrer">
                    <ArticlesButton>
                        <i className='fad fa-play'></i>
                        Play
                    </ArticlesButton>
                </a>
            </div>

        </div>
    );
}
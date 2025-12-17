"use client"
import { useEffect, useContext, useState, useRef, useMemo } from 'react';

// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic'

import ArticlesButton from '@/components/UI/Button';

import useFullscreen from '@/components/hooks/useFullScreen';

import useGames from '@/components/hooks/useGames';

export default function PageContent() {

    const { games, publicGames } = useGames();

    const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen();

    return (

        <div
            className={`games-showcase-wall-page ${isFullscreen && 'fullscreen'}`}
            id="cannon-game-page"
        >

            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: '1rem',
                zIndex: 100,
                // background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <Link href="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '0px 0px 5px black' }}>
                    {/* Icon placeholder */}
                    <span>🎮</span>
                    <span>Games Showcase</span>
                </Link>
            </nav>

            <div className='grid'>
                {publicGames?.map((game, index) => (
                    <div 
                        key={game.id}
                        className='grid-item'
                    >
                        <div className='ratio ratio-1x1'>
                            <img src={game.image} alt={game.name} width={200} />
                        </div>
                        {game.name}
                    </div>
                ))}
            </div>

        </div>
    );
}
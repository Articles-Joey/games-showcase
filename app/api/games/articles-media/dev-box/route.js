import { NextResponse } from 'next/server';
import games from '@/components/constants/games';

// Used for articles-dev-box GamesDropdown

export async function GET(req) {

    const response = NextResponse.json(
        games
        .filter(game => game.public !== false)
        .filter(game => game.preview !== true)
        .map(game => ({
            link: game.link,
            name: game.name,
            image: game.image
        }))
    );
    const allowedOrigins = [
        'http://localhost:3048',
        'https://games.articles.media',
        'https://articles.media'
    ];
    const origin = req.headers.get('origin');
    if (allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;

}
import { NextResponse } from 'next/server';
import games from '@/components/constants/games';

export async function GET(req) {

    const response = NextResponse.json(games);
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
import { NextResponse } from 'next/server';

// import games from '@/components/constants/games';

export async function GET(req) {
    try {
        // Configure upstream games API via env var, fallback to example URL
        const upstream = process.env.NODE_ENV === 'production'
            ? 'https://socket.articles.media/api/games'
            : 'http://localhost:3000/api/games';
        const upstreamRes = await fetch(upstream);
        if (!upstreamRes.ok) {
            return NextResponse.json({ error: 'Upstream fetch failed' }, { status: 502 });
        }
        
        // New way so I don't need to commit just to update the games list
        const games = await upstreamRes.json().games;
        const response = NextResponse.json(games);

        const allowedOrigins = [
            'http://localhost:3048',
            'https://games.articles.media',
            'https://articles.media'
        ];
        const origin = req.headers.get('origin');
        if (origin && allowedOrigins.includes(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin);
        }
        response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return response;
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
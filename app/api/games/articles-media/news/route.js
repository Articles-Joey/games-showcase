import { NextResponse } from "next/server";

async function getGameNews(game_id) {
    const upstream = process.env.NODE_ENV === 'production'
        ? `https://socket.articles.media/api/games/news?game_id=${game_id}`
        : `http://localhost:3000/api/games/news?game_id=${game_id}`;

    const upstreamRes = await fetch(upstream);
    if (!upstreamRes.ok) {
        throw new Error('Upstream fetch failed');
    }

    const data = await upstreamRes.json();
    return data.news;
}

export async function GET(req) {
    try {
        const game_id = req.nextUrl.searchParams.get('game_id');

        if (!game_id) {
            return NextResponse.json({ 
                error: 'Missing game_id parameter' 
            }, { status: 400 });
        }

        const games = await getGameNews(game_id);
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
        console.log("Error fetching game news:", err);
        return NextResponse.json({ 
            error: 'Server error' 
        }, { status: 500 });
    }
}
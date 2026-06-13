import { NextResponse } from "next/server";

async function getGameComments(game_id) {
    const upstream = process.env.NODE_ENV === 'production'
        ? `https://socket.articles.media/api/games/comments?game_id=${game_id}`
        : `http://localhost:3000/api/games/comments?game_id=${game_id}`;

    const upstreamRes = await fetch(upstream);
    if (!upstreamRes.ok) {
        throw new Error('Upstream fetch failed');
    }

    const data = await upstreamRes.json();
    return data.comments;
}

export async function GET(req) {
    try {
        const game_id = req.nextUrl.searchParams.get('game_id');

        if (!game_id) {
            return NextResponse.json({ 
                error: 'Missing game_id parameter' 
            }, { status: 400 });
        }

        const comments = await getGameComments(game_id);
        const response = NextResponse.json(comments);

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
        console.log("Error fetching game comments:", err);
        return NextResponse.json({ 
            error: 'Server error' 
        }, { status: 500 });
    }
}
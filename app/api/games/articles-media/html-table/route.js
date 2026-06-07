import { NextResponse } from 'next/server';
import { getGames } from '../getGames';

// Used for Articles-Joey repo README.md

export async function GET(req) {
    try {
        const games = await getGames();

        let filteredGames = games
            .filter(game => game.public !== false)
            .filter(game => game.preview !== true);

    const columns = 3;
    let finalHtml = `<table width="100%">`;

    for (let i = 0; i < filteredGames.length; i += columns) {
        finalHtml += `<tr>`;
        for (let j = 0; j < columns; j++) {
            const game = filteredGames[i + j];
            if (game) {
                const isFirstRow = i === 0;
                const widthAttr = isFirstRow ? ` width="${(100 / columns).toFixed(2)}%"` : '';
                const githubLink = game.github_public ? `<a href="${game.github_repo || '#'}">GitHub</a>` : '';
                const separator = githubLink && game.link ? ' • ' : '';

                finalHtml += `<td align="center"${widthAttr}><b>${game.name}</b><br>${githubLink}${separator}<a href="${game.link}">Website</a></td>`;
            } else {
                const isFirstRow = i === 0;
                const widthAttr = isFirstRow ? ` width="${(100 / columns).toFixed(2)}%"` : '';

                finalHtml += `<td align="center"${widthAttr}></td>`;
            }
        }
        finalHtml += `</tr>`;
    }

    finalHtml += `</table>`;

    const response = new NextResponse(finalHtml, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });

    // const allowedOrigins = [
    //     'http://localhost:3048',
    //     'https://games.articles.media',
    //     'https://articles.media'
    // ];
    // const origin = req.headers.get('origin');
    // if (allowedOrigins.includes(origin)) {
    //     response.headers.set('Access-Control-Allow-Origin', origin);
    // }
    // response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
    } catch (err) {
        console.log("Error fetching games:", err);
        return NextResponse.json({ 
            error: 'Server error' 
        }, { status: 500 });
    }
}
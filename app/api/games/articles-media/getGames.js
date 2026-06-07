export async function getGames() {
    const upstream = process.env.NODE_ENV === 'production'
        ? 'https://socket.articles.media/api/games'
        : 'http://localhost:3000/api/games';

    const upstreamRes = await fetch(upstream);
    if (!upstreamRes.ok) {
        throw new Error('Upstream fetch failed');
    }

    const data = await upstreamRes.json();
    return data.games;
}

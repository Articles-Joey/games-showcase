import { NextResponse } from 'next/server';

const UPSTREAM_LOCAL = 'http://localhost:3001/api/community/games';
const UPSTREAM_REMOTE = 'https://articles.media/api/community/games';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const FETCH_CONFIG = {
    cache: 'no-store',
    headers: process.env.CLOUDFLARE_BACKDOOR ? { 'cloudflare-backdoor': process.env.CLOUDFLARE_BACKDOOR } : {},
};

// Module-level cache — persists across requests within the same server process
let cache = {
    data: null,
    fetchedAt: null,
};

async function fetchUpstream() {
    // Try local first (non-production), fall back to remote
    if (process.env.NODE_ENV !== 'production') {
        try {
            const res = await fetch(UPSTREAM_LOCAL, FETCH_CONFIG);
            if (!res.ok) throw new Error(`Local responded ${res.status}`);
            return await res.json();
        } catch {
            // fall through to dev fallback
            try {
                const res = await fetch('https://articles.media/api/games/articles-media', FETCH_CONFIG);
                if (res.ok) return await res.json();
            } catch {
                // fall through to remote
            }
        }
    }

    const res = await fetch(UPSTREAM_REMOTE, FETCH_CONFIG);
    if (!res.ok) throw new Error(`Remote responded ${res.status}`);
    return await res.json();
}

export async function GET() {
    const now = Date.now();
    const cacheAge = cache.fetchedAt !== null ? now - cache.fetchedAt : Infinity;

    // Always re-fetch if cache is missing or older than 1 hour
    if (cacheAge >= CACHE_TTL_MS) {
        const data = await fetchUpstream();
        cache = { data, fetchedAt: Date.now() };
    }

    const secondsUntilExpiry = Math.floor((CACHE_TTL_MS - (Date.now() - cache.fetchedAt)) / 1000);

    return NextResponse.json(cache.data, {
        headers: {
            'Cache-Control': 'no-store',
            'X-Cache-Age': String(Math.floor((Date.now() - cache.fetchedAt) / 1000)),
            'X-Cache-Expires-In': String(secondsUntilExpiry),
        },
    });
}

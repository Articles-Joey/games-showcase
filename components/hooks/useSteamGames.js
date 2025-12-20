import useSWR from 'swr';
import { useState } from 'react';

const useSteamGames = () => {

    // const [isRemote, setIsRemote] = useState(false);

    const fetcher = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Local request failed');
        return await res.json();
    }

    const { data, error, isLoading } = useSWR('http://localhost:3048/api/games/steam', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    // const publicGames = data?.filter(game => game.public !== false);

    return {
        games: data?.games,
        // publicGames,
        isLoading,
        isError: error,
        // isRemote
    };
};

export default useSteamGames;
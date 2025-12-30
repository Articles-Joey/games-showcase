import useSWR from 'swr';
import { useState } from 'react';
import useUserGameInjections from './useUserGameInjections';

const useSteamGames = () => {

    // const [isRemote, setIsRemote] = useState(false);

    const fetcher = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Local request failed');
        return await res.json();
    }

    const { data, error, isLoading } = useSWR(process.env.NODE_ENV === 'development' ? 'http://localhost:3048/api/games/steam' : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    // const publicGames = data?.filter(game => game.public !== false);

    const {
        games: userGameInjections
    } = useUserGameInjections();

    return {
        games: data?.games?.map(game => ({
            ...game,
            game_launcher: "Steam",
            ...userGameInjections.find(injection => injection.id === game.id) || {}
        })) || [],
        // publicGames,
        isLoading,
        isError: error,
        // isRemote
    };
};

export default useSteamGames;
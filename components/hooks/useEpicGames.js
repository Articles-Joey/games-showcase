import useSWR from 'swr';
import { useState } from 'react';
import useUserGameInjections from './useUserGameInjections';

const useEpicGames = () => {

    const {
        games: userGameInjections
    } = useUserGameInjections();

    // const [isRemote, setIsRemote] = useState(false);

    const fetcher = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Local request failed');
        return await res.json();
    }

    const { data, error, isLoading } = useSWR(process.env.NODE_ENV === 'development' ? 'http://localhost:3048/api/games/epic-games' : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    // const publicGames = data?.filter(game => game.public !== false);

    return {
        games: data?.games?.map(game => ({
            ...game,
            game_launcher: "Epic Games",
            ...userGameInjections.find(injection => injection.id === game.id) || {}
        })) || [],
        // publicGames,
        isLoading,
        isError: error,
        // isRemote
    };
};

export default useEpicGames;
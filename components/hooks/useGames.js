import useSWR from 'swr';
import { useState } from 'react';

const useGames = () => {
    const [isRemote, setIsRemote] = useState(false);

    const fetcher = async () => {
        try {
            if (process.env.NODE_ENV === 'production') throw new Error('Production mode');
            const res = await fetch('http://localhost:3001/api/community/games');
            if (!res.ok) throw new Error('Local request failed');
            return await res.json();
        } catch (err) {
            setIsRemote(true);
            const res = await fetch('https://articles.media/api/community/games');
            return await res.json();
        }
    }

    const { data, error, isLoading } = useSWR('community/games', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const publicGames = data?.filter(game => game.public !== false);

    return {
        games: data,
        publicGames,
        isLoading,
        isError: error,
        isRemote
    };
};

export default useGames;
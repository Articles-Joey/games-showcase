import useSWR from 'swr';

const useGames = () => {
    const fetcher = async () => {
        const res = await fetch('/api/games/articles-media');
        if (!res.ok) throw new Error('Failed to fetch articles media games');
        return await res.json();
    };

    const { data, error, isLoading } = useSWR('games/articles-media', fetcher, {
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
    };
};

export default useGames;
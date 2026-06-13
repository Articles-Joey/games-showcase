import useSWR from 'swr';

const useGameNews = (params) => {

    const { game_id } = params;

    console.log("Fetching news for game_id:", game_id);

    const fetcher = async () => {
        const res = await fetch(`/api/games/articles-media/news?game_id=${game_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) throw new Error('Failed to fetch articles media games');
        return await res.json();
    };

    const { data, error, isLoading, mutate } = useSWR(
        params?.game_id ?
            `articles-media/useGameNews?game_id=${game_id}`
            :
            null,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    return {
        data: data,
        isLoading,
        isError: error,
        mutate
    };
};

export default useGameNews;
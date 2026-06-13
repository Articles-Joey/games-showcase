import useSWR from 'swr';

const useGameComments = (params) => {

    const { game_id } = params;

    console.log("Fetching comments for game_id:", game_id);

    const fetcher = async () => {
        const res = await fetch(`/api/games/articles-media/comments?game_id=${game_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) throw new Error('Failed to fetch articles media comments');
        return await res.json();
    };

    const { data, error, isLoading, mutate } = useSWR(
        params?.game_id ?
            `articles-media/useGameComments?game_id=${game_id}`
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

export default useGameComments;
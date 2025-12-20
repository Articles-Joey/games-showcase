import useSteamGames from "@/components/hooks/useSteamGames";
import useEpicGames from "@/components/hooks/useEpicGames";
import useUserGames from "@/components/hooks/useUserGames";
import useGames from "@/components/hooks/useGames";

import { useStore } from "@/hooks/useStore";

export default function useAllGames() {

    const search = useStore((state) => state.search);

    const {
        // games, 
        publicGames
    } = useGames();

    const {
        games: steamGames
    } = useSteamGames();

    const {
        games: epicGames
    } = useEpicGames();

    const {
        games: userGames
    } = useUserGames();

    const filtered = (games) => {
        if (!search || search.trim() === "") return games;
        return games.filter(game => 
            game?.name?.toLowerCase().includes(search.toLowerCase())
        );
    }

    return ({
        games: [
            ...userGames || [],
            ...steamGames || [],
            ...epicGames || [],
            ...publicGames || [],
        ],
        filteredGames: filtered([
            ...userGames || [],
            ...steamGames || [],
            ...epicGames || [],
            ...publicGames || [],
        ]),
    });

}
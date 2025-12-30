import useSteamGames from "@/components/hooks/useSteamGames";
import useEpicGames from "@/components/hooks/useEpicGames";
import useUserGames from "@/components/hooks/useUserGames";
import useGames from "@/components/hooks/useGames";

import { useStore } from "@/hooks/useStore";
// import useUserGameInjections from "./useUserGameInjections";

export default function useAllGames() {

    const search = useStore((state) => state.search);
    const filters = useStore((state) => state.filters);

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

    // const {
    //     games: userGameInjections
    // } = useUserGameInjections();

    const filtered = (games) => {
        if (!search || search.trim() === "") return games;
        return games.filter(game => 
            game?.name?.toLowerCase().includes(search.toLowerCase())
        );
    }

    return ({
        games: [
            ...filters.launchers?.User ? userGames || [] : [],
            ...filters.launchers?.Steam ? steamGames || [] : [],
            ...filters.launchers?.Epic ? epicGames || [] : [],
            ...publicGames || [],
        ],
        filteredGames: filtered([
            ...filters.launchers?.User ? userGames || [] : [],
            ...filters.launchers?.Steam ? steamGames || [] : [],
            ...filters.launchers?.Epic ? epicGames || [] : [],
            ...publicGames || [],
        ]),
        // userGameInjections,
    });

}
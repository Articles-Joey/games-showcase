import useSteamGames from "@/components/hooks/useSteamGames";
import useEpicGames from "@/components/hooks/useEpicGames";
import useUserGames from "@/components/hooks/useUserGames";
import useGames from "@/components/hooks/useGames";

import { useStore } from "@/hooks/useStore";
import { useFilterStore } from "./useFilterStore";
// import useUserGameInjections from "./useUserGameInjections";

export default function useAllGames() {

    const search = useFilterStore((state) => state.search);
    const filters = useFilterStore((state) => state.filters);

    const playerFilter = useFilterStore((state) => state.playerFilter);
    const availabilityFilter = useFilterStore((state) => state.availabilityFilter);

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

        // if (!search || search.trim() === "") return games;

        return games
            ?.filter(item => {

                // Override other filters if a search
                if (search !== '') {
                    return item
                }

                if (playerFilter == 'All') {
                    return item
                }

                if (playerFilter == 'Multiplayer') {
                    return item.multiplayer
                }

                if (playerFilter == 'Single Player') {
                    return item.single_player
                }

            })
            ?.filter(item => {

                // Override other filters if a search
                if (search !== '') {
                    return item
                }

                if (availabilityFilter == 'All') {
                    return item && item.public !== false
                }

                if (availabilityFilter == 'Available') {
                    return !item.preview && item.public !== false
                }

                if (availabilityFilter == 'Upcoming') {
                    return item.preview && item.public !== false
                }

                if (availabilityFilter == 'Developer Only') {
                    return item.public === false
                }

            })
            ?.filter(item => {

                // Override other filters if a search
                if (search == '') {
                    return item
                }

                if (search !== '') {
                    return item.name.toLowerCase().includes(search.toLowerCase())
                }

            })
        // ?.filter(game =>
        //     game?.name?.toLowerCase().includes(search.toLowerCase())
        // );
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
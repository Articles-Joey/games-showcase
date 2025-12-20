import useAllGames from "@/components/hooks/useAllGames";
import CarouselGameItem from "../CarouselGameItem"

export default function Carousel() {

    const {
        games: allGames,
        filteredGames,
    } = useAllGames();

    return (
        <>
            {
                [                    
                    // ...allGames || [],
                    ...filteredGames || [],
                ]?.map((game, i) => {

                    return (
                        <CarouselGameItem
                            key={game.name}
                            game={game}
                            game_index={i}
                        />
                    )

                })}
        </>
    )

}
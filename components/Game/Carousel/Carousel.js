import useAllGames from "@/components/hooks/useAllGames";
import CarouselGameItem from "./CarouselGameItem"
import { ModelTrafficCone } from "../Traffic Cone";
import { Text } from "@react-three/drei";
import { useFilterStore } from "@/components/hooks/useFilterStore";

export default function Carousel() {

    const {
        games: allGames,
        filteredGames,
    } = useAllGames();

    const setAvailabilityFilter = useFilterStore((state) => state.setAvailabilityFilter);
    const setSearch = useFilterStore((state) => state.setSearch);

    return (
        <>

            {filteredGames?.length === 0 &&
                <group
                    position={[13.5, 0, 0]}
                    onClick={() => {
                        console.log("Traffic cone clicked");
                        setSearch("");
                        setAvailabilityFilter("Available");
                    }}
                >
                    <Text
                        position={[0, 5, 0]}
                        color="white"
                        fontSize={1}
                    >
                        No games found
                    </Text>
                    <Text
                        position={[0, 4, 0]}
                        color="white"
                        fontSize={0.5}
                    >
                        (click to reset filters)
                    </Text>
                    <ModelTrafficCone
                        scale={10}
                        position={[0, 1.25, 0]}
                    />
                </group>
            }

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
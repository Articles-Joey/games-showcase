import useAllGames from "@/components/hooks/useAllGames";
import CarouselGameItem from "./CarouselGameItem";
import CarouselGround from "./Ground";
import { ModelTrafficCone } from "../Traffic Cone";
import { Text } from "@react-three/drei";
import { useFilterStore } from "@/components/hooks/useFilterStore";
import { useStore } from "@/components/hooks/useStore";
import { Suspense } from "react";
import RetainedGameScenes from "./RetainedGameScenes";
import { getCarouselGameKey } from "./previewRegistry";

const VISIBLE_GAME_RADIUS = 14;

export default function Carousel() {
    const { filteredGames, games } = useAllGames();
    const activeGameIndex = useStore((state) => state.activeGameIndex);
    const firstVisibleIndex = Math.max(
        0,
        activeGameIndex - VISIBLE_GAME_RADIUS,
    );
    // Returning null inside an item still leaves its hooks and frame callback mounted.
    const visibleGames = filteredGames?.slice(
        firstVisibleIndex,
        Math.max(0, activeGameIndex + VISIBLE_GAME_RADIUS + 1),
    );

    const setAvailabilityFilter = useFilterStore(
        (state) => state.setAvailabilityFilter,
    );
    const setSearch = useFilterStore((state) => state.setSearch);

    return (
        <>
            <CarouselGround gameCount={filteredGames?.length || 0} />

            {filteredGames?.length === 0 && (
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
            )}

            {visibleGames?.map((game, offset) => {
                const gameKey = getCarouselGameKey(game);
                return (
                    <Suspense
                        key={gameKey}
                        fallback={null}
                    >
                        <CarouselGameItem
                            game={game}
                            game_index={firstVisibleIndex + offset}
                        />
                    </Suspense>
                );
            })}
            <RetainedGameScenes
                games={filteredGames}
                allGames={games}
            />
        </>
    );
}

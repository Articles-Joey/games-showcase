// Only retain actual previews, rather than a traffic cone for every library game.
const retainedPreviews = new Set([
    "8 Ball Pool",
    "Assassin",
    "Assets Gallery",
    "Battle Trap",
    "Blackjack",
    "Cannon",
    "Carousel of Progress",
    "Catching Game",
    "Eager Eagle",
    "Four Frogs",
    "Glass Ceiling",
    "Memory Game",
    "Pinball",
    "Plinko",
    "Race Game",
    "Spleef",
    "Tag",
    "Tower Blocks",
    "Trash Chute",
    "Tug of War",
    "Battlefield 4",
    "Death Race",
    "Fortnite",
    "Halo 3",
    "Ice Slide",
    "Jungle Vines",
    "Maze",
    "Minecraft",
    "Move Match",
    "Ocean Rings",
    "Parkour",
    "School Run",
    "Stop the Thieves",
    "Treasure Dive",
    "USA Tycoon",
]);

export function hasRetainedPreview(game) {
    return retainedPreviews.has(game?.name);
}

export function getCarouselGameKey(game) {
    return `${game.game_launcher || "Articles"}:${game.id ?? game.key ?? game.slug ?? game.name}`;
}

import { lazy } from "react";

function preview(loader, options = {}) {
    let promise;
    const load = () => (promise ??= loader());
    return { enabled: true, ...options, load, Component: lazy(load) };
}

// Rendering, retention, and startup preparation all use this one list.
// Leave unfinished scenes disabled; enabling an entry automatically preloads it.
const previews = {
    "8 Ball Pool": preview(() => import("./Games/8 Ball Pool")),
    Assassin: preview(() => import("./Games/Assassin")),
    "Assets Gallery": preview(() => import("./Games/Assets Gallery")),
    "Battle Trap": preview(() => import("./Games/Battle Trap")),
    Blackjack: preview(() => import("./Games/Blackjack")),
    Cannon: preview(() => import("./Games/Cannon")),
    "Carousel of Progress": preview(
        () => import("./Games/Carousel of Progress"),
        { enabled: false },
    ),
    "Catching Game": preview(() => import("./Games/Catching Game")),
    "Death Race": preview(() => import("./Games/Death Race")),
    "Eager Eagle": preview(() => import("./Games/Eager Eagle")),
    "Four Frogs": preview(() => import("./Games/Four Frogs"), {
        transform: {
            scale: 0.025,
            position: [10, 0.5, 0],
            rotation: [0, Math.PI / 2, 0],
        },
    }),
    "Glass Ceiling": preview(() => import("./Games/Glass Ceiling")),
    "Ice Slide": preview(() => import("./Games/Ice Slide")),
    "Jungle Vines": preview(() => import("./Games/Jungle Vines")),
    Maze: preview(() => import("./Games/Maze")),
    "Memory Game": preview(() => import("./Games/Memory Game")),
    "Move Match": preview(() => import("./Games/Move Match")),
    "Ocean Rings": preview(() => import("./Games/Ocean Rings"), {
        enabled: false,
    }),
    Parkour: preview(() => import("./Games/Parkour"), { enabled: false }),
    Pinball: preview(() => import("./Games/Pinball")),
    Plinko: preview(() => import("./Games/Plinko")),
    "Race Game": preview(() => import("./Games/Race Game")),
    "School Run": preview(() => import("./Games/School Run")),
    Spleef: preview(() => import("./Games/Spleef")),
    "Stop the Thieves": preview(() => import("./Games/Stop the Thieves")),
    Tag: preview(() => import("./Games/Tag")),
    "Tower Blocks": preview(() => import("./Games/Tower Blocks")),
    "Trash Chute": preview(() => import("./Games/Trash Chute")),
    "Treasure Dive": preview(() => import("./Games/Treasure Dive"), {
        enabled: false,
    }),
    "Tug of War": preview(() => import("./Games/Tug of War")),
    "USA Tycoon": preview(() => import("./Games/USA Tycoon"), {
        enabled: false,
    }),
    "Battlefield 4": preview(
        () => import("./Games/Battlefield 4/Battlefield4Scene"),
    ),
    Fortnite: preview(() => import("./Games/Fortnite"), {
        transform: { position: [3, 5.5, 0] },
    }),
    "Halo 3": preview(() => import("./Games/Halo"), {
        transform: { position: [3, 5.5, 0] },
    }),
    Minecraft: preview(() => import("./Games/Minecraft")),
};

export const previewNames = Object.keys(previews).filter(
    (name) => previews[name].enabled,
);

export function getGamePreview(name) {
    return previews[name]?.enabled ? previews[name] : null;
}

export function hasRetainedPreview(game) {
    return Boolean(getGamePreview(game?.name));
}

export function getCarouselGameKey(game) {
    return `${game.game_launcher || "Articles"}:${game.id ?? game.key ?? game.slug ?? game.name}`;
}

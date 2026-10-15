export const SECTION_LENGTH = 10;
export const SECTION_COUNT = 4;
export const HALL_LENGTH = SECTION_LENGTH * SECTION_COUNT;
export const HALL_START = -30;
export const RUN_SPEED = 4.5;

// The same four safe-mode obstacles repeat in the same order on every lap.
export const OBSTACLES = [
    { type: "WetFloor", x: -1.35, z: 0 },
    { type: "Drone", x: 0, z: -10 },
    { type: "Horizontal", x: 0, z: -20 },
    { type: "FireLine", x: 0, z: -30 },
];

export function sectionZ(z, elapsed) {
    return (
        ((((z + elapsed * RUN_SPEED - HALL_START) % HALL_LENGTH) +
            HALL_LENGTH) %
            HALL_LENGTH) +
        HALL_START
    );
}

export const MODEL_URLS = {
    hoodie: "/models/school-run/HoodieCharacter-transformed.glb",
    hand: "/models/school-run/Human hand-transformed.glb",
    chair: "/models/school-run/chair-transformed.glb",
    desk: "/models/school-run/desk-transformed.glb",
    screen: "/models/school-run/computerScreen-transformed.glb",
    keyboard: "/models/school-run/computerKeyboard-transformed.glb",
    television: "/models/school-run/televisionVintage-transformed.glb",
    locker: "/models/school-run/bookcaseClosedDoors-transformed.glb",
    witch: "/models/school-run/witch-transformed.glb",
    duck: "/models/school-run/duck-transformed.glb",
    dog: "/models/school-run/dog-transformed.glb",
    bear: "/models/school-run/bear-transformed.glb",
    pear: "/models/school-run/Pear-transformed.glb",
    wetFloor: "/models/school-run/WetFloorSign-transformed.glb",
    support: "/models/school-run/Metal Support-transformed.glb",
    brokenWindow: "/models/school-run/BrokenWindow-transformed.glb",
    window: "/models/school-run/UnbrokenWindow-transformed.glb",
    doorway:
        "https://cdn.articles.media/games/Assets/kenney_furniture-kit/Models/GLTF format/doorway.glb",
};

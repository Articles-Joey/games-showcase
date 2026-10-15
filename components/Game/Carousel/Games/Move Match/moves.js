export const MOVES = ["Up", "Down", "Left", "Right"];
export const MOVE_INTERVAL = 1;
export const IDLE_ACTION = "HumanArmature|Man_Idle";
export const MOVE_ANIMATIONS = {
    Up: "HumanArmature|Man_Jump",
    Down: "HumanArmature|Man_Sitting",
    Left: "HumanArmature|Man_Punch",
    Right: "HumanArmature|Man_Punch",
};
export const ARROW_ANGLES = {
    Up: 0,
    Down: Math.PI,
    Left: Math.PI / 2,
    Right: -Math.PI / 2,
};

export function createRandom(seed) {
    let value = seed >>> 0;
    return () => {
        value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
        return value / 4294967296;
    };
}

// Each new prompt changes direction, including when two adjacent moves share a clip.
export function pickNextMove(previous, random) {
    const index = MOVES.indexOf(previous);
    return MOVES[
        (index + 1 + Math.floor(random() * (MOVES.length - 1))) % MOVES.length
    ];
}

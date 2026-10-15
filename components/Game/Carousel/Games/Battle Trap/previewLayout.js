export const BOARD_SIZE = 20;
export const CELL_SIZE = 2;
export const MOVE_COUNT = 10;

export const PLAYERS = [
    { color: "red", corner: [0, 0], inward: [1, 1], horizontalMoves: 5 },
    { color: "blue", corner: [1, 1], inward: [-1, -1], horizontalMoves: 4 },
    { color: "yellow", corner: [0, 1], inward: [1, -1], horizontalMoves: 6 },
    { color: "green", corner: [1, 0], inward: [-1, 1], horizontalMoves: 3 },
];

// GameCanvas rotates its two-unit grid: board X increases to the right,
// board Y goes toward -Z. Center the preview's board on the origin.
export function cellPosition(x, y) {
    return [x * CELL_SIZE - BOARD_SIZE + 1, 0, BOARD_SIZE - 1 - y * CELL_SIZE];
}

export function getHeading(from, to) {
    // The chopper's front points down its local -Z axis.
    return Math.atan2(from[0] - to[0], from[2] - to[2]);
}

export function createPreviewRoutes() {
    return PLAYERS.map((player) => {
        const steps = Array.from({ length: MOVE_COUNT }, (_, index) =>
            index < player.horizontalMoves ? "x" : "y",
        );
        for (let index = steps.length - 1; index > 0; index--) {
            const other = Math.floor(Math.random() * (index + 1));
            [steps[index], steps[other]] = [steps[other], steps[index]];
        }
        let x = player.corner[0] * (BOARD_SIZE - 1);
        let y = player.corner[1] * (BOARD_SIZE - 1);
        const points = [cellPosition(x, y)];
        for (const step of steps) {
            if (step === "x") x += player.inward[0];
            else y += player.inward[1];
            points.push(cellPosition(x, y));
        }
        // Different X/Y counts guarantee different ten-move sequences. These
        // short inward paths need no collision, dice, elimination or win logic.
        return { color: player.color, points };
    });
}

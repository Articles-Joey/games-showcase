// Visual dimensions and rack arrangement from the pool game, without match state.
export const POCKETS = [
    { position: [-26.1, 0, -51.1], radius: 2.7 },
    { position: [26.1, 0, -51.1], radius: 2.7 },
    { position: [-26.6, 0, 0], radius: 2.3 },
    { position: [26.6, 0, 0], radius: 2.3 },
    { position: [-26.1, 0, 51.1], radius: 2.7 },
    { position: [26.1, 0, 51.1], radius: 2.7 },
];

export function makeRack() {
    const order = [1, 9, 2, 10, 8, 3, 11, 7, 14, 4, 5, 13, 15, 6, 12];
    const rack = [{ ball: 0, position: [0, 1.26, 25] }];
    let index = 0;
    for (let row = 0; row < 5; row++) {
        for (let column = 0; column <= row; column++) {
            rack.push({
                ball: order[index++],
                position: [
                    (column - row / 2) * 2.02,
                    1.26,
                    -25 - row * Math.sqrt(3) * 1.01,
                ],
            });
        }
    }
    return rack;
}

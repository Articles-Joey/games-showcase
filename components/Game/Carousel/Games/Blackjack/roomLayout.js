// Visual seat dimensions from Blackjack; no permissions or player state.
export const FLOOR_Y = -2.8;
export const PLAYER_SCALE = 1.44;
export const PLAYER_HEIGHT = 3.5 * PLAYER_SCALE;
export const PREVIEW_SCALE = 0.35;

export const TABLE_SEATS = Array.from({ length: 8 }, (_, index) => {
    const angle = (index * Math.PI) / 4;
    return {
        id: `table-${index}`,
        position: [Math.sin(angle) * 5.6, FLOOR_Y, Math.cos(angle) * 4.2],
        rotation: angle + Math.PI,
        chairRotation: angle,
        height: 1.58,
    };
});

export const DEALER_SEAT = TABLE_SEATS[4];
export const PLAYER_SEAT = TABLE_SEATS[0];

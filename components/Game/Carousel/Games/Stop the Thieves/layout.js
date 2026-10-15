export const FENCE_RADIUS = 25;
export const GROUND_RADIUS = 32;
export const ENEMY_SPAWN_RADIUS = FENCE_RADIUS - 0.4;
export const ENEMY_EXIT_RADIUS = FENCE_RADIUS + 1.2;
export const ENEMY_SPEED = 4;

// The four barrel locations used by the game's single-player scene.
export const BARREL_POSITIONS = [
    [-3, 0, -3],
    [3, 0, -3],
    [-3, 0, 3],
    [3, 0, 3],
];

export const BARREL_URL = `${process.env.NEXT_PUBLIC_CDN}games/Assets/KennyNL/Food/Models/barrel-transformed.glb`;
export const PERGOLA_URL = `${process.env.NEXT_PUBLIC_CDN}games/Stop the Thiefs/wave_pergola.glb`;

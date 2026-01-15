import { memo, Suspense, useEffect, useRef, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Sky, Stats } from "@react-three/drei";

// import TerrainManager from "@/components/Games/Terrain Example/TerrainManager";
// import { Leva } from "leva";

import { renderer } from './renderer';

function SynthwaveAnimation() {
    const canvasRef = useRef(null);

    // const [color, setColor] = useState(false)

    useEffect(() => {

        let freezeTime = 0;
        let animationFrameId;

        function hashchange() {
            const freezeMatch = location.hash.match(/freeze=(\d+)/);
            freezeTime = freezeMatch ? +freezeMatch[1] * 1000 : 0;
        }
        window.addEventListener('hashchange', hashchange);
        hashchange();

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx === null) throw new Error('canvas does not support context 2d');

        function createRenderer() {
            const canvasRect = canvas.getBoundingClientRect();
            canvas.width = Math.max(canvasRect.width, window.innerWidth) | 0;
            canvas.height = Math.max(canvasRect.height, window.innerHeight) | 0;

            return renderer(ctx, canvas.width, canvas.height);
        }

        let render = createRenderer();

        function onResize() {
            render = createRenderer();
        }

        window.addEventListener('resize', onResize);

        const start = performance.now();

        function tick() {
            const t = freezeTime ? freezeTime : performance.now() - start;
            render(t);
            animationFrameId = requestAnimationFrame(tick);
        }

        tick();

        return () => {
            window.removeEventListener('hashchange', hashchange);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animationFrameId);
        };

    }, [])

    return (
        <canvas 
        ref={canvasRef}
        id="canvas" 
        width="0" 
        height="0" 
        style={{ 
            height: '100%', 
            maxHeight: 'calc(100vh - 0px)', 
            width: '100vw' 
        }}
        >

        </canvas>
    );
};

export default memo(SynthwaveAnimation);
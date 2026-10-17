import { Vector4, WebGLRenderTarget } from "three";

const nextPaint = () =>
    new Promise((resolve) => window.requestAnimationFrame(resolve));

export function previewGraphState(container) {
    let signature = "";
    let textPending = false;
    container.traverse((object) => {
        if (object.geometry) {
            signature += `${object.id}:${object.geometry.id}:${object.geometry.attributes.position?.count};`;
        }
        const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
        materials.forEach((material) => {
            if (!material) return;
            // Three increments material.version while compiling/rendering both
            // sides of transparent meshes. That must not restart preparation.
            signature += `m${material.id};`;
            Object.values(material).forEach((value) => {
                if (value?.isTexture)
                    signature += `t${value.id}:${value.version};`;
            });
        });
        // Troika generates glyph geometry asynchronously after the font loads.
        if (typeof object.sync === "function" && "textRenderInfo" in object) {
            object.sync();
            if (
                !object.textRenderInfo ||
                object._isSyncing ||
                object._needsSync
            )
                textPending = true;
        }
    });
    return { signature, textPending };
}

function withAllObjects(scene, callback) {
    const restore = [];
    scene.traverse((object) => {
        restore.push([object, object.visible, object.frustumCulled]);
        object.visible = true;
        object.frustumCulled = false;
    });
    try {
        return callback();
    } finally {
        restore.forEach(([object, visible, culled]) => {
            object.visible = visible;
            object.frustumCulled = culled;
        });
    }
}

function collectTextures(scene) {
    const textures = new Set();
    const add = (value) => {
        if (value?.isTexture && !value.isRenderTargetTexture)
            textures.add(value);
        else if (Array.isArray(value)) value.forEach(add);
    };
    scene.traverse((object) => {
        const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
        materials.forEach((material) => {
            if (!material) return;
            Object.values(material).forEach(add);
            Object.values(material.uniforms || {}).forEach((uniform) =>
                add(uniform.value),
            );
        });
    });
    return textures;
}

function drawOffscreen(renderer, scene, camera, target) {
    const previousTarget = renderer.getRenderTarget();
    const cubeFace = renderer.getActiveCubeFace();
    const mipLevel = renderer.getActiveMipmapLevel();
    const viewport = renderer.getViewport(new Vector4());
    const scissor = renderer.getScissor(new Vector4());
    const scissorTest = renderer.getScissorTest();
    const autoClear = renderer.autoClear;
    try {
        renderer.setRenderTarget(target);
        renderer.setViewport(0, 0, target.width, target.height);
        renderer.setScissorTest(false);
        renderer.autoClear = true;
        withAllObjects(scene, () => renderer.render(scene, camera));
    } finally {
        renderer.setRenderTarget(previousTarget, cubeFace, mipLevel);
        renderer.setViewport(viewport);
        renderer.setScissor(scissor);
        renderer.setScissorTest(scissorTest);
        renderer.autoClear = autoClear;
    }
}

export async function warmPreview(renderer, scene, camera, cancelled) {
    const target = new WebGLRenderTarget(64, 64, { depthBuffer: true });
    try {
        let uploaded = 0;
        for (const texture of collectTextures(scene)) {
            if (cancelled()) return;
            renderer.initTexture(texture);
            // Give the loading overlay a painted frame between upload batches.
            if (++uploaded % 4 === 0) await nextPaint();
        }
        if (cancelled()) return;
        scene.updateMatrixWorld(true);
        camera.updateMatrixWorld(true);
        await withAllObjects(scene, () => renderer.compileAsync(scene, camera));
        if (cancelled()) return;
        await nextPaint();
        if (cancelled()) return;
        drawOffscreen(renderer, scene, camera, target);
        await nextPaint();
        if (cancelled()) return;
        drawOffscreen(renderer, scene, camera, target);
        // The offscreen pass also initializes buffers, skinned meshes, water,
        // and text. Finish with the normal canvas output shader variants ready.
        await withAllObjects(scene, () => renderer.compileAsync(scene, camera));
    } finally {
        target.dispose();
    }
}

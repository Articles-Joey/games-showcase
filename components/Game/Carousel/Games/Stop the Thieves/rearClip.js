// Clip in this preview's coordinates, without changing the shared renderer.
export default function rearClip(material, direction) {
    const beforeCompile = material.onBeforeCompile;
    material.onBeforeCompile = function (shader, renderer) {
        beforeCompile.call(this, shader, renderer);
        shader.uniforms.thievesRearDirection = direction;
        shader.vertexShader = shader.vertexShader
            .replace(
                "#include <common>",
                "#include <common>\nvarying vec2 vThievesBackdropPosition;",
            )
            .replace(
                "#include <begin_vertex>",
                `
                #include <begin_vertex>
                vec4 thievesBackdropPosition = vec4(position, 1.0);
                #ifdef USE_INSTANCING
                    thievesBackdropPosition = instanceMatrix * thievesBackdropPosition;
                #endif
                vThievesBackdropPosition = thievesBackdropPosition.xz;
            `,
            );
        shader.fragmentShader = shader.fragmentShader
            .replace(
                "#include <common>",
                `
                #include <common>
                varying vec2 vThievesBackdropPosition;
                uniform vec2 thievesRearDirection;
            `,
            )
            .replace(
                "#include <clipping_planes_fragment>",
                `
                #include <clipping_planes_fragment>
                if (dot(vThievesBackdropPosition, thievesRearDirection) > 0.0) discard;
            `,
            );
    };
    material.customProgramCacheKey = () => "stop-thieves-rear-half-v1";
    return material;
}

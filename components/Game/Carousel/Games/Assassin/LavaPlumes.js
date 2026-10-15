import { useLayoutEffect, useMemo, useRef } from "react";
import { usePreviewFrame } from "../shared/PreviewActivity";
import { Object3D, Vector3 } from "three";

const BURSTS = 5;
const PARTICLES_PER_BURST = 20;
const COUNT = BURSTS * PARTICLES_PER_BURST;

export default function LavaPlumes() {
    const mesh = useRef();
    const elapsed = useRef(0);
    const dummy = useMemo(() => new Object3D(), []);
    const bursts = useMemo(
        () =>
            Array.from({ length: BURSTS }, (_, index) => ({
                next: index * 0.4,
                particles: Array.from({ length: PARTICLES_PER_BURST }, () => ({
                    position: new Vector3(),
                    velocity: new Vector3(),
                    age: Infinity,
                    life: 0,
                })),
            })),
        [],
    );

    useLayoutEffect(() => {
        const instances = mesh.current;
        if (!instances) return;
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        for (let index = 0; index < COUNT; index++)
            instances.setMatrixAt(index, dummy.matrix);
        instances.instanceMatrix.needsUpdate = true;
    }, [dummy]);

    usePreviewFrame((_, delta) => {
        if (!mesh.current) return;
        const dt = Math.min(delta, 0.05);
        elapsed.current += dt;
        let index = 0;
        for (const burst of bursts) {
            if (elapsed.current >= burst.next) {
                let x, z;
                do {
                    x = Math.random() * 60 - 30;
                    z = Math.random() * 60 - 30;
                } while (Math.abs(x) <= 20 && Math.abs(z) <= 20);
                burst.next = elapsed.current + 2 + Math.random() * 3;
                for (const particle of burst.particles) {
                    particle.age = 0;
                    particle.life = 1.5 + Math.random() * 1.5;
                    particle.position.set(
                        x + (Math.random() - 0.5) * 0.6,
                        -0.4,
                        z + (Math.random() - 0.5) * 0.6,
                    );
                    const speed = 4 + Math.random() * 7;
                    const spread = Math.random() * Math.PI * 0.35;
                    const angle = Math.random() * Math.PI * 2;
                    particle.velocity.set(
                        Math.sin(angle) * Math.sin(spread) * speed * 0.6,
                        Math.cos(spread) * speed,
                        Math.cos(angle) * Math.sin(spread) * speed * 0.6,
                    );
                }
            }
            for (const particle of burst.particles) {
                particle.age += dt;
                const active =
                    particle.age < particle.life && particle.position.y >= -0.6;
                if (active) {
                    particle.velocity.y -= 9.8 * dt;
                    particle.position.addScaledVector(particle.velocity, dt);
                    dummy.position.copy(particle.position);
                    dummy.scale.setScalar(
                        (1 - particle.age / particle.life) * 0.9 + 0.08,
                    );
                } else {
                    dummy.scale.setScalar(0);
                }
                dummy.updateMatrix();
                mesh.current.setMatrixAt(index++, dummy.matrix);
            }
        }
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={mesh}
            args={[null, null, COUNT]}
            frustumCulled={false}
        >
            <sphereGeometry args={[0.14, 5, 5]} />
            <meshStandardMaterial
                color="orange"
                emissive="orange"
                emissiveIntensity={2}
            />
        </instancedMesh>
    );
}

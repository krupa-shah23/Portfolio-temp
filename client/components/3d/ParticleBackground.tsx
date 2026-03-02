"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleCluster() {
    const ref = useRef<THREE.Points>(null);
    const targetSpeed = useRef(0);
    const currentSpeed = useRef(0);

    // Generate random particles in a sphere
    const particles = useMemo(() => {
        const temp = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const r = 10 * Math.cbrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;
        }
        return temp;
    }, []);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const deltaY = currentScrollY - lastScrollY;
            // Increase target speed based on scroll speed
            targetSpeed.current = Math.min(Math.max(Math.abs(deltaY) * 0.1, 0), 10);
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useFrame((state, delta) => {
        // Decay target speed back to 0 so it only speeds up *during* scroll
        targetSpeed.current = THREE.MathUtils.lerp(targetSpeed.current, 0, delta * 3);

        // Smoothly transition current extra speed
        currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed.current, delta * 5);

        if (ref.current) {
            const positions = ref.current.geometry.attributes.position.array as Float32Array;
            const driftSpeed = 0.5; // Base drift speed
            const totalSpeed = driftSpeed + currentSpeed.current;

            for (let i = 0; i < 5000; i++) {
                // Move particle upwards
                positions[i * 3 + 1] += totalSpeed * delta;

                // Loop particles back to bottom if they go too high
                if (positions[i * 3 + 1] > 10) {
                    positions[i * 3 + 1] = -10;
                }
            }
            ref.current.geometry.attributes.position.needsUpdate = true;

            // Subtle rotation for extra depth
            ref.current.rotation.x -= delta / 30;
            ref.current.rotation.y -= delta / 40;
        }
    });

    return (
        <group>
            <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#8b5cf6"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export default function ParticleBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ParticleCluster />
            </Canvas>
            {/* Subtle overlay gradient to blend edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black/50 to-black pointer-events-none" />
        </div>
    );
}

"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function StaticStars({ count = 3000 }) {
    const pointsRef = useRef<THREE.Points>(null);
    const { mouse } = useThree();

    const [positions] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 60; // x spread wider
            positions[i * 3 + 1] = (Math.random() - 0.5) * 60; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10; // z pushing back
        }
        return [positions];
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        // Very slow ambient rotation for deep space
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.005;
        pointsRef.current.rotation.x = state.clock.elapsedTime * 0.002;

        // Subtle parallax
        pointsRef.current.position.x += (mouse.x * 0.5 - pointsRef.current.position.x) * 0.02;
        pointsRef.current.position.y += (mouse.y * 0.5 - pointsRef.current.position.y) * 0.02;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#888888" /* Distinct gray/white for distant stars */
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.6}
            />
        </Points>
    );
}

function BokehParticles({ count = 800 }) {
    const pointsRef = useRef<THREE.Points>(null);
    const { mouse } = useThree();

    const [positions, speeds] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z closer
            speeds[i] = Math.random() * 0.2 + 0.1;
        }
        return [positions, speeds];
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        // Faster upward drift
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
        pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;

        // Stronger parallax for foreground bokeh
        pointsRef.current.position.x += (mouse.x * 2 - pointsRef.current.position.x) * 0.05;
        pointsRef.current.position.y += (mouse.y * 2 - pointsRef.current.position.y) * 0.05;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#8B5CF6" /* Neon purple for bokeh */
                size={0.15} /* Larger size for bokeh effect */
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.8}
            />
        </Points>
    );
}

function FloatingShape({ position, speed, scale, color }: { position: [number, number, number], speed: number, scale: number, color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += 0.005 * speed;
        meshRef.current.rotation.y += 0.01 * speed;

        // Base bobbing + scroll-based displacement
        const scrollY = window.scrollY;
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2 + (scrollY * 0.002 * speed);
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
                color={color}
                transparent
                opacity={0.15}
                wireframe
                roughness={0.2}
                metalness={0.8}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
}

export default function BackgroundCanvas() {
    const shapes = useMemo(() => {
        return Array.from({ length: 6 }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10 - 5
            ] as [number, number, number],
            speed: Math.random() * 0.5 + 0.2,
            scale: Math.random() * 1.5 + 0.5,
            color: i % 2 === 0 ? "#8B5CF6" : "#3B82F6"
        }));
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-screen z-[-1] pointer-events-none bg-black">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <StaticStars count={3500} />
                <BokehParticles count={600} />
                {shapes.map((shape, i) => (
                    <FloatingShape key={i} {...shape} />
                ))}
            </Canvas>
        </div>
    );
}

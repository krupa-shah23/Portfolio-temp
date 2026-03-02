"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 80;
const MAX_DISTANCE = 2.2;

function Network() {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const groupRef = useRef<THREE.Group>(null);

    const { particlesData, positions, colors } = useMemo(() => {
        const pos = new Float32Array(PARTICLE_COUNT * 3);
        const col = new Float32Array(PARTICLE_COUNT * 3);
        const data = [];

        const color = new THREE.Color();

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

            // Neural-network style purple & blue hues
            color.setHSL(0.65 + Math.random() * 0.2, 0.8, 0.6);
            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;

            data.push({
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.015,
                    (Math.random() - 0.5) * 0.015,
                    (Math.random() - 0.5) * 0.015
                ),
                numConnections: 0,
            });
        }

        return { particlesData: data, positions: pos, colors: col };
    }, []);

    const linePositions = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 3), []);
    const lineColors = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 3), []);

    useFrame((state, delta) => {
        if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

        let vertexpos = 0;
        let colorpos = 0;
        let numConnected = 0;

        const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const colorsArray = pointsRef.current.geometry.attributes.color.array as Float32Array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particlesData[i].numConnections = 0;
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particleData = particlesData[i];

            positionsArray[i * 3] += particleData.velocity.x;
            positionsArray[i * 3 + 1] += particleData.velocity.y;
            positionsArray[i * 3 + 2] += particleData.velocity.z;

            // Bounce off boundaries to keep nodes in view
            if (positionsArray[i * 3] < -5 || positionsArray[i * 3] > 5) particleData.velocity.x = -particleData.velocity.x;
            if (positionsArray[i * 3 + 1] < -5 || positionsArray[i * 3 + 1] > 5) particleData.velocity.y = -particleData.velocity.y;
            if (positionsArray[i * 3 + 2] < -5 || positionsArray[i * 3 + 2] > 5) particleData.velocity.z = -particleData.velocity.z;

            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const particleDataB = particlesData[j];

                const dx = positionsArray[i * 3] - positionsArray[j * 3];
                const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
                const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                // Connect if close enough
                if (dist < MAX_DISTANCE) {
                    particleData.numConnections++;
                    particleDataB.numConnections++;

                    const alpha = 1.0 - dist / MAX_DISTANCE;

                    linePositions[vertexpos++] = positionsArray[i * 3];
                    linePositions[vertexpos++] = positionsArray[i * 3 + 1];
                    linePositions[vertexpos++] = positionsArray[i * 3 + 2];

                    linePositions[vertexpos++] = positionsArray[j * 3];
                    linePositions[vertexpos++] = positionsArray[j * 3 + 1];
                    linePositions[vertexpos++] = positionsArray[j * 3 + 2];

                    lineColors[colorpos++] = colorsArray[i * 3] * alpha;
                    lineColors[colorpos++] = colorsArray[i * 3 + 1] * alpha;
                    lineColors[colorpos++] = colorsArray[i * 3 + 2] * alpha;

                    lineColors[colorpos++] = colorsArray[j * 3] * alpha;
                    lineColors[colorpos++] = colorsArray[j * 3 + 1] * alpha;
                    lineColors[colorpos++] = colorsArray[j * 3 + 2] * alpha;

                    numConnected++;
                }
            }
        }

        // Update lines geometry dynamically
        const lineGeom = linesRef.current.geometry;
        lineGeom.setDrawRange(0, numConnected * 2);

        const linePosAttr = lineGeom.attributes.position as THREE.BufferAttribute;
        const lineColorAttr = lineGeom.attributes.color as THREE.BufferAttribute;

        for (let i = 0; i < vertexpos; i++) linePosAttr.array[i] = linePositions[i];
        for (let i = 0; i < colorpos; i++) lineColorAttr.array[i] = lineColors[i];

        linePosAttr.needsUpdate = true;
        lineColorAttr.needsUpdate = true;
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Mouse parallax effect
        const targetX = state.pointer.x * 0.3;
        const targetY = state.pointer.y * 0.3;

        groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
        groupRef.current.position.z += (state.pointer.y * 1 - groupRef.current.position.z) * 0.05;
    });

    return (
        <group ref={groupRef}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[colors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.08}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[lineColors, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.3}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </group>
    );
}

import dynamic from "next/dynamic";

const NetworkBackgroundComponent = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
                <Network />
            </Canvas>
        </div>
    );
};

export default dynamic(() => Promise.resolve(NetworkBackgroundComponent), { ssr: false });

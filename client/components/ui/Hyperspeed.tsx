"use client";

import { useEffect, useRef } from "react";

export const hyperspeedPresets = {
    one: {
        onSpeedUp: () => { },
        onSlowDown: () => { },
        distortion: "turbulentDistortion",
        length: 400,
        roadWidth: 10,
        islandWidth: 2,
        lanesPerRoad: 4,
        fov: 90,
        fovSpeedUp: 150,
        speedUp: 2,
        carLightsFade: 0.4,
        totalSideLightSticks: 20,
        lightPairsPerRoadWay: 40,
        shoulderLinesStripes: 0,
        shoulderLinesWidthPercentage: 0.05,
        brokenLinesWidthPercentage: 0.1,
        brokenLinesLengthPercentage: 0.5,
        lightStickWidth: [0.12, 0.5],
        lightStickHeight: [1.3, 1.7],
        movingAwaySpeed: [60, 80],
        movingCloserSpeed: [-120, -160],
        carLightsLength: [400 * 0.03, 400 * 0.2],
        carLightsRadius: [0.05, 0.14],
        carWidthPercentage: [0.3, 0.5],
        carShiftX: [-0.8, 0.8],
        carFloorSeparation: [0.05, 1],
        colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0x131318,
            brokenLines: 0x131318,
            leftCars: [0xd856c8, 0xf5c900, 0x03b3c2],
            rightCars: [0x03b3c2, 0xf5c900, 0xd856c8],
            sticks: 0x03b3c2,
        },
    },
};

const Hyperspeed = ({ effectOptions = hyperspeedPresets.one }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ref.current || !ctx) return;

        ref.current.appendChild(canvas);
        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        const stars: { x: number; y: number; z: number }[] = [];
        const numStars = 1000;
        const speed = 20;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: (Math.random() - 0.5) * canvas.width * 2,
                y: (Math.random() - 0.5) * canvas.height * 2,
                z: Math.random() * canvas.width,
            });
        }

        const render = () => {
            if (!ctx || !canvas) return;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            stars.forEach((star) => {
                star.z -= speed;
                if (star.z <= 0) {
                    star.z = canvas.width;
                    star.x = (Math.random() - 0.5) * canvas.width * 2;
                    star.y = (Math.random() - 0.5) * canvas.height * 2;
                }

                const k = 128.0 / star.z;
                const px = star.x * k + cx;
                const py = star.y * k + cy;

                const pz = star.z + speed; // previous Z
                const pk = 128.0 / Math.max(pz, 1);
                const ppx = star.x * pk + cx;
                const ppy = star.y * pk + cy;

                if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
                    const size = Math.max((1 - star.z / canvas.width) * 3, 0.5);
                    const shade = Math.floor((1 - star.z / canvas.width) * 255);
                    ctx.strokeStyle = `rgb(${shade},${shade},${shade + 50})`;
                    ctx.lineWidth = size;
                    ctx.beginPath();
                    ctx.moveTo(ppx, ppy);
                    ctx.lineTo(px, py);
                    ctx.stroke();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
            if (ref.current && ref.current.contains(canvas)) {
                ref.current.removeChild(canvas);
            }
        };
    }, []);

    return <div ref={ref} className="fixed inset-0 w-full h-full bg-black z-50 pointer-events-none" />;
};

export default Hyperspeed;

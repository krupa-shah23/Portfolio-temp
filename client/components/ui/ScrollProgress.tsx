"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [percent, setPercent] = useState(0);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setPercent(Math.round(latest * 100));
        });
    }, [scrollYProgress]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center pointer-events-none hidden sm:flex">
            <div className="relative w-16 h-16 flex items-center justify-center">
                {/* Background Track */}
                <svg className="absolute w-full h-full transform -rotate-90">
                    <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-white/10"
                    />
                    {/* Progress Fill */}
                    <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                        style={{ pathLength: scaleY }}
                    />
                </svg>
                <div className="flex flex-col items-center justify-center absolute">
                    <span className="text-[10px] font-bold text-white tracking-wider">{percent}%</span>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowingButton } from "../ui/GlowingButton";
import { ArrowRight } from "lucide-react";

export function Hero() {
    const taglines = [
        "I romanticize debugging more than sleeping.",
        "I build first, panic later, repeat.",
        "I’m half logic, half curiosity, zero chill.",
        "I don’t chase bugs, I hunt them.",
        "I choose neural networks over social networks.",
        "I turn “what if” into “it works.”",
        "I operate in controlled chaos with clean execution.",
        "I break systems just to understand them.",
        "I do engineering, but I make it dramatic.",
        "I’m powered by curiosity and mild academic overachievement.",
        "I have main character energy, just in VS Code.",
        "If it’s complex, I’m already interested.",
    ];

    const keywords = [
        "AI",
        "Neural Networks",
        "Full-Stack",
        "Game Theory",
        "React",
        "Systems",
        "Builder",
        "Curiosity",
        "Problem Solver",
        "Controlled Chaos",
        "LSTM",
        "Main Character Energy",
    ];

    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRoleIndex((prev) => (prev + 1) % taglines.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [taglines.length]);

    return (
        <section id="hero" className="relative min-h-[100vh] flex flex-col justify-center items-center w-full section-padding">
            <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.1em] sm:tracking-[0.15em] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 drop-shadow-lg max-w-full break-words px-2"
                >
                    <span className="block uppercase">KRUPA SHAH</span>

                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 flex flex-col md:flex-row items-center justify-center w-full min-h-[40px] gap-2 md:gap-0"
                >
                    <div className="relative min-h-[60px] sm:min-h-[50px] flex items-center justify-center w-full text-center px-2">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentRoleIndex}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 font-bold text-center w-full px-2 text-[15px] sm:text-[18px] md:text-2xl lg:text-3xl leading-snug whitespace-normal"
                            >
                                {taglines[currentRoleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-row justify-center"
                >
                    <a href="#projects">
                        <GlowingButton variant="primary">
                            View Work <ArrowRight size={18} />
                        </GlowingButton>
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-2 mt-12 max-w-[800px] px-4"
                >
                    {keywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1 text-xs md:text-sm font-medium text-purple-300/80 bg-purple-500/10 border border-purple-500/20 rounded-full tracking-wide">
                            {kw}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Decorative center ambient light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}

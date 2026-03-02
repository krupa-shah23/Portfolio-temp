"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hyperspeed from "./Hyperspeed";

export default function IntroSequence() {
    const [showHyperspeed, setShowHyperspeed] = useState(true);

    useEffect(() => {
        const hyperspeedDuration = 2500; // time flying through space
        const timer = setTimeout(() => {
            setShowHyperspeed(false);
        }, hyperspeedDuration);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {showHyperspeed && (
                <motion.div
                    key="hyperspeed-overlay"
                    initial={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{
                        opacity: 0,
                        filter: "blur(10px)",
                        scale: 1.1
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-black pointer-events-none"
                >
                    <Hyperspeed />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

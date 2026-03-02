"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterEffectProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetweenWords?: number;
}

export function TypewriterEffect({
    words,
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenWords = 2000,
}: TypewriterEffectProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        const currentWord = words[currentWordIndex];

        if (isDeleting) {
            if (currentText.length > 0) {
                timer = setTimeout(() => {
                    setCurrentText(currentWord.substring(0, currentText.length - 1));
                }, deletingSpeed);
            } else {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
        } else {
            if (currentText.length < currentWord.length) {
                timer = setTimeout(() => {
                    setCurrentText(currentWord.substring(0, currentText.length + 1));
                }, typingSpeed);
            } else {
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, delayBetweenWords);
            }
        }

        return () => clearTimeout(timer);
    }, [
        currentText,
        isDeleting,
        currentWordIndex,
        words,
        typingSpeed,
        deletingSpeed,
        delayBetweenWords,
    ]);

    return (
        <span className="inline-flex items-center">
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={currentText}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.5 }}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 font-bold"
                >
                    {currentText}
                </motion.span>
            </AnimatePresence>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-[2px] h-[1em] bg-purple-500 ml-1 inline-block align-middle"
            />
        </span>
    );
}

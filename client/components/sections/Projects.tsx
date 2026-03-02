"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { GlowingButton } from "../ui/GlowingButton";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

export function Projects() {
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        cardsRef.current.forEach((card, index) => {
            if (!card) return;

            gsap.to(card, {
                y: -5, // ±5px floating distance
                duration: 3 + index * 0.5, // different duration for each card for organic feel
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });
    }, []);

    const projects = [
        {
            title: "Bi-Directional Sign Language Translator",
            description: "A bi-directional system for text-to-speech and hand gestures for seamless accessibility using CNN, LSTM, and TensorFlow.",
            tags: ["Python", "TensorFlow", "CNN", "LSTM"],
            link: "https://github.com/krupa-shah23/Bi-directional-Sign-Language-System",
        },
        {
            title: "Game-Theoretic Financial Contagion Simulator",
            description: "Simulates systemic risk by modeling bank-CCP interactions to identify fragile structures and liquidity flow.",
            tags: ["LSTM", "NetworkX", "yfinance"],
            link: "https://datathon-v3btfvnhjftvoa2y5vs2cj.streamlit.app/",
        },
        {
            title: "CultureStack Internal Platform",
            description: "A private platform explicitly featuring an AI multi-persona feedback system (Strategist, Innovator, Risk Evaluator) and an internal podcast hub.",
            tags: ["Next.js", "AI", "Tailwind CSS", "Node.js"],
            link: "https://github.com/krupa-shah23/Culture_Stack",
        },
        {
            title: "Full Stack Social Media Platform",
            description: "Feature-rich social network built with React, Node, and MongoDB supporting real-time engagement and profile management.",
            tags: ["React", "Express", "MongoDB", "Node.js"],
            link: "https://github.com/akrupa-shah23/frontend-ui",
        },
    ];

    return (
        <section id="projects" className="section-padding relative min-h-[100vh] flex flex-col items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full max-w-[1200px] flex flex-col items-center justify-center text-center">
                <SectionHeading title="Featured Work" subtitle="A glimpse into ideas I’ve built and brought to life" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            className="h-full"
                        >
                            <Card className="flex flex-col h-full bg-white/[0.02]" hoverEffect>
                                <div className="p-8 flex flex-col items-center text-center h-full">
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 mb-6 flex-grow">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-500/10 rounded-full border border-purple-500/20"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-auto">
                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                            <GlowingButton variant="outline" className="text-sm px-4 py-2">
                                                View Project <ArrowUpRight size={16} />
                                            </GlowingButton>
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

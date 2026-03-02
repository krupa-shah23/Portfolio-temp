"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { GraduationCap } from "lucide-react";
import gsap from "gsap";

export function About() {
    const educationData = [
        {
            degree: "B.Tech - Computer Engineering",
            duration: "2024–2028",
            institution: "SVKM's Dwarkadas Jivanlal Sanghvi College of Engineering",
            score: "CGPA: 9.55/10.0"
        },
        {
            degree: "Class 12th, HSC Board",
            duration: "2022–2024",
            institution: "Pioneer College of Arts, Commerce and Science",
            score: "Percentage: 82.67%"
        },
        {
            degree: "Class 10th, ICSE Board",
            duration: "2022",
            institution: "Gokuldham High School and Junior College",
            score: "Percentage: 97.8%"
        }
    ];

    const linesRef = useRef<SVGSVGElement>(null);
    const nodesRef = useRef<SVGGElement>(null);

    useEffect(() => {
        if (!linesRef.current || !nodesRef.current) return;

        // Animated glowing lines connecting the cards
        gsap.fromTo(linesRef.current,
            { opacity: 0.3, y: 0 },
            {
                y: 10,
                opacity: 0.8,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

        // Pulsing animation for the nodes along the constellation
        gsap.fromTo(nodesRef.current.children,
            { scale: 0.8, opacity: 0.5, transformOrigin: "center center" },
            {
                scale: 1.5,
                opacity: 1,
                duration: 2,
                stagger: 0.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            }
        );
    }, []);

    return (
        <>
            <section id="about" className="relative min-h-[100vh] w-full flex flex-col items-center justify-center py-24 md:py-32">
                <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full max-w-[1200px] flex flex-col items-center text-center">
                    <SectionHeading
                        title="About Me"
                        hideDecorativeLine
                        className="mb-8"
                    />

                    <div className="max-w-[850px] mx-auto text-xl md:text-[22px] text-gray-300 leading-[1.6] space-y-6 px-4 text-center">
                        <p>
                            I’m a Computer Engineering student at SVKM’s Dwarkadas Jivanlal Sanghvi College of Engineering, currently maintaining a 9.55 CGPA, with a strong focus on building systems that combine technical depth with real-world application.
                        </p>
                        <p>
                            I’ve worked on projects ranging from a bi-directional sign language translation system using CNNs and LSTMs to modeling financial contagion using game theory and network-based simulations. My interests lie at the intersection of intelligent systems, problem-solving, and applied technology.
                        </p>
                        <p>
                            Along the way, I’ve built full-stack platforms and developing a deeper understanding of how algorithms shape real outcomes not just in theory, but in practice.
                        </p>
                        <p className="text-white font-medium text-xl md:text-2xl mt-8">
                            For me, technology isn’t just about using tools it’s about understanding how they work, improving them when they don’t, and building solutions that are both thoughtful and effective.
                        </p>
                    </div>
                </div>
            </section>

            <section id="education" className="relative min-h-[100vh] w-full flex flex-col items-center justify-center py-24 md:py-32">
                <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full max-w-[1400px] flex flex-col items-center text-center">
                    <SectionHeading
                        title="EDUCATION"
                        hideDecorativeLine
                        className="mb-12 tracking-[0.25em] drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                    />

                    {/* SVG background constellation lines connecting the 3 columns */}
                    <div className="absolute top-[120px] left-0 w-full h-[100px] z-0 pointer-events-none hidden md:block">
                        <svg ref={linesRef} viewBox="0 0 1400 100" className="w-full h-full" preserveAspectRatio="none">
                            <path
                                d="M 233 50 L 700 20 L 1166 50"
                                stroke="rgba(168, 85, 247, 0.4)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="8 8"
                                className="drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                            />
                            <g ref={nodesRef}>
                                <circle cx="233" cy="50" r="4" fill="#a855f7" className="drop-shadow-[0_0_8px_#a855f7]" />
                                <circle cx="700" cy="20" r="4" fill="#a855f7" className="drop-shadow-[0_0_8px_#a855f7]" />
                                <circle cx="1166" cy="50" r="4" fill="#a855f7" className="drop-shadow-[0_0_8px_#a855f7]" />
                            </g>
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-10 px-4">
                        {educationData.map((item, index) => (
                            <Card key={index} className="p-8 md:p-10 flex flex-col justify-between items-center text-center gap-6 group bg-white/5 backdrop-blur-[15px] border border-white/10 hover:border-purple-500/50 shadow-[0_4px_30px_rgba(168,85,247,0.1)] hover:shadow-[0_8px_40px_rgba(168,85,247,0.25)] min-h-[320px] transition-all duration-500 w-full" hoverEffect>
                                <div className="flex flex-col items-center w-full gap-4">
                                    <div className="p-5 rounded-full bg-black/40 border border-purple-500/20 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                                        <GraduationCap className="text-purple-400 group-hover:text-purple-300 transition-colors" size={36} />
                                    </div>
                                    <span className="text-purple-300 font-semibold bg-purple-500/10 px-5 py-2 rounded-full text-sm border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)] tracking-wide">
                                        {item.duration}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3 mt-4 w-full">
                                    <h3 className="text-2xl font-bold text-white tracking-wide leading-tight group-hover:text-purple-100 transition-colors">{item.degree}</h3>
                                    <p className="text-gray-300 text-base leading-relaxed">{item.institution}</p>
                                </div>
                                <div className="mt-8 pt-6 w-full border-t border-white/10 flex items-center justify-center flex-1">
                                    <p className="text-purple-200 font-bold text-xl drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">{item.score}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

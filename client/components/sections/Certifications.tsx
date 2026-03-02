"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Award, Briefcase, ExternalLink } from "lucide-react";

export function Certifications() {
    const certs = [
        {
            title: "Full-Stack Web Development",
            issuer: "Edureka",
            date: "Jun 2025 – Oct 2025",
            description: "Awarded 'Certificate for Best Performance' and recognized as an 'Edureka Super Intern' for excellence in modern MERN stack development.",
            icon: <Award size={28} className="text-purple-400" />,
            link: "https://drive.google.com/drive/folders/1Kx8IyhM5pmiDJbM21sR8Boc8UMOpxreF"
        },
        {
            title: "Illuminate Entrepreneurship Bootcamp",
            issuer: "E-cell, IIT Bombay",
            date: "Nov 2024",
            description: "Gained core insights into venture creation, product strategy, and business scaling tech solutions through the 'Illuminate' series.",
            icon: <Briefcase size={28} className="text-purple-400" />,
            link: "https://drive.google.com/file/d/1EuKHVTh2CX1SNA5yvkblCxgf6xHugpyZ/view"
        }
    ];

    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        cardsRef.current.forEach((card) => {
            if (!card) return;

            const xTo = gsap.quickTo(card, "rotateY", { duration: 0.5, ease: "power3" });
            const yTo = gsap.quickTo(card, "rotateX", { duration: 0.5, ease: "power3" });

            const handleMouseMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                // Calculate position from center of card (-1 to 1)
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                // Tilt card towards mouse (max 10 degrees)
                xTo(x * 20);
                yTo(-y * 20);
            };

            const handleMouseLeave = () => {
                xTo(0);
                yTo(0);
            };

            card.addEventListener("mousemove", handleMouseMove);
            card.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                card.removeEventListener("mousemove", handleMouseMove);
                card.removeEventListener("mouseleave", handleMouseLeave);
            };
        });
    }, []);

    return (
        <section id="certifications" className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden py-16 md:py-24 bg-white/[0.01]">
            <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full max-w-[1200px] flex flex-col items-center">

                <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24 px-2 w-full">
                    <h2 className="text-[26px] sm:text-3xl md:text-5xl lg:text-6xl font-bold font-['Syne',sans-serif] tracking-normal sm:tracking-[0.1em] md:tracking-[0.2em] text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] mb-4 uppercase whitespace-nowrap overflow-visible">
                        CERTIFICATIONS
                    </h2>
                </div>

                <div className="relative w-full">
                    {/* Glowing Constellation Line Connector (hidden on small screens) */}
                    <div className="hidden md:block absolute top-[50%] left-[20%] right-[20%] h-[2px] bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.5)] -z-10 translate-y-[-50%]"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 relative z-0 perspective-[1000px]">
                        {certs.map((cert, index) => (
                            <a
                                key={index}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                ref={(el) => {
                                    cardsRef.current[index] = el;
                                }}
                                className="group relative block w-full outline-none transform-style-3d cursor-pointer"
                            >
                                <div className="glass h-full p-8 md:p-10 rounded-2xl bg-black/40 backdrop-blur-[20px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-colors duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] flex flex-col relative overflow-hidden">

                                    {/* Subtle internal gradient glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                    <div className="flex flex-col items-center text-center gap-5 mb-6 relative z-10 w-full">
                                        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)] shrink-0 group-hover:scale-110 transition-transform duration-500">
                                            {cert.icon}
                                        </div>
                                        <div className="w-full flex flex-col items-center">
                                            <h3 className="text-xl md:text-2xl font-bold text-white font-['Syne',sans-serif] leading-tight group-hover:text-purple-300 transition-colors">
                                                {cert.title}
                                            </h3>
                                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 text-sm font-['Plus_Jakarta_Sans',sans-serif] w-full">
                                                <span className="text-gray-300 font-semibold text-center">{cert.issuer}</span>
                                                <span className="hidden sm:block w-1 h-1 rounded-full bg-purple-500/50"></span>
                                                <span className="text-purple-400 font-medium tracking-wide uppercase text-center">{cert.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-base leading-relaxed font-['Plus_Jakarta_Sans',sans-serif] relative z-10 flex-grow text-center">
                                        {cert.description}
                                    </p>

                                    {/* Hover Button */}
                                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                                        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 uppercase tracking-widest opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            View Credential
                                        </span>
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                                            <ExternalLink size={18} className="text-white group-hover:text-purple-300 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

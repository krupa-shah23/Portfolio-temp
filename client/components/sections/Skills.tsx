"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SkillChip } from "../ui/SkillChip";
import { Code, Library, Brain, Layers, Database, Wrench } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const boxesRef = useRef<(HTMLDivElement | null)[]>([]);

    const categories = [
        {
            title: "Programming Languages",
            icon: <Code size={20} className="text-purple-400" />,
            skills: ["Python", "JavaScript", "Java", "C"],
            glowColor: "purple" as const,
        },
        {
            title: "Libraries",
            icon: <Library size={20} className="text-blue-400" />,
            skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "scikit-learn", "TensorFlow", "PyTorch", "Keras", "NetworkX", "yFinance"],
            glowColor: "blue" as const,
        },
        {
            title: "Deep Learning",
            icon: <Brain size={20} className="text-pink-400" />,
            skills: ["CNN (Convolutional Neural Networks)", "LSTM (Long Short-Term Memory Networks)"],
            glowColor: "pink" as const,
        },
        {
            title: "Frameworks",
            icon: <Layers size={20} className="text-cyan-400" />,
            skills: ["Node.js", "Express.js", "React.js", "Next.js", "Three.js", "GSAP", "Streamlit"],
            glowColor: "cyan" as const,
        },
        {
            title: "Databases",
            icon: <Database size={20} className="text-green-400" />,
            skills: ["MySQL", "MongoDB"],
            glowColor: "green" as const,
        },
        {
            title: "Tools",
            icon: <Wrench size={20} className="text-orange-400" />,
            skills: ["Git", "GitHub", "VS Code", "Canva", "Jupyter Notebook"],
            glowColor: "orange" as const,
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const chips = gsap.utils.toArray('.skill-chip') as HTMLElement[];
            if (chips.length > 0) {
                // Initial state
                gsap.set(chips, { autoAlpha: 0, y: 50, scale: 0.8 });

                // Entrance animation
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top 70%",
                    onEnter: () => {
                        gsap.to(chips, {
                            autoAlpha: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            ease: "back.out(1.7)",
                            stagger: {
                                amount: 1.5,
                                from: "random"
                            },
                            onComplete: () => {
                                // Start floating animation after entrance
                                chips.forEach((chip) => {
                                    gsap.to(chip, {
                                        y: `+=${Math.random() * 10 - 5}`,
                                        x: `+=${Math.random() * 10 - 5}`,
                                        duration: 2 + Math.random() * 2,
                                        repeat: -1,
                                        yoyo: true,
                                        ease: "sine.inOut"
                                    });
                                });
                            }
                        });
                    },
                    once: true
                });
            }

            // Box Hover Lift Animations
            boxesRef.current.forEach((box) => {
                if (!box) return;
                const hoverAnim = gsap.to(box, {
                    y: -10,
                    duration: 0.4,
                    ease: "power2.out",
                    paused: true,
                });

                box.addEventListener("mouseenter", () => hoverAnim.play());
                box.addEventListener("mouseleave", () => hoverAnim.reverse());
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Interactive connection lines overlay
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !sectionRef.current) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;

        const resize = () => {
            const rect = sectionRef.current!.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        resize();
        window.addEventListener('resize', resize);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        sectionRef.current.addEventListener('mousemove', handleMouseMove);

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };
        sectionRef.current.addEventListener('mouseleave', handleMouseLeave);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const chips = document.querySelectorAll('.skill-chip');
            const chipPositions: { x: number, y: number }[] = [];

            chips.forEach(chip => {
                const rect = chip.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();
                chipPositions.push({
                    x: rect.left + rect.width / 2 - canvasRect.left,
                    y: rect.top + rect.height / 2 - canvasRect.top
                });
            });

            ctx.lineWidth = 1;

            // Draw lines from mouse to chips
            chipPositions.forEach(pos => {
                const dx = mouseX - pos.x;
                const dy = mouseY - pos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    ctx.beginPath();
                    ctx.moveTo(mouseX, mouseY);
                    ctx.lineTo(pos.x, pos.y);
                    const opacity = 1 - (distance / 200);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.4})`;
                    ctx.stroke();
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            if (sectionRef.current) {
                sectionRef.current.removeEventListener('mousemove', handleMouseMove);
                sectionRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden py-16 md:py-24">
            {/* 3D Polyhedrons drift behind the boxes */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 w-full h-full" />

            <div className="container mx-auto px-4 sm:px-6 relative z-20 w-full max-w-[1200px] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center mb-10 md:mb-16 shrink-0 px-4 w-full">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-['Syne',sans-serif] tracking-[0.1em] sm:tracking-[0.2em] text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] mb-4 uppercase break-words max-w-full">
                        SKILLS
                    </h2>
                </div>

                {/* 3x2 Grid for the glassmorphism boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                boxesRef.current[index] = el;
                            }}
                            className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-[15px] border border-white/5 p-6 md:p-8 group flex flex-col gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform-gpu"
                        >
                            {/* Water-like pulsing animated border overlay */}
                            <div className="absolute inset-[-2px] z-0 opacity-20 group-hover:opacity-60 transition-opacity duration-500 rounded-2xl pointer-events-none water-border"></div>

                            <div className="relative z-10 flex flex-col items-center text-center gap-4 h-full">
                                <div className="flex flex-col items-center justify-center gap-3 border-b border-white/10 pb-3 w-full">
                                    <div className="p-2 rounded-lg bg-white/5 shadow-sm border border-white/5">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-white tracking-wide font-['Syne',sans-serif]">{category.title}</h3>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2 mt-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <SkillChip key={skillIndex} glowColor={category.glowColor}>
                                            {skill}
                                        </SkillChip>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


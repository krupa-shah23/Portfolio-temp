"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const navLinks = [
    { name: "About Me", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Articles & Publications", href: "#publications" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
];

const socialLinks = [
    { name: "GitHub", href: "https://github.com/krupa-shah23", icon: <Github size={20} /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/krupa-shah-885a75279/", icon: <Linkedin size={20} /> },
    {
        name: "Medium", href: "https://medium.com/@krupaashah2006", icon: <span className="font-bold tracking-widest text-[10px] sm:text-xs">MEDIUM</span>
    },
];

export function Navbar() {
    const [activeSection, setActiveSection] = useState("");
    const containerRef = useRef<HTMLElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const socialRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const hoverAnimations = useRef<gsap.core.Tween[]>([]);
    const bobAnimations = useRef<gsap.core.Tween[]>([]);

    useEffect(() => {
        // Intersection Observer for Active Link Group
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, {
            root: null,
            rootMargin: "-20% 0px -79% 0px", // Trigger exactly when section hits top 20%
            threshold: 0
        });

        // Observe all sections defined in navLinks
        navLinks.forEach(link => {
            const id = link.href.substring(1);
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        // Initial bobbing animation
        linksRef.current.forEach((link, index) => {
            if (!link) return;

            // Set initial transform origin for scaling
            gsap.set(link, { transformOrigin: "center center" });

            // Bobbing animation for each link
            const bobAnim = gsap.to(link, {
                y: -6,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.15, // Stagger effect
            });

            bobAnimations.current[index] = bobAnim;

            // Hover animations setup (paused initially)
            const hoverAnim = gsap.to(link, {
                y: -12, // Float upwards
                scale: 1.15, // Increase scale
                color: "#d8b4fe", // light purple
                textShadow: "0px 0px 8px rgba(216, 180, 254, 0.5)",
                duration: 0.4,
                ease: "back.out(1.7)",
                paused: true,
            });

            hoverAnimations.current[index] = hoverAnim;

            const handleMouseEnter = () => {
                bobAnim.pause(); // Stop bobbing
                // Animate from current bobbing position to the hover state
                gsap.to(link, {
                    y: -12,
                    scale: 1.15,
                    color: "#d8b4fe",
                    textShadow: "0px 0px 8px rgba(216, 180, 254, 0.5)",
                    duration: 0.4,
                    ease: "back.out(1.7)",
                });
            };

            const handleMouseLeave = () => {
                // Return back to the normal state but align it to the bobAnim again
                gsap.to(link, {
                    y: bobAnim.vars.y,
                    scale: 1,
                    color: "rgba(255, 255, 255, 0.8)", // Original color
                    textShadow: "none",
                    duration: 0.4,
                    ease: "power2.out",
                    onComplete: () => {
                        bobAnim.play(); // Resume bobbing
                    },
                });
            };

            link.addEventListener("mouseenter", handleMouseEnter);
            link.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                link.removeEventListener("mouseenter", handleMouseEnter);
                link.removeEventListener("mouseleave", handleMouseLeave);
            };
        });

        // Social links hover animation
        socialRefs.current.forEach((link) => {
            if (!link) return;

            const hoverAnim = gsap.to(link, {
                y: -8,
                scale: 1.15,
                color: "#d8b4fe", // light purple glow text color
                boxShadow: "0px 10px 25px rgba(216, 180, 254, 0.6)", // glowing subtle box shadow
                borderColor: "rgba(216, 180, 254, 0.3)",
                duration: 0.3,
                ease: "power2.out",
                paused: true,
            });

            link.addEventListener("mouseenter", () => hoverAnim.play());
            link.addEventListener("mouseleave", () => hoverAnim.reverse());

            return () => {
                link.removeEventListener("mouseenter", () => hoverAnim.play());
                link.removeEventListener("mouseleave", () => hoverAnim.reverse());
            };
        });

        return () => {
            bobAnimations.current.forEach((anim) => anim?.kill());
            observer.disconnect();
        };
    }, []);

    return (
        <nav
            ref={containerRef}
            className="fixed top-0 left-0 right-0 z-50 py-5 w-full bg-black/40 backdrop-blur-md border-b border-white/5 pointer-events-auto shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
        >
            <div className="flex justify-between items-center w-full px-[5vw]">
                <div className="flex-shrink-0">
                    <span className="text-white font-bold tracking-widest text-xl">KS</span>
                </div>

                <div className="hidden md:flex flex-1 justify-center items-center gap-[3.5rem] px-4">
                    {navLinks.map((item, i) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            ref={(el) => {
                                linksRef.current[i] = el;
                            }}
                            className={`font-medium tracking-[0.05em] inline-block drop-shadow-sm whitespace-nowrap text-sm lg:text-base hover:text-white transition-all duration-300 ${activeSection === item.href.substring(1) ? "text-[#d8b4fe] drop-shadow-[0_0_8px_rgba(216,180,254,0.5)] scale-105" : "text-white/80"}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex-shrink-0 flex items-center justify-end space-x-4">
                    {socialLinks.map((item, i) => (
                        <a
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.name}
                            ref={(el) => {
                                socialRefs.current[i] = el;
                            }}
                            className="text-gray-400 transition-colors p-2 rounded-full glass inline-flex items-center justify-center border border-transparent transform-gpu"
                        >
                            {item.icon}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}

"use client";

import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    className?: string;
    hideDecorativeLine?: boolean;
}

export function SectionHeading({
    title,
    subtitle,
    className,
    hideDecorativeLine = false,
}: SectionHeadingProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.fromTo(headingRef.current,
                        { y: -60, opacity: 0, scale: 0.95 },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 0.8,
                            ease: "bounce.out",
                            overwrite: "auto"
                        }
                    );
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={cn("flex flex-col items-center justify-center text-center space-y-4 mb-16", className)}>
            <h2 ref={headingRef} className="text-[22px] sm:text-3xl md:text-5xl font-bold uppercase text-white relative opacity-0 break-words max-w-full whitespace-nowrap">
                <span className="relative z-10">{title}</span>
                {/* Decorative background glow */}
                <span className="absolute -inset-1 z-0 blur-xl opacity-30 bg-purple-600 rounded-full mix-blend-screen" aria-hidden="true" />
            </h2>

            {subtitle && (
                <p className="max-w-2xl text-base sm:text-lg text-gray-400 px-4">
                    {subtitle}
                </p>
            )}

            {/* Decorative line */}
            {!hideDecorativeLine && (
                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-4 opacity-50" />
            )}
        </div>
    );
}

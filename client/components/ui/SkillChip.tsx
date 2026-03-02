"use client";

import { ReactNode, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface SkillChipProps {
    children: ReactNode;
    icon?: ReactNode;
    className?: string;
    glowColor?: "blue" | "purple" | "cyan" | "pink" | "green" | "orange" | "yellow";
}

export function SkillChip({
    children,
    icon,
    className,
    glowColor = "purple",
}: SkillChipProps) {
    const chipRef = useRef<HTMLDivElement>(null);

    const glowVariants: Record<string, string> = {
        blue: "hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:border-blue-500/80",
        purple: "hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:border-purple-500/80",
        cyan: "hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:border-cyan-500/80",
        pink: "hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:border-pink-500/80",
        green: "hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:border-green-500/80",
        orange: "hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:border-orange-500/80",
        yellow: "hover:shadow-[0_0_20px_rgba(234,179,8,0.6)] hover:border-yellow-500/80",
    };

    useEffect(() => {
        const xTo = gsap.quickTo(chipRef.current, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(chipRef.current, "y", { duration: 0.4, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            if (!chipRef.current) return;
            const rect = chipRef.current.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;

            xTo(relX * 0.2); // Magnetic pull
            yTo(relY * 0.2);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        const el = chipRef.current;
        if (el) {
            el.addEventListener("mousemove", handleMouseMove);
            el.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (el) {
                el.removeEventListener("mousemove", handleMouseMove);
                el.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);

    return (
        <div
            ref={chipRef}
            className={cn(
                "skill-chip glass flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer border border-white/10 bg-black/40 hover:scale-110 hover:z-30 relative z-20",
                glowVariants[glowColor],
                className
            )}
        >
            {icon && <span className="text-gray-400">{icon}</span>}
            <span className="text-white whitespace-nowrap">{children}</span>
        </div>
    );
}

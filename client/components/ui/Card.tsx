import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function Card({ children, className, hoverEffect = false }: CardProps) {
    return (
        <div
            className={cn(
                "glass-card relative overflow-hidden transition-all duration-300",
                hoverEffect && "hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(139,92,246,0.3)] hover:border-purple-500/30",
                className
            )}
        >
            <div className="relative z-10">{children}</div>
            {/* Subtle shine effect on hover */}
            {hoverEffect && (
                <div className="absolute inset-0 z-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
            )}
        </div>
    );
}

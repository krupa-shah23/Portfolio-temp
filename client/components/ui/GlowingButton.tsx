import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
}

export function GlowingButton({
    children,
    variant = "primary",
    className,
    ...props
}: ButtonProps) {
    const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-300 rounded-full overflow-hidden group";

    const variants = {
        primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]",
        secondary: "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
        outline: "glass text-white hover:bg-white/10 border border-purple-500/30 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]",
    };

    return (
        <button className={cn(baseStyles, variants[variant], className)} {...props}>
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {/* Glow effect that follows hover */}
            <div className="absolute inset-0 z-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
    );
}

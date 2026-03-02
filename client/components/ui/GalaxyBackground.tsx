"use client";

import { useState } from "react";
import Galaxy from "./Galaxy";

export default function GalaxyBackground() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="absolute inset-0 z-0 pointer-events-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Galaxy
                density={1.2}
                glowIntensity={hovered ? 0.3 : 0.3}
                saturation={0.95}
                hueShift={0}
                twinkleIntensity={0.6}
                rotationSpeed={0.05}
                starSpeed={0.6}
                speed={1}
                mouseRepulsion
                mouseInteraction
                transparent
            />
        </div>
    );
}

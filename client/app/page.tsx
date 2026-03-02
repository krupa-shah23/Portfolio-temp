"use client";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { Publications } from "@/components/sections/Publications";
import { Contact } from "@/components/sections/Contact";
import { FadeIn } from "@/components/ui/FadeIn";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import IntroSequence from "@/components/ui/IntroSequence";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <IntroSequence />

      <ScrollProgress />

      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <Hero />

        {/* Sections with scroll animation wrappers */}
        <FadeIn delay={0.2}>
          <About />
        </FadeIn>

        <FadeIn delay={0.2}>
          <Projects />
        </FadeIn>

        <FadeIn delay={0.2}>
          <Skills />
        </FadeIn>

        <FadeIn delay={0.2}>
          <Certifications />
        </FadeIn>

        <FadeIn delay={0.2}>
          <Publications />
        </FadeIn>

        <FadeIn delay={0.2}>
          <Contact />
        </FadeIn>
      </div>
    </main>
  );
}

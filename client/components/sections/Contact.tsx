"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { GlowingButton } from "../ui/GlowingButton";
import gsap from "gsap";

export function Contact() {
    const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    const successMsgRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // ACTUAL API CALL to your backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setIsSubmitting(false);
                setFormData({ name: "", email: "", message: "" });

                // GSAP Success Animation
                if (successMsgRef.current && formRef.current) {
                    const tl = gsap.timeline();
                    tl.to(formRef.current, { autoAlpha: 0, y: -20, duration: 0.4 })
                        .to(successMsgRef.current, { autoAlpha: 1, y: 0, display: "flex", duration: 0.5 }, "-=0.2")
                        .to(successMsgRef.current, { autoAlpha: 0, y: 20, display: "none", duration: 0.5, delay: 3 })
                        .to(formRef.current, { autoAlpha: 1, y: 0, duration: 0.4 });
                }
            } else {
                alert("Something went wrong. Please try again.");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to connect to the server.");
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        // Initial setup for success message
        if (successMsgRef.current) {
            gsap.set(successMsgRef.current, { autoAlpha: 0, y: 20, display: "none" });
        }

        socialLinksRef.current.forEach((link) => {
            if (!link) return;

            const hoverAnim = gsap.to(link, {
                y: -8, // floats up
                scale: 1.15, // slightly larger
                color: "#d8b4fe", // soft purple text/fill glow
                boxShadow: "0px 10px 25px rgba(216, 180, 254, 0.6)", // soft purple box glow
                borderColor: "rgba(216, 180, 254, 0.3)", // slight border glow
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
    }, []);

    return (
        <section id="contact" className="relative border-t border-white/5 bg-black/50 min-h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center justify-center text-center w-full max-w-[800px] h-full">

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white font-['Syne',sans-serif] tracking-[0.1em] drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] break-words max-w-full px-2">
                    Let's Build the Future
                </h2>
                <p className="text-gray-400 max-w-2xl mb-12 text-base md:text-lg font-['Plus_Jakarta_Sans',sans-serif]">
                    Whether you're looking to integrate AI into your products, build scalable systems, or just want to connect, my inbox is always open.
                </p>

                <div className="w-full relative min-h-[400px]">
                    {/* Success Message Overlay */}
                    <div ref={successMsgRef} className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40 backdrop-blur-sm rounded-2xl border border-purple-500/30 z-20">
                        <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                            <Send size={24} className="text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white font-['Syne',sans-serif] mb-2">Message Received</h3>
                        <p className="text-purple-300 font-['Plus_Jakarta_Sans',sans-serif]">I'll get back to you as soon as possible.</p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="w-full glass bg-black/40 backdrop-blur-[20px] border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col items-center gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-center relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <div className="flex flex-col items-center gap-2">
                                <label htmlFor="name" className="text-sm font-semibold text-gray-300 font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full text-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-colors font-['Plus_Jakarta_Sans',sans-serif]"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-300 font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full text-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-colors font-['Plus_Jakarta_Sans',sans-serif]"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 w-full">
                            <label htmlFor="message" className="text-sm font-semibold text-gray-300 font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider">Message</label>
                            <textarea
                                id="message"
                                rows={5}
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full text-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-colors resize-none font-['Plus_Jakarta_Sans',sans-serif]"
                                placeholder="How can I help you?"
                            ></textarea>
                        </div>

                        <div className="mt-4 w-full flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 rounded-full font-bold uppercase tracking-[0.15em] transition-all duration-300 border border-purple-500/50 text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <span className="animate-pulse">Sending...</span>
                                ) : (
                                    <>
                                        Send <Send size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex justify-center flex-wrap gap-6 mt-20 mb-8 w-full">
                    <a
                        href="https://github.com/krupa-shah23"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full glass hover:bg-white/10 text-gray-400 transition-colors border border-transparent"
                        aria-label="GitHub"
                        ref={(el) => {
                            socialLinksRef.current[0] = el;
                        }}
                    >
                        <Github size={24} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/krupa-shah-885a75279/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full glass hover:bg-white/10 text-gray-400 transition-colors border border-transparent"
                        aria-label="LinkedIn"
                        ref={(el) => {
                            socialLinksRef.current[1] = el;
                        }}
                    >
                        <Linkedin size={24} />
                    </a>
                    <a
                        href="https://medium.com/@krupaashah2006"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full glass hover:bg-white/10 text-gray-400 transition-colors flex items-center justify-center border border-transparent"
                        aria-label="Medium"
                        ref={(el) => {
                            socialLinksRef.current[2] = el;
                        }}
                    >
                        <span className="font-bold tracking-widest text-sm">MEDIUM</span>
                    </a>
                </div>

                <p className="text-sm text-gray-600 font-['Plus_Jakarta_Sans',sans-serif] absolute bottom-8">
                    Designed & Built by Krupa Shah &copy; {new Date().getFullYear()}
                </p>
            </div>
        </section>
    );
}

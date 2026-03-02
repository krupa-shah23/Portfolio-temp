"use client";

import { useEffect } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import gsap from "gsap";

export function Publications() {
    const articles = [
        {
            title: "Inside the Basket: How Data Learns Associations",
            topic: "Concepts of Association Rule Mining",
            date: "JAN 2025",
            link: "https://medium.com/@krupaashah2006/inside-the-basket-how-data-learns-associations-c26928e209b7"
        },
        {
            title: "From Transactions to Trends: The Apriori Algorithm",
            topic: "Workflow with Python implementation",
            date: "JAN 2025",
            link: "https://medium.com/@krupaashah2006/from-transactions-to-trends-the-apriori-algorithm-36075a3e6488"
        },
        {
            title: "Mining Smarter: Understanding the ECLAT Algorithm",
            topic: "Vertical tidset-based mining",
            date: "JAN 2025",
            link: "https://medium.com/@krupaashah2006/mining-smarter-understanding-the-eclat-algorithm-338166d37c74"
        },
        {
            title: "Optimizing Pattern Discovery: The FP-Growth Approach",
            topic: "FP-Tree based scalable mining",
            date: "JAN 2025",
            link: "https://medium.com/@krupaashah2006/optimizing-pattern-discovery-the-fp-growth-approach-92396964dc33"
        }
    ];

    useEffect(() => {
        gsap.fromTo(".article-card",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#publications",
                    start: "top center",
                }
            }
        );
    }, []);

    return (
        <section id="publications" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-10 md:py-20">
            <div className="container mx-auto px-6 relative z-10 w-full max-w-[1100px] flex flex-col items-center">

                <SectionHeading
                    title="ARTICLES & PUBLICATIONS"
                    className="mb-12 tracking-normal sm:tracking-[0.25em] drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] flex flex-col items-center text-center whitespace-nowrap overflow-visible scale-y-100"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {articles.map((article, index) => (
                        <a
                            key={index}
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="article-card block group cursor-pointer w-full"
                        >
                            <Card
                                className="relative p-8 md:p-10 flex flex-col items-center justify-center gap-4 transition-all duration-500 bg-black/40 backdrop-blur-[20px] border border-white/10 rounded-2xl overflow-hidden group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                                hoverEffect={false}
                            >
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight leading-snug mb-4">
                                        {article.title}
                                    </h3>

                                    <div className="flex flex-wrap items-center justify-center gap-3 text-xs mb-6">
                                        <span className="text-purple-400 font-bold bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20 uppercase tracking-tighter">
                                            {article.topic}
                                        </span>
                                        <span className="text-gray-500 font-bold tracking-widest">{article.date}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs font-black text-purple-400 uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                                        Read on Medium <span>&rarr;</span>
                                    </div>
                                </div>
                            </Card>
                        </a>
                    ))}
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
        </section>
    );
}
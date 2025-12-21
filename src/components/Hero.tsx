"use client";

import { motion } from "framer-motion";
import { WakeUpModal } from "./WakeUpModal";
import { ProjectModal } from "./ProjectModal";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AIProject } from "@/lib/types";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const IMAGE_CATEGORIES = {
    ai: [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000", // abstract ai
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000", // neural network
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2000", // robot
    ],
    blockchain: [
        "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2000", // nodes
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000", // crypto art
        "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=2000", // blockchain
    ],
    gaming: [
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2000", // neon game
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2000", // controller
        "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2000", // vr
    ],
    mobile: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000", // phone
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2000", // app ui
    ],
    web: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000", // dashboard
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000", // analytics
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2000", // design
    ],
    default: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000",
    ]
};

function getRelevantImage(title: string, description: string): string {
    const text = (title + " " + description).toLowerCase();

    let pool = IMAGE_CATEGORIES.default;

    if (text.includes("ai") || text.includes("robot") || text.includes("agent") || text.includes("intelligence")) {
        pool = IMAGE_CATEGORIES.ai;
    } else if (text.includes("chain") || text.includes("crypto") || text.includes("web3") || text.includes("token")) {
        pool = IMAGE_CATEGORIES.blockchain;
    } else if (text.includes("game") || text.includes("play") || text.includes("3d") || text.includes("unity")) {
        pool = IMAGE_CATEGORIES.gaming;
    } else if (text.includes("app") || text.includes("mobile") || text.includes("ios") || text.includes("android")) {
        pool = IMAGE_CATEGORIES.mobile;
    } else if (text.includes("web") || text.includes("site") || text.includes("platform") || text.includes("dashboard")) {
        pool = IMAGE_CATEGORIES.web;
    }

    return pool[Math.floor(Math.random() * pool.length)];
}

export function Hero() {
    const [isWakeUpOpen, setIsWakeUpOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<AIProject | null>(null);
    const [prompt, setPrompt] = useState("");
    const [isBuilding, setIsBuilding] = useState(false);
    const [projects, setProjects] = useState<AIProject[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleBuild = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsBuilding(true);

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) throw new Error("Build failed");

            const data = await res.json();

            // Allow animation to play a bit
            await new Promise(r => setTimeout(r, 1500));

            // Handle array of projects
            const newProjects = data.projects.map((p: any, i: number) => ({
                id: Date.now() + i,
                title: p.title || "Generated Project",
                description: p.description || "An AI-generated experiment.",
                url: "http://localhost:3000",
                preview: getRelevantImage(p.title || "", p.description || ""),
                tech_stack: p.tech_stack || ["Next.js", "AI"],
                implementation_plan: p.implementation_plan,
                estimated_time: p.estimated_time
            }));

            setProjects(newProjects);
            setActiveIndex(0);
            setPrompt("");
        } catch (error) {
            console.error(error);
            alert("Build failed. Check console or ensure GEMINI_API_KEY is set.");
        } finally {
            setIsBuilding(false);
        }
    };

    const handleSaveProject = (updatedProject: AIProject) => {
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
        setSelectedProject(updatedProject);
    };

    const currentProject = projects[activeIndex];

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center pt-32 pb-20 overflow-hidden bg-black">
            {/* Fullscreen 3D Background */}
            <div className="absolute inset-0 z-0 opacity-60 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticleField />
                </Canvas>
            </div>

            {/* Grain Overlay */}
            <div className="grain-overlay" />

            <div className="relative z-10 container px-4 flex flex-col items-center text-center max-w-7xl mx-auto h-full">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-hero-vision text-white mb-8 tracking-tighter"
                >
                    Gravity
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="w-full max-w-2xl mb-8 relative"
                >
                    <form onSubmit={handleBuild} className="relative group">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe any project → I’ll build & deploy it in minutes"
                            className="w-full h-16 pl-6 pr-16 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all backdrop-blur-md text-lg"
                        />
                        <button
                            type="submit"
                            disabled={isBuilding || !prompt.trim()}
                            className="absolute right-2 top-2 h-12 w-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                        >
                            {isBuilding ? (
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            )}
                        </button>
                    </form>
                    {isBuilding && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-8 left-0 w-full text-center text-sm text-white/40"
                        >
                            Building...
                        </motion.div>
                    )}
                </motion.div>

                {projects.length > 0 && currentProject && (
                    <motion.div
                        key={currentProject.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-7xl grow flex flex-col justify-center pb-8"
                    >
                        {/* Navigation Controls */}
                        {projects.length > 1 && (
                            <div className="flex items-center justify-between w-full mb-4 px-2">
                                <button
                                    onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                                    disabled={activeIndex === 0}
                                    className="text-white/50 hover:text-white disabled:opacity-20 flex items-center gap-2 transition-colors"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                    Previous Variation
                                </button>
                                <span className="text-sm font-medium text-white/40 uppercase tracking-widest">
                                    Option {activeIndex + 1} of {projects.length}
                                </span>
                                <button
                                    onClick={() => setActiveIndex(prev => Math.min(projects.length - 1, prev + 1))}
                                    disabled={activeIndex === projects.length - 1}
                                    className="text-white/50 hover:text-white disabled:opacity-20 flex items-center gap-2 transition-colors"
                                >
                                    Next Variation
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </button>
                            </div>
                        )}

                        <div className="relative bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 w-full h-[65vh] min-h-[500px]">
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="relative w-full md:w-[45%] h-[40%] md:h-full">
                                    <Image
                                        src={currentProject.preview}
                                        alt={currentProject.title}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-between w-full md:w-[55%] h-[60%] md:h-full bg-white/5 backdrop-blur-md">
                                    <div className="text-left">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 rounded-full bg-white/10 text-sm font-medium text-white/90 border border-white/10">
                                                Generated Result
                                            </span>
                                            {currentProject.estimated_time && (
                                                <span className="text-white/40 text-sm">
                                                    ~{currentProject.estimated_time}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{currentProject.title}</h3>
                                        <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 line-clamp-4 md:line-clamp-6">
                                            {currentProject.description}
                                        </p>
                                        {currentProject.tech_stack && (
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {currentProject.tech_stack.slice(0, 5).map((tech: string, i: number) => (
                                                    <span key={i} className="px-4 py-1.5 rounded-full bg-blue-500/10 text-sm font-medium text-blue-300 border border-blue-500/20">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setSelectedProject(currentProject)}
                                            className="flex-1 h-14 bg-white text-black text-lg font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            View Blueprint
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-8"
                >
                    <button
                        onClick={() => setIsWakeUpOpen(true)}
                        className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2"
                    >
                        View Ecosystem Status ›
                    </button>
                </motion.div>
            </div>

            <WakeUpModal isOpen={isWakeUpOpen} onClose={() => setIsWakeUpOpen(false)} />
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                onSave={handleSaveProject}
            />
        </section>
    );
}

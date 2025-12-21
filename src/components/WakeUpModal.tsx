"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";

type ProjectStatus = "waiting" | "building" | "completed";

interface Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    link?: string;
}

export function WakeUpModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [projects, setProjects] = useState<Project[]>([
        { id: "echo", name: "Echo", description: "Transcription Tool", status: "waiting" },
        { id: "void", name: "Void", description: "Analytics Engine", status: "waiting" },
        { id: "nexus", name: "Nexus", description: "Form Builder", status: "waiting" },
    ]);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const updateStatus = (id: string, status: ProjectStatus) => {
            setProjects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
        };

        if (isOpen && !isFinished) {
            // Simulate build process
            const timeouts: NodeJS.Timeout[] = [];

            // Start Echo
            timeouts.push(setTimeout(() => updateStatus("echo", "building"), 1000));
            timeouts.push(setTimeout(() => updateStatus("echo", "completed"), 4000));

            // Start Void
            timeouts.push(setTimeout(() => updateStatus("void", "building"), 3000));
            timeouts.push(setTimeout(() => updateStatus("void", "completed"), 7000));

            // Start Nexus
            timeouts.push(setTimeout(() => updateStatus("nexus", "building"), 6000));
            timeouts.push(setTimeout(() => updateStatus("nexus", "completed"), 10000));

            // Finish all
            timeouts.push(setTimeout(() => {
                setIsFinished(true);
                // Add links
                setProjects(prev => prev.map(p => ({
                    ...p,
                    link: `https://${p.id}-demo.vercel.app` // Placeholder links
                })));
            }, 11000));

            return () => timeouts.forEach(clearTimeout);
        }
    }, [isOpen, isFinished]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
            >
                <div className="w-full max-w-2xl p-8 text-center">
                    {!isFinished ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-8"
                        >
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold text-white tracking-tight">
                                    Agents are building 3 new projects...
                                </h2>
                                <p className="text-white/50">Estimated time: 15–40 min</p>
                            </div>

                            <div className="space-y-4 max-w-md mx-auto">
                                {projects.map((project) => (
                                    <div key={project.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-left">
                                            <h3 className="font-semibold text-white">{project.name}</h3>
                                            <p className="text-sm text-white/40">{project.description}</p>
                                        </div>
                                        <div>
                                            {project.status === "waiting" && <span className="text-white/20 text-sm">Waiting...</span>}
                                            {project.status === "building" && <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />}
                                            {project.status === "completed" && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-center gap-2 text-amber-400/80 text-sm bg-amber-400/10 py-2 px-4 rounded-full w-fit mx-auto">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Do not refresh the page
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl font-bold text-white tracking-tight">
                                Ecosystem Ready
                            </h2>

                            <div className="grid gap-4 max-w-lg mx-auto">
                                {projects.map((project) => (
                                    <Link
                                        key={project.id}
                                        href={project.link || "#"}
                                        target="_blank"
                                        className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                                    >
                                        <div className="text-left">
                                            <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors">{project.name}</h3>
                                            <p className="text-sm text-white/40">{project.description}</p>
                                        </div>
                                        <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-8 flex justify-center gap-4">
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

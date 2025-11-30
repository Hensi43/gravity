"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star, Code2 } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/github";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative h-full"
        >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-0 blur transition duration-500 group-hover:opacity-30" />

            <div className="relative flex flex-col h-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-primary">
                            <Code2 className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all">
                                {project.name}
                            </h3>
                            <span className="text-xs text-white/40 font-mono">{project.language}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20">
                        <Star className="h-3 w-3 fill-yellow-400" />
                        {project.stargazers_count}
                    </div>
                </div>

                <p className="text-white/60 mb-6 flex-grow line-clamp-3 text-sm leading-relaxed">
                    {project.description || "No description provided."}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.topics?.slice(0, 4).map((topic) => (
                        <span
                            key={topic}
                            className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-white/50 border border-white/5 group-hover:border-white/10 transition-colors"
                        >
                            {topic}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                    <Link
                        href={project.html_url}
                        target="_blank"
                        className="flex-1 inline-flex items-center justify-center gap-2 h-9 text-sm font-medium text-white/80 bg-white/5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <Github className="h-4 w-4" />
                        Code
                    </Link>
                    {project.homepage && (
                        <Link
                            href={project.homepage}
                            target="_blank"
                            className="flex-1 inline-flex items-center justify-center gap-2 h-9 text-sm font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-colors"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

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
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="group relative h-full"
        >
            <div className="glass-panel relative flex flex-col h-full rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-white/10 text-white">
                            <Code2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-white tracking-tight">
                                {project.name}
                            </h3>
                            <span className="text-sm text-white/50 font-medium">{project.language}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-medium text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
                        <Star className="h-4 w-4 fill-white/80" />
                        {project.stargazers_count}
                    </div>
                </div>

                <p className="text-white/70 mb-8 flex-grow line-clamp-3 text-lg leading-relaxed font-light">
                    {project.description || "No description provided."}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {project.topics?.slice(0, 4).map((topic) => (
                        <span
                            key={topic}
                            className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/5"
                        >
                            {topic}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                    <Link
                        href={project.html_url}
                        target="_blank"
                        className="flex-1 inline-flex items-center justify-center gap-2 h-10 text-sm font-medium text-white bg-white/10 rounded-full hover:bg-white hover:text-black transition-all"
                    >
                        <Github className="h-4 w-4" />
                        Code
                    </Link>
                    {project.homepage && (
                        <Link
                            href={project.homepage}
                            target="_blank"
                            className="flex-1 inline-flex items-center justify-center gap-2 h-10 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-all"
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

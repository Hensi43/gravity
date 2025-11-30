"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/github";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-white/10"
        >
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary to-accent opacity-0 blur transition duration-500 group-hover:opacity-20" />

            <div className="relative flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {project.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-white/50 bg-white/5 px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {project.stargazers_count}
                    </div>
                </div>

                <p className="text-white/60 mb-6 flex-grow line-clamp-3">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.topics.map((topic) => (
                        <span
                            key={topic}
                            className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/40 border border-white/5"
                        >
                            #{topic}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 mt-auto">
                    <Link
                        href={project.html_url}
                        target="_blank"
                        className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                    >
                        <Github className="h-4 w-4" />
                        Code
                    </Link>
                    {project.homepage && (
                        <Link
                            href={project.homepage}
                            target="_blank"
                            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Demo
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

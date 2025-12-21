"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Code2, Layers, Edit2, Save, XCircle, Plus, Trash2 } from "lucide-react";
import { AIProject } from "@/lib/types";
import { useState, useEffect } from "react";

interface ProjectModalProps {
    project: AIProject | null;
    isOpen: boolean;
    onClose: () => void;
    onSave?: (project: AIProject) => void;
}

export function ProjectModal({ project, isOpen, onClose, onSave }: ProjectModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProject, setEditedProject] = useState<AIProject | null>(null);

    useEffect(() => {
        setEditedProject(project);
        setIsEditing(false);
    }, [project]);

    if (!project || !editedProject || !isOpen) return null;

    const handleSave = () => {
        if (onSave && editedProject) {
            onSave(editedProject);
            setIsEditing(false);
        }
    };

    const updateField = (field: keyof AIProject, value: any) => {
        setEditedProject(prev => prev ? { ...prev, [field]: value } : null);
    };

    const updateArrayField = (field: 'tech_stack' | 'implementation_plan', index: number, value: string) => {
        setEditedProject(prev => {
            if (!prev) return null;
            const newArray = [...(prev[field] || [])];
            newArray[index] = value;
            return { ...prev, [field]: newArray };
        });
    };

    const addArrayItem = (field: 'tech_stack' | 'implementation_plan') => {
        setEditedProject(prev => {
            if (!prev) return null;
            return { ...prev, [field]: [...(prev[field] || []), ""] };
        });
    };

    const removeArrayItem = (field: 'tech_stack' | 'implementation_plan', index: number) => {
        setEditedProject(prev => {
            if (!prev) return null;
            const newArray = [...(prev[field] || [])];
            newArray.splice(index, 1);
            return { ...prev, [field]: newArray };
        });
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 flex justify-between items-start">
                        <div className="flex-1 mr-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                                    {isEditing ? "Editing Blueprint" : "Generated Blueprint"}
                                </span>
                                {project.estimated_time && (
                                    <span className="text-white/40 text-xs">
                                        ~{project.estimated_time} build
                                    </span>
                                )}
                            </div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedProject.title}
                                    onChange={(e) => updateField('title', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xl font-bold text-white focus:outline-none focus:border-blue-500/50"
                                />
                            ) : (
                                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="p-2 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                                        title="Save Changes"
                                    >
                                        <Save className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                        title="Cancel Edit"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                                    title="Edit Project"
                                >
                                    <Edit2 className="w-5 h-5" />
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors ml-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-8">
                        {/* Description */}
                        <div>
                            {isEditing ? (
                                <textarea
                                    value={editedProject.description}
                                    onChange={(e) => updateField('description', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/70 text-lg leading-relaxed focus:outline-none focus:border-blue-500/50 min-h-[100px]"
                                />
                            ) : (
                                <p className="text-white/70 text-lg leading-relaxed">
                                    {project.description}
                                </p>
                            )}
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-white/90 font-medium">
                                <Layers className="w-4 h-4 text-purple-400" />
                                Technology Stack
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {isEditing ? (
                                    <>
                                        {editedProject.tech_stack.map((tech, i) => (
                                            <div key={i} className="relative group">
                                                <input
                                                    type="text"
                                                    value={tech}
                                                    onChange={(e) => updateArrayField('tech_stack', i, e.target.value)}
                                                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70 focus:outline-none focus:border-purple-500/50 w-32 pr-8"
                                                />
                                                <button
                                                    onClick={() => removeArrayItem('tech_stack', i)}
                                                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-white/20 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => addArrayItem('tech_stack')}
                                            className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300 hover:bg-blue-500/20 transition-colors flex items-center gap-1"
                                        >
                                            <Plus className="w-3 h-3" /> Add
                                        </button>
                                    </>
                                ) : (
                                    project.tech_stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70"
                                        >
                                            {tech}
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Implementation Plan */}
                        {project.implementation_plan && (
                            <div>
                                <div className="flex items-center gap-2 mb-3 text-white/90 font-medium">
                                    <Code2 className="w-4 h-4 text-green-400" />
                                    Implementation Plan
                                </div>
                                <div className="space-y-3">
                                    {isEditing ? (
                                        <>
                                            {editedProject.implementation_plan?.map((step, i) => (
                                                <div key={i} className="flex gap-2 items-start">
                                                    <div className="mt-2.5 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={step}
                                                        onChange={(e) => updateArrayField('implementation_plan', i, e.target.value)}
                                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-green-500/50"
                                                    />
                                                    <button
                                                        onClick={() => removeArrayItem('implementation_plan', i)}
                                                        className="mt-2 p-1.5 rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => addArrayItem('implementation_plan')}
                                                className="w-full py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-sm text-green-400 hover:bg-green-500/20 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Plus className="w-4 h-4" /> Add Step
                                            </button>
                                        </>
                                    ) : (
                                        project.implementation_plan.map((step, i) => (
                                            <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-white/5 border border-white/5">
                                                <div className="mt-0.5 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                </div>
                                                <span className="text-white/70 text-sm">{step}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/5 bg-white/5 flex gap-3">
                        <button
                            disabled
                            className="flex-1 h-12 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                        >
                            Deploy to Production
                            <span className="text-xs font-normal bg-black/10 px-2 py-0.5 rounded-full">Coming Soon</span>
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

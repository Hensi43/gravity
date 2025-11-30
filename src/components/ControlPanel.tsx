"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Play, Upload, Github, ExternalLink, Battery, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogEntry {
    id: number;
    message: string;
    type: "info" | "success" | "warning";
    timestamp: string;
}

interface Agent {
    id: number;
    name: string;
    role: string;
    status: "idle" | "working" | "done";
    task: string;
}

export function ControlPanel({ session }: { session: string }) {
    const [status, setStatus] = useState<"idle" | "running" | "complete">("idle");
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [progress, setProgress] = useState(0);
    const logsEndRef = useRef<HTMLDivElement>(null);

    const [agents, setAgents] = useState<Agent[]>([
        { id: 1, name: "Alpha", role: "Architect", status: "idle", task: "Standby" },
        { id: 2, name: "Beta", role: "Frontend", status: "idle", task: "Standby" },
        { id: 3, name: "Gamma", role: "Backend", status: "idle", task: "Standby" },
        { id: 4, name: "Delta", role: "QA/Test", status: "idle", task: "Standby" },
        { id: 5, name: "Epsilon", role: "Deployer", status: "idle", task: "Standby" },
    ]);

    const [config, setConfig] = useState({
        redesign: true,
        repos: true,
        blog: true,
        screenshots: true,
        lighthouse: true,
        githubTopics: "agentic-ai, nextjs",
        projectCount: 3
    });

    const addLog = (message: string, type: "info" | "success" | "warning" = "info") => {
        const now = new Date();
        const timeString = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setLogs((prev) => [...prev, { id: Date.now(), message, type, timestamp: timeString }]);
    };

    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [logs]);

    const runSimulation = async () => {
        setStatus("running");
        addLog(`Initializing Session: ${session}`, "info");

        const tasks = [
            { msg: "Analyzing design trends...", agent: 1, duration: 1500 },
            { msg: `Fetching top ${config.projectCount} repos...`, agent: 3, duration: 1000 },
            { msg: "Generating assets...", agent: 2, duration: 2000 },
            { msg: "Writing blog post...", agent: 1, duration: 1500 },
            { msg: "Compiling build...", agent: 5, duration: 2500 },
            { msg: "Running audit...", agent: 4, duration: 1500 },
            { msg: "Visual regression...", agent: 4, duration: 1000 },
            { msg: "All tasks completed.", agent: 0, duration: 500 },
        ];

        let currentProgress = 0;
        const step = 100 / tasks.length;

        for (const task of tasks) {
            if (task.agent > 0) {
                setAgents(prev => prev.map(a => a.id === task.agent ? { ...a, status: "working", task: task.msg } : a));
            }

            addLog(task.msg, "info");
            await new Promise(r => setTimeout(r, task.duration));

            if (task.agent > 0) {
                setAgents(prev => prev.map(a => a.id === task.agent ? { ...a, status: "done", task: "Idle" } : a));
            }

            currentProgress += step;
            setProgress(Math.min(currentProgress, 100));
        }

        setStatus("complete");
        addLog("Ready for deployment.", "success");
    };

    const handleDeploy = async () => {
        addLog("Deploying...", "warning");
        await new Promise(r => setTimeout(r, 2000));
        addLog("Deployed successfully.", "success");
        alert("Deployment Successful!");
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-12 font-sans selection:bg-white/20">
            <div className="grain-overlay" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Header / Status Bar */}
                <div className="lg:col-span-12 flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-semibold tracking-tight">Control Center</h1>
                        <p className="text-white/50 mt-1">Session ID: {session.slice(0, 8)}</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/5">
                        <Wifi className="h-4 w-4" />
                        <div className="h-4 w-[1px] bg-white/20" />
                        <span className="text-sm font-medium">{status === 'idle' ? 'Standby' : status === 'running' ? 'Active' : 'Ready'}</span>
                        <div className={`h-2 w-2 rounded-full ${status === 'running' ? 'bg-[#34C759] animate-pulse' : 'bg-white/50'}`} />
                        <Battery className="h-4 w-4 ml-2 opacity-50" />
                    </div>
                </div>

                {/* Left Panel: Configuration & Agents */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass-vision rounded-[32px] p-8">
                        <h2 className="text-xl font-semibold mb-6">Configuration</h2>
                        <div className="space-y-6">
                            {Object.entries(config).map(([key, value]) => {
                                if (key === 'githubTopics' || key === 'projectCount') return null;
                                return (
                                    <div key={key} className="flex items-center justify-between">
                                        <span className="text-lg font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        <button
                                            onClick={() => status === 'idle' && setConfig(prev => ({ ...prev, [key]: !value }))}
                                            className={cn(
                                                "apple-toggle",
                                                value ? "bg-[#34C759]" : "bg-white/20"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5",
                                                    value ? "translate-x-6" : "translate-x-0"
                                                )}
                                            />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {status === 'idle' && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={runSimulation}
                                className="mt-10 w-full h-16 rounded-full bg-white text-black text-xl font-semibold tracking-tight hover:bg-white/90 transition-colors shadow-xl shadow-white/5"
                            >
                                Launch Fleet
                            </motion.button>
                        )}
                    </div>

                    <div className="glass-vision rounded-[32px] p-8">
                        <h2 className="text-xl font-semibold mb-6">Agent Status</h2>
                        <div className="space-y-0 divide-y divide-white/10">
                            {agents.map(agent => (
                                <div key={agent.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("h-2 w-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]",
                                            agent.status === 'working' ? "bg-[#34C759] shadow-[0_0_12px_#34C759]" : "bg-white/20"
                                        )} />
                                        <span className="font-medium text-lg">{agent.name}</span>
                                    </div>
                                    <span className="text-white/50 text-sm">{agent.status === 'working' ? 'Active' : 'Idle'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Logs & Visuals */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="glass-vision rounded-[32px] p-8 min-h-[600px] flex flex-col relative overflow-hidden">

                        {status !== 'complete' ? (
                            <>
                                <div className="flex items-center gap-2 mb-6 opacity-50">
                                    <Terminal className="h-5 w-5" />
                                    <span className="font-mono text-sm">/var/log/system.log</span>
                                </div>
                                <div className="flex-1 font-mono text-sm space-y-3 overflow-y-auto custom-scrollbar pr-4">
                                    <AnimatePresence mode="popLayout">
                                        {logs.map((log) => (
                                            <motion.div
                                                key={log.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex gap-4 border-b border-white/5 pb-2 last:border-0"
                                            >
                                                <span className="text-white/30 w-20 shrink-0">{log.timestamp}</span>
                                                <span className={cn(
                                                    log.type === 'success' ? 'text-[#34C759]' :
                                                        log.type === 'warning' ? 'text-yellow-400' : 'text-white/80'
                                                )}>
                                                    {log.message}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    <div ref={logsEndRef} />
                                </div>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-full text-center"
                            >
                                <div className="h-24 w-24 rounded-full bg-[#34C759]/20 flex items-center justify-center mb-8 backdrop-blur-xl">
                                    <div className="h-12 w-12 rounded-full bg-[#34C759] shadow-[0_0_40px_#34C759]" />
                                </div>
                                <h2 className="text-5xl font-bold tracking-tighter mb-4">System Updated</h2>
                                <p className="text-xl text-white/60 max-w-md mb-12">
                                    All autonomous tasks completed successfully. The system is ready for deployment.
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={handleDeploy}
                                    className="h-16 px-12 rounded-full bg-white text-black text-lg font-semibold tracking-tight hover:bg-white/90 transition-colors shadow-2xl shadow-white/10 flex items-center gap-3"
                                >
                                    <Upload className="h-5 w-5" />
                                    Deploy to Production
                                </motion.button>

                                <div className="mt-12 flex gap-8">
                                    <Link href="https://github.com/Hensi43/gravity" target="_blank" className="text-white/40 hover:text-white transition-colors flex items-center gap-2">
                                        <Github className="h-5 w-5" /> GitHub
                                    </Link>
                                    <Link href="https://gravity-hensi43.vercel.app" target="_blank" className="text-white/40 hover:text-white transition-colors flex items-center gap-2">
                                        <ExternalLink className="h-5 w-5" /> Vercel
                                    </Link>
                                </div>
                            </motion.div>
                        )}

                        {/* Progress Bar */}
                        {status === 'running' && (
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                                <motion.div
                                    className="h-full bg-[#007AFF] shadow-[0_0_20px_#007AFF]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

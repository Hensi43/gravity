"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, CheckCircle2, Circle, Play, Upload, ShieldCheck, Cpu } from "lucide-react";
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
        { id: 1, name: "Alpha", role: "Architect", status: "idle", task: "Waiting for command..." },
        { id: 2, name: "Beta", role: "Frontend", status: "idle", task: "Waiting for command..." },
        { id: 3, name: "Gamma", role: "Backend", status: "idle", task: "Waiting for command..." },
        { id: 4, name: "Delta", role: "QA/Test", status: "idle", task: "Waiting for command..." },
        { id: 5, name: "Epsilon", role: "Deployer", status: "idle", task: "Waiting for command..." },
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
        addLog(`Initializing Control Center Session: ${session}`, "info");
        addLog("Spinning up agent fleet...", "info");

        const tasks = [
            { msg: "Analyzing current design trends (2026)...", agent: 1, duration: 1500 },
            { msg: `Fetching top ${config.projectCount} repos with topics: [${config.githubTopics}]...`, agent: 3, duration: 1000 },
            { msg: "Generating new Hero 3D assets...", agent: 2, duration: 2000 },
            { msg: "Writing blog post: 'The Rise of Self-Replicating Agents'...", agent: 1, duration: 1500 },
            { msg: "Compiling production build...", agent: 5, duration: 2500 },
            { msg: "Running Lighthouse performance audit...", agent: 4, duration: 1500 },
            { msg: "Capturing visual regression screenshots...", agent: 4, duration: 1000 },
            { msg: "All tasks completed successfully.", agent: 0, duration: 500 },
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
        addLog("Fleet execution finished. Ready for deployment.", "success");
    };

    const handleDeploy = async () => {
        addLog("Initiating deployment sequence...", "warning");
        await new Promise(r => setTimeout(r, 2000));
        addLog("Changes committed to git.", "success");
        addLog("Pushed to origin/main.", "success");
        addLog("Vercel deployment triggered.", "success");
        alert("Deployment Successful!");
    };

    return (
        <div className="container mx-auto px-4 py-20 max-w-6xl">
            {/* Grain Overlay */}
            <div className="grain-overlay" />

            <header className="mb-16 flex items-center justify-between relative z-10">
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
                        Control Center
                    </h1>
                    <p className="text-white/50 font-medium text-sm">Session: {session}</p>
                </div>
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                    <div className={`h-2.5 w-2.5 rounded-full ${status === 'running' ? 'bg-green-500 animate-pulse' : 'bg-white/30'}`} />
                    <span className="text-xs font-semibold uppercase tracking-wide text-white">{status === 'idle' ? 'Standby' : status === 'running' ? 'Fleet Active' : 'Ready to Deploy'}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                {/* Left Column: Config & Agents */}
                <div className="space-y-8">
                    {/* Config Panel */}
                    <div className="glass-panel p-8 rounded-3xl">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                            <Cpu className="h-5 w-5 text-primary" />
                            Configuration
                        </h2>
                        <div className="space-y-4">
                            {Object.entries(config).map(([key, value]) => {
                                if (key === 'githubTopics' || key === 'projectCount') return null;

                                return (
                                    <div key={key} className="flex flex-col gap-2">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all duration-300 ${value ? 'bg-primary border-primary' : 'border-white/30 bg-transparent'}`}>
                                                {value && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={value as boolean}
                                                onChange={() => setConfig(prev => ({ ...prev, [key]: !value }))}
                                                className="hidden"
                                                disabled={status !== 'idle'}
                                            />
                                            <span className="text-sm font-medium text-white/70 group-hover:text-white capitalize transition-colors">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        </label>

                                        {/* GitHub Specific Options */}
                                        {key === 'repos' && value && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="pl-8 flex flex-col gap-3"
                                            >
                                                <div>
                                                    <label className="text-xs font-medium text-white/40 mb-1.5 block">Topics</label>
                                                    <input
                                                        type="text"
                                                        value={config.githubTopics}
                                                        onChange={(e) => setConfig(prev => ({ ...prev, githubTopics: e.target.value }))}
                                                        placeholder="e.g. react, ai"
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                        disabled={status !== 'idle'}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-white/40 mb-1.5 block">Count</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        max={6}
                                                        value={config.projectCount}
                                                        onChange={(e) => setConfig(prev => ({ ...prev, projectCount: parseInt(e.target.value) }))}
                                                        className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                        disabled={status !== 'idle'}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {status === 'idle' && (
                            <button
                                onClick={runSimulation}
                                className="mt-8 w-full py-4 rounded-full bg-white text-black font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                <Play className="h-5 w-5 fill-current" />
                                Launch Fleet
                            </button>
                        )}
                    </div>

                    {/* Agent Status */}
                    <div className="space-y-3">
                        {agents.map(agent => (
                            <div key={agent.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${agent.status === 'working' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/10 text-white/40'}`}>
                                        {agent.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm text-white">{agent.name}</div>
                                        <div className="text-xs text-white/40 font-medium">{agent.role}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-xs font-bold tracking-wider mb-1 ${agent.status === 'working' ? 'text-primary' : 'text-white/20'}`}>
                                        {agent.status.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Middle/Right: Logs & Gallery */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Terminal */}
                    <div className="h-[500px] rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl font-mono text-sm p-6 overflow-hidden flex flex-col shadow-2xl">
                        <div className="flex items-center gap-2 text-white/30 mb-4 border-b border-white/5 pb-4">
                            <Terminal className="h-4 w-4" />
                            <span>/var/log/gravity-agent.log</span>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                            {logs.map((log) => (
                                <div key={log.id} className="flex gap-4">
                                    <span className="text-white/20 shrink-0 select-none">[{log.timestamp}]</span>
                                    <span className={cn(
                                        "font-medium",
                                        log.type === 'info' && 'text-white/80',
                                        log.type === 'success' && 'text-green-400',
                                        log.type === 'warning' && 'text-yellow-400'
                                    )}>
                                        {log.type === 'success' && '✔ '}
                                        {log.message}
                                    </span>
                                </div>
                            ))}
                            <div ref={logsEndRef} />
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary shadow-[0_0_10px_rgba(0,122,255,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    {/* Completion Action */}
                    {status === 'complete' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-10 rounded-3xl border border-white/10 bg-white/5 text-center backdrop-blur-md"
                        >
                            <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Mission Accomplished</h3>
                            <p className="text-white/60 mb-8 text-lg font-light">All tasks completed. Visual regression tests passed. Ready to deploy.</p>

                            <div className="grid grid-cols-2 gap-6 mb-10">
                                <div className="aspect-video rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-white/20 font-medium">
                                    Before
                                </div>
                                <div className="aspect-video rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-white/20 font-medium">
                                    After
                                </div>
                            </div>

                            <button
                                onClick={handleDeploy}
                                className="px-10 py-4 rounded-full bg-white text-black font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mx-auto mb-8 shadow-xl shadow-white/10"
                            >
                                <Upload className="h-5 w-5" />
                                Push to GitHub & Deploy
                            </button>

                            <div className="flex items-center justify-center gap-8 text-sm font-medium">
                                <Link
                                    href="https://github.com/Hensi43/gravity"
                                    target="_blank"
                                    className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                                >
                                    <Github className="h-4 w-4" />
                                    <span>github.com/Hensi43/gravity</span>
                                </Link>
                                <Link
                                    href="https://gravity-hensi43.vercel.app"
                                    target="_blank"
                                    className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    <span>gravity-hensi43.vercel.app</span>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

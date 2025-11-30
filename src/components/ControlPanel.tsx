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
        // In a real scenario, this would call /api/deploy
        await new Promise(r => setTimeout(r, 2000));
        addLog("Changes committed to git.", "success");
        addLog("Pushed to origin/main.", "success");
        addLog("Vercel deployment triggered.", "success");
        alert("Deployment Successful!");
    };

    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl">
            <header className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                        Gravity Agent Fleet Control Center
                    </h1>
                    <p className="text-white/50 mt-2 font-mono text-sm">Session: {session}</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <div className={`h-2.5 w-2.5 rounded-full ${status === 'running' ? 'bg-green-500 animate-pulse' : 'bg-white/20'}`} />
                    <span className="text-xs font-mono uppercase">{status === 'idle' ? 'Standby' : status === 'running' ? 'Fleet Active' : 'Ready to Deploy'}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Config & Agents */}
                <div className="space-y-8">
                    {/* Config Panel */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Cpu className="h-5 w-5 text-primary" />
                            Mission Configuration
                        </h2>
                        <div className="space-y-3">
                            {Object.entries(config).map(([key, value]) => {
                                if (key === 'githubTopics' || key === 'projectCount') return null;

                                return (
                                    <div key={key} className="flex flex-col gap-2">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`h-5 w-5 rounded border flex items-center justify-center transition-colors ${value ? 'bg-primary border-primary' : 'border-white/30 bg-transparent'}`}>
                                                {value && <CheckCircle2 className="h-3.5 w-3.5 text-black" />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={value as boolean}
                                                onChange={() => setConfig(prev => ({ ...prev, [key]: !value }))}
                                                className="hidden"
                                                disabled={status !== 'idle'}
                                            />
                                            <span className="text-sm text-white/80 group-hover:text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        </label>

                                        {/* GitHub Specific Options */}
                                        {key === 'repos' && value && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="pl-8 flex flex-col gap-3"
                                            >
                                                <div>
                                                    <label className="text-xs text-white/40 mb-1 block">Filter by Topics (comma separated)</label>
                                                    <input
                                                        type="text"
                                                        value={config.githubTopics}
                                                        onChange={(e) => setConfig(prev => ({ ...prev, githubTopics: e.target.value }))}
                                                        placeholder="e.g. react, ai, 3d"
                                                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary/50"
                                                        disabled={status !== 'idle'}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-white/40 mb-1 block">Project Count</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        max={6}
                                                        value={config.projectCount}
                                                        onChange={(e) => setConfig(prev => ({ ...prev, projectCount: parseInt(e.target.value) }))}
                                                        className="w-20 bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary/50"
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
                                className="mt-6 w-full py-4 rounded-xl bg-primary text-black font-bold text-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <Play className="h-5 w-5 fill-current" />
                                LAUNCH FLEET
                            </button>
                        )}
                    </div>

                    {/* Agent Status */}
                    <div className="space-y-3">
                        {agents.map(agent => (
                            <div key={agent.id} className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${agent.status === 'working' ? 'bg-secondary text-black animate-pulse' : 'bg-white/10 text-white/50'}`}>
                                        {agent.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">{agent.name}</div>
                                        <div className="text-xs text-white/40">{agent.role}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-xs font-mono mb-1 ${agent.status === 'working' ? 'text-secondary' : 'text-white/30'}`}>
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
                    <div className="h-[400px] rounded-2xl border border-white/10 bg-black/80 font-mono text-sm p-4 overflow-hidden flex flex-col">
                        <div className="flex items-center gap-2 text-white/30 mb-2 border-b border-white/5 pb-2">
                            <Terminal className="h-4 w-4" />
                            <span>/var/log/gravity-agent.log</span>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                            {logs.map((log) => (
                                <div key={log.id} className="flex gap-3">
                                    <span className="text-white/30 shrink-0">[{log.timestamp}]</span>
                                    <span className={cn(
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
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
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
                            className="p-8 rounded-2xl border border-green-500/30 bg-green-500/10 text-center"
                        >
                            <h3 className="text-2xl font-bold text-green-400 mb-2">Mission Accomplished</h3>
                            <p className="text-white/60 mb-6">All tasks completed. Visual regression tests passed. Ready to deploy.</p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="aspect-video rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                                    Before
                                </div>
                                <div className="aspect-video rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                                    After
                                </div>
                            </div>

                            <button
                                onClick={handleDeploy}
                                className="px-8 py-4 rounded-xl bg-green-500 text-black font-bold text-lg hover:bg-green-400 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mx-auto mb-6"
                            >
                                <Upload className="h-5 w-5" />
                                PUSH TO GITHUB & DEPLOY
                            </button>

                            <div className="flex items-center justify-center gap-6 text-sm">
                                <Link
                                    href="https://github.com/Hensi43/gravity"
                                    target="_blank"
                                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                                >
                                    <div className="p-2 rounded-full bg-white/10">
                                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </div>
                                    <span>github.com/Hensi43/gravity</span>
                                </Link>
                                <Link
                                    href="https://gravity-hensi43.vercel.app"
                                    target="_blank"
                                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                                >
                                    <div className="p-2 rounded-full bg-white/10">
                                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z" /></svg>
                                    </div>
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

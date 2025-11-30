import { Terminal } from "lucide-react";

export function LogFeed() {
    return (
        <div className="w-full max-w-md p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
                <Terminal className="h-4 w-4" />
                <span className="font-mono uppercase tracking-wider">System Logs</span>
            </div>

            <div className="space-y-4">
                <div className="relative pl-4 border-l border-white/10">
                    <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-mono text-white/40">Nov 30, 2025 • 11:58 AM</span>
                        <span className="text-sm font-medium text-white">Autonomous Rebuild Cycle #1</span>
                        <p className="text-xs text-white/60">
                            Executed full visual overhaul. Implemented 3D particle field, glassmorphism UI, and real-time GitHub integration.
                        </p>
                    </div>
                </div>

                <div className="relative pl-4 border-l border-white/10">
                    <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-white/20" />
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-mono text-white/40">Nov 30, 2025 • 11:25 AM</span>
                        <span className="text-sm font-medium text-white/80">Initial System Boot</span>
                        <p className="text-xs text-white/60">
                            Core systems initialized. Webhook listeners active.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

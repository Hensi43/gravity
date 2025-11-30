"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function WakeUpButton() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleWakeUp = async () => {
        setLoading(true);
        setStatus("idle");

        try {
            const res = await fetch("/api/trigger", {
                method: "POST",
            });

            if (!res.ok) throw new Error("Failed to wake up agent");

            setStatus("success");
            console.log("Agent woken up!");
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setLoading(false);
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <button
            onClick={handleWakeUp}
            disabled={loading}
            className={cn(
                "group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-bold text-black transition-all duration-300 hover:bg-white/90 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed",
                status === "success" && "bg-green-500 text-white hover:bg-green-600",
                status === "error" && "bg-red-500 text-white hover:bg-red-600"
            )}
        >
            <span className="mr-2">
                {loading ? "Transmitting..." : status === "success" ? "Signal Sent" : status === "error" ? "Signal Failed" : "WAKE UP AGENT"}
            </span>
            <Zap className={cn("h-5 w-5 transition-transform", loading && "animate-pulse", !loading && "group-hover:fill-current")} />

            {/* Ripple effect container could go here */}
        </button>
    );
}

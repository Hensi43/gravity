"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function WakeUpButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleWakeUp = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/trigger", {
                method: "POST",
            });

            if (!res.ok) throw new Error("Failed to wake up agent");

            const data = await res.json();

            if (data.status === "control-center-ready" && data.session) {
                // Redirect to the Control Center
                router.push(`/control-center/${data.session}`);
            }

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleWakeUp}
            disabled={loading}
            className={cn(
                "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-bold text-black transition-all duration-300 hover:bg-white/90 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            )}
        >
            <span className="mr-2">
                {loading ? "Connecting..." : "WAKE UP AGENT"}
            </span>
            <Zap className={cn("h-5 w-5 transition-transform", loading && "animate-pulse", !loading && "group-hover:fill-current")} />
        </button>
    );
}

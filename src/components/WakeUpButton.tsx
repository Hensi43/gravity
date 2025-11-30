"use client";

import { useState } from "react";
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
                "group relative inline-flex h-16 items-center justify-center rounded-full bg-white px-12 text-xl font-semibold text-black transition-all duration-300 hover:scale-[1.04] active:scale-[0.96] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
            )}
        >
            <span className="relative z-10">
                {loading ? "Connecting..." : "Wake Up Agent"}
            </span>
        </button>
    );
}

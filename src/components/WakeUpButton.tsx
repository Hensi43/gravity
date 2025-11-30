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
                "group relative inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-lg font-medium text-black transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed border border-transparent hover:border-white/20"
            )}
        >
            <span className="relative z-10">
                {loading ? "Connecting..." : "Wake Up Agent"}
            </span>
        </button>
    );
}

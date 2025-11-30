"use client";

import { RefreshCw } from "lucide-react";

export function RefreshButton() {
    return (
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh System</span>
        </button>
    );
}

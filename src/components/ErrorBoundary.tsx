"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-red-500">System Malfunction</h2>
                    <p className="text-white/60 mb-8 max-w-md">
                        The gravity field has encountered a critical anomaly.
                        Our autonomous agents have been notified.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        Reinitialize System
                    </button>
                    {process.env.NODE_ENV === 'development' && (
                        <pre className="mt-8 p-4 bg-red-900/20 rounded text-left text-xs text-red-300 overflow-auto max-w-2xl">
                            {this.state.error?.toString()}
                        </pre>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

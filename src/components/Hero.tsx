"use client";

import { motion } from "framer-motion";
import { WakeUpButton } from "./WakeUpButton";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black pt-20">
            {/* Grain Overlay */}
            <div className="grain-overlay" />

            <div className="relative z-10 container px-4 md:px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple spring ease
                    className="text-hero text-white mb-6 tracking-tight"
                >
                    Gravity
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-subhead text-white/80 mb-12 max-w-2xl"
                >
                    The portfolio. Reimagined.
                    <br />
                    <span className="text-white/50">Autonomous. Intelligent. Eternal.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-6"
                >
                    <WakeUpButton />

                    <Link
                        href="/control-center/latest"
                        className="text-sm text-primary hover:underline underline-offset-4 transition-all"
                    >
                        View Last Rebuild Log ›
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.cjs";
import { motion } from "framer-motion";
import { ArrowRight, Github, Twitter } from "lucide-react";
import Link from "next/link";
import { WakeUpButton } from "./WakeUpButton";

function ParticleField(props: any) {
    const ref = useRef<any>(null);
    const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }), []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#a855f7"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticleField />
                </Canvas>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 container px-4 md:px-6 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="tracking-wide text-xs font-mono uppercase">System Online</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20"
                >
                    GRAVITY
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="max-w-2xl text-lg md:text-xl text-white/60 mb-10 leading-relaxed font-light"
                >
                    The portfolio that rebuilds itself.
                    <br />
                    <span className="text-primary">Autonomous. Agentic. Eternal.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-5 items-center"
                >
                    <Link
                        href="#projects"
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        <span className="mr-2">Explore Work</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <WakeUpButton />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-16 flex gap-8 text-white/30"
                >
                    <Github className="h-6 w-6 hover:text-white hover:scale-110 transition-all cursor-pointer" />
                    <Twitter className="h-6 w-6 hover:text-white hover:scale-110 transition-all cursor-pointer" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-8"
                >
                    <Link href="/control-center/latest" className="text-xs text-white/20 hover:text-white/60 transition-colors font-mono uppercase tracking-widest">
                        View Last Rebuild Log →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

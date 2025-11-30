"use client";

import { motion } from "framer-motion";
import { WakeUpButton } from "./WakeUpButton";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { useState, useRef } from "react";

function ParticleField(props: any) {
    const ref = useRef<any>();
    const [sphere] = useState(() => random.inSphere(new Float32Array(8000), { radius: 2.5 }));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
}

export function Hero() {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Fullscreen 3D Background */}
            <div className="absolute inset-0 z-0 opacity-60">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticleField />
                </Canvas>
            </div>

            {/* Grain Overlay */}
            <div className="grain-overlay" />

            <div className="relative z-10 container px-4 flex flex-col items-center text-center max-w-6xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-hero-vision text-white mb-8 tracking-tighter"
                >
                    Gravity
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl md:text-3xl text-white/70 mb-16 font-medium max-w-3xl leading-relaxed"
                >
                    Autonomous. Intelligent. <span className="text-white">Eternal.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-8"
                >
                    <WakeUpButton />

                    <Link
                        href="/control-center/latest"
                        className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                        View Last Session ›
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

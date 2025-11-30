"use client";

import { motion } from "framer-motion";
import { WakeUpModal } from "./WakeUpModal";
import Link from "next/link";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef } from "react";

// function ParticleField(props: any) {
//     const ref = useRef<any>(null);
//     const [sphere] = useState(() => {
//         const count = 6000;
//         const data = new Float32Array(count);
//         const radius = 2.5;
//
//         for (let i = 0; i < count; i += 3) {
//             const r = Math.cbrt(Math.random()) * radius;
//             const theta = Math.random() * 2 * Math.PI;
//             const phi = Math.acos(2 * Math.random() - 1);
//
//             const x = r * Math.sin(phi) * Math.cos(theta);
//             const y = r * Math.sin(phi) * Math.sin(theta);
//             const z = r * Math.cos(phi);
//
//             data[i] = isNaN(x) ? 0 : x;
//             data[i + 1] = isNaN(y) ? 0 : y;
//             data[i + 2] = isNaN(z) ? 0 : z;
//         }
//         return data;
//     });
//
//     useFrame((state, delta) => {
//         if (ref.current) {
//             ref.current.rotation.x -= delta / 15;
//             ref.current.rotation.y -= delta / 20;
//         }
//     });
//
//     return (
//         <group rotation={[0, 0, Math.PI / 4]}>
//             <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
//                 <PointMaterial
//                     transparent
//                     color="#ffffff"
//                     size={0.003}
//                     sizeAttenuation={true}
//                     depthWrite={false}
//                     opacity={0.4}
//                 />
//             </Points>
//         </group>
//     );
// }

export function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Fullscreen 3D Background */}
            {/* Fullscreen 3D Background - Disabled for stability */}
            <div className="absolute inset-0 z-0 opacity-60 bg-gradient-to-b from-black via-purple-900/20 to-black">
                {/* <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticleField />
                </Canvas> */}
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
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative inline-flex h-16 items-center justify-center rounded-full bg-white px-12 text-xl font-semibold text-black transition-all duration-300 hover:scale-[1.04] active:scale-[0.96] shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
                    >
                        <span className="relative z-10">Wake Up Agent</span>
                    </button>

                    <Link
                        href="/control-center/latest"
                        className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                        View Last Session ›
                    </Link>
                </motion.div>
            </div>

            <WakeUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}

"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type * as THREE from "three";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ParticleField(props: any) {
    const ref = useRef<THREE.Points>(null);
    const [sphere] = useState(() => {
        const count = 6000;
        const data = new Float32Array(count * 3); // stride=3 * count
        const radius = 2.5;

        for (let i = 0; i < count; i++) {
            const r = Math.cbrt(Math.random()) * radius;
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            const idx = i * 3;
            data[idx] = isNaN(x) ? 0 : x;
            data[idx + 1] = isNaN(y) ? 0 : y;
            data[idx + 2] = isNaN(z) ? 0 : z;
        }
        return data;
    });

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

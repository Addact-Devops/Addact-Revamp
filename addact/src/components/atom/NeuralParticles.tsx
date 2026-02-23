"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

interface NeuralParticlesProps {
    count?: number;
    className?: string;
    color?: string;
    lineColor?: string;
    connectDistance?: number;
}

export default function NeuralParticles({
    count = 55,
    className,
    color = "100, 120, 255",
    lineColor = "80, 100, 255",
    connectDistance = 130,
}: NeuralParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Respect reduced motion
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let W = canvas.offsetWidth;
        let H = canvas.offsetHeight;
        canvas.width = W;
        canvas.height = H;

        const particles: Particle[] = Array.from({ length: count }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            size: Math.random() * 1.8 + 1.2,
            opacity: Math.random() * 0.5 + 0.4,
        }));

        let raf: number;

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // Move particles
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < connectDistance) {
                        const alpha = (1 - dist / connectDistance) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }

            // Draw particles + glow
            particles.forEach((p) => {
                // Outer glow
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
                grad.addColorStop(0, `rgba(${color}, ${p.opacity * 0.5})`);
                grad.addColorStop(1, `rgba(${color}, 0)`);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
                ctx.fill();
            });

            raf = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            W = canvas.offsetWidth;
            H = canvas.offsetHeight;
            canvas.width = W;
            canvas.height = H;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", handleResize);
        };
    }, [count, color, lineColor, connectDistance]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full ${className ?? ""}`}
            style={{ pointerEvents: "none" }}
        />
    );
}

"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    originX: number;
    originY: number;
}

interface NeuralParticlesProps {
    count?: number;
    className?: string;
    color?: string;
    lineColor?: string;
    connectDistance?: number;
    interactive?: boolean;
}

export default function NeuralParticles({
    count = 55,
    className,
    color = "100, 120, 255",
    lineColor = "80, 100, 255",
    connectDistance = 130,
    interactive = true,
}: NeuralParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let W = canvas.offsetWidth;
        let H = canvas.offsetHeight;
        canvas.width = W;
        canvas.height = H;

        const particles: Particle[] = Array.from({ length: count }, () => {
            const x = Math.random() * W;
            const y = Math.random() * H;
            return {
                x,
                y,
                originX: x,
                originY: y,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 1.5 + 1,
                opacity: Math.random() * 0.4 + 0.3,
            }
        });

        let raf: number;

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            particles.forEach((p) => {
                // Natural movement
                p.x += p.vx;
                p.y += p.vy;

                // Mouse Interaction
                if (interactive && mx > 0 && my > 0) {
                    const dx = mx - p.x;
                    const dy = my - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 200;

                    if (dist < maxDist) {
                        const force = (maxDist - dist) / maxDist;
                        p.x -= dx * force * 0.03;
                        p.y -= dy * force * 0.03;
                    }
                }

                // Bound check
                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;
            });

            // Connections
            ctx.lineWidth = 0.6;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < connectDistance * connectDistance) {
                        const dist = Math.sqrt(distSq);
                        const alpha = (1 - dist / connectDistance) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
                        ctx.stroke();
                    }
                }
            }

            // Particles
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
                ctx.fill();

                // Subtle glow for active-ish particles
                if (interactive) {
                    const dmx = mouseRef.current.x - p.x;
                    const dmy = mouseRef.current.y - p.y;
                    const dist = Math.sqrt(dmx * dmx + dmy * dmy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${color}, ${(1 - dist/100) * 0.2})`;
                        ctx.fill();
                    }
                }
            });

            raf = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        draw();

        const handleResize = () => {
            W = canvas.offsetWidth;
            H = canvas.offsetHeight;
            canvas.width = W;
            canvas.height = H;
        };

        window.addEventListener("resize", handleResize);
        if (interactive) {
            window.addEventListener("mousemove", handleMouseMove);
            canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [count, color, lineColor, connectDistance, interactive]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full ${className ?? ""}`}
            style={{ pointerEvents: "none" }}
        />
    );
}

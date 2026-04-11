"use client";

import { useEffect, useRef } from "react";

export default function DragonTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      time += 0.003;
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);

      // Create flowing red hue orbs
      const orbs = [
        { x: width * 0.2, y: height * 0.3, r: 300, phase: 0 },
        { x: width * 0.7, y: height * 0.6, r: 350, phase: 1.5 },
        { x: width * 0.5, y: height * 0.8, r: 280, phase: 3 },
        { x: width * 0.85, y: height * 0.2, r: 250, phase: 4.5 },
      ];

      orbs.forEach((orb) => {
        const ox = orb.x + Math.sin(time + orb.phase) * 80;
        const oy = orb.y + Math.cos(time * 0.7 + orb.phase) * 60;

        const gradient = ctx.createRadialGradient(
          ox, oy, 0,
          ox, oy, orb.r
        );

        gradient.addColorStop(0, "rgba(180, 35, 24, 0.06)");
        gradient.addColorStop(0.4, "rgba(140, 20, 15, 0.03)");
        gradient.addColorStop(1, "rgba(140, 20, 15, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Add secondary deep crimson layer
      const secondary = [
        { x: width * 0.4, y: height * 0.15, r: 400, phase: 2 },
        { x: width * 0.9, y: height * 0.7, r: 320, phase: 0.5 },
      ];

      secondary.forEach((orb) => {
        const ox = orb.x + Math.cos(time * 0.5 + orb.phase) * 100;
        const oy = orb.y + Math.sin(time * 0.6 + orb.phase) * 70;

        const gradient = ctx.createRadialGradient(
          ox, oy, 0,
          ox, oy, orb.r
        );

        gradient.addColorStop(0, "rgba(120, 15, 10, 0.04)");
        gradient.addColorStop(0.5, "rgba(80, 10, 8, 0.02)");
        gradient.addColorStop(1, "rgba(80, 10, 8, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}

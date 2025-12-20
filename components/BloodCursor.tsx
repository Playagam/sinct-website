"use client";

import { useEffect } from "react";

export default function BloodCursor() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let particles: any[] = [];

    const addParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        r: Math.random() * 6 + 2,
        alpha: 1,
        dx: (Math.random() - 0.5) * 1,
        dy: Math.random() * 1.5 + 0.5
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.02;

        ctx.beginPath();
        ctx.fillStyle = `rgba(150,0,0,${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.alpha <= 0) particles.splice(i, 1);
      });

      requestAnimationFrame(draw);
    };
    draw();

    const onMove = (e: MouseEvent) => {
      addParticle(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}

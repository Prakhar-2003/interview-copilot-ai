"use client";

import { useEffect, useRef, useState } from "react";

const logos = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
];

export default function AnimatedBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const [logoState, setLogoState] = useState<any[]>([]);

  // INIT LOGOS (🔥 SPEED REDUCED ONLY HERE)
  useEffect(() => {
    const newLogos = logos.map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() * 0.15 + 0.08) * (Math.random() > 0.5 ? 1 : -1),
      vy: (Math.random() * 0.15 + 0.08) * (Math.random() > 0.5 ? 1 : -1),
    }));

    setLogoState(newLogos);
  }, []);

  // PARTICLES (UNCHANGED)
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 0.4 - 0.2,
      vy: Math.random() * 0.4 - 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(120,130,150,0.6)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(120,130,150,0.25)";
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // MOVE LOGOS (UNCHANGED)
  useEffect(() => {
    let frame: number;

    const move = () => {
      setLogoState((prev) =>
        prev.map((logo, i) => {
          let { x, y, vx, vy } = logo;

          let nextX = x + vx;
          let nextY = y + vy;

          if (nextX <= 0 || nextX >= window.innerWidth - 60) vx *= -1;
          if (nextY <= 0 || nextY >= window.innerHeight - 60) vy *= -1;

          nextX = x + vx;
          nextY = y + vy;

          // COLLISION AVOIDANCE
          prev.forEach((other, j) => {
            if (i !== j) {
              const dist = Math.hypot(nextX - other.x, nextY - other.y);

              if (dist < 70) {
                vx += (nextX - other.x) * 0.02;
                vy += (nextY - other.y) * 0.02;
              }
            }
          });

          return { x: nextX, y: nextY, vx, vy };
        })
      );

      frame = requestAnimationFrame(move);
    };

    move();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="fixed inset-0 z-0">

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {logoState.map((logo, i) => (
        <img
          key={i}
          src={logos[i]}
          style={{
            transform: `translate(${logo.x}px, ${logo.y}px)`,
          }}
          className="fixed w-20 opacity-50 pointer-events-none"
        />
      ))}
    </div>
  );
}
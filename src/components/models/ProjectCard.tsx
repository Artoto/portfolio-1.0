"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

interface Project {
  title: string;
  subtitle: string;
  href: string;
  cover: string; // .mp4 หรือ .m3u8 ก็ได้
  tags: string[];
}

// Small util for clsx-like merging
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const ProjectCard: React.FC<{
  p: Project;
}> = ({ p }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  // Track raw mouse x/y within the container
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Smooth it with springs for a subtle lag effect
  const x = useSpring(mx, { stiffness: 250, damping: 25, mass: 0.6 });
  const y = useSpring(my, { stiffness: 250, damping: 25, mass: 0.6 });

  // Extra little scale/opacity mapping based on hover state
  const scale = useTransform(x, () => (hovered ? 1 : 0.6));
  const opacity = useTransform(x, () => (hovered ? 1 : 0));

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    mx.set(cx);
    my.set(cy);
  }

  // Store timeout reference
  const touchTimeout = useRef<number>(0);

  function onTouch(e: React.TouchEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const t = e.touches[0];
    const cx = t.clientX - rect.left;
    const cy = t.clientY - rect.top;
    mx.set(cx);
    my.set(cy);
    setHovered(true);
    // Auto-hide shortly after touch so it works nicely on mobile
    window.clearTimeout(touchTimeout.current);
    touchTimeout.current = window.setTimeout(() => setHovered(false), 900);
  }

  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div
        ref={containerRef}
        className={cx(
          "relative mt-5 aspect-square overflow-clip rounded-2xl group p-[60px_10px_60px_10px] bg-[url('/image/bg-video.jpg')] bg-no-repeat bg-cover bg-center bg-fixed "
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={onMove}
        onTouchStart={onTouch}
        onTouchMove={onTouch}
        style={{ aspectRatio: 16 / 9 }}
      >
        <div className="relative z-10 aspect-[4/3] w-full overflow-clip rounded-xl">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/20">
            <VideoPlayer
              src={p.cover} // ใช้ mp4 ที่มี หรือจะชี้ .m3u8 ก็ได้
              aspectRatio="4 / 3"
              className="!h-auto !w-auto transition-transform duration-500 group-hover:scale-[1.03]"
              preload="none"
              muted
              loop
              autoPlay
              controls={false}
            />
          </div>
        </div>

        {/* hover cursor badge */}
        <motion.div
          aria-hidden
          className="z-50 pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-transparent backdrop-blur-sm shadow-lg flex items-center justify-center text-sm font-semibold text-gray-400"
          style={{
            left: x,
            top: y,
            width: 96,
            height: 96,
            opacity,
            scale,
          }}
        >
          <span>View</span>
        </motion.div>
      </div>

      <div className="flex flex-col justify-between lg:flex-row">
        <div className="flex flex-col ">
          <span className="font-mono  font-medium">{p.subtitle}</span>
          <div className="w-fit font-semibold ">
            <h3 className="font-mono">{p.title}</h3>
          </div>
        </div>
        <div className="flex items-end gap-3 tracking-base">
          {p.tags.map((t, i) => (
            <span key={i} className={cx("tag")}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;

"use client";

import React, { useEffect, useRef, useState } from "react";
import StickyCounter from "../models/StickyCounter";
import ProjectCard from "../models/ProjectCard";

const projects = [
  {
    id: 1,
    title: "Color Palette",
    subtitle: "Color Palette Generator Web Apps. ",
    tags: ["Development", "2025"],
    href: "https://color-palette-generator-inky.vercel.app/",
    playbackId: "QpLBMxnNQMQHXri9nqPfg1nZLyJn5kg01vXlmX1auvEc1",
    cover: "/video/color-palette-generator.mp4",
  },
  {
    id: 2,
    title: "Animation Guide",
    subtitle: "Animation Guide Web Apps.",
    tags: ["NestJS", "Development", "2025"],
    href: "https://animation-guide-wheat.vercel.app/",
    playbackId: "QpLBMxnNQMQHXri9nqPfg1nZLyJn5kg01vXlmX1auvEc2",
    cover: "/video/animation-guide.mp4",
  },
  {
    id: 3,
    title: "Character Generator",
    subtitle: "Character Generator Web Apps.",
    tags: ["NestJS", "API Google"],
    href: "https://character-generator-zeta.vercel.app/",
    playbackId: "QpLBMxnNQMQHXri9nqPfg1nZLyJn5kg01vXlmX1auvEc3",
    cover: "/video/character-generator.mp4",
  },
  {
    id: 4,
    title: "ai-coach-system",
    subtitle: "AI Coach System Web Apps.",
    tags: ["Prototype", "NextJS", "ollama", "NodeJS", "Python"],
    href: "",
    playbackId: "QpLBMxnNQMQHXri9nqPfg1nZLyJn5kg01vXlmX1auvEc4",
    cover: "/video/ai-coach-system.mp4",
  },
  {
    id: 5,
    title: "Git Action CI/CD",
    subtitle:
      "Git Action CI/CD website and API, build docker image to docker hub and depoly to AWS-Cloud",
    tags: ["ReactJS", "NodeJS", "daisyui", "AWS", "Dockern"],
    href: "",
    playbackId: "QpLBMxnNQMQHXri9nqPfg1nZLyJn5kg01vXlmX1auvEc5",
    cover: "/video/react-to-CI-CD-.mp4",
  },
];

const ProjectSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // IntersectionObserver to keep the left counter in sync with the project in view
  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // choose the most visible card
        const vis = entries
          .map((e) => ({
            idx: Number(e.target.getAttribute("data-index")),
            r: e.intersectionRatio,
          }))
          .sort((a, b) => b.r - a.r)[0];
        if (vis && vis.idx !== activeIndex) setActiveIndex(vis.idx);
      },
      { root: null, threshold: [0.25, 0.5, 0.75] }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [activeIndex]);

  return (
    <section id="works" className="mb-52" ref={sectionRef}>
      <div className="max-w-7xl w-full mx-auto flex flex-col items-start justify-center min-h-screen p-6 text-gray-400 text-left gap-10">
        {/* Header */}
        <div className="flex flex-col gap-30 md:gap-40 w-full">
          <h1 className="relative text-4xl font-bold leading-none md:text-8xl">
            SELECTED WORKS
          </h1>
          <div className="grid-gap flex grid-cols-12 sm:justify-end lg:grid">
            <div className="col-span-7 col-start-1 flex flex-col  sm:col-start-6 sm:flex-row gap-5">
              <span className="flex h-full text-nowrap font-medium uppercase">
                (PROJECTS)
              </span>
              <p className="w-full max-w-[35ch] text-balance text-2xl font-medium">
                {`Thoughtfully crafted digital experiences that blend utility and
                aesthetics into something functional, memorable, and refined.`}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="grid-gap grid grid-cols-12 w-full">
          {/* Sticky number */}
          <div className="col-span-5">
            <StickyCounter activeIndex={activeIndex} count={projects.length} />
          </div>

          {/* Projects list */}
          <aside className="relative col-span-12 flex flex-col md:col-span-7 ">
            {projects.map((p, idx) => (
              <div
                key={p.id}
                data-index={idx}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className="@container"
              >
                <ProjectCard p={p} />
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;

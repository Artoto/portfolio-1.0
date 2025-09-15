"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import HeroSection from "./HeroSection";
import AboutMeSection from "./AboutMeSection";
import TechStackPage from "./StackSection";
import ProjectSection from "./ProjectSection";
import ExperienceSection from "./Experience";
import Footer from "@/components/layout/Footer";

export default function ScrollLinked() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Vertical scroll indicator at right side */}
      <div className="fixed top-[50svh] right-[2%] -translate-y-1/2 w-1.5 h-[100px] rounded-full bg-background-light overflow-hidden">
        <motion.div
          id="scroll-indicator"
          style={{
            scaleY: scrollYProgress,
            position: "fixed",
            width: "6px",
            height: "100px",
            originY: 0,
            borderRadius: "4px",
            backgroundColor: "#a342f1",
          }}
        />
      </div>
      <div className="flex flex-col gap-7 bg-gradient-to-b from-slate-900 via-black to-slate-800">
        <HeroSection />
        <AboutMeSection />
        <TechStackPage />
        <ProjectSection />
        <ExperienceSection />
        <Footer />
      </div>
    </>
  );
}

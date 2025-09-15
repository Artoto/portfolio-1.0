"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  duration: string;
  details: string[];
}

const ExperienceCard: React.FC<{
  experience: ExperienceItem;
  index: number;
}> = ({ experience, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-12 relative"
      onMouseEnter={() => {
        setIsHovered(true);
        setShowDetails(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowDetails(false);
      }}
    >
      {/* Company Name */}
      <motion.div
        className="text-gray-400  mb-2 font-medium"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
      >
        {experience.company}
      </motion.div>

      {/* Position Title with Hover Effect */}
      <div className="relative mb-3 inline-block overflow-hidden">
        <motion.h3
          className="text-4xl md:text-5xl font-bold cursor-pointer relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
        >
          {/* Original white text */}
          <span className="relative z-20 text-white transition-colors duration-400">
            {experience.position}
          </span>

          {/* Green text overlay that slides in */}
          <motion.span
            className="absolute top-0 left-0 z-30 text-purple-400 whitespace-nowrap overflow-hidden"
            initial={{ width: 0 }}
            animate={{
              width: isHovered ? "100%" : 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            {experience.position}
          </motion.span>
        </motion.h3>

        {/* Green sliding background effect */}
        <motion.div
          className="absolute inset-0 bg-purple-500/10 -z-10"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{
            scaleX: isHovered ? 1 : 0,
            transition: { duration: 0.4, ease: "easeOut", delay: 0.1 },
          }}
        />
      </div>

      {/* Duration */}
      <motion.div
        className="text-gray-400  mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
      >
        {experience.duration}
      </motion.div>

      {/* Detailed Content - Hidden by default */}
      <motion.div
        initial={{ opacity: 0, height: 0, y: -20 }}
        animate={{
          opacity: showDetails ? 1 : 0,
          height: showDetails ? "auto" : 0,
          y: showDetails ? 0 : -20,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <ul className="space-y-2 mt-4">
          {experience.details.map((detail, detailIndex) => (
            <motion.li
              key={detailIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: showDetails ? 1 : 0,
                x: showDetails ? 0 : -20,
              }}
              transition={{
                duration: 0.3,
                delay: showDetails ? detailIndex * 0.1 : 0,
              }}
              className="text-gray-300  leading-relaxed flex items-start"
            >
              <span className="text-purple-400 mr-3 mt-2 text-xs">▸</span>
              {detail}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;

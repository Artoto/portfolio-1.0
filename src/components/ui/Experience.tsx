import React from "react";
import { motion, useInView } from "framer-motion";
import ExperienceCard from "../models/ExperienceItem";

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  duration: string;
  details: string[];
}

const experienceData: ExperienceItem[] = [
  {
    id: "ibusiness",
    company: "Ibusiness Corporation",
    position: "Programmer",
    duration: "Jul 2021 - May 2025",
    details: [
      "Developed web applications and APIs using the Laravel framework and Nodejs and React Nextjs.",
      "Collaborated with cross-functional teams to deliver high-quality software solutions",
      "Participated in code reviews and maintained coding standards",
      "Worked closely with designers to implement pixel-perfect designs",
      "Maintained and updated existing codebases",
    ],
  },
  {
    id: "sugar",
    company: "THIP SUGAR SUKHOTHAI COMPANY LIMITED",
    position: "Apprentice",
    duration: "Nov 2020 - Mar 2021",
    details: [
      "An IT support and have designed a website for a cooperative education program.",
      "Optimized application performance and improved user experience",
    ],
  },
];

const ExperienceSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref}>
      <div className="max-w-7xl w-full mx-auto flex flex-col items-start justify-center min-h-screen p-6 text-gray-400 text-left gap-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center mb-4">
            <h1 className="relative text-4xl font-bold leading-none md:text-8xl">
              SELECTED EXPERIENCE
            </h1>
          </div>
        </motion.div>

        {/* Experience Items */}
        <div className="space-y-8">
          {experienceData.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        {/* Decorative Element */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-px bg-gradient-to-r from-purple-400 to-transparent mt-16"
          viewport={{ once: true }}
        />
      </div>
    </section>
  );
};

export default ExperienceSection;

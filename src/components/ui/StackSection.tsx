"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { SunDim } from "lucide-react";

type Item = { label: string; icon?: string };

type Section = { title: string; items: Item[] };

const SECTIONS: Section[] = [
  {
    title: "FRONTEND",
    items: [
      { label: "JavaScript", icon: "/image/js.png" },
      { label: "TypeScript", icon: "/image/ts.png" },
      { label: "React", icon: "/image/react.png" },
      { label: "Next.js", icon: "/image/next.webp" },
      { label: "Redux", icon: "/image/redux.png" },
      { label: "Tailwind CSS", icon: "/image/tailwind.png" },
      { label: "GSAP", icon: "/image/gsap.png" },
      { label: "Framer Motion", icon: "/image/framer-motion.webp" },
      { label: "Sass", icon: "/image/sass.webp" },
      { label: "Bootstrap", icon: "/image/bootstrap.svg" },
    ],
  },
  {
    title: "BACKEND",
    items: [
      { label: "Node.js", icon: "/image/node.png" },
      { label: "NestJS", icon: "/image/nest.svg" },
      { label: "Express.js", icon: "/image/express.png" },
    ],
  },
  {
    title: "DATABASE",
    items: [
      { label: "MySQL", icon: "/image/mysql.svg" },
      { label: "PostgreSQL", icon: "/image/postgreSQL.webp" },
      { label: "MongoDB", icon: "/image/mongodb.svg" },
      { label: "Prisma", icon: "/image/prisma.png" },
    ],
  },
  {
    title: "TOOLS",
    items: [
      { label: "Git", icon: "/image/git.png" },
      { label: "Docker", icon: "/image/docker.svg" },
      { label: "AWS", icon: "/image/aws.webp" },
    ],
  },
];

const TechStackSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  // ใช้ useInView เพื่อตรวจสอบว่า element อยู่ใน viewport หรือไม่
  const isInView = useInView(ref, {
    once: false, // เปลี่ยนเป็น false เพื่อให้ animate ได้หลายครั้ง
    margin: "-100px 0px -200px 0px", // top, right, bottom, left margins
  });

  // Animation variants สำหรับ slide-up และ fade เข้า
  const slideUpVariants = {
    hidden: {
      opacity: 0 as number,
      y: 50 as number,
    },
    visible: (delay: number) => ({
      opacity: 1 as number,
      y: 0 as number,
      transition: {
        duration: 0.8 as number,
        delay: delay as number,
        ease: [0.25, 0.46, 0.45, 0.94] as const, // easeOutQuart
      },
    }),
  };

  // Animation variants สำหรับ slide-up และ fade ออก
  const slideOutVariants = {
    visible: {
      opacity: 1 as number,
      y: 0 as number,
    },
    hidden: (delay: number) => ({
      opacity: 0 as number,
      y: -30 as number, // slide up เมื่อออก
      transition: {
        duration: 0.6 as number,
        delay: delay as number,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  // เลือก variants ตามสถานะ
  const getVariants = () => {
    return isInView ? slideUpVariants : slideOutVariants;
  };

  const getAnimateState = () => {
    return isInView ? "visible" : "hidden";
  };

  const chipVariant = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <section id="tech-stack" className="mb-52" ref={ref}>
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center min-h-screen text-left p-6 text-gray-400 gap-5 md:gap-20">
        <motion.h1
          variants={getVariants()}
          initial="hidden"
          animate={getAnimateState()}
          custom={0.1} // delay 0.1 วินาที
          className=" text-4xl font-bold leading-none md:text-8xl w-full mb-16"
        >
          SELECTED TECH STACK
        </motion.h1>

        <div className="flex flex-col items-center justify-center text-left gap-16 md:gap-32 w-full">
          {SECTIONS.map((s) => (
            <div
              className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-16 items-start w-full"
              key={s.title}
            >
              <motion.h2
                className="text-4xl md:text-6xl tracking-wider font-extrabold  text-left w-full "
                variants={getVariants()}
                initial="hidden"
                animate={getAnimateState()}
                custom={0.2} // delay 0.2 วินาที
              >
                {s.title}
              </motion.h2>

              {/* Right chips grid */}
              <motion.div
                variants={getVariants()}
                initial="hidden"
                animate={getAnimateState()}
                custom={0.3} // delay 0.3 วินาที
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8"
              >
                {s.items.map((it, idx) => (
                  <motion.div
                    key={`${it.label}-${idx}`}
                    variants={getVariants()}
                    animate={getAnimateState()}
                    custom={0.3 + idx * 0.1}
                    className="flex items-center gap-2 hover:shadow md:hover:scale-[1.02] transition"
                  >
                    <Image
                      src={it.icon || ""}
                      alt={it.label}
                      width={40}
                      height={40}
                      objectFit="contain"
                      className="h-10"
                    />
                    <span className="text-2xl md:text-3xl">{it.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;

"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AboutMeSection: React.FC = () => {
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

  return (
    <section id="about-me" ref={ref}>
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center min-h-screen text-left p-6 text-gray-400">
        <motion.h2
          variants={getVariants()}
          initial="hidden"
          animate={getAnimateState()}
          custom={0.1} // delay 0.1 วินาที
          className="text-3xl md:text-6xl font-thin mb-20"
        >
          {`I'm a software engineer driven by a passion for turning ideas into
          clean, intuitive digital experiences.`}
        </motion.h2>

        <motion.p
          variants={getVariants()}
          initial="hidden"
          animate={getAnimateState()}
          custom={0.2} // delay 0.2 วินาที
          className="pb-3 border-b text-left w-full"
        >
          {`About me.`}
        </motion.p>

        <div className="grid md:grid-cols-12 mt-9 text-left w-full">
          <div className="md:col-span-5">
            <motion.p
              variants={getVariants()}
              initial="hidden"
              animate={getAnimateState()}
              custom={0.3} // delay 0.3 วินาที
              className="text-5xl"
            >
              {`Hi, I'm Arthit.`}
            </motion.p>
          </div>
          <div className="md:col-span-7">
            <div className="max-w-[450px] text-left">
              <motion.p
                variants={getVariants()}
                initial="hidden"
                animate={getAnimateState()}
                custom={0.4} // delay 0.4 วินาที
              >
                {`I am a passionate Software Engineer with a knack for building
                full-stack web applications using modern technologies like
                Next.js and Tailwind CSS. My journey in tech began with a
                curiosity for solving real-world problems through innovative
                solutions, which evolved into a love for crafting user-centric
                digital experiences.`}
              </motion.p>
              <motion.p
                variants={getVariants()}
                initial="hidden"
                animate={getAnimateState()}
                custom={0.5} // delay 0.5 วินาที
                className="mt-3"
              >
                {`Beyond coding, I thrive in collaborative environments and enjoy
                tackling challenging problems with creative solutions. I aim to
                contribute to impactful projects that make a difference in
                users' lives.`}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;

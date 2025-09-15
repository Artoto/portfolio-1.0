"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const Background: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  // สร้าง static stars ขึ้นมาแค่ครั้งเดียว
  const [staticStars, setStaticStars] = useState<
    {
      id: number;
      left: string;
      top: string;
      size: number;
      duration: number;
      delay: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const letters = ["A", "R", "T", "H", "I", "T"];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const starsArray = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
    setStaticStars(starsArray);
  }, []);

  // สร้างดาวใหม่
  const createStar = (id: number): Star => ({
    id,
    x: Math.random() * 100, // ตำแหน่ง x เป็น %
    y: Math.random() * 100, // ตำแหน่ง y เป็น % (เปลี่ยนจาก 60% เป็น 100%)
    size: Math.random() * 3 + 1, // ขนาด 1-4px
    delay: Math.random() * 5, // หน่วงเวลา 0-5 วินาที
    duration: Math.random() * 10 + 15, // ระยะเวลา 15-25 วินาที
  });

  // สร้างดาวเริ่มต้น
  useEffect(() => {
    const initialStars = Array.from({ length: 10 }, (_, i) => createStar(i)); // เพิ่มจำนวนดาว
    setStars(initialStars);

    // สร้างดาวใหม่ทุก 2 วินาที
    const interval = setInterval(() => {
      setStars((prevStars) => {
        const newStar = createStar(Date.now());
        // เก็บดาวเฉพาะ 10 ดวงล่าสุด (เพิ่มจำนวน)
        return [...prevStars.slice(-9), newStar];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Background container ที่ fixed เต็มหน้าจอ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        <AnimatePresence mode="popLayout">
          {loading && (
            <div className="fixed inset-0 z-[6] flex">
              {/* Black div blocks */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="preloader-item h-full w-[10%] bg-black"
                  initial={{ y: 0 }}
                  animate={{ y: "-100%" }}
                  transition={{
                    delay: 2 + i * 0.1,
                    duration: 1,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Center text */}
              <motion.p
                className="name-text flex text-[20vw] lg:text-[200px] font-semibold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none overflow-hidden text-white"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                {letters.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      delay: i * 0.2,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          )}

          {/* Static stars */}
          {staticStars.map((s) => (
            <motion.div
              key={`static-${s.id}`}
              className="absolute bg-white rounded-full"
              style={{
                left: s.left,
                top: s.top,
                width: `${s.size}px`,
                height: `${s.size}px`,
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}

          {/* Animated falling stars */}
          {stars.map((star) => (
            <motion.div
              key={`animated-${star.id}`}
              className="absolute bg-white rounded-full"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: `${star.x}%`,
              }}
              initial={{
                top: "-10px",
                opacity: 0,
              }}
              animate={{
                top: "100vh",
                opacity: [0, 1, 1, 0],
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                ease: "linear",
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Optional: Gradient overlay for better text readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none z-10" />
    </>
  );
};

export default Background;

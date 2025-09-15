import React, { useMemo } from "react";
import { motion } from "framer-motion";

const StickyCounter: React.FC<{ activeIndex: number; count: number }> = ({
  activeIndex,
  count,
}) => {
  // Build 1..count once
  const nums = useMemo(
    () => Array.from({ length: count }, (_, i) => i + 1),
    [count]
  );
  return (
    <div className="sticky top-12 hidden h-fit w-full overflow-hidden md:flex text-[22vw] leading-[0.8] text-[var(--color-secondary-50)]">
      <span className="relative">0</span>
      <div className="relative w-[0.8em]">
        <motion.div
          className="absolute flex h-full w-fit flex-col"
          animate={{ translateY: `-${activeIndex * 100}%` }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {nums.map((n) => (
            <span key={n} className="inline-block">
              {n}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StickyCounter;

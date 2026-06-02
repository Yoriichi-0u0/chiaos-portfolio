"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function SystemScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-[#00D9FF] via-[#B7F7FF] to-[#FFD400]"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
      aria-hidden
    />
  );
}

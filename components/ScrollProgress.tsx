"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gold"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

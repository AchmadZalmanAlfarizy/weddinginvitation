import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 right-0 left-0 z-40 h-[3px] origin-left bg-gradient-to-r from-[#5F6B57] via-[#C5A880] to-[#A3865E]"
      aria-hidden="true"
    />
  );
}

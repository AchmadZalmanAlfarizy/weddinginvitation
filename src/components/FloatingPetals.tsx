import { motion } from 'motion/react';

const PETALS = [
  { id: 1, left: '8%', size: 10, delay: 0, duration: 14, drift: 28 },
  { id: 2, left: '22%', size: 7, delay: 2.5, duration: 17, drift: -24 },
  { id: 3, left: '38%', size: 11, delay: 5, duration: 15, drift: 32 },
  { id: 4, left: '56%', size: 8, delay: 1.2, duration: 18, drift: -30 },
  { id: 5, left: '72%', size: 10, delay: 4.1, duration: 16, drift: 22 },
  { id: 6, left: '88%', size: 8, delay: 6.4, duration: 15, drift: -26 },
  { id: 7, left: '15%', size: 6, delay: 7.5, duration: 19, drift: 18 },
  { id: 8, left: '64%', size: 9, delay: 8.2, duration: 16, drift: -20 },
];

export function FloatingPetals() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {PETALS.map((petal) => (
        <motion.span
          key={petal.id}
          initial={{ y: '-8vh', x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '108vh',
            x: [0, petal.drift, -petal.drift * 0.6, petal.drift * 0.4, 0],
            opacity: [0, 0.45, 0.5, 0.35, 0],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.35,
          }}
          className="absolute top-0 rounded-tl-full rounded-br-full bg-gradient-to-br from-[#C5A880]/55 to-[#E5D3B3]/35 blur-[0.4px]"
        />
      ))}
    </div>
  );
}

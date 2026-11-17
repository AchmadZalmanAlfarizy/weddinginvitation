import { Calendar, ChevronDown, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData';
import { OrnamentDivider } from './OrnamentDivider';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="paper-grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      {/* Slowly rotating orbital rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#C5A880]/25"
        aria-hidden="true"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 85, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5F6B57]/12"
        aria-hidden="true"
      />

      <motion.div
        style={{ y: textY, opacity: opacityFade }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center"
      >
        {/* Monogram Badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-3 inline-flex items-center rounded-full border border-[#C5A880]/45 bg-white/75 px-4 py-1 text-[11px] font-medium tracking-[0.28em] text-[#A3865E] uppercase shadow-xs backdrop-blur-sm"
        >
          {weddingData.couple.monogram}
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.15 }}
          className="font-script text-3xl text-[#C5A880] sm:text-4xl"
        >
          The Wedding of
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.95, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 font-serif text-4xl leading-tight font-medium tracking-wide text-[#2C2623] sm:text-6xl"
        >
          {weddingData.couple.groom.nickName}
          <span className="font-script mx-3 text-4xl text-[#C5A880] sm:text-5xl">&amp;</span>
          {weddingData.couple.bride.nickName}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-2 text-xs tracking-[0.26em] text-[#6D635B] uppercase sm:text-sm"
        >
          {weddingData.couple.groom.fullName} &bull; {weddingData.couple.bride.fullName}
        </motion.p>

        <OrnamentDivider className="my-6" />

        {/* Parallax Arch Portrait with double editorial frame */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.05, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-60 sm:w-72"
        >
          <div className="arch-frame border border-[#C5A880]/50 bg-[#EFE8DC] p-2.5 shadow-[0_28px_65px_-18px_rgba(44,38,35,0.22)]">
            <img
              src={weddingData.heroPhoto}
              alt={weddingData.couple.shortTitle}
              className="arch-frame aspect-[3/4] w-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Date & Place Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 rounded-full border border-[#C5A880]/30 bg-white/65 px-6 py-2.5 text-xs tracking-[0.15em] text-[#6D635B] uppercase shadow-xs backdrop-blur-sm sm:gap-6 sm:text-sm"
        >
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#C5A880]" />
            {weddingData.displayDate}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-[#C5A880] sm:inline-block" />
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#C5A880]" />
            {weddingData.locationSummary}
          </span>
        </motion.div>

        <motion.a
          href="#couple"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 7, 0] }}
          transition={{
            opacity: { delay: 0.9, duration: 0.6 },
            y: { repeat: Infinity, duration: 2.1, ease: 'easeInOut' },
          }}
          aria-label="Gulir ke bawah"
          className="mt-10 inline-flex flex-col items-center gap-1 text-[11px] tracking-[0.25em] text-[#6D635B]/80 uppercase transition-colors hover:text-[#2C2623]"
        >
          <span>Scroll</span>
          <ChevronDown className="h-4 w-4 text-[#C5A880]" />
        </motion.a>
      </motion.div>
    </section>
  );
}

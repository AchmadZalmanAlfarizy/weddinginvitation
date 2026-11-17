import { Heart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData';
import { OrnamentDivider } from './OrnamentDivider';

export function LoveStorySection() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 75%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="story" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-script text-3xl text-[#C5A880]">Our Journey</p>
          <h2 className="mt-1 font-serif text-3xl font-medium text-[#2C2623] sm:text-4xl">
            Kisah Cinta Kami
          </h2>
          <OrnamentDivider className="mt-5" />
        </motion.div>

        <div ref={timelineRef} className="relative mt-14 pl-8 sm:pl-10">
          {/* Background guide line */}
          <div
            className="absolute top-2 bottom-2 left-3 w-px bg-[#C5A880]/20 sm:left-4"
            aria-hidden="true"
          />

          {/* Scroll-driven animated gold line */}
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute top-2 bottom-2 left-3 w-px origin-top bg-gradient-to-b from-[#C5A880] via-[#A3865E] to-[#5F6B57] sm:left-4"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {weddingData.loveStory.map((item, idx) => (
              <motion.article
                key={item.year + idx}
                initial={{ opacity: 0, x: -18, y: 14, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ x: 4 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative rounded-2xl border border-[#C5A880]/30 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
              >
                <motion.span
                  initial={{ scale: 0.6 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="absolute top-7 -left-[33px] flex h-6 w-6 items-center justify-center rounded-full border border-[#C5A880] bg-[#FAF7F2] text-[#C5A880] shadow-xs sm:-left-[37px]"
                >
                  <Heart className="h-3 w-3 fill-[#C5A880]/35" />
                </motion.span>

                <span className="inline-block text-xs font-semibold tracking-[0.22em] text-[#A3865E] uppercase">
                  {item.year}
                </span>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-[#2C2623]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6D635B]">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { OrnamentDivider } from './OrnamentDivider';

export function QuoteSection() {
  return (
    <section className="relative bg-[#F2ECE1]/70 px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl"
      >
        <p className="font-serif text-xl leading-loose text-[#5F6B57] sm:text-2xl" dir="rtl">
          {weddingData.quote.arabic}
        </p>

        <OrnamentDivider className="my-6" />

        <blockquote className="font-serif text-lg leading-relaxed text-[#2C2623] italic sm:text-xl">
          “{weddingData.quote.text}”
        </blockquote>

        <p className="mt-4 text-xs font-medium tracking-[0.25em] text-[#A3865E] uppercase">
          — {weddingData.quote.source} —
        </p>
      </motion.div>
    </section>
  );
}


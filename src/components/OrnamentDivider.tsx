import { motion } from 'motion/react';

interface OrnamentDividerProps {
  className?: string;
}

export function OrnamentDivider({ className = '' }: OrnamentDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-14 origin-right bg-gradient-to-l from-[#C5A880] to-transparent"
      />
      <motion.svg
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="text-[#C5A880]"
      >
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.18"
        />
      </motion.svg>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-14 origin-left bg-gradient-to-r from-[#C5A880] to-transparent"
      />
    </div>
  );
}


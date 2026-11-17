import { MailOpen, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';

interface CoverGateProps {
  guestName: string;
  onOpen: () => void;
}

export function CoverGate({ guestName, onOpen }: CoverGateProps) {
  return (
    <motion.div
      key="cover-gate"
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        scale: 1.04,
        opacity: 0,
        transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#FAF7F2] px-6 py-10 text-center"
    >
      {/* Background subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 50% 25%, rgba(197, 168, 128, 0.25), transparent 62%), radial-gradient(circle at 50% 85%, rgba(95, 107, 87, 0.16), transparent 55%)',
        }}
      />

      {/* Slowly rotating orbital rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute h-[430px] w-[430px] rounded-full border border-dashed border-[#C5A880]/25 sm:h-[520px] sm:w-[520px]"
        aria-hidden="true"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 64, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute h-[360px] w-[360px] rounded-full border border-[#5F6B57]/15 sm:h-[440px] sm:w-[440px]"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex w-full max-w-md flex-col items-center"
      >
        <span className="text-[11px] font-medium tracking-[0.35em] text-[#6D635B] uppercase">
          The Wedding Invitation
        </span>

        {/* Arch Cover Image with floating gentle pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 w-48 sm:w-56"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="arch-frame relative overflow-hidden border border-[#C5A880]/55 bg-[#EFE8DC] p-2 shadow-[0_24px_55px_-15px_rgba(44,38,35,0.22)]"
          >
            <img
              src={weddingData.coverPhoto}
              alt={weddingData.couple.shortTitle}
              className="arch-frame aspect-[3/4] w-full object-cover object-top"
            />
          </motion.div>
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="mt-7"
        >
          <h1 className="font-serif text-3xl leading-tight font-medium tracking-wide text-[#2C2623] sm:text-4xl">
            {weddingData.couple.groom.nickName}
            <span className="font-script mx-2.5 text-3xl text-[#C5A880] sm:text-4xl">&amp;</span>
            {weddingData.couple.bride.nickName}
          </h1>
          <p className="mt-1.5 text-xs tracking-[0.22em] text-[#6D635B] uppercase">
            {weddingData.displayDate}
          </p>
        </motion.div>

        {/* Guest Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45 }}
          className="mt-6 w-full rounded-2xl border border-[#C5A880]/35 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-md"
        >
          <p className="text-xs text-[#6D635B]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="mt-1 font-serif text-xl font-semibold text-[#2C2623]">{guestName}</p>
        </motion.div>

        {/* Open Button with luxury shimmer sweep */}
        <motion.button
          type="button"
          onClick={onOpen}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.6 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="group relative mt-7 inline-flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-full bg-[#2C2623] px-8 py-3.5 text-xs font-medium tracking-[0.18em] text-[#FAF7F2] uppercase shadow-xl shadow-[#2C2623]/25 transition-colors hover:bg-[#3F3733]"
        >
          <motion.span
            aria-hidden="true"
            animate={{ x: ['-140%', '240%'] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute inset-y-0 w-16 -skew-x-12 bg-gradient-to-r from-transparent via-[#C5A880]/35 to-transparent"
          />
          <MailOpen className="relative z-10 h-4 w-4 text-[#C5A880] transition-transform duration-300 group-hover:-rotate-6" />
          <span className="relative z-10">Buka Undangan</span>
          <Sparkles className="relative z-10 h-3.5 w-3.5 text-[#C5A880]/90" />
        </motion.button>

        <p className="mt-3 text-[11px] text-[#6D635B]/80">
          Klik tombol di atas untuk membuka undangan &amp; memutar musik
        </p>
      </motion.div>
    </motion.div>
  );
}

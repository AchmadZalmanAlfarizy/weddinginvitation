import { Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { OrnamentDivider } from './OrnamentDivider';

interface PersonCardProps {
  roleLabel: string;
  fullName: string;
  photo: string;
  instagram: string;
  instagramHandle: string;
  delay?: number;
}

function PersonCard({
  roleLabel,
  fullName,
  photo,
  instagram,
  instagramHandle,
  delay = 0,
}: PersonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="relative w-56 sm:w-64"
      >
        <div className="arch-frame border border-[#C5A880]/50 bg-[#F2ECE1] p-2 shadow-[0_22px_50px_-18px_rgba(44,38,35,0.2)]">
          <img
            src={photo}
            alt={fullName}
            className="arch-frame aspect-[3/4] w-full object-cover object-top"
          />
        </div>
      </motion.div>

      <span className="mt-6 text-[11px] font-medium tracking-[0.28em] text-[#5F6B57] uppercase">
        {roleLabel}
      </span>
      <h3 className="mt-2 font-serif text-3xl font-semibold text-[#2C2623] sm:text-4xl">
        {fullName}
      </h3>

      <motion.a
        href={instagram}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#C5A880]/40 bg-white/75 px-4 py-1.5 text-xs text-[#6D635B] shadow-xs transition-colors hover:border-[#C5A880] hover:text-[#2C2623]"
      >
        <Instagram className="h-3.5 w-3.5 text-[#C5A880]" />
        <span>{instagramHandle}</span>
      </motion.a>
    </motion.div>
  );
}

export function CoupleSection() {
  const { groom, bride } = weddingData.couple;

  return (
    <section id="couple" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-script text-3xl text-[#C5A880]">Assalamu’alaikum Wr. Wb.</p>
          <h2 className="mt-2 font-serif text-3xl font-medium text-[#2C2623] sm:text-4xl">
            Mempelai Berbahagia
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6D635B]">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan
            acara pernikahan kami:
          </p>
          <OrnamentDivider className="mt-6" />
        </motion.div>

        <div className="mt-14 grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <PersonCard
            roleLabel="Mempelai Pria"
            fullName={groom.fullName}
            photo={groom.photo}
            instagram={groom.instagram}
            instagramHandle={groom.instagramHandle}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center"
          >
            <motion.span
              animate={{ scale: [1, 1.09, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="font-script inline-block text-5xl text-[#C5A880] sm:text-6xl"
            >
              &amp;
            </motion.span>
          </motion.div>

          <PersonCard
            roleLabel="Mempelai Wanita"
            fullName={bride.fullName}
            photo={bride.photo}
            instagram={bride.instagram}
            instagramHandle={bride.instagramHandle}
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}

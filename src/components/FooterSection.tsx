import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { OrnamentDivider } from './OrnamentDivider';

export function FooterSection() {
  return (
    <footer className="bg-[#2C2623] px-6 pt-16 pb-28 text-center text-[#FAF7F2] sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-xl"
      >
        <p className="font-script text-3xl text-[#C5A880]">Terima Kasih</p>
        <p className="mt-3 text-sm leading-relaxed text-[#FAF7F2]/80">
          Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir serta memberikan doa restu bagi kedua mempelai.
        </p>

        <OrnamentDivider className="my-7" />

        <p className="text-xs tracking-[0.25em] text-[#C5A880] uppercase">
          Kami yang berbahagia
        </p>
        <h3 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
          {weddingData.couple.groom.nickName} &amp; {weddingData.couple.bride.nickName}
        </h3>
        <p className="mt-1 text-xs text-[#FAF7F2]/65">
          {weddingData.couple.groom.fullName} &bull; {weddingData.couple.bride.fullName}
        </p>

        <p className="mt-10 inline-flex items-center gap-1.5 text-[11px] text-[#FAF7F2]/50">
          <span>Dibuat dengan</span>
          <Heart className="h-3 w-3 fill-[#C5A880] text-[#C5A880]" />
          <span>untuk {weddingData.couple.shortTitle}</span>
        </p>
      </motion.div>
    </footer>
  );
}


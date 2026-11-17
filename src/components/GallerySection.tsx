import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { weddingData } from '../data/weddingData';
import { OrnamentDivider } from './OrnamentDivider';

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const items = weddingData.gallery;

  const closeModal = useCallback(() => setSelectedIndex(null), []);
  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + items.length) % items.length,
    );
  }, [items.length]);
  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex, closeModal, showPrev, showNext]);

  const activeItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <section id="gallery" className="bg-[#F2ECE1]/65 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-script text-3xl text-[#C5A880]">Precious Moments</p>
          <h2 className="mt-1 font-serif text-3xl font-medium text-[#2C2623] sm:text-4xl">
            Galeri Kebahagiaan
          </h2>
          <OrnamentDivider className="mt-5" />
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {items.map((item, idx) => {
            const isLandscape = item.aspect === 'landscape';
            return (
              <motion.button
                key={item.id}
                type="button"
                layoutId={`gallery-${item.id}`}
                onClick={() => setSelectedIndex(idx)}
                initial={{ opacity: 0, y: 26, scale: 0.96, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.75,
                  delay: idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-[#C5A880]/35 bg-white p-1.5 text-left shadow-sm transition-shadow hover:shadow-xl ${
                  isLandscape ? 'col-span-2 sm:col-span-3' : ''
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden rounded-xl ${
                    isLandscape ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[4/5]'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      isLandscape ? 'object-[50%_32%]' : 'object-top'
                    }`}
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#2C2623]/65 via-transparent to-transparent p-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex w-full items-center justify-between text-white">
                      <span className="truncate text-xs font-medium">{item.caption}</span>
                      <Expand className="h-4 w-4 shrink-0" />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D1917]/88 p-4 backdrop-blur-md"
          >
            <motion.button
              type="button"
              onClick={closeModal}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Tutup galeri"
              className="absolute top-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <X className="h-5 w-5" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <motion.div
              layoutId={`gallery-${activeItem.id}`}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-xl overflow-hidden rounded-3xl border border-[#C5A880]/45 bg-[#FAF7F2] p-3 shadow-2xl"
            >
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                className="max-h-[72vh] w-full rounded-2xl object-contain"
              />
              <p className="mt-2.5 text-center font-serif text-lg text-[#2C2623]">
                {activeItem.caption}
              </p>
            </motion.div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Foto berikutnya"
              className="absolute right-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

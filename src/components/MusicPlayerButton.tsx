import { Disc3, Pause, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface MusicPlayerButtonProps {
  isPlaying: boolean;
  isAmbientFallback: boolean;
  songTitle: string;
  onToggle: () => void;
}

export function MusicPlayerButton({
  isPlaying,
  isAmbientFallback,
  songTitle,
  onToggle,
}: MusicPlayerButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="fixed right-4 bottom-20 z-40 flex items-center gap-2.5 sm:right-6 sm:bottom-6"
    >
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.3 }}
            className="hidden items-center gap-2 rounded-full border border-[#C5A880]/35 bg-white/85 px-3.5 py-2 text-xs text-[#2C2623] shadow-md backdrop-blur-md lg:flex"
          >
            {/* Equalizer bars */}
            <div className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
              {[0, 0.2, 0.4].map((delay, idx) => (
                <motion.span
                  key={idx}
                  animate={{ height: ['35%', '100%', '45%', '85%', '35%'] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay,
                    ease: 'easeInOut',
                  }}
                  className="w-[2.5px] rounded-full bg-[#C5A880]"
                />
              ))}
            </div>
            <span className="max-w-[160px] truncate font-medium">
              {isAmbientFallback ? 'Ambient Wedding Piano' : songTitle}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isPlaying ? 'Jeda musik latar' : 'Putar musik latar'}
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#C5A880]/50 bg-[#2C2623] text-[#FAF7F2] shadow-xl shadow-[#2C2623]/25"
      >
        {isPlaying && (
          <motion.span
            animate={{ scale: [1, 1.45], opacity: [0.45, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border border-[#C5A880]"
          />
        )}

        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isPlaying
              ? { duration: 4.5, repeat: Infinity, ease: 'linear' }
              : { duration: 0.4 }
          }
          className="flex items-center justify-center"
        >
          <Disc3 className="h-6 w-6 text-[#C5A880]" />
        </motion.div>

        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FAF7F2] text-[#2C2623] shadow">
          {isPlaying ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5 translate-x-[0.5px]" />}
        </span>
      </motion.button>
    </motion.div>
  );
}

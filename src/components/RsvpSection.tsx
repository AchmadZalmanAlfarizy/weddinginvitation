import { CheckCircle2, MessageSquareHeart, Send, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FormEvent, useEffect, useState } from 'react';
import { WishItem, weddingData } from '../data/weddingData';
import { OrnamentDivider } from './OrnamentDivider';

interface RsvpSectionProps {
  defaultGuestName: string;
}

const STORAGE_KEY = 'rifal_rahmdhani_wishes_v1';

const ATTENDANCE_LABELS: Record<WishItem['attendance'], { text: string; badgeClass: string }> = {
  hadir: {
    text: 'Hadir',
    badgeClass: 'bg-[#5F6B57]/15 text-[#5F6B57]',
  },
  tidak_hadir: {
    text: 'Berhalangan',
    badgeClass: 'bg-[#6D635B]/15 text-[#6D635B]',
  },
  ragu: {
    text: 'Masih Ragu',
    badgeClass: 'bg-[#C5A880]/20 text-[#8F6F46]',
  },
};

export function RsvpSection({ defaultGuestName }: RsvpSectionProps) {
  const [wishes, setWishes] = useState<WishItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as WishItem[];
      }
    } catch {
      // Ignore storage read errors
    }
    return weddingData.initialWishes;
  });

  const [name, setName] = useState(
    defaultGuestName !== 'Tamu Undangan' ? defaultGuestName : '',
  );
  const [attendance, setAttendance] = useState<WishItem['attendance']>('hadir');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      // Ignore storage write errors
    }
  }, [wishes]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) return;

    const newWish: WishItem = {
      id: `w-${Date.now()}`,
      name: trimmedName,
      attendance,
      guests: attendance === 'hadir' ? guests : 0,
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
    };

    setWishes((prev) => [newWish, ...prev]);
    setMessage('');
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="rsvp" className="bg-[#F2ECE1]/65 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-script text-3xl text-[#C5A880]">RSVP &amp; Wishes</p>
          <h2 className="mt-1 font-serif text-3xl font-medium text-[#2C2623] sm:text-4xl">
            Konfirmasi Kehadiran &amp; Doa
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#6D635B]">
            Merupakan kehormatan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.
          </p>
          <OrnamentDivider className="mt-5" />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-10 space-y-4 rounded-3xl border border-[#C5A880]/35 bg-white/85 p-6 shadow-sm backdrop-blur-sm sm:p-8"
        >
          <div>
            <label htmlFor="guest-name" className="block text-xs font-medium tracking-wider text-[#6D635B] uppercase">
              Nama Tamu
            </label>
            <input
              id="guest-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama Anda"
              className="mt-1.5 w-full rounded-xl border border-[#C5A880]/35 bg-[#FAF7F2]/60 px-4 py-3 text-sm text-[#2C2623] outline-none transition-colors focus:border-[#C5A880] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="guest-attendance" className="block text-xs font-medium tracking-wider text-[#6D635B] uppercase">
                Konfirmasi Kehadiran
              </label>
              <select
                id="guest-attendance"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value as WishItem['attendance'])}
                className="mt-1.5 w-full rounded-xl border border-[#C5A880]/35 bg-[#FAF7F2]/60 px-4 py-3 text-sm text-[#2C2623] outline-none transition-colors focus:border-[#C5A880] focus:bg-white"
              >
                <option value="hadir">InsyaAllah Hadir</option>
                <option value="ragu">Masih Ragu</option>
                <option value="tidak_hadir">Maaf, Berhalangan Hadir</option>
              </select>
            </div>

            <div>
              <label htmlFor="guest-count" className="block text-xs font-medium tracking-wider text-[#6D635B] uppercase">
                Jumlah Tamu
              </label>
              <div className="relative mt-1.5">
                <Users className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#C5A880]" />
                <select
                  id="guest-count"
                  disabled={attendance === 'tidak_hadir'}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#C5A880]/35 bg-[#FAF7F2]/60 py-3 pr-4 pl-10 text-sm text-[#2C2623] outline-none transition-colors focus:border-[#C5A880] focus:bg-white disabled:opacity-50"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} Orang
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="guest-message" className="block text-xs font-medium tracking-wider text-[#6D635B] uppercase">
              Ucapan &amp; Doa Restu
            </label>
            <textarea
              id="guest-message"
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan & doa terbaik untuk Rifal & Asti..."
              className="mt-1.5 w-full resize-none rounded-xl border border-[#C5A880]/35 bg-[#FAF7F2]/60 px-4 py-3 text-sm text-[#2C2623] outline-none transition-colors focus:border-[#C5A880] focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#2C2623] px-6 py-3 text-xs font-medium tracking-[0.18em] text-[#FAF7F2] uppercase shadow-md transition-colors hover:bg-[#3F3733]"
            >
              <Send className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Kirim Ucapan</span>
            </motion.button>

            <AnimatePresence>
              {submitted && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5F6B57]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Terima kasih atas ucapan &amp; konfirmasinya!
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.form>

        {/* Wishes Feed */}
        <div className="mt-10">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium tracking-wider text-[#6D635B] uppercase">
            <MessageSquareHeart className="h-4 w-4 text-[#C5A880]" />
            <span>{wishes.length} Ucapan &amp; Doa</span>
          </div>

          <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {wishes.map((wish) => {
                const badge = ATTENDANCE_LABELS[wish.attendance];
                return (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-2xl border border-[#C5A880]/25 bg-white/80 p-5 shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-serif text-lg font-semibold text-[#2C2623]">
                        {wish.name}
                      </h4>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${badge.badgeClass}`}
                      >
                        {badge.text}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#6D635B]">
                      {wish.message}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}


import { Calendar, CalendarPlus, Clock, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { EventDetail, weddingData } from '../data/weddingData';
import { OrnamentDivider } from './OrnamentDivider';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetIso: string): TimeLeft {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function buildGoogleCalendarUrl(event: EventDetail): string {
  const title = encodeURIComponent(
    `${event.title} — ${weddingData.couple.shortTitle}`,
  );
  const details = encodeURIComponent(
    `Undangan Pernikahan ${weddingData.couple.groom.fullName} & ${weddingData.couple.bride.fullName}`,
  );
  const location = encodeURIComponent(`${event.venueName}, ${event.address}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${event.startIso}/${event.endIso}&details=${details}&location=${location}`;
}

export function EventSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(weddingData.targetDateIso),
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(getTimeLeft(weddingData.targetDateIso));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const countdownUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section id="events" className="bg-[#F2ECE1]/65 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-script text-3xl text-[#C5A880]">Save The Date</p>
          <h2 className="mt-1 font-serif text-3xl font-medium text-[#2C2623] sm:text-4xl">
            Waktu &amp; Tempat Acara
          </h2>
          <OrnamentDivider className="mt-5" />
        </motion.div>

        {/* Real-time Countdown with animated digit transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-10 grid max-w-lg grid-cols-4 gap-3 sm:gap-4"
        >
          {countdownUnits.map((unit) => {
            const formatted = String(unit.value).padStart(2, '0');
            return (
              <motion.div
                key={unit.label}
                whileHover={{ y: -3 }}
                className="flex flex-col items-center overflow-hidden rounded-2xl border border-[#C5A880]/40 bg-white/85 py-4 shadow-sm backdrop-blur-sm"
              >
                <div className="relative flex h-10 items-center justify-center overflow-hidden sm:h-11">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={formatted}
                      initial={{ y: 14, opacity: 0, filter: 'blur(3px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: -14, opacity: 0, filter: 'blur(3px)' }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="font-serif text-3xl font-semibold text-[#2C2623] tabular-nums sm:text-4xl"
                    >
                      {formatted}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="mt-1 text-[10px] font-medium tracking-[0.22em] text-[#6D635B] uppercase sm:text-xs">
                  {unit.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Event Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {weddingData.events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col justify-between rounded-3xl border border-[#C5A880]/40 bg-white/90 p-7 text-center shadow-[0_20px_50px_-22px_rgba(44,38,35,0.2)] backdrop-blur-sm transition-shadow hover:shadow-[0_26px_60px_-22px_rgba(44,38,35,0.26)] sm:p-8"
            >
              <div>
                <span className="inline-block rounded-full bg-[#5F6B57]/10 px-4 py-1 text-[11px] font-medium tracking-[0.22em] text-[#5F6B57] uppercase">
                  {event.dayName}
                </span>
                <h3 className="mt-4 font-serif text-3xl font-semibold text-[#2C2623]">
                  {event.title}
                </h3>

                <div className="mt-5 space-y-2.5 text-sm text-[#6D635B]">
                  <p className="inline-flex items-center justify-center gap-2 font-medium text-[#2C2623]">
                    <Calendar className="h-4 w-4 text-[#C5A880]" />
                    <span>{event.dateText}</span>
                  </p>
                  <br />
                  <p className="inline-flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4 text-[#C5A880]" />
                    <span>{event.timeText}</span>
                  </p>
                </div>

                <div className="my-5 h-px w-full bg-[#C5A880]/25" />

                <p className="font-serif text-lg font-semibold text-[#2C2623]">
                  {event.venueName}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#6D635B]">
                  {event.address}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <motion.a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#2C2623] px-5 py-2.5 text-xs font-medium tracking-wider text-[#FAF7F2] uppercase transition-colors hover:bg-[#3F3733]"
                >
                  <MapPin className="h-3.5 w-3.5 text-[#C5A880]" />
                  <span>Google Maps</span>
                </motion.a>
                <motion.a
                  href={buildGoogleCalendarUrl(event)}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/60 bg-transparent px-5 py-2.5 text-xs font-medium tracking-wider text-[#2C2623] uppercase transition-colors hover:bg-[#C5A880]/15"
                >
                  <CalendarPlus className="h-3.5 w-3.5 text-[#A3865E]" />
                  <span>Kalender</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

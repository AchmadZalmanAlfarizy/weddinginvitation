import { Calendar, Heart, Home, Images, MessageSquareHeart, Users } from 'lucide-react';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  { href: '#hero', label: 'Beranda', icon: Home },
  { href: '#couple', label: 'Mempelai', icon: Users },
  { href: '#events', label: 'Acara', icon: Calendar },
  { href: '#story', label: 'Kisah', icon: Heart },
  { href: '#gallery', label: 'Galeri', icon: Images },
  { href: '#rsvp', label: 'Ucapan', icon: MessageSquareHeart },
];

export function FloatingNav() {
  return (
    <motion.nav
      aria-label="Navigasi Undangan"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 left-1/2 z-30 -translate-x-1/2 sm:bottom-6"
    >
      <div className="flex items-center gap-1 rounded-full border border-[#C5A880]/40 bg-[#FAF7F2]/85 px-2.5 py-1.5 shadow-[0_12px_36px_-10px_rgba(44,38,35,0.22)] backdrop-blur-md">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <motion.a
            key={href}
            href={href}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.92 }}
            title={label}
            aria-label={label}
            className="group flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[11px] font-medium text-[#6D635B] transition-colors hover:bg-[#C5A880]/18 hover:text-[#2C2623] sm:px-3"
          >
            <Icon className="h-3.5 w-3.5 text-[#A3865E] transition-transform duration-300 group-hover:scale-110" />
            <span className="hidden md:inline">{label}</span>
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
}

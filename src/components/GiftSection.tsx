import { Check, Copy, Gift } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { weddingData } from '../data/weddingData';
import { OrnamentDivider } from './OrnamentDivider';

export function GiftSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2200);
    } catch {
      // Clipboard fallback for non-secure contexts
      const input = document.createElement('input');
      input.value = accountNumber;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2200);
    }
  };

  return (
    <section id="gift" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-script text-3xl text-[#C5A880]">Wedding Gift</p>
          <h2 className="mt-1 font-serif text-3xl font-medium text-[#2C2623] sm:text-4xl">
            Tanda Kasih
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6D635B]">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila Bapak/Ibu/Saudara/i
            bermaksud memberikan tanda kasih, dapat disampaikan melalui rekening berikut:
          </p>
          <OrnamentDivider className="mt-5" />
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {weddingData.giftAccounts.map((acc, index) => {
            const isCopied = copiedId === acc.id;
            return (
              <motion.div
                key={acc.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: index * 0.12 }}
                className="relative overflow-hidden rounded-3xl border border-[#C5A880]/40 bg-gradient-to-br from-white via-[#FAF7F2] to-[#F2ECE1] p-6 text-left shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] text-[#5F6B57] uppercase">
                    {acc.bankName}
                  </span>
                  <Gift className="h-5 w-5 text-[#C5A880]" />
                </div>

                <p className="mt-5 font-serif text-2xl font-semibold tracking-wider text-[#2C2623]">
                  {acc.accountNumber}
                </p>
                <p className="mt-1 text-xs text-[#6D635B]">a.n. {acc.accountHolder}</p>

                <motion.button
                  type="button"
                  onClick={() => handleCopy(acc.id, acc.accountNumber)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#C5A880]/50 bg-white px-4 py-2 text-xs font-medium text-[#2C2623] transition-colors hover:border-[#C5A880]"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#5F6B57]" />
                      <span className="text-[#5F6B57]">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#C5A880]" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Toast */}
        <AnimatePresence>
          {copiedId && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2C2623] px-4 py-2 text-xs text-[#FAF7F2] shadow-lg"
            >
              <Check className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Nomor rekening berhasil disalin ke clipboard</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


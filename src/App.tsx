import { AnimatePresence, MotionConfig } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { CoupleSection } from './components/CoupleSection';
import { CoverGate } from './components/CoverGate';
import { EventSection } from './components/EventSection';
import { FloatingNav } from './components/FloatingNav';
import { FloatingPetals } from './components/FloatingPetals';
import { FooterSection } from './components/FooterSection';
import { GallerySection } from './components/GallerySection';
import { GiftSection } from './components/GiftSection';
import { HeroSection } from './components/HeroSection';
import { LoveStorySection } from './components/LoveStorySection';
import { MusicPlayerButton } from './components/MusicPlayerButton';
import { QuoteSection } from './components/QuoteSection';
import { RsvpSection } from './components/RsvpSection';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { weddingData } from './data/weddingData';
import { useWeddingAudio } from './hooks/useWeddingAudio';

function getGuestNameFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  const to = params.get('to')?.trim();
  return to && to.length > 0 ? to : 'Tamu Undangan';
}

export function App() {
  const [isOpened, setIsOpened] = useState(false);
  const guestName = useMemo(() => getGuestNameFromUrl(), []);
  const { isPlaying, isAmbientFallback, play, toggle } = useWeddingAudio(
    weddingData.music.src,
  );

  // Lock body scroll while cover gate is closed
  useEffect(() => {
    document.body.style.overflow = isOpened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpened]);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    void play();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#FAF7F2] text-[#2C2623]">
        <AnimatePresence>
          {!isOpened && (
            <CoverGate guestName={guestName} onOpen={handleOpenInvitation} />
          )}
        </AnimatePresence>

        {isOpened && <ScrollProgressBar />}
        {isOpened && <FloatingPetals />}

        <main aria-hidden={!isOpened} className="relative z-20">
          <HeroSection />
          <QuoteSection />
          <CoupleSection />
          <EventSection />
          <LoveStorySection />
          <GallerySection />
          <GiftSection />
          <RsvpSection defaultGuestName={guestName} />
        </main>

        <div className="relative z-20">
          <FooterSection />
        </div>

        {isOpened && <FloatingNav />}

        {isOpened && (
          <MusicPlayerButton
            isPlaying={isPlaying}
            isAmbientFallback={isAmbientFallback}
            songTitle={weddingData.music.title}
            onToggle={() => void toggle()}
          />
        )}
      </div>
    </MotionConfig>
  );
}

export default App;

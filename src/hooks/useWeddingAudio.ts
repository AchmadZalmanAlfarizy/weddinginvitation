import { useCallback, useEffect, useRef, useState } from 'react';

interface UseWeddingAudioReturn {
  isPlaying: boolean;
  isAmbientFallback: boolean;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
}

// Progression: Cmaj9 -> G/B -> Am7 -> Fmaj7 (freqs in Hz)
const CHORD_ARPEGGIOS = [
  [261.63, 329.63, 392.0, 493.88, 587.33],
  [246.94, 293.66, 392.0, 493.88, 587.33],
  [220.0, 261.63, 329.63, 392.0, 523.25],
  [174.61, 220.0, 261.63, 329.63, 440.0],
];

export function useWeddingAudio(src: string): UseWeddingAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAmbientFallback, setIsAmbientFallback] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const audioErrorRef = useRef(false);

  // Web Audio fallback refs
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const schedulerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const clearFade = useCallback(() => {
    if (fadeIntervalRef.current !== null) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const stopAmbient = useCallback(() => {
    if (schedulerRef.current !== null) {
      window.clearInterval(schedulerRef.current);
      schedulerRef.current = null;
    }
    if (masterGainRef.current && ctxRef.current) {
      const now = ctxRef.current.currentTime;
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.setTargetAtTime(0.0001, now, 0.25);
    }
  }, []);

  const triggerAmbientNote = useCallback((freq: number, duration = 2.6) => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const env = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.18, now + 0.04);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.value = 0.14;

    osc.connect(filter);
    osc2.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(env);
    env.connect(master);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
  }, []);

  const startAmbient = useCallback(async () => {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!ctxRef.current) {
      ctxRef.current = new AudioCtx();
      const master = ctxRef.current.createGain();
      master.gain.value = 0.0001;
      master.connect(ctxRef.current.destination);
      masterGainRef.current = master;
    }

    if (ctxRef.current.state === 'suspended') {
      await ctxRef.current.resume();
    }

    if (masterGainRef.current && ctxRef.current) {
      const now = ctxRef.current.currentTime;
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.setTargetAtTime(0.32, now, 0.6);
    }

    if (schedulerRef.current !== null) {
      window.clearInterval(schedulerRef.current);
    }

    const playNextNote = () => {
      const step = stepRef.current;
      const chordIdx = Math.floor(step / 6) % CHORD_ARPEGGIOS.length;
      const noteIdx = step % 5;
      const chord = CHORD_ARPEGGIOS[chordIdx];
      triggerAmbientNote(chord[noteIdx], 2.8);
      if (step % 6 === 0) {
        // Warm root bass note
        triggerAmbientNote(chord[0] / 2, 4.2);
      }
      stepRef.current += 1;
    };

    playNextNote();
    schedulerRef.current = window.setInterval(playNextNote, 520);
    setIsAmbientFallback(true);
    setIsPlaying(true);
  }, [triggerAmbientNote]);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = 'metadata';
    audio.volume = 0;

    const handleError = () => {
      audioErrorRef.current = true;
    };

    audio.addEventListener('error', handleError);
    audioRef.current = audio;

    return () => {
      clearFade();
      stopAmbient();
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
      }
    };
  }, [src, clearFade, stopAmbient]);

  const fadeAudioTo = useCallback(
    (targetVolume: number, onComplete?: () => void) => {
      clearFade();
      const audio = audioRef.current;
      if (!audio) return;

      fadeIntervalRef.current = window.setInterval(() => {
        const current = audio.volume;
        const diff = targetVolume - current;
        if (Math.abs(diff) <= 0.04) {
          audio.volume = targetVolume;
          clearFade();
          onComplete?.();
          return;
        }
        audio.volume = Math.max(0, Math.min(1, current + diff * 0.25));
      }, 60);
    },
    [clearFade],
  );

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (audio && !audioErrorRef.current) {
      try {
        await audio.play();
        setIsAmbientFallback(false);
        setIsPlaying(true);
        fadeAudioTo(0.65);
        return;
      } catch {
        // Fallback ke melodi ambient jika file MP3 belum tersedia / gagal diputar
      }
    }
    await startAmbient();
  }, [fadeAudioTo, startAmbient]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      fadeAudioTo(0, () => {
        audio.pause();
      });
    }
    stopAmbient();
    setIsPlaying(false);
  }, [fadeAudioTo, stopAmbient]);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, pause, play]);

  return { isPlaying, isAmbientFallback, play, pause, toggle };
}


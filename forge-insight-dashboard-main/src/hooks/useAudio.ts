import { useCallback, useRef, useState } from "react";

interface AudioOptions {
  volume?: number;
  loop?: boolean;
  preload?: boolean;
}

interface UseAudioReturn {
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  isPlaying: boolean;
  isLoaded: boolean;
}

export const useAudio = (
  src: string,
  options: AudioOptions = {}
): UseAudioReturn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { volume = 0.7, loop = false, preload = true } = options;

  const initializeAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.loop = loop;
      audio.preload = preload ? "auto" : "metadata";

      audio.addEventListener("loadeddata", () => setIsLoaded(true));
      audio.addEventListener("ended", () => setIsPlaying(false));
      audio.addEventListener("pause", () => setIsPlaying(false));
      audio.addEventListener("play", () => setIsPlaying(true));

      audioRef.current = audio;
    }
    return audioRef.current;
  }, [src, volume, loop, preload]);

  const play = useCallback(async () => {
    const audio = initializeAudio();
    try {
      await audio.play();
    } catch (error) {
      console.warn("Audio play failed:", error);
    }
  }, [initializeAudio]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  }, []);

  return {
    play,
    pause,
    stop,
    setVolume,
    isPlaying,
    isLoaded,
  };
};

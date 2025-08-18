import { useCallback, useEffect, useRef, useState } from "react";
import { soundGenerator } from "@/lib/soundGenerator";

interface DoorSoundEffects {
  playDoorAnimation: () => Promise<void>;
  isPlaying: boolean;
  preloadSounds: () => Promise<void>;
  isLoaded: boolean;
}

export const useDoorSoundEffects = (): DoorSoundEffects => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const soundUrlsRef = useRef<{
    doorOpen?: string;
    doorClose?: string;
    footsteps?: string[];
    ambient?: string;
  }>({});

  // Preload all sound effects
  const preloadSounds = useCallback(async () => {
    if (isLoaded) return;

    console.log("🎵 Preloading door sound effects...");

    try {
      const [doorOpen, doorClose, ambient, ...footsteps] = await Promise.all([
        soundGenerator.generateDoorOpenSound(),
        soundGenerator.generateDoorCloseSound(),
        soundGenerator.generateAmbientSound(),
        soundGenerator.generateFootstepSound(1),
        soundGenerator.generateFootstepSound(2),
        soundGenerator.generateFootstepSound(3),
        soundGenerator.generateFootstepSound(4),
      ]);

      soundUrlsRef.current = {
        doorOpen,
        doorClose,
        ambient,
        footsteps,
      };

      console.log("✅ Door sound effects loaded successfully!");
      setIsLoaded(true);
    } catch (error) {
      console.warn("❌ Failed to preload door sound effects:", error);
    }
  }, [isLoaded]);

  // Play a sound with volume control
  const playSound = useCallback(
    (url: string, volume: number = 0.7, delay: number = 0): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          try {
            const audio = new Audio(url);
            audio.volume = volume;
            audio.onended = () => resolve();
            audio.onerror = () => resolve();
            audio.play().catch(() => resolve());
          } catch (error) {
            resolve();
          }
        }, delay);
      });
    },
    []
  );

  // Play the complete door animation sound sequence
  const playDoorAnimation = useCallback(async () => {
    if (isPlaying || !isLoaded) return;

    setIsPlaying(true);

    try {
      const sounds = soundUrlsRef.current;

      console.log("🚪 Playing door animation sounds...");

      // Start ambient hotel sounds immediately
      if (sounds.ambient) {
        playSound(sounds.ambient, 0.3);
      }

      // Door opening sound starts immediately
      if (sounds.doorOpen) {
        playSound(sounds.doorOpen, 0.8);
      }

      // Footsteps start after door opens (around 0.8s)
      if (sounds.footsteps && sounds.footsteps.length >= 4) {
        const footstepTiming = [800, 1200, 1600, 2000]; // Match character walking animation
        const footstepVolumes = [0.6, 0.7, 0.6, 0.5]; // Varying volumes for realism

        sounds.footsteps.forEach((footstepUrl, index) => {
          if (index < footstepTiming.length) {
            playSound(
              footstepUrl,
              footstepVolumes[index],
              footstepTiming[index]
            );
          }
        });
      }

      // Door closing sound near the end (around 2.2s)
      if (sounds.doorClose) {
        setTimeout(() => {
          playSound(sounds.doorClose, 0.6);
        }, 2200);
      }

      // Animation complete after 2.5 seconds
      setTimeout(() => {
        setIsPlaying(false);
        console.log("✅ Door animation sounds playback complete.");
      }, 2500);
    } catch (error) {
      console.warn("❌ Failed to play door animation sounds:", error);
      setIsPlaying(false);
    }
  }, [isPlaying, isLoaded, playSound]);

  // Preload sounds on component mount
  useEffect(() => {
    preloadSounds();
  }, [preloadSounds]);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(soundUrlsRef.current).forEach((url) => {
        if (typeof url === "string") {
          URL.revokeObjectURL(url);
        } else if (Array.isArray(url)) {
          url.forEach((u) => URL.revokeObjectURL(u));
        }
      });
    };
  }, []);

  return {
    playDoorAnimation,
    isPlaying,
    preloadSounds,
    isLoaded,
  };
};

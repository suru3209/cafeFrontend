"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";

const Skiper25 = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* <div className="text-foreground absolute top-[20%] grid content-start justify-items-center gap-6 py-20 text-center">
        <span className="after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']">
          Click to play the music
        </span>
      </div> */}
      <MusicToggleButton />
    </div>
  );
};

export { Skiper25 };

export const MusicToggleButton = () => {
  const bars = 5;

  const getRandomHeights = () => {
    return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
  };

  const [heights, setHeights] = useState(getRandomHeights());

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Array of available audio files
  const audioFiles = [
    "/audio/Deewane.mp3",
    "/audio/High On You.mp3",
    "/audio/Ishqa Ve.mp3",
  ];

  // Use multiple useSound hooks for each audio file
  const [playDeewane, deewaneControls] = useSound(audioFiles[0], {
    loop: true,
    soundEnabled: true,
  });

  const [playHighOnYou, highOnYouControls] = useSound(audioFiles[1], {
    loop: true,
    soundEnabled: true,
  });

  const [playIshqaVe, ishqaVeControls] = useSound(audioFiles[2], {
    loop: true,
    soundEnabled: true,
  });

  const playFunctions = [playDeewane, playHighOnYou, playIshqaVe];
  const pauseFunctions = [
    deewaneControls.pause,
    highOnYouControls.pause,
    ishqaVeControls.pause,
  ];
  const stopFunctions = [
    deewaneControls.stop,
    highOnYouControls.stop,
    ishqaVeControls.stop,
  ];

  useEffect(() => {
    if (isPlaying) {
      const waveformIntervalId = setInterval(() => {
        setHeights(getRandomHeights());
      }, 100);

      return () => {
        clearInterval(waveformIntervalId);
      };
    }
    setHeights(Array(bars).fill(0.1));
  }, [isPlaying]);

  const handleClick = () => {
    if (isPlaying) {
      // Pause current song
      pauseFunctions[currentSongIndex]();
      setIsPlaying(false);
      return;
    }

    // Select a new random song
    const newSongIndex = Math.floor(Math.random() * audioFiles.length);
    setCurrentSongIndex(newSongIndex);

    // Stop all songs first
    stopFunctions.forEach((stop) => stop());

    // Play the new random song
    playFunctions[newSongIndex]();
    setIsPlaying(true);
  };

  return (
    <>
      <motion.div
        onClick={handleClick}
        key="audio"
        initial={{ padding: "14px 14px " }}
        whileHover={{ padding: "18px 22px " }}
        whileTap={{ padding: "18px 22px " }}
        transition={{ duration: 1, bounce: 0.6, type: "spring" }}
        className="bg-background cursor-pointer rounded-full p-2"
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", bounce: 0.35 }}
          className="flex h-[18px] w-full items-center gap-1 rounded-full"
        >
          {/* Waveform visualization */}
          {heights.map((height, index) => (
            <motion.div
              key={index}
              className="bg-foreground w-[1px] rounded-full"
              initial={{ height: 1 }}
              animate={{
                height: Math.max(4, height * 14),
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

/**
 * Skiper 25 Micro Interactions_005 — React + framer motion + use-sound
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */

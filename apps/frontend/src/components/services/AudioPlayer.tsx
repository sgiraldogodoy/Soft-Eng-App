import React, { useState, useEffect, useRef } from "react";
import { SkipForward, SkipBack } from "lucide-react";

type AudioPlayerProps = {
  playlist: string[];
};

function AudioPlayer({ playlist }: AudioPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSongIndex];
      audioRef.current.play();
    }
  }, [currentSongIndex, playlist]);

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length,
    );
  };

  return (
    <div className="bg-slate-400/80 flex flex-col text-center">
      <audio ref={audioRef} controls className="mt-32" />
      <div className="space-x-20 mt-5">
        <button onClick={handlePrev}>
          <SkipBack />
        </button>
        <button onClick={handleNext}>
          <SkipForward />
        </button>
      </div>
    </div>
  );
}

export default AudioPlayer;

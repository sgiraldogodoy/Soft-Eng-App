import React, { useState, useEffect, useRef } from "react";
import { SkipForward, SkipBack } from "lucide-react";
import Dance from "/dancar.gif";

type Song = {
  url: string;
  name: string;
};

type AudioPlayerProps = {
  playlist: Song[];
};

function AudioPlayer({ playlist }: AudioPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [currentSongName, setCurrentSongName] = useState<string>(
    playlist[0].name,
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSongIndex].url;
      audioRef.current.play();
      setCurrentSongName(playlist[currentSongIndex].name);
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
    <div className="bg-gray-400/80 flex flex-col items-center rounded-2xl">
      <p>Currently playing: {currentSongName}</p>
      <img src={Dance} alt="Dancing" />
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

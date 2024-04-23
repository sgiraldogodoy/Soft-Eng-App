import React, { useState, useEffect } from "react";
import { Play, Pause, StopCircle } from "lucide-react";

const TextToSpeech = ({ text }: { text: string }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null,
  );

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    if (!utterance) {
      return;
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div className="text-center py-4">
      <h1 className="text-lg"> Audio Directions</h1>
      <div className="flex flex-row justify-items justify-center py-2 space-x-3">
        <button onClick={handlePlay}>
          <Play />
        </button>
        <button onClick={handlePause}>
          <Pause />
        </button>
        <button onClick={handleStop}>
          <StopCircle />
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;

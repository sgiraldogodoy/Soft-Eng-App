import React, { useState, useEffect } from "react";
import { Play, Pause, StopCircle } from "lucide-react";

const TextToSpeech = ({ text }: { text: string }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null,
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text, selectedVoice, pitch, rate]);

  useEffect(() => {
    setVoices(window.speechSynthesis.getVoices());
  }, []);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    if (!utterance) {
      return;
    }

    utterance.voice = selectedVoice;
    utterance.pitch = pitch;
    utterance.rate = rate;

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
      <div className="flex flex-col">
        <label>
          Voice:
          <select
            value={selectedVoice ? selectedVoice.voiceURI : ""}
            onChange={(e) =>
              setSelectedVoice(
                voices.find((voice) => voice.voiceURI === e.target.value) ||
                  null,
              )
            }
          >
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </label>
        <label>
          Pitch:
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
          />
        </label>
        <label>
          Rate:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default TextToSpeech;

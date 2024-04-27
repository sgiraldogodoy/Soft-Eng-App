import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, StopCircle } from "lucide-react";
import translateText from "./GoogleTranslate";

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
  const [targetLanguage, setTargetLanguage] = useState("en");

  const handleTranslate = useCallback(async () => {
    if (text) {
      const translatedText = await translateText(text, targetLanguage);
      const u = new SpeechSynthesisUtterance(translatedText);
      setUtterance(u);
    }
  }, [text, targetLanguage]);

  useEffect(() => {
    handleTranslate();
  }, [handleTranslate]);

  useEffect(() => {
    setVoices(window.speechSynthesis.getVoices());
  }, []);

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
    }

    if (!utterance) {
      return;
    }

    utterance.voice = selectedVoice;
    utterance.pitch = pitch;
    utterance.rate = rate;

    window.speechSynthesis.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();

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
          Language:
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="zh">Chinese</option>
            <option value="ar">Arabic</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
          </select>
        </label>
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

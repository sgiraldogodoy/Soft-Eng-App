import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, StopCircle } from "lucide-react";
import translateText from "./GoogleTranslate";

const TextToSpeech = ({ text }: { text: string }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null,
  );
  const [rate, setRate] = useState(0.7);
  const [targetLanguage, setTargetLanguage] = useState("en");

  const handleTranslate = useCallback(async () => {
    if (text) {
      const translatedText = await translateText(text, targetLanguage);
      const u = new SpeechSynthesisUtterance(translatedText);
      u.lang = targetLanguage;

      setUtterance(u);
    }
  }, [text, targetLanguage]);

  useEffect(() => {
    handleTranslate();
  }, [handleTranslate]);

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
    }

    if (!utterance) {
      return;
    }

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
            <option value="en-US">English</option>
            <option value="pt-BR">Portuguese</option>
            <option value="ru-RU">Russian</option>
            <option value="zh-CN">Chinese</option>
            <option value="ar-SA">Arabic</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
            <option value="it-IT">Italian</option>
            <option value="ja-JP">Japanese</option>
          </select>
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

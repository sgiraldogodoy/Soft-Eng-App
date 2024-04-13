import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HelloMultipleLanguages = () => {
  const greetings = [
    "Hello", // English
    "Hola", // Spanish
    "Bonjour", // French
    "Ciao", // Italian
    "Hallo", // German
    "Olá", // Portuguese
    "Привет", // Russian
    "你好", // Chinese (Mandarin)
    "こんにちは", // Japanese
    "안녕하세요", // Korean
    "مرحباً", // Arabic
    "नमस्ते", // Hindi
    "Merhaba", // Turkish
    "Hallo", // Dutch
    "Hej", // Swedish
    "Γεια σας", // Greek
    "Hei", // Finnish
    "Cześć", // Polish
  ];
  const [currentGreeting, setCurrentGreeting] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((currentGreeting + 1) % greetings.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [currentGreeting, greetings.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={currentGreeting}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="text-[98px] font-bold"
      >
        {greetings[currentGreeting]}
      </motion.h1>
    </AnimatePresence>
  );
};

export default HelloMultipleLanguages;

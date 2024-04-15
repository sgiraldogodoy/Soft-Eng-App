import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BWH1 from "/HospitalLarge.jpeg";
import BWHCorridor from "/bwh-corridor.jpeg";

const MultipleImagesFade = () => {
  const images = [BWH1, BWHCorridor];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={currentImage}
        src={images[currentImage]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-[600px] h-[400px] object-cover rounded-lg shadow-lg"
      />
    </AnimatePresence>
  );
};

export default MultipleImagesFade;

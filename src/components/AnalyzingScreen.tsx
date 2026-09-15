import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mfecLogo from '../assets/mfec-logo.png';

const AnalyzingScreen: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    "MFEC Architecture Diagnostic",
    "Mapping enterprise tech stack",
    "Calculating tech debt index",
    "Synthesizing your Action Plan"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#030508] relative overflow-hidden">
      
      {/* The Core (Organic Sentient Orb - using radial gradients to prevent Safari box clipping) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 90, 180],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[800px] h-[800px] md:w-[1000px] md:h-[1000px]"
        >
          {/* Multiple layers of radial gradients instead of CSS blurs for perfect edge-blending */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00e5ff_0%,_transparent_60%)] opacity-[0.15] mix-blend-screen" />
          <div className="absolute inset-10 bg-[radial-gradient(circle_at_center,_#0055ff_0%,_transparent_50%)] opacity-[0.15] mix-blend-screen" />
          <div className="absolute inset-32 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_40%)] opacity-[0.05] mix-blend-screen" />
        </motion.div>
      </div>

      {/* Elegant Typography Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="h-16 relative w-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={textIndex}
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute flex items-center gap-4 md:gap-5"
            >
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse" />
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white font-[var(--font-display)] drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] text-center px-4">
                {loadingTexts[textIndex]}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* MFEC Subtle Branding / Advertisement */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <span className="text-zinc-600 text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold">Empowered by</span>
        <div className="flex items-center gap-3">
          <img src={mfecLogo} alt="MFEC" className="h-4 md:h-5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyzingScreen;

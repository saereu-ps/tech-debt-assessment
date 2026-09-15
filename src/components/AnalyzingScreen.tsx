import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnalyzingScreen: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    "Analyzing architecture",
    "Mapping dependencies",
    "Calculating debt index",
    "Finalizing report"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#030508] relative overflow-hidden">
      
      {/* The Core (Organic Sentient Orb like Apple/Vercel AI) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[500px] h-[500px]"
        >
          {/* Multiple layers of extremely soft, deep blurs */}
          <div className="absolute inset-0 bg-[#00e5ff] rounded-full blur-[120px] opacity-30 mix-blend-screen" />
          <div className="absolute inset-10 bg-[#0055ff] rounded-full blur-[100px] opacity-30 mix-blend-screen" />
          <div className="absolute inset-32 bg-white rounded-full blur-[80px] opacity-10 mix-blend-screen" />
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
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-[var(--font-display)] drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                {loadingTexts[textIndex]}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AnalyzingScreen;

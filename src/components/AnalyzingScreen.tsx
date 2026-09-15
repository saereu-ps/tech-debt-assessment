import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnalyzingScreen: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    "Analyzing your architecture...",
    "Evaluating tech debt footprint...",
    "Benchmarking against industry standards...",
    "Synthesizing diagnostic report..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center bg-zinc-950 relative overflow-hidden">
      {/* Deep Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-[500px] h-[500px] bg-gradient-to-tr from-[#0055ff] to-[#00e5ff] rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        
        {/* Sleek Minimalist Spinner */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full animate-[spin_2s_linear_infinite]" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="spinner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#0055ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="46" fill="none" stroke="url(#spinner-grad)" strokeWidth="2" strokeLinecap="round" strokeDasharray="150 200" />
          </svg>
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_15px_#00e5ff]" />
        </div>

        {/* Elegant Text */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 font-[var(--font-display)]">
            Computing Results
          </h2>
          
          <div className="h-6 relative w-[300px] sm:w-[400px] flex justify-center">
            <AnimatePresence mode="wait">
              <motion.p 
                key={textIndex}
                initial={{ opacity: 0, filter: "blur(4px)", y: 5 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(4px)", y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-500 text-sm md:text-base font-medium absolute text-center w-full tracking-wide"
              >
                {loadingTexts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzingScreen;

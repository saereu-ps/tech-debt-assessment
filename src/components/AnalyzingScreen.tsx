import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const AnalyzingScreen: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    "Encrypting session...",
    "Scanning enterprise architecture...",
    "Aggregating tech debt vectors...",
    "Calculating final index...",
    "Generating executive report..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
    }, 500); // changes every 500ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#090e15] relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-30 mix-blend-screen pointer-events-none" />
      
      {/* Laser scan line */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-[#00e5ff] shadow-[0_0_20px_#00e5ff] z-0 opacity-50"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border border-dashed border-[#00e5ff]/40 absolute inset-0"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border-t border-b border-[#00e5ff] opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 size={32} className="text-[#00e5ff] animate-spin" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 h-16">
          <h2 className="text-white text-xl md:text-2xl font-[var(--font-display)] font-bold tracking-widest uppercase">
            Analyzing
          </h2>
          <motion.p 
            key={textIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[#00e5ff] text-sm md:text-base font-mono"
          >
            {loadingTexts[textIndex]}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyzingScreen;

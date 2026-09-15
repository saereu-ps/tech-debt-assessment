import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScanningTransitionProps {
  onComplete: () => void;
  userData: { name: string; company: string };
}

const ScanningTransition: React.FC<ScanningTransitionProps> = ({ onComplete, userData }) => {
  const [logs, setLogs] = useState<string[]>([]);
  
  // Fake terminal scan logs
  useEffect(() => {
    const sequence = [
      `Initializing scan for ${userData.company}...`,
      "Analyzing infrastructure architecture...",
      "Connecting to deployment pipelines...",
      "Evaluating code quality metrics...",
      "Assessing security vulnerabilities...",
      "Scan complete. Compiling assessment..."
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < sequence.length) {
        setLogs(prev => [...prev, sequence[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 400); // 400ms per log = ~2.5 seconds total

    return () => clearInterval(interval);
  }, [onComplete, userData.company]);

  return (
    <div className="min-h-screen bg-[#03050a] flex flex-col items-center justify-center p-6 text-[#00e5ff] font-mono">
      {/* Outer Scanning Ring */}
      <div className="relative w-48 h-48 mb-12">
        {/* Static faint ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#00e5ff]/20"></div>
        {/* Animated glowing ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#00e5ff] shadow-[0_0_20px_#00e5ff]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
        {/* Inner static crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center opacity-50">
           <div className="w-full h-px bg-[#00e5ff]/30"></div>
           <div className="w-px h-full bg-[#00e5ff]/30 absolute"></div>
        </div>
        {/* Pulse center */}
        <motion.div 
          className="absolute inset-0 m-auto w-4 h-4 bg-[#00e5ff] rounded-full"
          animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-black mb-8 tracking-widest uppercase text-white animate-pulse">
        System Analysis
      </h2>

      {/* Terminal Output */}
      <div className="w-full max-w-lg h-48 bg-[#061124]/50 border border-[#00e5ff]/30 rounded-lg p-4 overflow-hidden relative backdrop-blur-md">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-50"></div>
        <ul className="text-sm md:text-base space-y-2">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <span className="text-emerald-400">{'>'}</span>
              <span className="opacity-90">{log}</span>
            </motion.div>
          ))}
          {/* Blinking cursor on the active line */}
          {logs.length < 6 && (
            <motion.div 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-[#00e5ff] ml-5 mt-2"
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default ScanningTransition;

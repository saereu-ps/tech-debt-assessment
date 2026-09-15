import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnalyzingScreen: React.FC = () => {
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  
  const allLogs = [
    "[SYS] Initiating architecture diagnostic...",
    "[SEC] Validating security posture & compliance...",
    "[OPS] Analyzing deployment frequency...",
    "[ARC] Evaluating cloud nativity & scalability...",
    "[DAT] Mapping data governance protocols...",
    "[SYS] Quantifying technical debt payload...",
    "[AI] Synthesizing final executive report..."
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < allLogs.length) {
        setActiveLogs(prev => [...prev, allLogs[index]]);
        index++;
      }
    }, 350); // Fast log scrolling

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden font-mono">
      
      {/* Enterprise Grid Background (Google Cloud / AWS vibe) */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)'
        }}
      />

      {/* Glowing connection nodes (Abstract Infrastructure) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        >
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-[#00e5ff] rounded-full shadow-[0_0_15px_#00e5ff]" />
          <div className="absolute top-1/3 right-0 w-1.5 h-1.5 bg-[#0055ff] rounded-full shadow-[0_0_10px_#0055ff]" />
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
          
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 600 600">
            <line x1="150" y1="0" x2="600" y2="200" stroke="#00e5ff" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="600" y1="200" x2="200" y2="450" stroke="#0055ff" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </motion.div>
      </div>

      {/* Glassmorphic Terminal Window */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-[90%] max-w-[500px] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="w-full bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold ml-2">Diagnostic Protocol</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]"
          />
        </div>

        {/* Terminal Logs */}
        <div className="p-5 md:p-6 h-[200px] flex flex-col justify-end overflow-hidden">
          <div className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {activeLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i === activeLogs.length - 1 ? 1 : 0.4, x: 0 }}
                  className="text-[12px] md:text-[13px]"
                >
                  <span className="text-[#00e5ff]">root@mfec</span>
                  <span className="text-zinc-500 mx-2">~</span>
                  <span className={i === activeLogs.length - 1 ? "text-white" : "text-zinc-400"}>
                    {log}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Blinking Cursor */}
            <motion.div 
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="w-2 h-4 bg-[#00e5ff] mt-1"
            />
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default AnalyzingScreen;

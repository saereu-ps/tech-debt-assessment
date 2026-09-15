import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, FastForward } from 'lucide-react';
import { assessmentData } from '../data/assessmentData';

interface AssessmentStepperProps {
  onComplete: (scores: number[]) => void;
}

const AssessmentStepper: React.FC<AssessmentStepperProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // 0 = unanswered, -1 = skipped, >0 = score
  const [scores, setScores] = useState<number[]>(new Array(assessmentData.length).fill(0));

  const currentMetric = assessmentData[currentIndex];

  const handleSelect = (score: number) => {
    const newScores = [...scores];
    newScores[currentIndex] = score;
    setScores(newScores);
  };

  const handleNext = () => {
    if (scores[currentIndex] === 0) return;
    if (currentIndex < assessmentData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(scores);
    }
  };

  const handleSkip = () => {
    const newScores = [...scores];
    newScores[currentIndex] = -1; // -1 represents skipped
    setScores(newScores);
    if (currentIndex < assessmentData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newScores);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } }
  };

  // Enlarge Circular Layout Math
  const radius = 200; // Increased from 155
  const center = 250; // Increased from 200 (500x500 container)
  const items = assessmentData.map((_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    };
  });

  return (
    <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      
      {/* Sci-Fi Background Glows - Using radial-gradient instead of heavy CSS blur for massive performance boost */}
      <div className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] rounded-full pointer-events-none" 
           style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] rounded-full pointer-events-none" 
           style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)' }} />
      
      {/* Tech Grid overlay - Removed expensive mix-blend-screen */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-40 pointer-events-none" />

      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-16 lg:gap-24 relative z-10 px-8 py-12 items-center scale-[0.85] md:scale-90 xl:scale-95 2xl:scale-100 origin-center">
        
        {/* Left Column: Enlarged Sci-Fi Circular Stepper */}
        <div className="relative w-[500px] h-[500px] flex-shrink-0 mx-auto">
          
          {/* SVG Complex Background Ring */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff00cc" />
                <stop offset="50%" stopColor="#00e5ff" />
                <stop offset="100%" stopColor="#0055ff" />
              </linearGradient>
              <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff00cc" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0055ff" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* Outer dotted tracking ring (Sci-Fi Radar feel) */}
            <motion.circle 
              cx="250" cy="250" r="230" 
              fill="none" 
              stroke="#00e5ff" 
              strokeWidth="1.5" 
              strokeDasharray="4 16"
              opacity="0.2"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "center" }}
            />
            
            {/* Inner faint ring */}
            <circle cx="250" cy="250" r="160" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.03" />

            {/* Base gradient track (Fuller look) */}
            <circle 
              cx="250" cy="250" r="200" 
              fill="none" 
              stroke="url(#trackGradient)" 
              strokeWidth="30" 
              strokeDasharray="211 40.3" 
              strokeDashoffset="20"
              transform="rotate(-90 250 250)"
            />
            
            {/* Active colorful progress ring with optimized drop-shadow */}
            <motion.circle 
              cx="250" cy="250" r="200" 
              fill="none" 
              stroke="url(#progressGradient)" 
              strokeWidth="30" 
              strokeDasharray="211 1500" 
              initial={false}
              animate={{ strokeDashoffset: -(251.3 * currentIndex) + 20 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              transform="rotate(-90 250 250)"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0px 0px 15px rgba(0,229,255,0.6))" }}
            />
          </svg>

          {/* Center Radar Dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-[8px] h-[8px] rounded-full bg-[#00e5ff] shadow-[0_0_15px_#00e5ff]" 
            />
          </div>

          {/* Stepper Items */}
          {assessmentData.map((metric, idx) => {
            const isActive = idx === currentIndex;
            const isPast = idx < currentIndex;
            const isSkipped = scores[idx] === -1;
            const isCompleted = scores[idx] > 0;
            
            const { x, y } = items[idx];
            
            // Determine colors for past items
            let textColorClass = "text-zinc-600";
            let labelColorClass = "text-zinc-500";
            let dotColor = "bg-transparent";

            if (isPast) {
              if (isSkipped) {
                textColorClass = "text-[#ff4d4d]";
                labelColorClass = "text-[#ff4d4d]/80";
                dotColor = "bg-[#ff4d4d] shadow-[0_0_10px_#ff4d4d]";
              } else if (isCompleted) {
                textColorClass = "text-zinc-300";
                labelColorClass = "text-zinc-400";
                dotColor = "bg-[#00b8d4] dark:bg-[#00e5ff] shadow-none dark:shadow-[0_0_10px_#00e5ff]";
              }
            }
            
            return (
              <div 
                key={metric.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer group"
                style={{ left: x, top: y }}
                onClick={() => idx < currentIndex && setCurrentIndex(idx)}
              >
                {/* Inactive State Background Text */}
                <div className={`text-center transition-all duration-700 relative ${isActive ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                  {/* Status Dot for past items */}
                  {isPast && (
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${dotColor}`} />
                  )}
                  <div className={`text-[28px] font-[var(--font-display)] font-bold leading-none mb-1 transition-colors duration-500 ${textColorClass}`}>
                    0{idx + 1}
                  </div>
                  <div className={`text-[11px] font-bold tracking-[0.1em] uppercase leading-tight transition-colors duration-500 ${labelColorClass}`}>
                    {metric.shortTitle}
                  </div>
                </div>

                {/* Active State Glowing Box */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      className="absolute flex flex-col items-center justify-center bg-transparent dark:bg-[#0a0a0f]/90 backdrop-blur-none dark:backdrop-blur-xl border-none dark:border-solid border-white/20 rounded-2xl p-5 shadow-none dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)] min-w-[120px] z-20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <div className="absolute -inset-6 bg-gradient-to-br from-[#ff00cc]/30 via-[#00e5ff]/30 to-[#0055ff]/30 blur-2xl rounded-[40px] -z-10" />
                      
                      <div className="text-[36px] font-[var(--font-display)] font-black bg-gradient-to-br from-[#ff00cc] via-[#00e5ff] to-[#0055ff] bg-clip-text text-transparent leading-none mb-1 drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                        0{idx + 1}
                      </div>
                      <div className="text-[12px] font-bold tracking-[0.2em] text-zinc-900 dark:text-white uppercase text-center">
                        {metric.shortTitle}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col justify-center w-full relative z-10 lg:pl-10">
          <motion.div
            key={currentMetric.id}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full"
          >
              <motion.div variants={itemVariants} className="mb-10">
                <span className="text-[11px] font-bold tracking-[0.3em] text-[#00e5ff] uppercase flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff] animate-pulse" />
                  Metric 0{currentIndex + 1}
                </span>
                <h2 className="text-[44px] font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.15] drop-shadow-md">{currentMetric.title}</h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-[16px] font-medium tracking-wide mt-3 leading-relaxed">{currentMetric.description}</p>
              </motion.div>

              {/* High-End Interactive Options */}
              <div className="space-y-4">
                {currentMetric.choices.map((choice) => {
                  const isSelected = scores[currentIndex] === choice.score;
                  
                  return (
                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.015, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      key={choice.score}
                      onClick={() => handleSelect(choice.score)}
                      className={`
                        w-full text-left p-6 rounded-2xl transition-all duration-300 flex items-start gap-5 group border relative overflow-hidden backdrop-blur-md
                        ${isSelected 
                          ? 'bg-cyan-50/50 dark:bg-[#00e5ff]/[0.05] border-cyan-400/50 dark:border-[#00e5ff]/40 shadow-sm dark:shadow-[0_0_30px_rgba(0,229,255,0.08)]' 
                          : 'bg-white/40 dark:bg-white/[0.01] border-black/5 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/[0.03] hover:border-black/10 dark:hover:border-white/10 shadow-sm dark:shadow-none'}
                      `}
                    >
                      {/* Animated Radio Circle */}
                      <div className={`
                        w-[22px] h-[22px] rounded-full border-[1.5px] mt-1 flex-shrink-0 flex items-center justify-center transition-all duration-300
                        ${isSelected ? 'border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.5)]' : 'border-zinc-600 group-hover:border-zinc-400'}
                      `}>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="w-[10px] h-[10px] rounded-full bg-[#00e5ff]" 
                            />
                          )}
                        </AnimatePresence>
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col gap-1.5 pt-0.5 relative z-10">
                        <p className="text-[16px] leading-relaxed tracking-wide">
                          <span className={`font-semibold transition-colors duration-300 ${isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white'}`}>
                            {choice.label}
                          </span> 
                          <span className={`font-medium ml-2 transition-colors duration-300 ${isSelected ? 'text-zinc-600 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-500 dark:group-hover:text-zinc-400'}`}>
                            {choice.description}
                          </span>
                        </p>
                        <p className={`text-[14px] font-medium tracking-wide transition-colors duration-300 ${isSelected ? 'text-[#00b8d4] dark:text-[#00e5ff]/90' : 'text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-500'}`}>
                          {choice.thaiDescription}
                        </p>
                      </div>
                      
                      {/* Edge Highlight Sweep */}
                      {isSelected && (
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1 bg-[#00b8d4] dark:bg-[#00e5ff] shadow-none dark:shadow-[0_0_20px_#00e5ff]" 
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

          {/* Navigation - Sleek Modern Buttons */}
          <div className="flex items-center justify-between mt-12 pt-6">
            <button 
              onClick={handlePrev}
              className={`flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              <ArrowLeft size={16} strokeWidth={2} /> PREVIOUS
            </button>

            <div className="flex items-center gap-4">
              {/* Skip Button */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSkip}
                className="px-8 py-3.5 rounded-full text-[12px] font-bold flex items-center gap-2 tracking-[0.2em] transition-all duration-300 group bg-black/5 dark:bg-white/[0.03] hover:bg-black/10 dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)]"
              >
                SKIP <FastForward size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Continue Button */}
              <motion.button 
                whileHover={scores[currentIndex] !== 0 ? { scale: 1.05 } : {}}
                whileTap={scores[currentIndex] !== 0 ? { scale: 0.95 } : {}}
                onClick={handleNext}
                disabled={scores[currentIndex] === 0}
                className={`
                  px-8 py-3.5 rounded-full text-[12px] font-bold flex items-center gap-3 tracking-[0.2em] transition-all duration-300 group backdrop-blur-md relative overflow-hidden
                  ${scores[currentIndex] !== 0 
                    ? 'bg-cyan-50 dark:bg-[#00e5ff]/10 hover:bg-cyan-100 dark:hover:bg-[#00e5ff]/20 border border-cyan-300 dark:border-[#00e5ff]/50 hover:border-cyan-400 dark:hover:border-[#00e5ff] text-[#008b9e] dark:text-white shadow-sm dark:shadow-[0_0_30px_rgba(0,229,255,0.2)]' 
                    : 'bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'}
                `}
              >
                {scores[currentIndex] !== 0 && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -z-10 w-[200%]"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
                CONTINUE 
                <motion.div
                  animate={scores[currentIndex] !== 0 ? { x: [0, 4, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={16} strokeWidth={2.5} className={scores[currentIndex] !== 0 ? "text-[#00e5ff]" : "text-zinc-600"} />
                </motion.div>
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssessmentStepper;

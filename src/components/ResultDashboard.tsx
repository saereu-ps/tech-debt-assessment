import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, TrendingUp, AlertTriangle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import type { UserInfo } from '../App';
import { getResultTier, resultDetails, assessmentData } from '../data/assessmentData';

interface ResultDashboardProps {
  userInfo: UserInfo;
  scores: number[];
  onRestart: () => void;
}

const ResultDashboard: React.FC<ResultDashboardProps> = ({ userInfo, scores, onRestart }) => {
  const totalScore = scores.filter(s => s > 0).reduce((a, b) => a + b, 0);
  const tier = getResultTier(totalScore);
  const details = resultDetails[tier];

  // Encode User Data and Scores into Base64 for the URL
  // Wrap in encodeURIComponent to prevent '+' from becoming spaces in URLs
  const payload = encodeURIComponent(btoa(encodeURIComponent(JSON.stringify({
    s: scores,
    n: userInfo.name,
    c: userInfo.company
  }))));
  
  const reportUrl = `${window.location.origin}${window.location.pathname}?d=${payload}`;

  // Calculate Insights
  const validScores = scores.map((score, index) => ({ score, index })).filter(s => s.score > 0);
  let bestIdx = -1;
  let worstIdx = -1;
  
  if (validScores.length > 0) {
    let maxScore = -1;
    let minScore = 6;
    validScores.forEach(s => {
      if (s.score > maxScore) { maxScore = s.score; bestIdx = s.index; }
      if (s.score < minScore) { minScore = s.score; worstIdx = s.index; }
    });
    // If all scores are equal, don't show the same one for both
    if (bestIdx === worstIdx && validScores.length > 1) {
      worstIdx = validScores[1].index; 
    }
  }

  const keyStrength = bestIdx !== -1 ? assessmentData[bestIdx] : null;
  const criticalFocus = worstIdx !== -1 ? assessmentData[worstIdx] : null;

  // Animation variants
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10 px-5 md:px-12 relative overflow-hidden bg-[#060a0f]">
      
      {/* Sci-Fi Background Glows */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-[-10%] w-[1000px] h-[1000px] blur-[200px] rounded-full pointer-events-none" 
        style={{ backgroundColor: `var(--color-${details.color})`, opacity: 0.05 }}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] blur-[250px] rounded-full pointer-events-none"
        style={{ backgroundColor: `var(--color-${details.color})` }}
      />
      
      {/* Tech Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-70 pointer-events-none mix-blend-screen" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-[1500px] relative z-10 flex flex-col h-full min-h-[90vh]"
      >
        
        {/* Header - Executive Profile */}
        <motion.header variants={itemVariants} className="flex justify-between items-start w-full mb-12">
          <div className="flex flex-col gap-6">
            <img src="/New-Logo-MFEC-More_Black-2.png" alt="MFEC Logo" className="h-10 md:h-12 w-[140px] object-contain filter brightness-0 invert opacity-95 drop-shadow-lg self-start" />
            
            <div className="bg-[#0b1426]/60 border border-[#00e5ff]/20 backdrop-blur-xl px-6 py-4 rounded-2xl flex items-center gap-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(0,229,255,0.4)] relative" style={{ background: `linear-gradient(135deg, var(--color-${details.color}), #0055ff)` }}>
                {userInfo.name.charAt(0).toUpperCase()}
                <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-[10px] text-[#00e5ff] font-bold tracking-[0.2em] uppercase">{userInfo.company}</h4>
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  <span className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase">Executive Report</span>
                </div>
                <h3 className="text-[18px] text-white font-black tracking-wide leading-none">{userInfo.name}</h3>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content Grid - Perfectly Balanced Layout */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-x-32 gap-y-16 items-start w-full">
          
          {/* Left Column: Diagnostics & Data */}
          <div className="flex flex-col w-full h-full">
            <motion.div variants={itemVariants}>
              <h4 className="text-[11px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-2">Diagnostic Score</h4>
              <div className="flex items-baseline leading-[0.8] tracking-tighter relative">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                  className="text-[120px] md:text-[140px] font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] font-[var(--font-display)]"
                >
                  {totalScore}
                </motion.span>
                <span className="text-[32px] md:text-[36px] font-bold text-zinc-700 ml-2 -mb-2 font-[var(--font-display)]">/25</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 mb-16 max-w-[650px]">
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 35 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="h-[3px] bg-zinc-600" 
                />
                <h4 className="text-[12px] text-zinc-500 font-bold tracking-[0.2em] uppercase">Current Status</h4>
              </div>
              <p className="text-[20px] md:text-[24px] text-zinc-300 font-medium leading-[1.6] tracking-wide">
                {details.status.split('\n\n')[0]}
              </p>
            </motion.div>

            {/* 5-Dimension Tech Breakdown */}
            <motion.div variants={itemVariants} className="w-full max-w-[650px] bg-[#090e15]/50 backdrop-blur-md border border-white/5 p-10 rounded-3xl mt-auto shadow-2xl">
              <h4 className="text-[11px] text-white font-bold tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: `var(--color-${details.color})`, boxShadow: `0 0 10px var(--color-${details.color})` }} />
                Dimension Breakdown
              </h4>
              
              <div className="space-y-6">
                {assessmentData.map((metric, idx) => {
                  const rawScore = scores[idx];
                  const displayScore = rawScore > 0 ? rawScore : 0;
                  
                  return (
                    <div key={metric.id} className="flex items-center gap-5">
                      <div className="w-[120px] text-[11px] font-bold tracking-[0.15em] text-zinc-400 uppercase">
                        {metric.shortTitle}
                      </div>
                      <div className="flex-1 flex gap-2">
                        {[1, 2, 3, 4, 5].map(step => (
                          <motion.div 
                            key={step} 
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.4, delay: 0.5 + (idx * 0.1) + (step * 0.05) }}
                            className={`h-[12px] flex-1 rounded-full transition-colors duration-500 origin-bottom`}
                            style={{ 
                              backgroundColor: step <= displayScore ? `var(--color-${details.color})` : 'rgba(255,255,255,0.03)',
                              boxShadow: step <= displayScore ? `0 0 10px var(--color-${details.color})` : 'none',
                              opacity: step <= displayScore ? 1 - ((5 - displayScore) * 0.05) : 1
                            }}
                          />
                        ))}
                      </div>
                      <div className="w-[30px] text-right text-[12px] font-bold text-white font-[var(--font-display)]">
                        {displayScore}/5
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Title & Insights & Action */}
          <div className="flex flex-col h-full lg:pl-16 lg:border-l border-white/[0.04]">
            
            {/* Title */}
            <motion.div variants={itemVariants} className="pt-2">
              <h3 className="text-zinc-500 text-[11px] font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-3">
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: `var(--color-${details.color})`, boxShadow: `0 0 10px var(--color-${details.color})` }}
                />
                {details.subtitle}
              </h3>
              <h2 
                className="text-[52px] md:text-[64px] font-bold tracking-tight leading-[1.05] max-w-[550px] font-[var(--font-display)]"
                style={{ color: `var(--color-${details.color})`, textShadow: `0 0 40px var(--color-${details.color})` }}
              >
                {details.title}
              </h2>
            </motion.div>

            {/* NEW: Computed Insights Panel (Balancing the Right Column) */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-12 w-full max-w-[700px]">
              {/* Key Strength */}
              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#00e5ff]">
                  <TrendingUp size={14} strokeWidth={2.5} />
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-90">Key Strength</span>
                </div>
                <div className="text-white text-[14px] font-semibold leading-tight">
                  {keyStrength ? keyStrength.shortTitle : "N/A"}
                </div>
              </div>
              
              {/* Critical Focus */}
              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl flex flex-col gap-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#ff4d4d]/[0.02] pointer-events-none" />
                <div className="flex items-center gap-2 text-[#ff4d4d]">
                  <AlertTriangle size={14} strokeWidth={2.5} />
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-90">Critical Focus</span>
                </div>
                <div className="text-white text-[14px] font-semibold leading-tight">
                  {criticalFocus ? criticalFocus.shortTitle : "N/A"}
                </div>
              </div>
            </motion.div>

            {/* Action Card */}
            <motion.div variants={itemVariants} className="mt-12 w-full max-w-[700px]">
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-[#0b1426]/40 backdrop-blur-xl border border-white/10 p-12 md:p-14 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] group cursor-default"
              >
                {/* Glowing edge indicator */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-2 shadow-[0_0_20px_currentColor] transition-all duration-500 group-hover:w-3"
                  style={{ backgroundColor: `var(--color-${details.color})` }}
                />

                <div className="space-y-6">
                  <h4 className="text-[12px] font-bold tracking-[0.25em] uppercase opacity-70" style={{ color: `var(--color-${details.color})` }}>
                    Executive Action
                  </h4>
                  <p className="text-[24px] md:text-[28px] font-semibold text-white leading-[1.6] tracking-wide">
                    {details.action.split('\n\n')[0]}
                  </p>
                  {details.action.split('\n\n')[1] && (
                    <p className="text-[16px] md:text-[18px] font-medium leading-relaxed tracking-wide text-zinc-400">
                      {details.action.split('\n\n')[1]}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
          
        </main>

        {/* Footer Bar - Minimal QR & Action */}
        <motion.footer variants={itemVariants} className="mt-auto pt-16 flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-10">
          
          {/* Minimal QR Scanner */}
          <div className="flex items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-3.5 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-shadow duration-300 cursor-pointer"
            >
              <QRCodeSVG value={reportUrl} size={76} level="M" />
            </motion.div>
            
            <div className="space-y-2">
              <h4 className="font-bold text-white text-[16px] tracking-wide">Export Full Report</h4>
              <p className="text-[11px] text-zinc-500 tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse" />
                Scan via Mobile
              </p>
            </div>
          </div>

          {/* New Session Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="flex items-center gap-3 text-zinc-400 hover:text-white transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 px-8 py-4 rounded-2xl group shadow-lg"
          >
            <RefreshCw size={16} strokeWidth={2.5} className="group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase">New Session</span>
          </motion.button>
        </motion.footer>

      </motion.div>
    </div>
  );
};

export default ResultDashboard;

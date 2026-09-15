import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { RefreshCw, TrendingUp, AlertTriangle, Phone, Mail, ArrowRight, User } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import type { UserInfo } from '../App';
import { getResultTier, resultDetails, assessmentData } from '../data/assessmentData';
import mfecLogo from '../assets/mfec-logo.png';

interface ResultDashboardProps {
  userInfo: UserInfo;
  scores: number[];
  onRestart: () => void;
  isSharedReport?: boolean;
}

const ResultDashboard: React.FC<ResultDashboardProps> = ({ userInfo, scores, onRestart, isSharedReport = false }) => {
  const { theme } = useTheme();
  const totalScore = scores.filter(s => s > 0).reduce((a, b) => a + b, 0);
  const tier = getResultTier(totalScore);
  const details = resultDetails[tier];

  // Encode User Data and Scores into Base64 for the URL
  // Wrap in encodeURIComponent to prevent '+' from becoming spaces in URLs
  const payload = btoa(encodeURIComponent(JSON.stringify({
    s: scores,
    n: userInfo.name,
    c: userInfo.company,
    r: userInfo.role
  })));
  
  const reportUrl = `${window.location.origin}${window.location.pathname}?d=${encodeURIComponent(payload)}`;

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
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center py-4 lg:py-4 px-4 md:px-8 lg:px-12 relative bg-transparent">
      
      {/* Sci-Fi Background Glows */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: theme === 'dark' ? 0.06 : 0.02, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-0 left-[-10%] w-[1000px] h-[1000px] blur-[200px] rounded-full pointer-events-none transform-gpu" 
        style={{ backgroundColor: `var(--color-${details.color})` }}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: theme === 'dark' ? 0.15 : 0.03, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] blur-[250px] rounded-full pointer-events-none transform-gpu"
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
        <motion.header variants={itemVariants} className="flex justify-between items-start w-full mb-3 lg:mb-4">
          <div className="flex flex-col gap-6">
            <img src={mfecLogo} alt="MFEC Logo" className="h-10 md:h-12 w-[140px] object-contain filter brightness-0 invert opacity-95 drop-shadow-lg self-start" />
            
            <div className="bg-white/40 dark:bg-[#0b1426]/40 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm p-4 md:p-5 rounded-2xl flex items-center gap-4 transition-all w-full sm:w-auto mt-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e5ff]/5 blur-2xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,229,255,0.2)] relative shrink-0" style={{ background: `linear-gradient(135deg, var(--color-${details.color}), #0055ff)` }}>
                <User size={22} strokeWidth={2.5} />
                <div className="absolute inset-0 rounded-full border border-white/20"></div>
              </div>
              <div className="flex flex-col w-full overflow-hidden z-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold tracking-widest uppercase">
                    Profile
                  </span>
                  {userInfo.company && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20 shrink-0" />
                      <span className="text-[10px] text-[#00e5ff] font-bold tracking-[0.15em] uppercase truncate">
                        {userInfo.company}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-[18px] md:text-[22px] text-zinc-900 dark:text-white font-black tracking-tight leading-none truncate mb-1.5 font-[var(--font-display)]">
                  {userInfo.name || "N/A"}
                </h3>
                {userInfo.role && (
                  <span className="text-[13px] md:text-[14px] text-zinc-600 dark:text-zinc-400 font-medium truncate">
                    {userInfo.role}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content Grid - Perfectly Balanced Layout */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-x-10 xl:gap-x-32 gap-y-4 md:gap-y-8 lg:gap-y-6 items-start w-full">
          
          {/* Left Column: Diagnostics & Data */}
          <div className="flex flex-col w-full h-full">
            <motion.div variants={itemVariants} className="flex flex-col">
              <h4 className="text-[11px] text-zinc-900 dark:text-white/50 font-bold tracking-[0.2em] uppercase mb-2">Diagnostic Score</h4>
              <div className="flex items-baseline leading-[0.8] tracking-tighter relative">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                  className="text-[120px] md:text-[160px] lg:text-[200px] font-black leading-none tracking-tighter text-zinc-900 dark:text-white font-[var(--font-display)]"
                  style={{ textShadow: theme === 'dark' ? `0 0 60px var(--color-${details.color})` : 'none' }}
                >
                  {totalScore}
                </motion.span>
                <span className="text-[32px] md:text-[48px] lg:text-[64px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-zinc-500 to-zinc-400 dark:from-white/60 dark:to-white/20 ml-1 md:ml-2 font-[var(--font-display)] pb-4 md:pb-8">/25</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 mb-16 max-w-[650px]">
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 35 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="h-[3px] bg-zinc-600" 
                />
                <h4 className="text-[12px] text-zinc-900 dark:text-white/50 font-bold tracking-[0.2em] uppercase">Current Status</h4>
              </div>
              <p className="text-[20px] md:text-[24px] text-zinc-300 font-medium leading-[1.6] tracking-wide">
                {details.status.split('\n\n')[0]}
              </p>
            </motion.div>

            {/* 5-Dimension Tech Breakdown */}
            <motion.div variants={itemVariants} className="w-full max-w-[650px] bg-white/50 dark:bg-[#090e15]/60 backdrop-blur-md border border-black/5 dark:border-white/10 p-4 md:p-5 lg:p-6 rounded-2xl mt-4 lg:mt-auto shadow-2xl relative z-10">
              <h4 className="text-[11px] text-zinc-900 dark:text-white font-bold tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: `var(--color-${details.color})`, boxShadow: `0 0 10px var(--color-${details.color})` }} />
                Dimension Breakdown
              </h4>
              
              <div className="flex flex-col gap-2 md:gap-3 lg:gap-3">
                {assessmentData.map((metric, idx) => {
                  const rawScore = scores[idx];
                  const displayScore = rawScore > 0 ? rawScore : 0;
                  
                  return (
                    <div key={metric.id} className="flex items-center gap-5">
                      <div className="w-[120px] text-[11px] font-bold tracking-[0.15em] text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 uppercase">
                        {metric.shortTitle}
                      </div>
                      <div className="flex-1 flex gap-2">
                        {[1, 2, 3, 4, 5].map(step => (
                          <motion.div 
                            key={step} 
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 + (idx * 0.05) + (step * 0.02) }}
                            className={`h-[12px] flex-1 rounded-full transition-colors duration-500 origin-bottom`}
                            style={{ 
                              backgroundColor: step <= displayScore ? `var(--color-${details.color})` : 'rgba(255,255,255,0.03)',
                              boxShadow: step <= displayScore ? `0 0 10px var(--color-${details.color})` : 'none',
                              opacity: step <= displayScore ? 1 - ((5 - displayScore) * 0.05) : 1
                            }}
                          />
                        ))}
                      </div>
                      <div className="w-[30px] text-right text-[12px] font-bold text-zinc-900 dark:text-white font-[var(--font-display)]">
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
              <h3 className="text-zinc-400 dark:text-zinc-500 text-[11px] font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-3">
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: `var(--color-${details.color})`, boxShadow: `0 0 10px var(--color-${details.color})` }}
                />
                {details.subtitle}
              </h3>
              <h2 
                className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[64px] font-black tracking-tight leading-[1.05] max-w-[550px] font-[var(--font-display)] text-zinc-900 dark:text-white"
                style={{ textShadow: theme === 'dark' ? `0 0 20px var(--color-${details.color}), 0 0 40px var(--color-${details.color}), 0 0 80px var(--color-${details.color})` : 'none' }}
              >
                {details.title}
              </h2>
            </motion.div>

            {/* NEW: Computed Insights Panel (Balancing the Right Column) */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8 xl:mt-4 md:mt-6 xl:mt-12 w-full max-w-[700px]">
              {/* Key Strength */}
              <div className="bg-white/40 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 p-4 md:p-5 lg:p-6 rounded-2xl flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#00e5ff]">
                  <TrendingUp size={14} strokeWidth={2.5} />
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-90">Key Strength</span>
                </div>
                <div className="text-zinc-900 dark:text-white text-[14px] font-semibold leading-tight">
                  {keyStrength ? keyStrength.shortTitle : "N/A"}
                </div>
              </div>
              
              {/* Critical Focus */}
              <div className="bg-white/40 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 p-4 md:p-5 lg:p-6 rounded-2xl flex flex-col gap-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#ff4d4d]/[0.02] pointer-events-none" />
                <div className="flex items-center gap-2 text-[#ff4d4d]">
                  <AlertTriangle size={14} strokeWidth={2.5} />
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-90">Critical Focus</span>
                </div>
                <div className="text-zinc-900 dark:text-white text-[14px] font-semibold leading-tight">
                  {criticalFocus ? criticalFocus.shortTitle : "N/A"}
                </div>
              </div>
            </motion.div>

            {/* Action Card */}
            <motion.div variants={itemVariants} className="mt-12 w-full max-w-[700px]">
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/70 dark:bg-[#0b1426]/60 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] group cursor-default"
              >
                {/* Glowing edge indicator */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-2 transition-all duration-500 group-hover:w-3"
                  style={{ backgroundColor: `var(--color-${details.color})`, boxShadow: `0 0 20px var(--color-${details.color})` }}
                />

                <div className="space-y-6">
                  <h4 className="text-[12px] font-bold tracking-[0.25em] uppercase opacity-70" style={{ color: `var(--color-${details.color})` }}>
                    Executive Action
                  </h4>
                  <p className="text-[18px] sm:text-[20px] md:text-[28px] font-semibold text-zinc-900 dark:text-white leading-[1.6] tracking-wide">
                    {details.action.split('\n\n')[0]}
                  </p>
                  {details.action.split('\n\n')[1] && (
                    <p className="text-[16px] md:text-[18px] font-medium leading-relaxed tracking-wide text-zinc-400 dark:text-zinc-500 dark:text-zinc-400">
                      {details.action.split('\n\n')[1]}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
          
        </main>

        {/* Call To Action - Contact MFEC */}
        <motion.div 
          variants={itemVariants} 
          className="mt-4 md:mt-6 lg:mt-6 w-full max-w-[1500px] bg-gradient-to-r from-[#0055ff]/10 to-[#00e5ff]/5 border border-[#00e5ff]/20 p-4 md:p-5 lg:py-6 lg:px-8 rounded-[2.5rem] shadow-[0_0_40px_rgba(0,229,255,0.05)] relative overflow-hidden flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-20"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00e5ff]/15 blur-[100px] rounded-full pointer-events-none transform-gpu translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex flex-col gap-4 relative z-10 max-w-[600px] text-center lg:text-left">
            <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-zinc-900 dark:text-white leading-[1.1] font-[var(--font-display)]">
              Ready to eliminate your <span className="text-[#00e5ff]">Tech Debt?</span>
            </h3>
            <p className="text-[#8b93a5] text-[16px] md:text-[18px] font-medium leading-relaxed">
              Consult with MFEC experts today to turn your tech debt into a competitive edge.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 relative z-10 shrink-0 w-full lg:w-auto">
            <a 
              href="mailto:datapresale@mfec.co.th" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white dark:bg-[#0b1426] hover:bg-zinc-50 dark:hover:bg-[#111e38] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-[#00e5ff]/40 px-6 py-4 rounded-2xl transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#00e5ff]/10 flex items-center justify-center group-hover:bg-[#00e5ff]/20 transition-colors">
                <Mail size={18} className="text-[#00e5ff]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold tracking-widest uppercase">Contact</span>
                <span className="text-[15px] text-zinc-900 dark:text-white font-bold tracking-wide">datapresale@mfec.co.th</span>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Footer Bar - Minimal QR & Action */}
        <motion.footer variants={itemVariants} className="mt-auto pt-4 pb-2 flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-10">
          
          {/* Minimal QR Scanner */}
          <div className="flex items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-3.5 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-shadow duration-300 cursor-pointer"
            >
              <QRCodeSVG value={reportUrl} size={76} level="M" />
            </motion.div>
            
            <div className="space-y-2">
              <h4 className="font-bold text-zinc-900 dark:text-white text-[16px] tracking-wide">Export Full Report</h4>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse" />
                Scan via Mobile
              </p>
            </div>
          </div>

          {/* New Session Button (Hidden for Shared Reports) */}
          {!isSharedReport && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="flex items-center gap-3 text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 px-8 py-4 rounded-2xl group shadow-lg"
            >
              <RefreshCw size={16} strokeWidth={2.5} className="group-hover:rotate-180 transition-transform duration-700" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase">New Session</span>
            </motion.button>
          )}
        </motion.footer>

      </motion.div>
    </div>
  );
};

export default ResultDashboard;

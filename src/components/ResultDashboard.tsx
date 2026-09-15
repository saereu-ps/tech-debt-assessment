import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { RefreshCw, TrendingUp, AlertTriangle, Phone, Mail, ArrowRight, User, CheckCircle2, Zap } from 'lucide-react';
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

  // Animated Score State
  const [displayTotalScore, setDisplayTotalScore] = useState(0);

  useEffect(() => {
    let startTimestamp: number;
    const duration = 2000; // 2 seconds counting animation

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo easing for a rapid start and slow finish
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setDisplayTotalScore(Math.floor(easeOutExpo * totalScore));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayTotalScore(totalScore);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [totalScore]);

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
      
      {/* Premium Aurora Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: theme === 'dark' ? 0.08 : 0.03, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-[-10%] left-[-10%] w-[1200px] h-[1200px] blur-[150px] rounded-full transform-gpu" 
          style={{ backgroundColor: `var(--color-${details.color})` }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: theme === 'dark' ? 0.05 : 0.02, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] blur-[150px] rounded-full transform-gpu"
          style={{ backgroundColor: `var(--color-${details.color})` }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: theme === 'dark' ? 0.04 : 0.01, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
          className="absolute top-[30%] left-[30%] w-[800px] h-[800px] blur-[150px] rounded-full transform-gpu mix-blend-screen"
          style={{ backgroundColor: `var(--color-${details.color})` }}
        />
      </div>
      
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
                  className="text-[120px] md:text-[160px] lg:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-500 font-[var(--font-display)]"
                  style={{ filter: theme === 'dark' ? `drop-shadow(0 20px 40px rgba(0,0,0,0.5))` : 'none' }}
                >
                  {displayTotalScore}
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
                      <div className="flex-1 h-[4px] bg-black/5 dark:bg-white/[0.05] rounded-full relative flex items-center">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(displayScore / 5) * 100}%` }}
                          transition={{ duration: 1, delay: 0.3 + (idx * 0.1), ease: "easeOut" }}
                          className="absolute left-0 top-0 bottom-0 rounded-full"
                          style={{ 
                            background: `linear-gradient(90deg, rgba(255,255,255,0.01), var(--color-${details.color}))`
                          }}
                        >
                          <div 
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"
                            style={{ boxShadow: `0 0 10px 2px var(--color-${details.color})` }}
                          />
                        </motion.div>
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
                className={`text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[64px] font-black tracking-tight leading-[1.05] max-w-[550px] font-[var(--font-display)] text-transparent bg-clip-text bg-gradient-to-br ${details.titleGradient || 'from-zinc-400 to-zinc-600 dark:from-white dark:to-zinc-400'}`}
                style={{ filter: theme === 'dark' ? `drop-shadow(0 4px 20px var(--color-${details.color}))` : 'none' }}
              >
                {details.title}
              </h2>
            </motion.div>

            {/* NEW: Computed Insights Panel (Balancing the Right Column) */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8 xl:mt-4 md:mt-6 xl:mt-12 w-full max-w-[700px]">
              {/* Key Strength */}
              <div className="bg-gradient-to-br from-[#00e5ff]/10 to-transparent dark:from-[#00e5ff]/[0.05] dark:to-transparent border border-[#00e5ff]/20 dark:border-[#00e5ff]/10 p-5 md:p-6 lg:p-8 rounded-[2rem] flex flex-col gap-3 relative overflow-hidden group hover:border-[#00e5ff]/40 transition-colors">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#00e5ff]/20 to-transparent pointer-events-none group-hover:from-[#00e5ff]/30 transition-colors duration-700"></div>
                <div className="flex items-center gap-3 text-[#00e5ff]">
                  <div className="p-2 bg-[#00e5ff]/10 rounded-full">
                    <TrendingUp size={16} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-90">Highest Dimension</span>
                </div>
                <div className="mt-2">
                  <div className="text-zinc-900 dark:text-white text-[22px] md:text-[28px] font-black leading-none tracking-tight font-[var(--font-display)]">
                    {keyStrength ? keyStrength.shortTitle : "N/A"}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-[13px] mt-2 font-medium">
                    Strongest foundation in your current setup.
                  </div>
                </div>
              </div>
              
              {/* Critical Focus */}
              <div className="bg-gradient-to-br from-[#ff4d4d]/10 to-transparent dark:from-[#ff4d4d]/[0.05] dark:to-transparent border border-[#ff4d4d]/20 dark:border-[#ff4d4d]/10 p-5 md:p-6 lg:p-8 rounded-[2rem] flex flex-col gap-3 relative overflow-hidden group hover:border-[#ff4d4d]/40 transition-colors">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#ff4d4d]/20 to-transparent pointer-events-none group-hover:from-[#ff4d4d]/30 transition-colors duration-700"></div>
                <div className="flex items-center gap-3 text-[#ff4d4d]">
                  <div className="p-2 bg-[#ff4d4d]/10 rounded-full">
                    <AlertTriangle size={16} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-90">Immediate Attention</span>
                </div>
                <div className="mt-2">
                  <div className="text-zinc-900 dark:text-white text-[22px] md:text-[28px] font-black leading-none tracking-tight font-[var(--font-display)]">
                    {criticalFocus ? criticalFocus.shortTitle : "N/A"}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-[13px] mt-2 font-medium">
                    Critical roadblock to your tech growth.
                  </div>
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
          
        {/* Strategic Action Plan & Solution Recommendation */}
        <motion.div variants={itemVariants} className="mt-8 md:mt-12 w-full max-w-[1500px] z-10 relative px-4 md:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* 3-Step Roadmap (Option 1) */}
              <div className="lg:col-span-2 h-full bg-white/70 dark:bg-white/[0.02] backdrop-blur-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-2xl flex flex-col justify-center">
                <h4 className="text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-500 mb-6 shrink-0">
                  Personalized Roadmap
                </h4>
                <div className="space-y-4 md:space-y-5">
                  {/* @ts-ignore - actionPlan added dynamically */}
                  {details.actionPlan?.map((step: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="mt-1 shrink-0">
                        <CheckCircle2 size={20} className="text-zinc-900 dark:text-white opacity-80" strokeWidth={2.5} />
                      </div>
                      <p className="text-zinc-800 dark:text-zinc-300 text-[15px] md:text-[17px] font-medium leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* MFEC Solution Matching (Option 3) */}
              <div className="h-full bg-gradient-to-br from-[#0055ff]/10 to-[#00e5ff]/5 dark:from-[#0055ff]/20 dark:to-[#00e5ff]/10 border border-[#0055ff]/20 dark:border-[#0055ff]/30 p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden group flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#00e5ff]/30 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <h4 className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#0055ff] dark:text-[#00e5ff] mb-6 flex items-center gap-2 shrink-0">
                  <Zap size={14} strokeWidth={3} />
                  Recommended Solution
                </h4>
                
                <div className="space-y-4 relative z-10">
                  <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white leading-tight font-[var(--font-display)]">
                    {criticalFocus?.mfecSolution?.name || "MFEC Enterprise Consulting"}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base font-medium leading-relaxed">
                    {criticalFocus?.mfecSolution?.description || "Consult with our experts to design a tailored transformation roadmap for your enterprise."}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        {/* Call To Action - Contact MFEC */}
        <motion.div 
          variants={itemVariants} 
          className="mt-4 md:mt-6 lg:mt-6 w-full max-w-[1500px] bg-white/70 dark:bg-white/[0.02] backdrop-blur-3xl border border-black/10 dark:border-white/10 p-6 md:p-8 lg:py-8 lg:px-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-20 group hover:border-black/20 dark:hover:border-white/20 transition-colors duration-500"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] blur-[120px] rounded-full pointer-events-none transform-gpu translate-x-1/2 -translate-y-1/2 opacity-[0.15] dark:opacity-20 group-hover:opacity-[0.25] dark:group-hover:opacity-40 transition-opacity duration-700" style={{ backgroundColor: `var(--color-${details.color})` }}></div>
          
          <div className="flex flex-col gap-4 relative z-10 max-w-[600px] text-center lg:text-left">
            <h3 className="text-[26px] md:text-[32px] lg:text-[40px] font-black text-zinc-900 dark:text-white leading-[1.1] font-[var(--font-display)] tracking-tight">
              Ready to eliminate your <span style={{ color: `var(--color-${details.color})`, textShadow: `0 0 30px rgba(var(--color-${details.color}), 0.3)` }}>Tech Debt?</span>
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-[16px] md:text-[18px] font-medium leading-relaxed">
              Consult with MFEC experts today to turn your tech debt into a competitive edge.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 relative z-10 shrink-0 w-full lg:w-auto">
            <a 
              href="mailto:datapresale@mfec.co.th" 
              className="w-full sm:w-auto flex items-center justify-center gap-4 bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 px-8 py-5 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(255,255,255,0.2)]"
            >
              <Mail size={20} strokeWidth={2.5} />
              <div className="flex flex-col items-start text-left">
                <span className="text-[11px] font-black tracking-[0.2em] uppercase opacity-70">Contact Experts</span>
                <span className="text-[16px] font-bold tracking-wide">datapresale@mfec.co.th</span>
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

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserCircle2 } from 'lucide-react';
import MeshGraphBackground from './MeshGraphBackground';
import type { UserInfo } from '../App';

interface LandingPageProps {
  onStart: (data: UserInfo) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && company.trim()) {
      onStart({ name, company });
    }
  };

  const isFormValid = name.trim().length > 0 && company.trim().length > 0;

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#03050a]">
      
      {/* High-end Math Mesh Graph Background */}
      <MeshGraphBackground />

      {/* Horizontal Flare shooting from the pill - ALWAYS VISIBLE */}
      <div className="absolute z-0 pointer-events-none flex items-center justify-center top-[calc(50%+140px)] w-full max-w-[1200px]">
        <div className="w-[800px] h-[120px] bg-gradient-to-r from-transparent via-[#00e5ff]/30 to-transparent blur-[40px] transform translate-x-48"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center w-full px-4"
      >
        {/* Logo and faint glow underneath */}
        <div className="mb-10 flex flex-col items-center relative">
          <img src="/New-Logo-MFEC-More_Black-2.png" alt="MFEC Logo" className="h-10 md:h-12 object-contain filter brightness-0 invert opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
          <div className="absolute -bottom-4 w-32 h-[20px] bg-[#00e5ff]/30 blur-[12px] pointer-events-none"></div>
        </div>

        {/* Title */}
        <div className="text-center mb-16 flex flex-col items-center w-full relative z-10">
          <h1 className="text-[64px] md:text-[96px] font-black tracking-[-0.03em] text-white leading-[1.05] drop-shadow-lg">
            What's your true
          </h1>
          <h1 className="text-[72px] md:text-[104px] font-black tracking-[-0.03em] text-[var(--color-neon-cyan)] animate-shine leading-[1.05] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            Tech Debt?
          </h1>
          <p className="text-[#8b93a5] text-[15px] md:text-[16px] font-medium max-w-[650px] mx-auto mt-6 leading-relaxed tracking-wide backdrop-blur-sm bg-black/10 rounded-lg p-2">
            Evaluate your infrastructure maturity, discover hidden<br/>vulnerabilities, and prepare for the AI era.
          </p>
        </div>

        {/* Input Form Pill */}
        <form 
          onSubmit={handleSubmit}
          className={`
            w-full max-w-[750px] flex items-stretch p-1.5 rounded-full relative z-20
            transition-all duration-300 ease-out border backdrop-blur-md
            border-[#00e5ff]/80 shadow-[0_0_20px_rgba(0,229,255,0.2)] bg-[#050810]/90
            hover:border-[#00e5ff] hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:bg-[#03060c]
            focus-within:border-[#00e5ff] focus-within:shadow-[0_0_50px_rgba(0,229,255,0.5)] focus-within:bg-[#03060c]
            h-[64px] md:h-[72px]
          `}
        >
          {/* Name Input Area */}
          <div className="flex-1 flex items-center px-6 md:px-8 relative group">
            <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-[#00e5ff] mr-4 shrink-0 uppercase">NAME</span>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-[16px] md:text-[20px] font-black text-white placeholder-[#2f3542] focus:ring-0"
              required
            />
          </div>
          
          {/* Vertical Divider */}
          <div className="w-px h-8 md:h-10 bg-white/10 self-center mx-1 transition-colors duration-300 group-hover:bg-[#00e5ff]/30"></div>

          {/* Org Input Area */}
          <div className="flex-1 flex items-center px-6 md:px-8 relative group">
            <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-[#00e5ff] mr-4 shrink-0 uppercase">ORG</span>
            <input 
              type="text" 
              placeholder="Company name..." 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-[16px] md:text-[20px] font-black text-white placeholder-[#2f3542] focus:ring-0 pr-[140px]"
              required
            />
          </div>

          {/* Scan Now Button (Inner Pill) */}
          <button 
            type="submit"
            disabled={!isFormValid}
            className={`
              absolute right-2 top-1/2 transform -translate-y-1/2
              px-6 h-[52px] md:h-[60px] rounded-full font-bold text-[13px] md:text-[14px] flex items-center justify-center gap-2 transition-all duration-300 shrink-0
              border border-white/5
              ${isFormValid 
                ? 'bg-[#18181b] text-white hover:bg-[#27272a] hover:border-white/30' 
                : 'bg-[#141414] text-[#e5e7eb] cursor-not-allowed'}
            `}
          >
            Scan Now <ArrowRight size={14} className={isFormValid ? "text-white" : "text-[#e5e7eb]"} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LandingPage;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserCircle2, ChevronDown } from 'lucide-react';
import MeshGraphBackground from './MeshGraphBackground';
import type { UserInfo } from '../App';
import mfecLogo from '../assets/mfec-logo.png';

interface LandingPageProps {
  onStart: (data: UserInfo) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roles = [
    "Executive / C-Level",
    "Manager / Director",
    "Software Engineer",
    "Cloud / DevOps",
    "Data / AI Professional",
    "Security / QA",
    "Product / Project Mgr",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && company.trim() && role.trim()) {
      onStart({ name, email, company, role });
    }
  };

  const isFormValid = name.trim().length > 0 && company.trim().length > 0 && role.trim().length > 0;

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
      
      {/* High-end Math Mesh Graph Background */}
      <MeshGraphBackground />

      {/* Horizontal Flare shooting from the pill - ALWAYS VISIBLE */}
      <div className="absolute z-0 pointer-events-none flex items-center justify-center top-[calc(50%+140px)] w-full max-w-[1200px]">
        <div className="w-[800px] h-[120px] bg-gradient-to-r from-transparent via-[#00e5ff]/5 dark:via-[#00e5ff]/30 to-transparent blur-[40px] transform translate-x-48"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center w-full px-4"
      >
        {/* Logo and faint glow underneath */}
        <div className="mb-10 flex flex-col items-center relative">
          <img src={mfecLogo} alt="MFEC Logo" className="h-10 md:h-12 object-contain dark:filter dark:brightness-0 dark:invert opacity-100 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
          <div className="absolute -bottom-4 w-32 h-[20px] bg-[#00e5ff]/5 dark:bg-[#00e5ff]/30 blur-[12px] pointer-events-none"></div>
        </div>

        {/* Title */}
        <div className="text-center mb-16 flex flex-col items-center w-full relative z-10">
          <h1 className="text-[40px] md:text-[80px] font-extrabold text-zinc-900 dark:text-white leading-[1.05] drop-shadow-lg">
            What's your true
          </h1>
          <h1 className="text-[48px] sm:text-[56px] md:text-[88px] font-extrabold animate-shine leading-[1.05]" style={{ filter: 'var(--title-drop-shadow)' }}>
            Tech Debt?
          </h1>
          <p className="text-zinc-500 dark:text-[#8b93a5] text-[14px] md:text-[15px] font-medium max-w-[550px] mx-auto mt-6 leading-relaxed tracking-wide backdrop-blur-sm bg-black/5 dark:bg-black/10 rounded-lg p-2">
            Evaluate your infrastructure maturity, discover hidden<br/>vulnerabilities, and prepare for the AI era.
          </p>
        </div>

        {/* Input Form Pill */}
        <form 
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 items-center relative z-20"
        >
          {/* Row 1: Name & Email */}
          <div className="
            w-full max-w-[800px] flex flex-col md:flex-row items-stretch p-1.5 rounded-[32px] md:rounded-full relative z-10 gap-2 md:gap-0
            transition-all duration-300 ease-out border backdrop-blur-md
            border-zinc-200 dark:border-[#00e5ff]/80 shadow-xl dark:shadow-[0_0_20px_rgba(0,229,255,0.2)] bg-white/90 dark:bg-[#050810]/90
            hover:border-zinc-300 dark:hover:border-[#00e5ff] hover:shadow-2xl dark:hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:bg-white dark:hover:bg-[#03060c]
            focus-within:border-cyan-400 dark:focus-within:border-[#00e5ff] focus-within:shadow-2xl dark:focus-within:shadow-[0_0_50px_rgba(0,229,255,0.5)] focus-within:bg-white dark:focus-within:bg-[#03060c]
            md:h-[64px]
          ">
            {/* Name Input Area */}
            <div className="w-full md:w-auto flex-1 flex border-b border-black/5 dark:border-white/5 md:border-none">
              <div className="w-full h-full flex items-center px-6 md:px-8 relative group py-2 md:py-0">
                <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-[#00e5ff] mr-4 shrink-0 uppercase">NAME</span>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[14px] md:text-[16px] font-black text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#2f3542] focus:ring-0"
                  required
                />
              </div>
            </div>
            
            {/* Vertical Divider */}
            <div className="hidden md:block w-px h-6 md:h-8 bg-black/10 dark:bg-white/10 self-center mx-1 transition-colors duration-300 group-hover:bg-[#00e5ff]/30"></div>

            {/* Email Input Area */}
            <div className="w-full md:w-auto flex-1 flex">
              <div className="w-full h-full flex items-center px-6 md:px-8 relative group py-2 md:py-0">
                <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-[#00e5ff] mr-4 shrink-0 uppercase">EMAIL</span>
                <input 
                  type="email" 
                  placeholder="Your email..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[14px] md:text-[16px] font-black text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#2f3542] focus:ring-0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 2: Org, Role & Scan */}
          <div className="
            w-full max-w-[950px] flex flex-col md:flex-row items-stretch p-1.5 rounded-[32px] md:rounded-full relative z-20 gap-2 md:gap-0
            transition-all duration-300 ease-out border backdrop-blur-md
            border-zinc-200 dark:border-[#00e5ff]/80 shadow-xl dark:shadow-[0_0_20px_rgba(0,229,255,0.2)] bg-white/90 dark:bg-[#050810]/90
            hover:border-zinc-300 dark:hover:border-[#00e5ff] hover:shadow-2xl dark:hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:bg-white dark:hover:bg-[#03060c]
            focus-within:border-cyan-400 dark:focus-within:border-[#00e5ff] focus-within:shadow-2xl dark:focus-within:shadow-[0_0_50px_rgba(0,229,255,0.5)] focus-within:bg-white dark:focus-within:bg-[#03060c]
            md:h-[64px]
          ">
            {/* Org Input Area */}
            <div className="w-full md:w-auto flex-1 flex border-b border-black/5 dark:border-white/5 md:border-none">
              <div className="w-full h-full flex items-center px-6 md:px-8 relative group py-2 md:py-0">
                <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-[#00e5ff] mr-4 shrink-0 uppercase">ORG</span>
                <input 
                  type="text" 
                  placeholder="Company name..." 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[14px] md:text-[16px] font-black text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#2f3542] focus:ring-0"
                  required
                />
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px h-6 md:h-8 bg-black/10 dark:bg-white/10 self-center mx-1 transition-colors duration-300 group-hover:bg-[#00e5ff]/30"></div>

            {/* Role Input Area (Custom Dropdown) */}
            <div className="w-full md:w-auto flex-[1.2] flex border-b border-black/5 dark:border-white/5 md:border-none">
              <div ref={dropdownRef} className="w-full h-full flex items-center px-6 md:px-6 relative group py-2 md:py-0 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-[#00e5ff] mr-4 shrink-0 uppercase">ROLE</span>
                <div className="relative w-full flex items-center justify-between md:pr-[140px]">
                  <span className={`text-[14px] md:text-[16px] font-black ${role ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-[#2f3542]'} truncate pr-4`}>
                    {role || "Select Role..."}
                  </span>
                  <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                    <ChevronDown size={16} className="text-[#00e5ff] shrink-0" />
                  </motion.div>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-[110%] left-0 w-full bg-white/95 dark:bg-[#0b1426]/95 backdrop-blur-2xl border border-zinc-200 dark:border-[#00e5ff]/20 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 max-h-[220px] overflow-y-auto"
                  >
                    {roles.map((r) => (
                      <div 
                        key={r}
                        onClick={() => setRole(r)}
                        className="px-6 py-3 text-[14px] md:text-[15px] font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#00e5ff]/15 transition-colors duration-200 cursor-pointer border-b border-black/5 dark:border-white/5 last:border-b-0"
                      >
                        {r}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Scan Now Button (Inner Pill) */}
            <button 
              type="submit"
              disabled={!isFormValid}
              className={`
                md:absolute md:right-2 md:top-1/2 md:transform md:-translate-y-1/2
                w-full md:w-auto px-6 h-[52px] md:h-[50px] rounded-full font-bold text-[13px] flex items-center justify-center gap-2 transition-all duration-300 shrink-0
                border border-black/10 dark:border-white/5 mx-0 my-2 md:my-0
                ${isFormValid 
                  ? 'bg-zinc-900 dark:bg-[#18181b] text-white hover:bg-black dark:hover:bg-[#27272a] hover:border-black/30 dark:hover:border-white/30 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                  : 'bg-zinc-200 dark:bg-[#141414] text-zinc-400 dark:text-[#e5e7eb] cursor-not-allowed'}
              `}
            >
              Scan Now <ArrowRight size={14} className={isFormValid ? "text-white" : "text-[#e5e7eb]"} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LandingPage;
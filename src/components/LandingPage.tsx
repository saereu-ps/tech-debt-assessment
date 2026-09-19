import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, UserCircle2, ChevronDown, Mail, Building2, Briefcase, Sparkles, Check, Timer } from 'lucide-react';
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
  const [pdpaConsent, setPdpaConsent] = useState(false);
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

  const isFormValid = name.trim().length > 0 && company.trim().length > 0 && role.trim().length > 0 && pdpaConsent;

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center p-6 md:p-12 font-sans overflow-x-hidden bg-white dark:bg-[#050810] transition-colors duration-500">
      
      {/* Dynamic Network Background spanning full screen to support Spatial Glassmorphism */}
      <div className="absolute inset-0 z-0">
        <MeshGraphBackground />
        {/* Extra vibrant gradient overlay to enhance glass blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/10 via-transparent to-[#0077ff]/20 mix-blend-screen pointer-events-none"></div>
      </div>

      {/* Logo Component */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
        <img src={mfecLogo} alt="MFEC Logo" className="h-10 md:h-12 w-auto dark:invert dark:brightness-0 opacity-90 dark:opacity-100" />
      </div>

      <div className="w-full max-w-[1200px] z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative mt-16 md:mt-0">
        
        {/* Left Side: Typography & Value Prop */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
          className="flex flex-col gap-6 text-center lg:text-left pt-10 lg:pt-0"
        >
          <div className="flex flex-col w-full relative z-10">
            <h1 className="text-[44px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-outfit font-black text-zinc-900 dark:text-white leading-[1.05] tracking-tight whitespace-nowrap">
              What's your true
            </h1>
            <h1 className="text-[44px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-outfit font-black animate-shine leading-[1.05] tracking-tight mt-1" style={{ filter: 'var(--title-drop-shadow)' }}>
              Tech Debt?
            </h1>
          </div>

          <div className="flex flex-col gap-5 max-w-[560px] mx-auto lg:mx-0 mt-4 relative z-10 text-center lg:text-left">
            <p className="text-[16px] md:text-[18px] font-medium leading-relaxed tracking-wide text-zinc-600 dark:text-zinc-300">
              Evaluate your infrastructure maturity, discover hidden vulnerabilities, and prepare your organization for the AI era.
            </p>
            <div className="flex items-center gap-2.5 w-fit p-1 pr-4 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md mx-auto lg:mx-0 shadow-sm transition-all hover:bg-white/60 dark:hover:bg-white/10">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-[#0077ff]/20 border border-[#00e5ff]/30 shadow-inner">
                <Timer className="w-3.5 h-3.5 text-[#0077ff] dark:text-[#00e5ff]" />
              </div>
              <span className="text-[13px] md:text-[14px] font-medium text-zinc-700 dark:text-zinc-300 tracking-wide">Takes less than 5 minutes</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: VisionOS Form */}
        <div className="w-full relative flex justify-center lg:justify-end perspective-1000">
          {/* Spatial Glass Card with Subtle Floating Animation */}
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateX: 0,
              y: [-4, 4, -4] // Subtle floating effect
            }}
            transition={{ 
              opacity: { duration: 0.8, ease: "easeOut", delay: 0.1 },
              scale: { duration: 0.8, ease: "easeOut", delay: 0.1, type: "spring", bounce: 0.4 },
              rotateX: { duration: 0.8, ease: "easeOut", delay: 0.1 },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" } // Infinite float, slower
            }}
            className="w-full max-w-[480px] flex flex-col gap-6 relative p-8 md:p-10 rounded-[40px] border border-white/20 dark:border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] bg-white/40 dark:bg-[#0a0a0a]/60 backdrop-blur-[40px]"
          >
            {/* Animated Glowing Orbs Background (Clipped to Card) */}
            <div className="absolute inset-0 rounded-[40px] overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }} 
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-48 h-48 bg-[#00e5ff] rounded-full mix-blend-screen filter blur-[80px] opacity-30 dark:opacity-20"
              />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], x: [0, -40, 0], y: [0, -50, 0] }} 
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#0077ff] rounded-full mix-blend-screen filter blur-[80px] opacity-30 dark:opacity-20"
              />
            </div>

            {/* Subtle inner highlight for the 3D glass effect */}
            <div className="absolute inset-0 rounded-[40px] border border-white/30 pointer-events-none mix-blend-overlay"></div>

            <div className="relative z-10 text-center mb-2">
              <h2 className="text-[28px] md:text-[32px] font-outfit font-black text-zinc-900 dark:text-white tracking-tight">Let's Get Started</h2>
              <p className="text-[14px] text-zinc-600 dark:text-zinc-300 mt-2 font-medium">Just a few details to see your results.</p>
            </div>

            <div className="flex flex-col gap-4 relative z-30">
              
              {/* Name Input */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="w-full relative group">
                <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-[#00e5ff] transition-colors z-10" />
                <input
                  type="text"
                  id="nameInput"
                  className="w-full h-[52px] pl-12 pr-5 rounded-2xl bg-white/50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 focus:border-[#00e5ff] dark:focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]/50 outline-none text-[15px] font-medium text-zinc-900 dark:text-white placeholder-zinc-500 transition-all duration-300 shadow-inner hover:border-zinc-300 dark:hover:border-white/20"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </motion.div>

              {/* Email Input */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="w-full relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-[#00e5ff] transition-colors z-10" />
                <input
                  type="email"
                  id="emailInput"
                  className="w-full h-[52px] pl-12 pr-5 rounded-2xl bg-white/50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 focus:border-[#00e5ff] dark:focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]/50 outline-none text-[15px] font-medium text-zinc-900 dark:text-white placeholder-zinc-500 transition-all duration-300 shadow-inner hover:border-zinc-300 dark:hover:border-white/20"
                  placeholder="Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>

              {/* Organization Input */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="w-full relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-[#00e5ff] transition-colors z-10" />
                <input
                  type="text"
                  id="companyInput"
                  className="w-full h-[52px] pl-12 pr-5 rounded-2xl bg-white/50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 focus:border-[#00e5ff] dark:focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]/50 outline-none text-[15px] font-medium text-zinc-900 dark:text-white placeholder-zinc-500 transition-all duration-300 shadow-inner hover:border-zinc-300 dark:hover:border-white/20"
                  placeholder="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </motion.div>

              {/* Role Dropdown */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="relative group w-full z-20">
                <div 
                  ref={dropdownRef}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative flex items-center h-[52px] w-full pl-12 pr-5 rounded-2xl bg-white/50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 transition-all duration-300 cursor-pointer shadow-inner hover:border-zinc-300 dark:hover:border-white/20 group"
                  style={{ borderColor: isDropdownOpen ? '#00e5ff' : undefined, boxShadow: isDropdownOpen ? '0 0 0 1px rgba(0,229,255,0.5) inset' : undefined }}
                >
                  <Briefcase className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors z-10 ${isDropdownOpen ? 'text-[#00e5ff]' : 'text-zinc-400 group-hover:text-zinc-500 dark:group-hover:text-zinc-300'}`} />
                  <span className={`w-full text-[15px] font-medium truncate ${role ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>
                    {role || "Select Role"}
                  </span>
                  <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} className="absolute right-5">
                    <ChevronDown className={`w-5 h-5 transition-colors ${isDropdownOpen ? 'text-[#00e5ff]' : 'text-zinc-400'}`} />
                  </motion.div>
                </div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-[60px] left-0 w-full bg-white/80 dark:bg-[#111]/80 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 max-h-[220px] overflow-y-auto"
                    >
                      {roles.map((r) => (
                        <div 
                          key={r}
                          onClick={() => setRole(r)}
                          className="px-5 py-3.5 text-[14px] font-medium text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          {r}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* PDPA Consent Checkbox */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="flex items-start gap-3 mt-4 relative z-10">
              <div className="relative flex items-center justify-center mt-1 cursor-pointer" onClick={() => setPdpaConsent(!pdpaConsent)}>
                <input 
                  type="checkbox" 
                  id="pdpaConsent" 
                  checked={pdpaConsent}
                  onChange={(e) => setPdpaConsent(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-all duration-300 backdrop-blur-md ${pdpaConsent ? 'bg-[#0077ff] dark:bg-[#00e5ff] border-[#0077ff] dark:border-[#00e5ff]' : 'bg-white/50 dark:bg-black/20 border-zinc-400/50 dark:border-white/30 hover:border-[#0077ff] dark:hover:border-[#00e5ff]/60'}`}>
                  <AnimatePresence>
                    {pdpaConsent && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="w-3.5 h-3.5 text-white dark:text-black stroke-[3px]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <label htmlFor="pdpaConsent" onClick={() => setPdpaConsent(!pdpaConsent)} className="text-[13px] md:text-[14px] text-zinc-700 dark:text-zinc-300 leading-relaxed cursor-pointer font-medium select-none">
                ยินดีให้ MFEC ดูแลข้อมูลนี้ เพื่อวิเคราะห์และนำเสนอโซลูชันที่เหมาะกับคุณ (อ่านรายละเอียดได้ใน <a href="#" onClick={(e) => e.stopPropagation()} className="text-zinc-900 dark:text-white font-bold hover:underline underline-offset-4 decoration-[#00e5ff] transition-all hover:text-[#00e5ff]">นโยบายความเป็นส่วนตัว</a>)
              </label>
            </motion.div>

            {/* Pill Submit Button */}
            <motion.button 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
              type="submit"
              disabled={!isFormValid}
              className={`
                w-full h-[56px] rounded-full font-bold text-[16px] flex items-center justify-center gap-2 transition-all duration-300 mt-4 relative z-10 overflow-hidden group
                ${isFormValid 
                  ? 'bg-gradient-to-r from-[#00e5ff] to-[#0077ff] text-white hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_-10px_rgba(0,229,255,0.6)] animate-pulse hover:animate-none' 
                  : 'bg-white/10 dark:bg-white/5 text-zinc-400 dark:text-white/30 cursor-not-allowed backdrop-blur-md border border-zinc-200 dark:border-white/10'}
              `}
            >
              <span>Reveal My Tech Debt</span>
              {isFormValid && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
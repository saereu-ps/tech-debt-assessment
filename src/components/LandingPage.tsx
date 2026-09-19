import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-transparent overflow-hidden">
      
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
        <div className="mb-6 md:mb-10 flex flex-col items-center relative">
          <img src={mfecLogo} alt="MFEC Logo" className="h-10 md:h-12 object-contain dark:filter dark:brightness-0 dark:invert opacity-100 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
          <div className="absolute -bottom-4 w-32 h-[20px] bg-[#00e5ff]/5 dark:bg-[#00e5ff]/30 blur-[12px] pointer-events-none"></div>
        </div>

        {/* Title */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16 flex flex-col items-center w-full relative z-10">
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[80px] font-extrabold text-zinc-900 dark:text-white leading-[1.05] drop-shadow-lg">
            What's your true
          </h1>
          <h1 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[88px] font-extrabold animate-shine leading-[1.05]" style={{ filter: 'var(--title-drop-shadow)' }}>
            Tech Debt?
          </h1>
          <p className="text-zinc-500 dark:text-[#8b93a5] text-[14px] md:text-[15px] font-medium max-w-[550px] mx-auto mt-4 lg:mt-6 leading-relaxed tracking-wide backdrop-blur-sm bg-black/5 dark:bg-black/10 rounded-lg p-2">
            Evaluate your infrastructure maturity, discover hidden<br/>vulnerabilities, and prepare for the AI era.
          </p>
        </div>

        {/* Unified Input Form Card */}
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-[800px] flex flex-col gap-6 relative z-20 mt-8 mx-auto p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-zinc-200 dark:border-[#00e5ff]/30 shadow-2xl dark:shadow-[0_0_40px_rgba(0,229,255,0.15)] bg-white/70 dark:bg-[#050810]/70 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,229,255,0.2)]"
        >
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Name Input */}
            <div className="flex flex-col gap-2 group">
              <label className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-zinc-500 dark:text-[#00e5ff] uppercase ml-4 transition-colors group-focus-within:text-[#00e5ff]">Name</label>
              <div className="h-[56px] rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent dark:border-white/5 px-4 flex items-center transition-all group-focus-within:border-[#00e5ff]/50 group-focus-within:bg-black/10 dark:group-focus-within:bg-white/10">
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[15px] md:text-[16px] font-bold text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:ring-0"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2 group">
              <label className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-zinc-500 dark:text-[#00e5ff] uppercase ml-4 transition-colors group-focus-within:text-[#00e5ff]">Email</label>
              <div className="h-[56px] rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent dark:border-white/5 px-4 flex items-center transition-all group-focus-within:border-[#00e5ff]/50 group-focus-within:bg-black/10 dark:group-focus-within:bg-white/10">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[15px] md:text-[16px] font-bold text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:ring-0"
                  required
                />
              </div>
            </div>

            {/* Org Input */}
            <div className="flex flex-col gap-2 group">
              <label className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-zinc-500 dark:text-[#00e5ff] uppercase ml-4 transition-colors group-focus-within:text-[#00e5ff]">Organization</label>
              <div className="h-[56px] rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent dark:border-white/5 px-4 flex items-center transition-all group-focus-within:border-[#00e5ff]/50 group-focus-within:bg-black/10 dark:group-focus-within:bg-white/10">
                <input 
                  type="text" 
                  placeholder="Your company name" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[15px] md:text-[16px] font-bold text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:ring-0"
                  required
                />
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="flex flex-col gap-2 group relative">
              <label className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-zinc-500 dark:text-[#00e5ff] uppercase ml-4 transition-colors group-focus-within:text-[#00e5ff]">Role</label>
              <div 
                ref={dropdownRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-[56px] rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent dark:border-white/5 px-4 flex items-center justify-between cursor-pointer transition-all hover:bg-black/10 dark:hover:bg-white/10"
              >
                <span className={`text-[15px] md:text-[16px] font-bold ${role ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'} truncate pr-4`}>
                  {role || "Select your role"}
                </span>
                <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                  <ChevronDown size={18} className="text-zinc-400 dark:text-[#00e5ff] shrink-0" />
                </motion.div>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[85px] left-0 w-full bg-white dark:bg-[#0b1426] border border-zinc-200 dark:border-[#00e5ff]/30 rounded-2xl overflow-hidden shadow-2xl z-50 max-h-[240px] overflow-y-auto"
                  >
                    {roles.map((r) => (
                      <div 
                        key={r}
                        onClick={() => setRole(r)}
                        className="px-5 py-3.5 text-[14px] md:text-[15px] font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#00e5ff]/20 transition-colors duration-200 cursor-pointer border-b border-black/5 dark:border-white/5 last:border-b-0"
                      >
                        {r}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent my-2"></div>

          {/* PDPA Consent Checkbox */}
          <div className="flex items-start gap-3 w-full px-2">
            <input 
              type="checkbox" 
              id="pdpaConsent" 
              checked={pdpaConsent}
              onChange={(e) => setPdpaConsent(e.target.checked)}
              className="mt-1 w-[18px] h-[18px] rounded border-zinc-300 dark:border-zinc-500 text-[#00e5ff] focus:ring-[#00e5ff] focus:ring-offset-0 bg-transparent cursor-pointer transition-colors"
            />
            <label htmlFor="pdpaConsent" className="text-[12.5px] md:text-[13.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed cursor-pointer font-medium select-none">
              ข้าพเจ้ายินยอมให้ MFEC เก็บรวบรวมข้อมูลเพื่อใช้ในการติดต่อกลับและนำเสนอโซลูชัน ตามนโยบายความเป็นส่วนตัวของบริษัท
            </label>
          </div>

          {/* Scan Now Button */}
          <button 
            type="submit"
            disabled={!isFormValid}
            className={`
              w-full h-[60px] md:h-[64px] rounded-2xl font-black text-[15px] md:text-[16px] tracking-wide flex items-center justify-center gap-3 transition-all duration-300 mt-2
              ${isFormValid 
                ? 'bg-zinc-900 dark:bg-[#00e5ff] text-white dark:text-black shadow-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:scale-[1.01]' 
                : 'bg-zinc-200 dark:bg-white/5 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'}
            `}
          >
            START ASSESSMENT <ArrowRight size={18} className={isFormValid ? "text-white dark:text-black" : "text-zinc-400 dark:text-zinc-600"} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LandingPage;
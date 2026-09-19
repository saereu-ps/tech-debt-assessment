import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, UserCircle2, ChevronDown, Mail, Building2, Briefcase, Sparkles } from 'lucide-react';
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
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center p-6 md:p-12 font-sans overflow-hidden bg-white dark:bg-[#050810] transition-colors duration-500">
      
      {/* Dynamic Network Background */}
      <div className="absolute inset-0 z-0">
        <MeshGraphBackground />
      </div>

      {/* Logo Component */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
        <img src={mfecLogo} alt="MFEC Logo" className="h-10 md:h-12 w-auto dark:invert dark:brightness-0 opacity-90 dark:opacity-100" />
      </div>

      <div className="w-full max-w-[1400px] z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative mt-16 md:mt-0">
        
        {/* Left Side: Typography & Value Prop */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6 text-center lg:text-left pt-10 lg:pt-0"
        >
          <div className="flex flex-col w-full relative z-10">
            <h1 className="text-[40px] sm:text-[48px] md:text-[56px] xl:text-[72px] font-extrabold text-zinc-900 dark:text-white leading-[1.05] tracking-tight">
              Modernize your
            </h1>
            <h1 className="text-[48px] sm:text-[56px] md:text-[64px] xl:text-[80px] font-extrabold animate-shine leading-[1.05] tracking-tight mt-1" style={{ filter: 'var(--title-drop-shadow)' }}>
              Infrastructure.
            </h1>
          </div>

          <p className="text-zinc-500 dark:text-[#8b93a5] text-[15px] md:text-[17px] font-medium max-w-[500px] mx-auto lg:mx-0 leading-relaxed tracking-wide mt-2">
            Evaluate your technical debt maturity, uncover hidden bottlenecks, and prepare your organization for the AI era in less than 5 minutes.
          </p>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full relative"
        >
          <form 
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-6 relative p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-white/40 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,229,255,0.1)] bg-white/40 dark:bg-[#03060c]/40 backdrop-blur-3xl overflow-hidden"
          >
            {/* Subtle inner top highlight */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-[#00e5ff]/50 to-transparent"></div>

            <div className="flex flex-col gap-5">
              
              {/* Name Input */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00e5ff] to-[#0077ff] rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-500"></div>
                <div className="relative flex items-center h-[60px] rounded-2xl bg-white/60 dark:bg-black/30 border border-white/50 dark:border-white/5 px-4 backdrop-blur-md transition-all duration-300 group-hover:bg-white/80 dark:group-hover:bg-black/50 group-focus-within:bg-white dark:group-focus-within:bg-[#0a101d] group-focus-within:border-[#00e5ff]/50 shadow-inner">
                  <UserCircle2 className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-focus-within:text-[#00e5ff] transition-colors shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-full bg-transparent border-none outline-none text-[15px] font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 px-4 focus:ring-0"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00e5ff] to-[#0077ff] rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-500"></div>
                <div className="relative flex items-center h-[60px] rounded-2xl bg-white/60 dark:bg-black/30 border border-white/50 dark:border-white/5 px-4 backdrop-blur-md transition-all duration-300 group-hover:bg-white/80 dark:group-hover:bg-black/50 group-focus-within:bg-white dark:group-focus-within:bg-[#0a101d] group-focus-within:border-[#00e5ff]/50 shadow-inner">
                  <Mail className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-focus-within:text-[#00e5ff] transition-colors shrink-0" />
                  <input 
                    type="email" 
                    placeholder="Work Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-full bg-transparent border-none outline-none text-[15px] font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 px-4 focus:ring-0"
                    required
                  />
                </div>
              </div>

              {/* Organization Input */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00e5ff] to-[#0077ff] rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-500"></div>
                <div className="relative flex items-center h-[60px] rounded-2xl bg-white/60 dark:bg-black/30 border border-white/50 dark:border-white/5 px-4 backdrop-blur-md transition-all duration-300 group-hover:bg-white/80 dark:group-hover:bg-black/50 group-focus-within:bg-white dark:group-focus-within:bg-[#0a101d] group-focus-within:border-[#00e5ff]/50 shadow-inner">
                  <Building2 className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-focus-within:text-[#00e5ff] transition-colors shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Company Name" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full h-full bg-transparent border-none outline-none text-[15px] font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 px-4 focus:ring-0"
                    required
                  />
                </div>
              </div>

              {/* Role Dropdown */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00e5ff] to-[#0077ff] rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-500"></div>
                <div 
                  ref={dropdownRef}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative flex items-center h-[60px] rounded-2xl bg-white/60 dark:bg-black/30 border border-white/50 dark:border-white/5 px-4 backdrop-blur-md transition-all duration-300 group-hover:bg-white/80 dark:group-hover:bg-black/50 cursor-pointer shadow-inner"
                  style={{ borderColor: isDropdownOpen ? 'rgba(0, 229, 255, 0.5)' : undefined, backgroundColor: isDropdownOpen ? 'rgba(10, 16, 29, 0.8)' : undefined }}
                >
                  <Briefcase className={`w-5 h-5 transition-colors shrink-0 ${isDropdownOpen ? 'text-[#00e5ff]' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-500 dark:group-hover:text-zinc-400'}`} />
                  <span className={`w-full px-4 text-[15px] font-semibold truncate ${role ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`}>
                    {role || "Select Role"}
                  </span>
                  <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0" />
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
                      className="absolute top-[70px] left-0 w-full bg-white/95 dark:bg-[#0b1426]/95 backdrop-blur-2xl border border-white/50 dark:border-[#00e5ff]/20 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-50 max-h-[240px] overflow-y-auto"
                    >
                      {roles.map((r) => (
                        <div 
                          key={r}
                          onClick={() => setRole(r)}
                          className="px-5 py-3.5 text-[14px] md:text-[15px] font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#00e5ff]/10 transition-colors duration-200 cursor-pointer"
                        >
                          {r}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent my-1"></div>

            {/* PDPA Consent Checkbox */}
            <div className="flex items-start gap-4 px-2">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  id="pdpaConsent" 
                  checked={pdpaConsent}
                  onChange={(e) => setPdpaConsent(e.target.checked)}
                  className="peer w-5 h-5 rounded-md border-2 border-zinc-300 dark:border-zinc-600 text-[#00e5ff] focus:ring-[#00e5ff] focus:ring-offset-0 bg-transparent cursor-pointer transition-all duration-300 checked:border-[#00e5ff] checked:bg-[#00e5ff]"
                />
              </div>
              <label htmlFor="pdpaConsent" className="text-[13px] md:text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed cursor-pointer font-medium select-none">
                ข้าพเจ้ายินยอมให้ MFEC เก็บรวบรวมข้อมูลเพื่อใช้ในการติดต่อกลับและนำเสนอโซลูชัน ตาม <a href="#" className="text-[#00e5ff] hover:underline underline-offset-4 decoration-[#00e5ff]/50">นโยบายความเป็นส่วนตัวของบริษัท</a>
              </label>
            </div>

            {/* Scan Now Button */}
            <button 
              type="submit"
              disabled={!isFormValid}
              className={`
                group relative w-full h-[64px] rounded-2xl font-black text-[16px] tracking-wide flex items-center justify-center gap-3 transition-all duration-500 overflow-hidden mt-2
                ${isFormValid 
                  ? 'bg-gradient-to-r from-[#00e5ff] to-[#0077ff] text-white shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] hover:scale-[1.02] active:scale-95' 
                  : 'bg-zinc-200/50 dark:bg-white/5 text-zinc-400 dark:text-zinc-600 cursor-not-allowed border border-transparent dark:border-white/5'}
              `}
            >
              {isFormValid && (
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
              )}
              <Sparkles className={`w-5 h-5 ${isFormValid ? "text-white" : "text-zinc-400 dark:text-zinc-600"} transition-all duration-500`} />
              <span>START ASSESSMENT</span>
              <ArrowRight className={`w-5 h-5 ${isFormValid ? "text-white translate-x-0 group-hover:translate-x-1" : "text-zinc-400 dark:text-zinc-600"} transition-all duration-500`} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
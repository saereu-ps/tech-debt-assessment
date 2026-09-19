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
              What's your true
            </h1>
            <h1 className="text-[48px] sm:text-[56px] md:text-[64px] xl:text-[80px] font-extrabold animate-shine leading-[1.05] tracking-tight mt-1" style={{ filter: 'var(--title-drop-shadow)' }}>
              Tech Debt?
            </h1>
          </div>

          <p className="text-[16px] md:text-[18px] font-medium max-w-[500px] mx-auto lg:mx-0 leading-relaxed tracking-wide mt-4 text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 dark:from-zinc-300 dark:via-white dark:to-zinc-400">
            Evaluate your infrastructure maturity, discover hidden vulnerabilities, and prepare your organization for the AI era <span className="text-zinc-900 dark:text-white font-bold border-b border-[#00e5ff]/50 pb-0.5">in less than 5 minutes.</span>
          </p>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full relative"
        >
          {/* Outer Glow Effect behind the form */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00e5ff]/20 to-[#0077ff]/20 rounded-[40px] blur-xl opacity-0 dark:opacity-100 transition-opacity duration-1000"></div>

          <form 
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-6 relative p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-white/40 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_80px_rgba(0,0,0,0.4)] bg-white/40 dark:bg-[#03060c]/60 backdrop-blur-3xl overflow-hidden"
          >
            {/* Subtle inner top highlight */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent"></div>

            <div className="flex flex-col gap-5 relative z-10">
              
              {/* Name Input */}
              <div className="group relative w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00e5ff] to-[#0077ff] rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
                <div className="relative flex items-center h-[56px] w-full rounded-xl bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm border border-zinc-200 dark:border-white/10 transition-all duration-300 group-focus-within:border-[#00e5ff]/50 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-center w-14 h-full border-r border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 group-focus-within:bg-[#00e5ff]/10 transition-colors">
                    <UserCircle2 className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-focus-within:text-[#00e5ff] transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="nameInput"
                    className="w-full h-full bg-transparent border-none outline-none text-[15px] font-medium text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 px-4 focus:ring-0"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="group relative w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00e5ff] to-[#0077ff] rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
                <div className="relative flex items-center h-[56px] w-full rounded-xl bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm border border-zinc-200 dark:border-white/10 transition-all duration-300 group-focus-within:border-[#00e5ff]/50 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-center w-14 h-full border-r border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 group-focus-within:bg-[#00e5ff]/10 transition-colors">
                    <Mail className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-focus-within:text-[#00e5ff] transition-colors" />
                  </div>
                  <input
                    type="email"
                    id="emailInput"
                    className="w-full h-full bg-transparent border-none outline-none text-[15px] font-medium text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 px-4 focus:ring-0"
                    placeholder="Work Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Organization Input */}
              <div className="group relative w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00e5ff] to-[#0077ff] rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
                <div className="relative flex items-center h-[56px] w-full rounded-xl bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm border border-zinc-200 dark:border-white/10 transition-all duration-300 group-focus-within:border-[#00e5ff]/50 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-center w-14 h-full border-r border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 group-focus-within:bg-[#00e5ff]/10 transition-colors">
                    <Building2 className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-focus-within:text-[#00e5ff] transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="companyInput"
                    className="w-full h-full bg-transparent border-none outline-none text-[15px] font-medium text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 px-4 focus:ring-0"
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Role Dropdown */}
              <div className="group relative w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00e5ff] to-[#0077ff] rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
                <div 
                  ref={dropdownRef}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative flex items-center h-[56px] w-full rounded-xl bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm border border-zinc-200 dark:border-white/10 transition-all duration-300 group-hover:border-zinc-300 dark:group-hover:border-white/20 shadow-sm overflow-hidden cursor-pointer"
                  style={{ borderColor: isDropdownOpen ? 'rgba(0, 229, 255, 0.5)' : undefined }}
                >
                  <div className={`flex items-center justify-center w-14 h-full border-r border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 transition-colors ${isDropdownOpen ? 'bg-[#00e5ff]/10' : ''}`}>
                    <Briefcase className={`w-5 h-5 transition-colors ${isDropdownOpen ? 'text-[#00e5ff]' : 'text-zinc-400 dark:text-zinc-500'}`} />
                  </div>
                  
                  <span className={`w-full px-4 text-[15px] font-medium truncate ${role ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`}>
                    {role || "Select Role"}
                  </span>
                  
                  <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} className="pr-4">
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
                      className="absolute top-[70px] left-0 w-full bg-white/95 dark:bg-[#0b1426]/95 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-50 max-h-[240px] overflow-y-auto"
                    >
                      {roles.map((r) => (
                        <div 
                          key={r}
                          onClick={() => setRole(r)}
                          className="px-5 py-3.5 text-[14px] md:text-[15px] font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors duration-200 cursor-pointer"
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
                  className="peer w-5 h-5 rounded-md border-2 border-zinc-300 dark:border-zinc-500 text-[#00e5ff] focus:ring-[#00e5ff] focus:ring-offset-0 bg-transparent cursor-pointer transition-all duration-300 checked:border-[#00e5ff] checked:bg-[#00e5ff]"
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
                group relative w-full h-[56px] rounded-xl font-bold text-[15px] tracking-wide flex items-center justify-center gap-3 transition-all duration-300 overflow-hidden mt-4
                ${isFormValid 
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg hover:scale-[1.02] active:scale-95' 
                  : 'bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'}
              `}
            >
              {isFormValid && (
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
              )}
              <Sparkles className={`w-5 h-5 ${isFormValid ? "text-white dark:text-black" : "text-zinc-400 dark:text-zinc-600"} transition-all duration-300`} />
              <span>START ASSESSMENT</span>
              <ArrowRight className={`w-5 h-5 ${isFormValid ? "text-white dark:text-black translate-x-0 group-hover:translate-x-1" : "text-zinc-400 dark:text-zinc-600"} transition-all duration-300`} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
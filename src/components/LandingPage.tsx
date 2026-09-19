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

          <p className="text-[16px] md:text-[18px] font-medium max-w-[500px] mx-auto lg:mx-0 leading-relaxed tracking-wide mt-4 text-zinc-600 dark:text-zinc-300">
            Evaluate your infrastructure maturity, discover hidden vulnerabilities, and prepare your organization for the AI era <span className="text-zinc-900 dark:text-white font-bold border-b-2 border-[#00e5ff]/50 pb-0.5">in less than 5 minutes.</span>
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
            className="w-full flex flex-col gap-6 relative p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl bg-white dark:bg-[#0a0a0a]"
          >
            <div className="flex flex-col gap-4 relative z-10">
              
              {/* Name Input */}
              <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor="nameInput" className="text-[13px] font-medium text-zinc-700 dark:text-zinc-400">
                  Full Name
                </label>
                <div className="relative flex items-center h-10 w-full rounded-md bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 transition-colors focus-within:border-zinc-400 dark:focus-within:border-white/30 dark:focus-within:bg-white/[0.04] shadow-sm">
                  <UserCircle2 className="absolute left-3 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    id="nameInput"
                    className="w-full h-full bg-transparent border-none outline-none text-[14px] font-medium text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 pl-9 pr-3 focus:ring-0 rounded-md"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor="emailInput" className="text-[13px] font-medium text-zinc-700 dark:text-zinc-400">
                  Work Email
                </label>
                <div className="relative flex items-center h-10 w-full rounded-md bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 transition-colors focus-within:border-zinc-400 dark:focus-within:border-white/30 dark:focus-within:bg-white/[0.04] shadow-sm">
                  <Mail className="absolute left-3 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    id="emailInput"
                    className="w-full h-full bg-transparent border-none outline-none text-[14px] font-medium text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 pl-9 pr-3 focus:ring-0 rounded-md"
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Organization Input */}
              <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor="companyInput" className="text-[13px] font-medium text-zinc-700 dark:text-zinc-400">
                  Company Name
                </label>
                <div className="relative flex items-center h-10 w-full rounded-md bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 transition-colors focus-within:border-zinc-400 dark:focus-within:border-white/30 dark:focus-within:bg-white/[0.04] shadow-sm">
                  <Building2 className="absolute left-3 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    id="companyInput"
                    className="w-full h-full bg-transparent border-none outline-none text-[14px] font-medium text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 pl-9 pr-3 focus:ring-0 rounded-md"
                    placeholder="Acme Corp"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Role Dropdown */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[13px] font-medium text-zinc-700 dark:text-zinc-400">
                  Role
                </label>
                <div className="relative group w-full">
                  <div 
                    ref={dropdownRef}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="relative flex items-center h-10 w-full rounded-md bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 transition-colors hover:border-zinc-300 dark:hover:border-white/20 cursor-pointer shadow-sm"
                    style={{ borderColor: isDropdownOpen ? 'rgba(255, 255, 255, 0.3)' : undefined, backgroundColor: isDropdownOpen ? 'rgba(255, 255, 255, 0.04)' : undefined }}
                  >
                    <Briefcase className={`absolute left-3 w-4 h-4 transition-colors ${isDropdownOpen ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`} />
                    
                    <span className={`w-full pl-9 pr-8 text-[14px] font-medium truncate ${role ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`}>
                      {role || "Select your role"}
                    </span>
                    
                    <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} className="absolute right-3">
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    </motion.div>
                  </div>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-[44px] left-0 w-full bg-white dark:bg-[#111] border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden shadow-xl z-50 max-h-[200px] overflow-y-auto"
                      >
                        {roles.map((r) => (
                          <div 
                            key={r}
                            onClick={() => setRole(r)}
                            className="px-4 py-2.5 text-[13px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            {r}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-zinc-200 dark:bg-white/10 my-0"></div>

            {/* PDPA Consent Checkbox */}
            <div className="flex items-start gap-3">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  id="pdpaConsent" 
                  checked={pdpaConsent}
                  onChange={(e) => setPdpaConsent(e.target.checked)}
                  className="peer w-4 h-4 rounded border border-zinc-300 dark:border-zinc-700 text-black dark:text-white focus:ring-0 focus:ring-offset-0 bg-transparent cursor-pointer transition-all duration-200 checked:border-black dark:checked:border-white checked:bg-black dark:checked:bg-white"
                />
              </div>
              <label htmlFor="pdpaConsent" className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed cursor-pointer font-medium select-none">
                ข้าพเจ้ายินยอมให้ MFEC เก็บรวบรวมข้อมูลเพื่อใช้ในการติดต่อกลับและนำเสนอโซลูชัน ตาม <a href="#" className="text-zinc-900 dark:text-white hover:underline underline-offset-4 decoration-zinc-500">นโยบายความเป็นส่วนตัวของบริษัท</a>
              </label>
            </div>

            {/* Scan Now Button */}
            <button 
              type="submit"
              disabled={!isFormValid}
              className={`
                w-full h-10 rounded-md font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-200 mt-2
                ${isFormValid 
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm' 
                  : 'bg-zinc-100 dark:bg-white/5 border border-transparent dark:border-white/5 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'}
              `}
            >
              <Sparkles className={`w-4 h-4 ${isFormValid ? "text-white dark:text-black" : "text-zinc-400 dark:text-zinc-600"}`} />
              <span>Start Assessment</span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
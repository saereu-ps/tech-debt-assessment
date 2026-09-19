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
    <div className="flex flex-col lg:flex-row min-h-[100dvh] w-full font-sans bg-white dark:bg-[#13131a] transition-colors duration-500">
      
      {/* Left Panel: Graphic & Copy */}
      <div className="relative w-full lg:w-1/2 min-h-[30vh] lg:min-h-[100dvh] flex flex-col justify-between p-8 lg:p-16 overflow-hidden bg-gradient-to-br from-[#0a0f25] to-[#0d1430]">
        {/* Dynamic Network Background */}
        <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
          <MeshGraphBackground />
        </div>
        
        {/* Logo */}
        <div className="relative z-10">
          <img src={mfecLogo} alt="MFEC Logo" className="h-8 md:h-10 w-auto invert brightness-0" />
        </div>

        {/* Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mt-20 lg:mt-0"
        >
          <h1 className="text-[32px] sm:text-[40px] lg:text-[56px] font-semibold text-white leading-[1.1] tracking-tight">
            Discover your true <br /> Tech Debt.
          </h1>
          <p className="text-[15px] lg:text-[18px] text-zinc-400 mt-4 max-w-[400px] leading-relaxed">
            Evaluate infrastructure maturity and prepare your organization for the AI era in less than 5 minutes.
          </p>
        </motion.div>
      </div>

      {/* Right Panel: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white dark:bg-[#16161e]">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-[440px]"
        >
          <h2 className="text-[28px] md:text-[32px] font-semibold text-zinc-900 dark:text-white mb-2 tracking-tight">Start Assessment</h2>
          <p className="text-[14px] text-zinc-500 dark:text-zinc-400 mb-8">
            Complete this short form to begin the evaluation.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Name Input */}
            <div className="w-full">
              <input
                type="text"
                id="nameInput"
                className="w-full h-11 px-4 rounded-lg bg-zinc-100 dark:bg-[#20202b] border border-transparent focus:border-[#0077ff] dark:focus:border-[#00e5ff]/50 outline-none text-[14px] font-medium text-zinc-900 dark:text-white placeholder-zinc-500 transition-colors shadow-sm"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div className="w-full">
              <input
                type="email"
                id="emailInput"
                className="w-full h-11 px-4 rounded-lg bg-zinc-100 dark:bg-[#20202b] border border-transparent focus:border-[#0077ff] dark:focus:border-[#00e5ff]/50 outline-none text-[14px] font-medium text-zinc-900 dark:text-white placeholder-zinc-500 transition-colors shadow-sm"
                placeholder="Work Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Organization Input */}
            <div className="w-full">
              <input
                type="text"
                id="companyInput"
                className="w-full h-11 px-4 rounded-lg bg-zinc-100 dark:bg-[#20202b] border border-transparent focus:border-[#0077ff] dark:focus:border-[#00e5ff]/50 outline-none text-[14px] font-medium text-zinc-900 dark:text-white placeholder-zinc-500 transition-colors shadow-sm"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            {/* Role Dropdown */}
            <div className="relative group w-full">
              <div 
                ref={dropdownRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative flex items-center h-11 w-full px-4 rounded-lg bg-zinc-100 dark:bg-[#20202b] border border-transparent transition-colors cursor-pointer shadow-sm"
                style={{ borderColor: isDropdownOpen ? 'rgba(0, 229, 255, 0.5)' : undefined }}
              >
                <span className={`w-full text-[14px] font-medium truncate ${role ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>
                  {role || "Select Role"}
                </span>
                <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} className="absolute right-4">
                  <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
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
                    className="absolute top-[48px] left-0 w-full bg-white dark:bg-[#20202b] border border-zinc-200 dark:border-zinc-700/50 rounded-lg overflow-hidden shadow-xl z-50 max-h-[200px] overflow-y-auto"
                  >
                    {roles.map((r) => (
                      <div 
                        key={r}
                        onClick={() => setRole(r)}
                        className="px-4 py-3 text-[13px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        {r}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PDPA Consent Checkbox */}
            <div className="flex items-start gap-3 mt-2">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  id="pdpaConsent" 
                  checked={pdpaConsent}
                  onChange={(e) => setPdpaConsent(e.target.checked)}
                  className="peer w-4 h-4 rounded border border-zinc-300 dark:border-zinc-600 text-[#0077ff] dark:text-[#00e5ff] focus:ring-0 focus:ring-offset-0 bg-transparent cursor-pointer transition-all duration-200 checked:border-[#0077ff] dark:checked:border-[#00e5ff] checked:bg-[#0077ff] dark:checked:bg-[#00e5ff]"
                />
              </div>
              <label htmlFor="pdpaConsent" className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed cursor-pointer font-medium select-none">
                ข้าพเจ้ายินยอมให้ MFEC เก็บรวบรวมข้อมูลเพื่อใช้ในการติดต่อกลับและนำเสนอโซลูชัน ตาม <a href="#" className="text-[#0077ff] dark:text-[#00e5ff] hover:underline underline-offset-4">นโยบายความเป็นส่วนตัวของบริษัท</a>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={!isFormValid}
              className={`
                w-full h-11 rounded-lg font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-300 mt-4 shadow-sm
                ${isFormValid 
                  ? 'bg-gradient-to-r from-[#0077ff] to-[#0055ff] dark:from-[#00e5ff]/90 dark:to-[#0077ff]/90 text-white hover:opacity-90' 
                  : 'bg-zinc-200 dark:bg-[#20202b]/50 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'}
              `}
            >
              <span>Submit Application</span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
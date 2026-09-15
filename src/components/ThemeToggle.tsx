import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-6 right-6 md:top-8 md:right-10 z-50 p-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 focus:outline-none backdrop-blur-md"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'light' ? (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute"
            >
              <Sun size={18} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute"
            >
              <Moon size={18} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
};

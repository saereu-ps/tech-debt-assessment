const fs = require('fs');
let content = fs.readFileSync('src/components/AssessmentStepper.tsx', 'utf8');

content = content.replace('bg-[#060a0f]', 'bg-transparent');
content = content.replace('bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/20', 'bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-xl border border-black/10 dark:border-white/20');
content = content.replace('text-[44px] font-bold tracking-tight text-white', 'text-[44px] font-bold tracking-tight text-zinc-900 dark:text-white');
content = content.replace('text-zinc-400 text-[16px] font-medium tracking-wide mt-3', 'text-zinc-500 dark:text-zinc-400 text-[16px] font-medium tracking-wide mt-3');
content = content.replace("'bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10'", "'bg-white/40 dark:bg-white/[0.01] border-black/5 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/[0.03] hover:border-black/10 dark:hover:border-white/10 shadow-sm dark:shadow-none'");
content = content.replace("isSelected ? 'text-white' : 'text-zinc-200 group-hover:text-white'", "isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white'");
content = content.replace("isSelected ? 'text-zinc-300' : 'text-zinc-500 group-hover:text-zinc-400'", "isSelected ? 'text-zinc-500 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-500 dark:group-hover:text-zinc-400'");
content = content.replace("isSelected ? 'text-[#00e5ff]/90' : 'text-zinc-600 group-hover:text-zinc-500'", "isSelected ? 'text-[#00b8d4] dark:text-[#00e5ff]/90' : 'text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-500'");
content = content.replace("'text-zinc-500 hover:text-white'", "'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white'");
content = content.replace("group bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white", "group bg-black/5 dark:bg-white/[0.03] hover:bg-black/10 dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white");
content = content.replace("'bg-white/[0.02] border border-white/5 text-zinc-600 cursor-not-allowed'", "'bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'");
content = content.replace("'bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 border border-[#00e5ff]/50 hover:border-[#00e5ff] text-white", "'bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 border border-[#00e5ff]/50 hover:border-[#00e5ff] text-[#00b8d4] dark:text-white");
content = content.replace('text-[12px] font-bold tracking-[0.2em] text-white uppercase text-center', 'text-[12px] font-bold tracking-[0.2em] text-zinc-900 dark:text-white uppercase text-center');
content = content.replace('text-[32px] font-black text-white leading-none tracking-tighter mb-1', 'text-[32px] font-black text-zinc-900 dark:text-white leading-none tracking-tighter mb-1');
content = content.replace('text-[12px] font-bold tracking-widest text-[#00e5ff] uppercase mt-2', 'text-[12px] font-bold tracking-widest text-[#00b8d4] dark:text-[#00e5ff] uppercase mt-2');


fs.writeFileSync('src/components/AssessmentStepper.tsx', content);
console.log("Updated AssessmentStepper.tsx");

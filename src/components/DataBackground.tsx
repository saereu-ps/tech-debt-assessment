import React from 'react';
import { motion } from 'framer-motion';

const DataBackground: React.FC = () => {
  // Generate random data nodes for the AI/Data aesthetic
  const dataNodes = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    text: ['{ }', '</>', '01', 'λ', '∑', 'f(x)', 'AI', 'tensor'][Math.floor(Math.random() * 8)]
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-transparent">
      
      {/* Deep Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#00e5ff]/5 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#a855f7]/5 blur-[120px] rounded-full mix-blend-screen" />

      {/* 3D Perspective Floor Grid */}
      <div 
        className="absolute bottom-0 left-[-50%] w-[200%] h-[60vh] opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to top, rgba(0, 229, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 100%)'
        }}
      />

      {/* Floating Data Symbols */}
      {dataNodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute text-[#00e5ff] font-mono font-bold opacity-20 text-xs md:text-sm mix-blend-screen"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut"
          }}
        >
          {node.text}
        </motion.div>
      ))}

      {/* Animated Data Streams (Vertical lines) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-[20%] top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent animate-pulse" />
        <div className="absolute left-[80%] top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#a855f7] to-transparent animate-pulse delay-700" />
      </div>

    </div>
  );
};

export default DataBackground;

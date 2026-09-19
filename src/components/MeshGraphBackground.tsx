import React, { useEffect, useRef } from 'react';

const MeshGraphBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Premium Wave Configuration
    const cols = 70; // Smooth, high resolution
    const rows = 45;
    const spacing = 50; // Spread out

    let time = 0;

    const render = () => {
      time += 0.004; // Glacially slow and elegant movement (Expensive feel)
      
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxX = (mouseX - width / 2) * 0.03;
      const parallaxY = (mouseY - height / 2) * 0.03;
      
      // Deep premium dark background (Almost absolute black)
      ctx.fillStyle = '#020308'; 
      ctx.fillRect(0, 0, width, height);
      
      ctx.save();
      // Center the mesh, slightly lower to act as a digital landscape/floor
      ctx.translate(width / 2 + parallaxX, height / 2 + 100 + parallaxY);

      const points: {x: number, y: number, z: number, px: number, py: number, scale: number, heightRatio: number}[] = [];

      // Calculate 3D topology
      for (let z = 0; z < rows; z++) {
        for (let x = 0; x < cols; x++) {
          const worldX = (x - cols / 2) * spacing;
          const worldZ = (z - rows / 2) * spacing;
          
          const dist = Math.sqrt(worldX * worldX + worldZ * worldZ);
          
          // Smooth, elegant organic waves
          const y = 
            Math.sin(worldX * 0.002 + time) * 140 +
            Math.cos(worldZ * 0.003 + time * 0.8) * 140 +
            Math.sin(dist * 0.0015 - time * 0.4) * 90;

          // Projection
          const fov = 1000;
          const zDepth = worldZ + 1200; // Push back into the screen
          
          if (zDepth > 0) {
            const scale = fov / zDepth;
            const px = worldX * scale;
            const py = y * scale;
            
            // Calculate a ratio for how high the peak is (for subtle glowing)
            const heightRatio = Math.max(0, Math.min(1, (150 - y) / 300));
            
            points.push({ x, y, z, px, py, scale, heightRatio });
          }
        }
      }

      // Draw the Mesh Wireframe (Elegant, ultra-thin lines)
      ctx.lineWidth = 0.5; // Very thin, premium look
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Vignette fade out based on distance from center (Makes it seamlessly blend into the dark)
        const maxDist = (cols / 2) * spacing;
        const currentDist = Math.sqrt(Math.pow((p.x - cols/2)*spacing, 2) + Math.pow((p.z - rows/2)*spacing, 2));
        const edgeFade = Math.max(0, 1 - (currentDist / maxDist));
        
        // Depth fade
        const depthFade = Math.max(0.01, p.scale * 1.2 - 0.2);
        
        const finalAlpha = edgeFade * depthFade;
        
        if (finalAlpha > 0.01) {
          // Horizontal connections
          if (p.x < cols - 1 && i + 1 < points.length) {
            const right = points[i + 1];
            ctx.beginPath();
            // Mostly white/silver lines, with a very subtle hint of cyan based on height
            if (p.heightRatio > 0.6) {
               ctx.strokeStyle = `rgba(0, 229, 255, ${finalAlpha * 0.4})`;
            } else {
               ctx.strokeStyle = `rgba(255, 255, 255, ${finalAlpha * 0.15})`;
            }
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(right.px, right.py);
            ctx.stroke();
          }

          // Vertical connections
          if (p.z < rows - 1 && i + cols < points.length) {
            const bottom = points[i + cols];
            ctx.beginPath();
            // Subtle hint of purple based on height
            if (p.heightRatio > 0.6) {
               ctx.strokeStyle = `rgba(168, 85, 247, ${finalAlpha * 0.4})`;
            } else {
               ctx.strokeStyle = `rgba(255, 255, 255, ${finalAlpha * 0.15})`;
            }
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(bottom.px, bottom.py);
            ctx.stroke();
          }
          
          // Draw tiny nodes only on peaks
          if (p.heightRatio > 0.5) {
             const radius = Math.max(0.3, p.scale * 0.8);
             ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha * 0.6})`;
             ctx.beginPath();
             ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
             ctx.fill();
             
             // Extra soft glow for very high peaks
             if (p.heightRatio > 0.75) {
                ctx.fillStyle = `rgba(0, 229, 255, ${finalAlpha * 0.1})`;
                ctx.beginPath();
                ctx.arc(p.px, p.py, radius * 12, 0, Math.PI * 2);
                ctx.fill();
             }
          }
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto bg-[#020308]">
      {/* Background ambient corner glows - extremely soft and blurry for a premium feel */}
      <div className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] bg-[#00e5ff]/3 blur-[180px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-30%] right-[-20%] w-[70vw] h-[70vw] bg-[#a855f7]/3 blur-[180px] rounded-full mix-blend-screen pointer-events-none" />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 w-full h-full opacity-90"
      />
    </div>
  );
};

export default MeshGraphBackground;

import React, { useEffect, useRef } from 'react';

const MeshGraphBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for performance if background is drawn
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Mouse tracking
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    
    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Define the dense 3D grid
    const cols = 75; // Increased density
    const rows = 55; // Increased density
    const spacing = 45; // Decreased spacing

    // Generate some random noise for neural-like randomness
    const noise = new Float32Array(cols * rows);
    for (let i = 0; i < noise.length; i++) {
      noise[i] = Math.random();
    }

    const render = () => {
      time += 0.012;
      
      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      
      // Dark background fill
      ctx.fillStyle = '#050810';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.save();
      // Move center of projection to middle of screen
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + 50;
      ctx.translate(centerX, centerY);

      const points: {x: number, y: number, z: number, px: number, py: number, scale: number, active: number}[] = [];

      // Calculate 3D points and 2D projection
      for (let z = 0; z < rows; z++) {
        for (let x = 0; x < cols; x++) {
          const idx = z * cols + x;
          const worldX = (x - cols / 2) * spacing;
          const worldZ = (z - rows / 2) * spacing;
          
          const dist = Math.sqrt(worldX * worldX + worldZ * worldZ);
          
          // Base math topology
          let y = 
            Math.sin(worldX * 0.003 + time) * 120 +
            Math.cos(worldZ * 0.004 + time * 1.2) * 120 +
            Math.sin(dist * 0.002 - time * 0.5) * 80;

          // Simple 3D to 2D projection
          const fov = 800;
          const zDepth = worldZ + 1000; 
          
          if (zDepth > 0) {
            const scale = fov / zDepth;
            const px = worldX * scale;
            const py = y * scale - 100;
            
            // Calculate mouse interaction in projected space
            const absolutePx = px + centerX;
            const absolutePy = py + centerY;
            const dx = mouseX - absolutePx;
            const dy = mouseY - absolutePy;
            const mouseDist = Math.sqrt(dx * dx + dy * dy);
            
            // Mouse repulse/attract and glow effect
            let active = 0;
            if (mouseDist < 250) {
              const influence = (250 - mouseDist) / 250;
              active = influence;
              // Lift points near mouse
              y -= influence * 150 * scale; 
            }

            // Recalculate with new Y
            const finalPy = y * scale - 100;
            
            points.push({ x, y, z, px, finalPy, scale, active });
          }
        }
      }

      // Draw the Neural Mesh
      // We'll draw lines first so nodes render on top
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        // Base alpha from depth + noise
        const baseAlpha = Math.min(1, Math.max(0.02, p.scale * 1.2 - 0.2));
        const activeAlpha = p.active * 0.8;
        
        // Draw horizontal connections
        if (p.x < cols - 1 && i + 1 < points.length) {
          const right = points[i + 1];
          const lineAlpha = baseAlpha * 0.2 + activeAlpha;
          ctx.beginPath();
          // Mix colors based on mouse proximity
          if (p.active > 0.1 || right.active > 0.1) {
             ctx.strokeStyle = `rgba(0, 255, 255, ${Math.min(1, lineAlpha * 2)})`;
             ctx.lineWidth = p.scale * 1.5;
          } else {
             ctx.strokeStyle = `rgba(0, 180, 255, ${lineAlpha})`;
             ctx.lineWidth = p.scale * 0.6;
          }
          ctx.moveTo(p.px, p.finalPy);
          ctx.lineTo(right.px, right.finalPy);
          ctx.stroke();
        }

        // Draw vertical connections
        if (p.z < rows - 1 && i + cols < points.length) {
          const bottom = points[i + cols];
          const lineAlpha = baseAlpha * 0.2 + activeAlpha;
          ctx.beginPath();
          if (p.active > 0.1 || bottom.active > 0.1) {
             ctx.strokeStyle = `rgba(168, 85, 247, ${Math.min(1, lineAlpha * 2)})`;
             ctx.lineWidth = p.scale * 1.5;
          } else {
             ctx.strokeStyle = `rgba(130, 50, 200, ${lineAlpha})`;
             ctx.lineWidth = p.scale * 0.6;
          }
          ctx.moveTo(p.px, p.finalPy);
          ctx.lineTo(bottom.px, bottom.finalPy);
          ctx.stroke();
        }
        
        // Random diagonal connections for neural net feel (only sparse)
        const nIndex = p.z * cols + p.x;
        if (noise[nIndex] > 0.85 && p.x < cols - 1 && p.z < rows - 1 && i + cols + 1 < points.length) {
           const diag = points[i + cols + 1];
           ctx.beginPath();
           ctx.strokeStyle = `rgba(255, 255, 255, ${baseAlpha * 0.15 + activeAlpha})`;
           ctx.lineWidth = p.scale * 0.5;
           ctx.moveTo(p.px, p.finalPy);
           ctx.lineTo(diag.px, diag.finalPy);
           ctx.stroke();
        }
      }

      // Draw Nodes
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const baseAlpha = Math.min(1, Math.max(0.05, p.scale * 1.5 - 0.2));
        
        const radius = Math.max(0.5, p.scale * 1.5);
        
        if (p.active > 0.05) {
          // Active node (near mouse)
          ctx.fillStyle = `rgba(255, 255, 255, 1)`;
          ctx.beginPath();
          ctx.arc(p.px, p.finalPy, radius * 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Intense Glow
          ctx.fillStyle = `rgba(0, 255, 255, ${p.active * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.px, p.finalPy, radius * 8 * p.active, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Normal node
          ctx.fillStyle = `rgba(255, 255, 255, ${baseAlpha * 0.7})`;
          ctx.beginPath();
          ctx.arc(p.px, p.finalPy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto bg-transparent">
      {/* Background ambient corner glows to match the mesh colors */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#00e5ff]/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#a855f7]/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 w-full h-full"
      />
    </div>
  );
};

export default MeshGraphBackground;

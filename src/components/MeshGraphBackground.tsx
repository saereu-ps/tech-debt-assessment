import React, { useEffect, useRef } from 'react';

const MeshGraphBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Define the 3D grid
    const cols = 55;
    const rows = 45;
    const spacing = 60;

    const render = () => {
      time += 0.015;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.save();
      // Move center of projection to middle of screen
      ctx.translate(canvas.width / 2, canvas.height / 2 + 50);

      const points: {x: number, y: number, z: number, px: number, py: number, scale: number}[] = [];

      // Calculate 3D points and 2D projection
      for (let z = 0; z < rows; z++) {
        for (let x = 0; x < cols; x++) {
          const worldX = (x - cols / 2) * spacing;
          const worldZ = (z - rows / 2) * spacing;
          
          // Math Graph Topology Function (Complex overlapping waves for organic feel)
          const dist = Math.sqrt(worldX * worldX + worldZ * worldZ);
          
          const y = 
            Math.sin(worldX * 0.003 + time) * 150 +
            Math.cos(worldZ * 0.004 + time * 1.2) * 150 +
            Math.sin(dist * 0.002 - time * 0.5) * 100;

          // Simple 3D to 2D projection
          const fov = 700;
          const zDepth = worldZ + 1200; // Push mesh deep into the screen
          
          if (zDepth > 0) {
            const scale = fov / zDepth;
            const px = worldX * scale;
            const py = y * scale - 150; // Adjust vertical center
            points.push({ x, y, z, px, py, scale });
          }
        }
      }

      // Draw the Mesh Wireframe (Edges and Nodes)
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const alpha = Math.min(1, Math.max(0.05, p.scale * 1.5 - 0.2));
        
        // Draw horizontal connections (Cyan)
        if (p.x < cols - 1 && i + 1 < points.length) {
          const right = points[i + 1];
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.35})`;
          ctx.lineWidth = p.scale * 0.8;
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(right.px, right.py);
          ctx.stroke();
        }

        // Draw vertical connections (Magenta)
        if (p.z < rows - 1 && i + cols < points.length) {
          const bottom = points[i + cols];
          ctx.beginPath();
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.35})`;
          ctx.lineWidth = p.scale * 0.8;
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(bottom.px, bottom.py);
          ctx.stroke();
        }
        
        // Draw the Node Particle (White/Cyan glow)
        const radius = Math.max(0.5, p.scale * 1.8);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a subtle glow to peaks
        if (p.y > 100) {
            ctx.fillStyle = `rgba(0, 229, 255, ${alpha * 0.4})`;
            ctx.beginPath();
            ctx.arc(p.px, p.py, radius * 3, 0, Math.PI * 2);
            ctx.fill();
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#03050a]">
      {/* Background ambient corner glows to match the mesh colors */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#00e5ff]/5 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#a855f7]/5 blur-[120px] rounded-full mix-blend-screen" />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-80"
      />
    </div>
  );
};

export default MeshGraphBackground;

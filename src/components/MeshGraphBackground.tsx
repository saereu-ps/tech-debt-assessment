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

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Sphere configuration
    const numPoints = 500;
    const sphereRadius = Math.min(width, height) * 0.45; // Scales with screen
    const points: { origX: number, origY: number, origZ: number, x: number, y: number, z: number, px: number, py: number, scale: number }[] = [];
    const edges: [number, number][] = [];

    // 1. Generate points using Fibonacci Sphere algorithm for even distribution
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      points.push({
        origX: x * sphereRadius,
        origY: y * sphereRadius,
        origZ: z * sphereRadius,
        x: 0, y: 0, z: 0, px: 0, py: 0, scale: 0
      });
    }

    // 2. Pre-calculate edges (connections) based on distance
    const connectionDist = sphereRadius * 0.22; // Connect points that are close
    const connectionDistSq = connectionDist * connectionDist;
    
    for (let i = 0; i < numPoints; i++) {
      let connections = 0;
      for (let j = i + 1; j < numPoints; j++) {
        // Limit max connections per node to keep it clean
        if (connections > 4) break; 
        
        const dx = points[i].origX - points[j].origX;
        const dy = points[i].origY - points[j].origY;
        const dz = points[i].origZ - points[j].origZ;
        
        if (dx * dx + dy * dy + dz * dz < connectionDistSq) {
          edges.push([i, j]);
          connections++;
        }
      }
    }

    let time = 0;
    const fov = 1000;

    const render = () => {
      time += 0.002; // Slow rotation speed
      
      // Clear background
      ctx.fillStyle = '#050810';
      ctx.fillRect(0, 0, width, height);
      
      ctx.save();
      // Center the globe, slightly shifted to the left on desktop for better layout balance
      const isDesktop = width > 1024;
      const centerX = isDesktop ? width * 0.4 : width / 2;
      const centerY = height / 2;
      ctx.translate(centerX, centerY);

      // Rotation angles
      const rotX = time * 0.5;
      const rotY = time;
      
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // 3. Rotate and Project Points
      for (let i = 0; i < numPoints; i++) {
        const p = points[i];
        
        // Rotate around Y axis
        let rx = p.origX * cosY - p.origZ * sinY;
        let rz = p.origX * sinY + p.origZ * cosY;
        
        // Rotate around X axis
        let ry = p.origY * cosX - rz * sinX;
        rz = p.origY * sinX + rz * cosX;
        
        p.x = rx;
        p.y = ry;
        p.z = rz;
        
        // Perspective projection
        const zDepth = rz + fov;
        p.scale = zDepth > 0 ? fov / zDepth : 0;
        p.px = p.x * p.scale;
        p.py = p.y * p.scale;
      }

      // 4. Draw Edges
      ctx.lineWidth = 1;
      for (let i = 0; i < edges.length; i++) {
        const [p1Idx, p2Idx] = edges[i];
        const p1 = points[p1Idx];
        const p2 = points[p2Idx];
        
        // Only draw if points are valid and at least one is facing front
        if (p1.scale > 0 && p2.scale > 0) {
          // Average Z to determine opacity (nodes in back are dimmer)
          const avgZ = (p1.z + p2.z) / 2;
          // Map Z from [-radius, radius] to opacity [0.05, 0.4]
          const normalizedZ = (avgZ + sphereRadius) / (sphereRadius * 2); 
          const alpha = Math.max(0.02, Math.min(0.4, normalizedZ * normalizedZ * 0.5));
          
          if (alpha > 0.05) { // Optimization: don't draw practically invisible lines in the far back
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // 5. Draw Nodes
      for (let i = 0; i < numPoints; i++) {
        const p = points[i];
        if (p.scale > 0) {
          const normalizedZ = (p.z + sphereRadius) / (sphereRadius * 2);
          
          if (normalizedZ > 0.2) { // Only draw nodes that are relatively forward
            const alpha = Math.max(0.1, Math.min(1, normalizedZ * normalizedZ * 1.5));
            const radius = Math.max(0.5, p.scale * 1.5);
            
            // Draw core dot
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Add extra glow for very front nodes
            if (normalizedZ > 0.8) {
              ctx.beginPath();
              ctx.fillStyle = `rgba(0, 229, 255, ${alpha * 0.3})`;
              ctx.arc(p.px, p.py, radius * 4, 0, Math.PI * 2);
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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#050810]">
      {/* Background ambient corner glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#00e5ff]/5 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#a855f7]/5 blur-[120px] rounded-full mix-blend-screen" />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 w-full h-full opacity-80"
      />
    </div>
  );
};

export default MeshGraphBackground;

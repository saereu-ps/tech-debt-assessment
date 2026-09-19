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

    // Mouse Tracking for Parallax
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

    // Sphere configuration
    const numPoints = 600; // Increased density
    const sphereRadius = Math.min(width, height) * 0.55; // Larger, more imposing globe
    const points: { origX: number, origY: number, origZ: number, x: number, y: number, z: number, px: number, py: number, scale: number, neighbors: number[] }[] = [];
    const edges: [number, number][] = [];

    // 1. Generate points using Fibonacci Sphere algorithm
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      points.push({
        origX: x * sphereRadius,
        origY: y * sphereRadius,
        origZ: z * sphereRadius,
        x: 0, y: 0, z: 0, px: 0, py: 0, scale: 0,
        neighbors: []
      });
    }

    // 2. Pre-calculate edges (connections)
    const connectionDist = sphereRadius * 0.22; 
    const connectionDistSq = connectionDist * connectionDist;
    
    for (let i = 0; i < numPoints; i++) {
      let connections = 0;
      for (let j = i + 1; j < numPoints; j++) {
        if (connections > 5) break; 
        
        const dx = points[i].origX - points[j].origX;
        const dy = points[i].origY - points[j].origY;
        const dz = points[i].origZ - points[j].origZ;
        
        if (dx * dx + dy * dy + dz * dz < connectionDistSq) {
          edges.push([i, j]);
          points[i].neighbors.push(j);
          points[j].neighbors.push(i);
          connections++;
        }
      }
    }

    // Data Comets (Shooting Stars across the network)
    class Comet {
      currentNode: number;
      targetNode: number;
      progress: number;
      speed: number;
      history: {x: number, y: number, z: number}[];
      color: string;

      constructor() {
        this.currentNode = Math.floor(Math.random() * numPoints);
        this.targetNode = this.pickNextNode(this.currentNode);
        this.progress = 0;
        this.speed = 0.05 + Math.random() * 0.05;
        this.history = [];
        this.color = Math.random() > 0.5 ? '#00e5ff' : '#a855f7'; // Cyan or Magenta
      }

      pickNextNode(current: number) {
        const neighbors = points[current].neighbors;
        if (neighbors.length === 0) return current;
        return neighbors[Math.floor(Math.random() * neighbors.length)];
      }

      update() {
        this.progress += this.speed;
        
        const p1 = points[this.currentNode];
        const p2 = points[this.targetNode];
        
        // Interpolate position
        const currentX = p1.x + (p2.x - p1.x) * this.progress;
        const currentY = p1.y + (p2.y - p1.y) * this.progress;
        const currentZ = p1.z + (p2.z - p1.z) * this.progress;
        
        this.history.push({x: currentX, y: currentY, z: currentZ});
        if (this.history.length > 15) this.history.shift(); // Trail length

        if (this.progress >= 1) {
          this.progress = 0;
          this.currentNode = this.targetNode;
          this.targetNode = this.pickNextNode(this.currentNode);
          
          // Small chance to die and respawn
          if (Math.random() > 0.8) {
            this.currentNode = Math.floor(Math.random() * numPoints);
            this.targetNode = this.pickNextNode(this.currentNode);
            this.history = [];
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D, fov: number) {
        if (this.history.length < 2) return;
        
        ctx.beginPath();
        for (let i = 0; i < this.history.length; i++) {
          const h = this.history[i];
          const zDepth = h.z + fov;
          if (zDepth > 0) {
            const scale = fov / zDepth;
            const px = h.x * scale;
            const py = h.y * scale;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
        }
        
        // Fading glowing trail
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Draw comet head
        const head = this.history[this.history.length - 1];
        const headZDepth = head.z + fov;
        if (headZDepth > 0) {
          const scale = fov / headZDepth;
          ctx.beginPath();
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#ffffff';
          ctx.arc(head.x * scale, head.y * scale, 3 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    const comets = Array.from({ length: 20 }, () => new Comet());

    let time = 0;
    const fov = 1200; // Increased FOV for dramatic perspective

    const render = () => {
      time += 0.003; 
      
      // Smooth mouse tracking
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      
      // Calculate parallax offsets
      const parallaxX = (mouseX - width / 2) * 0.1;
      const parallaxY = (mouseY - height / 2) * 0.1;

      // Dark, rich background
      ctx.fillStyle = '#03050a'; // Extremely dark blue, almost black, looks more premium
      ctx.fillRect(0, 0, width, height);
      
      ctx.save();
      // Center the globe with parallax shift
      const isDesktop = width > 1024;
      const centerX = (isDesktop ? width * 0.35 : width / 2) + parallaxX;
      const centerY = height / 2 + parallaxY;
      ctx.translate(centerX, centerY);

      // Add a subtle glowing core behind the globe
      const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, sphereRadius);
      coreGradient.addColorStop(0, 'rgba(0, 229, 255, 0.08)');
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(0, 0, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Rotation angles with slight mouse influence for interactive feel
      const rotX = time * 0.4 + (mouseY / height - 0.5) * 0.5;
      const rotY = time * 0.6 + (mouseX / width - 0.5) * 0.5;
      
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // 3. Rotate and Project Points
      for (let i = 0; i < numPoints; i++) {
        const p = points[i];
        
        let rx = p.origX * cosY - p.origZ * sinY;
        let rz = p.origX * sinY + p.origZ * cosY;
        let ry = p.origY * cosX - rz * sinX;
        rz = p.origY * sinX + rz * cosX;
        
        p.x = rx;
        p.y = ry;
        p.z = rz;
        
        const zDepth = rz + fov;
        p.scale = zDepth > 0 ? fov / zDepth : 0;
        p.px = p.x * p.scale;
        p.py = p.y * p.scale;
      }

      // Sort edges by Z to draw back to front (proper blending)
      // Actually just drawing them is fine if we use additive blending, 
      // but let's stick to standard over for performance, just adjusting opacity.
      
      ctx.lineWidth = 1.5;
      for (let i = 0; i < edges.length; i++) {
        const [p1Idx, p2Idx] = edges[i];
        const p1 = points[p1Idx];
        const p2 = points[p2Idx];
        
        if (p1.scale > 0 && p2.scale > 0) {
          const avgZ = (p1.z + p2.z) / 2;
          const normalizedZ = (avgZ + sphereRadius) / (sphereRadius * 2); 
          const alpha = Math.max(0.01, Math.min(0.6, normalizedZ * normalizedZ * 0.8));
          
          if (alpha > 0.05) { 
            // Mix color based on position (Cyan on left, Magenta on right)
            const gradientRatio = (p1.origX + sphereRadius) / (sphereRadius * 2);
            // Interpolate between #00e5ff (0, 229, 255) and #a855f7 (168, 85, 247)
            const r = Math.floor(0 + (168 - 0) * gradientRatio);
            const g = Math.floor(229 + (85 - 229) * gradientRatio);
            const b = Math.floor(255 + (247 - 255) * gradientRatio);
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw Comets (Data flowing)
      comets.forEach(comet => {
        comet.update();
        comet.draw(ctx, fov);
      });

      // Draw Nodes
      for (let i = 0; i < numPoints; i++) {
        const p = points[i];
        if (p.scale > 0) {
          const normalizedZ = (p.z + sphereRadius) / (sphereRadius * 2);
          
          if (normalizedZ > 0.1) {
            const alpha = Math.max(0.1, Math.min(1, normalizedZ * normalizedZ * 2));
            const radius = Math.max(0.5, p.scale * 2);
            
            const gradientRatio = (p.origX + sphereRadius) / (sphereRadius * 2);
            const r = Math.floor(0 + (168 - 0) * gradientRatio);
            const g = Math.floor(229 + (85 - 229) * gradientRatio);
            const b = Math.floor(255 + (247 - 255) * gradientRatio);

            // Intense glow for very front nodes (Simulating Depth of Field)
            if (normalizedZ > 0.85) {
              ctx.shadowBlur = 15;
              ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
              ctx.fillStyle = '#ffffff';
            } else {
              ctx.shadowBlur = 0;
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            }

            ctx.beginPath();
            ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // reset
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
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto bg-[#03050a]">
      {/* Background ambient corner glows - richer colors */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#00e5ff]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#a855f7]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 w-full h-full"
      />
    </div>
  );
};

export default MeshGraphBackground;

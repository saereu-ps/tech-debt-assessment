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

    // Sphere configuration
    const numPoints = 550;
    const sphereRadius = Math.min(width, height) * 0.48;
    
    const points: { origX: number, origY: number, origZ: number, x: number, y: number, z: number, px: number, py: number, scale: number }[] = [];
    const edges: [number, number][] = [];
    const neighbors: number[][] = Array.from({length: numPoints}, () => []);

    // Generate points
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
        x: 0, y: 0, z: 0, px: 0, py: 0, scale: 0
      });
    }

    // Pre-calculate edges and neighbors
    const connectionDist = sphereRadius * 0.22;
    const connectionDistSq = connectionDist * connectionDist;
    
    for (let i = 0; i < numPoints; i++) {
      let connections = 0;
      for (let j = i + 1; j < numPoints; j++) {
        if (connections > 4) break; 
        
        const dx = points[i].origX - points[j].origX;
        const dy = points[i].origY - points[j].origY;
        const dz = points[i].origZ - points[j].origZ;
        
        if (dx * dx + dy * dy + dz * dz < connectionDistSq) {
          edges.push([i, j]);
          neighbors[i].push(j);
          neighbors[j].push(i);
          connections++;
        }
      }
    }

    // Neural Synapse Flashes - ULTRA THIN & SUBTLE
    class SynapseFlash {
      activeNodes: Map<number, number>; // nodeId -> intensity (0 to 1)
      age: number;
      maxAge: number;
      color: string;
      
      constructor(startNode: number) {
        this.activeNodes = new Map();
        this.activeNodes.set(startNode, 1.0);
        this.age = 0;
        this.maxAge = 40 + Math.random() * 40; // Shorter lifespan
        this.color = Math.random() > 0.5 ? '0, 229, 255' : '168, 85, 247'; 
      }
      
      update() {
        this.age++;
        
        // Spread logic - Less aggressive spread
        if (this.age % 4 === 0 && this.age < 16) {
          const newNodes = new Map<number, number>();
          this.activeNodes.forEach((intensity, nodeId) => {
            if (intensity > 0.5) { 
              const nbrs = neighbors[nodeId];
              nbrs.forEach(n => {
                if (!this.activeNodes.has(n)) {
                  // Only 30% chance to spread (was 60%)
                  if (Math.random() > 0.7) {
                    newNodes.set(n, 0.8); // Start slightly dimmer
                  }
                }
              });
            }
          });
          newNodes.forEach((intensity, nodeId) => this.activeNodes.set(nodeId, intensity));
        }
        
        // Fade logic - Fades faster
        this.activeNodes.forEach((intensity, nodeId) => {
          this.activeNodes.set(nodeId, intensity * 0.88); 
        });
      }
    }

    let flashes: SynapseFlash[] = [];
    let time = 0;
    const fov = 1100;

    const render = () => {
      time += 0.0015; 
      
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxX = (mouseX - width / 2) * 0.04;
      const parallaxY = (mouseY - height / 2) * 0.04;

      // Dark background
      ctx.fillStyle = '#020308';
      ctx.fillRect(0, 0, width, height);
      
      ctx.save();
      
      const isDesktop = width > 1024;
      const centerX = isDesktop ? width * 0.38 : width / 2;
      const centerY = height / 2;
      
      ctx.translate(centerX + parallaxX, centerY + parallaxY);
      
      // Breathing Core
      const breath = Math.sin(time * 15) * 0.5 + 0.5; 
      const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, sphereRadius * 0.8);
      coreGradient.addColorStop(0, `rgba(0, 229, 255, ${0.03 + breath * 0.03})`); 
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGradient;
      ctx.fillRect(-sphereRadius, -sphereRadius, sphereRadius * 2, sphereRadius * 2);

      const rotX = time * 0.4 + (mouseY / height - 0.5) * 0.1;
      const rotY = time + (mouseX / width - 0.5) * 0.1;
      
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Rotate and Project Points
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

      // Draw Base Edges
      ctx.lineWidth = 0.5;
      for (let i = 0; i < edges.length; i++) {
        const [p1Idx, p2Idx] = edges[i];
        const p1 = points[p1Idx];
        const p2 = points[p2Idx];
        
        if (p1.scale > 0 && p2.scale > 0) {
          const avgZ = (p1.z + p2.z) / 2;
          const normalizedZ = (avgZ + sphereRadius) / (sphereRadius * 2); 
          const alpha = Math.max(0.01, Math.min(0.25, normalizedZ * normalizedZ * 0.4));
          
          if (alpha > 0.02) { 
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw Base Nodes
      for (let i = 0; i < numPoints; i++) {
        const p = points[i];
        if (p.scale > 0) {
          const normalizedZ = (p.z + sphereRadius) / (sphereRadius * 2);
          
          if (normalizedZ > 0.25) { 
            let alpha = Math.max(0.1, Math.min(0.7, normalizedZ * normalizedZ));
            let radius = Math.max(0.3, p.scale * 0.8); 
            
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Process and Draw Neural Synapse Flashes
      // Reduced probability from 6% to 2% (much less frequent)
      if (Math.random() < 0.02) { 
        flashes.push(new SynapseFlash(Math.floor(Math.random() * numPoints)));
      }
      
      flashes = flashes.filter(f => f.age < f.maxAge);
      
      flashes.forEach(flash => {
        flash.update();
        
        ctx.lineCap = 'round';
        
        // Draw Flash Edges
        flash.activeNodes.forEach((intensity1, n1) => {
          if (intensity1 < 0.05) return;
          const p1 = points[n1];
          if (p1.scale <= 0) return;
          
          neighbors[n1].forEach(n2 => {
            if (n2 > n1 && flash.activeNodes.has(n2)) { 
              const intensity2 = flash.activeNodes.get(n2)!;
              const p2 = points[n2];
              
              if (p2.scale > 0) {
                const avgZ = (p1.z + p2.z) / 2;
                const normalizedZ = (avgZ + sphereRadius) / (sphereRadius * 2);
                
                if (normalizedZ > 0.15) {
                  const edgeIntensity = (intensity1 + intensity2) / 2;
                  // Reduced max opacity for the flash edges (max 0.4 instead of 1)
                  const alpha = Math.min(0.4, edgeIntensity * (normalizedZ + 0.2));
                  
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(${flash.color}, ${alpha})`;
                  // Reduced thickness (max 0.8 instead of 2.0)
                  ctx.lineWidth = Math.max(0.5, p1.scale * 0.8 * edgeIntensity);
                  
                  // Reduced shadow blur
                  ctx.shadowBlur = 3 * edgeIntensity;
                  ctx.shadowColor = `rgba(${flash.color}, ${alpha})`;
                  
                  ctx.moveTo(p1.px, p1.py);
                  ctx.lineTo(p2.px, p2.py);
                  ctx.stroke();
                  ctx.shadowBlur = 0; 
                }
              }
            }
          });
        });
        
        // Draw Flash Nodes
        flash.activeNodes.forEach((intensity, n) => {
          if (intensity < 0.05) return;
          const p = points[n];
          if (p.scale > 0) {
            const normalizedZ = (p.z + sphereRadius) / (sphereRadius * 2);
            if (normalizedZ > 0.15) {
              // Reduced max opacity (max 0.6 instead of 1)
              const alpha = Math.min(0.6, intensity * (normalizedZ + 0.2));
              // Reduced size expansion
              const rad = Math.max(0.5, p.scale * (0.8 + intensity * 0.5));
              
              ctx.beginPath();
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.arc(p.px, p.py, rad, 0, Math.PI * 2);
              ctx.fill();
              
              ctx.beginPath();
              // Reduced aura size
              ctx.fillStyle = `rgba(${flash.color}, ${alpha * 0.5})`;
              ctx.arc(p.px, p.py, rad * 1.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      });

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
      <div className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] bg-[#00e5ff]/3 blur-[180px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-30%] right-[-20%] w-[70vw] h-[70vw] bg-[#a855f7]/3 blur-[180px] rounded-full mix-blend-screen pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full opacity-90" />
    </div>
  );
};

export default MeshGraphBackground;

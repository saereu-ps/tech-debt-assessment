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

    // Pre-calculate edges
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
          connections++;
        }
      }
    }

    // Satellites Configuration (Data Comets)
    const numSatellites = 3; 
    const satellites = Array.from({ length: numSatellites }, (_, i) => ({
      angle: (Math.PI * 2 / numSatellites) * i, 
      orbitRadius: sphereRadius * 1.35 + Math.random() * 40, 
      speed: 0.005 + Math.random() * 0.003, 
      size: 2.5 + Math.random() * 1.5,
      tiltZ: (Math.random() - 0.5) * sphereRadius * 0.6, 
      tiltY: (Math.random() - 0.5) * sphereRadius * 0.4,
      color: i % 2 === 0 ? '0, 229, 255' : '168, 85, 247' 
    }));

    let time = 0;
    const fov = 1100;

    const render = () => {
      time += 0.0015; 
      
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxX = (mouseX - width / 2) * 0.04;
      const parallaxY = (mouseY - height / 2) * 0.04;

      ctx.fillStyle = '#020308';
      ctx.fillRect(0, 0, width, height);
      
      ctx.save();
      
      const isDesktop = width > 1024;
      const centerX = isDesktop ? width * 0.38 : width / 2;
      const centerY = height / 2;
      
      // Breathing Core
      const breath = Math.sin(time * 15) * 0.5 + 0.5; 
      const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, sphereRadius * 0.8);
      coreGradient.addColorStop(0, `rgba(0, 229, 255, ${0.03 + breath * 0.03})`); 
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.translate(centerX + parallaxX, centerY + parallaxY);
      
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

      // Draw Edges
      ctx.lineWidth = 0.5;
      for (let i = 0; i < edges.length; i++) {
        const [p1Idx, p2Idx] = edges[i];
        const p1 = points[p1Idx];
        const p2 = points[p2Idx];
        
        if (p1.scale > 0 && p2.scale > 0) {
          const avgZ = (p1.z + p2.z) / 2;
          const normalizedZ = (avgZ + sphereRadius) / (sphereRadius * 2); 
          const alpha = Math.max(0.01, Math.min(0.35, normalizedZ * normalizedZ * 0.5));
          
          if (alpha > 0.03) { 
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      for (let i = 0; i < numPoints; i++) {
        const p = points[i];
        if (p.scale > 0) {
          const normalizedZ = (p.z + sphereRadius) / (sphereRadius * 2);
          
          if (normalizedZ > 0.25) { 
            let alpha = Math.max(0.1, Math.min(0.9, normalizedZ * normalizedZ));
            let radius = Math.max(0.4, p.scale * 1.0); 
            
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
            ctx.fill();
            
            if (normalizedZ > 0.85) {
              ctx.beginPath();
              ctx.fillStyle = `rgba(0, 229, 255, 0.15)`;
              ctx.arc(p.px, p.py, radius * 6, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Draw Satellites (Data Comets with Trails)
      ctx.lineCap = 'round';
      satellites.forEach(sat => {
        sat.angle += sat.speed;
        
        const trailSteps = 30; // Length of the trail
        const trailSpread = 1.2; // How far back the history goes multiplier
        const trailPositions = [];

        // Calculate 3D path history for the trail
        for (let i = 0; i < trailSteps; i++) {
          const histAngle = sat.angle - (sat.speed * trailSpread * i);
          
          let sx = Math.cos(histAngle) * sat.orbitRadius;
          let sy = sat.tiltY * Math.cos(histAngle);
          let sz = Math.sin(histAngle) * sat.orbitRadius + sat.tiltZ;
          
          let rx = sx * cosY - sz * sinY;
          let rz = sx * sinY + sz * cosY;
          let ry = sy * cosX - rz * sinX;
          rz = sy * sinX + rz * cosX;
          
          const zDepth = rz + fov;
          if (zDepth > 0) {
            trailPositions.push({
              px: rx * (fov / zDepth),
              py: ry * (fov / zDepth),
              rz: rz,
              scale: fov / zDepth
            });
          }
        }

        // Draw Trail Segments
        for (let i = 0; i < trailPositions.length - 1; i++) {
          const curr = trailPositions[i];
          const next = trailPositions[i + 1];
          
          const normalizedZ = (curr.rz + sphereRadius) / (sphereRadius * 2.5);
          const depthAlpha = Math.max(0.02, Math.min(1, (normalizedZ + 0.2) * 1.2));
          const trailFade = Math.pow(1 - (i / trailSteps), 2); // Exponential fade looks better
          
          const alpha = depthAlpha * trailFade;
          
          if (alpha > 0.01) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${sat.color}, ${alpha})`;
            ctx.lineWidth = Math.max(0.5, sat.size * curr.scale * trailFade * 1.5);
            ctx.moveTo(curr.px, curr.py);
            ctx.lineTo(next.px, next.py);
            ctx.stroke();
          }
        }

        // Draw Comet Head
        if (trailPositions.length > 0) {
          const head = trailPositions[0];
          const normalizedZ = (head.rz + sphereRadius) / (sphereRadius * 2.5);
          const alpha = Math.max(0.05, Math.min(1, (normalizedZ + 0.2) * 1.2));
          
          if (alpha > 0.05) {
            const rad = Math.max(0.5, sat.size * head.scale);
            
            ctx.beginPath();
            ctx.fillStyle = '#ffffff';
            ctx.arc(head.px, head.py, rad * 0.8, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.fillStyle = `rgba(${sat.color}, ${alpha * 0.9})`;
            ctx.arc(head.px, head.py, rad * 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Extra glow for front-facing comets
            if (alpha > 0.5) {
              ctx.beginPath();
              ctx.fillStyle = `rgba(${sat.color}, ${alpha * 0.2})`;
              ctx.arc(head.px, head.py, rad * 8, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
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

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

    const gridSize = 50;
    
    // Data Pulses (AI/Data Flow)
    class Pulse {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      color: string;
      speed: number;
      history: {x: number, y: number}[];

      constructor() {
        // Snap to grid
        this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
        
        // Speed must be a divisor of gridSize (50) so it hits intersections exactly
        const speeds = [1, 2, 2, 5]; 
        this.speed = speeds[Math.floor(Math.random() * speeds.length)];
        
        // Pick direction (horizontal or vertical)
        if (Math.random() > 0.5) {
          this.vx = Math.random() > 0.5 ? this.speed : -this.speed;
          this.vy = 0;
        } else {
          this.vx = 0;
          this.vy = Math.random() > 0.5 ? this.speed : -this.speed;
        }
        
        this.length = Math.random() * 100 + 40;
        // Cyan and Magenta/Purple from the brand
        this.color = Math.random() > 0.5 ? '#00e5ff' : '#a855f7';
        this.history = [];
      }

      update() {
        this.history.push({x: this.x, y: this.y});
        if (this.history.length > this.length / this.speed) {
          this.history.shift();
        }

        this.x += this.vx;
        this.y += this.vy;

        // Turn at grid intersections
        if (this.x % gridSize === 0 && this.y % gridSize === 0) {
          if (Math.random() > 0.5) { // 50% chance to turn
            if (this.vx !== 0) { 
              this.vx = 0;
              this.vy = Math.random() > 0.5 ? this.speed : -this.speed;
            } else {
              this.vy = 0;
              this.vx = Math.random() > 0.5 ? this.speed : -this.speed;
            }
          }
        }

        // Reset if significantly off screen
        if (this.x < -200 || this.x > width + 200 || this.y < -200 || this.y > height + 200) {
           this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
           this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
           this.history = [];
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.history.length < 2) return;
        
        ctx.beginPath();
        // Create gradient for the trail (fading out)
        const grad = ctx.createLinearGradient(
          this.history[0].x, this.history[0].y, 
          this.x, this.y
        );
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, this.color);
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.lineCap = 'round';
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
          ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Draw bright head of the pulse
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffffff';
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const pulses = Array.from({ length: 45 }, () => new Pulse());
    let time = 0;

    const render = () => {
      time += 0.01;
      
      // Clear with deep tech background
      ctx.fillStyle = '#050810';
      ctx.fillRect(0, 0, width, height);

      // Draw Math Coordinate Grid
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      
      for (let x = 0; x < width + gridSize; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height + gridSize; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw Grid Intersections (Math/Data Nodes)
      for (let x = 0; x < width + gridSize; x += gridSize) {
        for (let y = 0; y < height + gridSize; y += gridSize) {
          // Create a wave of glowing nodes across the grid
          const wave = Math.sin(x * 0.005 - time * 2) * Math.cos(y * 0.005 + time);
          
          if (wave > 0.8) {
             const intensity = (wave - 0.8) * 5; // 0 to 1
             ctx.fillStyle = `rgba(0, 229, 255, ${intensity * 0.8})`;
             ctx.shadowBlur = 10;
             ctx.shadowColor = '#00e5ff';
             ctx.beginPath();
             ctx.arc(x, y, 2 + intensity * 2, 0, Math.PI * 2);
             ctx.fill();
             ctx.shadowBlur = 0;
          } else {
             ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
             ctx.fillRect(x - 1, y - 1, 2, 2); // Tiny standard node
          }
        }
      }

      // Update and Draw Data Pulses
      pulses.forEach(p => {
        p.update();
        p.draw(ctx);
      });

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
      {/* Subtle ambient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#00e5ff]/5 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#a855f7]/5 blur-[120px] rounded-full mix-blend-screen" />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 w-full h-full opacity-70 dark:opacity-100"
      />
    </div>
  );
};

export default MeshGraphBackground;

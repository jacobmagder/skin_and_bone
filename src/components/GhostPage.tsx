import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

interface GhostPageProps {
  onBack: () => void;
}

export default function GhostPage({ onBack }: GhostPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w: number, h: number;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    // Create particles for curling plumes
    const particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    const particleCount = 150;
    
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0,
          vy: 0
        });
      }
    };

    const draw = () => {
      // fade with slight opacity to trail
      ctx.fillStyle = 'rgba(7, 7, 10, 0.1)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';

      particles.forEach(p => {
        // Simple sin/cos noise for organic motion
        const angle = Math.sin(p.y * 0.005) + Math.cos(p.x * 0.005);
        p.vx = angle * 0.6;
        p.vy = -1;
        p.x += p.vx;
        p.y += p.vy;

        // wrap around bottom
        if (p.y < 0) p.y = h;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        // draw each plume particle as a soft circle
        ctx.beginPath();
        const radius = 10 + Math.random() * 20;
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    initParticles();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      fontFamily: "'Cinzel', serif",
      backgroundColor: '#07070A',
      color: '#E0E0E0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <style>{`
        .ghost-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          display: block;
        }
        
        .ghost-overlay {
          position: relative;
          z-index: 1;
          max-width: 700px;
          padding: 40px;
          background: rgba(7, 7, 10, 0.7);
          border-radius: 6px;
          text-align: center;
          box-shadow: 0 0 20px rgba(255,255,255,0.4);
        }
        
        .ghost-overlay h1 {
          margin: 0;
          font-size: 3rem;
          color: #FFFFFF;
          text-shadow: 0 0 12px rgba(255,255,255,0.8);
        }
        
        .ghost-overlay .subtitle {
          font-size: 1.3rem;
          font-style: italic;
          margin: 0.5em 0 1.5em;
          color: #CCCCCC;
          text-shadow: 0 0 4px rgba(255,255,255,0.6);
        }
        
        .ghost-overlay p {
          margin: 0 0 1em;
          line-height: 1.6;
          text-shadow: 0 0 2px rgba(0,0,0,0.3);
          text-align: left;
        }
        
        .ghost-overlay .quote {
          margin-top: 1em;
          font-style: italic;
          color: #FFFFFF;
          position: relative;
          padding-left: 1em;
          text-align: center;
        }
        
        .ghost-overlay .quote::before {
          content: "❝";
          position: absolute;
          left: 0;
          font-size: 2em;
          color: rgba(255,255,255,0.6);
          top: -0.2em;
          text-shadow: 0 0 4px rgba(255,255,255,0.6);
        }
        
        .ghost-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.5em;
          color: #BBBBBB;
          text-decoration: none;
          transition: color 0.3s;
          text-shadow: 0 0 2px rgba(0,0,0,0.3);
          cursor: pointer;
        }
        
        .ghost-back-btn:hover { 
          color: #FFFFFF; 
        }
      `}</style>

      <canvas ref={canvasRef} className="ghost-canvas"></canvas>
      <div className="ghost-overlay">
        <h1>Ghost</h1>
        <div className="subtitle">the kind of silence that watches you sleep</div>
        
        <p>I have become the ghost in my own home.<br />
        A hollow shell that walks these floors<br />
        and answers to my name.<br />
        The footsteps in the hall are mine<br />
        but they sound like a memory<br />
        I can no longer escape.</p>
        
        <p>The worst kind of haunting<br />
        is the one you do to yourself<br />
        when you leave the door to the past ajar.</p>
        
        <p>You are never alone<br />
        when you are living with the specter<br />
        of who you used to be.</p>
        
        <div className="quote">You're not alone. You're just with something you can't name.</div>
        
        <span className="ghost-back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Skin & Bone
        </span>
      </div>
    </div>
  );
}
import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

interface DreadPageProps {
  onBack: () => void;
}

export default function DreadPage({ onBack }: DreadPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const glitchFrame = () => {
      ctx.fillStyle = 'rgba(10,10,10,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < canvas.height / 20; i++) {
        const y = Math.random() * canvas.height;
        const h = 1 + Math.random() * 2;
        ctx.fillStyle = 'rgba(232,76,61,' + (0.2 + Math.random() * 0.2) + ')';
        ctx.fillRect(0, y, canvas.width, h);
      }

      if (Math.random() < 0.02) {
        ctx.fillStyle = 'rgba(232,76,61,0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      requestAnimationFrame(glitchFrame);
    };

    window.addEventListener('resize', resize);
    resize();
    glitchFrame();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      fontFamily: "'Crimson Text', serif",
      backgroundColor: '#0a0a0a',
      color: '#e6e6e6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        .dread-container {
          max-width: 700px;
          padding: 40px;
          background: #1e1e1e;
          box-shadow: 0 0 40px rgba(255, 0, 0, 0.7);
          border-radius: 6px;
          position: relative;
          z-index: 1;
          border: 1px solid rgba(255, 0, 0, 0.3);
        }

        .dread-h1 {
          font-size: 3rem;
          text-align: center;
          color: #e84c3d;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.9);
          margin-bottom: 0.3em;
        }

        .dread-subtitle {
          font-size: 1.5rem;
          font-style: italic;
          text-align: center;
          margin-bottom: 2rem;
          color: #bfbfbf;
        }

        .dread-p {
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 1.2em;
          text-align: left;
        }

        .dread-quote {
          margin-top: 2rem;
          font-size: 1.4rem;
          text-align: center;
          font-style: italic;
          color: #ff6b6b;
          position: relative;
          padding-left: 35px;
        }

        .dread-quote::before {
          content: "❝";
          position: absolute;
          left: 0;
          top: -10px;
          font-size: 3rem;
          opacity: 0.6;
        }

        .dread-footer {
          text-align: center;
          margin-top: 40px;
        }

        .dread-back-btn {
          color: #aaa;
          text-decoration: none;
          transition: color 0.3s;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dread-back-btn:hover {
          color: #e84c3d;
        }

        .dread-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
      `}</style>

      <canvas ref={canvasRef} className="dread-canvas"></canvas>

      <div className="dread-container">
        <h1 className="dread-h1">Dread</h1>
        <div className="dread-subtitle">like sitting too long in the dark</div>

        <p className="dread-p">Dread is not the moment the blow lands.<br />
        It is the hours before<br />
        when the house begins to breathe in rhythms<br />
        that are not its own.<br />
        The floorboards creak a language of goodbye<br />
        and the silence has a weight in your chest.</p>
        
        <p className="dread-p">It is not the fear of what will happen<br />
        but the chilling certainty that it already has.<br />
        That you are simply a memory<br />
        in a story that is already over.</p>
        
        <p className="dread-p">You are simply living in the echo<br />
        the cold room you walk into<br />
        after the warmth is gone.</p>
        
        <div className="dread-quote">"Dread isn't fear. It's knowing something already happened. You just haven't felt it yet."</div>

        <div className="dread-footer">
          <span className="dread-back-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            Back to Skin & Bone
          </span>
        </div>
      </div>
    </div>
  );
}
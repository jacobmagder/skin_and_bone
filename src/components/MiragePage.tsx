import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

interface MiragePageProps {
  onBack: () => void;
}

export default function MiragePage({ onBack }: MiragePageProps) {
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const turb = turbRef.current;
    if (!turb) return;

    let freq = 0.005;
    let delta = 0.0002;
    let effectOn = true;

    // Toggle effect every 6 seconds
    const toggleInterval = setInterval(() => { 
      effectOn = !effectOn; 
    }, 6000);

    const animateFilter = () => {
      if (effectOn) {
        freq += delta;
        if (freq > 0.015 || freq < 0.005) delta = -delta;
        turb.setAttribute('baseFrequency', `${freq} ${freq * 1.5}`);
      } else {
        turb.setAttribute('baseFrequency', '0 0');
      }
      requestAnimationFrame(animateFilter);
    };

    animateFilter();

    return () => {
      clearInterval(toggleInterval);
    };
  }, []);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      background: 'linear-gradient(120deg, #2a2a2e, #121214)',
      color: '#e0e0e0',
      fontFamily: "'Cinzel', serif",
      overflow: 'hidden',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <style>{`
        .mirage-container {
          position: relative;
          max-width: 800px;
          padding: 50px;
          background: rgba(18,18,20,0.7);
          border-radius: 8px;
          filter: url(#mirageFilter);
          box-shadow: 0 0 30px rgba(0,0,0,0.8);
          text-align: center;
        }

        .mirage-h1 {
          font-size: 3.5rem;
          margin: 0 0 0.5em;
          color: #ffd27f;
          text-shadow: 0 0 8px rgba(255,210,127,0.8);
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { text-shadow: 0 0 8px rgba(255,210,127,0.8); }
          to   { text-shadow: 0 0 20px rgba(255,210,127,1); }
        }

        .mirage-subtitle {
          font-size: 1.5rem;
          font-style: italic;
          margin-bottom: 1.5em;
          color: #c0b080;
          text-transform: uppercase;
        }

        .mirage-p {
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 1.2em;
          text-align: left;
        }

        .mirage-quote {
          margin-top: 2em;
          font-size: 1.3rem;
          font-style: italic;
          color: #ffe8b0;
          position: relative;
          padding-left: 1.2em;
        }

        .mirage-quote::before {
          content: '"';
          position: absolute;
          left: 0;
          top: -0.2em;
          font-size: 2em;
          color: rgba(255,232,176,0.8);
        }

        .mirage-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2em;
          color: #c0b080;
          text-decoration: none;
          border-bottom: 1px solid #c0b080;
          transition: color 0.3s, border-bottom-color 0.3s;
          cursor: pointer;
        }

        .mirage-back-btn:hover {
          color: #ffd27f;
          border-bottom-color: #ffd27f;
        }
      `}</style>

      <svg width="0" height="0">
        <filter id="mirageFilter">
          <feTurbulence 
            ref={turbRef}
            type="fractalNoise" 
            baseFrequency="0 0" 
            numOctaves="2" 
            seed="5" 
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            scale="10" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>

      <div className="mirage-container">
        <h1 className="mirage-h1">Mirage</h1>
        <div className="mirage-subtitle">memory dressed as truth</div>
        
        <p className="mirage-p">Is it my desire painting you into the world<br />
        or is your memory a mirage that breathes?<br />
        I see you in the steam that ghosts a windowpane<br />
        in the heat rising from the barren street.</p>
        
        <p className="mirage-p">A cruel oasis for a soul with a blistering thirst.<br />
        Each time I reach for you<br />
        the image shimmers and dissolves<br />
        leaving only the ache.</p>
        
        <div className="mirage-quote">A mirage is crueler than absence.<br />
        It is the ghost of a promise<br />
        that haunts the edges of what is real.</div>
        
        <span className="mirage-back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Skin & Bone
        </span>
      </div>
    </div>
  );
}
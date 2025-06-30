import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

interface HoneyPageProps {
  onBack: () => void;
}

export default function HoneyPage({ onBack }: HoneyPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const honeyEl = containerRef.current;
    if (!honeyEl) return;

    const textIds = ['title','subtitle','p1','p2','p3','quote','backLink'];

    // Wrap each character
    textIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = Array.from(el.textContent || '').map(c => 
          c === ' ' ? ' ' : `<span class="char">${c}</span>`
        ).join('');
      }
    });

    const chars = Array.from(honeyEl.querySelectorAll('.char'));
    const effectDuration = 2000; // 2s effect
    const staticDuration = 6000; // 6s static
    const dripInterval = 500; // cadence during effect

    const spawnDrip = (el: Element) => {
      const rect = el.getBoundingClientRect();
      const contRect = honeyEl.getBoundingClientRect();
      const drip = document.createElement('div');
      const size = 4 + Math.random() * 6;
      drip.className = 'drip';
      drip.style.width = `${size}px`;
      drip.style.height = `${size * 1.5}px`;
      drip.style.background = window.getComputedStyle(el).color;
      drip.style.left = `${rect.left - contRect.left + rect.width/2 - size/2}px`;
      drip.style.top = `${rect.bottom - contRect.top}px`;
      honeyEl.appendChild(drip);
      drip.addEventListener('animationend', () => {
        if (honeyEl.contains(drip)) {
          honeyEl.removeChild(drip);
        }
      });
    };

    const meltLettersOnce = () => {
      const count = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const el = chars[Math.floor(Math.random() * chars.length)] as HTMLElement;
        if (el) {
          el.style.transform = `translateY(${20 + Math.random()*10}px) rotate(${(Math.random()-0.5)*10}deg)`;
          spawnDrip(el);
          setTimeout(() => { 
            el.style.transform = ''; 
          }, effectDuration);
        }
      }
    };

    const startEffect = () => {
      const intervalId = setInterval(meltLettersOnce, dripInterval);
      setTimeout(() => clearInterval(intervalId), effectDuration);
    };

    // Initial trigger and cycle
    startEffect();
    const cycleInterval = setInterval(startEffect, effectDuration + staticDuration);

    return () => {
      clearInterval(cycleInterval);
    };
  }, []);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      background: 'linear-gradient(135deg, #fff8f0 0%, #ffe7d1 100%)',
      fontFamily: "'Libre Baskerville', serif",
      color: '#4a3728',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cardo:ital@0;1&family=Libre+Baskerville:wght@400;700&display=swap');

        .honey-container {
          position: relative;
          width: 85%;
          max-width: 800px;
          padding: 40px 30px;
          background: #fff3e3;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .honey-container h1, 
        .honey-container .subtitle, 
        .honey-container p, 
        .honey-container .quote, 
        .honey-container .back {
          position: relative;
          z-index: 2;
          display: inline-block;
          white-space: pre-wrap;
        }

        .honey-h1 {
          font-family: 'Cardo', serif;
          font-size: 3rem;
          color: #b8753e;
          text-align: center;
          margin: 0 0 0.5em;
          width: 100%;
        }

        .honey-subtitle {
          font-family: 'Cardo', serif;
          font-style: italic;
          color: #a15d32;
          text-align: center;
          margin-bottom: 2em;
          font-size: 1.3rem;
          width: 100%;
        }

        .honey-p {
          font-size: 1.15rem;
          line-height: 1.8;
          margin-bottom: 1.6em;
          width: 100%;
          text-align: left;
        }

        .honey-quote {
          font-style: italic;
          color: #9a6431;
          text-align: center;
          margin-top: 2em;
          font-size: 1.2rem;
          padding-left: 1em;
          width: 100%;
        }

        .honey-quote::before {
          content: "❝";
          margin-right: 0.5em;
        }

        .honey-back {
          display: block;
          margin: 3em auto 0;
          text-decoration: none;
          color: #b77c3b;
          font-size: 0.9rem;
          width: max-content;
          cursor: pointer;
        }

        .honey-back:hover {
          text-decoration: underline;
        }

        .char {
          display: inline-block;
          transition: transform 2s ease;
        }

        .drip {
          position: absolute;
          border-radius: 50% 50% 60% 60%;
          opacity: 0.9;
          animation: drip 2s linear forwards;
          z-index: 1;
        }

        @keyframes drip {
          to {
            transform: translateY(150px) scaleY(2);
            opacity: 0;
          }
        }
      `}</style>

      <div ref={containerRef} className="honey-container">
        <h1 id="title" className="honey-h1">Honey</h1>
        <div id="subtitle" className="honey-subtitle">soft things don't last, but they leave a mark</div>
        
        <p id="p1" className="honey-p">Our love was not a storm.<br />
        It was honey on toast.<br />
        Slow simple and gold.<br />
        The quiet way you made tea<br />
        a small detail that said you remembered everything.</p>
        
        <p id="p2" className="honey-p">You did not shatter me like glass.<br />
        You softened me into ruin.<br />
        You taught my heart a sweetness<br />
        it was not built to survive without.</p>
        
        <p id="p3" className="honey-p">And now the memory of that honey<br />
        is the most bitter thing I taste.</p>
        
        <div id="quote" className="honey-quote">You didn't shatter me. You softened me. That might be harder.</div>
        
        <span id="backLink" className="honey-back" onClick={onBack}>
          <ArrowLeft size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Back to Skin & Bone
        </span>
      </div>
    </div>
  );
}
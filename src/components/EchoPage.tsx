import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

interface EchoPageProps {
  onBack: () => void;
}

export default function EchoPage({ onBack }: EchoPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ids = ['title','subtitle','p1','p2','p3','quote','backLink'];
    
    // Wrap each character in spans
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = el.textContent?.split('').map(c => 
          c === ' ' ? ' ' : `<span class="char">${c}</span>`
        ).join('') || '';
      }
    });

    const chars = Array.from(container.querySelectorAll('.char'));
    
    const spawnEcho = () => {
      const el = chars[Math.floor(Math.random() * chars.length)] as HTMLElement;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();
      const clone = el.cloneNode(true) as HTMLElement;
      
      clone.className = 'echo';
      clone.style.position = 'absolute';
      clone.style.left = `${rect.left - contRect.left}px`;
      clone.style.top = `${rect.top - contRect.top}px`;
      clone.style.pointerEvents = 'none';
      clone.style.opacity = '1';
      
      container.appendChild(clone);
      
      // Random direction
      const dx = (Math.random() - 0.5) * 100;
      const dy = (Math.random() - 0.5) * 100;
      
      requestAnimationFrame(() => {
        clone.style.transform = `translate(${dx}px, ${dy}px)`;
        clone.style.opacity = '0';
        clone.style.transition = 'transform 1s ease, opacity 1s ease';
      });
      
      const cleanup = () => {
        if (container.contains(clone)) {
          container.removeChild(clone);
        }
      };
      
      clone.addEventListener('transitionend', cleanup);
      setTimeout(cleanup, 1100); // Backup cleanup
    };

    // Static for 6s, then echoes for 2s
    const cycle = () => {
      const interval = setInterval(spawnEcho, 200);
      setTimeout(() => { clearInterval(interval); }, 2000);
    };

    cycle();
    const cycleInterval = setInterval(cycle, 8000);

    return () => {
      clearInterval(cycleInterval);
    };
  }, []);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      background: 'linear-gradient(135deg, #222, #111)',
      color: '#ddd',
      fontFamily: "'Cormorant Infant', serif",
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        
        .echo-container {
          position: relative;
          padding: 40px;
          max-width: 700px;
          background: rgba(20,20,20,0.8);
          border-radius: 6px;
          box-shadow: 0 0 20px rgba(0,0,0,0.7);
          text-align: center;
        }
        
        .echo-h1 { 
          font-size: 3rem; 
          margin: 0 0 0.5em; 
        }
        
        .echo-subtitle { 
          font-style: italic; 
          color: #bbb; 
          margin-bottom: 1.5em; 
        }
        
        .echo-p { 
          margin-bottom: 1em; 
          line-height: 1.6; 
          text-align: left;
        }
        
        .echo-quote { 
          font-style: italic; 
          color: #ccc; 
          margin-top: 2em; 
          position: relative; 
          text-align: center;
        }
        
        .echo-quote::before { 
          content: '"'; 
          position: absolute; 
          left: -0.5em; 
          font-size: 2em; 
          color: #888; 
          top: -0.2em; 
        }
        
        .echo-back-btn { 
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2em; 
          color: #ddd; 
          text-decoration: none;
          cursor: pointer;
        }
        
        .echo-back-btn:hover { 
          text-decoration: underline; 
        }
        
        .char { 
          display: inline-block; 
          position: relative; 
        }
        
        .echo { 
          position: absolute; 
          pointer-events: none; 
          opacity: 1; 
        }
      `}</style>

      <div ref={containerRef} className="echo-container">
        <h1 id="title" className="echo-h1">Echo</h1>
        <div id="subtitle" className="echo-subtitle">voices you can't forget</div>
        
        <p id="p1" className="echo-p">Your voice is a room I still live in.<br />
        Its walls reverberate<br />
        with the hollow sound of a broken oath.<br />
        I hear your laughter in the silence between heartbeats<br />
        a phantom limb of a conversation.</p>
        
        <p id="p2" className="echo-p">Each syllable is a haunting<br />
        a beautiful specter of what was.<br />
        True silence does not exist for me.</p>
        
        <p id="p3" className="echo-p">There is only the echo of your name<br />
        and the hollow space where you used to be.</p>
        
        <div id="quote" className="echo-quote">An echo of what once was, a ghost of what remains.</div>
        
        <span id="backLink" className="echo-back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Skin & Bone
        </span>
      </div>
    </div>
  );
}
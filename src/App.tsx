import React, { useState, useEffect, useRef } from 'react';
import { PenTool } from 'lucide-react';
import VelvetPage from './components/VelvetPage';
import DreadPage from './components/DreadPage';
import GhostPage from './components/GhostPage';
import MiragePage from './components/MiragePage';
import HoneyPage from './components/HoneyPage';
import EchoPage from './components/EchoPage';

function App() {
  const [currentView, setCurrentView] = useState<'home' | string>('home');
  const [showTiles, setShowTiles] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [smokeDirection, setSmokeDirection] = useState<'left-to-right' | 'right-to-left'>('left-to-right');
  const [smokeProgress, setSmokeProgress] = useState(0);
  const [weatherActive, setWeatherActive] = useState(false);
  const [rainActive, setRainActive] = useState(false);
  const [writingText, setWritingText] = useState('');
  const [isWriting, setIsWriting] = useState(true);
  const weatherLayerRef = useRef<HTMLDivElement>(null);
  const homePageRef = useRef<HTMLDivElement>(null);
  const writingIndexRef = useRef(0);

  const fullPoem = `I waited through the spring with barely a soul, just skin and bones and a broken heart; a heart weathered by the seasons. I waited for you in the heat, You never came. I saw you in the summer with my own soul scorched and asked if you still loved me.

Three times you swore you no longer loved me. You treated my heart like a sickness, recoiling in disgust as if you had forgotten you were the one who gave me the wound. You were content to watch me decay from the inside out, my soul withered in that moment.

You let me praise you, watched me bleed from your cuts and did not call for help. I cried every day, rotted in the merciless rain. It was autumn again, and the world grew cold. I was left to wonder if my warmth was not enough.

Did another's frostbite on your skin make you feel more alive than my warmth?

I am sending you the last of me now. These poems, what's left of this soul. My wounds are reinfected. The scabs are gone. I am still bleeding for you.

When you read this, know I might be gone. If you love me, you will find what remains. If you do not, then I will wait for you in the elements as I have been, dead or alive. My heart will not stop, not for you. It will just burn and part into oblivion, turning from ash to smoke.`;

  // Typewriter effect
  useEffect(() => {
    if (!isWriting) return;

    const writeNextChar = () => {
      if (writingIndexRef.current >= fullPoem.length) {
        setIsWriting(false);
        // Start smoke effect after writing is complete
        setTimeout(() => {
          setShowSmoke(true);
          setSmokeDirection('left-to-right');
          
          // After smoke clears, show tiles
          setTimeout(() => {
            setShowSmoke(false);
            setShowTiles(true);
            setSmokeProgress(0);
          }, 15000);
        }, 2000);
        return;
      }

      const currentChar = fullPoem[writingIndexRef.current];
      setWritingText(fullPoem.slice(0, writingIndexRef.current + 1));
      
      // Check for trigger words
      const currentText = fullPoem.slice(0, writingIndexRef.current + 1);
      
      // Start rain when "rain" appears
      if (currentText.includes('rain') && !rainActive) {
        setRainActive(true);
        setWeatherActive(true);
      }

      writingIndexRef.current++;
      
      // Variable speed for more natural feel - faster than before
      const baseSpeed = 30; // Reduced from 50
      const randomDelay = Math.random() * 30; // Reduced from 50
      const punctuationDelay = ['.', '!', '?', ','].includes(currentChar) ? 200 : 0; // Reduced from 300
      
      setTimeout(writeNextChar, baseSpeed + randomDelay + punctuationDelay);
    };

    const timer = setTimeout(writeNextChar, 1000); // Initial delay
    return () => clearTimeout(timer);
  }, [isWriting, rainActive]);

  // Track smoke progress
  useEffect(() => {
    if (showSmoke) {
      const duration = 15000; // Back to 15 seconds for full coverage
      const startTime = Date.now();
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setSmokeProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(updateProgress);
        }
      };
      
      updateProgress();
    }
  }, [showSmoke]);

  // Weather effects - constrained to writing area only
  useEffect(() => {
    if (!weatherActive || !rainActive) return;

    const createRainDrop = () => {
      const layer = weatherLayerRef.current;
      if (!layer) return;

      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.textContent = ['•', '┇', '⋮', '⁝', '|'][Math.floor(Math.random() * 5)];
      // Constrain rain to writing area (excluding header)
      drop.style.left = Math.random() * 100 + '%';
      drop.style.top = '180px'; // Start below header
      drop.style.animationDuration = (1.5 + Math.random() * 1) + 's';
      
      layer.appendChild(drop);
      
      setTimeout(() => {
        if (layer.contains(drop)) {
          layer.removeChild(drop);
        }
      }, 3000);
    };

    const rainInterval = setInterval(createRainDrop, 300);
    return () => clearInterval(rainInterval);
  }, [weatherActive, rainActive]);

  const poemEntries = [
    { 
      title: 'Velvet', 
      key: 'velvet',
      preview: 'You wore your silence like it was perfume / a scent that stained my soul / and lingered in the air for years...',
      colors: 'from-red-950 to-red-900 border-red-800'
    },
    { 
      title: 'Honey', 
      key: 'honey',
      preview: 'Our love was not a storm. / It was honey on toast. / Slow simple and gold...',
      colors: 'from-amber-50 to-orange-100 border-amber-600'
    },
    { 
      title: 'Mirage', 
      key: 'mirage',
      preview: 'Is it my desire painting you into the world / or is your memory a mirage that breathes?',
      colors: 'from-gray-800 to-gray-900 border-yellow-500'
    },
    { 
      title: 'Ghost', 
      key: 'ghost',
      preview: 'I have become the ghost in my own home. / A hollow shell that walks these floors...',
      colors: 'from-gray-900 to-black border-white'
    },
    { 
      title: 'Dread', 
      key: 'dread',
      preview: 'Dread is not the moment the blow lands. / It is the hours before when the house begins to breathe...',
      colors: 'from-black to-gray-900 border-red-600'
    },
    { 
      title: 'Echo', 
      key: 'echo',
      preview: 'Your voice is a room I still live in. / Its walls reverberate with the hollow sound of a broken oath...',
      colors: 'from-gray-700 to-gray-800 border-gray-400'
    }
  ];

  // Calculate tile visibility based on smoke progress
  const getTileOpacity = (index: number) => {
    if (!showSmoke || !showTiles) return 1;
    
    const gridCols = 3;
    const col = index % gridCols;
    const row = Math.floor(index / gridCols);
    
    let progressPoint;
    if (smokeDirection === 'left-to-right') {
      progressPoint = (col * 0.25) + (row * 0.15);
    } else {
      progressPoint = ((gridCols - 1 - col) * 0.25) + (row * 0.15);
    }
    
    const fadeRange = 0.3;
    const fadeStart = Math.max(0, progressPoint - fadeRange);
    const fadeEnd = progressPoint + fadeRange;
    
    if (smokeProgress < fadeStart) return 1;
    if (smokeProgress > fadeEnd) return 0;
    
    return 1 - ((smokeProgress - fadeStart) / (fadeEnd - fadeStart));
  };

  // Render specific poem pages
  if (currentView === 'velvet') {
    return <VelvetPage onBack={() => setCurrentView('home')} />;
  }
  if (currentView === 'dread') {
    return <DreadPage onBack={() => setCurrentView('home')} />;
  }
  if (currentView === 'ghost') {
    return <GhostPage onBack={() => setCurrentView('home')} />;
  }
  if (currentView === 'mirage') {
    return <MiragePage onBack={() => setCurrentView('home')} />;
  }
  if (currentView === 'honey') {
    return <HoneyPage onBack={() => setCurrentView('home')} />;
  }
  if (currentView === 'echo') {
    return <EchoPage onBack={() => setCurrentView('home')} />;
  }

  return (
    <div 
      ref={homePageRef}
      className="h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 relative overflow-hidden"
    >
      {/* Weather Effects Layer - Constrained to writing area */}
      <div 
        ref={weatherLayerRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ top: '180px' }} // Start below header
      />

      {/* Header */}
      <header className="text-center py-8 flex-shrink-0 relative z-50">
        <h1 className="bone-text text-4xl md:text-5xl font-serif mb-3 tracking-wide font-light">
          Skin & Bone
        </h1>
        <div className="flex items-center justify-center gap-2">
          <PenTool size={20} className="text-amber-700" />
          <p className="bone-text-small text-lg font-light">Poetry in Motion</p>
        </div>
      </header>

      {/* Writing Text - Clipped to avoid header overlap */}
      {(isWriting || !showTiles) && (
        <div 
          className={`absolute z-20 transition-all duration-1000 writing-container ${
            showSmoke ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
          }`}
          style={{
            top: '180px',
            left: '0',
            right: '0',
            bottom: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="text-center px-8 max-w-4xl transform transition-all duration-1000">
            <div className="handwriting-text text-lg md:text-xl text-amber-800 font-light leading-relaxed whitespace-pre-line text-left">
              {writingText}
              {isWriting && <span className="animate-pulse">|</span>}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Smoke Effect */}
      {showSmoke && (
        <div className="absolute inset-0 z-30 overflow-hidden">
          <div 
            className={`smoke-container ${smokeDirection}`}
          >
            {/* Ultra-dense main coverage layer */}
            {[...Array(120)].map((_, i) => (
              <div
                key={i}
                className="smoke-particle main-coverage"
                style={{
                  '--delay': `${i * 0.05}s`,
                  '--x': `${(i % 20) * 8}%`,
                  '--y': `${Math.floor(i / 20) * 16}%`,
                  '--size': `${120 + Math.random() * 180}px`,
                  '--drift-x': `${-30 + Math.random() * 60}px`,
                  '--drift-y': `${-40 + Math.random() * 80}px`,
                  '--rotation': `${Math.random() * 360}deg`,
                  '--scale': `${1.2 + Math.random() * 0.8}`
                }}
              />
            ))}
            
            {/* Overlapping dense coverage */}
            {[...Array(80)].map((_, i) => (
              <div
                key={`dense-${i}`}
                className="smoke-particle dense-coverage"
                style={{
                  '--delay': `${i * 0.08}s`,
                  '--x': `${Math.random() * 200}%`,
                  '--y': `${Math.random() * 200}%`,
                  '--size': `${200 + Math.random() * 250}px`,
                  '--drift-x': `${-80 + Math.random() * 160}px`,
                  '--drift-y': `${-100 + Math.random() * 200}px`,
                  '--rotation': `${Math.random() * 360}deg`,
                  '--scale': `${1.5 + Math.random() * 1.0}`
                }}
              />
            ))}

            {/* Massive wispy blanket coverage */}
            {[...Array(50)].map((_, i) => (
              <div
                key={`wisp-${i}`}
                className="smoke-particle wispy-coverage"
                style={{
                  '--delay': `${i * 0.1}s`,
                  '--x': `${Math.random() * 250}%`,
                  '--y': `${Math.random() * 250}%`,
                  '--size': `${350 + Math.random() * 300}px`,
                  '--drift-x': `${-150 + Math.random() * 300}px`,
                  '--drift-y': `${-200 + Math.random() * 400}px`,
                  '--rotation': `${Math.random() * 360}deg`,
                  '--scale': `${2.0 + Math.random() * 1.5}`
                }}
              />
            ))}

            {/* Extra thick blanket particles */}
            {[...Array(40)].map((_, i) => (
              <div
                key={`blanket-${i}`}
                className="smoke-particle blanket-coverage"
                style={{
                  '--delay': `${i * 0.06}s`,
                  '--x': `${Math.random() * 300}%`,
                  '--y': `${Math.random() * 300}%`,
                  '--size': `${500 + Math.random() * 400}px`,
                  '--drift-x': `${-200 + Math.random() * 400}px`,
                  '--drift-y': `${-250 + Math.random() * 500}px`,
                  '--rotation': `${Math.random() * 360}deg`,
                  '--scale': `${2.5 + Math.random() * 2.0}`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="h-full flex flex-col relative z-0">
        {/* Poem Tiles Grid */}
        <main 
          className={`flex-1 flex items-center justify-center px-6 transition-all duration-3000 transform ${
            showTiles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-3 grid-rows-2 gap-6 w-full max-w-5xl h-auto">
            {poemEntries.map((poem, index) => (
              <div
                key={poem.key}
                className="poem-tile group cursor-pointer transition-all duration-1000"
                style={{ 
                  animationDelay: `${index * 0.3}s`,
                  opacity: getTileOpacity(index),
                  transform: `translateY(${(1 - getTileOpacity(index)) * 40}px) scale(${0.85 + (getTileOpacity(index) * 0.15)})`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentView(poem.key);
                }}
              >
                <div className={`poem-tile-card bg-gradient-to-br ${poem.colors} border-2 rounded-xl p-4 h-48 flex flex-col justify-between relative overflow-hidden transition-all duration-500 group-hover:scale-105`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-current opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-current opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                  
                  {/* Title */}
                  <div className="text-center">
                    <h2 className={`text-2xl md:text-3xl font-serif mb-2 group-hover:opacity-80 transition-colors duration-300 ${
                      poem.key === 'honey' ? 'text-amber-900' : 
                      poem.key === 'mirage' ? 'text-yellow-400' :
                      poem.key === 'ghost' ? 'text-white' :
                      'text-white'
                    }`}>
                      {poem.title}
                    </h2>
                    
                    {/* Decorative Line */}
                    <div className={`w-8 h-0.5 rounded-full mx-auto group-hover:w-12 transition-all duration-300 ${
                      poem.key === 'honey' ? 'bg-amber-900' : 
                      poem.key === 'mirage' ? 'bg-yellow-400' :
                      poem.key === 'ghost' ? 'bg-white' :
                      'bg-white'
                    }`}></div>
                  </div>
                  
                  {/* Preview Text */}
                  <div className="flex-1 flex items-center justify-center px-2">
                    <p className={`text-xs text-center font-light italic leading-relaxed line-clamp-4 group-hover:opacity-80 transition-colors duration-300 ${
                      poem.key === 'honey' ? 'text-amber-700' : 
                      poem.key === 'mirage' ? 'text-yellow-200' :
                      poem.key === 'ghost' ? 'text-gray-200' :
                      'text-gray-200'
                    }`}>
                      {poem.preview}
                    </p>
                  </div>
                  
                  {/* Read prompt */}
                  <div className="text-center">
                    <p className={`text-center font-light text-xs group-hover:opacity-80 transition-colors duration-300 ${
                      poem.key === 'honey' ? 'text-amber-800' : 
                      poem.key === 'mirage' ? 'text-yellow-300' :
                      poem.key === 'ghost' ? 'text-gray-300' :
                      'text-gray-300'
                    }`}>
                      Click to read
                    </p>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  {/* Ink Splash Effect */}
                  <div className={`absolute top-4 left-4 w-2 h-2 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${
                    poem.key === 'honey' ? 'bg-amber-900' : 
                    poem.key === 'mirage' ? 'bg-yellow-400' :
                    poem.key === 'ghost' ? 'bg-white' :
                    'bg-white'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <style jsx>{`
        /* Import handwriting fonts */
        @import url('https://fonts.googleapis.com/css2?family=Sacramento&family=Dancing+Script:wght@400;500;600&family=Great+Vibes&family=Alex+Brush&display=swap');

        /* Handwriting font for the poem text */
        .handwriting-text {
          font-family: 'Dancing Script', 'Sacramento', cursive;
          font-weight: 500;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
          letter-spacing: 0.5px;
        }

        /* Bone white text with black glow only */
        .bone-text {
          color: #f5f3f0;
          text-shadow: 
            0 0 10px rgba(0, 0, 0, 0.8),
            0 0 20px rgba(0, 0, 0, 0.6),
            0 0 30px rgba(0, 0, 0, 0.4);
        }

        .bone-text-small {
          color: #f5f3f0;
          text-shadow: 
            0 0 5px rgba(0, 0, 0, 0.8),
            0 0 10px rgba(0, 0, 0, 0.6);
        }

        /* Text clamping for preview */
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Rain Effects - constrained positioning */
        .rain-drop {
          position: absolute;
          color: #4a90e2;
          font-weight: bold;
          animation: rain-fall-constrained 2s linear infinite;
          text-shadow: 0 0 5px rgba(74, 144, 226, 0.8);
          pointer-events: none;
        }

        @keyframes rain-fall-constrained {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh - 180px));
            opacity: 0;
          }
        }

        .smoke-container {
          position: absolute;
          top: -50%;
          width: 400%;
          height: 200%;
          pointer-events: none;
        }

        .smoke-container.left-to-right {
          left: -200%;
          animation: sweepRightUltraSlow 15s ease-in-out forwards;
        }

        .smoke-container.right-to-left {
          right: -200%;
          animation: sweepLeftUltraSlow 15s ease-in-out forwards;
        }

        .smoke-particle {
          position: absolute;
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          animation: floatUltraSlow 15s ease-in-out infinite;
          animation-delay: var(--delay);
          left: var(--x);
          top: var(--y);
          opacity: 0;
          transform-origin: center;
        }

        .smoke-particle.main-coverage {
          background: radial-gradient(
            ellipse at 30% 20%, 
            rgba(255,255,255,1) 0%, 
            rgba(252,252,252,0.98) 15%, 
            rgba(248,248,248,0.95) 30%, 
            rgba(242,242,242,0.9) 45%, 
            rgba(235,235,235,0.8) 60%, 
            rgba(225,225,225,0.6) 75%, 
            rgba(210,210,210,0.4) 85%, 
            transparent 100%
          );
          filter: blur(2px);
        }

        .smoke-particle.dense-coverage {
          background: radial-gradient(
            ellipse at 40% 30%, 
            rgba(255,255,255,0.98) 0%, 
            rgba(250,250,250,0.95) 20%, 
            rgba(245,245,245,0.9) 35%, 
            rgba(238,238,238,0.85) 50%, 
            rgba(230,230,230,0.75) 65%, 
            rgba(220,220,220,0.6) 80%, 
            transparent 100%
          );
          filter: blur(3.5px);
        }

        .smoke-particle.wispy-coverage {
          background: radial-gradient(
            ellipse at 50% 50%, 
            rgba(255,255,255,0.9) 0%, 
            rgba(248,248,248,0.8) 25%, 
            rgba(240,240,240,0.7) 45%, 
            rgba(230,230,230,0.5) 65%, 
            rgba(215,215,215,0.3) 80%, 
            transparent 100%
          );
          filter: blur(5px);
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }

        .smoke-particle.blanket-coverage {
          background: radial-gradient(
            ellipse at 60% 40%, 
            rgba(255,255,255,0.85) 0%, 
            rgba(245,245,245,0.75) 30%, 
            rgba(235,235,235,0.6) 50%, 
            rgba(220,220,220,0.45) 70%, 
            rgba(200,200,200,0.25) 85%, 
            transparent 100%
          );
          filter: blur(7px);
          border-radius: 50% 60% 40% 80% / 70% 50% 90% 30%;
        }

        @keyframes sweepRightUltraSlow {
          0% {
            left: -200%;
          }
          8% {
            left: -180%;
          }
          18% {
            left: -150%;
          }
          30% {
            left: -120%;
          }
          45% {
            left: -80%;
          }
          60% {
            left: -40%;
          }
          75% {
            left: 0%;
          }
          90% {
            left: 50%;
          }
          100% {
            left: 100%;
          }
        }

        @keyframes sweepLeftUltraSlow {
          0% {
            right: -200%;
          }
          8% {
            right: -180%;
          }
          18% {
            right: -150%;
          }
          30% {
            right: -120%;
          }
          45% {
            right: -80%;
          }
          60% {
            right: -40%;
          }
          75% {
            right: 0%;
          }
          90% {
            right: 50%;
          }
          100% {
            right: 100%;
          }
        }

        @keyframes floatUltraSlow {
          0%, 100% {
            opacity: 0;
            transform: 
              translateX(0) 
              translateY(0) 
              scale(var(--scale)) 
              rotate(var(--rotation));
          }
          5% {
            opacity: 0.4;
            transform: 
              translateX(calc(var(--drift-x) * 0.1)) 
              translateY(calc(var(--drift-y) * 0.05)) 
              scale(calc(var(--scale) * 1.02)) 
              rotate(calc(var(--rotation) + 2deg));
          }
          15% {
            opacity: 0.7;
            transform: 
              translateX(calc(var(--drift-x) * 0.3)) 
              translateY(calc(var(--drift-y) * 0.2)) 
              scale(calc(var(--scale) * 1.1)) 
              rotate(calc(var(--rotation) + 8deg));
          }
          30% {
            opacity: 0.9;
            transform: 
              translateX(calc(var(--drift-x) * 0.5)) 
              translateY(calc(var(--drift-y) * 0.4)) 
              scale(calc(var(--scale) * 1.2)) 
              rotate(calc(var(--rotation) + 18deg));
          }
          50% {
            opacity: 1;
            transform: 
              translateX(calc(var(--drift-x) * 0.7)) 
              translateY(calc(var(--drift-y) * 0.6)) 
              scale(calc(var(--scale) * 1.3)) 
              rotate(calc(var(--rotation) + 30deg));
          }
          70% {
            opacity: 0.95;
            transform: 
              translateX(calc(var(--drift-x) * 0.9)) 
              translateY(calc(var(--drift-y) * 0.8)) 
              scale(calc(var(--scale) * 1.25)) 
              rotate(calc(var(--rotation) + 42deg));
          }
          85% {
            opacity: 0.8;
            transform: 
              translateX(var(--drift-x)) 
              translateY(calc(var(--drift-y) * 0.95)) 
              scale(calc(var(--scale) * 1.2)) 
              rotate(calc(var(--rotation) + 50deg));
          }
          95% {
            opacity: 0.5;
            transform: 
              translateX(calc(var(--drift-x) * 1.05)) 
              translateY(var(--drift-y)) 
              scale(calc(var(--scale) * 1.1)) 
              rotate(calc(var(--rotation) + 55deg));
          }
        }

        .poem-tile {
          animation: slideInUp 2s ease-out forwards;
          opacity: 0;
          transform: translateY(40px);
        }

        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .poem-tile {
            animation-delay: 0s !important;
          }
        }

        @media (max-width: 768px) {
          main > div {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 1rem;
          }
          
          .poem-tile > div {
            height: 160px;
            padding: 1rem;
          }
          
          .poem-tile h2 {
            font-size: 1.5rem;
            margin-bottom: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          main > div {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(6, 1fr);
            max-height: 70vh;
            overflow-y: auto;
          }
          
          .poem-tile > div {
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
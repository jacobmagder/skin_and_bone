import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface VelvetPageProps {
  onBack: () => void;
}

export default function VelvetPage({ onBack }: VelvetPageProps) {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      backgroundColor: '#1a000b',
      color: '#f8f4f2',
      fontFamily: "'Cormorant Infant', serif",
      fontSize: '1.25rem',
      lineHeight: '1.9',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      overflowX: 'hidden',
      backgroundAttachment: 'fixed'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,400;0,600;1,400;1,600&family=Cinzel:wght@500;700&family=Tangerine:wght@700&display=swap');
        
        .velvet-book {
          width: 85%;
          max-width: 900px;
          margin: 60px auto;
          position: relative;
          background: #271013;
          padding: 60px 0;
          box-shadow: 
            0 15px 25px rgba(0, 0, 0, 0.6),
            0 0 40px rgba(0, 0, 0, 0.3) inset;
          border-radius: 2px;
          border: 1px solid #36191d;
        }

        .velvet-book::before,
        .velvet-book::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: #271013;
          border: 1px solid #36191d;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
          z-index: -1;
        }

        .velvet-book::before {
          top: 3px;
          right: -4px;
          transform: rotate(1deg);
        }

        .velvet-book::after {
          top: 6px;
          right: -8px;
          transform: rotate(2deg);
        }

        .velvet-book-spine {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 40px;
          background: #1d0c0e;
          border-right: 1px solid #3d1e22;
          box-shadow: 
            5px 0 10px rgba(0, 0, 0, 0.3) inset,
            -2px 0 5px rgba(0, 0, 0, 0.2);
        }

        .velvet-page-content {
          position: relative;
          max-width: 720px;
          padding: 0 80px 0 100px;
          margin: 0 auto;
        }

        .velvet-initial-letter {
          float: left;
          font-size: 4.5em;
          line-height: 0.8;
          margin-right: 0.1em;
          margin-top: 0.1em;
          color: #d3c7b9;
          font-family: 'Cinzel', serif;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .velvet-h1 {
          font-size: 3rem;
          color: #d3c7b9;
          letter-spacing: 1px;
          text-align: center;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .velvet-subtitle {
          font-family: 'Tangerine', cursive;
          font-size: 2rem;
          color: #ad9a8a;
          text-align: center;
          margin-bottom: 50px;
          font-weight: normal;
        }

        .velvet-content {
          margin-bottom: 50px;
          text-align: justify;
          padding-left: 1.5rem;
          border-left: 1px solid rgba(173, 154, 138, 0.3);
        }

        .velvet-p {
          margin-bottom: 1.6em;
          text-indent: 1.5em;
        }

        .velvet-p:first-of-type {
          text-indent: 0;
        }

        .velvet-quote {
          font-style: italic;
          color: #ad9a8a;
          margin: 40px 40px 40px 60px;
          text-align: right;
          font-size: 1.1em;
          position: relative;
        }

        .velvet-quote::before {
          content: "❧";
          position: absolute;
          left: -40px;
          color: #6d5c4d;
          font-size: 1.5em;
        }

        .velvet-footer {
          margin-top: 60px;
          font-size: 0.9rem;
          color: #887567;
          text-align: center;
        }

        .velvet-back-btn {
          color: #ad9a8a;
          text-decoration: none;
          transition: color 0.3s;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .velvet-back-btn:hover {
          color: #d3c7b9;
        }

        .velvet-page-number {
          position: absolute;
          bottom: 20px;
          right: 40px;
          font-size: 0.9em;
          color: #6d5c4d;
          font-style: italic;
        }

        ::selection {
          background: #4d2c32;
          color: #f8f4f2;
        }
      `}</style>

      <div className="velvet-book">
        <div className="velvet-book-spine"></div>
        <div className="velvet-page-content">
          <h1 className="velvet-h1">Velvet</h1>
          <div className="velvet-subtitle">Memoirs of Silence</div>
          <div className="velvet-content">
            <p className="velvet-p">
              <span className="velvet-initial-letter">Y</span>ou wore your silence like it was perfume<br />
              a scent that stained my soul<br />
              and lingered in the air for years.<br />
              Your words were a whispered secret<br />
              a poem read from memory in a dark room<br />
              softer than my own skin deserved.
            </p>
            <p className="velvet-p">
              You did not leave me.<br />
              You just became a sacred place.<br />
              A locked room inside my own heart<br />
              that I am no longer worthy<br />
              to enter.
            </p>
            <p className="velvet-quote">"You didn't leave. You just became a room I can't walk into."</p>
          </div>
          <div className="velvet-footer">
            <p>
              <span className="velvet-back-btn" onClick={onBack}>
                <ArrowLeft size={16} />
                Back to Skin & Bone
              </span>
            </p>
          </div>
          <div className="velvet-page-number">I</div>
        </div>
      </div>
    </div>
  );
}
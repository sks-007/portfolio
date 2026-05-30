'use client';
import { useRef, useState, useEffect } from 'react';

const PLAYLIST = [
  { title: "Track 1", src: "/audio4.mpeg" },
  { title: "Track 2", src: "/audio2.mpeg" },
  { title: "Track 3", src: "/audio3.mpeg" },
  { title: "Track 4", src: "/audio1.mpeg" },
  { title: "Track 5", src: "/audio5.mpeg" },
];

export default function Hero3D() {
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = PLAYLIST[trackIdx];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    setTrackIdx((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setTrackIdx((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const stopPlay = () => {
     if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
     }
     setIsPlaying(false);
  }

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            // Ignore AbortError which happens naturally when changing tracks
            if (e.name !== 'AbortError') {
              console.log("Playback error:", e);
              setIsPlaying(false);
            }
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [trackIdx, isPlaying]);

  // Handle custom cursor movement
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 1s ease' }}>
      
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src={currentTrack.src} 
        onEnded={playNext} 
      />

      <div style={{ 
        background: '#e0dac8', 
        padding: '1rem', // Reduced padding
        borderRadius: '16px', 
        boxShadow: '0 15px 35px rgba(0,0,0,0.1), inset 0 2px 10px rgba(255,255,255,0.6)',
        border: '1px solid #c8c0aa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        maxWidth: '100%',
        width: 'fit-content'
      }}>
        
        {/* The Retro Image Container */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          style={{ 
            position: 'relative', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
            cursor: 'none' // Hide default cursor so custom one shows
          }}
        >
          <img 
            src="/retro-player.png" 
            alt="Retro Cassette Player" 
            style={{ width: '100%', maxWidth: '340px', height: 'auto', display: 'block', border: '2px solid #b5b09d' }} // Reduced maxWidth
          />
          
          {/* LCD Screen Overlay */}
          <div style={{
            position: 'absolute',
            top: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1a1f18',
            color: '#76ff03',
            fontFamily: "'Courier New', Courier, monospace",
            padding: '6px 16px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            letterSpacing: '1px',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8), 0 2px 5px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap',
            border: '2px solid #333'
          }}>
            {isPlaying ? `▶ ${currentTrack.title}` : `II ${currentTrack.title}`}
          </div>
        </div>

        {/* Chunky Retro Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          background: '#d4ceba', 
          padding: '10px 14px', 
          borderRadius: '10px', 
          border: '1px solid #b5b09d', 
          boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.1)' 
        }}>
          
          <button onClick={playPrev} className="retro-btn" aria-label="Previous">
             <i className="bi bi-skip-backward-fill"></i>
          </button>
          
          <button onClick={togglePlay} className={`retro-btn ${isPlaying ? 'active' : ''}`} aria-label="Play/Pause">
             <i className="bi bi-play-fill"></i>
             <i className="bi bi-pause-fill" style={{ marginLeft: '-4px' }}></i>
          </button>
          
          <button onClick={playNext} className="retro-btn" aria-label="Next">
             <i className="bi bi-skip-forward-fill"></i>
          </button>

          <button onClick={stopPlay} className="retro-btn retro-btn-red" aria-label="Stop">
             <i className="bi bi-stop-fill"></i>
          </button>

        </div>
      </div>

      {/* Custom Music Cursor */}
      {isHoveringImage && (
        <div style={{
          position: 'fixed',
          top: cursorPos.y,
          left: cursorPos.x,
          pointerEvents: 'none', // Critical so it doesn't block mouse events
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          fontSize: '1.8rem',
          color: '#0563bb',
          textShadow: '0 2px 10px rgba(255,255,255,0.8)',
          animation: 'float 2s infinite ease-in-out'
        }}>
          <i className="bi bi-music-note-beamed"></i>
        </div>
      )}

      <style jsx>{`
        .retro-btn {
          background: linear-gradient(180deg, #f5f5f5 0%, #dcdcdc 100%);
          border: 2px solid #a0a0a0;
          border-bottom: 5px solid #888888;
          border-radius: 6px;
          padding: 8px 16px;
          color: #444;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.1s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.15);
        }
        .retro-btn:active, .retro-btn.active {
          transform: translateY(3px);
          border-bottom: 2px solid #888888;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          background: linear-gradient(180deg, #e0e0e0 0%, #c8c8c8 100%);
        }
        .retro-btn-red {
          background: linear-gradient(180deg, #ff5252 0%, #d32f2f 100%);
          border: 2px solid #b71c1c;
          border-bottom: 5px solid #880e4f;
          color: #fff;
        }
        .retro-btn-red:active {
          border-bottom: 2px solid #880e4f;
          background: linear-gradient(180deg, #e53935 0%, #c62828 100%);
        }
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) rotate(-10deg) scale(1); }
          50% { transform: translate(-50%, -60%) rotate(10deg) scale(1.2); }
        }
      `}</style>
    </div>
  );
}

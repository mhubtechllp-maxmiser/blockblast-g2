import React, { useState } from 'react';
import { Move, Grid, Zap, Flame, ShieldAlert, ChevronRight, ChevronLeft } from 'lucide-react';

const SLIDES = [
  {
    icon: Move,
    title: 'DRAG & DROP',
    text: 'Tap and drag energy shapes from the bottom tray onto the 8×8 holographic grid. Blocks appear above your finger for precise placement.'
  },
  {
    icon: Grid,
    title: 'FILL LINES',
    text: 'Form complete horizontal rows or vertical columns across the board. Simultaneous multi-line clears earn massive bonus points!'
  },
  {
    icon: Zap,
    title: 'CLEAR & SCORE',
    text: 'Completed lines dissolve in digital particle bursts. Each placed block grants +1 point, with escalating rewards for multiple lines.'
  },
  {
    icon: Flame,
    title: 'BUILD COMBOS',
    text: 'Clear lines on consecutive moves to ignite the Combo Multiplier up to x10. Trigger Double, Triple, and Perfect Move clear bonuses.'
  },
  {
    icon: ShieldAlert,
    title: 'SURVIVE',
    text: 'Plan your moves strategically. The round ends only when none of the available pieces can legally fit anywhere on the board.'
  }
];

export default function HowToPlayModal({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = SLIDES[currentSlide];
  const IconComponent = slide.icon;

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title neon-cyan">HOW TO PLAY</h2>

        <div className="tutorial-slider">
          <div className="tutorial-card">
            <div className="card-icon-wrapper">
              <IconComponent size={28} />
            </div>
            <h3 className="card-title">{slide.title}</h3>
            <p className="card-text">{slide.text}</p>
          </div>

          <div className="tutorial-dots">
            {SLIDES.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>

        <div className="modal-actions" style={{ flexDirection: 'row' }}>
          {currentSlide > 0 && (
            <button
              className="btn-modal-secondary"
              onClick={prevSlide}
              style={{ flex: 1 }}
            >
              <ChevronLeft size={16} /> BACK
            </button>
          )}
          <button
            className="btn-modal-primary"
            onClick={nextSlide}
            style={{ flex: 1 }}
          >
            {currentSlide === SLIDES.length - 1 ? 'GOT IT!' : 'NEXT'}
            {currentSlide < SLIDES.length - 1 && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}

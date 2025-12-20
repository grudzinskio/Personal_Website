import React from 'react';

function getRandomSpeed() {
  // [0.8, 1.5) - lower = bigger drift
  return 0.8 + Math.random() * 0.7;
}

export function LetterDisplay({ word, colorClass = '' }) {
  const baseSizeClass = colorClass.includes('text-foreground') 
    ? 'text-5xl md:text-7xl lg:text-8xl' 
    : 'text-6xl md:text-8xl lg:text-9xl';
    
  return (
    <>
      {word.split('').map((char, i) => (
        <div
          key={i}
          className={`letter ${baseSizeClass} font-semibold ${colorClass}`}
          data-speed={getRandomSpeed()}
          style={{
            display: 'inline-block',
            willChange: 'transform',
            WebkitTransform: 'translateZ(0)', // Safari/Edge webkit prefix
            MozTransform: 'translateZ(0)', // Firefox prefix
            msTransform: 'translateZ(0)', // IE/Edge prefix
            transform: 'translateZ(0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        >
          {char}
        </div>
      ))}
    </>
  );
}

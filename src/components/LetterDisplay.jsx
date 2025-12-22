import React from 'react';

function getRandomSpeed() {
  const randomDecimal = Math.random();
  return 0.8 + randomDecimal * (1.5 - 0.8);
}

export function LetterDisplay({ word, colorClass = '' }) {
  // Use smaller size if it's the dimmer text (foreground/60)
  const sizeClass = colorClass.includes('/60') 
    ? 'text-4xl md:text-6xl lg:text-7xl xl:text-8xl' 
    : 'text-6xl md:text-8xl lg:text-9xl xl:text-[12rem]';
    
  return (
    <div className="inline-flex">
      {word.split('').map((char, i) => (
        <div
          key={i}
          className={`letter ${sizeClass} font-semibold ${colorClass}`}
          data-speed={getRandomSpeed()}
          style={{
            display: 'inline-block',
            willChange: 'transform',
          }}
        >
          {char}
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LetterDisplay } from './LetterDisplay';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const nameLines = [
  'Oliver ',
  'Grudzinski'
];

function getRandomRotation() {
  // ±30°
  return Math.random() * 60 - 30;
}

function animateLettersOnScroll(ref, sectionRef) {
  const nodes = ref.current?.querySelectorAll('.letter') || [];
  const section = sectionRef.current;
  if (!section) return;
  
  nodes.forEach((letter) => {
    const speed = parseFloat(letter.dataset.speed || '1');
    const rotation = getRandomRotation();

    gsap.to(letter, {
      // y-offset = fraction of total scroll
      y: (1 - speed) * ScrollTrigger.maxScroll(window),
      rotation: rotation,
      ease: 'power2.out',
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,           // "momentum" feel
        invalidateOnRefresh: true
      }
    });
  });
}

export const ScrollAnimatedName = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!ref.current || !sectionRef.current) return;
    
    // Wait for next frame to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      animateLettersOnScroll(ref, sectionRef);
    }, 100);
    
    ScrollTrigger.addEventListener('refreshInit', () => ScrollTrigger.refresh());
    
    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] flex items-center justify-center px-4"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div ref={ref} className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
          {nameLines.map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              <LetterDisplay 
                word={line} 
                colorClass={lineIndex === 0 ? 'text-primary' : 'text-gradient'}
              />
              {lineIndex < nameLines.length - 1 && <div className="w-2 md:w-4" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

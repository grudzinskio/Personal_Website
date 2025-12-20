import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LetterDisplay } from './LetterDisplay';

gsap.registerPlugin(ScrollTrigger);

function getRandomRotation() {
  return Math.random() * 60 - 30;
}

function animateLettersOnScroll(containerRef) {
  const lettersContainer = containerRef.current;
  const letterElements = lettersContainer?.querySelectorAll('.letter');

  if (!letterElements) return;

  letterElements.forEach((letter) => {
    // Reset to initial position first
    gsap.set(letter, { y: 0, rotation: 0 });
    
    gsap.to(letter, {
      y: (i, el) =>
        (1 - parseFloat(el.getAttribute('data-speed'))) *
        ScrollTrigger.maxScroll(window),
      ease: 'power2.out',
      duration: 0.8,
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        invalidateOnRefresh: true,
        scrub: 0.5
      },
      rotation: getRandomRotation()
    });
  });
}

export function LetterCollision() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Wait for next frame to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      animateLettersOnScroll(containerRef);
      ScrollTrigger.refresh();
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="ml-4 md:ml-8 scroll-smooth">
      <div className="-mt-20 md:-mt-28 mb-24 md:mb-36 flex h-screen flex-col justify-end">
        {/* Animated greeting text */}
        <div className="flex flex-wrap items-center p-0 leading-none mb-2">
          <div className="text-5xl md:text-7xl lg:text-8xl font-normal text-foreground/80 flex">
            <LetterDisplay word="Hello, " colorClass="text-foreground/80" />
            <div className="w-3 md:w-5"></div>
            <LetterDisplay word="I" colorClass="text-foreground/80" />
            <div className="w-4 md:w-6 lg:w-8"></div>
            <LetterDisplay word="am" colorClass="text-foreground/80" />
          </div>
        </div>
        
        {/* Animated name with gap */}
        <div className="flex flex-wrap items-center p-0 leading-none">
          <LetterDisplay word="Oliver" colorClass="text-primary" />
          <div className="w-4 md:w-8 lg:w-10"></div>
          <LetterDisplay word="Grudzinski" colorClass="text-gradient" />
        </div>
      </div>
    </div>
  );
}

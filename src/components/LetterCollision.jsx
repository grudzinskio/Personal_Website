import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LetterDisplay } from './LetterDisplay';

gsap.registerPlugin(ScrollTrigger);

function getRandomSpeed() {
  const randomDecimal = Math.random();
  return 0.8 + randomDecimal * (1.5 - 0.8);
}

function getRandomRotation() {
  return Math.random() * 60 - 30;
}

function animateLettersOnScroll(containerRef) {
  const lettersContainer = containerRef.current;
  const letterElements = lettersContainer?.querySelectorAll('.letter');

  if (!letterElements || letterElements.length === 0) return [];

  const animations = [];

  letterElements.forEach((letter) => {
    // Set random speed if not already set
    if (!letter.getAttribute('data-speed')) {
      letter.setAttribute('data-speed', getRandomSpeed());
    }

    // Reset to initial position first
    gsap.set(letter, { y: 0, rotation: 0, opacity: 1 });
    
    const anim = gsap.to(letter, {
      y: (i, el) =>
        (1 - parseFloat(el.getAttribute('data-speed'))) *
        ScrollTrigger.maxScroll(window),
      opacity: 0, // Fade out completely
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight, // Letters disappear by end of viewport
        invalidateOnRefresh: true,
        scrub: 0.5
      },
      rotation: getRandomRotation()
    });
    
    animations.push(anim);
  });
  
  return animations;
}

export function LetterCollision() {
  const containerRef = useRef(null);
  const animationsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Wait for next frame to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      animationsRef.current = animateLettersOnScroll(containerRef);
      ScrollTrigger.refresh();
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      // Clean up only our specific animations
      animationsRef.current.forEach(anim => {
        if (anim && anim.scrollTrigger) {
          anim.scrollTrigger.kill();
        }
        if (anim && anim.kill) {
          anim.kill();
        }
      });
      animationsRef.current = [];
    };
  }, []);

  return (
    <div ref={containerRef} className="ml-4 md:ml-8 scroll-smooth">
      <div className="-mt-40 sm:-mt-24 md:-mt-28 mb-40 sm:mb-28 md:mb-36 flex h-screen flex-col justify-end">
        {/* Animated greeting text */}
        <div className="flex flex-wrap items-center p-0 leading-none mb-2">
          <div className="text-5xl md:text-7xl lg:text-8xl font-normal text-foreground/80 flex">
            <LetterDisplay word="Hello, " colorClass="text-foreground/80" />
            <div className="w-3 md:w-5"></div>
            <LetterDisplay word="I'm" colorClass="text-foreground/80" />
          </div>
        </div>
        
        {/* Animated name with gap */}
        <div className="flex flex-wrap items-center p-0 leading-none">
          <LetterDisplay word="Oliver" colorClass="text-primary" />
          <div className="w-4 md:w-8 lg:w-10"></div>
          <LetterDisplay word="Grudzinski" colorClass="text-gradient" />
        </div>
      </div>
      {/* Extra random letters below with proper spacing */}
      <div className="flex flex-wrap mb-32">
        <LetterDisplay word="building " colorClass="text-foreground/60" />
        <div className="w-2 xs:w-4 sm:w-6"></div>
        <LetterDisplay word="innovative " colorClass="text-foreground/60" />
        <div className="w-2 xs:w-4 sm:w-6"></div>
        <LetterDisplay word="solutions" colorClass="text-foreground/60" />
      </div>
    </div>
  );
}

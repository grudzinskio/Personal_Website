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

export function LetterCollision() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use gsap.context for proper cleanup and scoping
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray('.letter');

      if (letters.length === 0) return;

      // Assign random speeds to letters if needed
      letters.forEach((letter) => {
        if (!letter.getAttribute('data-speed')) {
          letter.setAttribute('data-speed', getRandomSpeed());
        }
      });

      // Reset to initial position
      gsap.set(letters, { y: 0, rotation: 0, opacity: 1 });

      // Create a SINGLE interaction observer/scroll trigger for all letters
      // This is much more performant than creating 50+ individual ScrollTriggers
      gsap.to(letters, {
        y: (i, el) => {
          const speed = parseFloat(el.getAttribute('data-speed') || '1');
          return (1 - speed) * ScrollTrigger.maxScroll(window);
        },
        opacity: 0,
        rotation: () => getRandomRotation(),
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: window.innerHeight * 0.72, // Clear the hero letters before the intro copy enters laptop viewports
          scrub: 0.42,
          invalidateOnRefresh: true, // Recalculate values on resize
        },
      });
    }, containerRef);

    return () => ctx.revert(); // Automatic cleanup
  }, []);

  return (
    <div ref={containerRef} className="content-shell scroll-smooth px-2 sm:px-4">
      <div className="-mt-40 sm:-mt-24 md:-mt-28 mb-40 sm:mb-28 md:mb-36 flex h-screen flex-col justify-end pr-2 sm:pr-4">
        {/* Animated greeting text */}
        <div className="flex flex-wrap items-center p-0 leading-[0.9] mb-1 sm:mb-2 md:mb-3">
          <div className="flex text-[clamp(2rem,6vw,8.25rem)] font-normal text-white">
            <LetterDisplay word="Hello, " colorClass="text-white" />
            <div className="w-2 sm:w-3 md:w-5"></div>
            <LetterDisplay word="I'm" colorClass="text-white" />
          </div>
        </div>

        {/* Animated name with gap - prevent wrapping within words */}
        <div className="flex flex-wrap items-center p-0 leading-[0.9]">
          <div className="whitespace-nowrap">
            <LetterDisplay word="Oliver" colorClass="text-amber-300" />
          </div>
          <div className="w-3 sm:w-4 md:w-8 lg:w-10 flex-shrink-0"></div>
          <div className="whitespace-nowrap">
            <LetterDisplay word="Grudzinski" colorClass="text-gradient-warm" />
          </div>
        </div>
      </div>
      {/* Extra random letters below with proper spacing */}
      <div className="flex flex-wrap mb-24 sm:mb-32 gap-2 xs:gap-4 sm:gap-6 pr-2 sm:pr-4">
        <LetterDisplay word="building " colorClass="text-white" />
        <LetterDisplay word="innovative " colorClass="text-white" />
        <LetterDisplay word="solutions" colorClass="text-white" />
      </div>
    </div>
  );
}

export default LetterCollision;

import { useEffect, useRef } from 'react';
import { createScrollTextReveal, createStaggerFadeIn } from '../animations/textAnimations';
import { createCardStaggerReveal, createScrollVelocityZone } from '../animations/scrollAnimations';
import { getLenis } from '../animations/smoothScroll';
import aboutData from '../data/about.json';

export const AboutMeSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const animations = [];

    // Apply magnetic scroll effect - pulls scroll as you approach About Me section
    if (sectionRef.current) {
      const magneticEffect = createScrollVelocityZone(
        sectionRef.current, 
        getLenis,
        {
          slowdownFactor: 0.35,  // Slows scroll to 35% speed when near center
          zoneSize: 0.3,         // 30% zone for stronger pull effect
          markers: false
        }
      );
      if (magneticEffect) animations.push(magneticEffect);
    }

    // Apply smooth scroll-triggered text reveal to title
    if (titleRef.current) {
      const titleAnim = createScrollTextReveal([titleRef.current], {
        startTrigger: 'top 80%',
        endTrigger: 'bottom+=40vh bottom',
        initialX: -100,
        initialOpacity: 0,
        ease: 'power3.out'
      });
      animations.push(...titleAnim);
    }

    // Apply gradient reveal to description
    if (descriptionRef.current) {
      const descAnim = createScrollTextReveal([descriptionRef.current], {
        startTrigger: 'top 80%',
        endTrigger: 'bottom+=40vh bottom',
        initialX: -80,
        initialOpacity: 0,
        ease: 'power2.out'
      });
      animations.push(...descAnim);
    }

    // Apply smooth card reveal to the entire content
    if (contentRef.current) {
      const cardAnim = createCardStaggerReveal([contentRef.current], {
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        stagger: 0,
        ease: 'power2.out',
        start: 'top 75%'
      });
      if (cardAnim) animations.push(cardAnim);
    }

    // Fade in divider
    if (dividerRef.current) {
      const dividerAnim = createStaggerFadeIn([dividerRef.current], {
        y: 15,
        opacity: 0,
        duration: 0.8,
        stagger: 0,
        ease: 'power2.out',
        start: 'top 80%'
      });
      animations.push(...dividerAnim);
    }

    return () => {
      animations.forEach(anim => {
        if (anim && anim.kill) anim.kill();
        if (anim && anim.scrollTrigger) anim.scrollTrigger.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[50vh] w-full overflow-hidden flex items-center justify-center py-12">
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 gradient-bg"
        aria-hidden="true"
      />

      {/* Smooth gradient overlay from video */}
      <div 
        className="absolute top-0 left-0 w-full h-[400px] z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(5, 13, 24, 1) 0%, rgba(5, 13, 24, 0.95) 15%, rgba(6, 14, 25, 0.85) 30%, rgba(7, 15, 26, 0.65) 50%, rgba(8, 16, 28, 0.35) 70%, transparent 100%)'
        }}
      />

      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-subtle" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />

      {/* Content Container */}
      <div 
        ref={contentRef}
        className="relative z-20 container max-w-3xl mx-auto px-4"
      >
        <div className="relative">
          {/* Glow effect behind card */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-cyan-600/30 rounded-2xl blur-xl scale-105" />
          
          {/* Main card */}
          <div className="relative glassmorphism-card backdrop-blur-2xl bg-gradient-to-br from-black/70 via-black/60 to-black/70 rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl border border-white/20">
            {/* Subtle shine effect */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-30"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 40%, transparent 60%)'
              }}
            />
            
            <div className="relative text-center">
              <p 
                ref={titleRef}
                className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-6 drop-shadow-lg font-light"
              >
                {aboutData.personal.title}
              </p>
              
              <div 
                ref={dividerRef}
                className="w-16 h-1 mx-auto mb-6 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" 
              />
              
              <p 
                ref={descriptionRef}
                className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-md"
              >
                {aboutData.personal.description[0]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div 
        className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)'
        }}
      />
    </section>
  );
};


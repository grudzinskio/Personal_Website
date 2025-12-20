import { useEffect, useRef, useState } from 'react';
import { createImageParallax, createScaleOnScroll } from '../animations/scrollAnimations';
import { createWordReveal, createStaggerFadeIn } from '../animations/textAnimations';
import videoSource from '../assets/AI_System_Design_Video.mp4';

export const VideoSection = () => {
  const videoRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const animations = [];

    // Apply smooth parallax effect to video
    if (videoRef.current) {
      const parallaxAnim = createImageParallax(videoRef.current, {
        speed: 0.3,
        scale: 1.15,
        scrub: 1.5,
        start: 'top top',
        end: 'bottom top'
      });
      if (parallaxAnim) animations.push(parallaxAnim);
    }

    // Add smooth word reveal to heading
    if (headingRef.current) {
      const headingAnim = createWordReveal(headingRef.current, {
        stagger: 0.1,
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        start: 'top 70%'
      });
      if (headingAnim) animations.push(headingAnim);
    }

    // Add stagger fade to subtitle
    if (subtitleRef.current) {
      const subtitleAnim = createStaggerFadeIn([subtitleRef.current], {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        start: 'top 75%'
      });
      if (subtitleAnim) animations.push(...subtitleAnim);
    }

    return () => {
      animations.forEach(anim => {
        if (anim && anim.kill) anim.kill();
        if (anim && anim.scrollTrigger) anim.scrollTrigger.kill();
      });
    };
  }, [isLoaded]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden z-10">
      {/* Extended gradient fade transition from previous section */}
      <div 
        className="absolute top-0 left-0 w-full h-64 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.6) 30%, transparent 100%)'
        }}
      />

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-1500"
          style={{
            transform: 'scale(1)',
            willChange: 'transform',
            opacity: isLoaded ? 1 : 0
          }}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        
        {/* Dark Overlay for text readability */}
        <div 
          className="absolute inset-0 bg-black/35 transition-opacity duration-1500"
          style={{
            opacity: isLoaded ? 1 : 0
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content Overlay */}
      <div 
        className="relative z-30 min-h-screen flex flex-col items-center justify-center px-4 text-center"
      >
        <h1 
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight" 
          style={{ 
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          Building tomorrow&apos;s infrastructure
        </h1>
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl max-w-3xl leading-relaxed font-light" 
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)',
            color: '#FFFFFF',
            opacity: 1,
          }}
        >
          AI • Machine Learning • System Architecture
        </p>
      </div>

      {/* Extended gradient fade transition to next section */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[600px] z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(5, 13, 24, 1) 0%, rgba(5, 13, 24, 0.98) 10%, rgba(6, 14, 25, 0.95) 20%, rgba(6, 14, 25, 0.88) 32%, rgba(7, 15, 26, 0.75) 45%, rgba(7, 16, 27, 0.58) 60%, rgba(8, 16, 28, 0.35) 75%, transparent 100%)'
        }}
      />
    </section>
  );
};

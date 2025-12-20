import { useEffect, useRef, useState } from 'react';
import { videoParallax } from '../animations/parallaxEffects';
import { fadeInOnScroll } from '../animations/fadeIn';
import videoSource from '../assets/AI_System_Design_Video.mp4';

export const VideoSection = () => {
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Apply parallax effect to video
    let parallaxAnim = null;
    let fadeObserver = null;

    if (videoRef.current) {
      parallaxAnim = videoParallax(videoRef.current);
    }

    // Fade in content when visible
    if (contentRef.current) {
      fadeObserver = fadeInOnScroll([contentRef.current], {
        threshold: 0.3,
        delay: 200
      });
    }

    return () => {
      if (parallaxAnim) {
        parallaxAnim.kill();
      }
      if (fadeObserver) {
        fadeObserver.disconnect();
      }
    };
  }, [isLoaded]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden z-10">
      {/* Extended gradient fade transition from previous section */}
      <div 
        className="absolute top-0 left-0 w-full h-64 z-30 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.8) 30%, transparent 100%)'
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
          className="absolute inset-0 bg-black/60 backdrop-blur-[1px] transition-opacity duration-1500"
          style={{
            opacity: isLoaded ? 1 : 0
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content Overlay */}
      <div 
        ref={contentRef}
        className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 text-center"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
          Building tomorrow's infrastructure
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl leading-relaxed font-light">
          AI • Machine Learning • System Architecture
        </p>
      </div>

      {/* Extended gradient fade transition to footer */}
      <div 
        className="absolute bottom-0 left-0 w-full h-48 z-30 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.5) 50%, transparent 100%)'
        }}
      />
    </section>
  );
};

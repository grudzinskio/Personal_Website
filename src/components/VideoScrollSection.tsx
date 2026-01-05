import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import videoSource from '../assets/looping_video.mp4';

/**
 * VideoScrollSection - A minimal, scroll-driven video experience with text overlay
 * 
 * Motion Intent:
 * - Video opacity is directly tied to scroll progress (data-driven)
 * - Fades in earlier as user approaches the section
 * - Text animates in with stagger effect
 * - Fades out as user exits the section
 * - Subtle scale effect adds depth without being distracting
 * - Video only plays when in view for performance optimization
 * 
 * Design Philosophy:
 * - Clean text overlay with intentional typography
 * - Data-driven motion
 * - Video feels like part of a living technical system
 */
export const VideoScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Track scroll progress through the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Track from when section enters viewport to when it exits
  });

  // Map scroll progress to opacity - starts earlier now
  // [0, 0.15]: Fade in from 0 to 1 as section enters (faster fade in)
  // [0.15, 0.85]: Maintain full opacity while scrolling through
  // [0.85, 1]: Fade out from 1 to 0 as section exits
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  // Subtle scale transform for depth (1.0 → 1.05 → 1.0)
  // Creates a slight zoom effect that feels organic
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.05, 1]
  );

  // Text animation values - fades in slightly after video
  const textOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.75, 0.9],
    [0, 1, 1, 0]
  );

  const textY = useTransform(
    scrollYProgress,
    [0.1, 0.25],
    [30, 0]
  );

  // Check if video is in viewport
  const isInView = useInView(containerRef, { amount: 0.3 });

  // Control video playback based on visibility
  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView) {
      // Play video when in view
      videoRef.current.play().catch(err => {
        // Silently handle autoplay restrictions
        console.log('Video autoplay prevented:', err);
      });
    } else {
      // Pause video when out of view to save resources
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-background"
      style={{ height: '120vh' }} // Reduced spacing between sections
    >
      {/* Sticky container keeps video centered during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Gradient fade from previous section */}
        <div 
          className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)'
          }}
        />

        {/* Video element with motion-driven opacity and scale */}
        <motion.video
          ref={videoRef}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ 
            opacity,
            scale,
            willChange: 'opacity, transform' // Performance optimization
          }}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support HTML5 video.
        </motion.video>

        {/* Dark overlay for text readability */}
        <motion.div 
          className="absolute inset-0 bg-black/40"
          style={{ opacity }}
          aria-hidden="true"
        />

        {/* Text Content Overlay */}
        <motion.div 
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center"
          style={{ 
            opacity: textOpacity,
            y: textY
          }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight" 
            style={{ 
              textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Building tomorrow&apos;s infrastructure
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl max-w-3xl leading-relaxed font-light text-white" 
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            AI • Machine Learning • System Architecture
          </motion.p>
        </motion.div>

        {/* Gradient fade to next section */}
        <div 
          className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)'
          }}
        />
      </div>
    </section>
  );
};

export default VideoScrollSection;

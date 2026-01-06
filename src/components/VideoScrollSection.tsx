import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * AnimatedHeroSection - Lightweight alternative to video
 * Features animated gradient mesh with floating particles
 * GPU-accelerated, smooth 60fps performance
 */
export const VideoScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth opacity transitions
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.15, 0.3], [30, 0]);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
    }

    const particles: Particle[] = [];
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        hue: Math.random() * 60 + 240 // Purple to blue range
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Gradient for glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, ${particle.opacity})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 60%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw connections between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - distance / 150) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-background"
      style={{ height: '120vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Gradient fade from previous section */}
        <div 
          className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)'
          }}
        />

        {/* Animated gradient background */}
        <div className="absolute inset-0 gradient-mesh-animated opacity-40" />
        
        {/* Canvas particles */}
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ opacity }}
        />
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-transparent" />

        {/* Text Content */}
        <motion.div 
          className="relative z-10 flex flex-col items-center justify-center px-4 text-center max-w-6xl"
          style={{ 
            opacity: textOpacity,
            y: textY
          }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
          >
            <span className="block text-foreground mb-4">Building</span>
            <span className="block text-gradient-animated text-6xl md:text-8xl lg:text-9xl">Tomorrow's</span>
            <span className="block text-foreground">Infrastructure</span>
          </motion.h2>
          
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xl md:text-2xl lg:text-3xl font-light"
          >
            <span className="text-primary font-medium">AI</span>
            <span className="text-foreground/30">•</span>
            <span className="text-primary font-medium">Machine Learning</span>
            <span className="text-foreground/30">•</span>
            <span className="text-primary font-medium">System Architecture</span>
          </motion.div>
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

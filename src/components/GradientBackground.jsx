import { useEffect, useRef } from 'react';

/**
 * GradientBackground - Vercel-style animated gradient mesh
 * Optimized canvas-based rendering for smooth performance
 */
export const GradientBackground = ({ opacity = 1, animate = true }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();

    // Gradient orb configuration - Vercel-inspired positions
    const orbs = [
      { x: 0.27, y: 0.37, radius: 0.4, color: [215, 98, 61], alpha: 0.12, speed: 0.0003 },
      { x: 0.97, y: 0.21, radius: 0.35, color: [240, 98, 61], alpha: 0.10, speed: 0.0004 },
      { x: 0.52, y: 0.99, radius: 0.38, color: [260, 98, 61], alpha: 0.09, speed: 0.0002 },
      { x: 0.10, y: 0.29, radius: 0.30, color: [290, 98, 61], alpha: 0.07, speed: 0.0005 },
      { x: 0.97, y: 0.96, radius: 0.32, color: [220, 98, 61], alpha: 0.07, speed: 0.0003 },
      { x: 0.33, y: 0.50, radius: 0.36, color: [250, 98, 61], alpha: 0.08, speed: 0.0004 },
      { x: 0.79, y: 0.53, radius: 0.28, color: [270, 98, 61], alpha: 0.06, speed: 0.0002 },
    ];

    // Create gradient for orb
    const createOrbGradient = (orb, time) => {
      const centerX = width * orb.x + Math.sin(time * orb.speed) * width * 0.05;
      const centerY = height * orb.y + Math.cos(time * orb.speed * 0.8) * height * 0.05;
      const radius = Math.min(width, height) * orb.radius;

      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );

      const [h, s, l] = orb.color;
      gradient.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, ${orb.alpha * opacity})`);
      gradient.addColorStop(0.5, `hsla(${h}, ${s}%, ${l}%, ${orb.alpha * 0.5 * opacity})`);
      gradient.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`);

      return { gradient, centerX, centerY, radius };
    };

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      timeRef.current += 1;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw each orb
      orbs.forEach(orb => {
        const { gradient, centerX, centerY, radius } = createOrbGradient(orb, timeRef.current);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      if (animate) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation if enabled
    if (animate) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // Static render
      timeRef.current = 0;
      ctx.clearRect(0, 0, width, height);
      orbs.forEach(orb => {
        const { gradient, centerX, centerY, radius } = createOrbGradient(orb, 0);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    }

    // Handle resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [opacity, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ opacity }}
    />
  );
};

export default GradientBackground;

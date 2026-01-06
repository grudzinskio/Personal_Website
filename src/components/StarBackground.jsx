import { useEffect, useRef } from "react";

/**
 * Optimized StarBackground using Canvas for smooth 60fps rendering
 * Replaces DOM-based star elements with performant canvas rendering
 */
export const StarBackground = () => {
    const canvasRef = useRef(null);
    const starsRef = useRef([]);
    const meteorsRef = useRef([]);
    const animationFrameRef = useRef(null);
    const scrollYRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
            initMeteors();
        };

        // Initialize stars with reduced count for performance
        const initStars = () => {
            const starCount = Math.floor((canvas.width * canvas.height) / 12000); // Reduced from 8000
            starsRef.current = [];
            
            for (let i = 0; i < starCount; i++) {
                starsRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.5 + 0.3,
                    twinkleSpeed: Math.random() * 0.02 + 0.01,
                    twinklePhase: Math.random() * Math.PI * 2,
                });
            }
        };

        // Initialize meteors
        const initMeteors = () => {
            meteorsRef.current = [];
            const meteorCount = 2;
            
            for (let i = 0; i < meteorCount; i++) {
                meteorsRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height * 0.3,
                    length: Math.random() * 80 + 40,
                    speed: Math.random() * 2 + 1,
                    opacity: 0,
                    delay: Math.random() * 300 + i * 150,
                    lastReset: Date.now(),
                });
            }
        };

        // Animation loop
        const animate = (timestamp) => {
            if (!ctx || !canvas) return;

            // Calculate fade based on scroll
            const maxScroll = window.innerHeight * 0.5;
            const opacity = Math.max(0, 1 - (scrollYRef.current / maxScroll));

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (opacity > 0) {
                // Draw stars
                starsRef.current.forEach(star => {
                    star.twinklePhase += star.twinkleSpeed;
                    const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
                    
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle * opacity})`;
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
                    ctx.fill();
                    ctx.shadowBlur = 0;
                });

                // Draw meteors
                meteorsRef.current.forEach(meteor => {
                    const timeSinceReset = Date.now() - meteor.lastReset;
                    
                    // Delay before showing meteor
                    if (timeSinceReset < meteor.delay) return;
                    
                    const activeTime = timeSinceReset - meteor.delay;
                    
                    // Fade in
                    if (activeTime < 500) {
                        meteor.opacity = activeTime / 500;
                    } else if (activeTime > 3000) {
                        // Fade out
                        meteor.opacity = Math.max(0, 1 - (activeTime - 3000) / 500);
                    } else {
                        meteor.opacity = 1;
                    }

                    // Move meteor
                    meteor.x -= meteor.speed * 2;
                    meteor.y += meteor.speed;

                    // Reset if off screen
                    if (meteor.x < -meteor.length || meteor.y > canvas.height) {
                        meteor.x = Math.random() * canvas.width + canvas.width * 0.2;
                        meteor.y = Math.random() * canvas.height * 0.3;
                        meteor.lastReset = Date.now();
                        meteor.opacity = 0;
                    }

                    // Draw meteor trail
                    if (meteor.opacity > 0) {
                        const gradient = ctx.createLinearGradient(
                            meteor.x, meteor.y,
                            meteor.x + meteor.length * 0.7, meteor.y + meteor.length * 0.3
                        );
                        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity * opacity})`);
                        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

                        ctx.beginPath();
                        ctx.moveTo(meteor.x, meteor.y);
                        ctx.lineTo(meteor.x + meteor.length * 0.7, meteor.y + meteor.length * 0.3);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 2;
                        ctx.shadowBlur = 8;
                        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
                        ctx.stroke();
                        ctx.shadowBlur = 0;
                    }
                });
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Handle scroll
        const handleScroll = () => {
            scrollYRef.current = window.scrollY;
        };

        // Initialize and start animation
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('scroll', handleScroll, { passive: true });
        animationFrameRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 1 }}
        />
    );
};

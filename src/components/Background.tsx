import { motion, useScroll, useTransform } from 'framer-motion';

export const Background = () => {
  const { scrollYProgress } = useScroll();
  
  // Move blobs based on scroll
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      
      {/* Animated gradient blobs */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full animate-blob"
      >
        <div className="absolute inset-0 bg-gradient-radial from-accent-blue/20 via-accent-blue/5 to-transparent blur-3xl" />
      </motion.div>

      <motion.div
        style={{ y: blob2Y }}
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full animate-blob animation-delay-200"
      >
        <div className="absolute inset-0 bg-gradient-radial from-accent-purple/15 via-accent-purple/5 to-transparent blur-3xl" />
      </motion.div>

      <motion.div
        style={{ y: blob3Y }}
        className="absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full animate-blob animation-delay-400"
      >
        <div className="absolute inset-0 bg-gradient-radial from-accent-pink/10 via-transparent to-transparent blur-3xl" />
      </motion.div>

      {/* Subtle radial gradient overlay from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-radial from-accent-blue/5 via-transparent to-transparent" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise pointer-events-none" style={{ zIndex: 2 }} />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-dark-950/80" style={{ zIndex: 3 }} />
    </div>
  );
};

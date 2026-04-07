import { motion } from 'framer-motion';

/**
 * StatementSection — "I build systems that make sense"
 * Sits in normal page flow, global background shows through.
 * Overlay: radial dark scrim + ambient orb for visual depth.
 */
export const VideoScrollSection = () => {
  const words = [
    { text: 'I', delay: 0.1 },
    { text: 'build', delay: 0.2 },
    { text: 'systems', delay: 0.3 },
    { text: 'that', delay: 0.4 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">

      {/* Radial dark scrim — makes text readable against the grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 100%)',
        }}
      />

      {/* Ambient orb — adds colour depth matching the site palette */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(121,40,202,0.16) 0%, rgba(0,112,243,0.07) 45%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'orbPulse 10s ease-in-out infinite',
          }}
        />
      </div>

      {/* Text */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.08] tracking-tight">
          {words.map(({ text, delay }) => (
            <motion.span
              key={text}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false, margin: '-8%' }}
              transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-white/90 mr-[0.25em]"
            >
              {text}
            </motion.span>
          ))}

          {/* "make sense" — site accent gradient */}
          <motion.span
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: false, margin: '-8%' }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple animate-gradient-shift"
            style={{ backgroundSize: '200% 200%' }}
          >
            make sense
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: '-8%' }}
            transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-white/35 ml-[0.05em]"
          >
            .
          </motion.span>
        </p>
      </div>
    </section>
  );
};

export default VideoScrollSection;

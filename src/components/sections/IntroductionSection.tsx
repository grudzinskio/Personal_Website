import { motion } from "framer-motion";

export function IntroductionSection() {
  return (
    <section className="relative px-4 py-20 sm:py-24 md:py-32">
      <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.32em] text-cyan-100/64"
          >
            MEDICAL SOFTWARE ENGINEERING
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-balance text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white/95"
          >
            Complex systems, distilled into calm software.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-3xl text-pretty text-base sm:text-lg md:text-xl leading-relaxed text-white/55"
          >
            I build crisp, reliable interfaces for healthcare data, imaging research, and operational systems where
            clarity matters as much as capability.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default IntroductionSection;

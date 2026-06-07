import { motion } from "framer-motion";
import presentingImage from "../../assets/presenting_image.jpg";

export function IntroductionSection() {
  return (
    <section className="page-section">
      <div className="content-shell grid min-h-[70vh] items-center gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center md:justify-center"
        >
          <div className="relative size-56 overflow-hidden rounded-full border border-white/12 bg-white/[0.03] shadow-[0_28px_90px_rgba(14,165,233,0.24)] sm:size-72 lg:size-80">
            <img
              src={presentingImage}
              alt="Oliver presenting"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/18" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center md:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="section-eyebrow"
          >
            DATA SCIENCE & SOFTWARE ENGINEERING
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="section-title-compact mt-5"
          >
            Intelligent systems. Clean architecture.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass-readable mx-auto mt-6 max-w-3xl rounded-lg p-5 text-left sm:p-6 md:mx-0"
          >
            <p className="text-pretty text-base leading-8 text-white/90 sm:text-lg md:text-xl md:leading-9">
              I architect the data pipelines that power machine learning models, and engineer the full-stack applications that bring them to life. From processing complex datasets to building crisp, high-performance interfaces,
              I design solutions where heavy logic meets effortless usability.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default IntroductionSection;

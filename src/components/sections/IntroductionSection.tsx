import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import presentingImage from "../../assets/presenting_image.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

export function IntroductionSection() {
  return (
    <section className="page-section">
      <div className="content-shell grid items-center gap-12 md:grid-cols-[1.25fr_0.75fr] lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="section-eyebrow">About</p>

          <h2 className="section-title-compact mt-6">
            Intelligent systems,
            <br />
            <span className="text-gradient-warm">built cleanly.</span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white sm:text-lg">
            I build data pipelines for machine learning, and the full-stack
            products that put them to work.
          </p>

          <motion.div
            animate={{ rotate: [0, -1.5, 1.5, -1, 1, 0], y: [0, -2, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 1.1,
              ease: "easeInOut",
            }}
            className="mt-8 inline-block"
          >
            <Link
              to="/about"
              className="group inline-flex items-center gap-2.5 text-lg font-semibold text-amber-200 transition-colors hover:text-amber-100"
            >
              More about me
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]"
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_70px_rgba(8,47,73,0.45)]">
            <img
              src={presentingImage}
              alt="Oliver presenting"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default IntroductionSection;

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/**
 * Hero — editorial, calm, confident.
 *
 * Oversized name with tight tracking, a mono role line, the amber accent used
 * exactly once (the surname), and a single short thesis. Everything reveals in
 * a quick staggered load (≈220ms steps, ease-out). No scroll-jacking.
 */

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Hero() {
  return (
    <div className="content-shell flex min-h-[100svh] flex-col justify-center px-1 pt-28 pb-24 sm:px-4">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl">
        {/* Role line */}
        <motion.p
          variants={item}
          className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-white/55 sm:text-[0.8125rem]"
        >
          <span className="inline-block size-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(245,181,68,0.6)]" />
          Software &amp; Machine Learning Engineer
        </motion.p>

        {/* Name — the hero thesis */}
        <h1 className="mt-6 font-display font-semibold leading-[0.92] tracking-[-0.035em] text-white">
          <motion.span
            variants={item}
            className="block text-[clamp(3.25rem,12vw,9.5rem)]"
          >
            Oliver
          </motion.span>
          <motion.span
            variants={item}
            className="block text-[clamp(3.25rem,12vw,9.5rem)] text-accent"
          >
            Grudzinski
          </motion.span>
        </h1>

        {/* Thesis */}
        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          I build the data pipelines behind machine learning — and the
          full-stack products that put them to work.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <Link to="/projects" className="cosmic-button">
            View projects
            <ArrowUpRight className="size-4" strokeWidth={2} />
          </Link>
          <Link to="/about" className="button-glass">
            About me
          </Link>
        </motion.div>

        {/* Quiet meta row */}
        <motion.div
          variants={item}
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/45"
        >
          <span>Based in Milwaukee</span>
          <span aria-hidden="true" className="hidden h-3 w-px bg-white/15 sm:block" />
          <span>MSOE &rsquo;27</span>
          <span aria-hidden="true" className="hidden h-3 w-px bg-white/15 sm:block" />
          <span>Data · ML · Full-stack</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;

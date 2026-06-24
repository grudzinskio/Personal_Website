import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";
import { scrollToElement, getLenis } from "../../utils/animations/smoothScroll";
import presentingImage from "../../assets/presenting_image.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

export function IntroductionSection() {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (getLenis()) {
      scrollToElement(`#${id}`, { offset: -80, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            I build data pipelines for machine learning, and the full-stack
            products that put them to work.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link to="/projects" className="cosmic-button">
              View projects
              <ArrowUpRight className="size-4" strokeWidth={2} />
            </Link>

            <motion.div
              animate={{ rotate: [0, -1.2, 1.2, -0.8, 0.8, 0], y: [0, -1.5, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 1.8,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-base font-semibold text-accent transition-colors hover:text-amber-200"
              >
                More about me
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Quiet wayfinding toward the next section */}
          <motion.button
            type="button"
            onClick={() => scrollToId("experience")}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="group mt-10 inline-flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-white"
          >
            <ArrowDown className="size-4 text-accent" />
            Keep scrolling to learn more about my experience
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]"
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
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

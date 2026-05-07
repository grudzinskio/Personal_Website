import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Briefcase, Mail, Sparkles, ArrowRight } from 'lucide-react';

/**
 * NavigationPanels - Quiet next-step navigation.
 */
const NavigationPanels = () => {
  const panels = [
    {
      title: 'About Me',
      description: 'Background, education, and the systems I like to build.',
      icon: User,
      href: '/about',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      hoverGradient: 'from-blue-500/30 to-cyan-500/30',
    },
    {
      title: 'Skills',
      description: 'Languages, frameworks, tooling, and engineering strengths.',
      icon: Sparkles,
      href: '/skills',
      gradient: 'from-sky-500/20 to-cyan-500/20',
      hoverGradient: 'from-sky-500/30 to-cyan-500/30',
    },
    {
      title: 'Projects',
      description: 'A focused archive of software and research-adjacent work.',
      icon: Briefcase,
      href: '/projects',
      gradient: 'from-orange-500/20 to-red-500/20',
      hoverGradient: 'from-orange-500/30 to-red-500/30',
    },
    {
      title: 'Contact',
      description: "Start a conversation about internships, research, or software.",
      icon: Mail,
      href: '/contact',
      gradient: 'from-green-500/20 to-emerald-500/20',
      hoverGradient: 'from-green-500/30 to-emerald-500/30',
    },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.34em] text-cyan-100/82 sm:text-xs">
            Continue
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            The rest of the system.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/84 sm:text-lg">
            Move through the portfolio like a product surface: clear paths, light chrome, and only the details that matter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {panels.map((panel, index) => (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={panel.href}>
                <motion.div
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative h-full group"
                >
                  <div className="relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.06] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-300 hover:border-cyan-100/24 hover:bg-white/[0.08] sm:p-7">
                    <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${panel.gradient} opacity-45 transition-opacity duration-300 group-hover:opacity-70`} />

                    <div className="relative z-10">
                      <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.045] text-cyan-100 transition-transform duration-300 group-hover:scale-105">
                        <panel.icon className="size-5" strokeWidth={1.8} />
                      </div>

                      <h3 className="mb-3 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-100 sm:text-2xl">
                        {panel.title}
                      </h3>

                      <p className="text-sm leading-6 text-white/82">
                        {panel.description}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-cyan-100/88 transition-colors group-hover:text-cyan-100">
                      <span>Open</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NavigationPanels;

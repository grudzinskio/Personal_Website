import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Briefcase, Mail, ArrowRight } from 'lucide-react';

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
    <section className="page-section overflow-hidden">
      <div className="content-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header mb-10 sm:mb-12"
        >
          <h2 className="section-title-compact mt-5">
            View the rest.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
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
                  <div className="glass-card relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-lg p-6 transition-all duration-300 hover:border-white/24 sm:p-7">
                    <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${panel.gradient} opacity-45 transition-opacity duration-300 group-hover:opacity-70`} />

                    <div className="relative z-10">
                      <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.065] text-cyan-100 backdrop-blur-xl transition-transform duration-300 group-hover:scale-105">
                        <panel.icon className="size-5" strokeWidth={1.8} />
                      </div>

                      <h3 className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-cyan-100 sm:text-2xl">
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

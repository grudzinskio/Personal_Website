import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Briefcase, Mail, ArrowRight } from 'lucide-react';

/**
 * NavigationPanels - Quiet next-step navigation.
 */
const NavigationPanels = () => {
  const panels = [
    {
      title: 'About',
      description: 'Background, education, and the systems I like to build.',
      icon: User,
      href: '/about',
      iconClass: 'border-sky-300/25 bg-sky-400/10 text-sky-300',
    },
    {
      title: 'Projects',
      description: 'A focused archive of software and research work.',
      icon: Briefcase,
      href: '/projects',
      iconClass: 'border-violet-300/25 bg-violet-400/10 text-violet-300',
    },
    {
      title: 'Contact',
      description: 'Start a conversation about internships, research, or software.',
      icon: Mail,
      href: '/contact',
      iconClass: 'border-emerald-300/25 bg-emerald-400/10 text-emerald-300',
    },
  ];

  return (
    <section className="page-section overflow-hidden">
      <div className="content-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header mb-12 sm:mb-16"
        >
          <p className="section-eyebrow">Explore</p>
          <h2 className="section-title-compact mt-6">
            Keep looking around.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {panels.map((panel, index) => (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link to={panel.href} className="group block h-full">
                <div className="glass-card flex h-full min-h-[220px] flex-col justify-between rounded-2xl p-7 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-sky-300/25">
                  <div>
                    <div className={`inline-flex size-10 items-center justify-center rounded-xl border ${panel.iconClass}`}>
                      <panel.icon className="size-5" strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-white">
                      {panel.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white">
                      {panel.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-sm font-medium text-sky-300/80 transition-colors group-hover:text-sky-200">
                    <span>Open</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NavigationPanels;

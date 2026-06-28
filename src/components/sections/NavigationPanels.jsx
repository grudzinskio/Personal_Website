import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Briefcase, Mail, ArrowRight } from 'lucide-react';

/**
 * NavigationPanels - Quiet next-step navigation.
 */
const NavigationPanels = () => {
  const panels = [
    {
      index: '01',
      title: 'About',
      description: 'Background, education, and the systems I like to build.',
      icon: User,
      href: '/about',
    },
    {
      index: '02',
      title: 'Projects',
      description: 'A focused archive of software and research work.',
      icon: Briefcase,
      href: '/projects',
    },
    {
      index: '03',
      title: 'Contact',
      description: 'Start a conversation about internships, research, or software.',
      icon: Mail,
      href: '/contact',
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
                <div className="glass-card card-hover flex h-full min-h-[220px] flex-col justify-between rounded-2xl p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition-colors duration-200 group-hover:border-accent/40 group-hover:text-accent">
                        <panel.icon className="size-5" strokeWidth={1.8} />
                      </div>
                      <span className="font-mono text-xs tracking-[0.2em] text-white/30">
                        {panel.index}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-white">
                      {panel.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {panel.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/45 transition-colors duration-200 group-hover:text-accent">
                    <span>Open</span>
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
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

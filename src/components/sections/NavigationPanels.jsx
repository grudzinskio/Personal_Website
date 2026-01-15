import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Code2, Briefcase, Mail, Sparkles, ArrowRight } from 'lucide-react';

/**
 * NavigationPanels - Cool interactive navigation cards at the bottom
 * Modern, clickable panels with hover effects and animations
 */
const NavigationPanels = () => {
  const panels = [
    {
      title: 'About Me',
      description: 'Learn about my experience, education, and expertise',
      icon: User,
      href: '/about',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      hoverGradient: 'from-blue-500/30 to-cyan-500/30',
    },
    {
      title: 'Skills',
      description: 'Explore my technical skills and proficiencies',
      icon: Sparkles,
      href: '/skills',
      gradient: 'from-purple-500/20 to-pink-500/20',
      hoverGradient: 'from-purple-500/30 to-pink-500/30',
    },
    {
      title: 'Projects',
      description: 'View my portfolio of work and achievements',
      icon: Briefcase,
      href: '/projects',
      gradient: 'from-orange-500/20 to-red-500/20',
      hoverGradient: 'from-orange-500/30 to-red-500/30',
    },
    {
      title: 'Contact',
      description: "Let's connect and build something amazing",
      icon: Mail,
      href: '/contact',
      gradient: 'from-green-500/20 to-emerald-500/20',
      hoverGradient: 'from-green-500/30 to-emerald-500/30',
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Explore
            <span className="block text-gradient-animated">More</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Discover more about my work, skills, and how we can collaborate
          </p>
        </motion.div>

        {/* Navigation Grid */}
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
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative h-full group"
                >
                  {/* Card with glassmorphism */}
                  <div className="glass-card rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:shadow-2xl">
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="inline-flex glass-card-strong p-4 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <panel.icon className="w-8 h-8 text-primary" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                        {panel.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                        {panel.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="relative z-10 flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Bottom gradient accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Alternative Layout - Large Feature Cards (uncomment if preferred) */}
        {/* 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link to="/projects">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card rounded-2xl p-12 bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all group"
            >
              <Code2 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-3xl font-bold mb-3">View All Projects</h3>
              <p className="text-muted-foreground">Explore my complete portfolio</p>
            </motion.div>
          </Link>
          
          <Link to="/contact">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card rounded-2xl p-12 bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 transition-all group"
            >
              <Mail className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-3xl font-bold mb-3">Get In Touch</h3>
              <p className="text-muted-foreground">Let's work together</p>
            </motion.div>
          </Link>
        </div>
        */}
      </div>
    </section>
  );
};

export default NavigationPanels;

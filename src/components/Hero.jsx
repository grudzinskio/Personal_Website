import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Code2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Magnetic from './animations/Magnetic';

/**
 * Hero - Modern, Vercel-inspired hero section
 * Features gradient text, glassmorphism, and smooth animations
 */
export const Hero = () => {
  const technologies = [
    'React', 'TypeScript', 'Python', 'Node.js', 
    'Machine Learning', 'System Design', 'AWS', 'Docker'
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Main content container */}
      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex"
          >
            <div className="glass-card px-4 py-2 rounded-full inline-flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-foreground/80">Available for opportunities</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            <span className="block text-foreground mb-2">Building the</span>
            <span className="block text-gradient-animated">future of web</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Full-stack engineer crafting innovative solutions with modern technologies.
            Specializing in AI, machine learning, and scalable system architecture.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Magnetic>
              <Link to="/projects" className="cosmic-button inline-flex items-center gap-2 group">
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Magnetic>
            
            <Magnetic>
              <Link to="/contact" className="button-glass inline-flex items-center gap-2 group">
                <Mail className="w-4 h-4" />
                Get in Touch
              </Link>
            </Magnetic>
          </motion.div>

          {/* Technology badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-8"
          >
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="glass-card-subtle px-4 py-2 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all cursor-default"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <Magnetic>
              <a
                href="https://github.com/grudzinskio"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-subtle p-3 rounded-full hover:bg-white/10 transition-all group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
              </a>
            </Magnetic>
            
            <Magnetic>
              <a
                href="https://linkedin.com/in/oliver-grudzinski"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-subtle p-3 rounded-full hover:bg-white/10 transition-all group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto"
        >
          <FeatureCard
            icon={<Code2 className="w-6 h-6" />}
            title="Full-Stack Development"
            description="Building scalable web applications with modern frameworks and best practices"
            delay={1.0}
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6" />}
            title="AI & Machine Learning"
            description="Implementing intelligent solutions with cutting-edge ML technologies"
            delay={1.1}
          />
          <FeatureCard
            icon={<Code2 className="w-6 h-6" />}
            title="System Architecture"
            description="Designing robust, efficient systems for complex technical challenges"
            delay={1.2}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-foreground/20 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ height: ["20%", "80%", "20%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 bg-foreground/40 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

/**
 * FeatureCard - Individual feature card with glassmorphism
 */
const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card p-6 rounded-2xl group cursor-default"
    >
      <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default Hero;

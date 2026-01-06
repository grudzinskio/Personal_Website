import { motion } from 'framer-motion';
import { Code2, Rocket, Users, Zap, Database, Globe } from 'lucide-react';
import { AnimatedSection, AnimatedStagger } from './AnimatedSection';

/**
 * FeatureGrid - Showcase of key features and capabilities
 * Bento-grid style layout with glassmorphism cards
 */
export const FeatureGrid = () => {
  const features = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code following industry best practices and design patterns',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance',
      description: 'Optimizing applications for speed, efficiency, and seamless user experiences',
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Data Engineering',
      description: 'Building robust data pipelines and implementing efficient storage solutions',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Cloud Native',
      description: 'Deploying scalable applications on AWS, Docker, and modern cloud platforms',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technologies to solve complex technical challenges',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'Working effectively in teams using Agile methodologies and modern workflows',
    },
  ];

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="container max-w-6xl mx-auto">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex glass-card px-4 py-2 rounded-full mb-6"
          >
            <span className="text-sm font-medium text-primary">Why Choose Me</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Engineering
            <span className="block text-gradient-animated">Excellence</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Combining technical expertise with creative problem-solving to deliver
            exceptional results
          </p>
        </AnimatedSection>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 rounded-2xl h-full group cursor-default"
              >
                {/* Icon */}
                <div className="inline-flex glass-card-strong p-4 rounded-xl text-primary mb-6 group-hover:scale-110 group-hover:glow-primary transition-all">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-6 pt-4 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;

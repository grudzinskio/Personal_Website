import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import msoeSunset from '../assets/MSOE_Sunset.jpg';
import profPort from '../assets/Prof_Port.jpg';
import Magnetic from './animations/Magnetic';

/**
 * ParallaxImages - The 3-column parallax image section with your picture
 * Original design with different scroll speeds for each column
 */
const ParallaxImages = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Reduce parallax movement on mobile for better performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Different parallax speeds for each image - reduced on mobile
  const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [50, -50] : [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [-25, 25] : [-50, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], isMobile ? [75, -75] : [150, -150]);

  return (
    <section ref={containerRef} className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
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
            My
            <span className="block text-gradient-animated">Journey</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Moments and milestones from my path in engineering and technology
          </p>

          {/* View Projects Button */}
          <Magnetic>
            <Link
              to="/projects"
              className="cosmic-button inline-flex items-center justify-center gap-2 group text-sm sm:text-base"
            >
              View My Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Magnetic>
        </motion.div>

        {/* Parallax Image Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
          {/* Image 1 - Left */}
          <motion.div
            style={{ y: y1 }}
            className="relative group"
          >
            <div className="glass-card rounded-2xl overflow-hidden aspect-[3/4] sm:aspect-[4/5]">
              <img
                src={msoeSunset}
                alt="MSOE Campus at Sunset"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-semibold text-lg">MSOE Campus</p>
                  <p className="text-white/80 text-sm">Milwaukee School of Engineering</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image 2 - Center (Your Picture) - Larger */}
          <motion.div
            style={{ y: y2 }}
            className="relative group"
          >
            <div className="glass-card rounded-2xl overflow-hidden aspect-[3/4]">
              <img
                src={profPort}
                alt="Oliver Grudzinski"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-semibold text-lg">Oliver Grudzinski</p>
                  <p className="text-white/80 text-sm">Full Stack Engineer</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image 3 - Right */}
          <motion.div
            style={{ y: y3 }}
            className="relative group"
          >
            <div className="glass-card rounded-2xl overflow-hidden aspect-[3/4] sm:aspect-[4/5]">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-8">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 mx-auto mb-6"
                  >
                    <div className="w-full h-full rounded-full border-4 border-primary border-t-transparent"></div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Always Learning</h3>
                  <p className="text-muted-foreground">
                    Continuously exploring new technologies and pushing boundaries
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxImages;

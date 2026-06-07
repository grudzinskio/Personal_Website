import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import projectsData from '../../data/projects.json';

const featuredProjectIds = [11, 10, 12, 1, 7, 8, 9, 2, 4, 3];
const featuredProjects = featuredProjectIds
  .map((id) => projectsData.projects.find((project) => project.id === id))
  .filter(Boolean);

const slider1Images = featuredProjects.slice(0, 5);
const slider2Images = featuredProjects.slice(5, 10);

/**
 * SlidingImages - Horizontal parallax image slider at the bottom
 * Clickable images that navigate to the Projects page
 */
const SlidingImages = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create horizontal slide effect - opposite directions
  const x1 = useTransform(scrollYProgress, [0, 1], ["-25%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);

  const handleImageClick = () => {
    navigate('/projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative py-20 sm:py-24 md:py-32 overflow-x-hidden bg-transparent">
      <div className="mb-12 sm:mb-16 text-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          Featured <span className="text-gradient-animated">Work</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Click any image to explore all projects
        </p>
      </div>

      {/* Full-bleed rows — break out of any parent padding */}
      <div className="space-y-6 sm:space-y-8 w-screen relative left-1/2 -translate-x-1/2">
        {/* First sliding row - moves left */}
        <motion.div
          style={{ x: shouldReduceMotion ? 0 : x1 }}
          className="flex gap-4 sm:gap-6 will-change-transform"
        >
          {slider1Images.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05, y: -8 }}
              className="flex-shrink-0 rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all cursor-pointer group relative"
              style={{ width: 'calc(27vw)', minWidth: '280px', height: 'calc(27vw * 0.75)', minHeight: '210px' }}
              onClick={handleImageClick}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{project.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Second sliding row - moves right */}
        <motion.div
          style={{ x: shouldReduceMotion ? 0 : x2 }}
          className="flex gap-4 sm:gap-6 will-change-transform"
        >
          {slider2Images.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05, y: -8 }}
              className="flex-shrink-0 rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all cursor-pointer group relative"
              style={{ width: 'calc(27vw)', minWidth: '280px', height: 'calc(27vw * 0.75)', minHeight: '210px' }}
              onClick={handleImageClick}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{project.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SlidingImages;

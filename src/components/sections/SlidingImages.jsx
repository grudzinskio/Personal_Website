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
    <section ref={containerRef} className="page-section overflow-x-hidden bg-transparent">
      <div className="section-header mb-12 sm:mb-16">
        <p className="section-eyebrow">Projects</p>
        <h2 className="section-title-compact mt-6">
          Selected <span className="text-gradient-warm">work.</span>
        </h2>
        <p className="section-copy">
          Click any image to explore all projects.
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
              className="flex-shrink-0 rounded-xl overflow-hidden border border-white/10 hover:border-sky-300/40 transition-all cursor-pointer group relative"
              style={{ width: 'calc(25vw)', minWidth: '300px', maxWidth: '520px', height: 'calc(25vw * 0.72)', minHeight: '216px', maxHeight: '374px' }}
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
              className="flex-shrink-0 rounded-xl overflow-hidden border border-white/10 hover:border-sky-300/40 transition-all cursor-pointer group relative"
              style={{ width: 'calc(25vw)', minWidth: '300px', maxWidth: '520px', height: 'calc(25vw * 0.72)', minHeight: '216px', maxHeight: '374px' }}
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

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * SlidingImages - Horizontal parallax image slider at the bottom
 * Clickable images that navigate to the Projects page
 */
const SlidingImages = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create horizontal slide effect - opposite directions
  const x1 = useTransform(scrollYProgress, [0, 1], ["-25%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);

  // Image sets for two rows
  const slider1Images = [
    { src: "/projects/CPAproject.jpg", alt: "AI CPA Project" },
    { src: "/projects/MARLProject.png", alt: "MARL Project" },
    { src: "/projects/QAProject.jpg", alt: "QA Assistant" },
    { src: "/projects/PhotoSynProject.png", alt: "Photosynthesizers" },
  ];

  const slider2Images = [
    { src: "/projects/DiabetesProject.png", alt: "Diabetes Prediction" },
    { src: "/projects/WordleProject.png", alt: "Wordle Game" },
    { src: "/projects/ActionsProject.png", alt: "Automated Documentation" },
    { src: "/projects/PersonalWebsite.png", alt: "Personal Website" },
  ];

  const handleImageClick = () => {
    navigate('/projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-background">
      <div className="mb-16 text-center px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Featured <span className="text-gradient-animated">Work</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Click any image to explore all projects
        </p>
      </div>

      <div className="space-y-8">
        {/* First sliding row - moves left */}
        <motion.div
          style={{ x: x1 }}
          className="flex gap-6 will-change-transform"
        >
          {slider1Images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -8 }}
              className="flex-shrink-0 w-[400px] h-[300px] rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all cursor-pointer group"
              onClick={handleImageClick}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Duplicate for seamless loop effect */}
          {slider1Images.map((image, index) => (
            <motion.div
              key={`dup-${index}`}
              whileHover={{ scale: 1.05, y: -8 }}
              className="flex-shrink-0 w-[400px] h-[300px] rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all cursor-pointer group"
              onClick={handleImageClick}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Second sliding row - moves right */}
        <motion.div
          style={{ x: x2 }}
          className="flex gap-6 will-change-transform"
        >
          {slider2Images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -8 }}
              className="flex-shrink-0 w-[400px] h-[300px] rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all cursor-pointer group"
              onClick={handleImageClick}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Duplicate for seamless loop effect */}
          {slider2Images.map((image, index) => (
            <motion.div
              key={`dup-${index}`}
              whileHover={{ scale: 1.05, y: -8 }}
              className="flex-shrink-0 w-[400px] h-[300px] rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all cursor-pointer group"
              onClick={handleImageClick}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{image.alt}</p>
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

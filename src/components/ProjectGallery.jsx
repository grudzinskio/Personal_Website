import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHorizontalParallax } from '../animations/scrollAnimations';
import { createStaggerFadeIn } from '../animations/textAnimations';
import projectsData from '../data/projects.json';

export const ProjectGallery = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const buttonRef = useRef(null);

  // Get first 8 projects
  const projects = projectsData.projects.slice(0, 8);
  const topRowProjects = projects.slice(0, 4);
  const bottomRowProjects = projects.slice(4, 8);

  useEffect(() => {
    if (!topRowRef.current || !bottomRowRef.current || !containerRef.current) return;

    const animations = [];

    // Top row - smoother horizontal parallax to the right
    const topRowAnim = createHorizontalParallax(topRowRef.current, {
      direction: 'right',
      distance: 150,
      scrub: 1.5,
      start: 'top bottom',
      end: 'bottom top'
    });
    if (topRowAnim) animations.push(topRowAnim);

    // Bottom row - smoother horizontal parallax to the left
    const bottomRowAnim = createHorizontalParallax(bottomRowRef.current, {
      direction: 'left',
      distance: 150,
      scrub: 1.5,
      start: 'top bottom',
      end: 'bottom top'
    });
    if (bottomRowAnim) animations.push(bottomRowAnim);

    // Button smooth fade and scale in
    if (buttonRef.current) {
      const buttonAnim = createStaggerFadeIn([buttonRef.current], {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0,
        ease: 'power3.out',
        start: 'top 90%'
      });
      animations.push(...buttonAnim);
    }

    return () => {
      animations.forEach(anim => {
        if (anim && anim.kill) anim.kill();
        if (anim && anim.scrollTrigger) anim.scrollTrigger.kill();
      });
    };
  }, []);

  const handleProjectClick = (project) => {
    // Navigate to projects page or open project details
    navigate('/projects');
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-8 px-4 bg-background overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Top Row - Slides Right */}
        <div 
          ref={topRowRef}
          className="flex gap-4 md:gap-6 mb-4 md:mb-6 will-change-transform overflow-x-auto md:overflow-visible scrollbar-hide"
        >
          {topRowProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="group relative flex-shrink-0 w-[180px] h-[160px] sm:w-[200px] sm:h-[180px] md:w-[220px] md:h-[190px] lg:w-[240px] lg:h-[200px] rounded-lg overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleProjectClick(project);
                }
              }}
              aria-label={`View ${project.title}`}
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  {project.status && (
                    <p className="text-xs md:text-sm text-white/90 mb-2">
                      {project.status}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row - Slides Left */}
        <div 
          ref={bottomRowRef}
          className="flex gap-4 md:gap-6 will-change-transform overflow-x-auto md:overflow-visible scrollbar-hide"
        >
          {bottomRowProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="group relative flex-shrink-0 w-[180px] h-[160px] sm:w-[200px] sm:h-[180px] md:w-[220px] md:h-[190px] lg:w-[240px] lg:h-[200px] rounded-lg overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleProjectClick(project);
                }
              }}
              aria-label={`View ${project.title}`}
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  {project.status && (
                    <p className="text-xs md:text-sm text-white/90 mb-2">
                      {project.status}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <button
            ref={buttonRef}
            onClick={() => navigate('/projects')}
            className="group relative px-6 md:px-8 py-3 md:py-4 text-white text-base md:text-lg font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            style={{
              background: 'linear-gradient(90deg, #7c3aed, #2563eb, #06b6d4, #2563eb, #7c3aed)',
              backgroundSize: '300% 100%',
              animation: 'gradient-slide 4s ease infinite'
            }}
          >
            {/* Button shine effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                transform: 'translateX(-100%)',
                animation: 'shine 2s infinite'
              }}
              aria-hidden="true"
            />
            
            <span className="relative z-10 flex items-center gap-2">
              View All Projects
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;




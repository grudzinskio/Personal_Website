import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Code, Briefcase, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navigationSections = [
  {
    id: 'about',
    title: 'About',
    description: 'Learn more about my background, education, and journey in tech',
    icon: User,
    path: '/about',
    gradient: 'from-purple-600 to-blue-600'
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'Explore my technical expertise and proficiencies',
    icon: Code,
    path: '/skills',
    gradient: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'View my portfolio of projects and accomplishments',
    icon: Briefcase,
    path: '/projects',
    gradient: 'from-cyan-600 to-teal-600'
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Get in touch and let\'s connect',
    icon: Mail,
    path: '/contact',
    gradient: 'from-teal-600 to-green-600'
  }
];

export const NavigationPanels = () => {
  const navigate = useNavigate();
  const panelsContainerRef = useRef(null);
  const panelRefs = useRef([]);

  useEffect(() => {
    const panels = panelRefs.current;
    
    if (panels.length === 0) return;

    // Create ScrollTrigger animation for panels
    const ctx = gsap.context(() => {
      panels.forEach((panel, index) => {
        gsap.fromTo(
          panel,
          {
            x: '100%',
            opacity: 0
          },
          {
            x: '0%',
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panelsContainerRef.current,
              start: 'top 60%',
              end: 'top 20%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.2
          }
        );
      });
    }, panelsContainerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handlePanelClick = (path) => {
    navigate(path);
  };

  return (
    <section 
      ref={panelsContainerRef}
      className="relative w-full py-20 px-4 md:px-8 bg-background"
    >
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Explore My Work
        </h2>
        <p className="text-lg md:text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Click on any section below to dive deeper into my experience and expertise
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {navigationSections.map((section, index) => {
            const Icon = section.icon;
            
            return (
              <div
                key={section.id}
                ref={(el) => (panelRefs.current[index] = el)}
                onClick={() => handlePanelClick(section.path)}
                className="group relative h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handlePanelClick(section.path);
                  }
                }}
                aria-label={`Navigate to ${section.title} page`}
              >
                {/* Gradient Background */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
                  aria-hidden="true"
                />

                {/* Overlay with subtle pattern */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                  }}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center text-white z-10">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Icon className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-3">
                    {section.title}
                  </h3>
                  
                  <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-sm">
                    {section.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-6 right-6 transform group-hover:translate-x-2 transition-transform duration-300">
                    <svg 
                      className="w-8 h-8 text-white/80" 
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
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                    transform: 'translateX(-100%)',
                    animation: 'shine 2s infinite'
                  }}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};






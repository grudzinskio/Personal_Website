import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import RoundedButton from './animations/RoundedButton';

const slider1 = [
  {
    color: 'white',
    src: '/projects/PhotoSynProject.png'
  },
  {
    color: 'white',
    src: '/projects/MARLProject.png'
  },
  {
    color: '#21242b',
    src: '/projects/DiabetesProject.png'
  },
  {
    color: '#21242b',
    src: '/projects/ActionsProject.png'
  }
];

const slider2 = [
  {
    color: '#d4e3ec',
    src: '/projects/CPAproject.jpg'
  },
  {
    color: '#9289BD',
    src: '/projects/QAProject.jpg'
  },
  {
    color: 'white',
    src: '/projects/WordleProject.png'
  },
  {
    color: 'white',
    src: '/projects/PosterManagement.png'
  }
];

export default function SlidingImages() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div
      ref={container}
      className="relative z-10 mt-[200px] flex flex-col gap-[3vw] bg-background"
    >
      <motion.div
        style={{ x: x1 }}
        className="relative left-[-10vw] flex w-[300vw] gap-4 sm:w-[120vw] sm:gap-12"
      >
        {slider1.map((project, index) => (
          <div
            key={index}
            className="flex h-60 w-1/2 items-center justify-center shadow-lg sm:h-80 sm:w-1/4"
            style={{ backgroundColor: project.color }}
          >
            <motion.div
              className="relative h-full w-full cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/projects" className="block h-full w-full">
                <img
                  alt="project"
                  src={project.src}
                  className="w-full h-full object-contain transition-all duration-300"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 rounded-lg" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary transition-all duration-300 rounded-lg" />
              </Link>
            </motion.div>
          </div>
        ))}
      </motion.div>
      <motion.div
        style={{ x: x2 }}
        className="relative left-[-10vw] flex w-[300vw] gap-6 sm:w-[120vw] sm:gap-12"
      >
        {slider2.map((project, index) => (
          <div
            key={index}
            className="flex h-60 w-3/4 items-center justify-center sm:h-80 sm:w-1/4"
            style={{ backgroundColor: project.color }}
          >
            <motion.div
              className="relative h-full w-full shadow-lg cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/projects" className="block h-full w-full">
                <img
                  src={project.src}
                  alt="project"
                  className="w-full h-full object-contain transition-all duration-300"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 rounded-lg" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary transition-all duration-300 rounded-lg" />
              </Link>
            </motion.div>
          </div>
        ))}
      </motion.div>
      <div className="flex w-full justify-center my-12">
        <a href="/projects">
          <RoundedButton backgroundColor="bg-primary">View Projects</RoundedButton>
        </a>
      </div>
    </div>
  );
}


import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import RoundedButton from './animations/RoundedButton';

const slideUp = {
  initial: {
    y: '100%'
  },
  open: (i) => ({
    y: '0%',
    transition: { duration: 0.5, delay: 0.01 * i }
  }),
  closed: {
    y: '100%',
    transition: { duration: 0.5 }
  }
};

const opacity = {
  initial: {
    opacity: 0
  },
  open: {
    opacity: 1,
    transition: { duration: 0.5 }
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.5 }
  }
};

export default function Description() {
  const phrase1 =
    'A junior at Milwaukee School of Engineering with internship experience building full stack web applications and practical AI/ML solutions.';

  const phrase2 =
    'Passionate about innovation and cutting-edge technology. I believe in combining engineering with creativity to build transformative solutions.';
  
  const description = useRef(null);
  const isInView = useInView(description);

  return (
    <div
      ref={description}
      className="relative flex flex-col justify-center gap-12 p-8 sm:mt-[200px] sm:flex-row sm:p-20"
    >
      <div className="space-y-4">
        <p className="m-0 gap-2 leading-snug text-2xl sm:text-4xl">
          {phrase1.split(' ').map((word, index) => (
            <span
              key={index}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
              <motion.span
                variants={slideUp}
                custom={index}
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
        <p className="m-0 gap-2 leading-snug text-2xl sm:text-4xl">
          {phrase2.split(' ').map((word, index) => (
            <span
              key={index}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
              <motion.span
                variants={slideUp}
                custom={index}
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
      </div>
      <div className="sm:min-w-[300px]">
        <motion.p
          variants={opacity}
          animate={isInView ? 'open' : 'closed'}
          className="m-0 pb-3 font-light text-base sm:text-lg"
        >
          Currently focused on full-stack development, machine learning, and system design.
        </motion.p>
        <motion.p
          variants={opacity}
          animate={isInView ? 'open' : 'closed'}
          className="m-0 text-base sm:text-lg font-light"
        >
          My projects have received awards at hackathons, and I'm always 
          looking for innovative ways to solve real-world problems with technology.
        </motion.p>
        <div data-scroll-speed={0.1} className="mt-8">
          <a href="/about">
            <RoundedButton 
              className="h-[100px] w-[100px] sm:h-[180px] sm:w-[180px] text-sm sm:text-base"
              backgroundColor="bg-red-600"
            >
              About me
            </RoundedButton>
          </a>
        </div>
      </div>
    </div>
  );
}


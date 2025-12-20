/**
 * Intersection Observer-based fade-in animations
 * Lightweight alternative to GSAP for simple fade effects
 */

/**
 * Create an intersection observer for fade-in animations
 * @param {Object} options - Configuration options
 * @returns {IntersectionObserver} Observer instance
 */
export const createFadeInObserver = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    onIntersect = () => {}
  } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          onIntersect(entry.target);
        }
      });
    },
    {
      threshold,
      rootMargin
    }
  );

  return observer;
};

/**
 * Apply fade-in animation to elements
 * @param {string|NodeList|Array} elements - Elements to animate
 * @param {Object} options - Animation options
 * @returns {IntersectionObserver} Observer instance
 */
export const fadeInOnScroll = (elements, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = true, // Only animate once
    delay = 0, // Delay in ms
    stagger = 0 // Stagger delay between elements in ms
  } = options;

  const elementsArray = typeof elements === 'string' 
    ? document.querySelectorAll(elements)
    : elements;

  if (!elementsArray || elementsArray.length === 0) return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const totalDelay = delay + (stagger * index);
          
          setTimeout(() => {
            entry.target.classList.add('fade-in-visible');
            entry.target.classList.remove('fade-in-hidden');
          }, totalDelay);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          // If not 'once', reverse the animation when scrolling back up
          entry.target.classList.remove('fade-in-visible');
          entry.target.classList.add('fade-in-hidden');
        }
      });
    },
    {
      threshold,
      rootMargin
    }
  );

  elementsArray.forEach((element) => {
    // Add initial hidden state
    element.classList.add('fade-in-hidden');
    observer.observe(element);
  });

  return observer;
};

/**
 * Slide and fade in animation
 * @param {string|NodeList|Array} elements - Elements to animate
 * @param {Object} options - Animation options
 * @returns {IntersectionObserver} Observer instance
 */
export const slideInOnScroll = (elements, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    direction = 'up', // 'up', 'down', 'left', 'right'
    once = true,
    delay = 0,
    stagger = 0
  } = options;

  const elementsArray = typeof elements === 'string' 
    ? document.querySelectorAll(elements)
    : elements;

  if (!elementsArray || elementsArray.length === 0) return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const totalDelay = delay + (stagger * index);
          
          setTimeout(() => {
            entry.target.classList.add('slide-in-visible');
          }, totalDelay);

          if (once) {
            observer.unobserve(entry.target);
          }
        }
      });
    },
    {
      threshold,
      rootMargin
    }
  );

  elementsArray.forEach((element) => {
    element.classList.add('slide-in-hidden', `slide-from-${direction}`);
    observer.observe(element);
  });

  return observer;
};

/**
 * Scale and fade in animation
 * @param {string|NodeList|Array} elements - Elements to animate
 * @param {Object} options - Animation options
 * @returns {IntersectionObserver} Observer instance
 */
export const scaleInOnScroll = (elements, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = true,
    delay = 0,
    stagger = 0
  } = options;

  const elementsArray = typeof elements === 'string' 
    ? document.querySelectorAll(elements)
    : elements;

  if (!elementsArray || elementsArray.length === 0) return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const totalDelay = delay + (stagger * index);
          
          setTimeout(() => {
            entry.target.classList.add('scale-in-visible');
          }, totalDelay);

          if (once) {
            observer.unobserve(entry.target);
          }
        }
      });
    },
    {
      threshold,
      rootMargin
    }
  );

  elementsArray.forEach((element) => {
    element.classList.add('scale-in-hidden');
    observer.observe(element);
  });

  return observer;
};

/**
 * Cleanup observer
 * @param {IntersectionObserver} observer - Observer to disconnect
 */
export const cleanupObserver = (observer) => {
  if (observer) {
    observer.disconnect();
  }
};

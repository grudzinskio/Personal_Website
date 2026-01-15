import Lenis from 'lenis';

let lenis = null;

/**
 * Initialize Lenis smooth scrolling for the entire page
 * Returns a cleanup function to destroy Lenis instance
 * Optimized for 60fps performance
 */
export const initSmoothScroll = () => {
  // Prevent multiple instances
  if (lenis) {
    lenis.destroy();
  }

  // Optimize for mobile - completely disable Lenis on small devices
  const isMobile = window.innerWidth < 768;
  
  // Create new Lenis instance with optimized settings
  // Only initialize on desktop/tablet (not mobile)
  if (!isMobile) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.7, // Reduced to prevent overshoot
      smoothTouch: false, // Disable on touch for native feel
      touchMultiplier: 2,
      infinite: false,
      syncTouch: false,
    });
  }

  // Animation loop
  const animate = (time) => {
    if (lenis) {
      lenis.raf(time);
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);

  // Return cleanup function
  return () => {
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
  };
};

/**
 * Get the current Lenis instance
 */
export const getLenis = () => lenis;

/**
 * Scroll to a specific element smoothly using Lenis
 * @param {string|HTMLElement} target - CSS selector or DOM element
 * @param {Object} options - Scroll options
 */
export const scrollToElement = (target, options = {}) => {
  if (!lenis) {
    console.warn('Lenis not initialized. Call initSmoothScroll() first.');
    return;
  }

  const {
    offset = 0,
    duration = 1.5,
    easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    immediate = false,
  } = options;

  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!element) {
    console.warn(`Element not found: ${target}`);
    return;
  }

  lenis.scrollTo(element, {
    offset,
    duration: immediate ? 0 : duration,
    easing,
  });
};

/**
 * Scroll to a specific position
 * @param {number} position - Y position to scroll to
 * @param {Object} options - Scroll options
 */
export const scrollToPosition = (position, options = {}) => {
  if (!lenis) {
    console.warn('Lenis not initialized. Call initSmoothScroll() first.');
    return;
  }

  const {
    duration = 1.5,
    easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    immediate = false,
  } = options;

  lenis.scrollTo(position, {
    duration: immediate ? 0 : duration,
    easing,
  });
};

/**
 * Stop smooth scrolling
 */
export const stopScroll = () => {
  if (lenis) {
    lenis.stop();
  }
};

/**
 * Start smooth scrolling
 */
export const startScroll = () => {
  if (lenis) {
    lenis.start();
  }
};

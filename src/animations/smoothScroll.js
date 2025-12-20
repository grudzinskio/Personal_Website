import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let rafCallback = null;

/**
 * Initialize Lenis smooth scrolling for the entire page
 * Returns a cleanup function to destroy Lenis instance
 */
export const initSmoothScroll = () => {
  // Prevent multiple instances
  if (lenis) {
    lenis.destroy();
  }

  // Create new Lenis instance with optimal settings
  lenis = new Lenis({
    duration: 1.2,        // Scroll duration for smooth momentum
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing function
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,   // Disable on touch devices for native feel
    touchMultiplier: 2,
    infinite: false,
  });

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Store the callback reference for proper cleanup
  rafCallback = (time) => {
    lenis.raf(time * 1000);
  };

  // Integrate Lenis with GSAP ticker for smooth animations
  gsap.ticker.add(rafCallback);

  // Disable lag smoothing for better sync
  gsap.ticker.lagSmoothing(0);

  // Return cleanup function
  return () => {
    if (lenis) {
      // Remove the correct callback reference from ticker
      if (rafCallback) {
        gsap.ticker.remove(rafCallback);
        rafCallback = null;
      }
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

/**
 * Create a scroll-triggered animation sequence
 * @param {string} trigger - Element that triggers the animation
 * @param {Object} config - GSAP ScrollTrigger configuration
 */
export const createScrollTrigger = (trigger, config = {}) => {
  return ScrollTrigger.create({
    trigger,
    start: 'top center',
    end: 'bottom center',
    ...config
  });
};

/**
 * Add smooth reveal animation on scroll
 * @param {string} selector - CSS selector for elements to animate
 * @param {Object} options - Animation options
 */
export const addScrollReveal = (selector, options = {}) => {
  const {
    y = 50,
    opacity = 0,
    duration = 0.8,
    stagger = 0.1,
    ease = 'power2.out',
    start = 'top 80%'
  } = options;

  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element, index) => {
    gsap.fromTo(
      element,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        ease,
        delay: stagger * index,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none none'
        }
      }
    );
  });
};

/**
 * Cleanup all ScrollTriggers
 */
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

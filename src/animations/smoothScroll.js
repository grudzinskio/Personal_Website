import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize smooth scrolling for the entire page
 * Uses GSAP ScrollSmoother for butter-smooth scrolling experience
 */
export const initSmoothScroll = () => {
  // Enable smooth scrolling with custom easing
  gsap.to({}, {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });
};

/**
 * Scroll to a specific section with smooth animation
 * @param {string} selector - CSS selector of the target element
 * @param {number} duration - Animation duration in seconds (default: 1.5)
 * @param {number} offset - Offset from top in pixels (default: 0)
 */
export const scrollToSection = (selector, duration = 1.5, offset = 0) => {
  const target = document.querySelector(selector);
  if (!target) {
    console.warn(`Element with selector "${selector}" not found`);
    return;
  }

  gsap.to(window, {
    duration,
    scrollTo: {
      y: target,
      offsetY: offset
    },
    ease: 'power3.inOut'
  });
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
  
  elements.forEach((element) => {
    gsap.fromTo(
      element,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        ease,
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

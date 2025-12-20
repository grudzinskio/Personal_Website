import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Apply parallax effect to an element
 * @param {string|HTMLElement} element - Element or selector to animate
 * @param {Object} options - Parallax configuration
 */
export const applyParallax = (element, options = {}) => {
  const {
    speed = 0.5, // 0-1, lower = slower movement
    direction = 'vertical', // 'vertical' or 'horizontal'
    scale = false, // Apply scale transformation
    scaleAmount = 1.2,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1
  } = options;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const animation = {};
  
  if (direction === 'vertical') {
    animation.y = `${speed * 100}%`;
  } else {
    animation.x = `${speed * 100}%`;
  }

  if (scale) {
    animation.scale = scaleAmount;
  }

  return gsap.to(el, {
    ...animation,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start,
      end,
      scrub,
      invalidateOnRefresh: true
    }
  });
};

/**
 * Create a parallax video background effect
 * Slightly zooms and moves the video as user scrolls
 * @param {string|HTMLElement} videoElement - Video element or selector
 */
export const videoParallax = (videoElement) => {
  const video = typeof videoElement === 'string' 
    ? document.querySelector(videoElement) 
    : videoElement;
    
  if (!video) return;

  return gsap.fromTo(
    video,
    {
      scale: 1,
      y: 0
    },
    {
      scale: 1.1,
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: video.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true
      }
    }
  );
};

/**
 * Apply multi-layer parallax effect for depth
 * @param {Array} layers - Array of {element, speed} objects
 */
export const multiLayerParallax = (layers) => {
  const animations = [];
  
  layers.forEach(({ element, speed = 0.5 }) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const anim = gsap.to(el, {
      y: `${speed * 100}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
    
    animations.push(anim);
  });

  return animations;
};

/**
 * Fade in/out effect on scroll
 * @param {string|HTMLElement} element - Element or selector
 * @param {Object} options - Configuration
 */
export const scrollFade = (element, options = {}) => {
  const {
    fadeIn = true,
    fadeOut = true,
    start = 'top center',
    end = 'bottom center'
  } = options;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const initialOpacity = fadeIn ? 0 : 1;
  const finalOpacity = fadeOut ? 0 : 1;

  return gsap.fromTo(
    el,
    { opacity: initialOpacity },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: 1,
        toggleActions: fadeOut ? 'play none none reverse' : 'play none none none'
      }
    }
  );
};

/**
 * Cleanup parallax effects
 * @param {Array} animations - Array of GSAP animations to kill
 */
export const cleanupParallax = (animations) => {
  if (Array.isArray(animations)) {
    animations.forEach(anim => anim && anim.kill && anim.kill());
  }
};

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a pin animation that keeps an element fixed during scroll
 * Inspired by the sample code's pinning behavior
 * @param {HTMLElement|string} element - Element to pin
 * @param {Object} options - Pin options
 * @returns {ScrollTrigger} - ScrollTrigger instance
 */
export const createPinAnimation = (element, options = {}) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  
  if (!el) {
    console.warn('Element not found for pin animation');
    return null;
  }

  const {
    start = 'top top',
    end = null,
    endTrigger = null,
    pinSpacing = true,
    markers = false,
    anticipatePin = 1
  } = options;

  const trigger = ScrollTrigger.create({
    trigger: el,
    pin: true,
    start: start,
    end: end,
    endTrigger: endTrigger,
    pinSpacing: pinSpacing,
    markers: markers,
    anticipatePin: anticipatePin
  });

  return trigger;
};

/**
 * Creates an image parallax effect with smooth scrolling
 * @param {HTMLElement|string} element - Image element
 * @param {Object} options - Parallax options
 * @returns {Object} - GSAP animation
 */
export const createImageParallax = (element, options = {}) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  
  if (!el) {
    console.warn('Element not found for image parallax');
    return null;
  }

  const {
    speed = 0.5,           // Speed multiplier (negative for reverse)
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
    scale = 1.2,           // Scale for parallax depth
    ease = 'none',
    markers = false
  } = options;

  // Set initial scale if provided
  if (scale !== 1) {
    gsap.set(el, { scale: scale });
  }

  const yPercent = speed * 100;

  const animation = gsap.fromTo(
    el,
    { yPercent: -yPercent },
    {
      yPercent: yPercent,
      ease: ease,
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: start,
        end: end,
        scrub: scrub,
        markers: markers
      }
    }
  );

  return animation;
};

/**
 * Creates a scale animation triggered by scroll
 * Inspired by the intro.tsx scaling behavior
 * @param {HTMLElement|string} element - Element to scale
 * @param {Object} options - Scale options
 * @returns {gsap.core.Timeline} - GSAP timeline
 */
export const createScaleOnScroll = (element, options = {}) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  
  if (!el) {
    console.warn('Element not found for scale animation');
    return null;
  }

  const {
    fromScale = 0.8,
    toScale = 1,
    start = 'top top',
    end = '+=500px',
    scrub = true,
    ease = 'power2.out',
    markers = false,
    onUpdate = null
  } = options;

  // Set initial scale
  gsap.set(el, { scale: fromScale });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: document.documentElement,
      start: start,
      end: end,
      scrub: scrub,
      markers: markers,
      onUpdate: onUpdate
    }
  });

  timeline.to(el, {
    scale: toScale,
    ease: ease
  });

  return timeline;
};

/**
 * Creates a fade and slide out animation on scroll
 * @param {HTMLElement|string} element - Element to animate
 * @param {Object} options - Animation options
 * @returns {gsap.core.Timeline} - GSAP timeline
 */
export const createFadeSlideOut = (element, options = {}) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  
  if (!el) {
    console.warn('Element not found for fade slide out');
    return null;
  }

  const {
    height = 20,
    top = '-100%',
    start = 'top top',
    end = '+=500px',
    scrub = true,
    ease = 'power2.out',
    markers = false
  } = options;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: document.documentElement,
      start: start,
      end: end,
      scrub: scrub,
      markers: markers
    }
  });

  timeline.to(el, {
    height: height,
    top: top,
    ease: ease
  });

  return timeline;
};

/**
 * Creates a horizontal scroll parallax effect
 * @param {HTMLElement|string} element - Element to scroll horizontally
 * @param {Object} options - Scroll options
 * @returns {Object} - GSAP animation
 */
export const createHorizontalParallax = (element, options = {}) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  
  if (!el) {
    console.warn('Element not found for horizontal parallax');
    return null;
  }

  const {
    direction = 'left',    // 'left' or 'right'
    distance = 150,        // Distance to travel in pixels
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
    markers = false
  } = options;

  const directionMultiplier = direction === 'left' ? -1 : 1;
  const fromX = distance * directionMultiplier;
  const toX = -distance * directionMultiplier;

  const animation = gsap.fromTo(
    el,
    { x: fromX },
    {
      x: toX,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: start,
        end: end,
        scrub: scrub,
        markers: markers
      }
    }
  );

  return animation;
};

/**
 * Creates a rotation animation on scroll
 * @param {HTMLElement|string} element - Element to rotate
 * @param {Object} options - Rotation options
 * @returns {Object} - GSAP animation
 */
export const createRotateOnScroll = (element, options = {}) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  
  if (!el) {
    console.warn('Element not found for rotate animation');
    return null;
  }

  const {
    rotation = 360,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
    ease = 'none',
    markers = false
  } = options;

  const animation = gsap.to(el, {
    rotation: rotation,
    ease: ease,
    scrollTrigger: {
      trigger: el,
      start: start,
      end: end,
      scrub: scrub,
      markers: markers
    }
  });

  return animation;
};

/**
 * Creates a progress-based animation with custom callback
 * @param {Object} options - Animation options
 * @returns {ScrollTrigger} - ScrollTrigger instance
 */
export const createProgressAnimation = (options = {}) => {
  const {
    trigger = document.documentElement,
    start = 'top top',
    end = 'bottom bottom',
    scrub = true,
    markers = false,
    onUpdate = null,
    onEnter = null,
    onLeave = null
  } = options;

  const scrollTrigger = ScrollTrigger.create({
    trigger: trigger,
    start: start,
    end: end,
    scrub: scrub,
    markers: markers,
    onUpdate: onUpdate,
    onEnter: onEnter,
    onLeave: onLeave
  });

  return scrollTrigger;
};

/**
 * Creates a stagger reveal for cards or grid items
 * @param {string|NodeList} elements - Elements to animate
 * @param {Object} options - Animation options
 * @returns {Array} - Array of animations
 */
export const createCardStaggerReveal = (elements, options = {}) => {
  const {
    y = 60,
    opacity = 0,
    scale = 0.95,
    duration = 0.8,
    stagger = 0.15,
    ease = 'power2.out',
    start = 'top 85%',
    markers = false
  } = options;

  const elementArray = typeof elements === 'string' 
    ? document.querySelectorAll(elements)
    : elements;

  if (!elementArray || elementArray.length === 0) return [];

  // Set initial state
  gsap.set(elementArray, { 
    opacity: opacity, 
    y: y,
    scale: scale
  });

  const animation = gsap.to(elementArray, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: duration,
    stagger: stagger,
    ease: ease,
    scrollTrigger: {
      trigger: elementArray[0].parentElement,
      start: start,
      markers: markers,
      toggleActions: 'play none none none'
    }
  });

  return animation;
};

/**
 * Creates a smooth opacity fade based on scroll position
 * @param {HTMLElement|string} element - Element to fade
 * @param {Object} options - Fade options
 * @returns {Object} - GSAP animation
 */
export const createOpacityFade = (element, options = {}) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  
  if (!el) {
    console.warn('Element not found for opacity fade');
    return null;
  }

  const {
    fromOpacity = 1,
    toOpacity = 0,
    start = 'top top',
    end = 'bottom top',
    scrub = 1,
    markers = false
  } = options;

  gsap.set(el, { opacity: fromOpacity });

  const animation = gsap.to(el, {
    opacity: toOpacity,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: start,
      end: end,
      scrub: scrub,
      markers: markers
    }
  });

  return animation;
};

/**
 * Creates a magnetic scroll effect that "pulls" the scroll towards a section
 * @param {HTMLElement|string} element - Element to apply magnetic effect to
 * @param {Object} options - Magnetic scroll options
 * @returns {ScrollTrigger} - ScrollTrigger instance
 */
export const createMagneticScroll = (element, options = {}) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  
  if (!el) {
    console.warn('Element not found for magnetic scroll');
    return null;
  }

  const {
    strength = 0.3,        // Magnetic strength (0-1)
    snapDuration = 0.8,    // Duration of snap animation
    snapEase = 'power2.inOut',
    threshold = 0.3,       // How close to trigger the snap (0-1)
    markers = false
  } = options;

  let isSnapping = false;

  const trigger = ScrollTrigger.create({
    trigger: el,
    start: 'top bottom',
    end: 'bottom top',
    markers: markers,
    onUpdate: (self) => {
      // Only apply magnetic effect when scrolling through the middle area
      const progress = self.progress;
      
      // Magnetic zone is around the middle (0.3 to 0.7)
      if (progress > threshold && progress < (1 - threshold) && !isSnapping) {
        // Calculate distance from center
        const distanceFromCenter = Math.abs(0.5 - progress);
        
        // If we're close enough to center, apply gentle pull
        if (distanceFromCenter < 0.2) {
          isSnapping = true;
          
          // Smooth snap to center of the section
          gsap.to(window, {
            scrollTo: {
              y: el,
              offsetY: window.innerHeight / 2 - el.offsetHeight / 2
            },
            duration: snapDuration,
            ease: snapEase,
            onComplete: () => {
              isSnapping = false;
            }
          });
        }
      }
    }
  });

  return trigger;
};

/**
 * Creates a velocity-based magnetic scroll effect (more subtle)
 * Slows down scroll velocity when near the target section
 * @param {HTMLElement|string} element - Element to apply effect to
 * @param {Function} lenisInstance - Lenis instance getter function
 * @param {Object} options - Effect options
 * @returns {ScrollTrigger} - ScrollTrigger instance
 */
export const createScrollVelocityZone = (element, lenisInstance, options = {}) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  
  if (!el) {
    console.warn('Element not found for velocity zone');
    return null;
  }

  const {
    slowdownFactor = 0.5,  // How much to slow down (0-1, lower = slower)
    zoneSize = 0.3,        // Size of the slow zone (0-1)
    markers = false
  } = options;

  const trigger = ScrollTrigger.create({
    trigger: el,
    start: 'top bottom',
    end: 'bottom top',
    markers: markers,
    onUpdate: (self) => {
      const lenis = lenisInstance();
      if (!lenis) return;

      const progress = self.progress;
      
      // Create a slow zone in the middle of the section
      const distanceFromCenter = Math.abs(0.5 - progress);
      
      if (distanceFromCenter < zoneSize) {
        // Calculate slowdown based on distance from center
        const slowdownAmount = 1 - (distanceFromCenter / zoneSize) * (1 - slowdownFactor);
        
        // Apply velocity modification
        lenis.options.lerp = 0.1 * slowdownAmount;
      } else {
        // Reset to normal speed
        lenis.options.lerp = 0.1;
      }
    },
    onLeave: () => {
      const lenis = lenisInstance();
      if (lenis) lenis.options.lerp = 0.1;
    }
  });

  return trigger;
};

/**
 * Cleans up all animations and ScrollTriggers
 */
export const cleanupScrollAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};





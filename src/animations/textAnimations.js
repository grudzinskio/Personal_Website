import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a text gradient reveal animation where words fade in with opacity gradient
 * Inspired by the smooth word-by-word reveal effect
 * @param {HTMLElement} container - Container element with text
 * @param {Object} options - Animation options
 * @returns {Object} - Cleanup function
 */
export const createTextGradientReveal = (container, options = {}) => {
  if (!container) return null;

  const {
    phrase = container.textContent,
    stagger = 0.1,
    start = '-160%',
    end = null,
    scrub = true,
    markers = false
  } = options;

  // Clear existing content
  container.innerHTML = '';
  
  // Split into words and letters
  const words = phrase.split(' ');
  const refs = [];

  words.forEach((word) => {
    const wordSpan = document.createElement('p');
    wordSpan.className = 'm-0 mr-4 inline-block whitespace-nowrap p-0 text-inherit font-inherit';
    
    word.split('').forEach((letter) => {
      const letterSpan = document.createElement('span');
      letterSpan.className = 'opacity-40';
      letterSpan.textContent = letter;
      wordSpan.appendChild(letterSpan);
      refs.push(letterSpan);
    });
    
    container.appendChild(wordSpan);
  });

  // Create the animation
  const animation = gsap.to(refs, {
    scrollTrigger: {
      trigger: container,
      scrub: scrub,
      start: start,
      end: end || `+=${window.innerHeight / 1.5}`,
      markers: markers
    },
    opacity: 1,
    ease: 'none',
    stagger: stagger
  });

  return {
    kill: () => {
      if (animation && animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      if (animation) {
        animation.kill();
      }
    }
  };
};

/**
 * Creates a scroll-triggered text reveal that slides in from the left
 * Similar to the AnimatedText component in the sample code
 * @param {string|NodeList} elements - Elements to animate (selector or NodeList)
 * @param {Object} options - Animation options
 * @returns {Array} - Array of ScrollTrigger instances
 */
export const createScrollTextReveal = (elements, options = {}) => {
  const {
    startTrigger = '60vh bottom',
    endTrigger = 'bottom+=60vh bottom',
    initialX = -200,
    initialOpacity = 0,
    ease = 'power3.out',
    markers = false
  } = options;

  const elementArray = typeof elements === 'string' 
    ? document.querySelectorAll(elements)
    : elements;

  if (!elementArray || elementArray.length === 0) return [];

  const triggers = [];

  elementArray.forEach((element) => {
    // Set initial state
    gsap.set(element, {
      opacity: initialOpacity,
      x: initialX
    });

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: startTrigger,
      end: endTrigger,
      markers: markers,
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          x: 0,
          ease: ease,
          duration: 0.8
        });
      },
      onLeaveBack: () => {
        gsap.to(element, {
          opacity: initialOpacity,
          x: initialX,
          ease: ease,
          duration: 0.8
        });
      }
    });

    triggers.push(trigger);
  });

  return triggers;
};

/**
 * Creates a smooth parallax effect for elements during scroll
 * @param {HTMLElement} element - Element to apply parallax to
 * @param {Object} options - Parallax options
 * @returns {Object} - GSAP animation instance
 */
export const createSmoothParallax = (element, options = {}) => {
  if (!element) return null;

  const {
    speed = 0.5,        // Parallax speed multiplier (0-1)
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1.5,
    ease = 'none',
    markers = false
  } = options;

  const animation = gsap.fromTo(
    element,
    {
      y: () => (speed - 1) * ScrollTrigger.maxScroll(window)
    },
    {
      y: () => speed * ScrollTrigger.maxScroll(window),
      ease: ease,
      scrollTrigger: {
        trigger: element,
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
 * Creates a stagger fade-in animation for multiple elements
 * @param {string|NodeList} elements - Elements to animate
 * @param {Object} options - Animation options
 * @returns {Array} - Array of animations
 */
export const createStaggerFadeIn = (elements, options = {}) => {
  const {
    y = 30,
    opacity = 0,
    duration = 0.8,
    stagger = 0.15,
    ease = 'power2.out',
    start = 'top 80%',
    markers = false
  } = options;

  const elementArray = typeof elements === 'string' 
    ? document.querySelectorAll(elements)
    : elements;

  if (!elementArray || elementArray.length === 0) return [];

  const animations = [];

  elementArray.forEach((element, index) => {
    gsap.set(element, { opacity: opacity, y: y });

    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: duration,
      ease: ease,
      delay: stagger * index,
      scrollTrigger: {
        trigger: element,
        start: start,
        markers: markers,
        toggleActions: 'play none none none'
      }
    });

    animations.push(animation);
  });

  return animations;
};

/**
 * Creates a word-by-word reveal animation
 * @param {HTMLElement} container - Container with text content
 * @param {Object} options - Animation options
 * @returns {Object} - Animation instance with kill method
 */
export const createWordReveal = (container, options = {}) => {
  if (!container) return null;

  const {
    text = container.textContent,
    stagger = 0.08,
    start = 'top 80%',
    opacity = 0,
    y = 20,
    duration = 0.6,
    ease = 'power2.out',
    markers = false
  } = options;

  // Clear and split into words
  container.innerHTML = '';
  const words = text.split(' ');
  const wordElements = [];

  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.className = 'inline-block';
    span.textContent = word;
    span.style.opacity = '0';
    
    if (index < words.length - 1) {
      span.textContent += '\u00A0'; // Non-breaking space
    }
    
    container.appendChild(span);
    wordElements.push(span);
  });

  // Set initial state BEFORE creating animation
  gsap.set(wordElements, { opacity: opacity, y: y });

  // Animate words
  const animation = gsap.to(wordElements, {
    opacity: 1,
    y: 0,
    duration: duration,
    stagger: stagger,
    ease: ease,
    scrollTrigger: {
      trigger: container,
      start: start,
      markers: markers,
      toggleActions: 'play none none none'
    }
  });

  return {
    kill: () => {
      if (animation && animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      if (animation) {
        animation.kill();
      }
    }
  };
};

/**
 * Creates a letter-by-letter typing reveal effect
 * @param {HTMLElement} container - Container element
 * @param {Object} options - Animation options
 * @returns {Object} - Animation instance
 */
export const createLetterReveal = (container, options = {}) => {
  if (!container) return null;

  const {
    text = container.textContent,
    stagger = 0.03,
    start = 'top 80%',
    duration = 0.4,
    ease = 'power1.out',
    markers = false
  } = options;

  // Clear and split into letters
  container.innerHTML = '';
  const letters = text.split('');
  const letterElements = [];

  letters.forEach((letter) => {
    const span = document.createElement('span');
    span.className = 'inline-block';
    span.textContent = letter === ' ' ? '\u00A0' : letter;
    span.style.opacity = '0';
    container.appendChild(span);
    letterElements.push(span);
  });

  // Animate letters
  const animation = gsap.to(letterElements, {
    opacity: 1,
    duration: duration,
    stagger: stagger,
    ease: ease,
    scrollTrigger: {
      trigger: container,
      start: start,
      markers: markers,
      toggleActions: 'play none none none'
    }
  });

  return {
    kill: () => {
      if (animation && animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      if (animation) {
        animation.kill();
      }
    }
  };
};

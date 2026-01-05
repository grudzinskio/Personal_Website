// Custom smooth scroll implementation with skew effects and magnetic pull
// Based on the provided example code

const math = {
  lerp: (a, b, n) => {
    return (1 - n) * a + n * b
  },
  norm: (value, min, max) => {
    return (value - min) / (max - min)
  }
}

const config = {
  height: window.innerHeight,
  width: window.innerWidth
}

class Smooth {
  constructor() {
    this.bindMethods()

    this.data = {
      ease: 0.1,
      current: 0,
      last: 0,
      rounded: 0
    }

    this.dom = {
      el: document.querySelector('[data-scroll]'),
      content: document.querySelector('[data-scroll-content]')
    }

    this.rAF = null

    this.init()
  }

  bindMethods() {
    ['scroll', 'run', 'resize']
      .forEach((fn) => this[fn] = this[fn].bind(this))
  }

  setStyles() {
    if (!this.dom.el) return;
    
    Object.assign(this.dom.el.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      overflow: 'hidden'        
    })   
  }

  setHeight() {
    if (!this.dom.content) return;
    
    const height = this.dom.content.getBoundingClientRect().height;
    document.body.style.height = `${height}px`
  }

  resize() {
    config.height = window.innerHeight;
    config.width = window.innerWidth;
    this.setHeight()
    this.scroll()
  }

  preload() {
    if (!this.dom.content) {
      // If no content element, just set height immediately
      this.setHeight();
      return;
    }

    // Simple image preload check - wait for images to load
    const images = this.dom.content.querySelectorAll('img');
    if (images.length === 0) {
      this.setHeight();
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        this.setHeight();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkComplete();
      } else {
        img.addEventListener('load', checkComplete);
        img.addEventListener('error', checkComplete);
      }
    });

    // Fallback timeout
    setTimeout(() => {
      this.setHeight();
    }, 1000);
  }

  scroll() {
    this.data.current = window.scrollY
  }

  run() {
    this.data.last += (this.data.current - this.data.last) * this.data.ease
    this.data.rounded = Math.round(this.data.last * 100) / 100
    
    const diff = this.data.current - this.data.rounded
    const acc = diff / config.width
    const velo = +acc
    const skew = velo * 7.5
    
    if (this.dom.content) {
      this.dom.content.style.transform = `translate3d(0, -${this.data.rounded}px, 0) skewY(${skew}deg)`
    }

    this.requestAnimationFrame()
  }

  on() { 
    this.setStyles()
    this.setHeight()
    this.addEvents()

    this.requestAnimationFrame()
  }

  off() {
    this.cancelAnimationFrame()

    this.removeEvents()
  }

  requestAnimationFrame() {
    this.rAF = requestAnimationFrame(this.run)
  }

  cancelAnimationFrame() {
    if (this.rAF) {
      cancelAnimationFrame(this.rAF)
      this.rAF = null;
    }
  }

  destroy() {
    document.body.style.height = ''

    this.data = null

    this.removeEvents()
    this.cancelAnimationFrame()
  }

  addEvents() {
    window.addEventListener('resize', this.resize, { passive: true })
    window.addEventListener('scroll', this.scroll, { passive: true })
  }

  removeEvents() {
    window.removeEventListener('resize', this.resize, { passive: true })
    window.removeEventListener('scroll', this.scroll, { passive: true })
  }

  init() {
    this.preload()
    this.on()
  }
}

// Export singleton instance
let smoothInstance = null;

export const initCustomSmoothScroll = () => {
  // Clean up existing instance if any
  if (smoothInstance) {
    smoothInstance.destroy();
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      smoothInstance = new Smooth();
    });
  } else {
    smoothInstance = new Smooth();
  }

  // Return cleanup function
  return () => {
    if (smoothInstance) {
      smoothInstance.destroy();
      smoothInstance = null;
    }
  };
};

export const getSmoothInstance = () => smoothInstance;

export const scrollToElement = (target, options = {}) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!element) {
    console.warn(`Element not found: ${target}`);
    return;
  }

  const { offset = 0 } = options;
  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  const targetPosition = elementTop + offset;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};

export const scrollToPosition = (position, options = {}) => {
  const { immediate = false } = options;
  
  if (immediate) {
    window.scrollTo(0, position);
  } else {
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  }
};

export default Smooth;

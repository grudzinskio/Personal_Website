import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from './Magnetic';

export default function RoundedButton({ 
  children, 
  backgroundColor = 'bg-secondary', 
  className = '',
  ...attributes 
}) {
  const circle = useRef(null);
  const timeline = useRef(null);
  const timeoutId = useRef(null);

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' },
        'enter'
      )
      .to(
        circle.current,
        { top: '-150%', width: '125%', duration: 0.25 },
        'exit'
      );
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeline.current?.tweenFromTo('enter', 'exit');
  };

  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      timeline.current?.play();
    }, 300);
  };

  return (
    <Magnetic>
      <button
        className={`relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-primary px-6 py-4 ${className}`}
        style={{ overflow: 'hidden' }}
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...attributes}
      >
        <span className="relative z-10 transition-colors duration-300 ease-linear group-hover:text-white">
          {children}
        </span>
        <div
          ref={circle}
          className={`absolute top-[100%] h-[20%] w-full rounded-full sm:h-[150%] ${backgroundColor}`}
        ></div>
      </button>
    </Magnetic>
  );
}


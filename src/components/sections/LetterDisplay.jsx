/**
 * LetterDisplay - Individual letter rendering for GSAP animations
 * Each letter gets the 'letter' class for scroll-triggered animations
 */
export function LetterDisplay({ word, colorClass }) {
  const letters = word.split('');

  return (
    <>
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`letter inline-block ${colorClass} text-5xl md:text-7xl lg:text-8xl font-bold`}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </>
  );
}

export default LetterDisplay;

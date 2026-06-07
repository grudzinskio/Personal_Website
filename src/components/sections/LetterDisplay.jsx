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
          className={`letter inline-block ${colorClass} text-[clamp(3rem,7vw,9.25rem)] font-bold`}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </>
  );
}

export default LetterDisplay;

/**
 * LetterDisplay - Individual letter rendering for GSAP animations
 * Each letter gets the 'letter' class for scroll-triggered animations
 */
export function LetterDisplay({ word, colorClass }) {
  const letters = word.split('');

  return (
    <>
      {letters.map((letter, index) => {
        // Desync each letter's rumble so the line shivers instead of marching in step
        const seed = letter.charCodeAt(0) * 31 + index * 7;

        return (
          <span
            key={index}
            className={`letter letter-rumble inline-block ${colorClass} text-[clamp(3rem,7vw,9.25rem)] font-bold`}
            style={{
              '--rumble-dur': `${0.55 + (seed % 7) * 0.05}s`,
              '--rumble-delay': `${-(seed % 450)}ms`,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        );
      })}
    </>
  );
}

export default LetterDisplay;

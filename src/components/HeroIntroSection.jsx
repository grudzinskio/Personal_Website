import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import aboutData from '../data/about.json';

// Optimized code snippets - reduced size for better performance
const codeSnippets = [
  `const buildTheFuture = async () => {
  const skills = ['React', 'Python', 'AI/ML'];
  const passion = 'Innovation';
  
  return skills.map(skill => 
    applyTo(skill, passion)
  );
};`,
  `function solveProblems(challenge) {
  const approach = analyze(challenge);
  const solution = design(approach);
  
  return implement(solution)
    .then(test)
    .then(deploy);
}`,
  `class Engineer {
  constructor() {
    this.skills = new Set();
    this.learning = true;
  }
  
  async grow() {
    while (this.learning) {
      await this.learn();
      await this.build();
      await this.share();
    }
  }
}`
];

export const HeroIntroSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-16 sm:py-20 md:py-32 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex glass-card px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-primary">Full Stack Engineer</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="block text-foreground">Crafting Digital</span>
                <span className="block text-gradient-animated">Experiences</span>
              </h2>

              <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </div>

            {/* Description */}
            <div className="space-y-4">
              {aboutData.personal.description.slice(0, 2).map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-4"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">3</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Internships</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">4+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Hackathon Placements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">7+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Years Coding</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <CodeEditorWindow />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Optimized Code Editor with better performance
const CodeEditorWindow = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef(null);
  const editorRef = useRef(null);
  const isInView = useInView(editorRef, { once: false, amount: 0.3 });

  useEffect(() => {
    // Only animate when in view
    if (!isInView) return;

    const currentSnippet = codeSnippets[currentSnippetIndex];

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isTyping) {
      if (displayedCode.length < currentSnippet.length) {
        // Typing - faster speed
        timeoutRef.current = setTimeout(() => {
          setDisplayedCode(currentSnippet.slice(0, displayedCode.length + 1));
        }, 20);
      } else {
        // Finished typing, wait before clearing
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Clearing - faster speed
      if (displayedCode.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedCode(displayedCode.slice(0, -1));
        }, 10);
      } else {
        // Move to next snippet
        timeoutRef.current = setTimeout(() => {
          setCurrentSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
          setIsTyping(true);
        }, 500);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayedCode, isTyping, currentSnippetIndex, isInView]);

  // Simple text rendering for better performance (removed regex highlighting which was causing lag and bugs)
  const renderCode = (code) => {
    return code.split('\n').map((line, lineIdx) => (
      <div key={lineIdx}>{line || '\u00A0'}</div>
    ));
  };

  return (
    <div ref={editorRef} className="glass-card rounded-2xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px] md:h-[600px] flex flex-col">
      {/* Window Header */}
      <div className="flex items-center gap-2 px-5 py-4 bg-black/20 border-b border-border/30">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-sm text-muted-foreground font-mono">code.js</span>
        </div>
      </div>

      {/* Code Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 font-mono text-xs sm:text-sm md:text-base text-foreground/90 overflow-auto bg-black/5">
        <pre className="whitespace-pre-wrap m-0">
          <code className="text-zinc-300">
            {renderCode(displayedCode)}
            {isTyping && <span className="text-primary animate-pulse">|</span>}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default HeroIntroSection;

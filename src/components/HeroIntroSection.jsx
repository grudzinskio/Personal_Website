import { useEffect, useRef, useState } from 'react';
import { createScrollTextReveal } from '../animations/textAnimations';
import { createCardStaggerReveal, createScrollVelocityZone } from '../animations/scrollAnimations';
import { getLenis } from '../animations/smoothScroll';
import aboutData from '../data/about.json';

// Random code snippets - reduced by 25%
const codeSnippets = [
  `const processData = async (input) => {
  const result = await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  
  if (!result.ok) {
    throw new Error(\`HTTP error! status: \${result.status}\`);
  }
  
  return await result.json();
};`,
  `function calculateMetrics(data) {
  if (!data || data.length === 0) return { average: 0, variance: 0 };
  
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  const variance = data.reduce((sum, val) => 
    sum + Math.pow(val - avg, 2), 0) / data.length;
  
  return { average: avg, variance: variance };
}`,
  `const useOptimizedQuery = (query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    
    fetch(query, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
      
    return () => controller.abort();
  }, [query]);
  
  return { data, loading };
};`,
  `class DataProcessor {
  constructor(config) {
    this.config = { ...defaultConfig, ...config };
    this.cache = new Map();
  }
  
  async transform(input) {
    const cacheKey = JSON.stringify(input);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    const pipeline = this.buildPipeline();
    const result = await pipeline.execute(input);
    this.cache.set(cacheKey, result);
    return result;
  }
}`,
  `const memoizedCallback = useCallback((id) => {
  const cached = cache.get(id);
  if (cached) return cached.value;
  
  const result = expensiveOperation(id);
  cache.set(id, { value: result, timestamp: Date.now() });
  return result;
}, [cache]);`,
  `interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

const createUserProfile = (data: Partial<UserProfile>): UserProfile => {
  return {
    id: generateId(),
    name: data.name || 'Anonymous',
    email: data.email || '',
    preferences: {
      theme: data.preferences?.theme || 'dark',
      notifications: data.preferences?.notifications ?? true
    }
  };
}`
];

export const HeroIntroSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const codeEditorRef = useRef(null);

  useEffect(() => {
    const animations = [];

    // Apply magnetic scroll effect - pulls scroll as you approach About Me section
    if (sectionRef.current) {
      const magneticEffect = createScrollVelocityZone(
        sectionRef.current, 
        getLenis,
        {
          slowdownFactor: 0.35,  // Slows scroll to 35% speed when near center
          zoneSize: 0.3,         // 30% zone for stronger pull effect
          markers: false
        }
      );
      if (magneticEffect) animations.push(magneticEffect);
    }

    // Apply smooth scroll-triggered text reveal to headline - from left
    if (headlineRef.current) {
      const headlineElements = headlineRef.current.querySelectorAll('h1, h2');
      if (headlineElements.length > 0) {
        const headlineAnim = createScrollTextReveal(Array.from(headlineElements), {
          startTrigger: 'top 80%',
          endTrigger: 'bottom+=80vh bottom',
          initialX: -200,
          initialOpacity: 0,
          ease: 'power1.out'
        });
        animations.push(...headlineAnim);
      }
    }

    // Apply text reveal to subtext - from left
    if (subtextRef.current) {
      const subtextAnim = createScrollTextReveal([subtextRef.current], {
        startTrigger: 'top 80%',
        endTrigger: 'bottom+=80vh bottom',
        initialX: -200,
        initialOpacity: 0,
        ease: 'power1.out'
      });
      animations.push(...subtextAnim);
    }

    // Code editor comes from right side slowly
    if (codeEditorRef.current) {
      const editorAnim = createScrollTextReveal([codeEditorRef.current], {
        startTrigger: 'top 80%',
        endTrigger: 'bottom+=80vh bottom',
        initialX: 200,
        initialOpacity: 0,
        ease: 'power1.out'
      });
      animations.push(...editorAnim);
    }

    return () => {
      animations.forEach(anim => {
        if (anim && anim.kill) anim.kill();
        if (anim && anim.scrollTrigger) anim.scrollTrigger.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] w-full overflow-hidden flex items-center justify-center py-32 md:py-48 bg-background">
      {/* Content Container */}
      <div 
        ref={contentRef}
        className="relative z-20 container max-w-7xl mx-auto px-6 md:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32 xl:gap-40 items-center">
          {/* Left Column: Typography */}
          <div className="flex flex-col justify-center space-y-8 md:space-y-10 relative">
            {/* Background accent */}
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
            
            <div ref={headlineRef} className="flex flex-col space-y-4 md:space-y-5 relative z-10">
              {/* First Line: Full Stack Engineer */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-1 w-1 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-xs md:text-sm font-mono text-zinc-500 uppercase tracking-widest">01</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-white to-zinc-300 bg-clip-text text-transparent tracking-tight leading-[1.1]">
                  Full Stack
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white/95 tracking-tight leading-[1.1]">
                  Engineer
                </h1>
              </div>
              
              {/* Divider Line with gradient */}
              <div className="flex items-center gap-3 my-3 md:my-4">
                <div className="h-px flex-1 max-w-[80px] md:max-w-[120px] bg-gradient-to-r from-transparent via-zinc-600 to-zinc-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-600 to-transparent" />
              </div>
              
              {/* Second Line: Computer Science Student */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-1 w-1 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <span className="text-xs md:text-sm font-mono text-zinc-500 uppercase tracking-widest">02</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent tracking-tight leading-[1.1]">
                  Computer Science
                </h2>
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white tracking-tight leading-[1.1]">
                  Student
                </h2>
              </div>
            </div>
            
            {/* Description with enhanced styling */}
            <div className="relative z-10 pt-4 border-l-2 border-zinc-800 pl-6 md:pl-8">
              <div className="absolute -left-[2px] top-0 w-1 h-8 bg-gradient-to-b from-blue-500/50 to-transparent" />
              <p 
                ref={subtextRef}
                className="text-base md:text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-2xl"
              >
                {aboutData.personal.description[0]}
              </p>
            </div>
          </div>
          
          {/* Right Column: Code Editor Window */}
          <div ref={codeEditorRef} className="w-full">
            <CodeEditorWindow />
          </div>
        </div>
      </div>
    </section>
  );
};

// Code Editor Window Component with Typing Animation
const CodeEditorWindow = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentSnippet = codeSnippets[currentSnippetIndex];
    
    if (isTyping) {
      if (displayedCode.length < currentSnippet.length) {
        const timeout = setTimeout(() => {
          setDisplayedCode(currentSnippet.slice(0, displayedCode.length + 1));
        }, 30 + Math.random() * 20);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, wait before clearing
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      // Clear code
      if (displayedCode.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedCode(displayedCode.slice(0, -1));
        }, 20);
        return () => clearTimeout(timeout);
      } else {
        // Move to next snippet
        const timeout = setTimeout(() => {
          setCurrentSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
          setIsTyping(true);
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayedCode, isTyping, currentSnippetIndex]);

  // Render code with basic syntax highlighting
  const renderCode = (code) => {
    if (!code) return null;
    
    // Split into lines to preserve formatting
    const lines = code.split('\n');
    
    return lines.map((line, lineIdx) => {
      const parts = [];
      let remaining = line;
      let keyCounter = 0;
      
      // Match and replace patterns one by one
      // Keywords
      const keywordRegex = /\b(const|let|var|function|class|interface|async|await|return|if|else|for|while|switch|case|default|try|catch|finally|import|export|from|extends|implements|static|use|useState|useEffect|useCallback|useMemo|useRef)\b/g;
      // Strings (including multi-line strings)
      const stringRegex = /(['"`])(?:(?=(\\?))\2.)*?\1/g;
      // Numbers
      const numberRegex = /\b\d+\.?\d*\b/g;
      
      // Collect all matches with positions
      const matches = [];
      let match;
      
      while ((match = keywordRegex.exec(line)) !== null) {
        matches.push({ start: match.index, end: match.index + match[0].length, text: match[0], type: 'keyword' });
      }
      keywordRegex.lastIndex = 0;
      
      while ((match = stringRegex.exec(line)) !== null) {
        matches.push({ start: match.index, end: match.index + match[0].length, text: match[0], type: 'string' });
      }
      stringRegex.lastIndex = 0;
      
      while ((match = numberRegex.exec(line)) !== null) {
        matches.push({ start: match.index, end: match.index + match[0].length, text: match[0], type: 'number' });
      }
      
      // Sort by position and remove overlaps (keep first)
      matches.sort((a, b) => a.start - b.start);
      const filtered = [];
      matches.forEach(m => {
        if (filtered.length === 0 || m.start >= filtered[filtered.length - 1].end) {
          filtered.push(m);
        }
      });
      
      // Build parts
      let lastPos = 0;
      filtered.forEach(match => {
        if (match.start > lastPos) {
          parts.push(<span key={keyCounter++} className="text-zinc-300">{line.slice(lastPos, match.start)}</span>);
        }
        const className = match.type === 'keyword' ? 'text-blue-400' : 
                         match.type === 'string' ? 'text-green-400' : 'text-orange-400';
        parts.push(<span key={keyCounter++} className={className}>{match.text}</span>);
        lastPos = match.end;
      });
      
      if (lastPos < line.length) {
        parts.push(<span key={keyCounter++} className="text-zinc-300">{line.slice(lastPos)}</span>);
      }
      
      return (
        <span key={lineIdx}>
          {parts.length > 0 ? parts : <span className="text-zinc-300">{line}</span>}
          {lineIdx < lines.length - 1 && '\n'}
        </span>
      );
    });
  };

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 shadow-lg overflow-hidden h-[600px] md:h-[700px] lg:h-[800px] flex flex-col">
      {/* Window Header */}
      <div className="flex items-center gap-2 px-5 py-4 bg-zinc-950 border-b border-zinc-800 flex-shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-sm text-zinc-500 font-mono">code.tsx</span>
        </div>
      </div>
      
      {/* Code Content */}
      <div className="p-8 md:p-10 font-mono text-base md:text-lg text-zinc-300 overflow-auto flex-1">
        <pre className="whitespace-pre-wrap m-0">
          <code>
            {renderCode(displayedCode)}
            {isTyping && <span className="text-zinc-500 animate-pulse">|</span>}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default HeroIntroSection;



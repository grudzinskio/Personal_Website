import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const skills = [
    // Programming Languages
    { name: "Python", category: "languages" },
    { name: "Java", category: "languages" },
    { name: "C++", category: "languages" },
    { name: "TypeScript", category: "languages" },
    { name: "JavaScript", category: "languages" },
    { name: "SQL", category: "languages" },

    // Web Development
    { name: "React", category: "web" },
    { name: "Node.js", category: "web" },
    { name: "HTML", category: "web" },
    { name: "CSS", category: "web" },
    { name: "JavaFX", category: "web" },
    { name: "Vite", category: "web" },
    { name: "TailwindCSS", category: "web" },
    { name: "Redux", category: "web" },

    // AI/ML
    { name: "Scikit-learn", category: "AI" },
    { name: "Pandas", category: "AI" },
    { name: "NumPy", category: "AI" },
    { name: "TensorFlow", category: "AI" },
    { name: "LangChain", category: "AI" },
    { name: "LangGraph", category: "AI" },
    { name: "LLMs", category: "AI" },
    { name: "Generative AI", category: "AI" },
    { name: "RAG", category: "AI" },

    // Databases & Tools
    { name: "Git", category: "tools" },
    { name: "GitHub", category: "tools" },
    { name: "GitHub Actions", category: "tools" },
    { name: "MongoDB", category: "tools" },
    { name: "Jupyter Notebooks", category: "tools" },
    { name: "ORM's (Sequelize) ", category: "tools" },
    { name: "Drizzle ", category: "tools" },

    // Methodologies
    { name: "Agile (Scrum)", category: "methodologies" },
    { name: "Waterfall", category: "methodologies" },
];

const categories = [
    "all",
    "languages",
    "web",
    "AI",
    "tools",
    "methodologies"
];

export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const bubbleRef = useRef(null);
    const buttonsRef = useRef({}); // map category -> element
    const groupRef = useRef(null);

    const targetCategory = hoveredCategory || activeCategory;

    // Compute and move highlight bubble
    useEffect(() => {
        const moveBubble = () => {
            if (!groupRef.current || !bubbleRef.current) return;
            const btn = buttonsRef.current[targetCategory];
            if (!btn) return;
            const groupRect = groupRef.current.getBoundingClientRect();
            const rect = btn.getBoundingClientRect();
            const top = rect.top - groupRect.top;
            const left = rect.left - groupRect.left;
            bubbleRef.current.style.opacity = '1';
            bubbleRef.current.style.transform = `translate(${left}px, ${top}px)`;
            bubbleRef.current.style.width = `${rect.width}px`;
            bubbleRef.current.style.height = `${rect.height}px`;
        };
        // rAF to ensure layout settled
        const id = requestAnimationFrame(moveBubble);
        return () => cancelAnimationFrame(id);
    }, [targetCategory, activeCategory]);

    // Recalculate on resize
    useEffect(() => {
        const handle = () => {
            if (!bubbleRef.current) return;
            bubbleRef.current.style.opacity = '0';
            requestAnimationFrame(() => {
                if (!bubbleRef.current) return;
                const btn = buttonsRef.current[targetCategory];
                if (btn) {
                    const groupRect = groupRef.current.getBoundingClientRect();
                    const rect = btn.getBoundingClientRect();
                    bubbleRef.current.style.opacity = '1';
                    bubbleRef.current.style.transform = `translate(${rect.left - groupRect.left}px, ${rect.top - groupRect.top}px)`;
                    bubbleRef.current.style.width = `${rect.width}px`;
                    bubbleRef.current.style.height = `${rect.height}px`;
                }
            });
        };
        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, [targetCategory]);
    const filteredSkills = skills.filter(
        (skill) => activeCategory === "all" || skill.category === activeCategory
    );

    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    My <span className="text-primary">Skills</span>
                </h2>

                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 flex-wrap">
                        <h3 id="skills-filter-heading" className="sr-only">Filter skills by category</h3>
                        <p
                            id="skills-filter-instructions"
                            className="text-xs md:text-sm text-foreground/60 md:mr-2 md:self-center"
                        >
                            Click to filter:
                        </p>
                        <div
                            ref={groupRef}
                            className="relative flex flex-row flex-wrap gap-4 justify-start md:justify-start"
                            role="group"
                            aria-labelledby="skills-filter-heading"
                            aria-describedby="skills-filter-instructions"
                        >
                            {/* Moving bubble highlight */}
                            <span
                                ref={bubbleRef}
                                aria-hidden="true"
                                className="absolute z-0 rounded-full bg-primary/20 backdrop-blur-[1px] shadow-[0_0_0_1px_hsl(var(--primary)/0.25)] transition-all duration-300 ease-out pointer-events-none"
                                style={{ opacity: 0, transform: 'translate(0,0)', width: 0, height: 0 }}
                            />
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    ref={(el) => { if (el) buttonsRef.current[category] = el; }}
                                    onMouseEnter={() => setHoveredCategory(category)}
                                    onFocus={() => setHoveredCategory(category)}
                                    onBlur={() => setHoveredCategory(null)}
                                    onClick={() => setActiveCategory(category)}
                                    aria-pressed={activeCategory === category}
                                    className={cn(
                                        "relative z-10 px-5 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer focus-ring select-none",
                                        activeCategory === category
                                            ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/60"
                                            : "bg-secondary/70 text-foreground hover:bg-secondary hover:shadow-sm",
                                        activeCategory !== category && "hover:scale-[1.04] active:scale-[0.97]"
                                    )}
                                >
                                    {category === "AI" ? "AI" : category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredSkills.map((skill) => (
                        <div
                            key={skill.name}
                            className="bg-card p-4 rounded-lg shadow-sm card-hover text-center border border-primary/20 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
                        >
                            <h3 className="font-medium text-sm md:text-base">{skill.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

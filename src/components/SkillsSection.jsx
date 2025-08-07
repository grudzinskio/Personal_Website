import { useState } from "react";
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
    const filteredSkills = skills.filter(
        (skill) => activeCategory === "all" || skill.category === activeCategory
    );

    return (
        <section
            id="skills"
            className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    My <span className="text-primary">Skills</span>
                </h2>
                
                <div className="mb-12">
                    <div
                        className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:items-center flex-wrap"
                        role="group"
                        aria-labelledby="skills-filter-heading"
                        aria-describedby="skills-filter-instructions"
                    >
                        <h3 id="skills-filter-heading" className="sr-only">Filter skills by category</h3>
                        <p
                            id="skills-filter-instructions"
                            className="text-xs md:text-sm text-foreground/60 md:mr-2 md:self-center order-first"
                        >
                            Click to filter:
                        </p>
                        {categories.map((category, key) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                aria-pressed={activeCategory === category}
                                className={cn(
                                    // Base pill styles
                                    "relative px-5 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer focus-ring select-none group overflow-hidden",
                                    // Interactive hover bubble via ::before
                                    "before:content-[''] before:absolute before:inset-0 before:rounded-full before:scale-0 before:opacity-0 before:bg-primary/20 before:blur-sm before:transition before:duration-300 hover:before:scale-105 hover:before:opacity-100",
                                    // Active category styling
                                    activeCategory === category
                                        ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/60 before:!bg-primary/30"
                                        : "bg-secondary/70 text-foreground hover:bg-secondary hover:shadow-sm",
                                    // Slight scale on hover (not for active to reduce motion stacking)
                                    activeCategory !== category && "hover:scale-[1.04] active:scale-[0.97]"
                                )}
                            >
                                <span className="relative z-10">
                                    {category === "AI" ? "AI" : category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredSkills.map((skill, key) => (
                        <div 
                            key={key} 
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

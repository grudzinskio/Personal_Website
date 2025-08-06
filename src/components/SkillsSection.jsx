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
    { name: "GitHub Actions (CI/CD)", category: "tools" },
    { name: "MongoDB", category: "tools" },
    { name: "Jupyter Notebooks", category: "tools" },

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
                
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category, key) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                                "px-5 py-2 rounded-full transition-colors duration-300",
                                activeCategory === category 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-secondary/70 text-foreground hover:bg-secondary"
                            )}
                        >
                            {category === "AI" ? "AI" : category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                        </button>
                    ))}
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

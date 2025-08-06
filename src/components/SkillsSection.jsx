import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
    // Frontend
    { name: "HTML/CSS", category: "frontend" },
    { name: "JavaScript", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Responsive Design", category: "frontend" },

    // Backend
    { name: "Node.js", category: "backend" },
    { name: "Express.js", category: "backend" },
    { name: "MongoDB", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "REST APIs", category: "backend" },

    // Tools & Technologies
    { name: "Git/GitHub", category: "tools" },
    { name: "VS Code", category: "tools" },
    { name: "IntelliJ IDEA", category: "tools" },
    { name: "Vite", category: "tools" },
    { name: "npm/yarn", category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

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
                                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                                activeCategory === category 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-secondary/70 text-foreground hover:bg-secondary"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredSkills.map((skill, key) => (
                        <div 
                            key={key} 
                            className="bg-card p-4 rounded-lg shadow-sm card-hover text-center border border-primary/20 hover:border-primary/40 hover:shadow-md transition-all duration-300"
                        >
                            <h3 className="font-medium text-sm md:text-base">{skill.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

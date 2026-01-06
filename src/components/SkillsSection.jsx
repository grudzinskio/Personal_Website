import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "./AnimatedSection";
import { Sparkles } from "lucide-react";
import skillsData from "../data/skills.json";

const { skills, categories } = skillsData;

export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const bubbleRef = useRef(null);
    const buttonsRef = useRef({});
    const groupRef = useRef(null);

    const targetCategory = hoveredCategory || activeCategory;

    // Position moving bubble
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
                if (btn && groupRef.current) {
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
        <section id="skills" className="py-32 px-4 relative">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <AnimatedSection className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex glass-card px-4 py-2 rounded-full mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium text-primary">Technical Skills</span>
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                        Technology
                        <span className="block text-gradient-animated">Stack</span>
                    </h2>
                    
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                        A comprehensive toolkit spanning full-stack development, AI/ML, and cloud infrastructure
                    </p>
                </AnimatedSection>

                {/* Category Filter */}
                <AnimatedSection delay={0.2} className="mb-12">
                    <div className="flex justify-center">
                        <div
                            ref={groupRef}
                            onMouseLeave={() => setHoveredCategory(null)}
                            className="relative inline-flex flex-wrap gap-3 glass-card p-2 rounded-2xl"
                        >
                            {/* Moving bubble highlight */}
                            <span
                                ref={bubbleRef}
                                aria-hidden="true"
                                className="absolute z-0 rounded-xl bg-primary/20 backdrop-blur-sm transition-all duration-300 ease-out pointer-events-none"
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
                                    className={cn(
                                        "relative z-10 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 focus-ring",
                                        activeCategory === category
                                            ? "text-primary-foreground"
                                            : "text-foreground/70 hover:text-foreground"
                                    )}
                                >
                                    {category === "AI" ? "AI" : category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Skills Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
                >
                    {filteredSkills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, delay: index * 0.02 }}
                            whileHover={{ y: -4, scale: 1.05 }}
                            className="glass-card p-4 sm:p-6 rounded-xl text-center group cursor-default"
                        >
                            <h3 className="font-medium text-xs sm:text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                                {skill.name}
                            </h3>
                            
                            {/* Hover indicator */}
                            <div className="mt-3 mx-auto h-0.5 w-0 group-hover:w-8 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;

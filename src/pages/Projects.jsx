import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarBackground } from "../components/StarBackground";
import { GradientBackground } from "../components/GradientBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AnimatedSection } from "../components/AnimatedSection";
import { ArrowRight, ExternalLink, Github, Award, Code2, X } from "lucide-react";
import projectsData from "../data/projects.json";

const { projects } = projectsData;

export const Projects = () => {
    const [modalProject, setModalProject] = useState(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-background text-foreground overflow-x-hidden"
            style={{ maxWidth: '100vw' }}
        >
            <StarBackground />
            <GradientBackground opacity={0.6} animate={true} />
            <Navbar />
            
            <main className="relative pt-24 sm:pt-32 pb-16 sm:pb-20">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* Header */}
                    <AnimatedSection className="text-center mb-12 sm:mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex glass-card px-4 py-2 rounded-full mb-6"
                        >
                            <Code2 className="w-4 h-4 text-primary mr-2" />
                            <span className="text-sm font-medium text-primary">Portfolio</span>
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
                            Featured
                            <span className="block text-gradient-animated">Projects</span>
                        </h1>
                        
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                            A collection of my work in AI, web development, and software engineering.
                            Each project represents a unique technical challenge and innovative solution.
                        </p>
                    </AnimatedSection>

                    {/* Projects Grid - Bento Style */}
                    <div className="bento-grid">
                        {projects.map((project, index) => (
                            <AnimatedSection key={project.id} delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className={`group glass-card rounded-2xl overflow-hidden cursor-pointer relative ${
                                        project.featured ? "ring-2 ring-primary/30" : ""
                                    }`}
                                    onClick={() => setModalProject(project)}
                                >
                                    {/* Status badge */}
                                    {project.status && (
                                        <div className="absolute top-4 left-4 z-10 glass-card-strong px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
                                            <Award size={14} className="text-primary" />
                                            <span className="text-foreground">{project.status.replace("🏆", "").replace("🥈", "").replace("🥉", "").trim()}</span>
                                        </div>
                                    )}

                                    {/* Image */}
                                    <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative bg-muted">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 sm:p-6">
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.slice(0, 3).map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="glass-card-subtle px-3 py-1 text-xs font-medium rounded-full text-primary border border-primary/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 3 && (
                                                <span className="glass-card-subtle px-3 py-1 text-xs font-medium rounded-full text-muted-foreground">
                                                    +{project.tags.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Title & Description */}
                                        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Links */}
                                        <div className="flex gap-4 pt-4 border-t border-border/30">
                                            {project.demoURL !== "#" && (
                                                <a
                                                    href={project.demoURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium"
                                                >
                                                    <ExternalLink size={16} />
                                                    Demo
                                                </a>
                                            )}
                                            {project.githubUrl !== "#" && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium"
                                                >
                                                    <Github size={16} />
                                                    Code
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Hover effect indicator */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* View All Button */}
                    <AnimatedSection delay={0.6} className="text-center mt-12 sm:mt-16">
                        <a
                            className="cosmic-button inline-flex items-center justify-center gap-2 group text-sm sm:text-base"
                            href="https://github.com/grudzinskio"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View All on GitHub
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </AnimatedSection>
                </div>
            </main>
            
            <Footer />

            {/* Project Modal */}
            <AnimatePresence>
                {modalProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md"
                        onClick={() => setModalProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="glass-card-strong rounded-2xl p-6 sm:p-8 max-w-3xl w-full relative max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                className="absolute top-4 right-4 glass-card p-2 rounded-full hover:bg-white/10 transition-colors"
                                style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={() => setModalProject(null)}
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>

                            {/* Image */}
                            <img
                                src={modalProject.image}
                                alt={modalProject.title}
                                className="w-full h-48 sm:h-64 md:h-72 object-cover rounded-xl mb-4 sm:mb-6"
                            />

                            {/* Content */}
                            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{modalProject.title}</h3>
                            <p className="text-muted-foreground mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                                {modalProject.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {modalProject.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="glass-card px-3 py-1 text-sm font-medium rounded-full text-primary border border-primary/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                {modalProject.demoURL !== "#" && (
                                    <a
                                        href={modalProject.demoURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cosmic-button inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        <ExternalLink size={18} />
                                        View Demo
                                    </a>
                                )}
                                {modalProject.githubUrl !== "#" && (
                                    <a
                                        href={modalProject.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="button-glass inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        <Github size={18} />
                                        View Code
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Projects;

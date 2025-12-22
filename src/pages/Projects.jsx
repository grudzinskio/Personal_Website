import { useState } from "react";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ArrowRight, ExternalLink, Github, Award, Code2 } from "lucide-react";
import projectsData from "../data/projects.json";

const { projects } = projectsData;

export const Projects = () => {
    const [modalProject, setModalProject] = useState(null);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <StarBackground />
            <Navbar />
            <main className="relative pt-24 pb-16">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Code2 className="w-8 h-8 text-primary" />
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient">
                                Projects
                            </h1>
                        </div>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            A showcase of my recent work in AI, web development, and software engineering.
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`group bg-card rounded-2xl overflow-hidden shadow-lg card-hover relative border border-border/50 ${
                                    project.featured ? "ring-2 ring-primary/30" : ""
                                }`}
                                onClick={() => setModalProject(project)}
                                style={{ cursor: "pointer" }}
                            >
                                {project.status && (
                                    <div className="absolute top-4 left-4 z-10 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg">
                                        <Award size={14} />
                                        {project.status.replace("🏆", "").replace("🥈", "").replace("🥉", "").trim()}
                                    </div>
                                )}

                                {/* Image */}
                                <div className="h-52 overflow-hidden relative bg-muted">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4 max-h-[4rem] overflow-hidden">
                                        {project.tags.slice(0, 4).map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags.length > 4 && (
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                                                +{project.tags.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Links */}
                                    <div className="flex gap-4 pt-4 border-t border-border/50">
                                        {project.demoURL !== "#" && (
                                            <a
                                                href={project.demoURL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
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
                                                className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
                                            >
                                                <Github size={16} />
                                                Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-16">
                        <a
                            className="cosmic-button inline-flex items-center gap-2 group"
                            href="https://github.com/grudzinskio"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View All on GitHub
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </main>
            <Footer />

            {/* Project Modal */}
            {modalProject && (
                <div
                    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setModalProject(null)}
                >
                    <div
                        className="bg-card rounded-xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-primary hover:text-primary/80 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
                            onClick={() => setModalProject(null)}
                        >
                            ✕
                        </button>
                        <img
                            src={modalProject.image}
                            alt={modalProject.title}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                        <h3 className="text-3xl font-bold mb-3">{modalProject.title}</h3>
                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                            {modalProject.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {modalProject.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            {modalProject.demoURL !== "#" && (
                                <a
                                    href={modalProject.demoURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cosmic-button"
                                >
                                    View Demo
                                </a>
                            )}
                            {modalProject.githubUrl !== "#" && (
                                <a
                                    href={modalProject.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cosmic-button"
                                >
                                    View Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



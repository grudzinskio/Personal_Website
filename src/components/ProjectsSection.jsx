import { ArrowRight, ExternalLink, Github, Award } from "lucide-react";
import { useState } from "react";
import projectsData from "../data/projects.json";

const { projects } = projectsData;

export const ProjectsSection = () => {
    const [modalProject, setModalProject] = useState(null);

    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gradient">
                    Featured<span className="text-primary"> Projects</span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    A showcase of my recent work in AI, web development, and software engineering
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, key) => (
                        <div
                            key={key}
                            className={`group bg-card rounded-xl overflow-hidden shadow-lg card-hover relative ${project.featured ? 'ring-2 ring-primary/30' : ''}`}
                            onClick={() => setModalProject(project)}
                            style={{ cursor: "pointer" }}
                        >
                            {project.status && (
                                <div className="absolute top-3 left-3 z-10 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                    <Award size={12} />
                                    {project.status.replace('🏆', '').trim()}
                                </div>
                            )}
                            
                            <div className="h-48 overflow-hidden relative">
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4 max-h-[4rem] overflow-hidden">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                                    {project.description}
                                </p>
                                
                                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                                    <div className="flex space-x-4">
                                        {project.demoURL !== "#" && (
                                            <a
                                                href={project.demoURL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-sm text-foreground/80 hover:text-primary transition-colors duration-300"
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
                                                className="flex items-center gap-1 text-sm text-foreground/80 hover:text-primary transition-colors duration-300"
                                            >
                                                <Github size={16} />
                                                Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <a 
                        className="cosmic-button inline-flex items-center gap-2 group" 
                        href="https://github.com/grudzinskio"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        View All Projects on GitHub 
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /> 
                    </a>
                </div>
            </div>
            {modalProject && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setModalProject(null)}>
                    <div className="bg-card rounded-xl p-8 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                        <button className="absolute top-4 right-4 text-primary" onClick={() => setModalProject(null)}>✕</button>
                        <img src={modalProject.image} alt={modalProject.title} className="w-full h-48 object-cover rounded mb-4" />
                        <h3 className="text-2xl font-bold mb-2">{modalProject.title}</h3>
                        <p className="text-muted-foreground mb-4">{modalProject.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {modalProject.tags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">{tag}</span>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            {modalProject.demoURL !== "#" && (
                                <a href={modalProject.demoURL} target="_blank" rel="noopener noreferrer" className="cosmic-button">Demo</a>
                            )}
                            {modalProject.githubUrl !== "#" && (
                                <a href={modalProject.githubUrl} target="_blank" rel="noopener noreferrer" className="cosmic-button">Code</a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
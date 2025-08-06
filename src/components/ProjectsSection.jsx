import { ArrowRight, ExternalLink, Github, Award } from "lucide-react";
import { useState } from "react";

const projects = [
    {
        id: 1,
        title: "AI CPA Agentic Research System",
        description: "LLM-powered assistant for tax return analysis and optimization. Built with Python, LangChain, and PydanticAI.",
        image: "/projects/CPAproject.jpg",
        tags: ["Python", "LangChain", "LLM", "PydanticAI", "Agentic"],
        demoURL: "https://drive.google.com/file/d/1lfyOCU-jMAndwzvOGJP_BmlPMejIH8OS/view?usp=sharing",
        githubUrl: "https://github.com/grudzinskio/CPA-AI_Agentic-Deep-Research",
        status: "Hackathon Winner! 🏆",
        featured: true
    },
    {
        id: 2,
        title: "Diabetes Prediction (Random Forest)",
        description: "ML pipeline for diabetes prediction using statistical tests and Random Forest with comprehensive data preprocessing.",
        image: "/projects/DiabetesProject.png",
        tags: ["Python", "Scikit-learn", "ML", "Data Analysis"],
        demoURL: "#",
        githubUrl: "https://github.com/grudzinskio/DiabetesPrediction",
    },
    {
        id: 3,
        title: "Custom Wordle Game",
        description: "Java-based Wordle game with admin tools, SQL database, and modular testing for QA.",
        image: "/projects/WordleProject.png",
        tags: ["Java", "SQL", "Game Dev", "SCRUM", "Testing"],
        demoURL: "#",
        githubUrl: "https://github.com/grudzinskio/WordleGame",
    },
    {
        id: 4,
        title: "Automated XML Schema Documentation",
        description: "RAG CI/CD pipeline using Python and ML to automate XSD documentation and analysis.",
        image: "/projects/ActionsProject.png",
        tags: ["Python", "CI/CD", "ML", "GitHub Actions", "RAG"],
        demoURL: "#",
        githubUrl: "#",
    },
    {
        id: 5,
        title: "This Website!",
        description: "Website built using modern web development tools! Feel free to see how I made it.",
        image: "/projects/PersonalWebsite.png",
        tags: ["Frontend", "TailwindCSS", "React", "JavaScript" ],
        demoURL: "#",
        githubUrl: "https://github.com/grudzinskio/Personal_Website",
    },
    {
        id: 6,
        title: "Campaign Poster Management",
        description: "Full-stack application for managing campaign posters with user authentication and image upload.",
        image: "/projects/PosterManagement.png",
        tags: ["MariaDB", "SQL", "Javascript", "API", "React", "Node.js"],
        demoURL: "#",
        githubUrl: "https://github.com/grudzinskio/poster_management",
    },
];

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
            {/* Modal */}
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
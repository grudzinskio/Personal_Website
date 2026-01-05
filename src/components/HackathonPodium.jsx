import { useNavigate } from "react-router-dom";
import { Trophy, Award } from "lucide-react";
import projectsData from "../data/projects.json";

const { projects } = projectsData;

// Extract placement from status field
const getPlacement = (status) => {
    if (!status) return null;
    const statusLower = status.toLowerCase();
    if (statusLower.includes("winner") || statusLower.includes("1st") || statusLower.includes("first")) {
        return 1;
    } else if (statusLower.includes("2nd") || statusLower.includes("second") || statusLower.includes("🥈")) {
        return 2;
    } else if (statusLower.includes("3rd") || statusLower.includes("third") || statusLower.includes("🥉")) {
        return 3;
    } else if (statusLower.includes("hackathon") || statusLower.includes("hacks")) {
        return 3; // Other hackathons go to bronze
    }
    return null;
};

// Filter and group hackathon projects
const getHackathonProjects = () => {
    const hackathonProjects = projects.filter(p => p.status && getPlacement(p.status) !== null);
    const grouped = {
        1: [], // Gold - 1st place
        2: [], // Silver - 2nd place
        3: []  // Bronze - 3rd/other
    };
    
    hackathonProjects.forEach(project => {
        const placement = getPlacement(project.status);
        if (placement && grouped[placement]) {
            grouped[placement].push(project);
        }
    });
    
    return grouped;
};

export const HackathonPodium = () => {
    const navigate = useNavigate();
    const groupedProjects = getHackathonProjects();
    
    const handleProjectClick = (projectId) => {
        navigate(`/projects?project=${projectId}`);
    };
    
    const PodiumTier = ({ placement, projects: tierProjects, position }) => {
        const colors = {
            1: { bg: "bg-gradient-to-b from-yellow-400/20 to-yellow-600/10", border: "border-yellow-400/40", text: "text-yellow-300", icon: "text-yellow-400", label: "1st Place" },
            2: { bg: "bg-gradient-to-b from-gray-300/20 to-gray-400/10", border: "border-gray-300/40", text: "text-gray-200", icon: "text-gray-300", label: "2nd Place" },
            3: { bg: "bg-gradient-to-b from-amber-700/20 to-amber-800/10", border: "border-amber-600/40", text: "text-amber-200", icon: "text-amber-400", label: "3rd/Other" }
        };
        
        const colorScheme = colors[placement];
        const heightClass = placement === 1 ? "h-80" : placement === 2 ? "h-64" : "h-56";
        
        return (
            <div className={`flex flex-col items-center ${position === "left" ? "order-1 md:order-1" : position === "right" ? "order-3 md:order-3" : "order-2 md:order-2"}`}>
                <div className={`w-full ${heightClass} ${colorScheme.bg} ${colorScheme.border} border-2 rounded-t-2xl p-4 flex flex-col items-center justify-start gap-3 relative overflow-hidden`}>
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
                        <Trophy className={`w-5 h-5 ${colorScheme.icon}`} />
                        <span className={`text-xs font-bold ${colorScheme.text} uppercase tracking-wide`}>
                            {colorScheme.label}
                        </span>
                    </div>
                    
                    {tierProjects.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <p className={`text-sm ${colorScheme.text}/60`}>No projects yet</p>
                        </div>
                    ) : (
                        <div className="flex-1 w-full overflow-y-auto mt-8 podium-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--primary)/0.3) transparent' }}>
                            <div className="grid grid-cols-1 gap-3">
                                {tierProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        onClick={() => handleProjectClick(project.id)}
                                        className="group cursor-pointer bg-background/40 backdrop-blur-sm rounded-lg p-2 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    >
                                        <div className="relative w-full h-20 mb-2 rounded overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute bottom-1 left-1 right-1">
                                                <p className="text-xs font-semibold text-white line-clamp-1 drop-shadow-lg">
                                                    {project.title}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground line-clamp-2 px-1">
                                            {project.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className={`w-full h-4 ${colorScheme.bg} ${colorScheme.border} border-x-2 border-b-2 rounded-b-2xl`} />
            </div>
        );
    };
    
    const hasAnyProjects = groupedProjects[1].length > 0 || groupedProjects[2].length > 0 || groupedProjects[3].length > 0;
    
    if (!hasAnyProjects) {
        return null;
    }
    
    return (
        <section id="hackathon-podium" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gradient">
                    Hackathon <span className="text-primary">Achievements</span>
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Projects that have earned recognition in competitive hackathons
                </p>
                
                <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
                    <PodiumTier placement={2} projects={groupedProjects[2]} position="left" />
                    <PodiumTier placement={1} projects={groupedProjects[1]} position="center" />
                    <PodiumTier placement={3} projects={groupedProjects[3]} position="right" />
                </div>
                
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate("/projects")}
                        className="cosmic-button inline-flex items-center gap-2 group"
                    >
                        View All Projects
                        <Award className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};








import { Briefcase, Code, User, Server, Mail, Download } from "lucide-react"
import teschLogo from "../assets/TESCHGlobal_logo.png"
import msoeLogo from "../assets/MSOE_logo.png"
import aboutData from "../data/about.json"

const iconMap = {
    Code,
    User,
    Briefcase,
    Server
}

export const AboutSection = () => {
    const resumeFile = `${import.meta.env.BASE_URL}Oliver_Grudzinski_Resume.pdf`;
    return <section id="about" className="py-24 px-4 relative">
        {" "}
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                About <span className="text-primary"> Me</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-2xl font-semibold">{aboutData.personal.name}</h3>
                        <div className="flex items-center justify-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                            <img 
                                src={teschLogo} 
                                alt="TESCH Global" 
                                className="h-8 w-16 object-contain"
                            />
                        </div>
                        <div className="flex items-center justify-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                            <img 
                                src={msoeLogo} 
                                alt="MSOE" 
                                className="h-8 w-16 object-contain"
                            />
                        </div>
                    </div>
                    
                    {aboutData.personal.description.map((paragraph, index) => (
                        <p key={index} className="text-muted-foreground text-lg leading-relaxed mb-4">
                            {index === 0 ? (
                                <>
                                    {paragraph.split('TESCH Global')[0]}
                                    <strong className="text-foreground">TESCH Global</strong>
                                    {paragraph.split('TESCH Global')[1]}
                                </>
                            ) : (
                                paragraph
                            )}
                        </p>
                    ))}
                    
                    <div className="space-y-3 mt-8 p-4 bg-muted/30 rounded-lg border border-muted">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">{aboutData.education.degree}</span>
                            <span className="text-sm text-muted-foreground">{aboutData.education.expectedGraduation}</span>
                        </div>
                        <div className="text-muted-foreground text-sm flex items-center gap-2">
                            <img 
                                src={msoeLogo} 
                                alt="MSOE" 
                                className="h-10 w-10 object-contain"
                            />
                            {aboutData.education.school}
                        </div>
                        <hr className="border-muted" />
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">{aboutData.currentRole.title}</span>
                            <span className="text-sm text-muted-foreground">{aboutData.currentRole.status}</span>
                        </div>
                        <div className="text-muted-foreground text-sm flex items-center gap-2">
                            <img 
                                src={teschLogo} 
                                alt="TESCH Global" 
                                className="h-10 w-10 object-contain"
                            />
                            {aboutData.currentRole.company}
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
                        <a
                            href="#contact"
                            aria-label="Jump to contact section"
                            className="cosmic-button relative overflow-hidden group flex items-center gap-2"
                        >
                            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial-[ellipse_at_center] from-primary/25 via-primary/10 to-transparent" />
                            <Mail className="h-5 w-5 relative z-10" aria-hidden="true" />
                            <span className="relative z-10">Get In Touch</span>
                        </a>

                        <a
                            href={resumeFile}
                            download
                            aria-label="Download my resume as PDF"
                            className="relative overflow-hidden group px-6 py-2 rounded-full border border-primary/50 text-primary font-medium transition-all duration-300 focus-ring hover:text-primary-foreground hover:bg-primary hover:shadow-[0_0_14px_hsl(var(--primary)/0.55)] flex items-center gap-2"
                        >
                            <span className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-primary/30 before:to-transparent before:translate-x-[-120%] group-hover:before:translate-x-[120%] before:transition before:duration-700 before:rounded-full" />
                            <Download className="h-5 w-5 relative z-10" aria-hidden="true" />
                            <span className="relative z-10">Download Resume</span>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {aboutData.expertise.map((item, index) => {
                        const IconComponent = iconMap[item.icon];
                        return (
                            <div key={index} className="gradient-border p-6 card-hover">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <IconComponent className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-semibold text-lg">{item.title}</h4>
                                        <p className="text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </section>
}
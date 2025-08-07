import { Briefcase, Code, User, Brain, Server } from "lucide-react"
import teschLogo from "../assets/TESCHGlobal_logo.png"
import msoeLogo from "../assets/MSOE_logo.png"

export const AboutSection = () => {
    // Place your actual PDF in the /public folder named exactly like below (or change the name here)
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
                        <h3 className="text-2xl font-semibold">Oliver Grudzinski</h3>
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
                    
                    <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                        I'm a Computer Science junior at MSOE and Full Stack Development Intern at <strong className="text-foreground">TESCH Global</strong>. I specialize in AI/ML systems, modern web applications, and data-driven solutions.
                    </p>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                        My expertise spans full-stack development, machine learning, and agile project management. As an active member of the MSOE AI Club and Society of Software Engineers, I'm always exploring cutting-edge technologies.
                    </p>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        As an Eagle Scout, I bring discipline and leadership to every project.
                    </p>
                    
                    <div className="space-y-3 mt-8 p-4 bg-muted/30 rounded-lg border border-muted">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">B.S. Computer Science</span>
                            <span className="text-sm text-muted-foreground">Expected May 2027</span>
                        </div>
                        <div className="text-muted-foreground text-sm flex items-center gap-2">
                            <img 
                                src={msoeLogo} 
                                alt="MSOE" 
                                className="h-10 w-10 object-contain"
                            />
                            Milwaukee School of Engineering
                        </div>
                        <hr className="border-muted" />
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">Full Stack Software Development Intern</span>
                            <span className="text-sm text-muted-foreground">Current</span>
                        </div>
                        <div className="text-muted-foreground text-sm flex items-center gap-2">
                            <img 
                                src={teschLogo} 
                                alt="TESCH Global" 
                                className="h-10 w-10 object-contain"
                            />
                            TESCH Global
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
                        <a href="#contact" className="cosmic-button">
                            Get In Touch
                        </a>
                        <a
                            href={resumeFile}
                            download
                            className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 focus-ring"
                            aria-label="Download my resume as PDF"
                        >
                            Download Resume
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Code className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg"> Web Development</h4>
                                <p className="text-muted-foreground">
                                    Creating responsive websites and applications using modern frameworks.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg"> AI & Machine Learning</h4>
                                <p className="text-muted-foreground">
                                    Building intelligent systems and practical AI solutions for real-world problems.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Briefcase className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg"> Project Management</h4>
                                <p className="text-muted-foreground">
                                    Experienced in Agile and Scrum, I help teams deliver reliable software through clear communication and organized workflows.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Server className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg"> Backend Development</h4>
                                <p className="text-muted-foreground">
                                    Building scalable server-side applications, APIs, and database architectures for robust system performance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
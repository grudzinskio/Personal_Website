import { Briefcase, Code, User } from "lucide-react"


export const AboutSection = () => {
    return <section id="about" className="py-24 px-4 relative">
        {" "}
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                About <span className="text-primary"> Me</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Oliver Grudzinski</h3>
                    <p className="text-muted-foreground">
                        I’m a junior studying Computer Science at MSOE, passionate about building intelligent systems and modern web applications. My experience spans AI/ML, data analysis, and full-stack development, with a focus on creating practical solutions that make a difference.
                    </p>
                    <p className="text-muted-foreground">
                        I enjoy collaborating in agile teams, exploring new technologies, and contributing to student organizations like the MSOE AI Club and Society of Software Engineers. Outside of tech, I’m an Eagle Scout who values dedication and lifelong learning.
                    </p>
                    <div className="space-y-2 mt-6">
                        <div>
                            <span className="font-semibold">B.S. Computer Science</span> | Milwaukee School of Engineering |  Expected May 2027
                        </div>
                        <div>
                            <span className="font-semibold">H.S. Diploma</span> | Cedarburg High School 
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <a href="#contact" className="cosmic-button">
                            Get In Touch
                        </a>
                        <a href="" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300">
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
                                <h4 className="font-semibold text-lg"> UI/UX</h4>
                                <p className="text-muted-foreground">
                                    Designing intutive user interfaces and seamless user exp.
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
                                        How I deal with project etc..
                                    </p>
                                </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </section>
}
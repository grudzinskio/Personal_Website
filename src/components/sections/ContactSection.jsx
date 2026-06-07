import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { AnimatedSection } from "../ui/AnimatedSection";
import Magnetic from "../../utils/animations/Magnetic";

export const ContactSection = () => {
    return (
        <section id="contact" className="page-section">
            <div className="content-shell">
                <AnimatedSection className="section-header mb-14">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="section-eyebrow"
                    >
                        <Mail className="w-4 h-4 text-primary" />
                        <span>Let's Connect</span>
                    </motion.div>

                    <h2 className="section-title">
                        Professional
                        <span className="block text-gradient-animated">Contact</span>
                    </h2>

                    <p className="section-copy">
                        Reach out for software engineering, AI, data, or internship opportunities. I typically respond by email.
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-6 lg:gap-8 items-stretch">
                    <AnimatedSection delay={0.2}>
                        <div className="glass-card p-6 sm:p-8 rounded-lg h-full">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                                <div>
                                    <p className="text-sm font-medium text-primary mb-3">Best way to reach me</p>
                                    <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                                        Email for opportunities and collaborations.
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                        I am based near Milwaukee and open to engineering roles, AI/data projects, and thoughtful technical conversations.
                                    </p>
                                </div>
                                <div className="glass-card-strong p-4 rounded-lg text-primary self-start">
                                    <BriefcaseBusiness className="h-7 w-7" />
                                </div>
                            </div>

                            <a
                                href="mailto:grudzinskioliver@gmail.com"
                                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-lg border border-border/40 bg-white/[0.055] hover:bg-white/[0.08] transition-colors"
                            >
                                <span className="flex items-center gap-4 min-w-0">
                                    <span className="glass-card-strong p-3 rounded-lg text-primary shrink-0">
                                        <Mail className="h-5 w-5" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-sm text-muted-foreground mb-1">Email</span>
                                        <span className="block font-semibold text-foreground break-words">
                                            grudzinskioliver@gmail.com
                                        </span>
                                    </span>
                                </span>
                                <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1 shrink-0" />
                            </a>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <div className="p-5 rounded-lg border border-border/30 bg-white/[0.055]">
                                    <MapPin className="h-5 w-5 text-primary mb-3" />
                                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                                    <p className="font-semibold">Greater Milwaukee Area, WI</p>
                                </div>
                                <div className="p-5 rounded-lg border border-border/30 bg-white/[0.055]">
                                    <Mail className="h-5 w-5 text-primary mb-3" />
                                    <p className="text-sm text-muted-foreground mb-1">Response</p>
                                    <p className="font-semibold">Email preferred</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <div className="glass-card p-6 sm:p-8 rounded-lg h-full flex flex-col justify-between">
                            <div>
                                <h4 className="font-semibold text-2xl mb-4">Professional Profiles</h4>
                                <p className="text-muted-foreground leading-relaxed mb-8">
                                    View my work, experience, and current projects through the links below.
                                </p>

                                <div className="space-y-3">
                                    <a
                                        href="https://www.linkedin.com/in/grudzinskioliver/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border/30 bg-white/[0.035] hover:bg-white/[0.07] transition-colors group"
                                    >
                                        <span className="flex items-center gap-3">
                                            <Linkedin className="h-5 w-5 text-primary" />
                                            <span className="font-medium">LinkedIn</span>
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </a>
                                    <a
                                        href="https://github.com/grudzinskio"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border/30 bg-white/[0.035] hover:bg-white/[0.07] transition-colors group"
                                    >
                                        <span className="flex items-center gap-3">
                                            <Github className="h-5 w-5 text-primary" />
                                            <span className="font-medium">GitHub</span>
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/olivergrud/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border/30 bg-white/[0.035] hover:bg-white/[0.07] transition-colors group"
                                    >
                                        <span className="flex items-center gap-3">
                                            <Instagram className="h-5 w-5 text-primary" />
                                            <span className="font-medium">Instagram</span>
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </a>
                                </div>
                            </div>

                            <Magnetic>
                                <a
                                    href="mailto:grudzinskioliver@gmail.com"
                                    className="cosmic-button inline-flex items-center justify-center gap-2 group w-full mt-8"
                                >
                                    <Mail className="h-5 w-5" />
                                    Send an Email
                                </a>
                            </Magnetic>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;

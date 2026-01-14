import { motion } from "framer-motion";
import { Briefcase, Code, User, Server, Mail, Download } from "lucide-react"
import { AnimatedSection } from "./AnimatedSection";
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

    return (
        <section id="about" className="py-32 px-4 relative">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <AnimatedSection className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex glass-card px-4 py-2 rounded-full mb-6"
                    >
                        <User className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium text-primary">About Me</span>
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                        Engineering
                        <span className="block text-gradient-animated">Tomorrow's Solutions</span>
                    </h2>
                </AnimatedSection>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                    {/* Left Column: Bio */}
                    <AnimatedSection delay={0.2}>
                        <div className="space-y-6">
                            {/* Name and logos */}
                            <div className="glass-card p-6 rounded-2xl">
                                <div className="flex items-center gap-4 mb-4 flex-wrap">
                                    <h3 className="text-2xl font-semibold">{aboutData.personal.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="glass-card-subtle px-3 py-2 rounded-lg">
                                            <img
                                                src={teschLogo}
                                                alt="TESCH Global"
                                                className="h-6 w-auto object-contain"
                                            />
                                        </div>
                                        <div className="glass-card-subtle px-3 py-2 rounded-lg">
                                            <img
                                                src={msoeLogo}
                                                alt="MSOE"
                                                className="h-6 w-auto object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {aboutData.personal.description.map((paragraph, index) => (
                                    <p key={index} className="text-muted-foreground text-base leading-relaxed mb-4">
                                        {index === 0 ? (
                                            <>
                                                {paragraph.split('TESCH Global')[0]}
                                                <strong className="text-foreground font-semibold">TESCH Global</strong>
                                                {paragraph.split('TESCH Global')[1]}
                                            </>
                                        ) : (
                                            paragraph
                                        )}
                                    </p>
                                ))}
                            </div>

                            {/* Education & Role */}
                            <div className="glass-card p-6 rounded-2xl space-y-4">
                                <div className="flex items-start gap-4 pb-4 border-b border-border/30">
                                    <img
                                        src={msoeLogo}
                                        alt="MSOE"
                                        className="h-12 w-12 object-contain mt-1"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <span className="font-semibold text-foreground">{aboutData.education.degree}</span>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">{aboutData.education.expectedGraduation}</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">{aboutData.education.school}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <img
                                        src={teschLogo}
                                        alt="TESCH Global"
                                        className="h-12 w-12 object-contain mt-1"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <span className="font-semibold text-foreground">{aboutData.currentRole.title}</span>
                                            <span className="text-xs text-primary">{aboutData.currentRole.status}</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">{aboutData.currentRole.company}</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col gap-3 sm:gap-4">
                                <a
                                    href="#contact"
                                    className="cosmic-button flex items-center justify-center gap-2 group"
                                >
                                    <Mail className="h-5 w-5" />
                                    <span>Get In Touch</span>
                                </a>

                                <a
                                    href={resumeFile}
                                    download
                                    className="button-glass flex items-center justify-center gap-2 group"
                                >
                                    <Download className="h-5 w-5" />
                                    <span>Download Resume</span>
                                </a>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right Column: Expertise Cards */}
                    <AnimatedSection delay={0.4}>
                        <div className="grid grid-cols-1 gap-6">
                            {aboutData.expertise.map((item, index) => {
                                const IconComponent = iconMap[item.icon];
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        className="glass-card p-6 rounded-2xl group cursor-default"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="glass-card-strong p-3 rounded-xl text-primary group-hover:scale-110 transition-transform">
                                                <IconComponent className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                                                <p className="text-muted-foreground text-sm leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Hover indicator */}
                                        <div className="mt-4 pt-4 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

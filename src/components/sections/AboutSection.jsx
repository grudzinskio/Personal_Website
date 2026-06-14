import { motion } from "framer-motion";
import { Briefcase, Code, User, Server, Mail, Download } from "lucide-react"
import { AnimatedSection } from "../ui/AnimatedSection";
import clariosLogo from "../../assets/logos/CLARIOS_LOGO.png"
import teschLogo from "../../assets/logos/TESCHGlobal_logo.png"
import msoeLogo from "../../assets/logos/MSOE_logo.png"
import aboutData from "../../data/about.json"

const iconMap = {
    Code,
    User,
    Briefcase,
    Server
}

const iconChipClasses = {
    Code: 'border-sky-300/25 bg-sky-400/10 text-sky-300',
    User: 'border-violet-300/25 bg-violet-400/10 text-violet-300',
    Briefcase: 'border-emerald-300/25 bg-emerald-400/10 text-emerald-300',
    Server: 'border-orange-300/25 bg-orange-400/10 text-orange-300',
}

export const AboutSection = () => {
    const resumeFile = `${import.meta.env.BASE_URL}Resume.pdf`;

    return (
        <section id="about" className="page-section">
            <div className="content-shell">
                {/* Header */}
                <AnimatedSection className="section-header mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="section-eyebrow"
                    >
                        <User className="w-4 h-4 text-primary" />
                        <span>About Me</span>
                    </motion.div>

                    <h1 className="section-title">
                        Engineering across
                        <span className="block text-gradient-warm">the full stack.</span>
                    </h1>

                    <p className="section-copy">
                        Computer Science senior building AI/ML systems and web applications
                        across internships at Clarios and TESCH Global. Here is the work and
                        how I think about it.
                    </p>
                </AnimatedSection>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                    {/* Left Column: Bio */}
                    <AnimatedSection delay={0.05}>
                        <div className="space-y-6">
                            {/* Name and logos */}
                            <div className="glass-card p-6 rounded-2xl">
                                <div className="flex items-center gap-4 mb-4 flex-wrap">
                                    <h3 className="text-2xl font-semibold">{aboutData.personal.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-lg bg-white px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.18)]">
                                            <img
                                                src={clariosLogo}
                                                alt="Clarios"
                                                className="h-10 w-auto object-contain"
                                            />
                                        </div>
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
                                                {paragraph.split('Clarios')[0]}
                                                <strong className="text-foreground font-semibold">Clarios</strong>
                                                {paragraph.split('Clarios')[1].split('TESCH Global')[0]}
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
                                    <div className="flex-1 space-y-3">
                                        {aboutData.education.map((education) => (
                                            <div key={education.degree}>
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <span className="font-semibold text-foreground">{education.degree}</span>
                                                    <span className="text-xs text-muted-foreground whitespace-nowrap">{education.expectedGraduation}</span>
                                                </div>
                                                <span className="text-sm text-muted-foreground">{education.school}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <img
                                        src={clariosLogo}
                                        alt="Clarios"
                                        className="h-16 w-24 rounded-lg bg-white object-contain p-2 shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
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
                    <AnimatedSection delay={0.15}>
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
                                        whileHover={{ y: -4 }}
                                        className="glass-card p-6 rounded-2xl group cursor-default transition-colors duration-300 hover:border-sky-300/25"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:scale-110 ${iconChipClasses[item.icon] ?? 'border-sky-300/25 bg-sky-400/10 text-sky-300'}`}>
                                                <IconComponent className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-lg mb-2 text-white">{item.title}</h4>
                                                <p className="text-white text-sm leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
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

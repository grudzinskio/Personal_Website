import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import teschGlobalLogo from '../assets/TESCHGlobal_logo.png';
import wisconsinStampingLogo from '../assets/wisconsinstamping.png';
import msoeLogo from '../assets/MSOE_logo.png';

const experiences = [
    {
        role: 'Full Stack Software Development Intern',
        company: 'TESCHGlobal',
        location: 'Grafton, WI',
        period: 'June 2025 - Present',
        description: 'Engineered autonomous CI/CD pipeline reducing documentation time by 95%. Developed healthcare web applications using React, TypeScript, and HL7 FHIR REST APIs.',
        logo: teschGlobalLogo,
    },
    {
        role: 'B.S. Computer Science',
        company: 'Milwaukee School of Engineering',
        location: 'Milwaukee, WI',
        period: 'Aug 2023 - May 2027',
        description: 'Junior C.S. Student. Active member of MSOE AI Club and Society of Software Engineers.',
        logo: msoeLogo,
    },
    {
        role: 'Inventory Systems Management Intern',
        company: 'Wisconsin Stamping & Manufacturing',
        location: 'Wisconsin',
        period: 'June 2021 - June 2025',
        description: 'Maintained 99%+ inventory accuracy through SQL analysis and ERP reconciliation.',
        logo: wisconsinStampingLogo,
    },
    {
        role: 'Eagle Scout',
        company: 'Scouts of America',
        location: '',
        period: '2015 - 2022',
        description: 'Demonstrated leadership and community service through scouting projects.',
        logo: null,
    },
];

const ExperienceItem = ({ role, company, location, period, description, index, logo }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.15,
            }}
            className="relative"
        >
            <div className="glass-card p-6 md:p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300">
                {/* Logo - if available */}
                {logo && (
                    <div className="mb-4 flex items-center justify-start">
                        <img
                            src={logo}
                            alt={`${company} logo`}
                            className="h-8 md:h-10 w-auto object-contain"
                        />
                    </div>
                )}

                {/* Period badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4 border border-primary/20">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {period}
                </div>

                {/* Role & Company */}
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">{role}</h3>
                <p className="text-muted-foreground mb-1 font-medium">{company}</p>
                {location && <p className="text-muted-foreground/60 text-sm mb-4">{location}</p>}

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
};

export const Experience = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <div id="experience" className="min-h-screen flex flex-col items-center justify-center px-6 md:px-8 py-20 md:py-32">
            <div className="max-w-4xl w-full">
                {/* Section Header */}
                <motion.div
                    ref={sectionRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-center mb-16 md:mb-20"
                >
                    <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
                        Journey
                    </p>
                    <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-6">
                        Experience
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Building expertise through challenging problems and meaningful projects.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line - centered vertical gradient line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/50 hidden md:block" />

                    {/* Experience items */}
                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp.company}
                                className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                                    }`}
                            >
                                {/* Timeline dot - positioned by percentage */}
                                <div
                                    className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary"
                                    style={{ top: `${index * 25 + 12}%` }}
                                />

                                <ExperienceItem {...exp} index={index} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills summary */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-20 text-center"
                >
                    <h3 className="text-lg font-medium text-foreground mb-6">Core Technologies</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['Python', 'TypeScript', 'React', 'Node.js', 'Java', 'SQL', 'Machine Learning', 'LangChain', 'Docker', 'GitHub Actions'].map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-2 text-sm text-muted-foreground bg-card rounded-lg border border-border hover:border-primary/30 hover:bg-card/80 transition-all cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Experience;

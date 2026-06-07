import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2 } from 'lucide-react';
import clariosLogo from '../../assets/logos/CLARIOS_LOGO.png';
import teschGlobalLogo from '../../assets/logos/TESCHGlobal_logo.png';
import wisconsinStampingLogo from '../../assets/logos/wisconsinstamping.png';
import msoeLogo from '../../assets/logos/MSOE_logo.png';
import CocoArchitectureShowcase from './CocoArchitectureShowcase';

const experiences = [
    {
        role: 'Data Science Intern',
        company: 'Clarios',
        location: 'Glendale, WI',
        period: 'June 2026 - Present',
        description: 'Applying AI and machine learning at the global market leader in advanced battery manufacturing to optimize production, improve process intelligence, and support data-driven manufacturing decisions.',
        logo: clariosLogo,
        logoFrameClass: 'rounded-xl bg-white px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.18)]',
        logoClass: 'h-14 md:h-16',
    },
    {
        role: 'Full Stack Software Development Intern',
        company: 'TESCHGlobal',
        location: 'Grafton, WI',
        period: 'June 2025 - Present',
        description: 'Transforms healthcare data to follow FHIR CMS reliant standards. Engineered autonomous CI/CD pipelines. Developed healthcare web applications using React, TypeScript, and HL7 FHIR REST APIs.',
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

const ExperienceItem = ({ role, company, location, period, description, index, logo, logoFrameClass = '', logoClass = 'h-8 md:h-10' }) => {
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
            <div className="glass-experience rounded-2xl p-6 hover:-translate-y-1 hover:border-white/24 hover:shadow-[0_24px_70px_rgba(0,0,0,0.42)] transition-all duration-300">
                {/* Logo - if available */}
                {logo && (
                    <div className="mb-4 flex items-center justify-start">
                        <div className={logoFrameClass}>
                            <img
                                src={logo}
                                alt={`${company} logo`}
                                className={`${logoClass} w-auto object-contain`}
                            />
                        </div>
                    </div>
                )}

                {/* Period badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/14 text-sky-100 text-xs font-medium mb-4 border border-primary/25">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {period}
                </div>

                {/* Role & Company */}
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-1 leading-tight">{role}</h3>
                <p className="text-white/82 mb-1 font-medium">{company}</p>
                {location && <p className="text-white/70 text-sm mb-4">{location}</p>}

                {/* Description */}
                <p className="text-white/82 text-sm leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
};

export const Experience = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <div id="experience" className="min-h-screen flex flex-col items-center justify-center px-6 md:px-8 py-20 md:py-32">
            <div className="max-w-7xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-16 md:mb-20"
                >
                    <div className="mx-auto mb-8 max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-xl">
                            <Code2 className="mr-2 h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Featured Work</span>
                        </div>
                        <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                            Real-World Healthcare Interoperability:
                            <span className="block text-gradient-animated">CoCo Data</span>
                        </h3>
                        <p className="mx-auto max-w-2xl px-4 text-base leading-7 text-muted-foreground sm:text-lg">
                            A production-facing healthcare system for normalizing payer data, validating compliance
                            assets, and routing canonical transformations into FHIR-ready outputs.
                        </p>
                    </div>
                    <CocoArchitectureShowcase />
                </motion.div>

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
                <div className="relative mx-auto max-w-4xl">
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

            </div>
        </div>
    );
};

export default Experience;

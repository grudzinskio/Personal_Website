import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import teschGlobalLogo from '../assets/TESCHGlobal_logo.png';
import wisconsinStampingLogo from '../assets/wisconsinstamping.png';

const companies = [
    {
        name: 'TESCHGlobal',
        logo: teschGlobalLogo,
        role: 'Full Stack Software Development Intern',
        period: 'June 2025 - Present',
    },
    {
        name: 'Wisconsin Stamping & Manufacturing',
        logo: wisconsinStampingLogo,
        role: 'Inventory Systems Management Intern',
        period: 'June 2021 - June 2025',
    },
];

export const Companies = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 md:px-8 py-20 md:py-32">
            <div className="max-w-6xl w-full">
                {/* Section Header */}
                <motion.div
                    ref={sectionRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-center mb-12 md:mb-16"
                >
                    <p className="text-accent-cyan text-sm font-medium tracking-widest uppercase mb-4">
                        Professional Experience
                    </p>
                    <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
                        Companies I've Worked With
                    </h2>
                    <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                        Building real-world solutions and gaining hands-on experience
                    </p>
                </motion.div>

                {/* Companies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {companies.map((company, index) => (
                        <motion.div
                            key={company.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.25, 0.1, 0.25, 1],
                                delay: index * 0.2,
                            }}
                            className="group"
                        >
                            <div className="glass-card p-8 md:p-10 rounded-2xl hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-blue/20">
                                {/* Logo Container */}
                                <div className="flex items-center justify-center mb-6 h-32">
                                    <img
                                        src={company.logo}
                                        alt={`${company.name} logo`}
                                        className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                </div>

                                {/* Company Info */}
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {company.role}
                                    </h3>
                                    <p className="text-dark-400 text-sm mb-2">{company.name}</p>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-medium">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {company.period}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Companies;

import { motion, useInView, useScroll } from 'framer-motion';
import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clariosLogo from '../../assets/logos/CLARIOS_LOGO.png';
import teschGlobalLogo from '../../assets/logos/TESCHGlobal_logo.png';
import wisconsinStampingLogo from '../../assets/logos/wisconsinstamping.png';
import msoeLogo from '../../assets/logos/MSOE_logo.png';
import eagleScoutBanner from '../../assets/logos/eagle-scout-banner.png';
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
        projectLink: '/projects/coco',
    },
    {
        role: 'M.S. Machine Learning',
        company: 'Milwaukee School of Engineering',
        location: 'Milwaukee, WI',
        period: 'Expected 2028',
        description: 'Expected Master of Science in Machine Learning at MSOE, extending applied AI and machine learning coursework into advanced research and systems work.',
        logo: msoeLogo,
        logoClass: 'h-12 md:h-14',
    },
    {
        role: 'B.S. Computer Science',
        company: 'Milwaukee School of Engineering',
        location: 'Milwaukee, WI',
        period: 'Aug 2023 - May 2027',
        description: 'Senior C.S. Student. Active member of MSOE AI Club and Society of Software Engineers.',
        logo: msoeLogo,
        logoClass: 'h-12 md:h-14',
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
        logo: eagleScoutBanner,
        logoClass: 'h-16 md:h-20',
    },
];

// Fewer, more spread-out dashes than Tailwind's border-dashed: a 6px dash
// followed by an 18px gap, repeating down the connector.
const timelineDash =
    'repeating-linear-gradient(to bottom, rgba(255,255,255,0.18) 0 6px, transparent 6px 24px)';

const accent = '#f5b342';
const secondary = '#0070f3';

const ExperienceItem = ({ role, company, location, period, description, index, logo, logoFrameClass = '', logoClass = 'h-8 md:h-10', projectLink }) => {
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
            <div className="glass-experience card-hover rounded-2xl p-6 sm:p-7">
                {/* Logo - if available */}
                {logo && (
                    <div className="mb-5 flex items-center justify-start">
                        <div className={logoFrameClass}>
                            <img
                                src={logo}
                                alt={`${company} logo`}
                                className={`${logoClass} w-auto object-contain`}
                            />
                        </div>
                    </div>
                )}

                {/* Period */}
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent/85">
                    {period}
                </p>

                {/* Role & Company */}
                <h3 className="text-lg md:text-xl font-semibold tracking-[-0.02em] text-white mb-1 leading-tight">{role}</h3>
                <p className="text-white/70 mb-4 text-sm font-medium">
                    {company}
                    {location && <span className="font-normal text-white/45"> · {location}</span>}
                </p>

                {/* Description */}
                <p className="text-white/65 text-sm leading-relaxed">{description}</p>
                {projectLink && (
                    <p className="mt-4 text-sm text-white/65">
                        Main developer:{" "}
                        <Link
                            to={projectLink}
                            className="font-medium text-accent transition-colors hover:text-amber-200"
                        >
                            CoCo Project
                        </Link>
                    </p>
                )}
            </div>
        </motion.div>
    );
};

const TimelineRow = forwardRef(({ exp, index, total }, ref) => {
    const [hovered, setHovered] = useState(false);
    const isEven = index % 2 === 0;
    const dotColor = isEven ? accent : secondary;
    const hoverHandlers = {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
    };

    return (
        <div ref={ref} className="relative">
            {/* dashed connector drawn per-segment so it starts at the first dot
                and ends at the last — the half above the dot is skipped on the
                first item, the half below (which spans the gap into the next
                card) on the last. Each segment draws itself in as it enters view. */}
            {index !== 0 && (
                <motion.div
                    className="hidden md:block absolute left-1/2 top-0 bottom-1/2 w-0.5"
                    style={{ x: '-50%', transformOrigin: 'top', backgroundImage: timelineDash }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.15 + 0.2 }}
                />
            )}
            {index !== total - 1 && (
                <motion.div
                    className="hidden md:block absolute left-1/2 top-1/2 -bottom-8 w-0.5"
                    style={{ x: '-50%', transformOrigin: 'top', backgroundImage: timelineDash }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.15 + 0.22 }}
                />
            )}

            {/* Node: outer wrapper springs the dot in on reveal; inner span
                handles hover (linked to the card) and the "Present" pulse.
                z-20 keeps it above the accent progress line. */}
            <motion.div
                className="hidden md:block absolute left-1/2 top-1/2 z-20"
                style={{ x: '-50%', y: '-50%' }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 400, damping: 18, delay: index * 0.15 + 0.1 }}
                {...hoverHandlers}
            >
                <div className="relative flex h-5 w-5 items-center justify-center">
                    <motion.span
                        className="block h-5 w-5 rounded-full ring-4 ring-background"
                        style={{ backgroundColor: dotColor }}
                        animate={{
                            scale: hovered ? 1.35 : 1,
                            boxShadow: hovered
                                ? `0 0 0 6px ${isEven ? 'rgba(245,179,66,0.16)' : 'rgba(0,112,243,0.16)'}`
                                : '0 0 0 0px rgba(0,0,0,0)',
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                </div>
            </motion.div>

            <div
                className={`md:w-[calc(50%-2rem)] ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
                {...hoverHandlers}
            >
                <ExperienceItem {...exp} index={index} />
            </div>
        </div>
    );
});

TimelineRow.displayName = 'TimelineRow';

export const ExperienceTimeline = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    // Scroll-linked accent line that fills from the first dot to the last as
    // the section passes through the viewport. Geometry is measured so the
    // fill spans dot-to-dot regardless of card heights.
    const timelineRef = useRef(null);
    const rowRefs = useRef([]);
    const [lineGeom, setLineGeom] = useState({ top: 0, height: 0 });
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start center', 'end center'],
    });

    useLayoutEffect(() => {
        const measure = () => {
            const first = rowRefs.current[0];
            const last = rowRefs.current[rowRefs.current.length - 1];
            if (!first || !last) return;
            const top = first.offsetTop + first.offsetHeight / 2;
            const bottom = last.offsetTop + last.offsetHeight / 2;
            setLineGeom({ top, height: bottom - top });
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    return (
        <div id="experience" className="page-section min-h-screen flex flex-col items-center justify-center">
            <div className="content-shell">
                <motion.div
                    ref={sectionRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="section-header mb-16 md:mb-20"
                >
                    <p className="section-eyebrow">Experience</p>
                    <h2 className="section-title-compact mt-6">
                        Where I've been.
                    </h2>
                </motion.div>

                <div ref={timelineRef} className="relative mx-auto max-w-4xl">
                    {/* accent progress fill: solid orange drawn over the dashed
                        connector, scaled by scroll (z-10, above the dashes, below
                        the dots at z-20) */}
                    <motion.div
                        className="hidden md:block absolute left-1/2 w-0.5 z-10 rounded-full"
                        style={{
                            top: lineGeom.top,
                            height: lineGeom.height,
                            x: '-50%',
                            transformOrigin: 'top',
                            scaleY: scrollYProgress,
                            backgroundColor: accent,
                            boxShadow: '0 0 8px rgba(245,179,66,0.5)',
                        }}
                    />

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <TimelineRow
                                key={`${exp.company}-${exp.role}`}
                                ref={(el) => (rowRefs.current[index] = el)}
                                exp={exp}
                                index={index}
                                total={experiences.length}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CocoFeature = () => (
    <section id="coco-data" className="page-section">
        <div className="content-shell">
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <div className="section-header mb-10">
                    <p className="section-eyebrow">Featured Work</p>
                    <h3 className="section-title-compact mt-6 max-w-4xl mx-auto">
                        CoCo Data.
                    </h3>
                    <p className="section-copy">
                        A healthcare data pipeline that turns fragmented payer exports into canonical,
                        FHIR-ready outputs.
                    </p>
                </div>
                <CocoArchitectureShowcase />
            </motion.div>
        </div>
    </section>
);

export const Experience = ExperienceTimeline;

export default ExperienceTimeline;

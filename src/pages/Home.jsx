import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Background } from "../components/ui/Background";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";
import { LetterCollision } from "../components/sections/LetterCollision";
import { IntroductionSection } from "../components/sections/IntroductionSection";
import { PreclinicalExplorer } from "../components/sections/PreclinicalExplorer";
import { ExperienceTimeline } from "../components/sections/Experience";
import SlidingImages from "../components/sections/SlidingImages";
import { SectionBackground } from "../components/ui/SectionBackground";
import Magnetic from "../utils/animations/Magnetic";
import { initSmoothScroll, scrollToPosition, getLenis } from "../utils/animations/smoothScroll";

/**
 * Home - Complete original design with all sections restored
 * Smooth performance with Vercel-inspired polish
 */
export const Home = () => {
    const [showScrollButton, setShowScrollButton] = useState(true);
    const scrollContainerRef = useRef(null);
    const scrollFrameRef = useRef(null);

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);

        // Initialize smooth scrolling
        const cleanup = initSmoothScroll();

        // Handle scroll button visibility
        const handleScroll = () => {
            if (scrollFrameRef.current) return;

            scrollFrameRef.current = requestAnimationFrame(() => {
                scrollFrameRef.current = null;
                setShowScrollButton(window.scrollY <= 100);
            });
        };

        window?.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (cleanup) cleanup();
            window?.removeEventListener('scroll', handleScroll);
            if (scrollFrameRef.current) {
                cancelAnimationFrame(scrollFrameRef.current);
            }
        };
    }, []);

    const scrollNudge = () => {
        // Just a small nudge to invite scrolling — not a jump to a section.
        const target = (window.scrollY || 0) + window.innerHeight * 0.6;
        if (getLenis()) {
            scrollToPosition(target, { duration: 0.9 });
        } else {
            window.scrollTo({ top: target, behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Background and Navbar live outside the animated motion.div so framer-motion's
                opacity stacking context never traps these fixed-positioned elements */}
            <Background />
            <Navbar />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                ref={scrollContainerRef}
                className="min-h-screen overflow-x-hidden bg-[#e7e4dd]"
                style={{ maxWidth: '100vw' }}
            >
            {/* Main content */}
            <main className="scroll-smooth">
                {/* Section 1: Letter Collision hero — PROTOTYPE: light "screen"
                    that hard-cuts to the dark page below (see reference). */}
                <SectionBackground tone="light" className="hero-light">
                    <section className="relative px-4">
                        <LetterCollision />
                    </section>
                </SectionBackground>

                {/* Section 2: About / Introduction — full-bleed dark section
                    with the cursor spotlight background, hard-cutting out of the
                    light hero and back to light after. */}
                <SectionBackground tone="spotlight" className="relative z-10 -mt-[28vh] sm:-mt-[20vh]">
                    <IntroductionSection />
                </SectionBackground>

                {/* Section 3: Experience Timeline (light) */}
                <div className="section-light">
                    <ExperienceTimeline />
                </div>

                {/* Scroll indicator button */}
                {showScrollButton && (
                    <Magnetic>
                        <motion.button
                            type="button"
                            aria-label="Scroll down"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: 1,
                                y: [0, -7, 0],
                            }}
                            transition={{
                                opacity: { delay: 1.4, duration: 0.4 },
                                y: {
                                    delay: 1.7,
                                    duration: 1.8,
                                    repeat: Infinity,
                                    repeatDelay: 1.4,
                                    ease: "easeInOut",
                                },
                            }}
                            whileHover={{ scale: 1.06, y: -4 }}
                            whileTap={{ scale: 0.96 }}
                            className="group fixed bottom-6 right-4 z-50 flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-white shadow-[0_12px_28px_-10px_rgba(203,75,11,0.65)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#b5420a] sm:bottom-8 sm:right-8 sm:px-6 sm:py-3"
                            onClick={scrollNudge}
                        >
                            <p>Scroll</p>
                            <ArrowDownRight strokeWidth={2} className="size-4" />
                        </motion.button>
                    </Magnetic>
                )}

                {/* Section 4: Preclinical Explorer — dark-native glowing-ring
                    visualization. NOT wrapped in SectionBackground: it pins with
                    GSAP ScrollTrigger and the wrapper broke the pin, so it carries
                    its own dark background on the section element instead. */}
                <PreclinicalExplorer />

                {/* Section 5: Sliding Images Gallery (light) */}
                <div className="section-light">
                    <SlidingImages />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </motion.div>
        </>
    );
};

export default Home;

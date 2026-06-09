import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Background } from "../components/ui/Background";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";
import { LetterCollision } from "../components/sections/LetterCollision";
import { IntroductionSection } from "../components/sections/IntroductionSection";
import { PreclinicalExplorer } from "../components/sections/PreclinicalExplorer";
import { CocoFeature, ExperienceTimeline } from "../components/sections/Experience";
import SlidingImages from "../components/sections/SlidingImages";
import NavigationPanels from "../components/sections/NavigationPanels";
import Magnetic from "../utils/animations/Magnetic";
import { initSmoothScroll, scrollToElement } from "../utils/animations/smoothScroll";

/**
 * Home - Complete original design with all sections restored
 * Smooth performance with Vercel-inspired polish
 */
export const Home = () => {
    const [showScrollButton, setShowScrollButton] = useState(true);
    const scrollContainerRef = useRef(null);
    const scrollFrameRef = useRef(null);
    const { scrollYProgress } = useScroll();

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

    const scrollToResearch = () => {
        scrollToElement('#preclinical-research', {
            offset: -80,
            duration: 1.8,
        });
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
                className="min-h-screen text-foreground overflow-x-hidden"
                style={{ maxWidth: '100vw' }}
            >
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300 origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Main content */}
            <main className="scroll-smooth">
                {/* Section 1: Letter Collision - Your animated name */}
                <section className="relative px-4">
                    <LetterCollision />
                </section>

                {/* Section 2: New Introduction */}
                <IntroductionSection />

                {/* Section 3: Experience Timeline */}
                <ExperienceTimeline />

                {/* Scroll indicator button */}
                {showScrollButton && (
                    <Magnetic>
                        <motion.button
                            type="button"
                            aria-label="Scroll to research section"
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
                            className="group fixed bottom-6 right-4 z-50 flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full border border-sky-100/24 bg-slate-950/86 px-5 py-2.5 text-base font-semibold text-white/95 shadow-[0_18px_54px_rgba(8,145,178,0.24),0_10px_34px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-colors hover:border-sky-100/40 hover:bg-slate-900/92 hover:text-white sm:bottom-8 sm:right-8 sm:min-h-14 sm:px-5 sm:py-3"
                            onClick={scrollToResearch}
                        >
                            <span className="pointer-events-none absolute inset-[-5px] -z-10 rounded-full border border-cyan-300/18 opacity-55 shadow-[0_0_24px_rgba(34,211,238,0.2)] transition-opacity group-hover:opacity-80" />
                            <p>Scroll</p>
                            <ArrowDownRight strokeWidth={2.35} className="size-5" />
                        </motion.button>
                    </Magnetic>
                )}

                {/* Section 4: Preclinical Explorer */}
                <PreclinicalExplorer />

                {/* Section 5: Featured Work */}
                <CocoFeature />

                {/* Section 6: Sliding Images Gallery (Horizontal scroll) */}
                <SlidingImages />

                {/* Section 7: Navigation Panels - Cool navigation cards */}
                <NavigationPanels />
            </main>

            {/* Footer */}
            <Footer />
        </motion.div>
        </>
    );
};

export default Home;

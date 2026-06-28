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
import NavigationPanels from "../components/sections/NavigationPanels";
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
                className="min-h-screen text-foreground overflow-x-hidden"
                style={{ maxWidth: '100vw' }}
            >
            {/* Main content */}
            <main className="scroll-smooth">
                {/* Section 1: Letter Collision hero with CTAs */}
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
                            className="group fixed bottom-6 right-4 z-50 flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-accent/50 bg-[rgba(245,181,68,0.12)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-accent shadow-[0_0_24px_-6px_rgba(245,181,68,0.5)] backdrop-blur-xl transition-colors hover:border-accent hover:bg-[rgba(245,181,68,0.2)] sm:bottom-8 sm:right-8 sm:px-6 sm:py-3"
                            onClick={scrollNudge}
                        >
                            <p>Scroll</p>
                            <ArrowDownRight strokeWidth={2} className="size-4" />
                        </motion.button>
                    </Magnetic>
                )}

                {/* Section 4: Preclinical Explorer */}
                <PreclinicalExplorer />

                {/* Section 5: Sliding Images Gallery (Horizontal scroll) */}
                <SlidingImages />

                {/* Section 6: Navigation Panels - Cool navigation cards */}
                <NavigationPanels />
            </main>

            {/* Footer */}
            <Footer />
        </motion.div>
        </>
    );
};

export default Home;

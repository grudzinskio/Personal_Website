import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Background } from "../components/ui/Background";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";
import { LetterCollision } from "../components/sections/LetterCollision";
import { IntroductionSection } from "../components/sections/IntroductionSection";
import { PreclinicalExplorer } from "../components/sections/PreclinicalExplorer";
import Experience from "../components/sections/Experience";
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

                {/* Section 3: Preclinical Explorer */}
                <PreclinicalExplorer />

                {/* Scroll indicator button */}
                {showScrollButton && (
                    <Magnetic>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="fixed bottom-6 right-4 z-50 flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/88 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all hover:scale-105 hover:border-white/20 hover:bg-white/[0.08] hover:text-white sm:bottom-8 sm:right-8"
                            style={{ minHeight: '44px', minWidth: '44px' }}
                            onClick={scrollToResearch}
                        >
                            <p>Research</p>
                            <ArrowDownRight strokeWidth={2.2} className="size-4" />
                        </motion.div>
                    </Magnetic>
                )}

                {/* Section 4: Experience Timeline */}
                <Experience />

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

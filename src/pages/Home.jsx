import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Background } from "../components/ui/Background";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";
import { LetterCollision } from "../components/sections/LetterCollision";
import { VideoScrollSection } from "../components/sections/VideoScrollSection";
import { HeroIntroSection } from "../components/sections/HeroIntroSection";
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
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);

        // Initialize smooth scrolling
        const cleanup = initSmoothScroll();

        // Handle scroll button visibility
        const handleScroll = () => {
            if (window?.scrollY > 100) {
                setShowScrollButton(false);
            } else {
                setShowScrollButton(true);
            }
        };

        window?.addEventListener('scroll', handleScroll);

        return () => {
            if (cleanup) cleanup();
            window?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToVideo = () => {
        scrollToElement('#video-section', {
            offset: -100, // Slight offset to prevent overshoot
            duration: 1.8,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            ref={scrollContainerRef}
            className="min-h-screen text-foreground overflow-x-hidden"
            style={{ maxWidth: '100vw' }}
        >
            {/* Background layers */}
            <Background />

            {/* Navigation */}
            <Navbar />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Main content */}
            <main className="scroll-smooth">
                {/* Section 1: Letter Collision - Your animated name */}
                <section className="relative px-4">
                    <LetterCollision />
                </section>

                {/* Scroll indicator button */}
                {showScrollButton && (
                    <Magnetic>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 flex cursor-pointer items-center space-x-2 text-lg sm:text-2xl md:text-3xl font-semibold z-50 glass-card px-3 sm:px-4 py-2 rounded-full hover:scale-105 transition-transform"
                            style={{ minHeight: '44px', minWidth: '44px' }}
                            onClick={scrollToVideo}
                        >
                            <p>Scroll</p>
                            <ArrowDownRight strokeWidth={3} className="size-4 sm:size-5 md:size-6" />
                        </motion.div>
                    </Magnetic>
                )}

                {/* Section 2: Scroll-Driven Video */}
                <div id="video-section">
                    <VideoScrollSection />
                </div>

                {/* Section 3: Hero Intro with Code Editor */}
                <HeroIntroSection />

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
    );
};

export default Home;

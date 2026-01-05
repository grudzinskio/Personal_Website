import { useEffect, useRef, useState } from "react";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { LetterCollision } from "../components/LetterCollision";
import { VideoScrollSection } from "../components/VideoScrollSection";
import { HeroIntroSection } from "../components/HeroIntroSection";
import SlidingImages from "../components/SlidingImages";
import { initSmoothScroll } from "../animations/smoothScroll";
import Magnetic from "../components/animations/Magnetic";
import { ArrowDownRight } from "lucide-react";

export const Home = () => {
    const [showScrollButton, setShowScrollButton] = useState(true);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);

        // Initialize smooth scrolling for the page
        const cleanup = initSmoothScroll();

        // Handle scroll button visibility
        const handleScroll = () => {
            if (window?.scrollY > 0) {
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
        const videoSection = document.getElementById('video-section');
        if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div ref={scrollContainerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <StarBackground />
            <Navbar />
            <main className="scroll-smooth">
                {/* Section 1: Letter Collision */}
                <section className="relative px-4">
                    <LetterCollision />
                </section>

                {/* Scroll indicator button */}
                {showScrollButton && (
                    <Magnetic>
                        <div
                            className="fixed bottom-4 right-8 flex cursor-pointer items-center space-x-2 text-3xl font-semibold sm:bottom-8 z-50"
                            onClick={scrollToVideo}
                        >
                            <p>Scroll</p>
                            <ArrowDownRight strokeWidth={3} className="size-6" />
                        </div>
                    </Magnetic>
                )}

                {/* Section 2: Scroll-Driven Video */}
                <div id="video-section">
                    <VideoScrollSection />
                </div>

                {/* Section 3: Hero Intro */}
                <HeroIntroSection />

                {/* Section 4: Sliding Images Gallery */}
                <SlidingImages />
            </main>
            <Footer />
        </div>
    );
};

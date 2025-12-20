import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { LetterCollision } from "../components/LetterCollision";
import { VideoSection } from "../components/VideoSection";
import { initSmoothScroll } from "../animations/smoothScroll";

gsap.registerPlugin(ScrollToPlugin);

export const Home = () => {
    const videoSectionRef = useRef(null);
    const hasAutoScrolledRef = useRef(false);

    useEffect(() => {
        // Initialize smooth scrolling for the page
        initSmoothScroll();

        // Auto-scroll to video section after letter animation settles
        const autoScrollTimer = setTimeout(() => {
            if (!hasAutoScrolledRef.current && videoSectionRef.current) {
                hasAutoScrolledRef.current = true;
                
                gsap.to(window, {
                    duration: 2.5,
                    scrollTo: {
                        y: videoSectionRef.current,
                        offsetY: 0
                    },
                    ease: "power2.inOut",
                    delay: 0.5
                });
            }
        }, 3500); // Wait 3.5 seconds before auto-scrolling

        // If user manually scrolls, cancel auto-scroll
        const handleScroll = () => {
            if (window.scrollY > 50) {
                clearTimeout(autoScrollTimer);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            clearTimeout(autoScrollTimer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <StarBackground />
            <Navbar />
            <main className="scroll-smooth">
                {/* Section 1: Letter Explosion Name */}
                <section className="relative px-4">
                    <LetterCollision />
                </section>

                {/* Section 2: Video Background with Text Overlay */}
                <div ref={videoSectionRef}>
                    <VideoSection />
                </div>
            </main>
            <Footer />
        </div>
    );
};

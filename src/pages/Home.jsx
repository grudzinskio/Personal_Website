import { useEffect } from "react";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { LetterCollision } from "../components/LetterCollision";
import { VideoSection } from "../components/VideoSection";
import { AboutMeSection } from "../components/AboutMeSection";
import { ProjectGallery } from "../components/ProjectGallery";
import { initSmoothScroll } from "../animations/smoothScroll";

export const Home = () => {
    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);

        // Initialize smooth scrolling for the page
        const cleanup = initSmoothScroll();

        return () => {
            if (cleanup) cleanup();
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
                <VideoSection />

                {/* Section 3: About Me with Gradient Background */}
                <AboutMeSection />

                {/* Section 4: Project Gallery with Scroll Animations */}
                <ProjectGallery />
            </main>
            <Footer />
        </div>
    );
};

import { useEffect } from "react";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { LetterCollision } from "../components/LetterCollision";
import { VideoSection } from "../components/VideoSection";
import { initSmoothScroll } from "../animations/smoothScroll";

export const Home = () => {
    useEffect(() => {
        // Initialize smooth scrolling for the page
        initSmoothScroll();
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
            </main>
            <Footer />
        </div>
    );
};

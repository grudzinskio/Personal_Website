import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

// Import your new component
import { AnimatedSection } from "../components/AnimatedSection";

export const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <StarBackground />
            <Navbar />
            <main>
                <HeroSection />

                {/* Set the direction for each section */}
                <AnimatedSection direction="left">
                    <AboutSection />
                </AnimatedSection>

                <AnimatedSection direction="right">
                    <SkillsSection />
                </AnimatedSection>
                
                <AnimatedSection direction="left">
                    <ProjectsSection />
                </AnimatedSection>

                <AnimatedSection direction="right">
                    <ContactSection />
                </AnimatedSection>
            </main>
            <Footer />
        </div>
    );
};
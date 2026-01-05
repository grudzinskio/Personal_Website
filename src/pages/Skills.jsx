import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SkillsSection } from "../components/SkillsSection";

export const Skills = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <StarBackground />
            <Navbar />
            <main>
                <SkillsSection />
            </main>
            <Footer />
        </div>
    );
};








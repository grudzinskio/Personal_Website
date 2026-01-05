import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AboutSection } from "../components/AboutSection";

export const About = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <StarBackground />
            <Navbar />
            <main>
                <AboutSection />
            </main>
            <Footer />
        </div>
    );
};








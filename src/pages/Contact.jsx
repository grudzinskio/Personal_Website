import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ContactSection } from "../components/ContactSection";

export const Contact = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <StarBackground />
            <Navbar />
            <main>
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
};







import { motion } from "framer-motion";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";
import { SectionBackground } from "../components/ui/SectionBackground";
import { AboutSection } from "../components/sections/AboutSection";

export const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen text-foreground overflow-x-hidden"
            style={{ maxWidth: '100vw' }}
        >
            <Navbar />
            <SectionBackground tone="spotlight" className="min-h-screen">
                <main>
                    <AboutSection />
                </main>
                <Footer />
            </SectionBackground>
        </motion.div>
    );
};

export default About;

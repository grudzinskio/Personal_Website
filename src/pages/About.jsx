import { motion } from "framer-motion";
import { StarBackground } from "../components/StarBackground";
import { GradientBackground } from "../components/GradientBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AboutSection } from "../components/AboutSection";

export const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-background text-foreground overflow-x-hidden"
        >
            <StarBackground />
            <GradientBackground opacity={0.6} animate={true} />
            <Navbar />
            <main>
                <AboutSection />
            </main>
            <Footer />
        </motion.div>
    );
};

export default About;

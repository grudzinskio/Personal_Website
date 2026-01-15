import { motion } from "framer-motion";
import { Background } from "../components/ui/Background";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";
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
            <Background />
            <Navbar />
            <main>
                <AboutSection />
            </main>
            <Footer />
        </motion.div>
    );
};

export default About;

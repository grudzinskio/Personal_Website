import { motion } from "framer-motion";
import { Background } from "../components/ui/Background";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";
import { SkillsSection } from "../components/sections/SkillsSection";

export const Skills = () => {
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
                <SkillsSection />
            </main>
            <Footer />
        </motion.div>
    );
};

export default Skills;

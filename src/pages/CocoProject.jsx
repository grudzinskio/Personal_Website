import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { Background } from "../components/ui/Background";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";
import CocoArchitectureShowcase from "../components/sections/CocoArchitectureShowcase";

export const CocoProject = () => {
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

            <main className="page-section pt-24 sm:pt-32">
                <div className="content-shell">
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                        className="section-header mb-10"
                    >
                        <div className="section-eyebrow">
                            <Code2 className="h-4 w-4 text-primary" />
                            <span>Featured Work</span>
                        </div>
                        <h1 className="section-title-compact mt-5 max-w-4xl mx-auto">
                            CoCo Data
                        </h1>
                        <p className="section-copy max-w-2xl">
                            A healthcare data pipeline that turns fragmented payer exports into canonical,
                            FHIR-ready outputs.
                        </p>
                    </motion.div>

                    <CocoArchitectureShowcase />
                </div>
            </main>

            <Footer />
        </motion.div>
    );
};

export default CocoProject;

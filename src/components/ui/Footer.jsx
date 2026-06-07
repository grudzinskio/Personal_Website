import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative border-t border-border/40 bg-slate-950/35 px-4 py-8 backdrop-blur-sm">
            <div className="content-shell">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Copyright */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                        <span>&copy; {new Date().getFullYear()} Oliver Grudzinski.</span>
                    </motion.p>

                    {/* Scroll to top button */}
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="glass-card p-3 rounded-full hover:bg-white/10 text-primary transition-all group"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

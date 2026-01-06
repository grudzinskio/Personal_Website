import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import Magnetic from "./animations/Magnetic";

export const ContactSection = () => {
    return (
        <section id="contact" className="py-32 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                {/* Header */}
                <AnimatedSection className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex glass-card px-4 py-2 rounded-full mb-6"
                    >
                        <Mail className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium text-primary">Let's Connect</span>
                    </motion.div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                        Start a
                        <span className="block text-gradient-animated">Conversation</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        I'm always open to discussing new projects, innovative ideas, or opportunities to contribute to your vision
                    </p>
                </AnimatedSection>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <AnimatedSection delay={0.2}>
                        <motion.a
                            href="mailto:grudzinskioliver@gmail.com"
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="glass-card p-8 rounded-2xl block group cursor-pointer"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="glass-card-strong p-4 rounded-xl text-primary group-hover:scale-110 group-hover:glow-primary transition-all">
                                    <Mail className="h-8 w-8" />
                                </div>
                            </div>
                            <h4 className="font-semibold text-lg mb-3 text-center">Email</h4>
                            <p className="text-muted-foreground group-hover:text-foreground transition-colors text-center text-sm break-words">
                                grudzinskioliver@gmail.com
                            </p>
                            
                            {/* Hover indicator */}
                            <div className="mt-6 pt-4 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
                            </div>
                        </motion.a>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <motion.a
                            href="tel:+12626654897"
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="glass-card p-8 rounded-2xl block group cursor-pointer"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="glass-card-strong p-4 rounded-xl text-primary group-hover:scale-110 group-hover:glow-primary transition-all">
                                    <Phone className="h-8 w-8" />
                                </div>
                            </div>
                            <h4 className="font-semibold text-lg mb-3 text-center">Phone</h4>
                            <p className="text-muted-foreground group-hover:text-foreground transition-colors text-center">
                                +1 (262) 665-4897
                            </p>
                            
                            {/* Hover indicator */}
                            <div className="mt-6 pt-4 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
                            </div>
                        </motion.a>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="glass-card p-8 rounded-2xl group cursor-default"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="glass-card-strong p-4 rounded-xl text-primary group-hover:scale-110 transition-transform">
                                    <MapPin className="h-8 w-8" />
                                </div>
                            </div>
                            <h4 className="font-semibold text-lg mb-3 text-center">Location</h4>
                            <p className="text-muted-foreground text-center">
                                Greater Milwaukee Area, WI
                            </p>
                            
                            {/* Hover indicator */}
                            <div className="mt-6 pt-4 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>

                {/* Social Links */}
                <AnimatedSection delay={0.5} className="text-center">
                    <h4 className="font-semibold text-2xl mb-8">Connect With Me</h4>
                    <div className="flex justify-center gap-4">
                        <Magnetic>
                            <a 
                                href="https://www.linkedin.com/in/grudzinskioliver/" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card p-4 rounded-full hover:bg-white/10 text-primary transition-all group"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
                            </a>
                        </Magnetic>
                        
                        <Magnetic>
                            <a 
                                href="https://github.com/grudzinskio" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card p-4 rounded-full hover:bg-white/10 text-primary transition-all group"
                                aria-label="GitHub"
                            >
                                <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
                            </a>
                        </Magnetic>
                        
                        <Magnetic>
                            <a 
                                href="https://www.instagram.com/olivergrud/" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card p-4 rounded-full hover:bg-white/10 text-primary transition-all group"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-6 w-6 group-hover:scale-110 transition-transform" />
                            </a>
                        </Magnetic>
                    </div>
                </AnimatedSection>

                {/* CTA */}
                <AnimatedSection delay={0.6} className="text-center mt-16">
                    <p className="text-muted-foreground mb-6">
                        Ready to bring your ideas to life?
                    </p>
                    <Magnetic>
                        <a
                            href="mailto:grudzinskioliver@gmail.com"
                            className="cosmic-button inline-flex items-center gap-2 group"
                        >
                            <Mail className="h-5 w-5" />
                            Send an Email
                        </a>
                    </Magnetic>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default ContactSection;

import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export const ContactSection = () => {
    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Get In <span className="text-primary">Touch</span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out to me!
                </p>

                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl font-semibold mb-8 text-center">Contact Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <div className="bg-card p-8 rounded-lg shadow-xs card-hover text-center min-h-[180px]">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                            <h4 className="font-medium mb-2">Email</h4>
                            <a 
                                href="mailto:grudzinsioliver@gmail.com" 
                                className="text-muted-foreground hover:text-primary transition-colors text-sm break-words"
                            >
                                grudzinsioliver@gmail.com
                            </a>
                        </div>

                        <div className="bg-card p-8 rounded-lg shadow-xs card-hover text-center min-h-[180px]">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                            <h4 className="font-medium mb-2">Phone</h4>
                            <a 
                                href="tel:+12626654897" 
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                +1 (262) 665-4897
                            </a>
                        </div>

                        <div className="bg-card p-8 rounded-lg shadow-xs card-hover text-center sm:col-span-2 lg:col-span-1 min-h-[180px]">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                            <h4 className="font-medium mb-2">Location</h4>
                            <span className="text-muted-foreground">
                                Greater Milwaukee Area, WI
                            </span>
                        </div>
                    </div>

                    <div className="text-center">
                        <h4 className="font-medium mb-6 text-xl">Connect With Me</h4>
                        <div className="flex justify-center space-x-6">
                            <a 
                                href="https://www.linkedin.com/in/grudzinskioliver/" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110"
                            >
                                <Linkedin size={24} />
                            </a>
                            <a 
                                href="https://github.com/grudzinskio" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110"
                            >
                                <Github size={24} />
                            </a>
                            <a 
                                href="https://www.instagram.com/olivergrud/" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110"
                            >
                                <Instagram size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
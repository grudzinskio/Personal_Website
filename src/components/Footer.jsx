// src/components/Footer.tsx

import { ArrowUp } from "lucide-react";
// The FooterParticles import is now gone

export const Footer = () => {
    return (
        <footer className="py-12 px-4 animated-gradient-footer relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center overflow-hidden" style={{ position: "relative" }}>
            {/* SVG Wave */}
            <div className="absolute left-0 bottom-0 w-full z-10 pointer-events-none">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "80px" }}>
                    <path
                        d="M0,40 C480,120 960,0 1440,80 L1440,120 L0,120 Z"
                        fill="url(#footerWaveGradient)"
                        opacity="0.7"
                    />
                    <defs>
                        <linearGradient id="footerWaveGradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#a78bfa" />
                            <stop offset="1" stopColor="#22223b" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            
            {/* The FooterParticles component is now gone */}
            
            <p className="text-sm text-muted-foreground z-20">
                &copy; {new Date().getFullYear()} All rights reserved.
            </p>
            <a href="#hero" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors z-20">
                <ArrowUp size={20} />
            </a>
        </footer>
    );
}
// src/components/Footer.tsx

import { ArrowUp } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="py-8 px-4 bg-card relative border-t border-border flex flex-wrap justify-between items-center">
            <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} All rights reserved.
            </p>
            <a 
                href="#hero" 
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                aria-label="Scroll to top"
            >
                <ArrowUp size={20} />
            </a>
        </footer>
    );
}
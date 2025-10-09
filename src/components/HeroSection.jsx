import { ArrowDown, LayoutGrid } from "lucide-react";
import { TerminalWithPortrait } from "./TerminalWithBubbles";

export const HeroSection = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-4"
        >
            <div className="container max-w-5xl mx-auto text-center z-10">
                <div className="opacity-0 animate-fade-in-delay-1">
                    <TerminalWithPortrait />
                </div>



                <div className="mt-8 opacity-0 animate-fade-in-delay-3 flex flex-col items-center">
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-snug">
                        I'm a junior at <span className="font-semibold text-red-600 dark:text-red-400">Milwaukee School of Engineering</span> with internship experience building full stack web applications and practical AI/ML solutions.
                    </p>
                </div>
            </div>
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-9 animate-fade-in-delay-4">
                <a
                    href="#projects"
                    aria-label="Go to Projects section"
                    className="group flex flex-col items-center focus-ring"
                >
                    <div className="w-10 h-10 rounded-full border border-primary/40 bg-background/70 backdrop-blur-md flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:bg-primary/10">
                        <LayoutGrid className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
                    </div>
                    <span className="mt-2 text-[10px] uppercase tracking-wide text-muted-foreground group-hover:text-primary font-medium">Projects</span>
                </a>

                <a
                    href="#about"
                    aria-label="Scroll to About section"
                    className="group flex flex-col items-center focus-ring"
                >
                    <div className="w-10 h-10 rounded-full border border-primary/40 bg-background/70 backdrop-blur-md flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:bg-primary/10">
                        <ArrowDown className="w-5 h-5 text-primary animate-bounce" />
                    </div>
                    <span className="mt-2 text-[10px] uppercase tracking-wide text-muted-foreground group-hover:text-primary font-medium">Scroll</span>
                </a>
            </div>
        </section>
    );
};
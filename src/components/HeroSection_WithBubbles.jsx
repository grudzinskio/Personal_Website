import { ArrowDown, LayoutGrid } from "lucide-react";
import profPortrait from "../assets/Prof_Port.jpg";
import msoeSunset from "../assets/MSOE_Sunset.jpg"; // ensure correct casing
import msoeLogo from "../assets/MSOE_logo.png";
import { TerminalBackground } from "./TerminalBackground";

export const HeroSection = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-4"
        >
            <div className="container max-w-5xl mx-auto text-center z-10">
                {/* Bubble image cluster */}
                <div className="relative mb-1 md:mb-2 opacity-0 animate-fade-in-delay-1">
                    {/* Shifted further left */}
                    <div className="relative w-[300px] h-[300px] mx-auto -translate-x-10 md:-translate-x-14">
                        {/* Bubble 1 - Portrait */}
                        <div
                            className="group absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[55%] w-36 h-36 rounded-full overflow-hidden shadow-lg border border-primary/40 backdrop-blur-sm"
                            style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '0.2s' }}
                        >
                            <img
                                src={profPortrait}
                                alt="Professional portrait of Oliver"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-primary/10 mix-blend-overlay" />
                        </div>

                        {/* Bubble 2 - Sunset */}
                        <div
                            className="group absolute top-1/2 left-1/2 translate-x-[5%] -translate-y-[80%] w-44 h-44 rounded-full overflow-hidden shadow-xl border border-primary/50 ring-4 ring-primary/10"
                            style={{ animation: 'float 8.5s ease-in-out infinite', animationDelay: '0.6s' }}
                        >
                            <img
                                src={msoeSunset}
                                alt="MSOE campus sunset"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
                            <span className="absolute bottom-1.5 right-1.5 text-[9px] px-2 py-0.5 rounded-full bg-primary/30 backdrop-blur-sm border border-primary/40 text-primary-foreground/90 tracking-wide font-medium">
                                MSOE
                            </span>
                        </div>

                        {/* Bubble 3 - Logo */}
                        <div
                            className="group absolute top-1/2 left-1/2 translate-x-[55%] -translate-y-[5%] w-24 h-24 rounded-full overflow-hidden shadow-lg border border-primary/40 ring-2 ring-primary/20"
                            style={{ animation: 'float 6.5s ease-in-out infinite', animationDelay: '1s' }}
                        >
                            <div className="w-full h-full bg-background/40 flex items-center justify-center backdrop-blur-md">
                                <img
                                    src={msoeLogo}
                                    alt="MSOE logo"
                                    className="object-contain w-[85%] h-[85%] drop-shadow-md transition-transform duration-500 group-hover:scale-[1.12]"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute inset-0 pointer-events-none bg-radial from-white/10 via-transparent to-transparent" />
                        </div>

                        {/* Soft glow & subtle connecting gradient */}
                        <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(circle_at_60%_40%,hsl(var(--primary)/0.18),transparent_70%)]" />
                    </div>
                </div>

                <div className="space-y-3 -mt-6 md:-mt-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                        <span className="opacity-0 animate-fade-in">Hello, I'm</span>
                        <span className="text-primary opacity-0 animate-fade-in-delay-1">
                            {" "} Oliver
                        </span>
                        <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
                            {" "} Grudzinski
                        </span>
                    </h1>

                    <div className="opacity-0 animate-fade-in-delay-3 flex flex-col items-center">
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-snug">
                            I'm a junior at <span className="font-semibold text-red-600 dark:text-red-400">Milwaukee School of Engineering</span> with internship experience building full stack web applications and practical AI/ML solutions.
                        </p>
                    </div>
                </div>

                {/* Terminal below the text */}
                <div className="relative mt-8 opacity-0 animate-fade-in-delay-4">
                    <TerminalBackground />
                </div>
            </div>
            {/* Bottom center actions */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-9 animate-fade-in-delay-4">
                {/* Projects icon bubble */}
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

                {/* Scroll / About bouncing arrow */}
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
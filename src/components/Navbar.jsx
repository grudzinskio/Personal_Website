import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
]

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("Home");
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    const autoScrollTimeoutRef = useRef(null);

    const bubbleRef = useRef(null);
    const navGroupRef = useRef(null);
    const linkRefs = useRef({});

    const targetItem = hoveredItem || activeItem;

    // Position moving bubble
    useEffect(() => {
        const moveBubble = () => {
            if (!navGroupRef.current || !bubbleRef.current) return;
            const link = linkRefs.current[targetItem];
            if (!link) return;
            const groupRect = navGroupRef.current.getBoundingClientRect();
            const rect = link.getBoundingClientRect();
            const top = rect.top - groupRect.top;
            const left = rect.left - groupRect.left;
            bubbleRef.current.style.opacity = '1';
            bubbleRef.current.style.transform = `translate(${left}px, ${top}px)`;
            bubbleRef.current.style.width = `${rect.width}px`;
            bubbleRef.current.style.height = `${rect.height}px`;
        };
        const id = requestAnimationFrame(moveBubble);
        return () => cancelAnimationFrame(id);
    }, [targetItem, activeItem]);

    // Reposition on resize
    useEffect(() => {
        const handle = () => {
            if (!bubbleRef.current) return;
            bubbleRef.current.style.opacity = '0';
            requestAnimationFrame(() => {
                const link = linkRefs.current[targetItem];
                if (!link || !navGroupRef.current || !bubbleRef.current) return;
                const groupRect = navGroupRef.current.getBoundingClientRect();
                const rect = link.getBoundingClientRect();
                bubbleRef.current.style.opacity = '1';
                bubbleRef.current.style.transform = `translate(${rect.left - groupRect.left}px, ${rect.top - groupRect.top}px)`;
                bubbleRef.current.style.width = `${rect.width}px`;
                bubbleRef.current.style.height = `${rect.height}px`;
            });
        };
        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, [targetItem]);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scrollspy: update active nav item based on section in viewport
    useEffect(() => {
        const sectionMap = navItems.map(it => ({ name: it.name, id: it.href.replace('#','') }));
        const getActiveFromScroll = () => {
            if (hoveredItem || isAutoScrolling) return; // don't override during hover or programmatic scroll
            const scrollY = window.scrollY;
            const offset = 140; // adjust sensitivity (smaller -> earlier switch)
            let current = sectionMap[0].name;
            for (const { name, id } of sectionMap) {
                const el = document.getElementById(id);
                if (!el) continue;
                const top = el.offsetTop;
                if (scrollY + offset >= top) {
                    current = name;
                } else {
                    break;
                }
            }
            if (current !== activeItem) setActiveItem(current);
        };
        window.addEventListener('scroll', getActiveFromScroll, { passive: true });
        window.addEventListener('resize', getActiveFromScroll);
        getActiveFromScroll();
        return () => {
            window.removeEventListener('scroll', getActiveFromScroll);
            window.removeEventListener('resize', getActiveFromScroll);
        };
    }, [hoveredItem, isAutoScrolling, activeItem]);
    
    return (
        <>
            <nav className={cn(
                "fixed w-full z-40 transition-all duration-300",
                isScrolled
                    ? "py-3 bg-card/55 backdrop-blur-md shadow-lg border-b border-border/30"
                    : "py-5 bg-card/30 backdrop-blur-sm border-b border-border/10"
            )}
            >
                <div className='w-full relative flex items-center px-4'>
                    <a className="text-xl font-bold text-primary flex items-center ml-4 md:ml-20">
                        <span className="relative z-10">
                            {" "}
                            <span className="text-glow text-foreground"> Oliver's </span> Portfolio
                        </span>
                    </a>

                    {/* desktop nav - moved closer to the sun */}
                    <div
                        ref={navGroupRef}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="hidden md:flex items-center space-x-8 absolute left-1/2 translate-x-20"
                        role="menubar"
                        aria-label="Main navigation"
                    >
                        {/* Moving highlight bubble */}
                        <span
                            ref={bubbleRef}
                            aria-hidden="true"
                            className="absolute top-0 left-0 z-0 rounded-full bg-primary/25 backdrop-blur-[2px] shadow-[0_0_0_1px_hsl(var(--primary)/0.35)] transition-all duration-300 ease-out pointer-events-none"
                            style={{ opacity: 0, transform: 'translate(0,0)', width: 0, height: 0 }}
                        />
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                ref={(el) => { if (el) linkRefs.current[item.name] = el; }}
                                href={item.href}
                                role="menuitem"
                                onClick={() => {
                                    setActiveItem(item.name);
                                    setIsAutoScrolling(true);
                                    if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
                                    // Rough duration of CSS smooth scroll; adjust as needed
                                    autoScrollTimeoutRef.current = setTimeout(() => {
                                        setIsAutoScrolling(false);
                                    }, 700);
                                }}
                                onMouseEnter={() => setHoveredItem(item.name)}
                                // Intentionally do not reset on leave to keep last hovered bubble until new target
                                onFocus={() => setHoveredItem(item.name)}
                                onBlur={() => setHoveredItem(null)}
                                className={cn(
                                    "relative z-10 px-2 py-1 rounded-md font-medium transition-colors duration-300",
                                    item.name === activeItem ? "text-primary" : "text-foreground/80 hover:text-primary"
                                )}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* desktop theme toggle - all the way to the right corner */}
                    <div className="hidden md:block absolute right-4">
                        <ThemeToggle />
                    </div>

                    {/* mobile nav button and theme toggle */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            className="p-2 text-foreground z-50"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* mobile menu overlay moved outside nav so it can truly center */}
            <div
                className={cn(
                    "fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex md:hidden transition-all duration-300",
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="relative m-auto w-[75%] max-w-xs rounded-2xl border border-border/40 bg-card/90 p-8 shadow-xl flex flex-col items-stretch">
                    <button
                        aria-label="Close menu"
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute -top-4 -right-4 h-10 w-10 rounded-full border border-border/40 bg-card/90 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition"
                    >
                        <X size={22} />
                    </button>
                    <div className="flex flex-col space-y-4 text-lg">
                        {navItems.map((item, key) => (
                            <a
                                key={key}
                                href={item.href}
                                className="text-foreground/85 hover:text-primary transition-colors duration-300 px-4 py-2 rounded-md border border-border/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
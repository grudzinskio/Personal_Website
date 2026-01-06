import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";
import ogLogo from "@/assets/Portfolio.png";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
]

export const Navbar = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    
    const isHomePage = location.pathname === '/';
    
    // Get active item from current route
    const activeItem = navItems.find(item => item.href === location.pathname)?.name || "Home";

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
            
            // Calculate scroll progress for fade out on home page
            if (isHomePage) {
                const maxScroll = window.innerHeight * 0.2; // Fade out by 20% of viewport - faster fade
                const currentScroll = window.scrollY;
                const progress = Math.min(currentScroll / maxScroll, 1);
                setScrollProgress(progress);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHomePage]);

    // Calculate opacity based on scroll progress (only on home page)
    const navOpacity = isHomePage ? 1 - scrollProgress : 1;
    const navTransform = isHomePage ? `translateY(-${scrollProgress * 10}px)` : 'translateY(0)';
    
    return (
        <>
            <nav 
                className={cn(
                    "fixed w-full z-40 transition-all duration-300",
                    isScrolled
                        ? "py-2 bg-card/80 backdrop-blur-lg shadow-xl border-b border-border/40"
                        : "py-3 bg-card/40 backdrop-blur-md border-b border-border/20"
                )}
                style={{ 
                    opacity: navOpacity,
                    transform: navTransform,
                    pointerEvents: isHomePage && scrollProgress > 0.9 ? 'none' : 'auto'
                }}
            >
                <div className='w-full relative flex items-center px-4 md:px-8'>
                    <Link to="/" className="flex items-center group p-2" style={{ minWidth: '44px', minHeight: '44px' }}>
                        <img 
                            src={ogLogo} 
                            alt="Portfolio" 
                            className="h-8 sm:h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-110"
                        />
                    </Link>

                    {/* desktop nav - centered */}
                    <div
                        ref={navGroupRef}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="hidden md:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2"
                        role="menubar"
                        aria-label="Main navigation"
                    >
                        {/* Moving highlight bubble with modern gradient */}
                        <span
                            ref={bubbleRef}
                            aria-hidden="true"
                            className="absolute top-0 left-0 z-0 rounded-full bg-gradient-to-r from-primary/30 to-primary/20 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 ease-out pointer-events-none"
                            style={{ opacity: 0, transform: 'translate(0,0)', width: 0, height: 0 }}
                        />
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                ref={(el) => { if (el) linkRefs.current[item.name] = el; }}
                                to={item.href}
                                role="menuitem"
                                onMouseEnter={() => setHoveredItem(item.name)}
                                onFocus={() => setHoveredItem(item.name)}
                                onBlur={() => setHoveredItem(null)}
                                className={cn(
                                    "relative z-10 px-4 py-2 rounded-full font-medium transition-all duration-300",
                                    item.name === activeItem 
                                        ? "text-primary" 
                                        : "text-foreground/70 hover:text-primary hover:scale-105"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* mobile nav button */}
                    <div className="md:hidden flex items-center ml-auto">
                        <button
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            className="p-3 text-foreground z-50 rounded-lg hover:bg-primary/10 transition-colors"
                            style={{ minWidth: '44px', minHeight: '44px' }}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* mobile menu overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex md:hidden transition-all duration-300",
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="relative m-auto w-[85%] max-w-sm rounded-3xl border border-border/40 bg-gradient-to-br from-card/95 to-card/90 p-8 shadow-2xl flex flex-col items-stretch">
                    <button
                        aria-label="Close menu"
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute -top-4 -right-4 h-12 w-12 rounded-full border border-border/40 bg-gradient-to-br from-card to-card/80 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                        style={{ minWidth: '48px', minHeight: '48px' }}
                    >
                        <X size={22} />
                    </button>
                    <div className="flex flex-col space-y-4 text-lg">
                        {navItems.map((item, key) => (
                            <Link
                                key={key}
                                to={item.href}
                                className={cn(
                                    "px-6 py-4 rounded-xl transition-all duration-300 text-center font-medium",
                                    item.name === activeItem
                                        ? "bg-gradient-to-r from-primary/30 to-primary/20 text-primary border border-primary/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                                        : "text-foreground/80 hover:text-primary border border-border/30 bg-background/30 hover:bg-primary/10 hover:border-primary/30"
                                )}
                                style={{ minHeight: '44px' }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
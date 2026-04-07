import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
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
                    "fixed w-full z-40 transition-all duration-500",
                    isScrolled
                        ? "py-2 backdrop-blur-2xl border-b border-white/[0.06]"
                        : "py-3 border-b border-transparent"
                )}
                style={{
                    background: isScrolled ? 'rgba(0,0,0,0.72)' : 'transparent',
                }}
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
                            decoding="async"
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
                        {/* Moving highlight bubble — Apple-style pure white pill */}
                        <span
                            ref={bubbleRef}
                            aria-hidden="true"
                            className="absolute top-0 left-0 z-0 rounded-full transition-all duration-300 ease-out pointer-events-none"
                            style={{
                                opacity: 0,
                                transform: 'translate(0,0)',
                                width: 0,
                                height: 0,
                                background: 'rgba(255,255,255,0.08)',
                            }}
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
                                    "relative z-10 px-4 py-2 rounded-full text-sm font-medium tracking-[-0.01em] transition-all duration-300",
                                    item.name === activeItem
                                        ? "text-white"
                                        : "text-white/50 hover:text-white/90"
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
                    "fixed inset-0 z-50 flex md:hidden transition-all duration-400",
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
            >
                <div className="relative m-auto w-[85%] max-w-sm rounded-2xl border border-white/[0.08] p-8 flex flex-col items-stretch"
                    style={{ background: 'rgba(28,28,30,0.95)' }}>
                    <button
                        aria-label="Close menu"
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute -top-4 -right-4 h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        style={{ background: 'rgba(28,28,30,0.9)', minWidth: '40px', minHeight: '40px' }}
                    >
                        <X size={18} />
                    </button>
                    <div className="flex flex-col space-y-2">
                        {navItems.map((item, key) => (
                            <Link
                                key={key}
                                to={item.href}
                                className={cn(
                                    "px-5 py-4 rounded-xl transition-all duration-200 text-center text-sm font-medium tracking-[-0.01em]",
                                    item.name === activeItem
                                        ? "text-white bg-white/10"
                                        : "text-white/50 hover:text-white hover:bg-white/5"
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
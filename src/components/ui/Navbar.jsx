import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { getScrollY } from "@/utils/animations/smoothScroll";
import { X, Menu } from "lucide-react";
import ogLogo from "@/assets/Portfolio-logo.png";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
]

export const Navbar = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [homeHideProgress, setHomeHideProgress] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const isHomePage = location.pathname === '/';
    const isCompact = isHomePage ? homeHideProgress >= 0.55 : isScrolled;

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
        const transitionId = setTimeout(moveBubble, 330);
        return () => {
            cancelAnimationFrame(id);
            clearTimeout(transitionId);
        };
    }, [targetItem, activeItem, isCompact]);

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
    }, [targetItem, isCompact]);

    useEffect(() => {
        let lastProgress = null;
        let lastScrolled = null;
        let rafId = null;

        const tick = () => {
            const scrollY = getScrollY();

            if (isHomePage) {
                const hideDistance = 120; // px until fully hidden
                const nextProgress = Math.max(0, Math.min(scrollY / hideDistance, 1));
                const rounded = Math.round(nextProgress * 100) / 100;

                if (rounded !== lastProgress) {
                    lastProgress = rounded;
                    setHomeHideProgress(rounded);
                }

                if (lastScrolled !== false) {
                    lastScrolled = false;
                    setIsScrolled(false);
                }
            } else {
                const scrolled = scrollY > 10;
                if (scrolled !== lastScrolled) {
                    lastScrolled = scrolled;
                    setIsScrolled(scrolled);
                }
                if (lastProgress !== 0) {
                    lastProgress = 0;
                    setHomeHideProgress(0);
                }
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isHomePage]);

    return (
        <>
            <nav
                className={cn(
                    "fixed w-full z-40 border-b transition-[padding,background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out",
                    isCompact
                        ? "py-1 backdrop-blur-md border-white/[0.1] shadow-[0_10px_36px_rgba(0,0,0,0.24)]"
                        : "py-3 backdrop-blur-sm border-white/[0.06]"
                )}
                style={{
                    background: isCompact
                            ? "rgba(2, 6, 23, 0.85)"
                            : "linear-gradient(to bottom, rgba(2,6,23,0.6) 0%, rgba(2,6,23,0) 100%)",
                }}
            >
                <div className='content-shell relative flex items-center px-4 md:px-8'>
                    <Link
                        to="/"
                        className={cn(
                            "flex items-center group transition-all duration-300",
                            isCompact ? "p-1.5" : "p-2"
                        )}
                        style={{ minWidth: '44px', minHeight: '44px' }}
                    >
                        <img
                            src={ogLogo}
                            alt="Portfolio"
                            className={cn(
                                "w-auto transition-all duration-300 group-hover:scale-110",
                                isCompact ? "h-7 md:h-8" : "h-8 sm:h-10 md:h-12"
                            )}
                            decoding="async"
                        />
                    </Link>

                    {/* desktop nav - centered */}
                    <div
                        ref={navGroupRef}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="hidden md:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 p-1"
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
                                background: 'rgba(255,255,255,0.1)',
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
                                    "relative z-10 rounded-full font-medium tracking-[-0.01em] transition-all duration-300",
                                    isCompact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
                                    item.name === activeItem
                                        ? "text-white"
                                        : "text-white/85 hover:text-white"
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
                            className={cn(
                                "text-foreground z-50 rounded-lg hover:bg-primary/10 transition-all duration-300",
                                isCompact ? "p-2" : "p-3"
                            )}
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
                style={{ background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
            >
                <div className="relative m-auto w-[85%] max-w-sm rounded-lg border border-white/[0.12] p-8 flex flex-col items-stretch"
                    style={{ background: 'rgba(15,23,42,0.96)' }}>
                    <button
                        aria-label="Close menu"
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute -top-4 -right-4 h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
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
                                        : "text-white/85 hover:text-white hover:bg-white/5"
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

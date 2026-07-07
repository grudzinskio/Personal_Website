import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { getScrollY } from "@/utils/animations/smoothScroll";
import { X, Menu } from "lucide-react";
import ogLogo from "@/assets/OG_New_logo.png";

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
    const [logoHover, setLogoHover] = useState(false);

    const isHomePage = location.pathname === '/';
    const isCompact = isHomePage ? homeHideProgress >= 0.55 : isScrolled;

    // Get active item from current route
    const activeItem = navItems.find(item => item.href === location.pathname)?.name || "Home";

    const bubbleRef = useRef(null);
    const navGroupRef = useRef(null);
    const linkRefs = useRef({});

    const targetItem = hoveredItem || activeItem;

    // Split the items around the centred logo, like the reference pill.
    const leftItems = navItems.slice(0, 2);
    const rightItems = navItems.slice(2);

    // Position moving bubble
    useEffect(() => {
        const moveBubble = () => {
            if (!navGroupRef.current || !bubbleRef.current) return;
            // While the logo is hovered its label expands over the bubble's spot,
            // so hide the amber bubble to keep it from showing behind the text.
            if (logoHover) {
                bubbleRef.current.style.opacity = '0';
                return;
            }
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
    }, [targetItem, activeItem, isCompact, logoHover]);

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
                    "fixed inset-x-0 top-0 z-40 flex justify-center transition-[padding] duration-300 ease-out",
                    isCompact ? "pt-2" : "pt-4"
                )}
            >
                {/* Desktop: one floating black pill — links split around a centred logo */}
                <div
                    ref={navGroupRef}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] p-1.5 shadow-[0_16px_44px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                    style={{ background: "rgba(10, 10, 11, 0.92)" }}
                    role="menubar"
                    aria-label="Main navigation"
                >
                    {/* Moving highlight — solid amber pill under the active/hovered item */}
                    <span
                        ref={bubbleRef}
                        aria-hidden="true"
                        className="absolute top-0 left-0 z-0 rounded-full transition-all duration-300 ease-out pointer-events-none shadow-[0_4px_16px_-4px_rgba(245,181,68,0.55)]"
                        style={{
                            opacity: 0,
                            transform: 'translate(0,0)',
                            width: 0,
                            height: 0,
                            background: 'hsl(var(--accent))',
                        }}
                    />

                    {leftItems.map((item) => (
                        <Link
                            key={item.name}
                            ref={(el) => { if (el) linkRefs.current[item.name] = el; }}
                            to={item.href}
                            role="menuitem"
                            onMouseEnter={() => setHoveredItem(item.name)}
                            onFocus={() => setHoveredItem(item.name)}
                            onBlur={() => setHoveredItem(null)}
                            className={cn(
                                "relative z-10 rounded-full tracking-[-0.01em] transition-colors duration-200 px-5 py-2 text-sm",
                                item.name === targetItem
                                    ? "text-white font-semibold"
                                    : "text-white/65 font-medium hover:text-white"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* centred logo */}
                    <Link
                        to="/"
                        className="group relative z-10 mx-2 flex items-center justify-center"
                        style={{ minWidth: '44px', minHeight: '44px' }}
                        aria-label="Home"
                        onMouseEnter={() => setLogoHover(true)}
                        onMouseLeave={() => setLogoHover(false)}
                    >
                        <img
                            src={ogLogo}
                            alt="Portfolio"
                            className="h-8 w-auto transition-transform duration-300 group-hover:scale-110"
                            decoding="async"
                        />

                        {/* hover reveal — after a ~1s dwell the label expands out
                            beside the logo (grid 0fr→1fr animates to its width).
                            The 1s delay lives only on group-hover so it opens slowly
                            but collapses instantly when the pointer leaves. */}
                        <span
                            aria-hidden="true"
                            className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out delay-0 group-hover:grid-cols-[1fr] group-hover:delay-500"
                        >
                            <span className="min-w-0 overflow-hidden">
                                <span className="block whitespace-nowrap pl-2 leading-tight opacity-0 transition-opacity duration-300 delay-0 group-hover:opacity-100 group-hover:delay-500">
                                    <span className="block text-[8px] font-medium uppercase tracking-[0.12em] text-white/50">
                                        Made by
                                    </span>
                                    <span className="block text-[11px] font-semibold text-white/90">
                                        Oliver Grudzinski
                                    </span>
                                </span>
                            </span>
                        </span>
                    </Link>

                    {rightItems.map((item) => (
                        <Link
                            key={item.name}
                            ref={(el) => { if (el) linkRefs.current[item.name] = el; }}
                            to={item.href}
                            role="menuitem"
                            onMouseEnter={() => setHoveredItem(item.name)}
                            onFocus={() => setHoveredItem(item.name)}
                            onBlur={() => setHoveredItem(null)}
                            className={cn(
                                "relative z-10 rounded-full tracking-[-0.01em] transition-colors duration-200 px-5 py-2 text-sm",
                                item.name === targetItem
                                    ? "text-white font-semibold"
                                    : "text-white/65 font-medium hover:text-white"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile: compact pill with logo + menu button */}
                <div
                    className="flex md:hidden items-center gap-6 rounded-full border border-white/[0.08] px-4 py-2 shadow-[0_16px_44px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                    style={{ background: "rgba(10, 10, 11, 0.92)" }}
                >
                    <Link to="/" aria-label="Home" className="flex items-center" style={{ minHeight: '44px' }}>
                        <img src={ogLogo} alt="Portfolio" className="h-7 w-auto" decoding="async" />
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="text-foreground z-50 rounded-lg p-2 hover:bg-white/10 transition-colors duration-200"
                        style={{ minWidth: '44px', minHeight: '44px' }}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
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
                <div className="relative m-auto w-[85%] max-w-sm rounded-2xl border border-white/[0.1] p-6 flex flex-col items-stretch"
                    style={{ background: 'rgba(12,12,14,0.98)' }}>
                    <button
                        aria-label="Close menu"
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute -top-4 -right-4 h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                        style={{ background: 'rgba(20,20,22,0.95)', minWidth: '40px', minHeight: '40px' }}
                    >
                        <X size={18} />
                    </button>

                    <p className="px-1 pb-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
                        Menu
                    </p>

                    <div className="flex flex-col space-y-1">
                        {navItems.map((item, key) => (
                            <Link
                                key={key}
                                to={item.href}
                                className={cn(
                                    "px-5 py-4 rounded-xl transition-colors duration-200 text-center text-base font-medium tracking-[-0.01em]",
                                    item.name === activeItem
                                        ? "text-amber-200 bg-amber-300/10"
                                        : "text-white/80 hover:text-white hover:bg-white/5"
                                )}
                                style={{ minHeight: '44px' }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <Link
                        to="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="cosmic-button mt-4 w-full"
                        style={{ minHeight: '48px' }}
                    >
                        Let&rsquo;s talk
                    </Link>
                </div>
            </div>
        </>
    );
}

import { useEffect, useRef } from 'react';
import holoShape01 from '../../assets/holo-01.webp';
import holoShape05 from '../../assets/holo-05.webp';
import holoShape06 from '../../assets/holo-06.webp';

/**
 * HeroDesign — the decorative backdrop for the light hero: floating holographic
 * 3D image cutouts. Rendered as an `absolute inset-0` layer INSIDE the hero's
 * `relative isolate` <SectionBackground> so it exactly covers the hero panel and
 * scrolls with it. Sits at zIndex -1 (above the tone layer, below the letters),
 * its own `overflow-hidden` keeps off-canvas shapes from creating horizontal
 * scroll, and it ignores pointer events.
 *
 * Interactivity: a proximity "hover". Each shape's distance to the cursor is
 * measured on pointer move; the closer the cursor, the higher `--i` (0→1) on that
 * shape, which scales it up, lifts it, and deepens its shadow. Computing distance
 * in JS (rather than a CSS :hover) lets the shapes react even though the hero
 * letters sit on top of them and would otherwise swallow the pointer. Disabled
 * for touch and prefers-reduced-motion. The float animation lives on the <img>
 * (its own transform), so the wrapper's scale/lift never fights it.
 */

// Wrapper carries the proximity scale/lift + growing shadow, driven by `--i`
// (0 = far, 1 = cursor centred on the shape). The <img> keeps the float anim.
const shapeWrapStyle = {
    transform:
        'translateY(calc(var(--i, 0) * -14px)) scale(calc(1 + var(--i, 0) * 0.13))',
    filter:
        'drop-shadow(0 calc(20px + var(--i, 0) * 26px) calc(42px + var(--i, 0) * 28px) rgba(60, 60, 120, calc(0.22 + var(--i, 0) * 0.22)))',
    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease',
    willChange: 'transform',
};

export const HeroDesign = () => {
    const shapeRefs = useRef([]);

    useEffect(() => {
        const canHover = window.matchMedia('(hover: hover)').matches;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!canHover || reduce) return undefined;

        const RADIUS = 280; // px of influence around each shape's centre
        let frame = null;
        let mx = -99999;
        let my = -99999;

        const apply = () => {
            frame = null;
            shapeRefs.current.forEach((el) => {
                if (!el) return;
                const r = el.getBoundingClientRect();
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                const dist = Math.hypot(mx - cx, my - cy);
                const i = Math.max(0, 1 - dist / RADIUS); // 1 near, 0 far
                el.style.setProperty('--i', i.toFixed(3));
            });
        };

        const onMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
            if (!frame) frame = requestAnimationFrame(apply);
        };
        // reset when the pointer leaves the window entirely
        const onLeave = () => {
            mx = -99999;
            my = -99999;
            if (!frame) frame = requestAnimationFrame(apply);
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerleave', onLeave, { passive: true });
        return () => {
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', onLeave);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ zIndex: -1 }}
        >
            <div
                ref={(el) => (shapeRefs.current[0] = el)}
                className="absolute -right-6 top-[6rem] w-[15rem] max-w-[48vw] md:-right-16 md:-top-12 md:w-[34rem]"
                style={shapeWrapStyle}
            >
                <img
                    src={holoShape01}
                    alt=""
                    className="hero-shape block w-full"
                    style={{ '--r': '-6deg' }}
                />
            </div>
            <div
                ref={(el) => (shapeRefs.current[1] = el)}
                className="absolute -left-6 top-[17rem] w-[12rem] max-w-[42vw] md:-left-20 md:top-24 md:w-[22rem]"
                style={shapeWrapStyle}
            >
                <img
                    src={holoShape05}
                    alt=""
                    className="hero-shape hero-shape--b block w-full"
                    style={{ '--r': '8deg' }}
                />
            </div>
            <div
                ref={(el) => (shapeRefs.current[2] = el)}
                className="absolute right-[8%] top-[27rem] w-[9rem] max-w-[30vw] md:right-[26%] md:top-[19rem] md:w-[16rem]"
                style={shapeWrapStyle}
            >
                <img
                    src={holoShape06}
                    alt=""
                    className="hero-shape hero-shape--c block w-full"
                    style={{ '--r': '4deg' }}
                />
            </div>
        </div>
    );
};

export default HeroDesign;

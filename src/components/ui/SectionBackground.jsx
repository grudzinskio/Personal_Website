import { useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

/**
 * SectionBackground — a background that belongs to ONE section and scrolls
 * *with* it, so two stacked sections meet at a hard horizontal seam. Stacks on
 * top of the page background (the opposite of the fixed <Background /> switcher).
 *
 *   <SectionBackground tone="spotlight">
 *     <MySection />
 *   </SectionBackground>
 *
 * Props:
 *   tone    — 'dark' (angled-streak texture) | 'light' (near-white) |
 *             'image' (full-bleed photo) | 'spotlight' (amber beam on black)
 *   image   — url, used when tone="image"
 *   rounded — round the corners so the panel reads as a floating card
 */
export const SectionBackground = ({
    children,
    tone = 'dark',
    image,
    rounded = false,
    className,
    // Feather the TOP edge of this section's background from transparent to
    // opaque so it dissolves into whatever section sits above it instead of
    // hard-cutting. Pass a CSS length for the fade distance (e.g. "16vh").
    featherTop,
}) => {
    const ref = useRef(null);

    // Top-edge fade mask (used e.g. for the hero -> spotlight transition). Applied
    // to the in-flow background layer so the section above shows through the fade.
    const featherStyle = featherTop
        ? {
              WebkitMaskImage: `linear-gradient(to bottom, transparent 0, #000 ${featherTop})`,
              maskImage: `linear-gradient(to bottom, transparent 0, #000 ${featherTop})`,
          }
        : null;

    // Spotlight follows the pointer within this section (parks centre otherwise).
    useEffect(() => {
        if (tone !== 'spotlight') return undefined;
        const el = ref.current;
        if (!el) return undefined;

        el.style.setProperty('--mx', '50%');
        el.style.setProperty('--my', '42%');

        const canHover = window.matchMedia('(hover: hover)').matches;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!canHover || reduce) return undefined;

        let frame = null;
        let x = 0;
        let y = 0;
        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = null;
                el.style.setProperty('--mx', `${x}px`);
                el.style.setProperty('--my', `${y}px`);
            });
        };
        el.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            el.removeEventListener('pointermove', onMove);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [tone]);

    return (
        <div
            ref={ref}
            data-tone={tone}
            className={cn(
                'relative isolate',
                rounded && 'overflow-hidden rounded-[2.25rem]',
                className,
            )}
        >
            {/* Section-anchored background (in flow => scrolls with the section) */}
            {tone === 'spotlight' ? (
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundColor: '#08090b',
                        backgroundImage:
                            'radial-gradient(440px 440px at var(--mx) var(--my), rgba(245,181,68,0.16), transparent 70%), radial-gradient(820px 820px at var(--mx) var(--my), rgba(245,181,68,0.06), transparent 75%)',
                        ...featherStyle,
                    }}
                    aria-hidden="true"
                />
            ) : tone === 'light' ? (
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        // muted warm greige — softer on the eyes than a bright near-white
                        backgroundColor: '#e7e4dd',
                        backgroundImage:
                            'radial-gradient(85% 65% at 84% -5%, rgba(203,75,11,0.13), transparent 55%)',
                    }}
                    aria-hidden="true"
                />
            ) : tone === 'image' && image ? (
                <>
                    <div
                        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url("${image}")`, filter: 'brightness(0.8)' }}
                        aria-hidden="true"
                    />
                    {/* scrim keeps copy readable over the photo */}
                    <div
                        className="absolute inset-0 -z-10"
                        style={{
                            background:
                                'linear-gradient(to bottom, rgba(8,9,11,0.7), rgba(8,9,11,0.55) 45%, rgba(8,9,11,0.8))',
                        }}
                        aria-hidden="true"
                    />
                </>
            ) : (
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundColor: '#0c0d11',
                        backgroundImage: `
                            repeating-linear-gradient(115deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 22px),
                            repeating-linear-gradient(115deg, rgba(0,0,0,0.35) 0 14px, transparent 14px 40px),
                            radial-gradient(120% 90% at 82% 8%, rgba(245,181,68,0.12), transparent 55%)
                        `,
                    }}
                    aria-hidden="true"
                />
            )}

            {children}
        </div>
    );
};

export default SectionBackground;

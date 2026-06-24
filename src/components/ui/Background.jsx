/**
 * Background — the original 3D image, calmed down.
 *
 * Layers (all fixed, static):
 *   0. Solid near-black base (#0A0A0B)
 *   1. The original background.webp, dimmed (~40%) and slightly desaturated
 *   2. A dark vignette + bottom fade so text always stays legible
 *   3. A faint amber glow up top to tie into the accent
 */
export const Background = () => {
    return (
        <>
            {/* Layer 0: solid foundation */}
            <div
                className="fixed inset-0 bg-[#0a0a0b]"
                style={{ zIndex: -4 }}
                aria-hidden="true"
            />

            {/* Layer 1: original 3D image, dimmed + desaturated */}
            <div
                className="app-bg-image fixed inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    zIndex: -3,
                    opacity: 0.6,
                    filter: 'brightness(0.7) saturate(0.9)',
                }}
                aria-hidden="true"
            />

            {/* Layer 2: vignette + bottom fade keeps copy readable everywhere */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: -2,
                    background:
                        'linear-gradient(to bottom, rgba(10,10,11,0.5) 0%, rgba(10,10,11,0.42) 45%, rgba(10,10,11,0.86) 100%), radial-gradient(130% 95% at 50% 0%, transparent 38%, rgba(10,10,11,0.72) 100%)',
                }}
                aria-hidden="true"
            />

            {/* Layer 3: faint amber glow, top-center */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: -1,
                    background:
                        'radial-gradient(60% 45% at 50% -8%, rgba(245, 181, 68, 0.10), transparent 70%)',
                }}
                aria-hidden="true"
            />
        </>
    );
};

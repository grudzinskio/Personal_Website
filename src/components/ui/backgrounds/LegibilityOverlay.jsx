/**
 * LegibilityOverlay — edge-weighted, NOT a full wash.
 *
 * The old version dropped a near-black vignette at up to 86% opacity over the
 * whole viewport, which flattened every background into "dark with a glow."
 * This version only darkens the very top (so the navbar reads) and the bottom
 * (so the footer reads), leaving the middle band clear so the actual
 * background structure shows through. Content sections carry their own
 * `glass-card` backing where they need it.
 */
export const LegibilityOverlay = () => {
    return (
        <div
            className="fixed inset-0 pointer-events-none"
            style={{
                zIndex: -1,
                background:
                    'linear-gradient(to bottom, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0) 14%, rgba(10,10,11,0) 78%, rgba(10,10,11,0.82) 100%)',
            }}
            aria-hidden="true"
        />
    );
};

export default LegibilityOverlay;

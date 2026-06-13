/**
 * Background - Three-layer system: static 3D image → dark gradient overlay → glass foreground
 */
export const Background = () => {
    return (
        <>
            {/* Layer 1: Static 3D background image with pure-black fallback */}
            <div
                className="app-bg-image fixed inset-0 bg-black bg-cover bg-center bg-no-repeat"
                style={{ zIndex: -2 }}
                aria-hidden="true"
            />

            {/* Layer 2: Contrast overlay — vibrant center, darkened edges & bottom */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: -1,
                    background:
                        'radial-gradient(circle at 50% 22%, rgba(14, 165, 233, 0.14), transparent 42%), linear-gradient(to bottom, rgba(2,6,23,0.68) 0%, rgba(2,6,23,0.72) 48%, rgba(2,6,23,0.88) 100%), linear-gradient(90deg, rgba(2,6,23,0.88), rgba(2,6,23,0.42) 46%, rgba(2,6,23,0.88))',
                }}
                aria-hidden="true"
            />
        </>
    );
};

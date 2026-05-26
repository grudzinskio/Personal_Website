/**
 * Background - Three-layer system: static 3D image → dark gradient overlay → glass foreground
 */
export const Background = () => {
    return (
        <>
            {/* Layer 1: Static 3D background image with pure-black fallback */}
            <div
                className="fixed inset-0 bg-black bg-cover bg-center bg-no-repeat"
                style={{ zIndex: -2, backgroundImage: "url('/background.png')" }}
                aria-hidden="true"
            />

            {/* Layer 2: Contrast overlay — vibrant center, darkened edges & bottom */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: -1,
                    background:
                        'linear-gradient(to bottom, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0.45) 50%, rgba(5,5,5,0.75) 100%)',
                }}
                aria-hidden="true"
            />
        </>
    );
};

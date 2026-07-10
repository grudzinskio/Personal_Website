/**
 * ImageBackground — the original high-quality "Windows-style" 3D image,
 * calmed down. This is the site default so nothing regresses.
 *
 *   Layer 0: solid near-black base (#0A0A0B)
 *   Layer 1: the original background.webp, dimmed + slightly desaturated
 */
export const ImageBackground = () => {
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
        </>
    );
};

export default ImageBackground;

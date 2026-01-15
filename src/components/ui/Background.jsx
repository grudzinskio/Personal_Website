import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Multi-layered animated dark background with gradient blobs that respond to scroll
 * Optimized for performance with fixed positioning and GPU acceleration
 */
export const Background = () => {
    const { scrollYProgress } = useScroll();

    // Move blobs based on scroll
    const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const blob2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Layer 1: Base Dark Gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom, #000000, #0a0a0a, #000000)'
                }}
            />

            {/* Layer 2: Grid Pattern */}
            <div className="absolute inset-0 bg-grid" style={{ opacity: 1 }} />

            {/* Layer 3: Animated Gradient Blob 1 (Blue) */}
            <motion.div
                style={{ y: blob1Y }}
                className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full animate-blob"
                aria-hidden="true"
            >
                <div
                    className="w-full h-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,112,243,0.2) 0%, rgba(0,112,243,0.05) 50%, transparent 100%)',
                        filter: 'blur(60px)'
                    }}
                />
            </motion.div>

            {/* Layer 4: Animated Gradient Blob 2 (Purple) */}
            <motion.div
                style={{ y: blob2Y }}
                className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full animate-blob animation-delay-200"
                aria-hidden="true"
            >
                <div
                    className="w-full h-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(121,40,202,0.15) 0%, rgba(121,40,202,0.05) 50%, transparent 100%)',
                        filter: 'blur(60px)'
                    }}
                />
            </motion.div>

            {/* Layer 5: Animated Gradient Blob 3 (Pink) */}
            <motion.div
                style={{ y: blob3Y }}
                className="absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full animate-blob animation-delay-400"
                aria-hidden="true"
            >
                <div
                    className="w-full h-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,0,128,0.1) 0%, transparent 100%)',
                        filter: 'blur(60px)'
                    }}
                />
            </motion.div>

            {/* Layer 6: Radial Gradient Overlay (Top) */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px]"
                style={{
                    background: 'radial-gradient(circle at center, rgba(0,112,243,0.05) 0%, transparent 50%, transparent 100%)'
                }}
            />

            {/* Layer 7: Noise Texture */}
            <div className="absolute inset-0 noise pointer-events-none" />

            {/* Layer 8: Vignette Effect */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(0,0,0,0.8) 100%)'
                }}
            />
        </div>
    );
};

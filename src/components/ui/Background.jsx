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

            {/* Layer 3: Animated Gradient Blob 1 (Blue) */}
            <motion.div
                style={{ y: blob1Y }}
                className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full animate-blob"
                aria-hidden="true"
            >
                <div
                    className="w-full h-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,112,243,0.18) 0%, rgba(0,112,243,0.04) 60%, transparent 100%)',
                        filter: 'blur(80px)'
                    }}
                />
            </motion.div>

            {/* Layer 4: Animated Gradient Blob 2 (Purple) */}
            <motion.div
                style={{ y: blob2Y }}
                className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full animate-blob animation-delay-200"
                aria-hidden="true"
            >
                <div
                    className="w-full h-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(121,40,202,0.14) 0%, rgba(121,40,202,0.03) 60%, transparent 100%)',
                        filter: 'blur(80px)'
                    }}
                />
            </motion.div>

            {/* Layer 5: Animated Gradient Blob 3 (Pink/Indigo) */}
            <motion.div
                style={{ y: blob3Y }}
                className="absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full animate-blob animation-delay-400"
                aria-hidden="true"
            >
                <div
                    className="w-full h-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(99,60,220,0.1) 0%, transparent 100%)',
                        filter: 'blur(100px)'
                    }}
                />
            </motion.div>

            {/* Layer 6: Apple-style top radial highlight */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[600px]"
                style={{
                    background: 'radial-gradient(ellipse at center top, rgba(80,60,200,0.07) 0%, transparent 70%)'
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

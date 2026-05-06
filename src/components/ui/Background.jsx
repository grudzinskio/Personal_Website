import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Background — dark charcoal/navy canvas with grid, drifting blue/cyan blobs, noise, and vignette
 */
export const Background = () => {
    const { scrollYProgress } = useScroll();

    const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const blob2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base dark gradient */}
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, #000000, #0a0a0a, #000000)' }}
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid" style={{ opacity: 0.6 }} />

            {/* Blob 1 — top-left blue */}
            <motion.div
                style={{ y: blob1Y }}
                className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full animate-blob"
                aria-hidden="true"
            >
                <div
                    className="w-full h-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,112,243,0.20) 0%, rgba(0,112,243,0.05) 50%, transparent 100%)',
                        filter: 'blur(60px)',
                    }}
                />
            </motion.div>

            {/* Blob 2 — right cyan */}
            <motion.div
                style={{ y: blob2Y }}
                className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full animate-blob animation-delay-200"
                aria-hidden="true"
            >
                <div
                    className="w-full h-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(56,189,248,0.16) 0%, rgba(56,189,248,0.05) 50%, transparent 100%)',
                        filter: 'blur(60px)',
                    }}
                />
            </motion.div>

            {/* Blob 3 — bottom-center blue */}
            <motion.div
                style={{ y: blob3Y }}
                className="absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full animate-blob animation-delay-400"
                aria-hidden="true"
            >
                <div
                    className="w-full h-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 100%)',
                        filter: 'blur(80px)',
                    }}
                />
            </motion.div>

            {/* Top radial highlight */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px]"
                style={{
                    background: 'radial-gradient(circle at center, rgba(0,112,243,0.05) 0%, transparent 50%)',
                }}
            />

            {/* Film grain noise */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    opacity: 0.03,
                    zIndex: 1,
                }}
                aria-hidden="true"
            />

            {/* Vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(0,0,0,0.7) 100%)',
                }}
            />
        </div>
    );
};

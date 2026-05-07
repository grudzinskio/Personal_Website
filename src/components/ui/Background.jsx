import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Background - smooth clinical Apple-style surface without visible grid lines.
 */
export const Background = () => {
    const { scrollYProgress } = useScroll();
    const washY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const sheenY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(180deg, #03060a 0%, #071216 28%, #05090f 58%, #000205 100%)',
                }}
            />

            <motion.div
                className="absolute inset-x-[-20%] top-[-26rem] h-[62rem]"
                aria-hidden="true"
                style={{
                    y: washY,
                    background:
                        'radial-gradient(ellipse at 50% 30%, rgba(130, 236, 226, 0.13) 0%, rgba(52, 144, 168, 0.075) 34%, rgba(3, 8, 12, 0) 72%)',
                    filter: 'blur(18px)',
                }}
            />

            <motion.div
                className="absolute inset-x-[-12%] top-[18%] h-[38rem] rotate-[-8deg]"
                aria-hidden="true"
                style={{
                    y: sheenY,
                    background:
                        'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.018) 24%, rgba(153, 246, 228, 0.048) 50%, rgba(255,255,255,0.014) 68%, transparent 100%)',
                    filter: 'blur(22px)',
                }}
            />

            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(90deg, rgba(255,255,255,0.018), transparent 18%, transparent 82%, rgba(255,255,255,0.012))',
                }}
                aria-hidden="true"
            />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    opacity: 0.022,
                    zIndex: 1,
                }}
                aria-hidden="true"
            />

            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse at center, transparent 0%, transparent 54%, rgba(0,0,0,0.78) 100%)',
                }}
                aria-hidden="true"
            />
        </div>
    );
};

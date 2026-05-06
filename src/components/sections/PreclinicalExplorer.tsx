import { motion } from "framer-motion";

const layerPaths = [
  "M723.5 966L680.5 1004V1053.5L711 1062.5L779 1027L811 1008L807.5 966L817 937L789.5 903L756 926L772 954.5L750 981L723.5 966Z",
  "M921.155 1027L842 920.718L933.976 820L1007 936.855L921.155 1027Z",
  "M607.5 1304.5V1425L630.5 1449.5L684 1388.5L666 1441L711 1512L766.5 1463.5L813.5 1364L827.5 1178L813.5 1141.5L778 1113L729.5 1104.5L666 1125.5L607.5 1189.5V1304.5Z",
  "M942.5 1290.5L901.5 1341.5H891.5V1564.5L942.5 1492L961 1509H1003.5L1045 1483.5V1412.5L1028 1358.5L1003.5 1321.5L942.5 1290.5Z",
] as const;

type InfoCardProps = {
  title: string;
  body: string;
};

function InfoCard({ title, body }: InfoCardProps) {
  return (
    <article className="relative flex min-h-[320px] flex-col justify-center overflow-hidden rounded-3xl border border-sky-300/20 bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-sky-950/20 px-5 py-10 sm:px-6 sm:py-11 lg:min-h-[380px] lg:px-5 lg:py-12 shadow-[0_0_0_1px_rgba(56,189,248,0.06),0_24px_80px_rgba(2,6,23,0.55),0_0_60px_rgba(56,189,248,0.07)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-sky-300/45 before:to-transparent after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:ring-1 after:ring-inset after:ring-white/[0.06]">
      <p className="relative text-[11px] font-medium uppercase tracking-[0.26em] text-sky-200/80">{title}</p>
      <p className="relative mt-5 text-sm sm:text-[15px] leading-relaxed text-white/60">{body}</p>
    </article>
  );
}

export function PreclinicalExplorer() {
  return (
    <section className="relative px-4 pb-20 sm:pb-24 md:pb-32 pt-6 sm:pt-10">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center text-3xl font-bold tracking-tight text-white/95 sm:mb-14 sm:text-4xl md:mb-16 md:text-5xl"
        >
          Research
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[0.9fr_1.2fr_0.9fr] lg:items-center">
          <div className="order-2 flex justify-center lg:order-1 lg:justify-end lg:pe-6 xl:pe-10">
            <div className="w-full max-w-sm lg:w-[min(100%,240px)] lg:max-w-[240px] xl:w-[min(100%,256px)] xl:max-w-[256px]">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <InfoCard
                  title="Segmentation Layers"
                  body="My research focus is automated longitudinal segmentation for multi-modality preclinical scans (CT, SPECT, PET), developed through Master of Science in Machine Learning coursework at MSOE."
                />
              </motion.div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px]">
              <div className="absolute inset-[-14%] rounded-[999px] bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,0.16)_0%,rgba(14,165,233,0.08)_42%,transparent_72%)] blur-3xl" aria-hidden="true" />
              <div
                className="absolute inset-[-7%] rounded-[999px] border border-sky-200/10 shadow-[0_0_90px_rgba(56,189,248,0.14)]"
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[1684/2528] w-full"
              >
                <img
                  src="/Mouse Transparent.png"
                  alt="Transparent preclinical mouse scan"
                  className="relative z-10 h-full w-full select-none object-contain drop-shadow-[0_30px_90px_rgba(2,132,199,0.18)]"
                  loading="eager"
                  decoding="async"
                />

                <svg
                  viewBox="0 0 1684 2528"
                  className="absolute inset-0 z-20 h-full w-full overflow-visible"
                  role="img"
                  aria-label="Interactive segmentation overlay"
                >
                  {layerPaths.map((d, idx) => (
                    <motion.path
                      key={d}
                      d={d}
                      initial={{ opacity: 0, pathLength: 0 }}
                      whileInView={{ opacity: 1, pathLength: 1 }}
                      viewport={{ once: true, amount: 0.65 }}
                      transition={{ duration: 0.95, delay: 0.06 + idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="cursor-pointer fill-blue-500/0 stroke-blue-200/55 stroke-[6] transition duration-300 hover:fill-blue-500/30 hover:stroke-blue-400 hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
              </motion.div>
            </div>
          </div>

          <div className="order-3 flex justify-center lg:justify-start lg:ps-6 xl:ps-10">
            <div className="w-full max-w-sm lg:w-[min(100%,240px)] lg:max-w-[240px] xl:w-[min(100%,256px)] xl:max-w-[256px]">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <InfoCard
                  title="CRO Workflow"
                  body="These intelligence views are built for structured readouts across biodistribution and radiopharmaceutical imaging workflows, with emphasis on clean data handling and review-ready exports for RPT Labworks."
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PreclinicalExplorer;

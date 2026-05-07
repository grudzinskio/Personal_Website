import { motion } from "framer-motion";
import { Activity, Database, FileCheck2, Layers3, ScanLine } from "lucide-react";

const layerPaths = [
  "M723.5 966L680.5 1004V1053.5L711 1062.5L779 1027L811 1008L807.5 966L817 937L789.5 903L756 926L772 954.5L750 981L723.5 966Z",
  "M921.155 1027L842 920.718L933.976 820L1007 936.855L921.155 1027Z",
  "M607.5 1304.5V1425L630.5 1449.5L684 1388.5L666 1441L711 1512L766.5 1463.5L813.5 1364L827.5 1178L813.5 1141.5L778 1113L729.5 1104.5L666 1125.5L607.5 1189.5V1304.5Z",
  "M942.5 1290.5L901.5 1341.5H891.5V1564.5L942.5 1492L961 1509H1003.5L1045 1483.5V1412.5L1028 1358.5L1003.5 1321.5L942.5 1290.5Z",
] as const;

const workflow = [
  {
    icon: ScanLine,
    label: "Acquire",
    detail: "CT, SPECT, and PET scan series prepared for longitudinal comparison.",
  },
  {
    icon: Layers3,
    label: "Segment",
    detail: "Automated anatomy masks make subtle organ-level changes easier to inspect.",
  },
  {
    icon: Database,
    label: "Structure",
    detail: "Clean imaging metadata and measurements move into review-ready datasets.",
  },
  {
    icon: FileCheck2,
    label: "Report",
    detail: "Outputs are designed for reproducible CRO and RPT Labworks readouts.",
  },
] as const;

function WorkflowStep({ icon: Icon, label, detail, index }: (typeof workflow)[number] & { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.72, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-100/20 hover:bg-white/[0.06]"
    >
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-100/15 bg-cyan-100/[0.06] text-cyan-100">
        <Icon className="size-5" strokeWidth={1.8} />
      </div>
      <h3 className="text-base font-semibold tracking-tight text-white">{label}</h3>
      <p className="mt-3 text-sm leading-6 text-white/55">{detail}</p>
    </motion.article>
  );
}

export function PreclinicalExplorer() {
  return (
    <section id="preclinical-research" className="relative overflow-hidden px-4 py-24 sm:py-28 md:py-36">
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-cyan-100/65 sm:text-xs"
          >
            Preclinical Imaging
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Academic Research
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-7 text-white/58 sm:text-lg"
          >
            Automated longitudinal segmentation for multi-modality mouse studies, shaped around the precision,
            traceability, and calm visual language expected in medical research tooling.
          </motion.p>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:mt-20 lg:grid-cols-[0.74fr_1.1fr_0.74fr] lg:gap-8 xl:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 grid gap-4 sm:grid-cols-3 lg:order-1 lg:grid-cols-1"
          >
            {[
              ["Modalities", "CT / SPECT / PET"],
              ["Focus", "Longitudinal segmentation"],
              ["Domain", "Radiopharmaceutical workflows"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/[0.08] bg-black/20 p-5 backdrop-blur-xl"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/38">{label}</p>
                <p className="mt-3 text-sm font-medium leading-6 text-white/78">{value}</p>
              </div>
            ))}
          </motion.div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-[330px] sm:max-w-[382px] lg:max-w-[412px]">
              <div className="absolute inset-[-8%] rounded-full border border-cyan-100/10 shadow-[0_0_55px_rgba(103,232,249,0.12)]" aria-hidden="true" />
              <div className="absolute inset-[-14%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(103,232,249,0.10)_0%,rgba(45,212,191,0.045)_40%,transparent_70%)] blur-2xl" aria-hidden="true" />
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
                  className="relative z-10 h-full w-full select-none object-contain opacity-95 brightness-105 contrast-105 drop-shadow-[0_30px_90px_rgba(8,145,178,0.12)]"
                  loading="eager"
                  decoding="async"
                />

                <svg
                  viewBox="0 0 1684 2528"
                  className="absolute inset-0 z-20 h-full w-full overflow-visible"
                  role="img"
                  aria-label="Segmentation overlay"
                >
                  {layerPaths.map((d, idx) => (
                    <motion.path
                      key={d}
                      d={d}
                      initial={{ opacity: 0, pathLength: 0 }}
                      whileInView={{ opacity: 1, pathLength: 1 }}
                      viewport={{ once: true, amount: 0.65 }}
                      transition={{ duration: 0.95, delay: 0.06 + idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="cursor-pointer fill-cyan-300/0 stroke-cyan-100/58 stroke-[6] transition duration-300 hover:fill-cyan-300/22 hover:stroke-white"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="order-3 rounded-[1.6rem] border border-cyan-100/10 bg-cyan-100/[0.045] p-6 backdrop-blur-xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-100/15 bg-cyan-100/[0.07] text-cyan-100">
              <Activity className="size-5" strokeWidth={1.8} />
            </div>
            <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.3em] text-cyan-100/48">
              Research Signal
            </p>
            <p className="mt-4 text-xl font-semibold leading-snug tracking-tight text-white">
              Designed to make complex scan review feel measured, legible, and trustworthy.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/55">
              The visual system moves away from heavy side panels and toward a quiet instrument-like interface:
              restrained chrome, clear labels, and a central scan that carries the story.
            </p>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {workflow.map((step, index) => (
            <WorkflowStep key={step.label} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PreclinicalExplorer;

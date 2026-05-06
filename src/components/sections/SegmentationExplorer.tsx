import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

const metrics = [
  {
    label: "Segmentation Layers",
    value: "4 regions",
    detail: "Region masks align over the scan for preclinical radiopharmaceutical review.",
    side: "left",
  },
  {
    label: "CRO Workflow",
    value: "Tracer studies",
    detail: "Built for structured readouts across biodistribution and imaging workflows.",
    side: "right",
  },
  {
    label: "Quant Review",
    value: "ROI-first",
    detail: "Cards surface the measured organs, activity trends, and review status.",
    side: "left",
  },
  {
    label: "Study Signal",
    value: "Clean handoff",
    detail: "A calmer way to move from scan context into analysis-ready outputs.",
    side: "right",
  },
] as const;

const maskPaths = [
  "M723.5 966L680.5 1004V1053.5L711 1062.5L779 1027L811 1008L807.5 966L817 937L789.5 903L756 926L772 954.5L750 981L723.5 966Z",
  "M921.155 1027L842 920.718L933.976 820L1007 936.855L921.155 1027Z",
  "M607.5 1304.5V1425L630.5 1449.5L684 1388.5L666 1441L711 1512L766.5 1463.5L813.5 1364L827.5 1178L813.5 1141.5L778 1113L729.5 1104.5L666 1125.5L607.5 1189.5V1304.5Z",
  "M942.5 1290.5L901.5 1341.5H891.5V1564.5L942.5 1492L961 1509H1003.5L1045 1483.5V1412.5L1028 1358.5L1003.5 1321.5L942.5 1290.5Z",
] as const;

export function SegmentationExplorer() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scanScale = useTransform(scrollYProgress, [0.05, 0.42, 0.88], [0.84, 1, 0.94]);
  const scanOpacity = useTransform(scrollYProgress, [0, 0.16, 0.9, 1], [0.3, 1, 1, 0.24]);
  const scanY = useTransform(scrollYProgress, [0, 1], [56, -56]);

  return (
    <section ref={sectionRef} id="segmentation" className="relative min-h-[240vh] px-4 sm:px-8">
      <div className="sticky top-0 flex min-h-screen items-center justify-center py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.74fr_1fr_0.74fr] lg:items-center">
          <MetricStack side="left" progress={scrollYProgress} />

          <motion.div
            style={{ scale: scanScale, opacity: scanOpacity, y: scanY, translateZ: 0 }}
            className="relative mx-auto aspect-[1684/2528] w-[min(72vw,360px)] sm:w-[min(52vw,430px)] lg:w-[min(30vw,500px)]"
          >
            <div className="absolute inset-[-12%] rounded-full bg-sky-400/10 blur-3xl" />
            <div className="absolute inset-[-7%] rounded-full border border-sky-200/10 shadow-[0_0_80px_rgba(56,189,248,0.16)]" />
            <img
              src="/Mouse_Transparent.png"
              alt="Transparent preclinical mouse scan"
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_30px_90px_rgba(2,132,199,0.18)]"
              loading="eager"
              decoding="async"
            />
            <svg
              viewBox="0 0 1684 2528"
              className="absolute inset-0 z-20 h-full w-full overflow-visible"
              role="img"
              aria-label="Interactive segmentation overlay"
            >
              {maskPaths.map((path, index) => (
                <motion.path
                  key={path}
                  d={path}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="cursor-pointer fill-sky-400/0 stroke-sky-100/60 stroke-[5] transition duration-300 hover:fill-sky-400/30 hover:stroke-sky-300 hover:drop-shadow-[0_0_18px_rgba(125,211,252,0.9)]"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </motion.div>

          <MetricStack side="right" progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

type MetricStackProps = {
  side: "left" | "right";
  progress: MotionValue<number>;
};

function MetricStack({ side, progress }: MetricStackProps) {
  const items = metrics.filter((metric) => metric.side === side);

  return (
    <div className="grid gap-4">
      {items.map((metric, index) => (
        <MetricCard key={metric.label} metric={metric} index={index} side={side} progress={progress} />
      ))}
    </div>
  );
}

type MetricCardProps = {
  metric: (typeof metrics)[number];
  index: number;
  side: "left" | "right";
  progress: MotionValue<number>;
};

function MetricCard({ metric, index, side, progress }: MetricCardProps) {
  const start = 0.18 + index * 0.16;
  const end = start + 0.28;
  const x = useTransform(progress, [start, end], [side === "left" ? -120 : 120, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.article
      style={{ x, opacity, translateZ: 0 }}
      className="rounded-lg border border-sky-200/12 bg-white/[0.045] p-5 shadow-[0_0_40px_rgba(14,165,233,0.08)] backdrop-blur-xl"
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-sky-200/62">{metric.label}</p>
      <h3 className="mt-4 text-2xl font-light text-white">{metric.value}</h3>
      <p className="mt-3 text-sm leading-6 text-white/50">{metric.detail}</p>
    </motion.article>
  );
}

export default SegmentationExplorer;

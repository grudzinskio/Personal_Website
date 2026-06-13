import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import cocoLogo from "../../assets/logos/CocoLogo_Transparent.webp";
import cocoDiagram from "../../assets/logos/coco_diagram_white_background.webp";

type Phase = {
  eyebrow: string;
  title: string;
  detail: string;
  side: "left" | "right";
  top: string;
  range: [number, number, number, number];
};

const phases: Phase[] = [
  {
    eyebrow: "Phase 1",
    title: "Payer Source Data",
    detail:
      "Member, provider, claims, clinical, and utilization data arrive from disconnected payer systems with different schemas and quality rules.",
    side: "left",
    top: "14%",
    range: [0, 0, 0.15, 0.23],
  },
  {
    eyebrow: "Phase 2",
    title: "Proprietary Ingestion",
    detail:
      "Client-specific ETL pulls the noise into a controlled intake layer where records are cleaned, shaped, and prepared for canonical mapping.",
    side: "right",
    top: "32%",
    range: [0.1, 0.17, 0.35, 0.43],
  },
  {
    eyebrow: "Phase 3",
    title: "The CoCo Core",
    detail:
      "A central standard model becomes the source of truth, producing traceable canonical XML assets ready for validation and reuse.",
    side: "left",
    top: "50%",
    range: [0.3, 0.38, 0.57, 0.66],
  },
  {
    eyebrow: "Phase 4",
    title: "The Adapters",
    detail:
      "Translation layers convert the canonical shape into destination-specific formats while preserving compliance intent and deterministic output.",
    side: "right",
    top: "68%",
    range: [0.5, 0.59, 0.78, 0.86],
  },
  {
    eyebrow: "Phase 5",
    title: "Downstream Targets",
    detail:
      "FHIR servers, Snowflake, NDH, TEFCA, analytics, and operational tools receive clean healthcare data from the same canonical pipeline.",
    side: "left",
    top: "86%",
    range: [0.7, 0.79, 1, 1],
  },
];

const techStack = [
  "React",
  "TypeScript",
  "FastAPI",
  "Python",
  "XSLT",
  "Docker",
  "Pytest",
] as const;

const dataFlow = [
  {
    label: "Source ingestion",
    detail: "Member, provider, claims, clinical, and UM data are standardized from payer systems.",
  },
  {
    label: "Canonical core",
    detail: "CoCo converts inconsistent source data into compliance-oriented canonical XML assets.",
  },
  {
    label: "Validation",
    detail: "Automated checks verify representative datasets against W3C XSD requirements.",
  },
  {
    label: "Adapters",
    detail: "XSLT translators prepare outputs for FHIR servers, Snowflake, NDH, TEFCA, and analytics.",
  },
] as const;

const systemNotes = [
  "Built an operations console for browsing schemas, inspecting transformation assets, and triggering sample builds.",
  "Connected the React interface to a FastAPI service layer for repeatable local and containerized workflows.",
  "Supported compliance-heavy healthcare interoperability work where traceability and deterministic output matter.",
] as const;

function PhaseCopy({ phase, progress }: { phase: Phase; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, phase.range, [0, 1, 1, 0.25]);
  const y = useTransform(progress, phase.range, [14, 0, 0, -6]);
  const blur = useTransform(opacity, [0, 1], [5, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{ opacity, y, filter, top: phase.top }}
      className={`absolute hidden w-[min(27vw,360px)] -translate-y-1/2 lg:block ${
        phase.side === "left"
          ? "left-[max(2rem,calc(50%-35rem))] text-right"
          : "right-[max(2rem,calc(50%-35rem))] text-left"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
        {phase.eyebrow}
      </p>
      <h4 className="mt-3 text-2xl font-semibold leading-tight text-white">{phase.title}</h4>
      <p className="mt-3 text-sm leading-7 text-white">{phase.detail}</p>
    </motion.div>
  );
}

function DatabaseCluster() {
  const databases = [
    { x: 348, y: 136, scale: 0.9, opacity: 0.84 },
    { x: 418, y: 104, scale: 1.08, opacity: 1 },
    { x: 500, y: 140, scale: 0.92, opacity: 0.82 },
    { x: 382, y: 190, scale: 0.82, opacity: 0.72 },
    { x: 466, y: 198, scale: 0.82, opacity: 0.74 },
  ];

  return (
    <g>
      {databases.map((database) => (
        <g
          key={`${database.x}-${database.y}`}
          transform={`translate(${database.x} ${database.y}) scale(${database.scale})`}
          opacity={database.opacity}
        >
          <ellipse cx="0" cy="0" rx="30" ry="10" fill="#155e75" stroke="#67e8f9" strokeWidth="2" />
          <path
            d="M-30 0v40c0 5.5 13.4 10 30 10s30-4.5 30-10V0"
            fill="rgba(8,47,73,0.82)"
            stroke="#67e8f9"
            strokeWidth="2"
          />
          <path d="M-30 20c0 5.5 13.4 10 30 10s30-4.5 30-10" fill="none" stroke="#22d3ee" strokeOpacity="0.5" />
          <path d="M-30 40c0 5.5 13.4 10 30 10s30-4.5 30-10" fill="none" stroke="#22d3ee" strokeOpacity="0.5" />
        </g>
      ))}
    </g>
  );
}

function FunnelGlyph() {
  return (
    <g transform="translate(450 535)">
      <path
        d="M-78 -42H78L32 7v39L0 66l-32 -20V7z"
        fill="rgba(194,65,12,0.16)"
        stroke="#fb923c"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M-50 -20H50M-30 2H30M-16 24H16" stroke="#fdba74" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function CoreGlyph() {
  return (
    <g transform="translate(450 870)">
      <image
        href={cocoLogo}
        x="-120"
        y="-120"
        width="240"
        height="240"
        preserveAspectRatio="xMidYMid meet"
        filter="url(#coco-logo-glow)"
      />
    </g>
  );
}

function AdapterGlyph() {
  const teeth = Array.from({ length: 8 }, (_, index) => index * 45);

  return (
    <g transform="translate(450 1205)">
      <g>
        {teeth.map((angle) => (
          <rect
            key={angle}
            x="-7"
            y="-57"
            width="14"
            height="25"
            rx="4"
            fill="#38bdf8"
            fillOpacity="0.58"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle r="42" fill="rgba(8,47,73,0.86)" stroke="#7dd3fc" strokeWidth="3" />
        <circle r="16" fill="#020617" stroke="#bae6fd" strokeWidth="3" />
      </g>
      <path d="M-84 0h40M44 0h40M0 -84v38M0 46v38" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.55" />
    </g>
  );
}

function TargetsGlyph() {
  const targets = [
    { x: 320, y: 1610, label: "FHIR" },
    { x: 405, y: 1660, label: "NDH" },
    { x: 495, y: 1660, label: "BI" },
    { x: 580, y: 1610, label: "TEFCA" },
  ];

  return (
    <g>
      <path
        d="M450 1480v58M450 1538H320M450 1538H580M405 1538v90M495 1538v90"
        fill="none"
        stroke="#22d3ee"
        strokeOpacity="0.58"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {targets.map((target) => (
        <g key={target.label} transform={`translate(${target.x} ${target.y})`}>
          <rect x="-36" y="-22" width="72" height="44" rx="8" fill="rgba(14,116,144,0.22)" stroke="#67e8f9" strokeWidth="2" />
          <path d="M-20 -6h40M-20 7h28" stroke="#a5f3fc" strokeWidth="3" strokeLinecap="round" />
          <text x="0" y="39" textAnchor="middle" className="fill-zinc-300 text-[10px] font-semibold">
            {target.label}
          </text>
        </g>
      ))}
    </g>
  );
}

function PipelineDiagram({ progress }: { progress: MotionValue<number> }) {
  const packetY = useTransform(progress, [0, 1], [174, 1538]);
  const trackPath =
    "M450 214V390C450 450 450 498 450 520V680C450 748 450 830 450 842V995C450 1075 450 1155 450 1185V1480";

  return (
    <svg
      viewBox="0 0 900 1710"
      role="img"
      aria-label="Vertical CoCo data waterfall pipeline"
      className="h-[72vh] min-h-[620px] max-h-[760px] w-[min(88vw,760px)] overflow-visible xl:h-[82vh] xl:max-h-[900px] xl:w-[min(88vw,800px)]"
    >
      <defs>
        <filter id="coco-packet-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="coco-logo-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#ffffff" floodOpacity="0.9" />
          <feDropShadow dx="0" dy="0" stdDeviation="28" floodColor="#ffffff" floodOpacity="0.42" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="coco-track-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="52%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <radialGradient id="coco-packet-gradient">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="45%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#f97316" />
        </radialGradient>
      </defs>

      <path d={trackPath} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" strokeLinecap="round" />
      <motion.path
        d={trackPath}
        fill="none"
        stroke="url(#coco-track-gradient)"
        strokeWidth="10"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />

      <DatabaseCluster />
      <FunnelGlyph />
      <CoreGlyph />
      <AdapterGlyph />
      <TargetsGlyph />

      <motion.circle
        cx="450"
        cy={packetY}
        r="14"
        fill="url(#coco-packet-gradient)"
        filter="url(#coco-packet-glow)"
      />
      <motion.circle
        cx="450"
        cy={packetY}
        r="26"
        fill="none"
        stroke="#67e8f9"
        strokeOpacity="0.34"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CocoArchitectureShowcase() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 320px", "end 35%"],
  });
  const matchedProgress = useTransform(scrollYProgress, [0, 0.48], [0, 1]);
  const smoothProgress = useSpring(matchedProgress, {
    stiffness: 220,
    damping: 26,
    mass: 0.18,
  });

  return (
    <article ref={containerRef} className="relative z-10 mx-auto w-full max-w-6xl text-white">
      <div className="relative flex min-h-[820px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(2,6,23,0.6)] backdrop-blur-xl lg:min-h-[900px] xl:min-h-[1040px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(34,211,238,0.06),transparent_40%)]" />

        <div className="relative z-10 flex h-full w-full max-w-7xl items-center justify-center px-4">
          {phases.map((phase) => (
            <PhaseCopy key={phase.title} phase={phase} progress={smoothProgress} />
          ))}

          <PipelineDiagram progress={smoothProgress} />

          <div className="absolute bottom-5 left-1/2 grid w-[min(92vw,680px)] -translate-x-1/2 gap-2 lg:hidden">
            {phases.map((phase) => (
              <PhaseCopyMobile key={phase.title} phase={phase} progress={smoothProgress} />
            ))}
          </div>
        </div>

      </div>

      <section className="mt-10 rounded-2xl border border-white/[0.08] bg-[rgba(2,6,23,0.6)] backdrop-blur-xl p-4 sm:p-6">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-center">
              <div className="overflow-hidden rounded-lg border border-white/14 bg-white p-2 shadow-[0_18px_60px_rgba(0,0,0,0.34)]">
                <img
                  src={cocoDiagram}
                  alt="CoCo canonical healthcare interoperability architecture"
                  className="h-auto w-full rounded-md object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300/85">
                    Compliance Open Source Canonical Pipeline
                  </p>
                  <h3
                    id="coco-architecture-modal-title"
                    className="mt-3 text-2xl font-semibold leading-tight text-white md:text-3xl"
                  >
                    A cleaner path from payer data to compliant healthcare outputs.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white">
                    CoCo normalizes proprietary payer data, validates compliance-oriented XML, and routes
                    canonical transformations into FHIR-ready destinations through a containerized system.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-sky-300/20 bg-sky-400/[0.08] px-3 py-1 text-[11px] font-medium text-sky-200/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/14 pt-6">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)]">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300/85">
                    Architecture Flow
                  </h4>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {dataFlow.map((item) => (
                      <div key={item.label} className="border-l border-sky-200/24 pl-4">
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="mt-1 text-xs leading-6 text-white">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300/85">
                    My Contribution
                  </h4>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-white">
                    {systemNotes.map((note) => (
                      <li key={note} className="border-l border-white/14 pl-4">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
      </section>
    </article>
  );
}

function PhaseCopyMobile({ phase, progress }: { phase: Phase; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, phase.range, [0, 1, 1, 0]);
  const y = useTransform(progress, phase.range, [10, 0, 0, -8]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="col-start-1 row-start-1 rounded-lg border border-white/12 bg-zinc-950/82 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.42)]"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/70">{phase.eyebrow}</p>
      <h4 className="mt-1 text-lg font-semibold leading-tight text-white">{phase.title}</h4>
      <p className="mt-2 text-xs leading-5 text-white">{phase.detail}</p>
    </motion.div>
  );
}

export default CocoArchitectureShowcase;

import cocoDiagram from "../../assets/logos/coco_diagram_white_background.png";

const techStack = [
  "React 18",
  "TypeScript",
  "Vite",
  "Tailwind",
  "FastAPI",
  "Python",
  "XSLT",
  "Docker",
  "Pytest",
] as const;

const systemDescription = [
  {
    title: "Interactive Operations Console (CoCoFlow)",
    body: "A sleek React and Vite interface for navigating schemas, inspecting transformation assets, and triggering sample builds through a FastAPI backend.",
  },
  {
    title: "Compliance Validation Layer",
    body: "Automated pipelines generate representative medical datasets, execute mappings, and validate XML integrity against strict W3C XSD specifications.",
  },
  {
    title: "Deterministic Service Runtime",
    body: "A fully Dockerized architecture coordinates the React UI, Express proxy, and FastAPI backend across repeatable deployment environments.",
  },
] as const;

export function CocoArchitectureShowcase() {
  return (
    <article className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-4 text-white shadow-[0_24px_90px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-5 lg:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(168,85,247,0.24),transparent_34%),radial-gradient(circle_at_72%_30%,rgba(236,72,153,0.16),transparent_30%),linear-gradient(135deg,rgba(14,165,233,0.08),transparent_46%)]" />

      <div className="relative mx-auto max-w-6xl">
        <section className="relative flex min-h-[300px] items-center justify-center px-2 py-8 sm:min-h-[360px] lg:py-10">
          <div className="absolute left-1/2 top-1/2 h-[70%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] border border-purple-300/18 bg-purple-400/[0.03] shadow-[0_0_80px_rgba(168,85,247,0.16),inset_0_0_70px_rgba(236,72,153,0.07)]" />
          <div className="absolute left-1/2 top-1/2 h-[56%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] border border-white/10 shadow-[0_0_55px_rgba(255,255,255,0.08)]" />

          <div className="relative w-full max-w-5xl rounded-[2rem] border border-white/20 bg-white p-2 shadow-[0_0_70px_rgba(168,85,247,0.26),0_24px_90px_rgba(0,0,0,0.42)]">
            <div className="overflow-hidden rounded-[1.55rem] bg-white">
              <img
                src={cocoDiagram}
                alt="CoCo canonical healthcare interoperability architecture"
                className="h-auto w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/14 bg-black/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-md sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                CoCo: Compliance Open Source Canonical Pipeline
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-white/84">
                CoCo bridges complex proprietary payer systems with strict CMS regulations. It ingests
                disparate healthcare data, validates compliance-oriented XML assets, applies canonical
                XSLT mappings, and emits FHIR-ready outputs through a containerized architecture.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:max-w-md md:justify-end">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/16 bg-white/[0.075] px-2.5 py-1 text-[10px] font-medium text-white/82"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-white/14 bg-white/[0.065] p-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Architecture &amp; Data Flow
            </h4>
            <div className="mt-3 grid gap-3 text-xs leading-6 text-white/82 md:grid-cols-5">
              <p>
                <span className="font-semibold text-white">Payer Source Data:</span> Member, provider,
                claims, clinical, and UM domains are extracted from disparate payer silos.
              </p>
              <p>
                <span className="font-semibold text-white">Proprietary Ingestion:</span> Client-specific
                ETL handles cleansing, standardization, and mastering.
              </p>
              <p>
                <span className="font-semibold text-white">The CoCo Core:</span> Chaotic data becomes a
                compliant canonical standard, validated by Pytest and W3C XSD checks.
              </p>
              <p>
                <span className="font-semibold text-white">The Adapters:</span> XSLT translators target
                FHIR servers, Snowflake, NDH, and TEFCA.
              </p>
              <p>
                <span className="font-semibold text-white">Downstream Ecosystem:</span> Outputs power CMS
                9115/0057 APIs, provider directories, and analytics dashboards.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {systemDescription.map((point) => (
              <section
                key={point.title}
                className="rounded-2xl border border-white/14 bg-white/[0.065] p-4"
              >
                <h4 className="break-words text-sm font-semibold leading-5 text-white">
                  {point.title}
                </h4>
                <p className="mt-2 break-words text-xs leading-6 text-white/78">{point.body}</p>
              </section>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

export default CocoArchitectureShowcase;

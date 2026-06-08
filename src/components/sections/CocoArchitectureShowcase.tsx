import { useState } from "react";
import { ChevronDown } from "lucide-react";
import cocoDiagram from "../../assets/logos/coco_diagram_white_background.png";

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

export function CocoArchitectureShowcase() {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = "coco-architecture-details";

  return (
    <article className="mx-auto w-full max-w-6xl text-white">
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
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-200/80">
              Compliance Open Source Canonical Pipeline
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-white md:text-3xl">
              A cleaner path from payer data to compliant healthcare outputs.
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/82">
              CoCo normalizes proprietary payer data, validates compliance-oriented XML, and routes
              canonical transformations into FHIR-ready destinations through a containerized system.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-sky-200/16 bg-sky-200/[0.07] px-3 py-1 text-[11px] font-medium text-sky-50/86"
              >
                {tech}
              </span>
            ))}
          </div>

          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={detailsId}
            onClick={() => setIsExpanded((current) => !current)}
            className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border border-white/18 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-white transition hover:border-sky-200/36 hover:bg-white/[0.11]"
          >
            <span>{isExpanded ? "Hide architecture details" : "View architecture details"}</span>
            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        id={detailsId}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
          isExpanded ? "mt-8 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="border-t border-white/14 pt-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)]">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-sky-200/80">
                  Architecture Flow
                </h4>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {dataFlow.map((item) => (
                    <div key={item.label} className="border-l border-sky-200/24 pl-4">
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-xs leading-6 text-white/74">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-sky-200/80">
                  My Contribution
                </h4>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-white/78">
                  {systemNotes.map((note) => (
                    <li key={note} className="border-l border-white/14 pl-4">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CocoArchitectureShowcase;

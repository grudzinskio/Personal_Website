import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import msoeLogo from "../../assets/logos/MSOE_logo.png";
import rptLogo from "../../assets/logos/RPT_LOGO.svg";

gsap.registerPlugin(ScrollTrigger);

const layerPaths = [
  "M723.5 966L680.5 1004V1053.5L711 1062.5L779 1027L811 1008L807.5 966L817 937L789.5 903L756 926L772 954.5L750 981L723.5 966Z",
  "M921.155 1027L842 920.718L933.976 820L1007 936.855L921.155 1027Z",
  "M607.5 1304.5V1425L630.5 1449.5L684 1388.5L666 1441L711 1512L766.5 1463.5L813.5 1364L827.5 1178L813.5 1141.5L778 1113L729.5 1104.5L666 1125.5L607.5 1189.5V1304.5Z",
  "M942.5 1290.5L901.5 1341.5H891.5V1564.5L942.5 1492L961 1509H1003.5L1045 1483.5V1412.5L1028 1358.5L1003.5 1321.5L942.5 1290.5Z",
] as const;

type InfoCardProps = {
  title: string;
  body: string;
  logo?: string;
  logoAlt?: string;
  note?: string;
  tags?: string[];
};

function InfoCard({ title, body, logo, logoAlt, note, tags }: InfoCardProps) {
  return (
    <article className="glass-readable relative flex h-[500px] min-h-0 flex-col overflow-hidden rounded-lg px-5 py-9">
      <div className="relative my-auto">
        <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-sky-200/80">{title}</p>
        <p className="mt-5 text-sm leading-7 text-white/84">{body}</p>
        {note && (
          <p className="mt-5 text-sm leading-7 text-white/78">{note}</p>
        )}
        {tags && (
          <div className="mt-7 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-100/12 bg-cyan-100/[0.055] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-cyan-100/72"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {logo && (
        <img
          src={logo}
          alt={logoAlt ?? ""}
          className="relative mt-9 h-20 w-auto max-w-[180px] object-contain opacity-90"
          loading="lazy"
          decoding="async"
        />
      )}
    </article>
  );
}

export function PreclinicalExplorer() {
  const stageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!stageRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactViewport = window.innerWidth < 900;

    const ctx = gsap.context(() => {
      const segments = gsap.utils.toArray<SVGPathElement>(".research-segment");

      gsap.set(".research-ring", { autoAlpha: compactViewport || reduceMotion ? 0.7 : 0.45, scale: 0.98 });
      gsap.set(".research-mouse", { y: compactViewport || reduceMotion ? 0 : 18, scale: 0.98 });
      gsap.set(segments, {
        autoAlpha: compactViewport || reduceMotion ? 1 : 0,
        y: compactViewport || reduceMotion ? 0 : 460,
        scale: compactViewport || reduceMotion ? 1 : 0.92,
        transformOrigin: "50% 50%",
      });

      if (compactViewport || reduceMotion) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top+=200 top",
          end: "+=1500",
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(".research-ring", { autoAlpha: 1, scale: 1.04, duration: 0.18, ease: "none" }, 0)
        .to(".research-mouse", { y: -8, scale: 1.02, duration: 0.72, ease: "none" }, 0);

      segments.forEach((segment, index) => {
        timeline.to(
          segment,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.22,
            ease: "power2.out",
          },
          0.05 + index * 0.16
        );
      });

      timeline.to(".research-ring", { autoAlpha: 0.65, duration: 0.18, ease: "none" }, 0.82);
    }, stageRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section id="preclinical-research" className="relative overflow-visible px-4">
      <div ref={stageRef} className="relative mb-12 flex min-h-screen items-center overflow-visible py-6 sm:mb-16 sm:py-8 md:mb-20 md:py-10">
        <div className="content-shell relative">
            <div className="mx-auto max-w-4xl text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="section-eyebrow"
              >
                Preclinical Imaging
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="section-title-compact mt-5"
              >
                Academic Research
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="section-copy max-w-3xl text-sm sm:text-base"
              >
                Automated longitudinal segmentation for multi-modality preclinical studies, shaped around the precision,
                traceability, and calm visual language expected in medical research tooling.
              </motion.p>
            </div>

            <div className="mt-16 grid items-center gap-7 sm:mt-20 md:mt-24 lg:grid-cols-[245px_minmax(430px,520px)_245px] lg:justify-center lg:gap-20 xl:grid-cols-[265px_minmax(500px,590px)_265px] xl:gap-28">
              <motion.div
                initial={{ opacity: 0, x: -22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="order-2 hidden lg:order-1 lg:block"
              >
                <InfoCard
                  title="Segmentation Layers"
                  body="My research focus is automated longitudinal segmentation for multi-modality preclinical scans (CT, SPECT, PET), developed through Master of Science in Machine Learning coursework at MSOE."
                  note="The work connects imaging research with software systems built for repeatable analysis."
                  logo={msoeLogo}
                  logoAlt="MSOE logo"
                />
              </motion.div>

              <div className="order-1 lg:order-2">
                <div className="relative mx-auto w-full max-w-[250px] sm:max-w-[315px] lg:max-w-[390px] xl:max-w-[430px]">
                  <div
                    className="research-ring absolute inset-[-8%] rounded-full border border-cyan-100/10 shadow-[0_0_55px_rgba(103,232,249,0.12)]"
                    aria-hidden="true"
                  />
                  <div
                    className="research-ring absolute inset-[-14%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(103,232,249,0.10)_0%,rgba(45,212,191,0.045)_40%,transparent_70%)] blur-2xl"
                    aria-hidden="true"
                  />
                  <div className="research-mouse relative aspect-[1684/2528] w-full">
                    <img
                      src="/Mouse-Transparent-optimized.png"
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
                        <path
                          key={d}
                          d={d}
                          className="research-segment cursor-pointer fill-cyan-300/0 stroke-cyan-100/58 stroke-[6] transition duration-300 hover:fill-cyan-300/22 hover:stroke-white"
                          vectorEffect="non-scaling-stroke"
                        />
                      ))}
                    </svg>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="order-3 hidden lg:block"
              >
                <InfoCard
                  title="CRO Workflow"
                  body="The workflow starts with structured CT, SPECT, and PET study data, then moves into organ ROI review, measurement handling, and export-ready outputs for radiopharmaceutical imaging work."
                  tags={["CT", "SPECT", "PET"]}
                  logo={rptLogo}
                  logoAlt="RPT logo"
                />
              </motion.div>
            </div>
          </div>
        </div>

      <div className="pb-16 sm:pb-20 md:pb-24" />
    </section>
  );
}

export default PreclinicalExplorer;

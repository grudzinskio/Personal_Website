import holoShape01 from '../../assets/holo-01.webp';
import holoShape05 from '../../assets/holo-05.webp';
import holoShape06 from '../../assets/holo-06.webp';

/**
 * HeroDesign — the decorative backdrop for the light hero: floating holographic
 * 3D image cutouts. Rendered as an `absolute inset-0` layer INSIDE the hero's
 * `relative isolate` <SectionBackground> so it exactly covers the hero panel and
 * scrolls with it. Sits at zIndex -1 (above the tone layer, below the letters),
 * its own `overflow-hidden` keeps off-canvas shapes from creating horizontal
 * scroll, and it ignores pointer events.
 */
export const HeroDesign = () => (
    <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ zIndex: -1 }}
    >
        <img
            src={holoShape01}
            alt=""
            className="hero-shape absolute -right-16 -top-12 w-[22rem] max-w-[52vw] drop-shadow-[0_30px_60px_rgba(60,60,120,0.25)] md:w-[34rem]"
            style={{ '--r': '-6deg' }}
        />
        <img
            src={holoShape05}
            alt=""
            className="hero-shape hero-shape--b absolute -left-20 top-24 w-[15rem] max-w-[40vw] drop-shadow-[0_24px_50px_rgba(60,60,120,0.22)] md:w-[22rem]"
            style={{ '--r': '8deg' }}
        />
        <img
            src={holoShape06}
            alt=""
            className="hero-shape hero-shape--c absolute right-[26%] top-[19rem] w-[11rem] max-w-[32vw] drop-shadow-[0_20px_44px_rgba(60,60,120,0.2)] md:w-[16rem]"
            style={{ '--r': '4deg' }}
        />
    </div>
);

export default HeroDesign;

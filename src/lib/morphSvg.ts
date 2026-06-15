import { gsap } from "@/lib/gsap";
import { interpolate } from "flubber";
import { prefersReducedMotion } from "@/lib/motion";

type MorphCycleOptions = {
  duration?: number;
  ease?: string;
  pause?: number;
};

/** Morph an SVG path through a sequence of `d` strings */
export function morphPathCycle(
  pathEl: SVGPathElement,
  paths: string[],
  options: MorphCycleOptions = {},
) {
  if (paths.length < 2) return gsap.timeline();

  const duration = options.duration ?? 5;
  const ease = options.ease ?? "power1.inOut";
  const pause = options.pause ?? 0.4;

  const tl = gsap.timeline({ repeat: -1 });

  for (let i = 0; i < paths.length; i++) {
    const from = paths[i];
    const to = paths[(i + 1) % paths.length];
    const blend = interpolate(from, to, { maxSegmentLength: 3 });
    const proxy = { t: 0 };

    tl.to(proxy, {
      t: 1,
      duration,
      ease,
      onUpdate: () => pathEl.setAttribute("d", blend(proxy.t)),
    });

    if (pause > 0) tl.to({}, { duration: pause });
  }

  return tl;
}

type MorphRevealOptions = {
  duration?: number;
  delay?: number;
  y?: number;
};

/** Fade a morph shape in, then start its path cycle */
export function revealMorphShape(
  svgEl: SVGElement | null,
  pathEl: SVGPathElement | null,
  paths: string[],
  options: MorphRevealOptions = {},
) {
  if (!svgEl || !pathEl || paths.length === 0) return gsap.timeline();

  if (prefersReducedMotion()) {
    gsap.set(svgEl, { opacity: 0.5, y: 0, clearProps: "transform" });
    pathEl.setAttribute("d", paths[0]);
    return gsap.timeline();
  }

  gsap.set(svgEl, { opacity: 0, y: options.y ?? 10 });
  pathEl.setAttribute("d", paths[0]);

  const tl = gsap.timeline({ delay: options.delay ?? 0 });
  tl.to(svgEl, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    clearProps: "transform",
  });
  tl.add(morphPathCycle(pathEl, paths, { duration: 6, pause: 0.6 }), "-=0.2");

  return tl;
}

/** Gentle floating drift for pinned decorative shapes */
export function floatShape(target: Element | null, options: { y?: number; duration?: number } = {}) {
  if (!target || prefersReducedMotion()) return;

  gsap.to(target, {
    y: options.y ?? -6,
    duration: options.duration ?? 5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

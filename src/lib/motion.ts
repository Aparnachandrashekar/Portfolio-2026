import { gsap, ScrollTrigger } from "@/lib/gsap";

export const MOTION = {
  y: 12,
  duration: 0.7,
  ease: "power2.out",
  stagger: 0.07,
  start: "top 88%",
  labelDuration: 0.55,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type RevealOptions = {
  trigger?: Element | null;
  start?: string;
  stagger?: number;
  delay?: number;
  y?: number;
  duration?: number;
};

/** Subtle upward fade — elements pinned onto a stable wall */
export function revealUp(targets: gsap.TweenTarget, options: RevealOptions = {}) {
  if (!targets) return;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0, clearProps: "all" });
    return;
  }

  const y = options.y ?? MOTION.y;
  const trigger = options.trigger;

  gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? MOTION.duration,
      ease: MOTION.ease,
      stagger: options.stagger ?? 0,
      delay: options.delay ?? 0,
      clearProps: "transform",
      scrollTrigger: trigger
        ? { trigger, start: options.start ?? MOTION.start, once: true }
        : undefined,
    },
  );
}

/** Section label wipe — kept minimal */
export function revealLabel(target: Element | null, trigger?: Element | null) {
  if (!target) return;

  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, clipPath: "inset(0 0 0 0)" });
    return;
  }

  gsap.fromTo(
    target,
    { clipPath: "inset(0 0 100% 0)" },
    {
      clipPath: "inset(0 0 0% 0)",
      duration: MOTION.labelDuration,
      ease: MOTION.ease,
      scrollTrigger: {
        trigger: trigger ?? target,
        start: MOTION.start,
        once: true,
      },
    },
  );
}

/** Very slight parallax on card surface layer while scrolling */
export function attachCardParallax(card: Element | null) {
  if (!card || prefersReducedMotion()) return;

  const shine = card.querySelector(".proj-card-shine");
  if (!shine) return;

  gsap.fromTo(
    shine,
    { y: 6 },
    {
      y: -6,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    },
  );
}

/** Re-attach parallax to all cards inside a container */
export function parallaxCards(container: Element | null) {
  if (!container) return;
  container.querySelectorAll(".proj-card").forEach((card) => {
    attachCardParallax(card);
  });
}

export function fadeSwap(
  targets: gsap.TweenTarget,
  options: { stagger?: number } = {},
) {
  if (!targets) return;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0, clearProps: "all" });
    return;
  }

  gsap.fromTo(
    targets,
    { opacity: 0, y: 8 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: MOTION.ease,
      stagger: options.stagger ?? 0.04,
      clearProps: "transform",
    },
  );
}

export { gsap, ScrollTrigger };

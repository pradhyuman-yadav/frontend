import { useEffect, useRef } from 'react';

/**
 * Reveals elements as they scroll into view.
 *
 * Uses IntersectionObserver rather than a scroll listener so there are no
 * per-frame layout reads. Returns a ref to attach to a container; every
 * descendant carrying `.reveal` is observed and gets `.is-visible` once.
 *
 * Respects prefers-reduced-motion by revealing everything immediately.
 */
export const useReveal = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const targets = root.querySelectorAll('.reveal');
    if (!targets.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
};

export default useReveal;

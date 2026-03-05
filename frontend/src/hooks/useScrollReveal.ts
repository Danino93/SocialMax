import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to a container element.
 * When the container enters the viewport, staggered 'visible' class
 * is added to each child with className 'reveal-card'.
 */
export function useScrollReveal(staggerMs = 75) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = container.querySelectorAll<HTMLElement>('.reveal-card');
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, i * staggerMs);
          });
          observer.unobserve(container);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [staggerMs]);

  return ref;
}

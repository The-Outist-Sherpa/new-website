"use client";

import { useEffect } from "react";

export function ScrollRevealController() {
  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));

    if (!revealElements.length) {
      return;
    }

    const revealVisibleElements = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      revealElements.forEach((element) => {
        if (element.classList.contains("is-visible")) {
          return;
        }

        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < viewportHeight * 0.88 && rect.bottom > viewportHeight * 0.08;

        if (isVisible) {
          element.classList.add("is-visible");
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => observer.observe(element));
    revealVisibleElements();
    window.requestAnimationFrame(revealVisibleElements);
    window.addEventListener("scroll", revealVisibleElements, { passive: true });
    window.addEventListener("resize", revealVisibleElements);
    window.addEventListener("hashchange", revealVisibleElements);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealVisibleElements);
      window.removeEventListener("resize", revealVisibleElements);
      window.removeEventListener("hashchange", revealVisibleElements);
    };
  }, []);

  return null;
}

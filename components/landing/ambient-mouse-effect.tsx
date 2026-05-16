"use client";

import { useEffect } from "react";

export function AmbientMouseEffect() {
  useEffect(() => {
    const root = document.documentElement;

    const updateMousePosition = (event: PointerEvent) => {
      root.style.setProperty("--ambient-x", `${event.clientX}px`);
      root.style.setProperty("--ambient-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener("pointermove", updateMousePosition);
    };
  }, []);

  return (
    <>
      <div className="global-gradient-wash" aria-hidden="true" />
      <div className="ambient-mouse-effect" aria-hidden="true" />
    </>
  );
}

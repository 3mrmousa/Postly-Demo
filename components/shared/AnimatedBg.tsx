// components/shared/AnimatedBg.tsx
"use client";

import { useEffect, useRef } from "react";

function AnimatedBg() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate(${clientX * 0.05}px, ${clientY * 0.05}px)`;
      }

      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate(${-clientX * 0.05}px, ${-clientY * 0.05}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={blob1Ref}
        className="fixed -top-40 -left-40 w-140 h-140
        bg-violet-500/30 rounded-full blur-[150px] pointer-events-none z-0
        transition-transform duration-700 ease-out"
      />
      <div
        ref={blob2Ref}
        className="fixed -bottom-40 -right-40 w-140 h-140
        bg-violet-500/30 rounded-full blur-[150px] pointer-events-none z-0
        transition-transform duration-700 ease-out"
      />
    </>
  );
}

export default AnimatedBg;

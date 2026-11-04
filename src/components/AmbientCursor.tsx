import { useEffect, useRef } from 'react';

export default function AmbientCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pointer = window.matchMedia('(pointer: fine)');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!pointer.matches || motionPreference.matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let frame = 0;
    let x = -100;
    let y = -100;

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        frame = 0;
      });
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={cursorRef} className="ambient-cursor" aria-hidden="true" />;
}

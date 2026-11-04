import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { ReactNode, PointerEvent } from 'react';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

type MagneticLinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
};

export default function MagneticLink({ to, children, className = '' }: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);
  const x = useSpring(xValue, { stiffness: 220, damping: 22, mass: 0.4 });
  const y = useSpring(yValue, { stiffness: 220, damping: 22, mass: 0.4 });

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    xValue.set(Math.max(-6, Math.min(6, (event.clientX - bounds.left - bounds.width / 2) * 0.12)));
    yValue.set(Math.max(-5, Math.min(5, (event.clientY - bounds.top - bounds.height / 2) * 0.12)));
  };

  const reset = () => {
    xValue.set(0);
    yValue.set(0);
  };

  return (
    <MotionLink
      to={to}
      className={className}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </MotionLink>
  );
}

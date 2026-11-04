import { motion, useReducedMotion } from 'framer-motion';
import { Fragment } from 'react';

type KineticTextProps = {
  text: string;
  className?: string;
  mode?: 'words' | 'characters';
};

export default function KineticText({ text, className = '', mode = 'words' }: KineticTextProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(' ');

  return (
    <span aria-label={text} className={className}>
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span className="kinetic-word">
            {(mode === 'characters' ? [...word] : [word]).map((part, partIndex) => (
              <span key={`${part}-${partIndex}`} className="kinetic-mask" aria-hidden="true">
                <motion.span
                  className="kinetic-piece"
                  initial={reduceMotion ? false : { y: '110%', rotate: 3, opacity: 0 }}
                  whileInView={reduceMotion ? undefined : { y: 0, rotate: 0, opacity: 1 }}
                  animate={reduceMotion ? { y: 0, rotate: 0, opacity: 1 } : undefined}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.68,
                    delay: reduceMotion ? 0 : wordIndex * 0.055 + partIndex * (mode === 'characters' ? 0.018 : 0),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {part}
                </motion.span>
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  );
}

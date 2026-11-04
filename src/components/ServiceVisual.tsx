import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

type ServiceVisualProps = {
  index: number;
  title: string;
};

export default function ServiceVisual({ index, title }: ServiceVisualProps) {
  const reduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      className={`service-visual service-visual-${index + 1}`}
      initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0 round 24px)', scale: 0.97 }}
      whileInView={{ clipPath: 'inset(0 0 0% 0 round 24px)', scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      onViewportEnter={() => setIsActive(true)}
      onViewportLeave={() => setIsActive(false)}
      aria-label={`${title} animated illustration`}
      role="img"
    >
      <div className={`service-visual-motion ${isActive && !reduceMotion ? 'service-visual-motion-active' : ''}`}>
      {index === 0 && (
        <div className="visual-browser">
          <div className="visual-browser-bar"><i /><i /><i /><span>ja.digital</span></div>
          <div className="visual-browser-content">
            <div className="visual-browser-copy"><b>Digital,</b><b>made useful.</b><i /></div>
            <div className="visual-browser-shape"><i /><i /></div>
          </div>
          <div className="visual-code">&lt;build /&gt; <span>01</span></div>
        </div>
      )}
      {index === 1 && (
        <div className="visual-phone">
          <div className="visual-phone-speaker" />
          <div className="visual-phone-screen">
            <div className="visual-phone-top"><i /><i /><i /></div>
            <b>Good ideas<br />on the move.</b>
            <div className="visual-phone-image"><i /></div>
            <div className="visual-phone-row"><i /><i /></div>
          </div>
        </div>
      )}
      {index === 2 && (
        <div className="visual-brand">
          <span className="visual-brand-word">Aa</span>
          <span className="visual-brand-orbit visual-brand-orbit-one" />
          <span className="visual-brand-orbit visual-brand-orbit-two" />
          <span className="visual-brand-tag">IDENTITY / 01</span>
        </div>
      )}
      {index === 3 && (
        <div className="visual-edit">
          <div className="visual-edit-frame"><i /><b>FRAME<br />IN MOTION</b></div>
          <div className="visual-edit-play" aria-hidden="true" />
          <div className="visual-edit-timeline"><i /><i /><i /><i /><i /><i /></div>
        </div>
      )}
      {index === 4 && (
        <div className="visual-campaign">
          <div className="visual-campaign-orbit"><i /><i /><i /></div>
          <div className="visual-campaign-label">SIGNAL / REACH / GROW</div>
          <div className="visual-campaign-chart"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="visual-campaign-stat">+<b>01</b></div>
        </div>
      )}
      </div>
    </motion.div>
  );
}

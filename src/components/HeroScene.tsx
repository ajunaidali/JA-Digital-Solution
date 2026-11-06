import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { assets } from '../config/assets';

const HeroScene3D = lazy(() => import('./HeroScene3D'));
const HeroAnimation = lazy(() => import('./HeroAnimation'));

function SceneFallback() {
  return (
    <div className="hero-graphic-fallback" aria-hidden="true">
      <div className="hero-fallback-orbit hero-fallback-orbit-one" />
      <div className="hero-fallback-orbit hero-fallback-orbit-two" />
      <div className="hero-fallback-core"><span>UMJ</span></div>
      <div className="hero-fallback-shard hero-fallback-shard-one" />
      <div className="hero-fallback-shard hero-fallback-shard-two" />
      <div className="hero-fallback-caption">CREATIVE SYSTEMS / 01</div>
    </div>
  );
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px) and (pointer: fine)');
    const updateDevice = () => setIsDesktop(desktop.matches);
    updateDevice();
    desktop.addEventListener('change', updateDevice);

    return () => desktop.removeEventListener('change', updateDevice);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setIsNearViewport(true);
      },
      { rootMargin: '240px 0px', threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const show3D = isDesktop && !reduceMotion && isNearViewport;

  return (
    <div ref={containerRef} className="hero-scene-shell" role="img" aria-label="Animated UMJ Digital hero artwork">
      <img src={assets.hero.main} alt="" className="hero-scene-art" width="1332" height="712" fetchPriority="high" />
      <img src={assets.hero.texture} alt="" className="hero-scene-texture" width="1370" height="716" loading="lazy" decoding="async" />
      <SceneFallback />
      {isNearViewport && (
        <Suspense fallback={null}>
          <HeroAnimation active={isVisible && isDocumentVisible} motionAllowed={!reduceMotion} />
        </Suspense>
      )}
      {show3D && (
        <Suspense fallback={null}>
          <HeroScene3D active={isVisible && isDocumentVisible} />
        </Suspense>
      )}
      <div className="hero-scene-grain" aria-hidden="true" />
      <span className="hero-scene-index">FIG. 01 — IDEAS IN MOTION</span>
    </div>
  );
}

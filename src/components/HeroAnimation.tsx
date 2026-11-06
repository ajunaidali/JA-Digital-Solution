import { useEffect, useRef } from 'react';
import type { AnimationItem } from 'lottie-web';
import { assets } from '../config/assets';

type HeroAnimationProps = {
  active: boolean;
  motionAllowed: boolean;
};

export default function HeroAnimation({ active, motionAllowed }: HeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const activeRef = useRef(active);
  const motionAllowedRef = useRef(motionAllowed);

  activeRef.current = active;
  motionAllowedRef.current = motionAllowed;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let animation: AnimationItem | null = null;

    const handleLoaded = () => {
      if (!motionAllowedRef.current) animation?.goToAndStop(0, true);
      else if (activeRef.current) animation?.play();
    };
    const handleFailure = () => {
      console.error(`Unable to render the hero animation: ${assets.animations.heroLottieJson}`);
    };

    void import('lottie-web').then(({ default: lottie }) => {
      if (cancelled) return;

      animation = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: assets.animations.heroLottieJson,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
          progressiveLoad: true,
        },
      });
      animationRef.current = animation;
      animation.addEventListener('DOMLoaded', handleLoaded);
      animation.addEventListener('data_failed', handleFailure);
    }).catch((error: unknown) => {
      if (!cancelled) console.error('Unable to initialize the hero animation.', error);
    });

    return () => {
      cancelled = true;
      animation?.removeEventListener('DOMLoaded', handleLoaded);
      animation?.removeEventListener('data_failed', handleFailure);
      animation?.destroy();
      if (animationRef.current === animation) animationRef.current = null;
    };
  }, []);

  useEffect(() => {
    const animation = animationRef.current;
    if (!animation || !animation.isLoaded) return;

    if (!motionAllowed) animation.goToAndStop(0, true);
    else if (active) animation.play();
    else animation.pause();
  }, [active, motionAllowed]);

  return <div ref={containerRef} className="hero-lottie" aria-hidden="true" />;
}

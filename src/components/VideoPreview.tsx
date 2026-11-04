import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { assets } from '../config/assets';

type VideoPreviewProps = {
  poster: string;
  className?: string;
  label: string;
};

export default function VideoPreview({ poster, className = '', label }: VideoPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0.05 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isNearViewport || reduceMotion || videoFailed) {
      video.pause();
      return;
    }

    void video.play().then(() => setVideoLoaded(true)).catch(() => setVideoFailed(true));
    return () => video.pause();
  }, [isNearViewport, reduceMotion, videoFailed]);

  return (
    <div ref={containerRef} className={`video-preview ${className}`} role="img" aria-label={label}>
      <img src={poster} alt="" className="video-preview-poster" loading="lazy" />
      {isNearViewport && !reduceMotion && !videoFailed && (
        <video
          ref={videoRef}
          src={assets.videos.videoEditingPreview}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onCanPlay={() => setVideoLoaded(true)}
          onError={() => setVideoFailed(true)}
          className={`video-preview-source ${videoLoaded ? 'video-preview-ready' : ''}`}
        />
      )}
    </div>
  );
}

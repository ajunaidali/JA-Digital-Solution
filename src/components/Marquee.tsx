const phrases = [
  'DIGITAL INNOVATION',
  'CREATIVE THINKING',
  'WEB DEVELOPMENT',
  'MOBILE EXPERIENCES',
  'DESIGN MEETS TECHNOLOGY',
  'JA DIGITAL SOLVER',
];

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`motion-marquee ${reverse ? 'motion-marquee-reverse' : ''}`} aria-label={phrases.join(' · ')}>
      <div className="motion-marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="motion-marquee-group" key={copy}>
            {phrases.map((phrase) => (
              <span className="motion-marquee-item" key={`${copy}-${phrase}`}>
                <span>{phrase}</span>
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

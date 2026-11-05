type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
  headingLevel?: 1 | 2;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  headingLevel = 2,
}: SectionTitleProps) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">{eyebrow}</p>
      <Heading className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</Heading>
      <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">{description}</p>
    </div>
  );
}

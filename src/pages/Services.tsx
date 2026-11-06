import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MoveUpRight } from 'lucide-react';
import KineticText from '../components/KineticText';
import MagneticLink from '../components/MagneticLink';
import Marquee from '../components/Marquee';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import { serviceHighlights, services } from '../data/siteData';

export default function ServicesPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="services-page mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <section className="service-page-intro grid items-end gap-8 pb-12 md:grid-cols-[1.15fr_0.85fr]">
        <ScrollReveal direction="left">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">Six disciplines / one vision</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.065em] text-white md:text-7xl">
            <KineticText text="Digital solutions made to move you forward." mode="characters" />
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={0.12}>
          <p className="max-w-xl pb-1 text-base leading-8 text-slate-300 md:text-lg">
            From strategy and design to development and growth assets, we build premium digital systems that support clarity, trust and measurable impact.
          </p>
        </ScrollReveal>
      </section>

      <Marquee reverse />

      <section className="mt-16 grid gap-0 border-y border-white/10 md:grid-cols-3">
        {serviceHighlights.map(({ title, text, icon: Icon }, index) => (
          <ScrollReveal key={title} delay={index * 0.07}>
            <div className="service-highlight h-full border-b border-white/10 py-6 md:border-b-0 md:border-r md:px-6 md:py-8 last:md:border-r-0 first:md:pl-0">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-cyan-300">0{index + 1} / PRINCIPLE</span>
                  <h2 className="mt-4 text-xl font-medium text-white">{title}</h2>
                </div>
                <Icon size={20} className="text-cyan-200" />
              </div>
              <p className="mt-3 max-w-sm text-sm leading-7 text-slate-300">{text}</p>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <section className="mt-20">
        <div className="mb-10 flex items-end justify-between gap-5">
          <SectionTitle
            eyebrow="Our services"
            title="Distinct crafts. Connected outcomes."
            description="Choose one focused capability or bring several together into a single, consistent digital experience."
          />
          <span className="hidden pb-2 text-xs uppercase tracking-[0.24em] text-slate-500 md:block">01—06 / UMJ DIGITAL</span>
        </div>

        <div className="space-y-5">
          {services.map(({ title, summary, list, image, icon: Icon }, index) => (
            <motion.article
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.14 }}
              transition={{ duration: reduceMotion ? 0 : 0.68, delay: reduceMotion ? 0 : index * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="service-panel grid gap-8 border border-white/10 bg-[#071126]/80 p-5 md:p-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10"
            >
              <div className="flex flex-col justify-center">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-cyan-300">Service / 0{index + 1}</span>
                  <Icon size={20} className="text-cyan-200" />
                </div>
                <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-4xl">{title}</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">{summary}</p>

                <ul className="mt-7 grid gap-x-4 gap-y-2 sm:grid-cols-2">
                  {list.map((item, itemIndex) => (
                    <li key={item} className="service-deliverable flex items-center gap-3 border-t border-white/[0.08] py-2.5 text-xs text-slate-200 sm:text-sm">
                      <span className="text-[9px] tracking-[0.14em] text-cyan-300">0{itemIndex + 1}</span>{item}
                    </li>
                  ))}
                </ul>

                <MagneticLink to="/contact" className="magnetic-link mt-7 inline-flex w-fit items-center gap-2 text-sm font-medium text-cyan-200">
                  Plan a project <ArrowRight size={16} />
                </MagneticLink>
              </div>

              <div className={`service-art-wrap service-art-wrap-${index + 1} relative min-h-[300px] overflow-hidden border border-white/10 bg-[#09152b] md:min-h-[420px]`}>
                <img
                  src={image}
                  alt={`${title} visual`}
                  className={`service-art-image absolute inset-0 h-full w-full ${title === 'App Development' ? 'object-contain p-5 md:p-8' : 'object-cover'}`}
                  loading="lazy"
                />
                <div className="service-art-shade" aria-hidden="true" />
                <div className="pointer-events-none absolute bottom-4 right-5 z-10 text-[9px] uppercase tracking-[0.24em] text-white/85">UMJ DIGITAL / 0{index + 1}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mt-24 border-t border-white/10 pt-12">
        <ScrollReveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">One connected studio</p>
              <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-white md:text-6xl"><KineticText text="Bring your next idea into focus." /></h2>
            </div>
            <MagneticLink to="/contact" className="magnetic-link inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
              Start a conversation <MoveUpRight size={16} />
            </MagneticLink>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

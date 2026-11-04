import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import KineticText from '../components/KineticText';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import { faqs } from '../data/siteData';

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="faq-page mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <section className="grid items-end gap-8 pb-12 md:grid-cols-[1fr_0.7fr]">
        <ScrollReveal direction="left">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">A few good questions</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.065em] text-white md:text-7xl">
            <KineticText text="Clear answers make good work." mode="characters" />
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={0.12}>
          <p className="max-w-xl pb-1 text-base leading-8 text-slate-300 md:text-lg">
            A quick guide to how we work, what to expect and where to start when you have a project in mind.
          </p>
        </ScrollReveal>
      </section>

      <div className="grid gap-12 border-t border-white/10 pt-10 lg:grid-cols-[0.5fr_1.5fr]">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.26em] text-cyan-200">FAQ / 01—08</span>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">Still have a question? We&apos;re happy to talk through the details and figure out the right next step.</p>
            <Link to="/contact" className="magnetic-link mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-cyan-200">
              Contact the studio <ArrowDownRight size={16} />
            </Link>
          </ScrollReveal>
        </aside>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex;
            const answerId = `faq-answer-${index}`;

            return (
              <ScrollReveal key={faq.question} delay={index * 0.025}>
                <article className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="faq-trigger flex w-full items-center gap-5 py-5 text-left md:py-7"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="w-8 shrink-0 text-[10px] tracking-[0.16em] text-cyan-300">0{index + 1}</span>
                    <span className="flex-1 text-lg font-medium text-white md:text-2xl">{faq.question}</span>
                    <span className={`faq-plus flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-slate-300 transition ${isOpen ? 'rotate-45 border-cyan-300/50 text-cyan-200' : ''}`}>
                      <Plus size={16} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pl-12 text-sm leading-7 text-slate-300 md:pb-8 md:text-base">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

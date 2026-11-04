import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import KineticText from '../components/KineticText';
import Marquee from '../components/Marquee';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import { assets } from '../config/assets';
import { featuredProjects } from '../data/siteData';

const filters = ['All', 'Real Project', 'Concept Work', 'Sample Work'];

export default function PortfolioPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const reduceMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') return featuredProjects;
    if (selectedFilter === 'Real Project') return featuredProjects.filter((project) => project.tag === 'Real project');
    if (selectedFilter === 'Concept Work') return featuredProjects.filter((project) => project.tag === 'Concept work');
    return featuredProjects.filter((project) => project.tag === 'Sample work');
  }, [selectedFilter]);

  const showRealProject = selectedFilter === 'All' || selectedFilter === 'Real Project';
  const galleryProjects = filteredProjects.filter((project) => !(showRealProject && project.tag === 'Real project'));

  return (
    <div className="portfolio-page mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <section className="grid items-end gap-8 pb-12 md:grid-cols-[1.1fr_0.9fr]">
        <ScrollReveal direction="left">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">Selected work / 2025</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.065em] text-white md:text-7xl">
            <KineticText text="Good work should leave a mark." mode="characters" />
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={0.12}>
          <p className="max-w-xl pb-1 text-base leading-8 text-slate-300 md:text-lg">
            A considered selection of digital work, creative explorations and concept showcases. Every project is labelled clearly and presented with context.
          </p>
        </ScrollReveal>
      </section>

      <Marquee />

      <div className="mt-14 flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter portfolio projects">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              aria-pressed={selectedFilter === filter}
              className={`portfolio-filter relative rounded-full border px-4 py-2.5 text-xs font-medium transition ${
                selectedFilter === filter ? 'border-cyan-200 bg-cyan-300 text-slate-950' : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-200/50 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">{filteredProjects.length} projects / JA DIGITAL SOLVER</span>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        {showRealProject && (
          <motion.section
            key="ahmed-engineering-feature"
            layout
            initial={reduceMotion ? false : { opacity: 0, y: 28, clipPath: 'inset(0 0 15% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: reduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="portfolio-feature mt-10 overflow-hidden border border-white/10 bg-[#071126]"
          >
            <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-cyan-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Real project / 01
                  </div>
                  <h2 className="max-w-lg text-3xl font-semibold leading-tight tracking-[-0.045em] text-white md:text-5xl">Ahmed Engineering Company</h2>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 md:text-base">
                    A live business website preview for Ahmed Engineering Company. Explore the real experience on desktop or open the site in a new tab.
                  </p>
                </div>
                <div className="mt-8">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-slate-500">Web design / Corporate / Responsive</p>
                  <a
                    href="https://ahmedengineeringcompany.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="magnetic-link inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
                  >
                    Visit Live Website <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              <div className="portfolio-device-stage">
                <div className="portfolio-desktop">
                  <div className="portfolio-browser-bar">
                    <div className="portfolio-browser-dots"><i /><i /><i /></div>
                    <span>ahmedengineeringcompany.vercel.app</span>
                    <ArrowUpRight size={13} />
                  </div>
                  <iframe
                    src="https://ahmedengineeringcompany.vercel.app/"
                    title="Live Ahmed Engineering Company website preview"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="portfolio-live-frame"
                  />
                </div>
                <div className="portfolio-mobile" aria-label="Ahmed Engineering Company mobile preview">
                  <div className="portfolio-mobile-speaker" />
                  <img src={assets.portfolio.ahmedEngineering} alt="Ahmed Engineering Company responsive project visual" loading="lazy" />
                  <span className="portfolio-mobile-label">MOBILE / 02</span>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.div layout className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {galleryProjects.map((project, index) => (
            <motion.article
              key={project.title}
              layout
              initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.985 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.045, ease: [0.22, 1, 0.36, 1] }}
              className="portfolio-project group"
            >
              <motion.a
                href={project.link !== '#' ? project.link : undefined}
                target={project.link !== '#' ? '_blank' : undefined}
                rel={project.link !== '#' ? 'noreferrer' : undefined}
                aria-label={project.link !== '#' ? `Open ${project.title}` : undefined}
                initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
                whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className={`portfolio-project-image relative block overflow-hidden border border-white/10 bg-[#09152b] ${project.link === '#' ? 'cursor-default' : ''}`}
              >
                <img src={project.image} alt={project.title} className="aspect-[1.48/1] w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
                <span className="portfolio-project-index">0{index + 1} / 05</span>
                <span className="portfolio-project-arrow"><MoveUpRight size={17} /></span>
              </motion.a>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-200">{project.tag} / {project.category}</p>
                  <h3 className="mt-2 text-xl font-medium text-white md:text-2xl">{project.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-slate-400">{project.description}</p>
                </div>
                {project.link !== '#' && <ArrowDownRight size={18} className="mt-1 shrink-0 text-cyan-200 transition group-hover:translate-x-1 group-hover:translate-y-1" />}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <ScrollReveal>
        <div className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            eyebrow="A thought, a sketch, a start"
            title="Your project could be next."
            description="If the direction feels right, tell us what you are building and where you want it to go."
          />
          <Link to="/contact" className="magnetic-link inline-flex shrink-0 items-center gap-2 rounded-full border border-cyan-200/50 px-5 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300 hover:text-slate-950">
            Start a conversation <MoveUpRight size={16} />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowRight, BadgeCheck, ChevronRight, MoveUpRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroScene from '../components/HeroScene';
import KineticText from '../components/KineticText';
import MagneticLink from '../components/MagneticLink';
import Marquee from '../components/Marquee';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import ServiceVisual from '../components/ServiceVisual';
import { assets } from '../config/assets';
import { featuredProjects, founders, processSteps, services, trustStats, whyChooseUs } from '../data/siteData';

function StorySection() {
  const storyRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [1.5, -1.5]);

  return (
    <section ref={storyRef} className="story-section mx-auto mt-28 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="lg:sticky lg:top-32">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">A digital partner</p>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-white md:text-6xl">
              <KineticText text="Make a little more possible." mode="characters" />
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-300 md:text-lg">
              Strategy finds the signal. Design gives it form. Technology takes it further. We bring all three together to build brands with momentum.
            </p>
            <MagneticLink to="/services" className="magnetic-link mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
              How we can help <MoveUpRight size={16} />
            </MagneticLink>
          </ScrollReveal>
        </div>
        <motion.div
          className="story-art relative overflow-hidden rounded-[2rem] border border-cyan-100/15"
          style={{ y: reduceMotion ? 0 : imageY, rotate: reduceMotion ? 0 : imageRotate }}
        >
          <img
            src={assets.hero.object2}
            alt="Abstract visual representing digital ideas taking shape"
            className="h-[420px] w-full object-cover md:h-[600px]"
            loading="lazy"
          />
          <div className="story-art-overlay" />
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6 md:inset-x-10 md:bottom-10">
            <p className="max-w-sm text-2xl font-medium leading-tight tracking-tight text-white md:text-4xl">Different disciplines.<br />One connected vision.</p>
            <span className="shrink-0 text-xs uppercase tracking-[0.26em] text-cyan-200">JDS / 2025</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="home-page pb-20">
      <section className="hero-section relative overflow-hidden pt-12 sm:pt-16">
        <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
        <div className="hero-ambient hero-ambient-two" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10">
            <div className="relative z-10 pb-8">
              <ScrollReveal direction="left">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/[0.06] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.3em] text-cyan-100">
                  <Sparkles size={13} /> Independent digital studio
                </div>
              </ScrollReveal>
              <h1 className="max-w-3xl text-[clamp(3.2rem,7.2vw,6.6rem)] font-medium leading-[0.91] tracking-[-0.075em] text-white">
                <KineticText text="We Create Digital Experiences That Move Businesses Forward." mode="characters" />
              </h1>
              <ScrollReveal delay={0.28} direction="left">
                <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
                  From powerful websites and mobile applications to creative branding and digital marketing, we help businesses transform ideas into meaningful digital experiences.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <MagneticLink to="/portfolio" className="magnetic-link inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-[#071025] transition hover:bg-white">
                    Explore Our Work <ArrowRight size={17} />
                  </MagneticLink>
                  <MagneticLink to="/contact" className="magnetic-link inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition hover:border-cyan-200 hover:text-cyan-100">
                    Let&apos;s Talk <MoveUpRight size={16} />
                  </MagneticLink>
                </div>
                <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-xs uppercase tracking-[0.12em] text-slate-300">
                  {['Web development', 'Mobile apps', 'Brand & content', 'Digital marketing'].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2"><BadgeCheck size={14} className="text-cyan-300" />{item}</span>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right" delay={0.12} className="relative">
              <HeroScene />
            </ScrollReveal>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-white/10 py-5 text-[10px] uppercase tracking-[0.3em] text-slate-400">
            <span>Strategy / Design / Development</span>
            <span className="hidden items-center gap-2 sm:inline-flex"><ArrowDownRight size={14} className="text-cyan-300" /> Scroll to explore</span>
            <span>01 — 05</span>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustStats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.06}>
              <div className="stat-block group border-l border-cyan-300/30 py-2 pl-5 transition-colors hover:border-cyan-200">
                <div className="text-2xl font-medium tracking-tight text-white md:text-3xl">{stat.value}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-slate-400">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <StorySection />

      <section className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_0.7fr]">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">What we do</p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-6xl">
              <KineticText text="Ideas deserve a good build." />
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.12} direction="right">
            <p className="max-w-lg pb-1 text-base leading-8 text-slate-300">
              Five focused disciplines. Each has its own craft, and every one connects back to the same bigger picture: a better digital experience.
            </p>
          </ScrollReveal>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {services.map(({ title, summary, image, icon: Icon }, index) => (
            <ScrollReveal key={title} delay={index * 0.045}>
              <Link to="/services" className="service-tile group block overflow-hidden border border-white/10 bg-[#071126] transition duration-500 hover:-translate-y-1 hover:border-cyan-200/50">
                <div className="service-tile-image relative">
                  <img src={image} alt="" className="h-44 w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071126] via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#05082F]/70 text-cyan-200 backdrop-blur"><Icon size={16} /></span>
                  <span className="absolute bottom-4 right-4 text-[10px] tracking-[0.2em] text-slate-300">0{index + 1}</span>
                </div>
                <div className="px-5 pb-5 pt-1">
                  <h3 className="text-lg font-medium leading-snug text-white">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-400">{summary}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">Selected work</p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl"><KineticText text="Built to make an impression." /></h2>
          </ScrollReveal>
          <Link to="/portfolio" className="magnetic-link hidden shrink-0 items-center gap-2 pb-2 text-sm text-cyan-200 md:inline-flex">All projects <ChevronRight size={16} /></Link>
        </div>
        <div className="mt-12 grid gap-x-5 gap-y-10 md:grid-cols-2">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.07} direction={index % 2 ? 'right' : 'left'} className={index === 0 ? 'md:col-span-2' : ''}>
              <Link to="/portfolio" className={`project-card group block ${index === 0 ? 'grid items-end gap-6 md:grid-cols-[1.35fr_0.65fr]' : ''}`}>
                <div className="project-preview overflow-hidden border border-white/10 bg-[#0a1430]">
                  <img src={project.image} alt={project.title} className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.035] ${index === 0 ? 'aspect-[1.8/1]' : 'aspect-[1.2/1]'}`} loading="lazy" />
                  <span className="project-preview-arrow"><MoveUpRight size={18} /></span>
                </div>
                <div className="project-caption flex items-start justify-between gap-4 pt-4 md:pt-5">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-cyan-200">{project.tag} / {project.category}</span>
                    <h3 className="mt-2 text-xl font-medium text-white md:text-2xl">{project.title}</h3>
                  </div>
                  <span className="mt-2 text-xs text-slate-400">0{index + 1}</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Marquee reverse />

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 rounded-[2rem] border border-white/10 bg-[linear-gradient(115deg,rgba(9,19,44,0.94),rgba(7,11,30,0.82))] p-7 md:p-12 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">Why JA Digital Solver</p>
            <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-white md:text-5xl">
              <KineticText text="Clear thinking. Careful making." />
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              From the first conversation through final delivery, we make the complicated feel clear and the important feel intentional.
            </p>
          </ScrollReveal>
          <div className="grid gap-0">
            {whyChooseUs.map((item, index) => (
              <ScrollReveal key={item} delay={index * 0.06}>
                <div className="why-row group flex items-start gap-5 border-t border-white/10 py-5">
                  <span className="pt-1 text-xs tracking-[0.18em] text-cyan-300">0{index + 1}</span>
                  <p className="text-base leading-7 text-slate-200 transition group-hover:text-white">{item}</p>
                  <MoveUpRight size={16} className="ml-auto mt-1 shrink-0 text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-200" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ScrollReveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">The process</p>
              <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-white md:text-6xl">
                <KineticText text="From first thought to final form." />
              </h2>
              <p className="mt-5 max-w-md text-base leading-8 text-slate-300">Good work happens through clear decisions, shared momentum and attention to the details that matter.</p>
            </ScrollReveal>
          </div>
          <div className="process-list">
            {processSteps.map(({ step, title, text }, index) => (
              <ScrollReveal key={step} delay={index * 0.05}>
                <div className="process-step group grid grid-cols-[52px_1fr] gap-4 border-t border-white/15 py-7 md:grid-cols-[78px_1fr] md:gap-6 md:py-9">
                  <span className="text-sm tracking-[0.2em] text-cyan-300">{step}</span>
                  <div>
                    <h3 className="flex items-center justify-between text-2xl font-medium text-white md:text-3xl">{title}<MoveUpRight size={18} className="text-slate-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-200" /></h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">{text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">The people behind the work</p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
              <KineticText text="Meet The Minds Behind JA Digital Solver" />
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Three co-founders. Different expertise. One shared vision — building meaningful digital experiences for businesses.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {founders.map(({ name, role, bio, image }, index) => (
            <ScrollReveal key={name} delay={index * 0.08}>
              <article className="founder-card group overflow-hidden border border-white/10 bg-white/[0.025]">
                <div className="founder-image-wrap overflow-hidden">
                  <img src={image} alt={`${name}, ${role}`} className="h-[380px] w-full object-cover transition duration-700 group-hover:scale-[1.035] md:h-[430px]" loading="lazy" />
                  <span className="founder-number">0{index + 1}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-medium text-white">{name}</h3>
                  <p className="mt-2 text-[10px] uppercase leading-5 tracking-[0.18em] text-cyan-200">{role}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{bio}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="contact-cta relative overflow-hidden border border-cyan-100/20 px-7 py-12 md:px-12 md:py-16">
            <div className="contact-cta-orbit" aria-hidden="true" />
            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-cyan-200">The next move is yours</p>
                <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-6xl">
                  <KineticText text="Have a Project in Mind? Let's Build Something Great." />
                </h2>
              </div>
              <MagneticLink to="/contact" className="magnetic-link inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                Start a Conversation <ArrowRight size={17} />
              </MagneticLink>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

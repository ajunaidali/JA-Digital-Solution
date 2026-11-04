import { ArrowUpRight, Globe2, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../config/assets';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#04081d]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          <div>
            <img src={assets.branding.logoPrimarySvg} alt="JA Digital Solver temporary text logo" className="h-12 w-auto" />
            <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">
              Turning ideas into digital experiences with strategy, design, development and growth systems built for modern businesses.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-200">Explore</h3>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-white">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-200">Company</h3>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li><Link to="/faqs" className="hover:text-white">FAQ</Link></li>
              <li><a href="#" className="hover:text-white">Process</a></li>
              <li><a href="#" className="hover:text-white">Insights</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-200">Connect</h3>
            <div className="mt-6 flex gap-3">
              <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/70 hover:text-cyan-300"><Globe2 size={16} /></a>
              <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/70 hover:text-cyan-300"><Sparkles size={16} /></a>
              <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/70 hover:text-cyan-300"><MessageCircle size={16} /></a>
            </div>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200">
              Start Your Project <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 JA Digital Solver. All rights reserved.</p>
          <p>Turning Ideas Into Digital Experiences.</p>
        </div>
      </div>
    </footer>
  );
}

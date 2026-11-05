import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AmbientCursor from './components/AmbientCursor';
import Footer from './components/Footer';
import Header from './components/Header';
import { assets } from './config/assets';
import ContactPage from './pages/Contact';
import FaqsPage from './pages/Faqs';
import HomePage from './pages/Home';
import PortfolioPage from './pages/Portfolio';
import ServicesPage from './pages/Services';

function PageMotion({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen bg-[#05082F] text-white"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(5, 8, 47, .92), rgba(5, 8, 47, .97)), url("${assets.backgrounds.site}")`,
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <AmbientCursor />
      <Header />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageMotion><HomePage /></PageMotion>} />
            <Route path="/services" element={<PageMotion><ServicesPage /></PageMotion>} />
            <Route path="/faqs" element={<PageMotion><FaqsPage /></PageMotion>} />
            <Route path="/portfolio" element={<PageMotion><PortfolioPage /></PageMotion>} />
            <Route path="/contact" element={<PageMotion><ContactPage /></PageMotion>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

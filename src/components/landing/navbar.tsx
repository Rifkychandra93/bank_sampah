import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../../context/ThemeContext';

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let isCurrentlyScrolled = false;
    const handleScroll = () => {
      const y = window.scrollY;
      if (!isCurrentlyScrolled && y > 25) {
        isCurrentlyScrolled = true;
        setIsScrolled(true);
      } else if (isCurrentlyScrolled && y < 15) {
        isCurrentlyScrolled = false;
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Cara Kerja', href: '#cara-kerja' },
    { name: 'Katalog Sampah', href: '#katalog-harga' },
    { name: 'Keunggulan', href: '#keunggulan' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <header
      style={{
        transition: 'padding 500ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none ${
        isScrolled ? 'px-3 sm:px-6' : 'px-0'
      }`}
    >
      <div
        style={{
          transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className={`pointer-events-auto w-full flex flex-col items-center justify-center ${
          isScrolled
            ? 'max-w-[1024px] translate-y-3 sm:translate-y-4 rounded-2xl sm:rounded-3xl py-2 px-4 sm:px-6 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/5'
            : 'max-w-[100vw] translate-y-0 rounded-none py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-t-transparent border-x-transparent border-b-slate-200/70 dark:border-b-slate-800/80 shadow-none'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="flex items-center group shrink-0">
            <Logo imgClassName="h-8 sm:h-9 w-auto" />
          </a>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/70 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-700 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <ThemeToggle />
            <Link
              to="/login"
              className="group inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-700 shadow-md transition-all duration-300 active:scale-95"
            >
              <span>Masuk</span>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="w-full max-w-7xl mx-auto md:hidden mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 font-medium text-sm hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-1">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20"
              >
                <span>Masuk</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

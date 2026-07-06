'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, profile } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'py-3' : 'py-5'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div
            className={cn(
              'flex items-center justify-between rounded-2xl px-4 md:px-6 transition-all duration-300',
              scrolled
                ? 'glass-strong h-14 shadow-2xl shadow-black/40'
                : 'h-16 bg-transparent'
            )}
          >
            <button
              onClick={() => handleClick('#home')}
              className="flex items-center gap-2 group"
            >
              <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-display font-bold text-sm text-white">
                S
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              </div>
              <span className="font-display font-semibold text-sm tracking-tight hidden sm:block">
                {profile.name}
              </span>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={cn(
                    'relative px-3 py-1.5 text-sm font-medium transition-colors rounded-lg',
                    active === link.href
                      ? 'text-white'
                      : 'text-muted-foreground hover:text-white'
                  )}
                >
                  {active === link.href && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/5 border border-white/10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              ))}
            </nav>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-lg glass"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 glass-strong p-6 pt-24 flex flex-col gap-1 overflow-y-auto"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleClick(link.href)}
                  className={cn(
                    'text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    active === link.href
                      ? 'bg-white/5 text-white border border-white/10'
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

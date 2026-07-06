'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Linkedin, ArrowUp } from 'lucide-react';
import { profile, navLinks } from '@/lib/portfolio-data';

export function Footer() {
  const scrollToTop = () =>
    document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/5 mt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-display font-bold text-sm text-white">
                S
              </div>
              <span className="font-display font-semibold">{profile.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {profile.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() =>
                    document
                      .querySelector(link.href)
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="text-sm text-muted-foreground hover:text-white transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                {profile.phone}
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-white transition-colors"
          >
            Back to top
            <span className="h-8 w-8 rounded-full glass flex items-center justify-center">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, BrainCircuit } from 'lucide-react';
import { profile, stats } from '@/lib/portfolio-data';
import { MagneticButton } from '@/components/magnetic-button';

/** Real Shopify bag mark, inline so no external asset/network request is needed. */
function ShopifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path
        fill="#95BF47"
        d="M388.66 128.06c-.31-2.19-2.24-3.4-3.83-3.53-1.59-.13-32.68-.61-32.68-.61s-21.68-21.05-24.03-23.4c-2.35-2.35-6.94-1.64-8.74-1.11-.27.08-4.74 1.46-12.12 3.73-1.29-4.16-3.18-9.28-5.86-14.42-8.66-16.53-21.35-25.28-36.65-25.31h-.03c-1.07 0-2.14.1-3.21.19-.45-.55-.91-1.07-1.39-1.58-6.64-7.11-15.16-10.56-25.4-10.25-19.75.59-39.42 14.85-55.31 40.16-11.16 17.79-19.65 40.14-22.05 57.44-22.55 6.99-38.31 11.87-38.66 11.98-11.4 3.58-11.76 3.93-13.23 14.68-1.12 8.15-30.86 238.13-30.86 238.13L328.5 464l137.9-29.86s-77.43-303.9-77.74-306.08zM278.6 96.71c-5.87 1.82-12.54 3.88-19.76 6.12.14-9.86-1.13-23.74-5.78-35.62 15.11 2.86 22.53 19.94 25.54 29.5zm-32.61 9.99c-13.42 4.16-28.06 8.69-42.75 13.23 4.12-15.91 11.93-31.75 21.52-42.08 3.53-3.8 8.49-8.03 14.36-10.45 5.51 11.51 6.99 27.62 6.87 39.3zm-27.05-52.7c4.68-.14 8.62 1.03 11.97 3.61-5.42 2.79-10.65 6.87-15.55 12.15-12.7 13.63-22.44 34.81-26.34 55.28-12.13 3.75-24 7.42-34.94 10.81 6.9-32.79 34.55-80.83 64.86-81.85z"
      />
      <path
        fill="#5E8E3E"
        d="M384.83 124.53c-1.59-.13-32.68-.61-32.68-.61s-21.68-21.05-24.03-23.4a5.31 5.31 0 0 0-3.02-1.36l-17.09 349.83 137.9-29.86s-77.43-303.9-77.74-306.08c-.31-2.19-2.24-3.4-3.34-3.52z"
      />
      <path
        fill="#fff"
        d="M269.15 175.16l-16.02 47.66s-14.08-7.52-31.34-7.52c-25.31 0-26.58 15.87-26.58 19.88 0 21.8 56.85 30.15 56.85 81.4 0 40.35-25.61 66.33-60.16 66.33-41.44 0-62.63-25.8-62.63-25.8l11.09-36.66s21.79 18.71 40.19 18.71c12.02 0 16.9-9.46 16.9-16.36 0-28.51-46.63-29.79-46.63-76.74 0-39.53 28.4-77.79 85.71-77.79 22.15 0 33.12 6.34 33.12 6.34z"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden ambient-light"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 w-full">
        <div className="flex flex-col items-center text-center gap-8">
                {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.04] backdrop-blur-sm text-[11px] font-semibold uppercase tracking-wider text-emerald-300/90"
          >
            <span className="relative flex h-1.5 w-1.5">
              <motion.span
                animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
              />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            Available for opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
          >
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 text-lg md:text-xl text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-blue-400" />
              AI Specialist
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-2">
              <ShopifyIcon className="h-5 w-5" />
              Shopify Expert
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            {profile.tagline} Was an intern at{' '}
            <span className="text-white font-medium">Benfox Digital Agency</span>{' '}
            while pursuing A Levels.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          >
            <MagneticButton href="#projects">
              <span className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow">
                <Sparkles className="h-4 w-4" />
                View My Work
              </span>
            </MagneticButton>
            <MagneticButton href="#contact">
              <span className="flex items-center gap-2 px-6 py-3 rounded-xl glass text-sm font-medium hover:bg-white/5 transition-colors">
                Get in Touch
              </span>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 w-full max-w-3xl"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 p-4 rounded-2xl glass"
              >
                <span className="font-display text-2xl md:text-3xl font-bold text-gradient-accent">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground text-center leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em]">
              Scroll
            </span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

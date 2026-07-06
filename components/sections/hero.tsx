'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, ShoppingBag, Brain } from 'lucide-react';
import { profile, stats } from '@/lib/portfolio-data';
import { MagneticButton } from '@/components/magnetic-button';

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
            className="flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
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
              <Brain className="h-5 w-5 text-blue-400" />
              AI Specialist
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-indigo-400" />
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

'use client';

import { motion } from 'framer-motion';
import {
  Package,
  Sparkles,
  Search,
  Brain,
  LayoutDashboard,
  Palette,
  type LucideIcon,
} from 'lucide-react';
import { achievements } from '@/lib/portfolio-data';
import { SectionHeading } from '@/components/section-heading';
import { ScrollReveal } from '@/components/scroll-reveal';

const iconMap: Record<string, LucideIcon> = {
  Package,
  Sparkles,
  Search,
  Brain,
  LayoutDashboard,
  Palette,
};

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Achievements"
          title="Key Highlights"
          description="Tangible outcomes from my work across commerce, AI, and research."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => {
            const Icon = iconMap[item.icon] ?? Sparkles;
            return (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="relative p-6 rounded-2xl glass group h-full overflow-hidden"
                >
                  {/* Glow on hover */}
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-indigo-600/30 transition-colors">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Number */}
                  <span className="absolute bottom-3 right-4 font-display text-5xl font-bold text-white/[0.03] group-hover:text-white/[0.06] transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

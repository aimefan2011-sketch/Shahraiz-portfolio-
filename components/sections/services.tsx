'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  ShoppingBag,
  Palette,
  Package,
  Code2,
  Sparkles,
  Workflow,
  Wrench,
  Lightbulb,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { services } from '@/lib/portfolio-data';
import { SectionHeading } from '@/components/section-heading';
import { ScrollReveal } from '@/components/scroll-reveal';
import { MagneticButton } from '@/components/magnetic-button';

const iconMap: Record<string, LucideIcon> = {
  Brain,
  ShoppingBag,
  Palette,
  Package,
  Code2,
  Sparkles,
  Workflow,
  Wrench,
  Lightbulb,
};

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Services"
          title="What I Offer"
          description="Nine focused services across AI, Shopify, and digital strategy."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] ?? Brain;
            return (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative p-6 rounded-2xl glass h-full flex flex-col overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex flex-col h-full">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>

                    <h3 className="font-display text-lg font-semibold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>

                    <ul className="space-y-1.5 mb-5">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <Check className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <MagneticButton href="#contact">
                      <span className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5">
                        Enquire
                      </span>
                    </MagneticButton>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

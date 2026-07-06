'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { experience } from '@/lib/portfolio-data';
import { SectionHeading } from '@/components/section-heading';
import { ScrollReveal } from '@/components/scroll-reveal';

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Professional Journey"
          description="Hands-on work at Benfox Digital Agency across Shopify, AI, and client research."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-indigo-500/30 to-transparent md:-translate-x-1/2" />

          {experience.map((exp, idx) => (
            <ScrollReveal key={idx} delay={0.1}>
              <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 mb-12">
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 z-10">
                  <div className="h-3 w-3 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block" />

                {/* Content */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl glass"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-blue-400 mb-3">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {exp.summary}
                  </p>

                  <div className="space-y-2">
                    {exp.responsibilities.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="flex items-start gap-2.5"
                      >
                        <span className="mt-0.5 h-4 w-4 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5 text-blue-400" />
                        </span>
                        <span className="text-sm text-muted-foreground">{r}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { GraduationCap, History, MapPin, User } from 'lucide-react';import { profile } from '@/lib/portfolio-data';
import { SectionHeading } from '@/components/section-heading';
import { ScrollReveal } from '@/components/scroll-reveal';

const infoCards = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: profile.education,
  },
  {
    icon: History,
    label: 'Past Experience',
    value: profile.position,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: profile.location,
  },
  {
    icon: User,
    label: 'Focus',
    value: 'AI & Shopify Commerce',
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="About"
          title="Who I Am"
          description="A blend of AI fluency and hands-on commerce operations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Bio */}
          <ScrollReveal className="lg:col-span-3" delay={0.1}>
            <div className="space-y-6">
              {profile.bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-base md:text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </ScrollReveal>

          {/* Info cards */}
          <ScrollReveal className="lg:col-span-2" delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infoCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl glass group"
                >
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center mb-3 group-hover:from-blue-500/30 group-hover:to-indigo-600/30 transition-colors">
                    <card.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    {card.label}
                  </p>
                  <p className="text-sm font-medium text-white leading-tight">
                    {card.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

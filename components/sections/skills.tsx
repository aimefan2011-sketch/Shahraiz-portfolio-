'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  Palette,
  Workflow,
  ShoppingBag,
  BarChart3,
  Code2,
  type LucideIcon,
} from 'lucide-react';
import { skillCategories } from '@/lib/portfolio-data';
import { SectionHeading } from '@/components/section-heading';
import { ScrollReveal } from '@/components/scroll-reveal';

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Palette,
  Workflow,
  ShoppingBag,
  BarChart3,
  Code2,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Expertise"
          description="A versatile toolkit spanning AI, commerce, design, and automation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIdx) => {
            const Icon = iconMap[category.icon] ?? Brain;
            return (
              <ScrollReveal key={category.name} delay={catIdx * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="p-6 rounded-2xl glass h-full group"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-indigo-600/30 transition-colors">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: sIdx * 0.05,
                        }}
                        whileHover={{ y: -2, scale: 1.03 }}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 transition-colors cursor-default"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />
                        <span className="text-sm font-medium text-white/90">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
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

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  X,
  AlertCircle,
  Target,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';
import { projects } from '@/lib/portfolio-data';
import { SectionHeading } from '@/components/section-heading';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function Projects() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-32 ambient-light">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected Work"
          description="Case studies showing how I approach problems and deliver results."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <motion.button
                onClick={() => setSelected(idx)}
                whileHover={{ y: -6 }}
                className="text-left w-full rounded-2xl glass group h-full flex flex-col overflow-hidden"
              >
                {/* Preview image */}
                <div className="relative h-48 overflow-hidden border-b border-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="outline"
                      className="bg-background/60 backdrop-blur-md border-white/10 text-xs"
                    >
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-blue-400 font-medium">
                    View case study
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Case study modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative glass-strong rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 h-9 w-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors z-10"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal image */}
              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={projects[selected].image}
                  alt={projects[selected].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/20 backdrop-blur-md border-blue-500/30 text-blue-300 mb-2"
                  >
                    {projects[selected].category}
                  </Badge>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {projects[selected].title}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {projects[selected].description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {projects[selected].metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/5 text-center"
                    >
                      <p className="text-sm font-semibold text-white">
                        {m.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Case study sections */}
                <div className="space-y-5">
                  <CaseBlock
                    icon={Target}
                    label="Problem"
                    text={projects[selected].problem}
                    color="text-red-400"
                  />
                  <CaseBlock
                    icon={Lightbulb}
                    label="Solution"
                    text={projects[selected].solution}
                    color="text-blue-400"
                  />
                  <CaseBlock
                    icon={AlertCircle}
                    label="Challenges"
                    text={projects[selected].challenges}
                    color="text-amber-400"
                  />
                  <CaseBlock
                    icon={TrendingUp}
                    label="Results"
                    text={projects[selected].results}
                    color="text-emerald-400"
                  />
                </div>

                {/* Tech */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {projects[selected].technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-white/5 text-sm text-white border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CaseBlock({
  icon: Icon,
  label,
  text,
  color,
}: {
  icon: typeof Target;
  label: string;
  text: string;
  color: string;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={cn(
          'h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0',
          color
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className={cn('text-sm font-semibold mb-1', color)}>{label}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

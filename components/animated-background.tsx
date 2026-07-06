'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Thin overlay layers that sit on top of the fixed background image.
 * The image itself is applied on <html> in globals.css.
 *
 * Layer 1: Tiny floating particles
 * Layer 2: Vignette to keep edges dark and focus the center
 */
export function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 22 + 18,
        delay: Math.random() * 10,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Tiny floating particles */}
      {!prefersReducedMotion &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: Math.min(p.size, 2),
              height: Math.min(p.size, 2),
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0, 0.012, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* Vignette — darkens edges, focuses center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.45) 100%)',
        }}
      />
    </div>
  );
}

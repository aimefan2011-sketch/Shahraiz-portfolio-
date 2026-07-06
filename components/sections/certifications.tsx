'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { certifications } from '@/lib/portfolio-data';
import { SectionHeading } from '@/components/section-heading';
import { ScrollReveal } from '@/components/scroll-reveal';

export function Certifications() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev + 1) % certifications.length
    );
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const prev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? prev
        : (prev - 1 + certifications.length) % certifications.length
    );
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const zoomIn = () => {
    setZoom((z) => Math.min(z + 0.5, 4));
  };
  const zoomOut = () => {
    setZoom((z) => {
      const newZoom = Math.max(z - 0.5, 1);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, next, prev]);

  return (
    <section id="certifications" className="relative py-24 md:py-32 ambient-light">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials"
          description="Verified certifications from Alison, Coursera, and Google."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
                onClick={() => setLightboxIndex(idx)}
              >
                <div className="relative rounded-2xl glass overflow-hidden">
                  {/* Certificate image — object-contain to preserve aspect ratio */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center p-4">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 pointer-events-none">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-strong text-sm text-white">
                        <ZoomIn className="h-4 w-4" />
                        Click to enlarge
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold text-white mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {cert.issuer} · {cert.year}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={closeLightbox}
            />

            {/* Controls */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={zoomOut}
                disabled={zoom === 1}
                className="h-10 w-10 rounded-full glass-strong flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-40"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <span className="px-3 py-1.5 rounded-full glass-strong text-xs text-white font-mono">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={zoomIn}
                disabled={zoom === 4}
                className="h-10 w-10 rounded-full glass-strong flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-40"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                onClick={closeLightbox}
                className="h-10 w-10 rounded-full glass-strong flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Prev */}
            <button
              onClick={prev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full glass-strong flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next */}
            <button
              onClick={next}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full glass-strong flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Certificate */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative z-10 max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative w-full flex items-center justify-center ${zoom > 1 ? 'cursor-grab' : ''} ${isDragging ? 'cursor-grabbing' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={certifications[lightboxIndex].image}
                  alt={certifications[lightboxIndex].title}
                  draggable={false}
                  className="max-w-full max-h-[70vh] w-auto h-auto rounded-xl shadow-2xl object-contain select-none"
                  style={{
                    transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                    transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                  }}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-white font-medium">
                  {certifications[lightboxIndex].title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {certifications[lightboxIndex].issuer} ·{' '}
                  {certifications[lightboxIndex].year}
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  {zoom > 1 ? (
                    <span className="flex items-center justify-center gap-1">
                      <Move className="h-3 w-3" /> Drag to move · ESC to close
                    </span>
                  ) : (
                    'Click + to zoom · ESC to close · ← → to navigate'
                  )}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

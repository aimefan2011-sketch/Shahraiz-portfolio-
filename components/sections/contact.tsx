'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Linkedin, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { profile } from '@/lib/portfolio-data';
import { SectionHeading } from '@/components/section-heading';
import { ScrollReveal } from '@/components/scroll-reveal';
import { toast } from 'sonner';

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(null), 2000);
  };

  const contactMethods = [
    {
      icon: Phone,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'shahraiz-ahmad',
      href: profile.linkedin,
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Talk"
          description={profile.contactMessage}
        />

        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactMethods.map((method, idx) => (
                <motion.a
                  key={idx}
                  href={method.href}
                  target={method.label === 'LinkedIn' ? '_blank' : undefined}
                  rel={
                    method.label === 'LinkedIn'
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  whileHover={{ y: -6 }}
                  className="group p-6 rounded-2xl glass text-center flex flex-col items-center gap-3"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-indigo-600/30 transition-colors">
                    <method.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                      {method.label}
                    </p>
                    <p className="text-sm font-medium text-white break-all">
                      {method.value}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(
                        method.label === 'LinkedIn'
                          ? profile.linkedin
                          : method.value,
                        method.label
                      );
                    }}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors"
                  >
                    {copied === method.label ? (
                      <>
                        <Check className="h-3 w-3" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy
                      </>
                    )}
                  </button>
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.div
              whileHover={{ y: -4 }}
              className="mt-6 p-8 rounded-2xl glass text-center"
            >
              <p className="text-lg text-white font-medium mb-2">
                Ready to start a conversation?
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Reach out via any channel above — I typically respond within 24
                hours.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
              >
                <Mail className="h-4 w-4" />
                Send an Email
              </a>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

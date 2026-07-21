'use client';

import CharacterBg from './CharacterBg';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <CharacterBg
        backgroundColor="transparent"
        speed={30}
        reverse={false}
        gap={10}
        gridText="SHAHRAIZ • AI • SHOPIFY • PORTFOLIO • "
        font={{
          fontFamily: 'Inter',
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1,
          letterSpacing: 0,
          textAlign: 'left',
        }}
        colors={{
          paletteCount: 1,
          color1: '#FFFFFF',
        }}
      />

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

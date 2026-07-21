'use client';

import CharacterBg from './CharacterBg';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <CharacterBg
        backgroundColor="transparent"
        gridText="SHAHRAIZ • AI • SHOPIFY • PORTFOLIO • "
        speed={30}
        reverse={false}
        gap={10}
        font={{
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 18,
        }}
        colors={{
          paletteCount: 3,
          color1: "#ffffff",
          color2: "#60a5fa",
          color3: "#2563eb",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,.65) 100%)",
        }}
      />
    </div>
  );
}

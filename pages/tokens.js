// Design tokens — "Calm & wellness" direction
// Soft pastels, lots of whitespace, rounded, friendly
// Reads palette/density/card-style from window.TWEAKS (set by tweaks panel)

window.PALETTES = {
  sage: {
    name: "Sage",
    bg: "#FBF8F3",
    surface: "#FFFFFF",
    surface2: "#F5F1EA",
    border: "#EBE5DB",
    text: "#2D2A26",
    textMute: "#7A7268",
    primary: "#5C8A6B",
    primarySoft: "#DCEADE",
    accent: "#E8896F",
    accentSoft: "#F8DBD0",
    warn: "#D9913F",
    warnSoft: "#F6E2C7",
    danger: "#C46A5F",
    dangerSoft: "#F4D8D3",
    yellow: "#F4D374",
    yellowSoft: "#FAEAB5",
    lavender: "#A8A0C8",
    lavSoft: "#E3DFEE",
    blue: "#7DA9C7",
    blueSoft: "#D9E6EE",
  },
  lavender: {
    name: "Lavender",
    bg: "#FBF7FB",
    surface: "#FFFFFF",
    surface2: "#F3EDF4",
    border: "#E7DDEA",
    text: "#2A2632",
    textMute: "#766C80",
    primary: "#8B7AB0",
    primarySoft: "#E5DEF0",
    accent: "#E8896F",
    accentSoft: "#F8DBD0",
    warn: "#D9913F",
    warnSoft: "#F6E2C7",
    danger: "#C46A5F",
    dangerSoft: "#F4D8D3",
    yellow: "#F4D374",
    yellowSoft: "#FAEAB5",
    lavender: "#A8A0C8",
    lavSoft: "#E3DFEE",
    blue: "#7DA9C7",
    blueSoft: "#D9E6EE",
  },
  coral: {
    name: "Coral",
    bg: "#FCF7F4",
    surface: "#FFFFFF",
    surface2: "#F7EEE8",
    border: "#EEDCD2",
    text: "#322521",
    textMute: "#806E66",
    primary: "#D97257",
    primarySoft: "#F8DBD0",
    accent: "#5C8A6B",
    accentSoft: "#DCEADE",
    warn: "#D9913F",
    warnSoft: "#F6E2C7",
    danger: "#C46A5F",
    dangerSoft: "#F4D8D3",
    yellow: "#F4D374",
    yellowSoft: "#FAEAB5",
    lavender: "#A8A0C8",
    lavSoft: "#E3DFEE",
    blue: "#7DA9C7",
    blueSoft: "#D9E6EE",
  },
  slate: {
    name: "Slate",
    bg: "#F4F5F6",
    surface: "#FFFFFF",
    surface2: "#ECEEF1",
    border: "#DEE2E7",
    text: "#1F2937",
    textMute: "#6B7280",
    primary: "#4F6B8A",
    primarySoft: "#DEE6F0",
    accent: "#E8896F",
    accentSoft: "#F8DBD0",
    warn: "#D9913F",
    warnSoft: "#F6E2C7",
    danger: "#C46A5F",
    dangerSoft: "#F4D8D3",
    yellow: "#F4D374",
    yellowSoft: "#FAEAB5",
    lavender: "#A8A0C8",
    lavSoft: "#E3DFEE",
    blue: "#7DA9C7",
    blueSoft: "#D9E6EE",
  },
  rose: {
    name: "Rose",
    bg: "#FDF8F7",
    surface: "#FFFFFF",
    surface2: "#F8ECEB",
    border: "#EEDDDC",
    text: "#362322",
    textMute: "#8A6D6C",
    primary: "#C86260",
    primarySoft: "#FADBD9",
    accent: "#5C8A6B",
    accentSoft: "#DCEADE",
    warn: "#D9913F",
    warnSoft: "#F6E2C7",
    danger: "#C46A5F",
    dangerSoft: "#F4D8D3",
    yellow: "#F4D374",
    yellowSoft: "#FAEAB5",
    lavender: "#A8A0C8",
    lavSoft: "#E3DFEE",
    blue: "#7DA9C7",
    blueSoft: "#D9E6EE",
  },
  sageDark: {
    name: "Sage (Dark)",
    bg: "#121614",
    surface: "#1A201C",
    surface2: "#252D28",
    border: "#2E3A33",
    text: "#E4EAE6",
    textMute: "#8C9C93",
    primary: "#7BB38C",
    primarySoft: "#2C3E33",
    accent: "#F1AA97",
    accentSoft: "#432B25",
    warn: "#F1B875",
    warnSoft: "#43321C",
    danger: "#E39085",
    dangerSoft: "#3E2320",
    yellow: "#FBE094",
    yellowSoft: "#3F3821",
    lavender: "#C0B7DC",
    lavSoft: "#2E2A3B",
    blue: "#A0C5DD",
    blueSoft: "#23323B",
  },
  lavenderDark: {
    name: "Lavender (Dark)",
    bg: "#141218",
    surface: "#1D1A23",
    surface2: "#2A2532",
    border: "#362F40",
    text: "#EAE4ED",
    textMute: "#958B9E",
    primary: "#B1A2D9",
    primarySoft: "#342A4E",
    accent: "#F1AA97",
    accentSoft: "#432B25",
    warn: "#F1B875",
    warnSoft: "#43321C",
    danger: "#E39085",
    dangerSoft: "#3E2320",
    yellow: "#FBE094",
    yellowSoft: "#3F3821",
    lavender: "#C0B7DC",
    lavSoft: "#2E2A3B",
    blue: "#A0C5DD",
    blueSoft: "#23323B",
  },
  coralDark: {
    name: "Coral (Dark)",
    bg: "#181311",
    surface: "#241C1A",
    surface2: "#322724",
    border: "#42332F",
    text: "#EFE4DF",
    textMute: "#A08C85",
    primary: "#EE9A85",
    primarySoft: "#4F2B22",
    accent: "#7BB38C",
    accentSoft: "#2C3E33",
    warn: "#F1B875",
    warnSoft: "#43321C",
    danger: "#E39085",
    dangerSoft: "#3E2320",
    yellow: "#FBE094",
    yellowSoft: "#3F3821",
    lavender: "#C0B7DC",
    lavSoft: "#2E2A3B",
    blue: "#A0C5DD",
    blueSoft: "#23323B",
  },
  slateDark: {
    name: "Slate (Dark)",
    bg: "#111315",
    surface: "#191C20",
    surface2: "#24282F",
    border: "#303640",
    text: "#E9ECEF",
    textMute: "#8C96A3",
    primary: "#7FA7D1",
    primarySoft: "#28394F",
    accent: "#F1AA97",
    accentSoft: "#432B25",
    warn: "#F1B875",
    warnSoft: "#43321C",
    danger: "#E39085",
    dangerSoft: "#3E2320",
    yellow: "#FBE094",
    yellowSoft: "#3F3821",
    lavender: "#C0B7DC",
    lavSoft: "#2E2A3B",
    blue: "#A0C5DD",
    blueSoft: "#23323B",
  },
  roseDark: {
    name: "Rose (Dark)",
    bg: "#181212",
    surface: "#241A1A",
    surface2: "#322525",
    border: "#423030",
    text: "#EFE4E4",
    textMute: "#A08686",
    primary: "#E59593",
    primarySoft: "#4E2A2A",
    accent: "#7BB38C",
    accentSoft: "#2C3E33",
    warn: "#F1B875",
    warnSoft: "#43321C",
    danger: "#E39085",
    dangerSoft: "#3E2320",
    yellow: "#FBE094",
    yellowSoft: "#3F3821",
    lavender: "#C0B7DC",
    lavSoft: "#2E2A3B",
    blue: "#A0C5DD",
    blueSoft: "#23323B",
  },
};

window.useTokens = function useTokens() {
  const tw = window.__TWEAKS || {};
  const paletteKey = tw.palette || "sage";
  const darkMode = tw.darkMode || false;
  const targetKey = darkMode ? `${paletteKey}Dark` : paletteKey;
  const p = window.PALETTES[targetKey] || window.PALETTES[paletteKey] || window.PALETTES.sage;
  const density = tw.density || "cozy"; // 'cozy' | 'compact'
  const cardStyle = tw.cardStyle || "soft"; // 'soft' | 'outlined' | 'filled'

  const pad = density === "compact" ? 16 : 24;
  const padSm = density === "compact" ? 10 : 14;
  const gap = density === "compact" ? 12 : 18;

  return {
    c: p,
    palette: paletteKey,
    density,
    cardStyle,
    pad,
    padSm,
    gap,
    radius: 18,
    radiusSm: 12,
    radiusLg: 24,
    font: '"Geist", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    fontSerif: '"Newsreader", Georgia, serif',
    fontMono: '"JetBrains Mono", ui-monospace, Menlo, monospace',
    // Card style helper
    cardStyles(extra = {}) {
      const base = {
        background: p.surface,
        borderRadius: 18,
        padding: pad,
        ...extra,
      };
      if (cardStyle === "outlined") {
        return { ...base, border: `1px solid ${p.border}`, boxShadow: "none" };
      }
      if (cardStyle === "filled") {
        return {
          ...base,
          background: p.surface2,
          border: "none",
          boxShadow: "none",
        };
      }
      return {
        ...base,
        border: `1px solid ${p.border}`,
        boxShadow: darkMode
          ? "0 1px 2px rgba(0,0,0,.3), 0 4px 16px rgba(0,0,0,.4)"
          : "0 1px 2px rgba(40,30,20,.03), 0 4px 16px rgba(40,30,20,.03)",
      };
    },
  };
};

// Inject base fonts + reset
if (
  typeof document !== "undefined" &&
  !document.getElementById("tokens-fonts")
) {
  const link = document.createElement("link");
  link.id = "tokens-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap";
  document.head.appendChild(link);
}

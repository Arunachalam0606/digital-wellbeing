// Redesigned shared primitives — sharper hierarchy, editorial-grade type,
// tighter cards. All respect useTokens() palette/density/dark/font-pair.

const { useState: useStateR, useEffect: useEffectR, useMemo: useMemoR } = React;

// ─────────────────── Brand ───────────────────
// User will rename Atrium — using placeholder BRAND_NAME so it's easy to swap.
const BRAND_NAME = "Atrium";

// ─────────────────── Editorial display heading ───────────────────
function DisplayH({ children, size = 44, style = {}, tag = "h1" }) {
  const t = useTokens();
  const Tag = tag;
  return (
    <Tag
      style={{
        fontFamily: t.fontSerif,
        fontSize: size,
        fontWeight: t.displayWeight,
        letterSpacing: t.displayTracking,
        lineHeight: 1.05,
        color: t.c.text,
        margin: 0,
        textWrap: "balance",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// ─────────────────── Eyebrow label ───────────────────
function Eyebrow({ children, style = {} }) {
  const t = useTokens();
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color: t.c.textMute,
        fontFamily: t.font,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────── Ambient background (dot grid + soft blobs) ───────────────────
function AmbientBg({ variant = "warm", opacity = 1 }) {
  const t = useTokens();
  const blob1 = variant === "warm" ? t.c.accent : t.c.primary;
  const blob2 = variant === "warm" ? t.c.yellow : t.c.blue;
  return (
    <>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${
            t.dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.05)"
          } 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 90%)",
          opacity: opacity * 0.5,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: blob1,
          filter: "blur(90px)",
          opacity: opacity * (t.dark ? 0.22 : 0.18),
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -100,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: blob2,
          filter: "blur(80px)",
          opacity: opacity * (t.dark ? 0.18 : 0.15),
          pointerEvents: "none",
        }}
      />
    </>
  );
}

// ─────────────────── Segmented progress bar ───────────────────
function StepBar({ current, total }) {
  const t = useTokens();
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 3,
            width: i === current ? 28 : 16,
            borderRadius: 2,
            background: i <= current ? t.c.primary : t.c.border,
            transition: "all .3s",
          }}
        />
      ))}
      <div
        style={{
          marginLeft: 10,
          fontSize: 12,
          color: t.c.textMute,
          fontFamily: t.font,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String(current + 1).padStart(2, "0")}{" "}
        <span style={{ opacity: 0.5 }}>/ {String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

// ─────────────────── Logo mark ───────────────────
function BrandMark({ size = 32, showName = true, style = {} }) {
  const t = useTokens();
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        color: t.c.text,
        ...style,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: t.c.primary,
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Concentric ring — atrium/circle metaphor */}
        <div
          style={{
            position: "absolute",
            inset: 5,
            borderRadius: "50%",
            background: t.c.surface,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: "50%",
            background: t.c.primary,
          }}
        />
      </div>
      {showName && (
        <span
          style={{
            fontFamily: t.fontSerif,
            fontSize: size * 0.65,
            fontWeight: 500,
            letterSpacing: "-.02em",
            color: t.c.text,
          }}
        >
          {BRAND_NAME}
        </span>
      )}
    </div>
  );
}

// ─────────────────── Redesigned Field (input + label) ───────────────────
function Field({
  label,
  hint,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  autoFocus,
}) {
  const t = useTokens();
  const [focus, setFocus] = useStateR(false);
  return (
    <label style={{ display: "block" }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: t.c.textMute,
          marginBottom: 6,
          letterSpacing: ".02em",
          fontFamily: t.font,
        }}
      >
        {label}
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          background: t.c.surface,
          border: `1px solid ${focus ? t.c.primary : t.c.border}`,
          borderRadius: 12,
          padding: "0 14px",
          boxShadow: focus ? `0 0 0 4px ${t.c.primarySoft}` : "none",
          transition: "all .18s ease",
        }}
      >
        {icon && (
          <div style={{ marginRight: 10, color: t.c.textMute }}>
            <Icon name={icon} size={16} />
          </div>
        )}
        <input
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            padding: "12px 0",
            fontSize: 14.5,
            color: t.c.text,
            fontFamily: t.font,
          }}
        />
      </div>
      {hint && (
        <div
          style={{
            fontSize: 12,
            color: t.c.textMute,
            marginTop: 6,
            fontFamily: t.font,
          }}
        >
          {hint}
        </div>
      )}
    </label>
  );
}

// ─────────────────── Primary / Ghost buttons ───────────────────
function PrimaryBtn({
  children,
  onClick,
  full,
  style = {},
  type = "button",
  iconRight,
}) {
  const t = useTokens();
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: full ? "100%" : "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "13px 22px",
        border: "none",
        borderRadius: 12,
        background: t.c.text,
        color: t.c.bg,
        fontFamily: t.font,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: ".01em",
        cursor: "pointer",
        boxShadow: t.dark
          ? "0 4px 20px rgba(0,0,0,.4)"
          : "0 4px 20px rgba(40,30,20,.15)",
        transition: "transform .12s ease, box-shadow .12s ease",
        ...style,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-1px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {children}
      {iconRight && <Icon name={iconRight} size={16} />}
    </button>
  );
}

function GhostBtn({
  children,
  onClick,
  full,
  style = {},
  iconLeft,
  iconRight,
}) {
  const t = useTokens();
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: full ? "100%" : "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "12px 20px",
        border: `1px solid ${t.c.border}`,
        borderRadius: 12,
        background: t.c.surface,
        color: t.c.text,
        fontFamily: t.font,
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        transition: "background .12s ease",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = t.c.surface2)}
      onMouseLeave={(e) => (e.currentTarget.style.background = t.c.surface)}
    >
      {iconLeft && <Icon name={iconLeft} size={16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={16} />}
    </button>
  );
}

// ─────────────────── Section divider intro card (used between DCSections) ───────────────────
function SectionIntro({
  number,
  title,
  subtitle,
  kicker,
  width = 1200,
  height = 320,
}) {
  const t = useTokens();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.c.bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        padding: "0 80px",
        borderRadius: 24,
        border: `1px solid ${t.c.border}`,
      }}
    >
      <AmbientBg variant="warm" opacity={0.7} />
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 32,
          fontFamily: t.fontSerif,
          fontSize: 160,
          fontStyle: "italic",
          fontWeight: 300,
          color: t.c.primary,
          opacity: t.dark ? 0.14 : 0.12,
          lineHeight: 0.8,
          userSelect: "none",
        }}
      >
        {number}
      </div>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 720 }}>
        {kicker && (
          <Eyebrow style={{ color: t.c.primary, marginBottom: 14 }}>
            {kicker}
          </Eyebrow>
        )}
        <DisplayH size={68} style={{ marginBottom: 16 }}>
          {title}
        </DisplayH>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.55,
            color: t.c.textMute,
            fontFamily: t.font,
            maxWidth: 560,
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

// Export to window so JSX can reference these globally
Object.assign(window, {
  BRAND_NAME,
  DisplayH,
  Eyebrow,
  AmbientBg,
  StepBar,
  BrandMark,
  Field: window.Field || Field, // keep window.Field usable
  RField: Field,
  PrimaryBtn,
  GhostBtn,
  SectionIntro,
});

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

window.triggerModal = (type, data = {}) => {
  window.dispatchEvent(
    new CustomEvent("open-atrium-modal", { detail: { type, data } }),
  );
};

function GlobalDrawerOrModal() {
  const t = useTokens();
  const [state, setState] = React.useState({
    open: false,
    type: null,
    data: null,
  });

  React.useEffect(() => {
    const handleOpen = (e) => {
      setState({ open: true, type: e.detail.type, data: e.detail.data });
    };
    window.addEventListener("open-atrium-modal", handleOpen);
    return () => window.removeEventListener("open-atrium-modal", handleOpen);
  }, []);

  if (!state.open) return null;

  const { type, data } = state;
  const onClose = () => setState({ open: false, type: null, data: null });

  const isMobile = data?.mobile || window.innerWidth < 768;

  let title = "";
  let content = null;

  if (type === "review") {
    title = "Review Request";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontSize: 14, color: t.c.textMute, margin: 0 }}>
          <b>Jaden</b> is asking for <b>30 more minutes</b> on <b>Discord</b>.
        </p>
        <div
          style={{
            background: t.c.surface2,
            padding: 12,
            borderRadius: 8,
            fontSize: 13,
            color: t.c.text,
            fontStyle: "italic",
          }}
        >
          "Group study session questions - need to coordinate with the team."
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 12,
          }}
        >
          <PrimaryBtn
            onClick={() => {
              alert("Approved 30m!");
              onClose();
            }}
          >
            Approve 30 Minutes
          </PrimaryBtn>
          <GhostBtn
            onClick={() => {
              alert("Approved 15m!");
              onClose();
            }}
          >
            Approve 15 Minutes
          </GhostBtn>
          <GhostBtn
            onClick={() => {
              alert("Approved 1 hour!");
              onClose();
            }}
          >
            Approve 1 Hour
          </GhostBtn>
          <button
            onClick={() => {
              alert("Declined request!");
              onClose();
            }}
            style={{
              background: t.c.dangerSoft,
              color: t.c.danger,
              border: "none",
              borderRadius: 8,
              padding: "10px 0",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: t.font,
            }}
          >
            Decline Request
          </button>
        </div>
      </div>
    );
  } else if (type === "extend") {
    title = "Extend Limit";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontSize: 14, color: t.c.textMute, margin: 0 }}>
          Extend <b>Maya's</b> daily budget for <b>Roblox</b>. Currently at 48m
          / 60m.
        </p>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <PrimaryBtn
            onClick={() => {
              alert("Added 15m!");
              onClose();
            }}
          >
            +15 Minutes
          </PrimaryBtn>
          <PrimaryBtn
            onClick={() => {
              alert("Added 30m!");
              onClose();
            }}
          >
            +30 Minutes
          </PrimaryBtn>
          <PrimaryBtn
            onClick={() => {
              alert("Added 1 hour!");
              onClose();
            }}
          >
            +1 Hour
          </PrimaryBtn>
          <GhostBtn
            onClick={() => {
              alert("Unlimit today!");
              onClose();
            }}
          >
            No Limit Today
          </GhostBtn>
        </div>
      </div>
    );
  } else if (type === "investigate") {
    title = "Investigate Bypass";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontSize: 14, color: t.c.textMute, margin: 0 }}>
          A bypass attempt was detected on <b>Jaden's Pixel 8</b> for{" "}
          <b>TikTok</b>.
        </p>
        <div
          style={{
            background: t.c.dangerSoft,
            padding: 12,
            borderRadius: 8,
            fontSize: 13,
            color: t.c.danger,
          }}
        >
          ⚠️ App installation or package manipulation was detected today at 3:14
          PM.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 12,
          }}
        >
          <PrimaryBtn
            onClick={() => {
              alert("Locking Jaden's devices...");
              onClose();
            }}
          >
            Lock All Jaden's Devices
          </PrimaryBtn>
          <GhostBtn
            onClick={() => {
              alert("Coaching conversation guide opened!");
              onClose();
            }}
          >
            Open Coaching Guide
          </GhostBtn>
          <GhostBtn
            onClick={() => {
              alert("Alert dismissed.");
              onClose();
            }}
          >
            Dismiss Alert
          </GhostBtn>
        </div>
      </div>
    );
  } else if (type === "preview") {
    title = "Preview Schedule";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontSize: 14, color: t.c.textMute, margin: 0 }}>
          Previewing <b>Weekend Downtime</b> rules activating in 6 hours.
        </p>
        <div
          style={{
            background: t.c.surface2,
            padding: 14,
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
            }}
          >
            <span>Friday Bedtime</span>
            <b>10:30 PM - 7:00 AM</b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
            }}
          >
            <span>Entertainment Limit</span>
            <b>2 hours (up from 1h)</b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
            }}
          >
            <span>Educational Apps</span>
            <b>Unrestricted</b>
          </div>
        </div>
        <PrimaryBtn onClick={onClose}>Done</PrimaryBtn>
      </div>
    );
  } else if (type === "configure") {
    title = "Configure Profile";
    content = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Profile configured!");
          onClose();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.c.textMute,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Daily screen time cap
          </label>
          <input
            type="text"
            defaultValue="2 hours 30 minutes"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              color: t.c.text,
              fontFamily: t.font,
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.c.textMute,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Bedtime lock starts
          </label>
          <input
            type="text"
            defaultValue="9:00 PM"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              color: t.c.text,
              fontFamily: t.font,
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <PrimaryBtn type="submit" style={{ flex: 1 }}>
            Save settings
          </PrimaryBtn>
          <GhostBtn onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </GhostBtn>
        </div>
      </form>
    );
  } else if (type === "...") {
    title = "Quick Actions";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={() => {
            alert("Device paused!");
            onClose();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 12,
            background: t.c.surface2,
            border: "none",
            borderRadius: 8,
            color: t.c.text,
            fontSize: 13.5,
            cursor: "pointer",
            textAlign: "left",
            fontFamily: t.font,
          }}
        >
          <Icon name="lock" size={14} /> Pause connection now
        </button>
        <button
          onClick={() => {
            alert("Limits cleared!");
            onClose();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 12,
            background: t.c.surface2,
            border: "none",
            borderRadius: 8,
            color: t.c.text,
            fontSize: 13.5,
            cursor: "pointer",
            textAlign: "left",
            fontFamily: t.font,
          }}
        >
          <Icon name="sparkles" size={14} /> Clear today's totals
        </button>
        <button
          onClick={() => {
            alert("Running diagnostic check...");
            onClose();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 12,
            background: t.c.surface2,
            border: "none",
            borderRadius: 8,
            color: t.c.text,
            fontSize: 13.5,
            cursor: "pointer",
            textAlign: "left",
            fontFamily: t.font,
          }}
        >
          <Icon name="shieldCheck" size={14} /> Run network diagnostics
        </button>
        <button
          onClick={onClose}
          style={{
            marginTop: 12,
            padding: "10px 0",
            background: "none",
            border: `1px solid ${t.c.border}`,
            borderRadius: 8,
            color: t.c.textMute,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: t.font,
          }}
        >
          Close Menu
        </button>
      </div>
    );
  } else if (type === "pair") {
    title = "Pair New Device";
    content = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 13.5,
            color: t.c.textMute,
            textAlign: "left",
            margin: "0 0 10px",
          }}
        >
          Scan this QR code with the child's device to install the Atrium agent
          and pair it instantly.
        </p>
        <div
          style={{
            background: "white",
            padding: 16,
            borderRadius: 12,
            display: "inline-flex",
            justifyContent: "center",
            margin: "0 auto 10px",
            width: 140,
            height: 140,
            border: `1px solid ${t.c.border}`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 6,
              width: "100%",
              height: "100%",
            }}
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: i % 2 === 0 || i % 3 === 0 ? "#111" : "#eee",
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ fontSize: 12, color: t.c.textMute }}>
          Or visit <b>atrium.setup</b> on the device and enter code:{" "}
          <b>ATR - 902</b>
        </div>
        <PrimaryBtn onClick={onClose} style={{ marginTop: 12 }}>
          Done
        </PrimaryBtn>
      </div>
    );
  } else if (type === "app-rule") {
    title = "Create App Rule";
    content = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("App rule saved!");
          onClose();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.c.textMute,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            App name
          </label>
          <input
            type="text"
            defaultValue="YouTube"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              color: t.c.text,
              fontFamily: t.font,
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.c.textMute,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Rule setting
          </label>
          <select
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              color: t.c.text,
              fontFamily: t.font,
            }}
          >
            <option>Daily Time Limit: 1 hour</option>
            <option>Block completely</option>
            <option>Always allowed</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <PrimaryBtn type="submit" style={{ flex: 1 }}>
            Apply rule
          </PrimaryBtn>
          <GhostBtn onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </GhostBtn>
        </div>
      </form>
    );
  } else if (type === "filter") {
    title = "Web Filters";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={{ fontSize: 13.5, color: t.c.textMute, margin: 0 }}>
          Toggle DNS-level categories to block or allow.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            background: t.c.surface2,
            padding: 12,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 500 }}>
              Adult Content (Block)
            </span>
            <input
              type="checkbox"
              defaultChecked
              style={{ accentColor: t.c.primary }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 500 }}>
              Gaming sites (Block)
            </span>
            <input
              type="checkbox"
              defaultChecked
              style={{ accentColor: t.c.primary }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 500 }}>
              Social Media (Soft Limit)
            </span>
            <input
              type="checkbox"
              defaultChecked
              style={{ accentColor: t.c.primary }}
            />
          </div>
        </div>
        <PrimaryBtn onClick={onClose} style={{ marginTop: 8 }}>
          Save filters
        </PrimaryBtn>
      </div>
    );
  } else if (type === "view-profile") {
    title = "Child Profile";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: t.c.primary,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontFamily: t.fontSerif,
            }}
          >
            M
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Maya Mitchell</div>
            <div style={{ fontSize: 12, color: t.c.textMute }}>
              Age 11 · Managed profile
            </div>
          </div>
        </div>
        <div
          style={{
            background: t.c.surface2,
            padding: 14,
            borderRadius: 10,
            fontSize: 13,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div>
            Devices: <b>iPhone 14, iPad Pro</b>
          </div>
          <div>
            Downtime: <b>9:00 PM - 7:00 AM</b>
          </div>
          <div>
            Streaks: <b>4 days</b>
          </div>
        </div>
        <PrimaryBtn onClick={onClose}>Close Profile</PrimaryBtn>
      </div>
    );
  } else if (type === "details") {
    title = "Device Details";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            background: t.c.surface2,
            padding: 14,
            borderRadius: 10,
            fontSize: 12.5,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            fontFamily: t.fontMono,
          }}
        >
          <div>NAME: Maya's iPhone 14</div>
          <div>OS: iOS 17.5.1</div>
          <div>IP: 192.168.1.144</div>
          <div>MAC: 00:1A:2B:3C:4D:5E</div>
          <div>STATUS: Connected & Active</div>
        </div>
        <PrimaryBtn onClick={onClose}>Done</PrimaryBtn>
      </div>
    );
  } else if (type === "edit") {
    title = "Edit Value";
    content = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Saved!");
          onClose();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.c.textMute,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Value
          </label>
          <input
            type="text"
            defaultValue="28 hours"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              color: t.c.text,
              fontFamily: t.font,
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <PrimaryBtn type="submit" style={{ flex: 1 }}>
            Save
          </PrimaryBtn>
          <GhostBtn onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </GhostBtn>
        </div>
      </form>
    );
  } else if (type === "tabs") {
    title = "Active Tabs";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ fontSize: 13.5, color: t.c.textMute, margin: 0 }}>
          Tabs open on Jaden's phone:
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            background: t.c.surface2,
            padding: 12,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 13,
            }}
          >
            <span>1. wikipedia.org/wiki/Science</span>
            <button
              onClick={() => alert("Tab closed!")}
              style={{
                border: "none",
                background: "none",
                color: t.c.primary,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: t.font,
              }}
            >
              Close
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 13,
            }}
          >
            <span>2. youtube.com/watch?v=123</span>
            <button
              onClick={() => alert("Tab closed!")}
              style={{
                border: "none",
                background: "none",
                color: t.c.primary,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: t.font,
              }}
            >
              Close
            </button>
          </div>
        </div>
        <PrimaryBtn onClick={onClose}>Close</PrimaryBtn>
      </div>
    );
  } else if (type === "add-device") {
    title = "Add Device";
    content = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Device added!");
          onClose();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.c.textMute,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Device nickname
          </label>
          <input
            type="text"
            placeholder="e.g. Maya's Kindle"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              color: t.c.text,
              fontFamily: t.font,
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.c.textMute,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Assign to child
          </label>
          <select
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              color: t.c.text,
              fontFamily: t.font,
            }}
          >
            <option>Maya Mitchell</option>
            <option>Jaden Mitchell</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <PrimaryBtn type="submit" style={{ flex: 1 }}>
            Register device
          </PrimaryBtn>
          <GhostBtn onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </GhostBtn>
        </div>
      </form>
    );
  } else if (type === "add-list") {
    title = "Add Blocklist";
    content = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("List added!");
          onClose();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.c.textMute,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Blocklist URL
          </label>
          <input
            type="text"
            placeholder="https://example.com/blocklist.txt"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              color: t.c.text,
              fontFamily: t.font,
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.c.textMute,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            List Category
          </label>
          <select
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              color: t.c.text,
              fontFamily: t.font,
            }}
          >
            <option>Advertising & Trackers</option>
            <option>Malware & Phishing</option>
            <option>Distractions & Gaming</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <PrimaryBtn type="submit" style={{ flex: 1 }}>
            Add list
          </PrimaryBtn>
          <GhostBtn onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </GhostBtn>
        </div>
      </form>
    );
  } else if (type === "view-all") {
    title = "Activity Log";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div
          style={{
            maxHeight: 200,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[
            { t: "17:10", d: "doubleclick.net", c: "Blocked Ad" },
            { t: "17:09", d: "google-analytics.com", c: "Blocked Tracker" },
            { t: "17:05", d: "facebook.com/tr", c: "Blocked Tracker" },
            { t: "17:01", d: "adservice.google.com", c: "Blocked Ad" },
            { t: "16:58", d: "malware-site.com", c: "Blocked Threat" },
          ].map((log, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyItems: "center",
                justifyContent: "space-between",
                fontSize: 12,
                padding: "6px 8px",
                background: t.c.surface2,
                borderRadius: 6,
                fontFamily: t.fontMono,
              }}
            >
              <span>{log.t}</span>
              <b>{log.d}</b>
              <span style={{ color: t.c.danger }}>{log.c}</span>
            </div>
          ))}
        </div>
        <PrimaryBtn onClick={onClose}>Done</PrimaryBtn>
      </div>
    );
  } else if (type === "block-whitelist") {
    title = "Custom Domains";
    content = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Domain added/saved!");
          onClose();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.c.textMute,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Domain
          </label>
          <input
            type="text"
            placeholder="e.g. reddit.com"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              color: t.c.text,
              fontFamily: t.font,
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.c.textMute,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Action
          </label>
          <select
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              color: t.c.text,
              fontFamily: t.font,
            }}
          >
            <option>Block completely (Blacklist)</option>
            <option>Allow always (Whitelist)</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <PrimaryBtn type="submit" style={{ flex: 1 }}>
            Save domain
          </PrimaryBtn>
          <GhostBtn onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </GhostBtn>
        </div>
      </form>
    );
  }

  if (isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 99999,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          fontFamily: t.font,
        }}
        onClick={onClose}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 412,
            background: t.c.surface,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 24,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            color: t.c.text,
            textAlign: "left",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              width: 36,
              height: 4,
              background: t.c.border,
              borderRadius: 2,
              margin: "0 auto 16px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div
              style={{ fontFamily: t.fontSerif, fontSize: 20, fontWeight: 600 }}
            >
              {title}
            </div>
            <button
              onClick={onClose}
              style={{
                border: "none",
                background: "none",
                color: t.c.textMute,
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  const isDialog = [
    "pair",
    "add-device",
    "add-list",
    "block-whitelist",
  ].includes(type);

  if (isDialog) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: t.font,
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      >
        <div
          style={{
            width: 440,
            background: t.c.surface,
            borderRadius: 20,
            padding: 28,
            boxSizing: "border-box",
            border: `1px solid ${t.c.border}`,
            boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
            color: t.c.text,
            textAlign: "left",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{ fontFamily: t.fontSerif, fontSize: 22, fontWeight: 500 }}
            >
              {title}
            </div>
            <button
              onClick={onClose}
              style={{
                border: "none",
                background: "none",
                color: t.c.textMute,
                fontSize: 22,
                cursor: "pointer",
                padding: 0,
              }}
            >
              ×
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 99999,
        display: "flex",
        justifyContent: "flex-end",
        fontFamily: t.font,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 460,
          height: "100%",
          background: t.c.bg,
          borderLeft: `1px solid ${t.c.border}`,
          padding: 32,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          color: t.c.text,
          boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
          textAlign: "left",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{ fontFamily: t.fontSerif, fontSize: 24, fontWeight: 500 }}
          >
            {title}
          </div>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "none",
              color: t.c.textMute,
              fontSize: 24,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        {content}
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
  GlobalDrawerOrModal,
});

// Shared UI primitives — cards, chips, icons, charts.
// All visuals respect the current palette/density from useTokens().

const { useState, useMemo } = React;

// ───────────────────── Icons (Lucide-style hand-drawn, 1.5 stroke) ─────────────────────

function Icon({
  name,
  size = 18,
  color = "currentColor",
  stroke = 1.5,
  style,
}) {
  const s = size,
    c = color,
    w = stroke;
  const props = {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: c,
    strokeWidth: w,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style,
  };
  const P = (...d) => (
    <svg {...props}>
      {d.map((dd, i) =>
        typeof dd === "string" ? (
          <path key={i} d={dd} />
        ) : (
          React.cloneElement(dd, {
            key: i,
            stroke: dd.props.stroke || c,
            fill: dd.props.fill || "none",
          })
        ),
      )}
    </svg>
  );
  switch (name) {
    case "home":
      return P(
        "M3 11 12 3l9 8",
        "M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10",
      );
    case "users":
      return P(
        "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        "M22 21v-2a4 4 0 0 0-3-3.87",
        <circle cx="9" cy="7" r="4" />,
        "M16 3.13a4 4 0 0 1 0 7.75",
      );
    case "user":
      return P(
        "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
        <circle cx="12" cy="7" r="4" />,
      );
    case "chart":
      return P("M3 3v18h18", "M7 14l4-4 4 4 5-5");
    case "clock":
      return P(<circle cx="12" cy="12" r="9" />, "M12 7v5l3 2");
    case "shield":
      return P("M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z");
    case "shieldCheck":
      return P(
        "M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z",
        "M9 12l2 2 4-4",
      );
    case "bell":
      return P(
        "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",
        "M10 21a2 2 0 0 0 4 0",
      );
    case "calendar":
      return P(
        <rect x="3" y="5" width="18" height="16" rx="2" />,
        "M16 3v4",
        "M8 3v4",
        "M3 10h18",
      );
    case "settings":
      return P(
        <circle cx="12" cy="12" r="3" />,
        "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.3 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8L4.2 7a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1A2 2 0 1 1 19.7 7l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
      );
    case "plus":
      return P("M12 5v14", "M5 12h14");
    case "minus":
      return P("M5 12h14");
    case "search":
      return P(<circle cx="11" cy="11" r="7" />, "M21 21l-4.3-4.3");
    case "lock":
      return P(
        <rect x="4" y="11" width="16" height="10" rx="2" />,
        "M8 11V7a4 4 0 0 1 8 0v4",
      );
    case "unlock":
      return P(
        <rect x="4" y="11" width="16" height="10" rx="2" />,
        "M8 11V7a4 4 0 0 1 7-3",
      );
    case "play":
      return P("M6 4l14 8-14 8V4z");
    case "pause":
      return P("M6 4h4v16H6z", "M14 4h4v16h-4z");
    case "check":
      return P("M5 13l4 4L19 7");
    case "x":
      return P("M6 6l12 12", "M18 6L6 18");
    case "arrowRight":
      return P("M5 12h14", "M13 6l6 6-6 6");
    case "arrowLeft":
      return P("M19 12H5", "M11 6l-6 6 6 6");
    case "arrowUp":
      return P("M12 19V5", "M6 11l6-6 6 6");
    case "arrowDown":
      return P("M12 5v14", "M18 13l-6 6-6-6");
    case "trend":
      return P("M3 17l6-6 4 4 8-8", "M14 7h7v7");
    case "trendDown":
      return P("M3 7l6 6 4-4 8 8", "M14 17h7v-7");
    case "menu":
      return P("M3 6h18", "M3 12h18", "M3 18h18");
    case "more":
      return P(
        <circle cx="5" cy="12" r="1.4" />,
        <circle cx="12" cy="12" r="1.4" />,
        <circle cx="19" cy="12" r="1.4" />,
      );
    case "sparkles":
      return P(
        "M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4z",
        "M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z",
      );
    case "leaf":
      return P(
        "M11 20A7 7 0 0 1 4 13c0-5 5-10 13-10 0 8-3 13-6 14",
        "M4 22c0-5 5-10 9-10",
      );
    case "eye":
      return P(
        "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z",
        <circle cx="12" cy="12" r="3" />,
      );
    case "wifi":
      return P(
        "M5 12a10 10 0 0 1 14 0",
        "M8.5 15.5a5 5 0 0 1 7 0",
        "M2 8.5a16 16 0 0 1 20 0",
        <circle cx="12" cy="19" r=".5" fill="currentColor" />,
      );
    case "qr":
      return P(
        <rect x="3" y="3" width="7" height="7" rx="1" />,
        <rect x="14" y="3" width="7" height="7" rx="1" />,
        <rect x="3" y="14" width="7" height="7" rx="1" />,
        "M14 14h3v3h-3z",
        "M20 14v3",
        "M14 20h3",
        "M20 20h1",
      );
    case "phone":
      return P(
        <rect x="5" y="2" width="14" height="20" rx="3" />,
        "M12 18h.01",
      );
    case "message":
      return P("M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z");
    case "trophy":
      return P(
        "M6 9a6 6 0 0 0 12 0V3H6z",
        "M6 6H2v3a4 4 0 0 0 4 4",
        "M18 6h4v3a4 4 0 0 1-4 4",
        "M9 21h6",
        "M12 17v4",
      );
    case "flame":
      return P(
        "M12 22a7 7 0 0 1-7-7c0-3 2-5 3-7 1-2 0-4 2-6 0 3 4 4 4 8 0-2 1-4 2-5 1 2 3 4 3 8a7 7 0 0 1-7 7z",
      );
    case "alert":
      return P(
        "M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
        "M12 9v4",
        "M12 17h.01",
      );
    case "globe":
      return P(
        <circle cx="12" cy="12" r="9" />,
        "M3 12h18",
        "M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
      );
    case "ban":
      return P(<circle cx="12" cy="12" r="9" />, "M5.6 5.6l12.8 12.8");
    case "tag":
      return P(
        "M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z",
        <circle cx="7.5" cy="7.5" r="1.4" />,
      );
    case "list":
      return P(
        "M8 6h13",
        "M8 12h13",
        "M8 18h13",
        "M3 6h.01",
        "M3 12h.01",
        "M3 18h.01",
      );
    case "grid":
      return P(
        <rect x="3" y="3" width="7" height="7" rx="1" />,
        <rect x="14" y="3" width="7" height="7" rx="1" />,
        <rect x="3" y="14" width="7" height="7" rx="1" />,
        <rect x="14" y="14" width="7" height="7" rx="1" />,
      );
    case "logout":
      return P(
        "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
        "M16 17l5-5-5-5",
        "M21 12H9",
      );
    case "star":
      return P(
        "M12 2l3.1 6.3 7 1-5 4.9 1.2 7L12 17.8 5.7 21.2 7 14.2 2 9.3l7-1z",
      );
    case "lightbulb":
      return P(
        "M9 18h6",
        "M10 22h4",
        "M12 2a7 7 0 0 1 4 13c-1 1-1.5 2-1.5 3h-5c0-1-.5-2-1.5-3a7 7 0 0 1 4-13z",
      );
    default:
      return null;
  }
}

window.Icon = Icon;

// ───────────────────── Card primitive ─────────────────────

function Card({ children, style, pad = true, ...rest }) {
  const t = useTokens();
  return (
    <div
      style={{ ...t.cardStyles(pad ? {} : { padding: 0 }), ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
window.Card = Card;

// ───────────────────── Chip / Tag ─────────────────────

function Chip({ children, color, bg, border, style }) {
  const t = useTokens();
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        background: bg || t.c.surface2,
        color: color || t.c.text,
        border: border ? `1px solid ${border}` : "none",
        lineHeight: 1.2,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
window.Chip = Chip;

// ───────────────────── Avatar ─────────────────────

function Avatar({ name, color, size = 40, initials, style }) {
  const t = useTokens();
  const ini =
    initials ||
    (name || "?")
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("");
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color || t.c.primary,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: size * 0.4,
        flexShrink: 0,
        ...style,
      }}
    >
      {ini}
    </div>
  );
}
window.Avatar = Avatar;

// ───────────────────── Progress ring (donut) ─────────────────────

function Ring({
  value,
  max = 100,
  size = 120,
  stroke = 10,
  color,
  track,
  children,
}) {
  const t = useTokens();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, Math.max(0, value / max));
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={track || t.c.surface2}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color || t.c.primary}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${pct * c} ${c}`}
          style={{ transition: "stroke-dasharray .4s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
window.Ring = Ring;

// ───────────────────── Bar chart (weekly hours w/ goal line) ─────────────────────

function BarChartWeekly({
  data,
  goal,
  height = 200,
  labels = ["S", "M", "T", "W", "T", "F", "S"],
  color,
  accent,
  todayIndex = 4,
}) {
  const t = useTokens();
  const max = Math.max(goal || 0, ...data.filter((v) => v != null)) * 1.15;
  const bw = 100 / data.length;
  return (
    <svg
      viewBox={`0 0 100 100`}
      preserveAspectRatio="none"
      style={{ width: "100%", height, display: "block", overflow: "visible" }}
    >
      {/* gridlines */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1="0"
          x2="100"
          y1={100 - g * 100}
          y2={100 - g * 100}
          stroke={t.c.border}
          strokeWidth=".4"
          strokeDasharray="0.6 1.2"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {/* goal line */}
      {goal != null && (
        <line
          x1="0"
          x2="100"
          y1={100 - (goal / max) * 100}
          y2={100 - (goal / max) * 100}
          stroke={accent || t.c.accent}
          strokeWidth="1.2"
          strokeDasharray="2 2"
          vectorEffect="non-scaling-stroke"
        />
      )}
      {/* bars */}
      {data.map((v, i) => {
        if (v == null) {
          // placeholder for future days
          return (
            <rect
              key={i}
              x={i * bw + bw * 0.18}
              y={100 - 8}
              width={bw * 0.64}
              height={8}
              fill={t.c.surface2}
              rx="1"
            />
          );
        }
        const h = (v / max) * 100;
        const over = goal != null && v > goal;
        const isToday = i === todayIndex;
        return (
          <rect
            key={i}
            x={i * bw + bw * 0.18}
            y={100 - h}
            width={bw * 0.64}
            height={h}
            rx="1.5"
            fill={over ? accent || t.c.accent : color || t.c.primary}
            opacity={isToday ? 1 : 0.78}
          />
        );
      })}
    </svg>
  );
}
window.BarChartWeekly = BarChartWeekly;

// ───────────────────── Donut (category breakdown) ─────────────────────

function DonutCategory({
  data,
  size = 200,
  stroke = 26,
  gap = 2,
  centerLabel,
  centerValue,
}) {
  const t = useTokens();
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const entries = Object.entries(data);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={t.c.surface2}
          strokeWidth={stroke}
        />
        {entries.map(([cat, val]) => {
          const len = (val / total) * c - gap;
          const col = APP_DATA.categoryColors[cat] || t.c.primary;
          const seg = (
            <circle
              key={cat}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={col}
              strokeWidth={stroke}
              strokeDasharray={`${Math.max(0, len)} ${c}`}
              strokeDashoffset={-offset}
            />
          );
          offset += (val / total) * c;
          return seg;
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: t.fontSerif,
            fontSize: size * 0.18,
            fontWeight: 500,
            color: t.c.text,
            lineHeight: 1,
          }}
        >
          {centerValue}
        </div>
        <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 4 }}>
          {centerLabel}
        </div>
      </div>
    </div>
  );
}
window.DonutCategory = DonutCategory;

// ───────────────────── Sparkline ─────────────────────

function Sparkline({ data, width = 60, height = 22, color, fill }) {
  const t = useTokens();
  const max = Math.max(...data),
    min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 2) - 1;
    return [x, y];
  });
  const d = pts
    .map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1))
    .join(" ");
  const fd = d + ` L${width} ${height} L0 ${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      {fill && <path d={fd} fill={fill} opacity="0.18" />}
      <path
        d={d}
        fill="none"
        stroke={color || t.c.primary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
window.Sparkline = Sparkline;

// ───────────────────── Format helpers ─────────────────────

window.fmtTime = function (mins) {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60),
    m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
};

window.fmtNum = function (n) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k";
  return String(n);
};

// ───────────────────── Button ─────────────────────

function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  style,
  ...rest
}) {
  const t = useTokens();
  const paddings = { sm: "6px 12px", md: "9px 16px", lg: "12px 22px" };
  const fs = { sm: 12, md: 13, lg: 14 };
  const styles = {
    primary: { background: t.c.primary, color: "white", border: "none" },
    secondary: { background: t.c.surface2, color: t.c.text, border: "none" },
    ghost: { background: "transparent", color: t.c.text, border: "none" },
    outline: {
      background: t.c.surface,
      color: t.c.text,
      border: `1px solid ${t.c.border}`,
    },
    danger: { background: t.c.dangerSoft, color: t.c.danger, border: "none" },
  };
  return (
    <button
      {...rest}
      style={{
        ...styles[variant],
        padding: paddings[size],
        borderRadius: 10,
        fontSize: fs[size],
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "inherit",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        lineHeight: 1.2,
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={fs[size] + 2} />}
      {children}
    </button>
  );
}
window.Button = Button;

// ───────────────────── SectionHead (used inside cards) ─────────────────────

function SectionHead({ title, subtitle, action, style }) {
  const t = useTokens();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 18,
        ...style,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: t.c.text,
            letterSpacing: "-.01em",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12.5, color: t.c.textMute, marginTop: 2 }}>
            {subtitle}
          </div>
        )}
      </div>
      {action}
    </div>
  );
}
window.SectionHead = SectionHead;

// ───────────────────── Logo wordmark ─────────────────────

function Logo({ size = 22, color }) {
  const t = useTokens();
  const c = color || t.c.primary;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2 C 14 8, 18 8, 22 12 C 18 16, 14 16, 12 22 C 10 16, 6 16, 2 12 C 6 8, 10 8, 12 2 Z"
          fill={c}
          opacity="0.92"
        />
        <circle cx="12" cy="12" r="3" fill={t.c.surface} />
      </svg>
      <span
        style={{
          fontFamily: t.fontSerif,
          fontSize: size * 0.92,
          fontWeight: 500,
          color: t.c.text,
          letterSpacing: "-.02em",
        }}
      >
        Atrium
      </span>
    </div>
  );
}
window.Logo = Logo;

// ───────────────────── App tile (square) ─────────────────────

function AppTile({ app, size = 40, radius = 11 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: app.color,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.4,
        flexShrink: 0,
        letterSpacing: "-.03em",
      }}
    >
      {app.name[0]}
    </div>
  );
}
window.AppTile = AppTile;

// ───────────────────── Web app shell (sidebar + topbar) ─────────────────────

function WebShell({
  children,
  active,
  role = "parent",
  headerExtra,
  title,
  subtitle,
  search = true,
}) {
  const t = useTokens();
  const [currentRole, setCurrentRole] = React.useState(role);
  const [showNotifPopover, setShowNotifPopover] = React.useState(false);

  React.useEffect(() => {
    setCurrentRole(role);
  }, [role]);

  const sidebarBg = t.c.surface;
  const items =
    currentRole === "parent"
      ? [
          { id: "overview", label: "Overview", icon: "home" },
          { id: "kids", label: "Family", icon: "users" },
          { id: "limits", label: "Limits & Apps", icon: "clock" },
          { id: "schedules", label: "Schedules", icon: "calendar" },
          { id: "reports", label: "Reports", icon: "chart" },
          { id: "adblock", label: "Ad Blocker", icon: "shield" },
          { id: "notif", label: "Notifications", icon: "bell" },
        ]
      : [
          { id: "overview", label: "Today", icon: "home" },
          { id: "limits", label: "My Apps", icon: "clock" },
          { id: "schedules", label: "Schedules", icon: "calendar" },
          { id: "reports", label: "Reports", icon: "chart" },
          { id: "adblock", label: "Ad Blocker", icon: "shield" },
        ];

  const displayTitle =
    currentRole === role
      ? title
      : currentRole === "parent"
        ? "Good afternoon, Sarah"
        : "Less screen. More you.";
  const displaySubtitle =
    currentRole === role
      ? subtitle
      : currentRole === "parent"
        ? "Thursday, April 16 · Family overview"
        : "Personal · Thursday afternoon";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "236px 1fr",
        height: "100%",
        background: t.c.bg,
        fontFamily: t.font,
        color: t.c.text,
        fontSize: 13.5,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          background: sidebarBg,
          borderRight: `1px solid ${t.c.border}`,
          padding: "22px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div style={{ padding: "4px 10px 24px" }}>
          <Logo size={22} />
        </div>

        {/* Dynamic Mode Switcher */}
        <div
          style={{
            display: "flex",
            gap: 4,
            background: t.c.surface2,
            padding: 3,
            borderRadius: 8,
            marginBottom: 16,
            border: `1px solid ${t.c.border}`,
          }}
        >
          <button
            onClick={() => setCurrentRole("parent")}
            style={{
              flex: 1,
              padding: "6px 4px",
              borderRadius: 6,
              border: "none",
              background:
                currentRole === "parent" ? t.c.surface : "transparent",
              color: currentRole === "parent" ? t.c.primary : t.c.textMute,
              fontWeight: 600,
              fontSize: 11.5,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Icon
              name="users"
              size={12}
              color={currentRole === "parent" ? t.c.primary : t.c.textMute}
            />
            <span>Family Hub</span>
          </button>
          <button
            onClick={() => setCurrentRole("personal")}
            style={{
              flex: 1,
              padding: "6px 4px",
              borderRadius: 6,
              border: "none",
              background:
                currentRole === "personal" ? t.c.surface : "transparent",
              color: currentRole === "personal" ? t.c.primary : t.c.textMute,
              fontWeight: 600,
              fontSize: 11.5,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Icon
              name="leaf"
              size={12}
              color={currentRole === "personal" ? t.c.primary : t.c.textMute}
            />
            <span>My Space</span>
          </button>
        </div>

        <div
          style={{
            padding: "6px 10px 8px",
            fontSize: 10.5,
            color: t.c.textMute,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {currentRole === "parent" ? "Family" : "Workspace"}
        </div>

        {items.map((it) => {
          const a = it.id === active;
          return (
            <div
              key={it.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 12px",
                borderRadius: 10,
                cursor: "pointer",
                background: a ? t.c.primarySoft : "transparent",
                color: a ? t.c.primary : t.c.text,
                fontWeight: a ? 600 : 500,
                fontSize: 13,
              }}
            >
              <Icon name={it.icon} size={16.5} />
              <span>{it.label}</span>
            </div>
          );
        })}

        <div style={{ flex: 1 }} />

        {currentRole === "parent" && (
          <div
            style={{
              padding: 14,
              borderRadius: 14,
              background: t.c.primarySoft,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11.5,
                color: t.c.primary,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              <Icon name="sparkles" size={13} /> Coach Tip
            </div>
            <div style={{ fontSize: 12, color: t.c.text, lineHeight: 1.45 }}>
              Maya's screen time dropped 18% this week. Tell her you noticed.
            </div>
          </div>
        )}

        <div
          style={{
            padding: "10px 10px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderTop: `1px solid ${t.c.border}`,
          }}
        >
          <Avatar
            name={
              currentRole === "parent"
                ? APP_DATA.parent.name
                : APP_DATA.personal.name
            }
            size={30}
            color={currentRole === "parent" ? t.c.primary : t.c.accent}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {currentRole === "parent"
                ? APP_DATA.parent.name
                : APP_DATA.personal.name}
            </div>
            <div style={{ fontSize: 11, color: t.c.textMute }}>
              {currentRole === "parent" ? "Parent · 2 kids" : "Personal"}
            </div>
          </div>
          <Icon name="settings" size={15} color={t.c.textMute} />
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 32px 18px",
            gap: 16,
            position: "relative",
          }}
        >
          <div style={{ minWidth: 0 }}>
            {displaySubtitle && (
              <div
                style={{
                  fontSize: 12,
                  color: t.c.textMute,
                  fontWeight: 500,
                  marginBottom: 2,
                }}
              >
                {displaySubtitle}
              </div>
            )}
            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 28,
                fontWeight: 500,
                letterSpacing: "-.02em",
                lineHeight: 1.1,
              }}
            >
              {displayTitle}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {search && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  background: t.c.surface,
                  border: `1px solid ${t.c.border}`,
                  borderRadius: 10,
                  width: 220,
                  color: t.c.textMute,
                  fontSize: 12.5,
                }}
              >
                <Icon name="search" size={15} />
                <span>Search apps, kids…</span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: 4,
                    background: t.c.surface2,
                  }}
                >
                  ⌘K
                </span>
              </div>
            )}
            {headerExtra}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowNotifPopover(!showNotifPopover)}
                style={{
                  background: t.c.surface,
                  border: `1px solid ${t.c.border}`,
                  borderRadius: 10,
                  width: 36,
                  height: 36,
                  color: t.c.text,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxSizing: "border-box",
                }}
              >
                <Icon name="bell" size={16} />
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    right: 3,
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: t.c.danger,
                  }}
                />
              </button>

              {/* Notification list popover */}
              {showNotifPopover && (
                <div
                  style={{
                    position: "absolute",
                    top: 48,
                    right: 0,
                    width: 320,
                    background: t.c.surface,
                    border: `1px solid ${t.c.border}`,
                    borderRadius: 16,
                    boxShadow: "0 10px 32px rgba(0,0,0,.08)",
                    zIndex: 999,
                    padding: "16px 0",
                  }}
                >
                  <div
                    style={{
                      padding: "0 16px 12px",
                      borderBottom: `1px solid ${t.c.border}`,
                      fontWeight: 600,
                      fontSize: 13,
                      color: t.c.text,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Recent Alerts</span>
                    <span
                      style={{
                        fontSize: 11,
                        color: t.c.primary,
                        cursor: "pointer",
                      }}
                      onClick={() => setShowNotifPopover(false)}
                    >
                      Dismiss
                    </span>
                  </div>
                  <div style={{ maxHeight: 240, overflowY: "auto" }}>
                    {APP_DATA.notifications.slice(0, 4).map((n, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "12px 16px",
                          borderBottom:
                            i < 3 ? `1px dashed ${t.c.border}` : "none",
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <div style={{ fontSize: 14, marginTop: 2 }}>
                          {n.kind === "limit-hit" ? "⚠️" : "🔔"}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 500,
                              color: t.c.text,
                              lineHeight: 1.4,
                            }}
                          >
                            {n.text}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: t.c.textMute,
                              marginTop: 4,
                            }}
                          >
                            {n.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: "4px 32px 32px", overflow: "auto" }}>
          {currentRole === role ? (
            children
          ) : currentRole === "personal" && window.PersonalDashboardInner ? (
            <window.PersonalDashboardInner />
          ) : currentRole === "parent" && window.ParentDashboardInner ? (
            <window.ParentDashboardInner />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
window.WebShell = WebShell;

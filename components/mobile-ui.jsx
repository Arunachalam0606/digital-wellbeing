// Mobile UI primitives — safe-area-aware shell, tab bars, charts, headers
// All components respect iOS dynamic island + status bar (top) and home indicator (bottom)

// ─────────────────────────────────────────────────────────────
// Safe-area constants
// ─────────────────────────────────────────────────────────────
// iOS dynamic island starts at ~11px, ends at ~48px. Status bar text sits in
// the same band. Give content 58px clearance to keep "9:41" + battery readable.
const IOS_TOP = 58;
// Home indicator bar sits 8px from bottom, 5px tall. Give content 34px clearance.
const IOS_BOTTOM = 34;
// Android status bar is 28px tall, nav bar 24px.
const AND_TOP = 36;
const AND_BOTTOM = 28;

window.SAFE = { IOS_TOP, IOS_BOTTOM, AND_TOP, AND_BOTTOM };

// ─────────────────────────────────────────────────────────────
// MobileScreen — the common scaffold every mobile content uses.
// Renders: status-bar-clear top inset, scrollable content, home-indicator-clear bottom.
// Pass `tab` for the fixed bottom tab bar and `topInset`/`bottomInset` to customize.
// ─────────────────────────────────────────────────────────────
function MobileScreen({
  children,
  tab,
  fab,
  android = false,
  bg,
  topInset,
  bottomInset,
  scroll = true,
}) {
  const t = useTokens();
  const ti = topInset ?? (android ? AND_TOP : IOS_TOP);
  const bi = bottomInset ?? (android ? AND_BOTTOM : IOS_BOTTOM);
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: t.font,
        color: t.c.text,
        background: bg || t.c.bg,
        position: "relative",
      }}
    >
      <div
        style={{
          flex: 1,
          overflow: scroll ? "auto" : "hidden",
          paddingTop: ti,
          // bottom inset is added to last scroll child; if a tab bar exists it
          // handles its own clearance. Otherwise reserve bi here.
          paddingBottom: tab ? 0 : bi,
        }}
      >
        {children}
      </div>
      {fab && (
        <div
          style={{
            position: "absolute",
            right: 16,
            bottom: (tab ? 72 : 16) + bi - 16,
            zIndex: 5,
          }}
        >
          {fab}
        </div>
      )}
      {tab && (
        <div
          style={{
            paddingBottom: bi,
            background: t.c.surface,
            borderTop: `1px solid ${t.c.border}`,
          }}
        >
          {tab}
        </div>
      )}
      <GlobalDrawerOrModal />
    </div>
  );
}
window.MobileScreen = MobileScreen;

// ─────────────────────────────────────────────────────────────
// MobileTabBar — segmented bottom tabs (works for iOS & Android variants)
// ─────────────────────────────────────────────────────────────
function MobileTabBar({ items, active, color }) {
  const t = useTokens();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "8px 4px 6px",
      }}
    >
      {items.map((it) => {
        const a = it.id === active;
        return (
          <div
            key={it.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "6px 8px",
              position: "relative",
              flex: 1,
            }}
          >
            <Icon
              name={it.icon}
              size={21}
              color={a ? color || t.c.primary : t.c.textMute}
              stroke={a ? 2 : 1.5}
            />
            <div
              style={{
                fontSize: 10,
                color: a ? color || t.c.primary : t.c.textMute,
                fontWeight: a ? 600 : 500,
                letterSpacing: "-.005em",
              }}
            >
              {it.label}
            </div>
            {it.badge != null && (
              <div
                style={{
                  position: "absolute",
                  top: 4,
                  right: "50%",
                  marginRight: -14,
                  minWidth: 16,
                  height: 16,
                  padding: "0 4px",
                  borderRadius: 8,
                  background: t.c.danger,
                  color: "white",
                  fontSize: 9,
                  fontWeight: 700,
                  lineHeight: "16px",
                  textAlign: "center",
                }}
              >
                {it.badge}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
window.MobileTabBar = MobileTabBar;

// ─────────────────────────────────────────────────────────────
// MobileHeader — large title header with optional back / actions
// ─────────────────────────────────────────────────────────────
function MobileHeader({
  eyebrow,
  title,
  subtitle,
  back,
  action,
  big = true,
  style,
}) {
  const t = useTokens();
  return (
    <div style={{ padding: "6px 18px 12px", ...style }}>
      {(back || action) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          {back ? (
            <button
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                color: t.c.primary,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "inherit",
              }}
            >
              <Icon
                name="arrowRight"
                size={16}
                style={{ transform: "rotate(180deg)" }}
              />{" "}
              {back}
            </button>
          ) : (
            <span />
          )}
          {action}
        </div>
      )}
      {eyebrow && (
        <div
          style={{
            fontSize: 11,
            color: t.c.textMute,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: ".06em",
            marginBottom: 2,
          }}
        >
          {eyebrow}
        </div>
      )}
      {title && (
        <div
          style={{
            fontFamily: big ? t.fontSerif : t.font,
            fontSize: big ? 28 : 18,
            fontWeight: big ? 500 : 600,
            letterSpacing: "-.02em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
      )}
      {subtitle && (
        <div
          style={{
            fontSize: 13,
            color: t.c.textMute,
            marginTop: 6,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}
window.MobileHeader = MobileHeader;

// ─────────────────────────────────────────────────────────────
// Card variants
// ─────────────────────────────────────────────────────────────
function MobileCard({ children, style, pad = 14, bg, border = true }) {
  const t = useTokens();
  return (
    <div
      style={{
        background: bg || t.c.surface,
        border: border ? `1px solid ${t.c.border}` : "none",
        borderRadius: 18,
        padding: pad,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
window.MobileCard = MobileCard;

// ─────────────────────────────────────────────────────────────
// FAB — floating action button
// ─────────────────────────────────────────────────────────────
function FAB({ icon, label, color, onClick }) {
  const t = useTokens();
  return (
    <button
      onClick={onClick}
      style={{
        background: color || t.c.primary,
        color: "white",
        border: "none",
        borderRadius: label ? 999 : 28,
        padding: label ? "14px 20px" : 0,
        width: label ? "auto" : 56,
        height: label ? "auto" : 56,
        boxShadow: "0 8px 24px rgba(40,30,20,.18), 0 2px 6px rgba(40,30,20,.1)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "inherit",
        fontSize: 14,
        fontWeight: 600,
        justifyContent: "center",
      }}
    >
      <Icon name={icon} size={20} />
      {label && <span>{label}</span>}
    </button>
  );
}
window.FAB = FAB;

// ─────────────────────────────────────────────────────────────
// Mobile charts
// ─────────────────────────────────────────────────────────────

// Compact weekly bars + goal line, optimized for mobile width
function MobileWeeklyBars({
  data,
  goal,
  height = 110,
  todayIndex = 4,
  color,
  accent,
  labels = ["S", "M", "T", "W", "T", "F", "S"],
}) {
  const t = useTokens();
  const max = Math.max(goal || 0, ...data.filter((v) => v != null)) * 1.15;
  const bw = 100 / data.length;
  return (
    <div>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ width: "100%", height, display: "block", overflow: "visible" }}
      >
        {[0.5].map((g) => (
          <line
            key={g}
            x1="0"
            x2="100"
            y1={100 - g * 100}
            y2={100 - g * 100}
            stroke={t.c.border}
            strokeWidth=".3"
            strokeDasharray="0.6 1.2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
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
        {data.map((v, i) => {
          if (v == null)
            return (
              <rect
                key={i}
                x={i * bw + bw * 0.18}
                y={100 - 6}
                width={bw * 0.64}
                height={6}
                fill={t.c.surface2}
                rx="1"
              />
            );
          const h = (v / max) * 100;
          const over = goal != null && v > goal;
          const isToday = i === todayIndex;
          return (
            <rect
              key={i}
              x={i * bw + bw * 0.2}
              y={100 - h}
              width={bw * 0.6}
              height={h}
              rx="1.5"
              fill={over ? accent || t.c.accent : color || t.c.primary}
              opacity={isToday ? 1 : 0.75}
            />
          );
        })}
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
          fontSize: 10.5,
          color: t.c.textMute,
          padding: "0 2px",
        }}
      >
        {labels.map((d, i) => (
          <span
            key={i}
            style={{
              fontWeight: i === todayIndex ? 700 : 400,
              color: i === todayIndex ? t.c.text : t.c.textMute,
              width: "14%",
              textAlign: "center",
            }}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
window.MobileWeeklyBars = MobileWeeklyBars;

// Hour-of-day pickup chart, mobile-sized
function MobilePickupChart({
  data,
  color,
  accentRange = [16, 18],
  height = 100,
}) {
  const t = useTokens();
  const max = Math.max(...data) || 1;
  return (
    <div>
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        style={{ width: "100%", height, display: "block" }}
      >
        {data.map((v, h) => {
          const x = (h / 24) * 100;
          const bh = (v / max) * 50;
          return (
            <rect
              key={h}
              x={x + 0.4}
              y={56 - bh}
              width={100 / 24 - 0.8}
              height={Math.max(bh, 1)}
              rx="0.6"
              fill={
                h >= accentRange[0] && h <= accentRange[1]
                  ? color === t.c.primary
                    ? t.c.accent
                    : t.c.primary
                  : color || t.c.primary
              }
              opacity={v === 0 ? 0.12 : 0.85}
            />
          );
        })}
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 9.5,
          color: t.c.textMute,
          fontFamily: t.fontMono,
          marginTop: 4,
        }}
      >
        <span>12a</span>
        <span>6a</span>
        <span>12p</span>
        <span>6p</span>
        <span>11p</span>
      </div>
    </div>
  );
}
window.MobilePickupChart = MobilePickupChart;

// Notification heatmap mini — 7 rows × 24 cols, compact
function MobileNotifHeatmap({ data, color }) {
  const t = useTokens();
  const max = Math.max(...data.flat()) || 1;
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const fillFor = (intensity) =>
    intensity === 0
      ? t.c.surface2
      : `oklch(from ${color || t.c.primary} ${0.95 - intensity * 0.4} ${0.06 + intensity * 0.1} h)`;
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 9,
          color: t.c.textMute,
          marginBottom: 4,
          padding: "0 12px 0 16px",
        }}
      >
        <span>12a</span>
        <span>6a</span>
        <span>12p</span>
        <span>6p</span>
        <span>11p</span>
      </div>
      <div style={{ display: "flex", gap: 1 }}>
        <div
          style={{
            width: 12,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
          }}
        >
          {days.map((d, i) => (
            <div
              key={i}
              style={{
                height: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 4,
                fontSize: 9,
                color: t.c.textMute,
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {data.map((row, di) => (
            <div
              key={di}
              style={{ display: "flex", gap: 1, marginBottom: 1, height: 12 }}
            >
              {row.map((v, hi) => (
                <div
                  key={hi}
                  style={{
                    flex: 1,
                    background: fillFor(v / max),
                    borderRadius: 1.5,
                  }}
                  title={`${v} notifs`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
window.MobileNotifHeatmap = MobileNotifHeatmap;

// Donut breakdown — small version for mobile cards
function MobileDonut({
  data,
  size = 130,
  stroke = 18,
  centerLabel,
  centerValue,
}) {
  const t = useTokens();
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const gap = 1.5;
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
        {Object.entries(data).map(([cat, val]) => {
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
            fontFamily: t.fontMono,
            fontSize: size * 0.16,
            fontWeight: 500,
            color: t.c.text,
            lineHeight: 1,
            letterSpacing: "-.02em",
          }}
        >
          {centerValue}
        </div>
        <div style={{ fontSize: 10.5, color: t.c.textMute, marginTop: 3 }}>
          {centerLabel}
        </div>
      </div>
    </div>
  );
}
window.MobileDonut = MobileDonut;

// Compare line — this week vs last week
function MobileTrendLine({ thisWeek, lastWeek, goal, height = 110 }) {
  const t = useTokens();
  const allVals = [...thisWeek, ...lastWeek].filter((v) => v != null);
  const max = Math.max(goal * 1.3, ...allVals) * 1.05;

  const path = (data) => {
    let d = "",
      moved = false;
    data.forEach((v, i) => {
      if (v == null) return;
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (v / max) * 100;
      d += (moved ? "L" : "M") + x.toFixed(2) + " " + y.toFixed(2) + " ";
      moved = true;
    });
    return d.trim();
  };

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ width: "100%", height, display: "block", overflow: "visible" }}
    >
      <line
        x1="0"
        x2="100"
        y1={100 - (goal / max) * 100}
        y2={100 - (goal / max) * 100}
        stroke={t.c.accent}
        strokeWidth="1"
        strokeDasharray="2 2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={path(lastWeek)}
        fill="none"
        stroke={t.c.textMute}
        strokeOpacity="0.5"
        strokeWidth="1.4"
        strokeDasharray="2 2"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={path(thisWeek)}
        fill="none"
        stroke={t.c.primary}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {thisWeek.map((v, i) => {
        if (v == null) return null;
        const x = (i / (thisWeek.length - 1)) * 100;
        const y = 100 - (v / max) * 100;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === 4 ? 1.8 : 1.1}
            fill={t.c.primary}
            stroke={i === 4 ? t.c.surface : "none"}
            strokeWidth={i === 4 ? 0.6 : 0}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}
window.MobileTrendLine = MobileTrendLine;

// Mini ring + label inside a row
function RingRow({
  value,
  max,
  label,
  sublabel,
  color,
  size = 44,
  stroke = 5,
  children,
}) {
  const t = useTokens();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Ring
        value={value}
        max={max}
        size={size}
        stroke={stroke}
        color={color || t.c.primary}
      >
        {children}
      </Ring>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{label}</div>
        {sublabel && (
          <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 2 }}>
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
}
window.RingRow = RingRow;

// Stat tile (small, 3-up)
function StatTile({ label, value, sublabel, color, icon, bg }) {
  const t = useTokens();
  return (
    <div
      style={{
        background: bg || t.c.surface,
        border: `1px solid ${t.c.border}`,
        borderRadius: 14,
        padding: 12,
        flex: 1,
        minWidth: 0,
      }}
    >
      {icon && <Icon name={icon} size={14} color={color || t.c.textMute} />}
      <div
        style={{
          fontFamily: t.fontMono,
          fontSize: 20,
          fontWeight: 500,
          marginTop: icon ? 6 : 0,
          letterSpacing: "-.02em",
          color: color || t.c.text,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 10.5,
          color: t.c.textMute,
          marginTop: 2,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: ".05em",
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div style={{ fontSize: 10.5, color: t.c.textMute, marginTop: 2 }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}
window.StatTile = StatTile;

// Category row (for breakdown lists)
function CategoryRow({ cat, mins, total, max, color }) {
  const t = useTokens();
  const pct = total ? (mins / total) * 100 : (mins / max) * 100;
  const c = color || APP_DATA.categoryColors[cat] || t.c.primary;
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12.5,
          marginBottom: 4,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span
            style={{ width: 9, height: 9, borderRadius: "50%", background: c }}
          />
          {cat}
        </span>
        <span
          style={{ color: t.c.textMute, fontFamily: t.fontMono, fontSize: 12 }}
        >
          {fmtTime(mins)}
        </span>
      </div>
      <div
        style={{
          height: 5,
          background: t.c.surface2,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: Math.min(100, pct) + "%",
            height: "100%",
            background: c,
            borderRadius: 3,
          }}
        />
      </div>
    </div>
  );
}
window.CategoryRow = CategoryRow;

// App row inside mobile lists — app icon + name + time + progress
function MobileAppRow({ app, locked, child, last = false, showLimit = true }) {
  const t = useTokens();
  const limited = app.limit != null;
  const pct = limited ? app.mins / app.limit : 0;
  const left = limited ? Math.max(0, app.limit - app.mins) : null;
  return (
    <div
      style={{
        padding: "12px 0",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: last ? "none" : `1px solid ${t.c.border}`,
      }}
    >
      <AppTile app={app} size={40} radius={11} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 6,
          }}
        >
          <span
            style={{ fontWeight: 600, fontSize: 14, letterSpacing: "-.005em" }}
          >
            {app.name}
          </span>
          {locked || pct >= 1 ? (
            <Chip
              bg={t.c.dangerSoft}
              color={t.c.danger}
              style={{ fontSize: 10 }}
            >
              <Icon name="lock" size={10} /> Locked
            </Chip>
          ) : showLimit && limited ? (
            <span
              style={{
                fontFamily: t.fontMono,
                fontSize: 12,
                color: pct > 0.8 ? t.c.warn : t.c.primary,
                fontWeight: 500,
              }}
            >
              {fmtTime(left)} left
            </span>
          ) : (
            <span
              style={{
                fontFamily: t.fontMono,
                fontSize: 12,
                color: t.c.textMute,
              }}
            >
              {fmtTime(app.mins)}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
            gap: 8,
          }}
        >
          <div style={{ fontSize: 11, color: t.c.textMute }}>
            {app.cat}
            {child ? ` · ${child}` : ""}
            {!limited && !child ? ` · ${app.pickups || 0} pickups` : ""}
          </div>
          {showLimit && limited && (
            <div
              style={{
                width: 70,
                height: 4,
                background: t.c.surface2,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: Math.min(100, pct * 100) + "%",
                  height: "100%",
                  background:
                    pct >= 1 ? t.c.danger : pct > 0.8 ? t.c.warn : t.c.primary,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
window.MobileAppRow = MobileAppRow;

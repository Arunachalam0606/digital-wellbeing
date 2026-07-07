// Redesigned Family Hub (Parent Dashboard)
// Priorities: at-a-glance status per child · action queue (today) · live activity · trends

const { useState: useStateFH, useMemo: useMemoFH } = React;

// ─────────────────── Sidebar shell (shared between Family Hub / My Space / Settings / Connects) ───────────────────
function WorkspaceShell({
  mode = "family",
  active = "dashboard",
  onModeChange,
  children,
  title,
  subtitle,
  right,
}) {
  const t = useTokens();

  const familyNav = [
    { key: "dashboard", label: "Overview", icon: "home" },
    { key: "children", label: "Family", icon: "users" },
    { key: "limits", label: "Limits & apps", icon: "clock" },
    { key: "schedules", label: "Schedules", icon: "calendar" },
    { key: "activity", label: "Activity", icon: "bell" },
    { key: "connects", label: "Connects", icon: "wifi" },
    { key: "shield", label: "Shield", icon: "shield" },
    { key: "settings", label: "Settings", icon: "settings" },
  ];
  const personalNav = [
    { key: "dashboard", label: "Today", icon: "home" },
    { key: "reports", label: "Reports", icon: "chart" },
    { key: "focus", label: "Focus", icon: "clock" },
    { key: "reflect", label: "Reflect", icon: "sparkles" },
    { key: "connects", label: "Connects", icon: "wifi" },
    { key: "settings", label: "Settings", icon: "settings" },
  ];
  const nav = mode === "family" ? familyNav : personalNav;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: t.layout === "B" ? "260px 1fr" : "240px 1fr",
        background: t.c.bg,
        fontFamily: t.font,
        color: t.c.text,
        boxSizing: "border-box",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          padding: "24px 18px",
          borderRight: `1px solid ${t.c.border}`,
          background: t.layout === "B" ? t.c.surface : t.c.bg,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <BrandMark size={26} style={{ padding: "0 8px" }} />

        {/* Mode switcher — segmented */}
        <div
          style={{
            display: "flex",
            padding: 3,
            borderRadius: 10,
            background: t.c.surface2,
            border: `1px solid ${t.c.border}`,
            fontSize: 12.5,
            fontWeight: 600,
          }}
        >
          {[
            { key: "family", label: "Family Hub" },
            { key: "personal", label: "My Space" },
          ].map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => onModeChange && onModeChange(m.key)}
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: 7,
                border: "none",
                background: mode === m.key ? t.c.surface : "transparent",
                color: mode === m.key ? t.c.text : t.c.textMute,
                fontFamily: t.font,
                fontWeight: 600,
                fontSize: 12.5,
                cursor: "pointer",
                boxShadow:
                  mode === m.key
                    ? t.dark
                      ? "0 1px 3px rgba(0,0,0,.3)"
                      : "0 1px 3px rgba(0,0,0,.06)"
                    : "none",
                transition: "all .15s",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Nav items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {nav.map((n) => {
            const isActive = active === n.key;
            return (
              <div
                key={n.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 9,
                  background: isActive ? t.c.primarySoft : "transparent",
                  color: isActive ? t.c.primary : t.c.text,
                  fontSize: 13.5,
                  fontWeight: isActive ? 600 : 500,
                  cursor: "pointer",
                  transition: "background .12s",
                }}
              >
                <Icon
                  name={n.icon}
                  size={16}
                  color={isActive ? t.c.primary : t.c.textMute}
                />
                {n.label}
              </div>
            );
          })}
        </nav>

        {/* Footer: user chip */}
        <div
          style={{
            marginTop: "auto",
            padding: "12px 8px 4px",
            borderTop: `1px solid ${t.c.border}`,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: t.c.primary,
              color: t.c.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            SM
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: t.c.text,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Sarah Mitchell
            </div>
            <div style={{ fontSize: 11.5, color: t.c.textMute }}>
              Family plan
            </div>
          </div>
          <Icon name="more" size={16} color={t.c.textMute} />
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          padding: "32px 40px 40px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 28,
          }}
        >
          <div>
            <Eyebrow style={{ marginBottom: 8 }}>
              {mode === "family" ? "Family Hub" : "My Space"}
            </Eyebrow>
            <DisplayH size={36} style={{ marginBottom: 6 }}>
              {title}
            </DisplayH>
            <div style={{ fontSize: 14, color: t.c.textMute }}>{subtitle}</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Search */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 12px",
                borderRadius: 10,
                background: t.c.surface,
                border: `1px solid ${t.c.border}`,
                color: t.c.textMute,
                fontSize: 13,
                minWidth: 200,
              }}
            >
              <Icon name="search" size={14} />
              <span>Search family, apps, activity…</span>
              <span
                style={{
                  marginLeft: "auto",
                  padding: "1px 6px",
                  borderRadius: 4,
                  background: t.c.surface2,
                  fontSize: 10,
                  fontFamily: t.fontMono,
                }}
              >
                ⌘K
              </span>
            </div>
            {/* Notification bell */}
            <button
              style={{
                position: "relative",
                width: 38,
                height: 38,
                borderRadius: 10,
                background: t.c.surface,
                border: `1px solid ${t.c.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: t.c.text,
              }}
            >
              <Icon name="bell" size={16} />
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: t.c.danger,
                  border: `2px solid ${t.c.surface}`,
                }}
              />
            </button>
            {right}
          </div>
        </header>

        <div
          style={{
            flex: 1,
            overflow: "auto",
            marginRight: -8,
            paddingRight: 8,
          }}
        >
          {children}
        </div>
      </main>

      <GlobalDrawerOrModal />
    </div>
  );
}

// ─────────────────── Child status card (big, at-a-glance) ───────────────────
function ChildStatusCard({ kid }) {
  const t = useTokens();
  const pct = Math.min(1, kid.todayMinutes / kid.todayGoal);
  const R = 42,
    C = 2 * Math.PI * R;
  const statusMeta = {
    "on-track": {
      label: "On track",
      color: t.c.primary,
      soft: t.c.primarySoft,
      icon: "check",
    },
    "near-limit": {
      label: "Near limit",
      color: t.c.warn,
      soft: t.c.warnSoft,
      icon: "clock",
    },
    over: {
      label: "Over limit",
      color: t.c.danger,
      soft: t.c.dangerSoft,
      icon: "alert",
    },
    locked: {
      label: "Locked",
      color: t.c.textMute,
      soft: t.c.surface2,
      icon: "lock",
    },
  }[kid.status] || {
    label: kid.status,
    color: t.c.textMute,
    soft: t.c.surface2,
    icon: "clock",
  };

  const ringColor = statusMeta.color;
  const hours = Math.floor(kid.todayMinutes / 60);
  const mins = kid.todayMinutes % 60;

  return (
    <div
      style={{
        padding: 24,
        borderRadius: 20,
        border: `1px solid ${t.c.border}`,
        background: t.c.surface,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color .15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.c.textMute)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.c.border)}
    >
      {/* Header row: avatar + name + status pill */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: kid.avatar,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: t.fontSerif,
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            {kid.initials}
          </div>
          <div>
            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 20,
                fontWeight: 500,
                color: t.c.text,
                letterSpacing: "-.01em",
              }}
            >
              {kid.name}
            </div>
            <div
              style={{
                fontSize: 12,
                color: t.c.textMute,
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexWrap: "wrap",
                marginTop: 2,
              }}
            >
              <span>Age {kid.age}</span>
              <span>·</span>
              {kid.devices ? (
                kid.devices.map((d) => (
                  <span
                    key={d}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 3,
                      background: t.c.surface2,
                      padding: "2px 6px",
                      borderRadius: 4,
                      fontSize: 10,
                      color: t.c.text,
                    }}
                  >
                    <Icon name="phone" size={10} />
                    {d}
                  </span>
                ))
              ) : (
                <span>{kid.device}</span>
              )}
              <span>·</span>
              <span>{kid.lastActive}</span>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            borderRadius: 7,
            background: statusMeta.soft,
            color: statusMeta.color,
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: ".02em",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: statusMeta.color,
            }}
          />
          {statusMeta.label}
        </div>
      </div>

      {/* Ring + numbers */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            position: "relative",
            width: 100,
            height: 100,
            flexShrink: 0,
          }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke={t.c.surface2}
              strokeWidth="7"
            />
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke={ringColor}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - pct)}
              transform="rotate(-90 50 50)"
            />
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
                fontSize: 24,
                fontWeight: 500,
                color: t.c.text,
                letterSpacing: "-.02em",
              }}
            >
              {hours}
              <span style={{ fontSize: 15, color: t.c.textMute }}>h</span>
              {mins > 0 && (
                <>
                  {" "}
                  {mins}
                  <span style={{ fontSize: 12, color: t.c.textMute }}>m</span>
                </>
              )}
            </div>
            <div
              style={{
                fontSize: 10,
                color: t.c.textMute,
                letterSpacing: ".06em",
                textTransform: "uppercase",
              }}
            >
              of {Math.floor(kid.todayGoal / 60)}h
            </div>
          </div>
        </div>

        {/* Categories mini-stack */}
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}
        >
          {Object.entries(kid.categories)
            .slice(0, 3)
            .map(([cat, mins]) => {
              const total = Object.values(kid.categories).reduce(
                (a, b) => a + b,
                0,
              );
              const catPct = (mins / total) * 100;
              return (
                <div key={cat}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11.5,
                      color: t.c.textMute,
                      marginBottom: 3,
                    }}
                  >
                    <span>{cat}</span>
                    <span
                      style={{
                        fontVariantNumeric: "tabular-nums",
                        color: t.c.text,
                      }}
                    >
                      {mins}m
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      borderRadius: 2,
                      background: t.c.surface2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${catPct}%`,
                        height: "100%",
                        background:
                          window.APP_DATA.categoryColors[cat] || t.c.primary,
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Footer: streak + quick actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1px dashed ${t.c.border}`,
          paddingTop: 14,
        }}
      >
        {kid.streak > 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12.5,
              color: t.c.text,
            }}
          >
            <span style={{ fontSize: 15 }}>🔥</span>
            <span>
              <b>{kid.streak}-day</b> streak
            </span>
          </div>
        ) : (
          <div style={{ fontSize: 12.5, color: t.c.textMute }}>
            Streak paused
          </div>
        )}
        <div style={{ display: "flex", gap: 6 }}>
          <button
            style={{
              padding: "6px 10px",
              borderRadius: 7,
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              fontSize: 11.5,
              fontFamily: t.font,
              fontWeight: 500,
              color: t.c.text,
              cursor: "pointer",
            }}
          >
            Pause
          </button>
          <button
            onClick={() => window.triggerModal("view-profile")}
            style={{
              padding: "6px 10px",
              borderRadius: 7,
              background: t.c.text,
              border: "none",
              fontSize: 11.5,
              fontFamily: t.font,
              fontWeight: 500,
              color: t.c.bg,
              cursor: "pointer",
            }}
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── Action queue item ───────────────────
function ActionItem({
  icon,
  iconColor,
  title,
  sub,
  action,
  actionTone = "default",
}) {
  const t = useTokens();
  const btnStyle =
    actionTone === "primary"
      ? { background: t.c.text, color: t.c.bg, border: "none" }
      : actionTone === "danger"
        ? { background: t.c.dangerSoft, color: t.c.danger, border: "none" }
        : {
            background: t.c.surface,
            color: t.c.text,
            border: `1px solid ${t.c.border}`,
          };
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
        padding: "12px 4px",
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: t.c.surface2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconColor,
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={15} color={iconColor} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13.5,
            color: t.c.text,
            fontWeight: 500,
            lineHeight: 1.35,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 1 }}>
          {sub}
        </div>
      </div>
      <button
        style={{
          padding: "6px 12px",
          borderRadius: 7,
          fontFamily: t.font,
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          ...btnStyle,
        }}
      >
        {action}
      </button>
    </div>
  );
}

// ─────────────────── Weekly sparkline row ───────────────────
function WeekSpark({
  data,
  color,
  dayLabels = ["S", "M", "T", "W", "T", "F", "S"],
}) {
  const t = useTokens();
  const max = Math.max(...data.filter((x) => x !== null));
  const W = 220,
    H = 46;
  const step = W / (data.length - 1);
  const validPoints = data.map((v, i) =>
    v === null
      ? null
      : {
          x: i * step,
          y: H - (v / max) * (H - 6) - 3,
        },
  );
  // Build path only across valid points
  const path = validPoints
    .filter((p) => p !== null)
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  const area =
    path +
    ` L ${(data.filter((v) => v !== null).length - 1) * step},${H} L 0,${H} Z`;

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
      <svg width={W} height={H} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient
            id={`grad-${color.replace("#", "")}`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#grad-${color.replace("#", "")})`} />
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {validPoints.map(
          (p, i) =>
            p && (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={
                  i === validPoints.filter((x) => x !== null).length - 1 ? 3 : 0
                }
                fill={color}
              />
            ),
        )}
      </svg>
    </div>
  );
}

// ─────────────────── Stacked Action queue component ───────────────────
function NeedsAttentionStack() {
  const t = useTokens();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const items = [
    {
      id: 1,
      icon: "message",
      iconColor: t.c.blue,
      title: "30 more minutes on Discord — Jaden",
      sub: "Requested 12 min ago · expires in 6h",
      action: "Review",
      actionTone: "primary",
      modalType: "review",
    },
    {
      id: 2,
      icon: "alert",
      iconColor: t.c.warn,
      title: "Roblox at 80% of daily limit — Maya",
      sub: "48 / 60 min used",
      action: "Extend",
      modalType: "extend",
    },
    {
      id: 3,
      icon: "shield",
      iconColor: t.c.danger,
      title: "Bypass attempt on TikTok — Jaden",
      sub: "1 hour ago",
      action: "Investigate",
      actionTone: "danger",
      modalType: "investigate",
    },
    {
      id: 4,
      icon: "calendar",
      iconColor: t.c.textMute,
      title: "Weekend schedule activates in 6h",
      sub: "Two profiles affected",
      action: "Preview",
      modalType: "preview",
    },
  ];

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + items.length) % items.length);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header with Arrows */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: t.fontSerif,
              fontSize: 18,
              fontWeight: 500,
              color: t.c.text,
              letterSpacing: "-.01em",
            }}
          >
            Needs attention
          </div>
          <div style={{ fontSize: 12, color: t.c.textMute }}>
            {items.length} items · today
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span
            style={{
              fontSize: 12,
              color: t.c.textMute,
              marginRight: 8,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {activeIndex + 1} of {items.length}
          </span>
          <button
            onClick={handlePrev}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: `1px solid ${t.c.border}`,
              background: t.c.surface,
              color: t.c.text,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="arrowLeft" size={12} />
          </button>
          <button
            onClick={handleNext}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: `1px solid ${t.c.border}`,
              background: t.c.surface,
              color: t.c.text,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="arrowRight" size={12} />
          </button>
        </div>
      </div>

      {/* Stack container */}
      <div style={{ position: "relative", height: 110, marginTop: 4 }}>
        {items.map((item, i) => {
          let diff = i - activeIndex;
          if (diff < 0) diff += items.length;

          const isVisible = diff <= 2;
          const zIndex = 10 - diff;
          const scale = 1 - diff * 0.04;
          const translateY = diff * 8;
          const opacity =
            diff === 0 ? 1 : diff === 1 ? 0.8 : diff === 2 ? 0.4 : 0;

          return (
            <div
              key={item.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                background: t.c.surface,
                borderRadius: 16,
                border: `1px solid ${t.c.border}`,
                boxShadow: diff === 0 ? "0 4px 12px rgba(0,0,0,0.04)" : "none",
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: "top center",
                zIndex,
                opacity: isVisible ? opacity : 0,
                pointerEvents: diff === 0 ? "auto" : "none",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                padding: "12px 16px",
              }}
            >
              <ActionItem
                icon={item.icon}
                iconColor={item.iconColor}
                title={item.title}
                sub={item.sub}
                action={item.action}
                actionTone={item.actionTone}
                onClick={() => window.triggerModal(item.modalType)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────── Family Hub Dashboard (main) ───────────────────
function FamilyHubDashboardNew({ onModeChange }) {
  const [currentMode, setCurrentMode] = React.useState("family");

  const handleModeChange = (newMode) => {
    setCurrentMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  if (currentMode === "personal") {
    return <MySpaceDashboardNew onModeChange={handleModeChange} />;
  }

  const t = useTokens();
  const D = window.APP_DATA;
  const totalToday = D.kids.reduce((a, k) => a + k.todayMinutes, 0);
  const totalGoal = D.kids.reduce((a, k) => a + k.todayGoal, 0);
  const totalPct = totalToday / totalGoal;

  return (
    <WorkspaceShell
      mode="family"
      active="dashboard"
      onModeChange={handleModeChange}
      title={
        <>
          Good afternoon, <span style={{ fontStyle: "italic" }}>Sarah</span>.
        </>
      }
      subtitle="Two family members active today · One needs attention"
      right={
        <PrimaryBtn
          iconRight="plus"
          style={{ padding: "10px 16px", fontSize: 13 }}
        >
          Add member
        </PrimaryBtn>
      }
    >
      {/* Row 1: Hero KPI + Action queue */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        {/* Hero KPI */}
        <div
          style={{
            padding: 32,
            borderRadius: 20,
            border: `1px solid ${t.c.border}`,
            background: `linear-gradient(135deg, ${t.c.primarySoft} 0%, ${t.c.surface} 60%)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 24,
            }}
          >
            <div>
              <Eyebrow style={{ marginBottom: 8 }}>
                Family screen time · today
              </Eyebrow>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <div
                  style={{
                    fontFamily: t.fontSerif,
                    fontSize: 64,
                    fontWeight: 400,
                    color: t.c.text,
                    letterSpacing: "-.03em",
                    lineHeight: 1,
                  }}
                >
                  {Math.floor(totalToday / 60)}
                  <span style={{ fontSize: 36, color: t.c.textMute }}>
                    h
                  </span>{" "}
                  {totalToday % 60}
                  <span style={{ fontSize: 36, color: t.c.textMute }}>m</span>
                </div>
              </div>
              <div
                style={{ marginTop: 8, fontSize: 13.5, color: t.c.textMute }}
              >
                out of {Math.floor(totalGoal / 60)}h family goal ·{" "}
                {Math.round(totalPct * 100)}%
              </div>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 10px",
                borderRadius: 7,
                background: totalPct > 1 ? t.c.dangerSoft : t.c.primarySoft,
                color: totalPct > 1 ? t.c.danger : t.c.primary,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <Icon name={totalPct > 1 ? "trend" : "trendDown"} size={14} />
              {totalPct > 1 ? "+12%" : "-8%"} vs last week
            </div>
          </div>

          {/* Segmented family bar */}
          <div>
            <div
              style={{
                display: "flex",
                height: 10,
                borderRadius: 5,
                overflow: "hidden",
                background: t.c.surface2,
              }}
            >
              {D.kids.map((k, i) => {
                const share = k.todayMinutes / totalGoal;
                return (
                  <div
                    key={k.id}
                    style={{
                      width: `${share * 100}%`,
                      background: k.avatar,
                      borderRight:
                        i < D.kids.length - 1
                          ? `2px solid ${t.c.surface}`
                          : "none",
                    }}
                  />
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 12,
                fontSize: 12,
                color: t.c.textMute,
              }}
            >
              {D.kids.map((k) => (
                <div
                  key={k.id}
                  style={{ display: "flex", gap: 6, alignItems: "center" }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: k.avatar,
                    }}
                  />
                  <span style={{ color: t.c.text, fontWeight: 500 }}>
                    {k.name}
                  </span>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    {k.todayMinutes}m
                  </span>
                </div>
              ))}
              <div
                style={{
                  marginLeft: "auto",
                  color: t.c.textMute,
                  fontStyle: "italic",
                  fontFamily: t.fontSerif,
                }}
              >
                Goal: {Math.floor(totalGoal / 60)}h
              </div>
            </div>
          </div>
        </div>

        {/* Action queue stack */}
        <NeedsAttentionStack />
      </div>

      {/* Row 2: Child status cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontFamily: t.fontSerif,
            fontSize: 22,
            fontWeight: 500,
            color: t.c.text,
            letterSpacing: "-.01em",
          }}
        >
          Family at a glance
        </div>
        <a
          href="#"
          style={{
            fontSize: 13,
            color: t.c.text,
            textDecoration: "none",
            borderBottom: `1px solid ${t.c.border}`,
          }}
        >
          Manage all →
        </a>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 24,
        }}
      >
        {D.kids.map((kid) => (
          <ChildStatusCard key={kid.id} kid={kid} />
        ))}
      </div>

      {/* Row 3: Live activity + weekly trends */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Live activity feed */}
        <div
          style={{
            padding: 24,
            borderRadius: 20,
            border: `1px solid ${t.c.border}`,
            background: t.c.surface,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: t.fontSerif,
                  fontSize: 18,
                  fontWeight: 500,
                  color: t.c.text,
                  letterSpacing: "-.01em",
                }}
              >
                Live activity
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: t.c.textMute,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 0 3px rgba(16,185,129,.2)",
                  }}
                />
                Streaming — updated just now
              </div>
            </div>
            <a
              href="#"
              style={{
                fontSize: 12.5,
                color: t.c.textMute,
                textDecoration: "none",
              }}
            >
              See all
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {D.notifications.slice(0, 5).map((n, i) => {
              const kid = D.kids.find((k) => k.id === n.kid);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    padding: "12px 0",
                    borderBottom: i < 4 ? `1px solid ${t.c.border}` : "none",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: kid?.avatar || t.c.primary,
                      color: "#fff",
                      fontSize: 11.5,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {kid?.initials || "?"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{ fontSize: 13, color: t.c.text, lineHeight: 1.4 }}
                    >
                      {n.text}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: t.c.textMute,
                        marginTop: 2,
                      }}
                    >
                      {n.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly trends */}
        <div
          style={{
            padding: 24,
            borderRadius: 20,
            border: `1px solid ${t.c.border}`,
            background: t.c.surface,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: t.fontSerif,
                  fontSize: 18,
                  fontWeight: 500,
                  color: t.c.text,
                  letterSpacing: "-.01em",
                }}
              >
                7-day trend
              </div>
              <div style={{ fontSize: 12, color: t.c.textMute }}>
                Per family member · hours/day
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 3,
                padding: 3,
                background: t.c.surface2,
                borderRadius: 7,
                fontSize: 11.5,
              }}
            >
              {["Week", "Month", "Year"].map((r, i) => (
                <div
                  key={r}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 5,
                    background: i === 0 ? t.c.surface : "transparent",
                    color: i === 0 ? t.c.text : t.c.textMute,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {r}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {D.kids.map((k) => {
              const spark = D.weeklyHours[k.id] || [];
              const validValues = spark.filter((x) => x !== null);
              const avg =
                validValues.reduce((a, b) => a + b, 0) / validValues.length;
              return (
                <div
                  key={k.id}
                  style={{ display: "flex", alignItems: "center", gap: 16 }}
                >
                  <div
                    style={{
                      minWidth: 90,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: k.avatar,
                      }}
                    />
                    <span
                      style={{ fontSize: 13, color: t.c.text, fontWeight: 500 }}
                    >
                      {k.name}
                    </span>
                  </div>
                  <WeekSpark data={spark} color={k.avatar} />
                  <div
                    style={{
                      marginLeft: "auto",
                      textAlign: "right",
                      minWidth: 60,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: t.fontSerif,
                        fontSize: 20,
                        fontWeight: 500,
                        color: t.c.text,
                        letterSpacing: "-.01em",
                        lineHeight: 1,
                      }}
                    >
                      {avg.toFixed(1)}h
                    </div>
                    <div
                      style={{
                        fontSize: 10.5,
                        color: t.c.textMute,
                        marginTop: 2,
                      }}
                    >
                      avg / day
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Insight */}
          <div
            style={{
              marginTop: 20,
              padding: 14,
              borderRadius: 12,
              background: t.c.accentSoft,
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <div style={{ color: t.c.accent, flexShrink: 0, marginTop: 2 }}>
              <Icon name="sparkles" size={16} color={t.c.accent} />
            </div>
            <div style={{ fontSize: 12.5, color: t.c.text, lineHeight: 1.5 }}>
              <b>Coach insight:</b> Jaden's evening usage has grown 22% this
              week. Consider extending the wind-down window to start at 8:30pm.
            </div>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}

Object.assign(window, {
  WorkspaceShell,
  ChildStatusCard,
  ActionItem,
  WeekSpark,
  FamilyHubDashboardNew,
});

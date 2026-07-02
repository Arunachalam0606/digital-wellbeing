// Connects — top-level section covering Devices, People (family) and Apps
// A "network view" of everything connected to the workspace.

const { useState: useStateCon } = React;

// ─────────────────── Small tag chip ───────────────────
function TagChip({ children, tone = "default" }) {
  const t = useTokens();
  const tones = {
    active: { bg: t.c.primarySoft, fg: t.c.primary },
    paused: { bg: t.c.warnSoft, fg: t.c.warn },
    offline: { bg: t.c.surface2, fg: t.c.textMute },
    danger: { bg: t.c.dangerSoft, fg: t.c.danger },
    default: { bg: t.c.surface2, fg: t.c.textMute },
  };
  const { bg, fg } = tones[tone] || tones.default;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 8px",
        borderRadius: 6,
        background: bg,
        color: fg,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: ".02em",
      }}
    >
      {tone === "active" && (
        <div
          style={{ width: 6, height: 6, borderRadius: "50%", background: fg }}
        />
      )}
      {children}
    </span>
  );
}

// ─────────────────── Sub-tab pill row ───────────────────
function SubTabs({ active, tabs, onChange }) {
  const t = useTokens();
  return (
    <div
      style={{
        display: "inline-flex",
        padding: 4,
        gap: 2,
        background: t.c.surface2,
        border: `1px solid ${t.c.border}`,
        borderRadius: 10,
        marginBottom: 24,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          style={{
            padding: "8px 16px",
            borderRadius: 7,
            border: "none",
            background: active === tab.key ? t.c.surface : "transparent",
            color: active === tab.key ? t.c.text : t.c.textMute,
            fontFamily: t.font,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow:
              active === tab.key
                ? t.dark
                  ? "0 1px 3px rgba(0,0,0,.3)"
                  : "0 1px 3px rgba(0,0,0,.05)"
                : "none",
            transition: "all .15s",
          }}
        >
          <Icon
            name={tab.icon}
            size={14}
            color={active === tab.key ? t.c.text : t.c.textMute}
          />
          {tab.label}
          <span
            style={{
              padding: "1px 6px",
              borderRadius: 4,
              background: active === tab.key ? t.c.surface2 : "transparent",
              fontSize: 10.5,
              color: t.c.textMute,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─────────────────── Devices grid ───────────────────
function DevicesPane() {
  const t = useTokens();
  const devices = [
    {
      name: "Maya's iPhone",
      model: "iPhone 14 · iOS 17.5",
      owner: "Maya",
      ownerColor: "#E8896F",
      status: "active",
      lastSeen: "12 min ago",
      battery: 68,
      blocked: 1842,
      pairedOn: "Mar 12, 2026",
    },
    {
      name: "Jaden's Pixel",
      model: "Pixel 8 · Android 14",
      owner: "Jaden",
      ownerColor: "#A8A0C8",
      status: "active",
      lastSeen: "just now",
      battery: 42,
      blocked: 1456,
      pairedOn: "Apr 2, 2026",
    },
    {
      name: "Sarah's MacBook",
      model: "MacBook Pro · macOS 15",
      owner: "Sarah",
      ownerColor: "#5C8A6B",
      status: "active",
      lastSeen: "3 min ago",
      battery: null,
      blocked: 1108,
      pairedOn: "Feb 1, 2026",
    },
    {
      name: "Family iPad",
      model: "iPad Air · iPadOS 18",
      owner: "Shared",
      ownerColor: "#7DA9C7",
      status: "paused",
      lastSeen: "2 days ago",
      battery: 22,
      blocked: 415,
      pairedOn: "Feb 15, 2026",
    },
    {
      name: "Living room Apple TV",
      model: "Apple TV 4K · tvOS 18",
      owner: "Shared",
      ownerColor: "#7DA9C7",
      status: "offline",
      lastSeen: "5 hours ago",
      battery: null,
      blocked: 0,
      pairedOn: "May 10, 2026",
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {devices.map((d, i) => (
        <div
          key={i}
          style={{
            padding: 20,
            borderRadius: 16,
            background: t.c.surface,
            border: `1px solid ${t.c.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
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
                  borderRadius: 12,
                  background: t.c.surface2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: t.c.text,
                }}
              >
                <Icon name="phone" size={20} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.c.text }}>
                  {d.name}
                </div>
                <div style={{ fontSize: 12, color: t.c.textMute }}>
                  {d.model}
                </div>
              </div>
            </div>
            <TagChip tone={d.status}>
              {d.status[0].toUpperCase() + d.status.slice(1)}
            </TagChip>
          </div>

          {/* Meta strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10.5,
                  color: t.c.textMute,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Owner
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12.5,
                  color: t.c.text,
                  fontWeight: 500,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: d.ownerColor,
                  }}
                />
                {d.owner}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10.5,
                  color: t.c.textMute,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Last seen
              </div>
              <div style={{ fontSize: 12.5, color: t.c.text, fontWeight: 500 }}>
                {d.lastSeen}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10.5,
                  color: t.c.textMute,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Blocked
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: t.c.text,
                  fontWeight: 500,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {d.blocked.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: 6,
              borderTop: `1px dashed ${t.c.border}`,
              paddingTop: 12,
            }}
          >
            <button
              style={{
                flex: 1,
                padding: "7px 10px",
                borderRadius: 7,
                background: t.c.surface2,
                border: `1px solid ${t.c.border}`,
                color: t.c.text,
                fontFamily: t.font,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Configure
            </button>
            <button
              style={{
                flex: 1,
                padding: "7px 10px",
                borderRadius: 7,
                background: t.c.surface2,
                border: `1px solid ${t.c.border}`,
                color: t.c.text,
                fontFamily: t.font,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {d.status === "paused" ? "Resume" : "Pause"}
            </button>
            <button
              style={{
                padding: "7px 10px",
                borderRadius: 7,
                background: t.c.surface2,
                border: `1px solid ${t.c.border}`,
                color: t.c.textMute,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="more" size={14} />
            </button>
          </div>
        </div>
      ))}

      {/* Add-device tile */}
      <div
        style={{
          padding: 20,
          borderRadius: 16,
          background: "transparent",
          border: `2px dashed ${t.c.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          minHeight: 180,
          cursor: "pointer",
          transition: "border-color .15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.c.primary)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.c.border)}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: t.c.primarySoft,
            color: t.c.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="qr" size={20} color={t.c.primary} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.c.text }}>
            Pair a new device
          </div>
          <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 2 }}>
            Scan a QR from any phone, tablet or computer
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── People pane ───────────────────
function PeoplePane() {
  const t = useTokens();
  const D = window.APP_DATA;
  const people = [
    {
      name: "Sarah Mitchell",
      role: "Family admin",
      avatar: "#5C8A6B",
      initials: "SM",
      email: "sarah.m@gmail.com",
      devices: 1,
      lastActive: "3 min ago",
      isYou: true,
    },
    ...D.kids.map((k) => ({
      name: k.name,
      role: `Managed · Age ${k.age}`,
      avatar: k.avatar,
      initials: k.initials,
      email: null,
      devices: 1,
      lastActive: k.lastActive,
    })),
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {people.map((p, i) => (
        <div
          key={i}
          style={{
            padding: 20,
            borderRadius: 16,
            background: t.c.surface,
            border: `1px solid ${t.c.border}`,
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: p.avatar,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: t.fontSerif,
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            {p.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 3,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 600, color: t.c.text }}>
                {p.name}
              </div>
              {p.isYou && <TagChip tone="active">You</TagChip>}
            </div>
            <div style={{ fontSize: 12.5, color: t.c.textMute }}>
              {p.role}
              {p.email && <> · {p.email}</>} · Active {p.lastActive}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
              marginRight: 8,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: t.fontSerif,
                  fontSize: 22,
                  fontWeight: 500,
                  color: t.c.text,
                  letterSpacing: "-.02em",
                  lineHeight: 1,
                }}
              >
                {p.devices}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: t.c.textMute,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                device{p.devices > 1 ? "s" : ""}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <GhostBtn style={{ padding: "8px 14px", fontSize: 12.5 }}>
              View profile
            </GhostBtn>
            <button
              style={{
                padding: 10,
                borderRadius: 8,
                border: `1px solid ${t.c.border}`,
                background: t.c.surface,
                color: t.c.textMute,
                cursor: "pointer",
              }}
            >
              <Icon name="more" size={14} />
            </button>
          </div>
        </div>
      ))}

      <button
        style={{
          padding: "20px",
          borderRadius: 16,
          background: "transparent",
          border: `2px dashed ${t.c.border}`,
          color: t.c.textMute,
          cursor: "pointer",
          fontFamily: t.font,
          fontSize: 13.5,
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all .15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = t.c.primary;
          e.currentTarget.style.color = t.c.primary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = t.c.border;
          e.currentTarget.style.color = t.c.textMute;
        }}
      >
        <Icon name="plus" size={14} />
        Invite family member
      </button>
    </div>
  );
}

// ─────────────────── Apps pane ───────────────────
function AppsPane() {
  const t = useTokens();
  const apps = [
    {
      name: "YouTube",
      cat: "Video",
      tone: "limited",
      limit: "90m/day",
      devices: 3,
      color: "#FF0000",
    },
    {
      name: "TikTok",
      cat: "Social",
      tone: "blocked",
      limit: "Blocked",
      devices: 2,
      color: "#000000",
    },
    {
      name: "Roblox",
      cat: "Gaming",
      tone: "limited",
      limit: "60m/day",
      devices: 1,
      color: "#E2231A",
    },
    {
      name: "Snapchat",
      cat: "Social",
      tone: "limited",
      limit: "30m/day",
      devices: 2,
      color: "#FFFC00",
    },
    {
      name: "Duolingo",
      cat: "Education",
      tone: "unlimited",
      limit: "Rewarded",
      devices: 2,
      color: "#58CC02",
    },
    {
      name: "Discord",
      cat: "Communication",
      tone: "limited",
      limit: "45m/day",
      devices: 2,
      color: "#5865F2",
    },
    {
      name: "Instagram",
      cat: "Social",
      tone: "limited",
      limit: "30m/day",
      devices: 1,
      color: "#E1306C",
    },
    {
      name: "Spotify",
      cat: "Music",
      tone: "unlimited",
      limit: "No limit",
      devices: 4,
      color: "#1DB954",
    },
    {
      name: "Slack",
      cat: "Productivity",
      tone: "unlimited",
      limit: "No limit",
      devices: 1,
      color: "#4A154B",
    },
  ];
  const toneMap = {
    limited: "paused",
    blocked: "danger",
    unlimited: "active",
  };

  return (
    <div>
      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 13, color: t.c.textMute }}>
          Showing <b style={{ color: t.c.text }}>{apps.length}</b> apps across
          your family
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <GhostBtn
            iconLeft="search"
            style={{ padding: "8px 14px", fontSize: 13 }}
          >
            Filter
          </GhostBtn>
          <PrimaryBtn
            iconRight="plus"
            style={{ padding: "9px 14px", fontSize: 13 }}
          >
            Add app rule
          </PrimaryBtn>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}
      >
        {apps.map((app) => (
          <div
            key={app.name}
            style={{
              padding: 16,
              borderRadius: 14,
              background: t.c.surface,
              border: `1px solid ${t.c.border}`,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: app.color,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: t.fontSerif,
                    fontSize: 15,
                    fontWeight: 500,
                    flexShrink: 0,
                  }}
                >
                  {app.name[0]}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: t.c.text,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {app.name}
                  </div>
                  <div style={{ fontSize: 11.5, color: t.c.textMute }}>
                    {app.cat}
                  </div>
                </div>
              </div>
              <TagChip tone={toneMap[app.tone]}>{app.limit}</TagChip>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: `1px dashed ${t.c.border}`,
                paddingTop: 10,
                fontSize: 11.5,
                color: t.c.textMute,
              }}
            >
              <span>
                Applied to {app.devices} device{app.devices > 1 ? "s" : ""}
              </span>
              <a
                href="#"
                style={{
                  color: t.c.text,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Edit →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────── Connects main page ───────────────────
function WebConnectsNew() {
  const t = useTokens();
  const [tab, setTab] = useStateCon("devices");

  const tabs = [
    { key: "devices", label: "Devices", icon: "phone", count: 5 },
    { key: "people", label: "People", icon: "users", count: 3 },
    { key: "apps", label: "Apps", icon: "sparkles", count: 9 },
  ];

  return (
    <WorkspaceShell
      mode="family"
      active="connects"
      title="Connects"
      subtitle="Everything paired to your workspace — devices, people, and apps"
    >
      {/* Top summary strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Devices online",
            value: 3,
            of: 5,
            color: t.c.primary,
            icon: "phone",
          },
          {
            label: "Family members",
            value: 3,
            of: null,
            color: t.c.blue,
            icon: "users",
          },
          {
            label: "Managed apps",
            value: 9,
            of: null,
            color: t.c.accent,
            icon: "sparkles",
          },
        ].map((k, i) => (
          <div
            key={i}
            style={{
              padding: 20,
              borderRadius: 16,
              background: t.c.surface,
              border: `1px solid ${t.c.border}`,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${k.color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: k.color,
              }}
            >
              <Icon name={k.icon} size={20} color={k.color} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 11.5,
                  color: t.c.textMute,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                {k.label}
              </div>
              <div
                style={{
                  fontFamily: t.fontSerif,
                  fontSize: 28,
                  fontWeight: 500,
                  color: t.c.text,
                  letterSpacing: "-.02em",
                  lineHeight: 1,
                }}
              >
                {k.value}
                {k.of != null && (
                  <span style={{ color: t.c.textMute, fontSize: 18 }}>
                    {" "}
                    / {k.of}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SubTabs active={tab} tabs={tabs} onChange={setTab} />

      {tab === "devices" && <DevicesPane />}
      {tab === "people" && <PeoplePane />}
      {tab === "apps" && <AppsPane />}
    </WorkspaceShell>
  );
}

Object.assign(window, {
  TagChip,
  SubTabs,
  DevicesPane,
  PeoplePane,
  AppsPane,
  WebConnectsNew,
});

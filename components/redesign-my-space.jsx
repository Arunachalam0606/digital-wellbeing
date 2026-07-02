// Redesigned My Space (Personal Dashboard)
// Priorities: motivational focus number+streak · reflection/journaling · focus timer · analytical breakdown

const { useState: useStateMS } = React;

// ─────────────────── Big focus number ───────────────────
function BigFocusNumber() {
  const t = useTokens();
  const D = window.APP_DATA;
  const p = D.personal;
  const pct = p.todayMinutes / p.todayGoal;
  const under = p.todayMinutes < p.todayGoal;

  // Ring
  const R = 100,
    C = 2 * Math.PI * R;
  const ringPct = Math.min(1, pct);

  return (
    <div
      style={{
        padding: 40,
        borderRadius: 24,
        background: `linear-gradient(160deg, ${t.c.primarySoft} 0%, ${t.c.surface} 60%)`,
        border: `1px solid ${t.c.border}`,
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 40,
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ring */}
      <div style={{ position: "relative", width: 240, height: 240 }}>
        <svg width="240" height="240" viewBox="0 0 240 240">
          <defs>
            <linearGradient id="focusRingGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={t.c.primary} />
              <stop offset="100%" stopColor={t.c.accent} />
            </linearGradient>
          </defs>
          <circle
            cx="120"
            cy="120"
            r={R}
            fill="none"
            stroke={t.c.surface2}
            strokeWidth="14"
          />
          <circle
            cx="120"
            cy="120"
            r={R}
            fill="none"
            stroke="url(#focusRingGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - ringPct)}
            transform="rotate(-90 120 120)"
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
              fontSize: 80,
              fontWeight: 400,
              color: t.c.text,
              letterSpacing: "-.04em",
              lineHeight: 1,
            }}
          >
            {Math.floor(p.todayMinutes / 60)}
            <span style={{ fontSize: 44, color: t.c.textMute }}>h</span>{" "}
            {p.todayMinutes % 60}
          </div>
          <div
            style={{
              fontSize: 11,
              color: t.c.textMute,
              marginTop: 6,
              letterSpacing: ".14em",
              textTransform: "uppercase",
            }}
          >
            of {Math.floor(p.todayGoal / 60)}h today
          </div>
        </div>
      </div>

      {/* Right: story */}
      <div>
        <Eyebrow style={{ marginBottom: 12, color: t.c.primary }}>
          {under ? "You're doing beautifully" : "Slightly over"}
        </Eyebrow>
        <DisplayH size={44} style={{ marginBottom: 14 }}>
          {under ? (
            <>
              52 minutes{" "}
              <span style={{ fontStyle: "italic", color: t.c.primary }}>
                of headroom
              </span>{" "}
              before your daily goal.
            </>
          ) : (
            <>You're 12 minutes past your goal — no worry, tomorrow resets.</>
          )}
        </DisplayH>
        <p
          style={{
            fontSize: 15,
            color: t.c.textMute,
            lineHeight: 1.55,
            margin: 0,
            maxWidth: 500,
          }}
        >
          You've spent most of today in{" "}
          <b style={{ color: t.c.text }}>Productivity</b>. Two more focus blocks
          and you'll close the day well.
        </p>

        {/* Streak + quick stats */}
        <div
          style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap" }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: t.c.textMute,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Streak
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 24 }}>🔥</span>
              <div
                style={{
                  fontFamily: t.fontSerif,
                  fontSize: 30,
                  fontWeight: 500,
                  color: t.c.text,
                  letterSpacing: "-.02em",
                  lineHeight: 1,
                }}
              >
                {p.streak}
                <span
                  style={{ fontSize: 14, color: t.c.textMute, marginLeft: 4 }}
                >
                  days
                </span>
              </div>
            </div>
          </div>
          <div style={{ width: 1, background: t.c.border }} />
          <div>
            <div
              style={{
                fontSize: 11,
                color: t.c.textMute,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              This week
            </div>
            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 30,
                fontWeight: 500,
                color: t.c.text,
                letterSpacing: "-.02em",
                lineHeight: 1,
              }}
            >
              {Math.floor(p.weekMinutes / 60)}h {p.weekMinutes % 60}m
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: t.c.primary,
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Icon name="arrowDown" size={11} color={t.c.primary} /> 18% vs
              last
            </div>
          </div>
          <div style={{ width: 1, background: t.c.border }} />
          <div>
            <div
              style={{
                fontSize: 11,
                color: t.c.textMute,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Pickups
            </div>
            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 30,
                fontWeight: 500,
                color: t.c.text,
                letterSpacing: "-.02em",
                lineHeight: 1,
              }}
            >
              47
            </div>
            <div style={{ fontSize: 11.5, color: t.c.textMute, marginTop: 4 }}>
              7% below avg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── Focus timer widget ───────────────────
function FocusTimerWidget() {
  const t = useTokens();
  const [preset, setPreset] = useStateMS("deep");
  const presets = [
    { key: "quick", label: "Quick", minutes: 15 },
    { key: "focus", label: "Focus", minutes: 25 },
    { key: "deep", label: "Deep", minutes: 45 },
    { key: "flow", label: "Flow", minutes: 90 },
  ];
  const active = presets.find((p) => p.key === preset);

  return (
    <div
      style={{
        padding: 24,
        borderRadius: 20,
        border: `1px solid ${t.c.border}`,
        background: t.c.surface,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
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
            Focus session
          </div>
          <div style={{ fontSize: 12, color: t.c.textMute }}>
            Silences distractions until done
          </div>
        </div>
        <div
          style={{
            padding: "4px 8px",
            borderRadius: 6,
            background: t.c.primarySoft,
            color: t.c.primary,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {active.minutes}m
        </div>
      </div>

      {/* Big countdown display */}
      <div
        style={{
          padding: "24px 0",
          textAlign: "center",
          borderTop: `1px dashed ${t.c.border}`,
          borderBottom: `1px dashed ${t.c.border}`,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontFamily: t.fontSerif,
            fontSize: 68,
            fontWeight: 400,
            color: t.c.text,
            letterSpacing: "-.04em",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(active.minutes).padStart(2, "0")}:00
        </div>
        <div
          style={{
            fontSize: 12,
            color: t.c.textMute,
            marginTop: 8,
            letterSpacing: ".1em",
            textTransform: "uppercase",
          }}
        >
          Ready to start
        </div>
      </div>

      {/* Preset chips */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {presets.map((p) => (
          <button
            key={p.key}
            onClick={() => setPreset(p.key)}
            style={{
              flex: 1,
              padding: "8px 6px",
              borderRadius: 8,
              border: `1px solid ${preset === p.key ? t.c.primary : t.c.border}`,
              background: preset === p.key ? t.c.primarySoft : t.c.surface,
              color: preset === p.key ? t.c.primary : t.c.text,
              fontFamily: t.font,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all .15s",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          padding: "12px 20px",
          borderRadius: 11,
          background: t.c.text,
          color: t.c.bg,
          border: "none",
          fontFamily: t.font,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Icon name="play" size={14} color={t.c.bg} />
        Start focus
      </button>
    </div>
  );
}

// ─────────────────── Reflection prompt widget ───────────────────
function ReflectionWidget() {
  const t = useTokens();
  const [entry, setEntry] = useStateMS("");
  const [mood, setMood] = useStateMS(null);

  const prompts = [
    "What felt worth your attention today?",
    "Where did your mind wander?",
    "What would tomorrow-you thank you for?",
  ];
  const [promptIdx, setPromptIdx] = useStateMS(0);

  return (
    <div
      style={{
        padding: 24,
        borderRadius: 20,
        border: `1px solid ${t.c.border}`,
        background: `linear-gradient(160deg, ${t.c.accentSoft} 0%, ${t.c.surface} 80%)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <div>
          <Eyebrow style={{ marginBottom: 8, color: t.c.accent }}>
            Reflect · Evening
          </Eyebrow>
          <div
            style={{
              fontFamily: t.fontSerif,
              fontSize: 22,
              fontWeight: 500,
              color: t.c.text,
              letterSpacing: "-.01em",
              lineHeight: 1.3,
              marginBottom: 4,
            }}
          >
            {prompts[promptIdx]}
          </div>
        </div>
        <button
          onClick={() => setPromptIdx((promptIdx + 1) % prompts.length)}
          style={{
            padding: 6,
            borderRadius: 8,
            border: `1px solid ${t.c.border}`,
            background: t.c.surface,
            color: t.c.textMute,
            cursor: "pointer",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="sparkles" size={14} />
        </button>
      </div>

      {/* Mood picker */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[
          { key: "calm", emoji: "🌿", label: "Calm" },
          { key: "focused", emoji: "🎯", label: "Focused" },
          { key: "scattered", emoji: "🌪", label: "Scattered" },
          { key: "tired", emoji: "🌙", label: "Tired" },
          { key: "joyful", emoji: "☀️", label: "Joyful" },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMood(m.key)}
            style={{
              flex: 1,
              padding: "8px 4px",
              borderRadius: 10,
              border: `1px solid ${mood === m.key ? t.c.accent : t.c.border}`,
              background: mood === m.key ? t.c.surface : "transparent",
              color: t.c.text,
              cursor: "pointer",
              fontFamily: t.font,
              fontSize: 10.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              transition: "all .15s",
            }}
          >
            <span style={{ fontSize: 18 }}>{m.emoji}</span>
            <span
              style={{
                color: mood === m.key ? t.c.text : t.c.textMute,
                fontWeight: mood === m.key ? 600 : 500,
              }}
            >
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {/* Journal input */}
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="A sentence is enough…"
        style={{
          width: "100%",
          minHeight: 90,
          resize: "vertical",
          padding: 14,
          borderRadius: 12,
          border: `1px solid ${t.c.border}`,
          background: t.c.surface,
          color: t.c.text,
          fontFamily: t.fontSerif,
          fontStyle: "italic",
          fontSize: 15,
          lineHeight: 1.5,
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <div style={{ fontSize: 11.5, color: t.c.textMute }}>
          Private · Never shared
        </div>
        <button
          style={{
            padding: "7px 14px",
            borderRadius: 8,
            background: t.c.accent,
            color: "#fff",
            border: "none",
            fontFamily: t.font,
            fontSize: 12.5,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Save entry
        </button>
      </div>
    </div>
  );
}

// ─────────────────── Category breakdown ───────────────────
function CategoryBreakdown() {
  const t = useTokens();
  const D = window.APP_DATA;
  const cats = D.personal.categories;
  const total = Object.values(cats).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(cats).sort((a, b) => b[1] - a[1]);

  return (
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
            Today by category
          </div>
          <div style={{ fontSize: 12, color: t.c.textMute }}>
            Where your attention went
          </div>
        </div>
        <a
          href="#"
          style={{
            fontSize: 12.5,
            color: t.c.text,
            textDecoration: "none",
            borderBottom: `1px solid ${t.c.border}`,
          }}
        >
          Reports →
        </a>
      </div>

      {/* Stacked bar */}
      <div
        style={{
          height: 12,
          borderRadius: 6,
          overflow: "hidden",
          background: t.c.surface2,
          display: "flex",
          marginBottom: 20,
        }}
      >
        {sorted.map(([cat, mins]) => (
          <div
            key={cat}
            style={{
              width: `${(mins / total) * 100}%`,
              background: D.categoryColors[cat] || t.c.primary,
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sorted.map(([cat, mins]) => (
          <div
            key={cat}
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: D.categoryColors[cat] || t.c.primary,
              }}
            />
            <div style={{ flex: 1, fontSize: 13.5, color: t.c.text }}>
              {cat}
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: t.c.textMute,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.round((mins / total) * 100)}%
            </div>
            <div
              style={{
                minWidth: 56,
                textAlign: "right",
                fontFamily: t.font,
                fontSize: 13.5,
                fontWeight: 600,
                color: t.c.text,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.floor(mins / 60)}h {mins % 60}m
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────── Top apps list ───────────────────
function TopAppsList() {
  const t = useTokens();
  const D = window.APP_DATA;
  const apps = D.personal.topApps.slice(0, 5);

  return (
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
            Top apps
          </div>
          <div style={{ fontSize: 12, color: t.c.textMute }}>
            Sorted by time today
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {apps.map((app, i) => (
          <div
            key={app.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 12px",
              borderRadius: 12,
              background: t.c.surface2,
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
              }}
            >
              {app.name[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, color: t.c.text, fontWeight: 500 }}>
                {app.name}
              </div>
              <div style={{ fontSize: 11.5, color: t.c.textMute }}>
                {app.cat} · {app.pickups} pickups
              </div>
            </div>
            <div
              style={{
                fontFamily: t.font,
                fontSize: 13.5,
                fontWeight: 600,
                color: t.c.text,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {app.mins}m
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────── Coach card ───────────────────
function CoachCard() {
  const t = useTokens();
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 16,
        background: t.c.text,
        color: t.c.bg,
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: t.c.primary,
          opacity: 0.4,
          filter: "blur(30px)",
        }}
      />
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: `${t.c.primary}40`,
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: t.c.bg,
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        <Icon name="sparkles" size={16} color={t.c.bg} />
      </div>
      <div style={{ zIndex: 1, flex: 1 }}>
        <div
          style={{
            fontSize: 11,
            opacity: 0.6,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Coach · today
        </div>
        <div
          style={{
            fontFamily: t.fontSerif,
            fontStyle: "italic",
            fontSize: 16,
            lineHeight: 1.45,
            marginBottom: 12,
          }}
        >
          &ldquo;Your morning was deeply productive. Consider a shorter
          afternoon session so you can be present at dinner.&rdquo;
        </div>
        <button
          style={{
            padding: "6px 12px",
            borderRadius: 7,
            background: "rgba(255,255,255,.15)",
            color: t.c.bg,
            border: "1px solid rgba(255,255,255,.2)",
            fontFamily: t.font,
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            backdropFilter: "blur(10px)",
          }}
        >
          Talk to coach →
        </button>
      </div>
    </div>
  );
}

// ─────────────────── My Space Dashboard (main) ───────────────────
function MySpaceDashboardNew() {
  const t = useTokens();
  return (
    <WorkspaceShell
      mode="personal"
      active="dashboard"
      title={
        <>
          Hello, <span style={{ fontStyle: "italic" }}>Alex</span>.
        </>
      }
      subtitle="Thursday, July 2 · Afternoon"
      right={
        <PrimaryBtn
          iconRight="play"
          style={{ padding: "10px 16px", fontSize: 13 }}
        >
          Start focus
        </PrimaryBtn>
      }
    >
      {/* Row 1: hero */}
      <div style={{ marginBottom: 20 }}>
        <BigFocusNumber />
      </div>

      {/* Row 2: coach + timer + reflect */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1.2fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <CoachCard />
          <CategoryBreakdown />
        </div>
        <FocusTimerWidget />
        <ReflectionWidget />
      </div>

      {/* Row 3: apps */}
      <div>
        <TopAppsList />
      </div>
    </WorkspaceShell>
  );
}

Object.assign(window, {
  BigFocusNumber,
  FocusTimerWidget,
  ReflectionWidget,
  CategoryBreakdown,
  TopAppsList,
  CoachCard,
  MySpaceDashboardNew,
});

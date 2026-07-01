// Child mobile screens — Today (home), Apps list, Streak/Awards, Request more time, Locked app

const childTabs = [
  { id: "today", label: "Today", icon: "home" },
  { id: "apps", label: "Apps", icon: "grid" },
  { id: "streak", label: "Streak", icon: "flame" },
  { id: "ask", label: "Ask", icon: "message" },
];

// ───────────────────────────────────────────────────────────────
// CHILD TAB 1: Today
// ───────────────────────────────────────────────────────────────

function MobChildToday({ android = false }) {
  const t = useTokens();
  const k = APP_DATA.kids[0]; // Maya
  const remaining = Math.max(0, k.todayGoal - k.todayMinutes);
  const remainingHrs = remaining / 60;

  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={childTabs} active="today" />}
    >
      <MobileHeader
        eyebrow="Thursday afternoon"
        title="Hi Maya 🌿"
        subtitle="You're doing great today — under budget and on a streak."
        action={<Avatar name="Maya" color={k.avatar} size={34} />}
      />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Big remaining time hero */}
        <MobileCard
          pad={22}
          bg={t.c.primarySoft}
          border={false}
          style={{ position: "relative", overflow: "hidden" }}
        >
          {/* Decorative blob */}
          <div
            style={{
              position: "absolute",
              right: -40,
              top: -40,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: t.c.primary,
              opacity: 0.08,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -30,
              bottom: -30,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: t.c.accent,
              opacity: 0.08,
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontSize: 11.5,
                color: t.c.primary,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: ".06em",
              }}
            >
              You have left today
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontFamily: t.fontMono,
                  fontSize: 60,
                  fontWeight: 500,
                  letterSpacing: "-.04em",
                  color: t.c.primary,
                  lineHeight: 1,
                }}
              >
                {fmtTime(remaining)}
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: t.c.text, marginTop: 8 }}>
              of your <b>{fmtTime(k.todayGoal)}</b> daily budget
            </div>

            {/* Sub progress */}
            <div
              style={{
                marginTop: 16,
                height: 7,
                background: "rgba(0,0,0,.06)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: (k.todayMinutes / k.todayGoal) * 100 + "%",
                  height: "100%",
                  background: t.c.primary,
                  borderRadius: 4,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10.5,
                color: t.c.textMute,
                marginTop: 6,
                fontFamily: t.fontMono,
              }}
            >
              <span>{fmtTime(k.todayMinutes)} used</span>
              <span>{Math.round((k.todayMinutes / k.todayGoal) * 100)}%</span>
            </div>
          </div>
        </MobileCard>

        {/* Streak callout */}
        <MobileCard pad={14} bg={t.c.yellowSoft} border={false}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 32, lineHeight: 1 }}>🔥</div>
            <div style={{ flex: 1 }}>
              <div
                style={{ fontSize: 14, fontWeight: 700, color: t.c.yellowText }}
              >
                4-day streak
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: t.c.yellowText,
                  opacity: 0.85,
                  marginTop: 2,
                }}
              >
                1 more day to unlock the "5-Day Calm" badge.
              </div>
            </div>
            <Icon name="arrowRight" size={16} color={t.c.yellowText} />
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
            {[true, true, true, true, false, false, false].map((on, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 26,
                  borderRadius: 6,
                  background: on ? "#F4D374" : "rgba(0,0,0,.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: on ? t.c.yellowText : "rgba(0,0,0,.3)",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {["S", "M", "T", "W", "T", "F", "S"][i]}
              </div>
            ))}
          </div>
        </MobileCard>

        {/* Quick stats — what's happened today */}
        <div style={{ display: "flex", gap: 8 }}>
          <StatTile label="Pickups" value="42" sublabel="today" icon="phone" />
          <StatTile
            label="Notifs"
            value="87"
            sublabel="mostly Snap"
            icon="bell"
          />
          <StatTile
            label="Best app"
            value="Duo"
            sublabel="🎯 +1 lesson"
            icon="trophy"
            color={t.c.primary}
          />
        </div>

        {/* Apps with time left */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>Your apps</span>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: t.c.primary,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              See all
            </button>
          </div>
          {k.topApps.slice(0, 4).map((a, i) => (
            <MobileAppRow key={a.name} app={a} last={i === 3} />
          ))}
        </MobileCard>

        {/* Coach card */}
        <MobileCard pad={14}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: t.c.primarySoft,
                color: t.c.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="sparkles" size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 11,
                  color: t.c.primary,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                Coach
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.45, marginTop: 4 }}>
                A short <b>Duolingo</b> lesson would push your streak to{" "}
                <b>5 days</b>. You've got time for it.
              </div>
              <button
                style={{
                  marginTop: 10,
                  background: t.c.primary,
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "8px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                Open Duolingo
              </button>
            </div>
          </div>
        </MobileCard>

        {/* This week mini */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>This week</span>
            <Chip
              bg={t.c.primarySoft}
              color={t.c.primary}
              style={{ fontSize: 10 }}
            >
              ↓ 18%
            </Chip>
          </div>
          <MobileWeeklyBars
            data={APP_DATA.weeklyHours.maya}
            goal={4}
            height={110}
            todayIndex={4}
          />
        </MobileCard>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}
window.MobChildToday = MobChildToday;

// ───────────────────────────────────────────────────────────────
// CHILD TAB 2: Apps — full list w/ limits, by category
// ───────────────────────────────────────────────────────────────

function MobChildApps({ android = false }) {
  const t = useTokens();
  const k = APP_DATA.kids[0];

  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={childTabs} active="apps" />}
    >
      <MobileHeader
        title="My apps"
        subtitle="See where your time goes today."
      />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Category filter */}
        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            padding: "2px 0 4px",
          }}
        >
          {[
            "All",
            "Social",
            "Video",
            "Gaming",
            "Education",
            "Communication",
          ].map((c, i) => (
            <Chip
              key={c}
              bg={i === 0 ? t.c.primarySoft : t.c.surface2}
              color={i === 0 ? t.c.primary : t.c.text}
              style={{ flexShrink: 0 }}
            >
              {c}
            </Chip>
          ))}
        </div>

        {/* By category breakdown */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
            By category — today
          </div>
          {Object.entries(k.categories)
            .sort((a, b) => b[1] - a[1])
            .map(([cat, m]) => (
              <div key={cat} style={{ marginBottom: 10 }}>
                <CategoryRow cat={cat} mins={m} total={k.todayMinutes} />
              </div>
            ))}
        </MobileCard>

        {/* Apps list */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
            All apps
          </div>
          <div style={{ fontSize: 11, color: t.c.textMute, marginBottom: 4 }}>
            Sorted by time today
          </div>
          {k.topApps.map((a, i, arr) => (
            <MobileAppRow key={a.name} app={a} last={i === arr.length - 1} />
          ))}
        </MobileCard>

        {/* Locked apps callout */}
        <MobileCard pad={14} bg={t.c.dangerSoft} border={false}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="lock" size={18} color={t.c.danger} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.c.danger }}>
                1 app locked today
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: t.c.danger,
                  opacity: 0.8,
                  marginTop: 2,
                }}
              >
                TikTok unlocks at midnight.
              </div>
            </div>
            <Icon name="arrowRight" size={16} color={t.c.danger} />
          </div>
        </MobileCard>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}
window.MobChildApps = MobChildApps;

// ───────────────────────────────────────────────────────────────
// CHILD TAB 3: Streak — awards, weekly progress
// ───────────────────────────────────────────────────────────────

function MobChildStreak({ android = false }) {
  const t = useTokens();
  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={childTabs} active="streak" />}
    >
      <MobileHeader
        eyebrow="Awards"
        title="Streak & badges"
        subtitle="Stay under budget to earn badges and unlock bonus time."
      />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Big streak number */}
        <MobileCard
          pad={22}
          bg={t.c.yellowSoft}
          border={false}
          style={{
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 0%, rgba(244,211,116,.6) 0%, transparent 70%)",
            }}
          />
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 56, lineHeight: 1 }}>🔥</div>
            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 48,
                fontWeight: 500,
                letterSpacing: "-.03em",
                color: t.c.yellowText,
                lineHeight: 1,
                marginTop: 8,
              }}
            >
              4 days
            </div>
            <div
              style={{
                fontSize: 13,
                color: t.c.yellowText,
                marginTop: 8,
                fontWeight: 500,
              }}
            >
              Under budget all week
            </div>
          </div>
        </MobileCard>

        {/* Weekly heat strip */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>This week</span>
            <span style={{ fontSize: 11, color: t.c.textMute }}>
              1 more day = new badge
            </span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { d: "S", state: "done" },
              { d: "M", state: "done" },
              { d: "T", state: "done" },
              { d: "W", state: "done" },
              { d: "T", state: "today" },
              { d: "F", state: "future" },
              { d: "S", state: "future" },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    height: 56,
                    borderRadius: 12,
                    background:
                      s.state === "done"
                        ? t.c.yellowSoft
                        : s.state === "today"
                          ? t.c.primarySoft
                          : t.c.surface2,
                    border:
                      s.state === "today"
                        ? `2px dashed ${t.c.primary}`
                        : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {s.state === "done" ? "🔥" : s.state === "today" ? "⏱" : "·"}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: t.c.textMute,
                    marginTop: 6,
                    fontWeight: 500,
                  }}
                >
                  {s.d}
                </div>
              </div>
            ))}
          </div>
        </MobileCard>

        {/* Badges */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>Badges earned</span>
            <span style={{ fontSize: 11, color: t.c.textMute }}>4 of 12</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {[
              { emoji: "🌱", name: "First Day", earned: true },
              { emoji: "🪴", name: "3-Day Steady", earned: true },
              { emoji: "🌿", name: "Weekend Calm", earned: true },
              { emoji: "📚", name: "Study First", earned: true },
              { emoji: "🌳", name: "5-Day Streak", earned: false },
              { emoji: "🦉", name: "Night Owl Off", earned: false },
            ].map((b) => (
              <div
                key={b.name}
                style={{
                  textAlign: "center",
                  opacity: b.earned ? 1 : 0.4,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    margin: "0 auto",
                    borderRadius: 18,
                    background: b.earned ? t.c.primarySoft : t.c.surface2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 30,
                    border: b.earned
                      ? `2px solid ${t.c.primary}`
                      : `2px dashed ${t.c.border}`,
                  }}
                >
                  {b.emoji}
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 600, marginTop: 6 }}>
                  {b.name}
                </div>
              </div>
            ))}
          </div>
        </MobileCard>

        {/* Personal best */}
        <MobileCard pad={14}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
            Personal bests
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                icon: "trophy",
                label: "Longest streak",
                value: "8 days",
                sub: "Jan 14 – 22",
                col: t.c.warn,
              },
              {
                icon: "leaf",
                label: "Quietest week",
                value: "12h 04m",
                sub: "Feb 5 – 11",
                col: t.c.primary,
              },
              {
                icon: "flame",
                label: "Best Duolingo",
                value: "42 lessons",
                sub: "This month",
                col: t.c.accent,
              },
            ].map((b) => (
              <div
                key={b.label}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: b.col + "22",
                    color: b.col,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name={b.icon} size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: t.c.textMute,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: ".05em",
                    }}
                  >
                    {b.label}
                  </div>
                  <div
                    style={{
                      fontFamily: t.fontMono,
                      fontSize: 17,
                      fontWeight: 500,
                      letterSpacing: "-.02em",
                      marginTop: 2,
                    }}
                  >
                    {b.value}
                  </div>
                </div>
                <span style={{ fontSize: 11, color: t.c.textMute }}>
                  {b.sub}
                </span>
              </div>
            ))}
          </div>
        </MobileCard>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}
window.MobChildStreak = MobChildStreak;

// ───────────────────────────────────────────────────────────────
// CHILD TAB 4: Ask — request more time
// ───────────────────────────────────────────────────────────────

function MobChildAsk({ android = false }) {
  const t = useTokens();
  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={childTabs} active="ask" />}
    >
      <MobileHeader
        title="Ask for more time"
        subtitle="Pick an app and tell your parent why. They'll see it on their phone."
      />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* App picker */}
        <MobileCard>
          <div
            style={{
              fontSize: 11,
              color: t.c.textMute,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".05em",
              marginBottom: 10,
            }}
          >
            App
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 10,
              borderRadius: 12,
              border: `2px solid ${t.c.primary}`,
              background: t.c.primarySoft,
            }}
          >
            <AppTile app={{ name: "Roblox", color: "#E2231A" }} size={42} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Roblox</div>
              <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 1 }}>
                Hit 51 of 60m limit today
              </div>
            </div>
            <Icon name="check" size={18} color={t.c.primary} />
          </div>
        </MobileCard>

        {/* Amount */}
        <MobileCard>
          <div
            style={{
              fontSize: 11,
              color: t.c.textMute,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".05em",
              marginBottom: 10,
            }}
          >
            How much extra?
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            {[
              { mins: 15, sel: false },
              { mins: 30, sel: true },
              { mins: 45, sel: false },
            ].map((o) => (
              <button
                key={o.mins}
                style={{
                  background: o.sel ? t.c.primary : t.c.surface,
                  color: o.sel ? "white" : t.c.text,
                  border: o.sel ? "none" : `1px solid ${t.c.border}`,
                  borderRadius: 12,
                  padding: "14px 0",
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                +{o.mins}m
              </button>
            ))}
          </div>
        </MobileCard>

        {/* Reason */}
        <MobileCard>
          <div
            style={{
              fontSize: 11,
              color: t.c.textMute,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".05em",
              marginBottom: 10,
            }}
          >
            Reason (your parent will see)
          </div>
          <div
            style={{
              border: `1px solid ${t.c.border}`,
              borderRadius: 12,
              padding: 12,
              minHeight: 80,
              fontSize: 13,
              color: t.c.text,
              lineHeight: 1.5,
            }}
          >
            My friends and I are finishing a build together — should only take
            like 20 more minutes!
            <span
              style={{
                display: "inline-block",
                width: 1.5,
                height: 14,
                background: t.c.primary,
                verticalAlign: "text-bottom",
                marginLeft: 2,
                animation: "blink 1s steps(1) infinite",
              }}
            />
          </div>
          <div
            style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}
          >
            {[
              "Homework done",
              "With friends",
              "Special occasion",
              "Almost finished",
            ].map((s) => (
              <Chip key={s} bg={t.c.surface2} style={{ cursor: "pointer" }}>
                {s}
              </Chip>
            ))}
          </div>
        </MobileCard>

        {/* Previous requests */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
            Recent requests
          </div>
          {[
            {
              app: "Discord",
              amt: 30,
              status: "pending",
              color: "#5865F2",
              when: "Just now",
            },
            {
              app: "Roblox",
              amt: 30,
              status: "approved",
              color: "#E2231A",
              when: "Yesterday",
            },
            {
              app: "YouTube Kids",
              amt: 15,
              status: "declined",
              color: "#FF4444",
              when: "2 days ago",
            },
          ].map((r, i, arr) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 0",
                borderBottom:
                  i < arr.length - 1 ? `1px solid ${t.c.border}` : "none",
              }}
            >
              <AppTile
                app={{ name: r.app, color: r.color }}
                size={32}
                radius={9}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>
                  +{r.amt}m on {r.app}
                </div>
                <div
                  style={{ fontSize: 11, color: t.c.textMute, marginTop: 1 }}
                >
                  {r.when}
                </div>
              </div>
              {r.status === "pending" && (
                <Chip
                  bg={t.c.yellowSoft}
                  color={t.c.yellowText}
                  style={{ fontSize: 10 }}
                >
                  Pending
                </Chip>
              )}
              {r.status === "approved" && (
                <Chip
                  bg={t.c.primarySoft}
                  color={t.c.primary}
                  style={{ fontSize: 10 }}
                >
                  ✓ Approved
                </Chip>
              )}
              {r.status === "declined" && (
                <Chip
                  bg={t.c.dangerSoft}
                  color={t.c.danger}
                  style={{ fontSize: 10 }}
                >
                  Declined
                </Chip>
              )}
            </div>
          ))}
        </MobileCard>

        {/* Send button */}
        <button
          style={{
            background: t.c.primary,
            color: "white",
            border: "none",
            borderRadius: 14,
            padding: "16px 0",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(40,30,20,.1)",
          }}
        >
          Send to Mom
        </button>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}
window.MobChildAsk = MobChildAsk;

// ───────────────────────────────────────────────────────────────
// CHILD: Locked-app overlay
// ───────────────────────────────────────────────────────────────

function MobChildLocked({ android = false }) {
  const t = useTokens();
  return (
    <MobileScreen
      android={android}
      bg={`linear-gradient(180deg, ${t.c.bg} 0%, ${t.c.primarySoft} 100%)`}
      scroll={true}
    >
      <div
        style={{
          padding: "12px 28px 28px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              background: t.c.surface2,
              border: `1px solid ${t.c.border}`,
              borderRadius: 10,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 600,
              color: t.c.text,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* Soft lock icon */}
          <div
            style={{
              width: 132,
              height: 132,
              margin: "0 auto",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: t.c.surface,
                boxShadow: t.dark ? "none" : "0 10px 40px rgba(40,30,20,.08)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 22,
                borderRadius: "50%",
                background: t.c.primarySoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="lock" size={42} color={t.c.primary} stroke={1.5} />
            </div>
          </div>

          <div
            style={{
              fontFamily: t.fontSerif,
              fontSize: 30,
              fontWeight: 500,
              letterSpacing: "-.02em",
              lineHeight: 1.15,
              marginTop: 28,
            }}
          >
            Time's up on TikTok.
          </div>
          <div
            style={{
              fontSize: 14,
              color: t.c.textMute,
              marginTop: 12,
              lineHeight: 1.5,
              maxWidth: 300,
              margin: "12px auto 0",
            }}
          >
            You used your full <b>60-minute</b> daily limit. It opens again at
            midnight — no override, that's the deal.
          </div>

          {/* Time-until card */}
          <div
            style={{
              marginTop: 24,
              background: t.c.surface,
              borderRadius: 18,
              padding: 18,
              border: `1px solid ${t.c.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "left",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: t.c.textMute,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                Opens again in
              </div>
              <div
                style={{
                  fontFamily: t.fontMono,
                  fontSize: 26,
                  fontWeight: 500,
                  letterSpacing: "-.02em",
                  marginTop: 4,
                }}
              >
                7h 23m
              </div>
            </div>
            <Icon name="clock" size={32} color={t.c.primary} stroke={1.5} />
          </div>

          {/* Suggestions */}
          <div
            style={{
              marginTop: 16,
              background: t.c.yellowSoft,
              borderRadius: 14,
              padding: 14,
              fontSize: 12.5,
              color: t.c.yellowText,
              lineHeight: 1.5,
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <Icon name="sparkles" size={15} />
              <b>Try this instead</b>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                paddingLeft: 22,
              }}
            >
              <div>• A short Duolingo lesson (extends your streak!)</div>
              <div>• Listen to music or a podcast</div>
              <div>• Message a friend on iMessage</div>
              <div>• Step outside — it's nice today</div>
            </div>
          </div>
        </div>

        <button
          style={{
            background: "transparent",
            color: t.c.textMute,
            border: "none",
            fontSize: 13,
            padding: 12,
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          Ask a parent for more time
        </button>
      </div>
    </MobileScreen>
  );
}
window.MobChildLocked = MobChildLocked;
window.childTabs = childTabs;

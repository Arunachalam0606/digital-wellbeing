// Personal mobile screens — Today, Apps, Reports, Focus mode, App detail

const personalTabs = [
  { id: "today", label: "Today", icon: "home" },
  { id: "apps", label: "Apps", icon: "grid" },
  { id: "reports", label: "Reports", icon: "chart" },
  { id: "focus", label: "Focus", icon: "leaf" },
];

// ───────────────────────────────────────────────────────────────
// PERSONAL TAB 1: Today
// ───────────────────────────────────────────────────────────────

function MobPersonalToday({ android = false }) {
  const t = useTokens();
  const u = APP_DATA.personal;
  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={personalTabs} active="today" />}
    >
      <MobileHeader
        eyebrow="Personal · Thursday"
        title="Less screen. More you."
        action={<Avatar name="Alex" size={34} color={t.c.accent} />}
      />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Big ring */}
        <MobileCard
          pad={24}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Ring
            value={u.todayMinutes}
            max={u.todayGoal}
            size={180}
            stroke={14}
            color={t.c.primary}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 11,
                  color: t.c.textMute,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                Today
              </div>
              <div
                style={{
                  fontFamily: t.fontMono,
                  fontSize: 34,
                  fontWeight: 500,
                  letterSpacing: "-.02em",
                  lineHeight: 1,
                  marginTop: 6,
                }}
              >
                {fmtTime(u.todayMinutes)}
              </div>
              <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 6 }}>
                of {fmtTime(u.todayGoal)}
              </div>
            </div>
          </Ring>
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 18,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Chip bg={t.c.yellowSoft} color={t.c.yellowText}>
              🔥 11-day streak
            </Chip>
            <Chip bg={t.c.primarySoft} color={t.c.primary}>
              <Icon name="trendDown" size={11} /> 23% wk/wk
            </Chip>
          </div>
          <div
            style={{
              fontFamily: t.fontSerif,
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: "-.02em",
              textAlign: "center",
              marginTop: 16,
              lineHeight: 1.35,
              padding: "0 8px",
            }}
          >
            "If you stop now, you'll close the week 8 hours under goal — your
            best result this quarter."
          </div>
          <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 8 }}>
            — Coach
          </div>
        </MobileCard>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 8 }}>
          <StatTile
            label="Pickups"
            value="72"
            sublabel="-22 vs yest."
            icon="phone"
          />
          <StatTile
            label="Notifs"
            value="104"
            sublabel="-31 vs yest."
            icon="bell"
          />
          <StatTile
            label="Focused"
            value="3h 12m"
            sublabel="3 sessions"
            icon="leaf"
            color={t.c.primary}
          />
        </div>

        {/* Goals card */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>Your goals</span>
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
              + Add
            </button>
          </div>
          <GoalRow label="Daily" current={u.todayMinutes} goal={u.todayGoal} />
          <div style={{ height: 14 }} />
          <GoalRow label="Weekly" current={u.weekMinutes} goal={u.weekGoal} />
          <div style={{ height: 14 }} />
          <GoalRow label="Social — daily" current={32} goal={30} />
        </MobileCard>

        {/* Weekly chart */}
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
            <span style={{ fontSize: 11, color: t.c.textMute }}>5h goal</span>
          </div>
          <MobileWeeklyBars
            data={APP_DATA.weeklyHours.personal}
            goal={5}
            height={110}
          />
        </MobileCard>

        {/* Top apps */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>
              Top apps today
            </span>
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
          {u.topApps.slice(0, 5).map((a, i) => (
            <MobileAppRow key={a.name} app={a} last={i === 4} />
          ))}
        </MobileCard>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}
window.MobPersonalToday = MobPersonalToday;

// ───────────────────────────────────────────────────────────────
// PERSONAL TAB 3: Reports — bigger view
// ───────────────────────────────────────────────────────────────

function MobPersonalReports({ android = false }) {
  const t = useTokens();
  const u = APP_DATA.personal;
  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={personalTabs} active="reports" />}
    >
      <MobileHeader
        title="Reports"
        subtitle="Trends, heatmaps, comparisons — this week."
      />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Period */}
        <div
          style={{
            display: "flex",
            gap: 4,
            padding: 4,
            background: t.c.surface2,
            borderRadius: 12,
          }}
        >
          {["Day", "Week", "Month", "Year"].map((s, i) => (
            <div
              key={s}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "7px 0",
                background: i === 1 ? t.c.surface : "transparent",
                color: i === 1 ? t.c.text : t.c.textMute,
                fontSize: 12,
                fontWeight: i === 1 ? 600 : 500,
                borderRadius: 8,
                boxShadow: i === 1 ? "0 1px 2px rgba(0,0,0,.06)" : "none",
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Trend line: this week vs last week */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>
              Hours · this week vs. last
            </span>
            <Chip
              bg={t.c.primarySoft}
              color={t.c.primary}
              style={{ fontSize: 10 }}
            >
              ↓ 23%
            </Chip>
          </div>
          <MobileTrendLine
            thisWeek={APP_DATA.weeklyHours.personal}
            lastWeek={APP_DATA.weeklyHours.lastWeek.personal}
            goal={5}
            height={130}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
              fontSize: 10.5,
              color: t.c.textMute,
            }}
          >
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span
                key={i}
                style={{
                  fontWeight: i === 4 ? 700 : 400,
                  color: i === 4 ? t.c.text : t.c.textMute,
                }}
              >
                {d}
              </span>
            ))}
          </div>
          <div
            style={{ display: "flex", gap: 14, marginTop: 10, fontSize: 10.5 }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span
                style={{
                  width: 12,
                  height: 2,
                  background: t.c.primary,
                  borderRadius: 1,
                }}
              />
              This week
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span
                style={{
                  width: 12,
                  height: 2,
                  background: t.c.textMute,
                  opacity: 0.5,
                  borderRadius: 1,
                }}
              />
              Last week
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginLeft: "auto",
              }}
            >
              <span
                style={{ width: 14, borderTop: `1.5px dashed ${t.c.accent}` }}
              />
              5h goal
            </span>
          </div>
        </MobileCard>

        {/* Category donut */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
            By category
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <MobileDonut
              data={u.categories}
              size={130}
              stroke={18}
              centerLabel="this week"
              centerValue={fmtTime(u.weekMinutes)}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {Object.entries(u.categories)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 4)
                .map(([cat, m]) => (
                  <div
                    key={cat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 11.5,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: APP_DATA.categoryColors[cat],
                      }}
                    />
                    <span style={{ flex: 1 }}>{cat}</span>
                    <span
                      style={{
                        fontFamily: t.fontMono,
                        fontSize: 11,
                        color: t.c.textMute,
                      }}
                    >
                      {fmtTime(m)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </MobileCard>

        {/* Pickups */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>
              When you picked up your phone
            </span>
            <span
              style={{
                fontFamily: t.fontMono,
                fontSize: 11,
                color: t.c.textMute,
              }}
            >
              72×
            </span>
          </div>
          <MobilePickupChart
            data={APP_DATA.pickupHours.personal}
            height={100}
          />
          <div
            style={{
              marginTop: 12,
              padding: 10,
              borderRadius: 10,
              background: t.c.surface2,
              fontSize: 11.5,
              color: t.c.textMute,
              lineHeight: 1.4,
            }}
          >
            Most pickups at <b style={{ color: t.c.text }}>5 PM</b> — try a
            30-min wind-down window.
          </div>
        </MobileCard>

        {/* Notification heatmap */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>
              Notifications · 7d × 24h
            </span>
            <span style={{ fontSize: 11, color: t.c.textMute }}>
              Darker = more
            </span>
          </div>
          <MobileNotifHeatmap data={APP_DATA.notifHeatmap} />
        </MobileCard>

        {/* Trophy */}
        <MobileCard pad={14} bg={t.c.primarySoft} border={false}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "white",
                color: t.c.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="trophy" size={20} />
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
                Best week this quarter
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 3 }}>
                You reclaimed <b style={{ fontFamily: t.fontMono }}>4h 12m</b>{" "}
                compared to last week.
              </div>
            </div>
          </div>
        </MobileCard>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}
window.MobPersonalReports = MobPersonalReports;

// ───────────────────────────────────────────────────────────────
// PERSONAL TAB 4: Focus
// ───────────────────────────────────────────────────────────────

function MobPersonalFocus({ android = false }) {
  const t = useTokens();
  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={personalTabs} active="focus" />}
    >
      <MobileHeader
        eyebrow="Wind down"
        title="Focus mode"
        subtitle="Mute distractions for a stretch of work or rest."
      />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Big start */}
        <MobileCard
          pad={22}
          bg={t.c.primarySoft}
          border={false}
          style={{ textAlign: "center" }}
        >
          <div
            style={{
              fontSize: 11.5,
              color: t.c.primary,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".06em",
            }}
          >
            Start a session
          </div>
          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: t.fontMono,
                fontSize: 64,
                fontWeight: 500,
                letterSpacing: "-.04em",
                color: t.c.primary,
                lineHeight: 1,
              }}
            >
              45
            </span>
            <span style={{ fontSize: 22, color: t.c.primary, fontWeight: 600 }}>
              min
            </span>
          </div>
          {/* +/- slider */}
          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(255,255,255,.6)",
                border: "none",
                color: t.c.primary,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="minus" size={20} />
            </button>
            <div
              style={{
                flex: 1,
                maxWidth: 200,
                height: 6,
                background: "rgba(0,0,0,.06)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "45%",
                  background: t.c.primary,
                  borderRadius: 3,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "calc(45% - 10px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "white",
                  boxShadow: "0 2px 6px rgba(0,0,0,.15)",
                }}
              />
            </div>
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(255,255,255,.6)",
                border: "none",
                color: t.c.primary,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="plus" size={20} />
            </button>
          </div>
          <button
            style={{
              marginTop: 20,
              background: t.c.primary,
              color: "white",
              border: "none",
              borderRadius: 14,
              padding: "14px 40px",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(40,30,20,.12)",
            }}
          >
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Icon name="play" size={14} /> Start focus
            </span>
          </button>
        </MobileCard>

        {/* Quick presets */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
            Quick presets
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            {[
              { name: "Deep work", mins: 90, icon: "leaf", col: t.c.primary },
              { name: "Sprint", mins: 25, icon: "flame", col: t.c.accent },
              { name: "Reading", mins: 30, icon: "lightbulb", col: t.c.warn },
              { name: "Bedtime", mins: 480, icon: "lock", col: t.c.lavText },
            ].map((p) => (
              <button
                key={p.name}
                style={{
                  background: t.c.surface,
                  border: `1px solid ${t.c.border}`,
                  borderRadius: 12,
                  padding: 12,
                  color: t.c.text,
                  textAlign: "left",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: p.col + "22",
                    color: p.col,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name={p.icon} size={14} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: t.c.textMute,
                      marginTop: 1,
                    }}
                  >
                    {p.mins >= 60
                      ? `${(p.mins / 60).toFixed(0)}h`
                      : `${p.mins}m`}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </MobileCard>

        {/* Allowlist */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>
              Always allowed
            </span>
            <span style={{ fontSize: 11, color: t.c.textMute }}>5 apps</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              { name: "Phone", color: "#5BC236" },
              { name: "Messages", color: "#5BC236" },
              { name: "Maps", color: "#1F8AFF" },
              { name: "Music", color: "#FA243C" },
              { name: "Notes", color: "#F4D374" },
            ].map((a) => (
              <div
                key={a.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: t.c.surface2,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: a.color,
                  }}
                />
                {a.name}
              </div>
            ))}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "6px 10px",
                borderRadius: 999,
                background: t.c.surface,
                border: `1px dashed ${t.c.border}`,
                fontSize: 12,
                color: t.c.textMute,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              <Icon name="plus" size={11} /> Add
            </button>
          </div>
        </MobileCard>

        {/* Today's sessions */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
            Today's focus sessions
          </div>
          {[
            {
              name: "Morning deep work",
              when: "9:00 – 10:30 AM",
              mins: 90,
              status: "done",
            },
            {
              name: "Sprint after lunch",
              when: "1:00 – 1:50 PM",
              mins: 50,
              status: "done",
            },
            {
              name: "Afternoon review",
              when: "3:00 PM",
              mins: 52,
              status: "now",
            },
          ].map((s, i, arr) => (
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
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  background:
                    s.status === "now" ? t.c.primary : t.c.primarySoft,
                  color: s.status === "now" ? "white" : t.c.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={s.status === "now" ? "play" : "check"} size={13} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                <div
                  style={{ fontSize: 11, color: t.c.textMute, marginTop: 1 }}
                >
                  {s.when}
                </div>
              </div>
              <div
                style={{
                  fontFamily: t.fontMono,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {s.mins}m
              </div>
            </div>
          ))}
        </MobileCard>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}
window.MobPersonalFocus = MobPersonalFocus;

// ───────────────────────────────────────────────────────────────
// App detail — drill into a single app
// ───────────────────────────────────────────────────────────────

function MobAppDetail({ android = false }) {
  const t = useTokens();
  const a = APP_DATA.kids[0].topApps[1]; // Roblox

  return (
    <MobileScreen android={android}>
      <MobileHeader
        back="Apps"
        title=""
        action={
          <button
            style={{
              background: "transparent",
              border: "none",
              color: t.c.text,
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "inherit",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Icon name="more" size={18} />
          </button>
        }
      />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* App header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "4px 0 14px",
          }}
        >
          <AppTile app={a} size={68} radius={17} />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 26,
                fontWeight: 500,
                letterSpacing: "-.02em",
                lineHeight: 1.05,
              }}
            >
              {a.name}
            </div>
            <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 4 }}>
              {a.cat} · iPhone · maya@
            </div>
          </div>
        </div>

        {/* Today summary */}
        <MobileCard pad={18}>
          <div
            style={{
              fontSize: 11,
              color: t.c.textMute,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".06em",
            }}
          >
            Today
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              marginTop: 6,
            }}
          >
            <span
              style={{
                fontFamily: t.fontMono,
                fontSize: 38,
                fontWeight: 500,
                letterSpacing: "-.03em",
                lineHeight: 1,
              }}
            >
              {fmtTime(a.mins)}
            </span>
            <Chip bg={t.c.warnSoft} color={t.c.warn}>
              85% of {fmtTime(a.limit)}
            </Chip>
          </div>
          <div
            style={{
              marginTop: 12,
              height: 7,
              background: t.c.surface2,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: (a.mins / a.limit) * 100 + "%",
                height: "100%",
                background: t.c.warn,
                borderRadius: 4,
              }}
            />
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 11.5,
              color: t.c.textMute,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              <span
                style={{
                  fontFamily: t.fontMono,
                  color: t.c.text,
                  fontWeight: 600,
                }}
              >
                {fmtTime(a.limit - a.mins)}
              </span>{" "}
              left
            </span>
            <span>Locks at midnight if hit</span>
          </div>
        </MobileCard>

        {/* Stats */}
        <div style={{ display: "flex", gap: 8 }}>
          <StatTile
            label="Pickups"
            value={a.pickups.toString()}
            sublabel="today"
            icon="phone"
          />
          <StatTile
            label="Notifs"
            value={a.notifs.toString()}
            sublabel="today"
            icon="bell"
          />
          <StatTile label="Sessions" value="6" sublabel="avg 8m" icon="clock" />
        </div>

        {/* This week */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>Last 7 days</span>
            <Chip bg={t.c.warnSoft} color={t.c.warn} style={{ fontSize: 10 }}>
              Trending up
            </Chip>
          </div>
          <MobileWeeklyBars
            data={[42, 48, 38, 56, 51, null, null]}
            goal={a.limit}
            height={110}
            todayIndex={4}
            color={t.c.warn}
            accent={t.c.danger}
          />
        </MobileCard>

        {/* Pickup by hour */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
            When it's used
          </div>
          <MobilePickupChart
            data={[
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 4, 8, 12, 6, 3, 1, 0, 0,
              0, 0,
            ]}
            accentRange={[15, 17]}
            height={80}
          />
          <div style={{ marginTop: 8, fontSize: 11.5, color: t.c.textMute }}>
            Mostly between <b style={{ color: t.c.text }}>3 PM and 5 PM</b> —
            after school.
          </div>
        </MobileCard>

        {/* Limit controls */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>Daily limit</span>
            <span
              style={{
                fontFamily: t.fontMono,
                fontSize: 14,
                fontWeight: 500,
                color: t.c.primary,
              }}
            >
              {fmtTime(a.limit)}
            </span>
          </div>
          <SliderTrack pct={a.mins / a.limit} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: t.c.textMute,
              marginTop: 6,
            }}
          >
            <span>15m</span>
            <span>30m</span>
            <span>1h</span>
            <span>2h</span>
            <span>4h</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
              paddingTop: 14,
              borderTop: `1px solid ${t.c.border}`,
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                Lock when limit hit
              </div>
              <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 1 }}>
                No override allowed
              </div>
            </div>
            <Toggle on />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 14,
              paddingTop: 14,
              borderTop: `1px solid ${t.c.border}`,
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                Hide notifications
              </div>
              <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 1 }}>
                Mute Roblox during focus
              </div>
            </div>
            <Toggle on={false} />
          </div>
        </MobileCard>

        <div style={{ height: 16 }} />
      </div>
    </MobileScreen>
  );
}
window.MobAppDetail = MobAppDetail;
window.personalTabs = personalTabs;

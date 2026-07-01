// Parent mobile screens — Family, Me (own wellbeing), Reports, Shield, Schedules,
// Kid drill-down, Notification log, Onboarding

const { useState, useEffect, useMemo, useRef } = React;

// ───────────────────────────────────────────────────────────────
// TAB 1: Family — kids overview
// ───────────────────────────────────────────────────────────────

function MobParentFamily({ android = false }) {
  const t = useTokens();
  const D = APP_DATA;
  const totalToday = D.kids.reduce((a, k) => a + k.todayMinutes, 0);
  const totalNotifs = D.kids.reduce(
    (a, k) => a + k.topApps.reduce((b, x) => b + x.notifs, 0),
    0,
  );

  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={parentTabs} active="family" />}
      fab={<FAB icon="plus" />}
    >
      <MobileHeader
        eyebrow="Family"
        title="Hi, Sarah"
        subtitle="Thursday, April 16 — Maya is under budget, Jaden is over."
        action={<Avatar name="Sarah" size={34} color={t.c.primary} />}
      />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Family hero card */}
        <MobileCard pad={16} bg={t.c.primarySoft} border={false}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10.5,
                  color: t.c.primary,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                Family screen time today
              </div>
              <div
                style={{
                  fontFamily: t.fontMono,
                  fontSize: 34,
                  fontWeight: 500,
                  letterSpacing: "-.03em",
                  color: t.c.text,
                  lineHeight: 1,
                  marginTop: 6,
                }}
              >
                {fmtTime(totalToday)}
              </div>
            </div>
            <Chip bg="rgba(255,255,255,.6)" color={t.c.primary}>
              <Icon name="trendDown" size={11} /> 18%
            </Chip>
          </div>
          {/* Stacked split by kid */}
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                display: "flex",
                gap: 3,
                height: 8,
                borderRadius: 4,
                overflow: "hidden",
                background: "rgba(0,0,0,.06)",
              }}
            >
              {D.kids.map((k) => (
                <div
                  key={k.id}
                  style={{
                    flex: k.todayMinutes,
                    background: k.status === "over" ? t.c.danger : t.c.primary,
                    opacity: k.status === "over" ? 1 : 0.7,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
                fontSize: 11,
              }}
            >
              {D.kids.map((k) => (
                <span
                  key={k.id}
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 2,
                      background:
                        k.status === "over" ? t.c.danger : t.c.primary,
                      opacity: k.status === "over" ? 1 : 0.7,
                    }}
                  />
                  {k.name}{" "}
                  <span style={{ fontFamily: t.fontMono, color: t.c.textMute }}>
                    {fmtTime(k.todayMinutes)}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </MobileCard>

        {/* Coach insight */}
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
                Family time dropped <b>14%</b> this week. Notifications on
                Jaden's phone are still high in the evening — try a 9pm quiet
                schedule.
              </div>
              <button
                style={{
                  marginTop: 10,
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  color: t.c.primary,
                  fontSize: 12.5,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  cursor: "pointer",
                }}
              >
                Create schedule <Icon name="arrowRight" size={13} />
              </button>
            </div>
          </div>
        </MobileCard>

        {/* Pending request */}
        <MobileCard pad={14} bg={t.c.yellowSoft} border={false}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 10.5,
              color: t.c.yellowText,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".06em",
            }}
          >
            <Icon name="alert" size={12} /> Needs you
          </div>
          <div
            style={{
              fontSize: 13.5,
              marginTop: 6,
              lineHeight: 1.4,
              color: t.c.text,
            }}
          >
            <b>Jaden</b> requested 30 more minutes on Discord.
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              style={{
                flex: 1,
                background: t.c.primary,
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "10px 0",
                fontWeight: 600,
                fontSize: 13,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              Approve 30m
            </button>
            <button
              style={{
                flex: 1,
                background: t.c.surface,
                color: t.c.text,
                border: `1px solid ${t.c.border}`,
                borderRadius: 10,
                padding: "10px 0",
                fontWeight: 600,
                fontSize: 13,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              Decline
            </button>
          </div>
        </MobileCard>

        {/* Kids list */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginTop: 6,
          }}
        >
          <div
            style={{
              fontFamily: t.fontSerif,
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: "-.01em",
            }}
          >
            Your kids
          </div>
          <button
            style={{
              background: "transparent",
              border: "none",
              color: t.c.primary,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        {D.kids.map((k) => (
          <KidMobileCard key={k.id} kid={k} />
        ))}

        {/* Quick links to other parent tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginTop: 6,
          }}
        >
          <QuickLink
            icon="shieldCheck"
            label="Ads blocked"
            value={D.adBlocker.blockedToday.toLocaleString()}
            sub="today · all devices"
            color={t.c.primary}
          />
          <QuickLink
            icon="bell"
            label="Notifications"
            value={totalNotifs.toString()}
            sub="family · today"
            color={t.c.lavender}
          />
          <QuickLink
            icon="calendar"
            label="Schedules"
            value="2 active"
            sub="Schoolday + Weekend"
            color={t.c.blue}
          />
          <QuickLink
            icon="trophy"
            label="Achievements"
            value="3 this week"
            sub="Maya: 3 streaks"
            color={t.c.warn}
          />
        </div>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}

function KidMobileCard({ kid }) {
  const t = useTokens();
  const over = kid.status === "over";
  return (
    <MobileCard pad={0}>
      <div
        style={{ padding: 14, display: "flex", alignItems: "center", gap: 14 }}
      >
        <Ring
          value={kid.todayMinutes}
          max={kid.todayGoal}
          size={64}
          stroke={6}
          color={over ? t.c.danger : t.c.primary}
        >
          <Avatar name={kid.name} color={kid.avatar} size={42} />
        </Ring>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: "-.01em",
              }}
            >
              {kid.name}
            </div>
            <span style={{ fontSize: 11.5, color: t.c.textMute }}>
              age {kid.age}
            </span>
          </div>
          <div
            style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}
          >
            {over ? (
              <Chip
                bg={t.c.dangerSoft}
                color={t.c.danger}
                style={{ fontSize: 10 }}
              >
                ● Over by {fmtTime(kid.todayMinutes - kid.todayGoal)}
              </Chip>
            ) : (
              <Chip
                bg={t.c.primarySoft}
                color={t.c.primary}
                style={{ fontSize: 10 }}
              >
                ● {fmtTime(kid.todayGoal - kid.todayMinutes)} left
              </Chip>
            )}
            {kid.streak > 0 && (
              <Chip
                bg={t.c.yellowSoft}
                color={t.c.yellowText}
                style={{ fontSize: 10 }}
              >
                🔥 {kid.streak}d
              </Chip>
            )}
          </div>
        </div>
        <Icon name="arrowRight" size={16} color={t.c.textMute} />
      </div>
      {/* Mini app strip */}
      <div
        style={{
          borderTop: `1px solid ${t.c.border}`,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {kid.topApps.slice(0, 4).map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              flex: i === 0 ? 1 : "0 0 auto",
            }}
          >
            <AppTile app={a} size={22} radius={6} />
            {i === 0 && (
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {a.name}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: t.c.textMute,
                    fontFamily: t.fontMono,
                  }}
                >
                  {fmtTime(a.mins)}
                </div>
              </div>
            )}
          </div>
        ))}
        <span style={{ fontSize: 11, color: t.c.textMute }}>
          +{kid.topApps.length - 4} more
        </span>
      </div>
    </MobileCard>
  );
}

function QuickLink({ icon, label, value, sub, color }) {
  const t = useTokens();
  return (
    <div
      style={{
        background: t.c.surface,
        border: `1px solid ${t.c.border}`,
        borderRadius: 14,
        padding: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            background: (color || t.c.primary) + "22",
            color: color || t.c.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={icon} size={14} />
        </div>
        <div
          style={{
            fontSize: 10.5,
            color: t.c.textMute,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: ".05em",
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          fontFamily: t.fontMono,
          fontSize: 18,
          fontWeight: 500,
          marginTop: 8,
          letterSpacing: "-.02em",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 10.5, color: t.c.textMute, marginTop: 2 }}>
        {sub}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// TAB 2: Me — parent's OWN digital wellbeing
// ───────────────────────────────────────────────────────────────

function MobParentMe({ android = false }) {
  const t = useTokens();
  // Sarah's own usage (parent has wellbeing too)
  const me = {
    todayMinutes: 156,
    todayGoal: 240,
    weekMinutes: 1020,
    weekGoal: 1680,
    streak: 6,
    weekly: [3.2, 2.8, 3.1, 2.4, 2.6, null, null],
    lastWeek: [3.4, 3.2, 3.6, 3.1, 3.4, 2.8, 2.4],
    categories: {
      Communication: 58,
      Productivity: 42,
      Social: 28,
      Reading: 12,
      Video: 16,
    },
    pickups: [
      0, 0, 0, 0, 0, 0, 2, 8, 12, 9, 7, 5, 6, 4, 3, 5, 8, 11, 9, 7, 5, 3, 2, 1,
    ],
    apps: [
      {
        name: "Slack",
        cat: "Communication",
        mins: 38,
        limit: null,
        color: "#4A154B",
        pickups: 18,
        notifs: 24,
      },
      {
        name: "Mail",
        cat: "Communication",
        mins: 20,
        limit: null,
        color: "#0064D2",
        pickups: 9,
        notifs: 14,
      },
      {
        name: "Instagram",
        cat: "Social",
        mins: 22,
        limit: 30,
        color: "#E1306C",
        pickups: 8,
        notifs: 9,
      },
      {
        name: "Safari",
        cat: "Productivity",
        mins: 32,
        limit: null,
        color: "#1F8AFF",
        pickups: 12,
        notifs: 0,
      },
      {
        name: "YouTube",
        cat: "Video",
        mins: 16,
        limit: null,
        color: "#FF0000",
        pickups: 4,
        notifs: 2,
      },
      {
        name: "NYT",
        cat: "Reading",
        mins: 12,
        limit: null,
        color: "#000000",
        pickups: 3,
        notifs: 1,
      },
    ],
  };

  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={parentTabs} active="me" />}
    >
      <MobileHeader
        eyebrow="Just for you"
        title="Today, well-spent."
        subtitle="Your screen time — separate from the kids' world."
        action={<Avatar name="Sarah" size={34} color={t.c.primary} />}
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
          pad={20}
          style={{ display: "flex", alignItems: "center", gap: 18 }}
        >
          <Ring
            value={me.todayMinutes}
            max={me.todayGoal}
            size={120}
            stroke={11}
            color={t.c.primary}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: t.fontMono,
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: "-.02em",
                  lineHeight: 1,
                }}
              >
                {fmtTime(me.todayMinutes)}
              </div>
              <div style={{ fontSize: 10, color: t.c.textMute, marginTop: 4 }}>
                of {fmtTime(me.todayGoal)}
              </div>
            </div>
          </Ring>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: "-.02em",
                lineHeight: 1.2,
              }}
            >
              <span style={{ color: t.c.primary }}>1h 24m</span> under today's
              budget.
            </div>
            <div
              style={{
                display: "flex",
                gap: 6,
                marginTop: 10,
                flexWrap: "wrap",
              }}
            >
              <Chip
                bg={t.c.yellowSoft}
                color={t.c.yellowText}
                style={{ fontSize: 10 }}
              >
                🔥 6 days
              </Chip>
              <Chip
                bg={t.c.primarySoft}
                color={t.c.primary}
                style={{ fontSize: 10 }}
              >
                ↓ 23% wk
              </Chip>
            </div>
          </div>
        </MobileCard>

        {/* This week vs last week trend */}
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
              This week vs. last
            </span>
            <span style={{ fontSize: 11, color: t.c.textMute }}>4h goal</span>
          </div>
          <MobileTrendLine
            thisWeek={me.weekly}
            lastWeek={me.lastWeek}
            goal={4}
            height={110}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
              fontSize: 10,
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
          </div>
        </MobileCard>

        {/* Today by category */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
            Today by category
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <MobileDonut
              data={me.categories}
              size={130}
              stroke={18}
              centerLabel="today"
              centerValue={fmtTime(me.todayMinutes)}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {Object.entries(me.categories)
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
                        color: t.c.textMute,
                        fontSize: 11,
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
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>
              When you picked up your phone
            </span>
            <span
              style={{
                fontFamily: t.fontMono,
                fontSize: 12,
                color: t.c.textMute,
              }}
            >
              72×
            </span>
          </div>
          <MobilePickupChart data={me.pickups} height={90} />
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
            Most pickups happen at <b style={{ color: t.c.text }}>9am</b> and{" "}
            <b style={{ color: t.c.text }}>5pm</b>.
          </div>
        </MobileCard>

        {/* My apps */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>My apps today</span>
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
          {me.apps.slice(0, 5).map((a, i) => (
            <MobileAppRow key={a.name} app={a} last={i === 4} />
          ))}
        </MobileCard>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}
window.MobParentMe = MobParentMe;
window.MobParentFamily = MobParentFamily;

// ───────────────────────────────────────────────────────────────
// TAB 3: Reports — both kids + family + parent
// ───────────────────────────────────────────────────────────────

function MobParentReports({ android = false }) {
  const t = useTokens();
  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={parentTabs} active="reports" />}
    >
      <MobileHeader
        eyebrow="The bigger picture"
        title="Reports"
        subtitle="This week · April 10–16"
      />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Segmented period */}
        <div
          style={{
            display: "flex",
            gap: 4,
            padding: 4,
            background: t.c.surface2,
            borderRadius: 12,
          }}
        >
          {["Week", "Month", "Year"].map((s, i) => (
            <div
              key={s}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px 0",
                background: i === 0 ? t.c.surface : "transparent",
                color: i === 0 ? t.c.text : t.c.textMute,
                fontSize: 12.5,
                fontWeight: i === 0 ? 600 : 500,
                borderRadius: 8,
                boxShadow: i === 0 ? "0 1px 2px rgba(0,0,0,.06)" : "none",
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Highlights — 4 tile grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          <Highlight2
            label="Family total"
            value="29h 14m"
            delta="-14%"
            down
            icon="users"
          />
          <Highlight2
            label="Maya"
            value="14h 20m"
            delta="-18%"
            down
            icon="user"
          />
          <Highlight2
            label="Jaden"
            value="14h 54m"
            delta="+4%"
            up
            icon="user"
          />
          <Highlight2
            label="Yours"
            value="17h 00m"
            delta="-23%"
            down
            icon="leaf"
          />
        </div>

        {/* Per-kid compare */}
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
              Maya vs. Jaden
            </span>
            <span style={{ fontSize: 11, color: t.c.textMute }}>
              Daily hours · 5h goal
            </span>
          </div>
          <PerKidCompareMini />
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
              <span key={i}>{d}</span>
            ))}
          </div>
          <div
            style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 11 }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: "#E8896F",
                }}
              />
              Maya
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: "#A8A0C8",
                }}
              />
              Jaden
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
              Goal
            </span>
          </div>
        </MobileCard>

        {/* Category stacked */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
            Category share over time
          </div>
          <StackedAreaMini />
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
              <span key={i}>{d}</span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 12,
            }}
          >
            {Object.entries({
              Social: "#E8896F",
              Video: "#D97373",
              Gaming: "#A8A0C8",
              Education: "#5C8A6B",
              Communication: "#7DA9C7",
            }).map(([cat, col]) => (
              <span
                key={cat}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 10.5,
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 2,
                    background: col,
                  }}
                />
                {cat}
              </span>
            ))}
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
              Notification heatmap
            </span>
            <span style={{ fontSize: 11, color: t.c.textMute }}>
              Family · this week
            </span>
          </div>
          <MobileNotifHeatmap data={APP_DATA.notifHeatmap} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 10,
              fontSize: 10.5,
              color: t.c.textMute,
            }}
          >
            <span>Fewer</span>
            <div style={{ display: "flex", gap: 1.5 }}>
              {[0, 0.25, 0.5, 0.75, 1].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 12,
                    height: 8,
                    borderRadius: 2,
                    background:
                      i === 0
                        ? t.c.surface2
                        : `oklch(from ${t.c.primary} ${0.95 - i * 0.4} ${0.06 + i * 0.1} h)`,
                  }}
                />
              ))}
            </div>
            <span>More</span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: t.c.text }}>
              <b>Peak: Thu 5pm</b>
            </span>
          </div>
        </MobileCard>

        {/* Top apps this week */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
            Top apps this week
          </div>
          <div style={{ fontSize: 11, color: t.c.textMute, marginBottom: 10 }}>
            Combined family hours
          </div>
          {[
            {
              name: "Snapchat",
              cat: "Social",
              mins: 410,
              limit: 420,
              color: "#FFFC00",
              pickups: 220,
              notifs: 320,
              owner: "Jaden",
            },
            {
              name: "YouTube Kids",
              cat: "Video",
              mins: 312,
              limit: 630,
              color: "#FF4444",
              pickups: 60,
              notifs: 24,
              owner: "Maya",
            },
            {
              name: "TikTok",
              cat: "Social",
              mins: 268,
              limit: 420,
              color: "#000000",
              pickups: 198,
              notifs: 224,
              owner: "Both",
            },
            {
              name: "Roblox",
              cat: "Gaming",
              mins: 240,
              limit: 420,
              color: "#E2231A",
              pickups: 50,
              notifs: 56,
              owner: "Maya",
            },
            {
              name: "Slack",
              cat: "Communication",
              mins: 234,
              limit: null,
              color: "#4A154B",
              pickups: 90,
              notifs: 122,
              owner: "You",
            },
          ].map((a, i, arr) => (
            <MobileAppRow
              key={a.name}
              app={a}
              child={a.owner}
              last={i === arr.length - 1}
              showLimit={false}
            />
          ))}
        </MobileCard>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}
window.MobParentReports = MobParentReports;

function Highlight2({ label, value, delta, up, down, icon }) {
  const t = useTokens();
  const col = down ? t.c.primary : up ? t.c.danger : t.c.text;
  const bg = down ? t.c.primarySoft : up ? t.c.dangerSoft : t.c.surface2;
  return (
    <MobileCard pad={12}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            background: bg,
            color: col,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={icon} size={13} />
        </div>
        <div
          style={{
            fontSize: 10.5,
            color: t.c.textMute,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: ".05em",
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          fontFamily: t.fontMono,
          fontSize: 20,
          fontWeight: 500,
          marginTop: 8,
          letterSpacing: "-.02em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontSize: 11,
          color: col,
          marginTop: 4,
          fontWeight: 600,
        }}
      >
        <Icon name={down ? "trendDown" : "trend"} size={11} />
        {delta}
      </div>
    </MobileCard>
  );
}

function PerKidCompareMini() {
  const t = useTokens();
  const maya = APP_DATA.weeklyHours.maya;
  const jaden = APP_DATA.weeklyHours.jaden;
  const max = Math.max(...[...maya, ...jaden].filter((v) => v != null)) * 1.2;
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
      style={{ width: "100%", height: 130, overflow: "visible" }}
    >
      <line
        x1="0"
        x2="100"
        y1={100 - (5 / max) * 100}
        y2={100 - (5 / max) * 100}
        stroke={t.c.accent}
        strokeWidth="0.8"
        strokeDasharray="2 2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={path(maya)}
        fill="none"
        stroke="#E8896F"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={path(jaden)}
        fill="none"
        stroke="#A8A0C8"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {maya.map((v, i) =>
        v == null ? null : (
          <circle
            key={"m" + i}
            cx={(i / 6) * 100}
            cy={100 - (v / max) * 100}
            r="1.4"
            fill="#E8896F"
            vectorEffect="non-scaling-stroke"
          />
        ),
      )}
      {jaden.map((v, i) =>
        v == null ? null : (
          <circle
            key={"j" + i}
            cx={(i / 6) * 100}
            cy={100 - (v / max) * 100}
            r="1.4"
            fill="#A8A0C8"
            vectorEffect="non-scaling-stroke"
          />
        ),
      )}
    </svg>
  );
}

function StackedAreaMini() {
  const t = useTokens();
  const cats = ["Education", "Communication", "Gaming", "Video", "Social"];
  const colors = {
    Education: "#5C8A6B",
    Communication: "#7DA9C7",
    Gaming: "#A8A0C8",
    Video: "#D97373",
    Social: "#E8896F",
  };
  // Pre-baked stable data
  const data = [
    {
      Education: 0.8,
      Communication: 1.2,
      Gaming: 1.4,
      Video: 2.2,
      Social: 2.6,
    },
    {
      Education: 0.6,
      Communication: 1.0,
      Gaming: 1.6,
      Video: 2.0,
      Social: 2.4,
    },
    {
      Education: 0.9,
      Communication: 1.1,
      Gaming: 1.2,
      Video: 2.4,
      Social: 2.8,
    },
    {
      Education: 0.7,
      Communication: 1.4,
      Gaming: 1.5,
      Video: 2.1,
      Social: 3.0,
    },
    {
      Education: 0.5,
      Communication: 1.2,
      Gaming: 1.3,
      Video: 2.6,
      Social: 2.7,
    },
    {
      Education: 0.6,
      Communication: 0.9,
      Gaming: 1.8,
      Video: 2.8,
      Social: 3.4,
    },
    {
      Education: 0.4,
      Communication: 0.7,
      Gaming: 2.0,
      Video: 3.0,
      Social: 3.6,
    },
  ];
  const totals = data.map((d) => cats.reduce((a, c) => a + d[c], 0));
  const max = Math.max(...totals) * 1.1;
  const layers = [];
  let accum = data.map(() => 0);
  cats.forEach((cat) => {
    const top = data.map((d, i) => accum[i] + d[cat]);
    const bot = accum.slice();
    let path = "";
    top.forEach((v, i) => {
      const x = (i / 6) * 100;
      const y = 100 - (v / max) * 100;
      path += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
    });
    for (let i = bot.length - 1; i >= 0; i--) {
      const x = (i / 6) * 100;
      const y = 100 - (bot[i] / max) * 100;
      path += "L" + x.toFixed(2) + " " + y.toFixed(2) + " ";
    }
    path += "Z";
    layers.push({ cat, path, color: colors[cat] });
    accum = top;
  });
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ width: "100%", height: 140, overflow: "visible" }}
    >
      {layers.map((l) => (
        <path key={l.cat} d={l.path} fill={l.color} opacity="0.78" />
      ))}
    </svg>
  );
}

// ───────────────────────────────────────────────────────────────
// TAB 4: Shield — Ad Blocker on mobile
// ───────────────────────────────────────────────────────────────

function MobParentShield({ android = false }) {
  const t = useTokens();
  const A = APP_DATA.adBlocker;
  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={parentTabs} active="shield" />}
    >
      <MobileHeader
        eyebrow="Network protection"
        title="Shield"
        subtitle="Ad blocker · trackers · malware · all family devices"
      />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Hero */}
        <MobileCard pad={18} bg={t.c.primarySoft} border={false}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10.5,
                  color: t.c.primary,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                Blocked today
              </div>
              <div
                style={{
                  fontFamily: t.fontMono,
                  fontSize: 38,
                  fontWeight: 500,
                  letterSpacing: "-.03em",
                  color: t.c.primary,
                  lineHeight: 1,
                  marginTop: 4,
                }}
              >
                {A.blockedToday.toLocaleString()}
              </div>
              <div style={{ fontSize: 12, color: t.c.text, marginTop: 6 }}>
                of {A.requestsToday.toLocaleString()} requests · {A.blockedPct}%
              </div>
            </div>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "rgba(255,255,255,.7)",
                color: t.c.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="shieldCheck" size={28} />
            </div>
          </div>
          {/* Mini hourly */}
          <div style={{ marginTop: 14 }}>
            <svg
              viewBox="0 0 100 30"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 60, display: "block" }}
            >
              {A.hourly.map((v, h) => {
                const x = (h / 24) * 100;
                const bh = (v / Math.max(...A.hourly)) * 28;
                return (
                  <rect
                    key={h}
                    x={x + 0.3}
                    y={30 - bh}
                    width={100 / 24 - 0.6}
                    height={Math.max(bh, 0.4)}
                    rx="0.5"
                    fill={t.c.primary}
                    opacity={0.45 + (v / Math.max(...A.hourly)) * 0.5}
                  />
                );
              })}
            </svg>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 9.5,
                color: t.c.primary,
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
        </MobileCard>

        {/* Category tiles */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
          }}
        >
          <ShieldStat
            icon="alert"
            label="Ads"
            value={fmtNum(A.ads)}
            color={t.c.accent}
          />
          <ShieldStat
            icon="eye"
            label="Trackers"
            value={fmtNum(A.trackers)}
            color={t.c.lavText}
          />
          <ShieldStat
            icon="ban"
            label="Malware"
            value={A.malware.toString()}
            color={t.c.danger}
          />
        </div>

        {/* Donut */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
            What got blocked
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                position: "relative",
                width: 140,
                height: 140,
                flexShrink: 0,
              }}
            >
              {(() => {
                const data = {
                  Ads: A.ads,
                  Trackers: A.trackers,
                  Social: A.socialWidgets,
                  Malware: A.malware,
                  Other: A.other,
                };
                const total = Object.values(data).reduce((a, b) => a + b, 0);
                const size = 140,
                  stroke = 18;
                const r = (size - stroke) / 2;
                const c = 2 * Math.PI * r;
                let offset = 0;
                const colors = {
                  Ads: t.c.accent,
                  Trackers: t.c.lavText,
                  Social: t.c.blue,
                  Malware: t.c.danger,
                  Other: t.c.textMute,
                };
                return (
                  <>
                    <svg
                      width={size}
                      height={size}
                      style={{ transform: "rotate(-90deg)" }}
                    >
                      <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={r}
                        fill="none"
                        stroke={t.c.surface2}
                        strokeWidth={stroke}
                      />
                      {Object.entries(data).map(([k, v]) => {
                        const len = (v / total) * c - 1.5;
                        const seg = (
                          <circle
                            key={k}
                            cx={size / 2}
                            cy={size / 2}
                            r={r}
                            fill="none"
                            stroke={colors[k]}
                            strokeWidth={stroke}
                            strokeDasharray={`${Math.max(0, len)} ${c}`}
                            strokeDashoffset={-offset}
                          />
                        );
                        offset += (v / total) * c;
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
                          fontSize: 22,
                          fontWeight: 500,
                          letterSpacing: "-.02em",
                        }}
                      >
                        {fmtNum(A.blockedToday)}
                      </div>
                      <div
                        style={{
                          fontSize: 10.5,
                          color: t.c.textMute,
                          marginTop: 3,
                        }}
                      >
                        blocked
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {[
                ["Ads", A.ads, t.c.accent],
                ["Trackers", A.trackers, t.c.lavText],
                ["Social widgets", A.socialWidgets, t.c.blue],
                ["Malware", A.malware, t.c.danger],
                ["Other", A.other, t.c.textMute],
              ].map(([l, v, c]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 11.5,
                  }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: c,
                      }}
                    />
                    {l}
                  </span>
                  <span
                    style={{
                      fontFamily: t.fontMono,
                      fontWeight: 500,
                      fontSize: 11,
                    }}
                  >
                    {fmtNum(v)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </MobileCard>

        {/* Top domains */}
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
              Top blocked domains
            </span>
            <span style={{ fontSize: 11, color: t.c.textMute }}>
              1,284 today
            </span>
          </div>
          {A.topBlocked.slice(0, 6).map((d, i) => (
            <div
              key={d.domain}
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr 70px 50px",
                gap: 10,
                alignItems: "center",
                padding: "10px 0",
                borderBottom: i < 5 ? `1px solid ${t.c.border}` : "none",
              }}
            >
              <div
                style={{
                  fontFamily: t.fontMono,
                  fontSize: 10.5,
                  color: t.c.textMute,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontFamily: t.fontMono,
                  fontSize: 11.5,
                  color: t.c.text,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {d.domain}
              </div>
              <Chip
                bg={d.type === "Ads" ? t.c.accentSoft : t.c.lavSoft}
                color={d.type === "Ads" ? t.c.accent : t.c.lavText}
                style={{ fontSize: 9 }}
              >
                {d.type}
              </Chip>
              <span
                style={{
                  fontFamily: t.fontMono,
                  fontSize: 12,
                  fontWeight: 500,
                  textAlign: "right",
                }}
              >
                {d.count}
              </span>
            </div>
          ))}
        </MobileCard>

        {/* Per-device toggle */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
            Protected devices
          </div>
          {A.devices.map((d, i) => (
            <div
              key={d.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 0",
                borderBottom:
                  i < A.devices.length - 1 ? `1px solid ${t.c.border}` : "none",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  background:
                    d.status === "paused" ? t.c.surface2 : t.c.primarySoft,
                  color: d.status === "paused" ? t.c.textMute : t.c.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="wifi" size={14} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</div>
                <div
                  style={{ fontSize: 10.5, color: t.c.textMute, marginTop: 1 }}
                >
                  {d.status === "paused"
                    ? "Paused"
                    : `${d.blocked.toLocaleString()} blocked today`}
                </div>
              </div>
              <Toggle on={d.status === "active"} />
            </div>
          ))}
        </MobileCard>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}

function ShieldStat({ icon, label, value, color }) {
  const t = useTokens();
  return (
    <MobileCard pad={12} style={{ textAlign: "center" }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: color + "22",
          color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Icon name={icon} size={14} />
      </div>
      <div
        style={{
          fontFamily: t.fontMono,
          fontSize: 18,
          fontWeight: 500,
          marginTop: 8,
          letterSpacing: "-.02em",
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
    </MobileCard>
  );
}
window.MobParentShield = MobParentShield;

// ───────────────────────────────────────────────────────────────
// TAB 5: Schedules — weekday/weekend
// ───────────────────────────────────────────────────────────────

function MobParentSchedules({ android = false }) {
  const t = useTokens();
  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={parentTabs} active="limits" />}
      fab={<FAB icon="plus" label="New" />}
    >
      <MobileHeader
        eyebrow="Routines"
        title="Schedules"
        subtitle="Different limits for weekdays and weekends."
      />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Active schedule chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 12px",
            borderRadius: 12,
            background: t.c.primarySoft,
            color: t.c.primary,
          }}
        >
          <Icon name="clock" size={15} />
          <div style={{ flex: 1, fontSize: 12.5, fontWeight: 600 }}>
            Schoolday is active until 9 PM
          </div>
          <span style={{ fontSize: 11, fontFamily: t.fontMono }}>3:42 PM</span>
        </div>

        {/* Schoolday */}
        <SchedCardMobile
          title="Schoolday"
          subtitle="Mon–Fri · 7am–9pm"
          color={t.c.primary}
          colorSoft={t.c.primarySoft}
          activeDays={[false, true, true, true, true, true, false]}
          limits={[
            { cat: "Social", mins: 60 },
            { cat: "Video", mins: 90 },
            { cat: "Gaming", mins: 60 },
            { cat: "Education", mins: null },
          ]}
          active
        />

        {/* Weekend */}
        <SchedCardMobile
          title="Weekend"
          subtitle="Sat–Sun · 9am–10pm"
          color={t.c.accent}
          colorSoft={t.c.accentSoft}
          activeDays={[true, false, false, false, false, false, true]}
          limits={[
            { cat: "Social", mins: 120 },
            { cat: "Video", mins: 180 },
            { cat: "Gaming", mins: 150 },
          ]}
        />

        {/* Timeline today */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
            Today's timeline
          </div>
          <TimelineMini />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              fontSize: 9.5,
              color: t.c.textMute,
              fontFamily: t.fontMono,
            }}
          >
            {["12a", "6a", "12p", "6p", "12a"].map((h, i) => (
              <span key={i}>{h}</span>
            ))}
          </div>
        </MobileCard>

        {/* Quiet windows */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>Quiet windows</span>
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
          {[
            {
              name: "School hours",
              time: "8:15 AM – 3 PM",
              days: "Mon–Fri",
              on: true,
              icon: "lightbulb",
            },
            {
              name: "Family dinner",
              time: "6:30 – 7:30 PM",
              days: "Every day",
              on: true,
              icon: "home",
            },
            {
              name: "Wind-down",
              time: "8:30 – 10 PM",
              days: "Sun–Thu",
              on: false,
              icon: "leaf",
            },
          ].map((q, i, arr) => (
            <div
              key={q.name}
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
                  borderRadius: 8,
                  background: t.c.primarySoft,
                  color: t.c.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={q.icon} size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{q.name}</div>
                <div
                  style={{ fontSize: 11, color: t.c.textMute, marginTop: 1 }}
                >
                  {q.time} · {q.days}
                </div>
              </div>
              <Toggle on={q.on} />
            </div>
          ))}
        </MobileCard>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}

function SchedCardMobile({
  title,
  subtitle,
  color,
  colorSoft,
  activeDays,
  limits,
  active,
}) {
  const t = useTokens();
  return (
    <MobileCard pad={14}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: colorSoft,
            color: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="calendar" size={17} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: t.fontSerif,
              fontSize: 19,
              fontWeight: 500,
              letterSpacing: "-.01em",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 1 }}>
            {subtitle}
          </div>
        </div>
        <Toggle on={true} />
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "6px 0",
              borderRadius: 6,
              background: activeDays[i] ? colorSoft : t.c.surface2,
              color: activeDays[i] ? color : t.c.textMute,
              fontWeight: activeDays[i] ? 600 : 400,
              fontSize: 11,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {limits.map((l) => (
          <div
            key={l.cat}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12.5,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: APP_DATA.categoryColors[l.cat],
              }}
            />
            <span style={{ flex: 1 }}>{l.cat}</span>
            <span style={{ fontFamily: t.fontMono, fontSize: 12 }}>
              {l.mins == null ? (
                <span style={{ color: t.c.textMute }}>no limit</span>
              ) : (
                <>
                  <b>{fmtTime(l.mins)}</b>{" "}
                  <span style={{ color: t.c.textMute }}>/ day</span>
                </>
              )}
            </span>
          </div>
        ))}
      </div>

      {active && (
        <div
          style={{
            marginTop: 12,
            padding: "8px 10px",
            borderRadius: 8,
            background: colorSoft,
            color: color,
            fontSize: 11,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: color,
            }}
          />
          Active right now · ends 9 PM
        </div>
      )}
    </MobileCard>
  );
}

function TimelineMini() {
  const t = useTokens();
  const blocks = [
    { x: 0, w: 30, color: t.c.lavSoft },
    { x: 30, w: 5, color: t.c.yellowSoft },
    { x: 35, w: 30, color: t.c.surface2 },
    { x: 65, w: 18, color: t.c.primarySoft },
    { x: 83, w: 5, color: t.c.lavSoft },
    { x: 88, w: 8, color: t.c.primarySoft },
    { x: 96, w: 4, color: t.c.lavSoft },
  ];
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: 30,
        borderRadius: 8,
        overflow: "hidden",
        background: t.c.surface2,
      }}
    >
      {blocks.map((b, i) => (
        <div
          key={i}
          style={{
            width: b.w + "%",
            background: b.color,
            borderRight:
              i < blocks.length - 1 ? "1px solid rgba(255,255,255,.5)" : "none",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: "67%",
          top: -3,
          bottom: -3,
          width: 2,
          background: t.c.danger,
          borderRadius: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "calc(67% - 20px)",
          top: -18,
          fontSize: 9,
          fontWeight: 700,
          color: t.c.danger,
          background: t.c.surface,
          padding: "1px 6px",
          borderRadius: 4,
          border: `1px solid ${t.c.dangerSoft}`,
        }}
      >
        NOW
      </div>
    </div>
  );
}
window.MobParentSchedules = MobParentSchedules;

// ───────────────────────────────────────────────────────────────
// EXTRA: Kid drill-down (deep view of one kid)
// ───────────────────────────────────────────────────────────────

function MobParentKidDetail({ android = false, kidIndex = 1 }) {
  const t = useTokens();
  const k = APP_DATA.kids[kidIndex]; // default Jaden (interesting "over" case)
  const over = k.status === "over";

  const [showPause, setShowPause] = React.useState(false);

  return (
    <MobileScreen android={android}>
      <MobileHeader
        eyebrow="Family › Jaden"
        title={k.name}
        back="Family"
        subtitle={`age ${k.age} · ${k.device} · last active ${k.lastActive}`}
        action={
          <button
            onClick={() => setShowPause(true)}
            style={{
              background: t.c.surface,
              border: `1px solid ${t.c.border}`,
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 12,
              fontWeight: 600,
              color: t.c.danger,
              fontFamily: "inherit",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Icon name="lock" size={13} /> Pause
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
        {/* Hero */}
        <MobileCard
          pad={18}
          bg={over ? t.c.dangerSoft : t.c.primarySoft}
          border={false}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Ring
              value={k.todayMinutes}
              max={k.todayGoal}
              size={110}
              stroke={10}
              color={over ? t.c.danger : t.c.primary}
              track="rgba(255,255,255,.5)"
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: t.fontMono,
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: "-.02em",
                  }}
                >
                  {fmtTime(k.todayMinutes)}
                </div>
                <div
                  style={{ fontSize: 10, color: t.c.textMute, marginTop: 3 }}
                >
                  of {fmtTime(k.todayGoal)}
                </div>
              </div>
            </Ring>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: t.fontSerif,
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: "-.02em",
                  lineHeight: 1.15,
                  color: t.c.text,
                }}
              >
                {over ? (
                  <>
                    Over by{" "}
                    <span style={{ color: t.c.danger }}>
                      {fmtTime(k.todayMinutes - k.todayGoal)}
                    </span>{" "}
                    today.
                  </>
                ) : (
                  <>{fmtTime(k.todayGoal - k.todayMinutes)} left today.</>
                )}
              </div>
              <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 8 }}>
                Snapchat is locked until tomorrow.
              </div>
            </div>
          </div>
        </MobileCard>

        {/* Stat row */}
        <div style={{ display: "flex", gap: 8 }}>
          <StatTile label="Notifs" value="173" sublabel="today" icon="bell" />
          <StatTile label="Pickups" value="84" sublabel="today" icon="phone" />
          <StatTile
            label="Streak"
            value="0"
            sublabel="last: 2d"
            icon="flame"
            color={t.c.warn}
          />
        </div>

        {/* Goals */}
        <MobileCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>Goals</span>
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
              Edit
            </button>
          </div>
          <GoalRow label="Daily" current={k.todayMinutes} goal={k.todayGoal} />
          <div style={{ height: 12 }} />
          <GoalRow label="Weekly" current={k.weekMinutes} goal={k.weekGoal} />
        </MobileCard>

        {/* This week chart */}
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
            <span style={{ fontSize: 11, color: t.c.textMute }}>
              5h goal · {fmtTime(k.weekMinutes)} this week
            </span>
          </div>
          <MobileWeeklyBars
            data={APP_DATA.weeklyHours.jaden}
            goal={5}
            height={130}
          />
        </MobileCard>

        {/* Category donut */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
            By category
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <MobileDonut
              data={k.categories}
              size={130}
              stroke={18}
              centerLabel="today"
              centerValue={fmtTime(k.todayMinutes)}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {Object.entries(k.categories)
                .sort((a, b) => b[1] - a[1])
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

        {/* Apps with limits */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
            Today's apps
          </div>
          <div style={{ fontSize: 11, color: t.c.textMute, marginBottom: 8 }}>
            Tap an app to adjust its limit
          </div>
          {k.topApps.map((a, i, arr) => (
            <MobileAppRow key={a.name} app={a} last={i === arr.length - 1} />
          ))}
        </MobileCard>

        {/* Activity timeline */}
        <MobileCard>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
            Recent activity
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                icon: "lock",
                text: "Snapchat hit daily limit (60m)",
                sub: "12 min ago",
                col: t.c.danger,
                bg: t.c.dangerSoft,
              },
              {
                icon: "message",
                text: "Asked for 30 more minutes on Discord",
                sub: "Late afternoon",
                col: t.c.lavText,
                bg: t.c.lavSoft,
              },
              {
                icon: "alert",
                text: "At 80% of Instagram limit",
                sub: "Late afternoon",
                col: t.c.warn,
                bg: t.c.warnSoft,
              },
              {
                icon: "shield",
                text: "Tried to reinstall TikTok",
                sub: "1 hour ago",
                col: t.c.danger,
                bg: t.c.dangerSoft,
              },
              {
                icon: "calendar",
                text: "Schoolday schedule started",
                sub: "7:00 AM",
                col: t.c.blue,
                bg: t.c.blueSoft,
              },
            ].map((e, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 9,
                    background: e.bg,
                    color: e.col,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={e.icon} size={13} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, lineHeight: 1.4 }}>
                    {e.text}
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: t.c.textMute,
                      marginTop: 2,
                    }}
                  >
                    {e.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MobileCard>

        <div style={{ height: 16 }} />
      </div>

      {/* Pause Confirmation Modal (Mobile absolute overlay) */}
      {showPause && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 11000,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={() => setShowPause(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 300,
              background: t.c.surface,
              borderRadius: 20,
              padding: 24,
              border: `1px solid ${t.c.border}`,
              color: t.c.text,
              textAlign: "center",
              boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: t.c.dangerSoft,
                color: t.c.danger,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Icon name="lock" size={24} />
            </div>

            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 8,
              }}
            >
              Pause {k.name}'s Device?
            </div>

            <div
              style={{
                fontSize: 13,
                color: t.c.textMute,
                lineHeight: 1.45,
                marginBottom: 20,
              }}
            >
              This will lock all non-allowed apps on {k.name}'s device
              immediately.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button
                onClick={() => {
                  alert(`${k.name}'s device paused!`);
                  setShowPause(false);
                }}
                style={{
                  width: "100%",
                  background: t.c.danger,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                Pause immediately
              </button>
              <button
                onClick={() => setShowPause(false)}
                style={{
                  width: "100%",
                  background: t.c.surface2,
                  color: t.c.text,
                  border: `1px solid ${t.c.border}`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileScreen>
  );
}
window.MobParentKidDetail = MobParentKidDetail;

// ───────────────────────────────────────────────────────────────
// EXTRA: Notifications log (mobile)
// ───────────────────────────────────────────────────────────────

function MobParentNotifLog({ android = false }) {
  const t = useTokens();
  const items = APP_DATA.notifications;
  const kindMeta = {
    "limit-hit": { col: t.c.danger, bg: t.c.dangerSoft, label: "Limit hit" },
    warn: { col: t.c.warn, bg: t.c.warnSoft, label: "Warning" },
    bypass: { col: t.c.danger, bg: t.c.dangerSoft, label: "Bypass" },
    achieved: { col: t.c.primary, bg: t.c.primarySoft, label: "Achieved" },
    request: { col: t.c.lavText, bg: t.c.lavSoft, label: "Request" },
    schedule: { col: t.c.blue, bg: t.c.blueSoft, label: "Schedule" },
  };

  return (
    <MobileScreen android={android}>
      <MobileHeader
        title="Notifications"
        back="Family"
        action={
          <button
            style={{
              background: "transparent",
              border: "none",
              color: t.c.primary,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Mark all read
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
        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            padding: "2px 0 4px",
          }}
        >
          {["All", "Limits", "Requests", "Achievements", "Bypass"].map(
            (c, i) => (
              <Chip
                key={c}
                bg={i === 0 ? t.c.primarySoft : t.c.surface2}
                color={i === 0 ? t.c.primary : t.c.text}
                style={{ flexShrink: 0 }}
              >
                {c}
              </Chip>
            ),
          )}
        </div>

        <MobileCard pad={0}>
          {items.map((n, i) => {
            const m = kindMeta[n.kind] || kindMeta.warn;
            const kid = APP_DATA.kids.find((kk) => kk.id === n.kid);
            return (
              <div
                key={i}
                style={{
                  padding: 14,
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  borderBottom:
                    i < items.length - 1 ? `1px solid ${t.c.border}` : "none",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: m.bg,
                    color: m.col,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={n.icon} size={14} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      alignItems: "center",
                      marginBottom: 3,
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip bg={m.bg} color={m.col} style={{ fontSize: 9.5 }}>
                      {m.label}
                    </Chip>
                    {kid && (
                      <span
                        style={{
                          fontSize: 11,
                          color: t.c.textMute,
                          fontWeight: 500,
                        }}
                      >
                        · {kid.name}
                      </span>
                    )}
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: 10.5,
                        color: t.c.textMute,
                      }}
                    >
                      {n.time}
                    </span>
                  </div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.4 }}>
                    {n.text}
                  </div>
                  {n.kind === "request" && (
                    <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                      <button
                        style={{
                          background: t.c.primary,
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: "inherit",
                          cursor: "pointer",
                        }}
                      >
                        Approve
                      </button>
                      <button
                        style={{
                          background: t.c.surface,
                          color: t.c.text,
                          border: `1px solid ${t.c.border}`,
                          padding: "6px 12px",
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: "inherit",
                          cursor: "pointer",
                        }}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </MobileCard>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}
window.MobParentNotifLog = MobParentNotifLog;

// ───────────────────────────────────────────────────────────────
// EXTRA: Onboarding — link a child device
// ───────────────────────────────────────────────────────────────

function MobOnboardLink({ android = false, onNext, onBack }) {
  const t = useTokens();
  return (
    <MobileScreen android={android} scroll={false}>
      <div
        style={{
          padding: "4px 22px 24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Step dots */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 24,
              height: 4,
              background: t.c.primary,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 24,
              height: 4,
              background: t.c.primary,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 24,
              height: 4,
              background: t.c.primary,
              borderRadius: 2,
            }}
          />
          <span
            style={{ fontSize: 11, color: t.c.textMute, marginLeft: "auto" }}
          >
            Step 3 of 4
          </span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <div
            style={{
              fontFamily: t.fontSerif,
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: "-.02em",
              lineHeight: 1.15,
            }}
          >
            Link Maya's phone
          </div>
          <div
            style={{
              fontSize: 14,
              color: t.c.textMute,
              marginTop: 10,
              lineHeight: 1.5,
            }}
          >
            Open Atrium on Maya's iPhone and point the camera at this code. We
            never need her Apple ID.
          </div>

          {/* QR */}
          <div
            style={{
              marginTop: 24,
              background: t.c.surface,
              borderRadius: 22,
              padding: 22,
              border: `1px solid ${t.c.border}`,
              textAlign: "center",
              boxShadow: "0 8px 32px rgba(40,30,20,.05)",
            }}
          >
            <QRCodeMock size={170} fg={t.c.text} bg={t.c.surface} />
            <div
              style={{
                marginTop: 14,
                fontFamily: t.fontMono,
                fontSize: 13,
                color: t.c.textMute,
                letterSpacing: ".1em",
              }}
            >
              F4-9K-2A-7P
            </div>
            <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 4 }}>
              Or type this on her phone
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              padding: 12,
              borderRadius: 12,
              background: t.c.primarySoft,
              fontSize: 12,
              color: t.c.primary,
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <Icon name="shieldCheck" size={15} />
            <div style={{ lineHeight: 1.4 }}>QR expires in 10 minutes.</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onBack}
            style={{
              flex: 1,
              background: t.c.surface,
              color: t.c.text,
              border: `1px solid ${t.c.border}`,
              borderRadius: 12,
              padding: "14px 0",
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            style={{
              flex: 2,
              background: t.c.primary,
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "14px 0",
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            I've scanned it
          </button>
        </div>
      </div>
    </MobileScreen>
  );
}

function MobLogin({ android = false, onLogin }) {
  const t = useTokens();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (onLogin) onLogin();
  };

  return (
    <MobileScreen android={android} scroll={false}>
      <div style={{ padding: "40px 24px 24px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <Icon name="sparkles" size={40} color={t.c.primary} />
          </div>
          <h1 style={{ fontFamily: t.fontSerif, fontSize: 32, fontWeight: 500, color: t.c.text, margin: "0 0 8px" }}>Atrium</h1>
          <p style={{ fontSize: 13.5, color: t.c.textMute, margin: 0 }}>Calm screen time for the whole family</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14, margin: "32px 0 16px" }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: t.c.textMute, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@atrium.com"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                background: t.c.surface,
                border: `1px solid ${t.c.border}`,
                color: t.c.text,
                fontSize: 14,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: t.c.textMute, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                background: t.c.surface,
                border: `1px solid ${t.c.border}`,
                color: t.c.text,
                fontSize: 14,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: t.c.primary,
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "14px 0",
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "inherit",
              cursor: "pointer",
              marginTop: 10,
              boxShadow: "0 4px 16px rgba(92,138,107,.15)",
            }}
          >
            Sign in
          </button>
        </form>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: t.c.textMute, fontSize: 12, margin: "10px 0" }}>
            <div style={{ flex: 1, height: 1, background: t.c.border }} />
            <span>or sign in with</span>
            <div style={{ flex: 1, height: 1, background: t.c.border }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button
              type="button"
              style={{
                background: t.c.surface,
                border: `1px solid ${t.c.border}`,
                borderRadius: 12,
                padding: "10px 0",
                fontSize: 13,
                fontWeight: 600,
                color: t.c.text,
                fontFamily: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              Google
            </button>
            <button
              type="button"
              style={{
                background: t.c.surface,
                border: `1px solid ${t.c.border}`,
                borderRadius: 12,
                padding: "10px 0",
                fontSize: 13,
                fontWeight: 600,
                color: t.c.text,
                fontFamily: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              Apple
            </button>
          </div>
        </div>
      </div>
    </MobileScreen>
  );
}

function MobOnboardWelcome({ android = false, onNext }) {
  const t = useTokens();
  return (
    <MobileScreen android={android} scroll={false}>
      <div style={{ padding: "40px 24px 24px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            <div style={{ width: 24, height: 4, background: t.c.primary, borderRadius: 2 }} />
            <div style={{ width: 24, height: 4, background: t.c.surface2, borderRadius: 2 }} />
            <div style={{ width: 24, height: 4, background: t.c.surface2, borderRadius: 2 }} />
            <span style={{ fontSize: 11, color: t.c.textMute, marginLeft: "auto" }}>Step 1 of 4</span>
          </div>

          <h2 style={{ fontFamily: t.fontSerif, fontSize: 30, fontWeight: 500, color: t.c.text, lineHeight: 1.15, marginBottom: 12 }}>
            Welcome to a calmer home.
          </h2>
          <p style={{ fontSize: 14, color: t.c.textMute, lineHeight: 1.5 }}>
            Atrium helps families sit with digital habits without feeling judged. We coach, we never scold.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: t.c.textMute, textTransform: "uppercase", letterSpacing: ".05em" }}>Who is using this device?</div>
            {[
              { role: "parent", label: "I am a Parent", desc: "Manage children's limits, schedules, and view tips." },
              { role: "child", label: "I am a Child", desc: "Track your streak, check app caps, and request time." },
              { role: "personal", label: "Independent", desc: "Configure screen wellbeing for yourself." }
            ].map(r => (
              <button
                key={r.role}
                onClick={onNext}
                style={{
                  background: t.c.surface,
                  border: `1px solid ${t.c.border}`,
                  borderRadius: 14,
                  padding: 14,
                  textAlign: "left",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  color: t.c.text,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>{r.label}</div>
                <div style={{ fontSize: 12, color: t.c.textMute }}>{r.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MobileScreen>
  );
}

function MobOnboardCreateProfile({ android = false, onNext, onBack }) {
  const t = useTokens();
  const [name, setName] = useState("Maya");
  const [age, setAge] = useState("11");
  const [device, setDevice] = useState("iPhone 14");

  return (
    <MobileScreen android={android} scroll={false}>
      <div style={{ padding: "40px 24px 24px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            <div style={{ width: 24, height: 4, background: t.c.primary, borderRadius: 2 }} />
            <div style={{ width: 24, height: 4, background: t.c.primary, borderRadius: 2 }} />
            <div style={{ width: 24, height: 4, background: t.c.surface2, borderRadius: 2 }} />
            <span style={{ fontSize: 11, color: t.c.textMute, marginLeft: "auto" }}>Step 2 of 4</span>
          </div>

          <h2 style={{ fontFamily: t.fontSerif, fontSize: 30, fontWeight: 500, color: t.c.text, lineHeight: 1.15, marginBottom: 12 }}>
            Create child profile
          </h2>
          <p style={{ fontSize: 14, color: t.c.textMute, lineHeight: 1.5, marginBottom: 24 }}>
            Set up their details to configure device linking.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: t.c.textMute, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Child's Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: t.c.surface,
                  border: `1px solid ${t.c.border}`,
                  color: t.c.text,
                  fontSize: 14,
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: t.c.textMute, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Age</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: t.c.surface,
                  border: `1px solid ${t.c.border}`,
                  color: t.c.text,
                  fontSize: 14,
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: t.c.textMute, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Device Model</label>
              <input
                type="text"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: t.c.surface,
                  border: `1px solid ${t.c.border}`,
                  color: t.c.text,
                  fontSize: 14,
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onBack}
            style={{
              flex: 1,
              background: t.c.surface,
              color: t.c.text,
              border: `1px solid ${t.c.border}`,
              borderRadius: 12,
              padding: "14px 0",
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            style={{
              flex: 2,
              background: t.c.primary,
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "14px 0",
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Create child
          </button>
        </div>
      </div>
    </MobileScreen>
  );
}

function MobConnectingProgress({ android = false, onNext }) {
  const t = useTokens();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onNext) onNext();
          }, 800);
          return 100;
        }
        return p + 10;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <MobileScreen android={android} scroll={false}>
      <div style={{ padding: "40px 24px 24px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
          <div style={{ width: 24, height: 4, background: t.c.primary, borderRadius: 2 }} />
          <div style={{ width: 24, height: 4, background: t.c.primary, borderRadius: 2 }} />
          <div style={{ width: 24, height: 4, background: t.c.primary, borderRadius: 2 }} />
          <span style={{ fontSize: 11, color: t.c.textMute, marginLeft: "auto" }}>Connecting</span>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          <div style={{ position: "relative", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: t.c.primarySoft, opacity: 0.4, transform: "scale(1.3)", animation: "pulse 1.8s infinite" }} />
            <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: t.c.primarySoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="phone" size={32} color={t.c.primary} />
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 12 }}>
            <h3 style={{ fontFamily: t.fontSerif, fontSize: 24, fontWeight: 500, color: t.c.text, marginBottom: 6 }}>Connecting device</h3>
            <p style={{ fontSize: 13, color: t.c.textMute }}>Waiting for Maya's iPhone 14...</p>
          </div>

          <div style={{ width: "80%", height: 6, background: t.c.surface2, borderRadius: 3, overflow: "hidden", marginTop: 10 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: t.c.primary, borderRadius: 3, transition: "width 0.15s ease-out" }} />
          </div>
          <span style={{ fontSize: 11, fontFamily: t.fontMono, color: t.c.textMute }}>{pct}% linked</span>
        </div>
      </div>
    </MobileScreen>
  );
}

function MobOnboardConfigure({ android = false, onNext }) {
  const t = useTokens();
  const [bedtime, setBedtime] = useState(true);
  const [socialCap, setSocialCap] = useState(60);

  return (
    <MobileScreen android={android} scroll={false}>
      <div style={{ padding: "40px 24px 24px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            <div style={{ width: 24, height: 4, background: t.c.primary, borderRadius: 2 }} />
            <div style={{ width: 24, height: 4, background: t.c.primary, borderRadius: 2 }} />
            <div style={{ width: 24, height: 4, background: t.c.primary, borderRadius: 2 }} />
            <span style={{ fontSize: 11, color: t.c.textMute, marginLeft: "auto" }}>Step 4 of 4</span>
          </div>

          <h2 style={{ fontFamily: t.fontSerif, fontSize: 30, fontWeight: 500, color: t.c.text, lineHeight: 1.15, marginBottom: 12 }}>
            Setup core controls
          </h2>
          <p style={{ fontSize: 14, color: t.c.textMute, lineHeight: 1.5, marginBottom: 24 }}>
            Choose simple starting configurations. You can tweak this any time.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Bedtime Card */}
            <div style={{ background: t.c.surface, border: `1px solid ${t.c.border}`, borderRadius: 14, padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: t.c.text }}>Enable Bedtime Lock</div>
                <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 2 }}>Locks device 9:00 PM – 7:00 AM</div>
              </div>
              <Toggle on={bedtime} onClick={() => setBedtime(!bedtime)} />
            </div>

            {/* Category Cap */}
            <div style={{ background: t.c.surface, border: `1px solid ${t.c.border}`, borderRadius: 14, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: t.c.text }}>Social App limits</div>
                  <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 2 }}>Daily max for TikTok, Snapchat...</div>
                </div>
                <span style={{ fontFamily: t.fontMono, fontSize: 15, fontWeight: 600, color: t.c.primary }}>{socialCap}m</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  onClick={() => setSocialCap(Math.max(15, socialCap - 15))}
                  style={{ width: 32, height: 32, borderRadius: 8, background: t.c.surface2, border: "none", color: t.c.text, cursor: "pointer", fontWeight: "bold" }}
                >
                  -
                </button>
                <div style={{ flex: 1, height: 6, background: t.c.surface2, borderRadius: 3, position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(socialCap / 120) * 100}%`, background: t.c.primary, borderRadius: 3 }} />
                </div>
                <button
                  onClick={() => setSocialCap(Math.min(120, socialCap + 15))}
                  style={{ width: 32, height: 32, borderRadius: 8, background: t.c.surface2, border: "none", color: t.c.text, cursor: "pointer", fontWeight: "bold" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Block during school */}
            <div style={{ background: t.c.surface, border: `1px solid ${t.c.border}`, borderRadius: 14, padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: t.c.text }}>School Day Schedule</div>
                <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 2 }}>Mute notifications 8:00 AM – 3:00 PM</div>
              </div>
              <Toggle on={true} />
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          style={{
            width: "100%",
            background: t.c.primary,
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "14px 0",
            fontWeight: 600,
            fontSize: 14,
            fontFamily: "inherit",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(92,138,107,.15)",
          }}
        >
          All set! Finish setup
        </button>
      </div>
    </MobileScreen>
  );
}

function MobParentCoach({ android = false }) {
  const t = useTokens();
  const tips = [
    {
      category: "ROUTINE",
      title: "TikTok Homework Peak",
      desc: "Maya's pickups on TikTok are spikey between 4:00 PM and 6:00 PM. She unlocks TikTok 8 times during this period.",
      action: "Pause TikTok during homework hours",
      time: "Just now",
      color: t.c.accent,
      bg: t.c.accentSoft,
    },
    {
      category: "SLEEP",
      title: "Late night check-ins",
      desc: "Jaden opened Spotify 3 times after 10:30 PM last night. A relaxing audio check is fine, but it might interfere with deep sleep.",
      action: "Set Music schedule lock to 10:30 PM",
      time: "2 hours ago",
      color: t.c.primary,
      bg: t.c.primarySoft,
    },
    {
      category: "BALANCE",
      title: "Reclaimed screen time",
      desc: "Excellent progress! The family reclaimed 4h 12m this week. Streaks are at a record high.",
      action: "Share praise with Maya & Jaden",
      time: "Yesterday",
      color: t.c.yellowText,
      bg: t.c.yellowSoft,
    }
  ];

  return (
    <MobileScreen android={android}>
      <MobileHeader
        title="AI Coach Tips"
        eyebrow="Insights & Tips"
        action={<Icon name="sparkles" size={18} color={t.c.primary} />}
      />

      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ padding: 14, borderRadius: 14, background: t.c.primarySoft, display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.c.primary, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="sparkles" size={16} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.c.primary }}>AI screen-time coach</div>
            <div style={{ fontSize: 12, color: t.c.text }}>Personalized recommendations based on family habits.</div>
          </div>
        </div>

        {tips.map((tip, idx) => (
          <MobileCard key={idx} pad={16}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: tip.bg, color: tip.color, letterSpacing: ".05em" }}>
                {tip.category}
              </span>
              <span style={{ fontSize: 11, color: t.c.textMute }}>{tip.time}</span>
            </div>
            
            <h4 style={{ fontSize: 15, fontWeight: 600, color: t.c.text, marginBottom: 6 }}>{tip.title}</h4>
            <p style={{ fontSize: 12.5, color: t.c.textMute, lineHeight: 1.5, marginBottom: 14 }}>{tip.desc}</p>

            <button
              style={{
                width: "100%",
                background: t.c.surface2,
                color: t.c.primary,
                border: "none",
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <span>{tip.action}</span>
              <Icon name="arrowRight" size={12} />
            </button>
          </MobileCard>
        ))}
      </div>
      
      <div style={{ height: 16 }} />
    </MobileScreen>
  );
}

function MobParentBypassHub({ android = false }) {
  const t = useTokens();
  const [requests, setRequests] = useState([
    { id: 1, kid: "Maya", age: 11, app: "Roblox", duration: "30 min", time: "5 min ago", reason: "Need to finish a level with friends" },
    { id: 2, kid: "Jaden", age: 14, app: "Discord", duration: "45 min", time: "12 min ago", reason: "Group study session questions" }
  ]);

  const handleAction = (id, action) => {
    alert(`Request ${action === "approve" ? "Approved" : "Declined"}`);
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <MobileScreen android={android}>
      <MobileHeader
        title="Bypass Requests"
        eyebrow="Approval Center"
        action={<Icon name="bell" size={18} color={t.c.text} />}
      />

      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        {requests.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: t.c.textMute }}>
            <Icon name="check" size={32} color={t.c.primary} style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 600, fontSize: 15, color: t.c.text }}>All caught up!</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>No pending bypass requests.</div>
          </div>
        ) : (
          requests.map(r => (
            <MobileCard key={r.id} pad={16}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar name={r.kid} size={24} />
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 13.5 }}>{r.kid}</span>
                    <span style={{ fontSize: 11, color: t.c.textMute }}> · age {r.age}</span>
                  </div>
                </div>
                <span style={{ fontSize: 11, color: t.c.textMute }}>{r.time}</span>
              </div>

              <div style={{ background: t.c.surface, border: `1px solid ${t.c.border}`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{r.app}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: t.c.primary }}>Requesting: {r.duration}</span>
                </div>
                <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 6, fontStyle: "italic" }}>
                  "{r.reason}"
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => handleAction(r.id, "decline")}
                  style={{
                    flex: 1,
                    background: t.c.surface2,
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 0",
                    fontSize: 12,
                    fontWeight: 600,
                    color: t.c.text,
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Decline
                </button>
                <button
                  onClick={() => handleAction(r.id, "approve")}
                  style={{
                    flex: 1,
                    background: t.c.primary,
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 0",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "white",
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Approve +{r.duration}
                </button>
              </div>
            </MobileCard>
          ))
        )}
      </div>
    </MobileScreen>
  );
}

function MobOnboarding({ android = false }) {
  const [step, setStep] = useState(1);

  if (step === 1) return <MobLogin android={android} onLogin={() => setStep(2)} />;
  if (step === 2) return <MobOnboardWelcome android={android} onNext={() => setStep(3)} />;
  if (step === 3) return <MobOnboardCreateProfile android={android} onNext={() => setStep(4)} onBack={() => setStep(2)} />;
  if (step === 4) return <MobOnboardLink android={android} onNext={() => setStep(5)} onBack={() => setStep(3)} />;
  if (step === 5) return <MobConnectingProgress android={android} onNext={() => setStep(6)} />;
  if (step === 6) return <MobOnboardConfigure android={android} onNext={() => setStep(1)} />;
}

function QRCodeMock({ size = 170, fg = "#000", bg = "#fff" }) {
  const grid = 21;
  const cell = size / grid;
  const seed = (x, y) => (x * 9301 + y * 49297 + 233280) % 2;
  const cells = [];
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      if (seed(x, y) === 1) cells.push([x, y]);
    }
  }
  const finder = (cx, cy) => (
    <g key={`${cx}-${cy}`}>
      <rect
        x={cx * cell}
        y={cy * cell}
        width={7 * cell}
        height={7 * cell}
        fill={fg}
      />
      <rect
        x={(cx + 1) * cell}
        y={(cy + 1) * cell}
        width={5 * cell}
        height={5 * cell}
        fill={bg}
      />
      <rect
        x={(cx + 2) * cell}
        y={(cy + 2) * cell}
        width={3 * cell}
        height={3 * cell}
        fill={fg}
      />
    </g>
  );
  const inFinder = (x, y) =>
    (x < 7 && y < 7) || (x >= grid - 7 && y < 7) || (x < 7 && y >= grid - 7);
  return (
    <svg width={size} height={size}>
      <rect width={size} height={size} fill={bg} />
      {cells
        .filter(([x, y]) => !inFinder(x, y))
        .map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x * cell}
            y={y * cell}
            width={cell}
            height={cell}
            fill={fg}
          />
        ))}
      {finder(0, 0)}
      {finder(grid - 7, 0)}
      {finder(0, grid - 7)}
    </svg>
  );
}
window.MobOnboarding = MobOnboarding;
window.QRCodeMock = QRCodeMock;

// ─────────────────── Shared parentTabs definition ───────────────────
const parentTabs = [
  { id: "family", label: "Family", icon: "users" },
  { id: "me", label: "Me", icon: "leaf" },
  { id: "limits", label: "Limits", icon: "clock" },
  { id: "reports", label: "Reports", icon: "chart" },
  { id: "shield", label: "Shield", icon: "shield", badge: 3 },
];
window.parentTabs = parentTabs;

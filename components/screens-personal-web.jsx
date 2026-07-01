// Personal user web dashboard

function PersonalDashboardInner() {
  const t = useTokens();
  const u = APP_DATA.personal;
  const pctDay = u.todayMinutes / u.todayGoal;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        {/* Hero */}
        <Card style={{ display: "flex", gap: 28, alignItems: "center" }}>
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
                  fontFamily: t.fontMono,
                  fontSize: 32,
                  fontWeight: 500,
                  letterSpacing: "-.02em",
                  lineHeight: 1,
                }}
              >
                {fmtTime(u.todayMinutes)}
              </div>
              <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 6 }}>
                of {fmtTime(u.todayGoal)} today
              </div>
            </div>
          </Ring>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 30,
                fontWeight: 500,
                letterSpacing: "-.02em",
                lineHeight: 1.15,
              }}
            >
              You've spent{" "}
              <span style={{ color: t.c.primary }}>52 minutes</span> less than
              yesterday.
            </div>
            <div
              style={{
                fontSize: 13.5,
                color: t.c.textMute,
                marginTop: 10,
                lineHeight: 1.5,
              }}
            >
              Most of today went to Slack and Figma — both work. Instagram is at
              32 of 30 minutes; it's locked for the rest of the day.
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <Chip bg={t.c.yellowSoft} color={t.c.yellowText}>
                🔥 11-day streak
              </Chip>
              <Chip bg={t.c.primarySoft} color={t.c.primary}>
                <Icon name="trendDown" size={11} /> 23% week-over-week
              </Chip>
            </div>
          </div>
        </Card>

        {/* Goals */}
        <Card>
          <SectionHead
            title="Your goals"
            subtitle="Day & week budgets"
            action={
              <Button variant="ghost" size="sm" icon="plus">
                Add goal
              </Button>
            }
          />
          <GoalRow
            label="Daily budget"
            current={u.todayMinutes}
            goal={u.todayGoal}
          />
          <div style={{ height: 14 }} />
          <GoalRow
            label="Weekly budget"
            current={u.weekMinutes}
            goal={u.weekGoal}
          />
          <div style={{ height: 14 }} />
          <GoalRow label="Social — daily" current={32} goal={30} />
          <div
            style={{
              marginTop: 16,
              padding: 12,
              borderRadius: 12,
              background: t.c.primarySoft,
              fontSize: 12.5,
              color: t.c.primary,
              lineHeight: 1.5,
            }}
          >
            <b>Coach:</b> If you stop now, you'll close the week 8h under goal —
            your best result this quarter.
          </div>
        </Card>
      </div>

      {/* Weekly + category */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        <Card>
          <SectionHead
            title="This week vs. last week"
            subtitle="Daily hours, with goal at 5h"
            action={
              <div style={{ display: "flex", gap: 8 }}>
                <Chip bg={t.c.surface2}>Hours</Chip>
                <Chip bg={t.c.surface}>Pickups</Chip>
                <Chip bg={t.c.surface}>Notifs</Chip>
              </div>
            }
          />
          <CompareTrend
            thisWeek={APP_DATA.weeklyHours.personal}
            lastWeek={APP_DATA.weeklyHours.lastWeek.personal}
            goal={5}
            height={200}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              fontSize: 11.5,
              color: t.c.textMute,
            }}
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
              <span
                key={d}
                style={{
                  fontWeight: i === 4 ? 600 : 400,
                  color: i === 4 ? t.c.text : t.c.textMute,
                }}
              >
                {d}
              </span>
            ))}
          </div>
          <div
            style={{ display: "flex", gap: 18, marginTop: 14, fontSize: 12 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: t.c.primary,
                }}
              />
              <span style={{ color: t.c.text }}>This week</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: t.c.border,
                }}
              />
              <span style={{ color: t.c.textMute }}>Last week</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{ width: 14, borderTop: `1.5px dashed ${t.c.accent}` }}
              />{" "}
              <span style={{ color: t.c.textMute }}>Goal</span>
            </div>
          </div>
        </Card>

        <Card>
          <SectionHead title="By category" subtitle="Today's breakdown" />
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <DonutCategory
              data={u.categories}
              size={156}
              stroke={22}
              centerLabel="today"
              centerValue={fmtTime(u.todayMinutes)}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 7,
              }}
            >
              {Object.entries(u.categories)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, m]) => (
                  <div
                    key={cat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      fontSize: 12.5,
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
                      style={{ fontFamily: t.fontMono, color: t.c.textMute }}
                    >
                      {fmtTime(m)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Pickups + Apps */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18 }}
      >
        <Card>
          <SectionHead
            title="Today's apps"
            subtitle="Sorted by time · tap any to set a limit"
          />
          <AppLeaderboard apps={u.topApps} />
        </Card>
        <Card>
          <SectionHead
            title="When you picked up your phone"
            subtitle="Today by hour"
          />
          <PickupChart data={APP_DATA.pickupHours.personal} />
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 12,
              background: t.c.surface2,
              fontSize: 12.5,
              color: t.c.textMute,
              lineHeight: 1.5,
            }}
          >
            Most pickups happened at <b style={{ color: t.c.text }}>5pm</b> —
            the end of meetings, maybe? Consider a 30-min quiet window.
          </div>
        </Card>
      </div>
    </>
  );
}

function PersonalDashboard() {
  return (
    <WebShell
      role="personal"
      active="overview"
      title="Less screen. More you."
      subtitle="Personal · Thursday afternoon"
    >
      <PersonalDashboardInner />
    </WebShell>
  );
}

function CompareTrend({ thisWeek, lastWeek, goal, height = 200 }) {
  const t = useTokens();
  const safe = (a) => a.map((v) => (v == null ? null : v));
  const all = [...thisWeek, ...lastWeek].filter(
    (v) => v != null && v !== undefined,
  );
  const max = Math.max(goal * 1.4, ...all) * 1.05;

  const path = (data) => {
    let d = "";
    let moved = false;
    data.forEach((v, i) => {
      if (v == null) return;
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (v / max) * 100;
      d += (moved ? "L" : "M") + x.toFixed(2) + " " + y.toFixed(2) + " ";
      moved = true;
    });
    return d.trim();
  };

  // Filled area for this week
  const tw = path(thisWeek);
  const lastIdxThis = (() => {
    for (let i = thisWeek.length - 1; i >= 0; i--)
      if (thisWeek[i] != null) return i;
    return 0;
  })();
  const fillTw =
    tw +
    ` L${((lastIdxThis / (thisWeek.length - 1)) * 100).toFixed(2)} 100 L0 100 Z`;

  return (
    <svg
      viewBox="0 0 100 100"
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
          strokeWidth=".3"
          strokeDasharray="0.6 1.2"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {/* goal line */}
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
      <text
        x="98"
        y={100 - (goal / max) * 100 - 1.5}
        fontSize="3"
        fill={t.c.accent}
        textAnchor="end"
        style={{ fontFamily: t.font }}
      >
        Goal {goal}h
      </text>

      {/* last week */}
      <path
        d={path(lastWeek)}
        fill="none"
        stroke={t.c.textMute}
        strokeOpacity="0.45"
        strokeWidth="1.2"
        strokeDasharray="2.2 1.8"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* this week area */}
      <path d={fillTw} fill={t.c.primary} opacity="0.12" />
      <path
        d={tw}
        fill="none"
        stroke={t.c.primary}
        strokeWidth="1.8"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* this week dots */}
      {thisWeek.map((v, i) => {
        if (v == null) return null;
        const x = (i / (thisWeek.length - 1)) * 100;
        const y = 100 - (v / max) * 100;
        const isToday = i === 4;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={isToday ? 1.6 : 0.9}
            fill={t.c.primary}
            stroke={isToday ? t.c.surface : "none"}
            strokeWidth={isToday ? 0.8 : 0}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}
window.CompareTrend = CompareTrend;

function PickupChart({ data }) {
  const t = useTokens();
  const max = Math.max(...data) || 1;
  return (
    <div>
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 140, display: "block" }}
      >
        {data.map((v, h) => {
          const x = (h / 24) * 100;
          const bh = (v / max) * 50;
          return (
            <rect
              key={h}
              x={x + 0.5}
              y={56 - bh}
              width={100 / 24 - 1}
              height={Math.max(bh, 1)}
              rx="0.6"
              fill={h >= 16 && h <= 18 ? t.c.accent : t.c.primary}
              opacity={v === 0 ? 0.15 : 0.85}
            />
          );
        })}
        {[0, 6, 12, 18].map((h) => (
          <text
            key={h}
            x={(h / 24) * 100}
            y={60}
            fontSize="2.6"
            fill={t.c.textMute}
            textAnchor={h === 0 ? "start" : "middle"}
            style={{ fontFamily: t.font }}
          >
            {h === 0
              ? "12am"
              : h === 12
                ? "12pm"
                : h > 12
                  ? `${h - 12}pm`
                  : `${h}am`}
          </text>
        ))}
      </svg>
    </div>
  );
}
window.PickupChart = PickupChart;
window.PersonalDashboard = PersonalDashboard;
window.PersonalDashboardInner = PersonalDashboardInner;

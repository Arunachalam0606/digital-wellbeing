// Reports (weekly/monthly + stacked area + notif heatmap) + Notifications log

function Reports() {
  const t = useTokens();
  return (
    <WebShell
      role="parent"
      active="reports"
      title="Reports"
      subtitle="The bigger picture — trends, heatmaps, and comparisons"
      headerExtra={
        <>
          <div
            style={{
              display: "flex",
              gap: 6,
              padding: 4,
              background: t.c.surface,
              border: `1px solid ${t.c.border}`,
              borderRadius: 10,
            }}
          >
            <Chip bg={t.c.primarySoft} color={t.c.primary}>
              Week
            </Chip>
            <Chip bg={t.c.surface}>Month</Chip>
            <Chip bg={t.c.surface}>Year</Chip>
          </div>
          <Button variant="outline" size="sm" icon="arrowDown">
            Export
          </Button>
        </>
      }
    >
      {/* Highlight strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
          marginBottom: 18,
        }}
      >
        <Highlight
          label="Family total"
          value="29h 14m"
          delta="-14%"
          down
          hint="vs. last week"
        />
        <Highlight
          label="Maya"
          value="14h 20m"
          delta="-18%"
          down
          hint="On track 6 of 7 days"
        />
        <Highlight
          label="Jaden"
          value="14h 54m"
          delta="+4%"
          up
          hint="Over goal Mon, Wed, Thu"
        />
        <Highlight
          label="Notifications"
          value="1,824"
          delta="-9%"
          down
          hint="Lower than last week"
        />
      </div>

      {/* Per-child comparison */}
      <Card style={{ marginBottom: 18 }}>
        <SectionHead
          title="Maya vs. Jaden — this week"
          subtitle="Daily hours per kid · 5h goal line"
          action={
            <div style={{ display: "flex", gap: 8 }}>
              <Chip bg={t.c.primarySoft} color={t.c.primary}>
                Hours
              </Chip>
              <Chip bg={t.c.surface}>Pickups</Chip>
              <Chip bg={t.c.surface}>Notifs</Chip>
            </div>
          }
        />
        <PerChildCompare />
      </Card>

      {/* Stacked area + notif heatmap */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        <Card>
          <SectionHead
            title="Category share over time"
            subtitle="Last 7 days — stacked hours by category"
            action={
              <Button variant="ghost" size="sm" icon="grid">
                Switch to bar
              </Button>
            }
          />
          <StackedArea />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              marginTop: 14,
            }}
          >
            {Object.entries({
              Social: "#E8896F",
              Video: "#D97373",
              Gaming: "#A8A0C8",
              Education: "#5C8A6B",
              Communication: "#7DA9C7",
            }).map(([cat, col]) => (
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
                    width: 10,
                    height: 10,
                    borderRadius: 3,
                    background: col,
                  }}
                />
                {cat}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHead
            title="Notifications heatmap"
            subtitle="Day × hour · darker = more notifs"
          />
          <NotifHeatmap />
        </Card>
      </div>

      {/* Top apps */}
      <Card>
        <SectionHead
          title="Top apps this week"
          subtitle="Combined, all kids — tap to drill down"
        />
        <AppLeaderboard
          apps={[
            ...APP_DATA.kids[1].topApps.slice(0, 4).map((a, i) => ({
              ...a,
              key: `j-${i}-${a.name}`,
              mins: a.mins * 5 + 40,
            })),
            ...APP_DATA.kids[0].topApps.slice(0, 3).map((a, i) => ({
              ...a,
              key: `m-${i}-${a.name}`,
              mins: a.mins * 5 + 30,
            })),
          ]}
        />
      </Card>
    </WebShell>
  );
}

function Highlight({ label, value, delta, up, down, hint }) {
  const t = useTokens();
  const col = down ? t.c.primary : up ? t.c.danger : t.c.text;
  const bg = down ? t.c.primarySoft : up ? t.c.dangerSoft : t.c.surface2;
  return (
    <Card>
      <div
        style={{
          fontSize: 11.5,
          color: t.c.textMute,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: ".06em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          marginTop: 8,
        }}
      >
        <span
          style={{
            fontFamily: t.fontMono,
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: "-.02em",
          }}
        >
          {value}
        </span>
        <Chip bg={bg} color={col} style={{ fontSize: 11 }}>
          <Icon name={down ? "trendDown" : "trend"} size={11} /> {delta}
        </Chip>
      </div>
      <div style={{ fontSize: 11.5, color: t.c.textMute, marginTop: 6 }}>
        {hint}
      </div>
    </Card>
  );
}

function PerChildCompare() {
  const t = useTokens();
  const maya = APP_DATA.weeklyHours.maya;
  const jaden = APP_DATA.weeklyHours.jaden;
  const max = Math.max(...[...maya, ...jaden].filter((v) => v != null)) * 1.2;
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
  return (
    <div>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 240, overflow: "visible" }}
      >
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1="0"
            x2="100"
            y1={100 - g * 100}
            y2={100 - g * 100}
            stroke={t.c.border}
            strokeWidth=".3"
            strokeDasharray="0.5 1.2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
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
        <text
          x="98"
          y={100 - (5 / max) * 100 - 1.5}
          fontSize="2.8"
          fill={t.c.accent}
          textAnchor="end"
          style={{ fontFamily: t.font }}
        >
          5h goal
        </text>

        <path
          d={path(maya)}
          fill="none"
          stroke="#E8896F"
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={path(jaden)}
          fill="none"
          stroke="#A8A0C8"
          strokeWidth="1.8"
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
              r={1.2}
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
              r={1.2}
              fill="#A8A0C8"
              vectorEffect="non-scaling-stroke"
            />
          ),
        )}
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
          fontSize: 11.5,
          color: t.c.textMute,
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 18, marginTop: 14, fontSize: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 14,
              height: 3,
              borderRadius: 2,
              background: "#E8896F",
            }}
          />{" "}
          Maya
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 14,
              height: 3,
              borderRadius: 2,
              background: "#A8A0C8",
            }}
          />{" "}
          Jaden
        </div>
      </div>
    </div>
  );
}

function StackedArea() {
  const t = useTokens();
  // 7 days × 5 categories (hours)
  const cats = ["Education", "Communication", "Gaming", "Video", "Social"];
  const colors = {
    Education: "#5C8A6B",
    Communication: "#7DA9C7",
    Gaming: "#A8A0C8",
    Video: "#D97373",
    Social: "#E8896F",
  };
  const data = Array.from({ length: 7 }, (_, day) => ({
    Education: 0.4 + Math.random() * 0.6,
    Communication: 0.6 + Math.random() * 0.8,
    Gaming: 1.0 + Math.random() * 1.0,
    Video: 1.4 + Math.random() * 1.6,
    Social: 1.8 + Math.random() * 2.0 + (day >= 5 ? 0.7 : 0),
  }));
  // compute cumulative
  const totals = data.map((d) => cats.reduce((a, c) => a + d[c], 0));
  const max = Math.max(...totals) * 1.1;
  // for each category, build polygon (top of layer to bottom of layer)
  const layers = [];
  let accum = data.map(() => 0);
  cats.forEach((cat, ci) => {
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
    <div>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 220, overflow: "visible" }}
      >
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1="0"
            x2="100"
            y1={100 - g * 100}
            y2={100 - g * 100}
            stroke={t.c.border}
            strokeWidth=".3"
            strokeDasharray="0.5 1.2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {layers.map((l) => (
          <path key={l.cat} d={l.path} fill={l.color} opacity="0.78" />
        ))}
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
          fontSize: 11.5,
          color: t.c.textMute,
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

function NotifHeatmap() {
  const t = useTokens();
  const data = APP_DATA.notifHeatmap;
  const max = Math.max(...data.flat());
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div>
      <div style={{ display: "flex", gap: 1.5 }}>
        <div
          style={{
            width: 18,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            paddingTop: 14,
          }}
        >
          {days.map((d, i) => (
            <div
              key={i}
              style={{
                height: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 6,
                fontSize: 10,
                color: t.c.textMute,
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 9,
              color: t.c.textMute,
              marginBottom: 4,
              paddingLeft: 2,
            }}
          >
            <span>12a</span>
            <span>6a</span>
            <span>12p</span>
            <span>6p</span>
            <span>11p</span>
          </div>
          {data.map((row, di) => (
            <div
              key={di}
              style={{
                display: "flex",
                gap: 1.5,
                marginBottom: 1.5,
                height: 16,
              }}
            >
              {row.map((v, hi) => {
                const intensity = v / max;
                return (
                  <div
                    key={hi}
                    style={{
                      flex: 1,
                      background:
                        intensity === 0
                          ? t.c.surface2
                          : `oklch(from ${t.c.primary} ${0.95 - intensity * 0.4} ${0.06 + intensity * 0.1} h)`,
                      borderRadius: 2,
                    }}
                    title={`${v} notifs`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 11,
          color: t.c.textMute,
        }}
      >
        Fewer
        <div style={{ display: "flex", gap: 2 }}>
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 10,
                borderRadius: 2,
                background:
                  i === 0
                    ? t.c.surface2
                    : `oklch(from ${t.c.primary} ${0.95 - i * 0.4} ${0.06 + i * 0.1} h)`,
              }}
            />
          ))}
        </div>
        More
        <span style={{ marginLeft: "auto", fontSize: 11.5, color: t.c.text }}>
          <b>Peak:</b> Thu 5pm — 38 notifications
        </span>
      </div>
    </div>
  );
}
window.Reports = Reports;

// ───────────────────── Notifications log ─────────────────────

function NotificationsLog() {
  const t = useTokens();
  const items = APP_DATA.notifications;
  const kindMeta = {
    "limit-hit": { col: t.c.danger, bg: t.c.dangerSoft, label: "Limit hit" },
    warn: { col: t.c.warn, bg: t.c.warnSoft, label: "Warning" },
    bypass: { col: t.c.danger, bg: t.c.dangerSoft, label: "Bypass attempt" },
    achieved: { col: t.c.primary, bg: t.c.primarySoft, label: "Achievement" },
    request: { col: t.c.lavText, bg: t.c.lavSoft, label: "Request" },
    schedule: { col: t.c.blue, bg: t.c.blueSoft, label: "Schedule" },
  };

  return (
    <WebShell
      role="parent"
      active="notif"
      title="Notifications"
      subtitle="Everything happening across the family"
      headerExtra={
        <Button variant="outline" size="sm">
          Mark all read
        </Button>
      }
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 18 }}
      >
        <Card style={{ padding: 0 }}>
          <div
            style={{
              padding: "14px 22px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderBottom: `1px solid ${t.c.border}`,
            }}
          >
            <Chip bg={t.c.primarySoft} color={t.c.primary}>
              All
            </Chip>
            <Chip bg={t.c.surface}>Limits</Chip>
            <Chip bg={t.c.surface}>Requests</Chip>
            <Chip bg={t.c.surface}>Achievements</Chip>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 12, color: t.c.textMute }}>
              {items.length} this week
            </span>
          </div>
          {items.map((n, i) => {
            const m = kindMeta[n.kind] || kindMeta["warn"];
            const kid = APP_DATA.kids.find((k) => k.id === n.kid);
            return (
              <div
                key={i}
                style={{
                  padding: "16px 22px",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  borderBottom:
                    i < items.length - 1 ? `1px dashed ${t.c.border}` : "none",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: m.bg,
                    color: m.col,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={n.icon} size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      marginBottom: 4,
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip bg={m.bg} color={m.col}>
                      {m.label}
                    </Chip>
                    {kid && (
                      <Chip bg={t.c.surface2} color={t.c.textMute}>
                        <Avatar name={kid.name} color={kid.avatar} size={14} />
                        {kid.name}
                      </Chip>
                    )}
                  </div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.4 }}>
                    {n.text}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {n.kind === "request" && (
                    <Button variant="primary" size="sm">
                      Approve
                    </Button>
                  )}
                  <span
                    style={{
                      fontSize: 11.5,
                      color: t.c.textMute,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {n.time}
                  </span>
                </div>
              </div>
            );
          })}
        </Card>

        {/* Right rail */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card>
            <SectionHead title="Quiet hours" subtitle="Don't ping me between" />
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                fontFamily: t.fontMono,
                fontSize: 18,
              }}
            >
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  background: t.c.surface2,
                }}
              >
                10:00 PM
              </span>
              <span style={{ color: t.c.textMute }}>→</span>
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  background: t.c.surface2,
                }}
              >
                7:00 AM
              </span>
            </div>
            <div style={{ marginTop: 14, fontSize: 12.5, color: t.c.textMute }}>
              Critical alerts (bypass attempts) still come through.
            </div>
          </Card>

          <Card>
            <SectionHead title="Alert types" subtitle="What sends a push?" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Daily limit hit", true],
                ["At 80% of a limit", true],
                ["Bypass attempted", true],
                ["Goal achieved", true],
                ["Weekly summary", false],
              ].map(([l, on]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 13,
                  }}
                >
                  {l}
                  <Toggle on={on} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </WebShell>
  );
}
window.NotificationsLog = NotificationsLog;

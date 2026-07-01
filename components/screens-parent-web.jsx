// Parent web — Family overview + Single-child detail

const { useState: useStateP } = React;

// ───────────────────── Parent Dashboard ─────────────────────

function ParentDashboard() {
  const t = useTokens();
  const D = APP_DATA;
  const totalToday = D.kids.reduce((a, k) => a + k.todayMinutes, 0);

  return (
    <WebShell
      role="parent"
      active="overview"
      title="Good afternoon, Sarah"
      subtitle={"Thursday, April 16 · Family overview"}
    >
      {/* Hero strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        {/* Today summary */}
        <Card>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11.5,
                  color: t.c.textMute,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                Family screen time today
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  marginTop: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: t.fontMono,
                    fontSize: 44,
                    fontWeight: 500,
                    letterSpacing: "-.03em",
                    color: t.c.text,
                    lineHeight: 1,
                  }}
                >
                  {fmtTime(totalToday)}
                </span>
                <Chip bg={t.c.primarySoft} color={t.c.primary}>
                  <Icon name="trendDown" size={12} /> 18% vs. last Thu
                </Chip>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: t.c.textMute,
                  marginTop: 8,
                  maxWidth: 380,
                  lineHeight: 1.5,
                }}
              >
                Maya is well under her 4h budget. Jaden crossed his 5h limit 12
                minutes ago — Snapchat is now locked until tomorrow.
              </div>
            </div>
            <Avatar name="Sarah Mitchell" size={48} color={t.c.primary} />
          </div>

          {/* Mini stacked bar by kid */}
          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 4,
              height: 8,
              borderRadius: 4,
              overflow: "hidden",
              background: t.c.surface2,
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
          <div style={{ display: "flex", gap: 18, marginTop: 10 }}>
            {D.kids.map((k) => (
              <div
                key={k.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: k.status === "over" ? t.c.danger : t.c.primary,
                    opacity: k.status === "over" ? 1 : 0.7,
                  }}
                />
                <span>{k.name}</span>
                <span style={{ color: t.c.textMute, fontFamily: t.fontMono }}>
                  {fmtTime(k.todayMinutes)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick stat - alerts */}
        <Card style={{ background: t.c.yellowSoft, border: "none" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11.5,
              fontWeight: 600,
              color: t.c.yellowText,
              textTransform: "uppercase",
              letterSpacing: ".06em",
            }}
          >
            <Icon name="alert" size={14} /> Needs attention
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              marginTop: 12,
              letterSpacing: "-.01em",
              lineHeight: 1.25,
            }}
          >
            Jaden requested 30 more minutes on Discord.
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <Button variant="primary" size="sm">
              Approve 30m
            </Button>
            <Button variant="outline" size="sm">
              Decline
            </Button>
          </div>
        </Card>

        {/* Coach tip */}
        <Card>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11.5,
              fontWeight: 600,
              color: t.c.primary,
              textTransform: "uppercase",
              letterSpacing: ".06em",
            }}
          >
            <Icon name="sparkles" size={14} /> Weekly coaching
          </div>
          <div
            style={{
              fontSize: 14,
              marginTop: 12,
              lineHeight: 1.5,
              color: t.c.text,
            }}
          >
            Family screen time dropped <b>14%</b> this week. Notifications are
            still high on Jaden's phone in the evening — consider a 9pm quiet
            schedule.
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon="arrowRight"
            style={{ marginTop: 12, padding: "6px 0" }}
          >
            Create schedule
          </Button>
        </Card>
      </div>

      {/* Kid cards */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          margin: "8px 0 14px",
        }}
      >
        <div
          style={{
            fontFamily: t.fontSerif,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "-.01em",
          }}
        >
          Your family
        </div>
        <Button variant="outline" size="sm" icon="plus">
          Add a child
        </Button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        {D.kids.map((k) => (
          <KidCard key={k.id} kid={k} />
        ))}
      </div>

      {/* Bottom row - quick category & weekly */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18 }}
      >
        <Card>
          <SectionHead
            title="This week — family hours"
            subtitle="Sun → Sat · combined daily totals"
            action={
              <div style={{ display: "flex", gap: 8 }}>
                <Chip bg={t.c.surface2}>Family</Chip>
                <Chip bg={t.c.primarySoft} color={t.c.primary}>
                  vs. last week ↓ 14%
                </Chip>
              </div>
            }
          />
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <BarChartWeekly
                data={D.weeklyHours.maya.map(
                  (v, i) => (v || 0) + (D.weeklyHours.jaden[i] || 0),
                )}
                goal={8.5}
                height={180}
                color={t.c.primary}
                accent={t.c.accent}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                  fontSize: 11,
                  color: t.c.textMute,
                  padding: "0 6px",
                }}
              >
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (d, i) => (
                    <span
                      key={d}
                      style={{
                        fontWeight: i === 4 ? 600 : 400,
                        color: i === 4 ? t.c.text : t.c.textMute,
                      }}
                    >
                      {d}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <SectionHead title="Family activity today" subtitle="By category" />
          <CategoryList
            data={mergeCategories(D.kids.map((k) => k.categories))}
          />
        </Card>
      </div>
    </WebShell>
  );
}

function mergeCategories(list) {
  const out = {};
  list.forEach((o) =>
    Object.entries(o).forEach(([k, v]) => {
      out[k] = (out[k] || 0) + v;
    }),
  );
  return out;
}

function CategoryList({ data }) {
  const t = useTokens();
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {entries.map(([cat, mins]) => {
        const pct = (mins / total) * 100;
        const col = APP_DATA.categoryColors[cat] || t.c.primary;
        return (
          <div key={cat}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                marginBottom: 4,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: col,
                  }}
                />
                {cat}
              </span>
              <span
                style={{
                  color: t.c.textMute,
                  fontFamily: t.fontMono,
                  fontSize: 12.5,
                }}
              >
                {fmtTime(mins)}
              </span>
            </div>
            <div
              style={{
                height: 6,
                background: t.c.surface2,
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: pct + "%",
                  height: "100%",
                  background: col,
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
window.CategoryList = CategoryList;

function KidCard({ kid }) {
  const t = useTokens();
  const pctDay = kid.todayMinutes / kid.todayGoal;
  const pctWeek = kid.weekMinutes / kid.weekGoal;
  const over = kid.status === "over";

  const [showDetail, setShowDetail] = React.useState(false);
  const [showPause, setShowPause] = React.useState(false);

  return (
    <Card style={{ padding: 0 }}>
      <div
        style={{
          padding: t.pad,
          display: "flex",
          gap: 18,
          alignItems: "center",
        }}
      >
        <Ring
          value={kid.todayMinutes}
          max={kid.todayGoal}
          size={92}
          stroke={9}
          color={over ? t.c.danger : t.c.primary}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: t.fontMono,
                fontSize: 17,
                fontWeight: 500,
                color: over ? t.c.danger : t.c.text,
                lineHeight: 1,
              }}
            >
              {fmtTime(kid.todayMinutes)}
            </div>
            <div style={{ fontSize: 9.5, color: t.c.textMute, marginTop: 4 }}>
              of {fmtTime(kid.todayGoal)}
            </div>
          </div>
        </Ring>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name={kid.name} color={kid.avatar} size={28} />
            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: "-.01em",
              }}
            >
              {kid.name}
            </div>
            <span style={{ fontSize: 12, color: t.c.textMute }}>
              · age {kid.age}
            </span>
          </div>
          <div
            style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}
          >
            {over ? (
              <Chip bg={t.c.dangerSoft} color={t.c.danger}>
                ● Over limit
              </Chip>
            ) : (
              <Chip bg={t.c.primarySoft} color={t.c.primary}>
                ● On track
              </Chip>
            )}
            {kid.streak > 0 && (
              <Chip bg={t.c.yellowSoft} color={t.c.yellowText}>
                🔥 {kid.streak}-day streak
              </Chip>
            )}
            <Chip bg={t.c.surface2} color={t.c.textMute}>
              <Icon name="phone" size={10} /> {kid.device}
            </Chip>
          </div>
          <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 8 }}>
            Last active {kid.lastActive}
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "14px " + t.pad + "px",
          borderTop: `1px dashed ${t.c.border}`,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
        }}
      >
        <Mini
          label="Top app"
          value={kid.topApps[0].name}
          hint={fmtTime(kid.topApps[0].mins)}
          color={kid.topApps[0].color}
        />
        <Mini
          label="This week"
          value={fmtTime(kid.weekMinutes)}
          hint={`of ${fmtTime(kid.weekGoal)} goal`}
          pct={pctWeek}
        />
        <Mini
          label="Notifications"
          value={kid.topApps.reduce((a, x) => a + x.notifs, 0)}
          hint="today"
        />
      </div>

      <div
        style={{
          padding: "12px " + t.pad + "px 16px",
          display: "flex",
          gap: 8,
          borderTop: `1px solid ${t.c.border}`,
          background: t.c.surface2,
          borderRadius: "0 0 18px 18px",
        }}
      >
        <Button
          variant="primary"
          size="sm"
          icon="eye"
          onClick={() => setShowDetail(true)}
        >
          Open detail
        </Button>
        <Button
          variant="outline"
          size="sm"
          icon="lock"
          onClick={() => setShowPause(true)}
        >
          Pause device
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon="more"
          style={{ marginLeft: "auto" }}
        />
      </div>

      {/* Detailed Drawer */}
      {showDetail && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "flex-end",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setShowDetail(false)}
        >
          <div
            style={{
              width: 480,
              height: "100%",
              background: t.c.bg,
              borderLeft: `1px solid ${t.c.border}`,
              padding: 32,
              display: "flex",
              flexDirection: "column",
              color: t.c.text,
              boxShadow: "-10px 0 30px rgba(0,0,0,0.15)",
              textAlign: "left",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar name={kid.name} color={kid.avatar} size={36} />
                <div>
                  <div
                    style={{
                      fontFamily: t.fontSerif,
                      fontSize: 24,
                      fontWeight: 500,
                    }}
                  >
                    {kid.name}'s Details
                  </div>
                  <div style={{ fontSize: 12, color: t.c.textMute }}>
                    Last active {kid.lastActive}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDetail(false)}
                style={{
                  background: t.c.surface2,
                  border: `1px solid ${t.c.border}`,
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  color: t.c.text,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Daily screen time */}
              <div
                style={{
                  background: t.c.surface,
                  borderRadius: 14,
                  padding: 18,
                  border: `1px solid ${t.c.border}`,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: t.c.textMute,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: ".05em",
                    marginBottom: 8,
                  }}
                >
                  Daily Screen Time
                </div>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 6 }}
                >
                  <span style={{ fontSize: 32, fontWeight: "bold" }}>
                    {fmtTime(kid.todayMinutes)}
                  </span>
                  <span style={{ fontSize: 14, color: t.c.textMute }}>
                    of {fmtTime(kid.todayGoal)} goal
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: t.c.surface2,
                    borderRadius: 3,
                    marginTop: 12,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(100, pctDay * 100)}%`,
                      height: "100%",
                      background: over ? t.c.danger : t.c.primary,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>

              {/* Device and status */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    background: t.c.surface,
                    borderRadius: 14,
                    padding: 14,
                    border: `1px solid ${t.c.border}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: t.c.textMute,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    Device
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>
                    {kid.device}
                  </div>
                </div>
                <div
                  style={{
                    background: t.c.surface,
                    borderRadius: 14,
                    padding: 14,
                    border: `1px solid ${t.c.border}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: t.c.textMute,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    Status
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: over ? t.c.danger : t.c.primary,
                    }}
                  >
                    {over ? "Over Limit" : "On Track"}
                  </div>
                </div>
              </div>

              {/* App limits details list */}
              <div
                style={{
                  background: t.c.surface,
                  borderRadius: 14,
                  padding: 18,
                  border: `1px solid ${t.c.border}`,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: t.c.textMute,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: ".05em",
                    marginBottom: 12,
                  }}
                >
                  Today's Apps Usage
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {kid.topApps.map((app, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: app.color,
                          }}
                        />
                        <span style={{ fontWeight: 500 }}>{app.name}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontFamily: t.fontMono }}>
                          {fmtTime(app.mins)}
                        </span>
                        {app.limit && (
                          <span style={{ fontSize: 11, color: t.c.textMute }}>
                            / {fmtTime(app.limit)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                paddingTop: 20,
                borderTop: `1px solid ${t.c.border}`,
                display: "flex",
                gap: 12,
              }}
            >
              <Button
                variant="outline"
                size="sm"
                icon="lock"
                onClick={() => {
                  setShowDetail(false);
                  setShowPause(true);
                }}
                style={{ flex: 1, justifyContent: "center" }}
              >
                Pause device
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pause Confirmation Modal */}
      {showPause && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 11000,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setShowPause(false)}
        >
          <div
            style={{
              width: 380,
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
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: t.c.dangerSoft,
                color: t.c.danger,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Icon name="lock" size={28} />
            </div>

            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 22,
                fontWeight: 500,
                marginBottom: 8,
              }}
            >
              Pause {kid.name}'s Device?
            </div>

            <div
              style={{
                fontSize: 13.5,
                color: t.c.textMute,
                lineHeight: 1.5,
                marginBottom: 24,
              }}
            >
              This will lock all non-allowed apps on {kid.name}'s {kid.device}{" "}
              immediately. You can unpause it at any time.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert(`${kid.name}'s device paused!`);
                  setShowPause(false);
                }}
                style={{
                  width: "100%",
                  background: t.c.danger,
                  borderColor: t.c.danger,
                  color: "#fff",
                  justifyContent: "center",
                }}
              >
                Pause immediately
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPause(false)}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function Mini({ label, value, hint, color, pct }) {
  const t = useTokens();
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          color: t.c.textMute,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: ".05em",
          marginBottom: 5,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {color && (
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: color,
            }}
          />
        )}
        <div style={{ fontWeight: 600, fontSize: 14, letterSpacing: "-.01em" }}>
          {value}
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: t.c.textMute, marginTop: 2 }}>
        {hint}
      </div>
      {pct != null && (
        <div
          style={{
            marginTop: 6,
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
              background: pct > 1 ? t.c.danger : t.c.primary,
            }}
          />
        </div>
      )}
    </div>
  );
}
window.Mini = Mini;
window.ParentDashboard = ParentDashboard;

// ───────────────────── Single-Child Detail ─────────────────────

function ChildDetail() {
  const t = useTokens();
  const k = APP_DATA.kids[0]; // Maya

  const [showPause, setShowPause] = React.useState(false);

  return (
    <WebShell
      role="parent"
      active="kids"
      title="Maya, 11"
      subtitle={"Family › Kids › Maya · iPhone 14 · Last active 12 min ago"}
      headerExtra={
        <>
          <Button
            variant="outline"
            size="sm"
            icon="lock"
            onClick={() => setShowPause(true)}
          >
            Pause device
          </Button>
          <Button variant="primary" size="sm" icon="plus">
            Add limit
          </Button>
        </>
      }
    >
      {/* Hero row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr 1fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        {/* Today ring & summary */}
        <Card>
          <SectionHead title="Today" subtitle="Thursday, April 16" />
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <Ring
              value={k.todayMinutes}
              max={k.todayGoal}
              size={140}
              stroke={12}
              color={t.c.primary}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: t.fontMono,
                    fontSize: 26,
                    fontWeight: 500,
                    letterSpacing: "-.02em",
                  }}
                >
                  {fmtTime(k.todayMinutes)}
                </div>
                <div style={{ fontSize: 11, color: t.c.textMute }}>
                  of {fmtTime(k.todayGoal)} budget
                </div>
              </div>
            </Ring>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                Maya is <b style={{ color: t.c.primary }}>53 minutes</b> under
                today's budget. Most time today was on <b>Video</b>.
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Stat icon="bell" label="Notifications" value="87" />
                <Stat icon="phone" label="Pickups" value="62" />
                <Stat
                  icon="flame"
                  label="Current streak"
                  value="4 days"
                  color={t.c.warn}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Goals */}
        <Card>
          <SectionHead
            title="Goals"
            subtitle="Day & week budgets"
            action={
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            }
          />
          <GoalRow label="Daily" current={k.todayMinutes} goal={k.todayGoal} />
          <div style={{ height: 14 }} />
          <GoalRow label="Weekly" current={k.weekMinutes} goal={k.weekGoal} />
          <div
            style={{
              marginTop: 18,
              padding: 12,
              borderRadius: 12,
              background: t.c.primarySoft,
              fontSize: 12.5,
              color: t.c.primary,
              lineHeight: 1.5,
            }}
          >
            <b>Coach:</b> at this pace Maya will finish the week ~3h under goal.
            Nicely done.
          </div>
        </Card>

        {/* Category donut */}
        <Card>
          <SectionHead title="Today by category" subtitle="187 min total" />
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <DonutCategory
              data={k.categories}
              size={156}
              stroke={22}
              centerLabel="today"
              centerValue={fmtTime(k.todayMinutes)}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 7,
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

      {/* Weekly chart full width */}
      <Card style={{ marginBottom: 18 }}>
        <SectionHead
          title="This week"
          subtitle="Hours used per day · goal line at 4h"
          action={
            <div style={{ display: "flex", gap: 8 }}>
              <Chip bg={t.c.surface2}>Daily</Chip>
              <Chip bg={t.c.surface}>Weekly</Chip>
              <Chip bg={t.c.surface}>Monthly</Chip>
            </div>
          }
        />
        <BarChartWeekly
          data={APP_DATA.weeklyHours.maya}
          goal={4}
          height={220}
          todayIndex={4}
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
      </Card>

      {/* App leaderboard */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18 }}
      >
        <Card>
          <SectionHead
            title="All apps today"
            subtitle="Tap any app to set or change a limit"
            action={
              <div style={{ display: "flex", gap: 6 }}>
                <Chip bg={t.c.primarySoft} color={t.c.primary}>
                  All apps
                </Chip>
                <Chip bg={t.c.surface2}>Limited only</Chip>
                <Chip bg={t.c.surface2}>Locked</Chip>
              </div>
            }
          />
          <AppLeaderboard apps={k.topApps} />
        </Card>

        <Card>
          <SectionHead
            title="Recent activity"
            subtitle="No exact timestamps (privacy)"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              {
                icon: "lock",
                text: "TikTok hit daily limit",
                sub: "Earlier today",
                col: t.c.danger,
                bg: t.c.dangerSoft,
              },
              {
                icon: "check",
                text: "Finished Duolingo daily lesson",
                sub: "Earlier today",
                col: t.c.primary,
                bg: t.c.primarySoft,
              },
              {
                icon: "alert",
                text: "At 80% of Roblox limit",
                sub: "Late afternoon",
                col: t.c.warn,
                bg: t.c.warnSoft,
              },
              {
                icon: "message",
                text: "Requested 30 more minutes on Roblox",
                sub: "Late afternoon",
                col: t.c.lavender,
                bg: t.c.lavSoft,
              },
              {
                icon: "calendar",
                text: "Weekday schedule started",
                sub: "Morning",
                col: t.c.blue,
                bg: t.c.blueSoft,
              },
            ].map((e, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: e.bg,
                    color: e.col,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={e.icon} size={14} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>{e.text}</div>
                  <div
                    style={{
                      fontSize: 11.5,
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
        </Card>
      </div>

      {/* Pause Confirmation Modal */}
      {showPause && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 11000,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setShowPause(false)}
        >
          <div
            style={{
              width: 380,
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
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: t.c.dangerSoft,
                color: t.c.danger,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Icon name="lock" size={28} />
            </div>

            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 22,
                fontWeight: 500,
                marginBottom: 8,
              }}
            >
              Pause {k.name}'s Device?
            </div>

            <div
              style={{
                fontSize: 13.5,
                color: t.c.textMute,
                lineHeight: 1.5,
                marginBottom: 24,
              }}
            >
              This will lock all non-allowed apps on {k.name}'s {k.device}{" "}
              immediately. You can unpause it at any time.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert(`${k.name}'s device paused!`);
                  setShowPause(false);
                }}
                style={{
                  width: "100%",
                  background: t.c.danger,
                  borderColor: t.c.danger,
                  color: "#fff",
                  justifyContent: "center",
                }}
              >
                Pause immediately
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPause(false)}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </WebShell>
  );
}

function Stat({ icon, label, value, color }) {
  const t = useTokens();
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: 7,
          background: t.c.surface2,
          color: color || t.c.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={icon} size={13} />
      </div>
      <span style={{ color: t.c.textMute, flex: 1 }}>{label}</span>
      <span style={{ fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function GoalRow({ label, current, goal }) {
  const t = useTokens();
  const pct = current / goal;
  const over = pct > 1;
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 12.5, color: t.c.textMute }}>{label}</span>
        <span
          style={{
            fontFamily: t.fontMono,
            fontSize: 13.5,
            fontWeight: 500,
            color: over ? t.c.danger : t.c.text,
          }}
        >
          {fmtTime(current)}{" "}
          <span style={{ color: t.c.textMute, fontWeight: 400 }}>
            / {fmtTime(goal)}
          </span>
        </span>
      </div>
      <div
        style={{
          height: 8,
          background: t.c.surface2,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: Math.min(100, pct * 100) + "%",
            height: "100%",
            background: over ? t.c.danger : t.c.primary,
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
}
window.GoalRow = GoalRow;

function AppLeaderboard({ apps }) {
  const t = useTokens();
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2.5fr 1.2fr 90px 60px 80px",
          gap: 14,
          padding: "0 6px 8px",
          fontSize: 11,
          color: t.c.textMute,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: ".05em",
          borderBottom: `1px solid ${t.c.border}`,
        }}
      >
        <div>App</div>
        <div>Today vs. limit</div>
        <div>Trend (7d)</div>
        <div style={{ textAlign: "right" }}>Notif</div>
        <div style={{ textAlign: "right" }}>Pickups</div>
      </div>
      {apps.map((a, idx) => {
        const limited = a.limit != null;
        const pct = limited ? a.mins / a.limit : 0;
        const trend = Array.from({ length: 7 }, () =>
          Math.max(1, a.mins / 1.4 + (Math.random() - 0.5) * a.mins * 0.4),
        );
        return (
          <div
            key={a.key || `${a.name}-${idx}`}
            style={{
              display: "grid",
              gridTemplateColumns: "2.5fr 1.2fr 90px 60px 80px",
              gap: 14,
              alignItems: "center",
              padding: "14px 6px",
              borderBottom: `1px dashed ${t.c.border}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                minWidth: 0,
              }}
            >
              <AppTile app={a} />
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 13.5,
                    letterSpacing: "-.005em",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {a.name}
                </div>
                <div style={{ fontSize: 11.5, color: t.c.textMute }}>
                  {a.cat}
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginBottom: 4,
                }}
              >
                <span style={{ fontFamily: t.fontMono, fontWeight: 500 }}>
                  {fmtTime(a.mins)}
                </span>
                <span style={{ color: t.c.textMute }}>
                  {limited ? fmtTime(a.limit) : "no limit"}
                </span>
              </div>
              {limited ? (
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
                      width: Math.min(100, pct * 100) + "%",
                      height: "100%",
                      background:
                        pct > 1
                          ? t.c.danger
                          : pct > 0.8
                            ? t.c.warn
                            : t.c.primary,
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    height: 5,
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: 1,
                      width: "100%",
                      borderBottom: `1px dashed ${t.c.border}`,
                    }}
                  />
                </div>
              )}
            </div>
            <Sparkline
              data={trend}
              width={80}
              height={26}
              color={pct > 1 ? t.c.danger : t.c.primary}
              fill={pct > 1 ? t.c.danger : t.c.primary}
            />
            <div
              style={{
                textAlign: "right",
                fontFamily: t.fontMono,
                fontSize: 12.5,
                color: t.c.textMute,
              }}
            >
              {a.notifs}
            </div>
            <div
              style={{
                textAlign: "right",
                fontFamily: t.fontMono,
                fontSize: 12.5,
                color: t.c.textMute,
              }}
            >
              {a.pickups}
            </div>
          </div>
        );
      })}
    </div>
  );
}
window.AppLeaderboard = AppLeaderboard;
window.ChildDetail = ChildDetail;

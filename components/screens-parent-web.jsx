// Parent web — Family overview + Single-child detail

const { useState: useStateP } = React;

// ───────────────────── Parent Dashboard ─────────────────────

function ParentDashboardInner() {
  const t = useTokens();
  const D = APP_DATA;
  const totalToday = D.kids.reduce((a, k) => a + k.todayMinutes, 0);

  return (
    <>
      {/* Hero strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        <Card style={{ position: "relative", overflow: "hidden" }}>
          <svg
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 70,
              width: "100%",
              opacity: t.dark ? 0.06 : 0.09,
              pointerEvents: "none",
              zIndex: 0,
            }}
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C10,15 25,35 40,10 C60,30 80,5 100,40"
              fill="none"
              stroke={t.c.primary}
              strokeWidth="3.5"
            />
            <path
              d="M0,40 C10,15 25,35 40,10 C60,30 80,5 100,40 L100,40 L0,40 Z"
              fill={t.c.primary}
            />
          </svg>
          <div
            style={{
              position: "relative",
              zIndex: 1,
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
    </>
  );
}

function ParentDashboard() {
  return (
    <WebShell
      role="parent"
      active="overview"
      title="Good afternoon, Sarah"
      subtitle={"Thursday, April 16 · Family overview"}
    >
      <ParentDashboardInner />
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
window.ParentDashboardInner = ParentDashboardInner;

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

function AICoachWeb() {
  const t = useTokens();
  const tips = [
    {
      category: "ROUTINE",
      title: "TikTok Homework Peak",
      desc: "Maya's pickups on TikTok spike between 4:00 PM and 6:00 PM. She unlocks TikTok 8 times during this period.",
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
    },
  ];

  return (
    <WebShell
      role="parent"
      active="overview"
      title="AI Coach"
      subtitle="Personalized family screen tips & trends"
    >
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: t.c.primarySoft,
                  color: t.c.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="sparkles" size={24} />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: t.fontSerif,
                    fontSize: 20,
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  Atrium AI Assistant
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: t.c.textMute,
                    margin: "4px 0 0",
                  }}
                >
                  Analyzing patterns for Maya & Jaden. Updated 10 minutes ago.
                </p>
              </div>
            </div>
          </Card>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {tips.slice(0, 2).map((tip, idx) => (
              <Card key={idx}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 100,
                      background: tip.bg,
                      color: tip.color,
                      letterSpacing: ".05em",
                    }}
                  >
                    {tip.category}
                  </span>
                  <span style={{ fontSize: 11, color: t.c.textMute }}>
                    {tip.time}
                  </span>
                </div>
                <h4
                  style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px" }}
                >
                  {tip.title}
                </h4>
                <p
                  style={{
                    fontSize: 13,
                    color: t.c.textMute,
                    lineHeight: 1.5,
                    margin: "0 0 16px",
                  }}
                >
                  {tip.desc}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  icon="arrowRight"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {tip.action}
                </Button>
              </Card>
            ))}
          </div>

          <Card>
            <h4
              style={{
                fontFamily: t.fontSerif,
                fontSize: 18,
                fontWeight: 500,
                margin: "0 0 12px",
              }}
            >
              Habit Analysis Graph
            </h4>
            <div
              style={{
                height: 160,
                display: "flex",
                alignItems: "flex-end",
                gap: 12,
                padding: "10px 0",
              }}
            >
              {[35, 45, 60, 25, 40, 20, 15].map((val, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: val * 2,
                      background: idx === 2 ? t.c.accent : t.c.primarySoft,
                      borderRadius: 4,
                    }}
                  />
                  <span style={{ fontSize: 10, color: t.c.textMute }}>
                    {["M", "T", "W", "T", "F", "S", "S"][idx]}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                fontSize: 12,
                color: t.c.textMute,
                marginTop: 10,
                textAlign: "center",
              }}
            >
              Spike on Wednesday homework hours due to TikTok usage.
            </div>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card>
            <h4
              style={{
                fontFamily: t.fontSerif,
                fontSize: 18,
                fontWeight: 500,
                margin: "0 0 12px",
              }}
            >
              Family Streak
            </h4>
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <span style={{ fontSize: 48 }}>🔥</span>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  margin: "8px 0 4px",
                }}
              >
                12 Days
              </div>
              <div style={{ fontSize: 12.5, color: t.c.textMute }}>
                Maya and Jaden both hit their goals.
              </div>
            </div>
          </Card>

          <Card>
            <h4
              style={{
                fontFamily: t.fontSerif,
                fontSize: 18,
                fontWeight: 500,
                margin: "0 0 12px",
              }}
            >
              Coach Tips Checklist
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Talk to Maya about Wednesday's streak",
                "Review Jaden's late night music routine",
                "Approve pending Roblox time request",
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{ display: "flex", gap: 10, alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    defaultChecked={idx === 0}
                    style={{ accentColor: t.c.primary }}
                  />
                  <span style={{ fontSize: 12.5, color: t.c.text }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </WebShell>
  );
}
window.AICoachWeb = AICoachWeb;

function WebLogin() {
  const t = useTokens();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Signed in successfully!");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.c.bg,
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        boxSizing: "border-box",
      }}
    >
      {/* Left side: Hero artwork / product showcase */}
      <div
        style={{
          background: `linear-gradient(135deg, ${t.c.primarySoft} 0%, ${t.c.surface2} 100%)`,
          padding: 60,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          borderRight: `1px solid ${t.c.border}`,
        }}
      >
        {/* Decorative background blur blobs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: t.c.yellow,
            filter: "blur(85px)",
            opacity: 0.15,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -50,
            left: -50,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: t.c.accent,
            filter: "blur(65px)",
            opacity: 0.15,
          }}
        />

        <div
          style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 2 }}
        >
          <Icon name="sparkles" size={28} color={t.c.primary} />
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              fontFamily: t.fontSerif,
              letterSpacing: "-.02em",
              color: t.c.text,
            }}
          >
            Atrium
          </span>
        </div>

        <div style={{ zIndex: 2, maxWidth: 460 }}>
          <h1
            style={{
              fontFamily: t.fontSerif,
              fontSize: 44,
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-.02em",
              color: t.c.text,
              margin: "0 0 16px",
            }}
          >
            Bring calm back to your family's screens.
          </h1>
          <p
            style={{
              fontSize: 16,
              color: t.c.textMute,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Atrium helps kids and parents reflect on their screen routines with
            soft bounds, positive streaks, and empathetic coaching.
          </p>

          {/* Floating Glassmorphic Card Showcase */}
          <div
            style={{
              marginTop: 40,
              background: t.c.surface,
              borderRadius: 20,
              padding: "24px 28px",
              border: `1px solid ${t.c.border}`,
              boxShadow: "0 20px 48px rgba(0,0,0,.03)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: t.c.yellowSoft || "rgba(245, 158, 11, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.05)",
                  }}
                >
                  🔥
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      color: t.c.text,
                      letterSpacing: "-.01em",
                    }}
                  >
                    Mindful Habit Streaks
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: t.c.textMute,
                      marginTop: 2,
                    }}
                  >
                    Encourage daily screen-free windows
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontSize: 8,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                  padding: "5px 10px",
                  borderRadius: 8,
                  background: t.c.surface2,
                  border: `1px solid ${t.c.border}`,
                  color: t.c.textMute,
                  fontWeight: 600,
                }}
              >
                Feature Preview
              </span>
            </div>

            <div style={{ height: 1, background: t.c.border }} />

            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: t.c.primarySoft || "rgba(16, 185, 129, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: t.c.primary,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <Icon name="sparkles" size={13} />
              </div>
              <div style={{ fontSize: 13.5, color: t.c.text, lineHeight: 1.5 }}>
                <span style={{ fontWeight: 600, color: t.c.primary }}>
                  Empathetic Coaching:
                </span>{" "}
                Suggests gentle screen breaks instead of rigid lockouts to build
                trust.
              </div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 12.5, color: t.c.textMute, zIndex: 2 }}>
          © Atrium. Dedicated to healthy digital boundaries.
        </div>
      </div>

      {/* Right side: Login Form */}
      <div
        style={{
          padding: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 360, width: "100%", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: t.fontSerif,
              fontSize: 32,
              fontWeight: 500,
              margin: "0 0 8px",
              color: t.c.text,
            }}
          >
            Welcome Back
          </h2>
          <p
            style={{ fontSize: 14.5, color: t.c.textMute, margin: "0 0 32px" }}
          >
            Sign in to your parent administration hub
          </p>

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: t.c.textMute,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                  letterSpacing: ".05em",
                }}
              >
                Parent Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@atrium.com"
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: 12,
                  background: t.c.surface,
                  border: `1px solid ${t.c.border}`,
                  color: t.c.text,
                  fontSize: 14.5,
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: t.c.textMute,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                  letterSpacing: ".05em",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: 12,
                  background: t.c.surface,
                  border: `1px solid ${t.c.border}`,
                  color: t.c.text,
                  fontSize: 14.5,
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  outline: "none",
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
                padding: "15px 0",
                fontWeight: 600,
                fontSize: 15,
                fontFamily: "inherit",
                cursor: "pointer",
                marginTop: 8,
                boxShadow: "0 4px 16px rgba(92,138,107,.15)",
              }}
            >
              Sign in to Atrium
            </button>
          </form>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: t.c.textMute,
              fontSize: 13,
              margin: "24px 0",
            }}
          >
            <div style={{ flex: 1, height: 1, background: t.c.border }} />
            <span>or sign in with</span>
            <div style={{ flex: 1, height: 1, background: t.c.border }} />
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <button
              type="button"
              style={{
                background: t.c.surface,
                border: `1px solid ${t.c.border}`,
                borderRadius: 12,
                padding: "12px 0",
                fontSize: 14,
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
                padding: "12px 0",
                fontSize: 14,
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
    </div>
  );
}

function WebOnboardStep1({ childName, setChildName, onNext }) {
  const t = useTokens();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: 40,
        height: "100%",
      }}
    >
      {/* Left Column: Side Info Panel */}
      <div
        style={{
          background: t.c.surface2,
          borderRadius: 16,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: t.c.primary,
              textTransform: "uppercase",
              letterSpacing: ".05em",
            }}
          >
            Profile Setup
          </span>
          <h3
            style={{
              fontFamily: t.fontSerif,
              fontSize: 20,
              fontWeight: 500,
              margin: "8px 0 12px",
              color: t.c.text,
            }}
          >
            Why this matters
          </h3>
          <p
            style={{
              fontSize: 13,
              color: t.c.textMute,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Creating a profile lets Atrium tailor its screen schedules
            specifically to your child's age group guidelines.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: t.c.surface,
            padding: 12,
            borderRadius: 12,
          }}
        >
          <Icon name="shieldCheck" size={16} color={t.c.primary} />
          <span style={{ fontSize: 11, color: t.c.textMute }}>
            We never collect your child's Apple ID or login details.
          </span>
        </div>
      </div>

      {/* Right Column: Step Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: t.fontSerif,
              fontSize: 32,
              fontWeight: 500,
              margin: "0 0 8px",
              color: t.c.text,
            }}
          >
            Create child profile
          </h2>
          <p style={{ fontSize: 14.5, color: t.c.textMute, marginBottom: 32 }}>
            Enter their details to configure device linking.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              marginBottom: 24,
            }}
          >
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: t.c.textMute,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Child's Name
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: t.c.surface2,
                  border: `1px solid ${t.c.border}`,
                  color: t.c.text,
                  fontSize: 14.5,
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: t.c.textMute,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Age
              </label>
              <input
                type="text"
                defaultValue="11"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: t.c.surface2,
                  border: `1px solid ${t.c.border}`,
                  color: t.c.text,
                  fontSize: 14.5,
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: t.c.textMute,
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              Device Type
            </label>
            <div style={{ display: "flex", gap: 12 }}>
              {["iPhone", "Android Phone", "iPad / Tablet"].map((d, i) => (
                <button
                  key={d}
                  type="button"
                  style={{
                    flex: 1,
                    padding: "14px 18px",
                    borderRadius: 12,
                    background: i === 0 ? t.c.primarySoft : t.c.surface,
                    border: `1px solid ${i === 0 ? t.c.primary : t.c.border}`,
                    color: i === 0 ? t.c.primary : t.c.text,
                    fontWeight: 600,
                    fontSize: 13.5,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <Icon
                    name="phone"
                    size={15}
                    color={i === 0 ? t.c.primary : t.c.textMute}
                  />
                  <span>{d}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 40 }}
        >
          <button
            onClick={onNext}
            style={{
              background: t.c.primary,
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "14px 32px",
              fontWeight: 600,
              fontSize: 14.5,
              fontFamily: "inherit",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(92,138,107,.15)",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function WebOnboardStep2({ childName, onNext, onBack }) {
  const t = useTokens();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: 40,
        height: "100%",
      }}
    >
      {/* Left Column: Side Info Panel */}
      <div
        style={{
          background: t.c.surface2,
          borderRadius: 16,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: t.c.primary,
              textTransform: "uppercase",
              letterSpacing: ".05em",
            }}
          >
            Pairing Device
          </span>
          <h3
            style={{
              fontFamily: t.fontSerif,
              fontSize: 20,
              fontWeight: 500,
              margin: "8px 0 12px",
              color: t.c.text,
            }}
          >
            How to link
          </h3>
          <ol
            style={{
              fontSize: 13,
              color: t.c.textMute,
              paddingLeft: 18,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            <li style={{ marginBottom: 8 }}>
              Open Atrium on {childName}'s phone.
            </li>
            <li style={{ marginBottom: 8 }}>Select "I am a Child" role.</li>
            <li>Point their camera at this QR code.</li>
          </ol>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            background: t.c.primarySoft,
            padding: "10px 14px",
            borderRadius: 10,
            color: t.c.primary,
            fontSize: 12,
          }}
        >
          <Icon name="shieldCheck" size={15} />
          <span>
            Passcode:{" "}
            <strong style={{ fontFamily: t.fontMono }}>F4-9K-2A-7P</strong>
          </span>
        </div>
      </div>

      {/* Right Column: Step QR */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: t.fontSerif,
              fontSize: 32,
              fontWeight: 500,
              margin: "0 0 8px",
              color: t.c.text,
            }}
          >
            Scan to link device
          </h2>
          <p style={{ fontSize: 14.5, color: t.c.textMute, marginBottom: 32 }}>
            Pair parent controls with {childName}'s iPhone securely.
          </p>

          <div
            style={{
              display: "flex",
              gap: 40,
              alignItems: "center",
              background: t.c.surface,
              border: `1px solid ${t.c.border}`,
              padding: 24,
              borderRadius: 20,
            }}
          >
            <div
              style={{
                background: t.c.surface2,
                padding: 16,
                borderRadius: 16,
                border: `1px solid ${t.c.border}`,
              }}
            >
              <QRCodeMock size={140} fg={t.c.text} bg={t.c.surface2} />
            </div>
            <div>
              <div
                style={{ fontSize: 13, color: t.c.textMute, marginBottom: 8 }}
              >
                Or enter pairing code manually:
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontFamily: t.fontMono,
                  fontWeight: "bold",
                  letterSpacing: ".1em",
                  color: t.c.primary,
                }}
              >
                F4-9K-2A-7P
              </div>
              <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 8 }}>
                QR code and manual pairing passcode expire in 10 minutes.
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: "transparent",
              color: t.c.text,
              border: "none",
              fontSize: 14.5,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            style={{
              background: t.c.primary,
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "14px 32px",
              fontWeight: 600,
              fontSize: 14.5,
              fontFamily: "inherit",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(92,138,107,.15)",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function WebOnboardStep3({ childName, onNext, onBack }) {
  const t = useTokens();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: 40,
        height: "100%",
      }}
    >
      {/* Left Column: Side Info Panel */}
      <div
        style={{
          background: t.c.surface2,
          borderRadius: 16,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: t.c.primary,
              textTransform: "uppercase",
              letterSpacing: ".05em",
            }}
          >
            Boundaries
          </span>
          <h3
            style={{
              fontFamily: t.fontSerif,
              fontSize: 20,
              fontWeight: 500,
              margin: "8px 0 12px",
              color: t.c.text,
            }}
          >
            Calm, not locking
          </h3>
          <p
            style={{
              fontSize: 13,
              color: t.c.textMute,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            We recommend setting loose bedtime routines first. This lets kids
            practice scheduling without immediate hard locks.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: t.c.surface,
            padding: 12,
            borderRadius: 12,
          }}
        >
          <Icon name="lightbulb" size={16} color={t.c.primary} />
          <span style={{ fontSize: 11, color: t.c.textMute }}>
            You can refine schedules and custom limits at any time.
          </span>
        </div>
      </div>

      {/* Right Column: Step Config */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: t.fontSerif,
              fontSize: 32,
              fontWeight: 500,
              margin: "0 0 8px",
              color: t.c.text,
            }}
          >
            Setup initial rules
          </h2>
          <p style={{ fontSize: 14.5, color: t.c.textMute, marginBottom: 24 }}>
            Set simple start limits to get going.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: t.c.surface2,
                padding: "16px 20px",
                borderRadius: 12,
                border: `1px solid ${t.c.border}`,
              }}
            >
              <div>
                <div
                  style={{ fontWeight: 600, fontSize: 14.5, color: t.c.text }}
                >
                  Enable Bedtime Lock
                </div>
                <div
                  style={{ fontSize: 12.5, color: t.c.textMute, marginTop: 2 }}
                >
                  Locks device 9:00 PM – 7:00 AM
                </div>
              </div>
              <Toggle on={true} />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: t.c.surface2,
                padding: "16px 20px",
                borderRadius: 12,
                border: `1px solid ${t.c.border}`,
              }}
            >
              <div>
                <div
                  style={{ fontWeight: 600, fontSize: 14.5, color: t.c.text }}
                >
                  School Day Block
                </div>
                <div
                  style={{ fontSize: 12.5, color: t.c.textMute, marginTop: 2 }}
                >
                  Mutes notifications during school hours
                </div>
              </div>
              <Toggle on={true} />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: t.c.surface2,
                padding: "16px 20px",
                borderRadius: 12,
                border: `1px solid ${t.c.border}`,
              }}
            >
              <div>
                <div
                  style={{ fontWeight: 600, fontSize: 14.5, color: t.c.text }}
                >
                  Weekly AI Insight Coaching
                </div>
                <div
                  style={{ fontSize: 12.5, color: t.c.textMute, marginTop: 2 }}
                >
                  Receive personalized screen routine tips
                </div>
              </div>
              <Toggle on={true} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: "transparent",
              color: t.c.text,
              border: "none",
              fontSize: 14.5,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            style={{
              background: t.c.primary,
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "14px 32px",
              fontWeight: 600,
              fontSize: 14.5,
              fontFamily: "inherit",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(92,138,107,.15)",
            }}
          >
            All set! Finish setup
          </button>
        </div>
      </div>
    </div>
  );
}

function WebOnboardWelcomeScreen({ onSelect }) {
  const t = useTokens();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h2
          style={{
            fontFamily: t.fontSerif,
            fontSize: 32,
            fontWeight: 500,
            color: t.c.text,
            margin: "0 0 8px",
          }}
        >
          Welcome to Atrium
        </h2>
        <p style={{ fontSize: 14.5, color: t.c.textMute, margin: 0 }}>
          Mindful daily screen habits for your family. Empathetic guidance
          instead of rigid blocks.
        </p>
      </div>

      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: t.c.textMute,
            textTransform: "uppercase",
            letterSpacing: ".05em",
            marginBottom: 16,
          }}
        >
          Who is using this device?
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          <button
            onClick={() => onSelect("parent-ind")}
            style={{
              padding: 24,
              borderRadius: 16,
              background: t.c.surface,
              border: `1px solid ${t.c.border}`,
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              boxShadow: "0 4px 20px rgba(0,0,0,.01)",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${t.c.primary}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: t.c.primary,
              }}
            >
              <Icon name="sparkles" size={20} />
            </div>
            <div>
              <h4
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: t.c.text,
                  margin: "0 0 6px",
                }}
              >
                Parent / Independent
              </h4>
              <p
                style={{
                  fontSize: 13,
                  color: t.c.textMute,
                  margin: 0,
                  lineHeight: 1.45,
                }}
              >
                Manage child limits, routines, or track your own personal
                wellbeing.
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelect("child")}
            style={{
              padding: 24,
              borderRadius: 16,
              background: t.c.surface,
              border: `1px solid ${t.c.border}`,
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              boxShadow: "0 4px 20px rgba(0,0,0,.01)",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${t.c.accent}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: t.c.accent,
              }}
            >
              <Icon name="phone" size={20} />
            </div>
            <div>
              <h4
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: t.c.text,
                  margin: "0 0 6px",
                }}
              >
                Child Device
              </h4>
              <p
                style={{
                  fontSize: 13,
                  color: t.c.textMute,
                  margin: 0,
                  lineHeight: 1.45,
                }}
              >
                Pair this device with parent controls to view streaks and daily
                budgets.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function WebOnboardRoleQuestion({ onAnswer, onBack }) {
  const t = useTokens();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h2
          style={{
            fontFamily: t.fontSerif,
            fontSize: 32,
            fontWeight: 500,
            color: t.c.text,
            margin: "0 0 8px",
          }}
        >
          Are you managing children's devices?
        </h2>
        <p style={{ fontSize: 14.5, color: t.c.textMute, margin: 0 }}>
          Configure Atrium to suit your personal goals or family parameters.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <button
          onClick={() => onAnswer("family")}
          style={{
            padding: 24,
            borderRadius: 16,
            background: t.c.surface,
            border: `1px solid ${t.c.border}`,
            textAlign: "left",
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,.01)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `${t.c.primary}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: t.c.primary,
            }}
          >
            <Icon name="users" size={20} />
          </div>
          <div>
            <h4
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: t.c.text,
                margin: "0 0 6px",
              }}
            >
              Yes, I am a Parent
            </h4>
            <p
              style={{
                fontSize: 13,
                color: t.c.textMute,
                margin: 0,
                lineHeight: 1.45,
              }}
            >
              I want to setup profiles, pairing QR codes, and monitor device
              schedules for my kids.
            </p>
          </div>
        </button>

        <button
          onClick={() => onAnswer("independent")}
          style={{
            padding: 24,
            borderRadius: 16,
            background: t.c.surface,
            border: `1px solid ${t.c.border}`,
            textAlign: "left",
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,.01)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `${t.c.textMute}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: t.c.textMute,
            }}
          >
            <Icon name="phone" size={20} />
          </div>
          <div>
            <h4
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: t.c.text,
                margin: "0 0 6px",
              }}
            >
              No, this is for personal use
            </h4>
            <p
              style={{
                fontSize: 13,
                color: t.c.textMute,
                margin: 0,
                lineHeight: 1.45,
              }}
            >
              Skip family configurations. Set daily app budgets and schedules
              for this browser.
            </p>
          </div>
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            color: t.c.text,
            border: "none",
            fontSize: 14.5,
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

function WebOnboardWizard() {
  const t = useTokens();
  const [step, setStep] = React.useState(0);
  const [childName, setChildName] = React.useState("Maya");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.c.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 800,
          background: t.c.surface,
          border: `1px solid ${t.c.border}`,
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 24px 64px rgba(40,30,20,.06)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Progress indicator */}
        {step > 0 && step <= 3 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  background: s <= step ? t.c.primary : t.c.surface2,
                }}
              />
            ))}
            <span
              style={{ fontSize: 12, fontWeight: 600, color: t.c.textMute }}
            >
              Step {step} of 3
            </span>
          </div>
        )}

        {/* Step Content */}
        <div style={{ flex: 1 }}>
          {step === 0 && (
            <WebOnboardWelcomeScreen
              onSelect={(role) => {
                if (role === "child") {
                  alert("Device paired to parent hub!");
                } else {
                  setStep(0.5);
                }
              }}
            />
          )}

          {step === 0.5 && (
            <WebOnboardRoleQuestion
              onAnswer={(choice) => {
                if (choice === "independent") {
                  alert("Personal wellbeing profile created successfully!");
                  setStep(0);
                } else {
                  setStep(1);
                }
              }}
              onBack={() => setStep(0)}
            />
          )}

          {step === 1 && (
            <WebOnboardStep1
              childName={childName}
              setChildName={setChildName}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <WebOnboardStep2
              childName={childName}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <WebOnboardStep3
              childName={childName}
              onNext={() => {
                alert("Setup completed successfully!");
                setStep(0);
              }}
              onBack={() => setStep(2)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function WebOnboardStep1Preview() {
  const t = useTokens();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.c.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 800,
          background: t.c.surface,
          border: `1px solid ${t.c.border}`,
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 24px 64px rgba(40,30,20,.06)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: t.c.primary,
            }}
          />
          <div
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: t.c.surface2,
            }}
          />
          <div
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: t.c.surface2,
            }}
          />
          <span style={{ fontSize: 12, fontWeight: 600, color: t.c.textMute }}>
            Step 1 of 3
          </span>
        </div>
        <WebOnboardStep1
          childName="Maya"
          setChildName={() => {}}
          onNext={() => {}}
        />
      </div>
    </div>
  );
}

function WebOnboardStep2Preview() {
  const t = useTokens();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.c.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 800,
          background: t.c.surface,
          border: `1px solid ${t.c.border}`,
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 24px 64px rgba(40,30,20,.06)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: t.c.primary,
            }}
          />
          <div
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: t.c.primary,
            }}
          />
          <div
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: t.c.surface2,
            }}
          />
          <span style={{ fontSize: 12, fontWeight: 600, color: t.c.textMute }}>
            Step 2 of 3
          </span>
        </div>
        <WebOnboardStep2 childName="Maya" onNext={() => {}} onBack={() => {}} />
      </div>
    </div>
  );
}

function WebOnboardStep3Preview() {
  const t = useTokens();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.c.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 800,
          background: t.c.surface,
          border: `1px solid ${t.c.border}`,
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 24px 64px rgba(40,30,20,.06)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: t.c.primary,
            }}
          />
          <div
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: t.c.primary,
            }}
          />
          <div
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: t.c.primary,
            }}
          />
          <span style={{ fontSize: 12, fontWeight: 600, color: t.c.textMute }}>
            Step 3 of 3
          </span>
        </div>
        <WebOnboardStep3 childName="Maya" onNext={() => {}} onBack={() => {}} />
      </div>
    </div>
  );
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

function WebOnboardWelcomePreview() {
  const t = useTokens();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.c.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 800,
          background: t.c.surface,
          border: `1px solid ${t.c.border}`,
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 24px 64px rgba(40,30,20,.06)",
          boxSizing: "border-box",
        }}
      >
        <WebOnboardWelcomeScreen onSelect={() => {}} />
      </div>
    </div>
  );
}

function WebOnboardRoleQuestionPreview() {
  const t = useTokens();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.c.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 800,
          background: t.c.surface,
          border: `1px solid ${t.c.border}`,
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 24px 64px rgba(40,30,20,.06)",
          boxSizing: "border-box",
        }}
      >
        <WebOnboardRoleQuestion onAnswer={() => {}} onBack={() => {}} />
      </div>
    </div>
  );
}

window.WebLogin = WebLogin;
window.WebOnboardWizard = WebOnboardWizard;
window.WebOnboardWelcomePreview = WebOnboardWelcomePreview;
window.WebOnboardRoleQuestionPreview = WebOnboardRoleQuestionPreview;
window.WebOnboardStep1Preview = WebOnboardStep1Preview;
window.WebOnboardStep2Preview = WebOnboardStep2Preview;
window.WebOnboardStep3Preview = WebOnboardStep3Preview;

function WebParentSettings() {
  const t = useTokens();
  const [activeTab, setActiveTab] = React.useState("profile");

  const tabs = [
    { id: "profile", label: "Account Profile", icon: "users" },
    { id: "family", label: "Family & Devices", icon: "phone" },
    { id: "billing", label: "Billing & Plan", icon: "chart" },
    { id: "notifications", label: "Notification Alerts", icon: "bell" },
    { id: "privacy", label: "Privacy & Security", icon: "shieldCheck" },
  ];

  return (
    <WebShell
      role="parent"
      active=""
      title="Parent Settings"
      subtitle="Manage your family account, billing, and global settings"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: 32,
          padding: "0 32px 32px",
          boxSizing: "border-box",
        }}
      >
        {/* Left Tabs Nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {tabs.map((tab) => {
            const isAct = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: isAct ? t.c.primarySoft : "transparent",
                  color: isAct ? t.c.primary : t.c.text,
                  fontWeight: isAct ? 600 : 500,
                  fontSize: 13.5,
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                <Icon
                  name={tab.icon}
                  size={15}
                  color={isAct ? t.c.primary : t.c.textMute}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Tab Content */}
        <div
          style={{
            background: t.c.surface,
            border: `1px solid ${t.c.border}`,
            borderRadius: 20,
            padding: 32,
            boxShadow: "0 4px 20px rgba(0,0,0,.01)",
          }}
        >
          {activeTab === "profile" && (
            <div>
              <h3
                style={{
                  fontFamily: t.fontSerif,
                  fontSize: 22,
                  fontWeight: 500,
                  margin: "0 0 8px",
                }}
              >
                Account Profile
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: t.c.textMute,
                  margin: "0 0 24px",
                }}
              >
                Manage your parent administration credentials
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 32,
                }}
              >
                <Avatar name="Sarah Mitchell" size={64} color={t.c.primary} />
                <div>
                  <button
                    style={{
                      background: t.c.primarySoft,
                      color: t.c.primary,
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: 8,
                      fontWeight: 600,
                      fontSize: 12.5,
                      fontFamily: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    Change Avatar
                  </button>
                  <div
                    style={{ fontSize: 11, color: t.c.textMute, marginTop: 6 }}
                  >
                    JPG or PNG. Max size of 800K.
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                  marginBottom: 20,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: t.c.textMute,
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Parent Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Sarah Mitchell"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: 10,
                      background: t.c.bg,
                      border: `1px solid ${t.c.border}`,
                      color: t.c.text,
                      fontSize: 14,
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: t.c.textMute,
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="sarah.m@gmail.com"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: 10,
                      background: t.c.bg,
                      border: `1px solid ${t.c.border}`,
                      color: t.c.text,
                      fontSize: 14,
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <button
                style={{
                  background: t.c.primary,
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 13.5,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "family" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: t.fontSerif,
                      fontSize: 22,
                      fontWeight: 500,
                      margin: "0 0 8px",
                    }}
                  >
                    Family & Devices
                  </h3>
                  <p style={{ fontSize: 13, color: t.c.textMute, margin: 0 }}>
                    Add children and view their connected device status
                  </p>
                </div>
                <button
                  style={{
                    background: t.c.primary,
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: 13,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Icon name="plus" size={14} /> Add Child
                </button>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  {
                    name: "Maya Mitchell",
                    age: 11,
                    devices: ["Maya's iPhone 14", "Maya's iPad Pro"],
                    status: "Active limits",
                  },
                  {
                    name: "Jaden Mitchell",
                    age: 8,
                    devices: ["Jaden's Android Tab"],
                    status: "Paused until 4 PM",
                  },
                ].map((child, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px 24px",
                      background: t.c.bg,
                      borderRadius: 16,
                      border: `1px solid ${t.c.border}`,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>
                        {child.name}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          color: t.c.textMute,
                          marginTop: 4,
                        }}
                      >
                        Age {child.age} · {child.devices.join(", ")}
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <Chip
                        bg={idx === 0 ? t.c.primarySoft : t.c.accentSoft}
                        color={idx === 0 ? t.c.primary : t.c.accent}
                      >
                        {child.status}
                      </Chip>
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: t.c.textMute,
                        }}
                      >
                        <Icon name="settings" size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div>
              <h3
                style={{
                  fontFamily: t.fontSerif,
                  fontSize: 22,
                  fontWeight: 500,
                  margin: "0 0 8px",
                }}
              >
                Billing & Plan
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: t.c.textMute,
                  margin: "0 0 24px",
                }}
              >
                View billing history, invoices, and active plans
              </p>

              {/* Plan overview card */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${t.c.primarySoft} 0%, ${t.c.surface2} 100%)`,
                  borderRadius: 16,
                  padding: 24,
                  border: `1px solid ${t.c.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 32,
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: t.c.primary,
                      textTransform: "uppercase",
                      letterSpacing: ".05em",
                    }}
                  >
                    Current Plan
                  </span>
                  <div
                    style={{
                      fontFamily: t.fontSerif,
                      fontSize: 24,
                      fontWeight: 500,
                      marginTop: 4,
                    }}
                  >
                    Atrium Family Premium
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: t.c.textMute,
                      marginTop: 4,
                    }}
                  >
                    Billed annually ($89/yr) · Next renewal June 20, 2027
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: "bold",
                      color: t.c.primary,
                    }}
                  >
                    $89
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: "normal",
                        color: t.c.textMute,
                      }}
                    >
                      /yr
                    </span>
                  </div>
                  <button
                    style={{
                      background: t.c.surface,
                      color: t.c.text,
                      border: `1px solid ${t.c.border}`,
                      padding: "8px 14px",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "inherit",
                      cursor: "pointer",
                      marginTop: 8,
                    }}
                  >
                    Upgrade Plan
                  </button>
                </div>
              </div>

              {/* Invoices table */}
              <h4 style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 16 }}>
                Billing History
              </h4>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: `1px solid ${t.c.border}`,
                      textAlign: "left",
                    }}
                  >
                    <th
                      style={{
                        padding: "12px 8px",
                        color: t.c.textMute,
                        fontWeight: 500,
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        color: t.c.textMute,
                        fontWeight: 500,
                      }}
                    >
                      Invoice ID
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        color: t.c.textMute,
                        fontWeight: 500,
                      }}
                    >
                      Amount
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        color: t.c.textMute,
                        fontWeight: 500,
                      }}
                    >
                      Status
                    </th>
                    <th style={{ padding: "12px 8px", textAlign: "right" }} />
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      date: "Jun 20, 2026",
                      id: "INV-8902-12",
                      amount: "$89.00",
                      status: "Paid",
                    },
                    {
                      date: "Jun 20, 2025",
                      id: "INV-7212-09",
                      amount: "$89.00",
                      status: "Paid",
                    },
                  ].map((inv, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom:
                          idx === 1 ? "none" : `1px solid ${t.c.border}`,
                      }}
                    >
                      <td style={{ padding: "14px 8px" }}>{inv.date}</td>
                      <td
                        style={{ padding: "14px 8px", fontFamily: t.fontMono }}
                      >
                        {inv.id}
                      </td>
                      <td style={{ padding: "14px 8px" }}>{inv.amount}</td>
                      <td style={{ padding: "14px 8px" }}>
                        <span style={{ color: t.c.primary, fontWeight: 600 }}>
                          {inv.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 8px", textAlign: "right" }}>
                        <a
                          href="#"
                          style={{
                            color: t.c.primary,
                            textDecoration: "none",
                            fontWeight: 600,
                          }}
                        >
                          Download PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h3
                style={{
                  fontFamily: t.fontSerif,
                  fontSize: 22,
                  fontWeight: 500,
                  margin: "0 0 8px",
                }}
              >
                Notification Alerts
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: t.c.textMute,
                  margin: "0 0 24px",
                }}
              >
                Configure how and when you receive limits and coaching
                notifications
              </p>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {[
                  {
                    title: "Bypass Requests",
                    desc: "Instantly alert my dashboard when a child requests device time extensions.",
                    on: true,
                  },
                  {
                    title: "Daily Limit Warnings",
                    desc: "Notify me when Jaden or Maya are within 80% of their daily app categories budget.",
                    on: true,
                  },
                  {
                    title: "Bedtime Reminders",
                    desc: "Ping my phone when bedtime routine is about to lock child screens.",
                    on: false,
                  },
                  {
                    title: "Weekly Coaching Summaries",
                    desc: "Email me personalized routine audits and tip checklist summaries every Sunday.",
                    on: true,
                  },
                ].map((notif, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ flex: 1, paddingRight: 24 }}>
                      <div style={{ fontWeight: 600, fontSize: 14.5 }}>
                        {notif.title}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          color: t.c.textMute,
                          marginTop: 4,
                        }}
                      >
                        {notif.desc}
                      </div>
                    </div>
                    <Toggle on={notif.on} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div>
              <h3
                style={{
                  fontFamily: t.fontSerif,
                  fontSize: 22,
                  fontWeight: 500,
                  margin: "0 0 8px",
                }}
              >
                Privacy & Security
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: t.c.textMute,
                  margin: "0 0 24px",
                }}
              >
                Review data storage parameters, retention controls, and
                exporting logs
              </p>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                <div>
                  <div
                    style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 8 }}
                  >
                    Retention Policy
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: t.c.textMute,
                      margin: "0 0 12px",
                      lineHeight: 1.5,
                    }}
                  >
                    Configure how long child screen activity records (pickups,
                    session durations, categories) are kept on Atrium secure
                    servers.
                  </p>
                  <select
                    style={{
                      padding: "10px 14px",
                      borderRadius: 8,
                      background: t.c.bg,
                      border: `1px solid ${t.c.border}`,
                      color: t.c.text,
                      fontFamily: "inherit",
                      fontSize: 13,
                    }}
                  >
                    <option>
                      Keep activity logs for 90 days (Recommended)
                    </option>
                    <option>Keep activity logs for 30 days</option>
                    <option>Keep activity logs indefinitely</option>
                  </select>
                </div>

                <div style={{ height: 1, background: t.c.border }} />

                <div>
                  <div
                    style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 8 }}
                  >
                    Export Family Logs
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: t.c.textMute,
                      margin: "0 0 12px",
                    }}
                  >
                    Retrieve all stored screen time and ad blocker analytics
                    logs in structured JSON format.
                  </p>
                  <button
                    style={{
                      background: t.c.surface2,
                      border: `1px solid ${t.c.border}`,
                      padding: "10px 18px",
                      borderRadius: 8,
                      fontSize: 13,
                      color: t.c.text,
                      fontWeight: 600,
                      fontFamily: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    Request Export
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </WebShell>
  );
}

window.WebParentSettings = WebParentSettings;

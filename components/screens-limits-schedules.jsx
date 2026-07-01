// Limits configuration + Schedules

function LimitsConfig() {
  const t = useTokens();
  const all = [...APP_DATA.kids[0].topApps, ...APP_DATA.kids[1].topApps];
  // Dedup by name
  const seen = new Set();
  const apps = all.filter((a) =>
    seen.has(a.name) ? false : (seen.add(a.name), true),
  );

  return (
    <WebShell
      role="parent"
      active="limits"
      title="Limits & Apps"
      subtitle="Set daily and weekly limits per app or category"
      headerExtra={
        <Button variant="primary" size="sm" icon="plus">
          Add app or website
        </Button>
      }
    >
      {/* Filters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <Chip bg={t.c.primarySoft} color={t.c.primary}>
          For Maya
        </Chip>
        <Chip bg={t.c.surface}>For Jaden</Chip>
        <Chip bg={t.c.surface}>All kids</Chip>
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 12px",
            background: t.c.surface,
            border: `1px solid ${t.c.border}`,
            borderRadius: 10,
            width: 240,
            color: t.c.textMute,
            fontSize: 12.5,
          }}
        >
          <Icon name="search" size={14} />
          <span>Find apps or websites…</span>
        </div>
        <Button variant="outline" size="sm" icon="tag">
          By category
        </Button>
      </div>

      {/* By category tiles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
          marginBottom: 18,
        }}
      >
        {[
          {
            name: "Social",
            mins: 80,
            limit: 90,
            count: 5,
            col: APP_DATA.categoryColors.Social,
          },
          {
            name: "Video",
            mins: 118,
            limit: 120,
            count: 4,
            col: APP_DATA.categoryColors.Video,
          },
          {
            name: "Gaming",
            mins: 93,
            limit: 120,
            count: 3,
            col: APP_DATA.categoryColors.Gaming,
          },
          {
            name: "Education",
            mins: 18,
            limit: null,
            count: 6,
            col: APP_DATA.categoryColors.Education,
          },
        ].map((c) => {
          const pct = c.limit ? c.mins / c.limit : 0;
          return (
            <Card key={c.name} style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: c.col + "22",
                    color: c.col,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="tag" size={15} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: t.c.textMute }}>
                    {c.count} apps
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginTop: 14,
                }}
              >
                <span style={{ fontFamily: t.fontMono, fontWeight: 500 }}>
                  {fmtTime(c.mins)}
                </span>
                <span style={{ color: t.c.textMute }}>
                  {c.limit ? fmtTime(c.limit) : "no limit"}
                </span>
              </div>
              <div
                style={{
                  height: 5,
                  background: t.c.surface2,
                  borderRadius: 3,
                  overflow: "hidden",
                  marginTop: 6,
                }}
              >
                <div
                  style={{
                    width: c.limit ? Math.min(100, pct * 100) + "%" : 0,
                    height: "100%",
                    background: pct > 0.8 ? t.c.warn : t.c.primary,
                  }}
                />
              </div>
            </Card>
          );
        })}
      </div>

      {/* App list */}
      <Card style={{ padding: 0 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.4fr 1fr 1.4fr 1.1fr 80px",
            padding: "14px 22px",
            borderBottom: `1px solid ${t.c.border}`,
            fontSize: 11,
            color: t.c.textMute,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: ".05em",
          }}
        >
          <div>App / Website</div>
          <div>Category</div>
          <div>Daily limit</div>
          <div>Weekly goal</div>
          <div style={{ textAlign: "right" }}>Lock</div>
        </div>
        {apps.map((a, i) => {
          const wkLimit = a.limit ? a.limit * 6 : null;
          const wkUsed = a.mins * 5;
          return (
            <div
              key={a.name}
              style={{
                display: "grid",
                gridTemplateColumns: "2.4fr 1fr 1.4fr 1.1fr 80px",
                alignItems: "center",
                padding: "14px 22px",
                borderBottom:
                  i < apps.length - 1 ? `1px dashed ${t.c.border}` : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <AppTile app={a} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                    {a.name}
                  </div>
                  <div style={{ fontSize: 11.5, color: t.c.textMute }}>
                    Used {fmtTime(a.mins)} today
                  </div>
                </div>
              </div>
              <div>
                <Chip
                  bg={(APP_DATA.categoryColors[a.cat] || t.c.primary) + "22"}
                  color={APP_DATA.categoryColors[a.cat] || t.c.primary}
                >
                  {a.cat}
                </Chip>
              </div>
              {/* Daily limit slider mock */}
              <div>
                {a.limit != null ? (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 11.5,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontFamily: t.fontMono, fontWeight: 500 }}>
                        {fmtTime(a.limit)} / day
                      </span>
                      <span style={{ color: t.c.textMute }}>weekday</span>
                    </div>
                    <SliderTrack pct={a.mins / a.limit} />
                  </div>
                ) : (
                  <Button variant="ghost" size="sm" icon="plus">
                    Set limit
                  </Button>
                )}
              </div>
              {/* Weekly */}
              <div>
                {wkLimit != null ? (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 11.5,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontFamily: t.fontMono, fontWeight: 500 }}>
                        {fmtTime(wkLimit)} / wk
                      </span>
                      <span
                        style={{ color: t.c.textMute, fontFamily: t.fontMono }}
                      >
                        {Math.round((wkUsed / wkLimit) * 100)}%
                      </span>
                    </div>
                    <SliderTrack pct={wkUsed / wkLimit} />
                  </div>
                ) : (
                  <span style={{ fontSize: 12, color: t.c.textMute }}>—</span>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <Toggle on={a.limit != null} />
              </div>
            </div>
          );
        })}

        {/* Add row */}
        <div
          style={{
            padding: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${t.c.border}`,
          }}
        >
          <div style={{ fontSize: 12.5, color: t.c.textMute }}>
            Blocking a website? Add it by URL — works on every device.
          </div>
          <Button variant="primary" size="sm" icon="globe">
            Block a website
          </Button>
        </div>
      </Card>
    </WebShell>
  );
}

function SliderTrack({ pct }) {
  const t = useTokens();
  const over = pct > 1;
  const p = Math.min(100, pct * 100);
  return (
    <div
      style={{
        position: "relative",
        height: 6,
        background: t.c.surface2,
        borderRadius: 3,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: p + "%",
          background: over ? t.c.danger : t.c.primary,
          borderRadius: 3,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `calc(${p}% - 7px)`,
          top: "50%",
          transform: "translateY(-50%)",
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: t.c.surface,
          border: `2px solid ${over ? t.c.danger : t.c.primary}`,
          boxShadow: "0 1px 4px rgba(0,0,0,.1)",
        }}
      />
    </div>
  );
}
window.SliderTrack = SliderTrack;

function Toggle({ on }) {
  const t = useTokens();
  return (
    <div
      style={{
        display: "inline-block",
        width: 36,
        height: 20,
        borderRadius: 999,
        background: on ? t.c.primary : t.c.border,
        position: "relative",
        cursor: "pointer",
        transition: "background .15s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: on ? 18 : 2,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,.15)",
          transition: "left .15s",
        }}
      />
    </div>
  );
}
window.Toggle = Toggle;
window.LimitsConfig = LimitsConfig;

// ───────────────────── Schedules ─────────────────────

function Schedules() {
  const t = useTokens();
  return (
    <WebShell
      role="parent"
      active="schedules"
      title="Schedules"
      subtitle="Different limits for weekdays vs. weekends"
      headerExtra={
        <Button variant="primary" size="sm" icon="plus">
          New schedule
        </Button>
      }
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        <ScheduleCard
          title="Schoolday"
          subtitle="Mon–Fri · active 7am–9pm"
          color={t.c.primary}
          colorSoft={t.c.primarySoft}
          active
          days={["M", "T", "W", "T", "F"]}
          limits={[
            { cat: "Social", mins: 60 },
            { cat: "Video", mins: 90 },
            { cat: "Gaming", mins: 60 },
          ]}
        />
        <ScheduleCard
          title="Weekend"
          subtitle="Sat–Sun · active 9am–10pm"
          color={t.c.accent}
          colorSoft={t.c.accentSoft}
          days={["S", "S"]}
          limits={[
            { cat: "Social", mins: 120 },
            { cat: "Video", mins: 180 },
            { cat: "Gaming", mins: 150 },
          ]}
        />
      </div>

      {/* Timeline */}
      <Card>
        <SectionHead
          title="Today's timeline"
          subtitle="Thursday — Schoolday schedule"
          action={
            <div style={{ display: "flex", gap: 8 }}>
              <Chip bg={t.c.primarySoft} color={t.c.primary}>
                Maya
              </Chip>
              <Chip bg={t.c.surface}>Jaden</Chip>
            </div>
          }
        />
        <Timeline />
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginTop: 18,
        }}
      >
        <Card>
          <SectionHead
            title="Bedtime (preview)"
            subtitle="Coming soon — lock everything except essentials"
          />
          <div
            style={{
              padding: 14,
              borderRadius: 14,
              background: t.c.lavSoft,
              color: t.c.lavText,
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <Icon name="lightbulb" size={18} />
            <div style={{ fontSize: 13, lineHeight: 1.5 }}>
              From 9:30pm to 7am, only Phone, Messages, and Music will be
              available. We'll add a Trusted Apps list so you can customize.
            </div>
          </div>
          <div
            style={{
              marginTop: 14,
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Toggle on={false} />
            <span style={{ fontSize: 13 }}>Enable when launched</span>
          </div>
        </Card>

        <Card>
          <SectionHead
            title="Quiet windows"
            subtitle="No notifications, app stays open"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                name: "School hours",
                time: "8:15am – 3pm",
                days: "Mon–Fri",
                on: true,
              },
              {
                name: "Family dinner",
                time: "6:30 – 7:30pm",
                days: "Every day",
                on: true,
              },
              {
                name: "Wind-down",
                time: "8:30 – 10pm",
                days: "Sun–Thu",
                on: false,
              },
            ].map((w) => (
              <div
                key={w.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 12,
                  borderRadius: 12,
                  border: `1px solid ${t.c.border}`,
                }}
              >
                <Icon name="clock" size={16} color={t.c.primary} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                    {w.name}
                  </div>
                  <div style={{ fontSize: 11.5, color: t.c.textMute }}>
                    {w.time} · {w.days}
                  </div>
                </div>
                <Toggle on={w.on} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </WebShell>
  );
}

function ScheduleCard({
  title,
  subtitle,
  color,
  colorSoft,
  days,
  limits,
  active,
}) {
  const t = useTokens();
  return (
    <Card style={{ padding: 0 }}>
      <div
        style={{
          padding: t.pad,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
            <div>
              <div
                style={{
                  fontFamily: t.fontSerif,
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: "-.01em",
                }}
              >
                {title}
              </div>
              <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 2 }}>
                {subtitle}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {active && (
            <Chip bg={t.c.primarySoft} color={t.c.primary}>
              ● Active now
            </Chip>
          )}
          <Toggle on={true} />
        </div>
      </div>

      <div style={{ padding: "0 " + t.pad + "px 16px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => {
            const on =
              days.includes(d) &&
              (title === "Weekend" ? i === 0 || i === 6 : i > 0 && i < 6);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "8px 0",
                  borderRadius: 8,
                  background: on ? colorSoft : t.c.surface2,
                  color: on ? color : t.c.textMute,
                  fontWeight: on ? 600 : 400,
                  fontSize: 12,
                }}
              >
                {d}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {limits.map((l) => (
            <div
              key={l.cat}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: APP_DATA.categoryColors[l.cat],
                }}
              />
              <span style={{ flex: 1 }}>{l.cat}</span>
              <span style={{ fontFamily: t.fontMono, fontWeight: 500 }}>
                {fmtTime(l.mins)}{" "}
                <span style={{ color: t.c.textMute }}>/ day</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function Timeline() {
  const t = useTokens();
  const blocks = [
    {
      x: 0,
      w: 30,
      label: "Sleep / locked",
      color: t.c.lavSoft,
      text: t.c.lavText,
    },
    { x: 30, w: 5, label: "Wake", color: t.c.yellowSoft, text: t.c.yellowText },
    {
      x: 35,
      w: 30,
      label: "School quiet",
      color: t.c.surface2,
      text: t.c.textMute,
    },
    {
      x: 65,
      w: 18,
      label: "Afternoon — limits active",
      color: t.c.primarySoft,
      text: t.c.primary,
    },
    {
      x: 83,
      w: 5,
      label: "Dinner quiet",
      color: t.c.lavSoft,
      text: t.c.lavText,
    },
    {
      x: 88,
      w: 8,
      label: "Limits active",
      color: t.c.primarySoft,
      text: t.c.primary,
    },
    { x: 96, w: 4, label: "Bed", color: t.c.lavSoft, text: t.c.lavText },
  ];
  return (
    <div>
      <div
        style={{
          position: "relative",
          display: "flex",
          height: 56,
          borderRadius: 12,
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
              color: b.text,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 500,
              textAlign: "center",
              padding: "0 4px",
              borderRight:
                i < blocks.length - 1
                  ? "1px solid rgba(255,255,255,.4)"
                  : "none",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {b.label}
          </div>
        ))}
        {/* now indicator at 67% (3pm-ish) */}
        <div
          style={{
            position: "absolute",
            left: "67%",
            top: -4,
            bottom: -4,
            width: 2,
            background: t.c.danger,
            borderRadius: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "calc(67% - 16px)",
            top: -22,
            fontSize: 10,
            fontWeight: 600,
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          fontSize: 11,
          color: t.c.textMute,
          fontFamily: t.fontMono,
        }}
      >
        {["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm", "12am"].map(
          (h, i) => (
            <span key={i}>{h}</span>
          ),
        )}
      </div>
    </div>
  );
}
window.Schedules = Schedules;

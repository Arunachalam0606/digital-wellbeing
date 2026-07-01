// Parent mobile — LIMITS: per-app + category + schedules + bedtime + add website
// A single scroll surface that becomes the "control center" for what's allowed.

function MobParentLimits({ android = false }) {
  const t = useTokens();
  // De-duplicated apps across both kids
  const all = [...APP_DATA.kids[0].topApps, ...APP_DATA.kids[1].topApps];
  const seen = new Set();
  const apps = all.filter((a) =>
    seen.has(a.name) ? false : (seen.add(a.name), true),
  );

  return (
    <MobileScreen
      android={android}
      tab={<MobileTabBar items={parentTabs} active="limits" />}
      fab={<FAB icon="plus" />}
    >
      <MobileHeader
        eyebrow="Rules & routines"
        title="Limits"
        subtitle="Apps, categories, schedules, bedtime — all in one place."
        action={
          <button
            style={{
              background: t.c.surface,
              border: `1px solid ${t.c.border}`,
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 12,
              fontWeight: 600,
              color: t.c.text,
              fontFamily: "inherit",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Icon name="search" size={13} />
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
        {/* Kid picker */}
        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            padding: "2px 0 4px",
          }}
        >
          <Chip
            bg={t.c.primarySoft}
            color={t.c.primary}
            style={{ flexShrink: 0 }}
          >
            Maya
          </Chip>
          <Chip bg={t.c.surface2} style={{ flexShrink: 0 }}>
            Jaden
          </Chip>
          <Chip bg={t.c.surface2} style={{ flexShrink: 0 }}>
            All kids
          </Chip>
          <Chip bg={t.c.surface2} style={{ flexShrink: 0 }}>
            Me
          </Chip>
        </div>

        {/* Section: By category */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingTop: 4,
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
            By category
          </div>
          <button
            style={{
              background: "transparent",
              border: "none",
              color: t.c.primary,
              fontSize: 12.5,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            See all
          </button>
        </div>

        {/* Category tiles */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
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
              <MobileCard key={c.name} pad={12}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9,
                      background: c.col + "22",
                      color: c.col,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name="tag" size={14} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: 10.5, color: t.c.textMute }}>
                      {c.count} apps
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    marginTop: 10,
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
                    height: 4,
                    background: t.c.surface2,
                    borderRadius: 2,
                    overflow: "hidden",
                    marginTop: 4,
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
              </MobileCard>
            );
          })}
        </div>

        {/* Schedules quick */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingTop: 8,
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
            Schedules
          </div>
          <button
            style={{
              background: "transparent",
              border: "none",
              color: t.c.primary,
              fontSize: 12.5,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Manage
          </button>
        </div>

        {/* Active schedule chip */}
        <MobileCard pad={0} style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 14,
              background: t.c.primarySoft,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(255,255,255,.6)",
                color: t.c.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="calendar" size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{ fontSize: 13, fontWeight: 700, color: t.c.primary }}
              >
                Schoolday · active now
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: t.c.primary,
                  opacity: 0.8,
                  marginTop: 1,
                }}
              >
                Ends at 9 PM · Mon–Fri limits applied
              </div>
            </div>
            <Icon name="arrowRight" size={16} color={t.c.primary} />
          </div>
          <div
            style={{
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderTop: `1px solid ${t.c.border}`,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: t.c.accentSoft,
                color: t.c.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="calendar" size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Weekend</div>
              <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 1 }}>
                Sat–Sun · 3h social, 3h video, 2.5h gaming
              </div>
            </div>
            <Toggle on={true} />
          </div>
        </MobileCard>

        {/* Bedtime */}
        <MobileCard>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: t.c.lavSoft,
                color: t.c.lavText,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="lightbulb" size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Bedtime</div>
              <div
                style={{ fontSize: 11.5, color: t.c.textMute, marginTop: 2 }}
              >
                9:30 PM – 7 AM · only Phone, Messages, Music
              </div>
            </div>
            <Toggle on={true} />
          </div>
          <div
            style={{
              marginTop: 12,
              padding: 10,
              borderRadius: 10,
              background: t.c.lavSoft,
              color: t.c.lavText,
              fontSize: 11.5,
              lineHeight: 1.4,
            }}
          >
            <b>Trusted apps:</b> 3 selected ·{" "}
            <span style={{ textDecoration: "underline" }}>edit list</span>
          </div>
        </MobileCard>

        {/* Section: All apps */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingTop: 8,
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
            All apps
          </div>
          <div style={{ fontSize: 11, color: t.c.textMute }}>
            {apps.length} on Maya's iPhone
          </div>
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            padding: "2px 0 2px",
          }}
        >
          <Chip
            bg={t.c.primarySoft}
            color={t.c.primary}
            style={{ flexShrink: 0 }}
          >
            All
          </Chip>
          <Chip bg={t.c.surface2} style={{ flexShrink: 0 }}>
            Limited
          </Chip>
          <Chip bg={t.c.surface2} style={{ flexShrink: 0 }}>
            Locked
          </Chip>
          <Chip bg={t.c.surface2} style={{ flexShrink: 0 }}>
            No limit
          </Chip>
        </div>

        {/* App rows with detail chevron */}
        <MobileCard pad={0}>
          {apps.map((a, i, arr) => {
            const limited = a.limit != null;
            const pct = limited ? a.mins / a.limit : 0;
            const locked = pct >= 1;
            const wkLimit = limited ? a.limit * 6 : null;
            return (
              <div
                key={i}
                style={{
                  padding: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  borderBottom:
                    i < arr.length - 1 ? `1px solid ${t.c.border}` : "none",
                }}
              >
                <AppTile app={a} size={40} radius={11} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 6,
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 13.5 }}>
                      {a.name}
                    </span>
                    {locked ? (
                      <Chip
                        bg={t.c.dangerSoft}
                        color={t.c.danger}
                        style={{ fontSize: 10 }}
                      >
                        <Icon name="lock" size={10} /> Locked
                      </Chip>
                    ) : limited ? (
                      <span
                        style={{
                          fontFamily: t.fontMono,
                          fontSize: 11.5,
                          color: pct > 0.8 ? t.c.warn : t.c.primary,
                          fontWeight: 500,
                        }}
                      >
                        {fmtTime(a.mins)}/{fmtTime(a.limit)}
                      </span>
                    ) : (
                      <span
                        style={{
                          fontFamily: t.fontMono,
                          fontSize: 11.5,
                          color: t.c.textMute,
                        }}
                      >
                        {fmtTime(a.mins)} · no limit
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 10.5, color: t.c.textMute }}>
                      {a.cat}
                    </span>
                    {limited && (
                      <>
                        <span
                          style={{
                            width: 3,
                            height: 3,
                            borderRadius: "50%",
                            background: t.c.border,
                          }}
                        />
                        <span style={{ fontSize: 10.5, color: t.c.textMute }}>
                          weekly {fmtTime(wkLimit)}
                        </span>
                      </>
                    )}
                    <div style={{ flex: 1 }} />
                    <Icon name="arrowRight" size={13} color={t.c.textMute} />
                  </div>
                  {limited && (
                    <div
                      style={{
                        marginTop: 6,
                        height: 3,
                        background: t.c.surface2,
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: Math.min(100, pct * 100) + "%",
                          height: "100%",
                          background: locked
                            ? t.c.danger
                            : pct > 0.8
                              ? t.c.warn
                              : t.c.primary,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </MobileCard>

        {/* Add website / block URL */}
        <MobileCard pad={14}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: t.c.blueSoft,
                color: t.c.blueText,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="globe" size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                Block a website
              </div>
              <div
                style={{ fontSize: 11.5, color: t.c.textMute, marginTop: 2 }}
              >
                Works across every device
              </div>
            </div>
            <button
              style={{
                background: t.c.primary,
                color: "white",
                border: "none",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 12.5,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              Add URL
            </button>
          </div>
          {/* URL preview */}
          <div
            style={{
              marginTop: 12,
              padding: 10,
              borderRadius: 10,
              background: t.c.surface2,
              fontFamily: t.fontMono,
              fontSize: 12,
              color: t.c.textMute,
            }}
          >
            2 blocked: <span style={{ color: t.c.text }}>reddit.com</span> ·{" "}
            <span style={{ color: t.c.text }}>twitch.tv</span>
          </div>
        </MobileCard>

        <div style={{ height: 8 }} />
      </div>
    </MobileScreen>
  );
}
window.MobParentLimits = MobParentLimits;

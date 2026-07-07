// Ad Blocker — DNS-style dashboard with blocked requests, trackers, top domains

function AdBlocker() {
  const t = useTokens();
  const A = APP_DATA.adBlocker;
  const allowed = A.requestsToday - A.blockedToday;

  return (
    <WebShell
      role="parent"
      active="adblock"
      title="Ad Blocker"
      subtitle={"Network-level · all family devices · today"}
      headerExtra={
        <>
          <Chip bg={t.c.primarySoft} color={t.c.primary}>
            <Icon name="shieldCheck" size={12} /> Protection active
          </Chip>
          <Button
            onClick={() => window.triggerModal("filter")}
            variant="outline"
            size="sm"
            icon="settings"
          >
            Filter lists
          </Button>
        </>
      }
    >
      {/* Hero stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 14,
          marginBottom: 18,
        }}
      >
        <Card>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11.5,
              color: t.c.textMute,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".06em",
            }}
          >
            <Icon name="shieldCheck" size={14} color={t.c.primary} /> Blocked
            today
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
                color: t.c.primary,
                lineHeight: 1,
              }}
            >
              {A.blockedToday.toLocaleString()}
            </span>
            <span style={{ fontSize: 13, color: t.c.textMute }}>
              of {A.requestsToday.toLocaleString()} requests ·{" "}
              <b style={{ color: t.c.primary }}>{A.blockedPct}%</b>
            </span>
          </div>

          {/* Hourly sparkline */}
          <div style={{ marginTop: 16 }}>
            <svg
              viewBox="0 0 100 30"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 80, display: "block" }}
            >
              {A.hourly.map((v, h) => {
                const x = (h / 24) * 100;
                const bh = (v / Math.max(...A.hourly)) * 28;
                return (
                  <rect
                    key={h}
                    x={x + 0.4}
                    y={30 - bh}
                    width={100 / 24 - 0.8}
                    height={Math.max(bh, 0.4)}
                    rx="0.5"
                    fill={t.c.primary}
                    opacity={0.55 + (v / Math.max(...A.hourly)) * 0.4}
                  />
                );
              })}
            </svg>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10,
                color: t.c.textMute,
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
        </Card>

        <BlockStat
          icon="alert"
          label="Ads"
          value={A.ads}
          pct={A.ads / A.blockedToday}
          color={t.c.accent}
        />
        <BlockStat
          icon="eye"
          label="Trackers"
          value={A.trackers}
          pct={A.trackers / A.blockedToday}
          color={t.c.lavText}
        />
        <BlockStat
          icon="ban"
          label="Malware"
          value={A.malware}
          pct={A.malware / A.blockedToday}
          color={t.c.danger}
          hint="3 high-risk"
        />
      </div>

      {/* Pie donut + breakdown */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        <Card>
          <SectionHead title="What got blocked" subtitle="By category, today" />
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <DonutCategory
              data={{
                Ads: A.ads,
                Trackers: A.trackers,
                "Social widgets": A.socialWidgets,
                Malware: A.malware,
                Other: A.other,
              }}
              size={170}
              stroke={24}
              centerLabel="blocked"
              centerValue={fmtNum(A.blockedToday)}
            />
            <div style={{ flex: 1 }}>
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
                    fontSize: 12.5,
                    padding: "6px 0",
                    borderBottom: `1px dashed ${t.c.border}`,
                  }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 3,
                        background: c,
                      }}
                    />{" "}
                    {l}
                  </span>
                  <span style={{ fontFamily: t.fontMono, fontWeight: 500 }}>
                    {v.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <SectionHead
            title="Top blocked domains"
            subtitle="Where the most requests came from"
            action={
              <Button
                onClick={() => window.triggerModal("view-all")}
                variant="ghost"
                size="sm"
                icon="list"
              >
                View all 1,284
              </Button>
            }
          />
          <div>
            {A.topBlocked.map((d, i) => (
              <div
                key={d.domain}
                style={{
                  display: "grid",
                  gridTemplateColumns: "24px 1fr 90px 80px 24px",
                  gap: 14,
                  alignItems: "center",
                  padding: "10px 4px",
                  borderBottom:
                    i < A.topBlocked.length - 1
                      ? `1px dashed ${t.c.border}`
                      : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: t.fontMono,
                    fontSize: 11,
                    color: t.c.textMute,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: t.fontMono,
                    fontSize: 13,
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
                >
                  {d.type}
                </Chip>
                <span
                  style={{
                    fontFamily: t.fontMono,
                    fontSize: 13,
                    fontWeight: 500,
                    textAlign: "right",
                  }}
                >
                  {d.count}
                </span>
                <Icon name="ban" size={14} color={t.c.textMute} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Devices + Rules */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card>
          <SectionHead
            title="Per-device blocking"
            subtitle="Each device shares the same filter lists"
            action={
              <Button
                onClick={() => window.triggerModal("add-device")}
                variant="ghost"
                size="sm"
                icon="plus"
              >
                Add device
              </Button>
            }
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {A.devices.map((d) => (
              <div
                key={d.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 12,
                  borderRadius: 12,
                  border: `1px solid ${t.c.border}`,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background:
                      d.status === "paused" ? t.c.surface2 : t.c.primarySoft,
                    color: d.status === "paused" ? t.c.textMute : t.c.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="wifi" size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                    {d.name}
                  </div>
                  <div style={{ fontSize: 11.5, color: t.c.textMute }}>
                    {d.status === "paused"
                      ? "Paused"
                      : `${d.blocked.toLocaleString()} blocked today`}
                  </div>
                </div>
                <Toggle on={d.status === "active"} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHead
            title="Filter lists & rules"
            subtitle="What's protecting your family"
            action={
              <Button
                onClick={() => window.triggerModal("add-list")}
                variant="ghost"
                size="sm"
                icon="plus"
              >
                Add list
              </Button>
            }
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                name: "EasyList",
                desc: "Ads — community maintained",
                count: "78,422 rules",
                on: true,
              },
              {
                name: "EasyPrivacy",
                desc: "Tracker protection",
                count: "54,108 rules",
                on: true,
              },
              {
                name: "Malware Domains",
                desc: "Threats & phishing",
                count: "142,841 rules",
                on: true,
              },
              {
                name: "Social Trackers",
                desc: "Facebook, X, TikTok pixels",
                count: "8,402 rules",
                on: true,
              },
              {
                name: "Annoyances",
                desc: "Cookie banners, popups",
                count: "12,394 rules",
                on: false,
              },
            ].map((l) => (
              <div
                key={l.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 12,
                  borderRadius: 12,
                  border: `1px solid ${t.c.border}`,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 13.5 }}>
                      {l.name}
                    </span>
                    <Chip
                      bg={t.c.surface2}
                      color={t.c.textMute}
                      style={{ fontSize: 10 }}
                    >
                      {l.count}
                    </Chip>
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: t.c.textMute,
                      marginTop: 2,
                    }}
                  >
                    {l.desc}
                  </div>
                </div>
                <Toggle on={l.on} />
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 14,
              padding: 12,
              borderRadius: 12,
              background: t.c.surface2,
              fontSize: 12.5,
              color: t.c.textMute,
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <Icon name="lightbulb" size={15} color={t.c.primary} />
            Your filter lists update every 6 hours. Last sync: 2:14 PM today.
          </div>
        </Card>
      </div>
    </WebShell>
  );
}

function BlockStat({ icon, label, value, pct, color, hint }) {
  const t = useTokens();
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 11.5,
          color: t.c.textMute,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: ".06em",
        }}
      >
        <Icon name={icon} size={14} color={color} /> {label}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
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
          {value.toLocaleString()}
        </span>
        <span
          style={{
            fontSize: 11.5,
            color: t.c.textMute,
            fontFamily: t.fontMono,
          }}
        >
          {(pct * 100).toFixed(0)}%
        </span>
      </div>
      <div
        style={{
          marginTop: 10,
          height: 4,
          background: t.c.surface2,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{ width: pct * 100 + "%", height: "100%", background: color }}
        />
      </div>
      {hint && (
        <div style={{ fontSize: 11.5, color: t.c.danger, marginTop: 8 }}>
          ● {hint}
        </div>
      )}
    </Card>
  );
}
window.AdBlocker = AdBlocker;

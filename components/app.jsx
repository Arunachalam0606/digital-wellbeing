// Main app: lay out all screens on the design canvas + Tweaks panel
const { useState, useEffect, useMemo } = React;

const DEFAULT_TWEAKS = /*EDITMODE-BEGIN*/ {
  palette: "sage",
  density: "cozy",
  cardStyle: "soft",
  darkMode: false,
}; /*EDITMODE-END*/

// Helper to wrap mobile content in a device frame inside an artboard
function PhoneFrame({ children, android = false, title }) {
  const t = useTokens();
  // 420 width × 880 height feels comfortable in artboard. Slightly compact iPhone.
  if (android) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: t.c.bg,
          padding: 24,
        }}
      >
        <AndroidDevice width={412} height={892}>
          {children}
        </AndroidDevice>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: t.c.bg,
        padding: 24,
      }}
    >
      <IOSDevice width={402} height={874}>
        {children}
      </IOSDevice>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(DEFAULT_TWEAKS);
  window.__TWEAKS = t;
  // Force re-render of artboards when tweaks change by using key
  const key = `${t.palette}-${t.density}-${t.cardStyle}-${t.darkMode}`;

  // Standard artboard sizes
  const phoneAB = { width: 470, height: 940 };

  return (
    <>
      <DesignCanvas>
        {/* ────────────────  Brand & System  ──────────────── */}
        <DCSection
          id="brand"
          title="Brand & System"
          subtitle="Atrium — calm screen time for the whole family"
        >
          <DCArtboard
            id="system"
            label="Foundations · Palette, type & components"
            width={1280}
            height={920}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <BrandSystem />
            </div>
          </DCArtboard>
        </DCSection>

        {/* ────────────────  Web — Parent  ──────────────── */}
        <DCSection
          id="parent-web"
          title="Web — Parent"
          subtitle="Multi-account family management, kids overview, and detail"
        >
          <DCArtboard
            id="dash"
            label="Parent dashboard · Family overview"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <ParentDashboard />
            </div>
          </DCArtboard>
          <DCArtboard
            id="child"
            label="Single-child detail · Maya, age 11"
            width={1440}
            height={1080}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <ChildDetail />
            </div>
          </DCArtboard>
          <DCArtboard
            id="limits"
            label="Limits & Apps · per-app daily + weekly"
            width={1440}
            height={1100}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <LimitsConfig />
            </div>
          </DCArtboard>
          <DCArtboard
            id="sched"
            label="Schedules · weekday vs. weekend routines"
            width={1440}
            height={1080}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <Schedules />
            </div>
          </DCArtboard>
        </DCSection>

        {/* ────────────────  Web — Personal & Reports  ──────────────── */}
        <DCSection
          id="personal-web"
          title="Web — Personal & Reports"
          subtitle="Own screen time, trends, notifications log"
        >
          <DCArtboard
            id="pdash"
            label="Personal dashboard · Alex Chen"
            width={1440}
            height={1100}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <PersonalDashboard />
            </div>
          </DCArtboard>
          <DCArtboard
            id="reports"
            label="Reports · trends, heatmaps, stacked area"
            width={1440}
            height={1280}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <Reports />
            </div>
          </DCArtboard>
          <DCArtboard
            id="notif-web"
            label="Notifications & alerts log"
            width={1440}
            height={1000}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <NotificationsLog />
            </div>
          </DCArtboard>
        </DCSection>

        {/* ────────────────  Web — Ad Blocker  ──────────────── */}
        <DCSection
          id="adblock"
          title="Web — Ad Blocker"
          subtitle="DNS-level dashboard: blocked requests, trackers, malware"
        >
          <DCArtboard
            id="ab"
            label="Ad Blocker · network-level overview"
            width={1440}
            height={1280}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <AdBlocker />
            </div>
          </DCArtboard>
        </DCSection>

        {/* ────────────────  Mobile — Parent app  ──────────────── */}
        <DCSection
          id="mob-parent"
          title="Mobile — Parent app"
          subtitle="5 tabs: Family · Me · Reports · Shield · Plans · plus drill-downs"
        >
          <DCArtboard
            id="m-family-ios"
            label="① Family · iOS — kids overview"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobParentFamily />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-family-and"
            label="① Family · Android"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "cen",
              }}
            >
              <PhoneFrame android>
                <MobParentFamily android />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-me-ios"
            label="② Me · iOS — parent's own wellbeing"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobParentMe />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-reports-ios"
            label="③ Reports · iOS — kids + parent"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobParentReports />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-shield-ios"
            label="④ Shield · iOS — ad blocker stats"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobParentShield />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-shield-and"
            label="④ Shield · Android"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "cen",
              }}
            >
              <PhoneFrame android>
                <MobParentShield android />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-sched-ios"
            label="⑤ Plans · iOS — schedules"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobParentSchedules />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-kid-ios"
            label="⑥ Kid drill-down · Jaden (iOS)"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobParentKidDetail />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-notif-ios"
            label="⑦ Notifications log (iOS)"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobParentNotifLog />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-onboard-ios"
            label="⑧ Onboarding · link child device"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobOnboarding />
              </PhoneFrame>
            </div>
          </DCArtboard>
        </DCSection>

        {/* ────────────────  Mobile — Child app  ──────────────── */}
        <DCSection
          id="mob-child"
          title="Mobile — Child app"
          subtitle="Coach voice, never punitive. 4 tabs + locked state."
        >
          <DCArtboard
            id="m-c-today-ios"
            label="① Today · iOS — time left, streak, apps"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobChildToday />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-c-today-and"
            label="① Today · Android"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "cen",
              }}
            >
              <PhoneFrame android>
                <MobChildToday android />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-c-apps"
            label="② Apps · iOS — categories + per-app limits"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobChildApps />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-c-streak"
            label="③ Streak · iOS — badges & personal bests"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobChildStreak />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-c-ask"
            label="④ Ask · iOS — request more time"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobChildAsk />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-c-locked-ios"
            label="⑤ Locked app · TikTok hit limit (iOS)"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobChildLocked />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-c-locked-and"
            label="⑤ Locked app · Android"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "cen",
              }}
            >
              <PhoneFrame android>
                <MobChildLocked android />
              </PhoneFrame>
            </div>
          </DCArtboard>
        </DCSection>

        {/* ────────────────  Mobile — Personal & shared  ──────────────── */}
        <DCSection
          id="mob-personal"
          title="Mobile — Personal app"
          subtitle="Standalone (non-parent) mode + universal screens"
        >
          <DCArtboard
            id="m-p-today-ios"
            label="① Today · iOS — big ring, coach quote"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobPersonalToday />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-p-today-and"
            label="① Today · Android"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "cen",
              }}
            >
              <PhoneFrame android>
                <MobPersonalToday android />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-p-reports"
            label="② Reports · iOS — trends + heatmap"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobPersonalReports />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-p-focus"
            label="③ Focus mode · iOS — timer + presets"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobPersonalFocus />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-p-detail"
            label="④ App detail · Roblox (iOS)"
            width={phoneAB.width}
            height={phoneAB.height}
          >
            <div
              key={key}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneFrame>
                <MobAppDetail />
              </PhoneFrame>
            </div>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Visual palette">
          <PaletteSwatches
            value={t.palette}
            darkMode={t.darkMode}
            onChange={(v) => setTweak("palette", v)}
          />
        </TweakSection>

        <TweakSection label="Density">
          <TweakRadio
            label="Spacing"
            value={t.density}
            options={[
              { value: "cozy", label: "Cozy" },
              { value: "compact", label: "Compact" },
            ]}
            onChange={(v) => setTweak("density", v)}
          />
        </TweakSection>

        <TweakSection label="Card style">
          <TweakRadio
            label="Surfaces"
            value={t.cardStyle}
            options={[
              { value: "soft", label: "Soft" },
              { value: "outlined", label: "Outlined" },
              { value: "filled", label: "Filled" },
            ]}
            onChange={(v) => setTweak("cardStyle", v)}
          />
        </TweakSection>

        <TweakSection label="Theme Mode">
          <TweakToggle
            label="Dark Mode"
            value={t.darkMode}
            onChange={(v) => setTweak("darkMode", v)}
          />
        </TweakSection>

        <div
          style={{
            padding: "12px 14px",
            fontSize: 11.5,
            color: "rgba(41,38,27,.6)",
            lineHeight: 1.5,
          }}
        >
          Changes apply across every artboard. Try Lavender + Outlined for a
          clinical feel.
        </div>
      </TweaksPanel>
    </>
  );
}

// Custom palette swatch picker (live inside the light tweaks panel)
function PaletteSwatches({ value, darkMode, onChange }) {
  const palettes = [
    {
      key: "sage",
      name: "Sage",
      colors: darkMode
        ? ["#7BB38C", "#F1AA97", "#FBE094", "#C0B7DC"]
        : ["#5C8A6B", "#E8896F", "#F4D374", "#A8A0C8"],
    },
    {
      key: "lavender",
      name: "Lavender",
      colors: darkMode
        ? ["#B1A2D9", "#F1AA97", "#FBE094", "#A0C5DD"]
        : ["#8B7AB0", "#E8896F", "#F4D374", "#7DA9C7"],
    },
    {
      key: "coral",
      name: "Coral",
      colors: darkMode
        ? ["#EE9A85", "#7BB38C", "#FBE094", "#C0B7DC"]
        : ["#D97257", "#5C8A6B", "#F4D374", "#A8A0C8"],
    },
    {
      key: "slate",
      name: "Slate",
      colors: darkMode
        ? ["#7FA7D1", "#F1AA97", "#FBE094", "#C0B7DC"]
        : ["#4F6B8A", "#E8896F", "#F4D374", "#A8A0C8"],
    },
    {
      key: "rose",
      name: "Rose",
      colors: darkMode
        ? ["#E59593", "#7BB38C", "#FBE094", "#C0B7DC"]
        : ["#C86260", "#5C8A6B", "#F4D374", "#A8A0C8"],
    },
  ];
  return (
    <div style={{ padding: "6px 14px 8px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 8,
        }}
      >
        {palettes.map((p) => {
          const selected = value === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => onChange(p.key)}
              style={{
                background: selected
                  ? "rgba(255,255,255,.9)"
                  : "rgba(255,255,255,.45)",
                border: selected
                  ? `1.5px solid rgba(0,0,0,.4)`
                  : `1px solid rgba(0,0,0,.1)`,
                boxShadow: selected ? "0 1px 3px rgba(0,0,0,.08)" : "none",
                borderRadius: 10,
                padding: 8,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "inherit",
                color: "#29261b",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 24,
                  borderRadius: 5,
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                  border: "0.5px solid rgba(0,0,0,.08)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: p.colors[0],
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "46%",
                    display: "grid",
                    gridTemplateRows: "1fr 1fr 1fr",
                  }}
                >
                  <div style={{ background: p.colors[1] }} />
                  <div style={{ background: p.colors[2] }} />
                  <div style={{ background: p.colors[3] }} />
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#29261b", fontWeight: 600 }}>
                {p.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

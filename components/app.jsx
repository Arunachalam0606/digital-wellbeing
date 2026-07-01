// Main app: lay out all screens on the design canvas + Tweaks panel
const { useState, useEffect, useMemo } = React;

const DEFAULT_TWEAKS = /*EDITMODE-BEGIN*/ {
  palette: "sage",
  density: "cozy",
  cardStyle: "soft",
  dark: false,
}; /*EDITMODE-END*/

// Wrap mobile content in a device frame (iOS or Android) inside an artboard
function PhoneFrame({ children, android = false }) {
  const t = useTokens();
  const frameBg = t.dark ? t.c.bg : "#F0EEE9";
  if (android) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: frameBg,
          padding: 24,
        }}
      >
        <AndroidDevice width={412} height={892} dark={t.dark}>
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
        background: frameBg,
        padding: 24,
      }}
    >
      <IOSDevice width={402} height={874} dark={t.dark}>
        {children}
      </IOSDevice>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(DEFAULT_TWEAKS);
  window.__TWEAKS = t;
  const key = `${t.palette}-${t.density}-${t.cardStyle}-${t.dark ? "d" : "l"}`;

  // In dark mode, blend the design canvas neutral gray with our dark bg so
  // there's no jarring bright surround around artboards.
  useEffect(() => {
    document.body.style.background = t.dark ? "#0F1114" : "#F0EEE9";
    // Also update canvas grid + text colors via CSS var overrides.
    const styleId = "canvas-theme-override";
    let el = document.getElementById(styleId);
    if (!el) {
      el = document.createElement("style");
      el.id = styleId;
      document.head.appendChild(el);
    }
    if (t.dark) {
      el.textContent = `
        [data-dc-canvas]{background:#0F1114!important}
        .dc-labeltext, .dc-editable{color:rgba(240,235,220,.9)!important}
      `;
    } else {
      el.textContent = "";
    }
  }, [t.dark]);

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
          <DCArtboard
            id="coach-web"
            label="AI Coach · personalized screen-time coach insights & tips"
            width={1440}
            height={1080}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <AICoachWeb />
            </div>
          </DCArtboard>
          <DCArtboard
            id="web-login-screen"
            label="Web Login · Parent sign-in"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebLogin />
            </div>
          </DCArtboard>
          <DCArtboard
            id="web-onboard-wizard"
            label="Web Onboarding · Pairing Setup Wizard"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebOnboardWizard />
            </div>
          </DCArtboard>
          <DCArtboard
            id="web-onboard-step-1"
            label="Web Onboarding Step 1 · Create Profile"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebOnboardStep1Preview />
            </div>
          </DCArtboard>
          <DCArtboard
            id="web-onboard-step-2"
            label="Web Onboarding Step 2 · Link Device"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebOnboardStep2Preview />
            </div>
          </DCArtboard>
          <DCArtboard
            id="web-onboard-step-3"
            label="Web Onboarding Step 3 · Setup Limits"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebOnboardStep3Preview />
            </div>
          </DCArtboard>
          <DCArtboard
            id="web-settings"
            label="Settings · Parent Web settings & billing portal"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebParentSettings />
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
          subtitle="Every parent web feature has a mobile equivalent. 5 main tabs + drill-downs."
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
            label="② Me · parent's own wellbeing"
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
            id="m-limits-ios"
            label="③ Limits · categories + apps + schedules + bedtime"
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
                <MobParentLimits />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-limits-and"
            label="③ Limits · Android"
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
              <PhoneFrame android>
                <MobParentLimits android />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-reports-ios"
            label="④ Reports · kids + parent, trends + heatmap"
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
            label="⑤ Shield · ad blocker stats + per-device"
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
            label="⑤ Shield · Android"
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
            label="Schedules detail · from Limits"
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
            label="Kid drill-down · Jaden"
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
            label="Notifications log · alerts + requests"
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
            id="m-settings-ios"
            label="Settings · account, privacy, family"
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
                <MobParentSettings />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-settings-and"
            label="Settings · Android"
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
              <PhoneFrame android>
                <MobParentSettings android />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-settings-manage-children"
            label="Settings · Manage Children"
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
                <MobParentManageChildren />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-settings-manage-devices"
            label="Settings · Manage Devices"
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
                <MobParentManageDevices />
              </PhoneFrame>
            </div>
          </DCArtboard>
          <DCArtboard
            id="m-onboard-ios"
            label="Onboarding · interactive click-through demo"
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

          <DCArtboard
            id="m-parent-coach-screen"
            label="AI Coach · insights & tips"
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
                <MobParentCoach />
              </PhoneFrame>
            </div>
          </DCArtboard>

          <DCArtboard
            id="m-parent-bypass-hub-screen"
            label="Bypass Hub · time approvals"
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
                <MobParentBypassHub />
              </PhoneFrame>
            </div>
          </DCArtboard>
        </DCSection>

        {/* ────────────────  Mobile — Onboarding & Auth  ──────────────── */}
        <DCSection
          id="mob-onboard-auth"
          title="Mobile — Onboarding & Auth"
          subtitle="First-time setup steps, sign-in, and pairing process side-by-side."
        >
          <DCArtboard
            id="m-login-screen"
            label="Login · email & social oauth"
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
                <MobLogin />
              </PhoneFrame>
            </div>
          </DCArtboard>

          <DCArtboard
            id="m-onboard-welcome-screen"
            label="Onboarding 1 · welcome & role"
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
                <MobOnboardWelcome />
              </PhoneFrame>
            </div>
          </DCArtboard>

          <DCArtboard
            id="m-onboard-create-screen"
            label="Onboarding 2 · child profile"
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
                <MobOnboardCreateProfile />
              </PhoneFrame>
            </div>
          </DCArtboard>

          <DCArtboard
            id="m-onboard-link-screen"
            label="Onboarding 3 · scan QR code"
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
                <MobOnboardLink />
              </PhoneFrame>
            </div>
          </DCArtboard>

          <DCArtboard
            id="m-onboard-connecting-screen"
            label="Onboarding 3b · connecting progress"
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
                <MobConnectingProgress />
              </PhoneFrame>
            </div>
          </DCArtboard>

          <DCArtboard
            id="m-onboard-configure-screen"
            label="Onboarding 4 · initial rules"
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
                <MobOnboardConfigure />
              </PhoneFrame>
            </div>
          </DCArtboard>
        </DCSection>

        {/* ────────────────  Mobile — Child app  ──────────────── */}
        <DCSection
          id="mob-child"
          title="Mobile — Child app"
          subtitle="Coach voice, never punitive. 4 tabs + locked-app state."
        >
          <DCArtboard
            id="m-c-today-ios"
            label="① Today · time left, streak, apps (iOS)"
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
            label="② Apps · categories + per-app limits"
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
            label="③ Streak · badges & personal bests"
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
            label="④ Ask · request more time"
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
            label="Locked · TikTok hit limit (iOS)"
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
            label="Locked · Android"
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
          <DCArtboard
            id="m-c-rewards"
            label="⑤ Rewards · gamified store"
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
                <MobChildRewards />
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
            label="① Today · big ring, coach quote"
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
            label="② Reports · trends + heatmap"
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
            label="③ Focus · timer + presets"
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
            label="④ App detail · Roblox"
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
        <TweakSection label="Appearance">
          <TweakToggle
            label="Dark mode"
            value={t.dark}
            onChange={(v) => setTweak("dark", v)}
          />
        </TweakSection>

        <TweakSection label="Palette">
          <PaletteSwatches
            value={t.palette}
            dark={t.dark}
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

        <div
          style={{
            padding: "10px 14px 4px",
            fontSize: 11.5,
            color: "rgba(41,38,27,.65)",
            lineHeight: 1.5,
          }}
        >
          8 palettes · each with hand-tuned dark variants. Try{" "}
          <b>Ocean + Dark</b>.
        </div>
      </TweaksPanel>
    </>
  );
}

// Palette swatch grid — respects the current dark mode preview + shows a
// tiny sun/moon indicator for whichever variant the user is looking at.
function PaletteSwatches({ value, dark, onChange }) {
  const palettes = Object.entries(window.PALETTES).map(([key, def]) => ({
    key,
    name: def.name,
    colors: def.swatch,
    preview: dark ? def.dark : def.light,
  }));
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
              title={p.name}
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
                    background: p.preview.bg,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 3,
                    top: 3,
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background: p.preview.primary,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "38%",
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

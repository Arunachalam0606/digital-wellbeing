// Main app — Atrium design canvas
// Redesigned: clearer section groups, storyboard-style section intros,
// added Sign Up + Connects, sharper composition throughout.

const {
  useState: useStateApp,
  useEffect: useEffectApp,
  useMemo: useMemoApp,
} = React;

const DEFAULT_TWEAKS = /*EDITMODE-BEGIN*/ {
  palette: "sage",
  density: "cozy",
  cardStyle: "soft",
  dark: false,
  fontPair: "editorial",
  layout: "A",
}; /*EDITMODE-END*/

// Wrap mobile content in a device frame (iOS or Android) inside an artboard
function PhoneFrame({ children, android = false }) {
  const t = useTokens();
  const frameBg = t.dark ? t.c.bg : "#F0EEE9";
  const Frame = android ? AndroidDevice : IOSDevice;
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
      <Frame
        width={android ? 412 : 402}
        height={android ? 892 : 874}
        dark={t.dark}
      >
        {children}
      </Frame>
    </div>
  );
}

// ─────────────────── Section divider artboard component ───────────────────
function SectionDivider({ number, title, subtitle, kicker }) {
  return (
    <SectionIntro
      number={number}
      title={title}
      subtitle={subtitle}
      kicker={kicker}
    />
  );
}

function App() {
  const [t, setTweak] = useTweaks(DEFAULT_TWEAKS);
  window.__TWEAKS = t;
  const key = `${t.palette}-${t.density}-${t.cardStyle}-${t.dark ? "d" : "l"}-${t.fontPair}-${t.layout}`;

  // In dark mode, blend the design canvas neutral gray with our dark bg
  useEffectApp(() => {
    document.body.style.background = t.dark ? "#0F1114" : "#F0EEE9";
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
  const dividerAB = { width: 1440, height: 260 };

  const activePalette =
    window.PALETTES?.[t.palette] ||
    window.PALETTES?.default ||
    (window.PALETTES ? Object.values(window.PALETTES)[0] : null);
  const primaryColor = activePalette
    ? t.dark
      ? activePalette.dark?.primary
      : activePalette.light?.primary
    : "#5c8a6b";

  return (
    <>
      <DesignCanvas>
        {/* ═════════════════════════  01 · BRAND & SYSTEM  ═════════════════════════ */}
        <DCSection
          id="brand"
          title="01 · Foundations"
          subtitle="Type, palette, primitives — the vocabulary everything else speaks"
        >
          <DCArtboard
            id="section-intro-brand"
            label="Section intro"
            width={dividerAB.width}
            height={dividerAB.height}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <SectionDivider
                number="01"
                kicker="Foundations"
                title="A vocabulary of calm."
                subtitle="Every screen speaks in the same colors, weights, and rhythms — so the product feels like one place, not many."
              />
            </div>
          </DCArtboard>

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

        {/* ═════════════════════════  02 · AUTH  ═════════════════════════ */}
        <DCSection
          id="web-auth"
          title="02 · Sign up & Sign in"
          subtitle="First impressions — sanitized pre-auth, editorial hero pane, sharpened forms"
        >
          <DCArtboard
            id="section-intro-auth"
            label="Section intro"
            width={dividerAB.width}
            height={dividerAB.height}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <SectionDivider
                number="02"
                kicker="Entering the workspace"
                title="Two ways in. Both feel like home."
                subtitle="Sign Up gently invites; Sign In quietly welcomes back. No child data leaks pre-auth."
              />
            </div>
          </DCArtboard>

          <DCArtboard
            id="web-signup-screen"
            label="Web · Sign Up (new)"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebSignupNew />
            </div>
          </DCArtboard>

          <DCArtboard
            id="web-login-screen"
            label="Web · Sign In (redesigned)"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebLoginNew />
            </div>
          </DCArtboard>
        </DCSection>

        {/* ═════════════════════════  03 · ONBOARDING  ═════════════════════════ */}
        <DCSection
          id="web-onboard"
          title="03 · Onboarding"
          subtitle="Role selection → profile → device pairing → rhythm — a five-step gentle intake"
        >
          <DCArtboard
            id="section-intro-onboard"
            label="Section intro"
            width={dividerAB.width}
            height={dividerAB.height}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <SectionDivider
                number="03"
                kicker="First run"
                title="Two minutes to a rhythm that fits."
                subtitle="A branching wizard — parents pair devices and set limits; individuals go straight to their space."
              />
            </div>
          </DCArtboard>

          <DCArtboard
            id="web-onboard-welcome"
            label="Onboarding · Welcome"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebOnboardWelcomeNew />
            </div>
          </DCArtboard>

          <DCArtboard
            id="web-onboard-role-question"
            label="Onboarding · Role question"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebOnboardRoleQuestionNew />
            </div>
          </DCArtboard>

          <DCArtboard
            id="web-onboard-step-1"
            label="Onboarding · Step 1 · Create profile"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebOnboardStep1New />
            </div>
          </DCArtboard>

          <DCArtboard
            id="web-onboard-step-2"
            label="Onboarding · Step 2 · Pair device"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebOnboardStep2New />
            </div>
          </DCArtboard>

          <DCArtboard
            id="web-onboard-step-3"
            label="Onboarding · Step 3 · Choose rhythm"
            width={1440}
            height={980}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebOnboardStep3New />
            </div>
          </DCArtboard>
        </DCSection>

        {/* ═════════════════════════  04 · FAMILY HUB  ═════════════════════════ */}
        <DCSection
          id="family-hub"
          title="04 · Family Hub"
          subtitle="Parental controls · at-a-glance status + action queue + live activity + trends"
        >
          <DCArtboard
            id="section-intro-family"
            label="Section intro"
            width={dividerAB.width}
            height={dividerAB.height}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <SectionDivider
                number="04"
                kicker="Family Hub"
                title="Everything that matters, today."
                subtitle="Not a dashboard of numbers — a place that surfaces what needs your attention, then gets out of the way."
              />
            </div>
          </DCArtboard>

          <DCArtboard
            id="dash"
            label="Family Hub · Overview (redesigned)"
            width={1440}
            height={1100}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <FamilyHubDashboardNew />
            </div>
          </DCArtboard>

          <DCArtboard
            id="child"
            label="Child detail · Maya (kept from v1)"
            width={1440}
            height={1080}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <ChildDetail />
            </div>
          </DCArtboard>

          <DCArtboard
            id="limits"
            label="Limits & apps"
            width={1440}
            height={1100}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <LimitsConfig />
            </div>
          </DCArtboard>

          <DCArtboard
            id="sched"
            label="Schedules · weekday vs weekend"
            width={1440}
            height={1080}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <Schedules />
            </div>
          </DCArtboard>

          <DCArtboard
            id="coach-web"
            label="AI Coach · insights & tips"
            width={1440}
            height={1080}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <AICoachWeb />
            </div>
          </DCArtboard>
        </DCSection>

        {/* ═════════════════════════  05 · MY SPACE  ═════════════════════════ */}
        <DCSection
          id="my-space"
          title="05 · My Space"
          subtitle="Personal wellbeing · motivational focus number, focus timer, reflection, analytics"
        >
          <DCArtboard
            id="section-intro-personal"
            label="Section intro"
            width={dividerAB.width}
            height={dividerAB.height}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <SectionDivider
                number="05"
                kicker="My Space"
                title="Your quiet counterpart."
                subtitle="A private focus companion inside the same workspace — for parents, for individuals, for anyone finding their rhythm."
              />
            </div>
          </DCArtboard>

          <DCArtboard
            id="pdash"
            label="My Space · Today (redesigned)"
            width={1440}
            height={1280}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <MySpaceDashboardNew />
            </div>
          </DCArtboard>

          <DCArtboard
            id="reports"
            label="Reports · trends, heatmaps"
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

        {/* ═════════════════════════  06 · CONNECTS  ═════════════════════════ */}
        <DCSection
          id="connects"
          title="06 · Connects"
          subtitle="Everything paired · devices + people + apps · one unified network view"
        >
          <DCArtboard
            id="section-intro-connects"
            label="Section intro"
            width={dividerAB.width}
            height={dividerAB.height}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <SectionDivider
                number="06"
                kicker="Connects"
                title="The whole network in one place."
                subtitle="Devices, people, and apps — pair, invite, or configure from a single top-level view."
              />
            </div>
          </DCArtboard>

          <DCArtboard
            id="web-connects"
            label="Connects · Devices, People, Apps"
            width={1440}
            height={1200}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebConnectsNew />
            </div>
          </DCArtboard>
        </DCSection>

        {/* ═════════════════════════  07 · SETTINGS  ═════════════════════════ */}
        <DCSection
          id="settings"
          title="07 · Settings"
          subtitle="Anchored sections · sticky section-jump sidebar · one workspace-wide place for preferences"
        >
          <DCArtboard
            id="section-intro-settings"
            label="Section intro"
            width={dividerAB.width}
            height={dividerAB.height}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <SectionDivider
                number="07"
                kicker="Settings"
                title="Every preference in one calm scroll."
                subtitle="Grouped, anchored, and quietly powerful. Danger zone kept at the bottom, where it belongs."
              />
            </div>
          </DCArtboard>

          <DCArtboard
            id="web-settings"
            label="Settings · Full page (redesigned)"
            width={1440}
            height={1600}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <WebSettingsNew />
            </div>
          </DCArtboard>
        </DCSection>

        {/* ═════════════════════════  08 · AD BLOCKER  ═════════════════════════ */}
        <DCSection
          id="adblock"
          title="08 · Shield"
          subtitle="DNS-level ad blocker · blocked requests, trackers, malware"
        >
          <DCArtboard
            id="ab"
            label="Shield · Network overview"
            width={1440}
            height={1280}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <AdBlocker />
            </div>
          </DCArtboard>
        </DCSection>

        {/* ═════════════════════════  09 · MOBILE — PARENT  ═════════════════════════ */}
        <DCSection
          id="mob-parent"
          title="09 · Mobile — Parent app"
          subtitle="Every parent feature has a mobile equivalent. 5 tabs + drill-downs."
        >
          <DCArtboard
            id="section-intro-mob-parent"
            label="Section intro"
            width={dividerAB.width}
            height={dividerAB.height}
          >
            <div key={key} style={{ width: "100%", height: "100%" }}>
              <SectionDivider
                number="09"
                kicker="Mobile · Parent"
                title="The workspace, in a pocket."
                subtitle="Same voice, same rhythm, same care — reshaped for one hand and quick check-ins."
              />
            </div>
          </DCArtboard>

          {[
            ["m-family-ios", "① Family · iOS", MobParentFamily, false],
            ["m-family-and", "① Family · Android", MobParentFamily, true],
            ["m-me-ios", "② Me · parent's own wellbeing", MobParentMe, false],
            ["m-limits-ios", "③ Limits · iOS", MobParentLimits, false],
            ["m-limits-and", "③ Limits · Android", MobParentLimits, true],
            ["m-reports-ios", "④ Reports", MobParentReports, false],
            ["m-shield-ios", "⑤ Shield · iOS", MobParentShield, false],
            ["m-shield-and", "⑤ Shield · Android", MobParentShield, true],
            ["m-sched-ios", "Schedules detail", MobParentSchedules, false],
            ["m-kid-ios", "Kid drill-down · Jaden", MobParentKidDetail, false],
            ["m-notif-ios", "Notifications log", MobParentNotifLog, false],
            ["m-settings-ios", "Settings", MobParentSettings, false],
            ["m-settings-and", "Settings · Android", MobParentSettings, true],
            [
              "m-settings-manage-children",
              "Settings · Manage Children",
              MobParentManageChildren,
              false,
            ],
            [
              "m-settings-manage-devices",
              "Settings · Manage Devices",
              MobParentManageDevices,
              false,
            ],
            [
              "m-onboard-ios",
              "Onboarding · click-through demo",
              MobOnboarding,
              false,
            ],
            ["m-parent-coach-screen", "AI Coach", MobParentCoach, false],
            [
              "m-parent-bypass-hub-screen",
              "Bypass Hub",
              MobParentBypassHub,
              false,
            ],
          ].map(([id, label, Comp, android]) => (
            <DCArtboard
              key={id}
              id={id}
              label={label}
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
                <PhoneFrame android={android}>
                  <Comp android={android} />
                </PhoneFrame>
              </div>
            </DCArtboard>
          ))}
        </DCSection>

        {/* ═════════════════════════  10 · MOBILE — ONBOARDING & AUTH  ═════════════════════════ */}
        <DCSection
          id="mob-onboard-auth"
          title="10 · Mobile — Onboarding & Auth"
          subtitle="First-time setup, sign-in, and pairing on mobile"
        >
          {[
            ["m-login-screen", "Login", MobLogin],
            [
              "m-onboard-welcome-screen",
              "Onboarding 1 · Welcome & role",
              MobOnboardWelcome,
            ],
            [
              "m-onboard-role-question-screen",
              "Onboarding 1.5 · Role question",
              MobOnboardRoleQuestion,
            ],
            [
              "m-onboard-create-screen",
              "Onboarding 2 · Child profile",
              MobOnboardCreateProfile,
            ],
            ["m-onboard-link-screen", "Onboarding 3 · Scan QR", MobOnboardLink],
            [
              "m-onboard-connecting-screen",
              "Onboarding 3b · Connecting",
              MobConnectingProgress,
            ],
            [
              "m-onboard-configure-screen",
              "Onboarding 4 · Initial rules",
              MobOnboardConfigure,
            ],
          ].map(([id, label, Comp]) => (
            <DCArtboard
              key={id}
              id={id}
              label={label}
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
                  <Comp />
                </PhoneFrame>
              </div>
            </DCArtboard>
          ))}
        </DCSection>

        {/* ═════════════════════════  11 · MOBILE — CHILD  ═════════════════════════ */}
        <DCSection
          id="mob-child"
          title="11 · Mobile — Child app"
          subtitle="Coach voice, never punitive. 4 tabs + locked-app state."
        >
          {[
            ["m-c-today-ios", "① Today · iOS", MobChildToday, false],
            ["m-c-today-and", "① Today · Android", MobChildToday, true],
            ["m-c-apps", "② Apps", MobChildApps, false],
            ["m-c-streak", "③ Streak & badges", MobChildStreak, false],
            ["m-c-ask", "④ Ask for more time", MobChildAsk, false],
            ["m-c-locked-ios", "Locked · TikTok (iOS)", MobChildLocked, false],
            ["m-c-locked-and", "Locked · Android", MobChildLocked, true],
            ["m-c-rewards", "⑤ Rewards", MobChildRewards, false],
          ].map(([id, label, Comp, android]) => (
            <DCArtboard
              key={id}
              id={id}
              label={label}
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
                <PhoneFrame android={android}>
                  <Comp android={android} />
                </PhoneFrame>
              </div>
            </DCArtboard>
          ))}
        </DCSection>

        {/* ═════════════════════════  12 · MOBILE — PERSONAL  ═════════════════════════ */}
        <DCSection
          id="mob-personal"
          title="12 · Mobile — Personal app"
          subtitle="My Space on mobile · Today, Reports, Focus, App detail"
        >
          {[
            ["m-p-today-ios", "① Today · iOS", MobPersonalToday, false],
            ["m-p-today-and", "① Today · Android", MobPersonalToday, true],
            ["m-p-reports", "② Reports", MobPersonalReports, false],
            ["m-p-focus", "③ Focus timer", MobPersonalFocus, false],
            ["m-p-detail", "④ App detail · Roblox", MobAppDetail, false],
          ].map(([id, label, Comp, android]) => (
            <DCArtboard
              key={id}
              id={id}
              label={label}
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
                <PhoneFrame android={android}>
                  <Comp android={android} />
                </PhoneFrame>
              </div>
            </DCArtboard>
          ))}
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

        <TweakSection label="Typography">
          <TweakRadio
            label="Font pairing"
            value={t.fontPair}
            options={[
              { value: "editorial", label: "Editorial" },
              { value: "modern", label: "Modern" },
              { value: "classic", label: "Classic" },
            ]}
            onChange={(v) => setTweak("fontPair", v)}
          />
        </TweakSection>

        <TweakSection label="Layout variation">
          <TweakRadio
            label="Layout"
            value={t.layout}
            options={[
              { value: "A", label: "Airy" },
              { value: "B", label: "Bold" },
            ]}
            onChange={(v) => setTweak("layout", v)}
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

        <TweakSection label="Navigation">
          <div style={{ padding: "6px 0 12px" }}>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("reset-dc-viewport", {
                    detail: { targetId: "web-signup-screen" },
                  }),
                );
              }}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                background: primaryColor,
                color: t.dark ? "#121212" : "#ffffff",
                border: "none",
                fontWeight: 600,
                fontSize: 12.5,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.9)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
            >
              Reset to Sign Up (new)
            </button>
          </div>
        </TweakSection>

        <div
          style={{
            padding: "10px 14px 4px",
            fontSize: 11.5,
            color: "rgba(41,38,27,.65)",
            lineHeight: 1.5,
          }}
        >
          8 palettes · hand-tuned dark variants · 3 font pairings · Try{" "}
          <b>Ocean + Modern + Dark</b>.
        </div>
      </TweaksPanel>
    </>
  );
}

// Palette swatch grid — respects the current dark mode preview
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

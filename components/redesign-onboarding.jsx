// Redesigned Onboarding flow — Welcome, Role question, 3-step wizard
// Editorial layout, sharper hierarchy, sanitized copy.

const { useState: useStateOB } = React;

// ─────────────────── Onboarding shell (shared chrome) ───────────────────
function OnboardShell({ step, totalSteps, onBack, children, right = null }) {
  const t = useTokens();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.c.bg,
        display: "grid",
        gridTemplateColumns: right ? "1fr 480px" : "1fr",
        boxSizing: "border-box",
        fontFamily: t.font,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AmbientBg variant="warm" opacity={0.55} />

      {/* Left: content pane */}
      <div
        style={{
          padding: "40px 72px 56px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 2,
          minHeight: 0,
        }}
      >
        {/* Top chrome: brand + step */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <BrandMark size={30} />
          {totalSteps > 0 && <StepBar current={step} total={totalSteps} />}
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              style={{
                background: "transparent",
                border: "none",
                color: t.c.textMute,
                fontSize: 13,
                fontFamily: t.font,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon name="arrowLeft" size={14} />
              Back
            </button>
          )}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </div>

      {/* Right: illustration / info panel (optional) */}
      {right && (
        <div
          style={{
            background: `linear-gradient(200deg, ${t.c.primarySoft} 0%, ${t.c.surface2} 100%)`,
            borderLeft: `1px solid ${t.c.border}`,
            padding: 40,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {right}
        </div>
      )}
    </div>
  );
}

// ─────────────────── Big choice card ───────────────────
function ChoiceCard({
  icon,
  title,
  subtitle,
  selected,
  onClick,
  badge,
  tone = "primary",
}) {
  const t = useTokens();
  const toneColor = tone === "accent" ? t.c.accent : t.c.primary;
  const toneSoft = tone === "accent" ? t.c.accentSoft : t.c.primarySoft;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: 28,
        borderRadius: 20,
        border: `1.5px solid ${selected ? toneColor : t.c.border}`,
        background: selected ? toneSoft : t.c.surface,
        cursor: "pointer",
        fontFamily: t.font,
        position: "relative",
        transition: "all .18s ease",
        boxShadow: selected
          ? `0 0 0 4px ${toneSoft}`
          : t.dark
            ? "0 1px 2px rgba(0,0,0,.2)"
            : "0 1px 2px rgba(40,30,20,.03)",
      }}
      onMouseEnter={(e) => {
        if (!selected) e.currentTarget.style.borderColor = t.c.textMute;
      }}
      onMouseLeave={(e) => {
        if (!selected) e.currentTarget.style.borderColor = t.c.border;
      }}
    >
      {badge && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            padding: "4px 8px",
            borderRadius: 4,
            background: t.c.text,
            color: t.c.bg,
          }}
        >
          {badge}
        </div>
      )}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: toneSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          color: toneColor,
        }}
      >
        <Icon name={icon} size={22} color={toneColor} />
      </div>
      <div
        style={{
          fontFamily: t.fontSerif,
          fontSize: 22,
          fontWeight: 500,
          color: t.c.text,
          letterSpacing: "-.01em",
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 14, color: t.c.textMute, lineHeight: 1.5 }}>
        {subtitle}
      </div>
      {selected && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: toneColor,
            color: t.c.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="check" size={16} color={t.c.bg} stroke={2.5} />
        </div>
      )}
    </button>
  );
}

// ─────────────────── Step: Welcome ───────────────────
function WebOnboardWelcomeNew() {
  const t = useTokens();
  const [choice, setChoice] = useStateOB("parent");

  return (
    <OnboardShell step={-1} totalSteps={0}>
      <div style={{ maxWidth: 720, width: "100%" }}>
        <Eyebrow style={{ color: t.c.primary, marginBottom: 16 }}>
          Welcome to {BRAND_NAME}
        </Eyebrow>
        <DisplayH size={60} style={{ marginBottom: 20 }}>
          Who are you setting this up for?
        </DisplayH>
        <p
          style={{
            fontSize: 17,
            color: t.c.textMute,
            lineHeight: 1.5,
            margin: "0 0 40px",
            maxWidth: 540,
          }}
        >
          {BRAND_NAME} works two ways. Choose the one that fits — you can always
          add the other later from settings.
        </p>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          <ChoiceCard
            icon="users"
            title="I'm managing a family"
            subtitle="Set gentle bounds for the people you care for, and keep an eye on your own habits at the same time."
            selected={choice === "parent"}
            onClick={() => setChoice("parent")}
            badge="Popular"
          />
          <ChoiceCard
            icon="user"
            title="Just for me"
            subtitle="A private focus companion. No family, no oversight — just your rhythms, your goals, your streaks."
            selected={choice === "personal"}
            onClick={() => setChoice("personal")}
            tone="accent"
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <div style={{ fontSize: 13, color: t.c.textMute }}>
            Takes about 2 minutes · You can always change this later
          </div>
          <PrimaryBtn iconRight="arrowRight">Continue</PrimaryBtn>
        </div>
      </div>
    </OnboardShell>
  );
}

// ─────────────────── Step: Role question ───────────────────
function WebOnboardRoleQuestionNew() {
  const t = useTokens();
  const [choice, setChoice] = useStateOB("yes");

  return (
    <OnboardShell step={-1} totalSteps={0} onBack={() => {}}>
      <div style={{ maxWidth: 720, width: "100%" }}>
        <Eyebrow style={{ color: t.c.primary, marginBottom: 16 }}>
          Just to confirm
        </Eyebrow>
        <DisplayH size={54} style={{ marginBottom: 20 }}>
          Are you managing devices for someone else?
        </DisplayH>
        <p
          style={{
            fontSize: 17,
            color: t.c.textMute,
            lineHeight: 1.5,
            margin: "0 0 40px",
            maxWidth: 560,
          }}
        >
          This changes what we set up next. Parents get device pairing and
          profile creation; individual users skip straight into their own space.
        </p>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          <ChoiceCard
            icon="check"
            title="Yes, I am"
            subtitle="I'll be pairing at least one other device and creating profiles for family members."
            selected={choice === "yes"}
            onClick={() => setChoice("yes")}
          />
          <ChoiceCard
            icon="user"
            title="No, just me"
            subtitle="Take me straight to My Space. I can add family members later if I need to."
            selected={choice === "no"}
            onClick={() => setChoice("no")}
            tone="accent"
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 40 }}
        >
          <PrimaryBtn iconRight="arrowRight">Continue</PrimaryBtn>
        </div>
      </div>
    </OnboardShell>
  );
}

// ─────────────────── Step 1: Create profile ───────────────────
function WebOnboardStep1New() {
  const t = useTokens();
  const [childName, setChildName] = useStateOB("");
  const [age, setAge] = useStateOB(11);
  const [avatar, setAvatar] = useStateOB(0);
  const avatarColors = [
    t.c.accent,
    t.c.lavender,
    t.c.blue,
    t.c.primary,
    t.c.yellow,
    t.c.danger,
  ];

  return (
    <OnboardShell
      step={0}
      totalSteps={3}
      onBack={() => {}}
      right={
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontFamily: t.fontSerif,
              fontSize: 28,
              fontWeight: 500,
              color: t.c.text,
              marginBottom: 10,
              letterSpacing: "-.02em",
              lineHeight: 1.2,
            }}
          >
            What we'll ask for
          </div>
          <p
            style={{
              fontSize: 14,
              color: t.c.textMute,
              lineHeight: 1.6,
              margin: "0 0 24px",
            }}
          >
            Only what {BRAND_NAME} needs to gently guide their day.
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {[
              ["A name", "How they'll appear in your family list."],
              [
                "Approximate age",
                "So we can suggest age-appropriate defaults.",
              ],
              ["A friendly avatar color", "Small delights matter."],
            ].map(([h, s], i) => (
              <li key={i} style={{ display: "flex", gap: 14 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: t.c.surface,
                    border: `1px solid ${t.c.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: t.fontSerif,
                    fontSize: 13,
                    fontWeight: 500,
                    color: t.c.primary,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div
                    style={{ fontWeight: 600, fontSize: 14, color: t.c.text }}
                  >
                    {h}
                  </div>
                  <div
                    style={{ fontSize: 13, color: t.c.textMute, marginTop: 2 }}
                  >
                    {s}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div
            style={{
              marginTop: 32,
              padding: 16,
              borderRadius: 14,
              background: t.c.surface,
              border: `1px solid ${t.c.border}`,
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <Icon name="shieldCheck" size={18} color={t.c.primary} />
            <div
              style={{ fontSize: 12.5, color: t.c.textMute, lineHeight: 1.5 }}
            >
              We never share this data. It lives in your family workspace,
              encrypted at rest.
            </div>
          </div>
        </div>
      }
    >
      <div style={{ maxWidth: 500, width: "100%" }}>
        <Eyebrow style={{ marginBottom: 12 }}>Step 1 of 3 · Profile</Eyebrow>
        <DisplayH size={46} style={{ marginBottom: 12 }}>
          Who are we caring for?
        </DisplayH>
        <p
          style={{
            fontSize: 15.5,
            color: t.c.textMute,
            lineHeight: 1.5,
            margin: "0 0 32px",
          }}
        >
          Start with one profile. You can add more from Settings anytime.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <RField
            label="Their name"
            value={childName}
            onChange={setChildName}
            placeholder="e.g. Alex"
            autoFocus
          />

          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: t.c.textMute,
                marginBottom: 10,
                letterSpacing: ".02em",
              }}
            >
              Age
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[7, 9, 11, 13, 15, 17].map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAge(a)}
                  style={{
                    padding: "9px 16px",
                    borderRadius: 10,
                    border: `1px solid ${age === a ? t.c.primary : t.c.border}`,
                    background: age === a ? t.c.primarySoft : t.c.surface,
                    color: age === a ? t.c.primary : t.c.text,
                    fontFamily: t.font,
                    fontSize: 13.5,
                    fontWeight: age === a ? 600 : 500,
                    cursor: "pointer",
                    transition: "all .15s",
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: t.c.textMute,
                marginBottom: 10,
                letterSpacing: ".02em",
              }}
            >
              Avatar color
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {avatarColors.map((col, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAvatar(i)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: col,
                    cursor: "pointer",
                    border:
                      avatar === i
                        ? `3px solid ${t.c.text}`
                        : `2px solid ${t.c.surface}`,
                    boxShadow:
                      avatar === i
                        ? `0 0 0 2px ${t.c.text}`
                        : `0 0 0 1px ${t.c.border}`,
                    transition: "all .15s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <button
            type="button"
            style={{
              background: "transparent",
              border: "none",
              color: t.c.textMute,
              fontSize: 13,
              fontFamily: t.font,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Skip for now
          </button>
          <PrimaryBtn iconRight="arrowRight">Continue</PrimaryBtn>
        </div>
      </div>
    </OnboardShell>
  );
}

// ─────────────────── Step 2: Link device (QR) ───────────────────
function WebOnboardStep2New() {
  const t = useTokens();
  return (
    <OnboardShell
      step={1}
      totalSteps={3}
      onBack={() => {}}
      right={
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontFamily: t.fontSerif,
              fontSize: 28,
              fontWeight: 500,
              color: t.c.text,
              marginBottom: 10,
              letterSpacing: "-.02em",
              lineHeight: 1.2,
            }}
          >
            How pairing works
          </div>
          <ol
            style={{
              paddingLeft: 0,
              listStyle: "none",
              margin: "24px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {[
              [
                "Install the app",
                `On their device, install ${BRAND_NAME} from the App Store or Play Store.`,
              ],
              [
                "Scan the code",
                "Open the app and point the camera at the QR code on the left.",
              ],
              [
                "Grant permissions",
                "One tap gives us the access needed for gentle screen time reminders.",
              ],
              ["Done", "The device now appears in your family workspace."],
            ].map(([h, s], i) => (
              <li key={i} style={{ display: "flex", gap: 14 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: t.c.text,
                    color: t.c.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div
                    style={{ fontWeight: 600, fontSize: 14, color: t.c.text }}
                  >
                    {h}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: t.c.textMute,
                      marginTop: 2,
                      lineHeight: 1.5,
                    }}
                  >
                    {s}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      }
    >
      <div style={{ maxWidth: 500, width: "100%" }}>
        <Eyebrow style={{ marginBottom: 12 }}>
          Step 2 of 3 · Link device
        </Eyebrow>
        <DisplayH size={46} style={{ marginBottom: 12 }}>
          Scan to pair.
        </DisplayH>
        <p
          style={{
            fontSize: 15.5,
            color: t.c.textMute,
            lineHeight: 1.5,
            margin: "0 0 32px",
          }}
        >
          Open the {BRAND_NAME} app on their phone and scan this code to link it
          in seconds.
        </p>

        <div
          style={{
            background: t.c.surface,
            border: `1px solid ${t.c.border}`,
            borderRadius: 20,
            padding: 32,
            display: "flex",
            gap: 28,
            alignItems: "center",
          }}
        >
          {/* Faux QR */}
          <div
            style={{
              width: 200,
              height: 200,
              padding: 12,
              background: "#fff",
              borderRadius: 14,
              flexShrink: 0,
              display: "grid",
              gridTemplateColumns: "repeat(21, 1fr)",
              gap: 0,
              boxShadow: t.dark
                ? "0 0 0 1px rgba(255,255,255,.08)"
                : "0 0 0 1px rgba(0,0,0,.05)",
            }}
          >
            {Array.from({ length: 441 }).map((_, i) => {
              const row = Math.floor(i / 21);
              const col = i % 21;
              const isCorner =
                (row < 7 && col < 7) ||
                (row < 7 && col > 13) ||
                (row > 13 && col < 7);
              const cornerBorder =
                (row === 0 || row === 6 || col === 0 || col === 6) &&
                row < 7 &&
                col < 7;
              const cornerInner = row >= 2 && row <= 4 && col >= 2 && col <= 4;
              // Deterministic pattern
              const seed = (row * 13 + col * 7 + row * col) % 100;
              const fill = isCorner
                ? cornerBorder || cornerInner
                  ? "#000"
                  : "#fff"
                : seed > 50
                  ? "#000"
                  : "#fff";
              return (
                <div key={i} style={{ background: fill, aspectRatio: 1 }} />
              );
            })}
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: t.c.textMute,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Or enter this code
            </div>
            <div
              style={{
                fontFamily: t.fontMono,
                fontSize: 26,
                fontWeight: 500,
                letterSpacing: ".18em",
                color: t.c.text,
                marginBottom: 20,
              }}
            >
              F4KZ-9M2N
            </div>
            <div
              style={{
                fontSize: 13,
                color: t.c.textMute,
                lineHeight: 1.5,
                marginBottom: 16,
              }}
            >
              Code refreshes every 5 minutes.
            </div>
            <GhostBtn iconLeft="bell" style={{ padding: "9px 14px" }}>
              Send link via email
            </GhostBtn>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <button
            type="button"
            style={{
              background: "transparent",
              border: "none",
              color: t.c.textMute,
              fontSize: 13,
              fontFamily: t.font,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            I'll do this later
          </button>
          <PrimaryBtn iconRight="arrowRight">Continue</PrimaryBtn>
        </div>
      </div>
    </OnboardShell>
  );
}

// ─────────────────── Step 3: Setup limits ───────────────────
function WebOnboardStep3New() {
  const t = useTokens();
  const [preset, setPreset] = useStateOB("balanced");

  const presets = [
    {
      key: "gentle",
      name: "Gentle",
      hours: "4h",
      subtitle: "Soft, generous limits. Good for older teens.",
      details: ["Social 90m", "Games 90m", "Video 90m"],
      tone: "blue",
    },
    {
      key: "balanced",
      name: "Balanced",
      hours: "2.5h",
      subtitle: "Our default. Suits most families.",
      details: ["Social 45m", "Games 60m", "Video 60m"],
      tone: "primary",
      recommended: true,
    },
    {
      key: "focused",
      name: "Focused",
      hours: "1.5h",
      subtitle: "Tighter bounds. Younger kids or study weeks.",
      details: ["Social 20m", "Games 30m", "Video 30m"],
      tone: "accent",
    },
  ];

  return (
    <OnboardShell step={2} totalSteps={3} onBack={() => {}}>
      <div style={{ maxWidth: 900, width: "100%", margin: "0 auto" }}>
        <Eyebrow style={{ marginBottom: 12 }}>Step 3 of 3 · Rhythm</Eyebrow>
        <DisplayH size={46} style={{ marginBottom: 12, textAlign: "center" }}>
          What kind of rhythm feels right?
        </DisplayH>
        <p
          style={{
            fontSize: 15.5,
            color: t.c.textMute,
            lineHeight: 1.5,
            margin: "0 auto 40px",
            textAlign: "center",
            maxWidth: 540,
          }}
        >
          Pick a starting point. You can fine-tune every category and app
          afterward.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
          }}
        >
          {presets.map((p) => {
            const selected = preset === p.key;
            const toneColor =
              p.tone === "blue"
                ? t.c.blue
                : p.tone === "accent"
                  ? t.c.accent
                  : t.c.primary;
            const toneSoft =
              p.tone === "blue"
                ? t.c.blueSoft
                : p.tone === "accent"
                  ? t.c.accentSoft
                  : t.c.primarySoft;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setPreset(p.key)}
                style={{
                  padding: 24,
                  borderRadius: 20,
                  border: `1.5px solid ${selected ? toneColor : t.c.border}`,
                  background: selected ? toneSoft : t.c.surface,
                  fontFamily: t.font,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all .18s",
                  position: "relative",
                }}
              >
                {p.recommended && (
                  <div
                    style={{
                      position: "absolute",
                      top: -10,
                      right: 16,
                      padding: "3px 10px",
                      borderRadius: 8,
                      background: t.c.text,
                      color: t.c.bg,
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Recommended
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontFamily: t.fontSerif,
                      fontSize: 26,
                      fontWeight: 500,
                      letterSpacing: "-.01em",
                      color: t.c.text,
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: toneColor }}
                  >
                    {p.hours}/day
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    color: t.c.textMute,
                    lineHeight: 1.5,
                    marginBottom: 16,
                  }}
                >
                  {p.subtitle}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    borderTop: `1px dashed ${t.c.border}`,
                    paddingTop: 14,
                  }}
                >
                  {p.details.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 12.5,
                        color: t.c.text,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{d.split(" ")[0]}</span>
                      <span
                        style={{
                          color: t.c.textMute,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {d.split(" ")[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 28,
            padding: 20,
            borderRadius: 16,
            background: t.c.surface2,
            border: `1px solid ${t.c.border}`,
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: t.c.yellowSoft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="clock" size={20} color={t.c.yellowText} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 14,
                color: t.c.text,
                marginBottom: 2,
              }}
            >
              Include a wind-down window
            </div>
            <div style={{ fontSize: 12.5, color: t.c.textMute }}>
              Screens dim automatically from 9pm to 7am. Recommended for all
              ages.
            </div>
          </div>
          <label style={{ cursor: "pointer" }}>
            <input type="checkbox" defaultChecked style={{ display: "none" }} />
            <div
              style={{
                width: 44,
                height: 26,
                borderRadius: 13,
                background: t.c.primary,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: 2,
                  top: 2,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#fff",
                }}
              />
            </div>
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <div style={{ fontSize: 13, color: t.c.textMute }}>
            Almost done · Adjust everything anytime
          </div>
          <PrimaryBtn iconRight="check">Finish setup</PrimaryBtn>
        </div>
      </div>
    </OnboardShell>
  );
}

Object.assign(window, {
  OnboardShell,
  ChoiceCard,
  WebOnboardWelcomeNew,
  WebOnboardRoleQuestionNew,
  WebOnboardStep1New,
  WebOnboardStep2New,
  WebOnboardStep3New,
});

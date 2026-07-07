// Redesigned Settings page — anchored sections + sticky section-jump sidebar

const { useState: useStateSet } = React;

// ─────────────────── Row / Field primitives ───────────────────
function SettingsRow({ title, description, control, danger = false }) {
  const t = useTokens();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 24,
        padding: "18px 0",
        borderBottom: `1px solid ${t.c.border}`,
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: danger ? t.c.danger : t.c.text,
            marginBottom: 3,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 12.5,
            color: t.c.textMute,
            lineHeight: 1.5,
            maxWidth: 520,
          }}
        >
          {description}
        </div>
      </div>
      <div>{control}</div>
    </div>
  );
}

function Toggle({ on = false, onChange }) {
  const t = useTokens();
  const [state, setState] = useStateSet(on);
  return (
    <button
      onClick={() => {
        setState(!state);
        onChange && onChange(!state);
      }}
      style={{
        width: 42,
        height: 24,
        borderRadius: 12,
        border: "none",
        background: state ? t.c.primary : t.c.surface2,
        position: "relative",
        cursor: "pointer",
        transition: "background .2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: state ? 20 : 2,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.15)",
          transition: "left .2s",
        }}
      />
    </button>
  );
}

function Select({ value, options }) {
  const t = useTokens();
  return (
    <div
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: `1px solid ${t.c.border}`,
        background: t.c.surface,
        color: t.c.text,
        fontFamily: t.font,
        fontSize: 13,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
      }}
    >
      {value}
      <Icon name="arrowDown" size={12} color={t.c.textMute} />
    </div>
  );
}

// ─────────────────── Settings section ───────────────────
function SettingsSection({ id, title, description, children }) {
  const t = useTokens();
  return (
    <section id={id} style={{ marginBottom: 48, scrollMarginTop: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontFamily: t.fontSerif,
            fontSize: 26,
            fontWeight: 500,
            color: t.c.text,
            letterSpacing: "-.015em",
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        {description && (
          <div style={{ fontSize: 13.5, color: t.c.textMute }}>
            {description}
          </div>
        )}
      </div>
      <div
        style={{
          padding: "0 24px",
          borderRadius: 16,
          background: t.c.surface,
          border: `1px solid ${t.c.border}`,
        }}
      >
        {children}
      </div>
    </section>
  );
}

// ─────────────────── Web Settings (main) ───────────────────
function WebSettingsNew() {
  const t = useTokens();
  const [active, setActive] = useStateSet("account");
  const [mode, setMode] = useStateSet("family");

  const sections = [
    { id: "account", label: "Account", icon: "user" },
    { id: "family", label: "Family & members", icon: "users" },
    { id: "notifications", label: "Notifications", icon: "bell" },
    { id: "appearance", label: "Appearance", icon: "sparkles" },
    { id: "privacy", label: "Privacy & data", icon: "shield" },
    { id: "billing", label: "Billing", icon: "chart" },
    { id: "danger", label: "Danger zone", icon: "alert" },
  ];

  return (
    <WorkspaceShell
      mode={mode}
      active="settings"
      onModeChange={setMode}
      title="Settings"
      subtitle="Manage your account, family, and preferences"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: 40,
          alignItems: "flex-start",
          maxWidth: 1080,
        }}
      >
        {/* Sticky section jump */}
        <aside style={{ position: "sticky", top: 0, alignSelf: "flex-start" }}>
          <div
            style={{
              fontSize: 11,
              color: t.c.textMute,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              marginBottom: 12,
              padding: "0 10px",
            }}
          >
            On this page
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActive(s.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 10px",
                  borderRadius: 8,
                  background: active === s.id ? t.c.primarySoft : "transparent",
                  color: active === s.id ? t.c.primary : t.c.text,
                  fontSize: 13,
                  fontWeight: active === s.id ? 600 : 500,
                  textDecoration: "none",
                  borderLeft:
                    active === s.id
                      ? `2px solid ${t.c.primary}`
                      : `2px solid transparent`,
                  paddingLeft: active === s.id ? 12 : 10,
                  transition: "all .15s",
                }}
              >
                <Icon
                  name={s.icon}
                  size={14}
                  color={active === s.id ? t.c.primary : t.c.textMute}
                />
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div style={{ minWidth: 0 }}>
          {/* Account */}
          <SettingsSection
            id="account"
            title="Account"
            description="Your identity across the workspace"
          >
            <SettingsRow
              title="Full name"
              description="Displayed to your family members"
              control={<Select value="Sarah Mitchell" />}
            />
            <SettingsRow
              title="Email"
              description="For sign-in and important alerts"
              control={<Select value="sarah.m@gmail.com" />}
            />
            <SettingsRow
              title="Time zone"
              description="Used for schedule enforcement"
              control={<Select value="America / New York (GMT-5)" />}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "16px 0",
                gap: 10,
              }}
            >
              <GhostBtn>Cancel</GhostBtn>
              <PrimaryBtn>Save changes</PrimaryBtn>
            </div>
          </SettingsSection>

          {/* Family */}
          <SettingsSection
            id="family"
            title="Family & members"
            description="People connected to this workspace"
          >
            <div style={{ padding: "16px 0" }}>
              {window.APP_DATA.kids.map((k, i) => (
                <div
                  key={k.id}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom:
                      i < window.APP_DATA.kids.length - 1
                        ? `1px solid ${t.c.border}`
                        : "none",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: k.avatar,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: t.fontSerif,
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {k.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontSize: 14, fontWeight: 500, color: t.c.text }}
                    >
                      {k.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: t.c.textMute,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        flexWrap: "wrap",
                        marginTop: 2,
                      }}
                    >
                      <span>Age {k.age}</span>
                      <span>·</span>
                      {k.devices ? (
                        k.devices.map((d) => (
                          <span
                            key={d}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 3,
                              background: t.c.surface2,
                              padding: "2px 6px",
                              borderRadius: 4,
                              fontSize: 10,
                              color: t.c.text,
                            }}
                          >
                            <Icon name="phone" size={9} />
                            {d}
                          </span>
                        ))
                      ) : (
                        <span>{k.device}</span>
                      )}
                      <span>·</span>
                      <span>Managed profile</span>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "3px 8px",
                      borderRadius: 6,
                      background: t.c.primarySoft,
                      color: t.c.primary,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    Active
                  </div>
                  <button
                    style={{
                      padding: 8,
                      borderRadius: 7,
                      border: `1px solid ${t.c.border}`,
                      background: t.c.surface,
                      color: t.c.textMute,
                      cursor: "pointer",
                    }}
                  >
                    <Icon name="more" size={14} />
                  </button>
                </div>
              ))}
              <div style={{ marginTop: 16 }}>
                <GhostBtn iconLeft="plus">Add family member</GhostBtn>
              </div>
            </div>
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection
            id="notifications"
            title="Notifications"
            description="What we alert you about and when"
          >
            <SettingsRow
              title="Limit warnings"
              description="Notify when a family member is nearing a daily limit"
              control={<Toggle on={true} />}
            />
            <SettingsRow
              title="Bypass attempts"
              description="Immediate alert when a paired device tries to bypass restrictions"
              control={<Toggle on={true} />}
            />
            <SettingsRow
              title="Time requests"
              description="Alert me when a family member requests extra time"
              control={<Toggle on={true} />}
            />
            <SettingsRow
              title="Weekly summary"
              description="A quiet email digest of your family's week — Sunday evenings"
              control={<Toggle on={true} />}
            />
            <SettingsRow
              title="Personal coach tips"
              description="Occasional suggestions for your own screen time habits"
              control={<Toggle on={false} />}
            />
            <SettingsRow
              title="Quiet hours"
              description="Silence all notifications"
              control={<Select value="10pm — 7am" />}
            />
          </SettingsSection>

          {/* Appearance */}
          <SettingsSection
            id="appearance"
            title="Appearance"
            description="How the workspace looks and feels"
          >
            <SettingsRow
              title="Theme"
              description="Follow system, or choose light or dark"
              control={<Select value="Follow system" />}
            />
            <SettingsRow
              title="Palette"
              description="Currently using Sage — configurable via the Tweaks panel"
              control={<Select value="Sage" />}
            />
            <SettingsRow
              title="Density"
              description="How much information fits on screen"
              control={<Select value="Cozy" />}
            />
            <SettingsRow
              title="Font pairing"
              description="Choose your typographic voice"
              control={<Select value="Editorial" />}
            />
          </SettingsSection>

          {/* Privacy */}
          <SettingsSection
            id="privacy"
            title="Privacy & data"
            description="Your data is yours — we mean that"
          >
            <SettingsRow
              title="Two-factor authentication"
              description="Extra layer of security on sign-in"
              control={<Toggle on={true} />}
            />
            <SettingsRow
              title="Anonymized usage analytics"
              description="Help us improve the coach model. Never tied to your identity."
              control={<Toggle on={false} />}
            />
            <SettingsRow
              title="Data export"
              description="Download a full copy of everything we store about you (JSON)"
              control={<GhostBtn>Request export</GhostBtn>}
            />
            <SettingsRow
              title="Trusted devices"
              description="7 devices currently signed in"
              control={<GhostBtn>Review</GhostBtn>}
            />
          </SettingsSection>

          {/* Billing */}
          <SettingsSection
            id="billing"
            title="Billing"
            description="Your plan and payment method"
          >
            <div
              style={{
                padding: "20px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${t.c.border}`,
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: t.c.text }}>
                  Family plan · $9/month
                </div>
                <div
                  style={{ fontSize: 12.5, color: t.c.textMute, marginTop: 2 }}
                >
                  Renews July 15, 2026 · 4 devices paired
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <GhostBtn>Change plan</GhostBtn>
                <PrimaryBtn>Manage billing</PrimaryBtn>
              </div>
            </div>
            <SettingsRow
              title="Payment method"
              description="Visa ending in 4242"
              control={<GhostBtn>Update</GhostBtn>}
            />
            <SettingsRow
              title="Invoices"
              description="View and download past receipts"
              control={<GhostBtn>View history</GhostBtn>}
            />
          </SettingsSection>

          {/* Danger */}
          <SettingsSection
            id="danger"
            title="Danger zone"
            description="These actions cannot be undone"
          >
            <SettingsRow
              title="Pause all limits"
              description="Temporarily disable all family limits and schedules"
              danger={false}
              control={<GhostBtn>Pause for 24h</GhostBtn>}
            />
            <SettingsRow
              title="Delete workspace"
              description="Permanently delete all family data, settings, and paired devices"
              danger
              control={
                <button
                  style={{
                    padding: "9px 16px",
                    borderRadius: 8,
                    background: t.c.dangerSoft,
                    color: t.c.danger,
                    border: `1px solid ${t.c.danger}`,
                    fontFamily: t.font,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Delete workspace
                </button>
              }
            />
          </SettingsSection>
        </div>
      </div>
    </WorkspaceShell>
  );
}

Object.assign(window, {
  SettingsRow,
  Toggle,
  Select,
  SettingsSection,
  WebSettingsNew,
});

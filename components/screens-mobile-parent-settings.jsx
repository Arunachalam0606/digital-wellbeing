// Parent mobile — Settings/Account + Add-a-child flow

function MobParentSettings({ android = false }) {
  const t = useTokens();
  return (
    <MobileScreen android={android}>
      <MobileHeader title="Settings" back="Family" />

      <div
        style={{
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Account block */}
        <MobileCard pad={16}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Avatar name="Sarah Mitchell" size={56} color={t.c.primary} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: t.fontSerif,
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: "-.01em",
                }}
              >
                Sarah Mitchell
              </div>
              <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 3 }}>
                sarah.m@gmail.com · Parent
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <Chip
                  bg={t.c.primarySoft}
                  color={t.c.primary}
                  style={{ fontSize: 10 }}
                >
                  Family plan
                </Chip>
                <Chip
                  bg={t.c.surface2}
                  color={t.c.textMute}
                  style={{ fontSize: 10 }}
                >
                  2 kids · 4 devices
                </Chip>
              </div>
            </div>
            <Icon name="arrowRight" size={16} color={t.c.textMute} />
          </div>
        </MobileCard>

        {/* Family */}
        <SettingsGroup label="Family">
          <SettingsRow
            icon="users"
            label="Manage children"
            sub="Maya, Jaden · linked devices"
            chevron
          />
          <SettingsRow
            icon="plus"
            label="Add a child"
            sub="Set up a new device"
            chevron
            color={t.c.primary}
          />
          <SettingsRow
            icon="phone"
            label="Manage devices"
            sub="4 connected · 1 paused"
            chevron
          />
        </SettingsGroup>

        {/* Wellbeing */}
        <SettingsGroup label="Wellbeing">
          <SettingsRow
            icon="clock"
            label="My daily budget"
            sub="4h · edit"
            chevron
          />
          <SettingsRow
            icon="calendar"
            label="My weekly goal"
            sub="28h · edit"
            chevron
          />
          <SettingsRow
            icon="leaf"
            label="Focus mode defaults"
            sub="45 min · Deep work"
            chevron
          />
        </SettingsGroup>

        {/* Notifications */}
        <SettingsGroup label="Notifications">
          <SettingsRow
            icon="bell"
            label="Alerts"
            sub="Limits hit, requests, bypass"
            chevron
          />
          <SettingsToggleRow icon="lock" label="Bypass attempts" on />
          <SettingsToggleRow icon="alert" label="80% warning" on />
          <SettingsToggleRow icon="trophy" label="Achievements" on />
          <SettingsToggleRow
            icon="message"
            label="Weekly summary email"
            on={false}
          />
          <SettingsRow
            icon="clock"
            label="Quiet hours"
            sub="10 PM – 7 AM"
            chevron
          />
        </SettingsGroup>

        {/* Privacy & data */}
        <SettingsGroup label="Privacy & data">
          <SettingsRow
            icon="shieldCheck"
            label="Data retention"
            sub="Keep for 90 days"
            chevron
          />
          <SettingsToggleRow icon="eye" label="Hide exact timestamps" on />
          <SettingsRow icon="globe" label="Export my data" chevron />
          <SettingsRow
            icon="ban"
            label="Delete account"
            chevron
            color={t.c.danger}
          />
        </SettingsGroup>

        {/* About */}
        <SettingsGroup label="About">
          <SettingsRow
            icon="sparkles"
            label="What's new"
            sub="v1.4.0 · Bedtime is here"
          />
          <SettingsRow icon="lightbulb" label="Help & feedback" chevron />
          <SettingsRow icon="star" label="Rate Atrium" chevron />
          <SettingsRow icon="logout" label="Sign out" color={t.c.danger} />
        </SettingsGroup>

        <div
          style={{
            textAlign: "center",
            padding: "12px 0 16px",
            fontSize: 11,
            color: t.c.textMute,
          }}
        >
          Atrium 1.4.0 · Build 2026.06.29
        </div>
      </div>
    </MobileScreen>
  );
}

function SettingsGroup({ label, children }) {
  const t = useTokens();
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          color: t.c.textMute,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: ".06em",
          margin: "6px 4px 8px",
        }}
      >
        {label}
      </div>
      <MobileCard pad={0}>
        {React.Children.map(children, (child, i) => {
          const arr = React.Children.toArray(children);
          return React.cloneElement(child, { last: i === arr.length - 1 });
        })}
      </MobileCard>
    </div>
  );
}

function SettingsRow({ icon, label, sub, chevron, color, last }) {
  const t = useTokens();
  return (
    <div
      style={{
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: last ? "none" : `1px solid ${t.c.border}`,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          background: (color || t.c.text) + "11",
          color: color || t.c.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={icon} size={15} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{ fontSize: 13.5, fontWeight: 600, color: color || t.c.text }}
        >
          {label}
        </div>
        {sub && (
          <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 1 }}>
            {sub}
          </div>
        )}
      </div>
      {chevron && <Icon name="arrowRight" size={14} color={t.c.textMute} />}
    </div>
  );
}

function SettingsToggleRow({ icon, label, sub, on, last }) {
  const t = useTokens();
  return (
    <div
      style={{
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: last ? "none" : `1px solid ${t.c.border}`,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          background: t.c.text + "11",
          color: t.c.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={icon} size={15} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{label}</div>
        {sub && (
          <div style={{ fontSize: 11, color: t.c.textMute, marginTop: 1 }}>
            {sub}
          </div>
        )}
      </div>
      <Toggle on={on} />
    </div>
  );
}

window.MobParentSettings = MobParentSettings;

function MobParentManageChildren({ android = false, onBack }) {
  const t = useTokens();
  return (
    <MobileScreen android={android} scroll={true}>
      <MobileHeader title="Manage Children" onBack={onBack} back="Settings" />
      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { name: "Maya Mitchell", age: 11, devices: 2, avatar: "Maya", color: t.c.primary },
          { name: "Jaden Mitchell", age: 8, devices: 1, avatar: "Jaden", color: t.c.accent }
        ].map((child, idx) => (
          <MobileCard key={idx} pad={16}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <Avatar name={child.name} size={48} color={child.color} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{child.name}</div>
                <div style={{ fontSize: 12, color: t.c.textMute, marginTop: 2 }}>Age {child.age} · {child.devices} connected devices</div>
              </div>
              <button style={{ background: t.c.surface2, border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, color: t.c.text, fontFamily: "inherit", cursor: "pointer" }}>
                Edit
              </button>
            </div>
            <div style={{ height: 1, background: t.c.border, marginBottom: 14 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                <span style={{ color: t.c.textMute }}>Screen Time Daily Limit</span>
                <strong style={{ color: t.c.text }}>2h 30m</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                <span style={{ color: t.c.textMute }}>Bedtime Routine Lock</span>
                <strong style={{ color: t.c.primary }}>9:00 PM – 7:00 AM</strong>
              </div>
            </div>
          </MobileCard>
        ))}
      </div>
    </MobileScreen>
  );
}

function MobParentManageDevices({ android = false, onBack }) {
  const t = useTokens();
  const [paused, setPaused] = React.useState({ "maya-phone": false, "jaden-tab": true });

  const devices = [
    { id: "maya-phone", name: "Maya's iPhone 14", type: "iPhone", status: "Active limits", color: t.c.primary },
    { id: "maya-ipad", name: "Maya's iPad Pro", type: "iPad", status: "Quiet hours active", color: t.c.primary },
    { id: "jaden-tab", name: "Jaden's Android Tab", type: "Tablet", status: "Paused by Parent", color: t.c.accent }
  ];

  return (
    <MobileScreen android={android} scroll={true}>
      <MobileHeader title="Manage Devices" onBack={onBack} back="Settings" />
      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 12 }}>
        {devices.map((device) => {
          const isPaused = paused[device.id];
          return (
            <MobileCard key={device.id} pad={16}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: isPaused ? t.c.dangerSoft : t.c.primarySoft, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: isPaused ? t.c.danger : t.c.primary }}>
                  <Icon name="phone" size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14.5 }}>{device.name}</div>
                  <div style={{ fontSize: 12, color: isPaused ? t.c.danger : t.c.textMute, marginTop: 2 }}>
                    {isPaused ? "Connection Paused" : device.status}
                  </div>
                </div>
                <button
                  onClick={() => setPaused({ ...paused, [device.id]: !isPaused })}
                  style={{
                    background: isPaused ? t.c.danger : t.c.surface2,
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: isPaused ? "white" : t.c.text,
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}
                >
                  {isPaused ? "Resume" : "Pause"}
                </button>
              </div>
            </MobileCard>
          );
        })}
      </div>
    </MobileScreen>
  );
}

window.MobParentManageChildren = MobParentManageChildren;
window.MobParentManageDevices = MobParentManageDevices;

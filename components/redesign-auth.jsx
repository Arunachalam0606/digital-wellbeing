// Redesigned Auth: Login + Sign Up
// Editorial two-pane layout — hero storytelling left, form right.
// Sanitized: no child names / kid-metric leaks pre-auth.

const { useState: useStateAuth } = React;

// ─────────────────── Feature preview card (sanitized for pre-auth) ───────────────────
function PreAuthFeatureCard() {
  const t = useTokens();
  // Ring progress — abstract, not tied to a real child
  const R = 34,
    C = 2 * Math.PI * R;
  const pct = 0.68;
  return (
    <div
      style={{
        background: t.c.surface,
        borderRadius: 20,
        padding: 24,
        border: `1px solid ${t.c.border}`,
        boxShadow: t.dark
          ? "0 20px 48px rgba(0,0,0,.35)"
          : "0 20px 48px rgba(40,30,20,.06)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={R}
            fill="none"
            stroke={t.c.primarySoft}
            strokeWidth="8"
          />
          <circle
            cx="40"
            cy="40"
            r={R}
            fill="none"
            stroke={t.c.primary}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
            transform="rotate(-90 40 40)"
          />
          <text
            x="40"
            y="42"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={t.c.text}
            fontSize="18"
            fontWeight="600"
            fontFamily={t.font}
          >
            68%
          </text>
        </svg>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: t.c.textMute,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            Mindful habit streak
          </div>
          <div
            style={{
              fontFamily: t.fontSerif,
              fontSize: 22,
              fontWeight: 500,
              color: t.c.text,
              letterSpacing: "-.01em",
              marginTop: 4,
            }}
          >
            Consistent progress, gently.
          </div>
          <div style={{ fontSize: 13, color: t.c.textMute, marginTop: 4 }}>
            No punishments, no guilt. Just soft nudges toward better rhythms.
          </div>
        </div>
      </div>

      {/* Empathetic coaching quote */}
      <div
        style={{
          borderTop: `1px dashed ${t.c.border}`,
          paddingTop: 18,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: t.c.accentSoft,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon name="sparkles" size={16} color={t.c.accent} />
        </div>
        <div>
          <div
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              color: t.c.accent,
              letterSpacing: ".06em",
              textTransform: "uppercase",
            }}
          >
            Coach
          </div>
          <div
            style={{
              fontFamily: t.fontSerif,
              fontStyle: "italic",
              fontSize: 15,
              lineHeight: 1.5,
              color: t.c.text,
              marginTop: 4,
              textWrap: "pretty",
            }}
          >
            &ldquo;You've kept evenings offline for six days. That's a rhythm
            forming — protect it tonight too.&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── Auth hero pane (shared) ───────────────────
function AuthHeroPane({ title, subtitle }) {
  const t = useTokens();
  return (
    <div
      style={{
        background: `linear-gradient(155deg, ${t.c.primarySoft} 0%, ${t.c.surface2} 60%, ${t.c.bg} 100%)`,
        padding: "60px 60px 48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        borderRight: `1px solid ${t.c.border}`,
      }}
    >
      <AmbientBg variant="warm" opacity={0.9} />

      {/* Brand top-left */}
      <div style={{ zIndex: 2, position: "relative" }}>
        <BrandMark size={30} />
      </div>

      {/* Editorial headline */}
      <div style={{ zIndex: 2, position: "relative", maxWidth: 500 }}>
        <Eyebrow style={{ color: t.c.primary, marginBottom: 14 }}>
          Screen time · reimagined
        </Eyebrow>
        <DisplayH size={52} style={{ marginBottom: 20 }}>
          {title}
        </DisplayH>
        <p
          style={{
            fontSize: 16,
            color: t.c.textMute,
            lineHeight: 1.6,
            fontFamily: t.font,
            margin: 0,
            maxWidth: 440,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Feature preview card */}
      <div style={{ zIndex: 2, position: "relative" }}>
        <PreAuthFeatureCard />

        {/* Trust bar */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 24,
            fontSize: 12,
            color: t.c.textMute,
            fontFamily: t.font,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="shieldCheck" size={14} color={t.c.primary} />
            End-to-end encrypted
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="lock" size={14} color={t.c.primary} />
            No data sold
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="check" size={14} color={t.c.primary} />
            COPPA compliant
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── Social OAuth row ───────────────────
function SocialAuthRow() {
  const t = useTokens();
  const btn = (label, svg) => (
    <button
      type="button"
      style={{
        flex: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "11px 14px",
        border: `1px solid ${t.c.border}`,
        borderRadius: 10,
        background: t.c.surface,
        color: t.c.text,
        fontFamily: t.font,
        fontSize: 13.5,
        fontWeight: 500,
        cursor: "pointer",
        transition: "background .12s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = t.c.surface2)}
      onMouseLeave={(e) => (e.currentTarget.style.background = t.c.surface)}
    >
      {svg}
      {label}
    </button>
  );
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {btn(
        "Google",
        <svg width="16" height="16" viewBox="0 0 48 48">
          <path
            fill="#EA4335"
            d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.5 2.4 30.1 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.2 13.4 17.6 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.6 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.5z"
          />
          <path
            fill="#FBBC05"
            d="M10.4 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.8-6.1C1 16.4 0 20.1 0 24s1 7.6 2.6 10.8l7.8-6.1z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.1 0 11.3-2 15-5.5l-7.6-5.9c-2.1 1.4-4.8 2.3-7.4 2.3-6.4 0-11.8-3.9-13.6-9.3l-7.8 6.1C6.5 42.6 14.6 48 24 48z"
          />
        </svg>,
      )}
      {btn(
        "Apple",
        <svg width="15" height="15" viewBox="0 0 24 24" fill={t.c.text}>
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>,
      )}
    </div>
  );
}

// ─────────────────── Login (redesigned) ───────────────────
function WebLoginNew() {
  const t = useTokens();
  const [email, setEmail] = useStateAuth("");
  const [password, setPassword] = useStateAuth("");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.c.bg,
        display: "grid",
        gridTemplateColumns: t.layout === "B" ? "1fr 1fr" : "1.15fr 1fr",
        boxSizing: "border-box",
        fontFamily: t.font,
      }}
    >
      <AuthHeroPane
        title={<>Bring calm back to your family's screens.</>}
        subtitle="A soft-bounded, streak-driven, empathetic screen time companion — for you and the people you care for."
      />

      {/* Right: form pane */}
      <div
        style={{
          padding: "60px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: t.c.bg,
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 380, width: "100%", margin: "0 auto" }}>
          {/* Top row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 40,
              fontSize: 13,
              color: t.c.textMute,
            }}
          >
            <span>New here?</span>
            <a
              href="#"
              style={{
                color: t.c.text,
                textDecoration: "none",
                fontWeight: 600,
                borderBottom: `1px solid ${t.c.primary}`,
                paddingBottom: 1,
              }}
            >
              Create account →
            </a>
          </div>

          <Eyebrow style={{ marginBottom: 12 }}>Sign in</Eyebrow>
          <DisplayH size={38} style={{ marginBottom: 10 }}>
            Welcome back.
          </DisplayH>
          <p
            style={{
              color: t.c.textMute,
              fontSize: 15,
              margin: "0 0 32px",
              lineHeight: 1.5,
            }}
          >
            Pick up where you left off with your family and habits.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Signed in successfully!");
            }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <RField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              icon="user"
            />
            <RField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              icon="lock"
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 12.5,
                color: t.c.textMute,
                marginTop: -4,
              }}
            >
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  style={{ accentColor: t.c.primary }}
                  defaultChecked
                />
                <span>Keep me signed in</span>
              </label>
              <a
                href="#"
                style={{
                  color: t.c.text,
                  textDecoration: "none",
                  borderBottom: `1px solid ${t.c.border}`,
                }}
              >
                Forgot?
              </a>
            </div>

            <PrimaryBtn
              full
              type="submit"
              style={{ marginTop: 8 }}
              iconRight="arrowRight"
            >
              Sign in
            </PrimaryBtn>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                margin: "12px 0",
                fontSize: 11.5,
                color: t.c.textMute,
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              <div style={{ flex: 1, height: 1, background: t.c.border }} />
              <span>Or</span>
              <div style={{ flex: 1, height: 1, background: t.c.border }} />
            </div>

            <SocialAuthRow />
          </form>

          <div
            style={{
              marginTop: 40,
              fontSize: 12,
              color: t.c.textMute,
              textAlign: "center",
            }}
          >
            By continuing, you agree to our{" "}
            <a href="#" style={{ color: t.c.text }}>
              Terms
            </a>{" "}
            and{" "}
            <a href="#" style={{ color: t.c.text }}>
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── Sign Up (new) ───────────────────
function WebSignupNew() {
  const t = useTokens();
  const [name, setName] = useStateAuth("");
  const [email, setEmail] = useStateAuth("");
  const [password, setPassword] = useStateAuth("");

  // Password strength calc
  const strength = (() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength] || "";
  const strengthColor = [
    t.c.border,
    t.c.danger,
    t.c.warn,
    t.c.blue,
    t.c.primary,
  ][strength];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.c.bg,
        display: "grid",
        gridTemplateColumns: t.layout === "B" ? "1fr 1fr" : "1.15fr 1fr",
        boxSizing: "border-box",
        fontFamily: t.font,
      }}
    >
      <AuthHeroPane
        title={<>Start with a single, quiet Sunday.</>}
        subtitle="Set up in under two minutes. Your first week is free — no card needed, cancel with one click."
      />

      {/* Right: form pane */}
      <div
        style={{
          padding: "48px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: t.c.bg,
        }}
      >
        <div style={{ maxWidth: 380, width: "100%", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 32,
              fontSize: 13,
              color: t.c.textMute,
            }}
          >
            <span>Already have an account?</span>
            <a
              href="#"
              style={{
                color: t.c.text,
                textDecoration: "none",
                fontWeight: 600,
                borderBottom: `1px solid ${t.c.primary}`,
                paddingBottom: 1,
              }}
            >
              Sign in →
            </a>
          </div>

          <Eyebrow style={{ marginBottom: 12 }}>Create account</Eyebrow>
          <DisplayH size={38} style={{ marginBottom: 10 }}>
            Begin, gently.
          </DisplayH>
          <p
            style={{
              color: t.c.textMute,
              fontSize: 15,
              margin: "0 0 28px",
              lineHeight: 1.5,
            }}
          >
            One account for you and — if you'd like — the people you care for.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Account created!");
            }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <RField
              label="Full name"
              value={name}
              onChange={setName}
              placeholder="Sarah Mitchell"
              icon="user"
            />
            <RField
              label="Work or personal email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              icon="bell"
            />
            <div>
              <RField
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="At least 8 characters"
                icon="lock"
              />
              {/* Strength meter */}
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 3,
                      borderRadius: 2,
                      background: i <= strength ? strengthColor : t.c.border,
                      transition: "background .2s",
                    }}
                  />
                ))}
                <span
                  style={{
                    fontSize: 11,
                    color: t.c.textMute,
                    marginLeft: 6,
                    minWidth: 40,
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {strengthLabel}
                </span>
              </div>
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: 12.5,
                color: t.c.textMute,
                marginTop: 4,
                lineHeight: 1.5,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                style={{ accentColor: t.c.primary, marginTop: 2 }}
                defaultChecked
              />
              <span>
                I agree to the{" "}
                <a href="#" style={{ color: t.c.text }}>
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" style={{ color: t.c.text }}>
                  Privacy Policy
                </a>
                . I understand my family's data stays private.
              </span>
            </label>

            <PrimaryBtn
              full
              type="submit"
              style={{ marginTop: 8 }}
              iconRight="arrowRight"
            >
              Create account
            </PrimaryBtn>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                margin: "10px 0",
                fontSize: 11.5,
                color: t.c.textMute,
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              <div style={{ flex: 1, height: 1, background: t.c.border }} />
              <span>Or sign up with</span>
              <div style={{ flex: 1, height: 1, background: t.c.border }} />
            </div>

            <SocialAuthRow />
          </form>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  WebLoginNew,
  WebSignupNew,
  PreAuthFeatureCard,
  AuthHeroPane,
});

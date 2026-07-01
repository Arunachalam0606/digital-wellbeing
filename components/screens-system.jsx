// Brand System artboard — colors, type, components reference

function BrandSystem() {
  const t = useTokens();
  const palettes = window.PALETTES;
  return (
    <div
      style={{
        padding: 40,
        background: t.c.bg,
        fontFamily: t.font,
        color: t.c.text,
        height: "100%",
        overflow: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: t.c.textMute,
              fontWeight: 500,
              letterSpacing: ".04em",
              textTransform: "uppercase",
            }}
          >
            Brand & System
          </div>
          <div
            style={{
              fontFamily: t.fontSerif,
              fontSize: 42,
              fontWeight: 500,
              letterSpacing: "-.02em",
              lineHeight: 1,
              marginTop: 4,
            }}
          >
            Atrium — a calm place for screen time
          </div>
          <div
            style={{
              fontSize: 14,
              color: t.c.textMute,
              marginTop: 8,
              maxWidth: 640,
              lineHeight: 1.5,
            }}
          >
            Warm neutrals, soft sage, and a quiet serif. The brand never scolds
            — it coaches. Visuals lean on whitespace and gentle curves so
            families can sit with the data without feeling judged.
          </div>
        </div>
        <Logo size={32} />
      </div>

      {/* Palettes */}
      <Card style={{ marginBottom: 20 }}>
        <SectionHead
          title="Palettes"
          subtitle="Five theme directions, each with light and dark mode variants."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 16,
          }}
        >
          {Object.entries(palettes).map(([key, p]) => (
            <div
              key={key}
              style={{
                border: `1px solid ${t.c.border}`,
                borderRadius: 14,
                overflow: "hidden",
                background: p.bg,
              }}
            >
              <div
                style={{
                  height: 80,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 0,
                }}
              >
                <div style={{ background: p.primary }} />
                <div style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}>
                  <div style={{ background: p.accent }} />
                  <div style={{ background: p.yellow }} />
                </div>
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
                  {p.name}
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {[p.primary, p.accent, p.yellow, p.lavender, p.blue].map(
                    (c, i) => (
                      <div
                        key={i}
                        title={c}
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 6,
                          background: c,
                          border: `1px solid rgba(0,0,0,.06)`,
                        }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Type */}
      <Card style={{ marginBottom: 20 }}>
        <SectionHead
          title="Type"
          subtitle="Newsreader (serif, editorial) · Geist (UI) · JetBrains Mono (numerals)"
        />
        <div
          style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 28 }}
        >
          <div>
            <div
              style={{
                fontFamily: t.fontSerif,
                fontSize: 56,
                fontWeight: 500,
                letterSpacing: "-.02em",
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              Less screen.
              <br />
              More you.
            </div>
            <div style={{ fontSize: 13, color: t.c.textMute, marginTop: 8 }}>
              Newsreader 56 / 500
            </div>

            <div style={{ marginTop: 24 }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-.01em",
                }}
              >
                This week, you reclaimed 4h 12m.
              </div>
              <div
                style={{ fontSize: 12.5, color: t.c.textMute, marginTop: 6 }}
              >
                Geist 22 / 600 — headlines inside cards
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 14 }}>
                Body copy is warm and brief. Tell people what's happening, not
                why they're wrong.
              </div>
              <div
                style={{ fontSize: 12.5, color: t.c.textMute, marginTop: 4 }}
              >
                Geist 14 / 400
              </div>
            </div>
          </div>

          <div
            style={{ borderLeft: `1px solid ${t.c.border}`, paddingLeft: 28 }}
          >
            <div
              style={{
                fontFamily: t.fontMono,
                fontSize: 48,
                fontWeight: 500,
                letterSpacing: "-.04em",
                color: t.c.primary,
                lineHeight: 1,
              }}
            >
              3h 07m
            </div>
            <div style={{ fontSize: 12.5, color: t.c.textMute, marginTop: 6 }}>
              JetBrains Mono — stats only
            </div>

            <div style={{ marginTop: 28, display: "grid", gap: 10 }}>
              {[
                ["Heading XL", 42, t.fontSerif, 500],
                ["Heading L", 28, t.fontSerif, 500],
                ["Heading M", 22, t.font, 600],
                ["Body", 14, t.font, 400],
                ["Caption", 12, t.font, 500],
                ["Eyebrow", 11, t.font, 600],
              ].map(([n, sz, ff, w]) => (
                <div
                  key={n}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    borderBottom: `1px dashed ${t.c.border}`,
                    paddingBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: ff,
                      fontSize: sz,
                      fontWeight: w,
                      letterSpacing: sz > 24 ? "-.02em" : 0,
                    }}
                  >
                    {n}
                  </span>
                  <span style={{ fontSize: 11, color: t.c.textMute }}>
                    {sz}px
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Components */}
      <Card>
        <SectionHead
          title="Core components"
          subtitle="The building blocks repeated across every screen."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {/* Buttons */}
          <div>
            <div
              style={{
                fontSize: 11.5,
                color: t.c.textMute,
                fontWeight: 600,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: ".06em",
              }}
            >
              Buttons
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "flex-start",
              }}
            >
              <Button variant="primary" icon="plus">
                Add a kid
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline" icon="settings">
                Settings
              </Button>
              <Button variant="danger" icon="lock">
                Lock for today
              </Button>
              <Button variant="ghost" icon="arrowRight">
                View report
              </Button>
            </div>
          </div>

          {/* Chips */}
          <div>
            <div
              style={{
                fontSize: 11.5,
                color: t.c.textMute,
                fontWeight: 600,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: ".06em",
              }}
            >
              Status
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              <Chip bg={t.c.primarySoft} color={t.c.primary}>
                ● On track
              </Chip>
              <Chip bg={t.c.warnSoft} color={t.c.warn}>
                ● Near limit
              </Chip>
              <Chip bg={t.c.dangerSoft} color={t.c.danger}>
                ● Over limit
              </Chip>
              <Chip bg={t.c.surface2} color={t.c.textMute}>
                ● Paused
              </Chip>
              <Chip bg={t.c.yellowSoft} color="#8a6a18">
                🔥 4-day streak
              </Chip>
              <Chip bg={t.c.lavSoft} color="#564a78">
                Weekend
              </Chip>
            </div>

            <div
              style={{
                fontSize: 11.5,
                color: t.c.textMute,
                fontWeight: 600,
                margin: "18px 0 10px",
                textTransform: "uppercase",
                letterSpacing: ".06em",
              }}
            >
              Category dots
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {Object.entries(APP_DATA.categoryColors)
                .slice(0, 8)
                .map(([cat, col]) => (
                  <div
                    key={cat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: col,
                      }}
                    />
                    {cat}
                  </div>
                ))}
            </div>
          </div>

          {/* Rings & rings */}
          <div>
            <div
              style={{
                fontSize: 11.5,
                color: t.c.textMute,
                fontWeight: 600,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: ".06em",
              }}
            >
              Progress
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Ring
                value={187}
                max={240}
                size={84}
                stroke={8}
                color={t.c.primary}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: t.fontMono,
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    78%
                  </div>
                  <div style={{ fontSize: 9, color: t.c.textMute }}>of 4h</div>
                </div>
              </Ring>
              <Ring
                value={312}
                max={300}
                size={84}
                stroke={8}
                color={t.c.danger}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: t.fontMono,
                      fontSize: 16,
                      fontWeight: 500,
                      color: t.c.danger,
                    }}
                  >
                    104%
                  </div>
                  <div style={{ fontSize: 9, color: t.c.textMute }}>of 5h</div>
                </div>
              </Ring>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
window.BrandSystem = BrandSystem;

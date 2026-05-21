import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

/* ── Brand tokens ── */
const NAVY_DEEP = "#080f1e";
const NAVY = "#122954";
const ROSE = "#F4B9B9";
const GOLD = "#FFD43A";
const OFF_WHITE = "#F8F6F2";

const SERVICES = [
  { code: "01", name: "3D/4D Obstetric Ultrasound", tag: "OB/GYN Scan" },
  { code: "02", name: "Gynecological Consultations", tag: "Specialist Care" },
  { code: "03", name: "Full Pelvic Diagnostic Scan", tag: "Diagnostic" },
  { code: "04", name: "Antenatal Wellness Packages", tag: "Maternal Track" },
  { code: "05", name: "Diagnostic Lab Screening", tag: "Lab Triage" },
];

/* Utility: spring-based opacity/Y entrance */
function useEntrance(fromFrame: number, delayFrames = 0) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - fromFrame - delayFrames,
    fps,
    config: { damping: 24, stiffness: 90, mass: 1 },
    durationInFrames: 35,
  });
  return {
    opacity: progress,
    y: interpolate(progress, [0, 1], [36, 0]),
    scale: 0.97 + progress * 0.03,
  };
}

/* ── SCENE 1: Logo reveal (0–90 frames / 0–3s) ── */
function SceneLogo() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const emblemScale = spring({ frame, fps, config: { damping: 18, stiffness: 70 }, durationInFrames: 50 });
  const emblemOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const wordmarkOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [75, 90], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: exitOpacity,
        flexDirection: "column",
        gap: 32,
      }}
    >
      {/* Emblem */}
      <div
        style={{
          opacity: emblemOpacity,
          transform: `scale(${emblemScale})`,
          filter: emblemScale > 0.5 ? `drop-shadow(0 0 60px ${GOLD}40)` : "none",
        }}
      >
        <svg width="160" height="160" viewBox="0 0 48 48" fill="none">
          <path d="M 6 24 C 6 6 42 6 42 24" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 6 24 C 6 42 42 42 42 24" stroke={ROSE} strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 13 24 C 13 13 35 13 35 24" stroke={GOLD} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
          <path d="M 13 24 C 13 35 35 35 35 24" stroke={ROSE} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
          <circle cx="24" cy="24" r="2.8" fill={GOLD} />
          <circle cx="24" cy="24" r="5" stroke={GOLD} strokeWidth="0.8" fill="none" opacity="0.4" />
          <circle cx="6" cy="24" r="1.8" fill={ROSE} />
          <circle cx="42" cy="24" r="1.8" fill={ROSE} />
        </svg>
      </div>

      {/* Wordmark */}
      <div style={{ opacity: wordmarkOpacity, textAlign: "center" }}>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 600,
            fontSize: 64,
            color: OFF_WHITE,
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          Ulnar{" "}
          <span style={{ color: GOLD, fontStyle: "italic" }}>Medical</span>
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 18,
            color: `${OFF_WHITE}55`,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginTop: 12,
          }}
        >
          Diagnostic Centre
        </div>
      </div>

      {/* Tagline */}
      <div style={{ opacity: taglineOpacity, textAlign: "center", marginTop: 8 }}>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 28,
            color: `${OFF_WHITE}70`,
            letterSpacing: "-0.01em",
          }}
        >
          Modern OB/GYN & Diagnostic Services
          <br />
          <span style={{ color: ROSE }}>You Can Trust.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* ── SCENE 2: Service list reveal (90–540 frames / 3–18s) ── */
function SceneServices() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame, fps, config: { damping: 22, stiffness: 85 }, durationInFrames: 35 });

  return (
    <AbsoluteFill style={{ padding: "120px 100px", justifyContent: "center", flexDirection: "column" }}>
      {/* Header */}
      <div
        style={{
          opacity: headerProgress,
          transform: `translateY(${interpolate(headerProgress, [0, 1], [24, 0])}px)`,
          marginBottom: 60,
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 16,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ height: 1, width: 40, background: GOLD }} />
          Our Diagnostic Specialties
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 72,
            color: OFF_WHITE,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          Precision diagnostics,
          <br />
          <span style={{ color: ROSE }}>deeply personal</span> care.
        </div>
      </div>

      {/* Service rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {SERVICES.map((service, i) => {
          const rowProgress = spring({
            frame: frame - 20 - i * 22,
            fps,
            config: { damping: 24, stiffness: 90 },
            durationInFrames: 30,
          });
          const opacity = Math.max(0, Math.min(1, rowProgress));
          const x = interpolate(rowProgress, [0, 1], [-40, 0]);

          return (
            <div
              key={service.code}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "28px 0",
                borderBottom: `1px solid rgba(255,255,255,${i < SERVICES.length - 1 ? 0.06 : 0})`,
                opacity,
                transform: `translateX(${x}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 700,
                    fontSize: 40,
                    color: GOLD,
                    opacity: 0.35,
                    lineHeight: 1,
                    width: 48,
                  }}
                >
                  {service.code}
                </span>
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: 36,
                    color: OFF_WHITE,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {service.name}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 13,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: ROSE,
                  background: `${ROSE}15`,
                  border: `1px solid ${ROSE}30`,
                  padding: "6px 16px",
                  borderRadius: 999,
                }}
              >
                {service.tag}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

/* ── SCENE 3: CTA close (540–900 frames / 18–30s) ── */
function SceneCTA() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgProgress = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, durationInFrames: 50 });
  const textProgress = spring({ frame: frame - 20, fps, config: { damping: 22, stiffness: 80 }, durationInFrames: 40 });
  const ctaProgress = spring({ frame: frame - 55, fps, config: { damping: 22, stiffness: 85 }, durationInFrames: 35 });
  const phoneProgress = spring({ frame: frame - 80, fps, config: { damping: 22, stiffness: 85 }, durationInFrames: 35 });
  const pulseOpacity = interpolate(frame, [100, 130, 160, 190, 220, 250, 280, 310, 360], [0.5, 1, 0.5, 1, 0.5, 1, 0.5, 1, 0.5], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      {/* Radial gold bloom */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}0d 0%, transparent 70%)`,
          transform: `scale(${bgProgress})`,
        }}
      />

      {/* Main headline */}
      <div
        style={{
          textAlign: "center",
          opacity: textProgress,
          transform: `translateY(${interpolate(textProgress, [0, 1], [40, 0])}px)`,
          marginBottom: 56,
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: ROSE,
            marginBottom: 24,
          }}
        >
          Your Next Step
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 80,
            color: OFF_WHITE,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          Your diagnostic
          <br />
          journey starts{" "}
          <span style={{ color: GOLD }}>here.</span>
        </div>
      </div>

      {/* CTA pill */}
      <div
        style={{
          opacity: ctaProgress,
          transform: `scale(${0.94 + ctaProgress * 0.06})`,
          marginBottom: 36,
        }}
      >
        <div
          style={{
            background: GOLD,
            color: NAVY_DEEP,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: "-0.01em",
            padding: "22px 56px",
            borderRadius: 999,
            display: "inline-block",
          }}
        >
          Book Diagnostic Scan →
        </div>
      </div>

      {/* Contact block */}
      <div
        style={{
          opacity: phoneProgress,
          textAlign: "center",
          transform: `translateY(${interpolate(phoneProgress, [0, 1], [16, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 44,
            color: OFF_WHITE,
            letterSpacing: "-0.02em",
            opacity: pulseOpacity,
          }}
        >
          +254 724 273 996
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 16,
            color: `${OFF_WHITE}50`,
            letterSpacing: "0.12em",
            marginTop: 14,
            textTransform: "uppercase",
          }}
        >
          WhatsApp · Call · Email
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 15,
            color: `${OFF_WHITE}30`,
            letterSpacing: "0.1em",
            marginTop: 10,
          }}
        >
          Ngong Road, Nairobi, Kenya
        </div>
      </div>

      {/* Bottom logo */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: phoneProgress * 0.4,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M 6 24 C 6 6 42 6 42 24" stroke={GOLD} strokeWidth="2.2" fill="none" />
          <path d="M 6 24 C 6 42 42 42 42 24" stroke={ROSE} strokeWidth="2.2" fill="none" />
          <circle cx="24" cy="24" r="2.8" fill={GOLD} />
        </svg>
      </div>
    </AbsoluteFill>
  );
}

export function DiagnosticPromo() {
  const frame = useCurrentFrame();

  /* Subtle background gradient shift over entire video */
  const gradientShift = interpolate(frame, [0, 900], [0, 1], { extrapolateRight: "clamp" });
  const bgColor = frame < 450 ? NAVY_DEEP : `#0d1a30`;

  return (
    <AbsoluteFill style={{ background: bgColor, fontFamily: "system-ui, sans-serif" }}>

      {/* Background radial gradient — subtly shifts throughout */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${40 + gradientShift * 20}% 50%, ${NAVY}bb 0%, transparent 65%)`,
        }}
      />

      {/* Persistent top-right ambient orb */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}08 0%, transparent 70%)`,
        }}
      />

      {/* Bottom-left rose orb */}
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ROSE}09 0%, transparent 70%)`,
        }}
      />

      {/* ── Scene 1: Logo reveal (0–90f) ── */}
      <Sequence from={0} durationInFrames={90}>
        <SceneLogo />
      </Sequence>

      {/* ── Scene 2: Services list (90–540f) ── */}
      <Sequence from={90} durationInFrames={450}>
        <SceneServices />
      </Sequence>

      {/* ── Scene 3: CTA close (540–900f) ── */}
      <Sequence from={540} durationInFrames={360}>
        <SceneCTA />
      </Sequence>

      {/* Progress bar — runs for entire video */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 3,
          width: `${(frame / 900) * 100}%`,
          background: `linear-gradient(to right, ${ROSE}, ${GOLD})`,
        }}
      />
    </AbsoluteFill>
  );
}

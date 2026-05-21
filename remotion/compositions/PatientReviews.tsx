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

const REVIEWS = [
  {
    quote:
      "The 3D ultrasound was breathtaking. Seeing my baby's face clearly for the first time at Ulnar Medical was the most emotional moment of my pregnancy.",
    name: "Amara O.",
    role: "First-time mother · 28 weeks",
    rating: 5,
  },
  {
    quote:
      "Dr. Elizabeth and her team made me feel completely safe and seen. The diagnostic results were precise and explained with such clarity.",
    name: "Fatima K.",
    role: "Antenatal Profile Package",
    rating: 5,
  },
  {
    quote:
      "Same-day results, immaculate clinic, and a level of professional warmth I've never experienced before. Ulnar Medical sets the gold standard.",
    name: "Njeri W.",
    role: "Executive Well-Woman Screen",
    rating: 5,
  },
];

const CARD_DURATION = 270; // frames per card (~9s each)
const CARD_STAGGER = 30;   // overlap transition

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill={GOLD}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  startFrame,
  index,
}: {
  review: (typeof REVIEWS)[number];
  startFrame: number;
  index: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame - startFrame;
  const endFrame = CARD_DURATION;

  /* Entry spring */
  const entryProgress = spring({
    frame: relFrame,
    fps,
    config: { damping: 22, stiffness: 80, mass: 1.1 },
    durationInFrames: 40,
  });

  /* Exit */
  const exitStart = endFrame - 35;
  const exitProgress = interpolate(relFrame, [exitStart, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.ease),
  });

  /* Gold scan line sweep */
  const scanProgress = interpolate(relFrame, [20, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  const opacity = entryProgress * (1 - exitProgress * 0.85);
  const translateY = interpolate(entryProgress, [0, 1], [80, 0]) - exitProgress * 40;
  const scale = 0.96 + entryProgress * 0.04 - exitProgress * 0.02;

  if (relFrame < 0 || relFrame > endFrame) return null;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 880,
          background: "rgba(18, 41, 84, 0.7)",
          backdropFilter: "blur(40px)",
          border: `1px solid rgba(255, 212, 58, 0.15)`,
          borderRadius: 40,
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold scan line sweep */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${scanProgress * 120 - 10}%`,
            width: 2,
            background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
            opacity: 0.6,
          }}
        />

        {/* Rose ambient bloom */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ROSE}12 0%, transparent 70%)`,
          }}
        />

        {/* Logo emblem watermark */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 48 48"
          fill="none"
          style={{ position: "absolute", top: 32, right: 40, opacity: 0.08 }}
        >
          <path d="M 6 24 C 6 6 42 6 42 24" stroke={GOLD} strokeWidth="2.2" fill="none" />
          <path d="M 6 24 C 6 42 42 42 42 24" stroke={ROSE} strokeWidth="2.2" fill="none" />
          <circle cx="24" cy="24" r="2.8" fill={GOLD} />
        </svg>

        {/* Card index */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 96,
            fontWeight: 700,
            color: GOLD,
            opacity: 0.08,
            position: "absolute",
            bottom: 20,
            left: 48,
            lineHeight: 1,
          }}
        >
          0{index + 1}
        </div>

        {/* Content */}
        <StarRating count={review.rating} />

        <p
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 38,
            fontWeight: 400,
            color: OFF_WHITE,
            lineHeight: 1.4,
            marginBottom: 48,
            letterSpacing: "-0.01em",
          }}
        >
          "{review.quote}"
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* Avatar placeholder */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${ROSE}, ${GOLD})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              color: NAVY_DEEP,
              fontFamily: "Georgia, serif",
            }}
          >
            {review.name[0]}
          </div>
          <div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 22,
                color: OFF_WHITE,
                letterSpacing: "-0.01em",
              }}
            >
              {review.name}
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 16,
                color: `${ROSE}`,
                marginTop: 3,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {review.role}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export function PatientReviews() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* Background pulse */
  const bgPulse = interpolate(frame, [0, 450, 900], [0, 0.08, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: NAVY_DEEP, fontFamily: "system-ui, sans-serif" }}>

      {/* Animated gradient background */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${NAVY} 0%, ${NAVY_DEEP} 70%)`,
          opacity: 0.9 + bgPulse,
        }}
      />

      {/* Top rose bloom */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ROSE}0a 0%, transparent 70%)`,
        }}
      />

      {/* Header — always visible */}
      <Sequence from={0} durationInFrames={900}>
        <AbsoluteFill
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "80px 100px",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
              <path d="M 6 24 C 6 6 42 6 42 24" stroke={GOLD} strokeWidth="2.2" fill="none" />
              <path d="M 6 24 C 6 42 42 42 42 24" stroke={ROSE} strokeWidth="2.2" fill="none" />
              <circle cx="24" cy="24" r="2.8" fill={GOLD} />
              <circle cx="6" cy="24" r="1.8" fill={ROSE} />
              <circle cx="42" cy="24" r="1.8" fill={ROSE} />
            </svg>
            <div>
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: 600,
                  fontSize: 28,
                  color: OFF_WHITE,
                  letterSpacing: "0.04em",
                }}
              >
                Ulnar{" "}
                <span style={{ color: GOLD, fontStyle: "italic" }}>Medical</span>
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: `${OFF_WHITE}60`,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginTop: 3,
                }}
              >
                Diagnostic Centre
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Footer CTA — always visible */}
      <Sequence from={0} durationInFrames={900}>
        <AbsoluteFill
          style={{
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 100,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 18,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: `${OFF_WHITE}50`,
                marginBottom: 16,
              }}
            >
              Book Your Scan Today
            </div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: 32,
                color: GOLD,
                letterSpacing: "-0.01em",
              }}
            >
              +254 724 273 996
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 16,
                color: `${OFF_WHITE}40`,
                marginTop: 10,
                letterSpacing: "0.08em",
              }}
            >
              Ngong Road · Nairobi · Kenya
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Section label */}
      <Sequence from={0} durationInFrames={60}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 16,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: ROSE,
                marginBottom: 20,
              }}
            >
              Patient Stories
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
              What Our Patients
              <br />
              <span style={{ color: GOLD }}>Are Saying.</span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Review cards — sequential reveal */}
      {REVIEWS.map((review, i) => (
        <Sequence
          key={i}
          from={60 + i * (CARD_DURATION - CARD_STAGGER)}
          durationInFrames={CARD_DURATION + 40}
        >
          <ReviewCard
            review={review}
            startFrame={0}
            index={i}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

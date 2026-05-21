# Ulnar Medical — Design System Master Reference

## Brand Identity

**Clinic Name:** Ulnar Medical and Diagnostic Centre  
**Tagline:** Modern OB/GYN & Diagnostic Services You Can Trust  
**Positioning:** Luxury private maternal health clinic, Ngong Road, Nairobi  
**Target Audience:** Women of African descent seeking premium, inclusive diagnostic care

---

## SVG Logo Specification

### Emblem Concept
The Ulnar Medical logo is a **double-arc lens emblem** — two intersecting Bezier curves forming a vesica piscis (sacred geometry lens shape) that communicates:
1. **Diagnostic precision** — the clean geometric intersection
2. **Ultrasound harmonics** — the arc paths mimic waveform traces
3. **Maternal protection** — the enclosing oval silhouette represents the womb

### SVG Technical Spec
```
viewBox: 0 0 48 48
Outer lens left terminus: (6, 24)
Outer lens right terminus: (42, 24)
Upper arc control: cubic Bezier through (24, 6) — Gold stroke #FFD43A, strokeWidth 2.5
Lower arc control: cubic Bezier through (24, 42) — Rose stroke #F4B9B9, strokeWidth 2.5
Center node: circle cx=24 cy=24 r=2.5, fill #FFD43A
Terminal nodes: circle r=1.5, fill #F4B9B9
Inner resonance arcs (decorative): opacity 0.2, same curve family at 60% radius
```

### Wordmark
- Font: Cormorant Garamond, weight 600, normal style
- Tracking: 0.08em
- "Ulnar Medical" displayed in #F8F6F2 on dark backgrounds
- "Ulnar Medical" displayed in #122954 on light backgrounds
- "&" separator in #FFD43A, italic

---

## Color Token System

| Token | Hex | Usage |
|---|---|---|
| `--navy` | `#122954` | Primary brand navy — backgrounds, containers |
| `--navy-deep` | `#080f1e` | Page base — deepest background layer |
| `--navy-mid` | `#1a3a6e` | Hover states, elevated surfaces |
| `--rose` | `#F4B9B9` | Comfort accent — badges, icon fills, lower arc |
| `--rose-deep` | `#e8a0a0` | Rose hover/active states |
| `--gold` | `#FFD43A` | Precision highlight — CTAs, focus rings, upper arc |
| `--gold-deep` | `#e6bc00` | Gold hover/pressed states |
| `--off-white` | `#F8F6F2` | Primary text on dark backgrounds |

### Gradient Recipes
```css
/* Hero background */
background: linear-gradient(160deg, #080f1e 0%, #122954 55%, #0d1f3f 100%);

/* Gold CTA */
background: linear-gradient(135deg, #FFD43A 0%, #e6bc00 100%);

/* Rose accent fill */
background: linear-gradient(135deg, #F4B9B9 0%, #e8a0a0 100%);

/* Glass card surface */
background: rgba(18, 41, 84, 0.4);
backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

---

## Typography System

### Font Stack
| Role | Family | Weight | Style |
|---|---|---|---|
| Display Hero | Cormorant Garamond | 700 | Italic |
| Display Section | Cormorant Garamond | 600 | Italic |
| Display Accent | Cormorant Garamond | 300 | Normal |
| Body | DM Sans | 300–500 | Normal |
| Label / Mono | DM Mono | 400–500 | Normal |

### Scale
```
hero:    clamp(4.5rem, 9vw, 8rem)      — full-page entrance
h2:      clamp(2.8rem, 5vw, 4.5rem)    — section headings
h3:      clamp(1.8rem, 3vw, 2.5rem)    — card headings
body-lg: 1.125rem / 1.75 line-height   — primary copy
body:    0.9rem / 1.65 line-height     — secondary copy
label:   0.7rem / 1.4 / tracking .18em — mono tags
```

---

## Motion Architecture (Framer Motion)

### Timing Tokens
```ts
const EASE_LUXURY = [0.76, 0, 0.24, 1];      // custom cubic — weighty, purposeful
const EASE_REVEAL = [0.22, 1, 0.36, 1];       // fast in, smooth out (spring feel in CSS)
const EASE_GENTLE = [0.4, 0, 0.2, 1];         // material standard

const DUR_FAST   = 0.35;
const DUR_MID    = 0.65;
const DUR_SLOW   = 1.1;
const DUR_CINEMATIC = 1.6;
```

### Scroll Curve Architecture
```ts
// Hero parallax layers
const heroTextY    = useTransform(scrollY, [0, vh], [0, -120]);   // text drifts up
const heroBgY      = useTransform(scrollY, [0, vh], [0, 60]);     // bg parallax (slower)
const heroOpacity  = useTransform(scrollY, [0, vh * 0.7], [1, 0]);

// Section entrances — staggered reveal
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};
const itemVariants = {
  hidden:  { opacity: 0, y: 32, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)",
             transition: { duration: 0.9, ease: EASE_LUXURY } }
};

// Card hover — Z-lift
const cardHover = {
  y: -6,
  scale: 1.01,
  boxShadow: "0 28px 60px rgba(8, 15, 30, 0.7)",
  transition: { duration: 0.35, ease: EASE_GENTLE }
};
```

### 3D Depth Scroll Transforms
```ts
// ServiceGrid cards use perspective + Z-shift on scroll
// Parent: perspective: 1200px
// Each card enters from a slightly receded z-plane:
//   initial: scale(0.95) translateZ(-40px) opacity(0)
//   visible: scale(1) translateZ(0) opacity(1)
```

---

## Remotion Video Specs

| Property | Value |
|---|---|
| Width | 1080px |
| Height | 1920px (9:16 portrait — social format) |
| FPS | 30 |
| Duration | 30 seconds (900 frames) |

### PatientReviews.tsx
- 3 review cards animate in sequentially (frames 0→900)
- Background: `#122954` gradient with subtle rose bloom
- Text: Cormorant Garamond serif quotes, DM Sans attribution
- Logo watermark in top-right corner, opacity 0.12
- Gold scan line sweeps across each card entry

### DiagnosticPromo.tsx
- Branded service reel: headline → service list → CTA
- Opening: Logo emblem scales in from center
- Mid: Service names typewrite-reveal line by line
- Close: "Book Now" CTA + contact details bloom in
- Colour: Deep navy base, gold text accents throughout

---

## Component Directory

| Component | Path | Purpose |
|---|---|---|
| Logo | `src/components/Logo.tsx` | SVG emblem + wordmark |
| HeroSection | `src/components/HeroSection.tsx` | Full-viewport entry narrative |
| ServiceGrid | `src/components/ServiceGrid.tsx` | Diagnostic service showcase |
| BookingForm | `src/components/BookingForm.tsx` | Lead capture + success state |
| ContactFooter | `src/components/ContactFooter.tsx` | Footer + social suite |

---

## Contact & Links

| Channel | Value |
|---|---|
| WhatsApp | `https://wa.me/254724273996?text=Hello%20Ulnar%20Medical,%20I%20would%20like%20to%20inquire%20about%20a%20diagnostic%20appointment.` |
| Email | `mailto:appointments@ulnarmedical.com?subject=Appointment%20Inquiry` |
| Tel | `tel:+254724273996` |
| Facebook | `#` (placeholder) |
| Instagram | `#` (placeholder) |
| TikTok | `#` (placeholder) |

import { Composition } from "remotion";
import { PatientReviews } from "./compositions/PatientReviews";
import { DiagnosticPromo } from "./compositions/DiagnosticPromo";

const FPS = 30;
const DURATION_SECONDS = 30;
const TOTAL_FRAMES = FPS * DURATION_SECONDS; // 900

export function RemotionRoot() {
  return (
    <>
      {/*
       * PatientReviews — "Cooked Reviews" social reel
       * Animates premium patient testimonials over deep navy gradients
       * Format: 1080×1920 (9:16 portrait), 30fps, 30s
       */}
      <Composition
        id="PatientReviews"
        component={PatientReviews}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/*
       * DiagnosticPromo — Brand service reel
       * Typography video highlighting clinic services with gold accents
       * Format: 1080×1920 (9:16 portrait), 30fps, 30s
       */}
      <Composition
        id="DiagnosticPromo"
        component={DiagnosticPromo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
}

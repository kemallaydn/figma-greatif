import { motion } from "motion/react";
import { useCampaign } from "../../../App";
import { WaveformDecoration } from "../shared/WaveformDecoration";

export function EntryScreen() {
  const { next, state } = useCampaign();
  const hasDraft = state.draftSaved;

  return (
    <div
      className="min-h-screen w-full flex flex-col relative overflow-hidden"
      style={{ backgroundColor: "#FAF8F4" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 pt-8 md:px-16 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            fontWeight: 600,
            color: "#1A1714",
            letterSpacing: "-0.02em",
          }}
        >
          greatif
        </motion.div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-start justify-center px-8 md:px-16 lg:px-24 max-w-5xl mx-auto w-full">
        {/* Waveform above heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8"
        >
          <WaveformDecoration opacity={0.25} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 700,
            color: "#1A1714",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 640,
          }}
        >
          Start a music campaign
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            color: "#6E6258",
            lineHeight: 1.6,
            marginTop: 20,
            maxWidth: 480,
          }}
        >
          A guided, premium setup for creator-led music momentum.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10"
        >
          <button
            onClick={next}
            className="transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor: "#D4430F",
              color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 500,
              padding: "14px 36px",
              borderRadius: 9999,
              border: "none",
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
          >
            Start Campaign
          </button>

          {hasDraft && (
            <button
              className="transition-opacity hover:opacity-70"
              style={{
                backgroundColor: "transparent",
                color: "#4A4540",
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 400,
                padding: "14px 24px",
                borderRadius: 9999,
                border: "1.5px solid #C2B8AE",
                cursor: "pointer",
              }}
            >
              Resume Draft
            </button>
          )}
        </motion.div>

        {/* Supporting labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col gap-2 mt-12"
        >
          {["Warm opening scene", "Confidence-building first step"].map((label, i) => (
            <div
              key={i}
              className="flex items-center gap-3"
              style={{ color: "#9A9490", fontSize: 13, fontFamily: "'Inter', sans-serif" }}
            >
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  backgroundColor: "#D4430F",
                  opacity: 0.6,
                  flexShrink: 0,
                }}
              />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom ambient waveform */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 flex justify-center pb-0 pointer-events-none overflow-hidden"
        style={{ height: 120 }}
      >
        <div className="flex items-end gap-1.5" style={{ opacity: 0.08 }}>
          {Array.from({ length: 40 }).map((_, i) => {
            const h = 20 + Math.sin(i * 0.4) * 40 + Math.sin(i * 0.8 + 1) * 25;
            return (
              <motion.div
                key={i}
                style={{
                  width: 4,
                  height: Math.max(10, h),
                  backgroundColor: "#8B7355",
                  borderRadius: 2,
                }}
                animate={{ scaleY: [1, 0.6, 1.2, 0.8, 1] }}
                transition={{
                  duration: 4,
                  delay: i * 0.06,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

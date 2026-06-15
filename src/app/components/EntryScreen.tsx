import { motion } from "motion/react";

interface EntryScreenProps {
  onStart: () => void;
}

function AnimatedWaveform({ color = "#D4430F", barCount = 24, height = 36 }: { color?: string; barCount?: number; height?: number }) {
  const heights = Array.from({ length: barCount }, (_, i) => {
    const base =
      Math.abs(Math.sin(i * 0.5)) * (height * 0.7) +
      Math.abs(Math.sin(i * 1.1)) * (height * 0.25) +
      height * 0.1;
    return Math.max(4, Math.min(height, base));
  });

  return (
    <div className="flex items-center gap-[2.5px]" style={{ height: `${height}px` }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          style={{
            width: "2px",
            borderRadius: "2px",
            backgroundColor: color,
            height: `${h}px`,
          }}
          animate={{ scaleY: [0.35, 1, 0.45, 1, 0.35], opacity: [0.55, 1, 0.7, 1, 0.55] }}
          transition={{ duration: 2.0, repeat: Infinity, delay: i * 0.055, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MusicCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
      style={{
        width: "210px",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 28px 64px rgba(26,23,20,0.22), 0 6px 20px rgba(26,23,20,0.1)",
        backgroundColor: "#1A1714",
      }}
    >
      {/* Artist photo area */}
      <div
        style={{
          width: "100%",
          height: "210px",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(170deg, #2C1A0E 0%, #1A1714 50%, #160F08 100%)",
        }}
      >
        {/* Warm light glow behind silhouette */}
        <div style={{
          position: "absolute",
          bottom: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,67,15,0.55) 0%, rgba(180,80,10,0.2) 45%, transparent 70%)",
        }} />

        {/* Silhouette SVG */}
        <svg viewBox="0 0 210 210" fill="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {/* Head/afro */}
          <ellipse cx="105" cy="68" rx="38" ry="42" fill="#0D0906" />
          <ellipse cx="105" cy="62" rx="44" ry="38" fill="#100C08" />
          {/* Neck */}
          <rect x="97" y="104" width="16" height="22" rx="4" fill="#0D0906" />
          {/* Shoulders */}
          <ellipse cx="105" cy="145" rx="52" ry="35" fill="#0D0906" />
          {/* Face highlight — warm glow */}
          <ellipse cx="109" cy="78" rx="14" ry="16" fill="rgba(180,80,10,0.15)" />
        </svg>

        {/* Song Title chip */}
        <div style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          borderRadius: "5px",
          padding: "3px 7px",
        }}>
          <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "8.5px", letterSpacing: "0.07em", fontFamily: "'Inter', sans-serif" }}>
            Song Title
          </span>
        </div>
      </div>

      {/* Player bottom */}
      <div style={{ padding: "13px 14px 15px" }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "8px", letterSpacing: "0.12em", marginBottom: "3px", fontFamily: "'Inter', sans-serif" }}>
          NEW RELEASE
        </div>
        <div style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 700, marginBottom: "10px", fontFamily: "'Inter', sans-serif" }}>
          Golden Hour
        </div>

        {/* Waveform */}
        <div style={{ marginBottom: "10px" }}>
          <AnimatedWaveform color="#D4430F" barCount={28} height={32} />
        </div>

        {/* Time */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "11px" }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "8px", fontFamily: "'Inter', sans-serif" }}>0:42</span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "8px", fontFamily: "'Inter', sans-serif" }}>3:21</span>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M9.5 2L4.5 6.5L9.5 11" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="2.5" y1="2" x2="2.5" y2="11" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%",
            backgroundColor: "#D4430F",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M3.5 2L9.5 5.5L3.5 9V2Z" fill="white" />
            </svg>
          </div>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M3.5 2L8.5 6.5L3.5 11" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="10.5" y1="2" x2="10.5" y2="11" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function ReleaseNowCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, x: 12 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.48 }}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "14px",
        padding: "11px 13px",
        boxShadow: "0 8px 28px rgba(26,23,20,0.12)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "172px",
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: "38px", height: "38px", borderRadius: "8px", flexShrink: 0,
        background: "linear-gradient(135deg, #D4430F 0%, #FF8A50 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <AnimatedWaveform color="rgba(255,255,255,0.8)" barCount={5} height={20} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#9A9490", fontSize: "8px", letterSpacing: "0.08em", marginBottom: "2px", fontFamily: "'Inter', sans-serif" }}>
          RELEASE STATUS
        </div>
        <div style={{ color: "#1A1714", fontSize: "11px", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
          Release Now
        </div>
      </div>
      <div style={{
        width: "20px", height: "20px", borderRadius: "50%",
        backgroundColor: "#FAEEE9",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <path d="M2 4.5H7M7 4.5L4.5 2M7 4.5L4.5 7" stroke="#D4430F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  );
}

function CreatorCard() {
  const avatars = [
    { bg: "#D4430F", label: "A" },
    { bg: "#4A4540", label: "B" },
    { bg: "#EDE8DF", label: "C", text: "#4A4540" },
    { bg: "#9A9490", label: "D" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "14px",
        padding: "12px 14px",
        boxShadow: "0 8px 28px rgba(26,23,20,0.12)",
        width: "186px",
      }}
    >
      <div style={{ color: "#9A9490", fontSize: "7.5px", letterSpacing: "0.1em", marginBottom: "9px", fontFamily: "'Inter', sans-serif" }}>
        CREATOR MOMENTUM
      </div>

      {/* Avatars */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "9px" }}>
        {avatars.map((a, i) => (
          <div key={i} style={{
            width: "26px", height: "26px", borderRadius: "50%",
            backgroundColor: a.bg,
            border: "2px solid white",
            marginLeft: i > 0 ? "-9px" : 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "8.5px", fontWeight: 700,
            color: a.text || "white",
            fontFamily: "'Inter', sans-serif",
            zIndex: avatars.length - i,
            position: "relative",
          }}>
            {a.label}
          </div>
        ))}
        <span style={{ color: "#9A9490", fontSize: "9.5px", marginLeft: "10px", fontFamily: "'Inter', sans-serif" }}>+48 creators</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: "#4A4540", fontSize: "10px", fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
          May 28 – Jun 8
        </span>
        <div style={{ backgroundColor: "#FAEEE9", borderRadius: "4px", padding: "2px 7px" }}>
          <span style={{ color: "#D4430F", fontSize: "8px", fontWeight: 700, letterSpacing: "0.06em", fontFamily: "'Inter', sans-serif" }}>
            LIVE
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const PLATFORMS = [
  {
    name: "TikTok",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M11 3.8C10.3 3.8 9.7 3.55 9.26 3.14V7.8C9.26 9.57 7.82 11 6.05 11C4.28 11 2.84 9.57 2.84 7.8C2.84 6.03 4.28 4.6 6.05 4.6C6.24 4.6 6.43 4.62 6.61 4.66V6.36C6.44 6.3 6.25 6.26 6.05 6.26C5.2 6.26 4.5 6.96 4.5 7.8C4.5 8.64 5.2 9.34 6.05 9.34C6.9 9.34 7.6 8.64 7.6 7.8V2.5H9.26C9.26 3.16 9.67 3.73 10.26 3.8H11Z" fill="#4A4540"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="2" width="10" height="10" rx="3" stroke="#4A4540" strokeWidth="1.1"/>
        <circle cx="7" cy="7" r="2.2" stroke="#4A4540" strokeWidth="1.1"/>
        <circle cx="10.2" cy="3.8" r="0.7" fill="#4A4540"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1.5" y="3" width="11" height="8" rx="2.2" stroke="#4A4540" strokeWidth="1.1"/>
        <path d="M5.5 5L9.5 7L5.5 9V5Z" fill="#4A4540"/>
      </svg>
    ),
  },
  {
    name: "X",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2.5 2.5L11.5 11.5M11.5 2.5L2.5 11.5" stroke="#4A4540" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export function EntryScreen({ onStart }: EntryScreenProps) {
  return (
    <div
      className="min-h-screen w-full overflow-hidden relative flex flex-col"
      style={{ backgroundColor: "#FAF8F4", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background concentric arcs — bottom left, like soundwave rings */}
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "-40px",
          width: "400px",
          opacity: 0.12,
          pointerEvents: "none",
        }}
      >
        {[40, 80, 120, 160, 200, 240, 280, 320].map((r, i) => (
          <circle
            key={i}
            cx="0"
            cy="300"
            r={r}
            stroke="#D4430F"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </svg>

      {/* Floating orange dot decorations */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "30%",
          right: "7%",
          width: "11px",
          height: "11px",
          borderRadius: "50%",
          backgroundColor: "#D4430F",
          opacity: 0.7,
        }}
      />
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        style={{
          position: "absolute",
          top: "38%",
          right: "14%",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#D4430F",
          opacity: 0.35,
        }}
      />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "20px 36px",
          gap: "7px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{
          width: "24px", height: "24px", borderRadius: "50%",
          backgroundColor: "#D4430F",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5C1.5 5 3 3 5 3C7 3 8.5 5 8.5 5C8.5 5 7 7 5 7C3 7 1.5 5 1.5 5Z" fill="white"/>
            <circle cx="5" cy="5" r="1.3" fill="#D4430F"/>
          </svg>
        </div>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          color: "#1A1714",
          fontSize: "0.9375rem",
          fontWeight: 600,
          letterSpacing: "0.03em",
        }}>
          Greatif
        </span>
      </motion.nav>

      {/* Main two-column layout */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 36px 40px",
        gap: "32px",
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
      }}>
        {/* LEFT — hero */}
        <div style={{ flex: "1 1 420px", maxWidth: "500px" }}>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.08 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.6rem, 5.5vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              color: "#1A1714",
              marginBottom: "18px",
              letterSpacing: "-0.03em",
            }}
          >
            Start a campaign<br />
            that moves the{" "}
            <span style={{ color: "#D4430F" }}>music.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            style={{
              color: "#4A4540",
              fontSize: "0.9375rem",
              lineHeight: 1.65,
              marginBottom: "32px",
              maxWidth: "380px",
            }}
          >
            Build your next music campaign with a calm, guided
            flow — from platform priorities to release context,
            assets, and creator momentum.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "44px", flexWrap: "wrap" }}
          >
            <button
              onClick={onStart}
              style={{
                backgroundColor: "#D4430F",
                color: "#FFFFFF",
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "background-color 0.2s, transform 0.15s",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#BF3C0D";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#D4430F";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Start Campaign
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              style={{
                backgroundColor: "transparent",
                color: "#4A4540",
                padding: "12px 20px",
                borderRadius: "8px",
                border: "1.5px solid #E4DDD2",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 400,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "border-color 0.2s, color 0.2s, transform 0.15s",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#9A9490";
                (e.currentTarget as HTMLButtonElement).style.color = "#1A1714";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#E4DDD2";
                (e.currentTarget as HTMLButtonElement).style.color = "#4A4540";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Resume Draft
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>

          {/* Platforms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <div style={{
              color: "#9A9490",
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              marginBottom: "10px",
              fontFamily: "'Inter', sans-serif",
            }}>
              ARTIST CREATOR PLATFORMS
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
              {PLATFORMS.map((p) => (
                <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  {p.icon}
                  <span style={{ fontSize: "0.8125rem", color: "#4A4540", fontFamily: "'Inter', sans-serif" }}>
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — floating UI cards */}
        <div style={{
          flex: "0 0 300px",
          position: "relative",
          height: "460px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Release Now chip — top right, slightly rotated */}
          <motion.div
            style={{ position: "absolute", top: "0px", right: "0px", zIndex: 10, rotate: "2deg" }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48 }}
          >
            <ReleaseNowCard />
          </motion.div>

          {/* Main music card — slight left tilt */}
          <div style={{ position: "absolute", top: "55px", left: "10px", zIndex: 5 }}>
            <MusicCard />
          </div>

          {/* Creator Momentum card — bottom right */}
          <motion.div
            style={{ position: "absolute", bottom: "10px", right: "-8px", zIndex: 10, rotate: "1deg" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <CreatorCard />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

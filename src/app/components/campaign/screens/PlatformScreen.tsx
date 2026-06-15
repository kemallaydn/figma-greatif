import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useCampaign } from "../../../App";
import { ScreenLayout } from "../shared/ScreenLayout";
import { NavControls } from "../shared/NavControls";

const PLATFORMS = [
  {
    id: "tiktok",
    label: "TikTok",
    color: "#010101",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.53V6.77a4.85 4.85 0 0 1-1.02-.08z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "youtube",
    label: "YouTube",
    color: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "x",
    label: "X (Twitter)",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.858L1.254 2.25H8.08l4.26 5.633 5.905-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function PlatformScreen() {
  const { state, dispatch, next } = useCampaign();
  const selected = state.platforms;
  const priority = state.platformPriority;

  const toggle = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((p) => p !== id)
      : [...selected, id];
    dispatch({ type: "SET_PLATFORMS", platforms: newSelected });

    // Sync priority list
    const newPriority = priority.filter((p) => newSelected.includes(p));
    const added = newSelected.filter((p) => !newPriority.includes(p));
    dispatch({ type: "SET_PLATFORM_PRIORITY", priority: [...newPriority, ...added] });
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newP = [...priority];
    [newP[index - 1], newP[index]] = [newP[index], newP[index - 1]];
    dispatch({ type: "SET_PLATFORM_PRIORITY", priority: newP });
  };

  const moveDown = (index: number) => {
    if (index === priority.length - 1) return;
    const newP = [...priority];
    [newP[index], newP[index + 1]] = [newP[index + 1], newP[index]];
    dispatch({ type: "SET_PLATFORM_PRIORITY", priority: newP });
  };

  const showPriority = selected.length >= 2;

  return (
    <div>
      <ScreenLayout>
        {/* Step label */}
        <div
          style={{
            fontSize: 12,
            color: "#9A9490",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Step 2 of 11
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 700,
            color: "#1A1714",
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
            marginBottom: 12,
          }}
        >
          Where should the campaign move?
        </motion.h1>

        {/* Helper */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: 15,
            color: "#6E6258",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.6,
            marginBottom: 36,
          }}
        >
          Select platforms, then set priority.
        </motion.p>

        {/* Platform grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {PLATFORMS.map((platform, i) => {
            const isSelected = selected.includes(platform.id);
            return (
              <motion.button
                key={platform.id}
                onClick={() => toggle(platform.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center justify-center gap-3 transition-all"
                style={{
                  padding: "28px 20px",
                  borderRadius: 16,
                  border: isSelected ? "2px solid #D4430F" : "1.5px solid #E4DDD2",
                  backgroundColor: isSelected ? "#FAEEE9" : "#FFFFFF",
                  cursor: "pointer",
                  outline: "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Selection ring top-right */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      backgroundColor: "#D4430F",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#fff" }} />
                  </motion.div>
                )}

                {/* Platform icon */}
                <div
                  style={{
                    color: isSelected ? "#D4430F" : platform.color,
                    opacity: isSelected ? 1 : 0.7,
                    transition: "color 0.2s",
                  }}
                >
                  {platform.icon}
                </div>

                {/* Platform name */}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: isSelected ? "#1A1714" : "#4A4540",
                    transition: "color 0.2s",
                  }}
                >
                  {platform.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Priority section — only shown when ≥2 selected */}
        <AnimatePresence>
          {showPriority && (
            <motion.div
              key="priority"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  padding: "24px",
                  borderRadius: 16,
                  backgroundColor: "#F5F0E8",
                  border: "1.5px solid #E4DDD2",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#4A4540",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Platform priorities
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#9A9490",
                    fontFamily: "'Inter', sans-serif",
                    marginBottom: 16,
                  }}
                >
                  Top = most important. Use arrows to rank.
                </div>

                <div className="flex flex-col gap-2">
                  {priority.map((id, index) => {
                    const platform = PLATFORMS.find((p) => p.id === id);
                    if (!platform) return null;
                    return (
                      <motion.div
                        key={id}
                        layout
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-3"
                        style={{
                          padding: "12px 16px",
                          borderRadius: 10,
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E4DDD2",
                        }}
                      >
                        {/* Rank number */}
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            backgroundColor: "#D4430F",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 600,
                            fontFamily: "'Inter', sans-serif",
                            flexShrink: 0,
                          }}
                        >
                          {index + 1}
                        </div>

                        {/* Platform info */}
                        <div style={{ color: platform.color, opacity: 0.8, flexShrink: 0 }}>
                          {platform.icon}
                        </div>
                        <span
                          style={{
                            flex: 1,
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#1A1714",
                          }}
                        >
                          {platform.label}
                        </span>

                        {/* Up/down arrows */}
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => moveUp(index)}
                            disabled={index === 0}
                            style={{
                              padding: "2px 4px",
                              borderRadius: 4,
                              border: "none",
                              background: "none",
                              cursor: index === 0 ? "not-allowed" : "pointer",
                              color: index === 0 ? "#C2B8AE" : "#4A4540",
                            }}
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            onClick={() => moveDown(index)}
                            disabled={index === priority.length - 1}
                            style={{
                              padding: "2px 4px",
                              borderRadius: 4,
                              border: "none",
                              background: "none",
                              cursor: index === priority.length - 1 ? "not-allowed" : "pointer",
                              color: index === priority.length - 1 ? "#C2B8AE" : "#4A4540",
                            }}
                          >
                            <ChevronDown size={14} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <NavControls canContinue={selected.length >= 1} />
      </ScreenLayout>
    </div>
  );
}

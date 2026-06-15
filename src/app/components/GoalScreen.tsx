import { useState } from "react";
import { motion } from "motion/react";
import { ScreenLayout } from "./ScreenLayout";

interface GoalScreenProps {
  onBack: () => void;
  onContinue: (goal: string) => void;
  initialValue?: string;
}

const GOALS = [
  {
    id: "release-awareness",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11" cy="11" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: "Release Awareness",
    description: "Drive streams and visibility on launch day and beyond",
  },
  {
    id: "teaser-buzz",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3L13.5 8.5L19.5 9.3L15 13.7L16.2 19.5L11 16.6L5.8 19.5L7 13.7L2.5 9.3L8.5 8.5L11 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Teaser Buzz",
    description: "Build anticipation before your release drops",
  },
  {
    id: "sound-adoption",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 11C4 11 6 7 11 7C16 7 18 11 18 11C18 11 16 15 11 15C6 15 4 11 4 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="11" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Sound Adoption",
    description: "Get creators to use your audio as a trending sound",
  },
  {
    id: "ugc-production",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 9L20 7V15L17 13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "UGC Production",
    description: "Generate authentic creator content at scale",
  },
  {
    id: "post-release",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 17L8 12L12 14L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 6H18V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Post-Release Amplification",
    description: "Sustain momentum weeks after your release",
  },
];

export function GoalScreen({ onBack, onContinue, initialValue }: GoalScreenProps) {
  const [selected, setSelected] = useState<string>(initialValue || "");

  return (
    <ScreenLayout
      step={1}
      totalSteps={10}
      onBack={onBack}
      onContinue={() => onContinue(selected)}
      continueDisabled={!selected}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Label */}
        <div className="mb-2" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              color: "#D4430F",
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              fontWeight: 500,
            }}
          >
            STEP 1
          </span>
          <span style={{ color: "#E4DDD2", fontSize: "0.6875rem" }}>—</span>
          <span
            style={{
              color: "#9A9490",
              fontSize: "0.6875rem",
              letterSpacing: "0.08em",
            }}
          >
            CAMPAIGN GOAL
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#1A1714",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 500,
            lineHeight: 1.2,
            marginBottom: "0.5rem",
          }}
        >
          What do you want
          <br />
          <em>this campaign to do?</em>
        </h1>

        <p
          style={{
            color: "#9A9490",
            fontSize: "0.9375rem",
            marginBottom: "2rem",
            lineHeight: 1.5,
          }}
        >
          Choose one. We'll shape the entire brief around it.
        </p>

        {/* Goal cards */}
        <div className="flex flex-col gap-2">
          {GOALS.map((goal, i) => {
            const isSelected = selected === goal.id;

            return (
              <motion.button
                key={goal.id}
                onClick={() => setSelected(goal.id)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.08 + i * 0.07,
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "18px 20px",
                  borderRadius: "8px",
                  border: isSelected ? "1.5px solid #D4430F" : "1.5px solid #EDE8DF",
                  backgroundColor: isSelected ? "#FAEEE9" : "#FFFFFF",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  borderLeft: isSelected ? "4px solid #D4430F" : "1.5px solid #EDE8DF",
                  boxShadow: isSelected ? "0 2px 12px rgba(212,67,15,0.08)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FAF8F4";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#9A9490";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFFFFF";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#EDE8DF";
                  }
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    flexShrink: 0,
                    color: isSelected ? "#D4430F" : "#9A9490",
                    transition: "color 0.2s",
                  }}
                >
                  {goal.icon}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div
                    style={{
                      color: isSelected ? "#1A1714" : "#1A1714",
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      marginBottom: "2px",
                    }}
                  >
                    {goal.title}
                  </div>
                  <div
                    style={{
                      color: isSelected ? "#4A4540" : "#9A9490",
                      fontSize: "0.8125rem",
                      lineHeight: 1.4,
                      transition: "color 0.2s",
                    }}
                  >
                    {goal.description}
                  </div>
                </div>

                {/* Selection indicator */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    border: isSelected ? "none" : "1.5px solid #E4DDD2",
                    backgroundColor: isSelected ? "#D4430F" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  {isSelected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </ScreenLayout>
  );
}

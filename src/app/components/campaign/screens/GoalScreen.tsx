import { motion } from "motion/react";
import { Radio, Zap, Music, Video, TrendingUp } from "lucide-react";
import { useCampaign } from "../../../App";
import { ScreenLayout } from "../shared/ScreenLayout";
import { NavControls } from "../shared/NavControls";

const GOALS = [
  {
    id: "release-awareness",
    label: "Release awareness",
    description: "Put your music in front of new audiences at the moment it lands.",
    icon: Radio,
  },
  {
    id: "teaser-buzz",
    label: "Teaser buzz",
    description: "Build anticipation before your drop with strategic creator teasers.",
    icon: Zap,
  },
  {
    id: "sound-adoption",
    label: "Sound adoption",
    description: "Get creators using your sound and audio in their content.",
    icon: Music,
  },
  {
    id: "ugc-production",
    label: "UGC production",
    description: "Generate a library of authentic user-created content around your release.",
    icon: Video,
  },
  {
    id: "post-release-amplification",
    label: "Post-release amplification",
    description: "Sustain momentum and extend reach after the initial release wave.",
    icon: TrendingUp,
  },
];

export function GoalScreen() {
  const { state, dispatch, next } = useCampaign();
  const selected = state.goal;

  const select = (id: string) => dispatch({ type: "SET_GOAL", goal: id });

  return (
    <div>
      <ScreenLayout>
        {/* Step label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: 12,
            color: "#9A9490",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Step 1 of 11
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700,
            color: "#1A1714",
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
            marginBottom: 12,
          }}
        >
          What is the goal of this campaign?
        </motion.h1>

        {/* Helper */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{
            fontSize: 16,
            color: "#6E6258",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          Choose one direction. Greatif shapes the next steps around it.
        </motion.p>

        {/* Goal cards */}
        <div className="flex flex-col gap-3">
          {GOALS.map((goal, i) => {
            const Icon = goal.icon;
            const isSelected = selected === goal.id;

            return (
              <motion.button
                key={goal.id}
                onClick={() => select(goal.id)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.998 }}
                className="w-full text-left flex items-center gap-5 transition-all"
                style={{
                  padding: "20px 24px",
                  borderRadius: 14,
                  border: isSelected ? "2px solid #D4430F" : "1.5px solid #E4DDD2",
                  backgroundColor: isSelected ? "#FAEEE9" : "#FFFFFF",
                  borderLeft: isSelected ? "4px solid #D4430F" : "1.5px solid #E4DDD2",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: isSelected ? "#D4430F" : "#F0EBE4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background-color 0.2s",
                  }}
                >
                  <Icon
                    size={18}
                    color={isSelected ? "#FFFFFF" : "#9A9490"}
                  />
                </div>

                {/* Text */}
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15,
                      fontWeight: 500,
                      color: isSelected ? "#1A1714" : "#4A4540",
                      marginBottom: 3,
                      transition: "color 0.2s",
                    }}
                  >
                    {goal.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "#9A9490",
                      lineHeight: 1.5,
                    }}
                  >
                    {goal.description}
                  </div>
                </div>

                {/* Selection indicator */}
                <div className="ml-auto flex-shrink-0">
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: isSelected ? "none" : "2px solid #C2B8AE",
                      backgroundColor: isSelected ? "#D4430F" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          backgroundColor: "#FFFFFF",
                        }}
                      />
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <NavControls canContinue={!!selected} />
      </ScreenLayout>
    </div>
  );
}

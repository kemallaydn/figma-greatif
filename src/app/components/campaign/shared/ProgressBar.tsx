import { motion } from "motion/react";
import { useCampaign } from "../../../App";

const TOTAL_STEPS = 11;

export function ProgressBar() {
  const { state } = useCampaign();
  const step = state.currentScreen;
  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-0.5 w-full" style={{ backgroundColor: "#EDE8DF" }}>
        <motion.div
          className="h-full"
          style={{ backgroundColor: "#D4430F" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

import { ArrowLeft } from "lucide-react";
import { useCampaign } from "../../../App";

interface NavControlsProps {
  canContinue?: boolean;
  onContinue?: () => void;
  continueLabel?: string;
  showBack?: boolean;
}

export function NavControls({
  canContinue = true,
  onContinue,
  continueLabel = "Continue",
  showBack = true,
}: NavControlsProps) {
  const { back, next } = useCampaign();

  return (
    <div className="flex items-center justify-between pt-10">
      {showBack ? (
        <button
          onClick={back}
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: "#9A9490", fontFamily: "'Inter', sans-serif" }}
        >
          <ArrowLeft size={16} />
          <span style={{ fontSize: 14 }}>Back</span>
        </button>
      ) : (
        <div />
      )}

      <button
        onClick={onContinue ?? next}
        disabled={!canContinue}
        className="transition-all"
        style={{
          backgroundColor: canContinue ? "#D4430F" : "#EDE8DF",
          color: canContinue ? "#FFFFFF" : "#9A9490",
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          fontWeight: 500,
          padding: "12px 32px",
          borderRadius: 9999,
          cursor: canContinue ? "pointer" : "not-allowed",
          border: "none",
          outline: "none",
        }}
      >
        {continueLabel}
      </button>
    </div>
  );
}

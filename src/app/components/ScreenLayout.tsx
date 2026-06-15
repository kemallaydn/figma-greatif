import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ScreenLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps: number;
  onBack?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  hideNav?: boolean;
}

export function ScreenLayout({
  children,
  step,
  totalSteps,
  onBack,
  onContinue,
  continueLabel = "Continue",
  continueDisabled = false,
  hideNav = false,
}: ScreenLayoutProps) {
  const progress = (step / totalSteps) * 100;

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: "#FAF8F4", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Progress bar */}
      <div className="w-full" style={{ height: "2px", backgroundColor: "#EDE8DF" }}>
        <motion.div
          style={{ height: "100%", backgroundColor: "#D4430F" }}
          initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: onBack ? "pointer" : "default",
            color: onBack ? "#4A4540" : "transparent",
            fontSize: "0.8125rem",
            letterSpacing: "0.06em",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 0",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (onBack) (e.currentTarget as HTMLButtonElement).style.color = "#1A1714";
          }}
          onMouseLeave={(e) => {
            if (onBack) (e.currentTarget as HTMLButtonElement).style.color = "#4A4540";
          }}
        >
          {onBack && (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </>
          )}
        </button>

        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#1A1714",
            fontSize: "0.875rem",
            letterSpacing: "0.15em",
            fontWeight: 500,
          }}
        >
          GREATIF
        </span>

        <span
          style={{
            color: "#9A9490",
            fontSize: "0.75rem",
            letterSpacing: "0.04em",
          }}
        >
          {step} / {totalSteps}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 md:px-10">
        <div className="w-full max-w-2xl">{children}</div>
      </div>

      {/* Bottom nav */}
      {!hideNav && (
        <div
          className="flex justify-end px-6 py-6 md:px-10"
          style={{ borderTop: "1px solid #EDE8DF" }}
        >
          <button
            onClick={!continueDisabled ? onContinue : undefined}
            disabled={continueDisabled}
            style={{
              backgroundColor: continueDisabled ? "#E4DDD2" : "#D4430F",
              color: continueDisabled ? "#9A9490" : "#FFFFFF",
              padding: "13px 32px",
              borderRadius: "6px",
              border: "none",
              cursor: continueDisabled ? "not-allowed" : "pointer",
              letterSpacing: "0.05em",
              fontSize: "0.8125rem",
              fontWeight: 500,
              transition: "background-color 0.2s ease, transform 0.15s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              if (!continueDisabled) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#BF3C0D";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!continueDisabled) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#D4430F";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }
            }}
          >
            {continueLabel}
            {!continueDisabled && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

import { ReactNode } from "react";
import { ProgressBar } from "./ProgressBar";
import { useCampaign } from "../../../App";

interface ScreenLayoutProps {
  children: ReactNode;
  showProgress?: boolean;
}

export function ScreenLayout({ children, showProgress = true }: ScreenLayoutProps) {
  const { state } = useCampaign();
  const step = state.currentScreen;

  return (
    <div
      className="min-h-screen w-full relative"
      style={{ backgroundColor: "#FAF8F4", fontFamily: "'Inter', sans-serif" }}
    >
      {showProgress && <ProgressBar />}

      {showProgress && (
        <div
          className="fixed top-4 right-6 z-50"
          style={{ color: "#9A9490", fontSize: 12, fontFamily: "'Inter', sans-serif" }}
        >
          {step} of 11
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6 py-16 md:px-16 md:py-20 lg:max-w-4xl">
        {/* Greatif wordmark */}
        <div
          className="mb-12"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 18,
            fontWeight: 600,
            color: "#1A1714",
            letterSpacing: "-0.02em",
          }}
        >
          greatif
        </div>

        {children}
      </div>
    </div>
  );
}

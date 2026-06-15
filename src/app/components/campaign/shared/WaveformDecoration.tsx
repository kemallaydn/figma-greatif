import { motion } from "motion/react";

const BARS = [
  { height: 18, delay: 0 },
  { height: 32, delay: 0.15 },
  { height: 24, delay: 0.3 },
  { height: 44, delay: 0.1 },
  { height: 56, delay: 0.25 },
  { height: 36, delay: 0.4 },
  { height: 64, delay: 0.05 },
  { height: 48, delay: 0.35 },
  { height: 72, delay: 0.2 },
  { height: 52, delay: 0.45 },
  { height: 40, delay: 0.1 },
  { height: 60, delay: 0.3 },
  { height: 28, delay: 0.15 },
  { height: 44, delay: 0.4 },
  { height: 36, delay: 0.05 },
  { height: 20, delay: 0.25 },
];

interface WaveformDecorationProps {
  className?: string;
  opacity?: number;
}

export function WaveformDecoration({ className = "", opacity = 0.12 }: WaveformDecorationProps) {
  return (
    <div className={`flex items-end gap-1 ${className}`} style={{ opacity }}>
      {BARS.map((bar, i) => (
        <motion.div
          key={i}
          style={{
            width: 3,
            height: bar.height,
            backgroundColor: "#C2A882",
            borderRadius: 2,
          }}
          animate={{ scaleY: [1, 0.5, 1.1, 0.7, 1] }}
          transition={{
            duration: 3.2,
            delay: bar.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

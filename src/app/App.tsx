import { useState } from "react";
import { EntryScreen } from "./components/EntryScreen";
import { GoalScreen } from "./components/GoalScreen";

export type Screen =
  | "entry"
  | "goal"
  | "platform"
  | "release-state"
  | "released-links"
  | "unreleased-assets"
  | "campaign-identity"
  | "creator-direction"
  | "messaging"
  | "deliverables"
  | "budget-contact"
  | "review"
  | "success";

export interface CampaignData {
  goal: string;
  platforms: string[];
  platformOrder: string[];
  releaseState: "released" | "unreleased" | "";
  musicLinks: Record<string, string>;
  campaignName: string;
  artistName: string;
  songName: string;
  releaseDate: string;
  genre: string;
  audience: string[];
  creatorType: string[];
  regions: string[];
  language: string;
  creatorCount: string;
  contentVibes: string[];
  keyMessage: string;
  mustInclude: string[];
  mustAvoid: string[];
  references: string[];
  budget: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

const initialData: CampaignData = {
  goal: "",
  platforms: [],
  platformOrder: [],
  releaseState: "",
  musicLinks: {},
  campaignName: "",
  artistName: "",
  songName: "",
  releaseDate: "",
  genre: "",
  audience: [],
  creatorType: [],
  regions: [],
  language: "",
  creatorCount: "",
  contentVibes: [],
  keyMessage: "",
  mustInclude: [],
  mustAvoid: [],
  references: [],
  budget: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("entry");
  const [data, setData] = useState<CampaignData>(initialData);

  const update = (patch: Partial<CampaignData>) =>
    setData((prev) => ({ ...prev, ...patch }));

  return (
    <div className="size-full">
      {screen === "entry" && (
        <EntryScreen onStart={() => setScreen("goal")} />
      )}

      {screen === "goal" && (
        <GoalScreen
          initialValue={data.goal}
          onBack={() => setScreen("entry")}
          onContinue={(goal) => {
            update({ goal });
            setScreen("platform");
          }}
        />
      )}

      {/* Subsequent screens will be added page by page */}
    </div>
  );
}

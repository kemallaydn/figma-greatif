import { createContext, useContext, useReducer, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EntryScreen } from "./components/campaign/screens/EntryScreen";
import { GoalScreen } from "./components/campaign/screens/GoalScreen";
import { PlatformScreen } from "./components/campaign/screens/PlatformScreen";

export type CampaignData = {
  goal: string | null;
  platforms: string[];
  platformPriority: string[];
  releaseState: "released" | "unreleased" | null;
  releasedLinks: {
    spotify: string;
    appleMusic: string;
    youtube: string;
    tiktok: string;
    extras: string[];
  };
  unreleasedAssets: {
    previewLink: string;
    snippetFile: File | null;
    coverArt: File | null;
    artistAssets: File | null;
    embargo: string;
  };
  identity: {
    campaignName: string;
    artistName: string;
    songName: string;
    releaseDate: Date | null;
    genre: string;
  };
  creatorDirection: {
    audience: string[];
    creatorType: string[];
    creatorRegion: string[];
    language: string[];
    targetCount: number;
    contentVibe: string[];
  };
  messaging: {
    keyMessage: string;
    mustInclude: string[];
    mustAvoid: string[];
    references: string[];
  };
  deliverables: {
    contentByPlatform: Record<string, string[]>;
    countPerCreator: number;
    totalGoal: number;
    approvalNeeded: boolean;
    revisionNeeded: boolean;
    deliveryWindow: { start: Date | null; end: Date | null };
    publishWindow: { start: Date | null; end: Date | null };
  };
  budget: {
    range: string | null;
    note: string;
    contactPerson: string;
    email: string;
    phone: string;
    finalApprover: string;
  };
  currentScreen: number;
  draftSaved: boolean;
};

const initialState: CampaignData = {
  goal: null,
  platforms: [],
  platformPriority: [],
  releaseState: null,
  releasedLinks: { spotify: "", appleMusic: "", youtube: "", tiktok: "", extras: [] },
  unreleasedAssets: { previewLink: "", snippetFile: null, coverArt: null, artistAssets: null, embargo: "" },
  identity: { campaignName: "", artistName: "", songName: "", releaseDate: null, genre: "" },
  creatorDirection: { audience: [], creatorType: [], creatorRegion: [], language: [], targetCount: 50, contentVibe: [] },
  messaging: { keyMessage: "", mustInclude: [], mustAvoid: [], references: [] },
  deliverables: {
    contentByPlatform: {},
    countPerCreator: 1,
    totalGoal: 10,
    approvalNeeded: false,
    revisionNeeded: false,
    deliveryWindow: { start: null, end: null },
    publishWindow: { start: null, end: null },
  },
  budget: { range: null, note: "", contactPerson: "", email: "", phone: "", finalApprover: "" },
  currentScreen: 0,
  draftSaved: false,
};

type Action =
  | { type: "SET_SCREEN"; screen: number }
  | { type: "SET_GOAL"; goal: string }
  | { type: "SET_PLATFORMS"; platforms: string[] }
  | { type: "SET_PLATFORM_PRIORITY"; priority: string[] }
  | { type: "RESET" }
  | { type: "PATCH"; payload: Partial<CampaignData> };

function reducer(state: CampaignData, action: Action): CampaignData {
  switch (action.type) {
    case "SET_SCREEN":
      return { ...state, currentScreen: action.screen };
    case "SET_GOAL":
      return { ...state, goal: action.goal };
    case "SET_PLATFORMS":
      return { ...state, platforms: action.platforms };
    case "SET_PLATFORM_PRIORITY":
      return { ...state, platformPriority: action.priority };
    case "RESET":
      return { ...initialState };
    case "PATCH":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

type CampaignContextType = {
  state: CampaignData;
  dispatch: React.Dispatch<Action>;
  goTo: (screen: number) => void;
  next: () => void;
  back: () => void;
};

const CampaignContext = createContext<CampaignContextType | null>(null);

export function useCampaign() {
  const ctx = useContext(CampaignContext);
  if (!ctx) throw new Error("useCampaign must be used within CampaignProvider");
  return ctx;
}

const SCREENS = [EntryScreen, GoalScreen, PlatformScreen];

// direction: 1 = going forward (slide down → new screen from bottom)
//            -1 = going back (slide up → new screen from top)
const variants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    y: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const direction = useRef(1);

  const goTo = (screen: number) => {
    direction.current = screen > state.currentScreen ? 1 : -1;
    dispatch({ type: "SET_SCREEN", screen });
  };

  const next = () => goTo(state.currentScreen + 1);
  const back = () => goTo(Math.max(0, state.currentScreen - 1));

  const CurrentScreen = SCREENS[state.currentScreen] ?? SCREENS[0];

  return (
    <CampaignContext.Provider value={{ state, dispatch, goTo, next, back }}>
      <div
        className="size-full overflow-hidden relative"
        style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#FAF8F4" }}
      >
        <AnimatePresence mode="wait" custom={direction.current}>
          <motion.div
            key={state.currentScreen}
            custom={direction.current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: "absolute", inset: 0, overflowY: "auto" }}
          >
            <CurrentScreen />
          </motion.div>
        </AnimatePresence>
      </div>
    </CampaignContext.Provider>
  );
}

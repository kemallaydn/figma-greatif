# Plan: Greatif Premium Campaign Creation Journey

## Context

Greatif is a premium creator marketing platform for music campaigns. The user needs a complete 12-screen guided campaign creation flow that feels like a cinematic premium journey — not a form, wizard, or dashboard. Each screen presents one key decision. The experience must be calm, elegant, music-aware, and lightly animated.

**Current state:** `App.tsx` is a blank div. No existing campaign logic. shadcn/ui components available in `src/app/components/ui/`. Motion, Lucide React, React Router v7 all installed.

---

## Design System

Custom design tokens defined inline using Tailwind v4 (no tailwind.config.js needed):

| Token | Value | Usage |
|---|---|---|
| Ivory | `#FAF8F4` | Page backgrounds |
| Sand | `#EDE8DF` | Card surfaces, subtle separators |
| Parchment | `#E4DDD2` | Selection states, hovered cards |
| Charcoal | `#1A1714` | Primary headings |
| Warm Gray | `#4A4540` | Body text, labels |
| Muted | `#9A9490` | Helper text, placeholders |
| Vermilion | `#D4430F` | Primary accent, CTAs, selection highlights |
| Vermilion Light | `#FAEEE9` | Tinted accent backgrounds |
| White | `#FFFFFF` | Input backgrounds, elevated cards |

Typography: Import `Playfair Display` (display headings) + `Inter` (body/UI) from Google Fonts via `src/styles/fonts.css`.

---

## Architecture

### State Management
Single `CampaignData` context using `useReducer` in `App.tsx`. All screens read/write to this shared state. No URL routing needed — screen index managed via `currentScreen` state integer.

```typescript
// Campaign state shape
{
  goal: string | null,
  platforms: string[],
  platformPriority: string[],
  releaseState: 'released' | 'unreleased' | null,
  releasedLinks: { spotify, appleMusic, youtube, tiktok, extras[] },
  unreleasedAssets: { previewLink, snippetFile, coverArt, artistAssets, embargo },
  identity: { campaignName, artistName, songName, releaseDate, genre },
  creatorDirection: { audience, creatorType, creatorRegion, language, targetCount, contentVibe },
  messaging: { keyMessage, mustInclude[], mustAvoid[], references[] },
  deliverables: { contentByPlatform, countPerCreator, totalGoal, approvalNeeded, revisionNeeded, deliveryWindow, publishWindow },
  budget: { range, note, contactPerson, email, phone, finalApprover },
  currentScreen: number,
  draftSaved: boolean
}
```

### Screen Router
`App.tsx` renders the correct screen component based on `currentScreen`. `AnimatePresence` from `motion/react` wraps each screen for smooth transitions.

### Motion Pattern
Each screen uses `motion.div` with:
- `initial={{ opacity: 0, y: 20 }}`
- `animate={{ opacity: 1, y: 0 }}`
- `exit={{ opacity: 0, y: -16 }}`
- `transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}`

---

## File Structure

```
src/app/
  App.tsx                          — Screen router, campaign context, AnimatePresence
  components/
    campaign/
      shared/
        ScreenLayout.tsx           — Ivory bg wrapper, logo, progress bar, padding
        ProgressBar.tsx            — Thin vermilion line at top, step dots
        NavControls.tsx            — Back / Continue buttons, consistent footer
        WaveformDecoration.tsx     — SVG waveform bars (ambient visual motif)
        GoalChip.tsx               — Reusable selection chip/card component
      screens/
        01-EntryScreen.tsx
        02-GoalScreen.tsx
        03-PlatformScreen.tsx
        04-ReleaseStateScreen.tsx
        05A-ReleasedLinksScreen.tsx
        05B-UnreleasedAssetsScreen.tsx
        06-CampaignIdentityScreen.tsx
        07-CreatorDirectionScreen.tsx
        08-MessagingScreen.tsx
        09-DeliverablesScreen.tsx
        10-BudgetContactScreen.tsx
        11-ReviewScreen.tsx
        12-SuccessScreen.tsx
```

---

## Screen-by-Screen Design

### Screen 1 — Entry
- Full viewport, ivory bg, centered content
- Greatif wordmark (charcoal, Playfair Display)
- Animated waveform SVG below logo (gentle pulse loop)
- Large headline: "Create something worth listening to."
- Subtext: "Tell us about your release. We'll match you with the right creators."
- Primary CTA: "Start a Campaign" → (vermilion button, large)
- Secondary CTA: "Resume Draft" → (ghost, smaller, if draft exists)
- Ambient: very faint waveform bars bottom-center

### Screen 2 — Campaign Goal
- Top: tiny progress bar (1/11), back nav
- Headline: "What's the main goal?" Helper: "You can only choose one — be precise."
- 5 vertical stacked cards (mobile) / 2-col grid (desktop), each with:
  - Icon (Lucide), title, one-line descriptor
  - Goals: Release Awareness · Teaser Buzz · Sound Adoption · UGC Production · Post-Release Amplification
  - Selected state: left vermilion border, sand bg, icon fills accent
- Animated selection: card scales slightly (1.01) and border color transitions
- Continue enabled only when one goal selected

### Screen 3 — Platform Selection
- Headline: "Where will this campaign live?"
- 4 platform cards in 2×2 grid: TikTok / Instagram / YouTube / X
  - Each has platform logo icon + name, multi-selectable
  - Selected: vermilion ring + tinted bg
- After ≥2 selected: animate-in "Set a priority?" expandable section
  - Drag-to-reorder list of selected platforms (react-dnd or simple up/down arrows)
  - Label: "Drag to rank. Top = most important."
- Continue enabled when ≥1 platform selected

### Screen 4 — Release State
- Headline: "Is the music out yet?"
- Two large cards side by side (desktop) / stacked (mobile):
  - "Released" — icon: play circle, desc: "It's live. Let's drive discovery."
  - "Unreleased" — icon: lock, desc: "Building buzz before the drop."
- Single-select, tap selects immediately, bold visual state change
- Continue auto-enabled on selection (can proceed immediately)

### Screen 5A — Released Music Links
- Headline: "Where can creators find the music?"
- Fields revealed progressively (stagger-animate in):
  - Spotify link (required)
  - Apple Music link (optional)
  - YouTube link (optional)
  - TikTok sound link (optional)
- "Add another link" expandable section with + button → reveals text input
- Clean single-column layout, inputs with platform icon prefixes
- Continue enabled when Spotify field has value

### Screen 5B — Unreleased Music Assets
- Headline: "Share what you've got."
- Layout: two-column on desktop, single on mobile
  - Left: Private preview link input + snippet upload dropzone (dashed border)
  - Right: Cover art upload (square dropzone) + artist assets upload
- Below: "Embargo note" — textarea with helper "Let creators know what they can and can't share."
- Upload areas show file name + remove button on selection
- Continue enabled when at least one asset provided

### Screen 6 — Campaign Identity
- Headline: "Name this campaign."
- 5 clean fields, generous spacing (NOT a dense form):
  - Campaign Name (large, prominent first)
  - Artist Name
  - Song / Project Name
  - Release Date (date picker, react-day-picker)
  - Genre (select or freeform input with suggestions)
- Fields stagger-animate in with 80ms delays
- Continue enabled when Campaign Name + Artist Name filled

### Screen 7 — Creator Direction
- Headline: "Who should make this content?"
- Organized in soft card sections (not a single form):
  - **Audience** — chip multi-select (Gen Z · Millennials · Music Fans · Niche · Mainstream)
  - **Creator Type** — chips (Micro · Mid-tier · Macro · Nano · Mix)
  - **Region** — dropdown multi-select (US · UK · EU · LATAM · Global · etc.)
  - **Language** — chips or select
  - **Target Creator Count** — number input with +/- stepper or slider (10–500+)
  - **Content Vibe** — chip set (Authentic · Aesthetic · Funny · Emotional · Dance · POV · etc.)
- Each section animates in as user scrolls / enters view
- Continue enabled when audience + vibe + at least one region selected

### Screen 8 — Messaging
- Headline: "Shape the narrative."
- Three focused areas:
  - **Key Message** — large textarea, 280 char limit, live counter. Placeholder: "What should every creator convey?"
  - **Must Include** — tag-input chip field (type + enter to add). Label: "Hashtags, phrases, calls to action..."
  - **Must Avoid** — tag-input chip field. Label: "Topics, words, or angles to steer clear of."
  - **References** — URL input with + add button, shows added links as chips
- Spacious layout, soft visual sections, no walls of fields
- Continue enabled when Key Message filled

### Screen 9 — Deliverables & Timing
- Headline: "Define the content."
- Tabbed by selected platforms (tabs at top, scrollable on mobile)
- Per-platform tab:
  - Content types: chip multi-select (Reel · Story · TikTok · Short · Post · etc.)
  - Count per creator: number input
- Below tabs (shared):
  - **Total Content Goal** — number with stepper
  - **Concept Approval** — toggle (Yes / No)
  - **Revisions Needed** — toggle (Yes / No)
  - **Delivery Window** — date range picker (two react-day-picker inputs)
  - **Publish Window** — date range picker
- Layout: compact but airy, grouped logically
- Continue enabled when at least one content type selected per platform

### Screen 10 — Budget & Contact
- Headline: "Let's talk numbers."
- Two sections in visual cards:
  - **Budget**:
    - Range selector: 6 preset tiles ($1K–$5K / $5K–$15K / $15K–$30K / $30K–$60K / $60K–$100K / Custom)
    - Optional budget note textarea (hidden until "Custom" or "Add context" tapped)
  - **Contact**:
    - Contact Person (text input)
    - Email (email input)
    - Phone (tel input, optional)
    - Final Approver (text input, optional, with "Same as contact" toggle)
- Clean two-section layout
- Continue enabled when budget selected + email + contact person filled

### Screen 11 — Review
- Headline: "Your campaign, at a glance."
- Premium structured summary:
  - 10 collapsible sections (shadcn Accordion), one per prior screen group
  - Each section: title + summary line + "Edit" ghost button → taps go back to that screen (preserving state)
  - Visual: soft cards with sand bg, charcoal text, vermilion accent on section titles
  - Waveform decoration top-right, ambient
- Bottom: large full-width "Submit Campaign" button (vermilion, pill shape)
- Subtext: "Your request will be reviewed within 24 hours."
- Continue = Submit (navigates to Screen 12)

### Screen 12 — Success
- Full-viewport moment of delight:
  - Animated checkmark / pulse circle in vermilion
  - canvas-confetti burst (subtle, warm tones: ivory + orange + sand particles)
  - Headline: "Your campaign is in motion."
  - Subtext: "Our team reviews every brief personally. Expect a response within 24 hours."
  - Timeline: 3-step visual: Submitted → Under Review → Creators Matched
  - Two CTAs:
    - Primary: "View Request" (ghost, outlined)
    - Secondary: "Create Another Campaign" → resets state to Screen 1
- Ambient waveform pulse animation loops behind

---

## Shared Components

### `ScreenLayout.tsx`
- Ivory background (`bg-[#FAF8F4]`)
- Max-width container: `max-w-2xl` (mobile-first), `max-w-4xl` on desktop
- Padding: `px-6 py-10` mobile, `px-16 py-16` desktop
- Top: progress bar + back arrow
- Bottom: sticky nav controls on mobile
- Logo watermark top-left

### `ProgressBar.tsx`
- Thin 2px vermilion line at very top of viewport
- Animates width based on currentScreen / 11
- Small step counter "3 of 11" in muted gray, top-right

### `NavControls.tsx`
- Back: ghost button with `←` arrow
- Continue: vermilion filled pill button
- Disabled state: muted, non-interactive
- "Save Draft" subtle text link between them

### `WaveformDecoration.tsx`
- 12–20 vertical bars of varying height
- SVG, amber/sand color, low opacity (0.15)
- Subtle breathing animation via motion keyframes

---

## Implementation Order

1. `src/styles/fonts.css` — Add Google Fonts imports (Playfair Display + Inter)
2. `src/app/App.tsx` — Campaign context, state shape, screen router, AnimatePresence
3. Shared components: ScreenLayout, ProgressBar, NavControls, WaveformDecoration
4. All 12 screen components in order
5. Wire up navigation (next/back/edit-from-review)
6. Polish: motion timing, selection feedback, responsive layout

---

## Reused Libraries

| Library | Usage |
|---|---|
| `motion/react` from `motion` | Screen transitions, AnimatePresence, layout animations |
| `lucide-react` | Platform icons, goal icons, UI icons |
| `@radix-ui/react-accordion` (via shadcn `accordion.tsx`) | Review screen sections |
| `@radix-ui/react-tabs` (via shadcn `tabs.tsx`) | Platform tabs on Deliverables screen |
| `react-day-picker` (via shadcn `calendar.tsx`) | Date/range pickers |
| `canvas-confetti` | Success screen celebration |
| `react-dnd` | Platform priority drag-to-reorder |
| `src/app/components/ui/button.tsx` | NavControls CTAs |
| `src/app/components/ui/input.tsx` | Text fields |
| `src/app/components/ui/textarea.tsx` | Messaging fields |
| `src/app/components/ui/toggle.tsx` | Yes/No toggles |
| `src/app/components/ui/select.tsx` | Genre, region selectors |
| `src/app/components/ui/progress.tsx` | Progress bar base |

---

## Verification

After implementation:
1. Walk through all 12 screens start to finish, filling in each decision
2. Verify screen transitions animate correctly (no flicker)
3. Check that selecting "Released" shows 5A and "Unreleased" shows 5B
4. Confirm platform priority section only appears after ≥2 platforms selected
5. Verify Review screen shows all entered data with correct edit links
6. Confirm Success screen confetti fires and "Create Another" resets to Screen 1
7. Test mobile layout (375px) — no horizontal scroll, fields accessible, nav visible
8. Test desktop layout (1280px) — spacious, cinematic, no cramped elements

# Rizza Platform — Modern Talent & Assessment Client

A pixel-perfect, ultra-high-fidelity React + TypeScript + Tailwind CSS platform inspired by contemporary glassmorphism and ambient aesthetic design.

Built strictly according to client specifications with responsive PC, tablet, and mobile layouts, interactive talent profiles, dynamic technical assessments, employment history flows, and seamless client-side state management.

---

## 🌟 Key Features

- **Pixel-Perfect Visual Fidelity:**
  - Glassmorphic card styling (`backdrop-blur-md`, subtle lavender borders, ambient glow gradients).
  - Authentic 3D graphics, fluid wave ribbons, and high-resolution assets.
  - Consistent ethereal palette (`#8B5CF6`, `#A78BFA`, `#F3E8FF`, `#FAF8FF`).
- **Interactive Talent Profile:**
  - Hero header with verified badge, availability status, and clean social link integration.
  - Tab navigation between **Skills** (Tools & Tech, Journey timeline, Quote card) and **Projects** (interactive 6-card showcase with tags, metrics, and live demo links).
  - Aligned right rail featuring verified status, portfolio links, and quick actions.
- **Dynamic Technical Assessments:**
  - Multiple Choice Question (MCQ) interface with countdown timer, progress indicators, interactive option selection, and explanation feedback.
  - Subjective assessment submission interface with rich text input, auto-save simulation, and celebratory completion flow.
- **Employment History & Verification:**
  - Multi-step employment details review.
  - Interactive edit modal with real-time updates persisted via `localStorage`.
- **Pro Tier Upgrade Modal:**
  - Glassmorphic upgrade dialog with benefit lists and annual/monthly billing toggles.
- **Mobile Responsive Design:**
  - Dedicated mobile drawer navigation, sticky top bar, responsive grid collapse for 390px mobile screens and tablet displays.
- **Micro-Interactions & Feedback:**
  - Haptic active press scaling (`active:scale-95`).
  - Toast notification engine for actions, saves, and submissions.
  - Celebratory confetti effects via `canvas-confetti`.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite 6
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + Custom Glassmorphic Utilities
- **Icons:** Lucide React + Custom crisp SVG social icons
- **Animations / Effects:** Canvas Confetti + CSS Keyframe Transitions
- **Deployment:** Vercel (Configured with `vercel.json` SPA rewrites)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Vrundpatel153/rizza.git
cd rizza

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

---

## 📦 Building for Production

```bash
# Type-check and build for production
npm run build

# Preview production build locally
npm run preview
```

Output is emitted cleanly to the `dist/` directory.

---

## 🌐 Deploy to Vercel

This repository is pre-configured with `vercel.json` for one-click Vercel deployments:

1. Import the repository in [Vercel](https://vercel.com).
2. Framework Preset will automatically detect **Vite**.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**. Client-side SPA routing rewrites are automatically handled.

---

## 📁 Project Structure

```
rizza/
├── public/
│   └── assets/             # High-res graphics, wave ribbons, project thumbnails
├── src/
│   ├── components/
│   │   ├── AssessmentMCQPage.tsx         # MCQ assessment view
│   │   ├── AssessmentSubjectivePage.tsx  # Subjective assessment view
│   │   ├── EditFieldModal.tsx            # Employment detail editor
│   │   ├── EmploymentDetailsPage.tsx     # Employment history flow
│   │   ├── LoginPage.tsx                 # Demo login screen
│   │   ├── Navbar.tsx                    # Header with search & notification bar
│   │   ├── ProfileHeader.tsx             # Talent profile hero banner
│   │   ├── ProfilePage.tsx               # Main profile layout & rail
│   │   ├── ProfileRightRail.tsx          # Right sidebar info & badges
│   │   ├── ProjectsTabContent.tsx        # 6-card project showcase
│   │   ├── Sidebar.tsx                   # Main navigation drawer
│   │   ├── SkillsTabContent.tsx          # Tools, journey & quote card
│   │   ├── Toast.tsx                     # Floating notification toast
│   │   └── UpgradeModal.tsx              # Pro upgrade dialog
│   ├── context/
│   │   └── AppContext.tsx                # Central state management & local storage
│   ├── types.ts                          # TypeScript interface definitions
│   ├── App.tsx                           # Main application coordinator
│   ├── main.tsx                          # App entry point
│   └── index.css                         # Tailwind v4 directives & glass effects
├── vercel.json                           # Vercel deployment routing configuration
├── vite.config.ts                        # Vite configuration with Tailwind plugin
└── package.json                          # Dependencies & scripts
```

---

## 📄 License

Private & Confidential. Built for Rizza Platform.

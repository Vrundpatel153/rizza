import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ProfilePage } from './components/ProfilePage';
import { AssessmentMCQPage } from './components/AssessmentMCQPage';
import { AssessmentSubjectivePage } from './components/AssessmentSubjectivePage';
import { EmploymentDetailsPage } from './components/EmploymentDetailsPage';
import { LoginPage } from './components/LoginPage';
import { EditFieldModal } from './components/EditFieldModal';
import { UpgradeModal } from './components/UpgradeModal';
import { Toast } from './components/Toast';

const MainAppLayout: React.FC = () => {
  const { activeView, isAuthenticated } = useApp();

  if (!isAuthenticated || activeView === 'login') {
    return <LoginPage />;
  }

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-[#111625] selection:bg-[#5832E6] selection:text-white">
      {/* Ambient Fluid Background Waves */}
      <div className="ambient-bg-layer">
        {/* Soft Organic Background Glow Blobs */}
        <div className="absolute -top-[10%] -left-[5%] w-[650px] h-[550px] rounded-full bg-gradient-to-tr from-[#8b5cf6]/20 to-[#c4b5fd]/30 blur-[80px]" />
        <div className="absolute top-[5%] -right-[5%] w-[600px] h-[500px] rounded-full bg-gradient-to-bl from-[#a78bfa]/25 to-[#ddd6fe]/30 blur-[80px]" />
        <div className="absolute top-[50%] left-[20%] w-[500px] h-[400px] rounded-full bg-gradient-to-r from-[#ddd6fe]/20 to-[#ede9fe]/30 blur-[90px]" />
        <div className="absolute -bottom-[10%] right-[10%] w-[700px] h-[500px] rounded-full bg-gradient-to-tl from-[#7c3aed]/15 to-[#c4b5fd]/25 blur-[90px]" />

        {/* Ambient SVG Waves behind sidebar and top header */}
        <svg className="absolute top-0 left-0 w-full h-[320px] pointer-events-none opacity-40" viewBox="0 0 1600 320" fill="none">
          <path d="M-100 80 C 300 240, 600 -40, 1100 120 C 1350 200, 1500 60, 1700 90 L 1700 0 L -100 0 Z" fill="url(#ambient-wave-grad)" />
          <defs>
            <linearGradient id="ambient-wave-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#c4b5fd" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ede9fe" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Fixed/Sticky Top Navigation */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Main Responsive Viewport */}
      <main className="relative z-10 flex-1 w-full max-w-[1584px] mx-auto px-4 sm:px-6 md:px-8 lg:px-9 pb-12 pt-2">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-7 items-start">
          {/* Left Navigation Sidebar */}
          <Sidebar />

          {/* Center Workspace Content with Smooth Transition */}
          <div className="flex-1 min-w-0 w-full view-transition-wrap">
            {(activeView === 'profile-skills' || activeView === 'profile-projects') && (
              <ProfilePage />
            )}
            {activeView === 'assessment-mcq' && <AssessmentMCQPage />}
            {activeView === 'assessment-subjective' && <AssessmentSubjectivePage />}
            {activeView === 'employment-details' && <EmploymentDetailsPage />}
          </div>
        </div>
      </main>

      {/* Global Interactive Overlays */}
      <EditFieldModal />
      <UpgradeModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}

export default App;

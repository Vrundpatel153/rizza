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
    <div className="relative min-h-screen flex flex-col font-sans text-[#0F172A] selection:bg-[#5828F0] selection:text-white bg-[#F0EDFA]">
      {/* Exact Ambient Canvas Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Ethereal Mesh Glows */}
        <div className="absolute -top-[120px] left-[10%] w-[680px] h-[480px] rounded-full bg-gradient-to-br from-[#E2D9FC]/40 via-[#EDE8FD]/30 to-transparent blur-[90px]" />
        <div className="absolute top-[40px] right-[5%] w-[620px] h-[520px] rounded-full bg-gradient-to-bl from-[#DDD3FE]/45 via-[#EBE5FD]/25 to-transparent blur-[100px]" />
        <div className="absolute top-[40%] left-[25%] w-[500px] h-[450px] rounded-full bg-gradient-to-tr from-[#EDE9FE]/25 to-transparent blur-[90px]" />
        <div className="absolute bottom-[-100px] right-[10%] w-[650px] h-[500px] rounded-full bg-gradient-to-tl from-[#DDD5FC]/35 to-transparent blur-[90px]" />

        {/* Delicate Concentric Circular Vector Arcs Behind Sidebar (as in reference image) */}
        <svg className="absolute -bottom-10 -left-10 w-[550px] h-[550px] pointer-events-none opacity-40 select-none" viewBox="0 0 550 550" fill="none">
          <circle cx="60" cy="490" r="160" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.25" />
          <circle cx="60" cy="490" r="240" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.2" />
          <circle cx="60" cy="490" r="320" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.15" />
          <circle cx="60" cy="490" r="400" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.1" />
        </svg>

        {/* Floating ambient subtle dots at bottom right (as in reference image) */}
        <div className="absolute bottom-[40px] right-[320px] w-3 h-3 rounded-full bg-[#C4B5FD]/50 blur-[0.5px]" />
        <div className="absolute bottom-[20px] right-[380px] w-2 h-2 rounded-full bg-[#C4B5FD]/40 blur-[0.5px]" />
      </div>

      {/* Top Navigation */}
      <div className="relative z-30 w-full">
        <Navbar />
      </div>

      {/* Main 1584px Desktop Container */}
      <main className="relative z-10 flex-1 w-full max-w-[1584px] mx-auto px-4 md:px-6 pb-6 pt-1">
        <div className="flex flex-col lg:flex-row gap-5 items-start">
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

import React from 'react';
import { useApp } from '../context/AppContext';
import { ProfileHeader } from './ProfileHeader';
import { SkillsTabContent } from './SkillsTabContent';
import { ProjectsTabContent } from './ProjectsTabContent';
import { ProfileRightRail } from './ProfileRightRail';

export const ProfilePage: React.FC = () => {
  const { activeProfileTab, setActiveProfileTab, setActiveView } = useApp();

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-6 items-start">
      {/* Center Main Workspace */}
      <div className="min-w-0 w-full flex flex-col gap-6">
        {/* Profile Hero Banner & Tabs */}
        <ProfileHeader
          activeTab={activeProfileTab}
          onTabChange={(tab) => {
            if (tab === 'experience') {
              setActiveView('employment-details');
            } else {
              setActiveProfileTab(tab);
            }
          }}
        />

        {/* Tab Specific Workspace Content */}
        <div className="w-full">
          {activeProfileTab === 'skills' && <SkillsTabContent />}
          {activeProfileTab === 'projects' && <ProjectsTabContent />}
          {activeProfileTab === 'overview' && <SkillsTabContent />}
          {activeProfileTab === 'posts' && (
            <div className="rizza-card p-8 bg-white/95 rounded-[24px] border border-[#ece8f7] text-center">
              <h3 className="text-lg font-bold text-[#111625] mb-2">Posts & Articles</h3>
              <p className="text-sm text-[#7E88A2]">Annie Stanley's latest articles and case study writeups.</p>
            </div>
          )}
          {activeProfileTab === 'activity' && (
            <div className="rizza-card p-8 bg-white/95 rounded-[24px] border border-[#ece8f7] text-center">
              <h3 className="text-lg font-bold text-[#111625] mb-2">Recent Activity</h3>
              <p className="text-sm text-[#7E88A2]">Completed UX Design Assessment with 94th percentile ranking.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column Contextual Rail */}
      <div className="w-full xl:w-[440px] flex-shrink-0 flex flex-col gap-6">
        <ProfileRightRail variant={activeProfileTab === 'projects' ? 'projects' : 'skills'} />
      </div>
    </div>
  );
};

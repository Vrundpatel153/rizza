import React from 'react';
import { useApp } from '../context/AppContext';
import { ProfileHeader } from './ProfileHeader';
import { SkillsTabContent } from './SkillsTabContent';
import { ProjectsTabContent } from './ProjectsTabContent';
import { ProfileRightRail } from './ProfileRightRail';

export const ProfilePage: React.FC = () => {
  const { activeProfileTab, setActiveProfileTab, setActiveView } = useApp();

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">
      {/* Center Main Workspace */}
      <div className="min-w-0 w-full flex flex-col gap-4">
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
            <div className="p-8 bg-white/95 rounded-[26px] border border-white shadow-sm text-center">
              <h3 className="text-base font-bold text-[#0F172A] mb-1">Posts & Articles</h3>
              <p className="text-xs text-[#64748B]">Annie Stanley's latest articles and case study writeups.</p>
            </div>
          )}
          {activeProfileTab === 'activity' && (
            <div className="p-8 bg-white/95 rounded-[26px] border border-white shadow-sm text-center">
              <h3 className="text-base font-bold text-[#0F172A] mb-1">Recent Activity</h3>
              <p className="text-xs text-[#64748B]">Completed UX Design Assessment with 94th percentile ranking.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column Contextual Rail */}
      <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-4">
        <ProfileRightRail variant={activeProfileTab === 'projects' ? 'projects' : 'skills'} />
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProjectsTabContent: React.FC = () => {
  const { showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ui-ux', label: 'UI/UX Design' },
    { id: 'mobile', label: 'Mobile App' },
    { id: 'web', label: 'Web App' },
    { id: 'branding', label: 'Branding' },
    { id: 'design-system', label: 'Design System' }
  ];

  const projects = [
    {
      id: 'finmate',
      title: 'FinMate',
      subtitle: 'Personal Finance App',
      category: ['ui-ux', 'mobile'],
      tags: ['UI/UX Design', 'Mobile App'],
      image: '/assets/project-finmate.png',
      link: '#'
    },
    {
      id: 'healthtrack',
      title: 'HealthTrack',
      subtitle: 'Health & Fitness Platform',
      category: ['ui-ux', 'mobile'],
      tags: ['UI/UX Design', 'Mobile App'],
      image: '/assets/project-healthtrack.png',
      link: '#'
    },
    {
      id: 'travelease',
      title: 'TravelEase',
      subtitle: 'Travel Planning App',
      category: ['ui-ux', 'web'],
      tags: ['UI/UX Design', 'Web App'],
      image: '/assets/project-travelease.png',
      link: '#'
    },
    {
      id: 'taskflow',
      title: 'TaskFlow',
      subtitle: 'Productivity Web App',
      category: ['ui-ux', 'web'],
      tags: ['UI/UX Design', 'Web App'],
      image: '/assets/project-taskflow.png',
      link: '#'
    },
    {
      id: 'rizza-ds',
      title: 'Rizza Design System',
      subtitle: 'Design System & Components',
      category: ['design-system', 'ui-ux'],
      tags: ['Design System', 'UI/UX Design'],
      image: '/assets/project-rizza-ds.png',
      link: '#'
    },
    {
      id: 'shoply',
      title: 'Shoply',
      subtitle: 'E-commerce Mobile App',
      category: ['ui-ux', 'mobile'],
      tags: ['UI/UX Design', 'Mobile App'],
      image: '/assets/project-shoply.png',
      link: '#'
    }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category.includes(selectedCategory));

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Featured Work Header & Filter Pills */}
      <div className="rizza-card p-6 sm:p-7 bg-white/95 backdrop-blur-xl border border-[#ece8f7] rounded-[24px] shadow-[0_4px_24px_-2px_rgba(85,75,140,0.06)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold text-[#111625] tracking-tight">
              Featured work
            </h2>
            <p className="text-sm text-[#7E88A2] mt-0.5">
              A selection of my recent projects and case studies.
            </p>
          </div>

          <button
            onClick={() => showToast('Viewing full project portfolio archive')}
            className="text-xs font-semibold text-[#5832E6] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View all projects</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#4F17EA] text-white shadow-[0_4px_12px_rgba(79,23,234,0.3)] scale-[1.02]'
                    : 'bg-[#F4F2FC] text-[#47516B] border border-[#EDE9F8] hover:bg-[#EAE5FA] hover:text-[#5832E6]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 6 Project Cards Grid (3x2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              onClick={() => showToast(`Opening project: ${proj.title}`)}
              className="group bg-white rounded-2xl p-3 border border-[#ECE8F7] shadow-[0_4px_20px_-2px_rgba(85,75,140,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(88,50,230,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Mockup Container */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#F2F0FA]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* External Link Floating Button */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-all group-hover:bg-[#4F17EA] group-hover:scale-110">
                    <ExternalLink size={14} />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="mt-3">
                  <h3 className="text-sm font-bold text-[#111625] group-hover:text-[#5832E6] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#7E88A2] mt-0.5">
                    {proj.subtitle}
                  </p>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="flex items-center gap-1.5 flex-wrap mt-3 pt-2 border-t border-[#F5F3FB]">
                {proj.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F4F2FC] text-[#6B7280]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

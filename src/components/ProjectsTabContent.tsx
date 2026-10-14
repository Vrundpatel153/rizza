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
    <div className="w-full flex flex-col gap-4">
      {/* Featured Work Container */}
      <div className="p-6 sm:p-7 bg-white rounded-[26px] border border-[#EAE5F5] shadow-[0_4px_20px_-2px_rgba(100,70,190,0.07)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
              Featured work
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              A selection of my recent projects and case studies.
            </p>
          </div>

          <button
            onClick={() => showToast('Viewing full project portfolio archive')}
            className="text-xs font-semibold text-[#5828F0] hover:underline inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View all projects</span>
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Filter Pills matching reference */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar select-none">
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-medium px-4 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'font-semibold pill-active-purple'
                    : 'bg-[#F8F6FE] text-[#475569] border border-[#EAE5F5] hover:bg-white hover:text-[#0F172A]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 6 Project Cards Grid (3x2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              onClick={() => showToast(`Opening project: ${proj.title}`)}
              className="group bg-[#FAFAFE] rounded-[22px] p-2.5 border border-[#EAE5F5] shadow-sm hover:shadow-[0_10px_28px_rgba(88,40,240,0.12)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Mockup Container */}
                <div className="relative rounded-[16px] overflow-hidden aspect-[16/10] bg-[#F2F0FA]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* External Link Floating Button */}
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-md bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-all group-hover:bg-[#5828F0]">
                    <ExternalLink size={11} />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="mt-2.5 px-1">
                  <h3 className="text-[13.5px] font-bold text-[#0F172A] group-hover:text-[#5828F0] transition-colors leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    {proj.subtitle}
                  </p>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="flex items-center gap-1.5 flex-wrap mt-2.5 px-1 pt-2 border-t border-[#ECE7F8]">
                {proj.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-white text-[#475569] border border-[#EAE5F5]"
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

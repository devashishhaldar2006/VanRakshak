import React from 'react';
import { 
  Shield, 
  Globe, 
  HelpCircle, 
  PhoneCall, 
  User, 
  Accessibility, 
  Search,
  Bell,
  CheckCircle2,
  FolderTree,
  ChevronDown
} from 'lucide-react';
import { translations } from '../data/translations';
import { ProjectAssessment, ActiveTab } from '../types';

interface HeaderProps {
  language: 'en' | 'hi';
  setLanguage?: (lang: 'en' | 'hi') => void;
  onLanguageChange?: (lang: 'en' | 'hi') => void;
  activeTab?: ActiveTab;
  setActiveTab?: (tab: ActiveTab) => void;
  selectedProject: ProjectAssessment;
  allProjects: ProjectAssessment[];
  onSelectProject: (p: ProjectAssessment) => void;
  onOpenNewAssessment: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  onLanguageChange,
  activeTab = 'dashboard',
  setActiveTab,
  selectedProject,
  allProjects,
  onSelectProject,
  onOpenNewAssessment,
}) => {
  const handleLanguageChange = (lang: 'en' | 'hi') => {
    if (setLanguage) setLanguage(lang);
    if (onLanguageChange) onLanguageChange(lang);
  };

  const handleTabChange = (tab: ActiveTab) => {
    if (setActiveTab) setActiveTab(tab);
  };

  const t = translations[language];

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#DEE2E6] shrink-0 z-40">
      {/* Top Saffron / Green Tricolor Stripe for Official Indian Gov Styling */}
      <div className="w-full h-1 bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808]" />

      {/* Level 1: Top Utility Bar */}
      <div className="bg-[#F8F9FA] border-b border-[#E9ECEF] px-4 lg:px-6 py-1.5 flex flex-wrap items-center justify-between text-xs text-[#5F6368]">
        <div className="flex items-center gap-2">
          {/* Government of India Text */}
          <span className="font-semibold text-[#191C1D]">{t.govIndia}</span>
          <span className="text-[#C1C8C2]">|</span>
          <span className="hidden sm:inline text-[#5B5F63]">{t.ministryName}</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 font-medium">
          <a href="#main-content" className="hover:text-[#1B4332] underline opacity-90 hover:opacity-100 hidden md:inline">
            Skip to main content
          </a>
          <span className="text-[#C1C8C2] hidden md:inline">|</span>

          <button 
            className="flex items-center gap-1 hover:text-[#1B4332] transition-colors"
            title="Accessibility Options"
            onClick={() => alert('Accessibility Options: High Contrast Mode Active (WCAG AA Compliant), Standard 16px Base Scaling.')}
          >
            <Accessibility className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Accessibility</span>
          </button>

          <span className="text-[#C1C8C2]">|</span>

          {/* Language Switcher */}
          <div className="flex items-center border border-[#DEE2E6] rounded bg-white overflow-hidden text-[11px]">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-0.5 font-semibold transition-colors ${
                language === 'en' ? 'bg-[#1B4332] text-white' : 'text-[#5B5F63] hover:bg-[#F1F3F4]'
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange('hi')}
              className={`px-2 py-0.5 font-semibold transition-colors ${
                language === 'hi' ? 'bg-[#1B4332] text-white' : 'text-[#5B5F63] hover:bg-[#F1F3F4]'
              }`}
            >
              हिन्दी
            </button>
          </div>

          <span className="text-[#C1C8C2] hidden sm:inline">|</span>

          <button 
            onClick={() => handleTabChange('reports')}
            className="hidden sm:flex items-center gap-1 hover:text-[#1B4332] transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help / Manual</span>
          </button>

          <span className="text-[#C1C8C2] hidden sm:inline">|</span>

          <button 
            onClick={() => handleTabChange('ai_model_status')}
            className="hidden sm:flex items-center gap-1 hover:text-[#1B4332] transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Forest Helpdesk</span>
          </button>
        </div>
      </div>

      {/* Level 2: Main Header Bar */}
      <div className="px-4 lg:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
        {/* Brand Left */}
        <div className="flex items-center gap-3">
          {/* Official Emblem Placeholder */}
          <div className="w-11 h-11 rounded bg-[#012D1D] text-[#C1ECD4] flex items-center justify-center shrink-0 border border-[#1B4332] shadow-sm">
            <Shield className="w-6 h-6 text-[#A5D0B9]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#012D1D] font-sans">
                {t.portalTitle}
              </h1>
              <span className="bg-[#E8F5E9] text-[#1B5E20] text-[10px] font-bold px-2 py-0.5 rounded border border-[#C8E6C9] tracking-wider uppercase">
                Gov Portal v4.2
              </span>
            </div>
            <p className="text-xs text-[#5B5F63] font-medium leading-tight">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Center: Active Project Selector Switcher */}
        <div className="flex items-center gap-2 bg-[#F8F9FA] border border-[#DEE2E6] rounded px-3 py-1.5">
          <FolderTree className="w-4 h-4 text-[#1B4332] shrink-0" />
          <div className="flex flex-col text-xs">
            <span className="text-[10px] text-[#717973] uppercase font-bold tracking-wider">Active Assessment Project</span>
            <select
              value={selectedProject.id}
              onChange={(e) => {
                const found = allProjects.find(p => p.id === e.target.value);
                if (found) onSelectProject(found);
              }}
              className="bg-transparent font-semibold text-[#191C1D] text-xs focus:outline-none cursor-pointer pr-4"
            >
              {allProjects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.id}: {proj.name} ({proj.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Quick Action Tabs & User Profile */}
        <div className="flex items-center gap-3">
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'dashboard' ? 'bg-[#1B4332] text-white' : 'text-[#5B5F63] hover:bg-[#F1F3F4]'
              }`}
            >
              {t.dashboard}
            </button>
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'dashboard' ? 'bg-[#1B4332] text-white' : 'text-[#5B5F63] hover:bg-[#F1F3F4]'
              }`}
            >
              {t.projects}
            </button>
            <button
              onClick={() => handleTabChange('reports')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'reports' ? 'bg-[#1B4332] text-white' : 'text-[#5B5F63] hover:bg-[#F1F3F4]'
              }`}
            >
              {t.reports}
            </button>
          </nav>

          <div className="h-6 w-px bg-[#DEE2E6] hidden sm:block" />

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 bg-[#F8F9FA] hover:bg-[#F1F3F4] transition-colors border border-[#DEE2E6] rounded px-2.5 py-1 text-left">
            <div className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-xs font-bold shrink-0">
              RS
            </div>
            <div className="hidden xl:block">
              <div className="text-xs font-bold text-[#191C1D] leading-tight">Dr. R. Sharma, IFS</div>
              <div className="text-[10px] text-[#5B5F63]">DFO, Tehri Dam Circle</div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Disclaimer Banner (Subtle, Institutional) */}
      <div className="bg-[#FFF8E1] border-t border-b border-[#FFE082] px-4 py-1 flex items-center justify-between text-[11px] text-[#7F5000]">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider text-[10px] bg-[#FFE57F] px-1.5 py-0.2 rounded text-[#5D4037]">Official Notice</span>
          <span>{t.disclaimer}</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] text-[#8D6E63]">
          <span>Security Audit: <strong>Passed (CERT-In Compliant)</strong></span>
          <span>•</span>
          <span>Session: <strong>Authorized Officer</strong></span>
        </div>
      </div>
    </header>
  );
};

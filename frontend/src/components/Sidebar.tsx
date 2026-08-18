import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  Route, 
  GitFork, 
  Trees, 
  Trees as ForestIcon, 
  PawPrint, 
  Eye, 
  Droplets, 
  ShieldCheck, 
  CheckSquare, 
  FileText, 
  Database, 
  Cpu, 
  Users, 
  Settings, 
  Activity, 
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ActiveTab } from '../types';
import { translations } from '../data/translations';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: 'en' | 'hi';
  onOpenNewAssessment: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  pendingVerificationsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  language,
  onOpenNewAssessment,
  isCollapsed,
  setIsCollapsed,
  pendingVerificationsCount
}) => {
  const t = translations[language];

  const navItems = [
    {
      group: 'OVERVIEW',
      items: [
        { id: 'dashboard' as ActiveTab, label: t.dashboard, icon: LayoutDashboard }
      ]
    },
    {
      group: 'PROJECT ASSESSMENT',
      items: [
        { id: 'projects' as ActiveTab, label: t.projects, icon: FolderKanban },
        { id: 'new_assessment' as ActiveTab, label: t.newAssessment, icon: PlusCircle, isAction: true },
        { id: 'project_detail' as ActiveTab, label: t.proposedRoutes, icon: Route },
        { id: 'alternative_routes' as ActiveTab, label: t.alternativeRoutes, icon: GitFork, badge: 'Flagship' }
      ]
    },
    {
      group: 'ENVIRONMENTAL ANALYSIS',
      items: [
        { id: 'tree_inventory' as ActiveTab, label: t.treeInventory, icon: Trees },
        { id: 'vegetation' as ActiveTab, label: t.vegetation, icon: ForestIcon },
        { id: 'wildlife_evidence' as ActiveTab, label: t.wildlifeEvidence, icon: PawPrint },
        { id: 'habitat_sensitivity' as ActiveTab, label: t.habitatSensitivity, icon: Eye },
        { id: 'water_terrain' as ActiveTab, label: t.waterTerrain, icon: Droplets }
      ]
    },
    {
      group: 'VERIFICATION',
      items: [
        { 
          id: 'ground_verification' as ActiveTab, 
          label: t.groundVerification, 
          icon: ShieldCheck, 
          badge: pendingVerificationsCount > 0 ? `${pendingVerificationsCount}` : undefined,
          badgeColor: 'bg-[#FFEBEE] text-[#B71C1C] border border-[#FFCDD2]'
        },
        { id: 'ground_verification' as ActiveTab, label: t.validationQueue, icon: CheckSquare }
      ]
    },
    {
      group: 'REPORTS',
      items: [
        { id: 'impact_assessment' as ActiveTab, label: t.impactAssessment, icon: Activity },
        { id: 'reports' as ActiveTab, label: t.reports, icon: FileText }
      ]
    },
    {
      group: 'ADMINISTRATION',
      items: [
        { id: 'data_sources' as ActiveTab, label: t.dataSources, icon: Database },
        { id: 'ai_model_status' as ActiveTab, label: t.aiModelStatus, icon: Cpu },
        { id: 'users' as ActiveTab, label: t.users, icon: Users },
        { id: 'settings' as ActiveTab, label: t.settings, icon: Settings }
      ]
    }
  ];

  return (
    <aside 
      className={`bg-[#EDEEEF] border-r border-[#C1C8C2] flex flex-col h-full shrink-0 transition-all duration-200 ease-in-out relative z-20 ${
        isCollapsed ? 'w-16' : 'w-64 lg:w-72'
      }`}
    >
      {/* Primary Action Button */}
      <div className="p-3 border-b border-[#DEE2E6] bg-[#FFFFFF]">
        <button
          onClick={onOpenNewAssessment}
          className="w-full bg-[#1B4332] text-white hover:bg-[#012D1D] transition-colors rounded py-2.5 px-3 flex items-center justify-center gap-2 font-semibold text-xs shadow-sm"
          title="Create New Environmental Assessment"
        >
          <PlusCircle className="w-4 h-4 shrink-0 text-[#A5D0B9]" />
          {!isCollapsed && <span className="truncate">{t.newAssessment}</span>}
        </button>
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {navItems.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-2.5 py-1 text-[10px] font-bold text-[#717973] uppercase tracking-wider">
                {group.group}
              </div>
            )}

            {group.items.map((item, iIdx) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={iIdx}
                  onClick={() => {
                    if (item.isAction) {
                      onOpenNewAssessment();
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  title={item.label}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-xs transition-colors text-left ${
                    isActive
                      ? 'bg-[#1B4332] text-white font-semibold shadow-xs'
                      : 'text-[#414844] hover:bg-[#E1E3E4] hover:text-[#012D1D]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C1ECD4]' : 'text-[#5B5F63]'}`} />
                  
                  {!isCollapsed && (
                    <span className="truncate flex-1">
                      {item.label}
                    </span>
                  )}

                  {!isCollapsed && item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tight shrink-0 ${
                      item.badgeColor || 'bg-[#C1ECD4] text-[#002114]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-[#DEE2E6] flex justify-end bg-[#F8F9FA]">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded text-[#5B5F63] hover:bg-[#E1E3E4] hover:text-[#191C1D] transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Section: SYSTEM STATUS */}
      {!isCollapsed && (
        <div className="p-3 border-t border-[#C1C8C2] bg-[#FFFFFF] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#414844]">
            <span className="uppercase tracking-wider text-[10px] text-[#717973]">{t.systemStatus}</span>
            <span className="flex items-center gap-1 text-[#1B5E20] font-medium text-[10px]">
              <span className="w-2 h-2 rounded-full bg-[#1B5E20] animate-pulse" />
              All Systems OK
            </span>
          </div>

          <div className="space-y-1 text-[11px] font-medium text-[#5B5F63]">
            <div className="flex items-center justify-between py-0.5 border-b border-[#F1F3F4]">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-[#1B4332]" />
                AI Services
              </span>
              <span className="text-[#1B5E20] text-[10px] font-semibold bg-[#E8F5E9] px-1.5 py-0.2 rounded border border-[#C8E6C9]">
                {t.operational}
              </span>
            </div>

            <div className="flex items-center justify-between py-0.5 border-b border-[#F1F3F4]">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-[#1B4332]" />
                GIS Services
              </span>
              <span className="text-[#1B5E20] text-[10px] font-semibold bg-[#E8F5E9] px-1.5 py-0.2 rounded border border-[#C8E6C9]">
                {t.operational}
              </span>
            </div>

            <div className="flex items-center justify-between py-0.5">
              <span className="flex items-center gap-1.5">
                <Database className="w-3 h-3 text-[#1B4332]" />
                Data Services
              </span>
              <span className="text-[#1B5E20] text-[10px] font-semibold bg-[#E8F5E9] px-1.5 py-0.2 rounded border border-[#C8E6C9]">
                {t.operational}
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

import React from 'react';
import { 
  ProjectAssessment, 
  ActiveTab, 
  RouteAlternative, 
  TreeRecord, 
  WildlifeObservation 
} from '../../types';
import { 
  FolderGit2, 
  Calendar, 
  MapPin, 
  Building, 
  ArrowUpRight, 
  Trees, 
  GitFork, 
  ShieldCheck, 
  Activity, 
  Droplets, 
  PawPrint, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { GisMap } from '../gis/GisMap';

interface ProjectDetailViewProps {
  project: ProjectAssessment;
  routes: RouteAlternative[];
  trees: TreeRecord[];
  wildlife: WildlifeObservation[];
  setActiveTab: (tab: ActiveTab) => void;
  language: 'en' | 'hi';
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  routes,
  trees,
  wildlife,
  setActiveTab,
  language
}) => {
  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DEE2E6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded border border-[#C8E6C9]">
              {project.id}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              project.risk === 'High' 
                ? 'bg-[#FFEBEE] text-[#B71C1C] border border-[#FFCDD2]' 
                : 'bg-[#FFF8E1] text-[#F57F17] border border-[#FFECB3]'
            }`}>
              {project.risk} Environmental Risk
            </span>
            <span className="text-xs text-[#5B5F63]">•</span>
            <span className="text-xs text-[#191C1D] font-medium">{project.status}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#191C1D] mt-1">
            {project.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F63] mt-0.5">
            {project.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('alternative_routes')}
            className="bg-[#1B4332] text-white hover:bg-[#012D1D] transition-colors py-2 px-3.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs"
          >
            <GitFork className="w-4 h-4 text-[#A5D0B9]" />
            <span>Open Alternative Route Optimization</span>
          </button>
        </div>
      </div>

      {/* Project Meta Attributes Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded border border-[#DEE2E6] text-xs shadow-2xs">
        <div>
          <span className="text-[10px] text-[#717973] uppercase font-bold block">Authority / Proponent</span>
          <strong className="text-[#191C1D]">{project.authority}</strong>
        </div>
        <div>
          <span className="text-[10px] text-[#717973] uppercase font-bold block">Forest Division / State</span>
          <strong className="text-[#191C1D]">{project.forestDivision}, {project.state}</strong>
        </div>
        <div>
          <span className="text-[10px] text-[#717973] uppercase font-bold block">Infrastructure Category</span>
          <strong className="text-[#191C1D]">{project.type}</strong>
        </div>
        <div>
          <span className="text-[10px] text-[#717973] uppercase font-bold block">Last Assessment Update</span>
          <strong className="text-[#191C1D] font-mono">{project.lastUpdated}</strong>
        </div>
      </div>

      {/* Mini GIS Map + Key Modules Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive GIS Quick View (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#DEE2E6] rounded p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#DEE2E6] pb-2 text-xs">
            <span className="font-bold text-[#012D1D] uppercase tracking-wider">
              Project Geographic Corridors
            </span>
            <button
              onClick={() => setActiveTab('gis_map')}
              className="text-[#1B4332] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Full Screen GIS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <GisMap
            project={project}
            routes={routes}
            trees={trees.slice(0, 15)}
            wildlife={wildlife}
            heightClass="h-[360px]"
          />
        </div>

        {/* Right: Quick Action Assessment Modules (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div 
            onClick={() => setActiveTab('alternative_routes')}
            className="bg-white border-2 border-[#81C784] hover:border-[#1B4332] rounded p-3.5 cursor-pointer transition-all shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded bg-[#E8F5E9] text-[#1B5E20] flex items-center justify-center font-bold">
                  <GitFork className="w-4 h-4" />
                </span>
                <h4 className="font-bold text-xs text-[#012D1D] group-hover:text-[#1B4332]">
                  Alternative Route Analysis (Flagship)
                </h4>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#1B4332]" />
            </div>
            <p className="text-[11px] text-[#5B5F63] mt-2">
              Alternative B reduces tree felling by <strong>66.7%</strong> (700 vs 2,100) and lowers modeled ecological impact from 82 to 43.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('tree_inventory')}
            className="bg-white border border-[#DEE2E6] hover:border-[#1B4332] rounded p-3.5 cursor-pointer transition-all shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded bg-[#C1ECD4] text-[#012D1D] flex items-center justify-center font-bold">
                  <Trees className="w-4 h-4" />
                </span>
                <h4 className="font-bold text-xs text-[#191C1D] group-hover:text-[#1B4332]">
                  Tree Inventory & Enumeration
                </h4>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#5B5F63]" />
            </div>
            <p className="text-[11px] text-[#5B5F63] mt-1.5">
              <strong>{project.metrics.treesInCorridor} trees</strong> inside proposed corridor. {project.metrics.treesVerified} verified by forest field staff.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('ground_verification')}
            className="bg-white border border-[#DEE2E6] hover:border-[#1B4332] rounded p-3.5 cursor-pointer transition-all shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded bg-[#FFDCC2] text-[#6D3A00] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <h4 className="font-bold text-xs text-[#191C1D] group-hover:text-[#1B4332]">
                  Ground Verification Queue
                </h4>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#5B5F63]" />
            </div>
            <p className="text-[11px] text-[#5B5F63] mt-1.5">
              <strong>{project.metrics.treesPendingVerification} locations</strong> awaiting physical field inspection & RTK-GPS audit.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('impact_assessment')}
            className="bg-white border border-[#DEE2E6] hover:border-[#1B4332] rounded p-3.5 cursor-pointer transition-all shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded bg-[#E3F2FD] text-[#0D47A1] flex items-center justify-center font-bold">
                  <Activity className="w-4 h-4" />
                </span>
                <h4 className="font-bold text-xs text-[#191C1D] group-hover:text-[#1B4332]">
                  Environmental Impact Assessment (EIA)
                </h4>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#5B5F63]" />
            </div>
            <p className="text-[11px] text-[#5B5F63] mt-1.5">
              Detailed ecological matrix, statutory compliance, and official MoEFCC Forest Diversion dossier generator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

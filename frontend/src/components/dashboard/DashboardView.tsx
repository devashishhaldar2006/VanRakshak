import React, { useState } from 'react';
import { 
  Plus, 
  Download, 
  Calendar, 
  Search, 
  ChevronRight, 
  FolderGit2, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  Filter,
  ShieldCheck,
  Trees,
  TrendingDown,
  Layers
} from 'lucide-react';
import { ProjectAssessment, ActiveTab } from '../../types';
import { translations } from '../../data/translations';

interface DashboardViewProps {
  projects: ProjectAssessment[];
  onSelectProject: (project: ProjectAssessment) => void;
  onOpenNewAssessment: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  language: 'en' | 'hi';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  onSelectProject,
  onOpenNewAssessment,
  setActiveTab,
  language
}) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ProjectAssessment['status']) => {
    switch (status) {
      case 'Assessment in Progress':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#E3F2FD] text-[#0D47A1] border border-[#BBDEFB]">
            {status}
          </span>
        );
      case 'Ground Verification':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]">
            {status}
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#E0F2F1] text-[#004D40] border border-[#B2DFDB]">
            {status}
          </span>
        );
      case 'Requires Attention':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#FFF3E0] text-[#E65100] border border-[#FFE0B2]">
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#ECEFF1] text-[#37474F] border border-[#CFD8DC]">
            {status}
          </span>
        );
    }
  };

  const getRiskBadge = (risk: ProjectAssessment['risk']) => {
    switch (risk) {
      case 'High':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-[#FFEBEE] text-[#B71C1C] border border-[#FFCDD2]">
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#FFF8E1] text-[#F57F17] border border-[#FFECB3]">
            Medium
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#F5F5F5] text-[#424242] border border-[#E0E0E0]">
            Low
          </span>
        );
    }
  };

  return (
    <div id="main-content" className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Top Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DEE2E6]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#191C1D]">
            Environmental Assessment Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F63] mt-0.5">
            Overview of proposed infrastructure projects and ecological impact assessments across forest divisions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            onClick={() => alert('Date filter applied: Current Financial Year 2026-27.')}
            className="bg-[#FFFFFF] text-[#5B5F63] border border-[#DEE2E6] hover:bg-[#F8F9FA] transition-colors py-2 px-3 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.dateRange}</span>
          </button>

          <button 
            onClick={() => setActiveTab('reports')}
            className="bg-[#FFFFFF] text-[#1B4332] border border-[#DEE2E6] hover:bg-[#F8F9FA] transition-colors py-2 px-3 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.exportReport}</span>
          </button>

          <button
            onClick={onOpenNewAssessment}
            className="bg-[#1B4332] text-white hover:bg-[#012D1D] transition-colors py-2 px-4 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4 text-[#A5D0B9]" />
            <span>{t.newAssessment}</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Projects */}
        <div className="bg-white border border-[#DEE2E6] rounded p-4 flex flex-col justify-between h-[124px] shadow-2xs">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">
              {t.activeProjects}
            </span>
            <span className="w-8 h-8 rounded bg-[#C1ECD4] text-[#012D1D] flex items-center justify-center shrink-0">
              <FolderGit2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#191C1D]">24</span>
            <span className="text-xs text-[#1B5E20] font-semibold bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#C8E6C9]">
              +3 this month
            </span>
          </div>
        </div>

        {/* Card 2: Assessments Completed */}
        <div className="bg-white border border-[#DEE2E6] rounded p-4 flex flex-col justify-between h-[124px] shadow-2xs">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">
              {t.assessmentsCompleted}
            </span>
            <span className="w-8 h-8 rounded bg-[#C1ECD4] text-[#012D1D] flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#191C1D]">118</span>
            <span className="text-xs text-[#5B5F63]">Cumulative</span>
          </div>
        </div>

        {/* Card 3: Awaiting Ground Verification */}
        <div className="bg-white border border-[#DEE2E6] rounded p-4 flex flex-col justify-between h-[124px] shadow-2xs">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">
              {t.awaitingVerification}
            </span>
            <span className="w-8 h-8 rounded bg-[#FFDCC2] text-[#6D3A00] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#191C1D]">17</span>
            <span className="text-xs text-[#B45309] font-medium">Locations in Queue</span>
          </div>
        </div>

        {/* Card 4: High Sensitivity Projects */}
        <div className="bg-white border border-[#DEE2E6] rounded p-4 flex flex-col justify-between h-[124px] border-l-4 border-l-[#BA1A1A] shadow-2xs">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">
              {t.highSensitivity}
            </span>
            <span className="w-8 h-8 rounded bg-[#FFDAD6] text-[#93000A] flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#191C1D]">6</span>
            <span className="text-xs text-[#BA1A1A] font-semibold">
              {t.requiresAttention}
            </span>
          </div>
        </div>
      </div>

      {/* Flagship Notice & Workflow Highlights */}
      <div className="bg-[#FFFFFF] border border-[#DEE2E6] rounded p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded bg-[#1B4332] text-white flex items-center justify-center shrink-0 mt-0.5">
            <Trees className="w-5 h-5 text-[#A5D0B9]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[#012D1D] text-sm">
                Featured Flagship Tool: Alternative Route Optimization
              </h3>
              <span className="bg-[#E8F5E9] text-[#1B5E20] text-[10px] font-bold px-1.5 py-0.2 rounded border border-[#C8E6C9]">
                Interactive GIS
              </span>
            </div>
            <p className="text-xs text-[#5B5F63] mt-0.5">
              Compare original proposed infrastructure corridors against low-impact re-alignments with real-time tree enumeration and sensitivity modeling.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('alternative_routes')}
          className="bg-[#012D1D] text-white hover:bg-[#1B4332] transition-colors py-2 px-3 rounded text-xs font-semibold flex items-center gap-1.5 shrink-0"
        >
          <span>Open Route Analysis</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Recent Project Assessments Table */}
      <div className="bg-white border border-[#DEE2E6] rounded flex flex-col shadow-2xs">
        {/* Table Header Controls */}
        <div className="px-4 py-3 border-b border-[#DEE2E6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8F9FA]">
          <div>
            <h3 className="font-bold text-[#191C1D] text-sm">
              {t.recentAssessments}
            </h3>
            <span className="text-[11px] text-[#5B5F63]">
              Listing of ongoing Forest Clearance & Diversion Proposals under MoEFCC guidelines
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#5B5F63]" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-[#DEE2E6] rounded focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] w-56 sm:w-64 transition-all"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-[#DEE2E6] rounded px-2.5 py-1.5 text-xs text-[#5B5F63] font-medium focus:outline-none focus:border-[#1B4332]"
            >
              <option value="ALL">All Statuses</option>
              <option value="Assessment in Progress">Assessment in Progress</option>
              <option value="Ground Verification">Ground Verification</option>
              <option value="Completed">Completed</option>
              <option value="Requires Attention">Requires Attention</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[840px]">
            <thead className="bg-[#F8F9FA] border-b border-[#DEE2E6] text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider sticky top-0">
              <tr>
                <th className="py-2.5 px-4 w-32">Project ID</th>
                <th className="py-2.5 px-4">Project Name</th>
                <th className="py-2.5 px-4 w-36">Project Type</th>
                <th className="py-2.5 px-4 w-36">Location</th>
                <th className="py-2.5 px-4 w-44">{t.status}</th>
                <th className="py-2.5 px-4 w-28">{t.envRisk}</th>
                <th className="py-2.5 px-4 w-32">{t.lastUpdated}</th>
                <th className="py-2.5 px-4 w-16 text-center">{t.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEE2E6] text-xs font-sans text-[#191C1D]">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#5B5F63]">
                    No project assessments found matching "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filteredProjects.map((proj) => (
                  <tr 
                    key={proj.id} 
                    onClick={() => {
                      onSelectProject(proj);
                      setActiveTab('project_detail');
                    }}
                    className="gov-table-row cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-mono font-semibold text-[#1B4332]">
                      {proj.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#191C1D] group-hover:text-[#1B4332] transition-colors">
                        {proj.name}
                      </div>
                      <div className="text-[11px] text-[#5B5F63] truncate max-w-xs">
                        {proj.authority}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#5B5F63]">
                      {proj.type}
                    </td>
                    <td className="py-3 px-4 text-[#5B5F63]">
                      <div className="font-medium text-[#191C1D]">{proj.state}</div>
                      <div className="text-[10px] text-[#717973]">{proj.district}</div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(proj.status)}
                    </td>
                    <td className="py-3 px-4">
                      {getRiskBadge(proj.risk)}
                    </td>
                    <td className="py-3 px-4 text-[#5B5F63] font-mono text-[11px]">
                      {proj.lastUpdated}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(proj);
                          setActiveTab('project_detail');
                        }}
                        className="text-[#5B5F63] group-hover:text-[#1B4332] p-1 rounded hover:bg-[#E1E3E4] transition-colors"
                        title={t.viewDetails}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="px-4 py-2.5 border-t border-[#DEE2E6] bg-[#F8F9FA] flex items-center justify-between text-xs text-[#5B5F63]">
          <span>Showing 1 to {filteredProjects.length} of {projects.length} entries</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded border border-[#DEE2E6] text-[#717973] disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-2.5 py-1 rounded bg-[#1B4332] text-white font-semibold">
              1
            </button>
            <button className="px-2 py-1 rounded border border-[#DEE2E6] text-[#5B5F63] hover:bg-white">
              2
            </button>
            <button className="px-2 py-1 rounded border border-[#DEE2E6] text-[#5B5F63] hover:bg-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Activity, 
  Trees, 
  Droplets, 
  PawPrint, 
  Eye, 
  Mountain, 
  GitPullRequest, 
  Download, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Info
} from 'lucide-react';
import { ProjectAssessment, RouteAlternative } from '../../types';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

interface ImpactAssessmentViewProps {
  project: ProjectAssessment;
  routes: RouteAlternative[];
  onOpenDetailedReport: () => void;
  language: 'en' | 'hi';
}

export const ImpactAssessmentView: React.FC<ImpactAssessmentViewProps> = ({
  project,
  routes,
  onOpenDetailedReport,
  language
}) => {
  const proposed = routes.find(r => r.code === 'PROPOSED') || routes[0];
  const altB = routes.find(r => r.code === 'ALT_B') || routes[2];

  const impactMatrix = [
    { category: 'Tree Crown & Biomass Loss', proposed: 88, altB: 32, unit: 'Loss Index (0-100)', threshold: '60 max' },
    { category: 'Vegetation & Canopy Fragmentation', proposed: 76, altB: 28, unit: 'Fragmentation Index', threshold: '50 max' },
    { category: 'Wildlife Corridor Disruption', proposed: 84, altB: 22, unit: 'Ecological Resistance', threshold: '40 max' },
    { category: 'Aquatic Catchment Disturbance', proposed: 70, altB: 35, unit: 'Siltation Risk Index', threshold: '50 max' },
    { category: 'Slope Instability & Earthwork', proposed: 68, altB: 42, unit: 'Landslide Risk Score', threshold: '55 max' },
    { category: 'Habitat Core Perforation', proposed: 92, altB: 30, unit: 'Buffer Perforation %', threshold: '45 max' }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DEE2E6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded border border-[#C8E6C9]">
              {project.id}
            </span>
            <span className="text-xs text-[#5B5F63]">•</span>
            <span className="text-xs text-[#5B5F63] font-medium">{project.name}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#191C1D] mt-1">
            Environmental Impact Assessment (EIA)
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F63] mt-0.5">
            Integrated ecological impact modeling for forest diversion clearance under the Forest (Conservation) Act, 1980.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDetailedReport}
            className="bg-[#1B4332] text-white hover:bg-[#012D1D] transition-colors py-2 px-3.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Full Statutory Report</span>
          </button>
        </div>
      </div>

      {/* 6 Executive Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-[#DEE2E6] rounded p-3 shadow-2xs">
          <span className="text-[10px] font-bold text-[#5B5F63] uppercase tracking-wider block">Forest Area Affected</span>
          <div className="text-xl font-bold text-[#191C1D] mt-1 font-mono">{project.metrics.forestAreaHa} ha</div>
          <span className="text-[10px] text-[#5B5F63]">Reserve Forest 4B</span>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-3 shadow-2xs">
          <span className="text-[10px] font-bold text-[#5B5F63] uppercase tracking-wider block">Trees Affected</span>
          <div className="text-xl font-bold text-[#D32F2F] mt-1 font-mono">{project.metrics.treesInCorridor}</div>
          <span className="text-[10px] text-[#D32F2F]">Proposed DPR</span>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-3 shadow-2xs">
          <span className="text-[10px] font-bold text-[#5B5F63] uppercase tracking-wider block">Water Crossings</span>
          <div className="text-xl font-bold text-[#0288D1] mt-1 font-mono">{project.metrics.waterCrossings}</div>
          <span className="text-[10px] text-[#5B5F63]">Catchments</span>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-3 shadow-2xs border-l-3 border-l-[#B71C1C]">
          <span className="text-[10px] font-bold text-[#5B5F63] uppercase tracking-wider block">High Sensitivity</span>
          <div className="text-xl font-bold text-[#B71C1C] mt-1 font-mono">{project.metrics.highSensitivityZones}</div>
          <span className="text-[10px] text-[#B71C1C]">Core Zones</span>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-3 shadow-2xs">
          <span className="text-[10px] font-bold text-[#5B5F63] uppercase tracking-wider block">Wildlife Evidence</span>
          <div className="text-xl font-bold text-[#191C1D] mt-1 font-mono">{project.metrics.wildlifeEvidenceCount}</div>
          <span className="text-[10px] text-[#5B5F63]">GPS Field Points</span>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-3 shadow-2xs">
          <span className="text-[10px] font-bold text-[#5B5F63] uppercase tracking-wider block">Fragmentation</span>
          <div className="text-xl font-bold text-[#F57F17] mt-1 font-mono">{project.metrics.fragmentationIndex}</div>
          <span className="text-[10px] text-[#F57F17]">Landscape Disruption</span>
        </div>
      </div>

      {/* Impact Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#DEE2E6] rounded flex flex-col shadow-2xs">
          <div className="px-4 py-3 border-b border-[#DEE2E6] bg-[#F8F9FA] flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#012D1D]">
              Ecological Impact Factor Breakdown & Threshold Adherence
            </h3>
            <span className="text-[10px] text-[#5B5F63]">MoEFCC Schedule I & II Norms</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-[#F8F9FA] border-b border-[#DEE2E6] text-[11px] font-bold text-[#5B5F63] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Impact Category</th>
                  <th className="py-2.5 px-3 text-[#D32F2F]">Proposed DPR</th>
                  <th className="py-2.5 px-3 text-[#1B5E20]">Alt B (Rec.)</th>
                  <th className="py-2.5 px-3">Statutory Ceil</th>
                  <th className="py-2.5 px-3">Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEE2E6] text-xs font-medium text-[#191C1D]">
                {impactMatrix.map((item, idx) => (
                  <tr key={idx} className="gov-table-row">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-[#012D1D]">{item.category}</div>
                      <div className="text-[10px] text-[#717973]">{item.unit}</div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#D32F2F]">
                      {item.proposed} / 100
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#1B5E20]">
                      {item.altB} / 100
                    </td>
                    <td className="py-3 px-3 font-mono text-[#5B5F63]">
                      {item.threshold}
                    </td>
                    <td className="py-3 px-3">
                      {item.altB <= 40 ? (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#E8F5E9] text-[#1B5E20]">
                          Within Norms
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FFF8E1] text-[#F57F17]">
                          Mitigation Req.
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison Radar & Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#DEE2E6] rounded p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#DEE2E6] pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#012D1D]">
              Modeled Impact Signature (Lower is Better)
            </h3>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={impactMatrix.map(m => ({
                category: m.category.split(' ')[0],
                Proposed: m.proposed,
                'Alternative B': m.altB
              }))}>
                <PolarGrid stroke="#DEE2E6" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 10, fill: '#5B5F63' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Proposed DPR" dataKey="Proposed" stroke="#D32F2F" fill="#D32F2F" fillOpacity={0.3} />
                <Radar name="Alternative B" dataKey="Alternative B" stroke="#1B5E20" fill="#1B5E20" fillOpacity={0.3} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#E8F5E9] p-3 rounded border border-[#C8E6C9] text-xs text-[#1B5E20] space-y-1">
            <div className="font-bold uppercase tracking-wider text-[10px]">Overall Modeled Impact Index</div>
            <div className="flex items-baseline justify-between">
              <span>Proposed DPR: <strong className="text-[#D32F2F] font-mono">82 / 100 (High Risk)</strong></span>
              <span>Alt B: <strong className="text-[#1B5E20] font-mono">43 / 100 (Acceptable)</strong></span>
            </div>
            <div className="text-[11px] text-[#2E7D32] pt-1 border-t border-[#C8E6C9]/60">
              Alternative B reduces cumulative ecological damage score by <strong>47.5%</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  GitFork, 
  ShieldCheck, 
  AlertTriangle, 
  Trees, 
  Droplets, 
  PawPrint, 
  Mountain, 
  Check, 
  ArrowRight, 
  Download, 
  Info,
  Maximize2,
  FileCheck,
  TrendingDown,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { 
  ProjectAssessment, 
  RouteAlternative, 
  TreeRecord, 
  WildlifeObservation, 
  GroundVerificationItem 
} from '../../types';
import { GisMap } from '../gis/GisMap';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';

interface AlternativeRouteViewProps {
  project: ProjectAssessment;
  routes: RouteAlternative[];
  trees: TreeRecord[];
  wildlife: WildlifeObservation[];
  groundVerifications: GroundVerificationItem[];
  language: 'en' | 'hi';
}

export const AlternativeRouteView: React.FC<AlternativeRouteViewProps> = ({
  project,
  routes,
  trees,
  wildlife,
  groundVerifications,
  language
}) => {
  const [selectedRouteCode, setSelectedRouteCode] = useState<'PROPOSED' | 'ALT_A' | 'ALT_B' | 'ALL'>('ALL');
  const [comparisonMetricTab, setComparisonMetricTab] = useState<'table' | 'radar' | 'cost_eco'>('table');

  const proposedRoute = routes.find(r => r.code === 'PROPOSED') || routes[0];
  const altA = routes.find(r => r.code === 'ALT_A') || routes[1];
  const altB = routes.find(r => r.code === 'ALT_B') || routes[2];

  // Radar Data for Multi-Dimensional Ecological Trade-offs
  const radarData = [
    { subject: 'Tree Preservation', Proposed: 20, 'Alt A': 55, 'Alt B': 85, fullMark: 100 },
    { subject: 'Habitat Safety', Proposed: 18, 'Alt A': 48, 'Alt B': 88, fullMark: 100 },
    { subject: 'Hydrological Safety', Proposed: 30, 'Alt A': 60, 'Alt B': 82, fullMark: 100 },
    { subject: 'Wildlife Buffer', Proposed: 15, 'Alt A': 50, 'Alt B': 90, fullMark: 100 },
    { subject: 'Slope Stability', Proposed: 35, 'Alt A': 65, 'Alt B': 75, fullMark: 100 },
    { subject: 'Engineering Ease', Proposed: 80, 'Alt A': 70, 'Alt B': 68, fullMark: 100 }
  ];

  // Bar Chart comparison of Potentially Affected Trees
  const treeBarData = [
    { name: 'Proposed DPR', trees: proposedRoute.treesAffected, forestArea: proposedRoute.forestAreaHa, impactScore: proposedRoute.modeledEcologicalImpact },
    { name: 'Alternative A', trees: altA?.treesAffected || 1050, forestArea: altA?.forestAreaHa || 11.1, impactScore: altA?.modeledEcologicalImpact || 61 },
    { name: 'Alternative B (Rec.)', trees: altB?.treesAffected || 700, forestArea: altB?.forestAreaHa || 9.8, impactScore: altB?.modeledEcologicalImpact || 43 }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
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
            Alternative Route Analysis & Low-Impact Optimization
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F63] mt-0.5">
            Multi-criteria GIS evaluation comparing proposed engineering alignment against ecologically optimized diversion corridors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Generating Alternative Alignment Comparative Dossier (PDF)...')}
            className="bg-white text-[#1B4332] border border-[#DEE2E6] hover:bg-[#F8F9FA] transition-colors py-2 px-3 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Route Dossier</span>
          </button>
        </div>
      </div>

      {/* Main Split View: GIS Map on Left, Route Evaluation on Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Interactive GIS Map (7 cols) */}
        <div className="xl:col-span-7 space-y-3">
          <div className="flex items-center justify-between bg-[#F8F9FA] px-3 py-2 border border-[#DEE2E6] rounded text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#012D1D]">GIS Map Viewport</span>
              <span className="text-[#C1C8C2]">|</span>
              <span className="text-[#5B5F63]">Interactive Layer Alignment</span>
            </div>

            {/* Route Filter Selector */}
            <div className="flex items-center gap-1 bg-white border border-[#DEE2E6] rounded p-0.5 text-[11px]">
              <button
                onClick={() => setSelectedRouteCode('ALL')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                  selectedRouteCode === 'ALL' ? 'bg-[#1B4332] text-white' : 'text-[#5B5F63] hover:text-[#191C1D]'
                }`}
              >
                All Corridors
              </button>
              <button
                onClick={() => setSelectedRouteCode('PROPOSED')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                  selectedRouteCode === 'PROPOSED' ? 'bg-[#D32F2F] text-white' : 'text-[#5B5F63] hover:text-[#191C1D]'
                }`}
              >
                Proposed
              </button>
              <button
                onClick={() => setSelectedRouteCode('ALT_A')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                  selectedRouteCode === 'ALT_A' ? 'bg-[#F57F17] text-white' : 'text-[#5B5F63] hover:text-[#191C1D]'
                }`}
              >
                Alt A
              </button>
              <button
                onClick={() => setSelectedRouteCode('ALT_B')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                  selectedRouteCode === 'ALT_B' ? 'bg-[#1B5E20] text-white' : 'text-[#5B5F63] hover:text-[#191C1D]'
                }`}
              >
                Alt B (Rec.)
              </button>
            </div>
          </div>

          {/* GIS Map Central Component */}
          <GisMap
            project={project}
            routes={routes}
            trees={trees}
            wildlife={wildlife}
            groundVerifications={groundVerifications}
            activeRouteCode={selectedRouteCode}
            onSelectRoute={(code) => setSelectedRouteCode(code)}
            heightClass="h-[520px]"
          />

          {/* Route Legend Indicator Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => setSelectedRouteCode('PROPOSED')}
              className={`p-2.5 rounded border text-left transition-colors flex items-center justify-between ${
                selectedRouteCode === 'PROPOSED' ? 'bg-[#FFEBEE] border-[#FFCDD2] shadow-2xs' : 'bg-white border-[#DEE2E6] hover:bg-[#F8F9FA]'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 font-bold text-[#D32F2F]">
                  <span className="w-2.5 h-0.5 bg-[#D32F2F] border border-[#D32F2F]" />
                  Proposed Route
                </div>
                <div className="text-[11px] text-[#5B5F63] mt-0.5">Impact: <strong className="text-[#B71C1C]">High (82)</strong></div>
              </div>
            </button>

            <button
              onClick={() => setSelectedRouteCode('ALT_A')}
              className={`p-2.5 rounded border text-left transition-colors flex items-center justify-between ${
                selectedRouteCode === 'ALT_A' ? 'bg-[#FFF8E1] border-[#FFE082] shadow-2xs' : 'bg-white border-[#DEE2E6] hover:bg-[#F8F9FA]'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 font-bold text-[#F57F17]">
                  <span className="w-2.5 h-0.5 bg-[#F57F17]" />
                  Alternative A
                </div>
                <div className="text-[11px] text-[#5B5F63] mt-0.5">Impact: <strong className="text-[#F57F17]">Medium (61)</strong></div>
              </div>
            </button>

            <button
              onClick={() => setSelectedRouteCode('ALT_B')}
              className={`p-2.5 rounded border text-left transition-colors flex items-center justify-between ${
                selectedRouteCode === 'ALT_B' ? 'bg-[#E8F5E9] border-[#C8E6C9] shadow-2xs' : 'bg-white border-[#DEE2E6] hover:bg-[#F8F9FA]'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 font-bold text-[#1B5E20]">
                  <span className="w-2.5 h-0.5 bg-[#1B5E20]" />
                  Alternative B
                </div>
                <div className="text-[11px] text-[#1B5E20] mt-0.5 font-semibold">Recommended (43)</div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Comparative Evaluation & Explainable AI (5 cols) */}
        <div className="xl:col-span-5 space-y-4">
          {/* Highlight Recommendation Banner */}
          <div className="bg-[#E8F5E9] border-2 border-[#81C784] rounded p-4 shadow-xs">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1B5E20] text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B5E20]">
                  LOWER MODELED ECOLOGICAL IMPACT
                </span>
              </div>
              <span className="bg-[#1B5E20] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                Alternative B
              </span>
            </div>

            <p className="text-xs font-semibold text-[#004D40] mt-2">
              Recommended for further evaluation
            </p>
            <p className="text-[11px] text-[#2E7D32] mt-0.5 leading-relaxed">
              Recommendation is based on modeled ecological and engineering constraints and requires competent-authority review.
            </p>
          </div>

          {/* Explainable Recommendation Panel: Why this alternative is recommended */}
          <div className="bg-white border border-[#DEE2E6] rounded p-4 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#DEE2E6] pb-2">
              <h3 className="font-bold text-[#191C1D] text-xs uppercase tracking-wider">
                Why this alternative is recommended for further evaluation
              </h3>
              <span className="text-[10px] text-[#5B5F63] font-mono">Model Conf: 96.0%</span>
            </div>

            <ul className="space-y-2 text-xs text-[#191C1D]">
              <li className="flex items-start gap-2">
                <span className="text-[#1B5E20] font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-[#012D1D]">Lower number of potentially affected trees:</strong>
                  <div className="text-[11px] text-[#5B5F63]">
                    Reduces mature timber felling from <strong>2,100 trees</strong> (Proposed DPR) to <strong>700 trees</strong> (66.7% preservation).
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-[#1B5E20] font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-[#012D1D]">Reduced intersection with high-sensitivity habitat:</strong>
                  <div className="text-[11px] text-[#5B5F63]">
                    Sensitive zone crossing reduced to <strong>1.9 km</strong> (versus 11.4 km in Proposed alignment).
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-[#1B5E20] font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-[#012D1D]">Fewer water crossings:</strong>
                  <div className="text-[11px] text-[#5B5F63]">
                    Crosses only <strong>3 perennial streams</strong> instead of 7, reducing sediment runoff and riparian damage.
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-[#1B5E20] font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-[#012D1D]">Reduced wildlife corridor intersection:</strong>
                  <div className="text-[11px] text-[#5B5F63]">
                    Bypasses primary nocturnal ungulate and leopard movement gulley at KM 18-22.
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-[#1B5E20] font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-[#012D1D]">Within specified engineering constraints:</strong>
                  <div className="text-[11px] text-[#5B5F63]">
                    Max slope gradient is <strong>11.8%</strong> (well below MoRTH 15.0% mountain gradient ceiling).
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-[#1B5E20] font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-[#012D1D]">Lower modeled ecological impact:</strong>
                  <div className="text-[11px] text-[#5B5F63]">
                    Comprehensive ecological impact score of <strong>43 / 100</strong> (versus 82 / 100 for Proposed alignment).
                  </div>
                </div>
              </li>
            </ul>

            {/* Scientific Responsibility Disclaimer */}
            <div className="bg-[#FFF8E1] border border-[#FFE082] rounded p-2.5 text-[11px] text-[#7F5000] mt-3">
              <div className="flex items-center gap-1 font-bold text-[#5D4037]">
                <Info className="w-3.5 h-3.5" />
                <span>Decision Support Disclaimer</span>
              </div>
              <p className="mt-0.5 leading-tight">
                AI-generated analysis supports assessment and comparison. Final decisions remain subject to field verification and competent-authority approval.
              </p>
            </div>
          </div>

          {/* Comparison View Switcher (Table vs Radar vs Tradeoff) */}
          <div className="bg-white border border-[#DEE2E6] rounded p-3 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#DEE2E6] pb-2">
              <span className="font-bold text-xs text-[#012D1D] uppercase tracking-wider">
                Comparative Route Metrics
              </span>
              <div className="flex gap-1 text-[11px]">
                <button
                  onClick={() => setComparisonMetricTab('table')}
                  className={`px-2 py-0.5 rounded font-semibold ${
                    comparisonMetricTab === 'table' ? 'bg-[#1B4332] text-white' : 'text-[#5B5F63] hover:bg-[#F1F3F4]'
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setComparisonMetricTab('radar')}
                  className={`px-2 py-0.5 rounded font-semibold ${
                    comparisonMetricTab === 'radar' ? 'bg-[#1B4332] text-white' : 'text-[#5B5F63] hover:bg-[#F1F3F4]'
                  }`}
                >
                  Radar Trade-off
                </button>
                <button
                  onClick={() => setComparisonMetricTab('cost_eco')}
                  className={`px-2 py-0.5 rounded font-semibold ${
                    comparisonMetricTab === 'cost_eco' ? 'bg-[#1B4332] text-white' : 'text-[#5B5F63] hover:bg-[#F1F3F4]'
                  }`}
                >
                  Tree & Area Chart
                </button>
              </div>
            </div>

            {comparisonMetricTab === 'table' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#F8F9FA] border-b border-[#DEE2E6] text-[11px] font-bold text-[#5B5F63] uppercase">
                    <tr>
                      <th className="py-2 px-2.5">Metric</th>
                      <th className="py-2 px-2 text-[#D32F2F]">Proposed</th>
                      <th className="py-2 px-2 text-[#F57F17]">Alternative A</th>
                      <th className="py-2 px-2.5 text-[#1B5E20] bg-[#E8F5E9]/50">Alt B (Rec.)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DEE2E6] font-medium text-[#191C1D]">
                    <tr className="gov-table-row">
                      <td className="py-2 px-2.5 text-[#5B5F63]">Route Length</td>
                      <td className="py-2 px-2 font-mono">42.3 km</td>
                      <td className="py-2 px-2 font-mono">44.1 km</td>
                      <td className="py-2 px-2.5 font-mono font-bold text-[#1B5E20] bg-[#E8F5E9]/30">46.2 km</td>
                    </tr>
                    <tr className="gov-table-row">
                      <td className="py-2 px-2.5 text-[#5B5F63]">Trees Potentially Affected</td>
                      <td className="py-2 px-2 font-mono font-bold text-[#B71C1C]">2,100</td>
                      <td className="py-2 px-2 font-mono">1,050</td>
                      <td className="py-2 px-2.5 font-mono font-bold text-[#1B5E20] bg-[#E8F5E9]/30">700 (-66.7%)</td>
                    </tr>
                    <tr className="gov-table-row">
                      <td className="py-2 px-2.5 text-[#5B5F63]">Forest Area</td>
                      <td className="py-2 px-2 font-mono">14.3 ha</td>
                      <td className="py-2 px-2 font-mono">11.1 ha</td>
                      <td className="py-2 px-2.5 font-mono font-bold text-[#1B5E20] bg-[#E8F5E9]/30">9.8 ha</td>
                    </tr>
                    <tr className="gov-table-row">
                      <td className="py-2 px-2.5 text-[#5B5F63]">Water Crossings</td>
                      <td className="py-2 px-2 font-mono text-[#B71C1C]">7</td>
                      <td className="py-2 px-2 font-mono">5</td>
                      <td className="py-2 px-2.5 font-mono font-bold text-[#1B5E20] bg-[#E8F5E9]/30">3</td>
                    </tr>
                    <tr className="gov-table-row">
                      <td className="py-2 px-2.5 text-[#5B5F63]">Wildlife Sensitivity</td>
                      <td className="py-2 px-2 text-[#B71C1C] font-semibold">High</td>
                      <td className="py-2 px-2 text-[#F57F17]">Medium</td>
                      <td className="py-2 px-2.5 text-[#1B5E20] font-bold bg-[#E8F5E9]/30">Low</td>
                    </tr>
                    <tr className="gov-table-row">
                      <td className="py-2 px-2.5 text-[#5B5F63]">Terrain Difficulty</td>
                      <td className="py-2 px-2 text-[#B71C1C]">High</td>
                      <td className="py-2 px-2">Medium</td>
                      <td className="py-2 px-2.5 font-medium bg-[#E8F5E9]/30">Medium</td>
                    </tr>
                    <tr className="gov-table-row">
                      <td className="py-2 px-2.5 text-[#5B5F63]">Estimated Project Cost</td>
                      <td className="py-2 px-2">High</td>
                      <td className="py-2 px-2">Medium</td>
                      <td className="py-2 px-2.5 font-medium bg-[#E8F5E9]/30">Medium</td>
                    </tr>
                    <tr className="bg-[#F8F9FA] font-bold">
                      <td className="py-2.5 px-2.5 text-[#012D1D]">Modeled Ecological Impact</td>
                      <td className="py-2.5 px-2 text-[#B71C1C] font-mono">82 / 100</td>
                      <td className="py-2.5 px-2 text-[#F57F17] font-mono">61 / 100</td>
                      <td className="py-2.5 px-2.5 text-[#1B5E20] font-mono text-sm bg-[#E8F5E9]">43 / 100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {comparisonMetricTab === 'radar' && (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#DEE2E6" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#5B5F63' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <Radar name="Proposed DPR" dataKey="Proposed" stroke="#D32F2F" fill="#D32F2F" fillOpacity={0.2} />
                    <Radar name="Alternative A" dataKey="Alt A" stroke="#F57F17" fill="#F57F17" fillOpacity={0.2} />
                    <Radar name="Alt B (Rec.)" dataKey="Alt B" stroke="#1B5E20" fill="#1B5E20" fillOpacity={0.35} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}

            {comparisonMetricTab === 'cost_eco' && (
              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={treeBarData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ fontSize: 12, backgroundColor: '#FFFFFF', borderColor: '#DEE2E6' }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar yAxisId="left" dataKey="trees" name="Trees Potentially Affected" fill="#2E7D32" />
                    <Bar yAxisId="right" dataKey="impactScore" name="Ecological Impact Score (0-100)" fill="#D84315" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

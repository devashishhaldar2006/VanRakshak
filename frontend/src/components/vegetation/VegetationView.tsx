import React from 'react';
import { 
  Trees as ForestIcon, 
  Layers, 
  TrendingUp, 
  ShieldAlert, 
  Download, 
  Info,
  BarChart2,
  Leaf
} from 'lucide-react';
import { ProjectAssessment } from '../../types';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';

interface VegetationViewProps {
  project: ProjectAssessment;
  language: 'en' | 'hi';
}

export const VegetationView: React.FC<VegetationViewProps> = ({ project }) => {
  // Canopy Density Classification Data (FSI Standard Classification)
  const canopyClasses = [
    { name: 'Very Dense Forest (VDF > 70%)', areaHa: 4.8, percent: 33.5, color: '#0F3D24', impact: 'High Sensitivity' },
    { name: 'Moderately Dense (MDF 40-70%)', areaHa: 5.9, percent: 41.3, color: '#1B5E20', impact: 'Medium Sensitivity' },
    { name: 'Open Forest (OF 10-40%)', areaHa: 2.6, percent: 18.2, color: '#4CAF50', impact: 'Low Sensitivity' },
    { name: 'Scrub & Degraded (< 10%)', areaHa: 1.0, percent: 7.0, color: '#A5D6A7', impact: 'Minimal Sensitivity' }
  ];

  // NDVI Spectral Distribution Data
  const ndviDistribution = [
    { range: '< 0.2 (Non-Veg / Water)', area: 0.6 },
    { range: '0.2 - 0.4 (Sparse Scrub)', area: 1.2 },
    { range: '0.4 - 0.6 (Open Canopy)', area: 2.8 },
    { range: '0.6 - 0.75 (Dense Canopy)', area: 5.4 },
    { range: '> 0.75 (Old-Growth Sal)', area: 4.3 }
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
            Vegetation & Forest Canopy Density Analysis
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F63] mt-0.5">
            Normalized Difference Vegetation Index (NDVI) and FSI standard canopy closure segmentation across the proposed project basin.
          </p>
        </div>

        <button 
          onClick={() => alert('Exporting Vegetation Classification Map & Statistics (PDF)...')}
          className="bg-white text-[#1B4332] border border-[#DEE2E6] hover:bg-[#F8F9FA] transition-colors py-2 px-3 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Canopy Statistics</span>
        </button>
      </div>

      {/* Canopy KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs">
          <div className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">Total Forest Area Studied</div>
          <div className="text-2xl font-bold text-[#191C1D] mt-1 font-mono">{project.metrics.forestAreaHa} ha</div>
          <div className="text-[11px] text-[#5B5F63] mt-0.5">14.3 ha inside proposed alignment</div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs">
          <div className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">Mean NDVI Index</div>
          <div className="text-2xl font-bold text-[#1B5E20] mt-1 font-mono">0.68 ± 0.08</div>
          <div className="text-[11px] text-[#1B5E20] mt-0.5">Sentinel-2 Top of Atmosphere (BOA)</div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs">
          <div className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">Estimated Carbon Biomass</div>
          <div className="text-2xl font-bold text-[#191C1D] mt-1 font-mono">1,842 tC</div>
          <div className="text-[11px] text-[#5B5F63] mt-0.5">128.8 tC/ha above-ground biomass</div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs border-l-4 border-l-[#B71C1C]">
          <div className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">Very Dense Forest (VDF)</div>
          <div className="text-2xl font-bold text-[#B71C1C] mt-1 font-mono">4.8 ha</div>
          <div className="text-[11px] text-[#B71C1C] mt-0.5">Canopy Closure &gt; 70% (Critical)</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Canopy Classification Pie */}
        <div className="bg-white border border-[#DEE2E6] rounded p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#DEE2E6] pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#012D1D]">
              Canopy Density Stratification (FSI Standard)
            </h3>
            <span className="text-[10px] text-[#5B5F63]">CanopyDense-UNet v3.1</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={canopyClasses}
                  dataKey="areaHa"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {canopyClasses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} ha`} contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-[#F1F3F4] text-xs">
            {canopyClasses.map((c, i) => (
              <div key={i} className="flex justify-between items-center text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span>{c.name}</span>
                </span>
                <span className="font-mono font-semibold">{c.areaHa} ha ({c.percent}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* NDVI Distribution Bar */}
        <div className="bg-white border border-[#DEE2E6] rounded p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#DEE2E6] pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#012D1D]">
              NDVI Spectral Frequency Distribution
            </h3>
            <span className="text-[10px] text-[#5B5F63]">Sentinel-2 (10m GSD)</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ndviDistribution} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <XAxis dataKey="range" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 10 }} label={{ value: 'Area (ha)', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} formatter={(val) => [`${val} ha`, 'Area']} />
                <Bar dataKey="area" fill="#1B5E20" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#F8F9FA] p-2.5 rounded border border-[#DEE2E6] text-[11px] text-[#5B5F63] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
            <p>
              High NDVI values (&gt; 0.70) in the central sector (KM 18.0 - 24.5) correspond to primary Shorea robusta (Sal) old-growth stands with dense multilayered canopies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Droplets, 
  Mountain, 
  TrendingUp, 
  AlertTriangle, 
  Download, 
  Info, 
  Waves,
  MapPin
} from 'lucide-react';
import { ProjectAssessment } from '../../types';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

interface WaterTerrainViewProps {
  project: ProjectAssessment;
  language: 'en' | 'hi';
}

export const WaterTerrainView: React.FC<WaterTerrainViewProps> = ({ project }) => {
  // Elevation Profile data along the 42.3 km corridor
  const elevationProfile = [
    { km: '0', elevation: 840, slope: 4.2, feature: 'Chamba Start' },
    { km: '5', elevation: 920, slope: 6.8, feature: 'Lowland Scrub' },
    { km: '10', elevation: 1080, slope: 11.2, feature: 'Ridge Saddle 1' },
    { km: '15', elevation: 1240, slope: 14.5, feature: 'Stream 1 Crossing' },
    { km: '20', elevation: 1480, slope: 18.5, feature: 'Peak Pass (High Slope)' },
    { km: '25', elevation: 1390, slope: 12.1, feature: 'Sal Valley Stream 2' },
    { km: '30', elevation: 1210, slope: 8.4, feature: 'Wetland Intersection' },
    { km: '35', elevation: 1040, slope: 9.6, feature: 'Bhagirathi Gorge Crossing' },
    { km: '40', elevation: 890, slope: 5.1, feature: 'Tehri Valley Approach' },
    { km: '42.3', elevation: 820, slope: 3.5, feature: 'Terminal Junction' }
  ];

  const waterCrossingsList = [
    {
      id: 'WC-01',
      name: 'Bhagirathi Tributary North Channel',
      chainage: 'KM 14+800',
      type: 'Perennial River (1st Order)',
      widthM: 38,
      risk: 'High (Riparian Spawning)',
      proposedMitigation: 'Single-span balanced cantilever bridge (No pier in wet bed)'
    },
    {
      id: 'WC-02',
      name: 'Chamba Gulley Stream',
      chainage: 'KM 24+300',
      type: 'Seasonal Mountain Torrent',
      widthM: 14,
      risk: 'Medium (Debris Flow)',
      proposedMitigation: 'High-capacity box culvert with boulder energy dissipator'
    },
    {
      id: 'WC-03',
      name: 'Compartment 4B Natural Spring Wetland',
      chainage: 'KM 29+700',
      type: 'Riparian Wetland / Springhead',
      widthM: 52,
      risk: 'High (Groundwater Aquifer)',
      proposedMitigation: 'Elevated viaduct structure with 50m buffer protection zone'
    }
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
            Water & Terrain Analysis
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F63] mt-0.5">
            Hydrological catchment intersections, slope gradient profiling, and landslide susceptibility modeling along alignment corridors.
          </p>
        </div>

        <button 
          onClick={() => alert('Exporting Hydrological & Terrain Engineering Report (PDF)...')}
          className="bg-white text-[#1B4332] border border-[#DEE2E6] hover:bg-[#F8F9FA] transition-colors py-2 px-3 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Hydrology Report</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs">
          <div className="flex justify-between items-center text-[#5B5F63] text-xs font-bold uppercase tracking-wider">
            <span>Water Crossings</span>
            <Droplets className="w-4 h-4 text-[#0288D1]" />
          </div>
          <div className="text-2xl font-bold text-[#191C1D] mt-2 font-mono">
            {project.metrics.waterCrossings}
          </div>
          <div className="text-[11px] text-[#5B5F63] mt-1">3 Perennial + 4 Seasonal Streams</div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs">
          <div className="flex justify-between items-center text-[#5B5F63] text-xs font-bold uppercase tracking-wider">
            <span>High-Slope Sections</span>
            <Mountain className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="text-2xl font-bold text-[#D97706] mt-2 font-mono">
            4 Segments
          </div>
          <div className="text-[11px] text-[#5B5F63] mt-1">Gradient &gt; 15% (Slope stabilization required)</div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs">
          <div className="flex justify-between items-center text-[#5B5F63] text-xs font-bold uppercase tracking-wider">
            <span>Wetland Intersections</span>
            <Waves className="w-4 h-4 text-[#00838F]" />
          </div>
          <div className="text-2xl font-bold text-[#00838F] mt-2 font-mono">
            1 Wetland
          </div>
          <div className="text-[11px] text-[#5B5F63] mt-1">Compartment 4B Natural Spring (52m)</div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs border-l-4 border-l-[#F57F17]">
          <div className="flex justify-between items-center text-[#5B5F63] text-xs font-bold uppercase tracking-wider">
            <span>Terrain Risk Index</span>
            <AlertTriangle className="w-4 h-4 text-[#F57F17]" />
          </div>
          <div className="text-2xl font-bold text-[#F57F17] mt-2 font-mono">
            Medium (54/100)
          </div>
          <div className="text-[11px] text-[#5B5F63] mt-1">Max elevation: 1,480m AMSL</div>
        </div>
      </div>

      {/* Elevation & Slope Profile Chart */}
      <div className="bg-white border border-[#DEE2E6] rounded p-4 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#DEE2E6] pb-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#012D1D]">
            Corridor Longitudinal Elevation & Slope Gradient Profile (AMSL)
          </h3>
          <span className="text-[10px] text-[#5B5F63]">Cartosat DEM 10m Resolution</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={elevationProfile} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B4332" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1B4332" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="km" label={{ value: 'Chainage (KM)', position: 'insideBottom', offset: -2, fontSize: 10 }} tick={{ fontSize: 10 }} />
              <YAxis domain={[700, 1600]} label={{ value: 'Elevation (m AMSL)', angle: -90, position: 'insideLeft', fontSize: 10 }} tick={{ fontSize: 10 }} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border border-[#DEE2E6] p-2.5 rounded shadow-lg text-xs">
                        <div className="font-bold text-[#012D1D]">KM {data.km} — {data.feature}</div>
                        <div className="text-[#1B4332] font-mono">Elevation: {data.elevation} m</div>
                        <div className="text-[#D97706] font-mono">Slope Gradient: {data.slope}%</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="elevation" stroke="#1B4332" strokeWidth={2} fillOpacity={1} fill="url(#elevGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Water Crossings Inventory Table */}
      <div className="bg-white border border-[#DEE2E6] rounded flex flex-col shadow-2xs">
        <div className="px-4 py-3 border-b border-[#DEE2E6] bg-[#F8F9FA]">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#012D1D]">
            Hydrological Catchment Crossings & Engineering Mitigation
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#F8F9FA] border-b border-[#DEE2E6] text-[11px] font-bold text-[#5B5F63] uppercase">
              <tr>
                <th className="py-2.5 px-4 w-28">Crossing ID</th>
                <th className="py-2.5 px-4 w-32">Chainage</th>
                <th className="py-2.5 px-4">Water Body Name & Classification</th>
                <th className="py-2.5 px-4 w-24">Span (m)</th>
                <th className="py-2.5 px-4 w-44">Aquatic Risk Rating</th>
                <th className="py-2.5 px-4">Mandated Engineering Mitigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEE2E6] text-xs text-[#191C1D]">
              {waterCrossingsList.map((wc) => (
                <tr key={wc.id} className="gov-table-row">
                  <td className="py-3 px-4 font-mono font-semibold text-[#0288D1]">
                    {wc.id}
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-[#5B5F63]">
                    {wc.chainage}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#191C1D]">{wc.name}</div>
                    <div className="text-[11px] text-[#5B5F63]">{wc.type}</div>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    {wc.widthM} m
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFEBEE] text-[#B71C1C] border border-[#FFCDD2]">
                      {wc.risk}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#1B5E20] font-medium">
                    {wc.proposedMitigation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

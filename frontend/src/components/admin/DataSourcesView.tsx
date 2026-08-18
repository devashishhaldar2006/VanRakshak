import React from 'react';
import { 
  Database, 
  Satellite, 
  Layers, 
  Camera, 
  CheckCircle, 
  RefreshCw, 
  ExternalLink,
  MapPin,
  Calendar
} from 'lucide-react';

export const DataSourcesView: React.FC = () => {
  const sources = [
    {
      name: 'ISRO Cartosat DEM & Bhuvan Geoportal',
      category: 'Elevation & Terrain Surface',
      resolution: '10m Mesh',
      coverage: 'All India Forest Circles',
      status: 'Live & Synchronized',
      lastSync: '2026-08-18 04:00 IST'
    },
    {
      name: 'ESA Sentinel-2 L2A BOA Multi-Spectral',
      category: 'Vegetation & NDVI Index',
      resolution: '10m Multi-Spectral (12 Bands)',
      coverage: '5-Day Revisit Cycle',
      status: 'Live & Synchronized',
      lastSync: '2026-08-17 18:30 IST'
    },
    {
      name: 'Forest Survey of India (FSI) Forest Type Atlas',
      category: 'Champion & Seth Forest Classification',
      resolution: 'Compartment Vector Boundaries',
      coverage: 'National Geodatabase',
      status: 'Synchronized (2026 Edition)',
      lastSync: '2026-08-01'
    },
    {
      name: 'State Forest Dept UAV Orthomosaic Hub',
      category: 'Sub-Decimeter Aerial Imagery',
      resolution: '5cm Ground Sample Distance',
      coverage: 'Project Priority Corridors',
      status: 'Ready for Field Survey',
      lastSync: '2026-08-14'
    },
    {
      name: 'Wildlife Institute of India (WII) Corridor Atlas',
      category: 'Faunal Corridor & Habitat Sensitivity',
      resolution: 'Spatial Movement Buffer Polygons',
      coverage: 'North India & Himalayan Zones',
      status: 'Verified Database',
      lastSync: '2026-07-22'
    }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DEE2E6]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#191C1D]">
            Integrated Geospatial Data Sources & Sensor Feeds
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F63] mt-0.5">
            Real-time earth observation satellites, LiDAR survey repositories, and official Forest Survey of India geospatial connectors.
          </p>
        </div>

        <button 
          onClick={() => alert('Data source sync refresh triggered across all ISRO & Sentinel feeds.')}
          className="bg-white text-[#1B4332] border border-[#DEE2E6] hover:bg-[#F8F9FA] transition-colors py-2 px-3 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync All Data Feeds</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#DEE2E6] rounded flex flex-col shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#F8F9FA] border-b border-[#DEE2E6] text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4">Data Source / Provider</th>
                <th className="py-2.5 px-4 w-44">Thematic Category</th>
                <th className="py-2.5 px-4 w-36">Spatial Resolution</th>
                <th className="py-2.5 px-4 w-40">Coverage Scope</th>
                <th className="py-2.5 px-4 w-36">Sync Status</th>
                <th className="py-2.5 px-4 w-36">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEE2E6] text-xs text-[#191C1D]">
              {sources.map((s, idx) => (
                <tr key={idx} className="gov-table-row">
                  <td className="py-3 px-4 font-semibold text-[#012D1D]">
                    {s.name}
                  </td>
                  <td className="py-3 px-4 text-[#5B5F63]">
                    {s.category}
                  </td>
                  <td className="py-3 px-4 font-mono">
                    {s.resolution}
                  </td>
                  <td className="py-3 px-4 text-[#5B5F63]">
                    {s.coverage}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]">
                      <CheckCircle className="w-3 h-3" />
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#5B5F63]">
                    {s.lastSync}
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

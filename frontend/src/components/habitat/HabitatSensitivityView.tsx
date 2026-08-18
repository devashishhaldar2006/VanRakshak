import React from 'react';
import { 
  Eye, 
  ShieldAlert, 
  Layers, 
  Info, 
  Download, 
  MapPin, 
  Trees, 
  AlertTriangle,
  Compass
} from 'lucide-react';
import { ProjectAssessment, RouteAlternative } from '../../types';
import { GisMap } from '../gis/GisMap';

interface HabitatSensitivityViewProps {
  project: ProjectAssessment;
  routes: RouteAlternative[];
  language: 'en' | 'hi';
}

export const HabitatSensitivityView: React.FC<HabitatSensitivityViewProps> = ({
  project,
  routes,
  language
}) => {
  const sensitivityZones = [
    {
      id: 'ZONE-HIGH-01',
      name: 'Compartment 4B Core Sal Stand & Riparian Corridor',
      level: 'High Sensitivity',
      color: '#B71C1C',
      chainage: 'KM 18+200 to KM 24+500',
      lengthKm: 6.3,
      criteria: 'Old-growth Shorea robusta canopy > 70%, perennial stream buffer (100m), active nocturnal wildlife track.',
      mitigationRequired: 'Elevated viaduct / 2 wildlife underpasses (min 6m vertical clearance) or Alternative B re-alignment.'
    },
    {
      id: 'ZONE-HIGH-02',
      name: 'Bhagirathi Tributary Confluence Gulley',
      level: 'High Sensitivity',
      color: '#B71C1C',
      chainage: 'KM 31+000 to KM 36+100',
      lengthKm: 5.1,
      criteria: 'Steep riverine slope (> 25% gradient) vulnerable to landslide reactivation and siltation of aquatic spawning pools.',
      mitigationRequired: 'Heavy slope toe-wall netting, sediment trap barriers, and zero-felling riparian boundary.'
    },
    {
      id: 'ZONE-MED-03',
      name: 'Tehri Peripheral Ridge Mixed Deciduous Buffer',
      level: 'Medium Sensitivity',
      color: '#F57F17',
      chainage: 'KM 08+400 to KM 14+200',
      lengthKm: 5.8,
      criteria: 'Secondary mixed forest (MDF 40-70%) with moderate wildlife movement and standard groundwater recharge zone.',
      mitigationRequired: 'Standard compensatory afforestation (1:2 ratio) and compensatory fencing.'
    },
    {
      id: 'ZONE-LOW-04',
      name: 'Chamba Junction Degraded Scrub Fringe',
      level: 'Low Sensitivity',
      color: '#2E7D32',
      chainage: 'KM 00+000 to KM 08+400',
      lengthKm: 8.4,
      criteria: 'Open scrub and roadside monoculture regrowth (< 10% canopy density).',
      mitigationRequired: 'Standard roadside plantation strip.'
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
            Habitat & Ecological Sensitivity Zoning
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F63] mt-0.5">
            Spatial resistance modeling integrating canopy integrity, slope stability, hydrology, and wildlife corridor continuity.
          </p>
        </div>

        <button 
          onClick={() => alert('Exporting Habitat Sensitivity Zoning Map (GeoTIFF / PDF)...')}
          className="bg-white text-[#1B4332] border border-[#DEE2E6] hover:bg-[#F8F9FA] transition-colors py-2 px-3 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Zoning Layer</span>
        </button>
      </div>

      {/* Mandatory Statutory Disclaimer Panel */}
      <div className="bg-[#FFF8E1] border border-[#FFE082] rounded p-4 flex items-start gap-3 text-xs text-[#7F5000]">
        <Info className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold uppercase tracking-wider text-[10px] text-[#5D4037] block">
            Statutory Scientific Modeling Disclaimer
          </span>
          <p className="leading-relaxed">
            Habitat sensitivity is modeled from available environmental, spatial, ecological and verified field evidence. This tool provides <strong>decision-support indications</strong> and does not constitute a legally definitive or judicial habitat classification without formal State Forest Department Gazette notification.
          </p>
        </div>
      </div>

      {/* Interactive GIS Sensitivity Map View */}
      <div className="bg-white border border-[#DEE2E6] rounded p-3 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between pb-2 border-b border-[#DEE2E6] text-xs">
          <span className="font-bold text-[#012D1D] uppercase tracking-wider">
            Spatial Sensitivity Heatmap & Wildlife Corridors
          </span>
          <span className="text-[#5B5F63] text-[11px]">Resolution: 10m Multi-Spectral Grid</span>
        </div>
        <GisMap
          project={project}
          routes={routes}
          heightClass="h-[420px]"
          initialLayers={{
            habitatSensitivity: true,
            forestCanopy: true,
            waterBodies: true,
            proposedRoute: true,
            alternativeRoutes: true,
            wildlifeEvidence: true
          }}
        />
      </div>

      {/* Sensitivity Zone Inventory Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-[#191C1D] uppercase tracking-wider">
          Identified Sensitivity Compartments & Mitigation Protocols
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sensitivityZones.map((zone) => (
            <div key={zone.id} className="bg-white border border-[#DEE2E6] rounded p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] text-[#5B5F63] font-bold block">{zone.id}</span>
                  <h4 className="font-bold text-sm text-[#012D1D] mt-0.5">{zone.name}</h4>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                  zone.level === 'High Sensitivity'
                    ? 'bg-[#FFEBEE] text-[#B71C1C] border border-[#FFCDD2]'
                    : zone.level === 'Medium Sensitivity'
                    ? 'bg-[#FFF8E1] text-[#F57F17] border border-[#FFECB3]'
                    : 'bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]'
                }`}>
                  {zone.level}
                </span>
              </div>

              <div className="text-xs text-[#5B5F63] flex items-center gap-2 pt-1 border-t border-[#F1F3F4]">
                <MapPin className="w-3.5 h-3.5 text-[#717973]" />
                <span>Chainage: <strong>{zone.chainage}</strong> ({zone.lengthKm} km segment)</span>
              </div>

              <div className="text-xs text-[#191C1D] bg-[#F8F9FA] p-2.5 rounded border border-[#DEE2E6] space-y-1">
                <div><strong>Criteria:</strong> {zone.criteria}</div>
                <div className="text-[#1B5E20]"><strong>Statutory Mitigation:</strong> {zone.mitigationRequired}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

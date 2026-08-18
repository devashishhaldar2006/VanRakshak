import React from 'react';
import { 
  PawPrint, 
  Camera, 
  ShieldAlert, 
  Info, 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Download,
  Eye
} from 'lucide-react';
import { ProjectAssessment, WildlifeObservation } from '../../types';

interface WildlifeEvidenceViewProps {
  project: ProjectAssessment;
  observations: WildlifeObservation[];
  language: 'en' | 'hi';
}

export const WildlifeEvidenceView: React.FC<WildlifeEvidenceViewProps> = ({
  project,
  observations,
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
            <span className="text-xs text-[#5B5F63]">•</span>
            <span className="text-xs text-[#5B5F63] font-medium">{project.name}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#191C1D] mt-1">
            Wildlife Observations & Ecological Evidence
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F63] mt-0.5">
            Documented camera trap captures, spoor records, and modeled ecological movement resistance across corridor alignments.
          </p>
        </div>

        <button 
          onClick={() => alert('Exporting Ecological Evidence & Corridor Impact Dossier...')}
          className="bg-white text-[#1B4332] border border-[#DEE2E6] hover:bg-[#F8F9FA] transition-colors py-2 px-3 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Evidence Dossier</span>
        </button>
      </div>

      {/* Mandatory Scientific Responsibility Banner */}
      <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded p-3.5 flex items-start gap-3 text-xs text-[#1B5E20]">
        <Info className="w-5 h-5 text-[#1B5E20] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold uppercase tracking-wider text-[10px] text-[#004D40] block">
            Ecological Decision-Support Methodology Notice
          </span>
          <p className="leading-relaxed">
            This module records <strong>Wildlife Observations</strong>, <strong>Ecological Evidence</strong>, and <strong>Habitat Sensitivity Indicators</strong>. It is designed to evaluate spatial disruption risks for corridor diversions and does <strong>not</strong> estimate absolute animal census or population counts.
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs">
          <div className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">Ecological Evidence Locations</div>
          <div className="text-2xl font-bold text-[#191C1D] mt-1 font-mono">{project.metrics.wildlifeEvidenceCount}</div>
          <div className="text-[11px] text-[#5B5F63] mt-0.5">Field GPS & Camera trap points</div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs border-l-4 border-l-[#B71C1C]">
          <div className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">High Sensitivity Evidence</div>
          <div className="text-2xl font-bold text-[#B71C1C] mt-1 font-mono">5 Locations</div>
          <div className="text-[11px] text-[#B71C1C] mt-0.5">Ungulate & Leopard movement zone</div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs">
          <div className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">Verified by Field Staff</div>
          <div className="text-2xl font-bold text-[#1B5E20] mt-1 font-mono">9 Records</div>
          <div className="text-[11px] text-[#1B5E20] mt-0.5">81.8% Ground truth confirmed</div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs">
          <div className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">Corridor Mitigation Need</div>
          <div className="text-2xl font-bold text-[#F57F17] mt-1 font-mono">2 Underpasses</div>
          <div className="text-[11px] text-[#F57F17] mt-0.5">Recommended at KM 21.3 & KM 28.5</div>
        </div>
      </div>

      {/* Wildlife Observations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {observations.map((obs) => (
          <div key={obs.id} className="bg-white border border-[#DEE2E6] rounded overflow-hidden shadow-2xs flex flex-col justify-between">
            <div>
              {/* Photo Evidence with Badges */}
              <div className="relative h-48 w-full bg-[#191C1D]">
                <img
                  src={obs.imageEvidence}
                  alt={obs.speciesIndicative}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <span className="bg-[#191C1D]/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    {obs.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    obs.sensitivityLevel === 'High'
                      ? 'bg-[#B71C1C] text-white'
                      : obs.sensitivityLevel === 'Medium'
                      ? 'bg-[#F57F17] text-white'
                      : 'bg-[#1B5E20] text-white'
                  }`}>
                    {obs.sensitivityLevel} Sensitivity
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 bg-[#191C1D]/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  GPS: {obs.lat.toFixed(4)}°N, {obs.lng.toFixed(4)}°E • {obs.observationDate}
                </div>
              </div>

              {/* Information Body */}
              <div className="p-4 space-y-2.5 text-xs text-[#191C1D]">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#5B5F63]">
                    {obs.category}
                  </div>
                  <h4 className="font-bold text-sm text-[#012D1D]">
                    {obs.speciesIndicative}
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#F1F3F4] text-[11px]">
                  <div>
                    <span className="text-[#717973] block">Evidence Type:</span>
                    <strong className="text-[#191C1D]">{obs.evidenceType}</strong>
                  </div>
                  <div>
                    <span className="text-[#717973] block">AI Evidence Confidence:</span>
                    <strong className="text-[#1B5E20]">{obs.confidencePercent}%</strong>
                  </div>
                </div>

                <div className="bg-[#F8F9FA] p-2 rounded border border-[#DEE2E6] text-[11px] text-[#5B5F63]">
                  <strong>Field Officer Remarks:</strong> {obs.remarks}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="bg-[#F8F9FA] px-4 py-2 border-t border-[#DEE2E6] flex items-center justify-between text-[11px]">
              <span className="text-[#5B5F63]">Verification: <strong className="text-[#1B5E20]">{obs.groundVerification}</strong></span>
              <span className="text-[#717973] font-mono">EcoCorridor v2.0</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

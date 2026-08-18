import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Layers, 
  MapPin, 
  Sliders, 
  CheckCircle, 
  FileCode, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Trees,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { ProjectAssessment } from '../../types';

interface NewAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (newProject: ProjectAssessment) => void;
  language: 'en' | 'hi';
}

export const NewAssessmentModal: React.FC<NewAssessmentModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
  language
}) => {
  const [step, setStep] = useState<number>(1);
  const [projectName, setProjectName] = useState('');
  const [authority, setAuthority] = useState('NHAI (National Highways Authority of India)');
  const [projectType, setProjectType] = useState<'Highway' | 'Transmission Line' | 'Railway' | 'Pipeline' | 'Hydropower' | 'Mining'>('Highway');
  const [state, setState] = useState('Uttarakhand');
  const [district, setDistrict] = useState('Tehri Garhwal');
  const [forestDivision, setForestDivision] = useState('Tehri Forest Division');
  const [uploadedFile, setUploadedFile] = useState<string | null>('Alignment_DPR_Chainage_KM00_KM46.kml');

  // Weights & parameters
  const [treePreservationWeight, setTreePreservationWeight] = useState(80);
  const [wildlifeBufferWeight, setWildlifeBufferWeight] = useState(90);
  const [waterBufferDistanceM, setWaterBufferDistanceM] = useState(100);
  const [maxSlopePercent, setMaxSlopePercent] = useState(12);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentProcessLog, setCurrentProcessLog] = useState('');

  if (!isOpen) return null;

  const handleStartAnalysis = () => {
    setIsProcessing(true);
    setProgressPercent(10);
    setCurrentProcessLog('Ingesting KML corridor & clipping Sentinel-2 L2A BOA multi-spectral tiles...');

    setTimeout(() => {
      setProgressPercent(35);
      setCurrentProcessLog('Running YOLO-Forest v4.2 automated crown delineation & height estimation...');
    }, 900);

    setTimeout(() => {
      setProgressPercent(65);
      setCurrentProcessLog('Generating spatial resistance raster & multi-criteria Dijkstra cost-paths...');
    }, 1800);

    setTimeout(() => {
      setProgressPercent(90);
      setCurrentProcessLog('Synthesizing Alternative A & Alternative B diversion corridors & compiling dossier...');
    }, 2700);

    setTimeout(() => {
      setProgressPercent(100);
      setCurrentProcessLog('Assessment complete! Registering into VanRakshak Portal...');
      
      const newProj: ProjectAssessment = {
        id: `VR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        name: projectName || 'Proposed Highway 4-Lane Diversion Alignment',
        type: projectType,
        state: state,
        district: district,
        forestDivision: forestDivision,
        authority: authority,
        startLocation: `${district} Ch. 0+000`,
        endLocation: `${district} Ch. 42+000`,
        status: 'Assessment in Progress',
        risk: 'High',
        lastUpdated: new Date().toISOString().split('T')[0],
        createdDate: new Date().toISOString().split('T')[0],
        corridorWidthM: 60,
        projectLengthKm: 42.0,
        description: `Ecological impact assessment for proposed ${projectType.toLowerCase()} corridor spanning ${forestDivision}.`,
        coordinates: {
          start: [30.3541, 78.3982],
          end: [30.4124, 78.4891]
        },
        metrics: {
          forestAreaHa: 12.4,
          treesDetected: 6420,
          treesInCorridor: 1840,
          treesVerified: 1620,
          treesPendingVerification: 220,
          waterCrossings: 4,
          highSensitivityZones: 2,
          wildlifeEvidenceCount: 8,
          fragmentationIndex: 'Medium',
          modeledEcologicalImpact: 76
        },
        pipelineStage: {
          projectSetup: true,
          dataCollection: true,
          aiAnalysis: true,
          impactAssessment: 'in_progress',
          groundVerification: 'in_progress',
          routeOptimization: 'in_progress',
          finalReport: 'pending'
        }
      };

      setTimeout(() => {
        setIsProcessing(false);
        onCreateProject(newProj);
        onClose();
      }, 600);
    }, 3400);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-[#DEE2E6] rounded shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#1B4332] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[#A5D0B9] text-[#012D1D] flex items-center justify-center text-xs font-bold">
              +
            </span>
            <div>
              <h3 className="font-bold text-sm">
                Initiate New Forest Diversion Ecological Assessment
              </h3>
              <span className="text-[10px] text-[#A5D0B9]">
                Step {step} of 3: {step === 1 ? 'Project Metadata' : step === 2 ? 'GIS Alignment & Sensors' : 'Multi-Criteria Ecological Weights'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-[#C1ECD4] hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs text-[#191C1D]">
          {isProcessing ? (
            <div className="py-12 space-y-6 text-center">
              <div className="w-16 h-16 border-4 border-[#1B4332] border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-2">
                <h4 className="text-base font-bold text-[#012D1D]">
                  Running VanRakshak AI + GIS Decision Engine...
                </h4>
                <div className="w-full max-w-md bg-[#DEE2E6] h-2.5 rounded-full mx-auto overflow-hidden">
                  <div 
                    className="bg-[#1B4332] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-[#5B5F63] font-mono animate-pulse">
                  {currentProcessLog}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Project Metadata */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-[#5B5F63] uppercase tracking-wider text-[11px] block mb-1">
                      Project Proposal Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4-Laning of Chamba to Tehri Bypass Highway Project"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded p-2.5 text-xs text-[#191C1D] focus:outline-none focus:border-[#1B4332]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#5B5F63] uppercase tracking-wider text-[11px] block mb-1">
                        Infrastructure Category
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value as any)}
                        className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded p-2.5 text-xs text-[#191C1D] focus:outline-none focus:border-[#1B4332]"
                      >
                        <option value="Highway">Highway & Expressways</option>
                        <option value="Railway">Railway Line & Dedicated Freight</option>
                        <option value="Transmission Line">Power Transmission Corridor</option>
                        <option value="Pipeline">Gas / Water Pipeline</option>
                        <option value="Hydropower">Hydropower & Dam Reservoir</option>
                        <option value="Mining">Mining & Quarry Leases</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-[#5B5F63] uppercase tracking-wider text-[11px] block mb-1">
                        Executing Authority / Proponent
                      </label>
                      <input
                        type="text"
                        value={authority}
                        onChange={(e) => setAuthority(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded p-2.5 text-xs text-[#191C1D] focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-[#5B5F63] uppercase tracking-wider text-[11px] block mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded p-2 text-xs focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#5B5F63] uppercase tracking-wider text-[11px] block mb-1">
                        District
                      </label>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded p-2 text-xs focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#5B5F63] uppercase tracking-wider text-[11px] block mb-1">
                        Forest Division
                      </label>
                      <input
                        type="text"
                        value={forestDivision}
                        onChange={(e) => setForestDivision(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded p-2 text-xs focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Alignment File & Sensor Selection */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-[#5B5F63] uppercase tracking-wider text-[11px] block mb-1">
                      Upload Proposed Alignment Corridor (KML / GeoJSON / Shapefile)
                    </label>
                    <div className="border-2 border-dashed border-[#DEE2E6] rounded p-6 text-center hover:border-[#1B4332] transition-colors cursor-pointer bg-[#F8F9FA]">
                      <FileCode className="w-8 h-8 text-[#1B4332] mx-auto mb-2" />
                      <div className="font-semibold text-xs text-[#191C1D]">
                        {uploadedFile ? uploadedFile : 'Drop KML or Shapefile (.zip) here, or click to browse'}
                      </div>
                      <span className="text-[10px] text-[#5B5F63] mt-1 block">
                        Supports WGS84 (EPSG:4326) and UTM Zone projections up to 50MB
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-[#5B5F63] uppercase tracking-wider text-[11px] block">
                      Earth Observation & Remote Sensing Layers
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className="flex items-center gap-2 p-2 bg-[#F8F9FA] rounded border border-[#DEE2E6]">
                        <input type="checkbox" defaultChecked className="accent-[#1B4332]" />
                        <span>Sentinel-2 L2A Multi-Spectral (10m)</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 bg-[#F8F9FA] rounded border border-[#DEE2E6]">
                        <input type="checkbox" defaultChecked className="accent-[#1B4332]" />
                        <span>Cartosat DEM (Digital Elevation)</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 bg-[#F8F9FA] rounded border border-[#DEE2E6]">
                        <input type="checkbox" defaultChecked className="accent-[#1B4332]" />
                        <span>UAV High-Res Orthomosaic (5cm)</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 bg-[#F8F9FA] rounded border border-[#DEE2E6]">
                        <input type="checkbox" defaultChecked className="accent-[#1B4332]" />
                        <span>State Wildlife Corridor Geodatabase</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Multi-Criteria Weights & Constraints */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-[#E8F5E9] p-3 rounded border border-[#C8E6C9] text-xs text-[#1B5E20]">
                    Configure multi-criteria optimization weights. The AI pathfinder will compute alternative alignments balancing tree preservation against engineering feasibility.
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between font-medium text-xs">
                        <span>Tree Crown & Old-Growth Preservation Weight</span>
                        <span className="font-bold font-mono text-[#1B4332]">{treePreservationWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={treePreservationWeight}
                        onChange={(e) => setTreePreservationWeight(Number(e.target.value))}
                        className="w-full accent-[#1B4332] cursor-pointer mt-1"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-medium text-xs">
                        <span>Wildlife Corridor Avoidance Weight</span>
                        <span className="font-bold font-mono text-[#1B4332]">{wildlifeBufferWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="100"
                        value={wildlifeBufferWeight}
                        onChange={(e) => setWildlifeBufferWeight(Number(e.target.value))}
                        className="w-full accent-[#1B4332] cursor-pointer mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="text-[11px] font-bold text-[#5B5F63] block mb-1">
                          Water Body Buffer (m)
                        </label>
                        <input
                          type="number"
                          value={waterBufferDistanceM}
                          onChange={(e) => setWaterBufferDistanceM(Number(e.target.value))}
                          className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded p-2 text-xs focus:outline-none focus:border-[#1B4332]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#5B5F63] block mb-1">
                          Max Road Slope Gradient (%)
                        </label>
                        <input
                          type="number"
                          value={maxSlopePercent}
                          onChange={(e) => setMaxSlopePercent(Number(e.target.value))}
                          className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded p-2 text-xs focus:outline-none focus:border-[#1B4332]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!isProcessing && (
          <div className="bg-[#F8F9FA] px-5 py-3 border-t border-[#DEE2E6] flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-3 py-1.5 border border-[#DEE2E6] rounded text-xs font-semibold text-[#5B5F63] hover:bg-white flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            ) : <div />}

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 border border-[#DEE2E6] rounded text-xs font-semibold text-[#5B5F63] hover:bg-white"
              >
                Cancel
              </button>

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-1.5 bg-[#1B4332] text-white rounded text-xs font-bold hover:bg-[#012D1D] flex items-center gap-1 transition-colors"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleStartAnalysis}
                  className="px-5 py-1.5 bg-[#1B4332] text-white rounded text-xs font-bold hover:bg-[#012D1D] flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#A5D0B9]" />
                  <span>Execute Decision Engine</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

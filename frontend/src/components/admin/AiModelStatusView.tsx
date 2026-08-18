import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Database, 
  Sparkles,
  GitBranch,
  Terminal
} from 'lucide-react';

export const AiModelStatusView: React.FC = () => {
  const models = [
    {
      id: 'YOLO-Forest-v4.2',
      task: 'Automated Tree Crown Delineation & Girth Estimation',
      precision: '94.6% F1-Score',
      calibratedOn: 'LiDAR + 1,301 Field RTK-GPS Ground Truths',
      status: 'Active & Verified',
      lastTrained: 'August 2026'
    },
    {
      id: 'CanopyDense-UNet-v3.1',
      task: 'FSI Standard Forest Canopy Closure Segmentation',
      precision: '92.1% mIoU',
      calibratedOn: 'Sentinel-2 L2A BOA Multi-Spectral Bands',
      status: 'Active & Verified',
      lastTrained: 'July 2026'
    },
    {
      id: 'EcoPath-MultiCriteria-v2.0',
      task: 'Low-Impact Corridor Routing & Resistance Dijkstra Graph',
      precision: '96.0% Feasibility',
      calibratedOn: 'MoRTH Hill Road Specs & MoEFCC FCA Regulations',
      status: 'Operational',
      lastTrained: 'August 2026'
    },
    {
      id: 'FaunaVision-Spoor-v1.8',
      task: 'Camera Trap & Nocturnal Wildlife Activity Classification',
      precision: '89.4% Top-1 Accuracy',
      calibratedOn: 'WII Camera Trap Database (North India Circle)',
      status: 'Operational',
      lastTrained: 'June 2026'
    }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-[#DEE2E6]">
        <h2 className="text-2xl font-bold tracking-tight text-[#191C1D]">
          AI Model Registry & Governance Transparency
        </h2>
        <p className="text-xs sm:text-sm text-[#5B5F63] mt-0.5">
          Model architecture lineage, calibration weights, validation benchmarks, and ethical decision-support safeguards.
        </p>
      </div>

      {/* Governance & Safeguards Principles */}
      <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded p-4 text-xs text-[#1B5E20] space-y-2">
        <div className="flex items-center gap-2 font-bold text-[#004D40] text-sm">
          <ShieldCheck className="w-5 h-5 text-[#1B5E20]" />
          <span>Government AI Governance & Decision-Support Principles</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-[11px] text-[#2E7D32]">
          <li><strong>Human-in-the-Loop Supremacy:</strong> Automated outputs serve as decision-support heuristics. Final statutory clearance requires physical field inspection by the Divisional Forest Officer.</li>
          <li><strong>Explainable Spatial Heuristics:</strong> Every alternative alignment provides traceable ecological trade-off indicators (tree counts, slope gradient, river crossings).</li>
          <li><strong>Uncertainty Flagging:</strong> Any tree or habitat detection with confidence under 70% is automatically routed to the Ground Verification Field Queue.</li>
        </ul>
      </div>

      {/* Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((m) => (
          <div key={m.id} className="bg-white border border-[#DEE2E6] rounded p-4 space-y-3 shadow-2xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#1B4332] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#C8E6C9]">
                  {m.id}
                </span>
                <h4 className="font-bold text-sm text-[#191C1D] mt-1.5">{m.task}</h4>
              </div>
              <span className="bg-[#E8F5E9] text-[#1B5E20] text-[10px] font-bold px-2 py-0.5 rounded">
                {m.status}
              </span>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#F1F3F4] text-xs text-[#5B5F63]">
              <div className="flex justify-between">
                <span>Validation Benchmark:</span>
                <strong className="text-[#191C1D] font-mono">{m.precision}</strong>
              </div>
              <div className="flex justify-between">
                <span>Calibration Dataset:</span>
                <span className="text-[#191C1D] text-right font-medium max-w-[240px] truncate">{m.calibratedOn}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated / Verified:</span>
                <span className="text-[#191C1D] font-mono">{m.lastTrained}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

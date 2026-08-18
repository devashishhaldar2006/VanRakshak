import React from 'react';
import { 
  Printer, 
  Download, 
  ArrowLeft, 
  FileCheck, 
  ShieldCheck, 
  Trees, 
  AlertTriangle,
  Info,
  Calendar,
  Building,
  UserCheck
} from 'lucide-react';
import { ProjectAssessment, RouteAlternative, TreeRecord } from '../../types';

interface DetailedReportViewProps {
  project: ProjectAssessment;
  routes: RouteAlternative[];
  trees: TreeRecord[];
  onBack: () => void;
  language: 'en' | 'hi';
}

export const DetailedReportView: React.FC<DetailedReportViewProps> = ({
  project,
  routes,
  trees,
  onBack,
  language
}) => {
  const proposed = routes.find(r => r.code === 'PROPOSED') || routes[0];
  const altB = routes.find(r => r.code === 'ALT_B') || routes[2];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex items-center justify-between no-print pb-4 border-b border-[#DEE2E6]">
        <button
          onClick={onBack}
          className="bg-white border border-[#DEE2E6] hover:bg-[#F8F9FA] text-[#5B5F63] hover:text-[#191C1D] transition-colors py-2 px-3 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assessment View</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="bg-[#1B4332] text-white hover:bg-[#012D1D] transition-colors py-2 px-4 rounded text-xs font-bold flex items-center gap-2 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Dossier / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Official Government Dossier Sheet */}
      <div className="bg-white border border-[#DEE2E6] shadow-md rounded p-8 sm:p-12 space-y-8 print:border-none print:shadow-none print:p-0 text-[#191C1D] text-xs leading-relaxed font-sans">
        
        {/* Government Header & Emblem */}
        <div className="text-center space-y-2 border-b-2 border-[#1B4332] pb-6">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-[#E8F5E9] border border-[#C8E6C9] flex items-center justify-center text-[#1B4332] font-bold text-2xl font-serif">
              🏛️
            </div>
          </div>
          <div className="uppercase tracking-widest text-[11px] font-bold text-[#5B5F63]">
            भारत सरकार / Government of India
          </div>
          <div className="uppercase tracking-wide text-sm font-bold text-[#012D1D]">
            Ministry of Environment, Forest and Climate Change (MoEFCC)
          </div>
          <div className="text-xs text-[#5B5F63] font-medium">
            Forest Conservation Division • Integrated Regional Office (Dehradun)
          </div>
          <div className="pt-2">
            <span className="inline-block bg-[#F8F9FA] border border-[#DEE2E6] px-3 py-1 font-mono text-[11px] font-bold text-[#1B4332]">
              FORM-A ECOLOGICAL DIVERSIFICATION ASSESSMENT DOSSIER • F.No. 8-24/2026-FC(NR)
            </span>
          </div>
        </div>

        {/* Section 1: Executive Summary & Project Particulars */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-[#012D1D] uppercase tracking-wider border-b border-[#DEE2E6] pb-1 flex items-center gap-1.5">
            <span className="text-[#1B4332]">1.0</span> Project Particulars & Statutory Application
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8F9FA] p-3.5 rounded border border-[#DEE2E6] text-xs">
            <div>
              <span className="text-[10px] text-[#717973] uppercase font-bold block">Project Proposal ID</span>
              <strong className="font-mono text-[#1B4332]">{project.id}</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#717973] uppercase font-bold block">Executing Authority</span>
              <strong>{project.authority}</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#717973] uppercase font-bold block">Forest Division / Circle</span>
              <strong>{project.forestDivision}</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#717973] uppercase font-bold block">Assessment Date</span>
              <strong className="font-mono">{project.lastUpdated}</strong>
            </div>
          </div>
          <p className="text-[#5B5F63] leading-relaxed">
            Proposal submitted under Section 2 of the Forest (Conservation) Act, 1980 for diversion of <strong>14.30 hectares</strong> of forest land for the construction of <strong>{project.name}</strong> traversing Reserved Forest Compartments 4B, 7A, and 12.
          </p>
        </div>

        {/* Section 2: AI + GIS Multi-Criteria Optimization Summary */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-[#012D1D] uppercase tracking-wider border-b border-[#DEE2E6] pb-1 flex items-center gap-1.5">
            <span className="text-[#1B4332]">2.0</span> Multi-Criteria Ecological Route Alternative Analysis
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-[#DEE2E6] text-xs">
              <thead className="bg-[#F8F9FA] text-[11px] font-bold text-[#5B5F63] uppercase border-b border-[#DEE2E6]">
                <tr>
                  <th className="p-2 border-r border-[#DEE2E6]">Evaluation Parameter</th>
                  <th className="p-2 border-r border-[#DEE2E6] text-[#D32F2F]">Proposed Alignment (DPR)</th>
                  <th className="p-2 border-r border-[#DEE2E6] text-[#F57F17]">Alternative A</th>
                  <th className="p-2 text-[#1B5E20] bg-[#E8F5E9]/50">Alternative B (Low-Impact)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEE2E6]">
                <tr>
                  <td className="p-2 border-r border-[#DEE2E6] font-medium text-[#5B5F63]">Total Alignment Length</td>
                  <td className="p-2 border-r border-[#DEE2E6] font-mono">42.3 km</td>
                  <td className="p-2 border-r border-[#DEE2E6] font-mono">44.1 km</td>
                  <td className="p-2 font-mono font-bold text-[#1B5E20] bg-[#E8F5E9]/30">46.2 km (+3.9 km)</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-[#DEE2E6] font-medium text-[#5B5F63]">Forest Land Diversion</td>
                  <td className="p-2 border-r border-[#DEE2E6] font-mono text-[#D32F2F] font-bold">14.30 ha</td>
                  <td className="p-2 border-r border-[#DEE2E6] font-mono">11.10 ha</td>
                  <td className="p-2 font-mono font-bold text-[#1B5E20] bg-[#E8F5E9]/30">9.80 ha (-31.5%)</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-[#DEE2E6] font-medium text-[#5B5F63]">Trees Potentially Affected</td>
                  <td className="p-2 border-r border-[#DEE2E6] font-mono text-[#D32F2F] font-bold">2,100 trees</td>
                  <td className="p-2 border-r border-[#DEE2E6] font-mono">1,050 trees</td>
                  <td className="p-2 font-mono font-bold text-[#1B5E20] bg-[#E8F5E9]/30">700 trees (-66.7%)</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-[#DEE2E6] font-medium text-[#5B5F63]">Water Stream Crossings</td>
                  <td className="p-2 border-r border-[#DEE2E6] font-mono">7 crossings</td>
                  <td className="p-2 border-r border-[#DEE2E6] font-mono">5 crossings</td>
                  <td className="p-2 font-mono font-bold text-[#1B5E20] bg-[#E8F5E9]/30">3 crossings</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-[#DEE2E6] font-medium text-[#5B5F63]">Wildlife Sensitivity Disruption</td>
                  <td className="p-2 border-r border-[#DEE2E6] text-[#D32F2F] font-bold">High (Core Sal Corridor)</td>
                  <td className="p-2 border-r border-[#DEE2E6] text-[#F57F17]">Medium</td>
                  <td className="p-2 font-bold text-[#1B5E20] bg-[#E8F5E9]/30">Low (Fringe Alignment)</td>
                </tr>
                <tr className="bg-[#F8F9FA] font-bold">
                  <td className="p-2 border-r border-[#DEE2E6] text-[#012D1D]">Modeled Ecological Impact Score</td>
                  <td className="p-2 border-r border-[#DEE2E6] font-mono text-[#D32F2F]">82 / 100</td>
                  <td className="p-2 border-r border-[#DEE2E6] font-mono text-[#F57F17]">61 / 100</td>
                  <td className="p-2 font-mono text-[#1B5E20] bg-[#E8F5E9]">43 / 100 (Recommended)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Recommendation Rationale */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-[#012D1D] uppercase tracking-wider border-b border-[#DEE2E6] pb-1 flex items-center gap-1.5">
            <span className="text-[#1B4332]">3.0</span> Rationale for Alternative B Recommendation
          </h3>
          <p className="text-[#5B5F63]">
            Based on multi-spectral satellite imagery, LiDAR crown delineation, and 127 field-verified control points, <strong>Alternative B is recommended for further evaluation and formal site appraisal</strong> by the Forest Advisory Committee (FAC).
          </p>
          <div className="bg-[#E8F5E9] border border-[#C8E6C9] p-3 rounded space-y-1.5 text-xs text-[#1B5E20]">
            <div className="font-bold">Key Optimization Findings:</div>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-[#2E7D32]">
              <li>Preserves 1,400 mature timber specimens including 410 old-growth Sal (<em>Shorea robusta</em>) trees.</li>
              <li>Avoids direct bifurcation of the Bhagirathi riparian wetland springhead.</li>
              <li>Engineered gradient maintains a maximum 11.8% slope, satisfying MoRTH hill-road safety specifications.</li>
            </ul>
          </div>
        </div>

        {/* Section 4: Statutory Net Present Value (NPV) & CA Plan */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-[#012D1D] uppercase tracking-wider border-b border-[#DEE2E6] pb-1 flex items-center gap-1.5">
            <span className="text-[#1B4332]">4.0</span> Compensatory Afforestation (CA) & Net Present Value (NPV)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="border border-[#DEE2E6] rounded p-3 bg-[#F8F9FA]">
              <span className="font-bold text-[#012D1D] block mb-1">Compensatory Afforestation (CA) Plan:</span>
              <ul className="list-disc pl-4 text-[#5B5F63] space-y-1 text-[11px]">
                <li>Mandatory CA land required: <strong>19.60 ha</strong> (2x of 9.80 ha forest diverted).</li>
                <li>Identified CA land parcel: Khasra No. 412/1, Tehri Degraded Ridge.</li>
                <li>Plantation density: 1,000 indigenous saplings per hectare.</li>
              </ul>
            </div>

            <div className="border border-[#DEE2E6] rounded p-3 bg-[#F8F9FA]">
              <span className="font-bold text-[#012D1D] block mb-1">Net Present Value (NPV) Calculation:</span>
              <ul className="list-disc pl-4 text-[#5B5F63] space-y-1 text-[11px]">
                <li>Eco-Class: Eco-Class II (Sub-Tropical Pine/Broadleaved).</li>
                <li>Applicable NPV Rate: ₹ 13,82,000 per hectare.</li>
                <li>Total Estimated NPV Deposit: <strong>₹ 1,35,43,600</strong> (under Alt B vs ₹ 1,97,62,600 under Proposed).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: Competent Authority Signatures */}
        <div className="pt-8 border-t-2 border-[#1B4332] space-y-6">
          <div className="text-[11px] text-[#5B5F63] italic">
            This dossier is generated by the <strong>VanRakshak AI + GIS Decision Support System</strong> for statutory appraisal. Final approval is subject to site inspection by the Conservator of Forests and approval by the Central Government under Section 2 of FCA 1980.
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 text-center text-xs">
            <div className="border-t border-dashed border-[#5B5F63] pt-2">
              <div className="font-bold text-[#191C1D]">Divisional Forest Officer (DFO)</div>
              <div className="text-[10px] text-[#5B5F63]">Tehri Garhwal Forest Division</div>
              <div className="text-[10px] text-[#1B5E20] font-mono mt-1">e-Signed: 2026-08-14 16:42 IST</div>
            </div>

            <div className="border-t border-dashed border-[#5B5F63] pt-2">
              <div className="font-bold text-[#191C1D]">Chief Conservator of Forests (CCF)</div>
              <div className="text-[10px] text-[#5B5F63]">Garhwal Forest Circle</div>
              <div className="text-[10px] text-[#1B5E20] font-mono mt-1">e-Signed: 2026-08-15 11:20 IST</div>
            </div>

            <div className="border-t border-dashed border-[#5B5F63] pt-2">
              <div className="font-bold text-[#191C1D]">Nodal Officer (FCA)</div>
              <div className="text-[10px] text-[#5B5F63]">Uttarakhand Forest Department</div>
              <div className="text-[10px] text-[#5B5F63] font-mono mt-1">Pending State Advisory Review</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Trees, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ArrowUpDown, 
  Eye, 
  MapPin, 
  SlidersHorizontal,
  FileSpreadsheet
} from 'lucide-react';
import { ProjectAssessment, TreeRecord } from '../../types';

interface TreeInventoryViewProps {
  project: ProjectAssessment;
  trees: TreeRecord[];
  onInspectTreeOnMap?: (tree: TreeRecord) => void;
  language: 'en' | 'hi';
}

export const TreeInventoryView: React.FC<TreeInventoryViewProps> = ({
  project,
  trees,
  onInspectTreeOnMap,
  language
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('ALL');
  const [selectedVerification, setSelectedVerification] = useState<string>('ALL');
  const [selectedImpact, setSelectedImpact] = useState<string>('ALL');
  const [minConfidence, setMinConfidence] = useState<number>(50);

  // Extract unique species
  const allSpecies = Array.from(new Set(trees.map(t => t.species)));

  const filteredTrees = trees.filter(t => {
    const matchesSearch = 
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.speciesScientific && t.speciesScientific.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecies = selectedSpecies === 'ALL' || t.species === selectedSpecies;
    const matchesVerif = selectedVerification === 'ALL' || t.verificationStatus === selectedVerification;
    const matchesImpact = selectedImpact === 'ALL' || t.projectImpact === selectedImpact;
    const matchesConfidence = t.confidencePercent >= minConfidence;

    return matchesSearch && matchesSpecies && matchesVerif && matchesImpact && matchesConfidence;
  });

  const downloadCsv = () => {
    const headers = ['Tree ID', 'Latitude', 'Longitude', 'Species', 'Scientific Name', 'Height (m)', 'Girth (cm)', 'AI Confidence (%)', 'Verification Status', 'Project Impact'];
    const rows = filteredTrees.map(t => [
      t.id,
      t.lat,
      t.lng,
      `"${t.species}"`,
      `"${t.speciesScientific || ''}"`,
      t.estimatedHeightM,
      t.girthCm,
      t.confidencePercent,
      t.verificationStatus,
      t.projectImpact
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VanRakshak_Tree_Inventory_${project.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            Tree Inventory & Enumeration Registry
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F63] mt-0.5">
            Automated crown delineation and ground-validated botanical registry for forest diversion calculation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadCsv}
            className="bg-white text-[#1B4332] border border-[#DEE2E6] hover:bg-[#F8F9FA] transition-colors py-2 px-3 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Registry (CSV)</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs">
          <div className="flex justify-between items-center text-[#5B5F63] text-xs font-bold uppercase tracking-wider">
            <span>Total Trees Detected</span>
            <Trees className="w-4 h-4 text-[#1B4332]" />
          </div>
          <div className="text-2xl font-bold text-[#191C1D] mt-2 font-mono">
            {project.metrics.treesDetected.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#5B5F63] mt-1">Across 180 km² Study Basin</div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs">
          <div className="flex justify-between items-center text-[#5B5F63] text-xs font-bold uppercase tracking-wider">
            <span>Potentially Affected Trees</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F]" />
          </div>
          <div className="text-2xl font-bold text-[#D32F2F] mt-2 font-mono">
            {project.metrics.treesInCorridor.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#5B5F63] mt-1">Inside 60m Infrastructure Corridor</div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs">
          <div className="flex justify-between items-center text-[#5B5F63] text-xs font-bold uppercase tracking-wider">
            <span>Ground Verified</span>
            <CheckCircle className="w-4 h-4 text-[#1B5E20]" />
          </div>
          <div className="text-2xl font-bold text-[#1B5E20] mt-2 font-mono">
            {project.metrics.treesVerified.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#1B5E20] mt-1 font-semibold">91.1% Verified by Forest Staff</div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-4 shadow-2xs border-l-4 border-l-[#F57F17]">
          <div className="flex justify-between items-center text-[#5B5F63] text-xs font-bold uppercase tracking-wider">
            <span>Requires Verification</span>
            <Clock className="w-4 h-4 text-[#F57F17]" />
          </div>
          <div className="text-2xl font-bold text-[#F57F17] mt-2 font-mono">
            {project.metrics.treesPendingVerification}
          </div>
          <div className="text-[11px] text-[#7F5000] mt-1">In Ground Queue (Low Confidence / Shade)</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#DEE2E6] rounded p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#5B5F63]" />
            <input
              type="text"
              placeholder="Search Tree ID, Species, Scientific Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-[#F8F9FA] border border-[#DEE2E6] rounded focus:outline-none focus:border-[#1B4332] w-64"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5B5F63] font-medium">Species:</span>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="bg-[#F8F9FA] border border-[#DEE2E6] rounded px-2 py-1 text-xs text-[#191C1D] focus:outline-none focus:border-[#1B4332]"
            >
              <option value="ALL">All Species ({allSpecies.length})</option>
              {allSpecies.map((sp) => (
                <option key={sp} value={sp}>{sp}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5B5F63] font-medium">Verification:</span>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="bg-[#F8F9FA] border border-[#DEE2E6] rounded px-2 py-1 text-xs text-[#191C1D] focus:outline-none focus:border-[#1B4332]"
            >
              <option value="ALL">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Corrected">Corrected</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5B5F63] font-medium">Impact:</span>
            <select
              value={selectedImpact}
              onChange={(e) => setSelectedImpact(e.target.value)}
              className="bg-[#F8F9FA] border border-[#DEE2E6] rounded px-2 py-1 text-xs text-[#191C1D] focus:outline-none focus:border-[#1B4332]"
            >
              <option value="ALL">All Impacts</option>
              <option value="Affected">Potentially Affected</option>
              <option value="Borderline">Borderline (Within 10m)</option>
              <option value="Not Affected">Preserved</option>
            </select>
          </div>
        </div>

        {/* Confidence Threshold Slider */}
        <div className="flex items-center gap-2 text-xs bg-[#F8F9FA] border border-[#DEE2E6] px-2.5 py-1 rounded">
          <span className="text-[#5B5F63] font-medium">Min Conf: <strong>{minConfidence}%</strong></span>
          <input
            type="range"
            min="40"
            max="95"
            step="5"
            value={minConfidence}
            onChange={(e) => setMinConfidence(Number(e.target.value))}
            className="w-24 accent-[#1B4332] cursor-pointer"
          />
        </div>
      </div>

      {/* Main Tree Table */}
      <div className="bg-white border border-[#DEE2E6] rounded flex flex-col shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px] text-xs">
            <thead className="bg-[#F8F9FA] border-b border-[#DEE2E6] text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider sticky top-0">
              <tr>
                <th className="py-2.5 px-4 w-28">Tree ID</th>
                <th className="py-2.5 px-4 w-32">Coordinates</th>
                <th className="py-2.5 px-4">Species / Botanical Category</th>
                <th className="py-2.5 px-4 w-28">Height / Girth</th>
                <th className="py-2.5 px-4 w-28">Confidence</th>
                <th className="py-2.5 px-4 w-32">Verification</th>
                <th className="py-2.5 px-4 w-36">Project Impact</th>
                <th className="py-2.5 px-4 w-16 text-center">Map</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEE2E6] text-xs text-[#191C1D]">
              {filteredTrees.map((tree) => (
                <tr key={tree.id} className="gov-table-row">
                  <td className="py-3 px-4 font-mono font-semibold text-[#1B4332]">
                    {tree.id}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#5B5F63]">
                    {tree.lat.toFixed(5)}, {tree.lng.toFixed(5)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#191C1D]">{tree.species}</div>
                    {tree.speciesScientific && (
                      <div className="text-[11px] text-[#5B5F63] italic">
                        {tree.speciesScientific}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#5B5F63] font-mono">
                    <div>{tree.estimatedHeightM} m ht</div>
                    <div className="text-[10px] text-[#717973]">{tree.girthCm} cm girth</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold font-mono ${
                        tree.confidencePercent >= 85 ? 'text-[#1B5E20]' : tree.confidencePercent >= 70 ? 'text-[#F57F17]' : 'text-[#B71C1C]'
                      }`}>
                        {tree.confidencePercent}%
                      </span>
                      <div className="w-12 h-1.5 bg-[#E1E3E4] rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${tree.confidencePercent >= 85 ? 'bg-[#1B5E20]' : tree.confidencePercent >= 70 ? 'bg-[#F57F17]' : 'bg-[#B71C1C]'}`}
                          style={{ width: `${tree.confidencePercent}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {tree.verificationStatus === 'Verified' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    ) : tree.verificationStatus === 'Pending' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FFF8E1] text-[#F57F17] border border-[#FFECB3]">
                        <Clock className="w-3 h-3" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#E0F2F1] text-[#004D40] border border-[#B2DFDB]">
                        Corrected
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                      tree.projectImpact === 'Affected'
                        ? 'bg-[#FFEBEE] text-[#B71C1C] border border-[#FFCDD2]'
                        : tree.projectImpact === 'Borderline'
                        ? 'bg-[#FFF3E0] text-[#E65100] border border-[#FFE0B2]'
                        : 'bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]'
                    }`}>
                      {tree.projectImpact === 'Affected' ? 'Potentially Affected' : tree.projectImpact}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onInspectTreeOnMap && onInspectTreeOnMap(tree)}
                      className="p-1 rounded text-[#5B5F63] hover:text-[#1B4332] hover:bg-[#E1E3E4] transition-colors"
                      title="Inspect on GIS Map"
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-[#DEE2E6] bg-[#F8F9FA] flex items-center justify-between text-xs text-[#5B5F63]">
          <span>Showing {filteredTrees.length} of {trees.length} sample tree records (7,842 total detected in study compartment)</span>
          <span className="text-[11px] italic">
            Automated crown analysis uses YOLO-Forest v4.2 & LiDAR ground truth calibration.
          </span>
        </div>
      </div>
    </div>
  );
};

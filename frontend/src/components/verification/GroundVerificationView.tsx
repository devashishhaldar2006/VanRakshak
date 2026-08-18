import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  MapPin, 
  Camera, 
  UserCheck, 
  Check, 
  X, 
  Edit3, 
  Eye, 
  FileText,
  HelpCircle
} from 'lucide-react';
import { ProjectAssessment, GroundVerificationItem } from '../../types';

interface GroundVerificationViewProps {
  project: ProjectAssessment;
  verifications: GroundVerificationItem[];
  onUpdateVerification: (updated: GroundVerificationItem) => void;
  language: 'en' | 'hi';
}

export const GroundVerificationView: React.FC<GroundVerificationViewProps> = ({
  project,
  verifications,
  onUpdateVerification,
  language
}) => {
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'High' | 'Medium' | 'Low'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Pending' | 'Verified' | 'Corrected' | 'Rejected'>('ALL');
  const [selectedItem, setSelectedItem] = useState<GroundVerificationItem | null>(null);

  // Form states for modal
  const [reviewAction, setReviewAction] = useState<'confirm' | 'correct' | 'reject' | 'remark'>('confirm');
  const [officerRemarks, setOfficerRemarks] = useState('');
  const [correctedSpecies, setCorrectedSpecies] = useState('');
  const [surveyObservation, setSurveyObservation] = useState('');

  const filteredItems = verifications.filter(item => {
    const matchesPriority = priorityFilter === 'ALL' || item.priority === priorityFilter;
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesPriority && matchesStatus;
  });

  const handleOpenModal = (item: GroundVerificationItem) => {
    setSelectedItem(item);
    setOfficerRemarks(item.officerRemarks || '');
    setCorrectedSpecies(item.correctedSpecies || '');
    setSurveyObservation(item.surveyObservation || '');
    setReviewAction(item.status === 'Verified' ? 'confirm' : item.status === 'Corrected' ? 'correct' : 'confirm');
  };

  const handleSaveVerification = () => {
    if (!selectedItem) return;

    let newStatus: GroundVerificationItem['status'] = 'Pending';
    if (reviewAction === 'confirm') newStatus = 'Verified';
    if (reviewAction === 'correct') newStatus = 'Corrected';
    if (reviewAction === 'reject') newStatus = 'Rejected';

    const updated: GroundVerificationItem = {
      ...selectedItem,
      status: newStatus,
      officerRemarks: officerRemarks,
      correctedSpecies: correctedSpecies,
      surveyObservation: surveyObservation,
      verifiedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    onUpdateVerification(updated);
    setSelectedItem(null);
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
            Ground Verification & Field Validation Queue
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F63] mt-0.5">
            Human-in-the-loop field truth verification protocol for uncertain aerial detections, shadow occlusions, and heritage specimens.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FFF8E1] border border-[#FFE082] rounded px-3 py-2 text-xs text-[#7F5000]">
          <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
          <span><strong>127 locations</strong> require field officer verification before final DPR clearance.</span>
        </div>
      </div>

      {/* Distinction Banner: AI vs Ground Verified vs Human Corrected */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-white border border-[#DEE2E6] rounded p-3 flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full bg-[#0288D1] shrink-0" />
          <div>
            <div className="font-bold text-[#0D47A1]">AI Predicted Layer</div>
            <div className="text-[11px] text-[#5B5F63]">Automated crown classification from LiDAR/ortho</div>
          </div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-3 flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full bg-[#1B5E20] shrink-0" />
          <div>
            <div className="font-bold text-[#1B5E20]">Ground Verified</div>
            <div className="text-[11px] text-[#5B5F63]">Field officer audit confirmed on-site with RTK-GPS</div>
          </div>
        </div>

        <div className="bg-white border border-[#DEE2E6] rounded p-3 flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full bg-[#004D40] shrink-0" />
          <div>
            <div className="font-bold text-[#004D40]">Human Corrected</div>
            <div className="text-[11px] text-[#5B5F63]">Botanical or boundary discrepancy amended by officer</div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-[#DEE2E6] rounded p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#5B5F63] font-semibold">Priority:</span>
            <div className="flex border border-[#DEE2E6] rounded overflow-hidden">
              {(['ALL', 'High', 'Medium', 'Low'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-2.5 py-1 text-xs font-semibold transition-colors ${
                    priorityFilter === p ? 'bg-[#1B4332] text-white' : 'bg-white text-[#5B5F63] hover:bg-[#F8F9FA]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#5B5F63] font-semibold">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-[#F8F9FA] border border-[#DEE2E6] rounded px-2.5 py-1 text-xs text-[#191C1D] focus:outline-none focus:border-[#1B4332]"
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending Audit</option>
              <option value="Verified">Verified by Officer</option>
              <option value="Corrected">Human Corrected</option>
            </select>
          </div>
        </div>

        <span className="text-xs text-[#5B5F63]">
          Showing {filteredItems.length} locations in current view
        </span>
      </div>

      {/* Verification Queue Table */}
      <div className="bg-white border border-[#DEE2E6] rounded flex flex-col shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px] text-xs">
            <thead className="bg-[#F8F9FA] border-b border-[#DEE2E6] text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider sticky top-0">
              <tr>
                <th className="py-2.5 px-4 w-32">Location ID</th>
                <th className="py-2.5 px-4 w-32">Coordinates</th>
                <th className="py-2.5 px-4 w-28">Priority</th>
                <th className="py-2.5 px-4">AI Prediction & Reason</th>
                <th className="py-2.5 px-4 w-24">Confidence</th>
                <th className="py-2.5 px-4 w-44">Assigned Officer</th>
                <th className="py-2.5 px-4 w-32">Status</th>
                <th className="py-2.5 px-4 w-24 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEE2E6] text-xs text-[#191C1D]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="gov-table-row">
                  <td className="py-3 px-4 font-mono font-semibold text-[#1B4332]">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#5B5F63]">
                    {item.lat.toFixed(5)}, {item.lng.toFixed(5)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.priority === 'High'
                        ? 'bg-[#FFEBEE] text-[#B71C1C] border border-[#FFCDD2]'
                        : item.priority === 'Medium'
                        ? 'bg-[#FFF8E1] text-[#F57F17] border border-[#FFECB3]'
                        : 'bg-[#F5F5F5] text-[#616161] border border-[#E0E0E0]'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#191C1D]">{item.aiPrediction}</div>
                    <div className="text-[11px] text-[#5B5F63] mt-0.5 line-clamp-1">
                      {item.reasonForVerification}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold">
                    <span className={item.aiConfidence < 70 ? 'text-[#D97706]' : 'text-[#1B5E20]'}>
                      {item.aiConfidence}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#5B5F63]">
                    {item.assignedOfficer}
                  </td>
                  <td className="py-3 px-4">
                    {item.status === 'Verified' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    ) : item.status === 'Corrected' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#E0F2F1] text-[#004D40] border border-[#B2DFDB]">
                        <Edit3 className="w-3 h-3" /> Corrected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FFF8E1] text-[#F57F17] border border-[#FFECB3]">
                        <Clock className="w-3 h-3" /> Pending Audit
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="bg-[#1B4332] text-white hover:bg-[#012D1D] px-2.5 py-1 rounded text-xs font-semibold flex items-center justify-center gap-1 mx-auto transition-colors shadow-2xs"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Audit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Field Verification Modal Dialog */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-[#DEE2E6] rounded shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#1B4332] text-white px-4 py-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A5D0B9]">
                  Ground Truth Verification Review
                </span>
                <h3 className="font-bold text-base">
                  {selectedItem.id} — {selectedItem.aiPrediction}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-[#C1ECD4] hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs text-[#191C1D]">
              {/* Evidence & Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#5B5F63] uppercase tracking-wider text-[10px] block mb-1">
                    Field Photograph Evidence
                  </label>
                  <img
                    src={selectedItem.imageUrl}
                    alt="Ground Survey Photo"
                    className="w-full h-44 object-cover rounded border border-[#DEE2E6]"
                  />
                  <div className="text-[10px] text-[#717973] mt-1 flex justify-between font-mono">
                    <span>GPS: {selectedItem.lat.toFixed(5)}°N, {selectedItem.lng.toFixed(5)}°E</span>
                    <span>{selectedItem.timestamp}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="bg-[#F8F9FA] p-2.5 rounded border border-[#DEE2E6]">
                    <div className="text-[10px] font-bold text-[#717973] uppercase">AI Detection Output</div>
                    <div className="font-semibold text-sm text-[#012D1D] mt-0.5">{selectedItem.aiPrediction}</div>
                    <div className="text-xs text-[#1B5E20] font-bold mt-0.5">Confidence: {selectedItem.aiConfidence}%</div>
                  </div>

                  <div className="bg-[#FFF8E1] p-2.5 rounded border border-[#FFE082]">
                    <div className="text-[10px] font-bold text-[#7F5000] uppercase">Reason for Verification</div>
                    <p className="text-xs text-[#5D4037] mt-0.5 leading-relaxed">
                      {selectedItem.reasonForVerification}
                    </p>
                  </div>

                  <div className="text-[11px] text-[#5B5F63]">
                    Assigned Officer: <strong className="text-[#191C1D]">{selectedItem.assignedOfficer}</strong>
                  </div>
                </div>
              </div>

              {/* Officer Audit Actions */}
              <div className="space-y-3 pt-2 border-t border-[#DEE2E6]">
                <label className="font-bold text-[#012D1D] uppercase tracking-wider text-[11px] block">
                  Officer Determination & Actions
                </label>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setReviewAction('confirm')}
                    className={`p-2 rounded border text-center font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      reviewAction === 'confirm'
                        ? 'bg-[#E8F5E9] border-[#1B5E20] text-[#1B5E20] ring-1 ring-[#1B5E20]'
                        : 'bg-white border-[#DEE2E6] text-[#5B5F63]'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm AI (Verified)</span>
                  </button>

                  <button
                    onClick={() => setReviewAction('correct')}
                    className={`p-2 rounded border text-center font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      reviewAction === 'correct'
                        ? 'bg-[#E0F2F1] border-[#004D40] text-[#004D40] ring-1 ring-[#004D40]'
                        : 'bg-white border-[#DEE2E6] text-[#5B5F63]'
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Correct Species</span>
                  </button>

                  <button
                    onClick={() => setReviewAction('reject')}
                    className={`p-2 rounded border text-center font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      reviewAction === 'reject'
                        ? 'bg-[#FFEBEE] border-[#B71C1C] text-[#B71C1C] ring-1 ring-[#B71C1C]'
                        : 'bg-white border-[#DEE2E6] text-[#5B5F63]'
                    }`}
                  >
                    <X className="w-4 h-4" />
                    <span>Reject Outlier</span>
                  </button>
                </div>

                {reviewAction === 'correct' && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#5B5F63]">Corrected Botanical Species Classification:</label>
                    <input
                      type="text"
                      placeholder="e.g. Himalayan Deodar (Cedrus deodara)"
                      value={correctedSpecies}
                      onChange={(e) => setCorrectedSpecies(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded p-2 text-xs focus:outline-none focus:border-[#1B4332]"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#5B5F63]">Field Survey Observation & Girth Log:</label>
                  <textarea
                    rows={2}
                    placeholder="Enter on-ground physical inspection remarks (e.g. DBH 45cm, mature specimen in healthy condition)..."
                    value={surveyObservation}
                    onChange={(e) => setSurveyObservation(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded p-2 text-xs focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#5B5F63]">Official Officer Endorsement Remarks:</label>
                  <input
                    type="text"
                    placeholder="Official signoff remarks for statutory record..."
                    value={officerRemarks}
                    onChange={(e) => setOfficerRemarks(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded p-2 text-xs focus:outline-none focus:border-[#1B4332]"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#F8F9FA] px-4 py-3 border-t border-[#DEE2E6] flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-3 py-1.5 border border-[#DEE2E6] rounded text-xs font-semibold text-[#5B5F63] hover:bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVerification}
                className="px-4 py-1.5 bg-[#1B4332] text-white rounded text-xs font-bold hover:bg-[#012D1D] transition-colors"
              >
                Submit Field Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

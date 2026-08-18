import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { ProjectDetailView } from './components/assessment/ProjectDetailView';
import { AlternativeRouteView } from './components/routes/AlternativeRouteView';
import { TreeInventoryView } from './components/trees/TreeInventoryView';
import { GroundVerificationView } from './components/verification/GroundVerificationView';
import { VegetationView } from './components/vegetation/VegetationView';
import { WildlifeEvidenceView } from './components/wildlife/WildlifeEvidenceView';
import { HabitatSensitivityView } from './components/habitat/HabitatSensitivityView';
import { WaterTerrainView } from './components/water/WaterTerrainView';
import { ImpactAssessmentView } from './components/reports/ImpactAssessmentView';
import { DetailedReportView } from './components/reports/DetailedReportView';
import { DataSourcesView } from './components/admin/DataSourcesView';
import { AiModelStatusView } from './components/admin/AiModelStatusView';
import { NewAssessmentModal } from './components/projects/NewAssessmentModal';
import { GisMap } from './components/gis/GisMap';

import { 
  mockProjects, 
  mockRouteAlternatives, 
  mockTrees, 
  mockWildlifeObservations, 
  mockGroundVerifications 
} from './data/mockData';
import { 
  ProjectAssessment, 
  ActiveTab, 
  TreeRecord, 
  GroundVerificationItem 
} from './types';

export default function App() {
  const [projects, setProjects] = useState<ProjectAssessment[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectAssessment>(mockProjects[0]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isNewAssessmentModalOpen, setIsNewAssessmentModalOpen] = useState<boolean>(false);
  const [trees, setTrees] = useState<TreeRecord[]>(mockTrees);
  const [groundVerifications, setGroundVerifications] = useState<GroundVerificationItem[]>(mockGroundVerifications);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Update a ground verification item
  const handleUpdateVerification = (updated: GroundVerificationItem) => {
    setGroundVerifications(prev => prev.map(item => item.id === updated.id ? updated : item));
    // If it was corrected, also update the tree record
    if (updated.status === 'Corrected' && updated.correctedSpecies) {
      setTrees(prev => prev.map(t => {
        if (t.id === updated.treeId) {
          return { ...t, species: updated.correctedSpecies!, verificationStatus: 'Corrected' };
        }
        return t;
      }));
    }
  };

  // Add a newly created project
  const handleCreateProject = (newProject: ProjectAssessment) => {
    setProjects(prev => [newProject, ...prev]);
    setSelectedProject(newProject);
    setActiveTab('project_detail');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#191C1D] flex flex-col font-sans antialiased">
      {/* Official Government Header */}
      <Header
        selectedProject={selectedProject}
        allProjects={projects}
        onSelectProject={(proj) => {
          setSelectedProject(proj);
          setActiveTab('project_detail');
        }}
        language={language}
        setLanguage={setLanguage}
        onLanguageChange={setLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewAssessment={() => setIsNewAssessmentModalOpen(true)}
      />

      {/* Main App Layout: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setMobileMenuOpen(false);
          }}
          language={language}
          selectedProject={selectedProject}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
        />

        {/* Dynamic Main Workspace Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#F8F9FA] relative focus:outline-none">
          {activeTab === 'dashboard' && (
            <DashboardView
              projects={projects}
              onSelectProject={(proj) => {
                setSelectedProject(proj);
                setActiveTab('project_detail');
              }}
              onOpenNewAssessment={() => setIsNewAssessmentModalOpen(true)}
              setActiveTab={setActiveTab}
              language={language}
            />
          )}

          {activeTab === 'project_detail' && (
            <ProjectDetailView
              project={selectedProject}
              routes={mockRouteAlternatives}
              trees={trees}
              wildlife={mockWildlifeObservations}
              setActiveTab={setActiveTab}
              language={language}
            />
          )}

          {activeTab === 'alternative_routes' && (
            <AlternativeRouteView
              project={selectedProject}
              routes={mockRouteAlternatives}
              trees={trees}
              wildlife={mockWildlifeObservations}
              groundVerifications={groundVerifications}
              language={language}
            />
          )}

          {activeTab === 'tree_inventory' && (
            <TreeInventoryView
              project={selectedProject}
              trees={trees}
              onInspectTreeOnMap={(tree) => {
                setActiveTab('alternative_routes');
              }}
              language={language}
            />
          )}

          {activeTab === 'ground_verification' && (
            <GroundVerificationView
              project={selectedProject}
              verifications={groundVerifications}
              onUpdateVerification={handleUpdateVerification}
              language={language}
            />
          )}

          {activeTab === 'vegetation' && (
            <VegetationView
              project={selectedProject}
              language={language}
            />
          )}

          {activeTab === 'wildlife_evidence' && (
            <WildlifeEvidenceView
              project={selectedProject}
              observations={mockWildlifeObservations}
              language={language}
            />
          )}

          {activeTab === 'habitat_sensitivity' && (
            <HabitatSensitivityView
              project={selectedProject}
              routes={mockRouteAlternatives}
              language={language}
            />
          )}

          {activeTab === 'water_terrain' && (
            <WaterTerrainView
              project={selectedProject}
              language={language}
            />
          )}

          {activeTab === 'gis_map' && (
            <div className="p-4 lg:p-6 space-y-4 max-w-7xl mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-[#DEE2E6]">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-[#191C1D]">
                    VanRakshak GIS Geospatial Studio
                  </h2>
                  <p className="text-xs text-[#5B5F63]">
                    Interactive spatial viewer with multi-spectral satellite imagery, LiDAR crown vectors, and wildlife corridors.
                  </p>
                </div>
              </div>
              <div className="bg-white border border-[#DEE2E6] rounded p-3 shadow-2xs">
                <GisMap
                  project={selectedProject}
                  routes={mockRouteAlternatives}
                  trees={trees}
                  wildlife={mockWildlifeObservations}
                  groundVerifications={groundVerifications}
                  heightClass="h-[620px]"
                />
              </div>
            </div>
          )}

          {activeTab === 'impact_assessment' && (
            <ImpactAssessmentView
              project={selectedProject}
              routes={mockRouteAlternatives}
              onOpenDetailedReport={() => setActiveTab('reports')}
              language={language}
            />
          )}

          {activeTab === 'reports' && (
            <DetailedReportView
              project={selectedProject}
              routes={mockRouteAlternatives}
              trees={trees}
              onBack={() => setActiveTab('impact_assessment')}
              language={language}
            />
          )}

          {activeTab === 'data_sources' && (
            <DataSourcesView />
          )}

          {activeTab === 'ai_model_status' && (
            <AiModelStatusView />
          )}
        </main>
      </div>

      {/* New Assessment Creation Modal */}
      <NewAssessmentModal
        isOpen={isNewAssessmentModalOpen}
        onClose={() => setIsNewAssessmentModalOpen(false)}
        onCreateProject={handleCreateProject}
        language={language}
      />
    </div>
  );
}

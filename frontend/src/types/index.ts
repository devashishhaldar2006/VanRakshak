export type ProjectStatus = 
  | 'Draft' 
  | 'Analysis in Progress' 
  | 'Assessment in Progress'
  | 'Ground Verification' 
  | 'Completed' 
  | 'Requires Attention';

export type EnvironmentalRisk = 'Low' | 'Medium' | 'High';

export type ProjectType = 
  | 'Highway' 
  | 'Transmission Line' 
  | 'Railway' 
  | 'Water Pipeline' 
  | 'Mining Access' 
  | 'Hydroelectric';

export interface ProjectAssessment {
  id: string;
  name: string;
  type: ProjectType;
  authority: string;
  state: string;
  district: string;
  startLocation: string;
  endLocation: string;
  status: ProjectStatus;
  risk: EnvironmentalRisk;
  lastUpdated: string;
  createdDate: string;
  corridorWidthM: number;
  projectLengthKm: number;
  forestDivision: string;
  description: string;
  coordinates: {
    start: [number, number];
    end: [number, number];
  };
  metrics: {
    forestAreaHa: number;
    treesDetected: number;
    treesInCorridor: number;
    treesVerified: number;
    treesPendingVerification: number;
    waterCrossings: number;
    highSensitivityZones: number;
    wildlifeEvidenceCount: number;
    fragmentationIndex: 'Low' | 'Medium' | 'High';
    modeledEcologicalImpact: number; // 0 - 100
  };
  pipelineStage: {
    projectSetup: boolean;
    dataCollection: boolean;
    aiAnalysis: boolean;
    impactAssessment: 'completed' | 'in_progress' | 'pending';
    groundVerification: 'completed' | 'in_progress' | 'pending';
    routeOptimization: 'completed' | 'in_progress' | 'pending';
    finalReport: 'completed' | 'in_progress' | 'pending';
  };
}

export interface RouteAlternative {
  id: string;
  name: string;
  code: 'PROPOSED' | 'ALT_A' | 'ALT_B' | 'ALT_C';
  isRecommended?: boolean;
  lengthKm: number;
  treesAffected: number;
  forestAreaHa: number;
  waterCrossings: number;
  wildlifeSensitivity: 'Low' | 'Medium' | 'High';
  terrainDifficulty: 'Low' | 'Medium' | 'High';
  estimatedCostRating: 'Low' | 'Medium' | 'High';
  modeledEcologicalImpact: number; // lower is better
  pathPoints: [number, number][];
  elevationGainM: number;
  maxSlopePercent: number;
  sensitiveZoneIntersectionsKm: number;
  keyJustifications: string[];
}

export interface TreeRecord {
  id: string;
  lat: number;
  lng: number;
  species: string;
  speciesScientific?: string;
  estimatedHeightM: number;
  canopyDiameterM: number;
  confidencePercent: number;
  verificationStatus: 'Verified' | 'Pending' | 'Corrected' | 'Rejected';
  projectImpact: 'Affected' | 'Borderline' | 'Not Affected';
  girthCm: number;
  commercialClass: string;
  verifiedBy?: string;
  verificationDate?: string;
}

export interface GroundVerificationItem {
  id: string;
  projectId: string;
  treeId?: string;
  lat: number;
  lng: number;
  priority: 'High' | 'Medium' | 'Low';
  aiPrediction: string;
  aiConfidence: number;
  reasonForVerification: string;
  assignedOfficer: string;
  status: 'Pending' | 'Verified' | 'Corrected' | 'Rejected';
  imageUrl: string;
  timestamp: string;
  surveyObservation?: string;
  officerRemarks?: string;
  correctedSpecies?: string;
  verifiedAt?: string;
}

export interface WildlifeObservation {
  id: string;
  projectId: string;
  category: string;
  speciesIndicative: string;
  lat: number;
  lng: number;
  evidenceType: 'Direct Sighting' | 'Camera Trap' | 'Scat / Pugmark' | 'Corridor Pathway';
  imageEvidence: string;
  confidencePercent: number;
  groundVerification: 'Verified' | 'Pending' | 'Under Review';
  sensitivityLevel: 'High' | 'Medium' | 'Low';
  observationDate: string;
  remarks: string;
}

export interface DataSourceItem {
  id: string;
  type: 'Satellite' | 'Aerial LiDAR' | 'Ground Survey' | 'GIS Layer' | 'Forest Cadastral';
  name: string;
  sourceAuthority: string;
  acquisitionDate: string;
  resolution: string;
  status: 'Processed' | 'Operational' | 'Syncing';
  coverageKm2: number;
  format: string;
}

export interface AiModelMetadata {
  id: string;
  task: string;
  version: string;
  lastUpdated: string;
  status: 'Operational' | 'Degraded' | 'Calibrating';
  meanAveragePrecision: number;
  confidenceThreshold: number;
  validationDatasetSize: string;
  description: string;
}

export interface GisLayerToggle {
  proposedRoute: boolean;
  alternativeRoutes: boolean;
  individualTrees: boolean;
  treeDensityHeatmap: boolean;
  forestCanopy: boolean;
  wildlifeEvidence: boolean;
  habitatSensitivity: boolean;
  waterBodies: boolean;
  terrainContours: boolean;
  groundVerificationPoints: boolean;
}

export type ActiveTab = 
  | 'dashboard'
  | 'projects'
  | 'project_detail'
  | 'new_assessment'
  | 'alternative_routes'
  | 'tree_inventory'
  | 'vegetation'
  | 'wildlife_evidence'
  | 'habitat_sensitivity'
  | 'water_terrain'
  | 'ground_verification'
  | 'impact_assessment'
  | 'reports'
  | 'data_sources'
  | 'ai_model_status'
  | 'users'
  | 'settings';

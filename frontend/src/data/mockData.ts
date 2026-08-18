import { 
  ProjectAssessment, 
  RouteAlternative, 
  TreeRecord, 
  GroundVerificationItem, 
  WildlifeObservation, 
  DataSourceItem, 
  AiModelMetadata 
} from '../types';

export const mockProjects: ProjectAssessment[] = [
  {
    id: 'FD-2026-001',
    name: 'NH Forest Corridor Bypass',
    type: 'Highway',
    authority: 'National Highways Authority of India (NHAI)',
    state: 'Uttarakhand',
    district: 'Tehri Garhwal',
    startLocation: 'Chamba Junction (Chainage 0+000)',
    endLocation: 'Tehri Bypass Point B (Chainage 42+300)',
    status: 'Analysis in Progress',
    risk: 'High',
    lastUpdated: '18 Aug 2026',
    createdDate: '02 Aug 2026',
    corridorWidthM: 60,
    projectLengthKm: 42.3,
    forestDivision: 'Tehri Dam Forest Division',
    description: 'Proposed 4-lane highway expansion passing through Reserve Forest compartment 4B and mixed temperate moist deciduous forest zone.',
    coordinates: {
      start: [30.3541, 78.3982],
      end: [30.4124, 78.4891]
    },
    metrics: {
      forestAreaHa: 14.3,
      treesDetected: 7842,
      treesInCorridor: 2100,
      treesVerified: 1301,
      treesPendingVerification: 127,
      waterCrossings: 7,
      highSensitivityZones: 2,
      wildlifeEvidenceCount: 11,
      fragmentationIndex: 'High',
      modeledEcologicalImpact: 82
    },
    pipelineStage: {
      projectSetup: true,
      dataCollection: true,
      aiAnalysis: true,
      impactAssessment: 'in_progress',
      groundVerification: 'in_progress',
      routeOptimization: 'completed',
      finalReport: 'pending'
    }
  },
  {
    id: 'FD-2026-002',
    name: '400kV Transmission Corridor',
    type: 'Transmission Line',
    authority: 'Power Grid Corporation of India (PGCIL)',
    state: 'Madhya Pradesh',
    district: 'Umaria',
    startLocation: 'Katni Substation',
    endLocation: 'Shahdol Grid Terminal',
    status: 'Ground Verification',
    risk: 'Medium',
    lastUpdated: '17 Aug 2026',
    createdDate: '24 Jul 2026',
    corridorWidthM: 46,
    projectLengthKm: 28.6,
    forestDivision: 'Bandhavgarh Buffer Zone Division',
    description: 'High-voltage line traversing peripheral teak scrub and seasonal elephant corridor buffer areas.',
    coordinates: {
      start: [23.8341, 80.3982],
      end: [23.2924, 81.3591]
    },
    metrics: {
      forestAreaHa: 9.4,
      treesDetected: 4320,
      treesInCorridor: 920,
      treesVerified: 810,
      treesPendingVerification: 42,
      waterCrossings: 4,
      highSensitivityZones: 1,
      wildlifeEvidenceCount: 8,
      fragmentationIndex: 'Medium',
      modeledEcologicalImpact: 58
    },
    pipelineStage: {
      projectSetup: true,
      dataCollection: true,
      aiAnalysis: true,
      impactAssessment: 'completed',
      groundVerification: 'in_progress',
      routeOptimization: 'completed',
      finalReport: 'pending'
    }
  },
  {
    id: 'FD-2026-003',
    name: 'Rail Connectivity Line Link',
    type: 'Railway',
    authority: 'East Coast Railway (ECoR)',
    state: 'Odisha',
    district: 'Koraput',
    startLocation: 'Rayagada Junction',
    endLocation: 'Damanjodi Freight Yard',
    status: 'Completed',
    risk: 'Low',
    lastUpdated: '15 Aug 2026',
    createdDate: '10 Jun 2026',
    corridorWidthM: 35,
    projectLengthKm: 64.1,
    forestDivision: 'Koraput South Division',
    description: 'Electrified broad gauge track realigned along degraded ridge-lines minimizing moist deciduous tree felling.',
    coordinates: {
      start: [19.1712, 83.4152],
      end: [18.7741, 82.8712]
    },
    metrics: {
      forestAreaHa: 6.2,
      treesDetected: 5120,
      treesInCorridor: 480,
      treesVerified: 480,
      treesPendingVerification: 0,
      waterCrossings: 3,
      highSensitivityZones: 0,
      wildlifeEvidenceCount: 4,
      fragmentationIndex: 'Low',
      modeledEcologicalImpact: 34
    },
    pipelineStage: {
      projectSetup: true,
      dataCollection: true,
      aiAnalysis: true,
      impactAssessment: 'completed',
      groundVerification: 'completed',
      routeOptimization: 'completed',
      finalReport: 'completed'
    }
  },
  {
    id: 'FD-2026-004',
    name: 'Regional Potable Water Pipeline',
    type: 'Water Pipeline',
    authority: 'Maharashtra Water Resources Regulatory Authority',
    state: 'Maharashtra',
    district: 'Satara',
    startLocation: 'Koyna Reservoir Intake',
    endLocation: 'Patan Water Treatment Plant',
    status: 'Analysis in Progress',
    risk: 'Medium',
    lastUpdated: '14 Aug 2026',
    createdDate: '01 Aug 2026',
    corridorWidthM: 18,
    projectLengthKm: 18.2,
    forestDivision: 'Satara Ghats Division',
    description: 'Underground potable gravity pipeline traversing secondary evergreen slopes.',
    coordinates: {
      start: [17.3912, 73.7452],
      end: [17.3241, 73.9112]
    },
    metrics: {
      forestAreaHa: 3.8,
      treesDetected: 2410,
      treesInCorridor: 310,
      treesVerified: 220,
      treesPendingVerification: 28,
      waterCrossings: 5,
      highSensitivityZones: 1,
      wildlifeEvidenceCount: 3,
      fragmentationIndex: 'Medium',
      modeledEcologicalImpact: 47
    },
    pipelineStage: {
      projectSetup: true,
      dataCollection: true,
      aiAnalysis: true,
      impactAssessment: 'in_progress',
      groundVerification: 'pending',
      routeOptimization: 'in_progress',
      finalReport: 'pending'
    }
  },
  {
    id: 'FD-2026-005',
    name: 'Solar Evacuation Line 220kV',
    type: 'Transmission Line',
    authority: 'Rajasthan Renewable Energy Corp (RRECL)',
    state: 'Rajasthan',
    district: 'Jaisalmer',
    startLocation: 'Bhadla Phase IV Substation',
    endLocation: 'Ramgarh Grid Inverter',
    status: 'Requires Attention',
    risk: 'High',
    lastUpdated: '12 Aug 2026',
    createdDate: '15 Jul 2026',
    corridorWidthM: 30,
    projectLengthKm: 52.0,
    forestDivision: 'Desert National Park Peripheral Forest',
    description: 'Power evacuation corridor intersecting Great Indian Bustard (GIB) potential flight flightway and arid scrub biodiversity zone.',
    coordinates: {
      start: [27.5341, 71.9182],
      end: [26.8924, 71.2191]
    },
    metrics: {
      forestAreaHa: 11.2,
      treesDetected: 1890,
      treesInCorridor: 620,
      treesVerified: 410,
      treesPendingVerification: 89,
      waterCrossings: 1,
      highSensitivityZones: 3,
      wildlifeEvidenceCount: 14,
      fragmentationIndex: 'High',
      modeledEcologicalImpact: 88
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
  }
];

export const mockRouteAlternatives: RouteAlternative[] = [
  {
    id: 'route-prop',
    name: 'Proposed Alignment (Original DPR)',
    code: 'PROPOSED',
    isRecommended: false,
    lengthKm: 42.3,
    treesAffected: 2100,
    forestAreaHa: 14.3,
    waterCrossings: 7,
    wildlifeSensitivity: 'High',
    terrainDifficulty: 'High',
    estimatedCostRating: 'High',
    modeledEcologicalImpact: 82,
    elevationGainM: 1420,
    maxSlopePercent: 18.5,
    sensitiveZoneIntersectionsKm: 11.4,
    pathPoints: [
      [30.3541, 78.3982],
      [30.3680, 78.4120],
      [30.3790, 78.4290],
      [30.3910, 78.4520],
      [30.4020, 78.4710],
      [30.4124, 78.4891]
    ],
    keyJustifications: [
      'Shortest geometric length but cuts through dense old-growth Sal forest canopy',
      'Intersects 2 major perennial stream catchments requiring heavy embankment construction',
      'Traverses critical wildlife crossing corridor at KM 18.4 to 22.1'
    ]
  },
  {
    id: 'route-alt-a',
    name: 'Alternative A (Ridge Follower)',
    code: 'ALT_A',
    isRecommended: false,
    lengthKm: 44.1,
    treesAffected: 1050,
    forestAreaHa: 11.1,
    waterCrossings: 5,
    wildlifeSensitivity: 'Medium',
    terrainDifficulty: 'Medium',
    estimatedCostRating: 'Medium',
    modeledEcologicalImpact: 61,
    elevationGainM: 1180,
    maxSlopePercent: 14.2,
    sensitiveZoneIntersectionsKm: 5.8,
    pathPoints: [
      [30.3541, 78.3982],
      [30.3610, 78.4210],
      [30.3740, 78.4380],
      [30.3950, 78.4590],
      [30.4070, 78.4790],
      [30.4124, 78.4891]
    ],
    keyJustifications: [
      'Follows natural ridge contours avoiding 2 stream catchments',
      '50% reduction in mature tree felling compared to original DPR',
      'Moderately increased earthwork and minor slope stabilization required at KM 28'
    ]
  },
  {
    id: 'route-alt-b',
    name: 'Alternative B (Degraded Fringe Re-alignment)',
    code: 'ALT_B',
    isRecommended: true,
    lengthKm: 46.2,
    treesAffected: 700,
    forestAreaHa: 9.8,
    waterCrossings: 3,
    wildlifeSensitivity: 'Low',
    terrainDifficulty: 'Medium',
    estimatedCostRating: 'Medium',
    modeledEcologicalImpact: 43,
    elevationGainM: 980,
    maxSlopePercent: 11.8,
    sensitiveZoneIntersectionsKm: 1.9,
    pathPoints: [
      [30.3541, 78.3982],
      [30.3580, 78.4290],
      [30.3690, 78.4480],
      [30.3880, 78.4680],
      [30.4040, 78.4810],
      [30.4124, 78.4891]
    ],
    keyJustifications: [
      'Recommended for further evaluation: 66.7% reduction in potentially affected trees (700 vs 2,100)',
      'Re-routes entirely outside primary wildlife migration corridor onto degraded scrub fringe',
      'Minimizes water crossings from 7 to 3, preserving riparian buffer zones',
      'Within specified engineering constraints (Max Slope 11.8% vs 15.0% threshold)'
    ]
  }
];

export const mockTrees: TreeRecord[] = [
  {
    id: 'TREE-00892',
    lat: 30.3684,
    lng: 78.4142,
    species: 'Sal (Shorea robusta)',
    speciesScientific: 'Shorea robusta',
    estimatedHeightM: 22.4,
    canopyDiameterM: 9.8,
    confidencePercent: 94,
    verificationStatus: 'Verified',
    projectImpact: 'Affected',
    girthCm: 142,
    commercialClass: 'Class I Timber',
    verifiedBy: 'R. K. Rawat (Forest Guard)',
    verificationDate: '14 Aug 2026'
  },
  {
    id: 'TREE-00893',
    lat: 30.3689,
    lng: 78.4158,
    species: 'Chir Pine (Pinus roxburghii)',
    speciesScientific: 'Pinus roxburghii',
    estimatedHeightM: 18.1,
    canopyDiameterM: 7.2,
    confidencePercent: 61,
    verificationStatus: 'Pending',
    projectImpact: 'Affected',
    girthCm: 98,
    commercialClass: 'Class II Timber'
  },
  {
    id: 'TREE-00894',
    lat: 30.3712,
    lng: 78.4190,
    species: 'Deodar (Cedrus deodara)',
    speciesScientific: 'Cedrus deodara',
    estimatedHeightM: 26.5,
    canopyDiameterM: 11.2,
    confidencePercent: 96,
    verificationStatus: 'Verified',
    projectImpact: 'Affected',
    girthCm: 168,
    commercialClass: 'Class I Prime Timber',
    verifiedBy: 'S. Negi (Range Officer)',
    verificationDate: '15 Aug 2026'
  },
  {
    id: 'TREE-00895',
    lat: 30.3735,
    lng: 78.4231,
    species: 'Sheesham (Dalbergia sissoo)',
    speciesScientific: 'Dalbergia sissoo',
    estimatedHeightM: 14.8,
    canopyDiameterM: 6.4,
    confidencePercent: 88,
    verificationStatus: 'Verified',
    projectImpact: 'Borderline',
    girthCm: 84,
    commercialClass: 'Class II Timber',
    verifiedBy: 'R. K. Rawat (Forest Guard)',
    verificationDate: '14 Aug 2026'
  },
  {
    id: 'TREE-00896',
    lat: 30.3758,
    lng: 78.4265,
    species: 'Unknown / Mixed Deciduous',
    speciesScientific: 'Pending Botanical Audit',
    estimatedHeightM: 12.0,
    canopyDiameterM: 5.5,
    confidencePercent: 54,
    verificationStatus: 'Pending',
    projectImpact: 'Affected',
    girthCm: 72,
    commercialClass: 'Fuelwood / Unclassified'
  },
  {
    id: 'TREE-00897',
    lat: 30.3789,
    lng: 78.4312,
    species: 'Teak (Tectona grandis)',
    speciesScientific: 'Tectona grandis',
    estimatedHeightM: 21.0,
    canopyDiameterM: 8.5,
    confidencePercent: 92,
    verificationStatus: 'Verified',
    projectImpact: 'Affected',
    girthCm: 135,
    commercialClass: 'Class I Timber',
    verifiedBy: 'S. Negi (Range Officer)',
    verificationDate: '16 Aug 2026'
  },
  {
    id: 'TREE-00898',
    lat: 30.3815,
    lng: 78.4360,
    species: 'Jamun (Syzygium cumini)',
    speciesScientific: 'Syzygium cumini',
    estimatedHeightM: 16.2,
    canopyDiameterM: 8.0,
    confidencePercent: 89,
    verificationStatus: 'Verified',
    projectImpact: 'Not Affected',
    girthCm: 110,
    commercialClass: 'Ecological / Non-Timber',
    verifiedBy: 'R. K. Rawat (Forest Guard)',
    verificationDate: '14 Aug 2026'
  },
  {
    id: 'TREE-00899',
    lat: 30.3842,
    lng: 78.4410,
    species: 'Khair (Acacia catechu)',
    speciesScientific: 'Acacia catechu',
    estimatedHeightM: 9.5,
    canopyDiameterM: 4.8,
    confidencePercent: 78,
    verificationStatus: 'Pending',
    projectImpact: 'Affected',
    girthCm: 65,
    commercialClass: 'Minor Forest Produce'
  },
  {
    id: 'TREE-00900',
    lat: 30.3870,
    lng: 78.4475,
    species: 'Sal (Shorea robusta)',
    speciesScientific: 'Shorea robusta',
    estimatedHeightM: 24.0,
    canopyDiameterM: 10.4,
    confidencePercent: 95,
    verificationStatus: 'Verified',
    projectImpact: 'Affected',
    girthCm: 154,
    commercialClass: 'Class I Timber',
    verifiedBy: 'S. Negi (Range Officer)',
    verificationDate: '16 Aug 2026'
  },
  {
    id: 'TREE-00901',
    lat: 30.3905,
    lng: 78.4530,
    species: 'Semal (Bombax ceiba)',
    speciesScientific: 'Bombax ceiba',
    estimatedHeightM: 28.2,
    canopyDiameterM: 13.5,
    confidencePercent: 91,
    verificationStatus: 'Verified',
    projectImpact: 'Borderline',
    girthCm: 190,
    commercialClass: 'Ecological Keystone',
    verifiedBy: 'R. K. Rawat (Forest Guard)',
    verificationDate: '14 Aug 2026'
  }
];

export const mockGroundVerifications: GroundVerificationItem[] = [
  {
    id: 'VERIF-LOC-0142',
    projectId: 'FD-2026-001',
    lat: 30.3689,
    lng: 78.4158,
    priority: 'High',
    aiPrediction: 'Dense Sal Canopy Cluster (Overlap with stream)',
    aiConfidence: 61,
    reasonForVerification: 'Low botanical confidence score (61%) due to steep shadow cast in high-resolution aerial imagery.',
    assignedOfficer: 'S. Negi (Range Officer - Tehri)',
    status: 'Pending',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    timestamp: '17 Aug 2026 14:32 IST'
  },
  {
    id: 'VERIF-LOC-0143',
    projectId: 'FD-2026-001',
    lat: 30.3758,
    lng: 78.4265,
    priority: 'High',
    aiPrediction: 'Mixed Broadleaf with potential Heritage specimen',
    aiConfidence: 54,
    reasonForVerification: 'Canopy diameter exceeds 14m threshold requiring on-ground girth measurement and classification.',
    assignedOfficer: 'R. K. Rawat (Forest Guard)',
    status: 'Pending',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=80',
    timestamp: '16 Aug 2026 11:15 IST'
  },
  {
    id: 'VERIF-LOC-0144',
    projectId: 'FD-2026-001',
    lat: 30.3842,
    lng: 78.4410,
    priority: 'Medium',
    aiPrediction: 'Scrub / Degraded regrowth boundary',
    aiConfidence: 78,
    reasonForVerification: 'Discrepancy between FSI 2023 baseline classification (Open Forest) and current high-res ortho-mosaic.',
    assignedOfficer: 'R. K. Rawat (Forest Guard)',
    status: 'Pending',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80',
    timestamp: '15 Aug 2026 16:45 IST'
  },
  {
    id: 'VERIF-LOC-0139',
    projectId: 'FD-2026-001',
    lat: 30.3684,
    lng: 78.4142,
    priority: 'Medium',
    aiPrediction: 'Sal (Shorea robusta) - Mature timber',
    aiConfidence: 94,
    reasonForVerification: 'Standard sample verification for high-density commercial timber zone.',
    assignedOfficer: 'S. Negi (Range Officer)',
    status: 'Verified',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&auto=format&fit=crop&q=80',
    timestamp: '14 Aug 2026 10:20 IST',
    surveyObservation: 'Ground inspection confirms 3 mature Shorea robusta trees. Average DBH is 45cm. Healthy canopy condition.',
    officerRemarks: 'Species confirmed as Sal. Timber estimation matches automated aerial calculation within 5% tolerance.'
  },
  {
    id: 'VERIF-LOC-0138',
    projectId: 'FD-2026-001',
    lat: 30.3712,
    lng: 78.4190,
    priority: 'Low',
    aiPrediction: 'Pine Stand',
    aiConfidence: 72,
    reasonForVerification: 'Species classification corrected from Chir Pine to Himalayan Deodar after field sample audit.',
    assignedOfficer: 'R. K. Rawat (Forest Guard)',
    status: 'Corrected',
    imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=80',
    timestamp: '13 Aug 2026 09:40 IST',
    surveyObservation: 'Identified as Himalayan Deodar (Cedrus deodara), not Chir Pine.',
    officerRemarks: 'Species category updated in the master database. Impact rating adjusted accordingly.'
  }
];

export const mockWildlifeObservations: WildlifeObservation[] = [
  {
    id: 'WILD-041',
    projectId: 'FD-2026-001',
    category: 'Ungulate / Herbivore Evidence',
    speciesIndicative: 'Barking Deer (Muntiacus muntjak) & Sambar',
    lat: 30.3792,
    lng: 78.4310,
    evidenceType: 'Camera Trap',
    imageEvidence: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=800&auto=format&fit=crop&q=80',
    confidencePercent: 88,
    groundVerification: 'Verified',
    sensitivityLevel: 'High',
    observationDate: '12 Aug 2026',
    remarks: 'Seasonal night-time browsing activity recorded along riparian stream gulley (KM 21.3).'
  },
  {
    id: 'WILD-042',
    projectId: 'FD-2026-001',
    category: 'Carnivore Ecological Marker',
    speciesIndicative: 'Common Leopard (Panthera pardus)',
    lat: 30.3840,
    lng: 78.4425,
    evidenceType: 'Scat / Pugmark',
    imageEvidence: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80',
    confidencePercent: 78,
    groundVerification: 'Verified',
    sensitivityLevel: 'High',
    observationDate: '11 Aug 2026',
    remarks: 'Fresh territorial scrapes and pugmarks noted on ridge saddle. Secondary corridor movement.'
  },
  {
    id: 'WILD-043',
    projectId: 'FD-2026-001',
    category: 'Avian Canopy Roosting',
    speciesIndicative: 'Great Hornbill / Mixed Himalayan Avifauna',
    lat: 30.3915,
    lng: 78.4540,
    evidenceType: 'Direct Sighting',
    imageEvidence: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&auto=format&fit=crop&q=80',
    confidencePercent: 92,
    groundVerification: 'Verified',
    sensitivityLevel: 'Medium',
    observationDate: '09 Aug 2026',
    remarks: 'Old-growth Semal and Ficus nesting trees observed in canopy buffer zone.'
  },
  {
    id: 'WILD-044',
    projectId: 'FD-2026-001',
    category: 'Micro-Mammal / Burrowing',
    speciesIndicative: 'Indian Pangolin / Porcupine burrow habitat',
    lat: 30.3705,
    lng: 78.4180,
    evidenceType: 'Direct Sighting',
    imageEvidence: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800&auto=format&fit=crop&q=80',
    confidencePercent: 69,
    groundVerification: 'Pending',
    sensitivityLevel: 'Medium',
    observationDate: '08 Aug 2026',
    remarks: 'Active burrow cluster on eastern dry slope requiring buffer demarcation.'
  }
];

export const mockDataSources: DataSourceItem[] = [
  {
    id: 'DS-SAT-01',
    type: 'Satellite',
    name: 'Cartosat-3 High Resolution Panchromatic & Multispectral',
    sourceAuthority: 'National Remote Sensing Centre (ISRO / NRSC)',
    acquisitionDate: '04 Aug 2026',
    resolution: '0.28m GSD',
    status: 'Operational',
    coverageKm2: 180.5,
    format: 'GeoTIFF (16-bit radiometric)'
  },
  {
    id: 'DS-SAT-02',
    type: 'Satellite',
    name: 'Sentinel-2 Level-2A BOA Spectral Indices (NDVI, NDWI)',
    sourceAuthority: 'European Space Agency / Copernicus Open Access',
    acquisitionDate: '12 Aug 2026',
    resolution: '10.0m Spectral',
    status: 'Operational',
    coverageKm2: 450.0,
    format: 'Multi-band Cloud-Optimized GeoTIFF'
  },
  {
    id: 'DS-DRONE-01',
    type: 'Aerial LiDAR',
    name: 'High-Density LiDAR & RGB Orthomosaic Drone Flight Batch 2',
    sourceAuthority: 'Survey of India / Uttarakhand Forest Dept Directorate',
    acquisitionDate: '08 Aug 2026',
    resolution: '32 pts/m² LiDAR + 3cm RGB',
    status: 'Operational',
    coverageKm2: 38.4,
    format: 'LAS / LAZ Point Cloud & GeoTIFF'
  },
  {
    id: 'DS-GIS-01',
    type: 'Forest Cadastral',
    name: 'FSI National Forest Type Classification & Reserve Boundaries',
    sourceAuthority: 'Forest Survey of India (FSI Dehradun)',
    acquisitionDate: '15 Jan 2026',
    resolution: '1:25,000 Cadastral Scale',
    status: 'Operational',
    coverageKm2: 1200.0,
    format: 'ESRI Shapefile & GeoPackage'
  },
  {
    id: 'DS-FIELD-01',
    type: 'Ground Survey',
    name: 'GPS Ground Truth & Tree Girth Enumeration Logs (Batch 4)',
    sourceAuthority: 'Tehri Dam Divisional Forest Office Field Staff',
    acquisitionDate: '16 Aug 2026',
    resolution: 'Sub-meter RTK-GPS Points',
    status: 'Operational',
    coverageKm2: 14.3,
    format: 'GeoJSON & Standard Field Log CSV'
  }
];

export const mockAiModels: AiModelMetadata[] = [
  {
    id: 'MOD-TREE-01',
    task: 'Tree Individual Detection & Canopy Delineation',
    version: 'YOLO-Forest v4.2-Enhanced',
    lastUpdated: '10 Aug 2026',
    status: 'Operational',
    meanAveragePrecision: 91.4,
    confidenceThreshold: 50.0,
    validationDatasetSize: '45,200 labeled trees across 12 forest types',
    description: 'Deep neural network trained on multi-spectral drone imagery and high-resolution satellite tiles for crown boundary delineation.'
  },
  {
    id: 'MOD-SPEC-02',
    task: 'Species & Commercial Class Classification',
    version: 'BotanicalNet-ResNet101 v2.8',
    lastUpdated: '06 Aug 2026',
    status: 'Operational',
    meanAveragePrecision: 87.8,
    confidenceThreshold: 60.0,
    validationDatasetSize: '28,000 herbarium and aerial canopy spectral signatures',
    description: 'Multi-spectral feature extractor identifying dominant Indian forestry species (Sal, Teak, Pine, Deodar, Sheesham).'
  },
  {
    id: 'MOD-CANOPY-03',
    task: 'Vegetation & Canopy Density Segmentation',
    version: 'CanopyDense-UNet v3.1',
    lastUpdated: '02 Aug 2026',
    status: 'Operational',
    meanAveragePrecision: 94.2,
    confidenceThreshold: 55.0,
    validationDatasetSize: '8,500 km² FSI validated forest canopy masks',
    description: 'Semantic segmentation of forest density classes (Very Dense Forest >70%, Moderately Dense 40-70%, Open Forest 10-40%, Scrub <10%).'
  },
  {
    id: 'MOD-WILD-04',
    task: 'Ecological Habitat Sensitivity & Corridor Modeling',
    version: 'EcoCorridor-GraphNet v2.0',
    lastUpdated: '28 Jul 2026',
    status: 'Operational',
    meanAveragePrecision: 86.5,
    confidenceThreshold: 65.0,
    validationDatasetSize: '1,400 validated wildlife movement tracks & stream corridors',
    description: 'Ecological resistance surface modeling incorporating slope, water availability, canopy continuity, and human disturbance.'
  },
  {
    id: 'MOD-ROUTE-05',
    task: 'Multi-Objective Low-Impact Route Optimization',
    version: 'VanRakshak-RouteGen v4.0 (Constrained Dijkstra / A*)',
    lastUpdated: '01 Aug 2026',
    status: 'Operational',
    meanAveragePrecision: 96.0,
    confidenceThreshold: 70.0,
    validationDatasetSize: '120 completed highway & transmission DPR alignments',
    description: 'Pareto-optimal pathfinding balancing engineering constraints (slope, corridor width, curvature) against modeled ecological loss.'
  }
];

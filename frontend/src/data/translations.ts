export interface Translations {
  portalTitle: string;
  subtitle: string;
  tagline: string;
  govIndia: string;
  ministryName: string;
  disclaimer: string;
  newAssessment: string;
  exportReport: string;
  dateRange: string;
  dashboard: string;
  projects: string;
  proposedRoutes: string;
  alternativeRoutes: string;
  treeInventory: string;
  vegetation: string;
  wildlifeEvidence: string;
  habitatSensitivity: string;
  waterTerrain: string;
  groundVerification: string;
  validationQueue: string;
  impactAssessment: string;
  reports: string;
  dataSources: string;
  aiModelStatus: string;
  users: string;
  settings: string;
  activeProjects: string;
  assessmentsCompleted: string;
  awaitingVerification: string;
  highSensitivity: string;
  requiresAttention: string;
  recentAssessments: string;
  searchPlaceholder: string;
  status: string;
  envRisk: string;
  lastUpdated: string;
  action: string;
  viewDetails: string;
  systemStatus: string;
  operational: string;
  allRightsReserved: string;
}

export const translations: Record<'en' | 'hi', Translations> = {
  en: {
    portalTitle: 'VanRakshak',
    subtitle: 'AI-Powered Forest Enumeration & Low-Impact Diversion Planning System',
    tagline: 'Forest Diversion Assessment & Ecological Decision Support',
    govIndia: 'Government of India',
    ministryName: 'Ministry of Environment, Forest & Climate Change',
    disclaimer: 'Decision Support System — Final decisions subject to competent authority approval.',
    newAssessment: 'New Assessment',
    exportReport: 'Export Report',
    dateRange: 'Date Range',
    dashboard: 'Dashboard',
    projects: 'Projects',
    proposedRoutes: 'Proposed Routes',
    alternativeRoutes: 'Alternative Routes',
    treeInventory: 'Tree Inventory',
    vegetation: 'Vegetation & Canopy',
    wildlifeEvidence: 'Wildlife Evidence',
    habitatSensitivity: 'Habitat Sensitivity',
    waterTerrain: 'Water & Terrain',
    groundVerification: 'Ground Verification',
    validationQueue: 'Validation Queue',
    impactAssessment: 'Impact Assessment',
    reports: 'Detailed Reports',
    dataSources: 'Data Sources & Evidence',
    aiModelStatus: 'AI Model Status',
    users: 'Users & Roles',
    settings: 'System Settings',
    activeProjects: 'Active Projects',
    assessmentsCompleted: 'Assessments Completed',
    awaitingVerification: 'Awaiting Verification',
    highSensitivity: 'High Sensitivity',
    requiresAttention: 'Requires Attention',
    recentAssessments: 'Recent Project Assessments',
    searchPlaceholder: 'Search ID, Name or Location...',
    status: 'Status',
    envRisk: 'Env. Risk',
    lastUpdated: 'Last Updated',
    action: 'Action',
    viewDetails: 'View Details',
    systemStatus: 'System Status',
    operational: 'Operational',
    allRightsReserved: 'National Informatics Centre / Ministry of Environment, Forest & Climate Change guidelines compliant'
  },
  hi: {
    portalTitle: 'वनरक्षक',
    subtitle: 'एआई-संचालित वन गणना एवं न्यून-प्रभाव विचलन योजना प्रणाली',
    tagline: 'वन विचलन मूल्यांकन एवं पारिस्थितिक निर्णय समर्थन प्रणाली',
    govIndia: 'भारत सरकार',
    ministryName: 'पर्यावरण, वन एवं जलवायु परिवर्तन मंत्रालय',
    disclaimer: 'निर्णय समर्थन प्रणाली — अंतिम निर्णय सक्षम प्राधिकारी के अनुमोदन के अधीन हैं।',
    newAssessment: 'नया मूल्यांकन',
    exportReport: 'रिपोर्ट निर्यात',
    dateRange: 'दिनांक सीमा',
    dashboard: 'डैशबोर्ड',
    projects: 'परियोजनाएं',
    proposedRoutes: 'प्रस्तावित मार्ग',
    alternativeRoutes: 'वैकल्पिक मार्ग',
    treeInventory: 'वृक्ष गणना सूची',
    vegetation: 'वनस्पति एवं छत्र',
    wildlifeEvidence: 'वन्यजीव साक्ष्य',
    habitatSensitivity: 'पर्यावास संवेदनशीलता',
    waterTerrain: 'जल एवं भू-भाग',
    groundVerification: 'भूमि सत्यापन',
    validationQueue: 'सत्यापन कतार',
    impactAssessment: 'प्रभाव मूल्यांकन',
    reports: 'विस्तृत रिपोर्ट',
    dataSources: 'डेटा स्रोत व साक्ष्य',
    aiModelStatus: 'एआई मॉडल स्थिति',
    users: 'उपयोगकर्ता व भूमिकाएं',
    settings: 'सिस्टम सेटिंग्स',
    activeProjects: 'सक्रिय परियोजनाएं',
    assessmentsCompleted: 'पूर्ण मूल्यांकन',
    awaitingVerification: 'सत्यापन लंबित',
    highSensitivity: 'अति संवेदनशील',
    requiresAttention: 'ध्यान अपेक्षित',
    recentAssessments: 'हालिया परियोजना मूल्यांकन',
    searchPlaceholder: 'आईडी, नाम या स्थान खोजें...',
    status: 'स्थिति',
    envRisk: 'पर्यावरण जोखिम',
    lastUpdated: 'अंतिम अद्यतन',
    action: 'कार्रवाई',
    viewDetails: 'विवरण देखें',
    systemStatus: 'सिस्टम स्थिति',
    operational: 'सक्रिय / चालू',
    allRightsReserved: 'राष्ट्रीय सूचना विज्ञान केंद्र / पर्यावरण, वन एवं जलवायु परिवर्तन मंत्रालय दिशा-निर्देशों के अनुरूप'
  }
};

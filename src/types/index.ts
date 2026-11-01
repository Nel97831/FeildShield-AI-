export type Language = 
  | 'en' 
  | 'hi' 
  | 'pa' 
  | 'bn' 
  | 'te' 
  | 'ta' 
  | 'mr' 
  | 'gu' 
  | 'kn' 
  | 'or' 
  | 'as';

export type CropType = 
  | 'paddy'
  | 'wheat'
  | 'cotton'
  | 'sugarcane'
  | 'maize'
  | 'mustard'
  | 'pulses'
  | 'vegetables';

export type CropGrowthStage = 
  | 'seedling'
  | 'vegetative'
  | 'flowering'
  | 'grain_filling'
  | 'maturity';

export type WarningSeverity = 'red' | 'orange' | 'yellow' | 'green';

export type LandVerificationStatus = 'verified' | 'pending' | 'manual_review' | 'failed';

export type FarmerRole = 'owner' | 'tenant' | 'sharecropper' | 'authorised_cultivator';

export type IrrigationType = 
  | 'canal'
  | 'tubewell_borewell'
  | 'drip'
  | 'sprinkler'
  | 'rainfed';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface LandRecordDetails {
  khasraNumber: string;
  khataNumber?: string;
  surveyNumber?: string;
  ulpin?: string;
  revenueVillage: string;
  subDistrictTehsil: string;
  district: string;
  state: string;
  recordedAreaSqm: number;
  recordedAreaRegional: string;
  landClassification: string;
  verificationStatus: LandVerificationStatus;
  verificationSource: string;
  verifiedAt?: string;
  disputeNotes?: string;
  isDemonstrationData: boolean;
}

export interface TenancyDetails {
  farmerRole: FarmerRole;
  tenancyAgreementRef?: string;
  landownerName?: string;
  leaseDurationYears?: number;
  ownerNocProvided: boolean;
}

export interface SoilHealth {
  ph: number;
  organicCarbon: string;
  nitrogenStatus: 'Low' | 'Medium' | 'High';
  phosphorusStatus: 'Low' | 'Medium' | 'High';
  potassiumStatus: 'Low' | 'Medium' | 'High';
  moisturePercent: number;
  soilTexture: string;
  lastUpdated: string;
}

export interface SatelliteVegetationIndex {
  ndviValue: number;
  vegetationHealth: 'vigorous' | 'normal' | 'stressed' | 'critical';
  observationDate: string;
  sensor: string;
  cloudCoverPercent: number;
}

export interface Farm {
  id: string;
  farmerName: string;
  phone: string;
  smsConsent: boolean;
  state: string;
  district: string;
  village: string;
  centerLocation: GeoPoint;
  polygon: GeoPoint[];
  cropType: CropType;
  cropVariety?: string;
  plantingDate?: string;
  growthStage: CropGrowthStage;
  areaSqm: number;
  enteredArea: number;
  enteredUnit: string;
  irrigationType: IrrigationType;
  landRecord?: LandRecordDetails;
  tenancy?: TenancyDetails;
  soilHealth?: SoilHealth;
  vegetationIndex?: SatelliteVegetationIndex;
  hasInsurance?: boolean;
  insurancePolicyNumber?: string;
  insuranceCompany?: string;
  sumInsuredPerAcre?: number;
  insuranceEnrollmentDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LandUnit {
  id: string;
  code: string;
  name: string;
  nativeNames: {
    en: string;
    hi: string;
    pa: string;
  };
  states: string[];
  factorToSqm: number;
  definition: string;
  source: string;
  verified: boolean;
  effectiveYear?: number;
}

export interface WeatherData {
  temp: number;
  humidity: number;
  rainfall24h: number;
  forecastRainfall24h: number;
  forecastRainfall48h: number;
  windSpeed: number;
  condition: string;
  cloudCover: number;
  lastUpdated: string;
  sourceName: string;
  sourceUrl: string;
  forecastHorizon: string;
  limitations: string;
}

export type RiskCategoryKey = 
  | 'floods_waterlogging'
  | 'drought_deficit'
  | 'heatwave_frost'
  | 'excessive_rain_storm'
  | 'crop_diseases'
  | 'pest_attacks'
  | 'soil_irrigation_issues'
  | 'post_harvest_storage';

export interface AgriculturalRiskItem {
  id: string;
  category: RiskCategoryKey;
  title: string;
  affectedFarmOrCrop: string;
  severity: 'low' | 'moderate' | 'high' | 'severe';
  dataSource: string;
  lastUpdated: string;
  preventiveActions: string[];
  recoveryGuidance: string[];
  dataReliabilityNotice: string;
}

export interface FloodWarning {
  id: string;
  severity: WarningSeverity;
  headline: string;
  description: string;
  state: string;
  district: string;
  riverBasin: string;
  waterLevelCurrent?: string;
  dangerLevel?: string;
  expectedThreatPeriod: string;
  source: string;
  sourceUrl: string;
  lastUpdated: string;
  uncertaintyNotes: string;
}

export interface FloodObservation {
  id: string;
  title: string;
  observationDate: string;
  satelliteSensor: string;
  provider: string;
  resolutionMeters: number;
  dataType: 'satellite_radar' | 'hydrological_gauge' | 'historical_event' | 'simulation_model';
  isSimulatedOrHistorical: boolean;
  disclaimer: string;
  geoJson: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

export interface OverlapAnalysisResult {
  farmId: string;
  farmAreaSqm: number;
  floodedAreaSqm: number;
  overlapPercentage: number;
  exposureCategory: 'none' | 'low' | 'moderate' | 'high' | 'severe';
  observationDate: string;
  sensorUsed: string;
  calculatedAt: string;
  disclaimer: string;
  caveats: string[];
}

export interface CropPhotoAssessment {
  id: string;
  farmId?: string;
  timestamp: string;
  imageUrl: string;
  cropType: string;
  cropStatus?: 'good' | 'bad';
  statusSummary?: string;
  visibleSymptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  suspectedConditions: string[];
  immediateSteps: string[];
  recoveryPotential: 'high' | 'moderate' | 'low' | 'uncertain';
  officialExtensionNotice: string;
  isPreliminary: boolean;
  modelConfidence?: string;
  damagePercentage?: number;
  damageCategory?: string;
  pathogenOrPest?: string;
  insuranceRecommendation?: string;
  calculatedPayoutInr?: number;
  isInsured?: boolean;
  claimStatus?: 'eligible' | 'ineligible' | 'uninsured';
  claimDocketNumber?: string;
  alternativeSolutions?: string[];
}

export interface PmfbySchemeInfo {
  schemeName: string;
  season: 'Kharif 2026' | 'Rabi 2026-27';
  implementingAgency: string;
  farmerPremiumRatePercent: number;
  sumInsuredPerAcreRupees: number;
  notifiedCrops: string[];
  enrollmentCutoffDate: string;
  claimsTollFree: string;
  ncipPortalUrl: string;
  coveragePhases: {
    phase: string;
    description: string;
  }[];
  exclusions: string[];
}

export interface CropLossClaim {
  id: string;
  farmId: string;
  farmerName: string;
  khasraNumber: string;
  policyOrApplicationNo: string;
  causeOfLoss: string;
  estimatedLossPercentage: number;
  lossDate: string;
  reportedAt: string;
  reportedWithin72h: boolean;
  status: 'intimated' | 'joint_survey_scheduled' | 'under_assessment' | 'settled';
  surveyPatwariAssigned?: string;
  docketNumber: string;
  notes?: string;
}

export interface CropChecklistItem {
  id: string;
  category: 'drainage' | 'storage' | 'crops' | 'machinery' | 'livestock' | 'safety';
  title: string;
  description: string;
  urgency: 'immediate' | 'high' | 'moderate';
  safetyWarning?: string;
  completed: boolean;
}

export interface EmergencyContact {
  id: string;
  state: string;
  district?: string;
  agencyName: string;
  nativeAgencyName: {
    en: string;
    hi: string;
    pa: string;
  };
  phone: string;
  tollFree?: string;
  type: 'state_disaster' | 'ndrf' | 'district_control' | 'cwc_flood' | 'kvk_extension';
  hours: string;
}

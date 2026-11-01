import { Farm } from '../types';

export const INITIAL_FARMS: Farm[] = [
  {
    id: 'farm-punjab-01',
    farmerName: 'Sardar Gurpreet Singh',
    phone: '9876543210',
    smsConsent: true,
    state: 'Punjab',
    district: 'Sangrur',
    village: 'Moonak (Near Ghaggar Basin)',
    centerLocation: { lat: 29.8550, lng: 76.0536 },
    polygon: [
      { lat: 29.8541, lng: 76.0526 },
      { lat: 29.8559, lng: 76.0526 },
      { lat: 29.8559, lng: 76.0547 },
      { lat: 29.8541, lng: 76.0547 }
    ],
    cropType: 'paddy',
    cropVariety: 'PR-126 (Short Duration)',
    plantingDate: '2026-06-25',
    growthStage: 'flowering',
    areaSqm: 40468.56,
    enteredArea: 80,
    enteredUnit: 'punjab_kanal',
    irrigationType: 'canal',
    landRecord: {
      khasraNumber: '142//15/2',
      khataNumber: '318',
      surveyNumber: 'MNK-452',
      ulpin: '03080010452001',
      revenueVillage: 'Moonak Hadbast 48',
      subDistrictTehsil: 'Moonak',
      district: 'Sangrur',
      state: 'Punjab',
      recordedAreaSqm: 40468.56,
      recordedAreaRegional: '10 Acres (80 Kanals)',
      landClassification: 'Chahi (Canal & Tubewell Irrigated Arable)',
      verificationStatus: 'verified',
      verificationSource: 'Punjab Land Records Society (PLRS Jamabandi Portal)',
      verifiedAt: '2026-07-02T10:30:00Z',
      isDemonstrationData: true
    },
    tenancy: {
      farmerRole: 'owner',
      ownerNocProvided: true
    },
    soilHealth: {
      ph: 7.8,
      organicCarbon: '0.64% (Medium)',
      nitrogenStatus: 'Medium',
      phosphorusStatus: 'High',
      potassiumStatus: 'High',
      moisturePercent: 68,
      soilTexture: 'Sandy Clay Loam',
      lastUpdated: '2026-10-15'
    },
    vegetationIndex: {
      ndviValue: 0.74,
      vegetationHealth: 'vigorous',
      observationDate: '2026-10-29',
      sensor: 'Sentinel-2 MSI (10m Resolution)',
      cloudCoverPercent: 4
    },
    hasInsurance: true,
    insurancePolicyNumber: 'PMFBY-2026-PB-49210',
    insuranceCompany: 'Agriculture Insurance Company of India (AICIL)',
    sumInsuredPerAcre: 54000,
    insuranceEnrollmentDate: '2026-07-02',
    createdAt: '2026-07-01T10:00:00Z',
    updatedAt: '2026-10-29T08:00:00Z'
  },
  {
    id: 'farm-up-02',
    farmerName: 'Ram Kumar Yadav',
    phone: '9812345678',
    smsConsent: true,
    state: 'Uttar Pradesh',
    district: 'Gorakhpur',
    village: 'Pipraich, Rapti Riverplain',
    centerLocation: { lat: 26.7550, lng: 83.3850 },
    polygon: [
      { lat: 26.7544, lng: 83.3844 },
      { lat: 26.7555, lng: 83.3844 },
      { lat: 26.7555, lng: 83.3857 },
      { lat: 26.7544, lng: 83.3857 }
    ],
    cropType: 'sugarcane',
    cropVariety: 'Co 0238 (Early maturing)',
    plantingDate: '2026-03-15',
    growthStage: 'vegetative',
    areaSqm: 15175.71,
    enteredArea: 6,
    enteredUnit: 'up_pucca_bigha',
    irrigationType: 'tubewell_borewell',
    landRecord: {
      khasraNumber: '488/1',
      khataNumber: '124',
      surveyNumber: 'GKP-PPR-8910',
      ulpin: '09120040891002',
      revenueVillage: 'Pipraich Khurd',
      subDistrictTehsil: 'Chauri Chaura',
      district: 'Gorakhpur',
      state: 'Uttar Pradesh',
      recordedAreaSqm: 15175.71,
      recordedAreaRegional: '6 Pucca Bighas (120 Biswas)',
      landClassification: 'Nal Koop (Tubewell Command Multi-Crop)',
      verificationStatus: 'verified',
      verificationSource: 'UP Bhulekh Land Records System',
      verifiedAt: '2026-06-15T11:15:00Z',
      isDemonstrationData: true
    },
    tenancy: {
      farmerRole: 'tenant',
      tenancyAgreementRef: 'UP-GKP-TEN-2025/89',
      landownerName: 'Sh. Suresh Chand Shukla',
      leaseDurationYears: 3,
      ownerNocProvided: true
    },
    soilHealth: {
      ph: 7.4,
      organicCarbon: '0.71% (High)',
      nitrogenStatus: 'Medium',
      phosphorusStatus: 'Medium',
      potassiumStatus: 'High',
      moisturePercent: 72,
      soilTexture: 'Gangetic Silt Loam',
      lastUpdated: '2026-09-20'
    },
    vegetationIndex: {
      ndviValue: 0.81,
      vegetationHealth: 'vigorous',
      observationDate: '2026-10-28',
      sensor: 'Sentinel-2 MSI (10m Resolution)',
      cloudCoverPercent: 2
    },
    createdAt: '2026-06-12T11:30:00Z',
    updatedAt: '2026-10-28T09:00:00Z'
  },
  {
    id: 'farm-bihar-03',
    farmerName: 'Manoj Kumar Mandal',
    phone: '9431200000',
    smsConsent: true,
    state: 'Bihar',
    district: 'Supaul',
    village: 'Nirmali (Kosi Floodplain)',
    centerLocation: { lat: 26.1350, lng: 86.5950 },
    polygon: [
      { lat: 26.1343, lng: 86.5943 },
      { lat: 26.1356, lng: 86.5943 },
      { lat: 26.1356, lng: 86.5957 },
      { lat: 26.1343, lng: 86.5957 }
    ],
    cropType: 'maize',
    cropVariety: 'DKC 9108 High Yield',
    plantingDate: '2026-06-10',
    growthStage: 'flowering',
    areaSqm: 20234.0,
    enteredArea: 8,
    enteredUnit: 'bihar_bigha',
    irrigationType: 'rainfed',
    landRecord: {
      khasraNumber: '1205/3',
      khataNumber: '89',
      surveyNumber: 'SPL-NRM-112',
      ulpin: '10040030011204',
      revenueVillage: 'Nirmali Diara',
      subDistrictTehsil: 'Nirmali',
      district: 'Supaul',
      state: 'Bihar',
      recordedAreaSqm: 20234.0,
      recordedAreaRegional: '8 Bighas (160 Katthas)',
      landClassification: 'Dhani (Alluvial Riverine Lowland)',
      verificationStatus: 'verified',
      verificationSource: 'Bihar Bhumi Record Directorate (DCLR)',
      verifiedAt: '2026-07-11T09:40:00Z',
      isDemonstrationData: true
    },
    tenancy: {
      farmerRole: 'sharecropper',
      ownerNocProvided: true
    },
    soilHealth: {
      ph: 6.9,
      organicCarbon: '0.58% (Medium)',
      nitrogenStatus: 'Low',
      phosphorusStatus: 'Medium',
      potassiumStatus: 'Medium',
      moisturePercent: 80,
      soilTexture: 'Fine Alluvial Silt',
      lastUpdated: '2026-10-05'
    },
    vegetationIndex: {
      ndviValue: 0.65,
      vegetationHealth: 'stressed',
      observationDate: '2026-10-27',
      sensor: 'Sentinel-2 MSI (10m Resolution)',
      cloudCoverPercent: 12
    },
    createdAt: '2026-07-10T08:00:00Z',
    updatedAt: '2026-10-27T12:00:00Z'
  }
];

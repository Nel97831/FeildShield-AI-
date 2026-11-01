import { GeoPoint, LandRecordDetails, LandVerificationStatus } from '../types';

export interface VerifiedGovernmentLandRecord {
  recordRef: string;
  state: string;
  district: string;
  subDistrictTehsil: string;
  village: string;
  khasraNumber: string;
  khataNumber: string;
  surveyNumber?: string;
  ulpin: string;
  ownerName: string;
  recordedAreaSqm: number;
  recordedAreaRegional: string;
  landClassification: string;
  soilClassification: string;
  irrigationAvailability: string;
  cadastralBoundary: GeoPoint[];
  verificationStatus: LandVerificationStatus;
  verificationSource: string;
  isDemonstrationData: boolean;
}

export const VERIFIED_LAND_RECORDS: VerifiedGovernmentLandRecord[] = [
  {
    recordRef: 'PB-SNG-2024-K452',
    state: 'Punjab',
    district: 'Sangrur',
    subDistrictTehsil: 'Moonak',
    village: 'Moonak (Near Ghaggar Basin)',
    khasraNumber: '142//15/2',
    khataNumber: '318',
    surveyNumber: 'MNK-452',
    ulpin: '03080010452001',
    ownerName: 'Sardar Gurpreet Singh s/o Joginder Singh',
    recordedAreaSqm: 40468.56,
    recordedAreaRegional: '10 Acres (80 Kanals)',
    landClassification: 'Chahi (Irrigated agricultural arable)',
    soilClassification: 'Alluvial Sandy Clay Loam (pH 7.8)',
    irrigationAvailability: 'Canal + Electric Tubewell',
    cadastralBoundary: [
      { lat: 29.852, lng: 76.010 },
      { lat: 29.858, lng: 76.012 },
      { lat: 29.859, lng: 76.022 },
      { lat: 29.853, lng: 76.020 }
    ],
    verificationStatus: 'verified',
    verificationSource: 'Punjab Land Records Society (PLRS Jamabandi / Bhulekh Portal)',
    isDemonstrationData: true
  },
  {
    recordRef: 'UP-KAS-KH-8910',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    subDistrictTehsil: 'Pindra',
    village: 'Mangari (Gangetic Alluvial Zone)',
    khasraNumber: '488/1',
    khataNumber: '124',
    surveyNumber: 'VNS-PND-8910',
    ulpin: '09120040891002',
    ownerName: 'Rameshwar Lal Patel s/o Ramkishun',
    recordedAreaSqm: 12646.42,
    recordedAreaRegional: '5 Pucca Bighas (100 Biswas)',
    landClassification: 'Nal Koop (Tubewell irrigated multi-crop)',
    soilClassification: 'Gangetic Silt Loam (pH 7.4)',
    irrigationAvailability: 'Deep Tubewell Borewell',
    cadastralBoundary: [
      { lat: 25.352, lng: 82.915 },
      { lat: 25.356, lng: 82.916 },
      { lat: 25.357, lng: 82.922 },
      { lat: 25.353, lng: 82.921 }
    ],
    verificationStatus: 'verified',
    verificationSource: 'UP Bhulekh Revenue Registry (Revenue Board, Lucknow)',
    isDemonstrationData: true
  },
  {
    recordRef: 'BR-PUR-SV-112',
    state: 'Bihar',
    district: 'Purnia',
    subDistrictTehsil: 'Kasba',
    village: 'Jalalgadh (Kosi Basin)',
    khasraNumber: '1205/3',
    khataNumber: '89',
    surveyNumber: 'PUR-KSB-112',
    ulpin: '10040030011204',
    ownerName: 'Bhagwan Yadav s/o Rajendra Yadav',
    recordedAreaSqm: 15174.00,
    recordedAreaRegional: '6 Bighas (120 Katthas)',
    landClassification: 'Dhani (Lowland alluvial paddy tract)',
    soilClassification: 'Fine Silt with organic matter (pH 6.9)',
    irrigationAvailability: 'Shallow Tubewell & Seasonal Rainfed',
    cadastralBoundary: [
      { lat: 25.815, lng: 87.525 },
      { lat: 25.820, lng: 87.528 },
      { lat: 25.821, lng: 87.534 },
      { lat: 25.816, lng: 87.532 }
    ],
    verificationStatus: 'verified',
    verificationSource: 'Bihar Bhumi Records & Survey Directorate (DCLR)',
    isDemonstrationData: true
  },
  {
    recordRef: 'HR-KAR-K88',
    state: 'Haryana',
    district: 'Karnal',
    subDistrictTehsil: 'Gharaunda',
    village: 'Kohand (Western Yamuna Canal Belt)',
    khasraNumber: '88//12',
    khataNumber: '55',
    surveyNumber: 'KRN-GHR-88',
    ulpin: '06040020008801',
    ownerName: 'Kuldeep Singh Mann s/o Jaswant Singh',
    recordedAreaSqm: 24281.14,
    recordedAreaRegional: '6 Acres (48 Kanals)',
    landClassification: 'Nehri (Canal command agricultural)',
    soilClassification: 'Clay Loam high fertility (pH 7.6)',
    irrigationAvailability: 'Western Yamuna Canal Command',
    cadastralBoundary: [
      { lat: 29.620, lng: 76.970 },
      { lat: 29.625, lng: 76.972 },
      { lat: 29.626, lng: 76.978 },
      { lat: 29.621, lng: 76.976 }
    ],
    verificationStatus: 'verified',
    verificationSource: 'Haryana Jamabandi Revenue Portal (HALRIS)',
    isDemonstrationData: true
  },
  {
    recordRef: 'MH-NSK-G74',
    state: 'Maharashtra',
    district: 'Nashik',
    subDistrictTehsil: 'Niphad',
    village: 'Ozar (Godavari Sub-Basin)',
    khasraNumber: '74/2',
    khataNumber: '402',
    surveyNumber: 'NSK-NPH-74',
    ulpin: '27140020007409',
    ownerName: 'Eknathrao Shinde s/o Tukaram',
    recordedAreaSqm: 12140.40,
    recordedAreaRegional: '3 Acres (120 Gunthas)',
    landClassification: 'Bagayat (Horticultural / Drip Irrigated)',
    soilClassification: 'Black Cotton Basaltic Regur (pH 8.1)',
    irrigationAvailability: 'Micro-Drip from Farm Pond & River lift',
    cadastralBoundary: [
      { lat: 20.065, lng: 73.910 },
      { lat: 20.070, lng: 73.912 },
      { lat: 20.071, lng: 73.918 },
      { lat: 20.066, lng: 73.916 }
    ],
    verificationStatus: 'verified',
    verificationSource: 'Mahabhulekh (7/12 & 8A Online Revenue Registry)',
    isDemonstrationData: true
  }
];

export function lookupGovernmentLandRecord(reference: string): VerifiedGovernmentLandRecord | null {
  if (!reference) return null;
  const clean = reference.trim().toUpperCase();
  return VERIFIED_LAND_RECORDS.find((rec) => 
    rec.recordRef.toUpperCase() === clean ||
    rec.khasraNumber.toUpperCase() === clean ||
    rec.ulpin.toUpperCase() === clean ||
    rec.surveyNumber?.toUpperCase() === clean
  ) || null;
}

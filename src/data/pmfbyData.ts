import { PmfbySchemeInfo, CropLossClaim } from '../types';

export const PMFBY_SCHEME_INFO: PmfbySchemeInfo = {
  schemeName: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
  season: 'Kharif 2026',
  implementingAgency: 'Agriculture Insurance Company of India Ltd (AIC) & Designated Co-Insurers',
  farmerPremiumRatePercent: 2.0,
  sumInsuredPerAcreRupees: 42000,
  notifiedCrops: ['Paddy (Rice)', 'Cotton', 'Maize', 'Sugarcane', 'Soybean', 'Bajra', 'Pulses'],
  enrollmentCutoffDate: 'July 31, 2026 (Kharif) / December 31, 2026 (Rabi)',
  claimsTollFree: '14447 (National Toll-Free Crop Insurance Helpline)',
  ncipPortalUrl: 'https://pmfby.gov.in',
  coveragePhases: [
    {
      phase: '1. Prevented Sowing / Planting Risk',
      description: 'Up to 25% of sum insured payable if insured farmer is unable to sow or plant due to deficit rainfall or adverse seasonal conditions in notified area.'
    },
    {
      phase: '2. Standing Crop (Sowing to Harvesting)',
      description: 'Comprehensive yield-based coverage against non-preventable natural risks: drought, dry spells, flood, inundation, wide-spread pests, landslides, natural fire and lightening.'
    },
    {
      phase: '3. Post-Harvest Losses (Up to 14 Days)',
      description: 'Coverage available up to a maximum period of two weeks (14 days) from harvesting for crops kept in "cut & spread" condition in the field against unseasonal cyclonic rains/hail.'
    },
    {
      phase: '4. Localized Calamities (Individual Farm Level)',
      description: 'Loss or damage resulting from localized occurrences of hailstorm, landslide, inundation, cloudburst, and natural fire affecting isolated farms.'
    }
  ],
  exclusions: [
    'War, nuclear risks, and allied perils.',
    'Malicious damage, intentional burning, or crop destruction by farmer/labor.',
    'Theft, pilferage, or harvest destruction during transit to market.',
    'Damage caused by domestic and/or stray animals or wildlife (unless covered under specific state notified add-on).',
    'Preventable agricultural negligence, failure to take routine pest management, or poor agronomic seed management.',
    'Loss intimation delayed beyond the statutory 72 hours from the occurrence of localized adversity.'
  ]
};

export const INITIAL_CROP_LOSS_CLAIMS: CropLossClaim[] = [
  {
    id: 'claim-pmfby-2026-001',
    farmId: 'farm-punjab-01',
    farmerName: 'Sardar Gurpreet Singh',
    khasraNumber: '142//15/2',
    policyOrApplicationNo: 'PMFBY-2026-PB-09412',
    causeOfLoss: 'Inundation / Waterlogging following Ghaggar river breach',
    estimatedLossPercentage: 65,
    lossDate: '2026-10-28',
    reportedAt: '2026-10-29 11:20 IST',
    reportedWithin72h: true,
    status: 'joint_survey_scheduled',
    surveyPatwariAssigned: 'Sh. Harpreet Singh (Revenue Circle Moonak) & AIC Field Surveyor',
    docketNumber: 'NCIP-PB-2026-98124',
    notes: 'Intimation accepted under statutory 72h window. Joint Field Survey team scheduled to visit parcel on November 2.'
  }
];

export function calculateEstimatedPremium(
  cropType: string,
  acreage: number,
  sumInsuredPerAcre: number = 42000
) {
  let ratePercent = 2.0;
  if (['wheat', 'mustard'].includes(cropType.toLowerCase())) {
    ratePercent = 1.5;
  } else if (['cotton', 'sugarcane'].includes(cropType.toLowerCase())) {
    ratePercent = 5.0;
  } else if (cropType.toLowerCase() === 'vegetables') {
    ratePercent = 5.0;
  }

  const totalSumInsured = acreage * sumInsuredPerAcre;
  const farmerShareRupees = Math.round((totalSumInsured * ratePercent) / 100);
  const totalActuarialRate = 12.5;
  const govtSubsidyRupees = Math.round((totalSumInsured * (totalActuarialRate - ratePercent)) / 100);

  return {
    cropType,
    acreage,
    ratePercent,
    sumInsuredPerAcre,
    totalSumInsured,
    farmerShareRupees,
    govtSubsidyRupees,
    totalActuarialRate
  };
}

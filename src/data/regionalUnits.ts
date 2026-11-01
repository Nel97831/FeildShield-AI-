import { LandUnit } from '../types';

export const STANDARD_UNITS: LandUnit[] = [
  {
    id: 'acre',
    code: 'acre',
    name: 'Acre',
    nativeNames: {
      en: 'Acre (ac)',
      hi: 'एकड़ (Acre)',
      pa: 'ਏਕੜ (Acre)'
    },
    states: ['ALL'],
    factorToSqm: 4046.8564224, // 1 acre = 4,046.8564 m² (43,560 sq ft)
    definition: 'Standard international acre = 43,560 sq ft = 4,046.86 m²',
    source: 'National Standard Land Measurement',
    verified: true,
  },
  {
    id: 'hectare',
    code: 'hectare',
    name: 'Hectare',
    nativeNames: {
      en: 'Hectare (ha)',
      hi: 'हेक्टेयर (Hectare)',
      pa: 'ਹੈਕਟੇਅਰ (Hectare)'
    },
    states: ['ALL'],
    factorToSqm: 10000.0, // 1 hectare = 10,000 m²
    definition: 'Standard metric unit = 10,000 m² (2.471 acres)',
    source: 'International System of Units (SI) & Survey of India',
    verified: true,
  },
  {
    id: 'sqm',
    code: 'sqm',
    name: 'Square Metre',
    nativeNames: {
      en: 'Square Metre (m²)',
      hi: 'वर्ग मीटर (Square Metre)',
      pa: 'ਵਰਗ ਮੀਟਰ (Square Metre)'
    },
    states: ['ALL'],
    factorToSqm: 1.0,
    definition: 'Base SI unit of area',
    source: 'Bureau of Indian Standards',
    verified: true,
  }
];

export const REGIONAL_UNITS: LandUnit[] = [
  // PUNJAB & HARYANA
  {
    id: 'punjab_kanal',
    code: 'kanal',
    name: 'Kanal (Punjab & Haryana)',
    nativeNames: {
      en: 'Kanal (Punjab/Haryana)',
      hi: 'कनाल (पंजाब/हरियाणा)',
      pa: 'ਕਨਾਲ (ਪੰਜਾਬ/ਹਰਿਆਣਾ)'
    },
    states: ['Punjab', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Chandigarh'],
    factorToSqm: 505.857, // 8 Kanals = 1 Acre (4046.86 / 8 = 505.857 m²; 5,445 sq ft)
    definition: '1 Kanal = 1/8 Acre = 20 Marlas = 5,445 sq ft = 505.86 m²',
    source: 'Punjab Land Records Manual (Directorate of Land Records, Jalandhar)',
    verified: true,
    effectiveYear: 1966
  },
  {
    id: 'punjab_marla',
    code: 'marla',
    name: 'Marla (Punjab & Haryana)',
    nativeNames: {
      en: 'Marla (Punjab/Haryana)',
      hi: 'मरला (पंजाब/हरियाणा)',
      pa: 'ਮਰਲਾ (ਪੰਜਾਬ/ਹਰਿਆਣਾ)'
    },
    states: ['Punjab', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Chandigarh'],
    factorToSqm: 25.29285, // 1 Marla = 1/20 Kanal = 272.25 sq ft = 25.29 m²
    definition: '1 Marla = 1/20 Kanal = 272.25 sq ft = 25.29 m²',
    source: 'Punjab Land Records Manual',
    verified: true,
    effectiveYear: 1966
  },
  {
    id: 'punjab_killa',
    code: 'killa',
    name: 'Killa (Punjab & Haryana)',
    nativeNames: {
      en: 'Killa (Acre equivalent in Punjab/Haryana)',
      hi: 'किल्ला / एकड़ (पंजाब/हरियाणा)',
      pa: 'ਕਿੱਲਾ / ਏਕੜ (ਪੰਜਾਬ/ਹਰਿਆਣਾ)'
    },
    states: ['Punjab', 'Haryana'],
    factorToSqm: 4046.856, // 1 Killa = 1 Acre = 8 Kanals = 4046.86 m²
    definition: '1 Killa = 8 Kanals = 160 Marlas = 4,046.86 m²',
    source: 'Department of Revenue and Rehabilitation, Punjab',
    verified: true
  },
  {
    id: 'punjab_bigha',
    code: 'bigha_punjab',
    name: 'Bigha (Punjab Traditional)',
    nativeNames: {
      en: 'Bigha (Punjab traditional - 4 Bigha/Acre)',
      hi: 'बीघा (पंजाब पारंपरिक - 4 बीघा/एकड़)',
      pa: 'ਬੀਘਾ (ਪੰਜਾਬ ਰਵਾਇਤੀ - 4 ਬੀਘਾ/ਏਕੜ)'
    },
    states: ['Punjab'],
    factorToSqm: 1011.714, // 4 Bigha = 1 Acre (1011.71 m² per Bigha)
    definition: '1 Bigha (Punjab traditional) = 2 Kanals = 1/4 Acre = 1,011.71 m²',
    source: 'Punjab Revenue Board Historical Records',
    verified: true
  },

  // UTTAR PRADESH
  {
    id: 'up_pucca_bigha',
    code: 'bigha_up_pucca',
    name: 'Pucca Bigha (Uttar Pradesh Standard)',
    nativeNames: {
      en: 'Pucca Bigha (UP Standard - 20 Biswa)',
      hi: 'पक्का बीघा (उत्तर प्रदेश मानक - 20 बिस्वा)',
      pa: 'ਪੱਕਾ ਬੀਘਾ (ਯੂ.ਪੀ. ਸਟੈਂਡਰਡ)'
    },
    states: ['Uttar Pradesh'],
    factorToSqm: 2529.285, // 1 Pucca Bigha = 3025 sq yd = 2529.285 m² (~0.625 Acre)
    definition: '1 Pucca Bigha = 20 Biswa = 3,025 sq yards = 2,529.29 m² (~0.625 Acre)',
    source: 'Uttar Pradesh Revenue Code (Board of Revenue, Lucknow)',
    verified: true,
    effectiveYear: 2006
  },
  {
    id: 'up_kaccha_bigha',
    code: 'bigha_up_kaccha',
    name: 'Kaccha Bigha (Western UP Traditional)',
    nativeNames: {
      en: 'Kaccha Bigha (Western UP)',
      hi: 'कच्चा बीघा (पश्चिमी उत्तर प्रदेश)',
      pa: 'ਕੱਚਾ ਬੀਘਾ (ਪੱਛਮੀ ਯੂ.ਪੀ.)'
    },
    states: ['Uttar Pradesh'],
    factorToSqm: 843.095, // 1/3 of Pucca Bigha = 1008.33 sq yd = 843.1 m²
    definition: '1 Kaccha Bigha = 1/3 Pucca Bigha = 6.66 Biswa = 843.10 m²',
    source: 'Board of Revenue UP District Gazetteer Series',
    verified: true
  },
  {
    id: 'up_biswa',
    code: 'biswa_up',
    name: 'Biswa (Uttar Pradesh)',
    nativeNames: {
      en: 'Biswa (UP - 1/20 Pucca Bigha)',
      hi: 'बिस्वा (उत्तर प्रदेश - 1/20 पक्का बीघा)',
      pa: 'ਬਿਸਵਾ (ਯੂ.ਪੀ.)'
    },
    states: ['Uttar Pradesh'],
    factorToSqm: 126.464, // 1 Biswa = 151.25 sq yd = 126.46 m²
    definition: '1 Biswa = 1/20 Pucca Bigha = 151.25 sq yd = 126.46 m²',
    source: 'Uttar Pradesh Revenue Code',
    verified: true
  },

  // BIHAR
  {
    id: 'bihar_bigha',
    code: 'bigha_bihar',
    name: 'Bigha (Bihar Standard)',
    nativeNames: {
      en: 'Bigha (Bihar - 20 Kattha)',
      hi: 'बीघा (बिहार - 20 कट्ठा)',
      pa: 'ਬੀਘਾ (ਬਿਹਾਰ)'
    },
    states: ['Bihar'],
    factorToSqm: 2529.0, // 20 Kattha = 2529 m² (varies slightly by laggi length in some districts: standard 6.5 hath laggi = 27,225 sq ft = 2529.28 m²)
    definition: '1 Bigha = 20 Kattha = 400 Dhur = 2,529.00 m² (Standard laggi)',
    source: 'Bihar Land Reforms & Revenue Department, Patna',
    verified: true
  },
  {
    id: 'bihar_kattha',
    code: 'kattha_bihar',
    name: 'Kattha (Bihar Standard)',
    nativeNames: {
      en: 'Kattha (Bihar - 20 Dhur)',
      hi: 'कट्ठा (बिहार - 20 धुर)',
      pa: 'ਕੱਠਾ (ਬਿਹਾਰ)'
    },
    states: ['Bihar', 'Jharkhand'],
    factorToSqm: 126.45, // 1 Kattha = 1361.25 sq ft = 126.45 m²
    definition: '1 Kattha = 20 Dhur = 1,361.25 sq ft = 126.45 m²',
    source: 'Bihar Revenue Administration Manual',
    verified: true
  },
  {
    id: 'bihar_dhur',
    code: 'dhur_bihar',
    name: 'Dhur (Bihar Standard)',
    nativeNames: {
      en: 'Dhur (Bihar - 1/20 Kattha)',
      hi: 'धुर (बिहार - 1/20 कट्ठा)',
      pa: 'ਧੁਰ (ਬਿਹਾਰ)'
    },
    states: ['Bihar', 'Jharkhand'],
    factorToSqm: 6.3225, // 1 Dhur = 68.06 sq ft = 6.32 m²
    definition: '1 Dhur = 1/20 Kattha = 68.06 sq ft = 6.32 m²',
    source: 'Bihar Revenue Administration Manual',
    verified: true
  },

  // WEST BENGAL & ASSAM
  {
    id: 'bengal_bigha',
    code: 'bigha_bengal',
    name: 'Bigha (West Bengal & Assam)',
    nativeNames: {
      en: 'Bigha (Bengal/Assam - 14,400 sq ft)',
      hi: 'बीघा (बंगाल/असम)',
      pa: 'ਬੀਘਾ (ਬੰਗਾਲ/ਅਸਾਮ)'
    },
    states: ['West Bengal', 'Assam'],
    factorToSqm: 1337.8, // 1 Bigha in Bengal = 14,400 sq ft = 1,337.8 m² (1/3 Acre approx)
    definition: '1 Bigha = 20 Kattha = 14,400 sq ft = 1,337.80 m²',
    source: 'West Bengal Land Reforms Manual & Directorate of Land Records Assam',
    verified: true
  },
  {
    id: 'bengal_kattha',
    code: 'kattha_bengal',
    name: 'Kattha (West Bengal)',
    nativeNames: {
      en: 'Kattha (Bengal - 720 sq ft)',
      hi: 'कट्ठा (पश्चिम बंगाल - 720 वर्ग फुट)',
      pa: 'ਕੱਠਾ (ਬੰਗਾਲ)'
    },
    states: ['West Bengal'],
    factorToSqm: 66.89, // 720 sq ft = 66.89 m²
    definition: '1 Kattha = 1/20 Bigha = 720 sq ft = 66.89 m²',
    source: 'West Bengal Land & Land Reforms Dept',
    verified: true
  },
  {
    id: 'decimal_unit',
    code: 'decimal',
    name: 'Decimal / Dismil (Eastern India)',
    nativeNames: {
      en: 'Decimal / Dismil (1/100 Acre)',
      hi: 'डिसमिल / डेसिमल (1/100 एकड़)',
      pa: 'ਡੈਸੀਮਲ (1/100 ਏਕੜ)'
    },
    states: ['West Bengal', 'Bihar', 'Jharkhand', 'Odisha'],
    factorToSqm: 40.4686, // 1 Decimal = 1/100 Acre = 435.6 sq ft = 40.47 m²
    definition: '1 Decimal (Dismil) = 1/100 Acre = 435.6 sq ft = 40.47 m²',
    source: 'Survey of Eastern States Land Records',
    verified: true
  },

  // MAHARASHTRA & GUJARAT & KARNATAKA
  {
    id: 'guntha',
    code: 'guntha',
    name: 'Guntha (Maharashtra, Gujarat, Karnataka)',
    nativeNames: {
      en: 'Guntha (1/40 Acre = 1,089 sq ft)',
      hi: 'गुंठा (1/40 एकड़ = 101.17 वर्ग मीटर)',
      pa: 'ਗੁੰਠਾ (1/40 ਏਕੜ)'
    },
    states: ['Maharashtra', 'Gujarat', 'Karnataka', 'Telangana', 'Andhra Pradesh'],
    factorToSqm: 101.1714, // 1 Guntha = 1/40 Acre = 1,089 sq ft = 101.17 m²
    definition: '1 Guntha = 1/40 Acre = 1,089 sq ft = 101.17 m² (33 ft x 33 ft)',
    source: 'Maharashtra Land Revenue Code, 1966 & Gujarat Land Revenue Rules',
    verified: true,
    effectiveYear: 1966
  },
  {
    id: 'gujarat_vigha',
    code: 'vigha_gujarat',
    name: 'Vigha (Gujarat Standard)',
    nativeNames: {
      en: 'Vigha (Gujarat - 16 Guntha = 17,424 sq ft)',
      hi: 'वीघा (गुजरात - 16 गुंठा = 1,618 वर्ग मीटर)',
      pa: 'ਵੀਘਾ (ਗੁਜਰਾਤ)'
    },
    states: ['Gujarat'],
    factorToSqm: 1618.74, // 16 Guntha = 16 * 101.1714 = 1618.74 m² (~0.4 Acre)
    definition: '1 Vigha = 16 Guntha = 17,424 sq ft = 1,618.74 m²',
    source: 'Revenue Department, Government of Gujarat',
    verified: true
  },

  // RAJASTHAN
  {
    id: 'rajasthan_pucca_bigha',
    code: 'bigha_rajasthan_pucca',
    name: 'Pucca Bigha (Rajasthan Standard)',
    nativeNames: {
      en: 'Pucca Bigha (Rajasthan - 27,225 sq ft)',
      hi: 'पक्का बीघा (राजस्थान - 2,529.28 वर्ग मीटर)',
      pa: 'ਪੱਕਾ ਬੀਘਾ (ਰਾਜਸਥਾਨ)'
    },
    states: ['Rajasthan'],
    factorToSqm: 2529.285, // 165 ft x 165 ft = 27,225 sq ft = 2529.285 m²
    definition: '1 Pucca Bigha = 27,225 sq ft = 2,529.29 m² = 20 Biswa',
    source: 'Rajasthan Land Revenue Act, 1956',
    verified: true,
    effectiveYear: 1956
  },
  {
    id: 'rajasthan_biswa',
    code: 'biswa_rajasthan',
    name: 'Biswa (Rajasthan)',
    nativeNames: {
      en: 'Biswa (Rajasthan - 1/20 Bigha)',
      hi: 'बिस्वा (राजस्थान - 1/20 बीघा)',
      pa: 'ਬਿਸਵਾ (ਰਾਜਸਥਾਨ)'
    },
    states: ['Rajasthan'],
    factorToSqm: 126.464,
    definition: '1 Biswa = 1/20 Pucca Bigha = 126.46 m²',
    source: 'Rajasthan Land Revenue Act',
    verified: true
  },

  // MADHYA PRADESH
  {
    id: 'mp_bigha',
    code: 'bigha_mp',
    name: 'Bigha (Madhya Pradesh Standard)',
    nativeNames: {
      en: 'Bigha (Madhya Pradesh - 12,000 sq ft)',
      hi: 'बीघा (मध्य प्रदेश मानक - 1,114.8 वर्ग मीटर)',
      pa: 'ਬੀਘਾ (ਮੱਧ ਪ੍ਰਦੇਸ਼)'
    },
    states: ['Madhya Pradesh', 'Chhattisgarh'],
    factorToSqm: 1114.836, // Standard MP Bigha = ~12,000 sq ft = 1,114.84 m²
    definition: '1 Bigha (MP) = 20 Kattha / Biswa = ~12,000 sq ft = 1,114.84 m²',
    source: 'Madhya Pradesh Land Revenue Code, 1959',
    verified: true,
    effectiveYear: 1959
  },

  // UTTARAKHAND & HIMACHAL PRADESH
  {
    id: 'uttarakhand_nali',
    code: 'nali',
    name: 'Nali (Uttarakhand Hills)',
    nativeNames: {
      en: 'Nali (Uttarakhand - 2,160 sq ft)',
      hi: 'नाली (उत्तराखंड पर्वतीय - 200.67 वर्ग मीटर)',
      pa: 'ਨਾਲੀ (ਉੱਤਰਾਖੰਡ)'
    },
    states: ['Uttarakhand'],
    factorToSqm: 200.67, // 1 Nali = 2,160 sq ft = 200.67 m² (16 Mutthi = 1 Nali; 20 Nali = 1 Bigha)
    definition: '1 Nali = 16 Mutthi = 2,160 sq ft = 200.67 m² (20 Nali = 1 Bigha)',
    source: 'Uttarakhand Board of Revenue Land Measurement Standard',
    verified: true
  },
  {
    id: 'uttarakhand_bigha',
    code: 'bigha_uttarakhand',
    name: 'Bigha (Uttarakhand Hills)',
    nativeNames: {
      en: 'Bigha (Uttarakhand - 20 Nali = 43,200 sq ft)',
      hi: 'बीघा (उत्तराखंड - 20 नाली = 4,013.4 वर्ग मीटर)',
      pa: 'ਬੀਘਾ (ਉੱਤਰਾਖੰਡ)'
    },
    states: ['Uttarakhand'],
    factorToSqm: 4013.4, // 20 Nali = 4,013.4 m²
    definition: '1 Bigha (Hills) = 20 Nali = 43,200 sq ft = 4,013.40 m²',
    source: 'Uttarakhand Board of Revenue',
    verified: true
  }
];

export const ALL_LAND_UNITS = [...STANDARD_UNITS, ...REGIONAL_UNITS];

/**
 * Returns available land units for a selected Indian state.
 * Always includes standard SI/National units (Acre, Hectare, Sqm) plus verified regional units for that state.
 */
export function getLandUnitsForState(stateName: string): LandUnit[] {
  if (!stateName) return ALL_LAND_UNITS;
  const filteredRegional = REGIONAL_UNITS.filter((u) =>
    u.states.includes(stateName)
  );
  return [...STANDARD_UNITS, ...filteredRegional];
}

/**
 * Converts any regional or standard unit value into square meters with high precision.
 */
export function convertToSqm(value: number, unitId: string): number {
  if (value <= 0 || isNaN(value)) return 0;
  const unit = ALL_LAND_UNITS.find((u) => u.id === unitId || u.code === unitId);
  if (!unit) return value; // fallback
  return Number((value * unit.factorToSqm).toFixed(2));
}

/**
 * Converts square meters into a targeted unit.
 */
export function convertFromSqm(sqm: number, targetUnitId: string): number {
  if (sqm <= 0 || isNaN(sqm)) return 0;
  const unit = ALL_LAND_UNITS.find((u) => u.id === targetUnitId || u.code === targetUnitId);
  if (!unit || unit.factorToSqm === 0) return sqm;
  return Number((sqm / unit.factorToSqm).toFixed(3));
}

/**
 * List of prominent agricultural Indian states and their flood-prone river districts.
 */
export interface StateDistrictMapping {
  state: string;
  districts: string[];
  primaryRiverBasin: string;
}

export const INDIAN_AGRI_STATES: StateDistrictMapping[] = [
  {
    state: 'Punjab',
    primaryRiverBasin: 'Sutlej, Beas, Ghaggar',
    districts: [
      'Patiala',
      'Sangrur',
      'Rupnagar (Ropar)',
      'Firozpur',
      'Fazilka',
      'Ludhiana',
      'Amritsar',
      'Jalandhar',
      'Gurdaspur',
      'Kapurthala',
      'Mansa',
      'Tarn Taran',
      'Hoshiarpur',
      'Bathinda',
      'Fatehgarh Sahib',
      'Faridkot',
      'Moga',
      'Muktsar',
      'Pathankot',
      'SBS Nagar (Nawanshahr)',
      'SAS Nagar (Mohali)',
      'Malerkotla',
      'Barnala'
    ]
  },
  {
    state: 'Haryana',
    primaryRiverBasin: 'Yamuna, Ghaggar-Hakra, Markanda, Tangri',
    districts: [
      'Ambala',
      'Kurukshetra',
      'Yamunanagar',
      'Karnal',
      'Kaithal',
      'Panipat',
      'Sonipat',
      'Sirsa',
      'Fatehabad',
      'Panchkula',
      'Palwal',
      'Faridabad',
      'Rohtak',
      'Jhajjar',
      'Hisar'
    ]
  },
  {
    state: 'Uttar Pradesh',
    primaryRiverBasin: 'Ganga, Yamuna, Ghaghara, Saryu, Gandak, Gomti',
    districts: [
      'Gorakhpur',
      'Bahraich',
      'Lakhimpur Kheri',
      'Gonda',
      'Balrampur',
      'Barabanki',
      'Basti',
      'Siddharthnagar',
      'Ballia',
      'Varanasi',
      'Prayagraj',
      'Ayodhya',
      'Sitapur',
      'Hardoi',
      'Kanpur Nagar',
      'Meerut',
      'Mathura',
      'Agra',
      'Saharanpur',
      'Moradabad',
      'Aligarh',
      'Bareilly',
      'Unnao'
    ]
  },
  {
    state: 'Bihar',
    primaryRiverBasin: 'Ganga, Kosi, Gandak, Burhi Gandak, Bagmati, Kamla',
    districts: [
      'Patna',
      'Darbhanga',
      'Muzaffarpur',
      'Samastipur',
      'Madhubani',
      'Sitamarhi',
      'Saharsa',
      'Supaul',
      'Madhepura',
      'Katihar',
      'Purnia',
      'Khagaria',
      'Bhagalpur',
      'Begusarai',
      'Vaishali',
      'East Champaran (Motihari)',
      'West Champaran (Bettiah)',
      'Saran (Chhapra)',
      'Siwan',
      'Gopalganj'
    ]
  },
  {
    state: 'West Bengal',
    primaryRiverBasin: 'Ganga-Bhagirathi, Teesta, Damodar, Rupnarayan',
    districts: [
      'Malda',
      'Murshidabad',
      'Jalpaiguri',
      'Cooch Behar',
      'Alipurduar',
      'Uttar Dinajpur',
      'Dakshin Dinajpur',
      'Howrah',
      'Hooghly',
      'Purba Medinipur',
      'Paschim Medinipur',
      'North 24 Parganas',
      'South 24 Parganas',
      'Nadia'
    ]
  },
  {
    state: 'Assam',
    primaryRiverBasin: 'Brahmaputra, Barak, Subansiri, Dhansiri',
    districts: [
      'Dhubri',
      'Barpeta',
      'Darrang',
      'Morigaon',
      'Nagaon',
      'Golaghat',
      'Jorhat',
      'Sivasagar',
      'Dibrugarh',
      'Tinsukia',
      'Lakhimpur',
      'Dhemaji',
      'Kamrup Rural',
      'Cachar',
      'Karimganj'
    ]
  },
  {
    state: 'Maharashtra',
    primaryRiverBasin: 'Godavari, Krishna, Bhima, Panchganga',
    districts: [
      'Kolhapur',
      'Sangli',
      'Satara',
      'Solapur',
      'Pune',
      'Nashik',
      'Nanded',
      'Raigad',
      'Ratnagiri',
      'Sindhudurg',
      'Thane',
      'Nagpur',
      'Chandrapur',
      'Gadchiroli'
    ]
  },
  {
    state: 'Gujarat',
    primaryRiverBasin: 'Narmada, Tapi, Sabarmati, Mahi',
    districts: [
      'Surat',
      'Bharuch',
      'Navsari',
      'Valsad',
      'Vadodara',
      'Ahmedabad',
      'Kheda',
      'Anand',
      'Junagadh',
      'Amreli',
      'Bhavnagar',
      'Kutch'
    ]
  },
  {
    state: 'Rajasthan',
    primaryRiverBasin: 'Chambal, Luni, Banas, Ghaggar',
    districts: [
      'Ganganagar',
      'Hanumangarh',
      'Kota',
      'Baran',
      'Jhalawar',
      'Bundi',
      'Sawai Madhopur',
      'Dholpur',
      'Bharatpur',
      'Jalore',
      'Pali',
      'Barmer'
    ]
  },
  {
    state: 'Uttarakhand',
    primaryRiverBasin: 'Ganga, Alaknanda, Bhagirathi, Yamuna, Kali',
    districts: [
      'Haridwar',
      'Dehradun',
      'Udham Singh Nagar',
      'Nainital',
      'Uttarkashi',
      'Chamoli',
      'Rudraprayag',
      'Tehri Garhwal',
      'Pauri Garhwal',
      'Pithoragarh'
    ]
  }
];

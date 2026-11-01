import { AgriculturalRiskItem, RiskCategoryKey } from '../types';

export interface RiskCategoryMetadata {
  key: RiskCategoryKey;
  label: string;
  nativeLabel: {
    en: string;
    hi: string;
    pa: string;
  };
  iconName: string;
  description: string;
  primaryAgency: string;
}

export const RISK_CATEGORIES: RiskCategoryMetadata[] = [
  {
    key: 'floods_waterlogging',
    label: 'Floods & Waterlogging',
    nativeLabel: {
      en: 'Floods & Waterlogging',
      hi: 'बाढ़ एवं जलभराव',
      pa: 'ਹੜ੍ਹ ਅਤੇ ਪਾਣੀ ਭਰਨਾ'
    },
    iconName: 'Droplets',
    description: 'River overflow, barrage discharges, and prolonged field inundation causing root asphyxiation.',
    primaryAgency: 'Central Water Commission (CWC) & State Irrigation Dept.'
  },
  {
    key: 'drought_deficit',
    label: 'Drought & Dry Spells',
    nativeLabel: {
      en: 'Drought & Dry Spells',
      hi: 'सूखा एवं वर्षा की कमी',
      pa: 'ਸੋਕਾ ਅਤੇ ਮੀਂਹ ਦੀ ਘਾਟ'
    },
    iconName: 'SunMedium',
    description: 'Extended precipitation deficits, declining reservoir reserves, and root zone moisture depletion.',
    primaryAgency: 'IMD Agromet & Central Ground Water Board'
  },
  {
    key: 'heatwave_frost',
    label: 'Heatwaves & Frost',
    nativeLabel: {
      en: 'Heatwaves & Frost',
      hi: 'लू (हीटवेव) एवं पाला/शीतलहर',
      pa: 'ਲੂ (ਹੀਟਵੇਵ) ਅਤੇ ਕੋਰਾ'
    },
    iconName: 'Flame',
    description: 'Thermal stress above 40°C during grain filling or sub-zero ground frost damaging winter tender tissue.',
    primaryAgency: 'India Meteorological Department (IMD) Synoptic Network'
  },
  {
    key: 'excessive_rain_storm',
    label: 'Excessive Rain & Storms',
    nativeLabel: {
      en: 'Excessive Rain & Storms',
      hi: 'अत्यधिक वर्षा, आंधी एवं ओलावृष्टि',
      pa: 'ਭਾਰੀ ਮੀਂਹ, ਹਨੇਰੀ ਅਤੇ ਗੜੇਮਾਰੀ'
    },
    iconName: 'CloudLightning',
    description: 'Squall winds (>50 km/h) causing crop lodging, localized hailstorms, and flash field runoff.',
    primaryAgency: 'IMD Doppler Weather Radar Network'
  },
  {
    key: 'crop_diseases',
    label: 'Crop Diseases & Blights',
    nativeLabel: {
      en: 'Crop Diseases & Blights',
      hi: 'फसल रोग एवं फफूंद संक्रमण',
      pa: 'ਫ਼ਸਲੀ ਬਿਮਾਰੀਆਂ ਅਤੇ ਉੱਲੀ ਰੋਗ'
    },
    iconName: 'Biohazard',
    description: 'Bacterial blight, blast, yellow rust, sheath rot, and fungal root wilt triggered by high humidity.',
    primaryAgency: 'ICAR - Directorate of Plant Protection & KVK Surveillance'
  },
  {
    key: 'pest_attacks',
    label: 'Pest Attacks & Invasions',
    nativeLabel: {
      en: 'Pest Attacks & Invasions',
      hi: 'कीट प्रकोप एवं टिड्डी आक्रमण',
      pa: 'ਕੀੜੇ-ਮਕੌੜੇ ਅਤੇ ਸੁੰਡੀ ਹਮਲੇ'
    },
    iconName: 'Bug',
    description: 'Stem borers, brown plant hopper (BPH), pink bollworm, fall armyworm, and whitefly surges.',
    primaryAgency: 'National Centre for Integrated Pest Management (ICAR-NCIPM)'
  },
  {
    key: 'soil_irrigation_issues',
    label: 'Irrigation & Soil Stress',
    nativeLabel: {
      en: 'Irrigation & Soil Stress',
      hi: 'सिंचाई संकट एवं मृदा लवणता',
      pa: 'ਸਿੰਚਾਈ ਸਮੱਸਿਆਵਾਂ ਅਤੇ ਮਿੱਟੀ ਖਾਰਾਪਣ'
    },
    iconName: 'Activity',
    description: 'Soil salinity, sodicity crusting, canal tail-end water failure, and electric pump outages.',
    primaryAgency: 'Soil Health Card Portal & State Agriculture Universities'
  },
  {
    key: 'post_harvest_storage',
    label: 'Post-Harvest Storage Risks',
    nativeLabel: {
      en: 'Post-Harvest Storage Risks',
      hi: 'कटाई उपरांत भंडारण जोखिम',
      pa: 'ਕਟਾਈ ਤੋਂ ਬਾਅਦ ਸਟੋਰੇਜ ਦੇ ਖ਼ਤਰੇ'
    },
    iconName: 'Package',
    description: 'Grain moisture >12% causing mold/aflatoxins, mandi open-yard rain exposure, and stored grain weevils.',
    primaryAgency: 'Warehousing Development and Regulatory Authority (WDRA) & FCI'
  }
];

export const AGRICULTURAL_RISK_ITEMS: AgriculturalRiskItem[] = [
  {
    id: 'risk-flood-01',
    category: 'floods_waterlogging',
    title: 'Ghaggar & Sutlej Catchment Flood Inundation Alert',
    affectedFarmOrCrop: 'Paddy & Cotton (Lowland fields in Sangrur, Mansa, Patiala)',
    severity: 'high',
    dataSource: 'Central Water Commission (CWC) Daily Hydrological Bulletin & Sentinel-1 SAR',
    lastUpdated: 'Today, 06:30 IST',
    preventiveActions: [
      'Create 25cm outlet breaches on low-elevation bund corners to facilitate free gravity run-off.',
      'Unscrew electric tubewell motor pumps and hoist onto elevated timber trolleys above the high-water line.',
      'Keep drainage furrows cleared of water hyacinth, weeds, and silt obstructions.'
    ],
    recoveryGuidance: [
      'As floodwater recedes, rinse muddy sediment off submerged leaves with clean knapsack sprayer water.',
      'Do not throw solid urea granules onto waterlogged mud (rotting roots will die); wait 48h until white root hair appears, then spray 1% Urea + 1% Potassium Nitrate.',
      'File an official PMFBY 72-hour crop loss intimation on the National Crop Insurance Portal (Toll-Free 14447).'
    ],
    dataReliabilityNotice: 'Hydro-radar observed boundary. Surface inundation reflects radar backscatter at time of satellite pass.'
  },
  {
    id: 'risk-drought-01',
    category: 'drought_deficit',
    title: 'Rainfall Deficit & Soil Moisture Depletion (Dry Spell > 18 Days)',
    affectedFarmOrCrop: 'Paddy & Maize (Rainfed & Tail-End Canal Commands)',
    severity: 'moderate',
    dataSource: 'IMD Standardized Precipitation Index (SPI) & Central Ground Water Board',
    lastUpdated: 'Yesterday, 18:00 IST',
    preventiveActions: [
      'Implement Alternate Wetting and Drying (AWD) in paddy rather than maintaining continuous standing water.',
      'Apply organic straw or stubble mulch (5 tonnes/ha) between rows to reduce soil surface evaporation.',
      'Schedule irrigation strictly during evening or night hours to minimize evaporative vapor loss.'
    ],
    recoveryGuidance: [
      'Spray 2% Potassium Chloride (MOP) or Kaolin 5% foliar anti-transpirant to preserve leaf turgor.',
      'Prioritize life-saving irrigation at critical growth stages (panicle initiation / silking).',
      'Notify block agriculture officer for contingency crop planning (short-duration millets/pulses).'
    ],
    dataReliabilityNotice: 'Standard meteorological deficit index based on district automated rain gauges (ARG).'
  },
  {
    id: 'risk-heat-01',
    category: 'heatwave_frost',
    title: 'Severe Terminal Heat Stress (>38.5°C during Anthesis)',
    affectedFarmOrCrop: 'Wheat & Mustard (Northern Plains Late-Sown Varieties)',
    severity: 'moderate',
    dataSource: 'IMD Agro-Meteorological Advisory Service & PAU Climate Advisory',
    lastUpdated: 'Today, 07:15 IST',
    preventiveActions: [
      'Provide light and frequent sprinkler irrigation to lower microclimatic canopy temperature by 2–3°C.',
      'Spray 0.2% Potassium Nitrate (13-0-45) or Salicylic Acid (100 ppm) at boot and flowering stages.',
      'Avoid delayed sowing of wheat after November 25 to evade March terminal heatwaves.'
    ],
    recoveryGuidance: [
      'Apply light irrigation prior to forecasted hot westerly winds to prevent premature grain shriveling.',
      'Harvest mature grain promptly in morning hours to prevent shattered pods in mustard.'
    ],
    dataReliabilityNotice: 'Maximum ambient temperature forecast from IMD regional synoptic models.'
  },
  {
    id: 'risk-storm-01',
    category: 'excessive_rain_storm',
    title: 'Squall Winds (55-65 km/h) & Sudden Downpours (Lodging Warning)',
    affectedFarmOrCrop: 'Sugarcane, Tall Paddy Varieties & Maize (Harvest/Maturity Stage)',
    severity: 'high',
    dataSource: 'IMD Doppler Weather Radar (DWR) Nowcast Bulletin',
    lastUpdated: 'Today, 08:00 IST',
    preventiveActions: [
      'Tie sugarcane clumps together (trash twisting/propping) to prevent high-wind uprooting.',
      'Stop all field irrigation 24 hours prior to storm warnings to keep root soil firm and prevent lodging.',
      'Anchor greenhouse polytunnels and shade netting securely with guy wires.'
    ],
    recoveryGuidance: [
      'If paddy lodges before maturity, lift fallen panicles gently off wet soil using bamboo props.',
      'Drain standing storm runoff immediately to stop grain germination on the panicle.',
      'Record geo-tagged photographs within 72 hours for crop insurance claim evidence.'
    ],
    dataReliabilityNotice: 'Short-range nowcast bulletin valid for 12–24 hours based on radar reflectivity.'
  },
  {
    id: 'risk-disease-01',
    category: 'crop_diseases',
    title: 'Bacterial Leaf Blight (BLB) & Sheath Blight Fungal Flare-up',
    affectedFarmOrCrop: 'Paddy (High-density tillering stage under overcast conditions)',
    severity: 'high',
    dataSource: 'Directorate of Plant Protection, Quarantine & Storage (DPPQ&S) / KVK Bulletin',
    lastUpdated: 'Yesterday, 16:45 IST',
    preventiveActions: [
      'Withhold nitrogenous fertilizer (urea) top-dressing until disease spread is halted.',
      'Maintain field water level below 3 cm to prevent fungal sclerotia from floating and infecting adjacent stems.',
      'Ensure balanced potassium nutrition (MOP) to harden plant cell walls against pathogen entry.'
    ],
    recoveryGuidance: [
      'For Sheath Blight: Spray Hexaconazole 5% EC @ 2ml/litre or Propiconazole 25% EC @ 1ml/litre targeting the stem base.',
      'For Bacterial Blight: Spray Copper Oxychloride 50% WP (500g) + Streptocycline (15g) in 200 litres water per acre.',
      'Consult local Krishi Vigyan Kendra (KVK) plant pathologist before mixing chemicals.'
    ],
    dataReliabilityNotice: 'Disease incidence confirmed by district KVK mobile plant clinic surveys.'
  },
  {
    id: 'risk-pest-01',
    category: 'pest_attacks',
    title: 'Pink Bollworm & Whitefly Economic Threshold Level (ETL) Exceeded',
    affectedFarmOrCrop: 'Cotton & Pulses (Flowering & Boll Formation Stage)',
    severity: 'severe',
    dataSource: 'ICAR - Central Institute for Cotton Research (CICR) Surveillance Alert',
    lastUpdated: 'Today, 09:00 IST',
    preventiveActions: [
      'Install 5 pheromone traps per acre with Gossyplure lures to monitor adult moth catches daily.',
      'Erect yellow sticky traps (10 per acre) at canopy level for whitefly mass trapping.',
      'Avoid synthetic pyrethroids which cause resurgence of sucking pests.'
    ],
    recoveryGuidance: [
      'If ETL exceeded (>8 moths/trap/night for 3 consecutive days), spray Profenofos 50% EC @ 2ml/litre or Emamectin Benzoate 5% SG @ 5g/10L water.',
      'For whitefly: Spray Diafenthiuron 50% WP @ 200g/acre or Pyriproxyfen 10% EC @ 400ml/acre.',
      'Burn infested dropped bolls/squares in clean pits to break pest lifecycle.'
    ],
    dataReliabilityNotice: 'Field ETL calculated from randomized district trap network readings.'
  },
  {
    id: 'risk-soil-01',
    category: 'soil_irrigation_issues',
    title: 'Secondary Soil Salinization & Hardpan Water Stagnation',
    affectedFarmOrCrop: 'Wheat, Mustard & Pulses (Canal Seepage Zones & Sodic Tracts)',
    severity: 'moderate',
    dataSource: 'Central Soil Salinity Research Institute (ICAR-CSSRI) Advisory',
    lastUpdated: '2 days ago',
    preventiveActions: [
      'Apply agricultural Gypsum (based on soil test recommendation) to replace sodium with calcium.',
      'Deep subsoil chiseling (once in 3 years) to shatter impenetrable hardpans and improve percolation.',
      'Incorporate green manure crops (Dhaincha / Sesbania aculeata) at 45 days after sowing.'
    ],
    recoveryGuidance: [
      'Flush root zone with high-quality canal water where surface drainage channels are operational.',
      'Select salt-tolerant certified crop cultivars (e.g. KRL-210, KRL-19 for wheat; CSR-30 for paddy).'
    ],
    dataReliabilityNotice: 'Soil test based recommendations from CSSRI verified field trials.'
  },
  {
    id: 'risk-storage-01',
    category: 'post_harvest_storage',
    title: 'High Grain Moisture (>14%) & Mandi Precipitation Exposure Warning',
    affectedFarmOrCrop: 'Harvested Paddy, Wheat & Maize in Open Yards / Farm Threshing Floors',
    severity: 'high',
    dataSource: 'Warehousing Development & Regulatory Authority (WDRA) & Mandi Board Advisory',
    lastUpdated: 'Today, 05:45 IST',
    preventiveActions: [
      'Sun-dry harvested grains thoroughly on clean tarpaulins until seed moisture drops below 12%.',
      'Never store moist grains in non-breathable plastic sacks; use clean HDPE or hermetic storage bags.',
      'Keep grain bags stacked on raised wooden dunnage platforms (at least 30 cm above concrete floor).'
    ],
    recoveryGuidance: [
      'If grain gets soaked by unseasonal rains, spread immediately on dry raised floors with high-speed fans.',
      'Apply food-safe Neem oil treatment or Aluminium Phosphide fumigation strictly by certified warehouse personnel.',
      'Utilize e-NWR (electronic Negotiable Warehouse Receipts) for safe pledge storage in registered WDRA godowns.'
    ],
    dataReliabilityNotice: 'Moisture safety thresholds adhering to Food Corporation of India (FCI) fair average quality (FAQ) standards.'
  }
];

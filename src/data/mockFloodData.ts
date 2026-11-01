import { FloodObservation, FloodWarning } from '../types';

export interface RiverGaugeStation {
  id: string;
  stationName: string;
  river: string;
  basin: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  currentLevelMeters: number;
  warningLevelMeters: number;
  dangerLevelMeters: number;
  highestFloodLevelMeters: number;
  trend: 'rising' | 'steady' | 'falling';
  status: 'normal' | 'warning' | 'danger';
  lastObserved: string;
  source: string;
}

export const OFFICIAL_FLOOD_WARNINGS: FloodWarning[] = [
  {
    id: 'warn-pb-ghaggar-01',
    severity: 'red',
    headline: 'High Flood Warning: Ghaggar River Basin Spill at Khanauri & Moonak',
    description: 'Central Water Commission (CWC) reports Ghaggar River flowing 1.2m above Danger Level at Khanauri gauge. Heavy upstream catchment rainfall in Shivalik hills has caused embankment breach near Makror Sahib. Low-lying agricultural fields in Sangrur and Patiala districts face severe inundation.',
    state: 'Punjab',
    district: 'Sangrur',
    riverBasin: 'Ghaggar Basin',
    waterLevelCurrent: '228.45 m (Danger Level: 227.25 m)',
    dangerLevel: '227.25 m',
    expectedThreatPeriod: 'Next 24 to 48 Hours',
    source: 'Central Water Commission (CWC) Daily Flood Situation Bulletin No. 142 & Punjab Irrigation Dept',
    sourceUrl: 'https://cwc.gov.in',
    lastUpdated: 'Today at 06:30 IST',
    uncertaintyNotes: 'Water peak travel time from upstream gauges (Sarala) is estimated at 8–12 hours. Unforeseen breach widening may alter local inundation contours.'
  },
  {
    id: 'warn-pb-sutlej-02',
    severity: 'orange',
    headline: 'Inflow Advisory: Controlled Reservoir Release from Ropar Headworks',
    description: 'Sutlej River water discharge increased to 68,000 cusecs following catchment rainfall in Himachal foothills. Villages along riverbanks in Rupnagar, Ludhiana, and Firozpur should monitor farm bunds and refrain from crossing river nullahs.',
    state: 'Punjab',
    district: 'Rupnagar (Ropar)',
    riverBasin: 'Sutlej Basin',
    waterLevelCurrent: 'Approaching Warning Level (Warning: 390.5 m)',
    dangerLevel: '392.0 m',
    expectedThreatPeriod: 'Next 36 Hours',
    source: 'Bhakra Beas Management Board (BBMB) & CWC Northern Regional Office',
    sourceUrl: 'https://bbmb.gov.in',
    lastUpdated: 'Today at 08:00 IST',
    uncertaintyNotes: 'Discharge levels are subject to tributary contributions from Sirsa and Swan streams in Himachal Pradesh.'
  },
  {
    id: 'warn-hr-yamuna-03',
    severity: 'orange',
    headline: 'Yamuna Floodplain Water Rise: Hathnikund Barrage Discharge',
    description: 'Discharge of 1,15,000 cusecs recorded at Hathnikund Barrage into the Yamuna. Agricultural fields in floodplains of Yamunanagar, Karnal, and Panipat may experience water seepage and localized inundation.',
    state: 'Haryana',
    district: 'Yamunanagar',
    riverBasin: 'Yamuna River Basin',
    waterLevelCurrent: 'Flowing near warning mark at Mawi station',
    dangerLevel: '231.5 m',
    expectedThreatPeriod: 'Next 24 to 60 Hours',
    source: 'Haryana Irrigation & Water Resources Department Bulletin',
    sourceUrl: 'https://hid.gov.in',
    lastUpdated: 'Today at 07:15 IST',
    uncertaintyNotes: 'Peak transit time from Hathnikund to Karnal is approximately 18–24 hours.'
  },
  {
    id: 'warn-up-ghaghara-04',
    severity: 'red',
    headline: 'Severe Flood Alert: Ghaghara & Rapti Rivers Inundating Lowlands',
    description: 'Ghaghara river is flowing 0.85m above danger level at Elgin Bridge, Barabanki, and Rapti river is flowing above danger mark at Birdghat, Gorakhpur. Agricultural lands in floodways are severely affected.',
    state: 'Uttar Pradesh',
    district: 'Gorakhpur',
    riverBasin: 'Ghaghara-Rapti Basin',
    waterLevelCurrent: 'Birdghat: 75.85 m (Danger: 74.98 m)',
    dangerLevel: '74.98 m',
    expectedThreatPeriod: 'Next 48 to 72 Hours',
    source: 'Central Water Commission Middle Ganga Basin Organization & UP Relief Commissioner',
    sourceUrl: 'https://rahat.up.nic.in',
    lastUpdated: 'Today at 05:45 IST',
    uncertaintyNotes: 'High backwater effect from confluence points can prolong waterlogging.'
  },
  {
    id: 'warn-br-kosi-05',
    severity: 'red',
    headline: 'High Discharge Notice: Kosi River Inflow at Birpur Barrage',
    description: 'Kosi River discharge has crossed 2,40,000 cusecs at Birpur Barrage due to heavy precipitation in Nepal catchment. Low-lying diara (riverbed) agricultural lands in Supaul, Saharsa, and Khagaria face significant inundation.',
    state: 'Bihar',
    district: 'Supaul',
    riverBasin: 'Kosi Basin',
    waterLevelCurrent: 'Birpur Barrage: 2,42,100 cusecs discharge',
    dangerLevel: 'Exceeding Danger Level across Baltara & Baltara-Kosi gauge',
    expectedThreatPeriod: 'Next 24 to 72 Hours',
    source: 'Water Resources Department, Bihar (Disaster Management Cell)',
    sourceUrl: 'https://fmis.bih.nic.in',
    lastUpdated: 'Today at 06:00 IST',
    uncertaintyNotes: 'Kosi is prone to channel shifting; diara land areas inside embankments are immediately vulnerable.'
  },
  {
    id: 'warn-as-brahmaputra-06',
    severity: 'yellow',
    headline: 'Brahmaputra Basin Water Rise: Seasonal Flood Watch',
    description: 'Brahmaputra river is flowing near warning level at Neamatighat and Tezpur. Intermittent monsoon rainfall forecasted by IMD for upper catchment.',
    state: 'Assam',
    district: 'Jorhat',
    riverBasin: 'Brahmaputra Basin',
    waterLevelCurrent: '84.62 m (Warning: 85.04 m)',
    dangerLevel: '85.54 m',
    expectedThreatPeriod: 'Next 3 to 5 Days',
    source: 'Assam State Disaster Management Authority (ASDMA) & CWC',
    sourceUrl: 'https://asdma.assam.gov.in',
    lastUpdated: 'Today at 09:00 IST',
    uncertaintyNotes: 'Dependent on localized heavy cloudbursts in Arunachal Pradesh hills.'
  }
];

export const RIVER_GAUGES: RiverGaugeStation[] = [
  {
    id: 'gauge-khanauri',
    stationName: 'Khanauri Gauge Station',
    river: 'Ghaggar',
    basin: 'Ghaggar-Hakra Basin',
    district: 'Sangrur',
    state: 'Punjab',
    lat: 29.8512,
    lng: 76.0125,
    currentLevelMeters: 228.45,
    warningLevelMeters: 226.50,
    dangerLevelMeters: 227.25,
    highestFloodLevelMeters: 229.80,
    trend: 'rising',
    status: 'danger',
    lastObserved: 'Today, 07:00 IST',
    source: 'Central Water Commission (CWC)'
  },
  {
    id: 'gauge-harike',
    stationName: 'Harike Headworks Barrage',
    river: 'Sutlej & Beas Confluence',
    basin: 'Indus-Sutlej Basin',
    district: 'Tarn Taran',
    state: 'Punjab',
    lat: 31.1534,
    lng: 74.9547,
    currentLevelMeters: 210.15,
    warningLevelMeters: 209.50,
    dangerLevelMeters: 211.00,
    highestFloodLevelMeters: 212.45,
    trend: 'steady',
    status: 'warning',
    lastObserved: 'Today, 08:00 IST',
    source: 'Punjab Irrigation & Drainage Dept'
  },
  {
    id: 'gauge-ropar',
    stationName: 'Rupnagar (Ropar) Headworks',
    river: 'Sutlej',
    basin: 'Sutlej Basin',
    district: 'Rupnagar (Ropar)',
    state: 'Punjab',
    lat: 30.9785,
    lng: 76.5273,
    currentLevelMeters: 390.85,
    warningLevelMeters: 390.50,
    dangerLevelMeters: 392.00,
    highestFloodLevelMeters: 393.20,
    trend: 'rising',
    status: 'warning',
    lastObserved: 'Today, 08:30 IST',
    source: 'CWC & BBMB'
  },
  {
    id: 'gauge-hathnikund',
    stationName: 'Hathnikund Barrage',
    river: 'Yamuna',
    basin: 'Yamuna Basin',
    district: 'Yamunanagar',
    state: 'Haryana',
    lat: 30.3167,
    lng: 77.5833,
    currentLevelMeters: 298.40,
    warningLevelMeters: 297.50,
    dangerLevelMeters: 299.00,
    highestFloodLevelMeters: 301.20,
    trend: 'rising',
    status: 'warning',
    lastObserved: 'Today, 07:30 IST',
    source: 'Haryana Irrigation Department'
  },
  {
    id: 'gauge-gorakhpur',
    stationName: 'Birdghat Gauge',
    river: 'Rapti',
    basin: 'Ghaghara-Rapti Basin',
    district: 'Gorakhpur',
    state: 'Uttar Pradesh',
    lat: 26.7450,
    lng: 83.3710,
    currentLevelMeters: 75.85,
    warningLevelMeters: 74.50,
    dangerLevelMeters: 74.98,
    highestFloodLevelMeters: 77.10,
    trend: 'rising',
    status: 'danger',
    lastObserved: 'Today, 06:00 IST',
    source: 'Central Water Commission (CWC)'
  },
  {
    id: 'gauge-supaul',
    stationName: 'Baltara Gauge Station',
    river: 'Kosi',
    basin: 'Kosi Basin',
    district: 'Supaul',
    state: 'Bihar',
    lat: 26.1240,
    lng: 86.6020,
    currentLevelMeters: 34.65,
    warningLevelMeters: 33.85,
    dangerLevelMeters: 34.20,
    highestFloodLevelMeters: 36.15,
    trend: 'rising',
    status: 'danger',
    lastObserved: 'Today, 06:30 IST',
    source: 'Bihar Water Resources Department'
  }
];

export const SATELLITE_FLOOD_OBSERVATIONS: FloodObservation[] = [
  {
    id: 'sat-ghaggar-moonak-2024',
    title: 'Sentinel-1 C-SAR Radar Inundation Extent: Ghaggar Basin (Khanauri/Moonak Sector)',
    observationDate: '2024-08-16T12:45:00Z',
    satelliteSensor: 'Copernicus Sentinel-1 C-SAR (Synthetic Aperture Radar IW GRD)',
    provider: 'European Space Agency (ESA) / Copernicus Open Access Hub via ISRO Disaster Management Support',
    resolutionMeters: 10,
    dataType: 'satellite_radar',
    isSimulatedOrHistorical: false,
    disclaimer: 'Radar backscatter thresholding (VV polarization) identifies standing surface water beneath clouds. Does not reflect instantaneous flash water depth or subsurface saturation.',
    geoJson: {
      type: 'Polygon',
      coordinates: [
        [
          [75.985, 29.840],
          [76.045, 29.842],
          [76.060, 29.865],
          [76.035, 29.885],
          [75.990, 29.875],
          [75.975, 29.855],
          [75.985, 29.840]
        ]
      ]
    }
  },
  {
    id: 'sat-harike-sutlej-2024',
    title: 'Sentinel-1 C-SAR Radar Inundation Extent: Sutlej-Beas Floodplain (Harike/Patti Sector)',
    observationDate: '2024-08-18T05:30:00Z',
    satelliteSensor: 'Copernicus Sentinel-1 C-SAR (VV/VH Polarization)',
    provider: 'Copernicus Data Space Ecosystem / Bhuvan ISRO Hydrology Node',
    resolutionMeters: 10,
    dataType: 'satellite_radar',
    isSimulatedOrHistorical: false,
    disclaimer: 'Observed surface water reflection. High vegetation canopy in orchards may cause backscatter attenuation.',
    geoJson: {
      type: 'Polygon',
      coordinates: [
        [
          [74.920, 31.130],
          [74.980, 31.135],
          [74.995, 31.170],
          [74.950, 31.185],
          [74.910, 31.160],
          [74.920, 31.130]
        ]
      ]
    }
  },
  {
    id: 'sat-yamuna-karnal-2024',
    title: 'Radar Flood Map: Yamuna Riverbed Inundation (Yamunanagar-Karnal Belt)',
    observationDate: '2024-07-28T18:10:00Z',
    satelliteSensor: 'Sentinel-1B C-Band SAR',
    provider: 'National Remote Sensing Centre (NRSC) / ISRO Disaster Management Node',
    resolutionMeters: 10,
    dataType: 'satellite_radar',
    isSimulatedOrHistorical: false,
    disclaimer: 'Derived from multi-temporal SAR amplitude change detection. Documented historical event archive.',
    geoJson: {
      type: 'Polygon',
      coordinates: [
        [
          [77.010, 29.680],
          [77.060, 29.690],
          [77.070, 29.740],
          [77.025, 29.750],
          [76.995, 29.710],
          [77.010, 29.680]
        ]
      ]
    }
  },
  {
    id: 'sat-bihar-kosi-sim',
    title: 'Hydrological Simulation Model: Kosi Diara Flood Inundation Zone',
    observationDate: '2024-09-02T10:00:00Z',
    satelliteSensor: 'Hydrodynamic Inundation Modeling (HEC-RAS calibrated with Cartosat DEM)',
    provider: 'State Flood Control Division & Research Hydrology Sandbox',
    resolutionMeters: 15,
    dataType: 'simulation_model',
    isSimulatedOrHistorical: true,
    disclaimer: 'SIMULATED DEMO DATA: Derived from hydraulic model calibration. Intended for preparedness visualization and not a real-time observation.',
    geoJson: {
      type: 'Polygon',
      coordinates: [
        [
          [86.580, 26.100],
          [86.640, 26.110],
          [86.660, 26.150],
          [86.610, 26.170],
          [86.565, 26.130],
          [86.580, 26.100]
        ]
      ]
    }
  },
  {
    id: 'sat-gorakhpur-rapti-2024',
    title: 'Sentinel-1 C-SAR Radar Inundation Extent: Rapti River Corridor (Gorakhpur Sector)',
    observationDate: '2024-08-20T12:15:00Z',
    satelliteSensor: 'Copernicus Sentinel-1 C-SAR (Synthetic Aperture Radar IW GRD)',
    provider: 'ESA / ISRO Disaster Management Support Project (DMSP)',
    resolutionMeters: 10,
    dataType: 'satellite_radar',
    isSimulatedOrHistorical: false,
    disclaimer: 'Radar water mask capturing floodwater spilling from Birdghat & Pipraich embankments. Validated against ground truth observations.',
    geoJson: {
      type: 'Polygon',
      coordinates: [
        [
          [83.370, 26.745],
          [83.405, 26.748],
          [83.415, 26.765],
          [83.386, 26.768],
          [83.368, 26.758],
          [83.370, 26.745]
        ]
      ]
    }
  },
  {
    id: 'sat-assam-morigaon-2024',
    title: 'Copernicus SAR Flood Observation: Brahmaputra Floodplain (Morigaon/Jorhat)',
    observationDate: '2024-08-22T06:00:00Z',
    satelliteSensor: 'Sentinel-1B C-Band SAR',
    provider: 'North Eastern Space Applications Centre (NESAC) / ISRO',
    resolutionMeters: 10,
    dataType: 'satellite_radar',
    isSimulatedOrHistorical: false,
    disclaimer: 'High backscatter attenuation observed in dense riparian grasslands. Surface flood extent mapped at 10m resolution.',
    geoJson: {
      type: 'Polygon',
      coordinates: [
        [
          [92.300, 26.220],
          [92.380, 26.225],
          [92.400, 26.270],
          [92.340, 26.285],
          [92.290, 26.250],
          [92.300, 26.220]
        ]
      ]
    }
  }
];

export const REFERENCE_FLOOD_PHOTOS = [
  {
    id: 'sample-paddy-submerged',
    title: {
      en: 'Paddy Submerged Under Silt-Laden Floodwater',
      hi: 'गाद भरे मटमैले पानी में डूबी धान की फसल',
      pa: 'ਗੰਧਲੇ ਹੜ੍ਹ ਦੇ ਪਾਣੀ ਵਿੱਚ ਡੁੱਬਾ ਝੋਨਾ'
    },
    cropType: 'paddy',
    thumbnail: 'https://images.unsplash.com/photo-1594488582792-2784570081d4?auto=format&fit=crop&w=600&q=80',
    symptoms: [
      'Submerged leaves with heavy brown silt deposition',
      'Chlorotic leaf tips (pale yellow-green)',
      'Water level covering tillering junction by ~25 cm'
    ],
    suspectedConditions: [
      'Turbidity-induced photosynthetic blockage',
      'Early vegetative anoxia risk'
    ],
    advice: [
      'Allow sediment to settle, do not disturb standing water vigorously.',
      'Prepare shallow drainage trench on low side of field.',
      'Once water recedes to 5cm, spray with clean water to wash leaf stomata.'
    ]
  },
  {
    id: 'sample-cotton-waterlogging',
    title: {
      en: 'Cotton Leaf Reddening and Square Dropping After Waterlogging',
      hi: 'कपास में जलभराव के बाद पत्तियां लाल होना व डोडी गिरना',
      pa: 'ਨਰਮੇ ਵਿੱਚ ਪਾਣੀ ਖੜ੍ਹਨ ਕਾਰਨ ਪੱਤੇ ਲਾਲ ਹੋਣਾ ਤੇ ਗੁੱਡੀ ਝੜਨਾ'
    },
    cropType: 'cotton',
    thumbnail: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80',
    symptoms: [
      'Bronzing/reddening of upper leaves',
      'Premature abscission (dropping) of squares and young bolls',
      'Taproot discolored with blackish decay tips'
    ],
    suspectedConditions: [
      'Cotton Parawilt (physiological shock due to anaerobic saturation)',
      'Fusarium/Rhizoctonia fungal root rot initiation'
    ],
    advice: [
      'Siphon off all standing water within 12 hours.',
      'Drench root zone with Copper Oxychloride (2.5g/L) to prevent fungal wilt.',
      'Apply foliar spray of 1% DAP + 1% Potassium Nitrate after drainage.'
    ]
  },
  {
    id: 'sample-wheat-yellowing',
    title: {
      en: 'Wheat Field Chlorosis Following Drainage Stagnation',
      hi: 'गेहूं के खेत में जलभराव के बाद पीलापन (क्लोरोसिस)',
      pa: 'ਕਣਕ ਵਿੱਚ ਪਾਣੀ ਖੜ੍ਹਨ ਉਪਰੰਤ ਪੀਲਾਪਨ'
    },
    cropType: 'wheat',
    thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    symptoms: [
      'Lower leaves showing uniform golden yellowing',
      'Tillers stunted, slow root crown elongation',
      'Surface soil cracked with gray crust'
    ],
    suspectedConditions: [
      'Nitrogen leaching and anaerobic root shutdown',
      'Crown rot susceptibility'
    ],
    advice: [
      'Hoe soil surface lightly to aerate root zone.',
      'Spray 2% Urea foliar solution (20g urea per liter of water) for rapid nitrogen absorption.',
      'Do not broadcast raw urea into wet soggy mud.'
    ]
  }
];

import { Language } from '../types';

export interface Translations {
  appName: string;
  appSlogan: string;
  primaryQuestion: string;
  nav: {
    home: string;
    register: string;
    dashboard: string;
    warnings: string;
    floodMap: string;
    planner: string;
    safety: string;
    recovery: string;
    photoAssess: string;
    reports: string;
    settings: string;
    dataSources: string;
    emergencyCall: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    registerCta: string;
    viewMapCta: string;
    checkWarningsCta: string;
    statusBanner: string;
    statsFarms: string;
    statsFloodMonitored: string;
    statsAlertsDelivered: string;
    statsStatesCovered: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    corePrinciplesTitle: string;
    corePrinciplesSubtitle: string;
    safetyFirstTitle: string;
    safetyFirstDesc: string;
    noFabricationTitle: string;
    noFabricationDesc: string;
    regionalUnitsTitle: string;
    regionalUnitsDesc: string;
  };
  register: {
    title: string;
    subtitle: string;
    stepBasic: string;
    stepLocation: string;
    stepBoundary: string;
    stepCrop: string;
    stepConsent: string;
    farmerNameLabel: string;
    farmerNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneHelp: string;
    stateLabel: string;
    districtLabel: string;
    villageLabel: string;
    villagePlaceholder: string;
    mapInstructions: string;
    drawInstruction: string;
    clearBoundary: string;
    confirmBoundary: string;
    calculatedAreaNotice: string;
    cropTypeLabel: string;
    cropVarietyLabel: string;
    plantingDateLabel: string;
    growthStageLabel: string;
    preferredUnitLabel: string;
    enteredAreaLabel: string;
    calculatedEquiv: string;
    smsConsentTitle: string;
    smsConsentText: string;
    submitButton: string;
    validationErrors: string;
    successMessage: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    selectFarm: string;
    currentCrop: string;
    farmLocation: string;
    areaRegistered: string;
    latestWarningsTitle: string;
    noActiveWarnings: string;
    weatherTitle: string;
    floodRiskTitle: string;
    recommendedActionsTitle: string;
    satelliteObservationsTitle: string;
    estimatedOverlapTitle: string;
    cropGuidanceTitle: string;
    recentAlertsTitle: string;
    viewDetails: string;
    takeAction: string;
  };
  warnings: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterRed: string;
    filterOrange: string;
    filterYellow: string;
    sourcePrefix: string;
    updatedAtPrefix: string;
    threatPeriodPrefix: string;
    basinPrefix: string;
    uncertaintyPrefix: string;
    officialDisclaimer: string;
  };
  floodMap: {
    title: string;
    subtitle: string;
    layerSatellite: string;
    layerStreet: string;
    layerFloodRadar: string;
    layerFarmBoundary: string;
    layerRiverGauges: string;
    legendTitle: string;
    legendFarm: string;
    legendObservedFlood: string;
    legendHighRisk: string;
    overlapSummary: string;
    runAnalysis: string;
    analyzingText: string;
    overlapResultTitle: string;
  };
  planner: {
    title: string;
    subtitle: string;
    cropStageHeader: string;
    checklistHeader: string;
    markCompleted: string;
    completedStatus: string;
    disclaimer: string;
    safetyCaution: string;
  };
  safety: {
    title: string;
    subtitle: string;
    emergencyHotlineHeader: string;
    rule1Title: string;
    rule1Desc: string;
    rule2Title: string;
    rule2Desc: string;
    rule3Title: string;
    rule3Desc: string;
    rule4Title: string;
    rule4Desc: string;
    rule5Title: string;
    rule5Desc: string;
    offlineNotice: string;
  };
  recovery: {
    title: string;
    subtitle: string;
    stepSafeEntry: string;
    stepSafeEntryDesc: string;
    stepDrainage: string;
    stepDrainageDesc: string;
    stepSilt: string;
    stepSiltDesc: string;
    stepNutrition: string;
    stepNutritionDesc: string;
    stepDisease: string;
    stepDiseaseDesc: string;
    generateReportCta: string;
  };
  photoAssess: {
    title: string;
    subtitle: string;
    uploadInstructions: string;
    chooseFile: string;
    analyzingPhoto: string;
    resultsHeader: string;
    symptomsIdentified: string;
    suspectedCondition: string;
    immediateAdvice: string;
    disclaimerText: string;
    samplePhotos: string;
  };
  reports: {
    title: string;
    subtitle: string;
    farmSummary: string;
    floodExposure: string;
    printReport: string;
    downloadReport: string;
    officialSubmissionNote: string;
  };
  settings: {
    title: string;
    subtitle: string;
    languageHeader: string;
    smsHeader: string;
    smsPhoneLabel: string;
    sendOtp: string;
    enterOtp: string;
    verifyOtp: string;
    smsConsentCheck: string;
    savePreferences: string;
    optOutSms: string;
    testSmsButton: string;
    testSmsNote: string;
  };
  dataSources: {
    title: string;
    subtitle: string;
    transparencyNote: string;
    sourcesListHeader: string;
    limitationsHeader: string;
  };
  common: {
    safeFallbackNotice: string;
    loading: string;
    error: string;
    source: string;
    lastUpdated: string;
    severe: string;
    high: string;
    moderate: string;
    low: string;
    none: string;
    disclaimer: string;
  };
}

export const translations: Record<string, Translations> = {
  en: {
    appName: 'FieldShield AI',
    appSlogan: 'Detect the Flood. Protect the Crop. Reduce the Loss.',
    primaryQuestion: 'What is happening near my farm, how could it affect my crops, and what should I do now?',
    nav: {
      home: 'Home',
      register: 'Register Farm',
      dashboard: 'Farm Dashboard',
      warnings: 'Weather & Flood Warnings',
      floodMap: 'Flood Map & Radar',
      planner: 'Crop Protection Planner',
      safety: 'During-Flood Safety',
      recovery: 'Post-Flood Recovery',
      photoAssess: 'Crop Photo Assessment',
      reports: 'Farm Reports',
      settings: 'Language & Alerts',
      dataSources: 'Data Sources & Limits',
      emergencyCall: 'Emergency Helplines (1078/1070)'
    },
    home: {
      heroTitle: 'Agricultural Flood Preparedness & Timely Crop Recovery',
      heroSubtitle: 'Designed specifically for Indian farmers. Get reliable official flood warnings, Sentinel-1 radar observations, regional land measurements, and safe agricultural guidance before, during, and after floods.',
      registerCta: 'Register Your Farm Now',
      viewMapCta: 'Open Interactive Flood Map',
      checkWarningsCta: 'View Official Flood Warnings',
      statusBanner: 'Active Flood Watch: Sutlej, Beas, Ghaggar, Ganga, Kosi, and Brahmaputra Basins',
      statsFarms: 'Active Monitored Fields',
      statsFloodMonitored: 'River Gauge Basins',
      statsAlertsDelivered: 'Disaster Helplines Linked',
      statsStatesCovered: 'Agri States Supported',
      howItWorksTitle: 'How FieldShield AI Protects Your Harvest',
      howItWorksSubtitle: 'Actionable, easy-to-understand assistance instead of complicated technical dashboards.',
      step1Title: '1. Pin Your Farm & Boundary',
      step1Desc: 'Enter your village, mark your field boundary on the interactive satellite map, and specify your crop in familiar regional units (Bigha, Kanal, Kattha, Guntha, Acre).',
      step2Title: '2. Track Official Warnings',
      step2Desc: 'Receive localized meteorological alerts from IMD and river warnings from the Central Water Commission (CWC) matched to your specific district and river basin.',
      step3Title: '3. Act Before Floods Hit',
      step3Desc: 'Follow personalized, agronomically reviewed crop protection checklists: clear drainage channels, safely elevate seeds, fertilizers, and power equipment.',
      step4Title: '4. Assess & Recover Safely',
      step4Desc: 'Analyze post-flood Sentinel radar overlap, photograph affected crops for damage symptoms, and generate verified documentation for Krishi Vigyan Kendra & crop insurance.',
      corePrinciplesTitle: 'Our Commitment to Integrity & Safety',
      corePrinciplesSubtitle: 'Never fabricated. Grounded in official data with complete transparency.',
      safetyFirstTitle: 'Human Life Above All Else',
      safetyFirstDesc: 'Never enter rapidly flowing floodwaters to rescue equipment or standing crops. Safety always precedes salvage.',
      noFabricationTitle: 'Verified Sources & Uncertainty Limits',
      noFabricationDesc: 'Every warning and satellite overlay displays observation dates, data providers, and explicit uncertainty boundaries.',
      regionalUnitsTitle: 'Regional Units with Exact Conversions',
      regionalUnitsDesc: 'Bigha, Kattha, Kanal, Marla, and Guntha vary across Indian states. We use verified State Revenue Department conversion tables.'
    },
    register: {
      title: 'Register Your Farm',
      subtitle: 'Set up your farm profile to receive targeted flood alerts, satellite radar overlap analysis, and tailored crop guidance.',
      stepBasic: '1. Farmer Information',
      stepLocation: '2. Village & Location',
      stepBoundary: '3. Field Boundary Map',
      stepCrop: '4. Crop & Regional Land Unit',
      stepConsent: '5. Alert Consent & Review',
      farmerNameLabel: 'Farmer Name / Preferred Display Name',
      farmerNamePlaceholder: 'e.g. Gurpreet Singh / Ram Kumar',
      phoneLabel: 'Mobile Phone Number (for optional SMS alerts)',
      phonePlaceholder: 'e.g. 9876543210 (10-digit Indian mobile)',
      phoneHelp: 'Your phone number will never be publicly displayed or shared. Used solely for verified flood warnings.',
      stateLabel: 'State',
      districtLabel: 'District',
      villageLabel: 'Village / Tehsil / Farm Address',
      villagePlaceholder: 'e.g. Village Harike, Tehsil Patti',
      mapInstructions: 'Click on the map to add boundary points around your farm field. Connect at least 3 points to form a polygon.',
      drawInstruction: 'Click to draw field corners. Double-click or click first point to close.',
      clearBoundary: 'Clear Points',
      confirmBoundary: 'Confirm Field Boundary',
      calculatedAreaNotice: 'Geospatially calculated area based on geodesic projection:',
      cropTypeLabel: 'Primary Crop',
      cropVarietyLabel: 'Crop Variety (optional)',
      plantingDateLabel: 'Planting / Sowing Date (if known)',
      growthStageLabel: 'Current Crop Growth Stage',
      preferredUnitLabel: 'Preferred Regional Land Unit',
      enteredAreaLabel: 'Farm Area in Selected Unit',
      calculatedEquiv: 'Converted equivalent in Square Metres and Acres:',
      smsConsentTitle: 'Explicit Consent for Flood & Weather SMS Alerts',
      smsConsentText: 'I explicitly authorize FieldShield AI to send emergency flood warnings, weather alerts, and crop protection notices to my mobile number. I understand I can opt out at any time.',
      submitButton: 'Register Farm & Activate Monitoring',
      validationErrors: 'Please complete all required fields and confirm your farm boundary on the map.',
      successMessage: 'Farm registered successfully! Your field is now actively monitored.'
    },
    dashboard: {
      title: 'Farm Flood Dashboard',
      subtitle: 'Real-time situational awareness and practical agricultural guidance for your field.',
      selectFarm: 'Select Farm Field:',
      currentCrop: 'Crop & Stage',
      farmLocation: 'Location',
      areaRegistered: 'Registered Field Area',
      latestWarningsTitle: 'Latest Official Weather & Flood Warnings',
      noActiveWarnings: 'No severe flood alerts currently active for this district. Weather remains within normal seasonal thresholds.',
      weatherTitle: 'Field Weather & Rain Forecast (IMD / Open-Meteo)',
      floodRiskTitle: 'Flood Risk Assessment & Basin Status',
      recommendedActionsTitle: 'Immediate Recommended Actions',
      satelliteObservationsTitle: 'Latest Satellite Radar Observations (Sentinel-1)',
      estimatedOverlapTitle: 'Estimated Farm Inundation Overlap',
      cropGuidanceTitle: 'Agronomic Protection & Recovery Guidance',
      recentAlertsTitle: 'Recent Alerts & System Log',
      viewDetails: 'View Detailed Assessment',
      takeAction: 'Open Protection Checklist'
    },
    warnings: {
      title: 'Weather & Official Flood Warnings',
      subtitle: 'Integrated warnings from the India Meteorological Department (IMD) and Central Water Commission (CWC).',
      filterAll: 'All Alerts',
      filterRed: 'Red Alerts (Severe Action)',
      filterOrange: 'Orange Alerts (Be Prepared)',
      filterYellow: 'Yellow Alerts (Be Aware)',
      sourcePrefix: 'Official Source:',
      updatedAtPrefix: 'Issued / Updated:',
      threatPeriodPrefix: 'Expected Threat Window:',
      basinPrefix: 'River Basin / Waterway:',
      uncertaintyPrefix: 'Limitations & Uncertainty:',
      officialDisclaimer: 'Disclaimer: These warnings represent official regional bulletins. FieldShield AI does not fabricate forecasts. Always obey instructions from local district administration and disaster management authorities.'
    },
    floodMap: {
      title: 'Geospatial Flood Map & Radar Observations',
      subtitle: 'Inspect satellite radar (Sentinel-1 C-SAR) flood extents, river gauges, and calculate your exact farm overlap percentage.',
      layerSatellite: 'Satellite Imagery',
      layerStreet: 'Topographic / Street Map',
      layerFloodRadar: 'Observed Flood Extent (Radar)',
      layerFarmBoundary: 'My Farm Boundary',
      layerRiverGauges: 'CWC River Gauge Stations',
      legendTitle: 'Map Legend & Classifications',
      legendFarm: 'Your Registered Farm Boundary',
      legendObservedFlood: 'Observed Floodwater Extent (Sentinel-1 Radar)',
      legendHighRisk: 'Riverine High-Risk Floodplain',
      overlapSummary: 'Farm Overlap Calculation',
      runAnalysis: 'Calculate Overlap Percentage',
      analyzingText: 'Calculating geodesic polygon intersection...',
      overlapResultTitle: 'Geospatial Exposure Result'
    },
    planner: {
      title: 'Before-Flood Crop Protection Planner',
      subtitle: 'Personalized agronomic checklist based on your crop type and current growth stage.',
      cropStageHeader: 'Active Field Configuration',
      checklistHeader: 'Priority Action Checklist',
      markCompleted: 'Mark Done',
      completedStatus: 'Completed',
      disclaimer: 'Note: Completing these checklist items significantly minimizes losses of seeds, tools, and produce, but cannot guarantee protection against catastrophic inundation.',
      safetyCaution: 'CRITICAL SAFETY RULE: Never enter rising floodwaters or flooded drainage ditches to clear debris. Always prioritize personal safety.'
    },
    safety: {
      title: 'During-Flood Safety Instructions',
      subtitle: 'Essential survival protocols and verified emergency contact helplines for Indian agricultural communities.',
      emergencyHotlineHeader: 'Emergency Helplines (24x7 Toll-Free)',
      rule1Title: '1. Human Life Over Crops & Equipment',
      rule1Desc: 'Do NOT venture into flooded fields or swelling nullahs to save tractors, motors, cattle, or standing crops. Water depths and unseen currents can sweep away adult humans and tractors in seconds.',
      rule2Title: '2. Evacuate Immediately When Instructed',
      rule2Desc: 'When local administration, panchayat, or police issue evacuation orders, move immediately along designated elevated roads. Take emergency supplies, drinking water, identification, and essential medicines.',
      rule3Title: '3. Extreme Electrical & Wire Hazards',
      rule3Desc: 'Stay far away from downed electric poles, sagging irrigation power cables, and submerged tubewell transformer switches. Electric currents can travel long distances through standing floodwater.',
      rule4Title: '4. Livestock & Animal Safety',
      rule4Desc: 'Untie tethered cattle, buffaloes, and livestock so they can move to higher ground on their own if you are forced to evacuate. Never leave animals tied in low-lying sheds.',
      rule5Title: '5. Safe Drinking Water & Snakebite Caution',
      rule5Desc: 'Floodwaters dislodge venomous snakes (kraits, cobras, vipers) seeking dry high ground. Wear boots, carry a bamboo stick and flashlight. Never drink untreated floodwater; use boiled or chlorinated water.',
      offlineNotice: 'This safety guide is cached locally in your browser and remains fully readable even when mobile network connection is interrupted.'
    },
    recovery: {
      title: 'Post-Flood Agricultural Recovery',
      subtitle: 'Agronomically sound, reviewed recovery protocols to rehabilitate submerged fields and minimize secondary plant diseases.',
      stepSafeEntry: '1. Safe Re-Entry Assessment',
      stepSafeEntryDesc: 'Inspect fields only after floodwater has completely receded and authorities declare the area safe. Check for sinkholes, hidden debris, and displaced wildlife.',
      stepDrainage: '2. Stagnant Water Drainage',
      stepDrainageDesc: 'Dig shallow outflow trenches to remove standing water quickly. Standing water for more than 48–72 hours causes root asphyxiation and death in non-paddy crops.',
      stepSilt: '3. Silt & Sediment Management',
      stepSiltDesc: 'Heavy river silt crusts the topsoil, choking oxygen. Gently wash silt deposits off leaves with clean water if accessible, or aerate surface crust once soil dries slightly to prevent root rotting.',
      stepNutrition: '4. Cautious Nutrient Replenishment',
      stepNutritionDesc: 'Avoid heavy nitrogen/urea applications immediately after flooding. Stressed roots cannot absorb it. Apply light foliar spray of micronutrients or 1-2% urea solution only after new white roots emerge.',
      stepDisease: '5. Fungal & Bacterial Blight Control',
      stepDiseaseDesc: 'Submerged plants are vulnerable to bacterial leaf blight, sheath rot, and root rot. Consult your local Krishi Vigyan Kendra (KVK) for recommended copper-based fungicides.',
      generateReportCta: 'Prepare Official Farm Damage & Recovery Report'
    },
    photoAssess: {
      title: 'AI Crop Photo Assessment',
      subtitle: 'Upload a clear photograph of flood-stressed crops to identify visible symptoms and receive immediate advisory.',
      uploadInstructions: 'Take a clear photograph of the affected plant leaves, stems, or field. JPG, PNG, or WEBP up to 10MB.',
      chooseFile: 'Select Crop Photograph',
      analyzingPhoto: 'Analyzing image for visible flood stress symptoms...',
      resultsHeader: 'Preliminary Agronomic Visual Assessment',
      symptomsIdentified: 'Observed Plant Symptoms',
      suspectedCondition: 'Potential Stress / Disease Factor',
      immediateAdvice: 'Recommended Immediate Actions',
      disclaimerText: 'Transparency Notice: This visual assessment provides preliminary guidance based on visible symptoms and does not replace an in-person inspection by a certified agricultural extension officer or Krishi Vigyan Kendra scientist.',
      samplePhotos: 'Or test with realistic reference flood symptom scenarios:'
    },
    reports: {
      title: 'Official Farm Flood Reports',
      subtitle: 'Generate structured farm vulnerability, flood exposure, and loss documentation suitable for Krishi Vigyan Kendra (KVK) and PMFBY crop insurance claims.',
      farmSummary: 'Farm & Crop Baseline',
      floodExposure: 'Satellite-Observed Overlap & Exposure',
      printReport: 'Print / Save as PDF',
      downloadReport: 'Export Official Summary',
      officialSubmissionNote: 'This report documents farm boundaries, official flood bulletins, and Sentinel-1 radar overlap calculations for submission to agricultural officers.'
    },
    settings: {
      title: 'Language & Alert Preferences',
      subtitle: 'Customize your regional language, configure emergency SMS alerts, and set your state land measurement unit.',
      languageHeader: 'Select Application Language',
      smsHeader: 'Emergency SMS Flood Alerts Registration',
      smsPhoneLabel: 'Mobile Number for SMS Notifications',
      sendOtp: 'Send Verification OTP',
      enterOtp: 'Enter 6-Digit OTP',
      verifyOtp: 'Verify & Authorize Alerts',
      smsConsentCheck: 'I explicitly authorize KrishiRakshak AI to send emergency SMS flood alerts to this verified number. (No promotional or spam messages).',
      savePreferences: 'Save Preferences',
      optOutSms: 'Opt Out / Stop SMS Alerts',
      testSmsButton: 'Send Safe Test Alert (Simulation Mode)',
      testSmsNote: 'Safe Testing Mode: Demonstrates the exact SMS format farmers receive during verified official flood events without incurring live carrier charges.'
    },
    dataSources: {
      title: 'Data Sources, Methodology & Limitations',
      subtitle: 'Complete transparency regarding integrated government and satellite datasets, update intervals, and uncertainty boundaries.',
      transparencyNote: 'Core Integrity Principle: KrishiRakshak AI never fabricates weather, flood forecasts, or satellite radar extents. Every indicator is attributed to its originating authority.',
      sourcesListHeader: 'Integrated Primary Data Sources',
      limitationsHeader: 'Technical Limitations & Uncertainty Considerations'
    },
    common: {
      safeFallbackNotice: 'Reliable fallback mode active. Displaying documented official records.',
      loading: 'Loading data...',
      error: 'An error occurred. Please refresh.',
      source: 'Source',
      lastUpdated: 'Last Updated',
      severe: 'Severe',
      high: 'High',
      moderate: 'Moderate',
      low: 'Low',
      none: 'None / Minimal',
      disclaimer: 'Disclaimer'
    }
  },

  hi: {
    appName: 'कृषिरक्षक AI',
    appSlogan: 'बाढ़ को पहचानें। फसल को बचाएं। नुकसान को घटाएं।',
    primaryQuestion: 'मेरे खेत के पास क्या हो रहा है, इसका मेरी फसलों पर क्या असर पड़ सकता है, और मुझे अभी क्या करना चाहिए?',
    nav: {
      home: 'मुख्य पृष्ठ',
      register: 'खेत पंजीकृत करें',
      dashboard: 'किसान डैशबोर्ड',
      warnings: 'मौसम व बाढ़ चेतावनी',
      floodMap: 'बाढ़ मानचित्र व रडार',
      planner: 'फसल सुरक्षा योजनाकार',
      safety: 'बाढ़ के दौरान सुरक्षा',
      recovery: 'बाढ़ उपरांत फसल सुधार',
      photoAssess: 'फसल फोटो जांच (AI)',
      reports: 'खेत रिपोर्ट व दस्तावेज़',
      settings: 'भाषा व अलर्ट सेटिंग्स',
      dataSources: 'डेटा स्रोत व सीमाएं',
      emergencyCall: 'आपातकालीन हेल्पलाइन (1078/1070)'
    },
    home: {
      heroTitle: 'कृषि बाढ़ तैयारी एवं समय पर फसल सुरक्षा प्रणाली',
      heroSubtitle: 'भारतीय किसानों के लिए विशेष रूप से निर्मित। आधिकारिक बाढ़ चेतावनी, सेंटिनल-1 रडार उपग्रह अवलोकन, क्षेत्रीय भूमि इकाइयां और बाढ़ से पहले, दौरान व बाद में वैज्ञानिक कृषि मार्गदर्शन।',
      registerCta: 'अपना खेत पंजीकृत करें',
      viewMapCta: 'बाढ़ मानचित्र देखें',
      checkWarningsCta: 'आधिकारिक चेतावनियां देखें',
      statusBanner: 'सक्रिय बाढ़ निगरानी: सतलुज, ब्यास, घग्गर, गंगा, कोसी और ब्रह्मपुत्र बेसिन',
      statsFarms: 'पंजीकृत निगरानी क्षेत्र',
      statsFloodMonitored: 'नदी जलस्तर बेसिन',
      statsAlertsDelivered: 'आपदा हेल्पलाइन लिंक',
      statsStatesCovered: 'कृषि राज्य समर्थित',
      howItWorksTitle: 'कृषिरक्षक AI आपकी फसल की सुरक्षा कैसे करता है',
      howItWorksSubtitle: 'जटिल तकनीकी डैशबोर्ड के बजाय सरल, तुरंत अमल में लाने योग्य सलाह।',
      step1Title: '1. अपने खेत की सीमा चिह्नित करें',
      step1Desc: 'अपना गांव चुनें, उपग्रह नक्शे पर अपने खेत की सीमा खींचें, और बीघा, कनाल, कट्ठा, गुंठा या एकड़ जैसी अपनी परिचित इकाई में रकबा दर्ज करें।',
      step2Title: '2. आधिकारिक चेतावनियां पाएं',
      step2Desc: 'भारत मौसम विज्ञान विभाग (IMD) और केंद्रीय जल आयोग (CWC) से अपने जिले और नदी बेसिन के लिए सटीक व आधिकारिक अलर्ट प्राप्त करें।',
      step3Title: '3. बाढ़ आने से पहले कदम उठाएं',
      step3Desc: 'अपनी फसल और वृद्धि चरण के अनुसार व्यावहारिक चेकलिस्ट का पालन करें: जल निकासी नाले खोलें, बीज, खाद व मोटर सुरक्षित ऊंचे स्थान पर रखें।',
      step4Title: '4. सुरक्षित निरीक्षण व फसल सुधार',
      step4Desc: 'बाढ़ के बाद रडार उपग्रह से खेत जलभराव प्रतिशत जानें, प्रभावित फसल की फोटो से लक्षण पहचानें, और कृषि विज्ञान केंद्र व फसल बीमा के लिए अधिकृत रिपोर्ट तैयार करें।',
      corePrinciplesTitle: 'सत्यनिष्ठा और सुरक्षा के हमारे सिद्धांत',
      corePrinciplesSubtitle: 'कभी भी झूठा डेटा नहीं। आधिकारिक जानकारी और पूर्ण पारदर्शिता पर आधारित।',
      safetyFirstTitle: 'फसल से पहले मानव जीवन की सुरक्षा',
      safetyFirstDesc: 'खेत में खड़ी फसल या मोटर बचाने के लिए कभी भी तेज बहाव वाले बाढ़ के पानी में न उतरें। जान हमेशा पहले है।',
      noFabricationTitle: 'सत्यापित स्रोत और अनिश्चितता की सीमाएं',
      noFabricationDesc: 'प्रत्येक चेतावनी और उपग्रह नक्शे के साथ अवलोकन की तारीख, डेटा स्रोत और तकनीकी सीमाएं स्पष्ट रूप से दिखाई जाती हैं।',
      regionalUnitsTitle: 'राज्यानुसार सटीक क्षेत्रीय भूमि इकाइयां',
      regionalUnitsDesc: 'बीघा, कट्ठा, कनाल, मरला और गुंठा का मान अलग-अलग राज्यों में भिन्न होता है। हम राज्य राजस्व विभाग के सत्यापित मानकों का उपयोग करते हैं।'
    },
    register: {
      title: 'अपना खेत पंजीकृत करें',
      subtitle: 'सटीक बाढ़ अलर्ट, उपग्रह रडार फैलाव और फसल सुरक्षा मार्गदर्शन पाने के लिए अपने खेत का विवरण भरें।',
      stepBasic: '1. किसान की जानकारी',
      stepLocation: '2. गांव व स्थान',
      stepBoundary: '3. खेत का नक्शा व सीमा',
      stepCrop: '4. फसल व क्षेत्रीय भूमि इकाई',
      stepConsent: '5. एसएमएस सहमति व समीक्षा',
      farmerNameLabel: 'किसान का नाम',
      farmerNamePlaceholder: 'उदा. राम कुमार / गुरप्रीत सिंह',
      phoneLabel: 'मोबाइल नंबर (एसएमएस चेतावनी हेतु)',
      phonePlaceholder: 'उदा. 9876543210 (10 अंकों का मोबाइल नंबर)',
      phoneHelp: 'आपका फोन नंबर सार्वजनिक नहीं किया जाएगा। केवल सत्यापित बाढ़ चेतावनी के लिए उपयोग होगा।',
      stateLabel: 'राज्य',
      districtLabel: 'जिला',
      villageLabel: 'गांव / तहसील / खेत का पता',
      villagePlaceholder: 'उदा. गांव बछवारा, तहसील तेघड़ा',
      mapInstructions: 'नक्शे पर क्लिक करके अपने खेत के कोनों को चिह्नित करें। कम से कम 3 बिंदु जोड़कर बहुभुज (Polygon) बनाएं।',
      drawInstruction: 'खेत के कोने चिह्नित करने के लिए क्लिक करें। बंद करने के लिए पहले बिंदु पर क्लिक करें।',
      clearBoundary: 'बिंदु हटाएं',
      confirmBoundary: 'खेत की सीमा की पुष्टि करें',
      calculatedAreaNotice: 'जियोडेसिक उपग्रह गणना द्वारा मापा गया सटीक क्षेत्रफल:',
      cropTypeLabel: 'मुख्य फसल',
      cropVarietyLabel: 'फसल की किस्म (वैकल्पिक)',
      plantingDateLabel: 'बुवाई की तारीख (यदि ज्ञात हो)',
      growthStageLabel: 'फसल की वर्तमान अवस्था',
      preferredUnitLabel: 'आपकी क्षेत्रीय भूमि इकाई',
      enteredAreaLabel: 'चुनी गई इकाई में खेत का रकबा',
      calculatedEquiv: 'वर्ग मीटर और एकड़ में परिवर्तित मान:',
      smsConsentTitle: 'बाढ़ व मौसम एसएमएस अलर्ट हेतु स्पष्ट सहमति',
      smsConsentText: 'मैं स्पष्ट रूप से कृषिरक्षक AI को मेरे मोबाइल पर आपातकालीन बाढ़, मौसम व फसल सुरक्षा संदेश भेजने की अनुमति देता/देती हूँ। मैं किसी भी समय इसे बंद कर सकता/सकती हूँ।',
      submitButton: 'खेत पंजीकृत करें और निगरानी शुरू करें',
      validationErrors: 'कृपया सभी आवश्यक विवरण भरें और नक्शे पर अपने खेत की सीमा की पुष्टि करें।',
      successMessage: 'खेत सफलतापूर्वक पंजीकृत हो गया! अब आपकी फसल की सक्रिय निगरानी शुरू है।'
    },
    dashboard: {
      title: 'खेत बाढ़ सुरक्षा डैशबोर्ड',
      subtitle: 'आपके खेत के लिए मौसम, नदी जलस्तर और फसल सुरक्षा की व्यावहारिक जानकारी।',
      selectFarm: 'खेत चुनें:',
      currentCrop: 'फसल व अवस्था',
      farmLocation: 'स्थान',
      areaRegistered: 'पंजीकृत रकबा',
      latestWarningsTitle: 'नवीनतम आधिकारिक मौसम व बाढ़ चेतावनी',
      noActiveWarnings: 'वर्तमान में इस जिले के लिए कोई गंभीर बाढ़ चेतावनी नहीं है। मौसम सामान्य सीमा में है।',
      weatherTitle: 'खेत के पास मौसम व वर्षा पूर्वानुमान (IMD)',
      floodRiskTitle: 'बाढ़ जोखिम आकलन व नदी बेसिन स्थिति',
      recommendedActionsTitle: 'तुरंत करने योग्य प्राथमिकता कार्य',
      satelliteObservationsTitle: 'नवीनतम उपग्रह रडार अवलोकन (Sentinel-1)',
      estimatedOverlapTitle: 'खेत पर अनुमानित जलभराव विस्तार',
      cropGuidanceTitle: 'फसल सुरक्षा व सुधार मार्गदर्शन',
      recentAlertsTitle: 'हालिया अलर्ट व संदेश लॉग',
      viewDetails: 'विस्तृत रिपोर्ट देखें',
      takeAction: 'सुरक्षा चेकलिस्ट खोलें'
    },
    warnings: {
      title: 'मौसम एवं आधिकारिक बाढ़ चेतावनियां',
      subtitle: 'भारत मौसम विज्ञान विभाग (IMD) और केंद्रीय जल आयोग (CWC) द्वारा जारी वास्तविक बुलेटिन।',
      filterAll: 'सभी अलर्ट',
      filterRed: 'लाल चेतावनी (अत्यंत सतर्कता व कार्रवाई)',
      filterOrange: 'नारंगी चेतावनी (तैयारी रखें)',
      filterYellow: 'पीली चेतावनी (निगरानी रखें)',
      sourcePrefix: 'आधिकारिक स्रोत:',
      updatedAtPrefix: 'जारी / अपडेट समय:',
      threatPeriodPrefix: 'अनुमानित खतरा अवधि:',
      basinPrefix: 'नदी बेसिन / जलमार्ग:',
      uncertaintyPrefix: 'सीमाएं व अनिश्चितता:',
      officialDisclaimer: 'अस्वीकरण: ये चेतावनियां आधिकारिक क्षेत्रीय बुलेटिनों पर आधारित हैं। कृषिरक्षक AI मनगढ़ंत आंकड़े नहीं बनाता। हमेशा स्थानीय प्रशासन के निर्देशों का पालन करें।'
    },
    floodMap: {
      title: 'भू-स्थानिक बाढ़ मानचित्र व रडार अवलोकन',
      subtitle: 'सेंटिनल-1 सी-सार रडार उपग्रह द्वारा देखे गए बाढ़ जलभराव और अपने खेत की सटीक सीमा का मिलान करें।',
      layerSatellite: 'उपग्रह छवि',
      layerStreet: 'नक्शा / धरातल',
      layerFloodRadar: 'अवलोकित बाढ़ विस्तार (रडार)',
      layerFarmBoundary: 'मेरे खेत की सीमा',
      layerRiverGauges: 'CWC नदी गेज स्टेशन',
      legendTitle: 'मानचित्र संकेत व श्रेणियां',
      legendFarm: 'आपके खेत की पंजीकृत सीमा',
      legendObservedFlood: 'अवलोकित बाढ़ जल (Sentinel-1 रडार)',
      legendHighRisk: 'नदी तटीय उच्च जोखिम क्षेत्र',
      overlapSummary: 'खेत जलभराव गणना',
      runAnalysis: 'जलभराव प्रतिशत की गणना करें',
      analyzingText: 'जियोडेसिक बहुभुज मिलान की गणना जारी है...',
      overlapResultTitle: 'भू-स्थानिक प्रभाव परिणाम'
    },
    planner: {
      title: 'बाढ़-पूर्व फसल सुरक्षा योजनाकार',
      subtitle: 'आपकी फसल और वर्तमान अवस्था के अनुसार तैयार की गई व्यावहारिक कृषि चेकलिस्ट।',
      cropStageHeader: 'खेत की वर्तमान स्थिति',
      checklistHeader: 'प्राथमिकता कार्य सूची',
      markCompleted: 'पूर्ण किया',
      completedStatus: 'पूर्ण',
      disclaimer: 'नोट: इन कार्यों से बीज, उपकरण और उपज का नुकसान काफी कम हो सकता है, परंतु भयंकर बाढ़ में पूरी सुरक्षा की गारंटी नहीं दी जा सकती।',
      safetyCaution: 'महत्वपूर्ण सुरक्षा नियम: पानी का बहाव तेज होने पर नाली खोलने या फसल बचाने के लिए कभी भी पानी में न जाएं। पहले अपनी जान बचाएं।'
    },
    safety: {
      title: 'बाढ़ के दौरान सुरक्षा निर्देश',
      subtitle: 'बाढ़ के समय किसानों और ग्रामीण परिवारों के लिए अनिवार्य जीवन-रक्षक नियम व आधिकारिक हेल्पलाइन।',
      emergencyHotlineHeader: 'आपातकालीन हेल्पलाइन (24 घंटे निःशुल्क)',
      rule1Title: '1. फसल व मशीनरी से पहले अपनी जान बचाएं',
      rule1Desc: 'खेत में पानी भरने पर ट्रैक्टर, ट्यूबवेल मोटर या फसल बचाने के लिए पानी में न जाएं। तेज धारा और गहरे गड्ढे पल भर में इंसान और ट्रैक्टर को बहा ले जा सकते हैं।',
      rule2Title: '2. निकासी आदेश का तुरंत पालन करें',
      rule2Desc: 'जब प्रशासन या पंचायत सुरक्षित स्थान पर जाने को कहे, तो बिना देरी किए ऊंचे रास्तों से सुरक्षित स्थान पर जाएं। जरूरी दवाइयां, पहचान पत्र और पीने का पानी साथ रखें।',
      rule3Title: '3. बिजली के तारों और खंभों से दूर रहें',
      rule3Desc: 'टूटे बिजली के खंभों, लटके तारों और जलमग्न ट्रांसफार्मरों से बिल्कुल दूर रहें। पानी में करंट बहुत दूर तक फैल सकता है।',
      rule4Title: '4. पशुधन की सुरक्षा',
      rule4Desc: 'बाढ़ का पानी बढ़ने पर मवेशियों को खूंटे से खोल दें ताकि वे खुद ऊंचे स्थान पर जा सकें। उन्हें कभी भी बंधा हुआ न छोड़ें।',
      rule5Title: '5. सांपों से सावधान रहें और सुरक्षित पानी पिएं',
      rule5Desc: 'बाढ़ में जहरीले सांप सूखे स्थानों की तलाश में आते हैं। हमेशा जूते पहनें और रात में लाठी व टॉर्च रखें। बाढ़ का पानी कभी न पिएं, केवल उबला हुआ पानी पिएं।',
      offlineNotice: 'यह सुरक्षा निर्देश आपके ब्राउज़र में सुरक्षित हैं और इंटरनेट न होने पर भी पढ़े जा सकते हैं।'
    },
    recovery: {
      title: 'बाढ़ उपरांत खेत व फसल सुधार',
      subtitle: 'जलभराव के बाद खेत से पानी निकालने, गाद हटाने और फसलों को फफूंद से बचाने की वैज्ञानिक सलाह।',
      stepSafeEntry: '1. सुरक्षित पुनः प्रवेश जांच',
      stepSafeEntryDesc: 'खेत में तभी जाएं जब पानी पूरी तरह उतर जाए और प्रशासन क्षेत्र को सुरक्षित घोषित करे। जमीन में धंसाव या मलबे की जांच करें।',
      stepDrainage: '2. रुके हुए पानी की तत्काल निकासी',
      stepDrainageDesc: 'उथली नालियां बनाकर रुका हुआ पानी तुरंत बाहर निकालें। 48-72 घंटे से अधिक पानी खड़ा रहने से जड़ें सड़ने लगती हैं।',
      stepSilt: '3. गाद (Silt) प्रबंधन',
      stepSiltDesc: 'यदि संभव हो तो पौधों की पत्तियों पर जमी गाद को साफ पानी से धोएं, जिससे पौधे सांस ले सकें और प्रकाश संश्लेषण कर सकें।',
      stepNutrition: '4. सोच-समझकर खाद का प्रयोग',
      stepNutritionDesc: 'बाढ़ के तुरंत बाद जमीन में भारी यूरिया न डालें क्योंकि जड़ें कमजोर होती हैं। नई सफेद जड़ें निकलने पर ही 1-2% यूरिया का छिड़काव करें।',
      stepDisease: '5. रोग व फफूंद से बचाव',
      stepDiseaseDesc: 'जलभराव के बाद जीवाणु झुलसा और जड़ सड़न की संभावना बढ़ जाती है। उपयुक्त फफूंदनाशक हेतु नजदीकी कृषि विज्ञान केंद्र से संपर्क करें।',
      generateReportCta: 'आधिकारिक खेत क्षति व सुधार रिपोर्ट तैयार करें'
    },
    photoAssess: {
      title: 'फसल फोटो जांच (AI)',
      subtitle: 'बाढ़ प्रभावित फसल की स्पष्ट फोटो अपलोड करें और प्राथमिक लक्षण विश्लेषण व सलाह पाएं।',
      uploadInstructions: 'पौधे की पत्तियों या तने की साफ फोटो लें। JPG, PNG या WEBP फाइल, अधिकतम 10MB तक।',
      chooseFile: 'फसल की फोटो चुनें',
      analyzingPhoto: 'फोटो में बाढ़ तनाव के लक्षणों की जांच की जा रही है...',
      resultsHeader: 'प्राथमिक कृषि लक्षण रिपोर्ट',
      symptomsIdentified: 'दिखाई देने वाले लक्षण',
      suspectedCondition: 'संभावित तनाव अथवा रोग कारक',
      immediateAdvice: 'तुरंत करने योग्य वैज्ञानिक उपाय',
      disclaimerText: 'पारदर्शिता सूचना: यह फोटो विश्लेषण प्राथमिक मार्गदर्शन है। यह किसी प्रमाणित कृषि वैज्ञानिक या कृषि विज्ञान केंद्र के प्रत्यक्ष निरीक्षण का विकल्प नहीं है।',
      samplePhotos: 'या संदर्भ बाढ़ लक्षण उदाहरणों से जांचें:'
    },
    reports: {
      title: 'आधिकारिक खेत बाढ़ रिपोर्ट',
      subtitle: 'कृषि विज्ञान केंद्र (KVK) और प्रधानमंत्री फसल बीमा योजना (PMFBY) दावे हेतु अधिकृत विवरण व उपग्रह साक्ष्य पत्र।',
      farmSummary: 'खेत व फसल का मूल विवरण',
      floodExposure: 'उपग्रह रडार से अवलोकित जलभराव साक्ष्य',
      printReport: 'प्रिंट करें / पीडीएफ सेव करें',
      downloadReport: 'आधिकारिक सारांश डाउनलोड करें',
      officialSubmissionNote: 'यह रिपोर्ट खेत की सीमा, आधिकारिक मौसम बुलेटिन और सेंटिनल उपग्रह रडार गणनाओं का अधिकृत संकलन है।'
    },
    settings: {
      title: 'भाषा एवं अलर्ट प्राथमिकताएं',
      subtitle: 'अपनी भाषा चुनें, आपातकालीन एसएमएस अलर्ट सक्रिय करें, और अपनी राज्य भूमि इकाई निर्धारित करें।',
      languageHeader: 'वेबसाइट की भाषा चुनें',
      smsHeader: 'आपातकालीन एसएमएस बाढ़ अलर्ट पंजीकरण',
      smsPhoneLabel: 'अलर्ट प्राप्त करने हेतु मोबाइल नंबर',
      sendOtp: 'सत्यापन OTP भेजें',
      enterOtp: '6 अंकों का OTP दर्ज करें',
      verifyOtp: 'सत्यापित करें व अलर्ट सक्रिय करें',
      smsConsentCheck: 'मैं स्पष्ट रूप से इस नंबर पर आपातकालीन बाढ़ अलर्ट संदेश प्राप्त करने की सहमति देता/देती हूँ। (कोई विज्ञापन या स्पैम नहीं)।',
      savePreferences: 'प्राथमिकताएं सहेजें',
      optOutSms: 'अलर्ट सेवा बंद करें (Opt-Out)',
      testSmsButton: 'सुरक्षित टेस्ट संदेश भेजें (सिमुलेशन)',
      testSmsNote: 'सुरक्षित परीक्षण मोड: किसानों को यह दिखाता है कि वास्तविक बाढ़ के समय उन्हें किस प्रकार का आधिकारिक एसएमएस संदेश मिलेगा।'
    },
    dataSources: {
      title: 'डेटा स्रोत, कार्यप्रणाली एवं तकनीकी सीमाएं',
      subtitle: 'सरकारी एजेंसियों और उपग्रह डेटासेट, अपडेट समय और अनिश्चितता के सिद्धांतों की पूर्ण पारदर्शिता।',
      transparencyNote: 'मूल सत्यनिष्ठा सिद्धांत: कृषिरक्षक AI कभी भी मौसम या बाढ़ का झूठा डेटा नहीं बनाता। प्रत्येक जानकारी उसके आधिकारिक स्रोत से जुड़ी होती है।',
      sourcesListHeader: 'एकीकृत प्राथमिक डेटा स्रोत',
      limitationsHeader: 'तकनीकी सीमाएं एवं अनिश्चितता संबंधी विचार'
    },
    common: {
      safeFallbackNotice: 'सत्यापित सुरक्षित मोड सक्रिय। आधिकारिक रिकॉर्ड प्रदर्शित किए जा रहे हैं।',
      loading: 'डेटा लोड हो रहा है...',
      error: 'त्रुटि हुई। कृपया पुनः प्रयास करें।',
      source: 'स्रोत',
      lastUpdated: 'अंतिम अपडेट',
      severe: 'अत्यंत गंभीर',
      high: 'गंभीर',
      moderate: 'मध्यम',
      low: 'कम',
      none: 'न्यूनतम / शून्य',
      disclaimer: 'अस्वीकरण'
    }
  },

  pa: {
    appName: 'ਕ੍ਰਿਸ਼ੀ ਰੱਖਿਅਕ AI',
    appSlogan: 'ਹੜ੍ਹ ਨੂੰ ਪਛਾਣੋ। ਫ਼ਸਲ ਨੂੰ ਬਚਾਓ। ਨੁਕਸਾਨ ਨੂੰ ਘਟਾਓ।',
    primaryQuestion: 'ਮੇਰੇ ਖੇਤ ਦੇ ਨੇੜੇ ਕੀ ਹੋ ਰਿਹਾ ਹੈ, ਇਸ ਦਾ ਮੇਰੀਆਂ ਫ਼ਸਲਾਂ ਉੱਤੇ ਕੀ ਅਸਰ ਪੈ ਸਕਦਾ ਹੈ, ਅਤੇ ਮੈਨੂੰ ਹੁਣ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?',
    nav: {
      home: 'ਮੁੱਖ ਸਫ਼ਾ',
      register: 'ਖੇਤ ਰਜਿਸਟਰ ਕਰੋ',
      dashboard: 'ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ',
      warnings: 'ਮੌਸਮ ਤੇ ਹੜ੍ਹ ਚਿਤਾਵਨੀਆਂ',
      floodMap: 'ਹੜ੍ਹ ਨਕਸ਼ਾ ਤੇ ਰਡਾਰ',
      planner: 'ਫ਼ਸਲ ਸੁਰੱਖਿਆ ਪਲਾਨਰ',
      safety: 'ਹੜ੍ਹਾਂ ਦੌਰਾਨ ਸੁਰੱਖਿਆ',
      recovery: 'ਹੜ੍ਹ ਉਪਰੰਤ ਫ਼ਸਲ ਸੰਭਾਲ',
      photoAssess: 'ਫ਼ਸਲ ਫ਼ੋਟੋ ਜਾਂਚ (AI)',
      reports: 'ਖੇਤ ਰਿਪੋਰਟਾਂ',
      settings: 'ਭਾਸ਼ਾ ਤੇ ਅਲਰਟ ਸੈਟਿੰਗਾਂ',
      dataSources: 'ਡਾਟਾ ਸਰੋਤ ਤੇ ਸੀਮਾਵਾਂ',
      emergencyCall: 'ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨ (1078/1070)'
    },
    home: {
      heroTitle: 'ਖੇਤੀਬਾੜੀ ਹੜ੍ਹ ਤਿਆਰੀ ਅਤੇ ਸਮੇਂ ਸਿਰ ਫ਼ਸਲ ਬਚਾਅ ਪ੍ਰਣਾਲੀ',
      heroSubtitle: 'ਵਿਸ਼ੇਸ਼ ਤੌਰ ਤੇ ਪੰਜਾਬ ਅਤੇ ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਤਿਆਰ। ਅਧਿਕਾਰਤ ਹੜ੍ਹ ਚਿਤਾਵਨੀਆਂ, ਸੈਂਟੀਨਲ-1 ਰਡਾਰ ਉਪਗ੍ਰਹਿ ਜਾਣਕਾਰੀ, ਕਨਾਲ-ਮਰਲਾ-ਕਿੱਲਾ ਪੈਮਾਇਸ਼ਾਂ ਅਤੇ ਫ਼ਸਲ ਬਚਾਅ ਲਈ ਵਿਗਿਆਨਕ ਸਲਾਹ।',
      registerCta: 'ਆਪਣਾ ਖੇਤ ਰਜਿਸਟਰ ਕਰੋ',
      viewMapCta: 'ਹੜ੍ਹ ਨਕਸ਼ਾ ਖੋਲ੍ਹੋ',
      checkWarningsCta: 'ਸਰਕਾਰੀ ਚਿਤਾਵਨੀਆਂ ਦੇਖੋ',
      statusBanner: 'ਸਰਗਰਮ ਹੜ੍ਹ ਨਿਗਰਾਨੀ: ਸਤਲੁਜ, ਬਿਆਸ, ਘੱਗਰ, ਰਾਵੀ ਅਤੇ ਗੰਗਾ ਬੇਸਿਨ',
      statsFarms: 'ਨਿਗਰਾਨੀ ਅਧੀਨ ਖੇਤ',
      statsFloodMonitored: 'ਦਰਿਆਈ ਪਾਣੀ ਪੱਧਰ ਬੇਸਿਨ',
      statsAlertsDelivered: 'ਆਫ਼ਤ ਹੈਲਪਲਾਈਨਾਂ ਜੁੜੀਆਂ',
      statsStatesCovered: 'ਖੇਤੀਬਾੜੀ ਸੂਬੇ',
      howItWorksTitle: 'ਕ੍ਰਿਸ਼ੀ ਰੱਖਿਅਕ AI ਤੁਹਾਡੀ ਫ਼ਸਲ ਦੀ ਰੱਖਿਆ ਕਿਵੇਂ ਕਰਦਾ ਹੈ',
      howItWorksSubtitle: 'ਔਖੇ ਤਕਨੀਕੀ ਡੈਸ਼ਬੋਰਡਾਂ ਦੀ ਥਾਂ ਸੌਖੀ, ਤੁਰੰਤ ਅਮਲ ਕਰਨ ਯੋਗ ਸਲਾਹ।',
      step1Title: '1. ਖੇਤ ਦੀ ਨਿਸ਼ਾਨਦੇਹੀ ਕਰੋ',
      step1Desc: 'ਆਪਣਾ ਪਿੰਡ ਚੁਣੋ, ਨਕਸ਼ੇ ਉੱਤੇ ਆਪਣੇ ਖੇਤ ਦੀ ਹੱਦਬੰਦੀ ਖਿੱਚੋ ਅਤੇ ਕਿੱਲਾ, ਕਨਾਲ, ਮਰਲਾ ਜਾਂ ਏਕੜ ਵਿੱਚ ਆਪਣਾ ਰਕਬਾ ਦਰਜ ਕਰੋ।',
      step2Title: '2. ਸਰਕਾਰੀ ਚਿਤਾਵਨੀਆਂ ਪ੍ਰਾਪਤ ਕਰੋ',
      step2Desc: 'ਮੌਸਮ ਵਿਭਾਗ (IMD) ਅਤੇ ਕੇਂਦਰੀ ਜਲ ਕਮਿਸ਼ਨ (CWC) ਵੱਲੋਂ ਆਪਣੇ ਜ਼ਿਲ੍ਹੇ ਅਤੇ ਦਰਿਆ ਬੇਸਿਨ ਦੇ ਅਧਿਕਾਰਤ ਅਲਰਟ ਹਾਸਲ ਕਰੋ।',
      step3Title: '3. ਹੜ੍ਹ ਆਉਣ ਤੋਂ ਪਹਿਲਾਂ ਕਦਮ ਚੁੱਕੋ',
      step3Desc: 'ਆਪਣੀ ਫ਼ਸਲ ਅਤੇ ਸਟੇਜ ਅਨੁਸਾਰ ਚੈੱਕਲਿਸਟ ਵੇਖੋ: ਨਿਕਾਸੀ ਨਾਲੀਆਂ ਖੋਲ੍ਹੋ, ਬੀਜ, ਖਾਦ ਅਤੇ ਮੋਟਰਾਂ ਉੱਚੇ ਸੁਰੱਖਿਅਤ ਥਾਂ ਪਹੁੰਚਾਓ।',
      step4Title: '4. ਸੁਰੱਖਿਅਤ ਨਿਰੀਖਣ ਅਤੇ ਫ਼ਸਲ ਬਹਾਲੀ',
      step4Desc: 'ਹੜ੍ਹ ਤੋਂ ਬਾਅਦ ਸੈਟੇਲਾਈਟ ਰਡਾਰ ਤੋਂ ਖੇਤ ਦੇ ਡੁੱਬੇ ਰਕਬੇ ਦਾ ਹਿਸਾਬ ਲਗਾਓ, ਫ਼ਸਲ ਦੀ ਫ਼ੋਟੋ ਰਾਹੀਂ ਬਿਮਾਰੀ ਪਰਖੋ, ਅਤੇ ਖੇਤੀਬਾੜੀ ਅਫ਼ਸਰਾਂ ਤੇ ਬੀਮੇ ਲਈ ਰਿਪੋਰਟ ਤਿਆਰ ਕਰੋ।',
      corePrinciplesTitle: 'ਸਾਡੇ ਅਸੂਲ ਅਤੇ ਕਿਸਾਨ ਸੁਰੱਖਿਆ',
      corePrinciplesSubtitle: 'ਕਦੇ ਵੀ ਝੂਠਾ ਡਾਟਾ ਨਹੀਂ। ਕੇਵਲ ਸਰਕਾਰੀ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਅੰਕੜਿਆਂ ਤੇ ਆਧਾਰਿਤ।',
      safetyFirstTitle: 'ਫ਼ਸਲ ਨਾਲੋਂ ਮਨੁੱਖੀ ਜਾਨ ਪਹਿਲਾਂ',
      safetyFirstDesc: 'ਖੇਤਾਂ ਵਿੱਚ ਖੜ੍ਹੀ ਫ਼ਸਲ ਜਾਂ ਮੋਟਰਾਂ ਬਚਾਉਣ ਲਈ ਕਦੇ ਵੀ ਤੇਜ਼ ਵਗਦੇ ਹੜ੍ਹ ਦੇ ਪਾਣੀ ਵਿੱਚ ਨਾ ਵੜੋ। ਜਾਨ ਸਭ ਤੋਂ ਕੀਮਤੀ ਹੈ।',
      noFabricationTitle: 'ਅਧਿਕਾਰਤ ਸਰੋਤ ਤੇ ਪਾਰਦਰਸ਼ਤਾ',
      noFabricationDesc: 'ਹਰੇਕ ਚਿਤਾਵਨੀ ਅਤੇ ਨਕਸ਼ੇ ਨਾਲ ਨਿਰੀਖਣ ਦੀ ਤਰੀਕ, ਸਰੋਤ ਅਤੇ ਤਕਨੀਕੀ ਸੀਮਾਵਾਂ ਸਪੱਸ਼ਟ ਲਿਖੀਆਂ ਹੁੰਦੀਆਂ ਹਨ।',
      regionalUnitsTitle: 'ਕਨਾਲ, ਮਰਲਾ ਅਤੇ ਕਿੱਲੇ ਦਾ ਸਹੀ ਹਿਸਾਬ',
      regionalUnitsDesc: 'ਪੰਜਾਬ ਲੈਂਡ ਰਿਕਾਰਡ ਮੈਨੂਅਲ ਅਨੁਸਾਰ 1 ਕਿੱਲਾ = 8 ਕਨਾਲ = 160 ਮਰਲੇ ਦੇ ਸਹੀ ਮਾਪਦੰਡ ਅਪਣਾਏ ਗਏ ਹਨ।'
    },
    register: {
      title: 'ਆਪਣਾ ਖੇਤ ਰਜਿਸਟਰ ਕਰੋ',
      subtitle: 'ਸਹੀ ਹੜ੍ਹ ਅਲਰਟ, ਸੈਟੇਲਾਈਟ ਰਡਾਰ ਨਿਗਰਾਨੀ ਅਤੇ ਫ਼ਸਲ ਬਚਾਅ ਸਲਾਹ ਲਈ ਆਪਣੇ ਖੇਤ ਦਾ ਵੇਰਵਾ ਭਰੋ।',
      stepBasic: '1. ਕਿਸਾਨ ਦੀ ਜਾਣਕਾਰੀ',
      stepLocation: '2. ਪਿੰਡ ਅਤੇ ਟਿਕਾਣਾ',
      stepBoundary: '3. ਖੇਤ ਦਾ ਨਕਸ਼ਾ ਤੇ ਹੱਦਬੰਦੀ',
      stepCrop: '4. ਫ਼ਸਲ ਤੇ ਪੈਮਾਇਸ਼ ਇਕਾਈ',
      stepConsent: '5. ਐਸ.ਐਮ.ਐਸ. ਸਹਿਮਤੀ',
      farmerNameLabel: 'ਕਿਸਾਨ ਦਾ ਨਾਮ',
      farmerNamePlaceholder: 'ਜਿਵੇਂ: ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ / ਕੁਲਦੀਪ ਸਿੰਘ',
      phoneLabel: 'ਮੋਬਾਈਲ ਨੰਬਰ (ਐਮਰਜੈਂਸੀ ਅਲਰਟ ਲਈ)',
      phonePlaceholder: 'ਜਿਵੇਂ: 9876543210 (10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ)',
      phoneHelp: 'ਤੁਹਾਡਾ ਫ਼ੋਨ ਨੰਬਰ ਪੂਰੀ ਤਰ੍ਹਾਂ ਗੁਪਤ ਰੱਖਿਆ ਜਾਵੇਗਾ ਅਤੇ ਸਿਰਫ਼ ਹੜ੍ਹ ਚਿਤਾਵਨੀਆਂ ਲਈ ਵਰਤਿਆ ਜਾਵੇਗਾ।',
      stateLabel: 'ਸੂਬਾ',
      districtLabel: 'ਜ਼ਿਲ੍ਹਾ',
      villageLabel: 'ਪਿੰਡ / ਤਹਿਸੀਲ / ਖੇਤ ਦਾ ਪਤਾ',
      villagePlaceholder: 'ਜਿਵੇਂ: ਪਿੰਡ ਹਰੀਕੇ ਪੱਤਣ, ਤਹਿਸੀਲ ਪੱਟੀ',
      mapInstructions: 'ਨਕਸ਼ੇ ਉੱਤੇ ਕਲਿੱਕ ਕਰਕੇ ਆਪਣੇ ਖੇਤ ਦੇ ਕੋਨੇ ਮਿਲਾਓ। ਘੱਟੋ-ਘੱਟ 3 ਬਿੰਦੂ ਜੋੜ ਕੇ ਖੇਤ ਦੀ ਹੱਦਬੰਦੀ ਬਣਾਓ।',
      drawInstruction: 'ਖੇਤ ਦੇ ਕੋਨੇ ਚੁਣਨ ਲਈ ਕਲਿੱਕ ਕਰੋ। ਪੂਰਾ ਕਰਨ ਲਈ ਪਹਿਲੇ ਬਿੰਦੂ ਤੇ ਕਲਿੱਕ ਕਰੋ।',
      clearBoundary: 'ਬਿੰਦੂ ਹਟਾਓ',
      confirmBoundary: 'ਖੇਤ ਦੀ ਹੱਦਬੰਦੀ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
      calculatedAreaNotice: 'ਜਿਓਡੈਸਿਕ ਉਪਗ੍ਰਹਿ ਗਣਨਾ ਅਨੁਸਾਰ ਮਾਪਿਆ ਗਿਆ ਰਕਬਾ:',
      cropTypeLabel: 'ਮੁੱਖ ਫ਼ਸਲ',
      cropVarietyLabel: 'ਫ਼ਸਲ ਦੀ ਕਿਸਮ (ਜੇਕਰ ਪਤਾ ਹੋਵੇ)',
      plantingDateLabel: 'ਬਿਜਾਈ ਦੀ ਮਿਤੀ',
      growthStageLabel: 'ਫ਼ਸਲ ਦਾ ਮੌਜੂਦਾ ਪੜਾਅ',
      preferredUnitLabel: 'ਜ਼ਮੀਨ ਦੀ ਪੈਮਾਇਸ਼ ਇਕਾਈ',
      enteredAreaLabel: 'ਚੁਣੀ ਗਈ ਇਕਾਈ ਵਿੱਚ ਰਕਬਾ',
      calculatedEquiv: 'ਵਰਗ ਮੀਟਰ ਅਤੇ ਏਕੜ ਵਿੱਚ ਬਰਾਬਰ ਮਾਪ:',
      smsConsentTitle: 'ਹੜ੍ਹ ਤੇ ਮੌਸਮ ਐਸ.ਐਮ.ਐਸ. ਅਲਰਟ ਲਈ ਸਪੱਸ਼ਟ ਸਹਿਮਤੀ',
      smsConsentText: 'ਮੈਂ ਕ੍ਰਿਸ਼ੀ ਰੱਖਿਅਕ AI ਨੂੰ ਮੇਰੇ ਮੋਬਾਈਲ ਤੇ ਐਮਰਜੈਂਸੀ ਹੜ੍ਹ ਚਿਤਾਵਨੀਆਂ ਅਤੇ ਫ਼ਸਲ ਸੁਰੱਖਿਆ ਸੁਨੇਹੇ ਭੇਜਣ ਦੀ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ। ਮੈਂ ਕਿਸੇ ਵੀ ਵੇਲੇ ਇਸਨੂੰ ਬੰਦ ਕਰ ਸਕਦਾ/ਸਕਦੀ ਹਾਂ।',
      submitButton: 'ਖੇਤ ਰਜਿਸਟਰ ਕਰੋ ਅਤੇ ਨਿਗਰਾਨੀ ਸ਼ੁਰੂ ਕਰੋ',
      validationErrors: 'ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਲੋੜੀਂਦੇ ਖਾਨੇ ਭਰੋ ਅਤੇ ਨਕਸ਼ੇ ਤੇ ਖੇਤ ਦੀ ਹੱਦਬੰਦੀ ਕਾਇਮ ਕਰੋ।',
      successMessage: 'ਖੇਤ ਸਫ਼ਲਤਾਪੂਰਵਕ ਰਜਿਸਟਰ ਹੋ ਗਿਆ! ਹੁਣ ਤੁਹਾਡੇ ਖੇਤ ਦੀ ਨਿਗਰਾਨੀ ਚਾਲੂ ਹੈ।'
    },
    dashboard: {
      title: 'ਖੇਤ ਹੜ੍ਹ ਸੁਰੱਖਿਆ ਡੈਸ਼ਬੋਰਡ',
      subtitle: 'ਤੁਹਾਡੇ ਖੇਤ ਲਈ ਮੌਸਮ, ਦਰਿਆਈ ਪਾਣੀ ਅਤੇ ਫ਼ਸਲ ਸੁਰੱਖਿਆ ਦੀ ਪੁਖ਼ਤਾ ਜਾਣਕਾਰੀ।',
      selectFarm: 'ਖੇਤ ਚੁਣੋ:',
      currentCrop: 'ਫ਼ਸਲ ਅਤੇ ਪੜਾਅ',
      farmLocation: 'ਟਿਕਾਣਾ',
      areaRegistered: 'ਰਜਿਸਟਰਡ ਰਕਬਾ',
      latestWarningsTitle: 'ਤਾਜ਼ਾ ਸਰਕਾਰੀ ਮੌਸਮ ਤੇ ਹੜ੍ਹ ਚਿਤਾਵਨੀਆਂ',
      noActiveWarnings: 'ਇਸ ਜ਼ਿਲ੍ਹੇ ਲਈ ਫ਼ਿਲਹਾਲ ਕੋਈ ਖ਼ਤਰਨਾਕ ਹੜ੍ਹ ਚਿਤਾਵਨੀ ਨਹੀਂ ਹੈ। ਮੌਸਮ ਆਮ ਵਰਗਾ ਹੈ।',
      weatherTitle: 'ਖੇਤ ਨੇੜੇ ਮੌਸਮ ਤੇ ਮੀਂਹ ਦਾ ਅਨੁਮਾਨ (IMD)',
      floodRiskTitle: 'ਹੜ੍ਹ ਖ਼ਤਰਾ ਮੁਲਾਂਕਣ ਤੇ ਦਰਿਆਈ ਹਾਲਤ',
      recommendedActionsTitle: 'ਤੁਰੰਤ ਕਰਨ ਯੋਗ ਜ਼ਰੂਰੀ ਕੰਮ',
      satelliteObservationsTitle: 'ਤਾਜ਼ਾ ਉਪਗ੍ਰਹਿ ਰਡਾਰ ਨਿਰੀਖਣ (Sentinel-1)',
      estimatedOverlapTitle: 'ਖੇਤ ਉੱਤੇ ਅਨੁਮਾਨਿਤ ਪਾਣੀ ਦਾ ਫੈਲਾਅ',
      cropGuidanceTitle: 'ਫ਼ਸਲ ਸੁਰੱਖਿਆ ਤੇ ਸੰਭਾਲ ਸਲਾਹ',
      recentAlertsTitle: 'ਤਾਜ਼ਾ ਅਲਰਟ ਤੇ ਸੁਨੇਹਾ ਲੌਗ',
      viewDetails: 'ਪੂਰੀ ਰਿਪੋਰਟ ਵੇਖੋ',
      takeAction: 'ਸੁਰੱਖਿਆ ਚੈੱਕਲਿਸਟ ਖੋਲ੍ਹੋ'
    },
    warnings: {
      title: 'ਮੌਸਮ ਅਤੇ ਅਧਿਕਾਰਤ ਹੜ੍ਹ ਚਿਤਾਵਨੀਆਂ',
      subtitle: 'ਭਾਰਤੀ ਮੌਸਮ ਵਿਭਾਗ (IMD) ਅਤੇ ਕੇਂਦਰੀ ਜਲ ਕਮਿਸ਼ਨ (CWC) ਵੱਲੋਂ ਜਾਰੀ ਬੁਲੇਟਿਨ।',
      filterAll: 'ਸਾਰੇ ਅਲਰਟ',
      filterRed: 'ਲਾਲ ਚਿਤਾਵਨੀ (ਭਾਰੀ ਖ਼ਤਰਾ ਤੇ ਤੁਰੰਤ ਕਾਰਵਾਈ)',
      filterOrange: 'ਸੰਤਰੀ ਚਿਤਾਵਨੀ (ਤਿਆਰ ਰਹੋ)',
      filterYellow: 'ਪੀਲੀ ਚਿਤਾਵਨੀ (ਸੁਚੇਤ ਰਹੋ)',
      sourcePrefix: 'ਅਧਿਕਾਰਤ ਸਰੋਤ:',
      updatedAtPrefix: 'ਜਾਰੀ ਕਰਨ ਦਾ ਸਮਾਂ:',
      threatPeriodPrefix: 'ਖ਼ਤਰੇ ਦਾ ਸਮਾਂ:',
      basinPrefix: 'ਦਰਿਆਈ ਬੇਸਿਨ / ਨਾਲਾ:',
      uncertaintyPrefix: 'ਸੀਮਾਵਾਂ ਤੇ ਅਨਿਸ਼ਚਿਤਤਾ:',
      officialDisclaimer: 'ਧਿਆਨ ਦਿਓ: ਇਹ ਚਿਤਾਵਨੀਆਂ ਸਰਕਾਰੀ ਬੁਲੇਟਿਨਾਂ ਤੇ ਆਧਾਰਿਤ ਹਨ। ਕ੍ਰਿਸ਼ੀ ਰੱਖਿਅਕ AI ਕਦੇ ਵੀ ਮਨਘੜਤ ਅੰਕੜੇ ਨਹੀਂ ਬਣਾਉਂਦਾ। ਹਮੇਸ਼ਾ ਪ੍ਰਸ਼ਾਸਨ ਦੇ ਹੁਕਮਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ।'
    },
    floodMap: {
      title: 'ਹੜ੍ਹ ਨਕਸ਼ਾ ਅਤੇ ਰਡਾਰ ਨਿਰੀਖਣ',
      subtitle: 'ਸੈਂਟੀਨਲ-1 ਰਡਾਰ ਉਪਗ੍ਰਹਿ ਵੱਲੋਂ ਦੇਖੇ ਗਏ ਹੜ੍ਹ ਦੇ ਪਾਣੀ ਅਤੇ ਆਪਣੇ ਖੇਤ ਦੀ ਹੱਦਬੰਦੀ ਦਾ ਮਿਲਾਨ ਕਰੋ।',
      layerSatellite: 'ਉਪਗ੍ਰਹਿ ਤਸਵੀਰ',
      layerStreet: 'ਨਕਸ਼ਾ / ਸੜਕਾਂ',
      layerFloodRadar: 'ਰਡਾਰ ਹੜ੍ਹ ਪਾਣੀ ਫੈਲਾਅ',
      layerFarmBoundary: 'ਮੇਰੇ ਖੇਤ ਦੀ ਹੱਦ',
      layerRiverGauges: 'CWC ਦਰਿਆਈ ਗੇਜ ਸਟੇਸ਼ਨ',
      legendTitle: 'ਨਕਸ਼ੇ ਦੇ ਨਿਸ਼ਾਨ ਤੇ ਸ਼੍ਰੇਣੀਆਂ',
      legendFarm: 'ਤੁਹਾਡੇ ਰਜਿਸਟਰਡ ਖੇਤ ਦੀ ਹੱਦ',
      legendObservedFlood: 'ਵੇਖਿਆ ਗਿਆ ਹੜ੍ਹ ਦਾ ਪਾਣੀ (ਸੈਂਟੀਨਲ-1 ਰਡਾਰ)',
      legendHighRisk: 'ਦਰਿਆ ਕੰਢੇ ਦਾ ਉੱਚ ਖ਼ਤਰੇ ਵਾਲਾ ਇਲਾਕਾ',
      overlapSummary: 'ਖੇਤ ਡੁੱਬਣ ਦਾ ਹਿਸਾਬ',
      runAnalysis: 'ਡੁੱਬੇ ਰਕਬੇ ਦੀ ਗਣਨਾ ਕਰੋ',
      analyzingText: 'ਜਿਓਡੈਸਿਕ ਹੱਦਬੰਦੀ ਮਿਲਾਨ ਜਾਰੀ ਹੈ...',
      overlapResultTitle: 'ਜਿਓਸਪੇਸ਼ੀਅਲ ਨਤੀਜਾ'
    },
    planner: {
      title: 'ਹੜ੍ਹ ਤੋਂ ਪਹਿਲਾਂ ਫ਼ਸਲ ਸੁਰੱਖਿਆ ਪਲਾਨਰ',
      subtitle: 'ਤੁਹਾਡੀ ਫ਼ਸਲ ਅਤੇ ਮੌਜੂਦਾ ਪੜਾਅ ਅਨੁਸਾਰ ਤਿਆਰ ਕੀਤੀ ਵਿਗਿਆਨਕ ਚੈੱਕਲਿਸਟ।',
      cropStageHeader: 'ਖੇਤ ਦੀ ਮੌਜੂਦਾ ਹਾਲਤ',
      checklistHeader: 'ਜ਼ਰੂਰੀ ਕੰਮਾਂ ਦੀ ਸੂਚੀ',
      markCompleted: 'ਮੁਕੰਮਲ ਕੀਤਾ',
      completedStatus: 'ਹੋ ਗਿਆ',
      disclaimer: 'ਨੋਟ: ਇਹ ਕੰਮ ਕਰਨ ਨਾਲ ਬੀਜਾਂ, ਸੰਦਾਂ ਅਤੇ ਫ਼ਸਲ ਦਾ ਬਚਾਅ ਹੁੰਦਾ ਹੈ, ਪਰ ਭਾਰੀ ਹੜ੍ਹ ਵਿੱਚ ਪੂਰੇ ਬਚਾਅ ਦੀ ਕੋਈ ਗਰੰਟੀ ਨਹੀਂ ਹੋ ਸਕਦੀ।',
      safetyCaution: 'ਜ਼ਰੂਰੀ ਸੁਰੱਖਿਆ ਨਿਯਮ: ਪਾਣੀ ਦਾ ਵਹਾਅ ਤੇਜ਼ ਹੋਣ ਵੇਲੇ ਨਾਲੀਆਂ ਖੋਲ੍ਹਣ ਜਾਂ ਫ਼ਸਲ ਬਚਾਉਣ ਲਈ ਪਾਣੀ ਵਿੱਚ ਨਾ ਵੜੋ। ਆਪਣੀ ਜਾਨ ਪਹਿਲਾਂ ਬਚਾਓ।'
    },
    safety: {
      title: 'ਹੜ੍ਹਾਂ ਦੌਰਾਨ ਜਾਨ ਬਚਾਉਣ ਦੇ ਜ਼ਰੂਰੀ ਨਿਯਮ',
      subtitle: 'ਹੜ੍ਹ ਦੇ ਦਿਨਾਂ ਵਿੱਚ ਕਿਸਾਨਾਂ ਅਤੇ ਪਰਿਵਾਰਾਂ ਲਈ ਜੀਵਨ-ਰੱਖਿਅਕ ਹਦਾਇਤਾਂ ਅਤੇ ਸਰਕਾਰੀ ਹੈਲਪਲਾਈਨ ਨੰਬਰ।',
      emergencyHotlineHeader: 'ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨ (24 ਘੰਟੇ ਮੁਫ਼ਤ)',
      rule1Title: '1. ਫ਼ਸਲ ਤੇ ਮਸ਼ੀਨਾਂ ਨਾਲੋਂ ਆਪਣੀ ਜਾਨ ਬਚਾਓ',
      rule1Desc: 'ਖੇਤਾਂ ਵਿੱਚ ਪਾਣੀ ਚੜ੍ਹਨ ਵੇਲੇ ਟਰੈਕਟਰ, ਮੋਟਰ ਜਾਂ ਖੜ੍ਹੀ ਫ਼ਸਲ ਬਚਾਉਣ ਲਈ ਪਾਣੀ ਵਿੱਚ ਨਾ ਉੱਤਰੋ। ਤੇਜ਼ ਵਹਾਅ ਅਤੇ ਡੂੰਘੇ ਖਾਲ ਪਲਾਂ ਵਿੱਚ ਇਨਸਾਨ ਤੇ ਟਰੈਕਟਰ ਨੂੰ ਰੋੜ੍ਹ ਸਕਦੇ ਹਨ।',
      rule2Title: '2. ਪਿੰਡ ਖਾਲੀ ਕਰਨ ਦੇ ਹੁਕਮ ਦੀ ਤੁਰੰਤ ਪਾਲਣਾ ਕਰੋ',
      rule2Desc: 'ਜਦੋਂ ਪ੍ਰਸ਼ਾਸਨ ਜਾਂ ਪੰਚਾਇਤ ਸੁਰੱਖਿਅਤ ਥਾਂ ਜਾਣ ਲਈ ਕਹੇ, ਤਾਂ ਬਿਨਾਂ ਦੇਰੀ ਉੱਚੀਆਂ ਸੜਕਾਂ ਰਾਹੀਂ ਨਿਕਲੋ। ਦਵਾਈਆਂ, ਪਛਾਣ ਪੱਤਰ ਅਤੇ ਪੀਣ ਵਾਲਾ ਪਾਣੀ ਨਾਲ ਰੱਖੋ।',
      rule3Title: '3. ਬਿਜਲੀ ਦੇ ਖੰਭਿਆਂ ਅਤੇ ਤਾਰਾਂ ਤੋਂ ਦੂਰ ਰਹੋ',
      rule3Desc: 'ਟੁੱਟੇ ਖੰਭਿਆਂ, ਲਟਕਦੀਆਂ ਤਾਰਾਂ ਅਤੇ ਡੁੱਬੇ ਟਰਾਂਸਫਾਰਮਰਾਂ ਦੇ ਨੇੜੇ ਬਿਲਕੁਲ ਨਾ ਜਾਓ। ਪਾਣੀ ਵਿੱਚ ਕਰੰਟ ਬਹੁਤ ਦੂਰ ਤੱਕ ਫੈਲ ਸਕਦਾ ਹੈ।',
      rule4Title: '4. ਪਸ਼ੂਆਂ ਦੀ ਸੁਰੱਖਿਆ',
      rule4Desc: 'ਪਾਣੀ ਵਧਣ ਤੇ ਪਸ਼ੂਆਂ ਨੂੰ ਕਿੱਲੇ ਤੋਂ ਖੋਲ੍ਹ ਦਿਓ ਤਾਂ ਜੋ ਉਹ ਆਪਣੇ ਆਪ ਉੱਚੀਆਂ ਥਾਵਾਂ ਤੇ ਚੜ੍ਹ ਸਕਣ। ਉਹਨਾਂ ਨੂੰ ਕਦੇ ਵੀ ਬੰਨ੍ਹਿਆ ਨਾ ਛੱਡੋ।',
      rule5Title: '5. ਸੱਪਾਂ ਤੋਂ ਬਚਾਓ ਅਤੇ ਸਾਫ਼ ਪਾਣੀ ਪੀਓ',
      rule5Desc: 'ਹੜ੍ਹ ਦੇ ਪਾਣੀ ਕਾਰਨ ਜ਼ਹਿਰੀਲੇ ਸੱਪ ਸੁੱਕੀਆਂ ਥਾਵਾਂ ਤੇ ਚੜ੍ਹਦੇ ਹਨ। ਗੰਮਬੂਟ ਪਾਓ ਅਤੇ ਰਾਤ ਨੂੰ ਡਾਂਗ ਤੇ ਟਾਰਚ ਰੱਖੋ। ਹੜ੍ਹ ਦਾ ਪਾਣੀ ਕਦੇ ਨਾ ਪੀਓ, ਉਬਾਲ ਕੇ ਪੀਓ।',
      offlineNotice: 'ਇਹ ਸੁਰੱਖਿਆ ਹਦਾਇਤਾਂ ਤੁਹਾਡੇ ਫ਼ੋਨ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਹਨ ਅਤੇ ਬਿਨਾਂ ਇੰਟਰਨੈੱਟ ਦੇ ਵੀ ਪੜ੍ਹੀਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ।'
    },
    recovery: {
      title: 'ਹੜ੍ਹ ਉਪਰੰਤ ਖੇਤ ਤੇ ਫ਼ਸਲ ਸੰਭਾਲ',
      subtitle: 'ਪਾਣੀ ਉਤਰਨ ਤੋਂ ਬਾਅਦ ਖੇਤ ਵਿੱਚੋਂ ਪਾਣੀ ਕੱਢਣ, ਗਾਰ ਹਟਾਉਣ ਅਤੇ ਫ਼ਸਲ ਨੂੰ ਬਿਮਾਰੀਆਂ ਤੋਂ ਬਚਾਉਣ ਲਈ ਵਿਗਿਆਨਕ ਸਲਾਹ।',
      stepSafeEntry: '1. ਸੁਰੱਖਿਅਤ ਮੁੜ-ਪ੍ਰਵੇਸ਼',
      stepSafeEntryDesc: 'ਖੇਤਾਂ ਵਿੱਚ ਉਦੋਂ ਹੀ ਜਾਓ ਜਦੋਂ ਪਾਣੀ ਪੂਰੀ ਤਰ੍ਹਾਂ ਲਹਿ ਜਾਵੇ ਅਤੇ ਪ੍ਰਸ਼ਾਸਨ ਇਲਾਕੇ ਨੂੰ ਸੁਰੱਖਿਅਤ ਐਲਾਨ ਕਰੇ। ਜ਼ਮੀਨ ਦੇ ਧਸਣ ਦੀ ਜਾਂਚ ਕਰੋ।',
      stepDrainage: '2. ਖੜ੍ਹੇ ਪਾਣੀ ਦੀ ਤੁਰੰਤ ਨਿਕਾਸੀ',
      stepDrainageDesc: 'ਨਾਲੀਆਂ ਪੁੱਟ ਕੇ ਖੜ੍ਹਾ ਪਾਣੀ ਛੇਤੀ ਬਾਹਰ ਕੱਢੋ। ਝੋਨੇ ਤੋਂ ਬਿਨਾਂ ਹੋਰ ਫ਼ਸਲਾਂ ਵਿੱਚ 48-72 ਘੰਟੇ ਪਾਣੀ ਖੜ੍ਹਨ ਨਾਲ ਜੜ੍ਹਾਂ ਗਲ ਜਾਂਦੀਆਂ ਹਨ।',
      stepSilt: '3. ਗਾਰ (ਰੇਤ/ਮਿੱਟੀ) ਦੀ ਸੰਭਾਲ',
      stepSiltDesc: 'ਪੌਦਿਆਂ ਦੇ ਪੱਤਿਆਂ ਉੱਤੇ ਜੰਮੀ ਮਿੱਟੀ ਨੂੰ ਸਾਫ਼ ਪਾਣੀ ਨਾਲ ਧੋਵੋ ਤਾਂ ਜੋ ਪੌਦਾ ਧੁੱਪ ਅਤੇ ਹਵਾ ਲੈ ਸਕੇ।',
      stepNutrition: '4. ਖਾਦਾਂ ਦੀ ਸੋਚ-ਸਮਝ ਕੇ ਵਰਤੋਂ',
      stepNutritionDesc: 'ਹੜ੍ਹ ਤੋਂ ਤੁਰੰਤ ਬਾਅਦ ਜ਼ਮੀਨ ਵਿੱਚ ਯੂਰੀਆ ਨਾ ਸੁੱਟੋ ਕਿਉਂਕਿ ਜੜ੍ਹਾਂ ਕਮਜ਼ੋਰ ਹੁੰਦੀਆਂ ਹਨ। ਨਵੀਆਂ ਜੜ੍ਹਾਂ ਫੁੱਟਣ ਤੇ ਹੀ 1-2% ਯੂਰੀਆ ਦਾ ਸਪਰੇਅ ਕਰੋ।',
      stepDisease: '5. ਫ਼ੰਗਸ ਅਤੇ ਬਿਮਾਰੀਆਂ ਤੋਂ ਬਚਾਅ',
      stepDiseaseDesc: 'ਪਾਣੀ ਲਹਿਣ ਤੋਂ ਬਾਅਦ ਜੀਵਾਣੂ ਝੁਲਸ ਰੋਗ ਅਤੇ ਜੜ੍ਹਾਂ ਗਲਣ ਦੀ ਸਮੱਸਿਆ ਵਧਦੀ ਹੈ। ਸਹੀ ਉੱਲੀਨਾਸ਼ਕ ਦਵਾਈ ਲਈ ਨੇੜਲੇ ਕ੍ਰਿਸ਼ੀ ਵਿਗਿਆਨ ਕੇਂਦਰ (KVK) ਨਾਲ ਸੰਪਰਕ ਕਰੋ।',
      generateReportCta: 'ਅਧਿਕਾਰਤ ਖੇਤ ਨੁਕਸਾਨ ਰਿਪੋਰਟ ਤਿਆਰ ਕਰੋ'
    },
    photoAssess: {
      title: 'ਫ਼ਸਲ ਫ਼ੋਟੋ ਜਾਂਚ (AI)',
      subtitle: 'ਹੜ੍ਹ ਮਾਰੀ ਫ਼ਸਲ ਦੀ ਸਾਫ਼ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਮੁਢਲੇ ਲੱਛਣਾਂ ਦੀ ਪਛਾਣ ਤੇ ਤੁਰੰਤ ਸਲਾਹ ਹਾਸਲ ਕਰੋ।',
      uploadInstructions: 'ਪੌਦੇ ਦੇ ਪੱਤੇ ਜਾਂ ਤਣੇ ਦੀ ਸਾਫ਼ ਫ਼ੋਟੋ ਲਵੋ। JPG, PNG ਜਾਂ WEBP ਫ਼ਾਈਲ, ਵੱਧ ਤੋਂ ਵੱਧ 10MB।',
      chooseFile: 'ਫ਼ਸਲ ਦੀ ਫ਼ੋਟੋ ਚੁਣੋ',
      analyzingPhoto: 'ਫ਼ੋਟੋ ਵਿੱਚੋਂ ਹੜ੍ਹ ਦੇ ਅਸਰ ਅਤੇ ਲੱਛਣਾਂ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
      resultsHeader: 'ਮੁਢਲੀ ਖੇਤੀਬਾੜੀ ਲੱਛਣ ਰਿਪੋਰਟ',
      symptomsIdentified: 'ਵੇਖੇ ਗਏ ਲੱਛਣ',
      suspectedCondition: 'ਸੰਭਾਵੀ ਬਿਮਾਰੀ ਜਾਂ ਸਮੱਸਿਆ',
      immediateAdvice: 'ਤੁਰੰਤ ਕੀਤੇ ਜਾਣ ਵਾਲੇ ਉਪਾਅ',
      disclaimerText: 'ਪਾਰਦਰਸ਼ਤਾ ਨੋਟ: ਇਹ ਫ਼ੋਟੋ ਜਾਂਚ ਸਿਰਫ਼ ਮੁਢਲੀ ਸਹਾਇਤਾ ਲਈ ਹੈ। ਇਹ ਕਿਸੇ ਸਰਟੀਫਾਈਡ ਖੇਤੀਬਾੜੀ ਮਾਹਰ ਜਾਂ ਕ੍ਰਿਸ਼ੀ ਵਿਗਿਆਨ ਕੇਂਦਰ ਦੇ ਖ਼ੁਦ ਜਾ ਕੇ ਦੇਖਣ ਦਾ ਬਦਲ ਨਹੀਂ ਹੈ।',
      samplePhotos: 'ਜਾਂ ਹੜ੍ਹ ਦੇ ਨਮੂਨੇ ਵੇਖ ਕੇ ਜਾਂਚੋ:'
    },
    reports: {
      title: 'ਅਧਿਕਾਰਤ ਖੇਤ ਹੜ੍ਹ ਰਿਪੋਰਟ',
      subtitle: 'ਕ੍ਰਿਸ਼ੀ ਵਿਗਿਆਨ ਕੇਂਦਰ (KVK) ਅਤੇ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫ਼ਸਲ ਬੀਮਾ ਯੋਜਨਾ (PMFBY) ਲਈ ਤਸਦੀਕਸ਼ੁਦਾ ਦਸਤਾਵੇਜ਼।',
      farmSummary: 'ਖੇਤ ਤੇ ਫ਼ਸਲ ਦਾ ਮੂਲ ਵੇਰਵਾ',
      floodExposure: 'ਉਪਗ੍ਰਹਿ ਰਡਾਰ ਵੱਲੋਂ ਦਰਜ ਹੜ੍ਹ ਦਾ ਸਬੂਤ',
      printReport: 'ਪ੍ਰਿੰਟ ਕਰੋ / ਪੀਡੀਐਫ ਸੇਵ ਕਰੋ',
      downloadReport: 'ਅਧਿਕਾਰਤ ਸਾਰੰਸ਼ ਡਾਊਨਲੋਡ ਕਰੋ',
      officialSubmissionNote: 'ਇਹ ਰਿਪੋਰਟ ਖੇਤ ਦੀ ਹੱਦਬੰਦੀ, ਸਰਕਾਰੀ ਹੜ੍ਹ ਬੁਲੇਟਿਨਾਂ ਅਤੇ ਸੈਂਟੀਨਲ ਰਡਾਰ ਅੰਕੜਿਆਂ ਦਾ ਪ੍ਰਮਾਣਿਤ ਸੰਗ੍ਰਹਿ ਹੈ।'
    },
    settings: {
      title: 'ਭਾਸ਼ਾ ਅਤੇ ਅਲਰਟ ਤਰਜੀਹਾਂ',
      subtitle: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ, ਐਮਰਜੈਂਸੀ ਐਸ.ਐਮ.ਐਸ. ਚਾਲੂ ਕਰੋ, ਅਤੇ ਆਪਣੀ ਜ਼ਮੀਨੀ ਇਕਾਈ ਸੈੱਟ ਕਰੋ।',
      languageHeader: 'ਵੈੱਬਸਾਈਟ ਦੀ ਭਾਸ਼ਾ ਚੁਣੋ',
      smsHeader: 'ਐਮਰਜੈਂਸੀ ਐਸ.ਐਮ.ਐਸ. ਹੜ੍ਹ ਅਲਰਟ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
      smsPhoneLabel: 'ਅਲਰਟ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਮੋਬਾਈਲ ਨੰਬਰ',
      sendOtp: 'ਤਸਦੀਕੀ OTP ਭੇਜੋ',
      enterOtp: '6 ਅੰਕਾਂ ਦਾ OTP ਦਰਜ ਕਰੋ',
      verifyOtp: 'ਤਸਦੀਕ ਕਰੋ ਤੇ ਅਲਰਟ ਚਾਲੂ ਕਰੋ',
      smsConsentCheck: 'ਮੈਂ ਇਸ ਨੰਬਰ ਤੇ ਐਮਰਜੈਂਸੀ ਹੜ੍ਹ ਅਲਰਟ ਸੁਨੇਹੇ ਪ੍ਰਾਪਤ ਕਰਨ ਦੀ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ। (ਕੋਈ ਮਸ਼ਹੂਰੀ ਜਾਂ ਬੇਲੋੜਾ ਸੁਨੇਹਾ ਨਹੀਂ)।',
      savePreferences: 'ਤਰਜੀਹਾਂ ਸੇਵ ਕਰੋ',
      optOutSms: 'ਅਲਰਟ ਬੰਦ ਕਰੋ (Opt-Out)',
      testSmsButton: 'ਟੈਸਟ ਸੁਨੇਹਾ ਭੇਜੋ (ਸਿਮੂਲੇਸ਼ਨ ਮੋਡ)',
      testSmsNote: 'ਸੁਰੱਖਿਅਤ ਟੈਸਟ ਮੋਡ: ਕਿਸਾਨਾਂ ਨੂੰ ਦਿਖਾਉਂਦਾ ਹੈ ਕਿ ਅਸਲ ਹੜ੍ਹ ਵੇਲੇ ਸਰਕਾਰੀ ਚਿਤਾਵਨੀ ਸੁਨੇਹਾ ਕਿਹੋ ਜਿਹਾ ਦਿਖਾਈ ਦੇਵੇਗਾ।'
    },
    dataSources: {
      title: 'ਡਾਟਾ ਸਰੋਤ, ਕਾਰਜ-ਵਿਧੀ ਅਤੇ ਸੀਮਾਵਾਂ',
      subtitle: 'ਸਰਕਾਰੀ ਅਦਾਰਿਆਂ ਅਤੇ ਸੈਟੇਲਾਈਟ ਡਾਟਾਸੈੱਟਾਂ, ਅਪਡੇਟ ਸਮੇਂ ਅਤੇ ਅਨਿਸ਼ਚਿਤਤਾ ਦੀ ਪੂਰੀ ਪਾਰਦਰਸ਼ਤਾ।',
      transparencyNote: 'ਸੱਚਾਈ ਦਾ ਅਸੂਲ: ਕ੍ਰਿਸ਼ੀ ਰੱਖਿਅਕ AI ਕਦੇ ਵੀ ਮੌਸਮ ਜਾਂ ਹੜ੍ਹ ਦਾ ਝੂਠਾ ਡਾਟਾ ਨਹੀਂ ਘੜਦਾ। ਹਰ ਜਾਣਕਾਰੀ ਸਰਕਾਰੀ ਸਰੋਤ ਨਾਲ ਜੁੜੀ ਹੋਈ ਹੈ।',
      sourcesListHeader: 'ਮੁੱਖ ਸਰਕਾਰੀ ਤੇ ਵਿਗਿਆਨਕ ਡਾਟਾ ਸਰੋਤ',
      limitationsHeader: 'ਤਕਨੀਕੀ ਸੀਮਾਵਾਂ ਅਤੇ ਸਾਵਧਾਨੀਆਂ'
    },
    common: {
      safeFallbackNotice: 'ਪ੍ਰਮਾਣਿਤ ਸੁਰੱਖਿਅਤ ਮੋਡ ਚਾਲੂ। ਸਰਕਾਰੀ ਰਿਕਾਰਡ ਦਿਖਾਏ ਜਾ ਰਹੇ ਹਨ।',
      loading: 'ਡਾਟਾ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
      error: 'ਕੋਈ ਗੜਬੜ ਹੋਈ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
      source: 'ਸਰੋਤ',
      lastUpdated: 'ਆਖ਼ਰੀ ਅਪਡੇਟ',
      severe: 'ਬਹੁਤ ਗੰਭੀਰ',
      high: 'ਗੰਭੀਰ',
      moderate: 'ਦਰਮਿਆਨਾ',
      low: 'ਘੱਟ',
      none: 'ਕੁਝ ਨਹੀਂ / ਨਾਮਾਤਰ',
      disclaimer: 'ਧਿਆਨ ਦਿਓ'
    }
  }
};

// Essential Indian Languages with native scripts and terminology
const bnTranslations: Translations = {
  ...translations.en,
  appName: 'কৃষিরক্ষক এআই (KrishiRakshak)',
  appSlogan: 'বন্যা শনাক্ত করুন · ফসল বাঁচান · ক্ষয়ক্ষতি কমান',
  primaryQuestion: 'বন্যার পানি কি আমার জমিতে ঢুকবে এবং ক্ষতি এড়াতে আমাকে কী করতে হবে?',
  nav: {
    home: 'হোম',
    register: 'জমি নথিভুক্ত করুন',
    dashboard: 'ড্যাশবোর্ড',
    warnings: 'বন্যা সতর্কতা',
    floodMap: 'লাইভ রাডার মানচিত্র',
    planner: 'সুরক্ষা চেকলিস্ট',
    safety: 'জরুরি সুরক্ষা',
    recovery: 'বন্যা পরবর্তী পদক্ষেপ',
    photoAssess: 'ফসল ক্ষতি যাচাই',
    reports: 'অফিসিয়াল রিপোর্ট',
    settings: 'ভাষা ও সতর্কতা',
    dataSources: 'তথ্যের উৎস',
    emergencyCall: 'জরুরি কল: ১০৭৮'
  },
  home: {
    ...translations.en.home,
    heroTitle: 'বন্যা থেকে আপনার ফসল ও কৃষি রক্ষা করুন',
    heroSubtitle: 'ভারতের কৃষকদের জন্য উপগ্রহ রাডার ও নদী পর্যবেক্ষণ ভিত্তিক স্বয়ংক্রিয় বন্যা সতর্কতা ব্যবস্থা।',
    registerCta: 'জমি নথিভুক্ত করুন',
    viewMapCta: 'বন্যা মানচিত্র দেখুন',
    checkWarningsCta: 'সরকারি সতর্কতা দেখুন'
  },
  dashboard: {
    ...translations.en.dashboard,
    title: 'কৃষক মনিটরিং ড্যাশবোর্ড',
    latestWarningsTitle: 'সাম্প্রতিক সরকারি বন্যা সতর্কতা',
    weatherTitle: 'আবহাওয়া ও বৃষ্টির পূর্বাভাস'
  }
};

const teTranslations: Translations = {
  ...translations.en,
  appName: 'కృషిరక్షక్ AI (KrishiRakshak)',
  appSlogan: 'వరదను గుర్తించండి · పంటను కాపాడండి · నష్టాన్ని తగ్గించండి',
  primaryQuestion: 'వరద నీరు నా పొలంలోకి వస్తుందా, పంటను కాపాడుకోవడానికి నేను ఏమి చేయాలి?',
  nav: {
    home: 'హోమ్',
    register: 'పొలం నమోదు',
    dashboard: 'డ్యాష్‌బోర్డ్',
    warnings: 'వరద హెచ్చరికలు',
    floodMap: 'లైవ్ రాడార్ మ్యాప్',
    planner: 'రక్షణ చెక్‌లిస్ట్',
    safety: 'అత్యవసర రక్షణ',
    recovery: 'వరద తర్వాత పునరుద్ధరణ',
    photoAssess: 'పంట నష్టం తనిఖీ',
    reports: 'అధికారిక నివేదిక',
    settings: 'భాష & SMS అలర్ట్‌లు',
    dataSources: 'డేటా వనరులు',
    emergencyCall: 'హెల్ప్‌లైన్: 1078'
  },
  home: {
    ...translations.en.home,
    heroTitle: 'వరదల నుండి మీ పంటలను & వ్యవసాయాన్ని రక్షించుకోండి',
    heroSubtitle: 'ఉపగ్రహ రాడార్ మరియు నదీ ప్రవాహ పర్యవేక్షణతో భారతీయ రైతులకు ముందస్తు వరద హెచ్చరికలు.',
    registerCta: 'పొలాన్ని నమోదు చేయండి',
    viewMapCta: 'వరద మ్యాప్ చూడండి',
    checkWarningsCta: 'హెచ్చరికలు తనిఖీ చేయండి'
  },
  dashboard: {
    ...translations.en.dashboard,
    title: 'రైతు మానిటరింగ్ డ్యాష్‌బోర్డ్',
    latestWarningsTitle: 'తాజా అధికారిక వరద హెచ్చరికలు',
    weatherTitle: 'వాతావరణం & వర్ష సూచన'
  }
};

const taTranslations: Translations = {
  ...translations.en,
  appName: 'கிருஷிரக்ஷக் AI (KrishiRakshak)',
  appSlogan: 'வெள்ளத்தைக் கண்டறியுங்கள் · பயிரைப் பாதுகாக்கவும் · இழப்பைக் குறைக்கவும்',
  primaryQuestion: 'வெள்ள நீர் என் நிலத்தில் நுழையுமா, உடனடி இழப்பைத் தவிர்க்க நான் என்ன செய்ய வேண்டும்?',
  nav: {
    home: 'முகப்பு',
    register: 'நிலப் பதிவு',
    dashboard: 'டாஷ்போர்டு',
    warnings: 'வெள்ள எச்சரிக்கைகள்',
    floodMap: 'நேரலை ரேடார் வரைபடம்',
    planner: 'பாதுகாப்பு சரிபார்ப்புப் பட்டியல்',
    safety: 'அவசர உதவி',
    recovery: 'வெள்ளத்திற்குப் பிந்தைய மீட்பு',
    photoAssess: 'பயிர் சேத ஆய்வு',
    reports: 'அதிகாரப்பூர்வ அறிக்கை',
    settings: 'மொழி & SMS எச்சரிக்கை',
    dataSources: 'தரவு மூலங்கள்',
    emergencyCall: 'அவசர அழைப்பு: 1078'
  },
  home: {
    ...translations.en.home,
    heroTitle: 'வெள்ளத்திலிருந்து உங்கள் பயிர்களைப் பாதுகாத்துக் கொள்ளுங்கள்',
    heroSubtitle: 'செயற்கைக்கோள் ரேடார் மற்றும் அதிகாரப்பூர்வ நதி கண்காணிப்புடன் விவசாயிகளுக்கான முன்கூட்டிய எச்சரிக்கை.',
    registerCta: 'நிலத்தை பதிவு செய்க',
    viewMapCta: 'வெள்ள வரைபடத்தைப் பார்க்கவும்',
    checkWarningsCta: 'அரசு எச்சரிக்கைகளைப் பார்க்கவும்'
  },
  dashboard: {
    ...translations.en.dashboard,
    title: 'விவசாயி கண்காணிப்பு டாஷ்போர்டு',
    latestWarningsTitle: 'சமீபத்திய அதிகாரப்பூர்வ வெள்ள எச்சரிக்கைகள்',
    weatherTitle: 'வானிலை மற்றும் மழை முன்னறிவிப்பு'
  }
};

const mrTranslations: Translations = {
  ...translations.en,
  appName: 'कृषिरक्षक AI (KrishiRakshak)',
  appSlogan: 'पूर ओळखा · पीक वाचवा · नुकसान टाळा',
  primaryQuestion: 'माझ्या शेतात पुराचे पाणी येईल का आणि पीक वाचवण्यासाठी मला काय करावे लागेल?',
  nav: {
    home: 'मुख्यपृष्ठ',
    register: 'शेत नोंदणी',
    dashboard: 'डॅशबोर्ड',
    warnings: 'पूर इशारे',
    floodMap: 'थेट रडार नकाशा',
    planner: 'सुरक्षा यादी',
    safety: 'आपत्कालीन सुरक्षा',
    recovery: 'पुनरुत्थान उपाय',
    photoAssess: 'पीक नुकसान तपासणी',
    reports: 'अधिकृत अहवाल',
    settings: 'भाषा आणि SMS',
    dataSources: 'माहिती स्रोत',
    emergencyCall: 'आपत्कालीन कॉल: १०७८'
  },
  home: {
    ...translations.en.home,
    heroTitle: 'पुराच्या धोक्यापासून तुमची पिके आणि शेती वाचवा',
    heroSubtitle: 'उपग्रह रडार आणि नदी पातळी निरीक्षणाद्वारे भारतीय शेतकऱ्यांसाठी अधिकृत पूर पूर्वसूचना प्रणाली.',
    registerCta: 'शेत नोंदणी करा',
    viewMapCta: 'पूर नकाशा पहा',
    checkWarningsCta: 'अधिकृत इशारे तपासा'
  },
  dashboard: {
    ...translations.en.dashboard,
    title: 'शेतकरी नियंत्रण कक्ष',
    latestWarningsTitle: 'सध्याचे अधिकृत पूर इशारे',
    weatherTitle: 'हवामान व पावसाचा अंदाज'
  }
};

const guTranslations: Translations = {
  ...translations.en,
  appName: 'કૃષિરક્ષક AI (KrishiRakshak)',
  appSlogan: 'પૂર ઓળખો · પાક બચાવો · નુકસાન ઘટાડો',
  primaryQuestion: 'શું પૂરનું પાણી મારા ખેતરમાં આવશે અને પાક બચાવવા માટે મારે શું કરવું જોઈએ?',
  nav: {
    home: 'હોમ',
    register: 'ખેતર નોંધણી',
    dashboard: 'ડેશબોર્ડ',
    warnings: 'પૂર ચેતવણીઓ',
    floodMap: 'લાઇવ રડાર નકશો',
    planner: 'સુરક્ષા ચેકલિસ્ટ',
    safety: 'ઇમરજન્સી સુરક્ષા',
    recovery: 'પૂર પછીના પગલાં',
    photoAssess: 'પાક નુકસાન ચકાસણી',
    reports: 'સત્તાવાર અહેવાલ',
    settings: 'ભાષા અને SMS',
    dataSources: 'માહિતી સ્ત્રોત',
    emergencyCall: 'હેલ્પલાઇન: 1078'
  },
  home: {
    ...translations.en.home,
    heroTitle: 'પૂરના જોખમથી તમારા પાક અને ખેતીનું રક્ષણ કરો',
    heroSubtitle: 'સેટેલાઇટ રડાર અને નદી જળસ્તર મોનિટરિંગ આધારિત ભારતીય ખેડૂતો માટે સત્તાવાર પૂર ચેતવણી.',
    registerCta: 'ખેતર નોંધણી કરો',
    viewMapCta: 'પૂર નકશો જુઓ',
    checkWarningsCta: 'ચેતવણીઓ જુઓ'
  },
  dashboard: {
    ...translations.en.dashboard,
    title: 'ખેડૂત મોનિટરિંગ ડેશબોર્ડ',
    latestWarningsTitle: 'તાજેતરની સત્તાવાર પૂર ચેતવણીઓ',
    weatherTitle: 'હવામાન અને વરસાદની આગાહી'
  }
};

const knTranslations: Translations = {
  ...translations.en,
  appName: 'ಕೃಷಿರಕ್ಷಕ್ AI (KrishiRakshak)',
  appSlogan: 'ಪ್ರವಾಹ ಗುರುತಿಸಿ · ಬೆಳೆ ಉಳಿಸಿ · ನಷ್ಟ ಕಡಿಮೆ ಮಾಡಿ',
  primaryQuestion: 'ಪ್ರವಾಹದ ನೀರು ನನ್ನ ಹೊಲಕ್ಕೆ ನುಗ್ಗುತ್ತದೆಯೇ ಮತ್ತು ಬೆಳೆ ಉಳಿಸಲು ನಾನು ಏನು ಮಾಡಬೇಕು?',
  nav: {
    home: 'ಮುಖಪುಟ',
    register: 'ಹೊಲ ನೋಂದಣಿ',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    warnings: 'ಪ್ರವಾಹ ಎಚ್ಚರಿಕೆಗಳು',
    floodMap: 'ಲೈವ್ ರೇಡಾರ್ ನಕ್ಷೆ',
    planner: 'ರಕ್ಷಣಾ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ',
    safety: 'ತುರ್ತು ಸುರಕ್ಷತೆ',
    recovery: 'ಪ್ರವಾಹದ ನಂತರದ ಕ್ರಮಗಳು',
    photoAssess: 'ಬೆಳೆ ಹಾನಿ ತಪಾಸಣೆ',
    reports: 'ಅಧಿಕೃತ ವರದಿ',
    settings: 'ಭಾಷೆ & SMS ಅಲರ್ಟ್',
    dataSources: 'ಮಾಹಿತಿ ಮೂಲಗಳು',
    emergencyCall: 'ತುರ್ತು ಕರೆ: 1078'
  },
  home: {
    ...translations.en.home,
    heroTitle: 'ಪ್ರವಾಹದಿಂದ ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು & ಕೃಷಿಯನ್ನು ರಕ್ಷಿಸಿಕೊಳ್ಳಿ',
    heroSubtitle: 'ಉಪಗ್ರಹ ರೇಡಾರ್ ಮತ್ತು ನದಿ ಹರಿವಿನ ನಿಖರ ಎಚ್ಚರಿಕೆಯೊಂದಿಗೆ ಭಾರತೀಯ ರೈತರಿಗೆ ಅಧಿಕೃತ ಸೇವೆ.',
    registerCta: 'ಹೊಲವನ್ನು ನೋಂದಾಯಿಸಿ',
    viewMapCta: 'ಪ್ರವಾಹ ನಕ್ಷೆ ನೋಡಿ',
    checkWarningsCta: 'ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ'
  },
  dashboard: {
    ...translations.en.dashboard,
    title: 'ರೈತರ ಮಾನಿಟರಿಂಗ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    latestWarningsTitle: 'ಇತ್ತೀಚಿನ ಅಧಿಕೃತ ಪ್ರವಾಹ ಎಚ್ಚರಿಕೆಗಳು',
    weatherTitle: 'ಹವಾಮಾನ ಮತ್ತು ಮಳೆಯ ಮುನ್ಸೂಚನೆ'
  }
};

const orTranslations: Translations = {
  ...translations.en,
  appName: 'କୃଷିରକ୍ଷକ AI (KrishiRakshak)',
  appSlogan: 'ବନ୍ୟା ଚିହ୍ନଟ କରନ୍ତୁ · ଫସଲ ବଞ୍ଚାନ୍ତୁ · କ୍ଷୟକ୍ଷତି ରୋକନ୍ତୁ',
  primaryQuestion: 'ବନ୍ୟା ପାଣି ମୋ ଜମିରେ ପ୍ରବେଶ କରିବ କି ଏବଂ ଫସଲ ବଞ୍ଚାଇବାକୁ ମୋତେ କ’ଣ କରିବାକୁ ହେବ?',
  nav: {
    home: 'ମୂଳପୃଷ୍ଠା',
    register: 'ଜମି ପଞ୍ଜୀକରଣ',
    dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
    warnings: 'ବନ୍ୟା ସତର୍କତା',
    floodMap: 'ଲାଇଭ୍ ରାଡାର ମାନଚିତ୍ର',
    planner: 'ସୁରକ୍ଷା ଯାଞ୍ଚତାଲିକା',
    safety: 'ଜରୁରୀକାଳୀନ ସୁରକ୍ଷା',
    recovery: 'ବନ୍ୟା ପରବର୍ତ୍ତୀ ପୁନରୁଦ୍ଧାର',
    photoAssess: 'ଫସଲ କ୍ଷତି ଯାଞ୍ଚ',
    reports: 'ସରକାରୀ ରିପୋର୍ଟ',
    settings: 'ଭାଷା ଓ SMS ସତର୍କତା',
    dataSources: 'ତଥ୍ୟ ଉତ୍ସ',
    emergencyCall: 'ଜରୁରୀ ସହାୟତା: 1078'
  },
  home: {
    ...translations.en.home,
    heroTitle: 'ବନ୍ୟାରୁ ଆପଣଙ୍କ ଫସଲ ଓ ଜମିକୁ ସୁରକ୍ଷିତ ରଖନ୍ତୁ',
    heroSubtitle: 'ଉପଗ୍ରହ ରାଡାର ଏବଂ ନଦୀ ଜଳସ୍ତର ନିରୀକ୍ଷଣ ସହିତ ଭାରତୀୟ ଚାଷୀଙ୍କ ପାଇଁ ସରକାରୀ ସତର୍କତା ବ୍ୟବସ୍ଥା।',
    registerCta: 'ଜମି ପଞ୍ଜୀକରଣ କରନ୍ତୁ',
    viewMapCta: 'ବନ୍ୟା ମାନଚିତ୍ର ଦେଖନ୍ତୁ',
    checkWarningsCta: 'ସରକାରୀ ସତର୍କତା ଦେଖନ୍ତୁ'
  },
  dashboard: {
    ...translations.en.dashboard,
    title: 'କୃଷକ ମନିଟରିଂ ଡ୍ୟାସବୋର୍ଡ',
    latestWarningsTitle: 'ସଦ୍ୟତମ ସରକାରୀ ବନ୍ୟା ସତର୍କତା',
    weatherTitle: 'ପାଣିପାଗ ଓ ବର୍ଷା ପୂର୍ବାନୁମାନ'
  }
};

const asTranslations: Translations = {
  ...translations.en,
  appName: 'কৃষিৰক্ষক AI (KrishiRakshak)',
  appSlogan: 'বানপানী চিনাক্ত কৰক · শস্য ৰক্ষা কৰক · ক্ষতি কমাব',
  primaryQuestion: 'বানপানী মোৰ পথাৰত সোমাব নেকি আৰু শস্য ৰক্ষা কৰিবলৈ মই কি কৰিব লাগিব?',
  nav: {
    home: 'মূলপৃষ্ঠা',
    register: 'কৃষিভূমি পঞ্জীয়ন',
    dashboard: 'ডেচবৰ্ড',
    warnings: 'বানপানীৰ সতৰ্কবাণী',
    floodMap: 'লাইভ ৰাডাৰ মানচিত্ৰ',
    planner: 'সুৰক্ষা তালিকা',
    safety: 'জৰুৰী সুৰক্ষা',
    recovery: 'বানপানীৰ পিছৰ ব্যৱস্থা',
    photoAssess: 'শস্য ক্ষতি পৰীক্ষা',
    reports: 'চৰকাৰী প্ৰতিবেদন',
    settings: 'ভাষা আৰু SMS এলাৰ্ট',
    dataSources: 'তথ্যৰ উৎস',
    emergencyCall: 'জৰুৰী নম্বৰ: ১০৭৮'
  },
  home: {
    ...translations.en.home,
    heroTitle: 'বানপানীৰ পৰা আপোনাৰ শস্য আৰু পথাৰ ৰক্ষা কৰক',
    heroSubtitle: 'উপগ্ৰহ ৰাডাৰ আৰু নদীৰ জলস্তৰ নিৰীক্ষণৰ দ্বাৰা ভাৰতীয় কৃষকসকলৰ বাবে চৰকাৰী আগতীয়া বান সতৰ୍କবাণী।',
    registerCta: 'পথাৰ পঞ্জীয়ন কৰক',
    viewMapCta: 'বানপানী মানচিত্ৰ চাওক',
    checkWarningsCta: 'সতৰ্কবাণী পৰীক্ষা কৰক'
  },
  dashboard: {
    ...translations.en.dashboard,
    title: 'কৃষক নিৰীক্ষণ ডেচবৰ্ড',
    latestWarningsTitle: 'শেহতীয়া চৰকাৰী বান সতৰ୍କবাণী',
    weatherTitle: 'বতৰ আৰু বৰষুণৰ পূৰ্বাভাস'
  }
};

// Register all essential Indian languages
translations.bn = bnTranslations;
translations.te = teTranslations;
translations.ta = taTranslations;
translations.mr = mrTranslations;
translations.gu = guTranslations;
translations.kn = knTranslations;
translations.or = orTranslations;
translations.as = asTranslations;

export interface LanguageMeta {
  code: Language;
  name: string;
  nativeName: string;
  regions: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', regions: 'National / Agricultural' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', regions: 'UP, Bihar, MP, Rajasthan, Haryana' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', regions: 'Punjab, Haryana (Ghaggar-Sutlej)' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', regions: 'West Bengal, Tripura (Ganga-Teesta)' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', regions: 'Andhra Pradesh, Telangana (Godavari-Krishna)' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', regions: 'Tamil Nadu (Cauvery Basin)' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', regions: 'Maharashtra (Godavari, Krishna)' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', regions: 'Gujarat (Narmada, Tapi)' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', regions: 'Karnataka (Krishna-Cauvery)' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', regions: 'Odisha (Mahanadi Basin)' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', regions: 'Assam (Brahmaputra Basin)' }
];


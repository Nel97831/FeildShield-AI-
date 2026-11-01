import { CropChecklistItem, CropGrowthStage, CropType } from '../types';

export interface CropInfo {
  id: CropType;
  name: string;
  nativeNames: {
    en: string;
    hi: string;
    pa: string;
  };
  floodTolerance: 'low' | 'moderate' | 'high';
  maxSubmergenceHours: number; // Hours before severe irreversible damage begins
  stages: {
    stage: CropGrowthStage;
    name: {
      en: string;
      hi: string;
      pa: string;
    };
    vulnerabilityNotice: {
      en: string;
      hi: string;
      pa: string;
    };
  }[];
  preFloodChecklist: CropChecklistItem[];
  postFloodRecoveryGuidelines: {
    title: { en: string; hi: string; pa: string };
    steps: { en: string; hi: string; pa: string }[];
  };
}

export const CROPS_DATA: Record<CropType, CropInfo> = {
  paddy: {
    id: 'paddy',
    name: 'Paddy / Rice',
    nativeNames: {
      en: 'Paddy / Rice',
      hi: 'धान (Paddy/Rice)',
      pa: 'ਝੋਨਾ / ਚੌਲ (Paddy/Rice)'
    },
    floodTolerance: 'moderate',
    maxSubmergenceHours: 120, // 5 days for traditional; 14 days for Sub1 cultivars
    stages: [
      {
        stage: 'seedling',
        name: { en: 'Nursery / Seedling', hi: 'नर्सरी / अंकुरण', pa: 'ਪਨੀਰੀ / ਸ਼ੁਰੂਆਤੀ ਪੜਾਅ' },
        vulnerabilityNotice: {
          en: 'Seedlings can drown easily under muddy turbid water. Turbidity blocks sunlight and kills young shoots within 3–4 days.',
          hi: 'नर्सरी के पौधे मटमैले पानी में जल्दी डूबकर मर जाते हैं। धूप न मिलने से 3-4 दिन में भारी क्षति होती है।',
          pa: 'ਗੰਧਲੇ ਪਾਣੀ ਵਿੱਚ ਪਨੀਰੀ 3-4 ਦਿਨਾਂ ਵਿੱਚ ਗਲ ਜਾਂਦੀ ਹੈ ਕਿਉਂਕਿ ਸੂਰਜ ਦੀ ਰੌਸ਼ਨੀ ਨਹੀਂ ਪਹੁੰਚਦੀ।'
        }
      },
      {
        stage: 'vegetative',
        name: { en: 'Vegetative / Tillering', hi: 'कल्ले फूटने की अवस्था', pa: 'ਫੁਟਾਰਾ / ਸ਼ਾਖਾਵਾਂ ਨਿਕਲਣ ਦਾ ਸਮਾਂ' },
        vulnerabilityNotice: {
          en: 'Submergence suppresses tillering. If water recedes within 5 days, plants can recover with foliar nutrition.',
          hi: 'कल्ले फूटने के समय जलभराव से फुटाव रुकता है। 5 दिन में पानी निकल जाए तो फसल संभल सकती है।',
          pa: 'ਜੇਕਰ ਪਾਣੀ 5 ਦਿਨਾਂ ਦੇ ਅੰਦਰ ਲਹਿ ਜਾਵੇ ਤਾਂ ਸਪਰੇਅ ਰਾਹੀਂ ਫ਼ਸਲ ਨੂੰ ਦੁਬਾਰਾ ਸੰਭਾਲਿਆ ਜਾ ਸਕਦਾ ਹੈ।'
        }
      },
      {
        stage: 'flowering',
        name: { en: 'Panicle / Flowering', hi: 'बाली व फूल आने की अवस्था', pa: 'ਨਿਸਰਣ / ਬੂਰ ਪੈਣ ਦਾ ਸਮਾਂ' },
        vulnerabilityNotice: {
          en: 'Critical stage: standing floodwater washes away pollen, causing spikelet sterility (chaffy grain).',
          hi: 'अत्यधिक संवेदनशील अवस्था: तेज पानी से परागकण धुल जाते हैं और बालियां खाली (पोचा) रह जाती हैं।',
          pa: 'ਨਾਜ਼ੁਕ ਸਮਾਂ: ਪਾਣੀ ਨਾਲ ਬੂਰ ਧੋਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਝੋਨੇ ਦੀਆਂ ਮੁੰਜਰਾਂ ਫੋਕੀਆਂ ਰਹਿ ਜਾਂਦੀਆਂ ਹਨ।'
        }
      },
      {
        stage: 'maturity',
        name: { en: 'Grain Filling / Maturity', hi: 'दाना पकने की अवस्था', pa: 'ਦਾਣਾ ਪੱਕਣ / ਵਾਢੀ ਦਾ ਸਮਾਂ' },
        vulnerabilityNotice: {
          en: 'Lodging risk: mature plants fall into muddy water leading to grain sprouting and discoloration.',
          hi: 'फसल गिरने का खतरा: पकी फसल पानी में गिरने से दाने उगने और सड़ने लगते हैं। तुरंत कटाई प्राथमिकता है।',
          pa: 'ਫ਼ਸਲ ਡਿੱਗਣ ਦਾ ਡਰ: ਪੱਕੀ ਫ਼ਸਲ ਪਾਣੀ ਵਿੱਚ ਡਿੱਗਣ ਨਾਲ ਦਾਣੇ ਪੁੰਗਰ ਜਾਂਦੇ ਹਨ। ਜਲਦੀ ਵਾਢੀ ਕਰੋ।'
        }
      }
    ],
    preFloodChecklist: [
      {
        id: 'pad_1',
        category: 'drainage',
        title: 'Clear Field Drainage Spillways',
        description: 'Open external drainage cuts to allow excess water to flow out towards peripheral channels before flood surge peaks.',
        urgency: 'immediate',
        safetyWarning: 'Do not enter channels if water velocity is already surging.',
        completed: false
      },
      {
        id: 'pad_2',
        category: 'machinery',
        title: 'Elevate Submersible Motors & Starter Panels',
        description: 'Remove electric starter boxes, diesel generator pumps, and cables from tubewell pits to an elevated dry platform.',
        urgency: 'high',
        safetyWarning: 'Switch off main electrical line before touching any motor wiring.',
        completed: false
      },
      {
        id: 'pad_3',
        category: 'storage',
        title: 'Secure Stored Urea, DAP & Pesticides',
        description: 'Move fertilizer bags and pesticide containers off the ground into an elevated, waterproof room to avoid chemical leaching into floodwater.',
        urgency: 'high',
        completed: false
      },
      {
        id: 'pad_4',
        category: 'crops',
        title: 'Expedite Harvesting of Mature Blocks',
        description: 'If crop has reached physiological maturity (85% golden grains), harvest manually or with track-type combine immediately before rain starts.',
        urgency: 'high',
        completed: false
      }
    ],
    postFloodRecoveryGuidelines: {
      title: {
        en: 'Paddy Post-Submergence Recovery Protocol',
        hi: 'जलमग्न धान के खेत का सुधार प्रोटोकॉल',
        pa: 'ਹੜ੍ਹ ਤੋਂ ਬਾਅਦ ਝੋਨੇ ਦੀ ਸਾਂਭ-ਸੰਭਾਲ ਵਿਧੀ'
      },
      steps: [
        {
          en: 'Drain standing water gradually: do not drain all water in hot sunshine to prevent sudden plant wilting and shock. Retain 3–5 cm water.',
          hi: 'खेत से पानी धीरे-धीरे निकालें: तेज धूप में अचानक पूरा पानी न निकालें अन्यथा पौधे मुरझा जाएंगे। खेत में 3-5 सेमी पानी बनाए रखें।',
          pa: 'ਪਾਣੀ ਹੌਲੀ-ਹੌਲੀ ਬਾਹਰ ਕੱਢੋ: ਕੜਕਦੀ ਧੁੱਪ ਵਿੱਚ ਇਕਦਮ ਪਾਣੀ ਨਾ ਕੱਢੋ, ਨਹੀਂ ਤਾਂ ਬੂਟੇ ਸੁੱਕ ਜਾਣਗੇ। 2-3 ਇੰਚ ਪਾਣੀ ਰੱਖੋ।'
        },
        {
          en: 'Wash silt off leaves: muddy deposit hinders photosynthesis. Spray clean water using a knapsack sprayer if mud is caked on leaves.',
          hi: 'पत्तियों से गाद (मिट्टी) धोएं: मिट्टी जमने से पौधे सांस नहीं ले पाते। पीठ वाले स्प्रेयर से साफ पानी का छिड़काव करें।',
          pa: 'ਪੱਤਿਆਂ ਤੋਂ ਮਿੱਟੀ ਧੋਵੋ: ਜੇਕਰ ਪੱਤਿਆਂ ਉੱਤੇ ਗਾਰ ਜੰਮੀ ਹੈ ਤਾਂ ਸਾਫ਼ ਪਾਣੀ ਦਾ ਸਪਰੇਅ ਕਰੋ ਤਾਂ ਜੋ ਪੌਦਾ ਸਾਹ ਲੈ ਸਕੇ।'
        },
        {
          en: 'Foliar nutrition: once new white roots emerge, spray 1% Urea + 1% Potassium Nitrate (13-0-45) to revitalize root respiration.',
          hi: 'पत्तियों पर पोषण: जब नई सफेद जड़ें निकल आएं, तब 1% यूरिया + 1% पोटैशियम नाइट्रेट का छिड़काव करें ताकि पौधे में जान आ सके।',
          pa: 'ਖੁਰਾਕੀ ਸਪਰੇਅ: ਨਵੀਆਂ ਜੜ੍ਹਾਂ ਫੁੱਟਣ ਤੇ 1% ਯੂਰੀਆ ਅਤੇ ਪੋਟਾਸ਼ੀਅਮ ਨਾਈਟ੍ਰੇਟ ਦਾ ਸਪਰੇਅ ਕਰੋ।'
        },
        {
          en: 'Prevent Bacterial Leaf Blight: submerged plants are prone to bacterial infection. Avoid excessive soil nitrogen; spray recommended bactericide if lesions appear.',
          hi: 'जीवाणु झुलसा (BLB) से बचाव: जलभराव के बाद रोग का खतरा रहता है। जमीन में ज्यादा यूरिया न डालें और विशेषज्ञ की सलाह से उपचार करें।',
          pa: 'ਝੁਲਸ ਰੋਗ ਤੋਂ ਬਚਾਅ: ਡੁੱਬੇ ਝੋਨੇ ਨੂੰ ਬਿਮਾਰੀ ਛੇਤੀ ਲੱਗਦੀ ਹੈ। ਖੇਤੀਬਾੜੀ ਮਾਹਰਾਂ ਦੀ ਸਲਾਹ ਨਾਲ ਸਪਰੇਅ ਕਰੋ।'
        }
      ]
    }
  },

  wheat: {
    id: 'wheat',
    name: 'Wheat',
    nativeNames: {
      en: 'Wheat',
      hi: 'गेहूं (Wheat)',
      pa: 'ਕਣਕ (Wheat)'
    },
    floodTolerance: 'low',
    maxSubmergenceHours: 36, // Highly intolerant to waterlogging
    stages: [
      {
        stage: 'seedling',
        name: { en: 'Germination / Crown Root Initiation', hi: 'अंकुरण व ताज जड़ अवस्था (CRI)', pa: 'ਜੰਮਣ ਅਤੇ ਮੁਢਲਾ ਪੜਾਅ' },
        vulnerabilityNotice: {
          en: 'Extremely vulnerable: waterlogging for over 24 hours causes seedling rot, yellowing, and plant death.',
          hi: 'अत्यंत संवेदनशील: 24 घंटे से अधिक पानी भरा रहने पर जड़ें सड़ जाती हैं और पौधा पीला पड़कर मर जाता है।',
          pa: 'ਬਹੁਤ ਨਾਜ਼ੁਕ: 24 ਘੰਟੇ ਪਾਣੀ ਖੜ੍ਹਨ ਨਾਲ ਕਣਕ ਪੀਲੀ ਪੈ ਕੇ ਮਰ ਜਾਂਦੀ ਹੈ।'
        }
      },
      {
        stage: 'vegetative',
        name: { en: 'Tillering & Jointing', hi: 'कल्ले फूटना व गांठ बनना', pa: 'ਫੁਟਾਰਾ ਤੇ ਗੰਢਾਂ ਬਣਨਾ' },
        vulnerabilityNotice: {
          en: 'Anoxia (lack of oxygen) in root zone stunts growth. Requires immediate drainage trenches.',
          hi: 'जड़ों को ऑक्सीजन न मिलने से पौधे का विकास रुक जाता है। तत्काल जल निकासी नाली बनाना आवश्यक है।',
          pa: 'ਜੜ੍ਹਾਂ ਨੂੰ ਆਕਸੀਜਨ ਨਾ ਮਿਲਣ ਕਾਰਨ ਵਾਧਾ ਰੁਕ ਜਾਂਦਾ ਹੈ। ਪਾਣੀ ਕੱਢਣ ਲਈ ਤੁਰੰਤ ਖਾਲ ਪੁੱਟੋ।'
        }
      },
      {
        stage: 'flowering',
        name: { en: 'Earhead / Heading', hi: 'बाली निकलना व फूल', pa: 'ਸਿੱਟੇ ਨਿਕਲਣ ਦਾ ਸਮਾਂ' },
        vulnerabilityNotice: {
          en: 'Root lodging and fungal foot rot (Fusarium) triggered by saturated wet soil.',
          hi: 'गीली मिट्टी में पौधे गिरने और जड़ सड़न फफूंद का भारी प्रकोप होता है।',
          pa: 'ਜ਼ਮੀਨ ਗਿੱਲੀ ਹੋਣ ਕਰਕੇ ਕਣਕ ਡਿੱਗਣ ਅਤੇ ਜੜ੍ਹਾਂ ਗਲਣ ਦਾ ਖ਼ਤਰਾ ਹੁੰਦਾ ਹੈ।'
        }
      },
      {
        stage: 'maturity',
        name: { en: 'Maturity / Golden Ripening', hi: 'फसल पकने की अवस्था', pa: 'ਕਣਕ ਪੱਕਣ ਦਾ ਸਮਾਂ' },
        vulnerabilityNotice: {
          en: 'Standing water leads to grain blackening, mold (Karnal bunt/sooty mold), and pre-harvest sprouting.',
          hi: 'खेत में पानी भरने से दाना काला पड़ जाता है, फफूंद लगती है और बाली में ही दाना उग जाता है।',
          pa: 'ਦਾਣੇ ਕਾਲੇ ਪੈਣ ਅਤੇ ਸਿੱਟੇ ਵਿੱਚ ਹੀ ਪੁੰਗਰਨ ਦਾ ਖ਼ਤਰਾ।'
        }
      }
    ],
    preFloodChecklist: [
      {
        id: 'wht_1',
        category: 'drainage',
        title: 'Dig Peripheral Field Drainage Furrows',
        description: 'Dig shallow trenches around the field perimeter to route water away into village drainage nullahs.',
        urgency: 'immediate',
        completed: false
      },
      {
        id: 'wht_2',
        category: 'storage',
        title: 'Elevate Seed Bags & Grain Stores',
        description: 'Move harvested wheat grain and certified seed bags onto wooden pallets at least 3 feet above ground.',
        urgency: 'high',
        completed: false
      },
      {
        id: 'wht_3',
        category: 'machinery',
        title: 'Shift Tractor & Implements to High Ground',
        description: 'Move tractors, seed drills, and rotavators away from low-lying field sheds to elevated pacca roads.',
        urgency: 'high',
        completed: false
      }
    ],
    postFloodRecoveryGuidelines: {
      title: {
        en: 'Wheat Field De-watering & Recovery Protocol',
        hi: 'गेहूं के खेत से जल निकासी एवं सुधार प्रोटोकॉल',
        pa: 'ਕਣਕ ਵਿੱਚੋਂ ਪਾਣੀ ਨਿਕਾਸੀ ਅਤੇ ਸੰਭਾਲ'
      },
      steps: [
        {
          en: 'Expedite complete drainage within 24 hours: use diesel pumps to siphon water out of depressions.',
          hi: '24 घंटे के अंदर पूरा पानी निकालें: खेत के निचले हिस्सों से डीजल पंप लगाकर पानी बाहर फेंके।',
          pa: '24 ਘੰਟਿਆਂ ਅੰਦਰ ਪਾਣੀ ਬਾਹਰ ਕੱਢੋ: ਨੀਵੇਂ ਥਾਵਾਂ ਤੋਂ ਪੰਪ ਲਗਾ ਕੇ ਪਾਣੀ ਬਾਹਰ ਸੁੱਟੋ।'
        },
        {
          en: 'Aerate compacted soil: once topsoil dries enough to bear foot weight, perform shallow hoeing to break soil crust.',
          hi: 'मिट्टी की पपड़ी तोड़ें: जब खेत पैर सहने लायक सूखे, तो हल्की गुड़ाई करें ताकि जड़ों तक हवा पहुंच सके।',
          pa: 'ਗੋਡੀ ਕਰੋ: ਜ਼ਮੀਨ ਵੱਤਰ ਆਉਣ ਤੇ ਹਲਕੀ ਗੋਡੀ ਕਰੋ ਤਾਂ ਜੋ ਜੜ੍ਹਾਂ ਨੂੰ ਹਵਾ ਮਿਲ ਸਕੇ।'
        },
        {
          en: 'Foliar spray of Nitrogen & Micronutrients: spray 2% Urea + 0.5% Zinc Sulphate to counteract severe chlorosis (leaf yellowing).',
          hi: 'यूरिया व जिंक का छिड़काव: पत्तियां पीली पड़ने से बचाने के लिए 2% यूरिया + 0.5% जिंक सल्फेट का घोल छिड़कें।',
          pa: 'ਸਪਰੇਅ: 2% ਯੂਰੀਆ ਅਤੇ ਜ਼ਿੰਕ ਸਲਫੇਟ ਦਾ ਸਪਰੇਅ ਕਰੋ ਤਾਂ ਜੋ ਪੀਲਾਪਣ ਦੂਰ ਹੋ ਸਕੇ।'
        }
      ]
    }
  },

  cotton: {
    id: 'cotton',
    name: 'Cotton',
    nativeNames: {
      en: 'Cotton',
      hi: 'कपास / नरमा (Cotton)',
      pa: 'ਨਰਮਾ / ਕਪਾਹ (Cotton)'
    },
    floodTolerance: 'low',
    maxSubmergenceHours: 48,
    stages: [
      {
        stage: 'vegetative',
        name: { en: 'Vegetative Growth', hi: 'वानस्पतिक वृद्धि', pa: 'ਬੂਟੇ ਦਾ ਵਾਧਾ' },
        vulnerabilityNotice: {
          en: 'Waterlogging causes root suffocation, stunted branch development, and leaf reddening (parawilt).',
          hi: 'पानी भरने से जड़ें घुटती हैं, पौधे बौने रह जाते हैं और पत्तियां लाल पड़ने लगती हैं।',
          pa: 'ਪਾਣੀ ਖੜ੍ਹਨ ਨਾਲ ਨਰਮੇ ਦੇ ਪੱਤੇ ਲਾਲ ਪੈ ਜਾਂਦੇ ਹਨ ਅਤੇ ਵਾਧਾ ਰੁਕ ਜਾਂਦਾ ਹੈ।'
        }
      },
      {
        stage: 'flowering',
        name: { en: 'Squaring & Boll Formation', hi: 'डोडी व टिंडा बनना', pa: 'ਫੁੱਲ ਗੁੱਡੀ ਤੇ ਟੀਂਡੇ ਬਣਨਾ' },
        vulnerabilityNotice: {
          en: 'Severe boll and square shedding occurs within 48h of water stagnation. Parawilt wilt risk is extreme.',
          hi: '48 घंटे पानी भरा रहने पर 80% तक फूल व टिंडे गिर जाते हैं। उकठा रोग का भारी प्रकोप होता है।',
          pa: 'ਪਾਣੀ ਖੜ੍ਹਨ ਨਾਲ ਟੀਂਡੇ ਅਤੇ ਫੁੱਲ ਝੜ ਜਾਂਦੇ ਹਨ ਅਤੇ ਬੂਟੇ ਮੁਰਝਾ ਜਾਂਦੇ ਹਨ।'
        }
      },
      {
        stage: 'maturity',
        name: { en: 'Boll Bursting & Picking', hi: 'टिंडा फटना व चुगाई', pa: 'ਟੀਂਡੇ ਖਿੜਨਾ ਤੇ ਚੁਗਾਈ' },
        vulnerabilityNotice: {
          en: 'Open bolls become discolored, lint gets stained with mud, reducing market rate significantly.',
          hi: 'खुले टिंडे काले पड़ जाते हैं और रुई पर कीचड़ लगने से बाजार में भाव गिर जाता है।',
          pa: 'ਖਿੜੇ ਟੀਂਡਿਆਂ ਉੱਤੇ ਚਿੱਕੜ ਪੈਣ ਨਾਲ ਨਰਮਾ ਖ਼ਰਾਬ ਹੋ ਜਾਂਦਾ ਹੈ।'
        }
      }
    ],
    preFloodChecklist: [
      {
        id: 'cot_1',
        category: 'drainage',
        title: 'Open Furrows Between Cotton Ridges',
        description: 'Ensure ridge-and-furrow systems have unobstructed exit paths to prevent stagnant pooling.',
        urgency: 'immediate',
        completed: false
      },
      {
        id: 'cot_2',
        category: 'crops',
        title: 'Expedite Picking of Burst Bolls',
        description: 'Pick all open bolls immediately prior to rainfall to protect high-grade lint from mud staining.',
        urgency: 'high',
        completed: false
      }
    ],
    postFloodRecoveryGuidelines: {
      title: {
        en: 'Cotton Parawilt and Silt Recovery',
        hi: 'कपास में उकठा एवं जलभराव से बचाव',
        pa: 'ਨਰਮੇ ਵਿੱਚ ਪਾਣੀ ਖੜ੍ਹਨ ਤੋਂ ਬਾਅਦ ਸੰਭਾਲ'
      },
      steps: [
        {
          en: 'Immediate drainage: cotton cannot withstand more than 24–48 hours of saturation.',
          hi: 'तत्काल जल निकासी: कपास 24-48 घंटे से अधिक पानी सहन नहीं कर सकती।',
          pa: 'ਤੁਰੰਤ ਪਾਣੀ ਕੱਢੋ: ਨਰਮਾ 24 ਘੰਟਿਆਂ ਤੋਂ ਵੱਧ ਪਾਣੀ ਬਰਦਾਸ਼ਤ ਨਹੀਂ ਕਰ ਸਕਦਾ।'
        },
        {
          en: 'Drench root zones with Copper Oxychloride (2.5 g/L) if sudden wilting or root rot symptoms appear.',
          hi: 'उकठा रोग से बचाव हेतु कॉपर ऑक्सीक्लोराइड का घोल जड़ों के पास डालें।',
          pa: 'ਜੜ੍ਹਾਂ ਨੂੰ ਉੱਲੀ ਤੋਂ ਬਚਾਉਣ ਲਈ ਕਾਪਰ ਆਕਸੀਕਲੋਰਾਈਡ ਦੀ ਵਰਤੋਂ ਕਰੋ।'
        },
        {
          en: 'Foliar spray of 1% DAP + 1% Potassium Chloride to replenish washed-out nutrients.',
          hi: '1% डीएपी + 1% पोटैशियम का घोल पत्तियों पर छिड़कें।',
          pa: '1% ਡੀ.ਏ.ਪੀ. ਅਤੇ ਪੋਟਾਸ਼ ਦਾ ਸਪਰੇਅ ਕਰੋ।'
        }
      ]
    }
  },

  sugarcane: {
    id: 'sugarcane',
    name: 'Sugarcane',
    nativeNames: {
      en: 'Sugarcane',
      hi: 'गन्ना (Sugarcane)',
      pa: 'ਗੰਨਾ (Sugarcane)'
    },
    floodTolerance: 'high',
    maxSubmergenceHours: 240, // Can tolerate up to 10-12 days of partial waterlogging
    stages: [
      {
        stage: 'vegetative',
        name: { en: 'Tillering & Grand Growth', hi: 'कल्ले फूटना व तेज बढ़वार', pa: 'ਫੁਟਾਰਾ ਤੇ ਵਾਧਾ' },
        vulnerabilityNotice: {
          en: 'Tolerant to shallow water, but stagnation over 10 days causes aerial rooting and reduced cane diameter.',
          hi: 'गन्ना पानी सह लेता है, परंतु 10 दिन से ज्यादा पानी खड़ा रहने पर तने से हवा में जड़ें निकल आती हैं और मोटाई घटती है।',
          pa: 'ਗੰਨਾ ਪਾਣੀ ਸਹਾਰ ਸਕਦਾ ਹੈ, ਪਰ 10 ਦਿਨਾਂ ਤੋਂ ਵੱਧ ਪਾਣੀ ਖੜ੍ਹਨ ਨਾਲ ਗੰਨੇ ਪਤਲੇ ਰਹਿ ਜਾਂਦੇ ਹਨ।'
        }
      },
      {
        stage: 'maturity',
        name: { en: 'Ripening / Sugar Accumulation', hi: 'गन्ना पकना व शर्करा निर्माण', pa: 'ਗੰਨਾ ਪੱਕਣ ਦਾ ਸਮਾਂ' },
        vulnerabilityNotice: {
          en: 'Lodged cane in water loses sucrose content and becomes susceptible to destructive Red Rot disease.',
          hi: 'पानी में गिरा हुआ गन्ना लाल सड़न (Red Rot) रोग का शिकार हो जाता है और चीनी की मात्रा घट जाती है।',
          pa: 'ਪਾਣੀ ਵਿੱਚ ਡਿੱਗੇ ਗੰਨੇ ਨੂੰ ਰੱਤਾ ਰੋਗ ਲੱਗਣ ਦਾ ਡਰ ਹੁੰਦਾ ਹੈ।'
        }
      }
    ],
    preFloodChecklist: [
      {
        id: 'sug_1',
        category: 'crops',
        title: 'Tie Cane Clumps (Propping)',
        description: 'Tie neighboring sugarcane clumps together to prevent lodging under strong flood currents and winds.',
        urgency: 'high',
        completed: false
      },
      {
        id: 'sug_2',
        category: 'drainage',
        title: 'Deepen Field Boundary Ditches',
        description: 'Ensure boundary channels connect to regional drains to prevent continuous stagnation.',
        urgency: 'moderate',
        completed: false
      }
    ],
    postFloodRecoveryGuidelines: {
      title: {
        en: 'Sugarcane Post-Flood Health Management',
        hi: 'बाढ़ उपरांत गन्ने का स्वास्थ्य प्रबंधन',
        pa: 'ਹੜ੍ਹ ਤੋਂ ਬਾਅਦ ਗੰਨੇ ਦੀ ਸਾਂਭ-ਸੰਭਾਲ'
      },
      steps: [
        {
          en: 'Drain stagnant water to aerate root system and restore sugar accumulation.',
          hi: 'खेत से पानी निकालकर जड़ों को हवा लगने दें।',
          pa: 'ਖੇਤ ਵਿੱਚੋਂ ਪਾਣੀ ਕੱਢ ਕੇ ਜ਼ਮੀਨ ਨੂੰ ਹਵਾ ਲੱਗਣ ਦਿਓ।'
        },
        {
          en: 'Inspect canes for Red Rot symptoms (red discoloration of internal tissues). Roguing of infected clumps is vital.',
          hi: 'लाल सड़न रोग की जांच करें। संक्रमित पौधों को उखाड़कर नष्ट करें।',
          pa: 'ਰੱਤਾ ਰੋਗ ਵਾਲੇ ਗੰਨਿਆਂ ਨੂੰ ਖੇਤ ਵਿੱਚੋਂ ਪੁੱਟ ਕੇ ਬਾਹਰ ਕੱਢੋ।'
        }
      ]
    }
  },

  maize: {
    id: 'maize',
    name: 'Maize / Corn',
    nativeNames: {
      en: 'Maize / Corn',
      hi: 'मक्का (Maize)',
      pa: 'ਮੱਕੀ (Maize)'
    },
    floodTolerance: 'low',
    maxSubmergenceHours: 36,
    stages: [
      {
        stage: 'seedling',
        name: { en: 'Knee-High Stage', hi: 'घुटने तक ऊंचाई की अवस्था', pa: 'ਗੋਡੇ-ਗੋਡੇ ਉਚਾਈ ਦਾ ਪੜਾਅ' },
        vulnerabilityNotice: {
          en: 'Critical: growing point is submerged easily, suffocating the plant within 24–36 hours.',
          hi: 'पौधे का बढ़ता सिरा पानी में डूबने से 24 से 36 घंटे में पौधा खत्म हो जाता है।',
          pa: 'ਜੇਕਰ ਪੌਦੇ ਦਾ ਸਿਰਾ ਪਾਣੀ ਵਿੱਚ ਡੁੱਬ ਜਾਵੇ ਤਾਂ 24-36 ਘੰਟਿਆਂ ਵਿੱਚ ਮੱਕੀ ਮਰ ਜਾਂਦੀ ਹੈ।'
        }
      },
      {
        stage: 'flowering',
        name: { en: 'Tasseling & Silking', hi: 'मंजरी व भुट्टा निकलने की अवस्था', pa: 'ਬੂਰ ਤੇ ਛੱਲੀਆਂ ਬਣਨਾ' },
        vulnerabilityNotice: {
          en: 'Submergence disrupts pollination; ear formation is severely impaired.',
          hi: 'पानी भरने से परागण नहीं हो पाता और भुट्टे में दाने नहीं पड़ते।',
          pa: 'ਪਾਣੀ ਖੜ੍ਹਨ ਨਾਲ ਛੱਲੀ ਵਿੱਚ ਦਾਣੇ ਨਹੀਂ ਬਣਦੇ।'
        }
      }
    ],
    preFloodChecklist: [
      {
        id: 'mz_1',
        category: 'drainage',
        title: 'Open Fast Outflow Cuts in Ridges',
        description: 'Maize cannot tolerate ponding. Create cutouts in bunds immediately before rain.',
        urgency: 'immediate',
        completed: false
      }
    ],
    postFloodRecoveryGuidelines: {
      title: {
        en: 'Maize De-saturation Advisory',
        hi: 'मक्का जलभराव सुधार सलाह',
        pa: 'ਮੱਕੀ ਵਿੱਚੋਂ ਪਾਣੀ ਨਿਕਾਸੀ'
      },
      steps: [
        {
          en: 'De-water within 24 hours without delay.',
          hi: '24 घंटे के अंदर खेत खाली करें।',
          pa: '24 ਘੰਟਿਆਂ ਅੰਦਰ ਪਾਣੀ ਬਾਹਰ ਕੱਢੋ।'
        },
        {
          en: 'Apply foliar spray of 1% Potassium Chloride to support stomatal function.',
          hi: 'पोटैशियम का हल्का छिड़काव करें।',
          pa: 'ਪੋਟਾਸ਼ ਦਾ ਹਲਕਾ ਸਪਰੇਅ ਕਰੋ।'
        }
      ]
    }
  },

  mustard: {
    id: 'mustard',
    name: 'Mustard',
    nativeNames: {
      en: 'Mustard / Rapeseed',
      hi: 'सरसों / राई (Mustard)',
      pa: 'ਸਰ੍ਹੋਂ / ਰਾਇਆ (Mustard)'
    },
    floodTolerance: 'low',
    maxSubmergenceHours: 30,
    stages: [
      {
        stage: 'seedling',
        name: { en: 'Seedling Stage', hi: 'अंकुरण अवस्था', pa: 'ਸ਼ੁਰੂਆਤੀ ਪੜਾਅ' },
        vulnerabilityNotice: {
          en: 'Seedlings damp off and rot within 24 hours of standing water.',
          hi: 'पानी भरने से 24 घंटे में अंकुरित पौधे गल जाते हैं।',
          pa: 'ਪਾਣੀ ਖੜ੍ਹਨ ਨਾਲ ਛੋਟੇ ਬੂਟੇ ਗਲ ਜਾਂਦੇ ਹਨ।'
        }
      }
    ],
    preFloodChecklist: [
      {
        id: 'mst_1',
        category: 'drainage',
        title: 'Clear Field Outlets',
        description: 'Ensure field has sloped drainage to prevent standing ponds.',
        urgency: 'immediate',
        completed: false
      }
    ],
    postFloodRecoveryGuidelines: {
      title: {
        en: 'Mustard Post-Rain Management',
        hi: 'सरसों में जलभराव सुधार',
        pa: 'ਸਰ੍ਹੋਂ ਵਿੱਚ ਪਾਣੀ ਨਿਕਾਸੀ'
      },
      steps: [
        {
          en: 'Drain completely and allow soil surface to dry before applying any chemical.',
          hi: 'पूरा पानी निकालें और जमीन सूखने दें।',
          pa: 'ਪੂਰਾ ਪਾਣੀ ਬਾਹਰ ਕੱਢੋ।'
        }
      ]
    }
  },

  pulses: {
    id: 'pulses',
    name: 'Pulses (Arhar, Gram, Moong)',
    nativeNames: {
      en: 'Pulses (Arhar / Gram / Moong)',
      hi: 'दालें (अरहर / चना / मूंग)',
      pa: 'ਦਾਲਾਂ (ਅਰਹਰ / ਛੋਲੇ / ਮੂੰਗੀ)'
    },
    floodTolerance: 'low',
    maxSubmergenceHours: 24, // Pulses are exceptionally sensitive to root rot
    stages: [
      {
        stage: 'vegetative',
        name: { en: 'Vegetative & Branching', hi: 'बढ़वार की अवस्था', pa: 'ਵਾਧੇ ਦਾ ਸਮਾਂ' },
        vulnerabilityNotice: {
          en: 'Rhizobium nitrogen-fixing nodules die under waterlogged conditions, turning plants yellow.',
          hi: 'पानी भरने से जड़ों की गांठे मर जाती हैं और पौधा पीला पड़कर सूख जाता है।',
          pa: 'ਜੜ੍ਹਾਂ ਵਿਚਲੇ ਨਾਈਟ੍ਰੋਜਨ ਬਣਾਉਣ ਵਾਲੇ ਬੈਕਟੀਰੀਆ ਮਰ ਜਾਂਦੇ ਹਨ।'
        }
      }
    ],
    preFloodChecklist: [
      {
        id: 'pls_1',
        category: 'drainage',
        title: 'Expedite Complete Water Exit',
        description: 'Pulses cannot withstand 24 hours of standing water. Channel all surface runoff away.',
        urgency: 'immediate',
        completed: false
      }
    ],
    postFloodRecoveryGuidelines: {
      title: {
        en: 'Pulse Crop Phytophthora Prevention',
        hi: 'दलहनी फसलों में जड़ सड़न रोकथाम',
        pa: 'ਦਾਲਾਂ ਵਿੱਚ ਜੜ੍ਹ ਗਲਣ ਤੋਂ ਬਚਾਅ'
      },
      steps: [
        {
          en: 'Remove all water instantly.',
          hi: 'तुरंत सारा पानी निकालें।',
          pa: 'ਤੁਰੰਤ ਪਾਣੀ ਬਾਹਰ ਕੱਢੋ।'
        },
        {
          en: 'Spray Metalaxyl + Mancozeb if Phytophthora blight starts appearing on stems.',
          hi: 'तना झुलसा दिखने पर अनुशंसित फफूंदनाशक का छिड़काव करें।',
          pa: 'ਉੱਲੀਨਾਸ਼ਕ ਦਵਾਈ ਦਾ ਸਪਰੇਅ ਕਰੋ।'
        }
      ]
    }
  },

  vegetables: {
    id: 'vegetables',
    name: 'Vegetables (Tomato, Chilli, Onion)',
    nativeNames: {
      en: 'Vegetables (Tomato, Chilli, Onion)',
      hi: 'सब्जियां (टमाटर, मिर्च, प्याज)',
      pa: 'ਸਬਜ਼ੀਆਂ (ਟਮਾਟਰ, ਮਿਰਚ, ਗੰਢੇ)'
    },
    floodTolerance: 'low',
    maxSubmergenceHours: 24,
    stages: [
      {
        stage: 'flowering',
        name: { en: 'Fruiting / Harvest', hi: 'फल व तुड़ाई की अवस्था', pa: 'ਫਲ ਤੇ ਤੁੜਾਈ' },
        vulnerabilityNotice: {
          en: 'Root rotting and fruit cracking occur quickly in standing water.',
          hi: 'पानी खड़े रहने से फल फटने और जड़ें सड़ने लगती हैं।',
          pa: 'ਫਲ ਗਲਣ ਅਤੇ ਜੜ੍ਹਾਂ ਸੜਨ ਲੱਗਦੀਆਂ ਹਨ।'
        }
      }
    ],
    preFloodChecklist: [
      {
        id: 'veg_1',
        category: 'crops',
        title: 'Harvest All Semi-Ripe and Ripe Fruits',
        description: 'Pick tomatoes, chillies, and gourds before rainfall to prevent rot.',
        urgency: 'immediate',
        completed: false
      }
    ],
    postFloodRecoveryGuidelines: {
      title: {
        en: 'Vegetable Field Rehabilitation',
        hi: 'सब्जी की फसलों का सुधार',
        pa: 'ਸਬਜ਼ੀਆਂ ਦੀ ਸਾਂਭ-ਸੰਭਾਲ'
      },
      steps: [
        {
          en: 'Drain trenches immediately and prop fallen staked plants.',
          hi: 'नालियां खोलें और गिरे हुए पौधों को सहारा दें।',
          pa: 'ਖੇਤ ਵਿੱਚੋਂ ਪਾਣੀ ਕੱਢੋ ਅਤੇ ਬੂਟਿਆਂ ਨੂੰ ਸਹਾਰਾ ਦਿਓ।'
        }
      ]
    }
  }
};

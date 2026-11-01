import { EmergencyContact } from '../types';

export const NATIONAL_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-ndrf',
    state: 'ALL',
    agencyName: 'National Disaster Response Force (NDRF) Control Room',
    nativeAgencyName: {
      en: 'National Disaster Response Force (NDRF)',
      hi: 'राष्ट्रीय आपदा मोचन बल (NDRF)',
      pa: 'ਕੌਮੀ ਆਫ਼ਤ ਪ੍ਰਬੰਧਨ ਫ਼ੋਰਸ (NDRF)'
    },
    phone: '011-24363260',
    tollFree: '1078',
    type: 'ndrf',
    hours: '24 Hours / 7 Days a week'
  },
  {
    id: 'em-cwc',
    state: 'ALL',
    agencyName: 'Central Water Commission (CWC) Flood Forecasting Directorate',
    nativeAgencyName: {
      en: 'CWC Flood Control Cell, New Delhi',
      hi: 'केंद्रीय जल आयोग बाढ़ नियंत्रण कक्ष, नई दिल्ली',
      pa: 'ਕੇਂਦਰੀ ਜਲ ਕਮਿਸ਼ਨ ਹੜ੍ਹ ਕੰਟਰੋਲ ਸੈੱਲ'
    },
    phone: '011-26106523',
    tollFree: '1800-11-2266',
    type: 'cwc_flood',
    hours: '24 Hours Monsoon Flood Monitoring'
  },
  {
    id: 'em-112',
    state: 'ALL',
    agencyName: 'National Emergency Response Support System (ERSS)',
    nativeAgencyName: {
      en: 'National Emergency Response Helpline (112)',
      hi: 'राष्ट्रीय आपातकालीन हेल्पलाइन (112)',
      pa: 'ਕੌਮੀ ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨ (112)'
    },
    phone: '112',
    tollFree: '112',
    type: 'ndrf',
    hours: '24 Hours / 7 Days a week (All Emergencies)'
  }
];

export const STATE_EMERGENCY_CONTACTS: EmergencyContact[] = [
  // PUNJAB
  {
    id: 'em-pb-sdma',
    state: 'Punjab',
    agencyName: 'Punjab State Emergency Operation Centre (Disaster Management)',
    nativeAgencyName: {
      en: 'Punjab State Disaster Management Authority',
      hi: 'पंजाब राज्य आपदा प्रबंधन प्राधिकरण',
      pa: 'ਪੰਜਾਬ ਰਾਜ ਆਫ਼ਤ ਪ੍ਰਬੰਧਨ ਅਥਾਰਟੀ (ਚੰਡੀਗੜ੍ਹ)'
    },
    phone: '0172-2740397',
    tollFree: '1070',
    type: 'state_disaster',
    hours: '24 Hours Emergency Desk'
  },
  {
    id: 'em-pb-district',
    state: 'Punjab',
    agencyName: 'District Disaster Control Room (Punjab All Districts)',
    nativeAgencyName: {
      en: 'District Emergency Operations Centre',
      hi: 'जिला आपदा नियंत्रण कक्ष',
      pa: 'ਜ਼ਿਲ੍ਹਾ ਆਫ਼ਤ ਕੰਟਰੋਲ ਰੂਮ'
    },
    phone: '1077',
    tollFree: '1077',
    type: 'district_control',
    hours: '24 Hours (Direct to Deputy Commissioner Office)'
  },
  {
    id: 'em-pb-kvk',
    state: 'Punjab',
    agencyName: 'Punjab Agricultural University (PAU) Farmers Advisory Helpline',
    nativeAgencyName: {
      en: 'PAU Ludhiana Farm Helpline',
      hi: 'पीएयू लुधियाना किसान हेल्पलाइन',
      pa: 'ਪੰਜਾਬ ਖੇਤੀਬਾੜੀ ਯੂਨੀਵਰਸਿਟੀ (PAU) ਲੁਧਿਆਣਾ ਹੈਲਪਲਾਈਨ'
    },
    phone: '0161-2401960',
    type: 'kvk_extension',
    hours: '9:00 AM to 5:00 PM'
  },

  // HARYANA
  {
    id: 'em-hr-sdma',
    state: 'Haryana',
    agencyName: 'Haryana Revenue & Disaster Management Department',
    nativeAgencyName: {
      en: 'Haryana State Emergency Operation Centre',
      hi: 'हरियाणा राज्य आपदा प्रबंधन नियंत्रण कक्ष',
      pa: 'ਹਰਿਆਣਾ ਰਾਜ ਆਫ਼ਤ ਕੰਟਰੋਲ ਰੂਮ'
    },
    phone: '0172-2545938',
    tollFree: '1070',
    type: 'state_disaster',
    hours: '24 Hours'
  },
  {
    id: 'em-hr-hau',
    state: 'Haryana',
    agencyName: 'CCS Haryana Agricultural University (HAU) Toll-Free Agro-Advisory',
    nativeAgencyName: {
      en: 'CCSHAU Hisar Agro Helpline',
      hi: 'चौधरी चरण सिंह हरियाणा कृषि विश्वविद्यालय हिसार हेल्पलाइन',
      pa: 'ਹਰਿਆਣਾ ਖੇਤੀਬਾੜੀ ਯੂਨੀਵਰਸਿਟੀ ਹਿਸਾਰ'
    },
    phone: '1800-180-3001',
    tollFree: '1800-180-3001',
    type: 'kvk_extension',
    hours: '9:00 AM to 5:00 PM'
  },

  // UTTAR PRADESH
  {
    id: 'em-up-rahat',
    state: 'Uttar Pradesh',
    agencyName: 'UP Relief Commissioner Rahat Control Room',
    nativeAgencyName: {
      en: 'UP Relief Commissioner Disaster Control Room',
      hi: 'उत्तर प्रदेश राहत आयुक्त आपदा नियंत्रण कक्ष (लखनऊ)',
      pa: 'ਉੱਤਰ ਪ੍ਰਦੇਸ਼ ਰਾਹਤ ਕਮਿਸ਼ਨਰ ਕੰਟਰੋਲ ਰੂਮ'
    },
    phone: '0522-2238084',
    tollFree: '1070',
    type: 'state_disaster',
    hours: '24 Hours'
  },

  // BIHAR
  {
    id: 'em-br-disaster',
    state: 'Bihar',
    agencyName: 'Bihar Disaster Management Department Control Room',
    nativeAgencyName: {
      en: 'Bihar State Disaster Management Authority (BSDMA)',
      hi: 'बिहार राज्य आपदा प्रबंधन प्राधिकरण (पटना)',
      pa: 'ਬਿਹਾਰ ਰਾਜ ਆਫ਼ਤ ਪ੍ਰਬੰਧਨ'
    },
    phone: '0612-2217310',
    tollFree: '1070',
    type: 'state_disaster',
    hours: '24 Hours'
  },

  // WEST BENGAL
  {
    id: 'em-wb-disaster',
    state: 'West Bengal',
    agencyName: 'West Bengal Department of Disaster Management & Civil Defence',
    nativeAgencyName: {
      en: 'Nabanna State Emergency Operations Centre',
      hi: 'पश्चिम बंगाल आपदा प्रबंधन नियंत्रण कक्ष',
      pa: 'ਪੱਛਮੀ ਬੰਗਾਲ ਆਫ਼ਤ ਕੰਟਰੋਲ ਰੂਮ'
    },
    phone: '033-22143526',
    tollFree: '1070',
    type: 'state_disaster',
    hours: '24 Hours'
  },

  // ASSAM
  {
    id: 'em-as-asdma',
    state: 'Assam',
    agencyName: 'Assam State Disaster Management Authority (ASDMA)',
    nativeAgencyName: {
      en: 'ASDMA 24x7 Flood Control Room',
      hi: 'असम राज्य आपदा प्रबंधन नियंत्रण कक्ष (गुवाहाटी)',
      pa: 'ਅਸਾਮ ਆਫ਼ਤ ਪ੍ਰਬੰਧਨ'
    },
    phone: '0361-2237221',
    tollFree: '1070',
    type: 'state_disaster',
    hours: '24 Hours Flood Response'
  }
];

export function getEmergencyContactsForState(stateName: string): EmergencyContact[] {
  const filtered = STATE_EMERGENCY_CONTACTS.filter(
    (c) => c.state === stateName || c.state === 'ALL'
  );
  return [...NATIONAL_EMERGENCY_CONTACTS, ...filtered];
}

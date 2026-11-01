import { GeoPoint } from '../types';

export const DISTRICT_COORDINATES: Record<string, GeoPoint> = {
  // Punjab
  'Sangrur': { lat: 29.855, lng: 76.015 },
  'Patiala': { lat: 30.340, lng: 76.386 },
  'Rupnagar (Ropar)': { lat: 30.966, lng: 76.533 },
  'Rupnagar': { lat: 30.966, lng: 76.533 },
  'Ropar': { lat: 30.966, lng: 76.533 },
  'Firozpur': { lat: 30.925, lng: 74.612 },
  'Fazilka': { lat: 30.404, lng: 74.028 },
  'Ludhiana': { lat: 30.901, lng: 75.857 },
  'Amritsar': { lat: 31.634, lng: 74.872 },
  'Jalandhar': { lat: 31.326, lng: 75.576 },
  'Gurdaspur': { lat: 32.041, lng: 75.405 },
  'Kapurthala': { lat: 31.380, lng: 75.380 },
  'Mansa': { lat: 29.989, lng: 75.394 },
  'Tarn Taran': { lat: 31.452, lng: 74.925 },
  'Hoshiarpur': { lat: 31.527, lng: 75.911 },
  'Bathinda': { lat: 30.211, lng: 74.945 },
  'Fatehgarh Sahib': { lat: 30.648, lng: 76.398 },
  'Faridkot': { lat: 30.676, lng: 74.758 },
  'Moga': { lat: 30.816, lng: 75.172 },
  'Muktsar': { lat: 30.476, lng: 74.517 },
  'Pathankot': { lat: 32.268, lng: 75.653 },
  'SBS Nagar (Nawanshahr)': { lat: 31.126, lng: 76.120 },
  'SAS Nagar (Mohali)': { lat: 30.704, lng: 76.717 },
  'Malerkotla': { lat: 30.525, lng: 75.890 },
  'Barnala': { lat: 30.382, lng: 75.547 },

  // Haryana
  'Ambala': { lat: 30.378, lng: 76.777 },
  'Kurukshetra': { lat: 29.969, lng: 76.878 },
  'Yamunanagar': { lat: 30.129, lng: 77.267 },
  'Karnal': { lat: 29.686, lng: 76.990 },
  'Kaithal': { lat: 29.801, lng: 76.399 },
  'Panipat': { lat: 29.390, lng: 76.963 },
  'Sonipat': { lat: 28.993, lng: 77.015 },
  'Sirsa': { lat: 29.534, lng: 75.031 },
  'Fatehabad': { lat: 29.514, lng: 75.454 },
  'Panchkula': { lat: 30.694, lng: 76.860 },
  'Palwal': { lat: 28.148, lng: 77.326 },
  'Faridabad': { lat: 28.408, lng: 77.317 },
  'Rohtak': { lat: 28.895, lng: 76.606 },
  'Jhajjar': { lat: 28.607, lng: 76.656 },
  'Hisar': { lat: 29.149, lng: 75.721 },

  // Uttar Pradesh
  'Gorakhpur': { lat: 26.760, lng: 83.373 },
  'Bahraich': { lat: 27.575, lng: 81.597 },
  'Lakhimpur Kheri': { lat: 27.946, lng: 80.778 },
  'Gonda': { lat: 27.130, lng: 81.961 },
  'Balrampur': { lat: 27.430, lng: 82.180 },
  'Barabanki': { lat: 26.927, lng: 81.183 },
  'Basti': { lat: 26.799, lng: 82.753 },
  'Siddharthnagar': { lat: 27.294, lng: 83.097 },
  'Ballia': { lat: 25.758, lng: 84.148 },
  'Varanasi': { lat: 25.317, lng: 82.973 },
  'Prayagraj': { lat: 25.435, lng: 81.846 },
  'Ayodhya': { lat: 26.792, lng: 82.199 },
  'Sitapur': { lat: 27.568, lng: 80.682 },
  'Hardoi': { lat: 27.398, lng: 80.129 },
  'Kanpur Nagar': { lat: 26.449, lng: 80.331 },
  'Meerut': { lat: 28.984, lng: 77.706 },
  'Mathura': { lat: 27.492, lng: 77.673 },
  'Agra': { lat: 27.176, lng: 78.008 },
  'Saharanpur': { lat: 29.967, lng: 77.551 },
  'Moradabad': { lat: 28.838, lng: 78.773 },
  'Aligarh': { lat: 27.897, lng: 78.088 },
  'Bareilly': { lat: 28.367, lng: 79.430 },
  'Unnao': { lat: 26.545, lng: 80.487 },

  // Bihar
  'Supaul': { lat: 26.126, lng: 86.595 },
  'Patna': { lat: 25.594, lng: 85.137 },
  'Darbhanga': { lat: 26.154, lng: 85.891 },
  'Muzaffarpur': { lat: 26.120, lng: 85.364 },
  'Samastipur': { lat: 25.862, lng: 85.781 },
  'Madhubani': { lat: 26.354, lng: 86.072 },
  'Sitamarhi': { lat: 26.593, lng: 85.489 },
  'Saharsa': { lat: 25.883, lng: 86.600 },
  'Madhepura': { lat: 25.926, lng: 86.794 },
  'Katihar': { lat: 25.543, lng: 87.565 },
  'Purnia': { lat: 25.777, lng: 87.475 },
  'Khagaria': { lat: 25.503, lng: 86.471 },
  'Bhagalpur': { lat: 25.242, lng: 86.984 },
  'Begusarai': { lat: 25.418, lng: 86.130 },
  'Vaishali': { lat: 25.990, lng: 85.127 },
  'East Champaran (Motihari)': { lat: 26.647, lng: 84.908 },
  'West Champaran (Bettiah)': { lat: 26.802, lng: 84.502 },
  'Saran (Chhapra)': { lat: 25.779, lng: 84.749 },
  'Siwan': { lat: 26.222, lng: 84.356 },
  'Gopalganj': { lat: 26.468, lng: 84.444 },

  // West Bengal
  'Malda': { lat: 25.000, lng: 88.140 },
  'Murshidabad': { lat: 24.180, lng: 88.270 },
  'Jalpaiguri': { lat: 26.540, lng: 88.720 },
  'Cooch Behar': { lat: 26.320, lng: 89.450 },
  'Alipurduar': { lat: 26.490, lng: 89.520 },
  'Uttar Dinajpur': { lat: 25.620, lng: 88.120 },
  'Dakshin Dinajpur': { lat: 25.220, lng: 88.760 },
  'Howrah': { lat: 22.595, lng: 88.263 },
  'Hooghly': { lat: 22.900, lng: 88.390 },
  'Purba Medinipur': { lat: 21.930, lng: 87.770 },
  'Paschim Medinipur': { lat: 22.420, lng: 87.320 },
  'North 24 Parganas': { lat: 22.720, lng: 88.480 },
  'South 24 Parganas': { lat: 22.180, lng: 88.540 },
  'Nadia': { lat: 23.470, lng: 88.550 },

  // Assam
  'Jorhat': { lat: 26.750, lng: 94.216 },
  'Dhubri': { lat: 26.020, lng: 89.980 },
  'Barpeta': { lat: 26.320, lng: 91.000 },
  'Darrang': { lat: 26.450, lng: 92.030 },
  'Morigaon': { lat: 26.250, lng: 92.340 },
  'Nagaon': { lat: 26.350, lng: 92.680 },
  'Golaghat': { lat: 26.520, lng: 93.960 },
  'Sivasagar': { lat: 26.980, lng: 94.630 },
  'Dibrugarh': { lat: 27.472, lng: 94.912 },
  'Tinsukia': { lat: 27.500, lng: 95.360 },
  'Lakhimpur': { lat: 27.230, lng: 94.100 },
  'Dhemaji': { lat: 27.480, lng: 94.580 },
  'Kamrup Rural': { lat: 26.310, lng: 91.590 },
  'Cachar': { lat: 24.830, lng: 92.770 },
  'Karimganj': { lat: 24.870, lng: 92.360 },

  // Maharashtra
  'Kolhapur': { lat: 16.705, lng: 74.243 },
  'Sangli': { lat: 16.852, lng: 74.581 },
  'Satara': { lat: 17.680, lng: 73.990 },
  'Solapur': { lat: 17.659, lng: 75.906 },
  'Pune': { lat: 18.520, lng: 73.856 },
  'Nashik': { lat: 19.997, lng: 73.789 },
  'Nanded': { lat: 19.138, lng: 77.321 },
  'Raigad': { lat: 18.515, lng: 73.181 },
  'Ratnagiri': { lat: 16.990, lng: 73.300 },
  'Sindhudurg': { lat: 16.110, lng: 73.700 },
  'Thane': { lat: 19.218, lng: 72.978 },
  'Nagpur': { lat: 21.145, lng: 79.088 },
  'Chandrapur': { lat: 19.961, lng: 79.296 },
  'Gadchiroli': { lat: 20.184, lng: 80.003 },

  // Gujarat
  'Surat': { lat: 21.170, lng: 72.831 },
  'Bharuch': { lat: 21.705, lng: 72.995 },
  'Navsari': { lat: 20.946, lng: 72.952 },
  'Valsad': { lat: 20.599, lng: 72.934 },
  'Vadodara': { lat: 22.307, lng: 73.181 },
  'Ahmedabad': { lat: 23.022, lng: 72.571 },
  'Kheda': { lat: 22.754, lng: 72.684 },
  'Anand': { lat: 22.564, lng: 72.928 },
  'Junagadh': { lat: 21.522, lng: 70.457 },
  'Amreli': { lat: 21.603, lng: 71.222 },
  'Bhavnagar': { lat: 21.764, lng: 72.151 },
  'Kutch': { lat: 23.242, lng: 69.666 },

  // Rajasthan
  'Ganganagar': { lat: 29.903, lng: 73.877 },
  'Hanumangarh': { lat: 29.581, lng: 74.329 },
  'Kota': { lat: 25.213, lng: 75.864 },
  'Baran': { lat: 25.101, lng: 76.513 },
  'Jhalawar': { lat: 24.597, lng: 76.161 },
  'Bundi': { lat: 25.441, lng: 75.642 },
  'Sawai Madhopur': { lat: 25.992, lng: 76.353 },
  'Dholpur': { lat: 26.702, lng: 77.893 },
  'Bharatpur': { lat: 27.215, lng: 77.503 },
  'Jalore': { lat: 25.344, lng: 72.615 },
  'Pali': { lat: 25.771, lng: 73.323 },
  'Barmer': { lat: 25.753, lng: 71.396 },

  // Uttarakhand
  'Haridwar': { lat: 29.945, lng: 78.164 },
  'Dehradun': { lat: 30.316, lng: 78.032 },
  'Udham Singh Nagar': { lat: 28.980, lng: 79.400 },
  'Nainital': { lat: 29.391, lng: 79.454 },
  'Uttarkashi': { lat: 30.726, lng: 78.435 },
  'Chamoli': { lat: 30.422, lng: 79.338 },
  'Rudraprayag': { lat: 30.284, lng: 78.981 },
  'Tehri Garhwal': { lat: 30.380, lng: 78.480 },
  'Pauri Garhwal': { lat: 30.150, lng: 78.780 },
  'Pithoragarh': { lat: 29.582, lng: 80.218 }
};

/**
 * Resolves latitude and longitude for any Indian district name,
 * with case-insensitive and partial matching fallbacks.
 */
export function getDistrictCoordinates(districtName?: string, stateName?: string): GeoPoint {
  if (!districtName) {
    return { lat: 29.855, lng: 76.015 }; // Default Sangrur, Punjab
  }

  const clean = districtName.trim();
  if (DISTRICT_COORDINATES[clean]) {
    return DISTRICT_COORDINATES[clean];
  }

  // Case-insensitive lookup
  const lower = clean.toLowerCase();
  for (const [key, pt] of Object.entries(DISTRICT_COORDINATES)) {
    if (key.toLowerCase() === lower) {
      return pt;
    }
  }

  // Partial substring matching (e.g. "Ropar" in "Rupnagar (Ropar)", "Champaran")
  for (const [key, pt] of Object.entries(DISTRICT_COORDINATES)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return pt;
    }
  }

  // State-level fallbacks if available
  if (stateName) {
    const stateLower = stateName.toLowerCase();
    if (stateLower.includes('punjab')) return { lat: 30.340, lng: 76.386 };
    if (stateLower.includes('haryana')) return { lat: 29.686, lng: 76.990 };
    if (stateLower.includes('uttar')) return { lat: 26.760, lng: 83.373 };
    if (stateLower.includes('bihar')) return { lat: 25.594, lng: 85.137 };
    if (stateLower.includes('bengal')) return { lat: 24.180, lng: 88.270 };
    if (stateLower.includes('assam')) return { lat: 26.750, lng: 94.216 };
    if (stateLower.includes('maharashtra')) return { lat: 16.705, lng: 74.243 };
    if (stateLower.includes('gujarat')) return { lat: 21.170, lng: 72.831 };
    if (stateLower.includes('rajasthan')) return { lat: 29.903, lng: 73.877 };
    if (stateLower.includes('uttarakhand')) return { lat: 30.316, lng: 78.032 };
  }

  return { lat: 29.855, lng: 76.015 };
}

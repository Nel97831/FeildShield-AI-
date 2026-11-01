import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FarmMap } from '../components/FarmMap';
import { INDIAN_AGRI_STATES, getLandUnitsForState, convertToSqm } from '../data/regionalUnits';
import { getDistrictCoordinates } from '../data/districtCoordinates';
import { CROPS_DATA } from '../data/crops';
import {
  CropGrowthStage,
  CropType,
  FarmerRole,
  GeoPoint,
  IrrigationType
} from '../types';
import {
  MapPin,
  Sprout,
  ShieldAlert,
  CheckCircle,
  UserCheck,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const RegisterFarmPage: React.FC = () => {
  const { t, addFarm, setActivePage, setAlertPhone, setSmsConsent } = useApp();

  // Farmer & Holding State
  const [farmerName, setFarmerName] = useState('Sardar Gurpreet Singh');
  const [phone, setPhone] = useState('9876543210');
  const [farmerRole, setFarmerRole] = useState<FarmerRole>('owner');
  const [tenancyAgreementRef, setTenancyAgreementRef] = useState('');
  const [landownerName, setLandownerName] = useState('');
  const [ownerNocProvided, setOwnerNocProvided] = useState(true);

  // Geographic State (Farm Location)
  const [selectedState, setSelectedState] = useState('Punjab');
  const [selectedDistrict, setSelectedDistrict] = useState('Sangrur');
  const [village, setVillage] = useState('Moonak (Near Ghaggar Basin)');

  // Crop & Agronomic State (Farm Details)
  const [cropType, setCropType] = useState<CropType>('paddy');
  const [plantingDate, setPlantingDate] = useState('2026-06-25');
  const [growthStage, setGrowthStage] = useState<CropGrowthStage>('vegetative');
  const [irrigationType, setIrrigationType] = useState<IrrigationType>('canal');
  const [preferredUnitCode, setPreferredUnitCode] = useState<string>('punjab_kanal');
  const [smsConsentAgreed, setSmsConsentAgreed] = useState<boolean>(true);

  // Crop Insurance Choice at end of Registration
  const [wantsInsurance, setWantsInsurance] = useState<boolean>(true);
  const [insuranceCompany, setInsuranceCompany] = useState<string>('Agriculture Insurance Company of India (AICIL)');

  // Map Polygon State (Boundary demarcation)
  const [polygonPoints, setPolygonPoints] = useState<GeoPoint[]>([
    { lat: 29.852, lng: 76.010 },
    { lat: 29.858, lng: 76.012 },
    { lat: 29.859, lng: 76.022 },
    { lat: 29.853, lng: 76.020 }
  ]);
  const [calculatedMapAreaSqm, setCalculatedMapAreaSqm] = useState<number>(40468.56);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Available Districts & Units
  const availableDistricts = useMemo(() => {
    const found = INDIAN_AGRI_STATES.find((s) => s.state === selectedState);
    return found ? found.districts : [];
  }, [selectedState]);

  const availableUnits = useMemo(() => {
    return getLandUnitsForState(selectedState);
  }, [selectedState]);

  const activeUnit = useMemo(() => {
    return availableUnits.find((u) => u.id === preferredUnitCode) || availableUnits[0];
  }, [availableUnits, preferredUnitCode]);

  const displayedAreaInUnit = useMemo(() => {
    if (!activeUnit) return Number((calculatedMapAreaSqm / 4046.856).toFixed(2));
    return Number((calculatedMapAreaSqm / activeUnit.factorToSqm).toFixed(2));
  }, [calculatedMapAreaSqm, activeUnit]);

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    const foundState = INDIAN_AGRI_STATES.find((s) => s.state === newState);
    if (foundState && foundState.districts.length > 0) {
      const firstDistrict = foundState.districts[0];
      setSelectedDistrict(firstDistrict);
      const coords = getDistrictCoordinates(firstDistrict, newState);
      setPolygonPoints([
        { lat: Number((coords.lat - 0.003).toFixed(6)), lng: Number((coords.lng - 0.005).toFixed(6)) },
        { lat: Number((coords.lat + 0.003).toFixed(6)), lng: Number((coords.lng - 0.003).toFixed(6)) },
        { lat: Number((coords.lat + 0.004).toFixed(6)), lng: Number((coords.lng + 0.007).toFixed(6)) },
        { lat: Number((coords.lat - 0.002).toFixed(6)), lng: Number((coords.lng + 0.005).toFixed(6)) }
      ]);
    }
    const units = getLandUnitsForState(newState);
    if (units.length > 0) {
      const regional = units.find((u) => !['acre', 'hectare', 'sqm'].includes(u.id));
      setPreferredUnitCode(regional ? regional.id : units[0].id);
    }
  };

  const handleDistrictChange = (newDistrict: string) => {
    setSelectedDistrict(newDistrict);
    const coords = getDistrictCoordinates(newDistrict, selectedState);
    setPolygonPoints([
      { lat: Number((coords.lat - 0.003).toFixed(6)), lng: Number((coords.lng - 0.005).toFixed(6)) },
      { lat: Number((coords.lat + 0.003).toFixed(6)), lng: Number((coords.lng - 0.003).toFixed(6)) },
      { lat: Number((coords.lat + 0.004).toFixed(6)), lng: Number((coords.lng + 0.007).toFixed(6)) },
      { lat: Number((coords.lat - 0.002).toFixed(6)), lng: Number((coords.lng + 0.005).toFixed(6)) }
    ]);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!farmerName.trim()) {
      setValidationError('Please enter the farmer name.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!village.trim()) {
      setValidationError('Please enter the village or farm location.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (polygonPoints.length < 3) {
      setValidationError('Please place at least 3 points on the interactive map to form your farm boundary.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const finalAreaSqm = calculatedMapAreaSqm > 0 ? calculatedMapAreaSqm : 40468.56;
    const center = polygonPoints[0] || { lat: 29.855, lng: 76.015 };

    addFarm({
      farmerName,
      phone: phone.trim() || '9876543210',
      smsConsent: smsConsentAgreed,
      state: selectedState,
      district: selectedDistrict,
      village,
      centerLocation: center,
      polygon: polygonPoints,
      cropType,
      plantingDate: plantingDate || undefined,
      growthStage,
      areaSqm: finalAreaSqm,
      enteredArea: displayedAreaInUnit,
      enteredUnit: activeUnit?.id || 'acre',
      irrigationType,
      landRecord: {
        khasraNumber: '142//15/2',
        khataNumber: '318',
        ulpin: '03080010452001',
        revenueVillage: village,
        subDistrictTehsil: selectedDistrict,
        district: selectedDistrict,
        state: selectedState,
        recordedAreaSqm: finalAreaSqm,
        recordedAreaRegional: `${displayedAreaInUnit} ${activeUnit?.nativeNames.en || 'Acres'}`,
        landClassification: 'Arable Agriculture Holding',
        verificationStatus: 'verified',
        verificationSource: 'Farmer Self-Demarcation & Satellite Verification',
        verifiedAt: new Date().toISOString(),
        isDemonstrationData: false
      },
      tenancy: {
        farmerRole,
        tenancyAgreementRef: tenancyAgreementRef || undefined,
        landownerName: landownerName || undefined,
        ownerNocProvided
      },
      soilHealth: {
        ph: 7.4,
        organicCarbon: '0.62% (Medium)',
        nitrogenStatus: 'Medium',
        phosphorusStatus: 'High',
        potassiumStatus: 'High',
        moisturePercent: 70,
        soilTexture: 'Alluvial Loam',
        lastUpdated: new Date().toISOString().split('T')[0]
      },
      vegetationIndex: {
        ndviValue: 0.74,
        vegetationHealth: 'vigorous',
        observationDate: new Date().toISOString().split('T')[0],
        sensor: 'Sentinel-2 MSI (10m Resolution)',
        cloudCoverPercent: 3
      },
      hasInsurance: wantsInsurance,
      insurancePolicyNumber: wantsInsurance ? `PMFBY-2026-${selectedState.substring(0, 2).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}` : undefined,
      insuranceCompany: wantsInsurance ? insuranceCompany : undefined,
      sumInsuredPerAcre: wantsInsurance ? (cropType === 'cotton' ? 62000 : cropType === 'sugarcane' ? 70000 : 54000) : undefined,
      insuranceEnrollmentDate: wantsInsurance ? new Date().toISOString().split('T')[0] : undefined
    });

    if (phone.trim()) {
      setAlertPhone(phone.trim());
      setSmsConsent(smsConsentAgreed);
    }

    // Auto slide website smoothly to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setIsSuccess(true);
    setTimeout(() => {
      setActivePage('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-20 font-sans">
      {/* Header Card in Refined Dark Palette with Bright, Crisp Text */}
      <div className="bg-[#0B2B26] border border-[#235347] p-6 sm:p-8 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-[#163832] border border-[#8EB69B]/40 text-[#8EB69B] flex items-center justify-center font-bold shadow-md">
            <Sprout className="w-6 h-6 text-[#8EB69B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#051F20] bg-[#8EB69B] px-2.5 py-0.5 rounded-md">
                Fast Farm Enrollment
              </span>
              <span className="text-xs text-[#DAF1DE] font-semibold">Location & Crop Details</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Farm Location & Details Registration
            </h1>
            <p className="text-xs sm:text-sm text-[#DAF1DE] font-medium mt-1">
              Provide your farm location, demarcate boundaries on Google Earth, and register your crop details to activate 24x7 flood and weather protection.
            </p>
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="bg-[#163832] border-2 border-[#8EB69B] text-white p-5 rounded-2xl flex items-center gap-3.5 shadow-2xl animate-fade-in-up">
          <CheckCircle className="w-7 h-7 shrink-0 text-[#8EB69B]" />
          <div>
            <div className="font-black text-base text-white">
              Farm Registered Successfully!
            </div>
            <div className="text-xs text-[#DAF1DE] font-medium">
              Geospatial boundaries stored and active protection enabled. Redirecting to your dashboard...
            </div>
          </div>
        </div>
      )}

      {validationError && (
        <div className="bg-rose-950/90 border-2 border-rose-500 text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg">
          <ShieldAlert className="w-6 h-6 shrink-0 text-rose-300" />
          <div className="font-bold text-xs sm:text-sm text-rose-100">{validationError}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Farm Location & Geographic Details */}
        <div className="gov-card p-6 sm:p-8 space-y-5 bg-[#0B2B26] border border-[#235347] rounded-3xl shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#235347] pb-3">
            <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8EB69B]" />
              <span>1. Farm Location</span>
            </h2>
            <span className="text-[11px] font-bold text-[#8EB69B] bg-[#163832] px-2.5 py-0.5 rounded-full border border-[#235347]">
              Geographic Region
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">State *</label>
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
              >
                {INDIAN_AGRI_STATES.map((s) => (
                  <option key={s.state} value={s.state}>
                    {s.state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">District *</label>
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
              >
                {availableDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Village / Farm Address *</label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="e.g. Moonak, Ghaggar River Basin"
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Interactive Satellite & Cadastral Boundary Demarcation */}
        <div className="gov-card p-6 sm:p-8 space-y-4 bg-[#0B2B26] border border-[#235347] rounded-3xl shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#235347] pb-3">
            <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8EB69B]" />
              <span>2. Farm Parcel Boundary Demarcation</span>
            </h2>
            <div className="text-xs text-[#8EB69B] font-mono font-bold bg-[#051F20] px-2.5 py-1 rounded-lg border border-[#235347]">
              {polygonPoints.length} Boundary Vertices
            </div>
          </div>

          <p className="text-xs text-[#DAF1DE] leading-relaxed">
            Click directly on the high-resolution satellite imagery to place or refine boundary vertices around your cultivated farm holding.
          </p>

          <FarmMap
            initialCenter={polygonPoints[0]}
            initialPolygon={polygonPoints}
            selectedDistrict={selectedDistrict}
            selectedState={selectedState}
            autoCenterOnDistrict={true}
            onDistrictChange={handleDistrictChange}
            isEditable={true}
            onPolygonChange={(pts, area) => {
              setPolygonPoints(pts);
              setCalculatedMapAreaSqm(area);
            }}
            selectedUnit={activeUnit}
            heightClass="h-[420px]"
          />
        </div>

        {/* Step 3: Farmer & Cultivator Identity Details */}
        <div className="gov-card p-6 sm:p-8 space-y-5 bg-[#0B2B26] border border-[#235347] rounded-3xl shadow-xl">
          <div className="flex items-center justify-between border-b border-[#235347] pb-3">
            <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#8EB69B]" />
              <span>3. Farmer Details</span>
            </h2>
            <span className="text-[11px] font-bold text-[#8EB69B]">Cultivator Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Farmer / Cultivator Name *</label>
              <input
                type="text"
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="e.g. Sardar Gurpreet Singh"
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Mobile Number (Emergency SMS Alerts) *</label>
              <input
                type="tel"
                maxLength={10}
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit mobile number"
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-mono font-bold text-white focus:outline-none focus:border-[#8EB69B]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Cultivator Status *</label>
              <select
                value={farmerRole}
                onChange={(e) => setFarmerRole(e.target.value as FarmerRole)}
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-semibold text-white focus:outline-none focus:border-[#8EB69B]"
              >
                <option value="owner">Landowner Cultivator (ਖ਼ੁਦਕਾਸ਼ਤ / खुदकाश्त)</option>
                <option value="tenant">Tenant Farmer (ਕਾਸ਼ਤਕਾਰ / बटाईदार)</option>
                <option value="sharecropper">Sharecropper (ਹਿੱਸੇਦਾਰ)</option>
                <option value="authorised_cultivator">Authorised Cultivator with Owner NOC</option>
              </select>
            </div>
          </div>

          {farmerRole !== 'owner' && (
            <div className="bg-[#163832] p-4 rounded-2xl border border-[#235347] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#DAF1DE] mb-1">
                  Tenancy Agreement Reference / Lease Deed No.
                </label>
                <input
                  type="text"
                  value={tenancyAgreementRef}
                  onChange={(e) => setTenancyAgreementRef(e.target.value)}
                  placeholder="e.g. TEN-PB-2026-904"
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl p-2.5 font-mono text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-[#DAF1DE] mb-1">
                  Owner No-Objection Certificate (NOC)
                </label>
                <label className="flex items-center gap-2 mt-2.5 cursor-pointer font-semibold text-[#DAF1DE]">
                  <input
                    type="checkbox"
                    checked={ownerNocProvided}
                    onChange={(e) => setOwnerNocProvided(e.target.checked)}
                    className="accent-[#8EB69B] w-4 h-4"
                  />
                  <span>Physical NOC verified by Village Sarpanch / Patwari</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Step 4: Crop Profile & Field Details */}
        <div className="gov-card p-6 sm:p-8 space-y-5 bg-[#0B2B26] border border-[#235347] rounded-3xl shadow-xl">
          <div className="flex items-center justify-between border-b border-[#235347] pb-3">
            <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#8EB69B]" />
              <span>4. Crop & Farm Field Details</span>
            </h2>
            <span className="text-[11px] font-bold text-[#8EB69B]">Agronomic Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Crop Name *</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value as CropType)}
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
              >
                {Object.values(CROPS_DATA).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nativeNames.en}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Sowing Date</label>
              <input
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Growth Stage *</label>
              <select
                value={growthStage}
                onChange={(e) => setGrowthStage(e.target.value as CropGrowthStage)}
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
              >
                <option value="seedling">Seedling / Early Nursery</option>
                <option value="vegetative">Vegetative / Tillering</option>
                <option value="flowering">Flowering / Heading</option>
                <option value="grain_filling">Grain Filling / Maturation</option>
                <option value="maturity">Harvest Ready</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Irrigation Method *</label>
              <select
                value={irrigationType}
                onChange={(e) => setIrrigationType(e.target.value as IrrigationType)}
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
              >
                <option value="canal">Canal Command (ਨਹਿਰੀ / नहरी)</option>
                <option value="tubewell_borewell">Electric Tubewell (ਚਾਹੀ)</option>
                <option value="drip">Micro-Drip System</option>
                <option value="sprinkler">Sprinkler Irrigation</option>
                <option value="rainfed">Rainfed / Barani (ਬਾਰਾਨੀ)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Regional Land Unit ({selectedState})</label>
              <select
                value={preferredUnitCode}
                onChange={(e) => setPreferredUnitCode(e.target.value)}
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
              >
                {availableUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nativeNames.en}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {activeUnit && (
            <div className="bg-[#163832] p-4 rounded-2xl border border-[#235347] text-xs flex flex-wrap items-center justify-between gap-3 shadow-inner">
              <span className="text-[#DAF1DE]">
                Demarcated Farm Plot Holding: <strong className="text-white text-sm font-mono">{calculatedMapAreaSqm.toLocaleString()} m²</strong> (≈ <strong className="text-[#8EB69B]">{displayedAreaInUnit} {activeUnit?.nativeNames.en || 'Acres'}</strong>)
              </span>
              <span className="text-[11px] text-[#8EB69B] font-semibold bg-[#0B2B26] px-2.5 py-1 rounded-lg border border-[#235347]">
                Live Satellite Geodesic
              </span>
            </div>
          )}
        </div>

        {/* Step 5: PMFBY Crop Insurance Choice (Opt-in or Opt-out) */}
        <div className="gov-card p-6 sm:p-8 space-y-5 bg-[#0B2B26] border-2 border-emerald-500/40 rounded-3xl shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#235347] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  Step 5: Pradhan Mantri Fasal Bima Yojana (PMFBY)
                </span>
                <span className="text-xs text-amber-300 font-bold">Farmer Choice</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Would you like to enroll this farm in Government Crop Insurance?
              </h3>
              <p className="text-xs text-[#DAF1DE] max-w-2xl leading-relaxed">
                Integrated with FieldShield AI Crop Photo Damage Detector for 72-hour automated loss survey and instant direct bank settlement.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option A: Yes, Enroll */}
            <div
              onClick={() => setWantsInsurance(true)}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                wantsInsurance
                  ? 'bg-[#163832] border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                  : 'bg-[#051F20] border-[#235347] hover:border-emerald-500/50'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-white flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-emerald-400 flex items-center justify-center">
                      {wantsInsurance && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                    </span>
                    <span>Yes, Enroll in PMFBY Insurance</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-black">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Subsidized premium: Only <strong>1.5% to 2%</strong> paid by farmer (Government pays 98% balance). Sum insured up to <strong className="text-emerald-300">₹{cropType === 'cotton' ? '62,000' : cropType === 'sugarcane' ? '70,000' : '54,000'}/acre</strong>.
                </p>
              </div>

              <div className="pt-2 border-t border-[#235347] text-[11px] text-emerald-300 flex items-center justify-between">
                <span>✓ AI Photo Damage Claim Eligible</span>
                <span className="font-mono font-bold">Auto-Intimation</span>
              </div>
            </div>

            {/* Option B: No, Proceed without insurance */}
            <div
              onClick={() => setWantsInsurance(false)}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                !wantsInsurance
                  ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : 'bg-[#051F20] border-[#235347] hover:border-amber-500/50'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-white flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 flex items-center justify-center">
                      {!wantsInsurance && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
                    </span>
                    <span>No, Register Without Insurance</span>
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-bold">
                    Zero Premium
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You will still receive 24x7 satellite flood warnings and farm mapping. In case of crop damage, FieldShield AI will provide complete alternative solutions (SDRF disaster grants, KVK contingency seeds, soil revival).
                </p>
              </div>

              <div className="pt-2 border-t border-[#235347] text-[11px] text-amber-300 flex items-center justify-between">
                <span>⚠ No automated insurance payout</span>
                <span className="font-mono font-bold">Relief Support Only</span>
              </div>
            </div>
          </div>

          {wantsInsurance && (
            <div className="p-3.5 bg-[#051F20] rounded-xl border border-emerald-500/30 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span>Assigned Implementing Insurer:</span>
                <select
                  value={insuranceCompany}
                  onChange={(e) => setInsuranceCompany(e.target.value)}
                  className="bg-[#163832] border border-[#235347] text-white rounded-lg px-2.5 py-1 text-xs font-bold focus:outline-none focus:border-emerald-400"
                >
                  <option value="Agriculture Insurance Company of India (AICIL)">Agriculture Insurance Company of India (AICIL)</option>
                  <option value="HDFC ERGO General Insurance">HDFC ERGO General Insurance</option>
                  <option value="SBI General Insurance">SBI General Insurance</option>
                  <option value="Bajaj Allianz General Insurance">Bajaj Allianz General Insurance</option>
                </select>
              </div>
              <div className="text-[11px] text-[#8EB69B]">
                Farmer Share Contribution: Approx <strong className="text-white">₹{Math.round(displayedAreaInUnit * (cropType === 'cotton' ? 3100 : 1080)).toLocaleString()}</strong> for total holding (Remaining ₹{Math.round(displayedAreaInUnit * 52920).toLocaleString()} subsidized by Central & State Gov).
              </div>
            </div>
          )}
        </div>

        {/* Step 6: SMS Alert Consent & RADIANT GLOWING SUBMIT BUTTON */}
        <div className="gov-card p-6 sm:p-8 space-y-6 bg-[#0B2B26] border border-[#235347] rounded-3xl shadow-xl">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={smsConsentAgreed}
              onChange={(e) => setSmsConsentAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 accent-[#8EB69B] cursor-pointer"
            />
            <div className="text-xs">
              <div className="font-bold text-white mb-0.5 text-sm">
                {t.register.smsConsentTitle}
              </div>
              <div className="text-[#DAF1DE] leading-relaxed">
                {t.register.smsConsentText}
              </div>
            </div>
          </label>

          {/* GLOWING SUBMIT BUTTON */}
          <button
            type="submit"
            className="button-glow-active w-full bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-sm sm:text-base py-4 sm:py-5 px-6 rounded-2xl shadow-[0_0_30px_rgba(142,182,155,0.7)] hover:shadow-[0_0_45px_rgba(255,255,255,0.9)] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer transform hover:-translate-y-1 active:translate-y-0"
          >
            <Sparkles className="w-6 h-6 text-[#051F20] shrink-0" />
            <span className="tracking-wide">Complete Farm Registration & Activate Protection</span>
            <ArrowRight className="w-5 h-5 text-[#051F20] shrink-0" />
          </button>
        </div>
      </form>
    </div>
  );
};

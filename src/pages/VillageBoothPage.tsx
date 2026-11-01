import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA } from '../data/crops';
import { INDIAN_AGRI_STATES, getLandUnitsForState, convertToSqm } from '../data/regionalUnits';
import { getDistrictCoordinates } from '../data/districtCoordinates';
import { CropType, CropGrowthStage, FarmerRole, IrrigationType } from '../types';
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  ShieldAlert,
  FileText,
  Printer,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Info,
  Sprout,
  Layers,
  Map
} from 'lucide-react';

export const VillageBoothPage: React.FC = () => {
  const {
    farms,
    activeFarm,
    addFarm,
    setActiveFarmId,
    setActivePage,
    cropLossClaims,
    addCropLossClaim
  } = useApp();

  const [activeTab, setActiveTab] = useState<'register_farmer' | 'incident_log' | 'active_queue'>('register_farmer');

  // Quick Registration Form State (Operator Assisted)
  const [farmerName, setFarmerName] = useState('Balwinder Singh');
  const [farmerPhone, setFarmerPhone] = useState('9814012345');
  const [farmerRole, setFarmerRole] = useState<FarmerRole>('owner');
  const [selectedState, setSelectedState] = useState('Punjab');
  const [selectedDistrict, setSelectedDistrict] = useState('Sangrur');
  const [village, setVillage] = useState('Moonak');
  const [selectedCrop, setSelectedCrop] = useState<CropType>('paddy');
  const [cropVariety, setCropVariety] = useState('PR-126');
  const [sowingDate, setSowingDate] = useState('2026-06-25');
  const [growthStage, setGrowthStage] = useState<CropGrowthStage>('vegetative');
  const [irrigationType, setIrrigationType] = useState<IrrigationType>('canal');
  const [enteredArea, setEnteredArea] = useState<number>(40);
  const [preferredUnitCode, setPreferredUnitCode] = useState<string>('punjab_kanal');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Calamity & Damage Intimation State
  const [selectedFarmIdForClaim, setSelectedFarmIdForClaim] = useState<string>(activeFarm?.id || (farms[0]?.id ?? ''));
  const [claimCause, setClaimCause] = useState('Inundation & waterlogging from heavy rainfall & canal overflow');
  const [estimatedLoss, setEstimatedLoss] = useState(55);
  const [lossDate, setLossDate] = useState(new Date().toISOString().split('T')[0]);
  const [claimNotes, setClaimNotes] = useState('Submergence observed for >48h. Crop lodging in low-lying parcel.');
  const [claimSuccessDocket, setClaimSuccessDocket] = useState<string | null>(null);

  const availableDistricts = React.useMemo(() => {
    const found = INDIAN_AGRI_STATES.find((s) => s.state === selectedState);
    return found ? found.districts : [];
  }, [selectedState]);

  const availableUnits = React.useMemo(() => {
    return getLandUnitsForState(selectedState);
  }, [selectedState]);

  const activeUnit = React.useMemo(() => {
    return availableUnits.find((u) => u.id === preferredUnitCode) || availableUnits[0];
  }, [availableUnits, preferredUnitCode]);

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    const foundState = INDIAN_AGRI_STATES.find((s) => s.state === newState);
    if (foundState && foundState.districts.length > 0) {
      setSelectedDistrict(foundState.districts[0]);
    }
    const units = getLandUnitsForState(newState);
    if (units.length > 0) {
      const regional = units.find((u) => !['acre', 'hectare', 'sqm'].includes(u.id));
      setPreferredUnitCode(regional ? regional.id : units[0].id);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!farmerName.trim()) {
      alert('Please enter farmer name');
      return;
    }

    const coords = getDistrictCoordinates(selectedDistrict, selectedState);
    const poly = [
      { lat: Number((coords.lat - 0.003).toFixed(6)), lng: Number((coords.lng - 0.005).toFixed(6)) },
      { lat: Number((coords.lat + 0.003).toFixed(6)), lng: Number((coords.lng - 0.003).toFixed(6)) },
      { lat: Number((coords.lat + 0.004).toFixed(6)), lng: Number((coords.lng + 0.007).toFixed(6)) },
      { lat: Number((coords.lat - 0.002).toFixed(6)), lng: Number((coords.lng + 0.005).toFixed(6)) }
    ];

    const areaSqm = activeUnit ? convertToSqm(enteredArea, activeUnit.id) : 40468;

    const newFarm = addFarm({
      farmerName,
      phone: farmerPhone,
      smsConsent: true,
      state: selectedState,
      district: selectedDistrict,
      village,
      centerLocation: poly[0],
      polygon: poly,
      cropType: selectedCrop,
      cropVariety,
      plantingDate: sowingDate,
      growthStage,
      areaSqm,
      enteredArea,
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
        recordedAreaSqm: areaSqm,
        recordedAreaRegional: `${enteredArea} ${activeUnit?.nativeNames.en || 'Acres'}`,
        landClassification: 'Arable Agriculture Holding',
        verificationStatus: 'verified',
        verificationSource: 'Village Assistance Booth Operator Desk',
        verifiedAt: new Date().toISOString(),
        isDemonstrationData: false
      },
      tenancy: {
        farmerRole,
        ownerNocProvided: true
      },
      soilHealth: {
        ph: 7.3,
        organicCarbon: '0.64% (Medium)',
        nitrogenStatus: 'Medium',
        phosphorusStatus: 'High',
        potassiumStatus: 'High',
        moisturePercent: 68,
        soilTexture: 'Alluvial Loam',
        lastUpdated: new Date().toISOString().split('T')[0]
      },
      vegetationIndex: {
        ndviValue: 0.76,
        vegetationHealth: 'vigorous',
        observationDate: new Date().toISOString().split('T')[0],
        sensor: 'Sentinel-2 MSI (10m Resolution)',
        cloudCoverPercent: 2
      }
    });

    setActiveFarmId(newFarm.id);
    setSuccessToast(`Farm enrolled successfully for ${farmerName}! Added to village active queue.`);
    setTimeout(() => setSuccessToast(null), 4000);
    setActiveTab('active_queue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetFarm = farms.find((f) => f.id === selectedFarmIdForClaim) || activeFarm;
    if (!targetFarm) return;

    const claim = addCropLossClaim({
      farmId: targetFarm.id,
      farmerName: targetFarm.farmerName,
      khasraNumber: targetFarm.landRecord?.khasraNumber || '142//15/2',
      policyOrApplicationNo: `KSK-DMG-${targetFarm.district.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
      causeOfLoss: claimCause,
      estimatedLossPercentage: estimatedLoss,
      lossDate,
      reportedWithin72h: true,
      status: 'intimated',
      notes: claimNotes || 'Logged via Village Assistance Booth (Kisan Seva Kendra) with geo-tagged farmer acknowledgement.'
    });

    setClaimSuccessDocket(claim.docketNumber);
    setSuccessToast(`Crop damage incident registered! Docket Reference: ${claim.docketNumber}`);
    setTimeout(() => setSuccessToast(null), 5000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-20 font-sans">
      {/* Booth Header */}
      <div className="bg-[#0B2B26] border border-[#235347] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#163832] border border-[#8EB69B]/40 text-[#8EB69B] flex items-center justify-center font-bold shadow-sm shrink-0">
            <Building2 className="w-6 h-6 text-[#8EB69B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#051F20] bg-[#8EB69B] px-2.5 py-0.5 rounded-md">
                Kisan Seva Kendra / CSC Operator Desk
              </span>
              <span className="text-xs text-[#8EB69B] font-medium">Booth ID: KSK-PB-SNG-44</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Village Assistance Booth Operator Desk
            </h1>
            <p className="text-xs sm:text-sm text-[#DAF1DE] mt-0.5">
              Assisted farmer registration, local crop damage recording, and official agricultural relief dossiers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-stretch md:self-auto shrink-0">
          <button
            onClick={() => setActivePage('reports')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#235347] bg-[#163832] hover:bg-[#235347] text-white font-bold text-xs transition cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#8EB69B]" />
            <span>Open Loss Dossier</span>
          </button>
          <button
            onClick={() => setActivePage('dashboard')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-xs transition shadow-sm cursor-pointer"
          >
            <span>Farmer Dashboard</span>
            <ArrowRight className="w-4 h-4 text-[#051F20]" />
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="bg-[#163832] border-2 border-[#8EB69B] text-white p-4.5 rounded-2xl flex items-center gap-3.5 shadow-2xl animate-fade-in-up">
          <CheckCircle2 className="w-6 h-6 shrink-0 text-[#8EB69B]" />
          <div className="font-bold text-xs sm:text-sm text-white">{successToast}</div>
        </div>
      )}

      {/* Booth Navigation Tabs */}
      <div className="flex bg-[#051F20] border border-[#235347] p-1.5 rounded-2xl gap-1.5 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('register_farmer')}
          className={`px-5 py-3 rounded-xl transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'register_farmer'
              ? 'bg-[#163832] text-white border border-[#8EB69B]/60 shadow-md font-black'
              : 'text-[#DAF1DE] hover:text-white hover:bg-[#163832]'
          }`}
        >
          <UserCheck className="w-4 h-4 text-[#8EB69B]" />
          <span>1. Fast Farm Registration</span>
        </button>
        <button
          onClick={() => setActiveTab('incident_log')}
          className={`px-5 py-3 rounded-xl transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'incident_log'
              ? 'bg-[#163832] text-white border border-[#8EB69B]/60 shadow-md font-black'
              : 'text-[#DAF1DE] hover:text-white hover:bg-[#163832]'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>2. Crop Damage & Calamity Intimation</span>
        </button>
        <button
          onClick={() => setActiveTab('active_queue')}
          className={`px-5 py-3 rounded-xl transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'active_queue'
              ? 'bg-[#163832] text-white border border-[#8EB69B]/60 shadow-md font-black'
              : 'text-[#DAF1DE] hover:text-white hover:bg-[#163832]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#8EB69B]" />
          <span>3. Village Farm Directory ({farms.length} Farms)</span>
        </button>
      </div>

      {/* Tab 1: Fast Farm Registration */}
      {activeTab === 'register_farmer' && (
        <form onSubmit={handleRegisterSubmit} className="space-y-6">
          <div className="bg-[#0B2B26] border border-[#235347] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#235347] pb-3">
              <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8EB69B]" />
                <span>Farm Location & Farmer Details</span>
              </h2>
              <span className="text-[11px] font-bold text-[#8EB69B] bg-[#163832] px-2.5 py-0.5 rounded-full border border-[#235347]">
                Assisted Enrollment
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Farmer Name *</label>
                <input
                  type="text"
                  required
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder="e.g. Balwinder Singh"
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Mobile Number (SMS Alerts) *</label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={farmerPhone}
                  onChange={(e) => setFarmerPhone(e.target.value.replace(/\D/g, ''))}
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
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
                  onChange={(e) => setSelectedDistrict(e.target.value)}
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
                  placeholder="e.g. Moonak"
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0B2B26] border border-[#235347] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#235347] pb-3">
              <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Sprout className="w-4 h-4 text-[#8EB69B]" />
                <span>Crop Profile & Field Specifics</span>
              </h2>
              <span className="text-[11px] font-bold text-[#8EB69B]">Agronomic Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Crop Name *</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value as CropType)}
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
                <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Crop Variety</label>
                <input
                  type="text"
                  value={cropVariety}
                  onChange={(e) => setCropVariety(e.target.value)}
                  placeholder="e.g. PR-126"
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-semibold text-white focus:outline-none focus:border-[#8EB69B]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Sowing Date</label>
                <input
                  type="date"
                  value={sowingDate}
                  onChange={(e) => setSowingDate(e.target.value)}
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
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
                <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Regional Land Unit</label>
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

              <div>
                <label className="block font-bold text-[#DAF1DE] text-xs mb-1.5">Cultivated Area ({activeUnit.nativeNames.en})</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={enteredArea}
                  onChange={(e) => setEnteredArea(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-mono font-bold text-white focus:outline-none focus:border-[#8EB69B]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="button-glow-active w-full bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-sm py-4 rounded-2xl shadow-[0_0_24px_rgba(142,182,155,0.7)] hover:shadow-[0_0_36px_rgba(255,255,255,0.9)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer mt-4"
            >
              <Sparkles className="w-5 h-5 text-[#051F20]" />
              <span>Enroll Farm & Activate 24x7 Risk Protection</span>
              <ArrowRight className="w-4 h-4 text-[#051F20]" />
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Crop Damage & Calamity Intimation */}
      {activeTab === 'incident_log' && (
        <form onSubmit={handleIncidentSubmit} className="space-y-6">
          <div className="bg-[#0B2B26] border border-[#235347] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#235347] pb-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#051F20] bg-amber-400 px-2.5 py-0.5 rounded-md">
                  Field Disaster & Loss Intimation
                </span>
                <h2 className="text-xl font-black text-white mt-1">
                  Log Crop Calamity & Damage Assessment
                </h2>
              </div>
              <div className="text-right text-xs">
                <span className="text-[#8EB69B] block">Emergency KVK Desk</span>
                <span className="font-bold text-white font-mono">Kisan Call: 1800-180-1551</span>
              </div>
            </div>

            {claimSuccessDocket && (
              <div className="bg-[#163832] border-2 border-[#8EB69B] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-[#8EB69B] shrink-0" />
                  <div>
                    <h3 className="text-base font-black text-white">
                      Crop Damage Intimation Logged Successfully
                    </h3>
                    <div className="text-xs text-[#DAF1DE] font-mono mt-0.5">
                      Official Docket Reference: <strong className="text-white text-sm">{claimSuccessDocket}</strong>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#235347]">
                  <button
                    type="button"
                    onClick={() => setActivePage('reports')}
                    className="button-glow-active bg-[#8EB69B] hover:bg-white text-[#051F20] px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shadow-md"
                  >
                    <FileText className="w-4 h-4 text-[#051F20]" />
                    <span>View & Print Official Damage Dossier</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePage('floodMap')}
                    className="bg-[#051F20] hover:bg-[#235347] text-white border border-[#235347] px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Map className="w-4 h-4 text-[#8EB69B]" />
                    <span>Inspect On Satellite Map</span>
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#DAF1DE] mb-1.5">Select Registered Village Farm *</label>
                <select
                  value={selectedFarmIdForClaim}
                  onChange={(e) => setSelectedFarmIdForClaim(e.target.value)}
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
                >
                  {farms.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.farmerName} — {f.village} ({f.cropType.toUpperCase()} - {f.enteredArea} {f.enteredUnit.split('_')[0]})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#DAF1DE] mb-1.5">Date of Calamity / Observation *</label>
                <input
                  type="date"
                  required
                  value={lossDate}
                  onChange={(e) => setLossDate(e.target.value)}
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
                />
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#DAF1DE] mb-1.5">Cause of Calamity / Threat *</label>
                <select
                  value={claimCause}
                  onChange={(e) => setClaimCause(e.target.value)}
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-none focus:border-[#8EB69B]"
                >
                  <option value="Inundation & waterlogging from heavy rainfall & canal overflow">
                    Inundation & Waterlogging (Rainfall / Canal Overflow)
                  </option>
                  <option value="Flash river barrage discharge & embankment breach">
                    River Barrage Discharge & Embankment Breach
                  </option>
                  <option value="Severe drought spell & tubewell aquifer failure">
                    Drought Stress & Groundwater Deficit
                  </option>
                  <option value="Severe squall winds (>50 km/h) & crop lodging">
                    Severe Storm, Squalls & Crop Lodging
                  </option>
                  <option value="Widespread fungal blast & root rot post-submergence">
                    Post-Flood Fungal Blast & Root Rot
                  </option>
                  <option value="Whitefly / bollworm infestation crossing Economic Threshold">
                    Severe Insect Pest Swarm / Whitefly
                  </option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-bold text-[#DAF1DE]">Estimated Standing Crop Loss</label>
                  <span className="font-mono font-bold text-rose-400 text-sm">{estimatedLoss}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={estimatedLoss}
                  onChange={(e) => setEstimatedLoss(Number(e.target.value))}
                  className="w-full accent-[#8EB69B] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#8EB69B] font-mono mt-1">
                  <span>10% (Minor)</span>
                  <span>50% (Moderate)</span>
                  <span>100% (Total Crop Failure)</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#DAF1DE] mb-1.5">Field Assessment Notes & Observations</label>
                <textarea
                  rows={3}
                  value={claimNotes}
                  onChange={(e) => setClaimNotes(e.target.value)}
                  placeholder="Describe visible submergence, siltation, or wilting on standing plants..."
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#8EB69B]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="button-glow-active w-full bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-sm py-4 rounded-2xl shadow-[0_0_24px_rgba(142,182,155,0.7)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5 text-[#051F20]" />
              <span>Record Calamity Intimation & Generate Official Docket</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Village Farm Directory & Queue */}
      {activeTab === 'active_queue' && (
        <div className="bg-[#0B2B26] border border-[#235347] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#235347] pb-4">
            <div>
              <h2 className="text-xl font-black text-white">
                Village Farm Enrollment Directory
              </h2>
              <p className="text-xs text-[#DAF1DE] mt-0.5">
                Active local farmers enrolled at this booth with monitored crop acreage and hazard vulnerability.
              </p>
            </div>
            <span className="text-xs font-bold text-[#8EB69B] bg-[#163832] px-3 py-1 rounded-full border border-[#235347]">
              Total Enrolled: {farms.length} Farm Parcels
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {farms.map((farm) => {
              const isSelected = farm.id === activeFarm?.id;
              return (
                <div
                  key={farm.id}
                  className={`p-5 rounded-2xl border transition space-y-3 ${
                    isSelected
                      ? 'bg-[#163832] border-[#8EB69B] shadow-lg'
                      : 'bg-[#051F20] border-[#235347] hover:border-[#8EB69B]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-white text-base">{farm.farmerName}</h3>
                        <span className="text-[10px] font-bold bg-[#0B2B26] text-[#8EB69B] border border-[#235347] px-2 py-0.5 rounded capitalize">
                          {farm.tenancy?.farmerRole || 'Owner'}
                        </span>
                      </div>
                      <div className="text-xs text-[#DAF1DE] flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#8EB69B]" />
                        <span>{farm.village}, {farm.district} ({farm.state})</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-white bg-[#0B2B26] border border-[#235347] px-2 py-1 rounded-lg">
                      {farm.enteredArea} {farm.enteredUnit.split('_')[0].toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] bg-[#0B2B26] p-2.5 rounded-xl border border-[#235347]">
                    <div>
                      <span className="text-[#8EB69B] block text-[10px]">Crop & Variety</span>
                      <strong className="text-white capitalize">{farm.cropType} ({farm.cropVariety || 'PR-126'})</strong>
                    </div>
                    <div>
                      <span className="text-[#8EB69B] block text-[10px]">Growth Stage</span>
                      <strong className="text-white capitalize">{farm.growthStage}</strong>
                    </div>
                    <div>
                      <span className="text-[#8EB69B] block text-[10px]">NDVI Vigor</span>
                      <strong className="text-emerald-400 font-mono">{farm.vegetationIndex?.ndviValue ?? 0.74}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFarmId(farm.id);
                        setActivePage('reports');
                      }}
                      className="flex-1 bg-[#163832] hover:bg-[#235347] text-white border border-[#235347] hover:border-[#8EB69B] py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#8EB69B]" />
                      <span>Official Dossier</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFarmId(farm.id);
                        setActivePage('floodMap');
                      }}
                      className="flex-1 bg-[#163832] hover:bg-[#235347] text-white border border-[#235347] hover:border-sky-400 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Map className="w-3.5 h-3.5 text-sky-400" />
                      <span>Satellite Map</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFarmId(farm.id);
                        setSelectedFarmIdForClaim(farm.id);
                        setActiveTab('incident_log');
                      }}
                      className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer"
                      title="Log Damage for this farm"
                    >
                      Log Damage
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { FarmMap } from '../components/FarmMap';
import { CROPS_DATA } from '../data/crops';
import { AGRICULTURAL_RISK_ITEMS } from '../data/agriculturalRisks';
import { findRelevantFloodWarning, findRelevantFloodObservation, calculateFloodOverlap } from '../utils/geo';
import { CropType, CropGrowthStage, Farm } from '../types';
import {
  ShieldAlert,
  CloudRain,
  MapPin,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sprout,
  PlusCircle,
  FileCheck2,
  Camera,
  Bot,
  BellRing,
  FileText,
  PhoneCall,
  ChevronDown,
  Layers,
  Sparkles,
  CheckCircle2,
  Radio,
  Eye,
  Edit3,
  Trash2,
  Save,
  X,
  AlertOctagon,
  Check
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    farms,
    activeFarmId,
    setActiveFarmId,
    activeFarm,
    setActivePage,
    weatherData,
    checklistProgress,
    updateFarm,
    deleteFarm,
    language,
    t
  } = useApp();

  const isHi = language === 'hi';
  const isPa = language === 'pa';

  const [moreToolsOpen, setMoreToolsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editState, setEditState] = useState('');
  const [editDistrict, setEditDistrict] = useState('');
  const [editVillage, setEditVillage] = useState('');
  const [editKhasra, setEditKhasra] = useState('');
  const [editCrop, setEditCrop] = useState<CropType>('paddy');
  const [editVariety, setEditVariety] = useState('');
  const [editGrowthStage, setEditGrowthStage] = useState<CropGrowthStage>('vegetative');
  const [editArea, setEditArea] = useState<number>(5);
  const [editUnit, setEditUnit] = useState<string>('acre');
  const [editHasInsurance, setEditHasInsurance] = useState<boolean>(true);
  const [editPolicyNo, setEditPolicyNo] = useState<string>('');

  const handleOpenEditModal = (farm: Farm) => {
    setEditName(farm.farmerName);
    setEditPhone(farm.phone || '9876543210');
    setEditState(farm.state || 'Punjab');
    setEditDistrict(farm.district || 'Sangrur');
    setEditVillage(farm.village || '');
    setEditKhasra(farm.landRecord?.khasraNumber || '142//15/2');
    setEditCrop(farm.cropType || 'paddy');
    setEditVariety(farm.cropVariety || 'PR-126');
    setEditGrowthStage(farm.growthStage || 'vegetative');
    setEditArea(farm.enteredArea || 5);
    setEditUnit(farm.enteredUnit || 'acre');
    setEditHasInsurance(farm.hasInsurance !== false);
    setEditPolicyNo(farm.insurancePolicyNumber || 'PMFBY-2026-PB-9182');
    setIsEditModalOpen(true);
  };

  const handleSaveFarmEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFarm) return;
    updateFarm(activeFarm.id, {
      farmerName: editName.trim() || activeFarm.farmerName,
      phone: editPhone.trim() || activeFarm.phone,
      state: editState.trim() || activeFarm.state,
      district: editDistrict.trim() || activeFarm.district,
      village: editVillage.trim() || activeFarm.village,
      cropType: editCrop,
      cropVariety: editVariety.trim() || undefined,
      growthStage: editGrowthStage,
      enteredArea: Number(editArea) || activeFarm.enteredArea,
      enteredUnit: editUnit,
      hasInsurance: editHasInsurance,
      insurancePolicyNumber: editHasInsurance ? editPolicyNo.trim() : undefined,
      landRecord: {
        ...(activeFarm.landRecord || {
          revenueVillage: editVillage,
          subDistrictTehsil: editDistrict,
          district: editDistrict,
          state: editState,
          recordedAreaSqm: activeFarm.areaSqm,
          recordedAreaRegional: `${editArea} ${editUnit}`,
          landClassification: 'Irrigated Agricultural Land',
          verificationStatus: 'verified',
          verificationSource: 'State Land Records (Bhoomi/PLRS)',
          isDemonstrationData: true
        }),
        khasraNumber: editKhasra.trim() || activeFarm.landRecord?.khasraNumber || '142//15/2'
      }
    });

    setIsEditModalOpen(false);
    setFeedbackToast({
      type: 'success',
      message: isHi
        ? `${editName || activeFarm.farmerName} के खेत का विवरण सफलतापूर्वक अपडेट किया गया।`
        : isPa
        ? `${editName || activeFarm.farmerName} ਦੇ ਖੇਤ ਦਾ ਵੇਰਵਾ ਸਫਲਤਾਪੂਰਵਕ ਅੱਪਡੇਟ ਕੀਤਾ ਗਿਆ।`
        : `Farm details for ${editName || activeFarm.farmerName} updated successfully.`
    });
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleDeleteFarm = () => {
    if (!activeFarm) return;
    if (farms.length <= 1) {
      setFeedbackToast({
        type: 'error',
        message: isHi
          ? 'आप एकमात्र पंजीकृत खेत को नहीं हटा सकते। कृपया पहले दूसरा खेत पंजीकृत करें।'
          : isPa
          ? 'ਤੁਸੀਂ ਇਕਲੌਤੇ ਰਜਿਸਟਰਡ ਖੇਤ ਨੂੰ ਨਹੀਂ ਹਟਾ ਸਕਦੇ। ਪਹਿਲਾਂ ਦੂਜਾ ਖੇਤ ਸ਼ਾਮਲ ਕਰੋ।'
          : 'Cannot delete the only registered farm. Please register a replacement farm first.'
      });
      setIsDeleteModalOpen(false);
      setTimeout(() => setFeedbackToast(null), 4000);
      return;
    }
    const farmName = activeFarm.farmerName;
    deleteFarm(activeFarm.id);
    setIsDeleteModalOpen(false);
    setFeedbackToast({
      type: 'success',
      message: isHi
        ? `${farmName} का खेत सक्रिय उपग्रह निगरानी से हटा दिया गया है।`
        : isPa
        ? `${farmName} ਦਾ ਖੇਤ ਨਿਗਰਾਨੀ ਸੂਚੀ ਵਿੱਚੋਂ ਹਟਾ ਦਿੱਤਾ ਗਿਆ ਹੈ।`
        : `Farm parcel for ${farmName} has been deleted from active monitoring.`
    });
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const cropInfo = activeFarm ? CROPS_DATA[activeFarm.cropType] : null;

  // Hydrological and Flood risk data
  const primaryWarning = useMemo(() => {
    return findRelevantFloodWarning(activeFarm);
  }, [activeFarm]);

  const primaryObservation = useMemo(() => {
    return findRelevantFloodObservation(activeFarm);
  }, [activeFarm]);

  const overlapResult = useMemo(() => {
    if (!activeFarm || !primaryObservation) return null;
    return calculateFloodOverlap(
      activeFarm.polygon,
      primaryObservation.geoJson,
      activeFarm.id,
      primaryObservation.observationDate,
      primaryObservation.satelliteSensor
    );
  }, [activeFarm, primaryObservation]);

  // Overall active risk count
  const activeHighRisks = useMemo(() => {
    return AGRICULTURAL_RISK_ITEMS.filter((r) => r.severity === 'high' || r.severity === 'severe');
  }, []);

  // Auxiliary tools list with colorful semantic styling
  const auxiliaryTools = [
    {
      id: 'risks',
      title: '8-Hazard Risk Center',
      desc: 'Real-time advisories for floods, drought, heatwaves, pests & diseases',
      icon: ShieldAlert,
      badge: `${activeHighRisks.length} High Risks`,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30'
    },
    {
      id: 'photoAssess',
      title: 'Crop Photo Damage AI',
      desc: 'Upload crop photos to detect disease severity or lodging percentage',
      icon: Camera,
      badge: 'Instant Analysis',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30'
    },
    {
      id: 'planner',
      title: 'Crop Planner & Sowing Checklist',
      desc: 'Lifecycle stage management, AWD irrigation and fertilizer schedules',
      icon: CalendarCheck,
      badge: `${checklistProgress}% Ready`,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30'
    },
    {
      id: 'smsAlerts',
      title: 'SMS & Voice Alerts',
      desc: 'Configure automated phone notifications for Gram-level alerts',
      icon: BellRing,
      badge: 'Direct SMS',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30'
    },
    {
      id: 'customerCare',
      title: 'Emergency & Disaster Helplines',
      desc: 'National Disaster (1078), Emergency (112), State SDMA (1070)',
      icon: PhoneCall,
      badge: '24x7 Hotlines',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30'
    }
  ];

  if (!activeFarm) {
    return (
      <div className="text-center py-20 bg-[#0B2B26] rounded-3xl border border-[#235347] p-8 max-w-2xl mx-auto space-y-5 animate-fade-in-up">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-float-slow">
          <Sprout className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">No Registered Farms Found</h2>
        <p className="text-[#DAF1DE] text-sm max-w-md mx-auto leading-relaxed">
          Register your farm location and crop details to start receiving automated Google Earth 3D satellite monitoring and weather warnings.
        </p>
        <button
          onClick={() => setActivePage('register')}
          className="button-glow-active btn-shimmer mt-4 bg-[#8EB69B] hover:bg-white text-[#051F20] px-8 py-3.5 rounded-2xl font-black text-sm shadow-[0_0_28px_rgba(142,182,155,0.7)] transition duration-300 cursor-pointer inline-flex items-center gap-2 transform hover:-translate-y-1"
        >
          <PlusCircle className="w-5 h-5 text-[#051F20]" />
          <span>Register Your First Farm</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 font-sans text-slate-200 animate-fade-in-up">
      {/* 1. MAIN FOCUS: High-Impact Register Farm Hero Card with Radiant Glow */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0B2B26] via-[#103A33] to-[#0B2B26] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_0_35px_rgba(16,185,129,0.12)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#051F20] bg-[#8EB69B] px-2.5 py-0.5 rounded-md flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Primary Farm Action
              </span>
              <span className="text-xs text-emerald-300 font-medium">
                Farm Location & Google Earth 3D Boundary Demarcation
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Register & Demarcate Your Farm Parcel
            </h1>

            <p className="text-xs sm:text-sm text-[#DAF1DE] leading-relaxed">
              Register your farm location, draw precise GPS boundaries on Google Earth, and activate automated 24x7 multi-hazard risk protection.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => setActivePage('register')}
              className="button-glow-active btn-shimmer w-full sm:w-auto bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-sm px-7 py-4 rounded-2xl shadow-[0_0_28px_rgba(142,182,155,0.7)] hover:shadow-[0_0_40px_rgba(255,255,255,0.9)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-1 active:translate-y-0"
            >
              <PlusCircle className="w-5 h-5 text-[#051F20]" />
              <span>{isHi ? '+ नया खेत पंजीकृत करें' : isPa ? '+ ਨਵਾਂ ਖੇਤ ਰਜਿਸਟਰ ਕਰੋ' : '+ Register New Farm'}</span>
            </button>

            <button
              onClick={() => handleOpenEditModal(activeFarm)}
              className="card-interactive w-full sm:w-auto bg-[#163832] hover:bg-[#235347] text-white border border-emerald-500/50 hover:border-emerald-300 font-bold text-xs px-4 py-4 rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Edit3 className="w-4 h-4 text-emerald-400" />
              <span>{isHi ? 'सक्रिय खेत संपादित करें' : isPa ? 'ਖੇਤ ਵੇਰਵੇ ਸੋਧੋ' : 'Edit Active Farm'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Current Monitored Farm Header & Parcel Switcher */}
      <div className="bg-[#0B2B26] border border-[#235347] p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-md flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {isHi ? 'सक्रिय खेत:' : isPa ? 'ਮੌਜੂਦਾ ਖੇਤ:' : 'Active Field:'}
            </span>
            <select
              value={activeFarmId}
              onChange={(e) => setActiveFarmId(e.target.value)}
              className="bg-[#051F20] border border-[#235347] text-xs rounded-xl px-3 py-1.5 font-bold text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
            >
              {farms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.farmerName} — {f.village}, {f.district} ({f.cropType.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {activeFarm.farmerName}'s Farm — {activeFarm.village}
          </h2>

          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1 font-bold text-white">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              {activeFarm.district}, {activeFarm.state}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
              Khasra {activeFarm.landRecord?.khasraNumber || '142//15/2'} ({activeFarm.landRecord?.verificationStatus.toUpperCase() || 'VERIFIED'})
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-semibold text-white">
              {cropInfo?.nativeNames.en} ({activeFarm.growthStage.toUpperCase()})
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono text-sky-300 font-medium">
              {activeFarm.enteredArea} {activeFarm.enteredUnit.split('_')[0]} ({activeFarm.areaSqm.toLocaleString()} m²)
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
              activeFarm.hasInsurance !== false
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}>
              {activeFarm.hasInsurance !== false ? '🛡️ PMFBY Insured' : '⚠️ Uninsured'}
            </span>
          </div>
        </div>

        {/* Quick Edit, Delete & Auxiliary Services Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Edit Farm Button */}
          <button
            onClick={() => handleOpenEditModal(activeFarm)}
            className="card-interactive flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-500/40 bg-[#163832] hover:bg-[#235347] text-emerald-300 text-xs font-bold transition cursor-pointer"
            title="Edit farm registration details"
          >
            <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isHi ? 'संशोधन करें' : isPa ? 'ਵੇਰਵੇ ਸੋਧੋ' : 'Edit Farm'}</span>
          </button>

          {/* Delete Farm Button */}
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="card-interactive flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-500/40 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold transition cursor-pointer"
            title="Delete this registered holding"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>{isHi ? 'खेत हटाएं' : isPa ? 'ਖੇਤ ਹਟਾਓ' : 'Delete'}</span>
          </button>

          {/* Quick Menu Button for Secondary Tools */}
          <button
            onClick={() => setMoreToolsOpen(!moreToolsOpen)}
            className={`card-interactive flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
              moreToolsOpen
                ? 'bg-white text-[#051F20] border-white shadow-md'
                : 'bg-[#163832] text-white border-[#235347] hover:border-slate-400'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-300" />
            <span>{isHi ? 'अन्य सेवाएं' : isPa ? 'ਹੋਰ ਸੇਵਾਵਾਂ' : 'More Services'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreToolsOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* 3. Dropdown Menu for All Secondary / Auxiliary Farm Services */}
      {moreToolsOpen && (
        <div className="bg-[#0B2B26] border border-[#235347] rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 animate-message-pop">
          <div className="flex items-center justify-between border-b border-[#235347] pb-3">
            <div>
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>All Auxiliary Farm Operations & Services</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Quick access to government booths, risk intelligence, automated loss filing, and helplines.
              </p>
            </div>
            <button
              onClick={() => setMoreToolsOpen(false)}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Close Menu
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {auxiliaryTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActivePage(tool.id);
                    setMoreToolsOpen(false);
                  }}
                  className={`card-interactive bg-[#163832] hover:bg-[#235347] border border-[#235347] hover:${tool.borderColor} p-4 rounded-2xl text-left transition flex flex-col justify-between space-y-2 group cursor-pointer`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`w-8 h-8 rounded-lg ${tool.bgColor} border ${tool.borderColor} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${tool.color}`} />
                    </div>
                    <span className="text-[10px] bg-[#051F20] text-slate-300 border border-[#235347] font-bold px-2 py-0.5 rounded">
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <div className="font-bold text-xs text-white group-hover:text-emerald-300 transition-colors">
                      {tool.title}
                    </div>
                    <div className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                      {tool.desc}
                    </div>
                  </div>

                  <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1 pt-1 group-hover:text-white">
                    <span>Open tool</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Three Core Scannable Status Cards with Distinctive Accents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Satellite NDVI & Crop Health (Emerald Accent) */}
        <div className="card-interactive bg-[#0B2B26] border border-[#235347] hover:border-emerald-500/40 p-5 rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sprout className="w-4 h-4" />
              <span>Satellite Crop Health</span>
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
              Sentinel-2 NDVI
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono tabular-nums">
              {activeFarm.vegetationIndex?.ndviValue ?? 0.74}
            </span>
            <span className="text-xs font-bold text-emerald-300 uppercase bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded">
              {activeFarm.vegetationIndex?.vegetationHealth || 'Vigorous'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Canopy photosynthetic density is high. Optimal vegetative vigor for current {activeFarm.growthStage} stage.
          </p>
        </div>

        {/* Metric 2: IMD Weather & 48h Rain Forecast (Sky Blue Accent) */}
        <div className="card-interactive bg-[#0B2B26] border border-[#235347] hover:border-sky-500/40 p-5 rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-sky-400">
              <CloudRain className="w-4 h-4" />
              <span>IMD Weather Forecast</span>
            </span>
            <span className="text-[10px] bg-sky-500/10 text-sky-300 font-bold px-2 py-0.5 rounded border border-sky-500/30">
              48h Window
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono tabular-nums">
              {weatherData?.forecastRainfall24h ?? 12.5}
            </span>
            <span className="text-xs text-sky-300 font-medium">mm precipitation (24h)</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Temp: <span className="text-white font-bold">{weatherData?.temp ?? 31}°C</span> · Condition: <span className="text-white">{weatherData?.condition || 'Partly Cloudy'}</span> · Humidity: <span className="text-white">72%</span>
          </p>
        </div>

        {/* Metric 3: Multi-Hazard Threat Monitoring (Amber Accent) */}
        <div className="card-interactive bg-[#0B2B26] border border-[#235347] hover:border-amber-500/40 p-5 rounded-2xl space-y-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-amber-400">
                <ShieldAlert className="w-4 h-4" />
                <span>Agricultural Risk Surveillance</span>
              </span>
              <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold px-2 py-0.5 rounded">
                8 Threats Active
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-black text-white font-mono">
                Low-Moderate
              </span>
              <span className="text-xs text-[#DAF1DE] font-medium">composite hazard score</span>
            </div>

            <p className="text-xs text-[#DAF1DE] mt-1 leading-relaxed">
              Real-time monitoring across Floods, Drought, Heatwave, Pests, Diseases, and Soil status synced with IMD & CWC feeds.
            </p>
          </div>

          <button
            onClick={() => setActivePage('risks')}
            className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 pt-1 group cursor-pointer hover:underline"
          >
            <span>Open 8-Risk Center</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 5. Google Earth 3D Farm Map & Cadastral Overlay */}
      <div className="bg-[#0B2B26] border border-[#235347] p-5 sm:p-6 rounded-3xl space-y-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#235347] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sky-400" />
                <span>Google Earth Satellite Field Cadastral Map</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Government Khasra Boundaries · High-Definition 3D Terrain · CWC River Gauges & Radar Overlays
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePage('register')}
              className="card-interactive bg-[#163832] hover:bg-[#235347] text-white border border-[#235347] hover:border-emerald-400 font-bold text-xs px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Demarcate Parcel</span>
            </button>
          </div>
        </div>

        {/* Farm Map directly displaying Google Earth */}
        <div className="rounded-2xl overflow-hidden border border-[#235347] shadow-inner">
          <FarmMap
            initialCenter={activeFarm.centerLocation}
            initialPolygon={activeFarm.polygon}
            selectedDistrict={activeFarm.district}
            selectedState={activeFarm.state}
            autoCenterOnDistrict={true}
            showFloodOverlays={true}
            showRiverGauges={true}
            heightClass="h-[420px] sm:h-[480px]"
          />
        </div>

        {/* Map Legend & Fast Info Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 pt-1">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400 inline-block" />
              <span className="text-white font-semibold">Registered Farm Boundary</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-cyan-500/80 border border-cyan-400 inline-block" />
              <span className="text-white font-semibold">CWC Gauge Stations</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400 inline-block" />
              <span className="text-white font-semibold">Active Inundation Zones</span>
            </span>
          </div>

          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Powered by Google Earth Photorealistic 3D & Landsat/Sentinel</span>
          </div>
        </div>
      </div>

      {/* Toast Feedback Notification */}
      {feedbackToast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl border shadow-2xl flex items-center gap-3 animate-message-pop ${
          feedbackToast.type === 'success'
            ? 'bg-[#0B2B26] border-emerald-400 text-emerald-200'
            : 'bg-[#2A0808] border-rose-500 text-rose-200'
        }`}>
          {feedbackToast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-xs font-bold">{feedbackToast.message}</span>
        </div>
      )}

      {/* Edit Farm Modal */}
      {isEditModalOpen && activeFarm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B2B26] border border-[#235347] rounded-3xl w-full max-w-2xl p-6 sm:p-7 shadow-2xl text-slate-200 space-y-5 animate-message-pop max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#235347] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {isHi ? 'खेत का विवरण संपादित करें' : isPa ? 'ਖੇਤ ਦੇ ਵੇਰਵੇ ਸੋਧੋ' : 'Edit Registered Farm Details'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isHi ? 'फसल, रकबा, बीमा और किसान विवरण अपडेट करें' : isPa ? 'ਫਸਲ, ਰਕਬਾ, ਬੀਮਾ ਅਤੇ ਕਿਸਾਨ ਵੇਰਵੇ ਅੱਪਡੇਟ ਕਰੋ' : 'Update crop, parcel area, insurance policy, and farmer details.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-xl bg-[#051F20] text-slate-400 hover:text-white border border-[#235347] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFarmEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isHi ? 'किसान का नाम' : isPa ? 'ਕਿਸਾਨ ਦਾ ਨਾਂ' : 'Farmer Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isHi ? 'मोबाइल नंबर (एसएमएस चेतावनी)' : isPa ? 'ਮੋਬਾਈਲ ਨੰਬਰ' : 'Mobile Phone (Satellite SMS)'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 text-white font-mono font-medium focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isHi ? 'राज्य' : isPa ? 'ਸੂਬਾ' : 'State'}
                  </label>
                  <input
                    type="text"
                    value={editState}
                    onChange={(e) => setEditState(e.target.value)}
                    className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isHi ? 'जिला' : isPa ? 'ਜ਼ਿਲ੍ਹਾ' : 'District'}
                  </label>
                  <input
                    type="text"
                    value={editDistrict}
                    onChange={(e) => setEditDistrict(e.target.value)}
                    className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isHi ? 'गांव / तहसील' : isPa ? 'ਪਿੰਡ / ਤਹਿਸੀਲ' : 'Village / Tehsil'}
                  </label>
                  <input
                    type="text"
                    value={editVillage}
                    onChange={(e) => setEditVillage(e.target.value)}
                    className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isHi ? 'खसरा / सर्वे नंबर' : isPa ? 'ਖਸਰਾ ਨੰਬਰ' : 'Khasra / Survey No.'}
                  </label>
                  <input
                    type="text"
                    value={editKhasra}
                    onChange={(e) => setEditKhasra(e.target.value)}
                    className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-white font-mono font-medium focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isHi ? 'मुख्य फसल' : isPa ? 'ਮੁੱਖ ਫਸਲ' : 'Crop Type'}
                  </label>
                  <select
                    value={editCrop}
                    onChange={(e) => setEditCrop(e.target.value as CropType)}
                    className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-emerald-400"
                  >
                    <option value="paddy">Paddy / Rice (धान / ਝੋਨਾ)</option>
                    <option value="wheat">Wheat (गेहूं / ਕਣਕ)</option>
                    <option value="cotton">Cotton (कपास / ਨਰਮਾ)</option>
                    <option value="sugarcane">Sugarcane (गन्ना / ਕਮਾਦ)</option>
                    <option value="maize">Maize (मक्का / ਮੱਕੀ)</option>
                    <option value="mustard">Mustard (सरसों / ਸਰ੍ਹੋਂ)</option>
                    <option value="pulses">Pulses (दालें / ਦਾਲਾਂ)</option>
                    <option value="vegetables">Vegetables (सब्जियां / ਸਬਜ਼ੀਆਂ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isHi ? 'फसल किस्म' : isPa ? 'ਕਿਸਮ' : 'Crop Variety'}
                  </label>
                  <input
                    type="text"
                    value={editVariety}
                    onChange={(e) => setEditVariety(e.target.value)}
                    placeholder="e.g. PR-126, HD-3086"
                    className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isHi ? 'वर्तमान विकास अवस्था' : isPa ? 'ਵਿਕਾਸ ਅਵਸਥਾ' : 'Growth Stage'}
                  </label>
                  <select
                    value={editGrowthStage}
                    onChange={(e) => setEditGrowthStage(e.target.value as CropGrowthStage)}
                    className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-emerald-400"
                  >
                    <option value="seedling">Seedling (अंकुरण / ਬੀਜਣ)</option>
                    <option value="vegetative">Vegetative (वानस्पतिक / ਵਾਧਾ)</option>
                    <option value="flowering">Flowering (पुष्पण / ਫੁੱਲ)</option>
                    <option value="grain_filling">Grain Filling (दाना भराव / ਦਾਣਾ ਬਣਨਾ)</option>
                    <option value="maturity">Maturity / Harvest (पकाव / ਕਟਾਈ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isHi ? 'रकबा' : isPa ? 'ਰਕਬਾ' : 'Area Size'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={editArea}
                    onChange={(e) => setEditArea(parseFloat(e.target.value) || 1)}
                    className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-white font-mono font-medium focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isHi ? 'भूमि इकाई' : isPa ? 'ਜ਼ਮੀਨ ਇਕਾਈ' : 'Measurement Unit'}
                  </label>
                  <select
                    value={editUnit}
                    onChange={(e) => setEditUnit(e.target.value)}
                    className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-emerald-400"
                  >
                    <option value="acre">Acres (एकड़ / ਏਕੜ)</option>
                    <option value="bigha">Bigha (बीघा)</option>
                    <option value="kanal">Kanal (कनाल / ਕਨਾਲ)</option>
                    <option value="guntha">Guntha (गुंठा)</option>
                    <option value="hectare">Hectares (हेक्टेयर)</option>
                  </select>
                </div>
              </div>

              {/* PMFBY Crop Insurance Settings */}
              <div className="p-4 rounded-2xl bg-[#051F20] border border-[#235347] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{isHi ? 'पीएम फसल बीमा योजना (PMFBY)' : isPa ? 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ' : 'PMFBY Crop Insurance Coverage'}</span>
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {isHi ? 'क्या इस खेत पर सक्रिय फसल बीमा पॉलिसी मौजूद है?' : isPa ? 'ਕੀ ਇਸ ਖੇਤ ਲਈ ਫਸਲ ਬੀਮਾ ਪਾਲਿਸੀ ਹੈ?' : 'Is this holding covered under active PMFBY crop insurance?'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editHasInsurance}
                      onChange={(e) => setEditHasInsurance(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                {editHasInsurance && (
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {isHi ? 'बीमा पॉलिसी / आवेदन संख्या' : isPa ? 'ਬੀਮਾ ਪਾਲਿਸੀ / ਦਰਖਾਸਤ ਨੰਬਰ' : 'Insurance Policy / Application Number'}
                    </label>
                    <input
                      type="text"
                      value={editPolicyNo}
                      onChange={(e) => setEditPolicyNo(e.target.value)}
                      placeholder="e.g. PMFBY-2026-PB-9182"
                      className="w-full bg-[#0B2B26] border border-[#235347] rounded-xl px-3 py-2 text-white font-mono font-medium focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#235347]">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#235347] text-slate-300 hover:text-white hover:bg-[#163832] font-bold text-xs transition cursor-pointer"
                >
                  {isHi ? 'रद्द करें' : isPa ? 'ਰੱਦ ਕਰੋ' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="button-glow-active bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-xs px-6 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#051F20]" />
                  <span>{isHi ? 'परिवर्तन सहेजें' : isPa ? 'ਤਬਦੀਲੀਆਂ ਸਾਂਭੋ' : 'Save Farm Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Farm Confirmation Modal */}
      {isDeleteModalOpen && activeFarm && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0B2B26] border border-rose-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl text-slate-200 space-y-4 animate-message-pop">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-white">
                {isHi ? 'खेत पंजीकरण हटाएं?' : isPa ? 'ਕੀ ਖੇਤ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?' : 'Delete Registered Farm Holding?'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isHi
                  ? `क्या आप सचमुच ${activeFarm.farmerName} (${activeFarm.village}, ${activeFarm.district}) के खेत को हटाना चाहते हैं? यह उपग्रह रडार निगरानी व अलर्ट से अलग हो जाएगा।`
                  : isPa
                  ? `ਕੀ ਤੁਸੀਂ ਵਾਕਈ ${activeFarm.farmerName} (${activeFarm.village}, ${activeFarm.district}) ਦਾ ਖੇਤ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਇਹ ਉਪਗ੍ਰਹਿ ਨਿਗਰਾਨੀ ਸੂਚੀ ਵਿੱਚੋਂ ਹਟ ਜਾਵੇਗਾ।`
                  : `Are you sure you want to delete ${activeFarm.farmerName}'s farm in ${activeFarm.village}, ${activeFarm.district}? It will be removed from active satellite radar surveillance and emergency SMS alerts.`}
              </p>
            </div>

            <div className="bg-[#051F20] p-3 rounded-xl border border-[#235347] text-xs font-mono text-center text-slate-400">
              Khasra: {activeFarm.landRecord?.khasraNumber || '142//15/2'} · {activeFarm.enteredArea} {activeFarm.enteredUnit.split('_')[0]} · {activeFarm.cropType.toUpperCase()}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#235347] text-slate-300 hover:text-white hover:bg-[#163832] font-bold text-xs transition cursor-pointer"
              >
                {isHi ? 'रखें (रद्द)' : isPa ? 'ਰੱਖੋ' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleDeleteFarm}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isHi ? 'हां, खेत हटाएं' : isPa ? 'ਹਾਂ, ਹਟਾਓ' : 'Confirm Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
